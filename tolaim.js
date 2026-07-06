/* ============================================================================
   Tola'ei ha-Mazon — render logic (vanilla JS)
   The HE·SE·EN toggle swaps the language of the PRIMARY SOURCE display.
   Live scientific data is pulled per organism from the GBIF API
   (Global Biodiversity Information Facility) — a single, authoritative source.
   This map does NOT pasken: it places each organism in the sugya's category
   and states the lomdish question, leaving stringency/leniency to the poskim.
   ========================================================================== */
(function(){
  const D = window.TOLAIM_DATA;
  const state = { cat: D.categories[0].id, view: "category", lang: "en", nodeId: null };

  const $ = s => document.querySelector(s);
  const el = (t, c, html) => { const e = document.createElement(t); if(c) e.className=c; if(html!=null) e.innerHTML=html; return e; };
  const esc = s => (s==null ? "" : String(s));

  const ALL = [];
  D.categories.forEach(c => c.nodes.forEach(n => ALL.push(Object.assign({_cat:c.id, _catName:c.name}, n))));

  const originLabel = o => o.startsWith("born") ? "Born inside" : o.startsWith("crawled") ? "Crawled in" : "Contested";
  const originClass = o => (o==="born-in"||o==="born-in-detached") ? "born-in" : (o==="crawled-in") ? "crawled-in" : "contested";

  /* ---------- GBIF query per organism (id -> best-matching taxon) ---------- */
  const GBIF = {
    copepods:        { name:"Cyclops", phylum:"Arthropoda" },
    mosquito:        { name:"Culex pipiens" },
    blackfly:        { name:"Simulium" },
    anisakis:        { name:"Anisakis simplex" },
    tapeworm:        { name:"Diphyllobothrium latum" },
    myxo:            { name:"Kudoa thyrsites" },
    aphids:          { name:"Aphididae" },
    leafminer:       { name:"Liriomyza" },
    "legume-weevil": { name:"Callosobruchus maculatus" },
    swd:             { name:"Drosophila suzukii" },
    vinegarfly:      { name:"Drosophila melanogaster" },
    codling:         { name:"Cydia pomonella" },
    driedfig:        { name:"Ephestia" },
    warble:          { name:"Hypoderma bovis" },
    fasciola:        { name:"Fasciola hepatica" },
    cysticercus:     { name:"Taenia saginata" },
    vinegareels:     { name:"Turbatrix aceti" },
    juiceflies:      { name:"Drosophila melanogaster" }
  };
  const gbifCache = new Map();

  async function fetchGbif(id){
    if(gbifCache.has(id)) return gbifCache.get(id);
    const q = GBIF[id];
    let result;
    if(!q){ result = { ok:false, reason:"no taxon configured" }; gbifCache.set(id, result); return result; }
    try {
      const params = new URLSearchParams(q);
      const m = await fetch("https://api.gbif.org/v1/species/match?" + params).then(r => r.json());
      if(!m || m.matchType==="NONE" || !m.usageKey || m.usageKey===1 || m.rank==="KINGDOM"){
        result = { ok:false, reason:"no confident match" };
      } else {
        let count = null;
        try {
          const o = await fetch("https://api.gbif.org/v1/occurrence/search?limit=0&taxonKey=" + m.usageKey).then(r => r.json());
          count = o.count;
        } catch(e) {}
        result = { ok:true, m, count };
      }
    } catch(e) {
      result = { ok:false, reason:"offline or unreachable" };
    }
    gbifCache.set(id, result);
    return result;
  }

  function renderGbif(r){
    if(!r.ok) return `<div class="gbif-fail">Live GBIF data unavailable (${esc(r.reason)}) — the sugya map above is unaffected.</div>`;
    const m = r.m;
    const rows = [["Phylum",m.phylum],["Class",m.class],["Order",m.order],["Family",m.family],["Genus",m.genus]].filter(x => x[1]);
    const chips = rows.map(x => `<span class="tax"><b>${x[0]}</b>${esc(x[1])}</span>`).join("");
    const cnt = (r.count!=null) ? Number(r.count).toLocaleString() : "—";
    return `<div class="gbif-name">${esc(m.canonicalName)} <span class="gbif-rank">${esc((m.rank||"").toLowerCase())}</span></div>` +
           `<div class="taxrow">${chips}</div>` +
           `<div class="gbif-meta"><span class="gbif-count"><b>${cnt}</b> global occurrence records</span>` +
           `<a class="gbif-link" href="https://www.gbif.org/species/${m.usageKey}" target="_blank" rel="noopener">GBIF taxon page ↗</a></div>` +
           `<div class="gbif-attr">Live from GBIF.org · match confidence ${esc(m.confidence)}%</div>`;
  }

  async function loadGbifInto(id){
    const r = await fetchGbif(id);
    if(state.nodeId !== id) return;
    const slot = document.getElementById("gbif-slot");
    if(slot) slot.innerHTML = renderGbif(r);
  }

  function renderTabs(){
    const box = $("#cattabs");
    box.innerHTML = "";
    if(state.view==="origin"){ box.style.display="none"; return; }
    box.style.display = "flex";
    D.categories.forEach(c => {
      const b = el("button", c.id===state.cat ? "on" : "", `<span class="he">${c.name.he}</span>${c.name.en}`);
      b.onclick = () => { state.cat = c.id; render(); };
      box.appendChild(b);
    });
  }

  function card(n){
    const c = el("div","node");
    c.dataset.o = n.origin;
    if(n.id===state.nodeId) c.classList.add("active");
    c.innerHTML =
      `<div class="nm"><span class="he">${n.name.he}</span>${n.name.en}</div>` +
      `<div class="org">${esc(n.organism)}</div>` +
      `<div class="chips">` +
        `<span class="chip origin ${originClass(n.origin)}">${originLabel(n.origin)}</span>` +
        (n.waterType ? `<span class="chip wt">${esc(n.waterType)}</span>` : ``) +
        `<span class="chip grade">Match ${n.grade}</span>` +
      `</div>` +
      `<div class="verdict"><b>Sugya category</b>&nbsp; ${esc(n.sugyaCase)}</div>`;
    c.onclick = () => { state.nodeId = n.id; renderGrid(); renderRail(); };
    return c;
  }

  function renderGrid(){
    const g = $("#grid");
    g.innerHTML = "";
    let nodes;
    if(state.view==="category"){
      nodes = ALL.filter(n => n._cat===state.cat);
    } else {
      const rank = o => o.startsWith("born") ? 0 : o.startsWith("crawled") ? 2 : 1;
      nodes = ALL.slice().sort((a,b) => rank(a.origin) - rank(b.origin));
    }
    nodes.forEach(n => g.appendChild(card(n)));
  }

  function sourceBlock(s){
    const L = state.lang;
    let inner;
    if(L==="he")      inner = `<div class="src-he">${esc(s.he)}</div>`;
    else if(L==="se") inner = `<div class="src-he">${esc(s.he)}</div><div class="src-se">${esc(s.se)}</div>`;
    else              inner = `<div class="src-he">${esc(s.he)}</div><div class="src-en">${esc(s.en)}</div>`;
    return `<div class="source">${inner}<div class="src-ref">${esc(s.ref)}</div></div>`;
  }

  function renderRail(){
    const rail = $("#rail");
    const n = ALL.find(x => x.id===state.nodeId);
    if(!n){ rail.innerHTML = `<div class="rail-empty">Select an organism to see the matching sugya text, the biology, and the strength of the match.</div>`; return; }

    const gradeMeaning = { A:"Direct — the source describes essentially this case", B:"Strong — clear thematic fit", C:"Partial — fits with a caveat", D:"Analogical", E:"Tension — the science challenges the assumption" };

    let teshuvot = "";
    if(n.teshuvot && n.teshuvot.length){
      const links = n.teshuvot.map(x => `<a class="tlink" href="${esc(x.u)}" target="_blank" rel="noopener">${esc(x.t)}</a>`).join("");
      teshuvot =
        `<div class="rail-sec"><span class="eyebrow">Contemporary teshuvot &amp; discussions</span>` +
        `<div class="tnote">Primary sources above; these are later responsa on how the category is applied — cited, not adjudicated.</div>` +
        links + `</div>`;
    }

    rail.innerHTML =
      `<div class="rail-head">` +
        `<div class="eyebrow">${esc(n._catName.en)} · ${esc(n._catName.he)}</div>` +
        `<div class="nm"><span class="he">${n.name.he}</span>${n.name.en}</div>` +
        `<div class="org">${esc(n.organism)}</div>` +
        `<div class="chips">` +
          `<span class="chip origin ${originClass(n.origin)}">${originLabel(n.origin)}</span>` +
          (n.waterType ? `<span class="chip wt">${esc(n.waterType)}</span>` : ``) +
          `<span class="chip grade">Match ${n.grade}</span>` +
        `</div>` +
        `<div class="sugyacase">◆ ${esc(n.sugyaCase)}</div>` +
      `</div>` +
      `<div class="rail-sec"><span class="eyebrow">Biology · where it originates</span><div class="blk-txt">${esc(n.biology)}</div></div>` +
      `<div class="rail-sec"><span class="eyebrow">Live scientific data · GBIF</span><div id="gbif-slot" class="gbif"><span class="gbif-load">Querying GBIF…</span></div></div>` +
      (n.exclusivity ? `<div class="rail-sec"><span class="eyebrow">Water-body exclusivity</span><div class="blk-txt">${esc(n.exclusivity)}</div></div>` : ``) +
      `<div class="rail-sec"><span class="eyebrow">How it maps to the sugya</span><div class="match">${esc(n.match)}</div></div>` +
      `<div class="rail-sec"><span class="eyebrow">Primary source · Talmud &amp; SA</span>${n.sources.map(sourceBlock).join("")}</div>` +
      teshuvot +
      `<div class="rail-sec"><span class="eyebrow">The lomdish question — left to the poskim</span>` +
        `<div class="blk-txt" style="margin-bottom:10px">${esc(n.question)}</div>` +
        `<div class="gradeline"><span class="gradebig">${n.grade}<small>fit</small></span><span class="blk-txt" style="font-size:13px">Match strength: ${esc(gradeMeaning[n.grade])}</span></div>` +
      `</div>`;

    loadGbifInto(n.id);
  }

  function renderLede(){
    const p = $("#lede");
    if(state.view==="origin"){
      p.innerHTML = D.principle.en;
    } else {
      const cat = D.categories.find(c => c.id===state.cat);
      p.textContent = cat.lead;
    }
  }

  function render(){ renderTabs(); renderLede(); renderGrid(); renderRail(); }

  $("#viewseg").querySelectorAll("button").forEach(b => {
    b.onclick = () => {
      state.view = b.dataset.v;
      $("#viewseg").querySelectorAll("button").forEach(x => x.classList.toggle("on", x===b));
      render();
    };
  });
  $("#langtog").querySelectorAll("button").forEach(b => {
    b.onclick = () => {
      state.lang = b.dataset.l;
      $("#langtog").querySelectorAll("button").forEach(x => x.classList.toggle("on", x===b));
      renderRail();
    };
  });

  render();
})();
