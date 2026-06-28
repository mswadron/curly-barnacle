const { useState } = React;

/* ═══════════════════════════════════════════════════════════════════
   נסיונות המדבר · The Nisyonos of Klal Yisroel in the Midbar
   Three views: episode cards · timeline · the Ten (opinions matrix)
   Every quotation is verbatim and linked to its source on Sefaria.
   ═══════════════════════════════════════════════════════════════════ */

/* ---------- small source-link primitive ---------- */
function Src({ cite, url }) {
  if (!cite) return null;
  if (!url) return <span className="src">{cite}</span>;
  return (
    <a className="src" href={url} target="_blank" rel="noopener noreferrer">{cite}</a>
  );
}
function Quote({ q }) {
  return (
    <div className="quote">
      {q.label && <span className="qlabel">{q.label}</span>}
      <span className="qtext">{q.he}</span>
      <Src cite={q.ref} url={q.url} />
    </div>
  );
}

/* ---------- facet metadata ---------- */
const FACETS = [
  ["complaint",    "הַתְּלוּנָה / הַמַּעֲשֶׂה"],
  ["hashem",       "תְּגוּבַת הַקָּדוֹשׁ בָּרוּךְ הוּא"],
  ["moshe",        "תְּגוּבַת מֹשֶׁה"],
  ["interjection", "תְּפִלַּת מֹשֶׁה וְהִשְׁתַּדְּלוּתוֹ"],
  ["punishment",   "הָעֹנֶשׁ"],
];

