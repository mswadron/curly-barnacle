/* ============================================================================
   TALMUD FLORA — Kilayim. Vanilla renderer. Reads window.KILAYIM_FLORA.
   No build step, no React, no in-browser Babel. Science is a springboard only.
   ============================================================================ */
(function () {
  var D = window.KILAYIM_FLORA;
  var APP = document.getElementById("app");
  var P = D.plants;
  var byId = {}; P.forEach(function (p) { byId[p.id] = p; });

  var L = "he";        // he | en (UI chrome + source translations)
  var q = "";
  var fChapter = null, fFamily = null, fConf = null;
  var sel = null;

  function esc(s) { return (s == null ? "" : String(s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var isHE = function () { return L === "he"; };
  var enName = function (p) { return (p.names.en || []).join(" · "); };
  var genus = function (p) { return (p.identification.binomial || "").split(" ")[0]; };

  var UI = {
    eyebrow: { he: "מַסֶּכֶת כִּלְאַיִם · סֵדֶר זְרָעִים", en: "Masechet Kilayim · Seder Zeraim" },
    title_he: "כִּלְאַיִם", sub: { he: "צִמְחֵי הַמִּשְׁנָה", en: "Plants of the Talmud" },
    lede: { he: "כָּל צֶמַח הַנִּזְכָּר בְּמַסֶּכֶת כִּלְאַיִם — מָקוֹר מִן הַמִּשְׁנָה וְהָרַמְבַּ״ם כִּלְשׁוֹנָם, זִהוּי מַדָּעִי, מִשְׁפָּחָה, וְשׁוֹרֶשׁ הַשֵּׁם הַלָּטִינִי.",
      en: "Every plant named in Masechet Kilayim — verbatim Mishnah + Rambam sources, a scholarship-based identification, botanical family, and the etymology of the Latin name. Science is a springboard; the source is primary." },
    search: { he: "חִפּוּשׂ…", en: "Search plants…" },
    chapter: { he: "פֶּרֶק", en: "Chapter" },
    family: { he: "מִשְׁפָּחָה", en: "Family" },
    conf: { he: "וַדָּאוּת", en: "Confidence" },
    clear: { he: "נַקֵּה", en: "Clear" },
    fa: { he: "הֲלָכָה מוּל בּוֹטָנִיקָה", en: "Halacha vs. botany" },
    faSplit: { he: "כִּלְאַיִם אַף שֶׁמֵּאוֹתָהּ מִשְׁפָּחָה", en: "Kilayim despite same family/genus" },
    faUnite: { he: "אֵינָם כִּלְאַיִם אַף שֶׁמִּסּוּג אַחֵר", en: "Not kilayim despite different genus" },
    faNote: { he: "הַ״מִּין״ הַהִלְכָתִי דַּק מִסּוּג לִפְעָמִים (אֲפַרְסֵק וְשָׁקֵד) וְגַס מִסּוּג לִפְעָמִים (תֶּרֶד וּלְעוּנִין) — אַךְ לְעוֹלָם אֵינוֹ חוֹצֶה מִשְׁפָּחָה.",
      en: "Halachic 'min' runs finer than genus (peach & almond) or coarser than genus (beet & orache) — but never crosses a botanical family." },
    src: { he: "מְקוֹרוֹת", en: "Sources" },
    ident: { he: "זִהוּי", en: "Identification" },
    ety: { he: "שׁוֹרֶשׁ הַשֵּׁם הַלָּטִינִי", en: "Latin etymology" },
    rel: { he: "יַחֲסֵי כִּלְאַיִם", en: "Kilayim relations" },
    pairL: { he: "בֶּן זוּג", en: "Wild/domestic pair" },
    mishnah: { he: "מִשְׁנָה", en: "Mishnah" }, rambam: { he: "רַמְבַּ״ם", en: "Rambam" }, bavli: { he: "בַּבְלִי", en: "Bavli" },
    sci: { he: "הֶעָרַת מַדָּע", en: "On the science" },
    sciTxt: { he: "הַזִּהוּי הַמַּדָּעִי וְהַמִּשְׁפָּחָה הַבּוֹטָנִית הֵם דְּעַת חוֹקְרִים (פֶליקְס, עָמַר, לֶעװ) — לֹא הֲלָכָה וְלֹא מָסֹרֶת.",
      en: "The scientific identification and botanical family are scholarly opinion (Feliks, Amar, Löw) — not halacha and not a mesorah." },
    kosher: { he: "כִּלְאַיִם", en: "kilayim" }, notk: { he: "אֵינָם כִּלְאַיִם", en: "not kilayim" },
  };
  function tx(o) { return isHE() ? o.he : o.en; }

  /* ---------- family analysis (computed) ---------- */
  function familyAnalysis() {
    var split = [], unite = [], seen = {};
    P.forEach(function (p) {
      p.kilayim.forEach(function (k) {
        var o = byId[k.with]; if (!o) return;
        var key = [p.id, k.with].sort().join("+"); if (seen[key]) return; seen[key] = 1;
        var sameFam = o.identification.family === p.identification.family && p.identification.family !== "(uncertain)";
        var sameGenus = genus(p) === genus(o);
        if (k.ruling === "kilayim" && sameFam) split.push({ a: p, b: o, sameGenus: sameGenus, fam: p.identification.family });
        if (k.ruling === "not_kilayim" && sameFam && !sameGenus) unite.push({ a: p, b: o, fam: p.identification.family });
      });
    });
    return { split: split, unite: unite };
  }

  /* ---------- filters ---------- */
  function chapters() { var s = {}; P.forEach(function (p) { s[p.chapter] = 1; }); return Object.keys(s).sort(function (a, b) { return a - b; }); }
  function families() { var s = {}; P.forEach(function (p) { s[p.identification.family] = 1; }); return Object.keys(s).sort(); }
  function filtered() {
    var qq = q.trim().toLowerCase();
    return P.filter(function (p) {
      if (fChapter && String(p.chapter) !== fChapter) return false;
      if (fFamily && p.identification.family !== fFamily) return false;
      if (fConf && p.identification.confidence !== fConf) return false;
      if (qq) {
        var hay = (p.names.he + " " + p.names.translit + " " + enName(p) + " " + p.identification.binomial + " " + p.identification.family).toLowerCase();
        if (hay.indexOf(qq) < 0) return false;
      }
      return true;
    });
  }

  /* ---------- render ---------- */
  function render() {
    var fa = familyAnalysis();
    var langBtns = ["he", "en"].map(function (x) { return '<button data-lang="' + x + '" class="' + (L === x ? "on" : "") + '">' + x.toUpperCase() + "</button>"; }).join("");
    var mast = '<div class="mast"><div class="mast-top"><div>' +
      '<div class="eyebrow">' + esc(tx(UI.eyebrow)) + '</div>' +
      '<h1 class="he">' + esc(UI.title_he) + '</h1>' +
      '<div class="sub serif">' + esc(tx(UI.sub)) + '</div>' +
      '<div class="lede' + (isHE() ? ' he' : '') + '">' + esc(tx(UI.lede)) + '</div></div>' +
      '<div class="lang">' + langBtns + '</div></div></div>';

    var list = filtered();
    var cards = list.map(cardHTML).join("");
    var main = '<div class="count">' + list.length + " / " + P.length + (isHE() ? " צְמָחִים" : " plants") + '</div>' +
      '<div class="grid">' + cards + '</div>';

    var layout = '<div class="layout"><aside class="rail">' + railHTML(fa) + '</aside><main>' + main + '</main></div>';
    APP.innerHTML = '<div class="wrap">' + mast + layout + disclaimerHTML() + '</div>';
    wire();
    if (sel) openDetail(sel);
  }

  function railHTML(fa) {
    var chapPills = chapters().map(function (c) { return '<span class="pill ' + (fChapter === c ? "on" : "") + '" data-f="chapter" data-v="' + c + '">' + c + "</span>"; }).join("");
    var famPills = families().map(function (f) { return '<span class="pill ' + (fFamily === f ? "on" : "") + '" data-f="family" data-v="' + esc(f) + '">' + esc(f.replace(" (uncertain)", "?")) + "</span>"; }).join("");
    var confPills = ["settled", "disputed", "conjectural"].map(function (c) { return '<span class="pill ' + (fConf === c ? "on" : "") + '" data-f="conf" data-v="' + c + '">' + c + "</span>"; }).join("");
    var clear = (fChapter || fFamily || fConf || q) ? '<span class="pill" data-f="clear" data-v="1" style="border-color:var(--conjectural);color:var(--conjectural)">✕ ' + esc(tx(UI.clear)) + "</span>" : "";

    var faRows = "";
    fa.split.forEach(function (r) {
      faRows += '<div class="row"><span class="tag split">' + (r.sameGenus ? (isHE() ? "אותו סוג" : "same genus") : (isHE() ? "אותה משפ׳" : "same family")) + '</span> ' +
        '<span class="k he">' + esc(r.a.names.he) + " · " + esc(r.b.names.he) + '</span> <span style="color:var(--muted)">(' + esc(r.fam) + ')</span></div>';
    });
    fa.unite.forEach(function (r) {
      faRows += '<div class="row"><span class="tag unite">' + (isHE() ? "סוג אחר" : "diff genus") + '</span> ' +
        '<span class="k he">' + esc(r.a.names.he) + " · " + esc(r.b.names.he) + '</span> <span style="color:var(--muted)">(' + esc(r.fam) + ')</span></div>';
    });

    return '<div class="panel"><input class="search" id="q" placeholder="' + esc(tx(UI.search)) + '" value="' + esc(q) + '">' +
      '<div class="fg"><div class="fg-h">' + esc(tx(UI.chapter)) + '</div>' + chapPills + '</div>' +
      '<div class="fg"><div class="fg-h">' + esc(tx(UI.conf)) + '</div>' + confPills + '</div>' +
      '<div class="fg"><div class="fg-h">' + esc(tx(UI.family)) + '</div>' + famPills + '</div>' +
      (clear ? '<div class="fg">' + clear + "</div>" : "") + '</div>' +
      '<div class="panel fa"><h3>' + esc(tx(UI.fa)) + '</h3>' +
      '<div class="fg-h" style="color:var(--conjectural)">' + esc(tx(UI.faSplit)) + '</div>' +
      fa.split.map(function (r) { return faRow(r, "split"); }).join("") +
      '<div class="fg-h" style="color:var(--lexicon);margin-top:10px">' + esc(tx(UI.faUnite)) + '</div>' +
      fa.unite.map(function (r) { return faRow(r, "unite"); }).join("") +
      '<div class="fa-note' + (isHE() ? " he" : "") + '">' + esc(tx(UI.faNote)) + '</div></div>';
  }
  function faRow(r, kind) {
    var tag = kind === "split" ? (r.sameGenus ? (isHE() ? "אותו סוג" : "genus") : (isHE() ? "משפחה" : "family")) : (isHE() ? "סוג אחר" : "diff genus");
    return '<div class="row"><span class="tag ' + kind + '">' + esc(tag) + '</span> <span class="k he">' + esc(r.a.names.he) + " · " + esc(r.b.names.he) + "</span></div>";
  }

  function cardHTML(p) {
    var conf = p.identification.confidence;
    return '<div class="card ' + conf + '" data-id="' + p.id + '">' +
      '<div class="cn">' + esc(p.names.he) + '</div>' +
      '<div class="ct">' + esc(p.names.translit) + " · " + esc(enName(p)) + '</div>' +
      '<div class="cbi serif">' + esc(p.identification.binomial) + '</div>' +
      '<div class="cfam">' + esc(p.identification.family) + " · <span style='color:var(--" + conf + ")'>" + conf + "</span></div>" +
      '</div>';
  }

  /* ---------- detail ---------- */
  function srcBlock(cat, ref, he, url, badge, en) {
    return '<div class="src"><div class="sh he">' + esc(he) + '</div>' +
      (en && !isHE() ? '<div class="se">' + esc(en) + '</div>' : "") +
      '<div class="sm"><span class="sr">' + esc(cat) + " · " + esc(ref) + '</span>' +
      '<span><span class="badge ' + badge + '">' + badge + '</span> <a href="' + esc(url) + '" target="_blank" rel="noopener">Sefaria ↗</a></span></div></div>';
  }
  function detailHTML(p) {
    var srcs = "";
    var m = D.mishnah[p.mishnah_ref];
    if (m) srcs += srcBlock(tx(UI.mishnah), "Kilayim " + p.mishnah_ref, m.he, m.sefaria, "direct");
    (p.extra_sources || []).forEach(function (r) { var x = D.mishnah[r]; if (x) srcs += srcBlock(tx(UI.bavli), r, x.he, x.sefaria, "direct"); });
    if (p.rambam && D.rambam[p.rambam]) {
      var url = D.rambam["url_" + p.mishnah_ref.replace(":", "_")] || "https://www.sefaria.org/Rambam_on_Mishnah_Kilayim." + p.mishnah_ref.replace(":", ".");
      srcs += srcBlock(tx(UI.rambam) + " · פֵּירוּשׁ הַמִּשְׁנָיוֹת", "Kilayim " + p.mishnah_ref, D.rambam[p.rambam], url, "direct");
    }

    var idn = p.identification;
    var ety = Object.keys(p.etymology_latin || {}).map(function (w) { return '<div class="ety"><b>' + esc(w) + "</b> — " + esc(p.etymology_latin[w]) + "</div>"; }).join("");

    var rels = p.kilayim.map(function (k) {
      var o = byId[k.with]; var nm = o ? o.names.he : k.with;
      var cls = k.ruling === "kilayim" ? "k" : "nk";
      var lab = k.ruling === "kilayim" ? tx(UI.kosher) : tx(UI.notk);
      return '<span class="rel" data-goto="' + esc(k.with) + '"><span class="rk ' + cls + '">' + esc(lab) + '</span> <span class="he">' + esc(nm) + '</span></span>' +
        (k.note ? '<div class="note">' + esc(k.note) + "</div>" : "");
    }).join("");

    var notes = "";
    if (p.note_ambiguous) notes += '<div class="note">⚑ ' + esc(p.note_ambiguous) + "</div>";
    if (p.note_context) notes += '<div class="note">' + esc(p.note_context) + "</div>";
    if (p.note_halacha) notes += '<div class="note">' + esc(p.note_halacha) + "</div>";

    var pairHTML = p.pair ? '<div class="kv"><span class="kk">' + esc(tx(UI.pairL)) + '</span><span class="vv"><span class="rel" data-goto="' + esc(p.pair.id) + '"><span class="he">' + esc(p.pair.he) + '</span></span>' + (p.pair.note ? '<div class="note">' + esc(p.pair.note) + "</div>" : "") + "</span></div>" : "";

    return '<div class="overlay" id="ov"><div class="detail" onclick="event.stopPropagation()">' +
      '<div class="detail-h"><button class="close" id="cls">×</button>' +
      '<div class="hn">' + esc(p.names.he) + '</div>' +
      '<div class="ht">' + esc(p.names.translit) + " · " + esc(enName(p)) + '</div>' +
      '<div class="hbi serif">' + esc(idn.binomial) + '</div></div>' +
      '<div class="detail-b">' +
      '<div class="sec"><div class="sec-h">' + esc(tx(UI.ident)) + '</div>' +
      '<div class="kv"><span class="kk">binomial</span><span class="vv serif" style="font-style:italic">' + esc(idn.binomial) + '</span></div>' +
      '<div class="kv"><span class="kk">family</span><span class="vv">' + esc(idn.family) + '</span></div>' +
      '<div class="kv"><span class="kk">confidence</span><span class="vv"><span class="conf ' + idn.confidence + '">' + idn.confidence + '</span></span></div>' +
      '<div class="kv"><span class="kk">' + (isHE() ? "מְקוֹר הַזִּהוּי" : "id source") + '</span><span class="vv"><span class="badge ' + (idn.badge || "lexicon") + '">' + (idn.badge || "lexicon") + '</span> ' + esc(idn.id_source) + '</span></div>' +
      pairHTML + notes + '</div>' +
      '<div class="sec"><div class="sec-h">' + esc(tx(UI.src)) + '</div>' + srcs + '</div>' +
      (ety ? '<div class="sec"><div class="sec-h">' + esc(tx(UI.ety)) + '</div>' + ety + "</div>" : "") +
      (rels ? '<div class="sec"><div class="sec-h">' + esc(tx(UI.rel)) + '</div>' + rels + "</div>" : "") +
      '<div class="sec"><div class="sec-h">' + esc(tx(UI.sci)) + '</div><div class="sci-wall' + (isHE() ? " he" : "") + '">' + esc(tx(UI.sciTxt)) + '</div></div>' +
      '</div></div></div>';
  }
  function openDetail(id) {
    sel = id; var p = byId[id]; if (!p) return;
    var wrap = document.createElement("div"); wrap.innerHTML = detailHTML(p);
    document.body.appendChild(wrap.firstChild);
    var ov = document.getElementById("ov");
    ov.onclick = closeDetail;
    document.getElementById("cls").onclick = closeDetail;
    ov.querySelectorAll("[data-goto]").forEach(function (b) { b.onclick = function (e) { e.stopPropagation(); closeDetail(); openDetail(b.getAttribute("data-goto")); }; });
  }
  function closeDetail() { sel = null; var ov = document.getElementById("ov"); if (ov) ov.parentNode.removeChild(ov); }

  function disclaimerHTML() {
    return '<div class="disc' + (isHE() ? " he" : "") + '">' +
      (isHE() ? "כָּל טֶקְסְט מוּבָא כִּלְשׁוֹנוֹ מִסֶּפַרְיָא עִם קִישּׁוּר. " : "Every quoted text is verbatim from Sefaria with a link. ") +
      '<span class="badge direct">direct</span> ' + (isHE() ? "מָקוֹר רִאשׁוֹן · " : "primary source · ") +
      '<span class="badge lexicon">lexicon</span> ' + (isHE() ? "זִהוּי חוֹקְרִים · " : "named authority · ") +
      '<span class="badge descript">descript</span> ' + (isHE() ? "תֵּאוּר" : "editorial") + '.</div>';
  }

  /* ---------- events ---------- */
  function wire() {
    APP.querySelectorAll("[data-lang]").forEach(function (b) { b.onclick = function () { L = b.getAttribute("data-lang"); render(); }; });
    APP.querySelectorAll("[data-id]").forEach(function (b) { b.onclick = function () { openDetail(b.getAttribute("data-id")); }; });
    APP.querySelectorAll("[data-f]").forEach(function (b) {
      b.onclick = function () {
        var f = b.getAttribute("data-f"), v = b.getAttribute("data-v");
        if (f === "clear") { fChapter = fFamily = fConf = null; q = ""; }
        else if (f === "chapter") fChapter = (fChapter === v ? null : v);
        else if (f === "family") fFamily = (fFamily === v ? null : v);
        else if (f === "conf") fConf = (fConf === v ? null : v);
        render();
      };
    });
    var qi = document.getElementById("q");
    if (qi) qi.oninput = function () { q = qi.value; var list = filtered(); var grid = APP.querySelector(".grid"); var cnt = APP.querySelector(".count"); if (grid) grid.innerHTML = list.map(cardHTML).join(""); if (cnt) cnt.textContent = list.length + " / " + P.length + (isHE() ? " צְמָחִים" : " plants"); grid.querySelectorAll("[data-id]").forEach(function (b) { b.onclick = function () { openDetail(b.getAttribute("data-id")); }; }); };
  }

  render();
})();
