/* ================= TRUP — render + audio ================= */
(function(){
'use strict';
const D = window.TRUP_DATA;
const $ = s => document.querySelector(s);
const el = (tag, cls, html) => { const e=document.createElement(tag); if(cls)e.className=cls; if(html!=null)e.innerHTML=html; return e; };

/* ---------- state ---------- */
const state = {
  view:'map',            // map | pesukim | kriyos | tehillim | timeline | mesoros | kolos
  lang:'en',
  system:'torah',
  tradition:'ashkE',
  selected:null,
  selectedSet:'prose',
  transpose:0,           // semitones
  tempoPct:100           // 100 = leining pace (brisk recitative)
};

/* ---------- audio engine ---------- */
const NNAMES=['C','C#','D','D#','E','F','F#','G','G#','A','A#','B'];
function noteMidi(n){ const m=n.match(/^([A-G]#?)(\d)$/); return (+m[2])*12 + NNAMES.indexOf(m[1]); }
function midiNote(m){ return NNAMES[((m%12)+12)%12] + Math.floor(m/12); }
function noteFreq(n){ return 440 * Math.pow(2,(noteMidi(n)-57)/12); }
function shiftNote(n,s){ return midiNote(noteMidi(n)+s); }
function shiftSeq(seq,s){ return s? seq.map(([n,b])=>[n?shiftNote(n,s):null,b]) : seq; }
function seqBeats(seq){ return seq.reduce((a,[,b])=>a+b,0); }

let ctx=null, playToken=0;
/* Recitative pacing: trup is sung at speech tempo — quick syllabic movement,
   holds only where the motif holds. JE 1905: "Rather briskly, without strict tempo." */
function spb(){ return 0.30*(100/state.tempoPct); }        // seconds per beat
function noteSec(beats){ const T=spb(); return beats<=0.3? beats*T*0.85 : beats*T; }
function audioCtx(){ if(!ctx) ctx = new (window.AudioContext||window.webkitAudioContext)(); return ctx; }
function pianoTone(freq, t0, dur){
  /* clarinet-style sustained tone — odd harmonics, soft attack, held until release.
     Far closer to a leining voice than a decaying piano. */
  const c=audioCtx();
  const g=c.createGain();
  const lp=c.createBiquadFilter(); lp.type='lowpass';
  lp.frequency.value=Math.min(freq*6,4200); lp.Q.value=0.7;
  lp.connect(g); g.connect(c.destination);
  const A=0.045, R=0.09, S=0.22;
  g.gain.setValueAtTime(0.0001,t0);
  g.gain.linearRampToValueAtTime(S,t0+A);
  g.gain.setValueAtTime(S,Math.max(t0+A,t0+dur-0.02));
  g.gain.exponentialRampToValueAtTime(0.0001,t0+dur+R);
  [[1,0.9],[2,0.06],[3,0.35],[5,0.14]].forEach(([mult,amp])=>{
    const o=c.createOscillator(), og=c.createGain();
    o.type='sine'; o.frequency.value=freq*mult; og.gain.value=amp;
    o.connect(og); og.connect(lp);
    o.start(t0); o.stop(t0+dur+R+0.05);
  });
}
function playMotif(seq, onStep, onEnd){
  const c=audioCtx();
  if(c.state==='suspended') c.resume();
  const token=++playToken;
  let t=c.currentTime+0.06, acc=0;
  const steps=[];
  seq.forEach(([note,beats])=>{
    steps.push({note, at:acc});
    const d=noteSec(beats);
    if(note) pianoTone(noteFreq(note), t+acc, d);
    acc += d;
  });
  steps.forEach(s=>setTimeout(()=>{ if(token===playToken&&onStep) onStep(s.note); }, (s.at+0.06)*1000));
  setTimeout(()=>{ if(token===playToken&&onEnd) onEnd(); }, (acc+0.35)*1000);
  return token;
}
function stopAll(){ playToken++; }
function playSeqOnRail(seq){
  const s=shiftSeq(seq,state.transpose);
  const pc=$('#railPiano');
  if(pc){ clearKeys(pc); markMotifKeys(pc,s); }
  playMotif(s, n=>{ if(pc&&n) flashKey(pc,n); }, ()=>{});
}

/* ---------- helpers ---------- */
function taamById(id){ return D.prose.find(t=>t.id===id) || D.emes.find(t=>t.id===id); }
function nameFor(t){
  const n=t.names.ashk;
  if(state.lang==='he') return `<span class="he-run">${n.he}</span>`;
  return n.se;
}
function motifFor(id){
  const bank=D.motifs;
  const tryGet=(tr,sys)=>bank[tr]&&bank[tr][sys]&&bank[tr][sys][id];
  let m=tryGet(state.tradition,state.system);
  if(m) return {seq:m, tr:state.tradition, sys:state.system};
  for(const tr in bank) for(const sys in bank[tr]){
    if(bank[tr][sys][id]) return {seq:bank[tr][sys][id], tr, sys};
  }
  return null;
}
const trName = id => (D.traditions.find(t=>t.id===id)||{}).en || id;
const sysName = id => (D.systems.find(s=>s.id===id)||{}).en || id;
function bankTonic(tr,sys){ return D.tonics[tr] && D.tonics[tr][sys] || null; }

/* ---------- motif resolution with aliases (for phrases & pesukim) ---------- */
const ALIAS={ zakefgadol:'zakefkatan', gershayim:'geresh', mahpach:'munach', kadma:'munach',
  yesiv:'pashta', telishagedolah:'geresh', telishaketanah:'munach', shalsheles:'segol',
  munachlegarmeh:'munach', merchakefulah:'tevir', karneifarah:'pazer', yerach:'munach',
  zarka:'revia', segol:'revia' };
const YEM_RANK={ emperor:null, king:'maamid1', duke:'mafsik1', count:'maamid2', conj:'molikh' };
function resolveSeq(id, tr, sys){
  if(!id) return null;
  if(tr==='yem'){
    const bank=D.motifs.yem.torah;
    if(id==='sofpasuk') return bank.silluk;
    if(id==='esnachta') return bank.esnacha;
    const t=taamById(id);
    const key=t? YEM_RANK[t.rank] : 'molikh';
    return key? bank[key] : bank.molikh;
  }
  const banks=D.motifs;
  const inBank=(b,i)=>b&&b[i];
  const bank=banks[tr]&&banks[tr][sys];
  let cur=id, depth=0;
  while(cur && depth<4){
    if(inBank(bank,cur)) return bank[cur];
    cur=ALIAS[cur]; depth++;
  }
  // fallback: same tradition torah bank, then ashkE same system
  const fb1=banks[tr]&&banks[tr].torah;
  cur=id; depth=0;
  while(cur && depth<4){ if(inBank(fb1,cur)) return fb1[cur]; cur=ALIAS[cur]; depth++; }
  const fb2=banks.ashkE&&banks.ashkE[sys];
  cur=id; depth=0;
  while(cur && depth<4){ if(inBank(fb2,cur)) return fb2[cur]; cur=ALIAS[cur]; depth++; }
  return null;
}

/* ---------- ABC notation (TropeTrainer-style: melody as ABC → staff + MIDI) ---------- */
function seqToABC(seq, title){
  const len=b=>Math.max(1,Math.round(b*4));           // L:1/16 units
  const pitch=n=>{
    const m=n.match(/^([A-G])(#?)(\d)$/); if(!m) return 'z';
    const acc=m[2]?'^':''; const oct=+m[3]; let core=m[1];
    if(oct>=5) core=core.toLowerCase();
    if(oct>=6) core+="'";
    if(oct===3) core+=',';
    if(oct<=2) core+=',,';
    return acc+core;
  };
  const body=seq.map(([n,b])=>{
    const u=len(b);
    return (n? pitch(n) : 'z') + (u===1?'':u);
  }).join(' ');
  return 'X:1\nT:'+(title||'')+'\nL:1/16\nK:C\n'+body+'|]\n';
}
function downloadMidi(abc, fname){
  try{
    if(!window.ABCJS||!ABCJS.synth||!ABCJS.synth.getMidiFile) return;
    let bin=ABCJS.synth.getMidiFile(abc,{midiOutputType:'binary'});
    if(Array.isArray(bin)) bin=bin[0];
    const blob=new Blob([bin],{type:'audio/midi'});
    const a=document.createElement('a');
    a.href=URL.createObjectURL(blob); a.download=fname;
    document.body.appendChild(a); a.click();
    setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();},400);
  }catch(e){ console.warn('MIDI export failed', e); }
}

/* ---------- Unicode ta'am parser ---------- */
const PROSE_ACC={0x0591:'esnachta',0x0592:'segol',0x0593:'shalsheles',0x0594:'zakefkatan',
  0x0595:'zakefgadol',0x0596:'tipcha',0x0597:'revia',0x0598:'zarka',0x0599:'pashta',
  0x059A:'yesiv',0x059B:'tevir',0x059C:'geresh',0x059D:'geresh',0x059E:'gershayim',
  0x059F:'karneifarah',0x05A0:'telishagedolah',0x05A1:'pazer',0x05A3:'munach',
  0x05A4:'mahpach',0x05A5:'mercha',0x05A6:'merchakefulah',0x05A7:'darga',0x05A8:'kadma',
  0x05A9:'telishaketanah',0x05AA:'yerach',0x05AE:'zarka'};
const RANK_SCORE={emperor:5,king:4,duke:3,count:2,conj:1};
function resolveProse(codes,hasPaseq){
  let ids=[]; codes.forEach(c=>{ const id=PROSE_ACC[c]; if(id&&!ids.includes(id)) ids.push(id); });
  if(hasPaseq && ids.includes('munach')) return 'munachlegarmeh';
  if(!ids.length) return null;
  ids.sort((a,b)=>{ const ra=taamById(a),rb=taamById(b);
    return (RANK_SCORE[rb?rb.rank:'conj']||0)-(RANK_SCORE[ra?ra.rank:'conj']||0); });
  return ids[0];
}
function resolveEmes(codes,hasPaseq){
  const has=c=>codes.includes(c);
  if(has(0x05AB)) return 'e_olehveyored';
  if(has(0x059D)&&has(0x0597)) return 'e_reviamugrash';
  if(has(0x0591)) return 'e_esnachta';
  if(has(0x05AD)) return 'e_dechi';
  if(has(0x05AE)) return 'e_tzinnor';
  if(has(0x0597)) return 'e_reviagadol';
  if(has(0x0593)) return 'e_shalshelesgedolah';
  if(has(0x05A1)) return 'e_pazer';
  if(has(0x05A4)) return hasPaseq?'e_mehupachlegarmeh':null;
  if(has(0x05A8)) return hasPaseq?'e_azlalegarmeh':null;
  if(has(0x05AC)) return 'e_illuy';
  if(has(0x05A2)) return 'e_atnachhafukh';
  if(has(0x05AA)) return 'e_galgal';
  if(has(0x0598)) return 'e_tsinnoris';
  return null; // conjunctive — recited
}
function parseVerse(raw, sys){
  let txt=raw.replace(/<[^>]*>/g,'').replace(/&thinsp;|&nbsp;/g,' ')
             .replace(/\{[פס]\}/g,'').replace(/\s+/g,' ').trim();
  const words=txt.split(' ').filter(w=>w.length);
  const toks=[];
  words.forEach(w=>{
    if(w==='׀'){ if(toks.length) toks[toks.length-1].paseq=true; toks.push({text:'׀',sep:true}); return; }
    toks.push({text:w});
  });
  const wordToks=toks.filter(t=>!t.sep);
  wordToks.forEach((t,i)=>{
    const codes=[...t.text].map(c=>c.codePointAt(0)).filter(c=>c>=0x0591&&c<=0x05AE);
    const last = i===wordToks.length-1;
    if(last){ t.id = sys==='emes'?'e_silluk':'sofpasuk'; return; }
    t.id = sys==='emes'? resolveEmes(codes,!!t.paseq) : resolveProse(codes,!!t.paseq);
  });
  return toks;
}

/* ---------- piano widget ---------- */
const WHITE=['C','D','E','F','G','A','B'];
function buildPiano(container, from=3, to=5){
  container.innerHTML='';
  const wrap=el('div','piano');
  for(let oct=from; oct<=to; oct++){
    WHITE.forEach(w=>{
      const key=el('div','pkey white'); key.dataset.note=w+oct;
      if(w==='C') key.appendChild(el('span','plabel','C'+oct));
      wrap.appendChild(key);
      if(['C','D','F','G','A'].includes(w)){
        const bk=el('div','pkey black'); bk.dataset.note=w+'#'+oct;
        key.appendChild(bk);
      }
    });
  }
  container.appendChild(wrap);
  wrap.addEventListener('pointerdown',e=>{
    const k=e.target.closest('.pkey'); if(!k) return;
    e.stopPropagation();
    const c=audioCtx(); if(c.state==='suspended') c.resume();
    pianoTone(noteFreq(k.dataset.note), c.currentTime, 0.5);
    flashKey(container,k.dataset.note);
  });
  return wrap;
}
function flashKey(container,note){
  const k=container.querySelector(`.pkey[data-note="${note}"]`);
  if(!k) return;
  k.classList.add('lit');
  setTimeout(()=>k.classList.remove('lit'),380);
}
function clearKeys(container){ container.querySelectorAll('.pkey.lit').forEach(k=>k.classList.remove('lit')); }
function markMotifKeys(container,seq){
  container.querySelectorAll('.pkey.inmotif').forEach(k=>k.classList.remove('inmotif'));
  seq.forEach(([n])=>{ if(!n) return;
    const k=container.querySelector(`.pkey[data-note="${n}"]`);
    if(k) k.classList.add('inmotif');
  });
}
function markTonic(container){
  container.querySelectorAll('.pkey.tonickey').forEach(k=>k.classList.remove('tonickey'));
  const t=bankTonic(state.tradition,state.system);
  if(!t) return;
  const k=container.querySelector(`.pkey[data-note="${shiftNote(t,state.transpose)}"]`);
  if(k) k.classList.add('tonickey');
}

/* ---------- views ---------- */
function render(){
  document.querySelectorAll('.nav-btn').forEach(b=>b.classList.toggle('active',b.dataset.view===state.view));
  document.querySelectorAll('.lang-btn').forEach(b=>b.classList.toggle('active',b.dataset.lang===state.lang));
  const main=$('#canvas');
  main.innerHTML='';
  ({map:viewMap, pesukim:viewPesukim, kriyos:viewKriyos, tehillim:viewTehillim,
    timeline:viewTimeline, mesoros:viewMesoros, kolos:viewKolos})[state.view](main);
  renderTopbar();
  renderRail();
}

/* ---------- top bar: Now Hearing ---------- */
const SYS_SHORT={torah:'Torah (weekly)', hnr:'Yamim Noraim', haftarah:'Haftarah', esther:'Esther', eicha:'Eicha', megillos:'3 Megillos', emes:'Tehillim/Emes'};
function setSystem(sysId){
  state.system=sysId;
  const trs=D.systemTraditions[sysId]||[];
  if(!trs.includes(state.tradition)) state.tradition=trs[0]||state.tradition;
  state.selectedSet = sysId==='emes'?'emes':'prose';
  if(sysId==='emes' && state.selected && state.selected.indexOf('e_')!==0) state.selected='e_olehveyored';
  if(sysId!=='emes' && state.selected && state.selected.indexOf('e_')===0) state.selected=null;
  render();
}
function renderTopbar(){
  const tb=$('#topbar');
  if(!tb) return;
  tb.innerHTML='';
  tb.appendChild(el('span','tb-eyebrow','Kriya'));
  const sysRow=el('span','tb-trs');
  Object.keys(SYS_SHORT).forEach(sid=>{
    if(!D.systemTraditions[sid]) return;
    const b=el('button','tr-chip'+(state.system===sid?' on':''),SYS_SHORT[sid]);
    b.onclick=()=>setSystem(sid);
    sysRow.appendChild(b);
  });
  tb.appendChild(sysRow);
  tb.appendChild(el('span','tb-eyebrow','Mesorah'));
  const bank=D.motifs[state.tradition]&&D.motifs[state.tradition][state.system];
  const grade=bank&&bank._grade;
  const trs=D.systemTraditions[state.system]||[];
  const row=el('span','tb-trs');
  if(trs.length>1){
    trs.forEach(tr=>{
      const b=el('button','tr-chip'+(state.tradition===tr?' on':''),trName(tr));
      b.onclick=()=>{state.tradition=tr;render();};
      row.appendChild(b);
    });
  } else {
    row.appendChild(el('span','tb-tr','<b>'+trName(state.tradition)+'</b>'));
  }
  tb.appendChild(row);
  if(grade) tb.appendChild(el('span','tb-grade'+(grade==='D'?' proto':''),'GRADE '+grade+(grade==='D'?' · PROTOTYPE':'')));
}

function sectionHeader(main, eyebrow, title, segs){
  const h=el('div','section-head');
  const left=el('div');
  left.appendChild(el('div','eyebrow',eyebrow));
  left.appendChild(el('h2','sec-title',title));
  h.appendChild(left);
  if(segs){
    const sc=el('div','seg');
    segs.forEach(([label,active,fn])=>{
      const b=el('button',active?'on':'',label);
      b.onclick=fn; sc.appendChild(b);
    });
    h.appendChild(sc);
  }
  main.appendChild(h);
}

/* --- MAP view --- */
function viewMap(main){
  const isEmes = state.system==='emes';
  sectionHeader(main,'The Map · מַפַּת הַטְּעָמִים',
    isEmes?'Ta\'amei Emes — the poetic system':'Ta\'amei HaMikra — the 21 books',
    [['21 Books', !isEmes, ()=>{state.system='torah';state.tradition='ashkE';state.selectedSet='prose';state.selected=null;render();}],
     ['Emes ספרי אמ״ת', isEmes, ()=>{state.system='emes';state.tradition='syr';state.selectedSet='emes';state.selected=null;render();}]]);

  const list = isEmes? D.emes : D.prose;
  const order=['emperor','king','duke','count','conj'];
  order.forEach(rk=>{
    const group=list.filter(t=>t.rank===rk);
    if(!group.length) return;
    const R=D.ranks[rk];
    const gh=el('div','rank-head');
    gh.appendChild(el('span','rank-chip',R.en));
    gh.appendChild(el('span','rank-he he-run',R.he));
    gh.appendChild(el('span','rank-note',R.note));
    main.appendChild(gh);
    const grid=el('div','taam-grid');
    group.forEach(t=>{
      const card=el('div','taam-card'+(state.selected===t.id?' sel':''));
      card.style.borderTopColor=R.color;
      card.appendChild(el('div','taam-glyph he-run',t.glyph));
      card.appendChild(el('div','taam-name',nameFor(t)));
      if(t.occur) card.appendChild(el('div','taam-occur','RARE'));
      const m=motifFor(t.id);
      if(m){
        const p=el('button','mini-play','▶');
        p.onclick=e=>{ e.stopPropagation(); selectTaam(t.id); playSelected(); };
        card.appendChild(p);
      }
      card.onclick=()=>selectTaam(t.id);
      grid.appendChild(card);
    });
    main.appendChild(grid);
  });
}

function selectTaam(id){
  state.selected=id;
  state.selectedSet = D.emes.some(t=>t.id===id)?'emes':'prose';
  if(state.selectedSet==='emes'){ state.system='emes'; state.tradition='syr'; }
  render();
}

/* --- PESUKIM view (specimens) --- */
function viewPesukim(main){
  sectionHeader(main,'Specimens · פְּסוּקִים','Real pesukim, word by word');
  main.appendChild(el('p','lede','Six specimens — one per melody system. Every word is parsed live from its Unicode ta\'am and is clickable: tap a word to hear its motif, or play the whole pasuk. Words with no motif are conjunctives recited on the tone (shown grey). Text: Miqra according to the Masorah (via Sefaria, CC-BY-SA).'));
  D.specimens.forEach(spec=>{
    const card=el('div','spec-card'+(state.system===spec.system?' sel':''));
    const head=el('div','spec-head');
    const left=el('div');
    left.appendChild(el('div','eyebrow',spec.ref+' · '+sysName(spec.system)));
    left.appendChild(el('div','spec-he he-run',spec.he));
    head.appendChild(left);
    const trs=D.systemTraditions[spec.system]||[spec.tradition];
    if(trs.length>1){
      const row=el('div','sys-trs');
      trs.forEach(tr=>{
        const b=el('button','tr-chip'+((state.system===spec.system?state.tradition:spec.tradition)===tr?' on':''),trName(tr));
        b.onclick=e=>{ e.stopPropagation(); state.system=spec.system; state.tradition=tr;
          state.selectedSet=spec.system==='emes'?'emes':'prose'; render(); };
        row.appendChild(b);
      });
      head.appendChild(row);
    }
    card.appendChild(head);
    card.appendChild(el('div','spec-note',spec.note));
    spec.verses.forEach((v,vi)=>{
      const row=el('div','verse-row');
      const num=el('button','verse-play','▶ '+(vi+1));
      num.onclick=()=>playVerse(spec,vi,row);
      row.appendChild(num);
      const vEl=el('div','verse he-run');
      const toks=parseVerse(v, spec.system==='emes'?'emes':'prose');
      toks.forEach(t=>{
        if(t.sep){ vEl.appendChild(el('span','sep','׀')); vEl.appendChild(document.createTextNode(' ')); return; }
        const w=el('span','word'+(t.id?'':' conjw'),t.text);
        w.title = t.id? (taamById(t.id)?taamById(t.id).names.ashk.se:t.id) : 'conjunctive — recited';
        w.onclick=()=>{
          state.system=spec.system; state.tradition = (state.tradition && (D.systemTraditions[spec.system]||[]).includes(state.tradition) && state.system===spec.system)? state.tradition : spec.tradition;
          if(t.id){ state.selected=t.id; state.selectedSet=spec.system==='emes'?'emes':'prose'; renderRail(); }
          playWord(t, spec, w);
        };
        vEl.appendChild(w);
        vEl.appendChild(document.createTextNode(' '));
      });
      row.appendChild(vEl);
      card.appendChild(row);
    });
    main.appendChild(card);
  });
}
function specTradition(spec){
  const trs=D.systemTraditions[spec.system]||[spec.tradition];
  return trs.includes(state.tradition)&&state.system===spec.system? state.tradition : spec.tradition;
}
function wordSeq(t, spec){
  const tr=specTradition(spec), sys=spec.system;
  if(t.id){ const s=resolveSeq(t.id,tr,sys); if(s) return s; }
  const tonic=bankTonic(tr,sys)||'D4';
  return [[tonic,0.6]]; // recited conjunctive
}
function playWord(t, spec, wEl){
  const seq=wordSeq(t,spec);
  document.querySelectorAll('.word.playing').forEach(x=>x.classList.remove('playing'));
  if(wEl) wEl.classList.add('playing');
  playSeqOnRail(seq);
  setTimeout(()=>{ if(wEl) wEl.classList.remove('playing'); }, seqSec(seq)*1000+300);
}
function seqSec(seq){ return seq.reduce((a,[,b])=>a+noteSec(b),0); }
function playVerse(spec, vi, rowEl){
  state.system=spec.system;
  state.tradition=specTradition(spec);
  renderRail();
  const toks=parseVerse(spec.verses[vi], spec.system==='emes'?'emes':'prose').filter(t=>!t.sep);
  const wEls=rowEl?[...rowEl.querySelectorAll('.word')]:[];
  let seq=[]; const marks=[];
  toks.forEach((t,i)=>{
    marks.push({at:seqSec(seq), i});
    seq=seq.concat(wordSeq(t,spec)).concat([[null,0.12]]);  // near-continuous flow between words
  });
  const sT=shiftSeq(seq,state.transpose);
  const pc=$('#railPiano');
  if(pc){ clearKeys(pc); markMotifKeys(pc,sT); }
  const token=playMotif(sT, n=>{ if(pc&&n) flashKey(pc,n); }, ()=>{
    wEls.forEach(w=>w.classList.remove('playing'));
  });
  marks.forEach(m=>setTimeout(()=>{
    if(token!==playToken) return;
    wEls.forEach(w=>w.classList.remove('playing'));
    if(wEls[m.i]) wEls[m.i].classList.add('playing');
  }, m.at*1000+60));
}

/* --- KRIYOS view --- */
function viewKriyos(main){
  sectionHeader(main,'The Six Systems · מִינֵי קְרִיאָה','One notation, many melodies');
  main.appendChild(el('p','lede','The same Tiberian signs are sung to a completely different melody-set depending on WHAT is being read. Ashkenaz counts six major systems; Sephardic and Eastern communities map differently. Select a system, then pick any ta\'am in the Map to hear it in that system.'));
  const grid=el('div','sys-grid');
  D.systems.forEach(s=>{
    const on=state.system===s.id;
    const c=el('div','sys-card'+(on?' sel':''));
    c.appendChild(el('div','sys-he he-run',s.he));
    c.appendChild(el('div','sys-en',s.en));
    c.appendChild(el('div','sys-when','<b>WHEN</b> '+s.when));
    c.appendChild(el('div','sys-char',s.character));
    const trs=D.systemTraditions[s.id];
    if(trs){
      const row=el('div','sys-trs');
      trs.forEach(tr=>{
        const b=el('button','tr-chip'+(on&&state.tradition===tr?' on':''),trName(tr));
        b.onclick=e=>{e.stopPropagation(); state.system=s.id; state.tradition=tr;
          state.selectedSet = s.id==='emes'?'emes':'prose';
          if(s.id==='emes' && state.selected && state.selected.indexOf('e_')!==0) state.selected='e_olehveyored';
          if(s.id!=='emes' && state.selected && state.selected.indexOf('e_')===0) state.selected=null;
          render();};
        row.appendChild(b);
      });
      c.appendChild(row);
    } else {
      c.appendChild(el('div','sys-nodata','melody documented · playback not yet encoded'));
    }
    if(s.id==='extras'){
      const ex=el('div','extras');
      D.extras.forEach(x=>{
        const r=el('div','extra-row');
        r.appendChild(el('span','extra-he he-run',x.he));
        r.appendChild(el('span','extra-txt','<b>'+x.title+'.</b> '+x.txt));
        ex.appendChild(r);
      });
      c.appendChild(ex);
    }
    c.onclick=()=>{ if(!trs) return;
      state.system=s.id; state.tradition=trs[0];
      state.selectedSet = s.id==='emes'?'emes':'prose';
      render(); };
    grid.appendChild(c);
  });
  main.appendChild(grid);
}

/* --- TEHILLIM view --- */
function viewTehillim(main){
  sectionHeader(main,'Special Study · תְּהִלִּים','The tunes of Tehillim');
  main.appendChild(el('p','lede',D.tehillim.intro));
  const grid=el('div','teh-grid');
  D.tehillim.facts.forEach(f=>{
    const c=el('div','teh-card');
    c.appendChild(el('div','teh-he he-run',f.he));
    c.appendChild(el('div','teh-title',f.title));
    c.appendChild(el('div','teh-txt',f.txt));
    grid.appendChild(c);
  });
  main.appendChild(grid);
  const mech=el('div','mech-box');
  mech.appendChild(el('div','eyebrow','Verse Anatomy · מִבְנֵה הַפָּסוּק'));
  mech.appendChild(el('p','',D.tehillim.mechanics));
  const btn=el('button','big-play','▶ &nbsp;Play the emes skeleton — dechi → oleh v\'yored → revia gadol → esnachta → revia mugrash → silluk');
  btn.onclick=()=>{
    const ids=['e_dechi','e_olehveyored','e_reviagadol','e_esnachta','e_reviamugrash','e_silluk'];
    const bank=D.motifs.syr.emes;
    let seq=[];
    ids.forEach(id=>{ seq=seq.concat(bank[id]).concat([[null,0.15]]); });
    playSeqOnRail(seq);
  };
  mech.appendChild(btn);
  main.appendChild(mech);
}

/* --- TIMELINE view --- */
function viewTimeline(main){
  sectionHeader(main,'Scientific Dating · תּוֹלְדוֹת','Earliest documented sources');
  main.appendChild(el('p','lede','Every entry is a dateable artifact — a text, a manuscript, a notation system, or a musical transcription. Categories: <span class="tl-key tl-text">TEXT</span> literary reference · <span class="tl-key tl-notation">SIGNS</span> notation system · <span class="tl-key tl-ms">MS</span> manuscript · <span class="tl-key tl-music">MUSIC</span> musical documentation.'));
  const tl=el('div','timeline');
  D.timeline.forEach(ev=>{
    const row=el('div','tl-row');
    const d=el('div','tl-date',ev.date);
    const body=el('div','tl-body tl-'+ev.cls);
    const head=el('div','tl-head');
    head.appendChild(el('span','tl-chip tl-'+ev.cls,{text:'TEXT',notation:'SIGNS',ms:'MS',music:'MUSIC'}[ev.cls]));
    head.appendChild(el('span','tl-he he-run',ev.he));
    head.appendChild(el('span','tl-title',ev.title));
    body.appendChild(head);
    body.appendChild(el('div','tl-txt',ev.txt));
    row.appendChild(d); row.appendChild(body);
    tl.appendChild(row);
  });
  main.appendChild(tl);
}

/* --- MESOROS view --- */
function viewMesoros(main){
  sectionHeader(main,'The Traditions · מָסוֹרוֹת','Who sings what — and since when do we know it');
  const grid=el('div','mes-grid');
  D.traditions.forEach(tr=>{
    const c=el('div','mes-card');
    c.appendChild(el('div','mes-he he-run',tr.he));
    c.appendChild(el('div','mes-en',tr.en));
    c.appendChild(el('div','mes-blurb',tr.blurb));
    const e=el('div','mes-earliest');
    e.appendChild(el('div','eyebrow','Earliest documentation · '+tr.earliest.date));
    e.appendChild(el('div','mes-src',tr.earliest.src));
    c.appendChild(e);
    if(D.motifs[tr.id]){
      const b=el('button','tr-chip on','▶ hear this tradition');
      b.onclick=()=>{
        const sys=Object.keys(D.motifs[tr.id])[0];
        state.tradition=tr.id; state.system=sys;
        state.selectedSet = sys==='emes'?'emes':'prose';
        state.selected = tr.id==='yem'? null : (sys==='emes'?'e_olehveyored':'sofpasuk');
        state.view='map'; render();
        setTimeout(()=>{ if(tr.id==='yem'){ playYemPattern('silluk'); } else { playSelected(); } },150);
      };
      c.appendChild(b);
    }
    grid.appendChild(c);
  });
  main.appendChild(grid);
}

/* --- KOLOS view (recordings) --- */
function viewKolos(main){
  sectionHeader(main,'Recordings · קוֹלוֹת','Grade-A evidence: real voices');
  main.appendChild(el('p','lede','A link-only registry — every entry streams on its source site and rights remain with the source. Fields: tradition · system · performer · date · evidence type · grade. This is the layer the synthesized motifs approximate; when they disagree, the recording wins.'));
  const grid=el('div','kolos-grid');
  D.recordings.forEach(r=>{
    const c=el('div','kolos-card');
    const head=el('div','kolos-head');
    head.appendChild(el('span','rank-chip',r.grade));
    head.appendChild(el('span','kolos-tr',r.tr+' · '+r.sys));
    c.appendChild(head);
    c.appendChild(el('div','kolos-title','<a href="'+r.url+'" target="_blank" rel="noopener">'+r.title+' ↗</a>'));
    c.appendChild(el('div','kolos-meta',r.performer+' · '+r.date+' · '+r.type));
    c.appendChild(el('div','kolos-note',r.note));
    grid.appendChild(c);
  });
  main.appendChild(grid);
}

/* ---------- right rail ---------- */
function railTraditionTabs(rail){
  const trs=D.systemTraditions[state.system]||[];
  if(trs.length<2) return;
  const row=el('div','rail-trs');
  trs.forEach(tr=>{
    const b=el('button','tr-chip'+(state.tradition===tr?' on':''),trName(tr));
    b.onclick=()=>{state.tradition=tr;render();};
    row.appendChild(b);
  });
  rail.appendChild(row);
}
function renderRail(){
  const rail=$('#rail');
  rail.innerHTML='';
  const t=state.selected?taamById(state.selected):null;

  if(!t){
    const s=el('div','rail-section');
    s.appendChild(el('div','eyebrow','Select a ta\'am'));
    s.appendChild(el('p','rail-hint','Click any card in the Map — or any word in Pesukim — to see its names, rank, and motif on the keyboard.'));
    rail.appendChild(s);
  } else {
    const R=D.ranks[t.rank];
    const s2=el('div','rail-section');
    const gl=el('div','rail-glyph he-run',t.glyph);
    gl.style.borderLeftColor=R.color;
    s2.appendChild(gl);
    s2.appendChild(el('span','rank-chip',R.en+' · '+R.he));
    const names=el('div','rail-names');
    if(t.names.ashk) names.appendChild(nameRow('Ashkenaz',t.names.ashk));
    if(t.names.sef)  names.appendChild(nameRow('Sepharad',t.names.sef));
    if(t.names.ital) names.appendChild(nameRow('Italia',t.names.ital));
    s2.appendChild(names);
    s2.appendChild(el('div','rail-block','<b>Meaning.</b> '+t.meaning));
    s2.appendChild(el('div','rail-block','<b>Function.</b> '+t.fn));
    if(t.seq) s2.appendChild(el('div','rail-block','<b>Sequence.</b> '+t.seq));
    if(t.occur) s2.appendChild(el('div','rail-block rail-occur','<b>Occurrences.</b> '+t.occur));
    rail.appendChild(s2);
  }

  /* piano + transpose */
  const s3=el('div','rail-section');
  const pHead=el('div','piano-head');
  pHead.appendChild(el('div','eyebrow','Keyboard · פְּסַנְתֵּר'));
  const tp=el('div','transp');
  const minus=el('button','tp-btn','−');
  const label=el('span','tp-label',(state.transpose>0?'+':'')+state.transpose+' st');
  const plus=el('button','tp-btn','+');
  const reset=el('button','tp-btn tp-reset','0');
  minus.onclick=()=>{ if(state.transpose>-6){state.transpose--; renderRail();} };
  plus.onclick=()=>{ if(state.transpose<6){state.transpose++; renderRail();} };
  reset.onclick=()=>{ state.transpose=0; renderRail(); };
  tp.appendChild(minus); tp.appendChild(label); tp.appendChild(plus); tp.appendChild(reset);
  /* tempo — leining pace */
  const tSlow=el('button','tp-btn','♩−');
  const tLab=el('span','tp-label',state.tempoPct+'%');
  tLab.title='Tempo — 100% = leining pace';
  const tFast=el('button','tp-btn','♩+');
  tSlow.onclick=()=>{ if(state.tempoPct>60){state.tempoPct-=10; renderRail();} };
  tFast.onclick=()=>{ if(state.tempoPct<170){state.tempoPct+=10; renderRail();} };
  tp.appendChild(tSlow); tp.appendChild(tLab); tp.appendChild(tFast);
  pHead.appendChild(tp);
  s3.appendChild(pHead);
  const pc=el('div'); pc.id='railPiano';
  s3.appendChild(pc);
  buildPiano(pc,3,5);
  markTonic(pc);
  const tonic=bankTonic(state.tradition,state.system);
  if(tonic) s3.appendChild(el('div','motif-src','Finalis '+shiftNote(tonic,state.transpose)+(state.transpose?' (from '+tonic+')':'')+' — marked on the keyboard.'));
  const m = t? motifFor(t.id) : null;
  if(m){
    const sT=shiftSeq(m.seq,state.transpose);
    markMotifKeys(pc,sT);
    s3.appendChild(el('div','motif-notes',sT.filter(x=>x[0]).map(x=>x[0]).join(' · ')));
    const srcBank=D.motifs[m.tr][m.sys];
    const grade=srcBank._grade||'E';
    if(grade==='C') s3.appendChild(el('div','grade-warn','GRADE C — pedagogic approximation, not verified against a named ba\'al koreh or recording.'));
    if(grade==='D'||grade==='E') s3.appendChild(el('div','grade-proto','GRADE '+grade+' — PROTOTYPE: schematic reconstruction, not authentic trup. See Kolos for real recordings.'));
    if(srcBank._note) s3.appendChild(el('div','motif-src',srcBank._note));
    if(m.tr!==state.tradition||m.sys!==state.system)
      s3.appendChild(el('div','motif-src motif-warn','No motif encoded for '+trName(state.tradition)+' / '+sysName(state.system)+' — showing '+trName(m.tr)+' / '+sysName(m.sys)+'.'));
    const b=el('button','big-play'+(grade==='D'||grade==='E'?' proto':''),'▶ &nbsp;Play motif'+(grade==='B'||grade==='A'?'':' ('+grade+')'));
    b.onclick=playSelected;
    s3.appendChild(b);
    /* staff notation + MIDI (abcjs — melody-as-ABC, TropeTrainer-style) */
    if(window.ABCJS){
      const name=(t.names.ashk?t.names.ashk.se:t.id)+' — '+trName(m.tr)+' / '+sysName(m.sys);
      const abc=seqToABC(sT, name);
      const nb=el('div','notation-box'); nb.id='notationBox';
      s3.appendChild(nb);
      try{ ABCJS.renderAbc(nb, abc, {responsive:'resize', scale:.85, paddingtop:0, paddingbottom:2, paddingleft:0, paddingright:0}); }
      catch(e){ nb.remove(); }
      const mb=el('button','midi-btn','⬇ Download MIDI');
      mb.onclick=()=>downloadMidi(abc, t.id+'-'+m.tr+'-'+m.sys+'.mid');
      s3.appendChild(mb);
    }
  } else if(t){
    s3.appendChild(el('div','motif-src','No documented motif encoded yet for this ta\'am in the selected system. Tap the keys to explore.'));
  } else {
    s3.appendChild(el('div','motif-src','Tap the keys, or select a ta\'am to load its motif.'));
  }
  rail.appendChild(s3);

  /* phrases */
  const phrases = state.system==='emes'? D.phrases.emes : D.phrases.prose;
  const sp=el('div','rail-section');
  sp.appendChild(el('div','eyebrow','Phrases · צֵרוּפִים'));
  sp.appendChild(el('p','rail-hint','A ta\'am lives in a phrase, not alone — play the common chains in the current system.'));
  phrases.forEach(ph=>{
    const row=el('div','name-row');
    const b=el('button','mini-play','▶');
    b.style.position='static';
    b.onclick=()=>{
      let seq=[];
      ph.ids.forEach(id=>{ const s=resolveSeq(id,state.tradition,state.system); if(s) seq=seq.concat(s).concat([[null,0.12]]); });
      if(seq.length) playSeqOnRail(seq);
    };
    row.appendChild(b);
    const lab=el('span','name-se',ph.en);
    lab.title=ph.he;
    row.appendChild(lab);
    sp.appendChild(row);
  });
  rail.appendChild(sp);

  /* Yemenite pattern bank */
  if(state.tradition==='yem' && D.motifs.yem && D.motifs.yem.torah._labels){
    const sy=el('div','rail-section');
    sy.appendChild(el('div','eyebrow','The Eight Yemenite Motifs · שְׁמוֹנָה נִגּוּנִים'));
    sy.appendChild(el('p','rail-hint','Yemenite kriah assigns motifs to disjunctive CLASSES, not individual signs — the living shape of the Babylonian eight-break system.'));
    const labels=D.motifs.yem.torah._labels;
    Object.keys(labels).forEach(key=>{
      const row=el('div','name-row');
      const b=el('button','mini-play','▶');
      b.style.position='static';
      b.onclick=()=>playYemPattern(key);
      row.appendChild(b);
      row.appendChild(el('span','name-se',labels[key]));
      sy.appendChild(row);
    });
    rail.appendChild(sy);
  }

  const s4=el('div','rail-section');
  s4.appendChild(el('div','eyebrow','Method'));
  s4.appendChild(el('div','rail-disclaimer',D.disclaimer));
  rail.appendChild(s4);
}
function nameRow(label,n){
  const r=el('div','name-row');
  r.appendChild(el('span','name-lab',label));
  r.appendChild(el('span','name-he he-run',n.he));
  r.appendChild(el('span','name-se',n.se));
  return r;
}
function playYemPattern(key){
  const seq=D.motifs.yem.torah[key];
  if(!seq || typeof seq==='string') return;
  playSeqOnRail(seq);
}
function playSelected(){
  if(!state.selected) return;
  const m=motifFor(state.selected);
  if(!m) return;
  playSeqOnRail(m.seq);
}

/* ---------- boot ---------- */
document.querySelectorAll('.nav-btn').forEach(b=>b.onclick=()=>{stopAll();state.view=b.dataset.view;render();});
document.querySelectorAll('.lang-btn').forEach(b=>b.onclick=()=>{state.lang=b.dataset.lang;render();});
render();
window.TRUP_DEBUG={parseVerse,resolveSeq,shiftNote,seqToABC,state};
})();
