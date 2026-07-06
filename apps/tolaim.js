/* ============================================================================
   Tolaim in Food — render logic (vanilla JS), haftarah-style skin.
   Adds: to-scale life-stage diagrams (SVG), coin/credit-card calibration for a
   true on-screen magnification readout, real photos via GBIF media, and a
   click-to-define glossary. Places each creature in its sugya category; the
   machlokes is left to the poskim.
   ========================================================================== */
(function(){
  const D = window.TOLAIM_DATA, ST = window.TOLAIM_STAGES||{}, G = window.TOLAIM_GLOSSARY||{};
  const DEFAULT_PXMM = 96/25.4;
  const state = {
    cat:"all", lang:"en", openId:null,
    pxmm: parseFloat(localStorage.getItem("tolaim_pxmm")) || DEFAULT_PXMM,
    calibrated: !!localStorage.getItem("tolaim_pxmm"),
    calOpen:false, calMode:"penny"
  };
  const PENNY_MM = 19.05, CARD_MM = 85.60;

  const $ = s => document.querySelector(s);
  const escRaw = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  /* ---------- glossary ---------- */
  const glossKey = w => {
    w = w.toLowerCase();
    if(G[w]) return w;
    for(const suf of ["ing","ed","es","s","e"]){ if(w.endsWith(suf)){ const b=w.slice(0,-suf.length); if(G[b]) return b; } }
    return null;
  };
  function gloss(raw){
    raw = String(raw==null?"":raw);
    let out="", last=0, used=new Set();
    const re=/[A-Za-z][A-Za-z-]*/g; let m;
    while((m=re.exec(raw))){
      out += escRaw(raw.slice(last, m.index));
      const w=m[0], k=glossKey(w);
      if(k && !used.has(k)){ used.add(k); out += `<span class="gl" data-term="${k}">${escRaw(w)}</span>`; }
      else out += escRaw(w);
      last = m.index + w.length;
    }
    out += escRaw(raw.slice(last));
    return out;
  }
  const esc = escRaw;

  const ALL=[]; D.categories.forEach(c=>c.nodes.forEach(n=>ALL.push(Object.assign({_cat:c.id,_catName:c.name},n))));
  const originLabel = o => o.startsWith("born")?"Born in place":o.startsWith("crawled")?"From outside":"Contested";
  const originClass = o => o.startsWith("born")?"b-born":(o==="crawled-in"||o==="crawled-in / mixed")?"b-crawled":"b-contested";

  function refUrl(ref){
    let m=ref.match(/Chullin\s+(\d+[ab])/); if(m) return "https://www.sefaria.org/Chullin."+m[1];
    m=ref.match(/YD\s+84:(\d+)/); if(m) return "https://www.sefaria.org/Shulchan_Arukh,_Yoreh_De'ah.84."+m[1];
    if(/YD\s+84/.test(ref)) return "https://www.sefaria.org/Shulchan_Arukh,_Yoreh_De'ah.84";
    return null;
  }

  /* ---------- SVG shape library (each returns {vb, svg}) ---------- */
  const SHAPES = {
    egg:()=>({vb:"0 0 100 72",svg:'<ellipse cx="50" cy="36" rx="47" ry="33" fill="#e7d9a2" stroke="#c9b365" stroke-width="2"/><ellipse cx="38" cy="26" rx="14" ry="9" fill="#f2e9c6" opacity=".6"/>'}),
    nauplius:()=>({vb:"0 0 100 72",svg:'<ellipse cx="52" cy="38" rx="34" ry="26" fill="#a7c6b1" stroke="#6f957f" stroke-width="2"/><path d="M20 30 L2 14 M18 40 L0 44 M24 52 L10 66" stroke="#6f957f" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="40" cy="34" r="4" fill="#3f5a49"/>'}),
    copepod:()=>({vb:"0 0 100 64",svg:'<path d="M20 32 Q40 8 66 22 Q86 32 66 42 Q40 56 20 32 Z" fill="#9ec9b4" stroke="#5f8f78" stroke-width="2"/><path d="M22 30 L2 18 M22 34 L2 30" stroke="#5f8f78" stroke-width="2.5" stroke-linecap="round"/><path d="M78 26 L96 20 M78 38 L96 44" stroke="#5f8f78" stroke-width="2" stroke-linecap="round"/><circle cx="80" cy="26" r="5" fill="#d98c5f"/><circle cx="80" cy="40" r="5" fill="#d98c5f"/><circle cx="40" cy="30" r="3.5" fill="#33463c"/>'}),
    wriggler:()=>({vb:"0 0 100 64",svg:'<path d="M14 20 Q6 40 24 46 Q46 52 52 34 Q58 18 78 24 Q92 28 90 44" fill="none" stroke="#b7a98b" stroke-width="12" stroke-linecap="round"/><circle cx="16" cy="20" r="8" fill="#9a8c6d"/><line x1="90" y1="44" x2="96" y2="52" stroke="#9a8c6d" stroke-width="4" stroke-linecap="round"/>'}),
    maggot:()=>({vb:"0 0 100 56",svg:'<path d="M6 28 Q10 12 40 12 Q80 12 96 28 Q80 44 40 44 Q10 44 6 28 Z" fill="#f0e6cf" stroke="#d0bf95" stroke-width="2"/><path d="M52 14 V42 M64 15 V41 M76 17 V39 M40 13 V43" stroke="#d0bf95" stroke-width="1.6"/><circle cx="12" cy="28" r="3" fill="#b09a63"/>'}),
    grub:()=>({vb:"0 0 100 60",svg:'<rect x="8" y="14" width="84" height="32" rx="16" fill="#e7d7b0" stroke="#c3ac78" stroke-width="2"/><path d="M26 14 V46 M40 14 V46 M54 14 V46 M68 14 V46 M80 15 V45" stroke="#c3ac78" stroke-width="2"/><circle cx="86" cy="24" r="2" fill="#6b5a34"/><circle cx="86" cy="36" r="2" fill="#6b5a34"/>'}),
    fly:()=>({vb:"0 0 100 78",svg:'<ellipse cx="52" cy="39" rx="30" ry="17" fill="#cfd6dd" opacity=".8" transform="rotate(-18 52 39)"/><ellipse cx="52" cy="39" rx="30" ry="17" fill="#cfd6dd" opacity=".8" transform="rotate(18 52 39)"/><ellipse cx="38" cy="39" rx="14" ry="11" fill="#5b6470"/><ellipse cx="62" cy="39" rx="18" ry="9" fill="#6b7683"/><circle cx="24" cy="39" r="9" fill="#454c56"/><circle cx="21" cy="35" r="2.6" fill="#b03a2e"/><path d="M20 33 L10 26 M20 45 L10 52" stroke="#454c56" stroke-width="2" stroke-linecap="round"/>'}),
    pupa:()=>({vb:"0 0 100 58",svg:'<path d="M12 29 Q14 12 40 12 Q78 12 92 24 Q96 29 92 34 Q78 46 40 46 Q14 46 12 29 Z" fill="#b08a5a" stroke="#8c6a3f" stroke-width="2"/><path d="M40 13 V45 M54 13 V45 M66 15 V43 M78 18 V40" stroke="#8c6a3f" stroke-width="1.5"/>'}),
    nematode:()=>({vb:"0 0 100 34",svg:'<path d="M4 18 Q34 1 64 13 Q86 21 96 15 Q90 26 64 22 Q34 33 4 18 Z" fill="#dcb78d" stroke="#b78a5f" stroke-width="1.6"/><circle cx="8" cy="18" r="2.4" fill="#8f6a45"/>'}),
    spore:()=>({vb:"0 0 100 78",svg:'<ellipse cx="50" cy="39" rx="26" ry="35" fill="#cdd7e0" stroke="#8aa0b4" stroke-width="2"/><circle cx="42" cy="20" r="5" fill="#7d93a8"/><circle cx="58" cy="20" r="5" fill="#7d93a8"/><path d="M42 24 Q50 46 46 60 M58 24 Q52 46 54 60" fill="none" stroke="#9db0c1" stroke-width="2"/>'}),
    cyst:()=>({vb:"0 0 100 100",svg:'<circle cx="50" cy="50" r="44" fill="#eef2f6" stroke="#9fb0bf" stroke-width="2.5"/><path d="M50 50 m0 0 q18 -6 12 12 q-6 18 -22 8 q-16 -12 4 -24 q22 -14 30 8" fill="none" stroke="#b06a4a" stroke-width="4" stroke-linecap="round"/>'}),
    aphid:()=>({vb:"0 0 100 78",svg:'<ellipse cx="54" cy="42" rx="34" ry="26" fill="#9bbf7a" stroke="#6f9451" stroke-width="2"/><circle cx="24" cy="40" r="10" fill="#8ab069"/><path d="M18 34 L4 24 M18 46 L4 54" stroke="#4f6b39" stroke-width="2" stroke-linecap="round"/><path d="M40 66 L34 76 M54 68 L52 78 M68 66 L74 76" stroke="#4f6b39" stroke-width="2.4" stroke-linecap="round"/><path d="M82 30 L94 22 M82 40 L96 40" stroke="#6f9451" stroke-width="3" stroke-linecap="round"/>'}),
    beetle:()=>({vb:"0 0 100 78",svg:'<ellipse cx="52" cy="42" rx="30" ry="27" fill="#6b4f3a" stroke="#402f22" stroke-width="2"/><line x1="52" y1="16" x2="52" y2="68" stroke="#402f22" stroke-width="2.5"/><ellipse cx="26" cy="38" rx="13" ry="12" fill="#5a4230"/><circle cx="14" cy="36" r="8" fill="#3e2d20"/><path d="M10 30 L2 22 M10 42 L2 48" stroke="#3e2d20" stroke-width="2.4" stroke-linecap="round"/><path d="M34 66 L30 76 M52 69 L52 78 M70 66 L74 76" stroke="#402f22" stroke-width="2.4" stroke-linecap="round"/>'}),
    caterpillar:()=>({vb:"0 0 100 56",svg:'<path d="M8 30 Q10 14 26 14 L74 14 Q94 14 94 30 Q94 44 74 44 L26 44 Q8 44 8 30 Z" fill="#b9c48a" stroke="#8a9860" stroke-width="2"/><path d="M26 14 V44 M40 14 V44 M54 14 V44 M68 14 V44" stroke="#8a9860" stroke-width="1.8"/><circle cx="84" cy="30" r="3" fill="#4b5233"/><path d="M22 44 L20 52 M40 44 L40 52 M58 44 L58 52 M76 44 L78 52" stroke="#8a9860" stroke-width="2" stroke-linecap="round"/>'}),
    moth:()=>({vb:"0 0 100 78",svg:'<path d="M50 39 L10 12 Q2 22 14 34 Q4 40 14 50 L50 39 Z" fill="#b7a48c" stroke="#8b775c" stroke-width="1.6"/><path d="M50 39 L90 12 Q98 22 86 34 Q96 40 86 50 L50 39 Z" fill="#b7a48c" stroke="#8b775c" stroke-width="1.6"/><ellipse cx="50" cy="39" rx="7" ry="20" fill="#6b5a45"/><path d="M50 20 L42 6 M50 20 L58 6" stroke="#6b5a45" stroke-width="2.4" stroke-linecap="round"/>'}),
    fluke:()=>({vb:"0 0 100 60",svg:'<path d="M12 30 Q22 8 50 8 Q92 8 92 30 Q92 52 50 52 Q22 52 12 30 Z" fill="#9c6b4a" stroke="#6f4a30" stroke-width="2"/><path d="M22 30 Q40 18 52 30 Q40 42 22 30 Z" fill="#7a5238"/><path d="M52 20 Q70 24 74 30 Q70 36 52 40" fill="none" stroke="#6f4a30" stroke-width="1.6"/>'})
  };
  function shapeSvg(shape, longPx){
    const s = SHAPES[shape] ? SHAPES[shape]() : SHAPES.egg();
    const vb = s.vb.split(" ").map(Number); const asp = vb[3]/vb[2];
    const w = Math.max(4, longPx), h = w*asp;
    return `<svg class="crv" viewBox="${s.vb}" width="${w.toFixed(1)}" height="${h.toFixed(1)}" preserveAspectRatio="xMidYMid meet">${s.svg}</svg>`;
  }

  /* ---------- magnification helpers ---------- */
  const MAG_PX = 92; // on-screen long-edge for the magnified diagram
  function fmt(x){ if(x>=100) return Math.round(x/10)*10; if(x>=10) return Math.round(x); return Number(x.toPrecision(2)); }
  function magLabel(mm){
    const shownMm = MAG_PX/state.pxmm, f = shownMm/mm;
    if(f>=1.3) return "≈ "+fmt(f)+"× life size";
    if(f<=0.77) return "≈ "+fmt(1/f)+"× smaller than life";
    return "≈ life size";
  }
  function scaleSection(n){
    const info = ST[n.id]; if(!info) return "";
    const pxmm = state.pxmm;
    const pennyPx = PENNY_MM*pxmm;
    // to-scale strip: penny + each stage at true size
    let strip = `<div class="scale-item"><div class="penny" style="width:${pennyPx.toFixed(0)}px;height:${pennyPx.toFixed(0)}px"></div><div class="si-lbl">penny · 19 mm</div></div>`;
    info.stages.forEach(s=>{
      let vis;
      if(s.notScale){ vis = `<div class="tiny-note">✂ reaches metres —<br>not shown to scale</div>`; }
      else { const px=s.mm*pxmm; vis = px<2.5 ? `<div class="microdot" title="microscopic"></div>` : shapeSvg(s.shape, px); }
      strip += `<div class="scale-item">${vis}<div class="si-lbl">${esc(s.label)}<br><b>${s.mm>=1?s.mm+" mm":(s.mm*1000)+" µm"}</b></div></div>`;
    });
    // magnified diagrams (uniform on-screen size, each with its own magnification)
    let mag = info.stages.map(s=>{
      const lbl = s.notScale ? "adult reaches metres" : magLabel(s.mm);
      return `<div class="mag-item">${shapeSvg(s.shape, MAG_PX)}<div class="mag-lbl">${esc(s.label)}</div><div class="mag-x">${lbl}</div></div>`;
    }).join("");
    const calState = state.calibrated
      ? `screen calibrated · 1 mm = ${state.pxmm.toFixed(1)} px`
      : `using a typical-screen estimate — <a href="#" data-cal-open="1">calibrate for a true reading</a>`;
    return `<div class="box-label tekh mt">Life stages &amp; real size</div>` +
      `<div class="stage-note">${gloss(info.note)}</div>` +
      `<div class="scale-strip" id="strip-${n.id}">${strip}</div>` +
      `<div class="mag-grid">${mag}</div>` +
      `<div class="cal-state">${calState}</div>`;
  }

  /* ---------- GBIF: taxonomy + occurrence + media ---------- */
  const GBIF = {copepods:{name:"Cyclops",phylum:"Arthropoda"},mosquito:{name:"Culex pipiens"},blackfly:{name:"Simulium"},anisakis:{name:"Anisakis simplex"},tapeworm:{name:"Diphyllobothrium latum"},myxo:{name:"Kudoa thyrsites"},aphids:{name:"Aphididae"},leafminer:{name:"Liriomyza"},"legume-weevil":{name:"Callosobruchus maculatus"},swd:{name:"Drosophila suzukii"},vinegarfly:{name:"Drosophila melanogaster"},codling:{name:"Cydia pomonella"},driedfig:{name:"Ephestia"},warble:{name:"Hypoderma bovis"},fasciola:{name:"Fasciola hepatica"},cysticercus:{name:"Taenia saginata"},vinegareels:{name:"Turbatrix aceti"},juiceflies:{name:"Drosophila melanogaster"}};
  const taxCache=new Map(), mediaCache=new Map();
  async function fetchTax(id){
    if(taxCache.has(id)) return taxCache.get(id);
    const q=GBIF[id]; let res;
    if(!q){ res={ok:false}; taxCache.set(id,res); return res; }
    try{
      const m=await fetch("https://api.gbif.org/v1/species/match?"+new URLSearchParams(q)).then(r=>r.json());
      if(!m||m.matchType==="NONE"||!m.usageKey||m.usageKey===1||m.rank==="KINGDOM"){ res={ok:false}; }
      else{ let count=null; try{count=(await fetch("https://api.gbif.org/v1/occurrence/search?limit=0&taxonKey="+m.usageKey).then(r=>r.json())).count;}catch(e){} res={ok:true,m,count}; }
    }catch(e){ res={ok:false,net:true}; }
    taxCache.set(id,res); return res;
  }
  function medImg(u){ return u && u.indexOf("inaturalist-open-data")>-1 ? u.replace("/original.","/medium.") : u; }
  async function fetchMedia(key){
    if(mediaCache.has(key)) return mediaCache.get(key);
    let out=[];
    try{
      const r=await fetch("https://api.gbif.org/v1/occurrence/search?mediaType=StillImage&limit=20&taxonKey="+key).then(r=>r.json());
      const byStage={};
      (r.results||[]).forEach(o=>{
        const im=(o.media||[])[0]; if(!im||!im.identifier) return;
        const stage=(o.lifeStage||"").trim()||"—";
        if(byStage[stage]) return;
        byStage[stage]={stage, url:medImg(im.identifier), creator:im.creator||im.rightsHolder||"unknown", license:(im.license||"").replace("http://creativecommons.org/licenses/","CC ").replace("https://creativecommons.org/licenses/","CC ").replace(/\/.*$/,"").toUpperCase(), ref:im.references||o.references||("https://www.gbif.org/occurrence/"+o.key)};
      });
      const order=["Adult","Imago","Larva","Nymph","Pupa","Egg","—"];
      out=Object.values(byStage).sort((a,b)=>(order.indexOf(a.stage)+99*(order.indexOf(a.stage)<0))-(order.indexOf(b.stage)+99*(order.indexOf(b.stage)<0))).slice(0,4);
    }catch(e){}
    mediaCache.set(key,out); return out;
  }
  function renderTaxBox(r){
    if(!r.ok) return `<div class="gbif-fail">Live GBIF data unavailable right now.</div>`;
    const m=r.m, rows=[["Phylum",m.phylum],["Class",m.class],["Order",m.order],["Family",m.family],["Genus",m.genus]].filter(x=>x[1]);
    const chips=rows.map(x=>`<span class="tax"><b>${x[0]}</b> ${esc(x[1])}</span>`).join("");
    const cnt=r.count!=null?Number(r.count).toLocaleString():"—";
    return `<div class="gbif-name">${esc(m.canonicalName)} <span class="gbif-rank">${esc((m.rank||"").toLowerCase())}</span></div>`+
      `<div class="taxrow">${chips}</div>`+
      `<div class="gbif-meta"><span class="gcount"><b>${cnt}</b> occurrence records worldwide</span>`+
      `<a class="glink" href="https://www.gbif.org/species/${m.usageKey}" target="_blank" rel="noreferrer">GBIF taxon page ↗</a></div>`;
  }
  function renderPhotos(list){
    if(!list||!list.length) return `<div class="gbif-fail">No public photo available for this taxon.</div>`;
    return `<div class="photorow">`+list.map(p=>
      `<figure class="photo"><a href="${esc(p.ref)}" target="_blank" rel="noreferrer"><img loading="lazy" src="${esc(p.url)}" alt="${esc(p.stage)}" onerror="this.closest('figure').style.display='none'"></a>`+
      `<figcaption>${esc(p.stage)} · © ${esc(p.creator)}${p.license?" · "+esc(p.license):""}</figcaption></figure>`).join("")+`</div>`;
  }
  async function loadLiveInto(id, key0){
    const r = await fetchTax(id);
    if(state.openId!==id) return;
    const tb=document.getElementById("tax-"+id); if(tb) tb.innerHTML=renderTaxBox(r);
    if(r.ok){
      const list=await fetchMedia(r.m.usageKey);
      if(state.openId!==id) return;
      const pb=document.getElementById("ph-"+id); if(pb) pb.innerHTML=renderPhotos(list);
    } else { const pb=document.getElementById("ph-"+id); if(pb) pb.innerHTML=renderPhotos([]); }
  }

  /* ---------- source block ---------- */
  function sourceBlock(s){
    const L=state.lang, url=refUrl(s.ref);
    let sub=""; if(L==="se") sub=`<div class="src-tr">${esc(s.se)}</div>`; else if(L==="en") sub=`<div class="src-en">${gloss(s.en)}</div>`;
    const ref=url?`<a class="src-ref" href="${url}" target="_blank" rel="noreferrer">${esc(s.ref)} ↗</a>`:`<span class="src-ref">${esc(s.ref)}</span>`;
    return `<div class="srcbox"><div class="src-he heb" dir="rtl">${esc(s.he)}</div>${sub}${ref}</div>`;
  }

  /* ---------- card ---------- */
  function card(n){
    const open=n.id===state.openId;
    const gm={A:"the source describes essentially this case",B:"clear thematic fit",C:"fits with a caveat",D:"analogical",E:"the science challenges the assumption"};
    const head=`<div class="card-head" data-id="${n.id}"><div class="row1"><span class="nm">${esc(n.name.en)}</span><span class="nm-he heb" dir="rtl">${esc(n.name.he)}</span></div>`+
      `<div class="org">${esc(n.organism)}</div>`+
      `<div class="badges"><span class="badge ${originClass(n.origin)}">${originLabel(n.origin)}</span>`+
      (n.waterType?`<span class="badge b-wt">${esc(n.waterType)}</span>`:``)+`<span class="badge b-grade">Match ${n.grade}</span></div>`+
      `<div class="sugyacat">${esc(n.sugyaCase)}</div>`+
      `<div class="toggle">${open?"▾ Hide":"▸ Stages, size, photos, sources &amp; the she’eilah"}</div></div>`;
    if(!open) return `<div class="card">${head}</div>`;
    let tesh=""; if(n.teshuvot&&n.teshuvot.length){ tesh=`<div class="teshbox"><div class="box-label gold">Contemporary teshuvos &amp; discussions</div><div class="tesh-note">Primary sources above; these later responsa are cited, not adjudicated.</div>`+n.teshuvot.map(x=>`<a class="tlink" href="${esc(x.u)}" target="_blank" rel="noreferrer">${esc(x.t)} ↗</a>`).join("")+`</div>`; }
    const detail=`<div class="detail">`+
      `<div class="blk">${gloss(n.biology)}</div>`+
      scaleSection(n)+
      `<div class="box-label tekh mt">Photographs · live from GBIF / iNaturalist</div><div id="ph-${n.id}" class="photobox"><span class="gbif-load">Looking for photos…</span></div>`+
      `<div class="gbifbox"><div class="box-label tekh">Taxonomy &amp; records · GBIF</div><div id="tax-${n.id}"><span class="gbif-load">Querying GBIF…</span></div></div>`+
      (n.exclusivity?`<div class="blk sub"><b>Water-body exclusivity.</b> ${gloss(n.exclusivity)}</div>`:``)+
      `<div class="blk"><b>How it maps to the sugya.</b> ${gloss(n.match)}</div>`+
      `<div class="box-label tekh mt">In the Gemara &amp; Shulchan Aruch</div>`+ n.sources.map(sourceBlock).join("")+ tesh+
      `<div class="qbox"><div class="box-label maroon">The she’eilah — left to the poskim</div><div class="blk">${gloss(n.question)}</div><div class="grade-note"><b>Match ${n.grade}</b> — ${gm[n.grade]||""}</div></div>`+
      `</div>`;
    return `<div class="card open">${head}${detail}</div>`;
  }

  /* ---------- calibration UI ---------- */
  function calBox(){
    const isCard=state.calMode==="card", ref=isCard?CARD_MM:PENNY_MM;
    const w=(ref*state.pxmm);
    const minW=isCard?120:30, maxW=isCard?900:340;
    const shape=isCard?`<div class="cal-card" style="width:${w.toFixed(0)}px"></div>`:`<div class="cal-penny" style="width:${w.toFixed(0)}px;height:${w.toFixed(0)}px"></div>`;
    if(!state.calOpen) return `<button class="pill cal-toggle" data-cal-open="1">📏 Calibrate screen${state.calibrated?" ✓":""}</button>`;
    return `<div class="calpanel"><div class="cal-hd"><b>Calibrate to your screen</b> <button class="cal-x" data-cal-open="0">close</button></div>`+
      `<div class="cal-inst">Hold a real ${isCard?"credit card":"penny"} against the screen and drag the slider until the ${isCard?"card":"circle"} matches its size. Then every diagram shows a true magnification.</div>`+
      `<div class="cal-modes"><button class="langpill ${!isCard?"on":""}" data-cal-mode="penny">Penny</button><button class="langpill ${isCard?"on":""}" data-cal-mode="card">Credit card</button></div>`+
      `<div class="cal-preview">${shape}</div>`+
      `<input type="range" class="cal-slider" data-cal-slider="1" min="${minW}" max="${maxW}" value="${w.toFixed(0)}" step="1">`+
      `<div class="cal-read" id="cal-read">1 mm = <b>${state.pxmm.toFixed(2)} px</b>${state.calibrated?" · calibrated":" · estimate"}</div>`+
      `<button class="pill cal-reset" data-cal-reset="1">Reset to default</button></div>`;
  }

  /* ---------- controls + list ---------- */
  function renderControls(){
    const cats=[["all","All"]].concat(D.categories.map(c=>[c.id,c.name.en]));
    const catPills=cats.map(([id,l])=>`<button class="pill ${state.cat===id?"on":""}" data-cat="${id}">${esc(l)}</button>`).join("");
    const langs=[["he","עברית"],["se","Transliteration"],["en","English"]];
    const langPills=langs.map(([id,l])=>`<button class="langpill ${state.lang===id?"on":""}" data-lang="${id}">${esc(l)}</button>`).join("");
    $("#controls").innerHTML=`<div class="catrow">${catPills}</div><div class="langrow"><span class="langlbl">Source text:</span>${langPills}</div><div class="calrow">${calBox()}</div>`;
  }
  function renderList(){
    let html="";
    if(state.cat==="all"){
      D.categories.forEach(c=>{ html+=`<div class="sec-head"><span class="sec-he heb" dir="rtl">${esc(c.name.he)}</span><span class="sec-en">${esc(c.name.en)}</span></div><div class="sec-lead">${gloss(c.lead)}</div>`+c.nodes.map(n=>card(Object.assign({_cat:c.id,_catName:c.name},n))).join(""); });
    } else { const c=D.categories.find(x=>x.id===state.cat); html+=`<div class="sec-lead solo">${gloss(c.lead)}</div>`+c.nodes.map(n=>card(Object.assign({_cat:c.id,_catName:c.name},n))).join(""); }
    $("#list").innerHTML=html;
    if(state.openId){ const key=null; loadLiveInto(state.openId); }
  }
  function updateScale(){
    if(!state.openId) return;
    const n=ALL.find(x=>x.id===state.openId); if(!n) return;
    // re-render just the scale section by replacing it
    const card=document.querySelector(".card.open .detail"); // not robust; re-render list instead is heavy — target strip+mag
    const host=document.getElementById("strip-"+n.id);
    if(host && host.parentNode){
      // rebuild the whole scale block: find the label before strip and mags after — simplest: re-render list
      renderList();
    }
  }
  function render(){ renderControls(); renderList(); }

  /* ---------- glossary popover ---------- */
  let pop;
  function showGloss(el){
    const k=el.dataset.term, def=G[k]; if(!def) return;
    if(!pop){ pop=document.createElement("div"); pop.className="gloss-pop"; document.body.appendChild(pop); }
    pop.innerHTML=`<b>${esc(el.textContent)}</b><br>${esc(def)}`;
    pop.style.display="block";
    const r=el.getBoundingClientRect(), pw=Math.min(280, window.innerWidth-20);
    pop.style.width=pw+"px";
    let left=r.left+window.scrollX; if(left+pw>window.scrollX+window.innerWidth-10) left=window.scrollX+window.innerWidth-pw-10;
    pop.style.left=Math.max(window.scrollX+8,left)+"px";
    pop.style.top=(r.bottom+window.scrollY+6)+"px";
  }
  function hideGloss(){ if(pop) pop.style.display="none"; }

  /* ---------- events ---------- */
  document.addEventListener("click", e=>{
    const g=e.target.closest(".gl"); if(g){ e.stopPropagation(); showGloss(g); return; }
    hideGloss();
    const co=e.target.closest("[data-cal-open]"); if(co){ e.preventDefault(); state.calOpen=co.dataset.calOpen==="1"; renderControls(); return; }
    const cm=e.target.closest("[data-cal-mode]"); if(cm){ state.calMode=cm.dataset.calMode; renderControls(); return; }
    const cr=e.target.closest("[data-cal-reset]"); if(cr){ localStorage.removeItem("tolaim_pxmm"); state.pxmm=DEFAULT_PXMM; state.calibrated=false; renderControls(); if(state.openId) renderList(); return; }
    const cat=e.target.closest("[data-cat]"); if(cat){ state.cat=cat.dataset.cat; state.openId=null; render(); return; }
    const lang=e.target.closest("[data-lang]"); if(lang){ state.lang=lang.dataset.lang; renderList(); return; }
    const head=e.target.closest(".card-head"); if(head){ state.openId=(state.openId===head.dataset.id)?null:head.dataset.id; renderList(); return; }
  });
  document.addEventListener("input", e=>{
    const sl=e.target.closest("[data-cal-slider]"); if(!sl) return;
    const ref=state.calMode==="card"?CARD_MM:PENNY_MM;
    state.pxmm=Math.max(0.5, parseFloat(sl.value)/ref);
    const prev=document.querySelector(".cal-penny,.cal-card"); if(prev){ prev.style.width=sl.value+"px"; if(prev.classList.contains("cal-penny")) prev.style.height=sl.value+"px"; }
    const rd=document.getElementById("cal-read"); if(rd) rd.innerHTML=`1 mm = <b>${state.pxmm.toFixed(2)} px</b> · adjusting…`;
  });
  document.addEventListener("change", e=>{
    const sl=e.target.closest("[data-cal-slider]"); if(!sl) return;
    localStorage.setItem("tolaim_pxmm", String(state.pxmm)); state.calibrated=true;
    renderControls(); if(state.openId) renderList();
  });
  window.addEventListener("resize", hideGloss);

  render();
})();
