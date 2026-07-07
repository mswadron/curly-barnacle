/* ============================================================================
   SEDER ZERAIM — unified core / registry builder.
   ----------------------------------------------------------------------------
   Builds ONE shared species spine keyed by id, with per-masechta "aspect"
   layers. The existing Kilayim module (window.KILAYIM_FLORA, talmudflora-data.js)
   is ingested LOSSLESSLY via an adapter — it is never rewritten. New masechtos
   (Maasros, Terumos, Maaser Sheini) ship as modules in the unified shape and
   merge onto the same spine by id.

   UNIFIED SHAPES
   --------------
   species[id] = {
     id, names:{he, translit, en:[...]},
     taxonomy:{binomial, family, confidence, id_source, badge},
     etymology_latin:{...},
     aspects:{ kilayim:{...}, maasros:{...}, terumos:{...}, maaser_sheini:{...} }
   }
   texts[masechtaKey][ref] = { he, sefaria, en? }   // verbatim, Sefaria-linked

   A tithing module (window.ZERAIM_MODULE_*) looks like:
   {
     masechta:{ key, he, translit, en, order, seder:"Zeraim", blurb, framework },
     texts:{ "<ref>": { he, sefaria } , ... },
     species:[ { id, spine?:{names,taxonomy,etymology_latin}, aspect:{...} } , ... ]
   }
   If `spine` is given and the id is new, it seeds a new spine species.
   If the id already exists (e.g. a Kilayim plant), only `aspect` is merged.
   ============================================================================ */
(function () {
  var REG = { masechtos: [], species: {}, order: [], texts: {} };

  function ensureSpecies(id) {
    if (!REG.species[id]) {
      REG.species[id] = { id: id, names: null, taxonomy: null, etymology_latin: {}, aspects: {}, _seeds: [] };
      REG.order.push(id);
    }
    return REG.species[id];
  }

  /* ---- 1. Kilayim adapter (lossless; reads window.KILAYIM_FLORA) ---- */
  function ingestKilayim() {
    var K = window.KILAYIM_FLORA;
    if (!K) return;
    REG.masechtos.push({
      key: "kilayim", he: "כִּלְאַיִם", translit: "Kilayim", en: "Kilayim",
      seder: "Zeraim", order: 4,
      blurb: {
        he: "אֵילוּ מִינִים כִּלְאַיִם זֶה בָּזֶה — לְפִי דִּמְיוֹן וְלֹא לְפִי הַסּוּג הַבּוֹטָנִי.",
        en: "Which species are kilayim with one another — tracked by resemblance, not botanical genus."
      },
      accent: "kilayim"
    });
    // texts: verbatim mishnah + rambam glosses
    REG.texts.kilayim = {};
    Object.keys(K.mishnah || {}).forEach(function (ref) {
      var m = K.mishnah[ref];
      REG.texts.kilayim[ref] = { he: m.he, sefaria: m.sefaria };
    });
    REG.rambamKilayim = K.rambam || {};

    (K.plants || []).forEach(function (p) {
      var s = ensureSpecies(p.id);
      // shared spine fields (Kilayim is the taxonomy source of record)
      s.names = p.names;
      s.taxonomy = {
        binomial: p.identification.binomial,
        family: p.identification.family,
        confidence: p.identification.confidence,
        id_source: p.identification.id_source,
        badge: p.identification.badge || "lexicon"
      };
      s.etymology_latin = p.etymology_latin || {};
      s.aspects.kilayim = {
        chapter: p.chapter,
        mishnah_ref: p.mishnah_ref,
        extra_sources: p.extra_sources || [],
        pair: p.pair || null,
        relations: p.kilayim || [],
        rambam: p.rambam || null,
        notes: {
          ambiguous: p.note_ambiguous || null,
          context: p.note_context || null,
          halacha: p.note_halacha || null
        }
      };
      s._seeds.push("kilayim");
    });
  }

  /* ---- 2. Generic tithing/module ingest ---- */
  function ingestModule(mod) {
    if (!mod || !mod.masechta) return;
    REG.masechtos.push(mod.masechta);
    var key = mod.masechta.key;
    REG.texts[key] = REG.texts[key] || {};
    Object.keys(mod.texts || {}).forEach(function (ref) {
      REG.texts[key][ref] = mod.texts[ref];
    });
    (mod.species || []).forEach(function (entry) {
      var s = ensureSpecies(entry.id);
      // seed spine only if this species is new / lacks taxonomy
      if (entry.spine) {
        if (!s.names) s.names = entry.spine.names;
        if (!s.taxonomy) s.taxonomy = entry.spine.taxonomy;
        if ((!s.etymology_latin || !Object.keys(s.etymology_latin).length) && entry.spine.etymology_latin)
          s.etymology_latin = entry.spine.etymology_latin;
      }
      s.aspects[key] = entry.aspect || {};
      s._seeds.push(key);
    });
  }

  /* ---- 3. Build ---- */
  function build() {
    ingestKilayim();
    [window.ZERAIM_MODULE_MAASROS, window.ZERAIM_MODULE_TERUMOS, window.ZERAIM_MODULE_MAASER_SHEINI]
      .forEach(function (m) { if (m) ingestModule(m); });
    (window.ZERAIM_SPECIES_EXTRA || []).forEach(function (e) {
      var s = ensureSpecies(e.id);
      if (!s.names) s.names = e.names;
      if (!s.taxonomy) s.taxonomy = e.taxonomy;
      if (e.etymology_latin && (!s.etymology_latin || !Object.keys(s.etymology_latin).length)) s.etymology_latin = e.etymology_latin;
      s._seeds.push("extra");
    });

    // sort masechtos by seder order (Zeraim tractate order)
    // sort masechtos by seder order (Zeraim tractate order)
    REG.masechtos.sort(function (a, b) { return (a.order || 99) - (b.order || 99); });

    // derived helpers
    REG.masechtaByKey = {};
    REG.masechtos.forEach(function (m) { REG.masechtaByKey[m.key] = m; });
    REG.list = REG.order.map(function (id) { return REG.species[id]; })
      .filter(function (s) { return s.names; });
    return REG;
  }

  window.ZERAIM = build();
})();