/* ═══════════════════════ EPISODE DATA ═══════════════════════ */
const STATIONS = [
  {
    id: "yam", he: "עַל הַיָּם", en: "At the Sea", place: "יַם סוּף",
    within: true, tag: "שְׁנַיִם בַּיָּם",
    note: "שְׁתֵּי נְסִיוֹנוֹת — בַּיְּרִידָה (אֶל הַיָּם) וּבָעֲלִיָּה (מִן הַיָּם)",
    complaint: [
      { label: "יְרִידָה", he: "הֲמִבְּלִי אֵין־קְבָרִים בְּמִצְרַיִם לְקַחְתָּנוּ לָמוּת בַּמִּדְבָּר", ref: "שמות יד, יא", url: "https://www.sefaria.org/Exodus.14.11" },
      { label: "עֲלִיָּה", he: "וַיַּמְרוּ עַל־יָם בְּיַם־סוּף — מְלַמֵּד שֶׁהָיוּ מִקְּטַנֵּי אֲמָנָה", ref: "תהלים קו, ז · ערכין טו.", url: "https://www.sefaria.org/Arakhin.15a" },
    ],
    moshe: [
      { he: "אַל־תִּירָאוּ הִתְיַצְּבוּ וּרְאוּ אֶת־יְשׁוּעַת ה'... ה' יִלָּחֵם לָכֶם וְאַתֶּם תַּחֲרִשׁוּן", ref: "שמות יד, יג–יד", url: "https://www.sefaria.org/Exodus.14.13" },
    ],
    interjection: [
      { he: "וַיִּצְעֲקוּ בְנֵי־יִשְׂרָאֵל אֶל־ה'", ref: "שמות יד, י", url: "https://www.sefaria.org/Exodus.14.10" },
    ],
    punishment: [
      { he: "אֵין עֹנֶשׁ לְיִשְׂרָאֵל — וַיַּרְא יִשְׂרָאֵל אֶת־מִצְרַיִם מֵת עַל־שְׂפַת הַיָּם", ref: "שמות יד, ל", url: "https://www.sefaria.org/Exodus.14.30" },
    ],
    deaths: { none: true, he: "אֵין מִסְפָּר בַּכָּתוּב (הַמֵּתִים — מִצְרַיִם)" },
  },
  {
    id: "marah", he: "מָרָה", en: "The Bitter Waters", place: "מָרָה",
    within: true, tag: "אֶחָד מִשְּׁנַיִם בַּמַּיִם",
    complaint: [
      { he: "וַיִּלֹּנוּ הָעָם עַל־מֹשֶׁה לֵּאמֹר מַה־נִּשְׁתֶּה", ref: "שמות טו, כד", url: "https://www.sefaria.org/Exodus.15.24" },
    ],
    hashem: [
      { he: "וַיּוֹרֵהוּ ה' עֵץ... שָׁם שָׂם לוֹ חֹק וּמִשְׁפָּט וְשָׁם נִסָּהוּ", ref: "שמות טו, כה", url: "https://www.sefaria.org/Exodus.15.25" },
    ],
    interjection: [
      { he: "וַיִּצְעַק אֶל־ה'", ref: "שמות טו, כה", url: "https://www.sefaria.org/Exodus.15.25" },
    ],
    punishment: [
      { he: "אֵין עֹנֶשׁ — וְהַבְטָחַת \"כָּל־הַמַּחֲלָה... לֹא־אָשִׂים עָלֶיךָ כִּי אֲנִי ה' רֹפְאֶךָ\"", ref: "שמות טו, כו", url: "https://www.sefaria.org/Exodus.15.26" },
    ],
    deaths: { none: true, he: "אֵין מִסְפָּר בַּכָּתוּב" },
  },
  {
    id: "man", he: "מִדְבַּר סִין — הַמָּן", en: "The Manna", place: "מִדְבַּר סִין",
    within: true, tag: "שְׁנַיִם בַּמָּן · וְשָׂלָו רִאשׁוֹן",
    note: "תְּלוּנַת הָרָעָב (סִיר הַבָּשָׂר), וְעוֹד שְׁתַּיִם בַּמָּן — הַנּוֹתָר וְהַיְצִיאָה בַּשַּׁבָּת",
    complaint: [
      { label: "סִיר הַבָּשָׂר", he: "מִי־יִתֵּן מוּתֵנוּ בְיַד־ה' בְּאֶרֶץ מִצְרַיִם בְּשִׁבְתֵּנוּ עַל־סִיר הַבָּשָׂר... כִּי־הוֹצֵאתֶם אֹתָנוּ אֶל־הַמִּדְבָּר הַזֶּה לְהָמִית אֶת־כׇּל־הַקָּהָל הַזֶּה בָּרָעָב", ref: "שמות טז, ג", url: "https://www.sefaria.org/Exodus.16.3" },
      { label: "הַנּוֹתָר", he: "וְלֹא־שָׁמְעוּ אֶל־מֹשֶׁה וַיּוֹתִרוּ אֲנָשִׁים מִמֶּנּוּ עַד־בֹּקֶר וַיָּרֻם תּוֹלָעִים וַיִּבְאַשׁ", ref: "שמות טז, כ", url: "https://www.sefaria.org/Exodus.16.20" },
      { label: "בַּשַּׁבָּת", he: "יָצְאוּ מִן־הָעָם לִלְקֹט וְלֹא מָצָאוּ", ref: "שמות טז, כז", url: "https://www.sefaria.org/Exodus.16.27" },
    ],
    hashem: [
      { he: "הִנְנִי מַמְטִיר לָכֶם לֶחֶם מִן־הַשָּׁמָיִם... לְמַעַן אֲנַסֶּנּוּ הֲיֵלֵךְ בְּתוֹרָתִי אִם־לֹא", ref: "שמות טז, ד", url: "https://www.sefaria.org/Exodus.16.4" },
      { label: "בַּשַּׁבָּת", he: "עַד־אָנָה מֵאַנְתֶּם לִשְׁמֹר מִצְוֺתַי וְתוֹרֹתָי", ref: "שמות טז, כח", url: "https://www.sefaria.org/Exodus.16.28" },
    ],
    moshe: [
      { he: "וְנַחְנוּ מָה כִּי תַלִּינוּ עָלֵינוּ... לֹא־עָלֵינוּ תְלֻנֹּתֵיכֶם כִּי עַל־ה'", ref: "שמות טז, ז–ח", url: "https://www.sefaria.org/Exodus.16.7" },
    ],
    punishment: [
      { he: "הַנּוֹתָר הִתְלִיעַ וְהִבְאִישׁ; אֵין עֹנֶשׁ מַעֲבָר לְכָךְ", ref: "שמות טז, כ", url: "https://www.sefaria.org/Exodus.16.20" },
    ],
    deaths: { none: true, he: "אֵין מִסְפָּר בַּכָּתוּב" },
  },
  {
    id: "refidim", he: "רְפִידִים — מַסָּה וּמְרִיבָה", en: "Massah & Merivah", place: "רְפִידִים",
    within: true, tag: "אֶחָד מִשְּׁנַיִם בַּמַּיִם",
    complaint: [
      { he: "וַיָּרֶב הָעָם עִם־מֹשֶׁה... לָמָּה זֶּה הֶעֱלִיתָנוּ מִמִּצְרַיִם לְהָמִית אֹתִי וְאֶת־בָּנַי וְאֶת־מִקְנַי בַּצָּמָא", ref: "שמות יז, ב–ג", url: "https://www.sefaria.org/Exodus.17.2" },
    ],
    hashem: [
      { he: "עֲבֹר לִפְנֵי הָעָם... וְהִכִּיתָ בַצּוּר וְיָצְאוּ מִמֶּנּוּ מַיִם וְשָׁתָה הָעָם", ref: "שמות יז, ה–ו", url: "https://www.sefaria.org/Exodus.17.5" },
    ],
    moshe: [
      { he: "מַה־תְּרִיבוּן עִמָּדִי מַה־תְּנַסּוּן אֶת־ה'", ref: "שמות יז, ב", url: "https://www.sefaria.org/Exodus.17.2" },
    ],
    interjection: [
      { he: "וַיִּצְעַק מֹשֶׁה אֶל־ה' לֵאמֹר מָה אֶעֱשֶׂה לָעָם הַזֶּה עוֹד מְעַט וּסְקָלֻנִי", ref: "שמות יז, ד", url: "https://www.sefaria.org/Exodus.17.4" },
    ],
    punishment: [
      { he: "אֵין עֹנֶשׁ — וַיִּקְרָא שֵׁם הַמָּקוֹם מַסָּה וּמְרִיבָה... הֲיֵשׁ ה' בְּקִרְבֵּנוּ אִם־אָיִן", ref: "שמות יז, ז", url: "https://www.sefaria.org/Exodus.17.7" },
    ],
    deaths: { none: true, he: "אֵין מִסְפָּר בַּכָּתוּב" },
  },
  {
    id: "egel", he: "חֵטְא הָעֵגֶל", en: "The Golden Calf", place: "חוֹרֵב",
    within: true, tag: "אֶחָד בָּעֵגֶל",
    note: "תּוֹסְפוֹת יוֹם טוֹב חוֹלֵק: \"שֶׁאֵינוֹ נִסָּיוֹן אֶלָּא חֵטְא\"",
    complaint: [
      { he: "קוּם עֲשֵׂה־לָנוּ אֱלֹהִים אֲשֶׁר יֵלְכוּ לְפָנֵינוּ... אֵלֶּה אֱלֹהֶיךָ יִשְׂרָאֵל אֲשֶׁר הֶעֱלוּךָ מֵאֶרֶץ מִצְרָיִם", ref: "שמות לב, א · לב, ד", url: "https://www.sefaria.org/Exodus.32.4" },
    ],
    hashem: [
      { he: "רָאִיתִי אֶת־הָעָם הַזֶּה וְהִנֵּה עַם־קְשֵׁה־עֹרֶף הוּא. וְעַתָּה הַנִּיחָה לִּי וְיִחַר־אַפִּי בָהֶם וַאֲכַלֵּם וְאֶעֱשֶׂה אוֹתְךָ לְגוֹי גָּדוֹל", ref: "שמות לב, ט–י", url: "https://www.sefaria.org/Exodus.32.9" },
    ],
    moshe: [
      { he: "וַיִּחַר־אַף מֹשֶׁה וַיַּשְׁלֵךְ מִיָּדָו אֶת־הַלֻּחֹת וַיְשַׁבֵּר אֹתָם תַּחַת הָהָר", ref: "שמות לב, יט", url: "https://www.sefaria.org/Exodus.32.19" },
    ],
    interjection: [
      { he: "וַיְחַל מֹשֶׁה אֶת־פְּנֵי ה'... שׁוּב מֵחֲרוֹן אַפֶּךָ וְהִנָּחֵם עַל־הָרָעָה לְעַמֶּךָ. זְכֹר לְאַבְרָהָם לְיִצְחָק וּלְיִשְׂרָאֵל", ref: "שמות לב, יא–יג", url: "https://www.sefaria.org/Exodus.32.11" },
      { he: "תּוֹצָאָה: וַיִּנָּחֶם ה' עַל־הָרָעָה אֲשֶׁר דִּבֶּר לַעֲשׂוֹת לְעַמּוֹ", ref: "שמות לב, יד", url: "https://www.sefaria.org/Exodus.32.14" },
    ],
    punishment: [
      { label: "בְּחֶרֶב", he: "וַיִּפֹּל מִן־הָעָם בַּיּוֹם הַהוּא כִּשְׁלֹשֶׁת אַלְפֵי אִישׁ", ref: "שמות לב, כח", url: "https://www.sefaria.org/Exodus.32.28" },
      { label: "מַגֵּפָה", he: "וַיִּגֹּף ה' אֶת־הָעָם עַל אֲשֶׁר עָשׂוּ אֶת־הָעֵגֶל", ref: "שמות לב, לה", url: "https://www.sefaria.org/Exodus.32.35" },
    ],
    deaths: { he: "כִּשְׁלֹשֶׁת אַלְפֵי אִישׁ (בְּחֶרֶב); וּמַגֵּפָה לְלֹא מִסְפָּר", ref: "שמות לב, כח · לה", url: "https://www.sefaria.org/Exodus.32.28" },
  },
  {
    id: "taverah", he: "תַּבְעֵרָה — הַמִּתְאוֹנְנִים", en: "Taverah", place: "תַּבְעֵרָה",
    within: true, tag: "מַחֲלֹקֶת אִם נִמְנֶה",
    note: "רַמְבַּ\"ם, בַּרְטְנוּרָא וְרַבֵּנוּ יוֹנָה מוֹנִים אוֹתוֹ; הַבַּבְלִי (וְרַשִׁ\"י, מַהֲרַ\"ל) אֵינָם",
    complaint: [
      { he: "וַיְהִי הָעָם כְּמִתְאֹנְנִים רַע בְּאׇזְנֵי ה'", ref: "במדבר יא, א", url: "https://www.sefaria.org/Numbers.11.1" },
    ],
    hashem: [
      { he: "וַיִּשְׁמַע ה' וַיִּחַר אַפּוֹ וַתִּבְעַר־בָּם אֵשׁ ה' וַתֹּאכַל בִּקְצֵה הַמַּחֲנֶה", ref: "במדבר יא, א", url: "https://www.sefaria.org/Numbers.11.1" },
    ],
    interjection: [
      { he: "וַיִּצְעַק הָעָם אֶל־מֹשֶׁה וַיִּתְפַּלֵּל מֹשֶׁה אֶל־ה' וַתִּשְׁקַע הָאֵשׁ", ref: "במדבר יא, ב", url: "https://www.sefaria.org/Numbers.11.2" },
    ],
    punishment: [
      { he: "וַתֹּאכַל בִּקְצֵה הַמַּחֲנֶה — וַיִּקְרָא שֵׁם־הַמָּקוֹם הַהוּא תַּבְעֵרָה", ref: "במדבר יא, א–ג", url: "https://www.sefaria.org/Numbers.11.3" },
    ],
    deaths: { none: true, he: "אֵין מִסְפָּר בַּכָּתוּב" },
  },
  {
    id: "kivros", he: "קִבְרוֹת הַתַּאֲוָה — הַשְּׂלָו", en: "Kivros HaTaavah", place: "קִבְרוֹת הַתַּאֲוָה",
    within: true, tag: "שְׂלָו שֵׁנִי (הָאסַפְסֻף)",
    complaint: [
      { he: "וְהָאסַפְסֻף אֲשֶׁר בְּקִרְבּוֹ הִתְאַוּוּ תַּאֲוָה... מִי יַאֲכִלֵנוּ בָּשָׂר. זָכַרְנוּ אֶת־הַדָּגָה... וְעַתָּה נַפְשֵׁנוּ יְבֵשָׁה אֵין כֹּל בִּלְתִּי אֶל־הַמָּן עֵינֵינוּ", ref: "במדבר יא, ד–ו", url: "https://www.sefaria.org/Numbers.11.4" },
    ],
    hashem: [
      { he: "וַיִּחַר־אַף ה' מְאֹד... וְנָתַן ה' לָכֶם בָּשָׂר... עַד חֹדֶשׁ יָמִים עַד אֲשֶׁר־יֵצֵא מֵאַפְּכֶם וְהָיָה לָכֶם לְזָרָא יַעַן כִּי־מְאַסְתֶּם אֶת־ה'", ref: "במדבר יא, י · יח–כ", url: "https://www.sefaria.org/Numbers.11.18" },
    ],
    moshe: [
      { he: "וּבְעֵינֵי מֹשֶׁה רָע", ref: "במדבר יא, י", url: "https://www.sefaria.org/Numbers.11.10" },
    ],
    interjection: [
      { he: "לָמָה הֲרֵעֹתָ לְעַבְדֶּךָ... לֹא־אוּכַל אָנֹכִי לְבַדִּי לָשֵׂאת אֶת־כׇּל־הָעָם הַזֶּה כִּי כָבֵד מִמֶּנִּי. וְאִם־כָּכָה אַתְּ־עֹשֶׂה לִּי הׇרְגֵנִי נָא הָרֹג", ref: "במדבר יא, יא–טו", url: "https://www.sefaria.org/Numbers.11.11" },
    ],
    punishment: [
      { he: "הַבָּשָׂר עוֹדֶנּוּ בֵּין שִׁנֵּיהֶם... וַיַּךְ ה' בָּעָם מַכָּה רַבָּה מְאֹד — וַיִּקְרָא אֶת־שֵׁם הַמָּקוֹם הַהוּא קִבְרוֹת הַתַּאֲוָה", ref: "במדבר יא, לג–לד", url: "https://www.sefaria.org/Numbers.11.33" },
    ],
    deaths: { none: true, he: "\"מַכָּה רַבָּה מְאֹד\" — אֵין מִסְפָּר בַּכָּתוּב" },
  },
  {
    id: "meraglim", he: "הַמְּרַגְּלִים — מִדְבַּר פָּארָן", en: "The Spies", place: "מִדְבַּר פָּארָן",
    within: true, tag: "הָעֲשִׂירִי — לְכָל הַדֵּעוֹת",
    note: "\"וַיְנַסּוּ אֹתִי זֶה עֶשֶׂר פְּעָמִים\" — עָלָיו נֶחְתַּם גְּזַר הַדִּין",
    complaint: [
      { he: "לֹא נוּכַל לַעֲלוֹת אֶל־הָעָם כִּי־חָזָק הוּא מִמֶּנּוּ... וַנְּהִי בְעֵינֵינוּ כַּחֲגָבִים. וַיִּבְכּוּ הָעָם בַּלַּיְלָה הַהוּא... נִתְּנָה רֹאשׁ וְנָשׁוּבָה מִצְרָיְמָה", ref: "במדבר יג, לא–לג · יד, א–ד", url: "https://www.sefaria.org/Numbers.14.1" },
    ],
    hashem: [
      { he: "עַד־אָנָה יְנַאֲצֻנִי הָעָם הַזֶּה... אַכֶּנּוּ בַדֶּבֶר וְאוֹרִשֶׁנּוּ וְאֶעֱשֶׂה אֹתְךָ לְגוֹי־גָּדוֹל וְעָצוּם מִמֶּנּוּ", ref: "במדבר יד, יא–יב", url: "https://www.sefaria.org/Numbers.14.11" },
    ],
    interjection: [
      { he: "וְשָׁמְעוּ מִצְרַיִם... וְעַתָּה יִגְדַּל־נָא כֹּחַ אֲדֹנָי... סְלַח־נָא לַעֲוֺן הָעָם הַזֶּה כְּגֹדֶל חַסְדֶּךָ", ref: "במדבר יד, יג–יט", url: "https://www.sefaria.org/Numbers.14.13" },
      { he: "תּוֹצָאָה: וַיֹּאמֶר ה' סָלַחְתִּי כִּדְבָרֶךָ", ref: "במדבר יד, כ", url: "https://www.sefaria.org/Numbers.14.20" },
    ],
    punishment: [
      { label: "הַגְּזֵרָה", he: "וְכׇל־מְנַאֲצַי לֹא יִרְאוּהָ — דּוֹר הַמִּדְבָּר נִגְזַר לָמוּת בַּמִּדְבָּר", ref: "במדבר יד, כב–כג", url: "https://www.sefaria.org/Numbers.14.22" },
      { label: "הַמְרַגְּלִים", he: "וַיָּמֻתוּ הָאֲנָשִׁים מוֹצִאֵי דִבַּת־הָאָרֶץ רָעָה בַּמַּגֵּפָה לִפְנֵי ה'", ref: "במדבר יד, לז", url: "https://www.sefaria.org/Numbers.14.37" },
      { label: "הַמַּעְפִּילִים", he: "וַיֵּרֶד הָעֲמָלֵקִי וְהַכְּנַעֲנִי... וַיַּכּוּם וַיַּכְּתוּם עַד־הַחׇרְמָה", ref: "במדבר יד, מה", url: "https://www.sefaria.org/Numbers.14.45" },
    ],
    deaths: { he: "עֶשֶׂר הַמְרַגְּלִים בַּמַּגֵּפָה; דּוֹר שָׁלֵם בַּמִּדְבָּר (אֵין מִסְפָּר בַּכָּתוּב)", ref: "במדבר יד, לז", url: "https://www.sefaria.org/Numbers.14.37" },
  },
  /* ---- beyond the ten: after the gzar din ---- */
  {
    id: "korach", he: "קֹרַח וַעֲדָתוֹ", en: "Korach", place: "מִדְבָּר",
    within: false, tag: "מִחוּץ לְמִנְיַן הָעֲשָׂרָה",
    complaint: [
      { he: "וַיִּקָּהֲלוּ עַל־מֹשֶׁה וְעַל־אַהֲרֹן... רַב־לָכֶם כִּי כׇל־הָעֵדָה כֻּלָּם קְדֹשִׁים... וּמַדּוּעַ תִּתְנַשְּׂאוּ עַל־קְהַל ה'", ref: "במדבר טז, ג", url: "https://www.sefaria.org/Numbers.16.3" },
    ],
    hashem: [
      { he: "הִבָּדְלוּ מִתּוֹךְ הָעֵדָה הַזֹּאת וַאֲכַלֶּה אֹתָם כְּרָגַע", ref: "במדבר טז, כא", url: "https://www.sefaria.org/Numbers.16.21" },
    ],
    moshe: [
      { he: "וַיִּשְׁמַע מֹשֶׁה וַיִּפֹּל עַל־פָּנָיו... בֹּקֶר וְיֹדַע ה' אֶת־אֲשֶׁר־לוֹ", ref: "במדבר טז, ד–ה", url: "https://www.sefaria.org/Numbers.16.4" },
    ],
    interjection: [
      { he: "וַיִּפְּלוּ עַל־פְּנֵיהֶם וַיֹּאמְרוּ אֵל אֱלֹהֵי הָרוּחֹת לְכׇל־בָּשָׂר הָאִישׁ אֶחָד יֶחֱטָא וְעַל כׇּל־הָעֵדָה תִּקְצֹף", ref: "במדבר טז, כב", url: "https://www.sefaria.org/Numbers.16.22" },
    ],
    punishment: [
      { label: "בְּלִיעָה", he: "וַתִּפְתַּח הָאָרֶץ אֶת־פִּיהָ וַתִּבְלַע אֹתָם... וַיֵּרְדוּ... חַיִּים שְׁאֹלָה", ref: "במדבר טז, לב–לג", url: "https://www.sefaria.org/Numbers.16.32" },
      { label: "אֵשׁ", he: "וְאֵשׁ יָצְאָה מֵאֵת ה' וַתֹּאכַל אֵת הַחֲמִשִּׁים וּמָאתַיִם אִישׁ מַקְרִיבֵי הַקְּטֹרֶת", ref: "במדבר טז, לה", url: "https://www.sefaria.org/Numbers.16.35" },
      { label: "מַגֵּפָה", he: "וַיִּהְיוּ הַמֵּתִים בַּמַּגֵּפָה אַרְבָּעָה עָשָׂר אֶלֶף וּשְׁבַע מֵאוֹת מִלְּבַד הַמֵּתִים עַל־דְּבַר־קֹרַח", ref: "במדבר יז, יד", url: "https://www.sefaria.org/Numbers.17.14" },
    ],
    deaths: { he: "250 בָּאֵשׁ; 14,700 בַּמַּגֵּפָה; וַעֲדַת קֹרַח שֶׁנִּבְלְעוּ", ref: "במדבר טז, לה · יז, יד", url: "https://www.sefaria.org/Numbers.17.14" },
  },
  {
    id: "meimerivah", he: "מֵי מְרִיבָה", en: "Waters of Strife", place: "מִדְבַּר צִן",
    within: false, tag: "מִחוּץ לְמִנְיַן הָעֲשָׂרָה",
    complaint: [
      { he: "וַיָּרֶב הָעָם עִם־מֹשֶׁה... וְלָמָה הֶעֱלִיתֻנוּ מִמִּצְרַיִם לְהָבִיא אֹתָנוּ אֶל־הַמָּקוֹם הָרָע הַזֶּה", ref: "במדבר כ, ג–ה", url: "https://www.sefaria.org/Numbers.20.3" },
    ],
    hashem: [
      { he: "קַח אֶת־הַמַּטֶּה... וְדִבַּרְתֶּם אֶל־הַסֶּלַע לְעֵינֵיהֶם וְנָתַן מֵימָיו", ref: "במדבר כ, ז–ח", url: "https://www.sefaria.org/Numbers.20.8" },
    ],
    moshe: [
      { he: "שִׁמְעוּ־נָא הַמֹּרִים הֲמִן־הַסֶּלַע הַזֶּה נוֹצִיא לָכֶם מָיִם. וַיַּךְ אֶת־הַסֶּלַע בְּמַטֵּהוּ פַּעֲמָיִם", ref: "במדבר כ, י–יא", url: "https://www.sefaria.org/Numbers.20.10" },
    ],
    punishment: [
      { he: "יַעַן לֹא־הֶאֱמַנְתֶּם בִּי לְהַקְדִּישֵׁנִי... לָכֵן לֹא תָבִיאוּ אֶת־הַקָּהָל הַזֶּה אֶל־הָאָרֶץ", ref: "במדבר כ, יב", url: "https://www.sefaria.org/Numbers.20.12" },
    ],
    deaths: { none: true, he: "הָעֹנֶשׁ עַל מֹשֶׁה וְאַהֲרֹן — שֶׁלֹּא יִכָּנְסוּ לָאָרֶץ" },
  },
  {
    id: "nechashim", he: "הַנְּחָשִׁים הַשְּׂרָפִים", en: "The Serpents", place: "דֶּרֶךְ יַם־סוּף",
    within: false, tag: "מִחוּץ לְמִנְיַן הָעֲשָׂרָה",
    complaint: [
      { he: "וַיְדַבֵּר הָעָם בֵּאלֹהִים וּבְמֹשֶׁה... כִּי אֵין לֶחֶם וְאֵין מַיִם וְנַפְשֵׁנוּ קָצָה בַּלֶּחֶם הַקְּלֹקֵל", ref: "במדבר כא, ה", url: "https://www.sefaria.org/Numbers.21.5" },
    ],
    hashem: [
      { he: "וַיְשַׁלַּח ה' בָּעָם אֵת הַנְּחָשִׁים הַשְּׂרָפִים וַיְנַשְּׁכוּ אֶת־הָעָם", ref: "במדבר כא, ו", url: "https://www.sefaria.org/Numbers.21.6" },
    ],
    interjection: [
      { he: "הִתְפַּלֵּל אֶל־ה' וְיָסֵר מֵעָלֵינוּ אֶת־הַנָּחָשׁ וַיִּתְפַּלֵּל מֹשֶׁה בְּעַד הָעָם", ref: "במדבר כא, ז", url: "https://www.sefaria.org/Numbers.21.7" },
    ],
    punishment: [
      { he: "וַיָּמׇת עַם־רָב מִיִּשְׂרָאֵל", ref: "במדבר כא, ו", url: "https://www.sefaria.org/Numbers.21.6" },
    ],
    deaths: { none: true, he: "\"עַם־רָב\" — אֵין מִסְפָּר בַּכָּתוּב" },
  },
  {
    id: "peor", he: "בַּעַל פְּעוֹר — שִׁטִּים", en: "Baal Peor", place: "שִׁטִּים",
    within: false, tag: "מִחוּץ לְמִנְיַן הָעֲשָׂרָה",
    complaint: [
      { he: "וַיָּחֶל הָעָם לִזְנוֹת אֶל־בְּנוֹת מוֹאָב... וַיִּצָּמֶד יִשְׂרָאֵל לְבַעַל פְּעוֹר", ref: "במדבר כה, א–ג", url: "https://www.sefaria.org/Numbers.25.1" },
    ],
    hashem: [
      { he: "וַיִּחַר־אַף ה' בְּיִשְׂרָאֵל... קַח אֶת־כׇּל־רָאשֵׁי הָעָם וְהוֹקַע אוֹתָם לַה' נֶגֶד הַשָּׁמֶשׁ", ref: "במדבר כה, ג–ד", url: "https://www.sefaria.org/Numbers.25.3" },
    ],
    moshe: [
      { he: "וַיֹּאמֶר מֹשֶׁה אֶל־שֹׁפְטֵי יִשְׂרָאֵל הִרְגוּ אִישׁ אֲנָשָׁיו הַנִּצְמָדִים לְבַעַל פְּעוֹר", ref: "במדבר כה, ה", url: "https://www.sefaria.org/Numbers.25.5" },
    ],
    interjection: [
      { he: "פִּינְחָס... וַיִּקַּח רֹמַח בְּיָדוֹ... וַיִּדְקֹר אֶת־שְׁנֵיהֶם — וַתֵּעָצַר הַמַּגֵּפָה מֵעַל בְּנֵי יִשְׂרָאֵל", ref: "במדבר כה, ז–ח", url: "https://www.sefaria.org/Numbers.25.7" },
    ],
    punishment: [
      { he: "וַיִּהְיוּ הַמֵּתִים בַּמַּגֵּפָה אַרְבָּעָה וְעֶשְׂרִים אָלֶף", ref: "במדבר כה, ט", url: "https://www.sefaria.org/Numbers.25.9" },
    ],
    deaths: { he: "אַרְבָּעָה וְעֶשְׂרִים אָלֶף (24,000)", ref: "במדבר כה, ט", url: "https://www.sefaria.org/Numbers.25.9" },
  },
];

