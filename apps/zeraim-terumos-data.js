/* ============================================================================
   SEDER ZERAIM · TERUMOS module  →  window.ZERAIM_MODULE_TERUMOS
   ----------------------------------------------------------------------------
   Terumah gedolah (to the kohen) + terumas maaser. Verbatim anchor: 11:3, the
   'zeisim va-anavim are unique' mishnah — the sharpest terumah/maaser-sheni
   contrast in the produce, which drives the juxtaposition graph.
   ============================================================================ */
window.ZERAIM_MODULE_TERUMOS = {
  masechta: {
    key: "terumos", he: "תְּרוּמוֹת", translit: "Terumos", en: "Heave-offerings",
    seder: "Zeraim", order: 6, accent: "terumos",
    blurb: {
      he: "תְּרוּמָה גְּדוֹלָה וּתְרוּמַת מַעֲשֵׂר — מַתְּנוֹת כְּהֻנָּה הַנֶּאֱכָלוֹת בְּטָהֳרָה, וַאֲסוּרוֹת לְזָר.",
      en: "Terumah gedolah and terumas maaser — priestly gifts eaten in purity, forbidden to a non-kohen."
    },
    framework: {
      shiur: {
        he: "תְּרוּמָה גְּדוֹלָה — אֵין לָהּ שִׁעוּר מִן הַתּוֹרָה; מִדְּרַבָּנָן: עַיִן יָפָה אֶחָד מֵאַרְבָּעִים, בֵּינוֹנִית מֵחֲמִשִּׁים, רָעָה מִשִּׁשִּׁים. תְּרוּמַת מַעֲשֵׂר — אֶחָד מֵעֲשָׂרָה מִן הַמַּעֲשֵׂר.",
        en: "Terumah gedolah has no Torah measure; Rabbinically 1/40 (generous), 1/50 (average), 1/60 (stingy). Terumas maaser is a fixed 1/10 of the Levite's maaser rishon.",
        ref: "Terumot 4:3"
      },
      obligated: {
        he: "מִן הַתּוֹרָה רַק דָּגָן תִּירוֹשׁ וְיִצְהָר; שְׁאָר פֵּרוֹת וִירָקוֹת — מִדְּרַבָּנָן.",
        en: "D'Oraisa only grain, wine and oil (dagan, tirosh, yitzhar); other fruit and vegetables are Rabbinic."
      },
      given_to: { he: "לַכֹּהֵן, נֶאֱכֶלֶת בְּטָהֳרָה", en: "To the kohen, eaten in purity" }
    }
  },
  texts: {
    "11:3": { sefaria: "https://www.sefaria.org/Mishnah_Terumot.11.3",
      he: "אֵין עוֹשִׂין תְּמָרִים דְּבַשׁ, וְלֹא תַפּוּחִים יַיִן, וְלֹא סִתְוָנִיּוֹת חֹמֶץ, וּשְׁאָר כָּל הַפֵּרוֹת אֵין מְשַׁנִּין אוֹתָם מִבְּרִיָּתָן בִּתְרוּמָה וּבְמַעֲשֵׂר שֵׁנִי, אֶלָּא זֵיתִים וַעֲנָבִים בִּלְבָד. אֵין סוֹפְגִין אַרְבָּעִים מִשּׁוּם עָרְלָה, אֶלָּא עַל הַיּוֹצֵא מִן הַזֵּיתִים וּמִן הָעֲנָבִים. וְאֵין מְבִיאִין בִּכּוּרִים מַשְׁקִין, אֶלָּא הַיּוֹצֵא מִן הַזֵּיתִים וּמִן הָעֲנָבִים. וְאֵינוֹ מִטַּמֵּא מִשּׁוּם מַשְׁקֶה, אֶלָּא הַיּוֹצֵא מִן הַזֵּיתִים וּמִן הָעֲנָבִים. וְאֵין מַקְרִיבִין עַל גַּבֵּי הַמִּזְבֵּחַ, אֶלָּא הַיּוֹצֵא מִן הַזֵּיתִים וּמִן הָעֲנָבִים:",
      en: "One may not make dates into honey, nor apples into wine, nor winter-figs into vinegar; and all other fruit one may not alter from their natural state as terumah or maaser sheni — only olives and grapes. Lashes for orlah are incurred only on what issues from olives and grapes; bikkurim as liquid are brought only from olives and grapes; liquid conveys tumah only from olives and grapes; and only what issues from olives and grapes is offered on the altar." }
  },
  species: [
    { id: "gefen", aspect: { level: "d'oraisa", category: "tirosh", liquid: true,
      note: { he: "עֲנָבִים — מִתְּרוּמָתָן נַעֲשֵׂית יַיִן; יְחִידוֹת (עִם זֵיתִים) שֶׁמְּשַׁנִּין מִבְּרִיָּתָן.", en: "Grapes: their terumah becomes wine — alone with olives among fruit one may alter to liquid (11:3)." }, ref: "11:3" } },
    { id: "zayit", aspect: { level: "d'oraisa", category: "yitzhar", liquid: true,
      note: { he: "זֵיתִים — תְּרוּמָתָם כְּשֶׁמֶן; יְחִידִים (עִם עֲנָבִים).", en: "Olives: terumah taken as oil — alone with grapes (11:3)." }, ref: "11:3" } },
    { id: "chitim", aspect: { level: "d'oraisa", category: "dagan",
      note: { he: "דָּגָן — חִיּוּב תְּרוּמָה מִן הַתּוֹרָה.", en: "Grain (dagan): terumah obligation is d'Oraisa." } } },
    { id: "seorim", aspect: { level: "d'oraisa", category: "dagan" } },
    { id: "temarim", aspect: { level: "d'rabanan", category: "peiros",
      note: { he: "אֵין עוֹשִׂין תְּמָרִים דְּבַשׁ בִּתְרוּמָה — אֵין מְשַׁנִּין מִבְּרִיָּתָן.", en: "Dates may not be made into honey as terumah — no altering their natural form (11:3)." }, ref: "11:3" } },
    { id: "tapuach", aspect: { level: "d'rabanan", category: "peiros",
      note: { he: "אֵין עוֹשִׂין תַּפּוּחִים יַיִן בִּתְרוּמָה.", en: "Apples may not be made into wine as terumah (11:3)." }, ref: "11:3" } },
    { id: "teena", aspect: { level: "d'rabanan", category: "peiros" } },
    { id: "kishut", aspect: { level: "d'rabanan", category: "yerek" } },
    { id: "delaat", aspect: { level: "d'rabanan", category: "yerek" } }
  ]
};
