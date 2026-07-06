/* ============================================================================
   SEDER ZERAIM · tithing juxtaposition matrix  →  window.ZERAIM_TITHES
   ----------------------------------------------------------------------------
   The cross-masechta grid: produce CATEGORY × tithe GIFT → obligation level.
   Drives the "Terumos vs. Maasros vs. Maaser Sheni" graph. Level codes:
     tor  = min ha-Torah (d'oraisa)   rab = mi-derabanan   na = not applicable
   ============================================================================ */
window.ZERAIM_TITHES = {
  gifts: [
    { key: "terumah", he: "תְּרוּמָה גְּדוֹלָה", en: "Terumah", to: { he: "כֹּהֵן", en: "Kohen" } },
    { key: "maaser_rishon", he: "מַעֲשֵׂר רִאשׁוֹן", en: "Maaser Rishon", to: { he: "לֵוִי", en: "Levite" } },
    { key: "terumas_maaser", he: "תְּרוּמַת מַעֲשֵׂר", en: "Terumas Maaser", to: { he: "כֹּהֵן", en: "Kohen" } },
    { key: "maaser_sheini", he: "מַעֲשֵׂר שֵׁנִי", en: "Maaser Sheni", to: { he: "בְּעָלִים בִּירוּשָׁלַיִם", en: "Owner, in Jerusalem" } },
    { key: "maaser_ani", he: "מַעֲשֵׂר עָנִי", en: "Maaser Ani", to: { he: "עָנִי", en: "The poor" } }
  ],
  categories: [
    { key: "dagan", he: "דָּגָן", en: "Grain", eg: { he: "חִטִּים, שְׂעֹרִים", en: "wheat, barley" } },
    { key: "tirosh", he: "תִּירוֹשׁ", en: "Wine (grapes)", eg: { he: "עֲנָבִים", en: "grapes" } },
    { key: "yitzhar", he: "יִצְהָר", en: "Oil (olives)", eg: { he: "זֵיתִים", en: "olives" } },
    { key: "peiros", he: "פֵּרוֹת הָאִילָן", en: "Other tree-fruit", eg: { he: "תְּאֵנִים, רִמּוֹנִים, תְּמָרִים", en: "figs, pomegranates, dates" } },
    { key: "yerek", he: "יְרָקוֹת", en: "Vegetables", eg: { he: "קִשּׁוּאִין, דְּלוּעִים", en: "cucumbers, gourds" } }
  ],
  /* level per [category][gift] */
  grid: {
    dagan:   { terumah: "tor", maaser_rishon: "tor", terumas_maaser: "tor", maaser_sheini: "tor", maaser_ani: "tor" },
    tirosh:  { terumah: "tor", maaser_rishon: "tor", terumas_maaser: "tor", maaser_sheini: "tor", maaser_ani: "tor" },
    yitzhar: { terumah: "tor", maaser_rishon: "tor", terumas_maaser: "tor", maaser_sheini: "tor", maaser_ani: "tor" },
    peiros:  { terumah: "rab", maaser_rishon: "rab", terumas_maaser: "rab", maaser_sheini: "rab", maaser_ani: "rab" },
    yerek:   { terumah: "rab", maaser_rishon: "rab", terumas_maaser: "rab", maaser_sheini: "rab", maaser_ani: "rab" }
  },
  levels: {
    tor: { he: "מִן הַתּוֹרָה", en: "d'Oraisa", cls: "lvl-tor" },
    rab: { he: "מִדְּרַבָּנָן", en: "d'Rabanan", cls: "lvl-rab" },
    na:  { he: "—", en: "n/a", cls: "lvl-na" }
  },
  notes: {
    he: "דָּגָן תִּירוֹשׁ וְיִצְהָר בִּלְבַד חַיָּבִים מִן הַתּוֹרָה (דברים יח,ד: 'רֵאשִׁית דְּגָנְךָ תִּירֹשְׁךָ וְיִצְהָרֶךָ'); שְׁאָר פֵּרוֹת וִירָקוֹת — מִדְּרַבָּנָן. מַעֲשֵׂר שֵׁנִי בַּשָּׁנִים א׳ ב׳ ד׳ ה׳, וּמַעֲשֵׂר עָנִי בָּא בִּמְקוֹמוֹ בַּשָּׁנִים ג׳ ו׳.",
    en: "Only grain, wine and oil are obligated by Torah law (Deut. 18:4: 'the first of your grain, wine and oil'); other fruit and vegetables are Rabbinic. Maaser Sheni applies in years 1,2,4,5, and Maaser Ani takes its place in years 3,6 — the two never overlap."
  }
};
