/* ============================================================================
   CHAGAVIM — render layer (vanilla JS).  Reads window.CHAGAVIM_DATA.
   Language toggle swaps content. Siman-checker is a live diagnostic.
   ============================================================================ */
(function () {
  const D = window.CHAGAVIM_DATA;
  const APP = document.getElementById("app");

  /* ----- state ----- */
  let L = "he";                 // he | se | en
  let SECTION = "kinds";        // kinds | signs | derivation | more | plates
  let SEL = null;               // selected item id for rail detail
  let CHK = { raglayim:true, kenafayim:true, karsulayim:true, rubo:true, shem:true,
              gabachat:false, zanav:false, roshArokh:false };

  /* ----- helpers ----- */
  const t = (o) => !o ? "" : (L==="he" ? (o.he||o.en||"") : L==="se" ? (o.se||o.en||o.he||"") : (o.en||o.he||""));
  const esc = (s)=> (s==null?"":String(s)).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
  const img = (file,w)=> "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(file)+"?width="+w;
  const isHE = ()=> L==="he";
  const PCOLOR = { arbeh:"var(--p-arbeh)", solam:"var(--p-solam)", hargol:"var(--p-hargol)", hagav:"var(--p-hagav)" };

  const UI = {
    brandSub:{he:"חולין ס״ה",se:"Kosher Locusts · Chullin 65",en:"Kosher Locusts · Chullin 65"},
    kinds:{he:"הַמִּינִים",se:"The Kinds",en:"The Kinds"},
    signs:{he:"סִימָנִים",se:"Signs",en:"Signs"},
    derivation:{he:"מִדְרָשׁ",se:"Derivation",en:"Derivation"},
    more:{he:"מִינִים נוֹסָפִים",se:"More Species",en:"More Species"},
    plates:{he:"לוּחוֹת",se:"Plates",en:"Plates"},
    talmud:{he:"בַּשַּׁ״ס",se:"Across Shas",en:"Across Shas"},
    gemara:{he:"גְּמָרָא",se:"Gemara · Chullin 65",en:"Gemara · Chullin 65"},
    tanach:{he:"בַּמִּקְרָא",se:"In Tanakh",en:"In Tanakh"},
    detail:{he:"פֵּרוּט",se:"Detail",en:"Detail"},
    selectHint:{he:"בְּחַר מִין לִרְאוֹת מָקוֹר וְשׁוֹרֶשׁ",se:"Select a kind for source & etymology",en:"Select a kind to see its source text and etymology"},
    sourceText:{he:"מָקוֹר",se:"Source",en:"Source text"},
    rashiLab:{he:"רש״י",se:"Rashi",en:"Rashi"},
    etymLab:{he:"שֵׁמוֹת וְשׁוֹרֶשׁ",se:"Names & etymology",en:"Names & cognates"},
    signLab:{he:"סִימָן מַבְחִין",se:"Distinguishing sign",en:"Distinguishing feature"},
    verse:{he:"הַפָּסוּק",se:"The verse",en:"The verse"},
    baseSigns:{he:"אַרְבָּעָה סִימָנִים",se:"The four required signs",en:"The four required signs"},
    derivedFeat:{he:"שָׁלֹשׁ הַבְחָנוֹת",se:"Three distinguishing features",en:"Three distinguishing features (not disqualifying)"},
    checker:{he:"בּוֹדֵק סִימָנִים",se:"Siman checker",en:"Siman checker"},
    kosher:{he:"טָהוֹר",se:"Kosher",en:"Kosher"},
    notk:{he:"אֵינוֹ טָהוֹר",se:"Not kosher",en:"Not kosher"},
  };

  /* ===================================================================== */
  function render() {
    APP.innerHTML =
      header() +
      '<div class="layout"><main class="canvas">' + canvas() + '</main>' +
      '<aside class="rail">' + rail() + '</aside></div>';
    wire();
  }

  /* -------- header -------- */
  function header() {
    const secs = ["kinds","signs","gemara","tanach","more","plates"];
    const nav = secs.map(s =>
      `<button data-sec="${s}" class="${SECTION===s?"on":""}">`+
      (isHE()? `<span class="he">${esc(UI[s].he)}</span>` : esc(t(UI[s])))+`</button>`).join("");
    const langs = ["he","se","en"].map(x =>
      `<button data-lang="${x}" class="${L===x?"on":""}">${x.toUpperCase()}</button>`).join("");
    return `<header class="shell"><div class="shell-inner">
      <div class="brand"><span class="name he">חֲגָבִים</span><span class="sub">${esc(t(UI.brandSub))}</span></div>
      <nav class="sections">${nav}</nav>
      <div class="head-right">
        <span class="crumb">${isHE()?`<span class="he">${esc(UI[SECTION].he)}</span>`:esc(t(UI[SECTION]))}</span>
        <div class="lang-toggle">${langs}</div>
      </div></div></header>`;
  }

  /* -------- canvas router -------- */
  function canvas() {
    if (SECTION==="kinds") return secKinds();
    if (SECTION==="signs") return secSigns();
    if (SECTION==="gemara") return secGemara();
    if (SECTION==="tanach") return secTanach();
    if (SECTION==="more") return secMore();
    if (SECTION==="plates") return secPlates();
    return "";
  }

  function secHead(titleObj, intro, seg) {
    return `<div class="sec-head"><div class="titles">
        <span class="eyebrow">${esc(t(D.meta.sugya))} · ${esc(t(D.meta.verse))}</span>
        <h1>${isHE()?`<span class="he">${esc(titleObj.he)}</span>`:esc(t(titleObj))}</h1>
      </div>${seg||""}</div>` + (intro?`<p class="intro">${intro}</p>`:"");
  }

  /* ===== KINDS ===== */
  function secKinds() {
    const intro = isHE()
      ? `<span class="he">אַרְבָּעָה מִינִים נֶאֶמְרוּ בַּתּוֹרָה, וְכָל אֶחָד נִקְרָא בַּתַּלְמוּד בְּשֵׁם אַחֵר. הַשֵּׁמוֹת בְּחולין ס״ה. וּבְחולין ס״ה: חֲלוּקִים.</span>`
      : `The Torah names four kosher kinds (Lev. 11:22). The beraita pairs each with a vernacular name — but Chullin 65a and 65b disagree on which name belongs to sol‘am and which to ḥargol, so both are shown side by side.`;
    const cards = D.torahTypes.map(ty => {
      const m = Object.values(D.media).find(x=>x.tie===ty.id);
      const thumb = m ? `<img class="thumb" src="${img(m.file,520)}" alt="${esc(t(m.caption))}" loading="lazy">` : "";
      const n65a = ty.talmudName_65a, n65b = ty.talmudName_65b;
      const namesBlock = `<div class="names2">
          <div class="col"><div class="src">65a</div>
            <div class="nm">${esc(n65a.he)}</div>${isHE()?"":`<div class="nm-tr">${esc(n65a.se)}</div>`}</div>
          <div class="col"><div class="src">65b</div>
            <div class="nm">${esc((n65b||n65a).he)}</div>${isHE()?"":`<div class="nm-tr">${esc((n65b||n65a).se)}</div>`}</div>
        </div>` + (n65b?`<div class="swap-note">${isHE()?'<span class="he">חִילּוּף שֵׁמוֹת בֵּין הַסּוּגְיוֹת</span>':"names reversed between the two passages"}</div>`:"");
      return `<div class="card ${SEL===ty.id?"on":""}" data-sel="${ty.id}">
        <div class="topbar" style="background:${PCOLOR[ty.id]}"></div>
        ${thumb}
        <div class="body">
          <div class="torah he">${esc(ty.torahName.he)}</div>
          ${isHE()?"":`<div class="torah-tr">${esc(ty.torahName.se)}</div>`}
          ${namesBlock}
          <div class="chips"><span class="chip feat">${isHE()?`<span class="he">${esc(ty.sign.he)}</span>`:esc(t(ty.sign))}</span></div>
        </div></div>`;
    }).join("");
    return secHead(D.meta.title, intro) + `<div class="grid kinds">${cards}</div>`;
  }

  /* ===== SIGNS + CHECKER ===== */
  function secSigns() {
    const base = D.simanim.base;
    const baseRows = base.filter(s=>s.id!=="shem").map(s=>signRow(s,false)).join("");
    const shem = base.find(s=>s.id==="shem");
    const derivedRows = D.simanim.derived.map(s=>signRow(s,true)).join("");
    const checker = `<div class="signbox">
        <span class="eyebrow">${esc(t(UI.baseSigns))}</span>
        ${baseRows}${signRow(shem,false)}
      </div>
      <div class="signbox">
        <span class="eyebrow">${esc(t(UI.derivedFeat))}</span>
        ${derivedRows}
      </div>
      ${verdict()}`;
    const intro = isHE()
      ? `<span class="he">אַרְבָּעָה סִימָנִים נִדְרָשִׁים בְּכָל חָגָב טָהוֹר, וְעוֹד שֵׁם ״חָגָב״. שָׁלֹשׁ הַבְחָנוֹת (גַּבַּחַת, זָנָב, רֹאשׁ אָרוֹךְ) אֵינָן פּוֹסְלוֹת.</span>`
      : `Every kosher locust needs the four signs of the Mishnah, plus the name ḥagav (R. Yosei). The three further features the sugya works through — smooth forehead, tail, long head — do <i>not</i> disqualify. Toggle them and watch the verdict.`;
    return secHead(UI.signs, intro) + checker;
  }

  function signRow(s, derived) {
    const on = CHK[s.id];
    return `<div class="signrow ${derived?"derived":""}">
      <div class="toggle ${on?"on":""}" data-chk="${s.id}"><span class="knob"></span></div>
      <div class="lab"><span class="he">${esc(s.he)}</span>${isHE()?"":` <span class="en">— ${esc(s.en)}</span>`}</div>
    </div>`;
  }

  function verdict() {
    const baseKeys = ["raglayim","kenafayim","karsulayim","rubo"];
    const baseLabels = {raglayim:D.simanim.base[0],kenafayim:D.simanim.base[1],karsulayim:D.simanim.base[2],rubo:D.simanim.base[3]};
    const missing = baseKeys.filter(k=>!CHK[k]);
    let cls, status, why, profile="";
    if (missing.length) {
      cls="not"; status=t(UI.notk);
      const names = missing.map(k=>t(baseLabels[k])).join(", ");
      why = isHE()? `חָסֵר סִימָן: ${esc(missing.map(k=>baseLabels[k].he).join(", "))}`
                  : `Missing a required sign: ${esc(names)}.`;
    } else if (!CHK.shem) {
      cls="not"; status=t(UI.notk);
      why = isHE()? `יֵשׁ בּוֹ כָּל הַסִּימָנִים אַךְ אֵין שְׁמוֹ חָגָב — כְּגוֹן הַצַּרְצוּר.`
                  : `It bears all four signs, yet its name is not ḥagav — the tzartzur case (Chullin 65b).`;
    } else {
      cls="kosher"; status=t(UI.kosher);
      why = isHE()? `אַרְבָּעָה סִימָנִים וּשְׁמוֹ חָגָב.` : `All four signs are present and its name is ḥagav.`;
      // profile from derived features
      const g=CHK.gabachat, z=CHK.zanav, r=CHK.roshArokh;
      let p;
      if(!g&&!z) p = isHE()?'תֹּאַר אַרְבֶּה (גּוֹבַאי): אֵין גַּבַּחַת, אֵין זָנָב':'arbeh / govai profile — no smooth forehead, no tail';
      else if(g&&!z) p = isHE()?'תֹּאַר סָלְעָם: יֵשׁ גַּבַּחַת, אֵין זָנָב':'sol‘am profile — smooth forehead, no tail';
      else if(g&&z) p = isHE()?'תֹּאַר חַרְגֹּל: יֵשׁ גַּבַּחַת וְיֵשׁ זָנָב':'ḥargol profile — smooth forehead and a tail';
      else p = isHE()?'זָנָב בְּלֹא גַּבַּחַת: אֵינוֹ אֶחָד מִן הַתְּאָרִים שֶׁבַּבָּרַיְתָא, אַךְ נִכְלָל בְּבִנְיַן הָאָב':'tail without smooth forehead — not a named profile, yet included by the binyan-av';
      if(r) p += isHE()? ' · רֹאשׁ אָרוֹךְ — נִכְלָל מִ״סָלְעָם הַיָּתֵר״ (רַב אַחַאי)' : ' · long-headed — included via the redundant sol‘am (Rav Aḥai)';
      profile = `<div class="profile">${esc(p)}</div>`;
    }
    return `<div class="verdict ${cls}"><div class="status">${esc(status)}</div><div class="why">${why}</div>${profile}</div>`;
  }

  /* ===== DERIVATION ===== */
  function secDerivation() {
    const steps = D.derivation.steps.map((s,i)=>{
      const stageLab = {klal:"כְּלָל / klal",prat:"פְּרָט / prat","binyan-av":"בִּנְיַן אָב","rav-achai":"רַב אַחַאי"}[s.stage]||s.stage;
      const block = `<div class="step">
        <div class="stage">${esc(stageLab)}</div>
        ${s.he?`<div class="he">${esc(s.he)}</div>`:""}
        ${isHE()?"":`<div class="en">${esc(s.en)}</div>`}
        <div class="ref">${esc(s.ref)} · <a href="${esc(s.sefaria)}" target="_blank" rel="noopener">Sefaria</a></div>
      </div>`;
      return block + (i<D.derivation.steps.length-1?'<div class="connector"></div>':"");
    }).join("");
    const intro = isHE()
      ? `<span class="he">מִכְּלָל וּפְרָט וּכְלָל לְבִנְיַן אָב: שְׁלֹשֶׁת הַמִּינִים שׁוֹנִים זֶה מִזֶּה, וְהַצַּד הַשָּׁוֶה — אַרְבָּעָה סִימָנִים — הוּא הַכְּלָל.</span>`
      : `From klal-prat-klal to a binyan av: because the three kinds differ from one another, their common denominator — the four signs — becomes the operative rule, and even a long-headed locust qualifies.`;
    const b = D.beraisos;
    const berItems = b.items.map(it=>`<div class="step" style="margin-bottom:12px">
        <div class="stage">${isHE()?`<span class="he">${esc(it.label.he)}</span>`:esc(t(it.label))} · ${esc(it.ref)}</div>
        <div class="he">${esc(it.he)}</div>
        ${isHE()?"":`<div class="en">${esc(it.en)}</div>`}
        <div class="ref"><span class="badge direct">direct</span> <a href="${esc(it.sefaria)}" target="_blank" rel="noopener">${esc(it.ref)} →</a></div>
      </div>`).join("");
    const r = b.rashi;
    const rNote = isHE()? r.note.he : r.note.en;
    const berRashi = `<div class="step" style="margin-bottom:12px;border-left-color:var(--mute)">
        <div class="stage">${isHE()?'<span class="he">רש״י</span>':"Rashi"} · ${esc(r.ref)}</div>
        <div class="he">${esc(r.he)}</div>
        <div style="font-size:12.5px;color:var(--mute);font-style:italic;margin-top:7px">${esc(rNote)}</div>
        <div class="ref"><span class="badge direct">direct</span> <a href="${esc(r.sefaria)}" target="_blank" rel="noopener">${esc(r.ref)} →</a></div>
      </div>`;
    const berHead = `<div class="sec-head" style="margin-top:36px"><div class="titles"><span class="eyebrow">${esc(t(D.meta.sugya))}</span><h1 style="font-size:20px">${isHE()?`<span class="he">${esc(b.title.he)}</span>`:esc(t(b.title))}</h1></div></div>`
      + (isHE()?`<p class="intro"><span class="he">${esc(b.intro.he)}</span></p>`:`<p class="intro">${esc(b.intro.en)}</p>`);
    return secHead(UI.derivation, intro) + `<div class="chain">${steps}</div>` + berHead + `<div class="chain">${berItems}${berRashi}</div>`;
  }

  /* ===== TALMUD ACROSS SHAS ===== */
  function secTalmud() {
    const items = D.talmud.sugyot.map(s=>{
      const noteTxt = isHE() ? (s.note_he||"") : (s.note_en||"");
      const note = noteTxt ? `<div style="font-size:12.5px;color:var(--mute);font-style:italic;margin-top:7px">${esc(noteTxt)}</div>` : "";
      return `<div class="step" style="margin-bottom:12px">
        <div class="stage">${isHE()?`<span class="he">${esc(s.topic.he)}</span>`:esc(t(s.topic))} · ${esc(s.ref)}</div>
        <div class="he">${esc(s.he)}</div>
        ${isHE()?"":`<div class="en">${esc(s.en)}</div>`}
        ${note}
        <div class="ref"><span class="badge ${esc(s.badge)}">${esc(s.badge)}</span> <a href="${esc(s.sefaria)}" target="_blank" rel="noopener">${esc(s.ref)} →</a></div>
      </div>`;
    }).join("");
    const intro = isHE()?`<span class="he">${esc(D.talmud.intro.he)}</span>`:esc(D.talmud.intro.en);
    return secHead(D.talmud.title, intro) + `<div class="chain">${items}</div>`;
  }

  /* ===== GEMARA (merged: derivation + full beraisos + across Shas) ===== */
  function secGemara() {
    const eb = (he,en) => `<div style="margin:28px 0 10px"><span class="eyebrow">${isHE()?`<span class="he">${esc(he)}</span>`:esc(en)}</span></div>`;
    // 1) derivation chain
    const steps = D.derivation.steps.map((s,i)=>{
      const stageLab = {klal:"כְּלָל / klal",prat:"פְּרָט / prat","binyan-av":"בִּנְיַן אָב","rav-achai":"רַב אַחַאי"}[s.stage]||s.stage;
      const block = `<div class="step"><div class="stage">${esc(stageLab)}</div>${s.he?`<div class="he">${esc(s.he)}</div>`:""}${isHE()?"":`<div class="en">${esc(s.en)}</div>`}<div class="ref">${esc(s.ref)} · <a href="${esc(s.sefaria)}" target="_blank" rel="noopener">Sefaria</a></div></div>`;
      return block + (i<D.derivation.steps.length-1?'<div class="connector"></div>':"");
    }).join("");
    // 2) full beraisos
    const b = D.beraisos;
    const berItems = b.items.map(it=>`<div class="step" style="margin-bottom:12px">
        <div class="stage">${isHE()?`<span class="he">${esc(it.label.he)}</span>`:esc(t(it.label))} · ${esc(it.ref)}</div>
        <div class="he">${esc(it.he)}</div>
        ${isHE()?"":`<div class="en">${esc(it.en)}</div>`}
        <div class="ref"><span class="badge direct">direct</span> <a href="${esc(it.sefaria)}" target="_blank" rel="noopener">${esc(it.ref)} →</a></div>
      </div>`).join("");
    const r = b.rashi; const rNote = isHE()? r.note.he : r.note.en;
    const berRashi = `<div class="step" style="margin-bottom:12px;border-left-color:var(--mute)">
        <div class="stage">${isHE()?'<span class="he">רש״י</span>':"Rashi"} · ${esc(r.ref)}</div>
        <div class="he">${esc(r.he)}</div>
        <div style="font-size:12.5px;color:var(--mute);font-style:italic;margin-top:7px">${esc(rNote)}</div>
        <div class="ref"><span class="badge direct">direct</span> <a href="${esc(r.sefaria)}" target="_blank" rel="noopener">${esc(r.ref)} →</a></div>
      </div>`;
    // 3) across Shas
    const tItems = D.talmud.sugyot.map(s=>{
      const noteTxt = isHE()? (s.note_he||"") : (s.note_en||"");
      const note = noteTxt ? `<div style="font-size:12.5px;color:var(--mute);font-style:italic;margin-top:7px">${esc(noteTxt)}</div>` : "";
      return `<div class="step" style="margin-bottom:12px">
        <div class="stage">${isHE()?`<span class="he">${esc(s.topic.he)}</span>`:esc(t(s.topic))} · ${esc(s.ref)}</div>
        <div class="he">${esc(s.he)}</div>
        ${isHE()?"":`<div class="en">${esc(s.en)}</div>`}
        ${note}
        <div class="ref"><span class="badge ${esc(s.badge)}">${esc(s.badge)}</span> <a href="${esc(s.sefaria)}" target="_blank" rel="noopener">${esc(s.ref)} →</a></div>
      </div>`;
    }).join("");
    const intro = isHE()
      ? `<span class="he">סוּגְיַת הַזִּהוּי בְּחוּלִּין ס״ה בִּשְׁלֵמוּתָהּ — הַדְּרָשָׁה, הַבָּרַיְתוֹת, וּמְקוֹמוֹת הֶחָגָב בִּשְׁאָר הַשַּׁ״ס.</span>`
      : `The full identification sugya of Chullin 65 — the derivation, the complete beraisos, and where the locust appears elsewhere in the Talmud.`;
    const head = `<div class="sec-head"><div class="titles"><span class="eyebrow">${esc(t(D.meta.sugya))} · ${esc(t(D.meta.verse))}</span><h1>${isHE()?`<span class="he">${esc(UI.gemara.he)}</span>`:esc(t(UI.gemara))}</h1></div></div>`
      + `<p class="intro">${intro}</p>`;
    return head
      + eb("דְּרָשַׁת הַמִּינִים — כְּלָל וּפְרָט וּכְלָל","Deriving the kinds — klal-prat-klal") + `<div class="chain">${steps}</div>`
      + eb("הַבָּרַיְתוֹת בִּשְׁלֵמוּתָן","The beraisos in full") + `<div class="chain">${berItems}${berRashi}</div>`
      + eb("בְּכָל הַשַּׁ״ס — מֵעֵבֶר לְחוּלִּין ס״ה","Across Shas — beyond Chullin 65") + `<div class="chain">${tItems}</div>`;
  }

  /* ===== LOCUST ACROSS TANAKH ===== */
  function secTanach() {
    const intro = isHE()?`<span class="he">${esc(D.tanach.intro.he)}</span>`:esc(D.tanach.intro.en);
    const head = `<div class="sec-head"><div class="titles"><span class="eyebrow">${isHE()?'<span class="he">תַּנַ״ךְ וּתְפִלָּה</span>':"Tanakh & liturgy"}</span><h1>${isHE()?`<span class="he">${esc(D.tanach.title.he)}</span>`:esc(t(D.tanach.title))}</h1></div></div><p class="intro">${intro}</p>`;
    const body = D.tanach.groups.map(g=>{
      const items = g.items.map(it=>{
        const gist = (!isHE() && it.gist_en) ? `<div style="font-size:12.5px;color:var(--mute);font-style:italic;margin-top:7px">${esc(it.gist_en)}</div>` : "";
        const word = it.word ? ` · <span style="font-family:var(--hebrew)">${esc(it.word)}</span>` : "";
        return `<div class="step" style="margin-bottom:12px">
          <div class="stage">${isHE()?`<span class="he">${esc(it.label.he)}</span>`:esc(t(it.label))} · ${esc(it.ref)}${word}</div>
          <div class="he">${esc(it.he)}</div>
          ${isHE()?"":`<div class="en">${esc(it.en)}</div>`}
          ${gist}
          <div class="ref"><a href="${esc(it.sefaria)}" target="_blank" rel="noopener">${esc(it.ref)} →</a></div>
        </div>`;
      }).join("");
      return `<div style="margin:24px 0 10px"><span class="eyebrow">${isHE()?`<span class="he">${esc(g.cat.he)}</span>`:esc(t(g.cat))}</span></div><div class="chain">${items}</div>`;
    }).join("");
    return head + body;
  }

  /* ===== MORE SPECIES ===== */
  function secMore() {
    const byParent = {};
    D.extraSpecies.forEach(sp=>{(byParent[sp.parent]=byParent[sp.parent]||[]).push(sp);});
    const order=["arbeh","solam","hargol","hagav"];
    let html="";
    order.forEach(pid=>{
      const list=byParent[pid]; if(!list) return;
      const parent=D.torahTypes.find(x=>x.id===pid);
      html+=`<div style="margin-bottom:8px"><span class="eyebrow">${isHE()?`<span class="he">${esc(parent.torahName.he)}</span>`:esc(parent.torahName.se)} · לְמִינֵהוּ</span></div>
        <div class="grid species" style="margin-bottom:22px">`+
        list.map(sp=>spCard(sp)).join("")+`</div>`;
    });
    // excluded look-alike
    const ex=D.excluded;
    html+=`<div style="margin:10px 0 8px"><span class="eyebrow" style="color:var(--p-excl)">${isHE()?'<span class="he">אֵינוֹ טָהוֹר</span>':"Excluded look-alike"}</span></div>
      <div class="card on" style="outline-color:var(--p-excl);cursor:default;max-width:520px">
        <div class="topbar" style="background:var(--p-excl)"></div>
        <div class="body">
          <div class="torah he" style="color:var(--p-excl)">${esc(ex.name.he)}</div>
          ${isHE()?"":`<div class="torah-tr">${esc(ex.name.se)}</div>`}
          <p style="font-size:14px;margin:10px 0 0">${isHE()?`<span class="he">${esc(ex.source.he)}</span>`:esc(ex.point_en)}</p>
          <div style="margin-top:10px"><span class="badge direct">direct · ${esc(ex.source.ref)}</span></div>
        </div></div>`;
    const intro = isHE()
      ? `<span class="he">כָּל ״לְמִינֵהוּ״ מְרַבֶּה מִין נוֹסָף. רש״י מְשַׁיֵּךְ כָּל אֶחָד לְאַחַד מִן הָאַרְבָּעָה.</span>`
      : `Each “after its kind” includes a further species; Rashi assigns each to one of the four parent kinds. The lexica give no clean cognate for these names, so they are recorded as names only.`;
    return secHead(UI.more, intro) + html;
  }

  function spCard(sp) {
    const rashi = sp.rashi ? `<p style="font-size:13px;color:var(--mute);font-style:italic;margin:8px 0 0">${isHE()?`<span class="he" style="font-style:normal">${esc(sp.rashi.he)}</span>`:esc(sp.rashi.en)}</p>`:"";
    return `<div class="card" style="cursor:default"><div class="topbar" style="background:var(--dotted)"></div>
      <div class="body">
        <div class="torah he" style="font-size:23px">${esc(sp.name.he)}</div>
        ${isHE()?"":`<div class="torah-tr">${esc(sp.name.se)}</div>`}
        ${rashi}
        <div style="margin-top:9px"><span class="badge direct">direct · ${esc(sp.source.ref)}</span></div>
      </div></div>`;
  }

  /* ===== PLATES ===== */
  function secPlates() {
    const cards = Object.values(D.media).map(m=>`
      <div class="plate"><img src="${img(m.file, 760)}" alt="${esc(t(m.caption))}" loading="lazy">
        <div class="cap">
          <div class="he">${esc(m.caption.he)}</div>
          ${isHE()?"":`<div class="en">${esc(m.caption.en)}</div>`}
          <div class="honesty">${esc(m.honesty)}</div>
          <div class="credit">${esc(m.credit)}</div>
        </div></div>`).join("");
    const intro = isHE()
      ? `<span class="he">תְּמוּנוֹת וְצִיּוּרִים. אֵין תְּמוּנָה מְזַהָה מִין תַּלְמוּדִי שֶׁאֵינוֹ מְזֹהֶה — הַכִּתּוּבִיּוֹת מְתָאֲרוֹת רַק אֶת הַנִּרְאֶה.</span>`
      : `Photographs and drawings. No image is captioned as a positive identification of an unidentified Talmudic min; each caption states only what is depicted, with its source and license.`;
    return secHead(UI.plates, intro) + `<div class="gallery">${cards}</div>`;
  }

  /* -------- rail -------- */
  function rail() {
    let html = `<div class="rail-section"><h3>${esc(t(UI.verse))}</h3>${pasuk(D.verses[1])}</div>`;
    if (SECTION==="kinds" && SEL) {
      const ty = D.torahTypes.find(x=>x.id===SEL);
      if (ty) html += detail(ty);
    } else if (SECTION==="kinds") {
      html += `<div class="rail-section"><div class="rail-empty">${esc(t(UI.selectHint))}</div></div>`;
    } else if (SECTION==="signs") {
      html += `<div class="rail-section"><h3>${esc(t(UI.baseSigns))}</h3>${pasuk(D.verses[0])}</div>`;
    }
    // crux note always available
    const c = D.cruxes[0];
    html += `<div class="rail-section"><h3>${isHE()?`<span class="he">${esc(c.title.he)}</span>`:esc(t(c.title))}</h3>
      <p style="font-size:13px;color:var(--ink);margin:0">${esc(isHE()? "בְּחולין ס״ה. — סָלְעָם הוּא רָשׁוֹן וְחַרְגֹּל הוּא נִיפּוּל; בְּחולין ס״ה: — סָלְעָם הוּא נִיפּוּל וְחַרְגֹּל הוּא רָשׁוֹן. שְׁתֵּי הַבָּרַיְתוֹת מוּבָאוֹת כִּלְשׁוֹנָן." : c.body_en)}</p></div>`;
    html += `<div class="disc"><b>Sourcing.</b> ${isHE()?"כל טקסט מובא כלשונו עם קישור לספריא; נתוני שורש מסומנים lexicon. ":"Every quoted text is verbatim with a Sefaria link; lexical data is badged ‘lexicon’. "}<span class="badge direct">direct</span> <span class="badge lexicon">lexicon</span> <span class="badge descript">descriptive</span></div>`;
    return html;
  }

  function pasuk(v) {
    if(!v) return "";
    return `<div class="pasuk"><div class="he">${esc(v.he)}</div>
      ${L==="se"?`<div class="tr">${esc(v.se)}</div>`:""}
      ${L==="en"?`<div class="en">${esc(v.en)}</div>`:""}
      <div class="ref"><span class="r">${esc(v.ref)}</span><a href="${esc(v.sefaria)}" target="_blank" rel="noopener">Sefaria →</a></div></div>`;
  }

  function detail(ty) {
    const m = Object.values(D.media).find(x=>x.tie===ty.id);
    const imgBlock = m ? `<div class="rail-section"><img class="rail-img" src="${img(m.file,520)}" alt="">
        <div class="rail-cap">${esc(t(m.caption))} — <i>${esc(m.honesty)}</i></div></div>`:"";
    const src = ty.source;
    const srcBlock = `<div class="rail-section"><h3>${esc(t(UI.sourceText))}</h3>
      <div class="pasuk"><div class="he">${esc(src.he)}</div>
        ${isHE()?"":`<div class="en">${esc(src.en)}</div>`}
        <div class="ref"><span class="r">${esc(src.ref)}</span><a href="${esc(src.sefaria)}" target="_blank" rel="noopener">Sefaria →</a></div></div></div>`;
    const etyms = (ty.etymology||[]).map(e=>{
      const latin = /[A-Za-z]/.test(e.forms) && !/[\u0590-\u05FF]/.test(e.forms);
      return `<div class="etym"><div class="lang">${esc(e.lang)} <span class="badge lexicon">lexicon</span></div>
        ${e.forms&&e.forms!=="—"?`<div class="forms ${latin?"latin":""}">${esc(e.forms)}</div>`:""}
        ${isHE()?"":`<div class="gloss">${esc(e.text_en)}</div>`}
        <div class="ref" style="margin-top:5px"><a href="${esc(e.sefaria)}" target="_blank" rel="noopener" style="font-family:var(--display);font-size:9px;letter-spacing:.08em;text-transform:uppercase">${esc(e.ref)} →</a></div></div>`;
    }).join("");
    const etymBlock = etyms ? `<div class="rail-section"><h3>${esc(t(UI.etymLab))}</h3>${etyms}</div>`:"";
    const signBlock = `<div class="rail-section"><h3>${esc(t(UI.signLab))}</h3>
      <p style="margin:0;font-size:14px">${isHE()?`<span class="he">${esc(ty.sign.he)}</span>`:esc(t(ty.sign))}</p></div>`;
    return imgBlock + srcBlock + signBlock + etymBlock;
  }

  /* -------- events -------- */
  function wire() {
    APP.querySelectorAll("[data-lang]").forEach(b=>b.onclick=()=>{L=b.dataset.lang;render();});
    APP.querySelectorAll("[data-sec]").forEach(b=>b.onclick=()=>{SECTION=b.dataset.sec;SEL=null;render();});
    APP.querySelectorAll("[data-sel]").forEach(b=>b.onclick=()=>{SEL=(SEL===b.dataset.sel?null:b.dataset.sel);render();});
    APP.querySelectorAll("[data-chk]").forEach(b=>b.onclick=()=>{CHK[b.dataset.chk]=!CHK[b.dataset.chk];render();});
  }

  render();
})();