/* ═══════════════════════ THE TEN — OPINIONS MATRIX ═══════════════════════ */
const OPIN_EPISODES = [
  { id: "yam_y", he: "יָם — יְרִידָה (הֲמִבְּלִי אֵין קְבָרִים)", ref: "שמות יד, יא" },
  { id: "yam_a", he: "יָם — עֲלִיָּה (וַיַּמְרוּ עַל־יָם)", ref: "תהלים קו, ז" },
  { id: "marah", he: "מָרָה (מַיִם)", ref: "שמות טו, כד" },
  { id: "refidim", he: "רְפִידִים (מַיִם)", ref: "שמות יז, א–ב" },
  { id: "massah", he: "מַסָּה — הֲיֵשׁ ה' בְּקִרְבֵּנוּ", ref: "שמות יז, ז" },
  { id: "man_l", he: "מָן — לֹא תוֹתִירוּ (הַנּוֹתָר)", ref: "שמות טז, כ" },
  { id: "man_s", he: "מָן — לֹא תֵצְאוּ (שַׁבָּת)", ref: "שמות טז, כז" },
  { id: "slav1", he: "שְׂלָו א' — סִיר הַבָּשָׂר", ref: "שמות טז, ג" },
  { id: "slav2", he: "שְׂלָו ב' — הָאסַפְסֻף", ref: "במדבר יא, ד" },
  { id: "miton", he: "מִתְאוֹנְנִים — תַּבְעֵרָה", ref: "במדבר יא, א" },
  { id: "egel", he: "הָעֵגֶל", ref: "שמות לב" },
  { id: "merag", he: "מְרַגְּלִים — מִדְבַּר פָּארָן", ref: "במדבר יד, כב" },
];

