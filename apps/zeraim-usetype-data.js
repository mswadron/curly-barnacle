/* ============================================================================
   SEDER ZERAIM · use-type overlay  ->  window.ZERAIM_USETYPE
   ----------------------------------------------------------------------------
   How each species was USED. Keyed by species id -> array of tags.
   Tags: edible | fiber (cloth/rope) | dye | aromatic | ornamental | marker
         | timber | material | medicinal | nonfood
   Species NOT listed here default to ["edible"]. Only non-default / multi-use
   or non-food species are listed. Labels/colors live in the renderer.
   ============================================================================ */
window.ZERAIM_USETYPE = {
  /* fiber / cloth */
  pishtan: ["fiber"],
  kanbos: ["fiber"],
  zered: ["material"],
  /* dye (some also edible) */
  istis: ["dye"],
  charia: ["edible", "dye"],
  og: ["edible", "dye"],
  /* aromatic / besamim */
  "kida-levana": ["aromatic"],
  irus: ["aromatic"],
  peigam: ["edible", "medicinal"],
  /* ornamental / weeds / non-food */
  kissom: ["ornamental"],
  "shoshanat-hamelech": ["ornamental"],
  kotzim: ["nonfood"],
  zunin: ["nonfood"],
  /* marker / timber (also edible where noted) */
  chatzuv: ["marker"],
  shikma: ["edible", "timber"]
};
