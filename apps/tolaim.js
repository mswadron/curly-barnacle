/* ============================================================================
   Tolaim in Food — render logic (vanilla JS), haftarah-style skin.
   Places each creature in its category in the Gemara / Shulchan Aruch and
   leaves the machlokes to the poskim. Sources quoted as written, linked to
   Sefaria. Live scientific data per creature from GBIF.
   ========================================================================== */
(function(){
  const D = window.TOLAIM_DATA;
  const state = { cat: "all", lang: "en", openId: null };

  const $ = s => document.querySelector(s);
  const esc = s => (s==null ? "" : String(s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;"));

  const ALL = [];
  D.categories.forEach(c => c.nodes.forEach(n => ALL.push(Object.assign({_cat:c.id, _catName:c.name}, n))));

  const originLabel = o => o.startsWith("born") ? "Born in place" : o.startsWith("crawled") ? "From outside" : "Contested";
  const originClass = o => (o.startsWith("born")) ? "b-born" : (o==="crawled-in" || o==="crawled-in / mixed") ? "b-crawled" : "b-contested";

  /* ---- Sefaria links from a ref string ---- */
  function refUrl(ref){
    let m = ref.match(/Chullin\s+(\d+[ab])/);
    if(m) return "https://www.sefaria.org/Chullin." + m[1];
    m = ref.match(/YD\s+84:(\d+)/);
    if(m) return "https://www.sefaria.org/Shulchan_Arukh,_Yoreh_De'ah.84." + m[1];
    if(/YD\s+84/.test(ref)) return "https://www.sefaria.org/Shulchan_Arukh,_Yoreh_De'ah.84";
    return null;
  }

  /* ---- GBIF live scientific layer ---- */
  const GBIF = {
    copepods:{name:"Cyclops",phylum:"Arthropoda"}, mosquito:{name:"Culex pipiens"}, blackfly:{name:"Simulium"},
    anisakis:{name:"Anisakis simplex"}, tapeworm:{name:"Diphyllobothrium latum"}, myxo:{name:"Kudoa thyrsites"},
    aphids:{name:"Aphididae"}, leafminer:{name:"Liriomyza"}, "legume-weevil":{name:"Callosobruchus maculatus"},
    swd:{name:"Drosophila suzukii"}, vinegarfly:{name:"Drosophila melanogaster"}, codling:{name:"Cydia pomonella"},
    driedfig:{name:"Ephestia"}, warble:{name:"Hypoderma bovis"}, fasciola:{name:"Fasciola hepatica"},
    cysticercus:{name:"Taenia saginata"}, vinegareels:{name:"Turbatrix aceti"}, juiceflies:{name:"Drosophila melanogaster"}
  };
  const gbifCache = new Map();
  async function fetchGbif(id){
    if(gbifCache.has(id)) return gbifCache.get(id);
    const q = GBIF[id];
    let result;
    if(!q){ result = {ok:false, reason:"no taxon configured"}; gbifCache.set(id,result); return result; }
    try{
      const m = await fetch("https://api.gbif.org/v1/species/match?" + new URLSearchParams(q)).then(r=>r.json());
      if(!m || m.matchType==="NONE" || !m.usageKey || m.usageKey===1 || m.rank==="KINGDOM"){
        result = {ok:false, reason:"no confident match"};
      } else {
        let count = null;
        try{ const o = await fetch("https://api.gbif.org/v1/occurrence/search?limit=0&taxonKey="+m.usageKey).then(r=>r.json()); count = o.count; }catch(e){}
        result = {ok:true, m, count};
      }
    }catch(e){ result = {ok:false, reason:"offline or unreachable"}; }
    gbifCache.set(id, result);
    return result;
  }
  function renderGbif(r){
    if(!r.ok) return `<div class="gbif-fail">Live GBIF data unavailable (${esc(r.reason)}).</div>`;
    const m = r.m;
    const rows = [["Phylum",m.phylum],["Class",m.class],["Order",m.order],["Family",m.family],["Genus",m.genus]].filter(x=>x[1]);
    const chips = rows.map(x=>`<span class="tax"><b>${x[0]}</b> ${esc(x[1])}</span>`).join("");
    const cnt = (r.count!=null) ? Number(r.count).toLocaleString() : "—";
    return `<div class="gbif-name heb-name">${esc(m.canonicalName)} <span class="gbif-rank">${esc((m.rank||"").toLowerCase())}</span></div>` +
           `<div class="taxrow">${chips}</div>` +
           `<div class="gbif-meta"><span class="gcount"><b>${cnt}</b> occurrence records worldwide</span>` +
           `<a class="glink" href="https://www.gbif.org/species/${m.usageKey}" target="_blank" rel="noreferrer">GBIF taxon page ↗</a></div>` +
           `<div class="gbif-attr">Live from GBIF.org · match confidence ${esc(m.confidence)}%</div>`;
  }
  async function loadGbifInto(id){
    const r = await fetchGbif(id);
    if(state.openId !== id) return;
    const slot = document.getElementById("gbif-" + id);
    if(slot) slot.innerHTML = renderGbif(r);
  }

  /* ---- source block, honoring language toggle ---- */
  function sourceBlock(s){
    const L = state.lang, url = refUrl(s.ref);
    let sub = "";
    if(L==="se") sub = `<div class="src-tr">${esc(s.se)}</div>`;
    else if(L==="en") sub = `<div class="src-en">${esc(s.en)}</div>`;
    const ref = url ? `<a class="src-ref" href="${url}" target="_blank" rel="noreferrer">${esc(s.ref)} ↗</a>` : `<span class="src-ref">${esc(s.ref)}</span>`;
    return `<div class="srcbox"><div class="src-he heb" dir="rtl">${esc(s.he)}</div>${sub}${ref}</div>`;
  }

  /* ---- one organism card ---- */
  function card(n){
    const open = n.id===state.openId;
    const gradeMeaning = {A:"the source describes essentially this case",B:"clear thematic fit",C:"fits with a caveat",D:"analogical",E:"the science challenges the assumption"};
    let head =
      `<div class="card-head" data-id="${n.id}">` +
        `<div class="row1">` +
          `<span class="nm">${esc(n.name.en)}</span>` +
          `<span class="nm-he heb" dir="rtl">${esc(n.name.he)}</span>` +
        `</div>` +
        `<div class="org">${esc(n.organism)}</div>` +
        `<div class="badges">` +
          `<span class="badge ${originClass(n.origin)}">${originLabel(n.origin)}</span>` +
          (n.waterType ? `<span class="badge b-wt">${esc(n.waterType)}</span>` : ``) +
          `<span class="badge b-grade">Match ${n.grade}</span>` +
        `</div>` +
        `<div class="sugyacat">${esc(n.sugyaCase)}</div>` +
        `<div class="toggle">${open ? "▾ Hide" : "▸ Sources, science & the she’eilah"}</div>` +
      `</div>`;
    if(!open) return `<div class="card">${head}</div>`;

    let teshuvot = "";
    if(n.teshuvot && n.teshuvot.length){
      teshuvot = `<div class="teshbox"><div class="box-label gold">Contemporary teshuvos &amp; discussions</div>` +
        `<div class="tesh-note">Primary sources above; these later responsa are cited, not adjudicated.</div>` +
        n.teshuvot.map(x=>`<a class="tlink" href="${esc(x.u)}" target="_blank" rel="noreferrer">${esc(x.t)} ↗</a>`).join("") + `</div>`;
    }
    const detail =
      `<div class="detail">` +
        `<div class="blk">${esc(n.biology)}</div>` +
        `<div class="gbifbox"><div class="box-label tekh">Live scientific data · GBIF</div><div id="gbif-${n.id}" class="gbif"><span class="gbif-load">Querying GBIF…</span></div></div>` +
        (n.exclusivity ? `<div class="blk sub"><b>Water-body exclusivity.</b> ${esc(n.exclusivity)}</div>` : ``) +
        `<div class="blk"><b>How it maps to the sugya.</b> ${esc(n.match)}</div>` +
        `<div class="box-label tekh mt">In the Gemara &amp; Shulchan Aruch</div>` +
        n.sources.map(sourceBlock).join("") +
        teshuvot +
        `<div class="qbox"><div class="box-label maroon">The she’eilah — left to the poskim</div>` +
          `<div class="blk">${esc(n.question)}</div>` +
          `<div class="grade-note"><b>Match ${n.grade}</b> — ${gradeMeaning[n.grade]||""}</div>` +
        `</div>` +
      `</div>`;
    return `<div class="card open">${head}${detail}</div>`;
  }

  /* ---- controls + list ---- */
  function renderControls(){
    const cats = [["all","All"]].concat(D.categories.map(c=>[c.id, c.name.en]));
    const catPills = cats.map(([id,label])=>`<button class="pill ${state.cat===id?"on":""}" data-cat="${id}">${esc(label)}</button>`).join("");
    const langs = [["he","עברית"],["se","Transliteration"],["en","English"]];
    const langPills = langs.map(([id,label])=>`<button class="langpill ${state.lang===id?"on":""}" data-lang="${id}">${esc(label)}</button>`).join("");
    $("#controls").innerHTML =
      `<div class="catrow">${catPills}</div>` +
      `<div class="langrow"><span class="langlbl">Source text:</span>${langPills}</div>`;
  }
  function renderList(){
    let nodes = state.cat==="all" ? ALL : ALL.filter(n=>n._cat===state.cat);
    let html = "";
    if(state.cat==="all"){
      D.categories.forEach(c=>{
        html += `<div class="sec-head"><span class="sec-he heb" dir="rtl">${esc(c.name.he)}</span><span class="sec-en">${esc(c.name.en)}</span></div>`;
        html += `<div class="sec-lead">${esc(c.lead)}</div>`;
        html += c.nodes.map(n=>card(Object.assign({_cat:c.id,_catName:c.name},n))).join("");
      });
    } else {
      const c = D.categories.find(x=>x.id===state.cat);
      html += `<div class="sec-lead solo">${esc(c.lead)}</div>`;
      html += nodes.map(card).join("");
    }
    $("#list").innerHTML = html;
    if(state.openId) loadGbifInto(state.openId);
  }
  function render(){ renderControls(); renderList(); }

  /* ---- events (delegated) ---- */
  document.addEventListener("click", e=>{
    const cat = e.target.closest("[data-cat]");
    if(cat){ state.cat = cat.dataset.cat; state.openId = null; render(); return; }
    const lang = e.target.closest("[data-lang]");
    if(lang){ state.lang = lang.dataset.lang; renderList(); return; }
    const head = e.target.closest(".card-head");
    if(head){ const id = head.dataset.id; state.openId = (state.openId===id) ? null : id; renderList(); return; }
  });

  render();
})();