const OPIN_AUTH = [
  { id: "bavli", he: "עֲרָכִין טו · רַשִׁ\"י אָבוֹת · מַהֲרַ\"ל", short: "הַבַּבְלִי", url: "https://www.sefaria.org/Arakhin.15a" },
  { id: "rambam", he: "רַמְבַּ\"ם (פֵּרוּשׁ הַמִּשְׁנָה)", short: "רַמְבַּ\"ם", url: "https://www.sefaria.org/Rambam_on_Pirkei_Avot.5.4" },
  { id: "barten", he: "בַּרְטְנוּרָא", short: "בַּרְטְנוּרָא", url: "https://www.sefaria.org/Bartenura_on_Pirkei_Avot.5.4" },
  { id: "yonah", he: "רַבֵּנוּ יוֹנָה", short: "רַבֵּנוּ יוֹנָה", url: "https://www.sefaria.org/Rabbeinu_Yonah_on_Pirkei_Avot.5.4" },
  { id: "tyt", he: "תּוֹסְפוֹת יוֹם טוֹב", short: "תּוֹס' יו\"ט", url: "https://www.sefaria.org/Tosafot_Yom_Tov_on_Pirkei_Avot.5.4" },
];

// y = counted, n = not counted, d = disputed/with-note (footnote number)
const MATRIX = {
  //          bavli  rambam barten yonah  tyt
  yam_y:    ["y",   "y",   "y",   "y",   "y"],
  yam_a:    ["y",   "n",   "y",   "n",   "d1"],
  marah:    ["y",   "y",   "y",   "y",   "y"],
  refidim:  ["y",   "y",   "y",   "y",   "y"],
  massah:   ["n",   "n",   "n",   "d2",  "n"],
  man_l:    ["y",   "y",   "y",   "y",   "y"],
  man_s:    ["y",   "y",   "y",   "n",   "y"],
  slav1:    ["y",   "y",   "y",   "y",   "y"],
  slav2:    ["y",   "y",   "y",   "y",   "d3"],
  miton:    ["n",   "y",   "d4",  "y",   "n"],
  egel:     ["y",   "y",   "y",   "y",   "d5"],
  merag:    ["y",   "y",   "y",   "y",   "y"],
};

