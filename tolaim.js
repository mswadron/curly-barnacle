/* ============================================================================
   Tola'ei ha-Mazon — render logic (vanilla JS)
   State: current category, current view (category|origin), current language of
   the PRIMARY SOURCE display (he|se|en), and the selected node.
   ========================================================================== */
(function(){
  const D = window.TOLAIM_DATA;
  const state = { cat: D.categories[0].id, view: "category", lang: "en", nodeId: null };

  const $ = s => document.querySelector(s);
  const el = (t, c, html) => { const e = document.createElement(t); if(c) e.className=c; if(html!=null) e.innerHTML=html; return e; };
  const esc = s => (s==null?"":String(s));

  // flat list with category back-reference
  const ALL = [];
  D.categories.forEach(c => c.nodes.forEach(n => ALL.push(Object.assign({_cat:c.id, _catName:c.name}, n))));

  const originLabel = o => {
    if(o.startsWith("born")) return "Born inside";
    if(o.startsWith("crawled")) return "Crawled in";
    return "Contested";
  };
  const originClass = o => {
    if(o==="born-in"||o==="born-in-detached") return "born-in";
    if(o==="crawled-in") return "crawled-in";
    return "contested";
  };

  /* ---------- category tabs ---------- */
  function renderTabs(){
    const box = $("#cattabs"); box.innerHTML="";
    if(state.view==="origin"){ box.style.display="none"; return; }
    box.style.display="flex";
    D.categories.forEach(c=>{
      const b = el("button", c.id===state.cat?"on":"", `<span class="he">${c.name.he}</span>${c.name.en}`);
      b.onclick=()=>{ state.cat=c.id; render(); };
      box.appendChild(b);
    });
  }

  /* ---------- node card ---------- */
  function card(n){
    const c = el("div","node");
    c.dataset.o = n.origin;
    if(n.id===state.nodeId) c.classList.add("active");
    c.innerHTML =
      `<div class="nm"><span class="he">${n.name.he}</span>${n.name.en}</div>`+
      `<div class="org">${esc(n.organism)}</div>`+
      `<div class="chips">`+
        `<span class="chip origin ${originClass(n.origin)}">${originLabel(n.origin)}</span>`+
        (n.waterType?`<span class="chip wt">${esc(n.waterType)}</span>`:``)+
        `<span class="chip grade">Match ${n.grade}</span>`+
      `</div>`+
      `<div class="verdict"><b>Verdict</b>&nbsp; ${esc(n.verdict)}</div>`;
    c.onclick=()=>{ state.nodeId=n.id; renderGrid(); renderRail(); };
    return c;
  }

  /* ---------- grid ---------- */
  function renderGrid(){
    const g = $("#grid"); g.innerHTML="";
    let nodes;
    if(state.view==="category"){
      nodes = ALL.filter(n=>n._cat===state.cat);
    }else{
      // group by origin bucket
      nodes = ALL.slice().sort((a,b)=>{
        const rank = o => o.startsWith("born")?0 : o.startsWith("crawled")?2 : 1;
        return rank(a.origin)-rank(b.origin);
      });
    }
    nodes.forEach(n=>g.appendChild(card(n)));
  }

  /* ---------- source block, honoring language toggle ---------- */
  function sourceBlock(s){
    const L = state.lang;
    let inner = "";
    if(L==="he") inner = `<div class="src-he">${esc(s.he)}</div>`;
    else if(L==="se") inner = `<div class="src-he">${esc(s.he)}</div><div class="src-se">${esc(s.se)}</div>`;
    else inner = `<div class="src-he">${esc(s.he)}</div><div class="src-en">${esc(s.en)}</div>`;
    return `<div class="source">${inner}<div class="src-ref">${esc(s.ref)}</div></div>`;
  }

  /* ---------- rail ---------- */
  function renderRail(){
    const rail = $("#rail");
    const n = ALL.find(x=>x.id===state.nodeId);
    if(!n){ rail.innerHTML = `<div class="rail-empty">Select an organism to see the matching sugya text, the biology, and the strength of the match.</div>`; return; }
    const gradeMeaning = {A:"Direct — the source describes essentially this case",B:"Strong — clear thematic fit",C:"Partial — fits with a caveat",D:"Analogical",E:"Tension — the science challenges the assumption"};
    rail.innerHTML =
      `<div class="rail-head">`+
        `<div class="eyebrow">${esc(n._catName.en)} · ${esc(n._catName.he)}</div>`+
        `<div class="nm"><span class="he">${n.name.he}</span>${n.name.en}</div>`+
        `<div class="org">${esc(n.organism)}</div>`+
        `<div class="chips">`+
          `<span class="chip origin ${originClass(n.origin)}">${originLabel(n.origin)}</span>`+
          (n.waterType?`<span class="chip wt">${esc(n.waterType)}</span>`:``)+
        `</div>`+
      `</div>`+
      `<div class="rail-sec"><span class="eyebrow">Biology · where it originates</span><div class="blk-txt">${esc(n.biology)}</div></div>`+
      (n.exclusivity?`<div class="rail-sec"><span class="eyebrow">Water-body exclusivity</span><div class="blk-txt">${esc(n.exclusivity)}</div></div>`:``)+
      `<div class="rail-sec"><span class="eyebrow">The match to the sugya</span><div class="match">${esc(n.match)}</div></div>`+
      `<div class="rail-sec"><span class="eyebrow">Source text</span>${n.sources.map(sourceBlock).join("")}</div>`+
      `<div class="rail-sec"><span class="eyebrow">Halachic verdict</span><div class="blk-txt" style="margin-bottom:9px">${esc(n.verdict)}</div>`+
        `<div class="gradeline"><span class="gradebig">${n.grade}<small>match</small></span><span class="blk-txt" style="font-size:13px">${gradeMeaning[n.grade]||""}</span></div>`+
      `</div>`;
  }

  /* ---------- lede ---------- */
  function renderLede(){
    const p = $("#lede");
    if(state.view==="origin"){
      p.innerHTML = D.principle.en;
    }else{
      const c = D.categories.find(c=>c.id===state.cat);
      p.textContent = c.lead;
    }
  }

  function render(){ renderTabs(); renderLede(); renderGrid(); renderRail(); }

  /* ---------- controls ---------- */
  $("#viewseg").querySelectorAll("button").forEach(b=>{
    b.onclick=()=>{
      state.view=b.dataset.v;
      $("#viewseg").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));
      render();
    };
  });
  $("#langtog").querySelectorAll("button").forEach(b=>{
    b.onclick=()=>{
      state.lang=b.dataset.l;
      $("#langtog").querySelectorAll("button").forEach(x=>x.classList.toggle("on",x===b));
      renderRail(); // language toggle re-renders source display
    };
  });

  render();
})();
