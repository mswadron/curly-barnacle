/* ============================================================================
   The Four Species as Plants: render logic (vanilla JS), tolaim-style skin.
   Views: All, Esrog, Lulav, Hadas, Aravah, Blemish guide (esrog by region).
   Places each plant fact beside its source; the machlokes is left to the poskim.
   ========================================================================== */
(function(){
  const D = window.ARBA_DATA;
  const state = { view:"all", showTr:true, showEn:true, openId:null, region:null };
  const $ = s => document.querySelector(s);
  const esc = s => String(s==null?"":s).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");

  const ALL = [];
  D.categories.forEach(c => c.nodes.forEach(n => ALL.push(Object.assign({_cat:c.id}, n))));

  function refUrl(ref){
    let m;
    if((m = ref.match(/^Leviticus (\d+):(\d+)/))) return "https://www.sefaria.org/Leviticus."+m[1]+"."+m[2];
    if((m = ref.match(/^Mishnah Sukkah (\d+):(\d+)/))) return "https://www.sefaria.org/Mishnah_Sukkah."+m[1]+"."+m[2];
    if((m = ref.match(/^Sukkah (\d+[ab])/))) return "https://www.sefaria.org/Sukkah."+m[1];
    if((m = ref.match(/^Magen Avraham (\d+):(\d+)/))) return "https://www.sefaria.org/Magen_Avraham."+m[1]+"."+m[2];
    if((m = ref.match(/^Shulchan Arukh OC (\d+):(\d+)/))) return "https://www.sefaria.org/Shulchan_Arukh,_Orach_Chayim."+m[1]+"."+m[2];
    if((m = ref.match(/^Shulchan Arukh OC (\d+)/))) return "https://www.sefaria.org/Shulchan_Arukh,_Orach_Chayim."+m[1];
    return null;
  }

  function srcBox(s){
    const u = refUrl(s.ref);
    return `<div class="srcbox">
      <div class="src-he">${esc(s.he)}</div>
      ${state.showTr && s.se ? `<div class="src-tr">${esc(s.se)}</div>` : ""}
      ${state.showEn && s.en ? `<div class="src-en">${esc(s.en)}</div>` : ""}
      ${u ? `<a class="src-ref" href="${u}" target="_blank" rel="noopener">${esc(s.ref)} ↗</a>` : `<span class="src-ref">${esc(s.ref)}</span>`}
    </div>`;
  }

  function badge(kind, key){
    const t = D[kind][key]; if(!t) return "";
    return `<span class="badge ${t.cls}">${esc(t.en)}</span>`;
  }

  function nodeCard(n){
    const open = state.openId === n.id;
    return `<div class="card ${open?"open":""}" id="c-${n.id}">
      <div class="card-head" data-open="${n.id}">
        <div class="row1">
          <span class="nm">${esc(n.name.en)}</span>
          <span class="nm-he heb" dir="rtl">${esc(n.name.he)}</span>
        </div>
        <div class="org">${esc(n.organism)}</div>
        <div class="badges">${badge("layer", n.layer)}${badge("status", n.status)}</div>
        <div class="toggle">${open ? "▾ close" : "▸ botany · sugya · she'eilah · sources"}</div>
      </div>
      ${open ? `<div class="detail">
        <div class="box-label green">What the plant is doing</div>
        <div class="blk">${esc(n.biology)}</div>
        <div class="box-label tekh mt">What the sugya says</div>
        <div class="blk">${esc(n.match)}</div>
        <div class="box-label maroon mt">Where it gets contested</div>
        <div class="qbox"><div class="blk">${esc(n.question)}</div></div>
        <div class="box-label tekh mt">Sources, as written</div>
        ${(n.sources||[]).map(srcBox).join("")}
        ${(n.reading||[]).length ? `<div class="box-label gold mt">Further reading</div>
          <div class="teshbox">${n.reading.map(r=>`<a class="tlink" href="${r.u}" target="_blank" rel="noopener">${esc(r.t)} ↗</a>`).join("")}</div>` : ""}
      </div>` : ""}
    </div>`;
  }

  function sectionHead(c){
    return `<div class="sec-head">
      <span class="sec-he heb" dir="rtl">${esc(c.name.he)}</span>
      <span class="sec-en">${esc(c.name.en)}</span>
      <span class="sec-latin">${esc(c.latin)}</span>
    </div><p class="sec-lead">${esc(c.lead)}</p>`;
  }

  /* ---------- esrog diagram ---------- */
  function esrogSvg(){
    const hot = r => (state.region===r || (state.region==="all")) ? "hot" : "";
    return `<svg viewBox="0 0 200 300" aria-label="Esrog regions">
      <path d="M100 262 C60 262 38 222 38 168 C38 112 62 76 96 62 C104 58 110 60 112 56 L112 40 C112 34 118 34 118 40 L118 58 C142 72 162 110 162 168 C162 222 140 262 100 262 Z" fill="#F1E3A0" stroke="#946321" stroke-width="1.6"/>
      <g stroke="#946321" stroke-width=".8" opacity=".55" fill="none">
        <path d="M70 250 C60 200 62 140 90 90"/><path d="M130 250 C140 200 138 140 110 90"/><path d="M100 258 C96 200 96 140 100 92"/>
      </g>
      <!-- pitom -->
      <rect x="110" y="30" width="10" height="30" rx="3" fill="#8a6a3a"/>
      <circle cx="115" cy="28" r="5" fill="#6b4f2a"/>
      <!-- oketz -->
      <rect x="95" y="258" width="10" height="14" rx="2" fill="#7a5a2a"/>
      <!-- regions -->
      <path class="region ${hot("pitom")}" data-region="pitom" d="M100 22 h30 v42 h-30 z"/>
      <path class="region ${hot("chotem")}" data-region="chotem" d="M60 110 C70 80 90 64 100 64 C112 64 132 80 142 110 Z"/>
      <path class="region ${hot("body")}" data-region="body" d="M60 110 L142 110 C160 150 160 220 100 262 C40 220 40 150 60 110 Z"/>
      <path class="region ${hot("oketz")}" data-region="oketz" d="M85 254 h30 v24 h-30 z"/>
      <text class="rlabel ${hot("pitom")}" x="132" y="34">pitom</text>
      <text class="rlabel ${hot("chotem")}" x="146" y="96">chotem</text>
      <text class="rlabel ${hot("body")}" x="164" y="180">body</text>
      <text class="rlabel ${hot("oketz")}" x="118" y="272">oketz</text>
      <line x1="46" y1="110" x2="154" y2="110" stroke="#1F4E79" stroke-dasharray="3 3" stroke-width=".9"/>
    </svg>`;
  }

  function blemishCard(b){
    const open = state.openId === b.id;
    const reg = D.regions[b.region];
    return `<div class="card ${open?"open":""}" id="c-${b.id}">
      <div class="card-head" data-open="${b.id}" data-hover="${b.region}">
        <div class="row1">
          <span class="bl-see">${esc(b.see.en)}</span>
          <span class="nm-he heb" dir="rtl">${esc(b.see.he)}</span>
        </div>
        <div class="bl-region">${esc(reg.en)}</div>
        <div class="badges">${badge("status", b.status)}</div>
        <div class="toggle">${open ? "▾ close" : "▸ cause · sugya · sources"}</div>
      </div>
      ${open ? `<div class="detail">
        <div class="box-label green">What made it</div>
        <div class="blk">${esc(b.cause)}</div>
        <div class="box-label tekh mt">What the sugya says</div>
        <div class="blk">${esc(b.sugya)}</div>
        <div class="box-label tekh mt">Sources, as written</div>
        ${(b.sources||[]).map(srcBox).join("")}
      </div>` : ""}
    </div>`;
  }

  function renderControls(){
    const views = [["all","All","הַכֹּל"], ...D.categories.map(c=>[c.id, c.name.en, c.name.he]), ["guide","Blemish guide","סִימָנֵי פְּסוּל"]];
    $("#controls").innerHTML = `
      <div class="catrow">${views.map(v=>`<button class="pill ${state.view===v[0]?"on":""}" data-view="${v[0]}">${esc(v[1])}<span class="heb" dir="rtl">${esc(v[2])}</span></button>`).join("")}</div>
      <div class="langrow"><span class="langlbl">Sources:</span>
        <button class="langpill on" disabled>Hebrew</button>
        <button class="langpill ${state.showTr?"on":""}" data-lang="tr">Transliteration</button>
        <button class="langpill ${state.showEn?"on":""}" data-lang="en">English</button>
      </div>`;
  }

  function renderList(){
    let html = "";
    if(state.view === "all"){
      html += `<div class="sec-head"><span class="sec-he heb" dir="rtl">פְּרִי עֵץ הָדָר כַּפֹּת תְּמָרִים וַעֲנַף עֵץ־עָבֹת וְעַרְבֵי־נָחַל</span></div>
        <p class="sec-lead">${esc(D.principle.en)}</p>${D.principle.sources.map(srcBox).join("")}`;
      D.categories.forEach(c => { html += sectionHead(c) + c.nodes.map(nodeCard).join(""); });
    } else if(state.view === "guide"){
      html += `<div class="sec-head"><span class="sec-he heb" dir="rtl">סִימָנֵי פְּסוּל בָּאֶתְרוֹג</span><span class="sec-en">Blemish guide, by region</span></div>
        <p class="sec-lead">The sugya judges an esrog mark by three things: where it sits (the chotem, from where the fruit starts to narrow, is judged by any amount), whether it is raised (chazazis is defined by touch), and whether flesh is missing. Click a region on the fruit, or a mark in the list, to read what the plant did and what the sugya says about it.</p>
        <div class="guide">
          <div class="figwrap">${esrogSvg()}<div class="fig-cap">Dashed line: where the chotem begins, "from the place it starts to narrow and sharpen toward its head" (OC 648:9). Click a region to filter.</div></div>
          <div class="bl-list">${D.blemishes.filter(b => !state.region || b.region===state.region || b.region==="all").map(blemishCard).join("")}</div>
        </div>`;
    } else {
      const c = D.categories.find(x => x.id === state.view);
      html += sectionHead(c) + c.nodes.map(nodeCard).join("");
    }
    $("#list").innerHTML = html;
  }

  function render(){ renderControls(); renderList(); }

  document.addEventListener("click", e => {
    const v = e.target.closest("[data-view]");
    if(v){ state.view = v.dataset.view; state.openId = null; state.region = null; render(); window.scrollTo({top:0,behavior:"smooth"}); return; }
    const l = e.target.closest("[data-lang]");
    if(l){ if(l.dataset.lang==="tr") state.showTr = !state.showTr; else state.showEn = !state.showEn; render(); return; }
    const r = e.target.closest("[data-region]");
    if(r){ state.region = (state.region === r.dataset.region) ? null : r.dataset.region; state.openId = null; renderList(); return; }
    const o = e.target.closest("[data-open]");
    if(o){
      const id = o.dataset.open;
      state.openId = (state.openId === id) ? null : id;
      renderList();
      if(state.openId){ const el = document.getElementById("c-"+id); if(el) el.scrollIntoView({behavior:"smooth", block:"nearest"}); }
    }
  });

  render();
})();