const FOOTNOTES = {
  d1: "תּוֹס' יו\"ט: בִּמְקוֹם הָעֵגֶל מַכְנִיס נִסָּיוֹן נוֹסָף עַל הַיָּם — \"וַיַּמְרוּ עַל יָם בְּיַם־סוּף\".",
  d2: "רַבֵּנוּ יוֹנָה לְבַדּוֹ מוֹנֶה אֶת \"הֲיֵשׁ ה' בְּקִרְבֵּנוּ\" (מַסָּה) כְּנִסָּיוֹן נִפְרָד (וְהַמַּעְתִּיק עַצְמוֹ הֵעִיר שֶׁהַמִּנְיָן צָרִיךְ עִיּוּן).",
  d3: "תּוֹס' יו\"ט: הַמִּתְאוֹנְנִים וְהָאסַפְסֻף \"חַד עִנְיָנָא הוּא\" — לָכֵן הַבַּבְלִי אֵינוֹ מוֹנֶה אֶת הַמִּתְאוֹנְנִים בִּפְנֵי עַצְמוֹ.",
  d4: "בַּרְטְנוּרָא מַזְכִּיר \"אֶחָד בַּמִּתְאוֹנְנִים\" בְּתוֹסֶפֶת לְעֵגֶל וְלָאסַפְסֻף — לְפִי פְּשָׁט לְשׁוֹנוֹ עוֹלֶה כְּאַחַד־עָשָׂר, וּצְרִיכָה הַשְׁלָמַת הַמִּנְיָן לַעֲשָׂרָה.",
  d5: "תּוֹס' יו\"ט: \"שֶׁלֹּא נַחְשׁוֹב עֵגֶל כְּלָל מִן הַמִּנְיָן לְפִי שֶׁאֵינוֹ נִסָּיוֹן אֶלָּא חֵטְא\".",
};

