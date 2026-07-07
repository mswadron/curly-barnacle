/* ============================================================================
   SEDER ZERAIM · extra spine species  ->  window.ZERAIM_SPECIES_EXTRA
   Wild fruits named in Demai 1:1 that are not among the Kilayim plants but
   belong on the shared spine. Seeded into the registry by zeraim-core.js.
   ============================================================================ */
window.ZERAIM_SPECIES_EXTRA = [
  { id: "nitzpa",
    names: { he: "נִצְפָּה", translit: "nitzpa", en: ["caper"] },
    taxonomy: { binomial: "Capparis spinosa", family: "Capparaceae", confidence: "settled",
      id_source: "Feliks; Low. Rambam (Demai 1:1) Arabic al-kabbar (caper).", badge: "lexicon" },
    etymology_latin: {
      Capparis: "Latin, from Greek 'kapparis', the classical name for the caper.",
      spinosa: "Latin 'spiny', for the stipular thorns." } },
  { id: "bnos-shuach",
    names: { he: "בְּנוֹת שׁוּחַ", translit: "bnos shuach", en: ["white fig (triennial)"] },
    taxonomy: { binomial: "Ficus carica (var.)", family: "Moraceae", confidence: "disputed",
      id_source: "Rambam (Demai 1:1): a kind of white fig that yields its fruit once in three years.", badge: "lexicon" },
    etymology_latin: {
      Ficus: "Latin, the classical name for the fig.",
      carica: "Latin 'of Caria' (SW Asia Minor), a noted fig region." } }
];
