/* ============================================================================
   SEDER ZERAIM — unified renderer. Reads window.ZERAIM (registry),
   window.ZERAIM_TITHES (matrix), window.ZERAIM_CULINARY, window.KILAYIM_FLORA.
   Photos: live from iNaturalist (lazy, cached). Science is a springboard.
   ============================================================================ */
(function () {
  var REG = window.ZERAIM;
  var TITHES = window.ZERAIM_TITHES;
  var RAMBAM = REG.rambamKilayim || {};
  var CULINARY = window.ZERAIM_CULINARY || {};
  var ANCIENT = window.ZERAIM_ANCIENT || {};
  var APP = document.getElementById("app");
  var byId = REG.species;

  var L = "he";          // he | en
  var focus = "all";     // all | kilayim | maasros | terumos | maaser_sheini
  var q = "";
  var sortMode = "tax";  // tax | alpha | source
  var fFamily = null;
  var sel = null;

  function esc(s) { return (s == null ? "" : String(s)).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); }
  var isHE = function () { return L === "he"; };
  function tx(o) { return o ? (isHE() ? o.he : o.en) : ""; }
  var enName = function (s) { return (s.names.en || []).join(" · "); };
  var genusOf = function (s) { return ((s.taxonomy && s.taxonomy.binomial) || "").split(" ")[0]; };

  var ACCENT = { kilayim: "k", maasros: "ma", terumos: "te", maaser_sheini: "ms" };
  var MLABEL = {}; REG.masechtos.forEach(function (m) { MLABEL[m.key] = m; });

  /* ---------- iNaturalist photos (client-side, lazy, cached) ---------- */
  var photoCache = {};
  function photoQuery(s) {
    var b = (s.taxonomy && s.taxonomy.binomial) || "";
    var parts = b.replace(/\s+var\.\s+/g, " ").replace(/\s+subsp\.\s+/g, " ").split(/\s+/);
    if (parts.length < 2) return null; // family-level / blank — no species photo
    return parts.slice(0, 3).join(" "); // keep subspecies/variety so distinct taxa differ
  }
  function _reqPhoto(query, ranked) {
    var url = "https://api.inaturalist.org/v1/taxa?q=" + encodeURIComponent(query) +
      (ranked ? "&rank=species,subspecies,variety" : "") +
      "&per_page=1&order=desc&order_by=observations_count";
    return fetch(url).then(function (r) { return r.json(); }).then(function (j) {
      return j && j.results && j.results[0];
    });
  }
  function fetchPhoto(query) {
    if (photoCache[query]) return Promise.resolve(photoCache[query]);
    var two = query.split(" ").slice(0, 2).join(" ");
    return _reqPhoto(query, true).then(function (t) {
      // fall back to the plain species if a subspecies/variety has no taxon/photo
      if ((!t || !t.default_photo) && two !== query) return _reqPhoto(two, false);
      return t;
    }).then(function (t) {
      var p = t && t.default_photo;
      var base = p ? (p.medium_url || p.square_url || "") : "";
      var small = base.replace("/medium.", "/small.").replace("/square.", "/small.");
      var out = p ? {
        thumb: small || p.square_url, medium: p.medium_url || p.square_url,
        attribution: p.attribution || "", url: "https://www.inaturalist.org/taxa/" + t.id
      } : { none: true };
      photoCache[query] = out; return out;
    }).catch(function () { var o = { none: true }; photoCache[query] = o; return o; });
  }
  var _io = null;
  function observeThumbs() {
    if (typeof IntersectionObserver === "undefined") { APP.querySelectorAll(".thumb[data-q]").forEach(loadThumb); return; }
    if (_io) _io.disconnect();
    _io = new IntersectionObserver(function (ents) {
      ents.forEach(function (e) { if (e.isIntersecting) { loadThumb(e.target); _io.unobserve(e.target); } });
    }, { rootMargin: "200px" });
    APP.querySelectorAll(".thumb[data-q]:not(.done)").forEach(function (el) { _io.observe(el); });
  }
  function loadThumb(el) {
    el.classList.add("done");
    var query = el.getAttribute("data-q"); if (!query) return;
    fetchPhoto(query).then(function (p) {
      if (p.none || !p.thumb) { el.classList.add("noimg"); return; }
      el.style.backgroundImage = "url('" + p.thumb + "')";
      el.classList.add("has");
    });
  }

  var UI = {
    eyebrow: { he: "סֵדֶר זְרָעִים · מִשְׁנָה", en: "Seder Zeraim · Mishnah" },
    title: { he: "זְרָעִים", en: "Zeraim" },
    sub: { he: "צִמְחֵי הַמִּשְׁנָה וּמִצְווֹת הָאָרֶץ", en: "Plants of the Mishnah & the land-mitzvos" },
    lede: {
      he: "מַאֲגָר אֶחָד שֶׁל צִמְחֵי סֵדֶר זְרָעִים, מְמֻיָּן לְפִי טַקְסוֹנוֹמְיָה — וְכָל מַסֶּכֶת מוֹסִיפָה אֶת הֶבֵּטֶיהָ: כִּלְאַיִם, תְּרוּמוֹת, מַעַשְׂרוֹת, מַעֲשֵׂר שֵׁנִי.",
      en: "One shared database of Seder-Zeraim plants, sortable by taxonomy — with each masechta layering its own aspects: Kilayim pairings, Terumos, Maasros, and Maaser Sheni."
    },
    all: { he: "הַכֹּל", en: "All" },
    search: { he: "חִפּוּשׂ…", en: "Search plants…" },
    sort: { he: "מִיּוּן", en: "Sort" },
    sortTax: { he: "מִשְׁפָּחָה", en: "Taxonomy" },
    sortAlpha: { he: "אָלֶף־בֵּית", en: "Alphabetical" },
    sortSource: { he: "מָקוֹר", en: "Source order" },
    family: { he: "מִשְׁפָּחָה", en: "Family" },
    clear: { he: "נַקֵּה", en: "Clear" },
    ident: { he: "זִהוּי", en: "Identification" },
    ety: { he: "שׁוֹרֶשׁ הַשֵּׁם הַלָּטִינִי", en: "Latin etymology" },
    aspects: { he: "הֶבֵּטֵי הַמַּסֶּכְתּוֹת", en: "Masechta aspects" },
    sci: { he: "הֶעָרַת מַדָּע", en: "On the science" },
    sciTxt: {
      he: "הַזִּהוּי הַמַּדָּעִי וְהַמִּשְׁפָּחָה הַבּוֹטָנִית הֵם דְּעַת חוֹקְרִים (פֶליקְס, עָמַר, לֶעװ) — לֹא הֲלָכָה וְלֹא מָסֹרֶת.",
      en: "The scientific identification and botanical family are scholarly opinion (Feliks, Amar, Löw) — not halacha and not a mesorah."
    },
    graphTitle: { he: "תְּרוּמוֹת מוּל מַעַשְׂרוֹת מוּל מַעֲשֵׂר שֵׁנִי", en: "Terumos vs. Maasros vs. Maaser Sheni" },
    graphSub: { he: "רָמַת הַחִיּוּב לְפִי סוּג הַתּוֹצֶרֶת", en: "Obligation level by produce category" },
    relK: { he: "יַחֲסֵי כִּלְאַיִם", en: "Kilayim relations" },
    kilayim: { he: "כִּלְאַיִם", en: "kilayim" }, notk: { he: "אֵינָם כִּלְאַיִם", en: "not kilayim" },
    onah: { he: "עוֹנַת הַחִיּוּב", en: "Onah — ripening" },
    goren: { he: "גֹּרֶן — גְּמַר מְלָאכָה", en: "Goren — fixing point" },
    level: { he: "רָמַת הַחִיּוּב", en: "Obligation" },
    category: { he: "סוּג", en: "Category" },
    appliesMS: { he: "חָל מַעֲשֵׂר שֵׁנִי", en: "Maaser Sheni applies" },
    pairL: { he: "בֶּן זוּג", en: "Wild/domestic pair" },
    framework: { he: "מִסְגֶּרֶת הַמַּסֶּכֶת", en: "Masechta framework" },
    culinary: { he: "שִׁמּוּשׁ קוּלִינָרִי", en: "Culinary use" },
    ancient: { he: "שִׁמּוּשׁ בִּימֵי הַמִּשְׁנָה", en: "Use in Mishnaic times" },
    cuisine: { he: "מִטְבָּח", en: "Cuisine" },
    photo: { he: "תַּצְלוּם · iNaturalist", en: "Photograph · iNaturalist" }
  };

  var CAT = {
    dagan: { he: "דָּגָן", en: "grain" }, tirosh: { he: "תִּירוֹשׁ", en: "wine/grapes" },
    yitzhar: { he: "יִצְהָר", en: "oil/olives" }, peiros: { he: "פֵּרוֹת", en: "tree-fruit" },
    yerek: { he: "יָרָק", en: "vegetable" }, zeraim: { he: "זְרָעִים", en: "seed-crop" }
  };
  function catLabel(k) { return CAT[k] ? tx(CAT[k]) : k; }

  /* ---------- selection / list ---------- */
  function speciesList() { return REG.list; }
  function familiesIn(list) {
    var s = {}; list.forEach(function (x) { if (x.taxonomy) s[x.taxonomy.family] = 1; });
    return Object.keys(s).sort();
  }
  function hasAspect(s, key) { return s.aspects && s.aspects[key]; }

  function filtered() {
    var qq = q.trim().toLowerCase();
    var list = speciesList().filter(function (s) {
      if (focus !== "all" && !hasAspect(s, focus)) return false;
      if (fFamily && (!s.taxonomy || s.taxonomy.family !== fFamily)) return false;
      if (qq) {
        var hay = (s.names.he + " " + s.names.translit + " " + enName(s) + " " +
          (s.taxonomy ? s.taxonomy.binomial + " " + s.taxonomy.family : "")).toLowerCase();
        if (hay.indexOf(qq) < 0) return false;
      }
      return true;
    });
    return sortList(list);
  }
  function sortList(list) {
    var arr = list.slice();
    if (sortMode === "alpha") {
      arr.sort(function (a, b) { return a.names.he.localeCompare(b.names.he, "he"); });
    } else if (sortMode === "source" && focus !== "all") {
      arr.sort(function (a, b) { return srcKey(a).localeCompare(srcKey(b)); });
    } else if (sortMode === "source") {
      arr.sort(function (a, b) { return (order(a) - order(b)); });
    } else { // tax
      arr.sort(function (a, b) {
        var fa = (a.taxonomy && a.taxonomy.family) || "zzz", fb = (b.taxonomy && b.taxonomy.family) || "zzz";
        if (fa !== fb) return fa.localeCompare(fb);
        var ba = (a.taxonomy && a.taxonomy.binomial) || "", bb = (b.taxonomy && b.taxonomy.binomial) || "";
        if (ba !== bb) return ba.localeCompare(bb);
        return a.names.he.localeCompare(b.names.he, "he");
      });
    }
    return arr;
  }
  function order(s) { return REG.order.indexOf(s.id); }
  function srcKey(s) {
    var a = s.aspects[focus] || {};
    if (focus === "kilayim") return String(a.chapter || 0).padStart(2, "0") + (a.mishnah_ref || "");
    var ref = (a.onah && a.onah.ref) || (a.ref) || "";
    return ref;
  }

  /* ---------- render ---------- */
  function render() {
    var langBtns = ["he", "en"].map(function (x) {
      return '<button data-lang="' + x + '" class="' + (L === x ? "on" : "") + '">' + x.toUpperCase() + "</button>";
    }).join("");

    var msBtns = '<button class="seg ' + (focus === "all" ? "on" : "") + '" data-focus="all">' + esc(tx(UI.all)) + '</button>' +
      REG.masechtos.map(function (m) {
        return '<button class="seg acc-' + ACCENT[m.key] + ' ' + (focus === m.key ? "on" : "") +
          '" data-focus="' + m.key + '"><span class="he">' + esc(m.he) + '</span></button>';
      }).join("");

    var mast = '<div class="mast"><div class="mast-top"><div>' +
      '<div class="eyebrow">' + esc(tx(UI.eyebrow)) + '</div>' +
      '<h1 class="he">' + esc(tx(UI.title)) + '</h1>' +
      '<div class="sub serif">' + esc(tx(UI.sub)) + '</div>' +
      '<div class="lede' + (isHE() ? " he" : "") + '">' + esc(tx(UI.lede)) + '</div></div>' +
      '<div class="lang">' + langBtns + '</div></div>' +
      '<div class="switch">' + msBtns + '</div></div>';

    var list = filtered();
    var main = '<div class="count">' + list.length + " / " + speciesList().length +
      (isHE() ? " צְמָחִים" : " plants") +
      (focus !== "all" ? ' · <span class="he">' + esc(MLABEL[focus].he) + "</span>" : "") + '</div>' +
      '<div class="grid">' + list.map(cardHTML).join("") + '</div>';

    var layout = '<div class="layout"><aside class="rail">' + railHTML(list) + '</aside><main>' + main + "</main></div>";
    APP.innerHTML = '<div class="wrap">' + mast + layout + disclaimerHTML() + "</div>";
    wire();
    observeThumbs();
    if (sel) openDetail(sel);
  }

  function railHTML(list) {
    var sorts = [["tax", UI.sortTax], ["alpha", UI.sortAlpha], ["source", UI.sortSource]].map(function (p) {
      return '<span class="pill ' + (sortMode === p[0] ? "on" : "") + '" data-sort="' + p[0] + '">' + esc(tx(p[1])) + "</span>";
    }).join("");

    var fams = familiesIn(speciesList().filter(function (s) { return focus === "all" || hasAspect(s, focus); }));
    var famPills = fams.map(function (f) {
      return '<span class="pill ' + (fFamily === f ? "on" : "") + '" data-fam="' + esc(f) + '">' +
        esc(f.replace(" (uncertain)", "?")) + "</span>";
    }).join("");
    var clear = (fFamily || q || sortMode !== "tax") ?
      '<span class="pill clr" data-clear="1">✕ ' + esc(tx(UI.clear)) + "</span>" : "";

    var panels = '<div class="panel"><input class="search" id="q" placeholder="' + esc(tx(UI.search)) + '" value="' + esc(q) + '">' +
      '<div class="fg"><div class="fg-h">' + esc(tx(UI.sort)) + '</div>' + sorts + '</div>' +
      '<div class="fg"><div class="fg-h">' + esc(tx(UI.family)) + '</div>' + famPills + '</div>' +
      (clear ? '<div class="fg">' + clear + "</div>" : "") + "</div>";

    if (focus === "all" || focus === "terumos" || focus === "maasros" || focus === "maaser_sheini") panels += graphHTML();
    if (focus !== "all") panels += frameworkHTML(MLABEL[focus]);
    return panels;
  }

  /* ---------- juxtaposition graph ---------- */
  function graphHTML() {
    var gifts = TITHES.gifts, cats = TITHES.categories;
    var head = '<div class="jx-row jx-head"><div class="jx-cat"></div>' +
      gifts.map(function (g) { return '<div class="jx-cell jx-gift"><span class="he">' + esc(g.he) + "</span></div>"; }).join("") + "</div>";
    var rows = cats.map(function (c) {
      var cells = gifts.map(function (g) {
        var lv = TITHES.grid[c.key][g.key]; var L2 = TITHES.levels[lv];
        return '<div class="jx-cell ' + L2.cls + '" title="' + esc(tx(L2)) + '">' + esc(tx(L2)) + "</div>";
      }).join("");
      return '<div class="jx-row"><div class="jx-cat"><span class="he">' + esc(c.he) + '</span><span class="jx-eg">' + esc(tx(c.eg)) + "</span></div>" + cells + "</div>";
    }).join("");
    return '<div class="panel jx"><h3>' + esc(tx(UI.graphTitle)) + '</h3>' +
      '<div class="jx-sub">' + esc(tx(UI.graphSub)) + '</div>' +
      '<div class="jx-grid">' + head + rows + '</div>' +
      '<div class="jx-legend"><span class="lg lvl-tor">' + esc(tx(TITHES.levels.tor)) + '</span>' +
      '<span class="lg lvl-rab">' + esc(tx(TITHES.levels.rab)) + '</span></div>' +
      '<div class="jx-note' + (isHE() ? " he" : "") + '">' + esc(tx(TITHES.notes)) + "</div></div>";
  }

  function frameworkHTML(m) {
    if (!m || !m.framework) return "";
    var f = m.framework, rows = "";
    Object.keys(f).forEach(function (k) {
      var v = f[k];
      if (v && v.he != null) {
        rows += '<div class="fw-row"><div class="fw-t' + (isHE() ? " he" : "") + '">' + esc(tx(v)) +
          (v.ref ? ' <span class="fw-ref">' + esc(v.ref) + "</span>" : "") + "</div></div>";
      } else if (v && v.moments) {
        v.moments.forEach(function (mm) {
          rows += '<div class="fw-row"><div class="fw-k"><span class="he">' + esc(mm.he) + "</span> " + esc(mm.en) + '</div>' +
            '<div class="fw-t' + (isHE() ? " he" : "") + '">' + esc(tx(mm.note)) + "</div></div>";
        });
      }
    });
    return '<div class="panel fw"><h3>' + esc(tx(UI.framework)) + " · <span class='he'>" + esc(m.he) + "</span></h3>" + rows + "</div>";
  }

  /* ---------- card ---------- */
  function cardHTML(s) {
    var conf = (s.taxonomy && s.taxonomy.confidence) || "settled";
    var chips = REG.masechtos.filter(function (m) { return hasAspect(s, m.key); }).map(function (m) {
      var on = (focus === m.key) ? " on" : "";
      return '<span class="ac ac-' + ACCENT[m.key] + on + '" title="' + esc(m.translit) + '"><span class="he">' + esc(m.he) + "</span></span>";
    }).join("");
    var focusLine = (focus !== "all") ? focusChip(s) : "";
    var pq = photoQuery(s);
    var thumb = pq ? '<div class="thumb" data-q="' + esc(pq) + '"></div>' : "";
    return '<div class="card conf-' + conf + '" data-id="' + esc(s.id) + '">' + thumb +
      '<div class="ac-row">' + chips + '</div>' +
      '<div class="cn he">' + esc(s.names.he) + '</div>' +
      '<div class="ct">' + esc(s.names.translit) + " · " + esc(enName(s)) + '</div>' +
      (s.taxonomy ? '<div class="cbi serif">' + esc(s.taxonomy.binomial) + '</div>' +
        '<div class="cfam">' + esc(s.taxonomy.family) + "</div>" : "") +
      focusLine + "</div>";
  }
  function focusChip(s) {
    var a = s.aspects[focus]; if (!a) return "";
    if (focus === "maasros" && a.onah) return '<div class="fchip acc-ma"><span class="he">' + esc(a.onah.he) + "</span></div>";
    if (focus === "terumos" && a.level) return '<div class="fchip acc-te">' + esc(a.level === "d'oraisa" ? tx({ he: "מִן הַתּוֹרָה", en: "d'Oraisa" }) : tx({ he: "מִדְּרַבָּנָן", en: "d'Rabanan" })) + " · " + esc(catLabel(a.category)) + "</div>";
    if (focus === "maaser_sheini") return '<div class="fchip acc-ms">' + esc(catLabel(a.category)) + "</div>";
    if (focus === "kilayim" && a.relations) {
      var k = a.relations.filter(function (r) { return r.ruling === "kilayim"; }).length;
      return '<div class="fchip acc-k">' + (k ? (k + (isHE() ? " יַחֲסֵי כִּלְאַיִם" : " kilayim")) : (isHE() ? "אֵינָם כִּלְאַיִם" : "not kilayim")) + "</div>";
    }
    return "";
  }

  /* ---------- detail ---------- */
  function srcBlock(cat, ref, he, url, en) {
    return '<div class="src"><div class="sh he">' + esc(he) + "</div>" +
      (en && !isHE() ? '<div class="se">' + esc(en) + "</div>" : "") +
      '<div class="sm"><span class="sr">' + esc(cat) + (ref ? " · " + esc(ref) : "") + "</span>" +
      (url ? '<a href="' + esc(url) + '" target="_blank" rel="noopener">Sefaria ↗</a>' : "") + "</div></div>";
  }

  function kilayimSection(s) {
    var a = s.aspects.kilayim; if (!a) return "";
    var out = "";
    var t = REG.texts.kilayim || {};
    var m = t[a.mishnah_ref];
    if (m) out += srcBlock(isHE() ? "מִשְׁנָה" : "Mishnah", "Kilayim " + a.mishnah_ref, m.he, m.sefaria);
    (a.extra_sources || []).forEach(function (r) { if (t[r]) out += srcBlock(isHE() ? "בַּבְלִי" : "Bavli", r, t[r].he, t[r].sefaria); });
    if (a.rambam && RAMBAM[a.rambam]) {
      var url = RAMBAM["url_" + a.mishnah_ref.replace(":", "_")] || "https://www.sefaria.org/Rambam_on_Mishnah_Kilayim." + a.mishnah_ref.replace(":", ".");
      out += srcBlock((isHE() ? "רַמְבַּ״ם · פֵּירוּשׁ הַמִּשְׁנָיוֹת" : "Rambam · Peirush HaMishnayot"), "Kilayim " + a.mishnah_ref, RAMBAM[a.rambam], url);
    }
    if (a.pair) {
      out += '<div class="kv"><span class="kk">' + esc(tx(UI.pairL)) + '</span><span class="vv">' +
        '<span class="rel" data-goto="' + esc(a.pair.id) + '"><span class="he">' + esc(a.pair.he) + "</span></span>" +
        (a.pair.note ? '<div class="note">' + esc(a.pair.note) + "</div>" : "") + "</span></div>";
    }
    var rels = (a.relations || []).map(function (k) {
      var o = byId[k.with]; var nm = o ? o.names.he : k.with;
      var cls = k.ruling === "kilayim" ? "k" : "nk";
      var lab = k.ruling === "kilayim" ? tx(UI.kilayim) : tx(UI.notk);
      return '<span class="rel" data-goto="' + esc(k.with) + '"><span class="rk ' + cls + '">' + esc(lab) + "</span> <span class='he'>" + esc(nm) + "</span></span>" +
        (k.note ? '<div class="note">' + esc(k.note) + "</div>" : "");
    }).join("");
    if (rels) out += '<div class="relwrap">' + rels + "</div>";
    var notes = "";
    if (a.notes) { ["ambiguous", "context", "halacha"].forEach(function (k) { if (a.notes[k]) notes += '<div class="note">' + (k === "ambiguous" ? "⚑ " : "") + esc(a.notes[k]) + "</div>"; }); }
    return aspectWrap("kilayim", out + notes);
  }

  function tithingSection(key, s) {
    var a = s.aspects[key]; if (!a) return "";
    var m = MLABEL[key], t = REG.texts[key] || {}, out = "";
    if (a.category) out += kv(tx(UI.category), catLabel(a.category) + (a.liquid ? (isHE() ? " · מַשְׁקֶה" : " · liquid") : ""));
    if (a.level) out += kv(tx(UI.level), a.level === "d'oraisa" ? (isHE() ? "מִן הַתּוֹרָה" : "d'Oraisa") : (isHE() ? "מִדְּרַבָּנָן" : "d'Rabanan"));
    if (a.onah) out += kv(tx(UI.onah), '<span class="he">' + esc(a.onah.he) + "</span>" + (a.onah.ref ? ' <span class="fw-ref">' + esc(a.onah.ref) + "</span>" : ""));
    if (a.goren) out += kv(tx(UI.goren), '<span class="he">' + esc(a.goren.he) + "</span>" + (a.goren.ref ? ' <span class="fw-ref">' + esc(a.goren.ref) + "</span>" : ""));
    if (a.applies) out += kv(tx(UI.appliesMS), isHE() ? "כֵּן" : "yes");
    if (a.note) out += '<div class="note' + (isHE() ? " he" : "") + '">' + esc(tx(a.note)) + "</div>";
    var ref = (a.onah && a.onah.ref) || a.ref || (a.goren && a.goren.ref);
    if (ref && t[ref]) out += srcBlock('<span class="he">' + esc(m.he) + "</span>", m.translit + " " + ref, t[ref].he, t[ref].sefaria, t[ref].en);
    return aspectWrap(key, out);
  }
  function kv(k, v) { return '<div class="kv"><span class="kk">' + esc(k) + '</span><span class="vv">' + v + "</span></div>"; }

  function aspectWrap(key, inner) {
    var m = MLABEL[key];
    return '<div class="asec acc-' + ACCENT[key] + '"><div class="asec-h"><span class="dot"></span><span class="he">' + esc(m.he) + "</span> " + esc(m.en) + "</div>" + inner + "</div>";
  }

  function culinaryHTML(s) {
    var c = CULINARY[s.id]; if (!c) return "";
    var cz = (c.cuisines && c.cuisines.length) ?
      '<div class="cuis"><span class="cuis-k">' + esc(tx(UI.cuisine)) + ":</span> " +
      c.cuisines.map(function (x) { return '<span class="cz">' + esc(x) + "</span>"; }).join("") + "</div>" : "";
    return '<div class="sec"><div class="sec-h">' + esc(tx(UI.culinary)) + "</div>" +
      '<div class="culi"><span class="q">' + "“" + "</span>" + esc(c.text) + '<span class="q">' + "”" + "</span>" +
      '<div class="culi-src">' + esc(c.src.title) + ' · <a href="' + esc(c.src.url) + '" target="_blank" rel="noopener">Wikipedia ↗</a></div>' +
      cz + "</div></div>";
  }
  function ancientHTML(s) {
    var a = ANCIENT[s.id]; if (!a) return "";
    var use = '<div class="anc-use' + (isHE() ? " he" : "") + '">' + esc(isHE() ? a.use_he : a.use_en) + "</div>";
    return '<div class="sec"><div class="sec-h">' + esc(tx(UI.ancient)) + '</div><div class="anc">' + use +
      srcBlock(tx(a.src), a.ref, a.he, a.url) + "</div></div>";
  }
  function photoHTML(s) {
    var pq = photoQuery(s); if (!pq) return "";
    return '<div class="dphoto" data-dq="' + esc(pq) + '"><div class="dphoto-ph">' +
      (isHE() ? "טוֹעֵן תַּצְלוּם…" : "Loading photo…") + "</div></div>";
  }

  function detailHTML(s) {
    var tax = s.taxonomy || {};
    var ety = Object.keys(s.etymology_latin || {}).map(function (w) {
      return '<div class="ety"><b>' + esc(w) + "</b> — " + esc(s.etymology_latin[w]) + "</div>";
    }).join("");
    var asects = "";
    if (hasAspect(s, "kilayim")) asects += kilayimSection(s);
    ["terumos", "maasros", "maaser_sheini"].forEach(function (k) { if (hasAspect(s, k)) asects += tithingSection(k, s); });

    return '<div class="overlay" id="ov"><div class="detail" onclick="event.stopPropagation()">' +
      '<div class="detail-h"><button class="close" id="cls">×</button>' +
      '<div class="hn he">' + esc(s.names.he) + '</div>' +
      '<div class="ht">' + esc(s.names.translit) + " · " + esc(enName(s)) + '</div>' +
      (tax.binomial ? '<div class="hbi serif">' + esc(tax.binomial) + "</div>" : "") + "</div>" +
      '<div class="detail-b">' + photoHTML(s) +
      (tax.binomial ? '<div class="sec"><div class="sec-h">' + esc(tx(UI.ident)) + "</div>" +
        kv("binomial", '<span class="serif" style="font-style:italic">' + esc(tax.binomial) + "</span>") +
        kv("family", esc(tax.family)) +
        kv("confidence", '<span class="conf ' + tax.confidence + '">' + tax.confidence + "</span>") +
        (tax.id_source ? kv(isHE() ? "מְקוֹר הַזִּהוּי" : "id source", '<span class="badge ' + (tax.badge || "lexicon") + '">' + (tax.badge || "lexicon") + "</span> " + esc(tax.id_source)) : "") +
        "</div>" : "") +
      (asects ? '<div class="sec"><div class="sec-h">' + esc(tx(UI.aspects)) + "</div>" + asects + "</div>" : "") +
      culinaryHTML(s) +
      ancientHTML(s) +
      (ety ? '<div class="sec"><div class="sec-h">' + esc(tx(UI.ety)) + "</div>" + ety + "</div>" : "") +
      '<div class="sec"><div class="sec-h">' + esc(tx(UI.sci)) + '</div><div class="sci-wall' + (isHE() ? " he" : "") + '">' + esc(tx(UI.sciTxt)) + "</div></div>" +
      "</div></div></div>";
  }
  function openDetail(id) {
    sel = id; var s = byId[id]; if (!s) return;
    var wrap = document.createElement("div"); wrap.innerHTML = detailHTML(s);
    document.body.appendChild(wrap.firstChild);
    var ov = document.getElementById("ov");
    ov.onclick = closeDetail;
    document.getElementById("cls").onclick = closeDetail;
    ov.querySelectorAll("[data-goto]").forEach(function (b) {
      b.onclick = function (e) { e.stopPropagation(); closeDetail(); openDetail(b.getAttribute("data-goto")); };
    });
    var dp = ov.querySelector(".dphoto[data-dq]");
    if (dp) fetchPhoto(dp.getAttribute("data-dq")).then(function (p) {
      if (p.none || !p.medium) { dp.innerHTML = '<div class="dphoto-ph">' + (isHE() ? "אֵין תַּצְלוּם צִבּוּרִי" : "No public photo") + "</div>"; return; }
      dp.innerHTML = '<img src="' + p.medium + '" alt="" loading="lazy">' +
        '<div class="dphoto-cap"><span class="dphoto-attr">' + esc(p.attribution || "") + '</span>' +
        '<a href="' + esc(p.url) + '" target="_blank" rel="noopener">iNaturalist ↗</a></div>';
    });
  }
  function closeDetail() { sel = null; var ov = document.getElementById("ov"); if (ov) ov.parentNode.removeChild(ov); }

  function disclaimerHTML() {
    return '<div class="disc' + (isHE() ? " he" : "") + '">' +
      (isHE() ? "כָּל טֶקְסְט הֲלָכָתִי מוּבָא כִּלְשׁוֹנוֹ מִסֶּפַרְיָא עִם קִישּׁוּר. תַּצְלוּמִים חַיִּים מֵ־iNaturalist; שׁוּרוֹת קוּלִינָרִיּוֹת מְצֻטָּטוֹת מִוִּיקִיפֶּדְיָה. הַמַּדָּע — קֶרֶשׁ קְפִיצָה בִּלְבַד." :
        "Every halachic text is verbatim from Sefaria with a link. Photos are live from iNaturalist; culinary lines are quoted from Wikipedia. The science is a springboard only.") +
      ' <span class="badge lexicon">lexicon</span> ' + (isHE() ? "זִהוּי חוֹקְרִים · " : "named authority · ") +
      '<span class="badge direct">direct</span> ' + (isHE() ? "מָקוֹר רִאשׁוֹן" : "primary source") + ".</div>";
  }

  /* ---------- events ---------- */
  function wire() {
    APP.querySelectorAll("[data-lang]").forEach(function (b) { b.onclick = function () { L = b.getAttribute("data-lang"); render(); }; });
    APP.querySelectorAll("[data-focus]").forEach(function (b) {
      b.onclick = function () { focus = b.getAttribute("data-focus"); if (sortMode === "source" && focus === "all") sortMode = "tax"; fFamily = null; render(); };
    });
    APP.querySelectorAll("[data-sort]").forEach(function (b) { b.onclick = function () { sortMode = b.getAttribute("data-sort"); render(); }; });
    APP.querySelectorAll("[data-fam]").forEach(function (b) { b.onclick = function () { var v = b.getAttribute("data-fam"); fFamily = (fFamily === v ? null : v); render(); }; });
    APP.querySelectorAll("[data-clear]").forEach(function (b) { b.onclick = function () { fFamily = null; q = ""; sortMode = "tax"; render(); }; });
    APP.querySelectorAll("[data-id]").forEach(function (b) { b.onclick = function () { openDetail(b.getAttribute("data-id")); }; });
    var qi = document.getElementById("q");
    if (qi) qi.oninput = function () {
      q = qi.value; var list = filtered(); var g = APP.querySelector(".grid"); var c = APP.querySelector(".count");
      if (g) { g.innerHTML = list.map(cardHTML).join(""); g.querySelectorAll("[data-id]").forEach(function (b) { b.onclick = function () { openDetail(b.getAttribute("data-id")); }; }); observeThumbs(); }
      if (c) c.innerHTML = list.length + " / " + speciesList().length + (isHE() ? " צְמָחִים" : " plants") + (focus !== "all" ? ' · <span class="he">' + esc(MLABEL[focus].he) + "</span>" : "");
    };
  }

  render();
})();