const ENUMS = [
  {
    auth: "עֲרָכִין טו ע\"א–ע\"ב (בָּרַיְתָא דְּרַבִּי יְהוּדָה)", url: "https://www.sefaria.org/Arakhin.15a",
    he: "עֶשֶׂר נִסְיוֹנוֹת נִסּוּ אֲבוֹתֵינוּ לְהַקָּדוֹשׁ בָּרוּךְ הוּא: שְׁנַיִם בַּיָּם, וּשְׁנַיִם בַּמַּיִם, שְׁנַיִם בַּמָּן, שְׁנַיִם בַּשְּׂלָיו, אַחַת בָּעֵגֶל, וְאַחַת בְּמִדְבַּר פָּארָן.",
    tail: "הַשְּׂלָו הַשֵּׁנִי הוּא הָאסַפְסֻף (במדבר יא, ד); הַמִּתְאוֹנְנִים אֵינוֹ נִמְנֶה. רַשִׁ\"י עַל אָבוֹת וּמַהֲרַ\"ל מַעְתִּיקִים אוֹתָהּ כִּלְשׁוֹנָהּ.",
  },
  {
    auth: "רַמְבַּ\"ם · פֵּרוּשׁ הַמִּשְׁנָה", url: "https://www.sefaria.org/Rambam_on_Pirkei_Avot.5.4",
    he: "מוֹנֶה אֶחָד בַּיָּם בִּלְבַד, וּמַכְנִיס גַּם אֶת הַמִּתְאוֹנְנִים (תַּבְעֵרָה) וְגַם אֶת הָאסַפְסֻף (קִבְרוֹת הַתַּאֲוָה) כִּשְׁנֵי נְסִיוֹנוֹת נִפְרָדִים.",
    tail: "\"וְכֻלָּם דִּבְרֵי הַכָּתוּב הֵם\" — כָּל אֶחָד מְעֻגָּן בְּפָסוּק מְפֹרָשׁ.",
  },
  {
    auth: "בַּרְטְנוּרָא", url: "https://www.sefaria.org/Bartenura_on_Pirkei_Avot.5.4",
    he: "אֶחָד בָּעֵגֶל, וְאֶחָד בַּמִּתְאוֹנְנִים, וּבַמְּרַגְּלִים — וְהוּא עֲשִׂירִי, שֶׁשָּׁם נֶאֱמַר 'וַיְנַסּוּ אֹתִי זֶה עֶשֶׂר פְּעָמִים'.",
    tail: "מַכְנִיס אֶת הַמִּתְאוֹנְנִים לַמִּנְיָן (כְּעֵין שִׁיטַת הָרַמְבַּ\"ם).",
  },
  {
    auth: "רַבֵּנוּ יוֹנָה", url: "https://www.sefaria.org/Rabbeinu_Yonah_on_Pirkei_Avot.5.4",
    he: "מוֹנֶה אֶת \"הֲיֵשׁ ה' בְּקִרְבֵּנוּ\" (מַסָּה) כְּנִסָּיוֹן רְבִיעִי, וְכֵן אֶת הַמִּתְאוֹנְנִים וְאֶת קִבְרוֹת הַתַּאֲוָה — וְאֶת הָעֵגֶל.",
    tail: "מִנְיָנוֹ יְחִידִי: הַמַּעְתִּיק עַצְמוֹ כָּתַב שֶׁ\"צָּרִיךְ עִיּוּן בְּכָל מִנְיָנוֹ בָּזֶה\".",
  },
  {
    auth: "תּוֹסְפוֹת יוֹם טוֹב", url: "https://www.sefaria.org/Tosafot_Yom_Tov_on_Pirkei_Avot.5.4",
    he: "מַשִּׂיג שְׁתַּיִם: (א) הַמִּתְאוֹנְנִים וְהָאסַפְסֻף \"חַד עִנְיָנָא הוּא\"; (ב) אֶת הָעֵגֶל אֵין לִמְנוֹת \"לְפִי שֶׁאֵינוֹ נִסָּיוֹן אֶלָּא חֵטְא\", וּבִמְקוֹמוֹ — נִסָּיוֹן נוֹסָף עַל הַיָּם.",
    tail: "\"וְשִׁבְעִים פָּנִים לַתּוֹרָה\".",
  },
];

