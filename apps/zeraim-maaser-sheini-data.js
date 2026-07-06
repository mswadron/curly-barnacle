/* ============================================================================
   SEDER ZERAIM · MAASER SHEINI module  →  window.ZERAIM_MODULE_MAASER_SHEINI
   ----------------------------------------------------------------------------
   The second tithe — eaten by the owner in Yerushalayim in purity (years 1,2,4,5),
   or redeemed onto money (owner adds a fifth) and the money brought up.
   Verbatim anchor: 1:1, its non-commercial restrictions. Maaser Ani replaces it
   in years 3 and 6.
   ============================================================================ */
window.ZERAIM_MODULE_MAASER_SHEINI = {
  masechta: {
    key: "maaser_sheini", he: "מַעֲשֵׂר שֵׁנִי", translit: "Maaser Sheni", en: "Second Tithe",
    seder: "Zeraim", order: 8, accent: "maaser_sheini",
    blurb: {
      he: "הַמַּעֲשֵׂר הַנֶּאֱכָל לַבְּעָלִים בִּירוּשָׁלַיִם בְּטָהֳרָה — אוֹ נִפְדֶּה עַל מָעוֹת וְעוֹלֶה.",
      en: "The tithe eaten by the owner in Jerusalem in purity — or redeemed onto money that is brought up."
    },
    framework: {
      years: {
        he: "שָׁנִים א׳ ב׳ ד׳ ה׳ שֶׁל הַשְּׁמִטָּה — מַעֲשֵׂר שֵׁנִי; שָׁנִים ג׳ ו׳ — מַעֲשֵׂר עָנִי בִּמְקוֹמוֹ.",
        en: "Years 1,2,4,5 of the shmita cycle carry Maaser Sheni; years 3,6 carry Maaser Ani in its place."
      },
      pidyon: {
        he: "נִפְדֶּה עַל כֶּסֶף; הַבְּעָלִים מוֹסִיפִין חֹמֶשׁ. הַכֶּסֶף עוֹלֶה לִירוּשָׁלַיִם וְנֶאֱכָל בִּקְדֻשָּׁה.",
        en: "Redeemed onto silver; the owner adds a fifth. The money goes up to Jerusalem and is spent on food eaten in sanctity.",
        ref: "Maaser Sheni 4:3"
      },
      status: { he: "מָמוֹן גָּבוֹהַּ / קָדוֹשׁ — לֹא נִמְכָּר וְלֹא מִשְׁתַּמְּשִׁים בּוֹ כִּסְחוֹרָה.", en: "Consecrated produce — not sold or used commercially." }
    }
  },
  texts: {
    "1:1": { sefaria: "https://www.sefaria.org/Mishnah_Maaser_Sheni.1.1",
      he: "מַעֲשֵׂר שֵׁנִי, אֵין מוֹכְרִין אוֹתוֹ, וְאֵין מְמַשְׁכְּנִין אוֹתוֹ, וְאֵין מַחֲלִיפִין אוֹתוֹ, וְלֹא שׁוֹקְלִין כְּנֶּגְדּוֹ. וְלֹא יֹאמַר אָדָם לַחֲבֵרוֹ בִּירוּשָׁלַיִם, הֵילָךְ יַיִן וְתֶן לִי שָׁמֶן. וְכֵן שְׁאָר כָּל הַפֵּרוֹת. אֲבָל נוֹתְנִין זֶה לָזֶה מַתְּנַת חִנָּם:",
      en: "Maaser Sheni may not be sold, pledged, exchanged, or used as a counterweight. Nor may one say to another in Jerusalem, 'Here is wine, give me oil' — and so for all other produce. But they may give one another an outright gift." }
  },
  species: [
    { id: "gefen", aspect: { applies: true, category: "tirosh", liquid: true,
      note: { he: "יֵין מַעֲשֵׂר שֵׁנִי — נֶאֱכָל/נִשְׁתֶּה בִּירוּשָׁלַיִם בְּטָהֳרָה.", en: "Maaser-sheni wine — drunk in Jerusalem in purity; alone with oil it may be produced as liquid." }, ref: "Terumot 11:3" } },
    { id: "zayit", aspect: { applies: true, category: "yitzhar", liquid: true,
      note: { he: "שֶׁמֶן מַעֲשֵׂר שֵׁנִי — עוֹלֶה לִירוּשָׁלַיִם.", en: "Maaser-sheni oil — brought up to Jerusalem." }, ref: "Terumot 11:3" } },
    { id: "chitim", aspect: { applies: true, category: "dagan" } },
    { id: "seorim", aspect: { applies: true, category: "dagan" } },
    { id: "teena", aspect: { applies: true, category: "peiros" } },
    { id: "temarim", aspect: { applies: true, category: "peiros",
      note: { he: "לֹא עוֹשִׂין תְּמָרִים דְּבַשׁ בְּמַעֲשֵׂר שֵׁנִי (עַיֵּן תְּרוּמוֹת יא:ג).", en: "Dates are not made into honey as maaser sheni (Terumot 11:3)." }, ref: "Terumot 11:3" } }
  ]
};
