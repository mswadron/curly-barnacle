/* Rashi study guide: render logic (vanilla JS).
   Data files: laaz-<Book>.js (window.RASHI_LAAZ), rashi-grammar.js, rashi-method.js, rashi-targum.js.
   Notes and "wrong card" flags: saved to the reader's account when the page runs as a Claude artifact,
   otherwise to this browser's storage. */
(function(){
  const D = window.RASHI_BERESHIT, L = window.RASHI_LAAZ || {}, MT = window.RASHI_METHOD || [], GR = window.RASHI_GRAMMAR || [], TGM = window.RASHI_TARGUM || [];
  const BOOKS = [["Genesis","בראשית","Bereshit"],["Exodus","שמות","Shemot"],["Leviticus","ויקרא","Vayikra"],["Numbers","במדבר","Bamidbar"],["Deuteronomy","דברים","Devarim"]];
  const SEC = Object.fromEntries(D.sections.map(s => [s.id, s]));
  const state = { view:"all", book:"Genesis", par:null, kind:"all", q:"", showEn:true, showEs:false, openId:null };
  const $ = s => document.querySelector(s);
  const esc = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;");
  const refUrl = r => "https://www.sefaria.org/" + r.replace(/ /g,"_").replace(/_(\d+):/,".$1.").replace(/:/g,".");
  const bare = s => String(s||"").replace(/[֑-ׇ]/g,"").toLowerCase();
  const LAAZ = BOOKS.flatMap(b => L[b[0]] || []);
  const SETS = {
    dikduk:{ data:GR, kinds:["Rule for all of Scripture","Tense and mood","Verb form","Number and gender","Noun or verb","Vowels, dagesh and stress","A letter's work","Root and word family","Short or inverted verse","Menachem and Dunash"],
      lead:"Every comment on the Chumash where Rashi explains the verse from its grammar: a rule he states for all of Scripture, tense, verb form, number and gender, vowels and stress, what a single letter is doing, and where he cites Menachem or Dunash." },
    peshat:{ data:MT, kinds:["Method stated","Plain sense beside midrash","Midrash after the plain reading","Plain sense named","His own reading","Says he does not know","Names his source","Other interpreters"],
      lead:"Every comment on the Chumash where Rashi speaks about how he is explaining: plain sense beside midrash, his rule, his own reading against others, where he names a source, and where he says he does not know." },
    targum:{ data:TGM, kinds:["As the Targum has it","Cites the Targum","Names Onkelos","Parts from the Targum","Targum Yonatan or Yerushalmi","Aramaic word"],
      lead:"Every comment on the Chumash where Rashi brings the Targum: where he rests on it, quotes it, names Onkelos, parts from it, or explains a word from Aramaic." }
  };
  const TABS = [{id:"all", en:"Everything", he:""},{id:"laaz", en:"Foreign words", he:'בְּלַעַ"ז'}].concat(["dikduk","peshat","targum"].map(id => ({id, en:SEC[id].en, he:SEC[id].he}))).concat([{id:"notes", en:"My notes", he:""}]);
  const BYID = {};
  const ORDER = {laaz:0, dikduk:1, peshat:2, targum:3};
  const reg = (i, view) => { BYID[i.id] = {i, view}; const [c,v] = i.ref.split(":").map(Number); i._c = c; i._v = v; i._view = view; i._b = BOOKS.findIndex(b => b[0]===i.book); };
  LAAZ.forEach(i => reg(i, "laaz"));
  Object.keys(SETS).forEach(v => SETS[v].data.forEach(i => reg(i, v)));
  const EVERY = Object.values(BYID).map(x => x.i).sort((a,b) => a._b-b._b || a._c-b._c || a._v-b._v || ORDER[a._view]-ORDER[b._view] || (a.seg||0)-(b.seg||0));
  /* parashiyot of each book in order, taken from the data */
  const PARS = {}; EVERY.forEach(i => { const a = PARS[i.book] = PARS[i.book] || []; if(!a.some(p => p.en===i.par)) a.push({en:i.par, he:i.parHe}); });
  const HL = "אבגדהוזחטיכלמנסעפצ";
  const heNum = n => n===15 ? "טו" : n===16 ? "טז" : (n>=10 ? HL[8 + Math.floor(n/10)] : "") + (n%10 ? HL[n%10-1] : "");
  const refCol = i => `<span class="refcol"><b>${i._c}:${i._v}</b><span class="heb" dir="rtl">${heNum(i._c)}:${heNum(i._v)}</span></span>`;

  /* ---------- notes and flags store ---------- */
  const store = { notes:{}, flags:{}, mode:"local", db:null, uid:null };
  const LS = { get(k){ try{ return JSON.parse(localStorage.getItem(k) || "{}"); }catch(e){ return {}; } }, set(k,v){ try{ localStorage.setItem(k, JSON.stringify(v)); }catch(e){} } };
  store.notes = LS.get("rashi-notes"); store.flags = LS.get("rashi-flags");
  async function connect(){
    try{
      if(!(window.claude && window.claude.use)) return;
      const [db, user] = await Promise.all([window.claude.use("db"), window.claude.use("user")]);
      const uid = user ? await user.id() : null;
      if(!db || !uid) return;
      store.db = db; store.uid = uid;
      const ns = await db.collection("data/users/" + uid).get();
      let fl = {exists:false}; try{ fl = await db.doc("flags/" + uid).get(); }catch(e){}
      const remote = {}; ns.docs.forEach(d => { const x = d.data(); if(x && x.text) remote[d.id] = x.text; });
      /* notes typed before sign-in was known are kept and pushed up once */
      for(const k of Object.keys(store.notes)) if(!(k in remote)){ remote[k] = store.notes[k]; db.doc("data/users/" + uid + "/" + k).set({text:remote[k], at:Date.now()}).catch(()=>{}); }
      store.notes = remote; LS.set("rashi-notes", remote);
      if(fl.exists){ const f = fl.data() || {}; store.flags = f.ids || {}; LS.set("rashi-flags", store.flags); }
      store.mode = "account"; render();
    }catch(e){ /* stay on browser storage */ }
  }
  async function saveNote(id, text){
    text = text.trim();
    if(text) store.notes[id] = text; else delete store.notes[id];
    LS.set("rashi-notes", store.notes);
    if(store.db){
      const ref = store.db.doc("data/users/" + store.uid + "/" + id);
      try{ if(text) await ref.set({text, at:Date.now()}); else await ref.delete(); return "Saved to your account."; }
      catch(e){ return "Saved in this browser only. Saving to your account failed."; }
    }
    return "Saved in this browser only.";
  }
  async function toggleFlag(id){
    if(store.flags[id]) delete store.flags[id]; else store.flags[id] = (BYID[id] ? BYID[id].view + " " + BYID[id].i.book + " " + BYID[id].i.ref : "1");
    LS.set("rashi-flags", store.flags);
    if(store.db){ try{ await store.db.doc("flags/" + store.uid).set({ids:store.flags, at:Date.now()}); }catch(e){} }
  }
  const where = () => store.mode === "account" ? "Saved to your account; only you can read it." : "Saved in this browser only.";

  /* ---------- pieces ---------- */
  function srcBox(he, en, ref, link){
    return `<div class="srcbox">
      <div class="src-he">${esc(he)}</div>
      ${state.showEn && en ? `<div class="src-en">${esc(en)}</div>` : ""}
      ${link ? `<a class="src-ref" href="${refUrl(link)}" target="_blank" rel="noopener">${esc(ref)} ↗</a>` : `<span class="src-ref">${esc(ref)}</span>`}
    </div>`;
  }
  function noteBox(id){
    return `<div class="notebox">
      <label class="box-label" for="note-${id}">My note</label>
      <textarea id="note-${id}" class="note" data-note="${id}" rows="3" placeholder="Write a note on this Rashi.">${esc(store.notes[id] || "")}</textarea>
      <div class="noterow"><button type="button" class="btn" data-save="${id}">Save note</button>
        <button type="button" class="btn ghost" data-flag="${id}" aria-pressed="${!!store.flags[id]}">${store.flags[id] ? "Marked as not belonging here · undo" : "This card does not belong here"}</button>
        <span class="notestatus" id="st-${id}">${esc(where())}</span></div>
    </div>`;
  }
  const mine = id => (store.notes[id] ? `<span class="badge b-mine">My note</span>` : "") + (store.flags[id] ? `<span class="badge b-verify">Marked wrong</span>` : "");

  function laazCard(i){
    const open = state.openId === i.id;
    const sim = i.sim.length ? i.sim.map(s => `<b>${esc(s.w)}</b><span class="lang">${esc(s.lang)}</span>`).join("") : "";
    const es = state.showEs && i.es && i.es.length ? `<div class="today es">Spanish today: ${i.es.map(s => `<b>${esc(s.w)}</b><span class="mean2">${esc(s.g)}</span>`).join("")}</div>` : "";
    const esNote = state.showEs && i.esNote ? `<div class="travel">${esc(i.esNote)}</div>` : "";
    const today = (i.modern ? `<b>${esc(i.modern)}</b><span class="lang">French</span>` : "") + sim;
    const rref = `Rashi on ${i.book} ${i.ref}` + (i.seg ? `:${i.seg}` : "");
    return `<div class="card ${open?"open":""}" id="card-${i.id}">
      <button type="button" class="card-head ch" data-open="${i.id}" aria-expanded="${open}">${refCol(i)}<span class="chbody">
        <div class="row1">
          <span class="nm">${esc(i.gloss)}${state.showEn ? `<span class="mean">${esc(i.en)}</span>` : ""}</span>
          <span class="nm-he heb" dir="rtl">${esc(i.laaz)}</span>
        </div>
        <div class="org"><span class="heb" dir="rtl">${esc(i.hw)}</span> · <span class="heb" dir="rtl">${esc(i.he)}</span></div>
        ${i.pw ? `<div class="printline">In the printed Rashi: <span class="heb" dir="rtl">${esc(i.pw)}</span></div>` : ""}
        ${i.lz ? `<div class="printline">In manuscript Leipzig 1: <span class="heb" dir="rtl">${esc(i.lz)}</span></div>` : ""}
        <div class="badges">${state.view==="all" ? `<span class="badge b-sec">Foreign word</span>` : ""}${i.own ? `<span class="badge b-own">${OWNLBL[i.ownKind]}</span>` : ""}${state.showEn && (today || i.travel) ? `<span class="badge b-note">Today and word history: study notes</span>` : ""}${mine(i.id)}</div>
        ${state.showEn && today ? `<div class="today">Today: ${today}</div>` : ""}
        ${es}${esNote}
        ${state.showEn && i.own ? `<div class="ownbox"><span class="lbl2">${OWNLBL[i.ownKind]}</span>${esc(i.own)}</div>` : ""}
        ${state.showEn && i.travel ? `<div class="travel">${esc(i.travel)}</div>` : ""}
        <div class="toggle">${open ? "▾ close" : "▸ verse · Rashi in full · Catane's entry · my note"}</div>
      </span></button>
      ${open ? `<div class="detail">
        <div class="box-label">The verse</div>
        ${srcBox(i.pasuk, "", `${i.book} ${i.ref}`, `${i.book} ${i.ref}`)}
        <div class="box-label mt">Rashi, as printed${i.dh ? ` · <span class="heb" dir="rtl">${esc(i.dh)}</span>` : ""}</div>
        ${i.rashi ? srcBox(i.rashi, i.tr, rref, rref) : `<div class="blk">The printed text has no comment at this verse that could be matched to this entry.</div>`}
        <div class="box-label mt">Catane, Otzar La'azei Rashi, no. ${esc(i.no)}</div>
        <div class="srcbox"><dl class="cat">
          <dt>Word in the verse</dt><dd class="heb" dir="rtl">${esc(i.hw)}</dd>
          <dt>Rashi's letters</dt><dd class="heb" dir="rtl">${esc(i.laaz)}</dd>
          <dt>Old French</dt><dd>${esc(i.gloss)}</dd>
          <dt>Meaning</dt><dd class="heb" dir="rtl">${esc(i.he)}</dd>
          ${i.cn ? `<dt>His note</dt><dd class="heb" dir="rtl">${esc(i.cn)}</dd>` : ""}</dl></div>
        ${noteBox(i.id)}
      </div>` : ""}
    </div>`;
  }
  function methodCard(i){
    const open = state.openId === i.id;
    const rref = `Rashi on ${i.book} ${i.ref}:${i.seg}`;
    return `<div class="card ${open?"open":""}" id="card-${i.id}">
      <button type="button" class="card-head ch" data-open="${i.id}" aria-expanded="${open}">${refCol(i)}<span class="chbody">
        <div class="row1"><span class="badges nomt">${state.view==="all" ? `<span class="badge b-sec">${esc(SECNAME[i._view])}</span>` : ""}${i.tags.map(t => `<span class="badge b-tag">${esc(t)}</span>`).join("")}${mine(i.id)}</span>
          <span class="nm-he heb" dir="rtl">${esc(i.dh)}</span></div>
        <div class="exline heb" dir="rtl">${esc(i.ex)}</div>
        <div class="toggle">${open ? "▾ close" : "▸ Rashi in full · translation · my note"}</div>
      </span></button>
      ${open ? `<div class="detail"><div class="box-label">Rashi, as printed</div>${srcBox(i.rashi, i.tr, rref, rref)}${noteBox(i.id)}</div>` : ""}
    </div>`;
  }
  const OWNLBL = {differs:"This guide reads it differently from Catane", sides:"This guide weighs the dispute", moved:"This guide moved this entry"};
  const SECNAME = {laaz:"Foreign word", dikduk:"Grammar", peshat:"Settling the verse", targum:"Targum"};
  function parPills(pool){
    const ps = PARS[state.book] || [];
    return `<div class="parrow"><span class="langlbl">Parasha</span><button type="button" class="kind ${state.par===null?"on":""}" data-par="">Whole book<span class="cnt">${pool.length}</span></button>${ps.map(p => {
      const n = pool.filter(x => x.par===p.en).length;
      return `<button type="button" class="kind ${state.par===p.en?"on":""}" data-par="${esc(p.en)}" ${n?"":"disabled"}><span class="heb" dir="rtl">${esc(p.he)}</span>${esc(p.en)}<span class="cnt">${n}</span></button>`; }).join("")}</div>`;
  }
  function bookPills(count){
    return `<div class="catrow books">${BOOKS.map(b => { const n = count(b[0]);
      return `<button type="button" class="pill ${b[0]===state.book?"on":""}" data-book="${b[0]}" ${n?"":"disabled"}>${esc(b[2])}<span class="heb" dir="rtl">${esc(b[1])}</span><span class="cnt">${n}</span></button>`; }).join("")}</div>`;
  }
  const hit = (i, q) => !q || bare([i.ref, i.dh, i.hw, i.laaz, i.gloss, i.he, i.en, i.modern, i.ex, i.rashi, i.par, (i.tags||[]).join(" "), (i.sim||[]).map(s => s.w).join(" "), (i.es||[]).map(s => s.w + " " + s.g).join(" "), i.travel, i.esNote, i.cn, i.tr, i.own].join(" ")).includes(q);
  const cardOf = i => i._view === "laaz" ? laazCard(i) : methodCard(i);
  function cards(items, showBook){
    let h = "", key = null;
    items.forEach(i => {
      const k = i.book + "|" + i.par + "|" + i._c;
      if(k !== key){ key = k; h += `<div class="par-head"><span class="heb" dir="rtl">${showBook ? esc(BOOKS[i._b][1]) + " · " : ""}${esc(i.parHe)} · פרק ${heNum(i._c)}</span><span>${showBook ? esc(BOOKS[i._b][2]) + " · " : ""}${esc(i.par)} · Perek ${i._c}</span></div>`; }
      h += cardOf(i);
    });
    return h || `<p class="sec-lead">Nothing here matches.</p>`;
  }

  /* ---------- views ---------- */
  function listView(){
    const q = bare(state.q.trim());
    const v = state.view, set = SETS[v];
    const ALL = v === "all" ? EVERY : EVERY.filter(i => i._view === v);
    const head = v === "all" ? ["", "Everything, verse by verse"] : v === "laaz" ? ['בְּלַעַ"ז', "Foreign words"] : [SEC[v].he, SEC[v].en];
    const lead = v === "all" ? `Pick a book and a parasha. Every card from all four sections is listed in the order of the verses: ${LAAZ.length} French words, ${GR.length} grammar comments, ${MT.length} comments on settling the verse, ${TGM.length} on the Targum.`
      : v === "laaz" ? `Every French word Rashi gives on the Chumash, following Catane's numbered list. ${LAAZ.length} words.`
      : `${set.lead} ${ALL.length} comments. Each card shows his own words; open it for the whole comment.`;
    const inBook = ALL.filter(x => x.book === state.book);
    const inPar = q ? ALL.filter(i => hit(i, q)) : (state.par ? inBook.filter(x => x.par === state.par) : inBook);
    const kinds = set ? `<div class="kindrow"><span class="langlbl">Kind</span><button type="button" class="kind ${state.kind==="all"?"on":""}" data-kind="all">All<span class="cnt">${inPar.length}</span></button>${set.kinds.map(k => {
      const n = inPar.filter(x => x.tags.includes(k)).length;
      return n ? `<button type="button" class="kind ${state.kind===k?"on":""}" data-kind="${esc(k)}">${esc(k)}<span class="cnt">${n}</span></button>` : ""; }).join("")}</div>` : "";
    const nOwn = inPar.filter(x => x.own).length;
    const ownRow = !set && nOwn ? `<div class="kindrow"><button type="button" class="kind ${state.kind==="all"?"on":""}" data-kind="all">All<span class="cnt">${inPar.length}</span></button><button type="button" class="kind ${state.kind==="own"?"on":""}" data-kind="own">This guide's own readings<span class="cnt">${nOwn}</span></button></div>` : "";
    const shown = inPar.filter(x => state.kind === "own" ? x.own : (!set || state.kind === "all" || x.tags.includes(state.kind)));
    return `<div class="sec-head">${head[0] ? `<span class="sec-he heb" dir="rtl">${esc(head[0])}</span>` : ""}<span class="sec-en">${esc(head[1])}</span></div>
      <p class="sec-lead">${lead}</p>` + (q ? `<p class="sec-lead">${shown.length} found in all five books for "${esc(state.q.trim())}".</p>` : bookPills(b => ALL.filter(x => x.book===b).length) + parPills(inBook)) + kinds + ownRow + cards(shown, !!q);
  }
  function notesView(){
    const ids = Array.from(new Set(Object.keys(store.notes).concat(Object.keys(store.flags)))).filter(id => BYID[id]);
    const order = id => { const x = BYID[id].i; const [c,v] = x.ref.split(":").map(Number); return BOOKS.findIndex(b => b[0]===x.book)*1e6 + c*1e3 + v; };
    ids.sort((a,b) => order(a) - order(b));
    const names = Object.fromEntries(TABS.map(t => [t.id, t.en]));
    return `<div class="sec-head"><span class="sec-en">My notes</span></div>
      <p class="sec-lead">Open any card in the other sections and write under it. Your notes and the cards you marked are gathered here in the order of the Chumash. ${esc(where())}</p>` +
      (ids.length ? ids.map(id => { const {i, view} = BYID[id];
        return `<div class="card"><div class="card-head asdiv">
          <div class="row1"><span class="badges nomt"><span class="badge b-verse">${esc(i.book)} ${esc(i.ref)}</span><span class="badge b-tag">${esc(names[view])}</span>${store.flags[id] ? `<span class="badge b-verify">Marked wrong</span>` : ""}</span>
            <span class="nm-he heb" dir="rtl">${esc(i.dh || i.hw || "")}</span></div>
          ${store.notes[id] ? `<div class="mynote">${esc(store.notes[id])}</div>` : ""}
          <button type="button" class="toggle linkbtn" data-goto="${id}">▸ go to this card</button></div></div>`; }).join("")
        : `<p class="sec-lead">No notes yet.</p>`);
  }
  function render(){
    $("#controls").innerHTML = `<div class="catrow">${TABS.map(s =>
      `<button type="button" class="pill ${s.id===state.view?"on":""}" data-view="${s.id}">${esc(s.en)}${s.he ? `<span class="heb" dir="rtl">${esc(s.he)}</span>` : ""}${s.id==="notes" && Object.keys(store.notes).length ? `<span class="cnt">${Object.keys(store.notes).length}</span>` : ""}</button>`).join("")}</div>
      <div class="langrow"><span class="langlbl">Show</span><button type="button" class="langpill ${state.showEn?"on":""}" data-lang="showEn" aria-pressed="${state.showEn}">English</button>
        <button type="button" class="langpill ${state.showEs?"on":""}" data-lang="showEs" aria-pressed="${state.showEs}">Spanish</button></div>`;
    $("#searchrow").hidden = state.view === "notes";
    $("#list").innerHTML = state.view === "notes" ? notesView() : listView();
  }

  /* ---------- events ---------- */
  document.addEventListener("click", async e => {
    let b = e.target.closest("[data-view]");
    if(b){ state.view = b.dataset.view; state.kind = "all"; state.openId = null; render(); return; }
    b = e.target.closest("[data-book]");
    if(b){ state.book = b.dataset.book; state.par = null; state.kind = "all"; state.openId = null; render(); return; }
    b = e.target.closest("[data-par]");
    if(b){ state.par = b.dataset.par || null; state.kind = "all"; state.openId = null; render(); return; }
    b = e.target.closest("[data-kind]");
    if(b){ state.kind = b.dataset.kind; state.openId = null; render(); return; }
    b = e.target.closest("[data-lang]");
    if(b){ state[b.dataset.lang] = !state[b.dataset.lang]; render(); return; }
    b = e.target.closest("[data-save]");
    if(b){ const id = b.dataset.save, st = $("#st-" + id); st.textContent = "Saving."; st.textContent = await saveNote(id, $("#note-" + id).value); return; }
    b = e.target.closest("[data-flag]");
    if(b){ const id = b.dataset.flag, draft = $("#note-" + id).value; await toggleFlag(id); render(); const t = $("#note-" + id); if(t) t.value = draft; return; }
    b = e.target.closest("[data-goto]");
    if(b){ const x = BYID[b.dataset.goto]; state.view = x.view; state.book = x.i.book; state.par = x.i.par; state.kind = "all"; state.q = ""; $("#q").value = ""; state.openId = x.i.id; render();
      const el = document.getElementById("card-" + x.i.id); if(el) el.scrollIntoView({block:"start"}); return; }
    b = e.target.closest("[data-open]");
    if(b){ state.openId = state.openId === b.dataset.open ? null : b.dataset.open; render(); }
  });
  $("#q").addEventListener("input", e => { state.q = e.target.value; state.openId = null; state.kind = "all"; $("#list").innerHTML = listView(); });
  render();
  connect();
})();