/* ═══════════════════════ VIEW 1 — CARDS ═══════════════════════ */
function CardView() {
  const [open, setOpen] = useState(STATIONS[0].id);
  return (
    <div className="cards">
      {STATIONS.map((s, i) => {
        const isOpen = open === s.id;
        return (
          <div key={s.id} className={"card" + (s.within ? "" : " beyond") + (isOpen ? " open" : "")}>
            <button className="card-head" onClick={() => setOpen(isOpen ? null : s.id)}>
              <span className="card-num">{i + 1}</span>
              <span className="card-titles">
                <span className="card-he">{s.he}</span>
                <span className="card-place">{s.place}</span>
              </span>
              <span className={"card-tag" + (s.within ? "" : " tag-beyond")}>{s.tag}</span>
              <span className="card-chev">{isOpen ? "▾" : "◂"}</span>
            </button>
            {isOpen && (
              <div className="card-body">
                {s.note && <div className="card-note">{s.note}</div>}
                {FACETS.map(([key, label]) =>
                  s[key] && s[key].length ? (
                    <div className="facet" key={key}>
                      <div className="facet-label">{label}</div>
                      {s[key].map((q, j) => <Quote key={j} q={q} />)}
                    </div>
                  ) : null
                )}
                <div className={"facet deaths" + (s.deaths.none ? " none" : "")}>
                  <div className="facet-label">מִנְיַן הַמֵּתִים</div>
                  <div className="quote">
                    <span className="qtext">{s.deaths.he}</span>
                    <Src cite={s.deaths.ref} url={s.deaths.url} />
                  </div>
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

/* ═══════════════════════ VIEW 2 — TIMELINE ═══════════════════════ */
function TimelineView() {
  return (
    <div className="timeline">
      {STATIONS.map((s, i) => {
        const first = s.complaint && s.complaint[0];
        const decree = s.id === "meraglim";
        return (
          <React.Fragment key={s.id}>
            {s.id === "korach" && (
              <div className="tl-divider">לְאַחַר גְּזַר הַדִּין — מִחוּץ לְמִנְיַן הָעֲשָׂרָה</div>
            )}
            <div className={"tl-row" + (s.within ? "" : " beyond") + (decree ? " decree" : "")}>
              <div className="tl-marker"><span>{i + 1}</span></div>
              <div className="tl-content">
                <div className="tl-head">
                  <span className="tl-he">{s.he}</span>
                  <span className="tl-place">{s.place}</span>
                  <span className={"tl-tag" + (s.within ? "" : " tag-beyond")}>{s.tag}</span>
                </div>
                {first && <div className="tl-quote">“{first.he}” <Src cite={first.ref} url={first.url} /></div>}
                <div className="tl-deaths">
                  <strong>הָעֹנֶשׁ:</strong>{" "}
                  {s.punishment && s.punishment[0] ? s.punishment[0].he : "—"}
                  {!s.deaths.none && <span className="tl-toll"> · {s.deaths.he}</span>}
                </div>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
}

/* ═══════════════════════ VIEW (TABLE) — ALL NISYONOS ═══════════════════════ */
function TCell({ items }) {
  if (!items || !items.length) return <span className="tc-none">—</span>;
  return (
    <React.Fragment>
      {items.map((q, i) => (
        <div className="tc-q" key={i}>
          {q.label && <span className="tc-lab">{q.label}</span>}
          <span className="tc-txt">{q.he}</span> <Src cite={q.ref} url={q.url} />
        </div>
      ))}
    </React.Fragment>
  );
}
function TableView() {
  return (
    <div className="table-wrap">
      <table className="bigtable">
        <thead>
          <tr>
            <th>#</th>
            <th>הַנִּסָּיוֹן</th>
            <th>הַתְּלוּנָה / הַמַּעֲשֶׂה</th>
            <th>תְּגוּבַת הַקָּדוֹשׁ בָּרוּךְ הוּא</th>
            <th>תְּגוּבַת מֹשֶׁה</th>
            <th>תְּפִלָּה / הִשְׁתַּדְּלוּת</th>
            <th>הָעֹנֶשׁ</th>
            <th>מִנְיַן הַמֵּתִים</th>
            <th>בַּמִּנְיָן</th>
          </tr>
        </thead>
        <tbody>
          {STATIONS.map((s, i) => (
            <tr key={s.id} className={s.within ? "" : "row-beyond"}>
              <td className="tc-num">{i + 1}</td>
              <td className="tc-name">
                <span className="tc-he">{s.he}</span>
                <span className="tc-place">{s.place}</span>
                <span className={"tc-tag" + (s.within ? "" : " tag-beyond")}>{s.tag}</span>
              </td>
              <td className="qcol"><TCell items={s.complaint} /></td>
              <td className="qcol"><TCell items={s.hashem} /></td>
              <td className="qcol"><TCell items={s.moshe} /></td>
              <td className="qcol"><TCell items={s.interjection} /></td>
              <td className="qcol"><TCell items={s.punishment} /></td>
              <td className={"tc-death" + (s.deaths.none ? " none" : "")}>
                <span className="tc-txt">{s.deaths.he}</span> <Src cite={s.deaths.ref} url={s.deaths.url} />
              </td>
              <td className="tc-in">{s.within ? <span className="in-yes">✓</span> : <span className="in-no">מִחוּץ</span>}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/* ═══════════════════════ VIEW 3 — THE TEN (MATRIX) ═══════════════════════ */
function cellGlyph(v) {
  if (v === "y") return <span className="cell yes">✓</span>;
  if (v === "n") return <span className="cell no">·</span>;
  if (v && v[0] === "d") return <span className="cell dis">◐<sup>{v.slice(1)}</sup></span>;
  return <span className="cell no">·</span>;
}
function TenView() {
  const [fn, setFn] = useState(null);
  return (
    <div className="ten">
      <p className="ten-intro">
        מִשְׁנַת אָבוֹת (ה, ד) אוֹמֶרֶת <em>“עֲשָׂרָה נִסְיוֹנוֹת נִסּוּ אֲבוֹתֵינוּ אֶת הַמָּקוֹם בָּרוּךְ הוּא בַּמִּדְבָּר”</em>, עַל־פִּי
        “וַיְנַסּוּ אֹתִי זֶה עֶשֶׂר פְּעָמִים” (במדבר יד, כב). הַסֻּגְיָא בַּעֲרָכִין מוֹנָה אוֹתָם — אַךְ הַמְפָרְשִׁים נֶחְלְקוּ
        אֵילּוּ מַעֲשִׂים נִכְנָסִים לַמִּנְיָן. הַטַּבְלָה מַשְׁוָה בֵּינֵיהֶם.
      </p>

      <div className="matrix-wrap">
        <table className="matrix">
          <thead>
            <tr>
              <th className="ep-col">הַמַּעֲשֶׂה</th>
              {OPIN_AUTH.map(a => (
                <th key={a.id}><a href={a.url} target="_blank" rel="noopener noreferrer">{a.short}</a></th>
              ))}
            </tr>
          </thead>
          <tbody>
            {OPIN_EPISODES.map(ep => (
              <tr key={ep.id}>
                <td className="ep-col">
                  <span className="ep-he">{ep.he}</span>
                  <span className="ep-ref">{ep.ref}</span>
                </td>
                {MATRIX[ep.id].map((v, k) => (
                  <td key={k} onClick={() => v[0] === "d" && setFn(v)} className={v[0] === "d" ? "clickable" : ""}>
                    {cellGlyph(v)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="legend">
        <span><span className="cell yes">✓</span> נִמְנֶה</span>
        <span><span className="cell no">·</span> אֵינוֹ נִמְנֶה</span>
        <span><span className="cell dis">◐</span> מַחֲלֹקֶת / הֶעָרָה (הַקֵּשׁ עַל הַתָּא)</span>
      </div>

      {fn && (
        <div className="fn-box" onClick={() => setFn(null)}>
          <strong>הֶעָרָה {fn.slice(1)}:</strong> {FOOTNOTES[fn]} <span className="fn-x">סְגֹר ✕</span>
        </div>
      )}

      <h3 className="disputes-h">שָׁלֹשׁ נְקֻדּוֹת הַמַּחֲלֹקֶת</h3>
      <div className="disputes">
        <div className="dispute">
          <div className="d-title">א · הַמִּתְאוֹנְנִים (במדבר יא, א) — נִמְנֶה אוֹ לֹא?</div>
          הַבַּבְלִי, רַשִׁ\"י וּמַהֲרַ\"ל אֵינָם מוֹנִים אוֹתוֹ — הַשְּׂלָו הַשֵּׁנִי הוּא הָאסַפְסֻף (יא, ד). רַמְבַּ\"ם, בַּרְטְנוּרָא וְרַבֵּנוּ יוֹנָה מוֹנִים אוֹתוֹ כְּנִסָּיוֹן נִפְרָד.
        </div>
        <div className="dispute">
          <div className="d-title">ב · הָעֵגֶל — נִסָּיוֹן אוֹ חֵטְא?</div>
          כָּל הַשִּׁיטוֹת מוֹנוֹת אוֹתוֹ, מִלְּבַד תּוֹסְפוֹת יוֹם טוֹב, הַסּוֹבֵר “שֶׁאֵינוֹ נִסָּיוֹן אֶלָּא חֵטְא”, וּמַחֲלִיפוֹ בְּנִסָּיוֹן נוֹסָף עַל הַיָּם.
        </div>
        <div className="dispute">
          <div className="d-title">ג · מַסָּה “הֲיֵשׁ ה' בְּקִרְבֵּנוּ” (שמות יז, ז)</div>
          מוֹפִיעַ בַּמִּנְיָן רַק אֵצֶל רַבֵּנוּ יוֹנָה (וְאַף הַמַּעְתִּיק הֵעִיר שֶׁמִּנְיָנוֹ צָרִיךְ עִיּוּן).
        </div>
      </div>

      <h3 className="disputes-h">לְשׁוֹן הַמְפָרְשִׁים</h3>
      <div className="enums">
        {ENUMS.map((e, i) => (
          <div className="enum" key={i}>
            <a className="enum-auth" href={e.url} target="_blank" rel="noopener noreferrer">{e.auth}</a>
            <div className="enum-he">{e.he}</div>
            <div className="enum-tail">{e.tail}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* ═══════════════════════ SHELL ═══════════════════════ */
const VIEWS = [
  ["cards", "הַנְּסִיוֹנוֹת"],
  ["timeline", "צִיר הַזְּמַן"],
  ["table", "טַבְלָה"],
  ["ten", "עֲשָׂרָה נִסְיוֹנוֹת"],
];
function App() {
  const [view, setView] = useState("cards");
  return (
    <div className="app" dir="rtl">
      <header className="hd">
        <div className="hd-eyebrow">לִמּוּד · TORAH INTERACTIVE</div>
        <h1 className="hd-title">נִסְיוֹנוֹת הַמִּדְבָּר</h1>
        <p className="hd-sub">
          תְּלוּנוֹת וּמְרִיבוֹת בְּנֵי יִשְׂרָאֵל בַּמִּדְבָּר — תְּגוּבַת הַקָּדוֹשׁ בָּרוּךְ הוּא וּתְגוּבַת מֹשֶׁה,
          תְּפִלּוֹתָיו, הָעֹנֶשׁ וּמִנְיַן הַמֵּתִים; וְהַשְׁוָאַת הַדֵּעוֹת בְּ“עֲשָׂרָה נִסְיוֹנוֹת” שֶׁבְּאָבוֹת.
        </p>
        <nav className="tabs">
          {VIEWS.map(([id, label]) => (
            <button key={id} className={"tab" + (view === id ? " active" : "")} onClick={() => setView(id)}>{label}</button>
          ))}
        </nav>
      </header>
      <main className="bd">
        {view === "cards" && <CardView />}
        {view === "timeline" && <TimelineView />}
        {view === "table" && <TableView />}
        {view === "ten" && <TenView />}
      </main>
      <footer className="ft">
        כָּל הַמְּקוֹרוֹת מְצֻטָּטִים כִּלְשׁוֹנָם וּמְקֻשָּׁרִים לִסְפַרְיָא · אֵין צִיטוּט מֻמְצָא
      </footer>
    </div>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
