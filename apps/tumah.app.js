const { useState, useMemo, createContext, useContext } = React;
const { Search, ChevronDown, Scroll, Globe, X } = window.__lucide;

// ═══════════════════════════════════════════════
// LANGUAGE SYSTEM
// ═══════════════════════════════════════════════

const LangContext = createContext({ lang: 'he', setLang: () => {} });
const useLang = () => useContext(LangContext).lang;
const useLangCtx = () => useContext(LangContext);
const t = (lang, he, en) => (lang === 'he' ? he : en);

// ═══════════════════════════════════════════════
// LOOKUP TABLES
// ═══════════════════════════════════════════════

const LEVEL_META = {
  av_avos: { he: 'אֲבִי אֲבוֹת הַטֻּמְאָה', en: 'Av Avos HaTumah (אֲבִי אֲבוֹת הַטֻּמְאָה)', bar: 'bg-red-900', dot: 'bg-red-800', ring: 'ring-red-900/40', text: 'text-red-900' },
  av: { he: 'אַב הַטֻּמְאָה', en: 'Av HaTumah (אַב הַטֻּמְאָה)', bar: 'bg-amber-800', dot: 'bg-amber-700', ring: 'ring-amber-800/40', text: 'text-amber-900' },
  drabbanan: { he: 'דְּרַבָּנַן', en: "D'rabbanan (דְּרַבָּנַן)", bar: 'bg-stone-400', dot: 'bg-stone-500', ring: 'ring-stone-400/40', text: 'text-stone-600' },
  paradox: { he: 'מְטַמֵּא וּמְטַהֵר', en: 'Metamei u\'Metaher', bar: 'bg-indigo-800', dot: 'bg-indigo-700', ring: 'ring-indigo-800/40', text: 'text-indigo-900' },
  modality: { he: 'דֶּרֶךְ טֻמְאָה', en: 'Propagation Modality', bar: 'bg-teal-800', dot: 'bg-teal-700', ring: 'ring-teal-800/40', text: 'text-teal-900' },
  tahor: { he: 'טָהוֹר', en: 'Tahor (טָהוֹר)', bar: 'bg-emerald-700', dot: 'bg-emerald-600', ring: 'ring-emerald-700/40', text: 'text-emerald-800' },
  special: { he: 'דִּין מְיֻחָד', en: 'Special (דִּין מְיֻחָד)', bar: 'bg-violet-800', dot: 'bg-violet-700', ring: 'ring-violet-800/40', text: 'text-violet-900' },
};

const MODALITIES = {
  maga: { he: 'מַגָּע', en: 'Maga (מַגָּע)', desc: { he: 'נגיעה', en: 'Direct touch' } },
  masa: { he: 'מַשָּׂא', en: 'Masa (מַשָּׂא)', desc: { he: 'נשיאה', en: 'Carrying' } },
  ohel: { he: 'אֹהֶל', en: 'Ohel (אֹהֶל)', desc: { he: 'תחת גג אחד', en: 'Shared roof' } },
  heset: { he: 'הֶסֵּט', en: 'Heset (הֶסֵּט)', desc: { he: 'הסטה בלא נגיעה', en: 'Moving without touching' } },
  midras: { he: 'מִדְרָס', en: 'Midras (מִדְרָס)', desc: { he: 'משכב ומושב ומרכב', en: 'Mishkav, moshav, merkav' } },
  biah: { he: 'בִּיאָה', en: "Bi'ah (בִּיאָה)", desc: { he: 'כניסה למקום', en: 'Entering enclosure' } },
  bliah: { he: 'בְּלִיעָה', en: "Bli'ah (בְּלִיעָה)", desc: { he: 'בבית הבליעה', en: 'Via throat/swallowing' } },
  rechifa: { he: 'רְחִיפָה', en: 'Rechifa (רְחִיפָה)', desc: { he: 'מדרבנן', en: "D'rabbanan" } },
  structural: { he: 'מִצַּד הָאֹהֶל', en: 'Ohel Structure', desc: { he: '', en: '' } },
  process: { he: 'סֵדֶר עֲשִׂיַּת פָּרָה', en: 'Parah Process', desc: { he: '', en: '' } },
};

const CATEGORIES = [
  { id: 'all', he: 'הַכֹּל', en: 'All' },
  { id: 'A', he: 'אָדָם', en: 'Adam (אָדָם)' },
  { id: 'B', he: 'בְּהֵמָה', en: 'Behema (בְּהֵמָה)' },
  { id: 'C', he: 'שֶׁרֶץ', en: 'Sheretz (שֶׁרֶץ)' },
  { id: 'D', he: 'מַשְׁקִין', en: 'Mashkin (מַשְׁקִין)' },
  { id: 'E', he: 'אֹהֶל הַמֵּת', en: 'Ohel HaMeis' },
  { id: 'F', he: 'פָּרָה אֲדֻמָּה', en: 'Parah Adumah' },
  { id: 'G', he: 'עֲבוֹדָה זָרָה', en: 'Avodah Zara (עֲבוֹדָה זָרָה)' },
  { id: 'H', he: 'כְּלָלֵי טֻמְאָה', en: 'Framework Rules' },
];

// ═══════════════════════════════════════════════
// REACH FORMULATIONS (mitamei/poseil)
// ═══════════════════════════════════════════════

const REACH = {
  av_full: {
    he: 'אוֹכֶל וּמַשְׁקִין — רִאשׁוֹן. מְטַמֵּא שְׁנַיִם וּפוֹסֵל אֶחָד (רִאשׁוֹן → שֵׁנִי → פּוֹסֵל שְׁלִישִׁי בִּתְרוּמָה → פּוֹסֵל רְבִיעִי בְּקֹדֶשׁ)',
    en: 'Ochel/mashkin → rishon (רִאשׁוֹן). Mitamei shnayim u\'poseil echad: rishon → sheni → poseil shlishi for terumah → poseil revi\'i for kodesh'
  },
  mashkin_upgrade: {
    he: 'מַשְׁקִין שֶׁנִּטְמְאוּ עוֹלִין לְאַב לְעִנְיַן תְּרוּמָה (גְּזֵרַת חֲנַנְיָה בֶּן גַּמְלִיאֵל)',
    en: 'Mashkin upgraded to av-level for terumah (gezeiras Chananya ben Gamliel — גְּזֵרַת חֲנַנְיָה בֶּן גַּמְלִיאֵל)'
  },
  avos: {
    he: 'מוֹלִיד אַב הַטֻּמְאָה בָּאָדָם לְשִׁבְעָה יָמִים, וְאוֹתוֹ אָדָם מְטַמֵּא שְׁנַיִם וּפוֹסֵל אֶחָד',
    en: 'Creates Av HaTumah on adam for 7 days; that adam then mitamei shnayim u\'poseil echad'
  },
};

// ═══════════════════════════════════════════════
// NODE DATA
// ═══════════════════════════════════════════════

const DATA = [
  // ━━━━━━━━━━━━━ A. ADAM ━━━━━━━━━━━━━
  {
    id: 'A1', cat: 'A', level: 'av_avos',
    he: 'מֵת', en: 'Meis (מֵת)',
    desc: { he: 'הַמֵּת בִּלְבָד הוּא אֲבִי אֲבוֹת הַטֻּמְאָה', en: 'Only meis is Av Avos HaTumah' },
    sources: [
      { kind: 'pasuk', ref: 'במדבר יט, יא', text: 'הַנֹּגֵעַ בְּמֵת לְכָל נֶפֶשׁ אָדָם וְטָמֵא שִׁבְעַת יָמִים' },
      { kind: 'pasuk', ref: 'במדבר יט, יד', text: 'זֹאת הַתּוֹרָה אָדָם כִּי יָמוּת בְּאֹהֶל, כָּל הַבָּא אֶל הָאֹהֶל וְכָל אֲשֶׁר בָּאֹהֶל יִטְמָא שִׁבְעַת יָמִים' },
      { kind: 'pasuk', ref: 'במדבר יט, טז', text: 'וְכֹל אֲשֶׁר יִגַּע עַל פְּנֵי הַשָּׂדֶה בַּחֲלַל חֶרֶב אוֹ בְמֵת אוֹ בְעֶצֶם אָדָם אוֹ בְקָבֶר יִטְמָא שִׁבְעַת יָמִים' },
      { kind: 'mishnah', ref: 'אהלות א, א', text: 'שְׁנַיִם טְמֵאִין בְּמֵת — אֶחָד טָמֵא טֻמְאַת שִׁבְעָה וְאֶחָד טָמֵא טֻמְאַת עֶרֶב' },
      { kind: 'mishnah', ref: 'אהלות ב, א', text: 'אֵלּוּ מְטַמְּאִין בְּאֹהֶל: הַמֵּת, וּכְזַיִת מִן הַמֵּת, וּכְזַיִת נֶצֶל, וּמְלֹא תַּרְוָד רָקָב, וְהַשִּׁדְרָה, וְהַגֻּלְגֹּלֶת' },
      { kind: 'gemara', ref: 'נזיר נג ע"ב', text: 'חֶרֶב הֲרֵי הוּא כְּחָלָל — מְלַמֵּד שֶׁהַכְּלִי מְטַמֵּא אָדָם טֻמְאַת שִׁבְעָה' },
      { kind: 'rambam', ref: 'טומאת מת א, א', text: 'הַמֵּת מְטַמֵּא בְּמַגָּע וּבְמַשָּׂא וּבְאֹהֶל טֻמְאַת שִׁבְעָה' },
      { kind: 'sifrei', ref: 'ספרי זוטא, חוקת', text: 'אָדָם — לְהָבִיא אֶת הַגֵּר וְאֶת הָעֶבֶד הַמְשֻׁחְרָר' },
    ],
    mod: ['maga', 'masa', 'ohel'],
    modRab: ['rechifa', 'heset'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam (אָדָם)' }, res: { he: 'אַב הַטֻּמְאָה שִׁבְעַת יָמִים', en: 'Av HaTumah — 7 days' } },
      { on: { he: 'כְּלִי מַתֶּכֶת', en: 'Metal kli' }, res: { he: 'חֶרֶב כַּחֲלָל — אֲבִי אֲבוֹת', en: 'Chereiv k\'chalal (חֶרֶב כַּחֲלָל) — itself av avos' } },
      { on: { he: 'שְׁאָר כֵּלִים', en: 'Other keilim' }, res: { he: 'טְמֵאִים שִׁבְעַת יָמִים', en: 'Tamei 7 days' } },
      { on: { he: 'אוֹכֶל וּמַשְׁקִין', en: 'Ochel / mashkin' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.avos,
    shiur: { he: 'כְּזַיִת בָּשָׂר · עֶצֶם כַּשְּׂעוֹרָה · רְבִיעִית דָּם · רֹב בִּנְיָן וְרֹב מִנְיָן · שִׁדְרָה וְגֻלְגֹּלֶת', en: 'Kezayis basar · etzem kasora · revi\'is dam · rov binyan u\'minyan · shedra u\'gulgoles' },
    rules: [
      { he: 'חֶרֶב הֲרֵי הוּא כַחֲלָל — כְּלִי מַתֶּכֶת שֶׁנָּגַע בַּמֵּת נַעֲשָׂה אֲבִי אֲבוֹת כַּמֵּת עַצְמוֹ (נזיר נג ע"ב)', en: 'Chereiv harei hu k\'chalal — metal kli touching meis itself becomes av avos (Nazir 53b)' },
      { he: 'טֻמְאַת אֹהֶל דּוֹרֶשֶׁת טֶפַח עַל טֶפַח בְּרוּם טֶפַח', en: 'Ohel requires tefach by tefach with height of tefach (טֶפַח עַל טֶפַח בְּרוּם טֶפַח)' },
      { he: 'צָמִיד פָּתִיל עַל כְּלִי חֶרֶס חוֹצֵץ בִּפְנֵי טֻמְאַת אֹהֶל', en: 'Tzamid pasil (צָמִיד פָּתִיל) on kli cheres blocks ohel penetration' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא. וְעוֹד הוֹסִיפוּ חֲכָמִים בֵּית הַפְּרָס וְאֶרֶץ הָעַמִּים וְכַיּוֹצֵא לְעִנְיַן כֹּהֵן', en: 'D\'oraisa. Rabbanan added bais hapras, eretz ha\'amim, etc. for kohen' },
    purif: { he: 'הַזָּאַת אֵפֶר פָּרָה בַּיּוֹם הַשְּׁלִישִׁי וּבַיּוֹם הַשְּׁבִיעִי, וּטְבִילָה, וְהַעֲרֵב שֶׁמֶשׁ', en: 'Parah adumah (פָּרָה אֲדֻמָּה) hazaa on day 3 and day 7, mikveh, haarev shemesh' },
  },
  {
    id: 'A2', cat: 'A', level: 'av',
    he: 'זָב', en: 'Zav (זָב)',
    desc: { he: 'רְאִיָּה אַחַת — כְּבַעַל קֶרִי. שְׁתַּיִם — זָב גָּמוּר. שָׁלֹשׁ — חַיָּב קָרְבָּן', en: '1 re\'iyah (רְאִיָּה) → like baal keri. 2 → full zav. 3 → chayav korban' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, ב-טו', text: 'אִישׁ אִישׁ כִּי יִהְיֶה זָב מִבְּשָׂרוֹ זוֹבוֹ טָמֵא הוּא' },
      { kind: 'pasuk', ref: 'ויקרא טו, יג', text: 'וְכִי יִטְהַר הַזָּב מִזּוֹבוֹ וְסָפַר לוֹ שִׁבְעַת יָמִים לְטָהֳרָתוֹ... וְרָחַץ בְּשָׂרוֹ בְּמַיִם חַיִּים וְטָהֵר' },
      { kind: 'mishnah', ref: 'זבים א, א', text: 'הָרוֹאֶה רְאִיָּה אַחַת שֶׁל זוֹב — בֵּית הִלֵּל אוֹמְרִים כְּבַעַל קֶרִי. רָאָה שְׁתַּיִם — מְטַמֵּא מִשְׁכָּב וּמוֹשָׁב וְטָעוּן בִּיאַת מַיִם חַיִּים' },
      { kind: 'mishnah', ref: 'זבים ב, ב', text: 'בְּשִׁבְעָה דְרָכִים בּוֹדְקִין אֶת הַזָּב עַד שֶׁלֹּא נִזְקַק לְזִיבָה: בְּמַאֲכָל, בְּמִשְׁתֶּה, בְּמַשָּׂא, בִּקְפִיצָה, בְּחֹלִי, בְּמַרְאֶה וּבְהִרְהוּר' },
      { kind: 'gemara', ref: 'נדה לה ע"א', text: 'זוֹבוֹ טָמֵא — לְרַבּוֹת מֵימֵי רַגְלָיו' },
      { kind: 'rambam', ref: 'מטמאי משכב ומושב א, א', text: 'הַזָּב מְטַמֵּא אָדָם וּכְלִי שֶׁטֶף בְּמַגָּע וּבְמַשָּׂא, וּמְטַמֵּא מִשְׁכָּב וּמוֹשָׁב' },
      { kind: 'sifra', ref: 'תורת כהנים, מצורע, פרשת זבים', text: 'אִישׁ אִישׁ — לְרַבּוֹת קָטָן שֶׁיִּהְיֶה בְּדִין זִיבָה; מִבְּשָׂרוֹ — לְהָבִיא אֶת הַחַיִץ' },
    ],
    mod: ['maga', 'masa', 'heset', 'midras'],
    creates: [
      { on: { he: 'אָדָם בְּמַגָּע, מַשָּׂא אוֹ הֶסֵּט', en: 'Adam via maga, masa, heset' }, res: { he: 'רִאשׁוֹן', en: 'Rishon (רִאשׁוֹן)' } },
      { on: { he: 'אָדָם יוֹשֵׁב אוֹ שׁוֹכֵב עַל מִדְרָסוֹ', en: 'Adam sitting or lying on his midras' }, res: { he: 'אַב הַטֻּמְאָה', en: 'Av HaTumah' } },
      { on: { he: 'כְּלִי הָרָאוּי לְמִשְׁכָּב וּמוֹשָׁב', en: 'Kli ra\'uy l\'mishkav u\'moshav' }, res: { he: 'אַב הַמִּדְרָס', en: 'Av Midras (אַב הַמִּדְרָס)' } },
      { on: { he: 'כְּלִי שֶׁאֵינוֹ רָאוּי', en: 'Kli not ra\'uy' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'אוֹכֶל וּמַשְׁקִין', en: 'Ochel / mashkin' }, res: { he: 'רִאשׁוֹן (וּמַשְׁקִין עוֹלִין לְאַב לִתְרוּמָה)', en: 'Rishon (mashkin upgrade to av for terumah)' } },
    ],
    reach: REACH.av_full,
    rules: [
      { he: 'טָעוּן מַיִם חַיִּים — מַעְיָן, לֹא מִקְוֶה (ויקרא טו, יג)', en: 'Requires mayim chayim (מַיִם חַיִּים) — spring water, not standard mikveh' },
      { he: 'כְּלִי חֶרֶס אֵינוֹ מְקַבֵּל טֻמְאַת מִדְרָס, אֶלָּא שְׁאָר טֻמְאוֹת', en: 'Kli cheres not susceptible to midras tumah' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'שִׁבְעָה יָמִים נְקִיִּים וּבְדִיקוֹת, וּטְבִילָה בְּמַיִם חַיִּים, וְקָרְבָּן — שְׁתֵּי תוֹרִים אוֹ בְנֵי יוֹנָה', en: '7 clean days + bedikos, mayim chayim mikveh, korban (2 torim or bnei yonah)' },
  },
  {
    id: 'A3', cat: 'A', level: 'av',
    he: 'זָבָה', en: 'Zava (זָבָה)',
    desc: { he: 'רָאֲתָה דָּם בְּי"א יְמֵי הַזִּיבָה. קְטַנָּה — יוֹם אוֹ יוֹמַיִם, גְּדוֹלָה — שְׁלֹשָׁה יָמִים רְצוּפִין', en: 'Saw dam during 11 days of zivah. Ketana (קְטַנָּה) — 1 or 2 days; Gedola (גְּדוֹלָה) — 3 consecutive' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, כה', text: 'וְאִשָּׁה כִּי יָזוּב זוֹב דָּמָהּ יָמִים רַבִּים בְּלֹא עֶת נִדָּתָהּ, אוֹ כִי תָזוּב עַל נִדָּתָהּ, כָּל יְמֵי זוֹב טֻמְאָתָהּ כִּימֵי נִדָּתָהּ תִּהְיֶה טְמֵאָה הִוא' },
      { kind: 'pasuk', ref: 'ויקרא טו, כח-כט', text: 'וְאִם טָהֲרָה מִזּוֹבָהּ וְסָפְרָה לָּהּ שִׁבְעַת יָמִים, וְאַחַר תִּטְהָר. וּבַיּוֹם הַשְּׁמִינִי תִּקַּח לָהּ שְׁתֵּי תֹרִים' },
      { kind: 'mishnah', ref: 'נדה ד, ז', text: 'כָּל אַחַד עָשָׂר יוֹם בְּחֶזְקַת טָהֳרָה; יָשְׁבָה לָהּ וְלֹא בָדְקָה — הֲרֵי זוֹ בְּחֶזְקַת טְהוֹרָה' },
      { kind: 'mishnah', ref: 'זבים א, א', text: 'זָבָה גְּדוֹלָה — שְׁלֹשָׁה יָמִים רְצוּפִין בְּתוֹךְ אַחַד עָשָׂר יוֹם שֶׁבֵּין נִדָּה לְנִדָּה' },
      { kind: 'gemara', ref: 'נדה עב ע"ב', text: 'אֲפִלּוּ רָאֲתָה שְׁלֹשָׁה יָמִים בְּלֹא הֶפְסֵק — זָבָה גְּדוֹלָה, וּטְעוּנָה שִׁבְעָה נְקִיִּים וְקָרְבָּן' },
      { kind: 'rambam', ref: 'איסורי ביאה ו, ז', text: 'זָבָה הַגְּדוֹלָה שֶׁרָאֲתָה שְׁלֹשָׁה יָמִים רְצוּפִים — צְרִיכָה שֶׁתִּסְפֹּר שִׁבְעַת יָמִים נְקִיִּים וְתָבִיא קָרְבָּן' },
      { kind: 'sifra', ref: 'תורת כהנים, מצורע, זבים פרק ח', text: 'יָמִים רַבִּים — שְׁנַיִם; בְּלֹא עֵת נִדָּתָהּ — בִּימֵי זִיבָה; אוֹ כִי תָזוּב — לְרַבּוֹת הָרוֹאָה שְׁלֹשָׁה' },
    ],
    mod: ['maga', 'masa', 'heset', 'midras'],
    creates: [
      { on: { he: 'אָדָם בְּמַגָּע, מַשָּׂא אוֹ הֶסֵּט', en: 'Adam via maga, masa, heset' }, res: { he: 'רִאשׁוֹן', en: 'Rishon (רִאשׁוֹן)' } },
      { on: { he: 'אָדָם הַיּוֹשֵׁב עַל מִדְרָסָהּ', en: 'Adam sitting or lying on her midras' }, res: { he: 'אַב הַטֻּמְאָה', en: 'Av HaTumah' } },
      { on: { he: 'כְּלִי הָרָאוּי לְמִשְׁכָּב וּמוֹשָׁב', en: 'Kli ra\'uy l\'mishkav u\'moshav' }, res: { he: 'אַב הַמִּדְרָס', en: 'Av Midras (אַב הַמִּדְרָס)' } },
      { on: { he: 'שְׁאָר כֵּלִים', en: 'Other keilim' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'אוֹכֶל וּמַשְׁקִין', en: 'Ochel / mashkin' }, res: { he: 'רִאשׁוֹן (וּמַשְׁקִין עוֹלִין לְאַב לִתְרוּמָה)', en: 'Rishon (mashkin upgrade to av for terumah)' } },
    ],
    reach: REACH.av_full,
    rules: [
      { he: 'זָבָה קְטַנָּה: שׁוֹמֶרֶת יוֹם כְּנֶגֶד יוֹם — יוֹם נָקִי אֶחָד וּטְבִילָה, בְּלֹא קָרְבָּן', en: 'Zava Ketana: shomeres yom k\'neged yom — 1 clean day + mikveh, no korban' },
      { he: 'זָבָה גְּדוֹלָה: שִׁבְעָה נְקִיִּים, טְבִילָה, וְקָרְבָּן (שְׁתֵּי תוֹרִים אוֹ בְנֵי יוֹנָה)', en: 'Zava Gedola: 7 clean days + mikveh + korban (2 torim or bnei yonah)' },
      { he: 'חוּמְרָא דְּרַבִּי זֵירָא מְבַטֶּלֶת הַחִלּוּק בֵּין נִדָּה לְזָבָה', en: 'Chumra d\'Rabbi Zeira (חוּמְרָא דְּרַבִּי זֵירָא) collapses niddah / zava distinction' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'עיין בְּהַגְדָּרָה; קָרְבָּן רַק בִּגְדוֹלָה', en: 'See definition; korban only for gedola' },
  },
  {
    id: 'A4', cat: 'A', level: 'av',
    he: 'נִדָּה', en: 'Niddah (נִדָּה)',
    desc: { he: 'רָאֲתָה דָּם בְּהַרְגָּשָׁה. מִדְּאוֹרַיְתָא — שִׁבְעָה יָמִים מִתְּחִלַּת רְאִיָּתָהּ', en: 'Saw dam with hargasha (הַרְגָּשָׁה). Torah: 7 days from onset' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, יט', text: 'וְאִשָּׁה כִּי תִהְיֶה זָבָה דָּם יִהְיֶה זֹבָהּ בִּבְשָׂרָהּ, שִׁבְעַת יָמִים תִּהְיֶה בְנִדָּתָהּ, וְכָל הַנֹּגֵעַ בָּהּ יִטְמָא עַד הָעָרֶב' },
      { kind: 'pasuk', ref: 'ויקרא טו, כ', text: 'וְכֹל אֲשֶׁר תִּשְׁכַּב עָלָיו בְּנִדָּתָהּ יִטְמָא, וְכֹל אֲשֶׁר תֵּשֵׁב עָלָיו יִטְמָא' },
      { kind: 'mishnah', ref: 'נדה א, א', text: 'שַׁמַּאי אוֹמֵר: כָּל הַנָּשִׁים דַּיָּן שְׁעָתָן. הִלֵּל אוֹמֵר: מִפְּקִידָה לִפְקִידָה' },
      { kind: 'mishnah', ref: 'נדה ד, ג', text: 'דַּם נִדָּתָהּ וְדַם לֵדָתָהּ — מְטַמְּאִים לַחִים וִיבֵשִׁים' },
      { kind: 'gemara', ref: 'נדה נז ע"ב', text: 'אֵין הָאִשָּׁה מִטַּמֵּאת מִדְּאוֹרַיְתָא אֶלָּא בְּהַרְגָּשָׁה' },
      { kind: 'rambam', ref: 'איסורי ביאה ד, א', text: 'כָּל אִשָּׁה שֶׁתִּרְאֶה דָּם בִּזְמַן הַזֶּה — הֲרֵי הִיא טְמֵאָה שִׁבְעַת יָמִים, אַף עַל פִּי שֶׁלֹּא רָאֲתָה אֶלָּא טִפָּה כַחַרְדָּל' },
      { kind: 'sifra', ref: 'תורת כהנים, מצורע, זבים פרק ד', text: 'בִּבְשָׂרָהּ — מְלַמֵּד שֶׁמִּטַּמֵּאת בִּפְנִים כְּבַחוּץ' },
    ],
    mod: ['maga', 'masa', 'heset', 'midras'],
    creates: [
      { on: { he: 'אָדָם בְּמַגָּע, מַשָּׂא אוֹ הֶסֵּט', en: 'Adam via maga, masa, heset' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'אָדָם הַיּוֹשֵׁב אוֹ שׁוֹכֵב עַל מִדְרָסָהּ', en: 'Adam sitting or lying on her midras' }, res: { he: 'אַב הַטֻּמְאָה', en: 'Av HaTumah' } },
      { on: { he: 'הַבּוֹעֵל אוֹתָהּ', en: 'He who has relations with her' }, res: { he: 'אַב הַטֻּמְאָה לְשִׁבְעַת יָמִים (עיין A7)', en: 'Av HaTumah for 7 days (see A7)' } },
      { on: { he: 'כְּלִי הָרָאוּי לְמִשְׁכָּב וּמוֹשָׁב', en: 'Kli ra\'uy l\'mishkav u\'moshav' }, res: { he: 'אַב הַמִּדְרָס', en: 'Av Midras' } },
      { on: { he: 'שְׁאָר כֵּלִים', en: 'Other keilim' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'אוֹכֶל וּמַשְׁקִין', en: 'Ochel / mashkin' }, res: { he: 'רִאשׁוֹן (וּמַשְׁקִין עוֹלִין לְאַב לִתְרוּמָה)', en: 'Rishon (mashkin upgrade to av for terumah)' } },
    ],
    reach: REACH.av_full,
    rules: [
      { he: 'הֶסֵּט — דַּעַת הָרַמְבַּ"ם, וְהָרָאבַ"ד חוֹלֵק', en: 'Heset: per Rambam (רַמְבַּ"ם); Raavad (רָאבַ"ד) disagrees' },
      { he: 'בּוֹעֵל נִדָּה נַעֲשֶׂה אַב לְשִׁבְעָה יָמִים (ויקרא טו, כד; עיין A7)', en: 'Bo\'el niddah becomes av for 7 days (Vayikra 15:24; see A7)' },
      { he: 'אֵין קָרְבָּן מִדְּאוֹרַיְתָא, שֶׁלֹּא כְּזָבָה', en: 'No korban d\'oraisa (unlike zava)' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'שִׁבְעָה יָמִים מִן הַתְּחִלָּה (מִדְּאוֹרַיְתָא) אוֹ שִׁבְעָה נְקִיִּים (בְּחוּמְרָא דְּר\' זֵירָא), בְּדִיקוֹת, וּטְבִילָה', en: '7 days from onset (Torah) or 7 clean days (chumra) + bedikos + mikveh' },
  },
  {
    id: 'A5', cat: 'A', level: 'av',
    he: 'יוֹלֶדֶת', en: 'Yoledes (יוֹלֶדֶת)',
    desc: { he: 'זָכָר — ז׳ וְל״ג. נְקֵבָה — י״ד וְס״ו. טֻמְאַת לֵידָה אַף בְּלֹא רְאִיַּת דָּם', en: 'Zachar — 7+33. Nekeivah — 14+66. Tumas leida (טֻמְאַת לֵידָה) even without bleeding' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא יב, ב-ג', text: 'אִשָּׁה כִּי תַזְרִיעַ וְיָלְדָה זָכָר, וְטָמְאָה שִׁבְעַת יָמִים, כִּימֵי נִדַּת דְּוֹתָהּ תִּטְמָא' },
      { kind: 'pasuk', ref: 'ויקרא יב, ד-ה', text: 'וּשְׁלֹשִׁים יוֹם וּשְׁלֹשֶׁת יָמִים תֵּשֵׁב בִּדְמֵי טָהֳרָה... וְאִם נְקֵבָה תֵלֵד, וְטָמְאָה שְׁבֻעַיִם כְּנִדָּתָהּ, וְשִׁשִּׁים יוֹם וְשֵׁשֶׁת יָמִים תֵּשֵׁב עַל דְּמֵי טָהֳרָה' },
      { kind: 'mishnah', ref: 'נדה ג, א', text: 'הַמַּפֶּלֶת חֲתִיכָה — אִם יֵשׁ עִמָּהּ דָּם, טְמֵאָה; וְאִם לָאו, טְהוֹרָה. רַבִּי יְהוּדָה אוֹמֵר: בֵּין כָּךְ וּבֵין כָּךְ טְמֵאָה' },
      { kind: 'mishnah', ref: 'כריתות א, ג', text: 'חָמֵשׁ חַטָּאוֹת וַדָּאוֹת — אֵלּוּ הֵן: הַבָּא עַל הַשִּׁפְחָה, וְנָזִיר שֶׁנִּטְמָא, וְעַל שְׁמִיעַת הַקּוֹל, וְעַל בִּטּוּי שְׂפָתַיִם, וְטֻמְאַת מִקְדָּשׁ וְקָדָשָׁיו' },
      { kind: 'gemara', ref: 'נדה כד ע"א — כח ע"א', text: 'נֵפֶל שֶׁנִּתְפַּתְּחוּ אֵבָרָיו — אִמּוֹ טְמֵאָה לֵדָה' },
      { kind: 'rambam', ref: 'איסורי ביאה י, א', text: 'הַיּוֹלֶדֶת, בֵּין חַי בֵּין מֵת, וַאֲפִלּוּ נֵפֶל — הֲרֵי הִיא טְמֵאָה כַּנִּדָּה' },
      { kind: 'sifra', ref: 'תורת כהנים, תזריע, פרקים א-ג', text: 'תַּזְרִיעַ — לְרַבּוֹת שֶׁאֲפִלּוּ יְלָדַתּוּ מָחוּי, אִמּוֹ טְמֵאָה לֵדָה' },
    ],
    mod: ['maga', 'masa', 'heset', 'midras'],
    creates: [
      { on: { he: 'בִּימֵי הַטֻּמְאָה', en: 'During tumah period' }, res: { he: 'כְּנִדָּה', en: 'Same as niddah' } },
      { on: { he: 'בִּימֵי דַּם טֹהַר', en: 'Dam tohar (דַּם טֹהַר) period' }, res: { he: 'הַדָּם טָהוֹר, וַאֲסוּרָה בְמִקְדָּשׁ וּבַקֳדָשִׁים בִּלְבָד', en: 'Blood is tahor; blocked only from mikdash and kodshim' } },
    ],
    reach: REACH.av_full,
    rules: [
      { he: 'סְפֵק וָלָד — מִתְחַלֵּק לְפִי שָׁבוּעַ הַהֵרָיוֹן (נדה פרק ג)', en: 'Safek velad — divisions per gestational week (Niddah perek 3)' },
      { he: 'קָרְבְּנָהּ לִגְמַר: כִּבְשָׂה לְעוֹלָה וְתוֹר אוֹ בֶן יוֹנָה לְחַטָּאת; דַּלָּה — שְׁתֵּי תוֹרִים', en: 'Final korban: kivsa olah + tor/ben yona chatas; poor: 2 birds' },
      { he: 'טֻמְאַת לֵידָה חָלָה גַּם בְּלֹא רְאִיַּת דָּם', en: 'Tumas leida applies even without bleeding' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'טְבִילָה בְּסִיּוּם יְמֵי הַטֻּמְאָה, וְלְאַחַר מ׳ אוֹ פ׳ יוֹם קָרְבָּן — הַמַּתִּיר בַּקֳדָשִׁים', en: 'Mikveh at end of tumah period; after 40/80 days korban → permits kodshim' },
  },
  {
    id: 'A6', cat: 'A', level: 'av',
    he: 'מְצֹרָע מֻחְלָט', en: 'Metzora Muchlat (מְצֹרָע מֻחְלָט)',
    desc: { he: 'שֶׁהֶחְלִיטוֹ הַכֹּהֵן לְטֻמְאָה. מְטַמֵּא בְּאֹהֶל כַּמֵּת', en: 'Declared muchlat by kohen. Metamei b\'ohel like meis' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא יג, מה-מו', text: 'וְהַצָּרוּעַ אֲשֶׁר בּוֹ הַנֶּגַע בְּגָדָיו יִהְיוּ פְרֻמִים וְרֹאשׁוֹ יִהְיֶה פָרוּעַ וְעַל שָׂפָם יַעְטֶה וְטָמֵא טָמֵא יִקְרָא. בָּדָד יֵשֵׁב מִחוּץ לַמַּחֲנֶה מוֹשָׁבוֹ' },
      { kind: 'pasuk', ref: 'ויקרא יד, א-ח', text: 'וּלְקַח לַמִּטַּהֵר שְׁתֵּי צִפֳּרִים חַיּוֹת טְהֹרוֹת וְעֵץ אֶרֶז וּשְׁנִי תוֹלַעַת וְאֵזֹב' },
      { kind: 'mishnah', ref: 'נגעים יד, א', text: 'כֵּיצַד מְטַהֲרִין אֶת הַמְּצֹרָע? הָיָה מֵבִיא פְיָלִי שֶׁל חֶרֶס חֲדָשָׁה וְנוֹתֵן לְתוֹכָהּ רְבִיעִית מַיִם חַיִּים' },
      { kind: 'mishnah', ref: 'מגילה א, ז', text: 'אֵין בֵּין מְצֹרָע מֻסְגָּר לִמְצֹרָע מֻחְלָט אֶלָּא פְּרִיעָה וּפְרִימָה' },
      { kind: 'gemara', ref: 'מועד קטן ז ע"ב', text: 'מְצֹרָע מֻחְלָט — מְטַמֵּא בְּאֹהֶל, כְּדִכְתִיב "בָּדָד יֵשֵׁב"' },
      { kind: 'rambam', ref: 'טומאת צרעת י, א', text: 'הַמְּצֹרָע הַמֻּחְלָט מְטַמֵּא בְּמַגָּע וּבְמַשָּׂא וּבְאֹהֶל כַּמֵּת' },
      { kind: 'sifra', ref: 'תורת כהנים, תזריע-מצורע', text: 'בָּדָד יֵשֵׁב — לְבַדּוֹ, שֶׁלֹּא יִהְיוּ טְמֵאִים אֲחֵרִים יוֹשְׁבִים עִמּוֹ' },
    ],
    mod: ['maga', 'masa', 'ohel', 'biah', 'midras'],
    creates: [
      { on: { he: 'אָדָם בְּמַגָּע אוֹ מַשָּׂא', en: 'Adam via maga or masa' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'כָּל הַנִּמְצָא בְּאוֹתוֹ אֹהֶל', en: 'Anyone in same ohel' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'כְּלִי בְּמִדְרָס', en: 'Kli via midras' }, res: { he: 'אַב הַמִּדְרָס', en: 'Av Midras' } },
    ],
    reach: REACH.av_full,
    rules: [
      { he: 'שִׁלּוּחַ — יוֹשֵׁב חוּץ לִשְׁלֹשׁ מַחֲנוֹת', en: 'Shiluach (שִׁלּוּחַ) — outside all 3 machanos' },
      { he: 'בְּגָדָיו פְּרוּמִים, רֹאשׁוֹ פָּרוּעַ, עוֹטֶה עַל שְׂפָמוֹ, וְקוֹרֵא "טָמֵא טָמֵא" (ויקרא יג, מה)', en: 'Garments torn (פְּרוּמִים), head uncovered (פָּרוּעַ), covers upper lip, calls "tamei tamei"' },
      { he: 'מְחֻסַּר כִּפּוּרִים עַד קָרְבְּנוֹתָיו — אָסוּר בַּקֳדָשִׁים', en: 'Mechusar kippurim (מְחֻסַּר כִּפּוּרִים) until final korbanos' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'שְׁתֵּי צִפֳּרִים, עֵץ אֶרֶז, שְׁנִי תוֹלַעַת וְאֵזוֹב; טְבִילָה; תִּגְלַחַת; שִׁבְעַת יָמִים; תִּגְלַחַת שְׁנִיָּה; טְבִילָה; קָרְבְּנוֹת אָשָׁם, חַטָּאת, עוֹלָה, וְלוֹג שֶׁמֶן; מַתַּן דָּם וְשֶׁמֶן עַל אֹזֶן וּבְהוֹנוֹת', en: '2 birds, eitz erez, shani tola\'as, eizov; mikveh; shave; 7 days; 2nd shave; 2nd mikveh; korbanos (asham, chatas, olah, log shemen); blood & oil on ear, thumb, toe' },
  },
  {
    id: 'A7', cat: 'A', level: 'av',
    he: 'בּוֹעֵל נִדָּה', en: "Bo'el Niddah (בּוֹעֵל נִדָּה)",
    desc: { he: 'אַב הַטֻּמְאָה לְשִׁבְעַת יָמִים, וּמְטַמֵּא בְּמִדְרָס', en: 'Av HaTumah for 7 days, metamei via midras' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, כד', text: 'וְאִם שָׁכֹב יִשְׁכַּב אִישׁ אֹתָהּ, וּתְהִי נִדָּתָהּ עָלָיו וְטָמֵא שִׁבְעַת יָמִים, וְכָל הַמִּשְׁכָּב אֲשֶׁר יִשְׁכַּב עָלָיו יִטְמָא' },
      { kind: 'mishnah', ref: 'נדה ד, ז', text: 'וְהַבָּא עָלֶיהָ נַעֲשֶׂה כְּמוֹתָהּ — טָמֵא שִׁבְעָה וּמְטַמֵּא מִשְׁכָּב וּמוֹשָׁב' },
      { kind: 'mishnah', ref: 'זבים ה, יא', text: 'אוֹכְלִין אֳכָלִים טְמֵאִים וּמַשְׁקִין טְמֵאִין — בּוֹעֵל נִדָּה הֲרֵי הוּא כְּנִדָּה לְכָל דְּבָרָיו' },
      { kind: 'gemara', ref: 'נדה לג ע"א', text: 'בּוֹעֵל נִדָּה מְטַמֵּא מִשְׁכָּב תַּחְתּוֹן כְּעֶלְיוֹן — שֶׁנֶּאֱמַר "וְכָל הַמִּשְׁכָּב"' },
      { kind: 'rambam', ref: 'מטמאי משכב ומושב ג, א', text: 'הַבּוֹעֵל נִדָּה הֲרֵי הוּא אַב הַטֻּמְאָה מִן הַתּוֹרָה, וּמְטַמֵּא אֶת הָאָדָם וְאֶת הַכֵּלִים כְּנִדָּה' },
      { kind: 'sifra', ref: 'תורת כהנים, מצורע, זבים פרק ה', text: 'וּתְהִי נִדָּתָהּ עָלָיו — יָכוֹל יִהְיֶה טָמֵא טֻמְאַת עֶרֶב? תַּלְמוּד לוֹמַר "וְטָמֵא שִׁבְעַת יָמִים"' },
    ],
    mod: ['maga', 'masa', 'heset', 'midras'],
    creates: [
      { on: { he: 'אָדָם אוֹ כֵּלִים', en: 'Adam or keilim' }, res: { he: 'מְטַמֵּא כְּנִדָּה — כְּמַקּוֹר טֻמְאָה שֵׁנִי בַּבַּיִת', en: 'Metamei as niddah — second source of tumah in house' } },
    ],
    reach: REACH.av_full,
    rules: [
      { he: 'שִׁבְעָה יָמִים, בְּלֹא תְלוּת בְּיָמֶיהָ שֶׁל הַנִּדָּה', en: 'Duration 7 days regardless of niddah\'s status' },
      { he: 'כָּל כְּלִי שֶׁיָּשַׁב אוֹ שָׁכַב עָלָיו — אַב הַמִּדְרָס', en: 'Every kli he sits or lies on → av midras' },
      { he: 'בּוֹעֵל זָבָה: דַּעַת הָרַמְבַּ"ם — רִאשׁוֹן בִּלְבָד, וְהָרָאבַ"ד חוֹלֵק', en: 'Bo\'el zava: Rambam rishon only; Raavad disputes' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'טְבִילָה לְאַחַר שִׁבְעָה יָמִים וְהַעֲרֵב שֶׁמֶשׁ, בְּלֹא קָרְבָּן', en: 'Mikveh after 7 days + haarev shemesh (no korban)' },
  },
  {
    id: 'A8', cat: 'A', level: 'av',
    he: 'טְמֵא מֵת', en: 'Tamei Meis (טְמֵא מֵת)',
    desc: { he: 'אָדָם שֶׁנִּטְמָא בַּמֵּת תּוֹךְ שִׁבְעַת יָמָיו קֹדֶם הַזָּאָה. הוּא עַצְמוֹ אַב, וּמְטַמֵּא אֲחֵרִים לָרִאשׁוֹן בִּלְבָד', en: 'Adam who became tamei meis during his 7 days before hazaa. Himself av; transmits to others only as rishon' },
    sources: [
      { kind: 'pasuk', ref: 'במדבר יט, כב', text: 'וְכֹל אֲשֶׁר יִגַּע בּוֹ הַטָּמֵא יִטְמָא, וְהַנֶּפֶשׁ הַנֹּגַעַת תִּטְמָא עַד הָעָרֶב' },
      { kind: 'mishnah', ref: 'אהלות א, א', text: 'שְׁנַיִם טְמֵאִין בְּמֵת — הַנּוֹגֵעַ בַּמֵּת טָמֵא טֻמְאַת שִׁבְעָה, וְהַנּוֹגֵעַ בּוֹ טָמֵא טֻמְאַת עֶרֶב' },
      { kind: 'mishnah', ref: 'אהלות א, ב', text: 'כֵּלִים הַנּוֹגְעִים בַּמֵּת וְכֵלִים בְּכֵלִים — טְמֵאִים טֻמְאַת שִׁבְעָה, וְהַשְּׁלִישִׁי בֵּין אָדָם בֵּין כֵּלִים טָמֵא טֻמְאַת עֶרֶב' },
      { kind: 'gemara', ref: 'פסחים יד ע"ב', text: 'רִאשׁוֹן הַנּוֹגֵעַ בַּמֵּת — אַב הַטֻּמְאָה, שֵׁנִי — וְלָד הַטֻּמְאָה' },
      { kind: 'rambam', ref: 'טומאת מת ה, א', text: 'אָדָם שֶׁנָּגַע בַּמֵּת — אַב הַטֻּמְאָה. אָדָם הַנּוֹגֵעַ בָּאָדָם הַזֶּה — רִאשׁוֹן לְטֻמְאָה' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'אָדָם שֶׁנָּגַע בּוֹ', en: 'Adam he touches' }, res: { he: 'רִאשׁוֹן (לֹא אַב!)', en: 'Rishon (not av!)' } },
      { on: { he: 'יוֹצֵא מִן הַכְּלָל — אוֹחֵז בִּכְלִי מַתֶּכֶת (חֶרֶב כַּחֲלָל)', en: 'Exception — holding metal kli (chereiv k\'chalal)' }, res: { he: 'מַעֲבִיר כַּאֲבִי אֲבוֹת', en: 'Transmits as av avos' } },
    ],
    reach: { he: 'הוּא עַצְמוֹ אַב, אֲבָל בְּדֶרֶךְ כְּלָל מְטַמֵּא לָרִאשׁוֹן', en: 'Himself av, but typically transmits as rishon' },
    rules: [
      { he: 'אֵינוֹ מְטַמֵּא בְּאֹהֶל, אַף עַל פִּי שֶׁהוּא אַב', en: 'Does not metamei b\'ohel despite being av' },
      { he: 'דִּינֵי טְבוּל יוֹם בְּתוֹךְ הַשִּׁבְעָה', en: 'Tevul yom rules during 7 days' },
      { he: 'הַזָּאָה בַּשְּׁלִישִׁי וּבַשְּׁבִיעִי, וְאִם חָסַר יוֹם מָנָה מִתְּחִלָּה', en: 'Hazaa day 3 and day 7; missing either restarts count' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'הַזָּאָה ג\' וְז\', טְבִילָה, וְהַעֲרֵב שֶׁמֶשׁ', en: 'Hazaa day 3+7, mikveh, haarev shemesh' },
  },
  {
    id: 'A9', cat: 'A', level: 'av_avos',
    he: 'נֵפֶל', en: 'Nefel (נֵפֶל)',
    desc: { he: 'נֵפֶל בֶּן קְיָמָא שֶׁנִּתְפַּתְּחוּ אֵבָרָיו. דִּינוֹ כַּמֵּת לְכָל דְּבָרָיו', en: 'Viable nefel with formed limbs. Full meis-level' },
    sources: [
      { kind: 'gemara', ref: 'נדה כד ע"א', text: 'נֵפֶל שֶׁנִּתְפַּתְּחוּ אֵבָרָיו — הֲרֵי הוּא כַּמֵּת לְכָל דְּבָרָיו' },
      { kind: 'mishnah', ref: 'נדה ג, ב', text: 'הַמַּפֶּלֶת וְאֵין יָדוּעַ מַה הִפִּילָה — תֵּשֵׁב לְזָכָר וְלִנְקֵבָה' },
      { kind: 'rambam', ref: 'טומאת מת א, יא', text: 'נֵפֶל שֶׁכָּלוּ לוֹ חֳדָשָׁיו אוֹ שֶׁנִּתְפַּתְּחוּ אֵבָרָיו — מְטַמֵּא בְּמַגָּע וּבְמַשָּׂא וּבְאֹהֶל' },
    ],
    mod: ['maga', 'masa', 'ohel'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'אַב הַטֻּמְאָה לְשִׁבְעַת יָמִים', en: 'Av HaTumah — 7 days' } },
      { on: { he: 'כְּלִי מַתֶּכֶת', en: 'Metal kli' }, res: { he: 'אֲבִי אֲבוֹת (חֶרֶב כַּחֲלָל)', en: 'Av avos (chereiv k\'chalal)' } },
      { on: { he: 'שְׁאָר כֵּלִים', en: 'Other keilim' }, res: { he: 'טְמֵאִים שִׁבְעַת יָמִים', en: 'Tamei 7 days' } },
      { on: { he: 'כָּל שֶׁבְּאֹהֶל אֶחָד עִמּוֹ', en: 'Anything sharing ohel with it' }, res: { he: 'טָמֵא שִׁבְעָה', en: 'Tamei 7 days' } },
      { on: { he: 'אוֹכֶל וּמַשְׁקִין', en: 'Ochel / mashkin' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.avos,
    rules: [
      { he: 'הָאֵם מְקַבֶּלֶת טֻמְאַת לֵידָה בְּלִי תְלוּת בְּטֻמְאַת הַנֵּפֶל', en: 'Mother gets tumas leida (yoledes) independently' },
      { he: 'נֵפֶל שֶׁלֹּא נִתְפַּתְּחוּ אֵבָרָיו — אֵין בּוֹ טֻמְאַת מֵת, וְרַק הָאֵם טְמֵאָה', en: 'Pre-viable nefel: no meis tumah, only maternal tumah' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'סֵדֶר אֵפֶר פָּרָה', en: 'Parah adumah sequence' },
  },
  {
    id: 'A10', cat: 'A', level: 'av_avos',
    he: 'אֵבֶר מִן הַמֵּת', en: 'Ever Min HaMeis (אֵבֶר מִן הַמֵּת)',
    desc: { he: 'אֵבֶר שֶׁנֶּחְתַּךְ מִן הַמֵּת, אוֹ מֵאָדָם חַי שֶׁמֵּת לְאַחַר מִכֵּן', en: 'Limb severed from meis, or from living adam who subsequently died' },
    sources: [
      { kind: 'mishnah', ref: 'אהלות ב, א', text: 'אֵלּוּ מְטַמְּאִין בְּאֹהֶל: אֵבֶר מִן הַמֵּת וְאֵבֶר מִן הַחַי שֶׁיֵּשׁ עֲלֵיהֶן בָּשָׂר כָּרָאוּי' },
      { kind: 'mishnah', ref: 'עדויות ו, ג', text: 'רַבִּי אֱלִיעֶזֶר אוֹמֵר: אֵבֶר מִן הַמֵּת — טֻמְאָתוֹ כְּטֻמְאַת הַמֵּת עַצְמוֹ' },
      { kind: 'gemara', ref: 'חולין קכט ע"א', text: 'אֵבֶר מִן הַמֵּת מְטַמֵּא בְּמַגָּע וּבְמַשָּׂא וּבְאֹהֶל — בְּכָל שֶׁהוּא' },
      { kind: 'rambam', ref: 'טומאת מת ב, א', text: 'אֵבֶר שֶׁנֶּחְתַּךְ מִן הַמֵּת, אַף עַל פִּי שֶׁאֵין עָלָיו בָּשָׂר כָּרָאוּי — מְטַמֵּא בְּמַגָּע וּבְמַשָּׂא וּבְאֹהֶל' },
    ],
    mod: ['maga', 'masa', 'ohel'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'אַב הַטֻּמְאָה לְשִׁבְעַת יָמִים', en: 'Av HaTumah — 7 days' } },
      { on: { he: 'כְּלִי מַתֶּכֶת', en: 'Metal kli' }, res: { he: 'אֲבִי אֲבוֹת (חֶרֶב כַּחֲלָל)', en: 'Av avos (chereiv k\'chalal)' } },
      { on: { he: 'שְׁאָר כֵּלִים', en: 'Other keilim' }, res: { he: 'טְמֵאִים שִׁבְעַת יָמִים', en: 'Tamei 7 days' } },
      { on: { he: 'כָּל שֶׁבְּאֹהֶל אֶחָד עִמּוֹ', en: 'Anything sharing ohel with it' }, res: { he: 'טָמֵא שִׁבְעָה', en: 'Tamei 7 days' } },
      { on: { he: 'אוֹכֶל וּמַשְׁקִין', en: 'Ochel / mashkin' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.avos,
    shiur: { he: 'עֶצֶם כַּשְּׂעוֹרָה · כְּזַיִת בָּשָׂר', en: 'Etzem kasora · kezayis basar' },
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'סֵדֶר אֵפֶר פָּרָה', en: 'Parah adumah sequence' },
  },
  {
    id: 'A11', cat: 'A', level: 'av',
    he: 'אֵבֶר מִן הַחַי', en: 'Ever Min HaChai (אֵבֶר מִן הַחַי)',
    desc: { he: 'אֵבֶר שֶׁנֶּחְתַּךְ מֵאָדָם חַי. דִּינוֹ כִּנְבֵלָה, לֹא כַמֵּת', en: 'Limb from living adam. Treated as neveilah (נְבֵלָה), not meis' },
    sources: [
      { kind: 'mishnah', ref: 'עדויות ו, ב', text: 'עַל אֵבֶר מִן הַחַי שֶׁהוּא כִּנְבֵלָה, רַבִּי יְהוּדָה אוֹמֵר מִשּׁוּם רַבִּי אֱלִיעֶזֶר: כְּמֵת' },
      { kind: 'gemara', ref: 'חולין קכא ע"א', text: 'אֵבֶר מִן הַחַי — טְמֵא כִּנְבֵלָה; אֵינוֹ מְטַמֵּא בְּאֹהֶל' },
      { kind: 'rambam', ref: 'טומאת מת ב, ג', text: 'אֵבֶר מִן הַחַי מְטַמֵּא בְּמַגָּע וּבְמַשָּׂא וְאֵינוֹ מְטַמֵּא בְּאֹהֶל' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.av_full,
    rules: [
      { he: 'אֵינוֹ מְטַמֵּא בְּאֹהֶל — חִלּוּק יְסוֹדִי מֵאֵבֶר מִן הַמֵּת', en: 'No ohel generation — key difference from ever min hameis' },
      { he: 'שִׁעוּרֵי עֶצֶם וּבָשָׂר כִּמְבֹאָר בְּA10', en: 'Same bone/flesh shiurim as A10' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ, וְכִבּוּס בְּגָדִים אִם בְּמַשָּׂא', en: 'Mikveh + haarev shemesh + kibbus begadim (if masa)' },
  },

  // ━━━━━━━━━━━━━ B. BEHEMA / CHAYA / OF ━━━━━━━━━━━━━
  {
    id: 'B1', cat: 'B', level: 'av',
    he: 'נְבֵלָה טְהוֹרָה', en: 'Neveilah Tehorah (נְבֵלָה טְהוֹרָה)',
    desc: { he: 'בְּהֵמָה אוֹ חַיָּה אוֹ עוֹף מִמִּינֵי הַטְּהוֹרִים שֶׁמֵּתוּ שֶׁלֹּא בִּשְׁחִיטָה אוֹ נִטְרְפוּ', en: 'Kosher species that died without valid shechita or became treifa' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא יא, לט', text: 'וְכִי יָמוּת מִן הַבְּהֵמָה אֲשֶׁר הִיא לָכֶם לְאָכְלָה, הַנֹּגֵעַ בְּנִבְלָתָהּ יִטְמָא עַד הָעָרֶב' },
      { kind: 'pasuk', ref: 'ויקרא יא, מ', text: 'וְהַנֹּשֵׂא אֶת נִבְלָתָהּ יְכַבֵּס בְּגָדָיו וְטָמֵא עַד הָעָרֶב' },
      { kind: 'mishnah', ref: 'חולין ט, א', text: 'הָעוֹר וְהָרֹטֶב וְהַקִּפָּה וְהָאָלָל וְהָעֲצָמוֹת וְהַגִּידִין וְהַקַּרְנַיִם וְהַטְּלָפַיִם — מִצְטָרְפִין לְטַמֵּא טֻמְאַת אֳכָלִין, אֲבָל לֹא לְטַמֵּא טֻמְאַת נְבֵלוֹת' },
      { kind: 'gemara', ref: 'חולין עג ע"ב', text: 'אֵין נְבֵלָה פָּחוֹת מִכַּזַּיִת — שִׁעוּרָהּ לְטַמֵּא בְמַגָּע וּבְמַשָּׂא' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות א, א', text: 'כָּל הַנְּבֵלוֹת וְהַטְּרֵפוֹת מִבְּהֵמָה טְהוֹרָה — מְטַמְּאוֹת בְּמַגָּע וּבְמַשָּׂא, וְהַנּוֹשֵׂא טָעוּן כִּבּוּס בְּגָדִים' },
      { kind: 'sifra', ref: 'תורת כהנים, שמיני, פרשתא י', text: 'וְכִי יָמוּת מִן הַבְּהֵמָה — אֵין לִי אֶלָּא בְּהֵמָה, מִנַּיִן לְרַבּוֹת חַיָּה וָעוֹף? תַּלְמוּד לוֹמַר "הַנֹּגֵעַ בְּנִבְלָתָהּ"' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן (וְכִבּוּס בְּגָדִים בְּמַשָּׂא)', en: 'Rishon (+ kibbus begadim if masa)' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.av_full,
    shiur: { he: 'כְּזַיִת', en: 'Kezayis' },
    rules: [
      { he: 'אֵין בָּהּ טֻמְאַת אֹהֶל וְלֹא מִדְרָס', en: 'No ohel, no midras' },
      { he: 'הַנּוֹשְׂאָהּ טָעוּן כִּבּוּס בְּגָדִים (ויקרא יא, מ)', en: 'Masa requires kibbus begadim (Vayikra 11:40)' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ, וְכִבּוּס בְּגָדִים אִם נָשָׂא', en: 'Mikveh + haarev shemesh (+ kibbus begadim if masa)' },
  },
  {
    id: 'B2', cat: 'B', level: 'av',
    he: 'נְבֵלָה טְמֵאָה', en: 'Neveilah Teme\'ah (נְבֵלָה טְמֵאָה)',
    desc: { he: 'בְּהֵמָה אוֹ חַיָּה מִמִּינֵי הַטְּמֵאִים שֶׁמֵּתוּ', en: 'Non-kosher animal carcass' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא יא, כו-כח', text: 'לְכָל הַבְּהֵמָה אֲשֶׁר הִיא מַפְרֶסֶת פַּרְסָה וְשֶׁסַע אֵינֶנָּה שֹׁסַעַת, וְגֵרָה אֵינֶנָּה מַעֲלָה — טְמֵאִים הֵם לָכֶם, כָּל הַנֹּגֵעַ בָּהֶם יִטְמָא' },
      { kind: 'mishnah', ref: 'חולין ט, א', text: 'חֵלֶב הַמֵּת וְנִבְלַת עוֹף טָהוֹר — צְרִיכִין מַחֲשָׁבָה וְאֵין צְרִיכִין הֶכְשֵׁר' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות א, ב', text: 'וְכֵן נִבְלַת בְּהֵמָה וְחַיָּה טְמֵאָה — מְטַמְּאָה בְּמַגָּע וּבְמַשָּׂא כִּנְבֵלַת טְהוֹרָה' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן (וְכִבּוּס בְּגָדִים בְּמַשָּׂא)', en: 'Rishon (+ kibbus begadim if masa)' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.av_full,
    rules: [{ he: 'פְּרָטֵי דִינִים לְפִי הַמִּינִים שֶׁבַּפָּסוּק', en: 'Species-specific rules per pasuk list' }],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ, וְכִבּוּס בְּגָדִים אִם נָשָׂא', en: 'Mikveh + haarev shemesh (+ kibbus begadim if masa)' },
  },
  {
    id: 'B3', cat: 'B', level: 'av',
    he: 'נִבְלַת עוֹף טָהוֹר', en: 'Nivlas Of Tahor (נִבְלַת עוֹף טָהוֹר)',
    desc: { he: 'אֵינָהּ מְטַמְּאָה בְּמַגָּע וּבְמַשָּׂא, אֶלָּא בִּבְלִיעָתָהּ בְּבֵית הַבְּלִיעָה', en: 'Does not metamei via maga or masa — only via bli\'ah in beis habli\'ah (בֵּית הַבְּלִיעָה)' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא יז, טו', text: 'וְכָל נֶפֶשׁ אֲשֶׁר תֹּאכַל נְבֵלָה וּטְרֵפָה בָּאֶזְרָח וּבַגֵּר, וְכִבֶּס בְּגָדָיו וְרָחַץ בַּמַּיִם וְטָמֵא עַד הָעָרֶב וְטָהֵר' },
      { kind: 'pasuk', ref: 'ויקרא כב, ח', text: 'נְבֵלָה וּטְרֵפָה לֹא יֹאכַל לְטָמְאָה בָהּ; אֲנִי ה\'' },
      { kind: 'mishnah', ref: 'טהרות א, א', text: 'שְׁלֹשָׁה עָשָׂר דְּבָרִים נֶאֶמְרוּ בְּנִבְלַת הָעוֹף הַטָּהוֹר: צְרִיכָה מַחֲשָׁבָה, וְאֵינָהּ צְרִיכָה הֶכְשֵׁר, וּמְטַמְּאָה טֻמְאַת אֳכָלִין בְּכַבֵּיצָה' },
      { kind: 'mishnah', ref: 'טהרות א, ב', text: 'כְּזַיִת מִמֶּנָּה — מְטַמֵּא טֻמְאַת בֵּית הַבְּלִיעָה; הַבּוֹלְעָהּ — מְטַמְּאָה בְגָדִים אַב הַטֻּמְאָה' },
      { kind: 'gemara', ref: 'זבחים סט ע"ב', text: 'אֵין נִבְלַת עוֹף טָהוֹר מְטַמְּאָה אֶלָּא בְּבֵית הַבְּלִיעָה' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות ג, א', text: 'נִבְלַת הָעוֹף הַטָּהוֹר אֵינָהּ מְטַמְּאָה בְּמַגָּע וְלֹא בְּמַשָּׂא, אֲבָל מְטַמֵּא הִיא בְּבֵית הַבְּלִיעָה' },
      { kind: 'sifra', ref: 'תורת כהנים, אחרי מות, פרק יג', text: 'אֲשֶׁר תֹּאכַל — פְּרָט לְשֶׁשָּׁחַט וְנִתְנַבְּלָה בְיָדוֹ' },
    ],
    mod: ['bliah'],
    creates: [
      { on: { he: 'הַבּוֹלֵעַ כְּזַיִת', en: 'One who swallows kezayis' }, res: { he: 'טָמֵא וּבְגָדָיו מִתְטַמְּאִין בִּשְׁעַת הַבְּלִיעָה', en: 'Tamei and his begadim are metamei at time of bli\'ah' } },
    ],
    reach: REACH.av_full,
    shiur: { he: 'כְּזַיִת', en: 'Kezayis' },
    rules: [
      { he: 'אֵינָהּ מְטַמְּאָה בְּמַגָּע וּבְמַשָּׂא מִבַּחוּץ', en: 'Not metamei via external maga or masa' },
      { he: 'מָקוֹר יָחִיד לְטֻמְאַת בְּגָדִים בְּבֵית הַבְּלִיעָה', en: 'Sole source of tumas begadim via bli\'ah' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'טְבִילָה, הַעֲרֵב שֶׁמֶשׁ, וְכִבּוּס בְּגָדִים', en: 'Mikveh + haarev shemesh + kibbus begadim' },
  },
  {
    id: 'B4', cat: 'B', level: 'drabbanan',
    he: 'נִבְלַת עוֹף טָמֵא', en: 'Nivlas Of Tamei (נִבְלַת עוֹף טָמֵא)',
    desc: { he: 'אֵינָהּ טְמֵאָה מִדְּאוֹרַיְתָא', en: 'Not tamei d\'oraisa' },
    sources: [
      { kind: 'mishnah', ref: 'טהרות א, ג', text: 'נִבְלַת הָעוֹף הַטָּמֵא — צְרִיכָה מַחֲשָׁבָה וְהֶכְשֵׁר, וּמְטַמְּאָה טֻמְאַת אֳכָלִין בְּכַבֵּיצָה' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות ג, ד', text: 'נִבְלַת הָעוֹף הַטָּמֵא — אֵינָהּ מְטַמְּאָה בְּבֵית הַבְּלִיעָה, וְאֵין בָּהּ דִּין נְבֵלָה כְּלָל מִן הַתּוֹרָה' },
    ],
    mod: [],
    creates: [],
    rules: [{ he: 'לֹא נֶאֱמְרָה נְבֵלָה אֶלָּא בַמִּינִים הַמְפֹרָשִׁים; עוֹפוֹת טְמֵאִים אֵינָם בִּכְלָל זֶה', en: 'Neveilah applies only to enumerated minim — non-kosher birds excluded' }],
    oraisa: { he: 'דְּרַבָּנַן בִּלְבָד', en: 'D\'rabbanan only' },
    purif: { he: 'אֵין בָּהּ טֻמְאָה דְּאוֹרַיְתָא', en: 'N/A d\'oraisa' },
  },
  {
    id: 'B5', cat: 'B', level: 'av',
    he: 'אֵבֶר מִן הַחַי מִן הַבְּהֵמָה', en: 'Ever Min HaChai (Animal)',
    desc: { he: 'אֵבֶר שֶׁנֶּחְתַּךְ מִבְּהֵמָה חַיָּה — דִּינוֹ כִּנְבֵלָה', en: 'Limb from living kosher animal. Treated as neveilah' },
    sources: [
      { kind: 'gemara', ref: 'חולין קכא ע"א', text: 'אֵבֶר מִן הַחַי מִן הַבְּהֵמָה — טָמֵא כִּנְבֵלָה, מְטַמֵּא בְּמַגָּע וּבְמַשָּׂא' },
      { kind: 'mishnah', ref: 'חולין ט, ב', text: 'הָאֵבָרִים — שִׁעוּרָן בְּכַזַּיִת. וְהוּא שֶׁיִּהְיֶה בָהֶם בָּשָׂר וְעֶצֶם וְגִידִים כְּבָרִיָּתָם' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות ב, א', text: 'אֵבֶר שֶׁנֶּחְתַּךְ מִן הַחַי, וְיֵשׁ בּוֹ בָשָׂר וְגִידִים וַעֲצָמוֹת — הֲרֵי הוּא כִּנְבֵלָה לְטַמֵּא בְּמַגָּע וּבְמַשָּׂא' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן (וְכִבּוּס בְּגָדִים בְּמַשָּׂא)', en: 'Rishon (+ kibbus begadim if masa)' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.av_full,
    shiur: { he: 'כְּזַיִת — וּצְרִיכִים בָּשָׂר וְעֶצֶם וְגִידִים', en: 'Kezayis — requires flesh + bone + gidim' },
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ, וְכִבּוּס בְּגָדִים אִם נָשָׂא', en: 'Mikveh + haarev shemesh (+ kibbus begadim if masa)' },
  },
  {
    id: 'B6', cat: 'B', level: 'drabbanan',
    he: 'בָּשָׂר מִן הַחַי', en: 'Basar Min HaChai (בָּשָׂר מִן הַחַי)',
    desc: { he: 'בָּשָׂר לְבַד בְּלֹא עֶצֶם וְגִידִים — אֵינוֹ טָמֵא מִדְּאוֹרַיְתָא', en: 'Flesh alone without bone. Not tamei d\'oraisa' },
    sources: [
      { kind: 'gemara', ref: 'חולין קכא ע"א', text: 'בָּשָׂר לְבַדּוֹ הַפּוֹרֵשׁ מִן הַחַי — אֵינוֹ מְטַמֵּא כִּנְבֵלָה' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות ב, ב', text: 'בָּשָׂר הַפּוֹרֵשׁ מִן הַחַי בְּלֹא עֶצֶם וְגִידִים — טָהוֹר מִן הַתּוֹרָה' },
    ],
    mod: [],
    creates: [],
    rules: [{ he: 'דִּין אֵבֶר דּוֹרֵשׁ בָּשָׂר וְעֶצֶם וְגִידִים', en: 'Ever status requires flesh + bone + gidim' }],
    oraisa: { he: 'דְּרַבָּנַן', en: 'D\'rabbanan' },
    purif: { he: 'אֵין', en: 'N/A' },
  },

  // ━━━━━━━━━━━━━ C. SHERETZ ━━━━━━━━━━━━━
  {
    id: 'C1', cat: 'C', level: 'av',
    he: 'שְׁמוֹנָה שְׁרָצִים', en: "The Eight Sheratzim (שְׁמוֹנָה שְׁרָצִים)",
    desc: { he: 'חֹלֶד · עַכְבָּר · צָב · אֲנָקָה · כֹּחַ · לְטָאָה · חֹמֶט · תִּנְשֶׁמֶת', en: 'Choled · Achbar · Tzav · Anakah · Ko\'ach · L\'ta\'ah · Chomet · Tinshemes' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא יא, כט-ל', text: 'וְזֶה לָכֶם הַטָּמֵא בַּשֶּׁרֶץ הַשֹּׁרֵץ עַל הָאָרֶץ: הַחֹלֶד וְהָעַכְבָּר וְהַצָּב לְמִינֵהוּ. וְהָאֲנָקָה וְהַכֹּחַ וְהַלְּטָאָה וְהַחֹמֶט וְהַתִּנְשֶׁמֶת' },
      { kind: 'pasuk', ref: 'ויקרא יא, לא', text: 'אֵלֶּה הַטְּמֵאִים לָכֶם בְּכָל הַשָּׁרֶץ, כָּל הַנֹּגֵעַ בָּהֶם בְּמֹתָם יִטְמָא עַד הָעָרֶב' },
      { kind: 'mishnah', ref: 'טהרות ה, א', text: 'שְׁמוֹנָה שְׁרָצִים הָאֲמוּרִים בַּתּוֹרָה — מְטַמְּאִין בְּמַגָּע; הָרוֹאֶה אוֹתָן וְלֹא נָגַע, טָהוֹר' },
      { kind: 'mishnah', ref: 'כלים יז, יד', text: 'הָעֲדָשָׁה — זוֹ שִׁעוּרוֹ שֶׁל שֶׁרֶץ לְטַמֵּא' },
      { kind: 'gemara', ref: 'חולין קכב ע"א', text: 'דָּמוֹ וּבְשָׂרוֹ מִצְטָרְפִין לְכָעֲדָשָׁה — וַעֲדָשָׁה הַשִּׁעוּר' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות ד, א', text: 'שְׁמוֹנָה מִינֵי שְׁרָצִים הָאֲמוּרִים בַּתּוֹרָה — מְטַמְּאִין בְּמוֹתָן בְּמַגָּע בִּלְבָד, וְשִׁעוּרָן כָּעֲדָשָׁה' },
      { kind: 'sifra', ref: 'תורת כהנים, שמיני, פרק ה-ו', text: 'בְּמֹתָם — בְּמוֹתָם וְלֹא בְחַיֵּיהֶם. וְהַחַי אֵינוֹ מְטַמֵּא אַף עַל פִּי שֶׁהוּא מִין טָמֵא' },
    ],
    mod: ['maga'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'אוֹכֶל וּמַשְׁקִין', en: 'Ochel / mashkin' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.av_full,
    shiur: { he: 'כָּעֲדָשָׁה (כְּחֵלֶק תְּשִׁיעִי מִגְּרִיס)', en: 'Ka\'adashah (כָּעֲדָשָׁה) — lentil-size, ~1/9 gris' },
    rules: [
      { he: 'מַגָּע בִּלְבָד — אֵין מַשָּׂא, אֵין אֹהֶל, אֵין מִדְרָס מִדְּאוֹרַיְתָא', en: 'Maga only — no masa, no ohel, no midras d\'oraisa' },
      { he: 'רַק שְׁמוֹנָה אֵלּוּ — כָּל שְׁאָר הַשְּׁרָצִים אֵינָם מְטַמְּאִים מִדְּאוֹרַיְתָא', en: 'Only these 8 — all other sheratzim not tamei d\'oraisa' },
      { he: 'דָּם וּבָשָׂר מִצְטָרְפִין לְשִׁעוּר', en: 'Blood + flesh combine for shiur' },
      { he: 'פָּחוֹת מִכָּעֲדָשָׁה לְאַחַר שֶׁנִּתְפָּרַק — אֵינוֹ מְטַמֵּא', en: 'Below ka\'adashah after decomposition → no longer tamei' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ', en: 'Mikveh + haarev shemesh' },
  },
  {
    id: 'C2', cat: 'C', level: 'drabbanan',
    he: 'שֶׁרֶץ הַמַּיִם', en: 'Sheretz HaMayim (שֶׁרֶץ הַמַּיִם)',
    desc: { he: 'שְׁרָצִים שֶׁבַּמַּיִם — אֵינָם מְטַמְּאִים מִדְּאוֹרַיְתָא', en: 'Aquatic creatures — not tamei d\'oraisa' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא יא, י', text: 'וְכֹל אֲשֶׁר אֵין לוֹ סְנַפִּיר וְקַשְׂקֶשֶׂת בַּיַּמִּים וּבַנְּחָלִים, מִכָּל שֶׁרֶץ הַמַּיִם — שֶׁקֶץ הֵם לָכֶם' },
      { kind: 'mishnah', ref: 'טהרות ה, א', text: 'שֶׁרֶץ הַמַּיִם — אֵינוֹ מְטַמֵּא, אַף עַל פִּי שֶׁהוּא אָסוּר בַּאֲכִילָה' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות ד, ד', text: 'שֶׁרֶץ הַמַּיִם — אַף עַל פִּי שֶׁאָסוּר בַּאֲכִילָה, אֵינוֹ מְטַמֵּא מִן הַתּוֹרָה' },
    ],
    mod: [],
    creates: [],
    oraisa: { he: 'אֵינָם מְטַמְּאִים מִדְּאוֹרַיְתָא', en: 'Not tamei d\'oraisa' },
    purif: { he: 'אֵין', en: 'N/A' },
  },
  {
    id: 'C3', cat: 'C', level: 'drabbanan',
    he: 'שֶׁרֶץ הָעוֹף', en: 'Sheretz HaOf (שֶׁרֶץ הָעוֹף)',
    desc: { he: 'שְׁרָצִים הַמְּעוֹפְפִים (דְּבוֹרִים, זְבוּבִים, וְכַיּוֹצֵא) — אֵינָם מְטַמְּאִים מִדְּאוֹרַיְתָא', en: 'Flying sheratzim (bees, flies, etc.) — not tamei d\'oraisa' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא יא, כ', text: 'כֹּל שֶׁרֶץ הָעוֹף הַהֹלֵךְ עַל אַרְבַּע — שֶׁקֶץ הוּא לָכֶם' },
      { kind: 'mishnah', ref: 'טהרות ה, א', text: 'שֶׁרֶץ הָעוֹף — אֵינוֹ מְטַמֵּא, וְאַף עַל פִּי שֶׁהוּא אָסוּר בַּאֲכִילָה' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות ד, ד', text: 'וְכֵן שֶׁרֶץ הָעוֹף — אֵין בּוֹ טֻמְאָה מִן הַתּוֹרָה, אַף עַל פִּי שֶׁהַכָּתוּב קוֹרְאוֹ שֶׁקֶץ' },
    ],
    mod: [],
    creates: [],
    oraisa: { he: 'אֵינָם מְטַמְּאִים מִדְּאוֹרַיְתָא', en: 'Not tamei d\'oraisa' },
    purif: { he: 'אֵין', en: 'N/A' },
  },

  // ━━━━━━━━━━━━━ D. MASHKIN ━━━━━━━━━━━━━
  {
    id: 'D1', cat: 'D', level: 'av',
    he: 'זוֹבוֹ שֶׁל זָב', en: 'Zov (זוֹב)',
    desc: { he: 'זוֹבוֹ שֶׁל הַזָּב — אַב הַטֻּמְאָה בִּפְנֵי עַצְמוֹ גַּם אַחַר שֶׁפֵּרַשׁ מִמֶּנּוּ', en: 'Zav\'s discharge — av hatumah in its own right even after separation' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, ג-יב', text: 'וְזֹאת תִּהְיֶה טֻמְאָתוֹ בְּזוֹבוֹ...' },
      { kind: 'mishnah', ref: 'זבים ה, ז', text: 'זוֹבוֹ שֶׁל זָב וְרֻקּוֹ וְשִׁכְבַת זַרְעוֹ וּמֵימֵי רַגְלָיו — מְטַמְּאִים בְּמַגָּע וּבְמַשָּׂא' },
      { kind: 'gemara', ref: 'נדה נה ע"ב', text: 'זוֹבוֹ שֶׁל זָב — אַב הַטֻּמְאָה אַף לְאַחַר שֶׁפֵּרַשׁ מִגּוּפוֹ' },
      { kind: 'rambam', ref: 'מטמאי משכב ומושב א, טז', text: 'זוֹבוֹ שֶׁל זָב וְרֻקּוֹ וּמֵימֵי רַגְלָיו וְשִׁכְבַת זַרְעוֹ — כֻּלָּן אַב הַטֻּמְאָה מִן הַתּוֹרָה' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'רִאשׁוֹן (אַב לִתְרוּמָה עַל יְדֵי עֲלִיַּת מַשְׁקִין)', en: 'Rishon (av for terumah via mashkin-upgrade)' } },
    ],
    reach: REACH.av_full,
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'הֲסָרָה מִן הַכְּלִי; בְּאָדָם — טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ', en: 'Remove from kli; adam: mikveh + haarev shemesh' },
  },
  {
    id: 'D2', cat: 'D', level: 'av',
    he: 'רֹק הַזָּב', en: 'Rok (רֹק)',
    desc: { he: 'רֹק הַזָּב — אַב הַטֻּמְאָה אַף אַחַר שֶׁפֵּרַשׁ. וְכֵן רֹק זָבָה, נִדָּה, יוֹלֶדֶת, וּמְצֹרָע', en: 'Zav\'s saliva — av even after separation. Same for zava, niddah, yoledes, metzora' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, ח', text: 'וְכִי יָרֹק הַזָּב בַּטָּהוֹר, וְכִבֶּס בְּגָדָיו וְרָחַץ בַּמַּיִם וְטָמֵא עַד הָעָרֶב' },
      { kind: 'gemara', ref: 'נדה נה ע"ב', text: 'רֹק הַזָּב — אַב הַטֻּמְאָה אַף לְאַחַר שֶׁפֵּרַשׁ; וְכֵן רֹק זָבָה וְנִדָּה וְיוֹלֶדֶת וּמְצֹרָע' },
      { kind: 'rambam', ref: 'מטמאי משכב ומושב א, טז', text: 'רֻקּוֹ שֶׁל זָב — אַב הַטֻּמְאָה לְטַמֵּא אָדָם וְכֵלִים בְּמַגָּע וּבְמַשָּׂא' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.av_full,
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'הֲסָרָה מִן הַכְּלִי; בְּאָדָם — טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ', en: 'Remove from kli; adam: mikveh + haarev shemesh' },
  },
  {
    id: 'D3', cat: 'D', level: 'av',
    he: 'מֵימֵי רַגְלָיו', en: 'Mei Raglayim (מֵימֵי רַגְלָיו)',
    desc: { he: 'מֵי רַגְלֵי הַזָּב — בִּכְלַל זוֹבוֹ לְפִי הָרַמְבַּ"ם', en: 'Zav\'s urine — included in zov per Rambam' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, ג', text: 'וְזֹאת תִּהְיֶה טֻמְאָתוֹ בְּזוֹבוֹ, רָר בְּשָׂרוֹ אֶת זוֹבוֹ אוֹ הֶחְתִּים בְּשָׂרוֹ מִזּוֹבוֹ — טֻמְאָתוֹ הִוא' },
      { kind: 'rambam', ref: 'מטמאי משכב ומושב א, טז', text: 'מֵימֵי רַגְלָיו שֶׁל זָב — בִּכְלַל זוֹבוֹ הֵן, וּמְטַמְּאִים כַּזּוֹב עַצְמוֹ' },
      { kind: 'gemara', ref: 'נדה נו ע"א', text: 'מֵימֵי רַגְלָיו שֶׁל זָב — לְרַבּוֹת מִן הַפָּסוּק "וְזֹאת תִּהְיֶה טֻמְאָתוֹ בְּזוֹבוֹ"' },
    ],
    mod: ['maga', 'masa'],
    creates: [{ on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } }],
    reach: REACH.av_full,
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'הֲסָרָה מִן הַכְּלִי; בְּאָדָם — טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ', en: 'Remove from kli; adam: mikveh + haarev shemesh' },
  },
  {
    id: 'D4', cat: 'D', level: 'av',
    he: 'שִׁכְבַת זֶרַע', en: 'Shichvas Zera (שִׁכְבַת זֶרַע)',
    desc: { he: 'שִׁכְבַת זֶרַע שֶׁל אִישׁ מִיִּשְׂרָאֵל (בֶּן תֵּשַׁע שָׁנִים וָמַעְלָה לְפִי הָרַמְבַּ"ם)', en: 'Semen of male Yisrael (9 years and older per Rambam)' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, טז', text: 'וְאִישׁ כִּי תֵצֵא מִמֶּנּוּ שִׁכְבַת זָרַע, וְרָחַץ בַּמַּיִם אֶת כָּל בְּשָׂרוֹ וְטָמֵא עַד הָעָרֶב' },
      { kind: 'pasuk', ref: 'ויקרא טו, יז-יח', text: 'וְכָל בֶּגֶד וְכָל עוֹר אֲשֶׁר יִהְיֶה עָלָיו שִׁכְבַת זָרַע — וְכֻבַּס בַּמַּיִם וְטָמֵא עַד הָעָרֶב' },
      { kind: 'mishnah', ref: 'מקואות ח, ג', text: 'הַפּוֹלֶטֶת שִׁכְבַת זֶרַע בַּיּוֹם הַשְּׁלִישִׁי — טְהוֹרָה, דִּבְרֵי רַבִּי אֶלְעָזָר בֶּן עֲזַרְיָה' },
      { kind: 'gemara', ref: 'נדה לב ע"א', text: 'שִׁכְבַת זֶרַע — מְטַמְּאָה בְּכָל שֶׁהוּא, וְהִיא אַב הַטֻּמְאָה' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות ה, א', text: 'שִׁכְבַת זֶרַע שֶׁל כָּל אָדָם — אַב הַטֻּמְאָה; מְטַמְּאָה בְּמַגָּע וּבְמַשָּׂא' },
      { kind: 'sifra', ref: 'תורת כהנים, מצורע, פרק ו', text: 'וְאִישׁ — אֵין לִי אֶלָּא אִישׁ, נַעַר בֶּן תֵּשַׁע שָׁנִים וָיוֹם אֶחָד מִנַּיִן?' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'בַּעַל קֶרִי עַצְמוֹ', en: 'Ba\'al keri himself' }, res: { he: 'טָמֵא יוֹם אֶחָד וּטְבִילָה', en: 'Tamei 1 day + mikveh' } },
      { on: { he: 'אִשָּׁה עַל יְדֵי בִּיאָה', en: 'Ishah via bi\'ah' }, res: { he: 'טְמֵאָה יוֹם אֶחָד', en: 'Tamei 1 day' } },
      { on: { he: 'כְּלִי וּבֶגֶד', en: 'Kli / beged' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.av_full,
    rules: [{ he: 'שִׁכְבַת זֶרַע שֶׁל נָכְרִי: הָרַמְבַּ"ם סוֹבֵר גְּזֵרָה דְּרַבָּנַן, אֲחֵרִים חוֹלְקִים', en: 'Akum\'s shichvas zera: Rambam holds d\'rabbanan gezeira; others dispute' }],
    oraisa: { he: 'דְּאוֹרַיְתָא בְּיִשְׂרָאֵל', en: 'D\'oraisa (Yisrael)' },
    purif: { he: 'טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ', en: 'Mikveh + haarev shemesh' },
  },
  {
    id: 'D5', cat: 'D', level: 'av',
    he: 'דַּם נִדָּה', en: 'Dam Niddah (דַּם נִדָּה)',
    desc: { he: 'חֲמִשָּׁה מַרְאוֹת דָּמִים טְמֵאִים (מַחְלֹקֶת רַבִּי מֵאִיר וַחֲכָמִים)', en: 'Five temei\'os colors (machlokes R\' Meir vs Chachamim)' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, יט', text: 'וְאִשָּׁה כִּי תִהְיֶה זָבָה, דָּם יִהְיֶה זֹבָהּ בִּבְשָׂרָהּ — שִׁבְעַת יָמִים תִּהְיֶה בְנִדָּתָהּ' },
      { kind: 'mishnah', ref: 'נדה ב, ו', text: 'חֲמִשָּׁה דָמִים טְמֵאִים בָּאִשָּׁה: הָאָדוֹם וְהַשָּׁחוֹר וְכַקֶּרֶן כַּרְכֹּם וְכַמֵּימֵי אֲדָמָה וְכַמָּזוּג. בֵּית שַׁמַּאי אוֹמְרִים אַף כַּמֵּימֵי תִלְתָּן וּכְמֵימֵי בָשָׂר' },
      { kind: 'gemara', ref: 'נדה יט ע"א', text: 'חֲמִשָּׁה דָמִים טְמֵאִים בָּאִשָּׁה — וְאֵין שְׁאָר הַמַּרְאוֹת טְמֵאִים מִן הַתּוֹרָה' },
      { kind: 'rambam', ref: 'איסורי ביאה ה, ז', text: 'דַּם הַנִּדָּה וְדַם הַזָּבָה — אַב הַטֻּמְאָה, מְטַמֵּא אָדָם וְכֵלִים בְּמַגָּע וּבְמַשָּׂא' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.av_full,
    rules: [
      { he: 'חֲמִשָּׁה הַמַּרְאוֹת: אָדוֹם · שָׁחוֹר · כְּקֶרֶן כַּרְכֹּם · כְּמֵימֵי אֲדָמָה · כַּמָּזוּג', en: '5 colors: adom · shachor · k\'keren karkom · k\'mei adamah · k\'mazug' },
      { he: 'שְׁאָר הַמַּרְאוֹת טְהוֹרוֹת מִדְּאוֹרַיְתָא, וּמִקְצָתָן טְמֵאוֹת מִדְּרַבָּנַן', en: 'Other colors tahor d\'oraisa (some d\'rabbanan)' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'הֲסָרָה מִן הַכְּלִי; הָאִשָּׁה מִטַּהֶרֶת בְּשִׁבְעָה נְקִיִּים אוֹ שִׁבְעָה מִן הַתְּחִלָּה, וּטְבִילָה', en: 'Remove from kli; ishah purifies via 7 clean days (or 7 from onset) + mikveh' },
  },
  {
    id: 'D6', cat: 'D', level: 'av',
    he: 'דַּם זָבָה', en: 'Dam Zava (דַּם זָבָה)',
    desc: { he: 'אוֹתָם חֲמִשָּׁה מַרְאוֹת שֶׁל דַּם נִדָּה, אֲבָל בִּימֵי הַזִּיבָה', en: 'Same 5 colors as dam niddah, but in days of zivah' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא טו, כה', text: 'וְאִשָּׁה כִּי יָזוּב זוֹב דָּמָהּ יָמִים רַבִּים בְּלֹא עֶת נִדָּתָהּ — כָּל יְמֵי זוֹב טֻמְאָתָהּ כִּימֵי נִדָּתָהּ תִּהְיֶה טְמֵאָה הִוא' },
      { kind: 'mishnah', ref: 'נדה ב, ו', text: 'אוֹתָן חֲמִשָּׁה מַרְאוֹת — בְּיָמֵי הַזִּיבָה מְטַמְּאִין כְּדַם נִדָּה' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.av_full,
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'הָאִשָּׁה מִטַּהֶרֶת בְּשִׁבְעָה נְקִיִּים, טְבִילָה, וְקָרְבָּן בִּגְדוֹלָה', en: 'Woman purifies via 7 clean days, mikveh, and korban (for zava gedola)' },
  },
  {
    id: 'D7', cat: 'D', level: 'tahor',
    he: 'דַּם טֹהַר', en: 'Dam Tohar (דַּם טֹהַר)',
    desc: { he: 'דַּם יוֹלֶדֶת בִּימֵי טָהֳרָה (ל"ג/ס"ו) — אֵינוֹ מְטַמֵּא אַף בְּמַרְאֵה טָמֵא', en: 'Yoledes\'s blood during 33/66 day period — not tamei even in temei\'os color' },
    sources: [
      { kind: 'pasuk', ref: 'ויקרא יב, ד-ה', text: 'בִּדְמֵי טָהֳרָה לֹא תִגַּע בְּכָל קֹדֶשׁ וְאֶל הַמִּקְדָּשׁ לֹא תָבֹא' },
      { kind: 'mishnah', ref: 'נדה ד, ד', text: 'כָּל אוֹתָן הַיָּמִים שֶׁל דַּם טֹהַר — טְהוֹרָה הִיא, אֶלָּא שֶׁאֲסוּרָה בְקֹדֶשׁ וּלְהִכָּנֵס לַמִּקְדָּשׁ' },
      { kind: 'rambam', ref: 'איסורי ביאה י, ג', text: 'הָרוֹאָה דָם בְּתוֹךְ שְׁלֹשִׁים וּשְׁלֹשָׁה לְזָכָר אוֹ שִׁשִּׁים וְשִׁשָּׁה לִנְקֵבָה — הֲרֵי זֶה דַם טֹהַר, וְאֵינוֹ מְטַמֵּא' },
    ],
    mod: [],
    creates: [],
    rules: [
      { he: 'יוֹצֵא מִן הַכְּלָל — אֵינוֹ מוֹלִיד טֻמְאָה', en: 'Exclusion — does not generate tumah' },
      { he: 'אֲסוּרָה בְמִקְדָּשׁ וּבַקֳדָשִׁים בִּלְבָד; שְׁאָר עִנְיָנֵי טָהֳרָה מֻתָּרִים', en: 'Blocks mikdash and kodshim only; other taharos permitted' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'מִסְתַּיֵּם בְּיוֹם מ׳/פ׳', en: 'Exits at day 40/80' },
  },
  {
    id: 'D8', cat: 'D', level: 'av_avos',
    he: 'דַּם הַמֵּת', en: 'Dam HaMeis (דַּם הַמֵּת)',
    desc: { he: 'דַּם הַמֵּת בִּרְבִיעִית הַלֹּג — דִּינוֹ כַמֵּת לְכָל דְּבָרָיו', en: 'Blood of meis in revi\'is halog — full meis status' },
    sources: [
      { kind: 'mishnah', ref: 'אהלות ב, ב', text: 'רְבִיעִית דָּם מִשְּׁנֵי מֵתִים, וּרְבִיעִית דָּם מִמֵּת אֶחָד — מְטַמְּאוֹת בְּמַגָּע וּבְמַשָּׂא וּבְאֹהֶל' },
      { kind: 'gemara', ref: 'חולין פז ע"ב', text: 'דַּם הַמֵּת בִּרְבִיעִית — מְטַמֵּא בְּאֹהֶל כִּבְשַׂר הַמֵּת' },
      { kind: 'rambam', ref: 'טומאת מת ב, ט', text: 'רְבִיעִית דָּם שֶׁיָּצָא מִן הַמֵּת — מְטַמֵּא בְּאֹהֶל כַּמֵּת עַצְמוֹ' },
    ],
    mod: ['maga', 'masa', 'ohel'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'אַב הַטֻּמְאָה לְשִׁבְעַת יָמִים', en: 'Av HaTumah — 7 days' } },
      { on: { he: 'כְּלִי מַתֶּכֶת', en: 'Metal kli' }, res: { he: 'אֲבִי אֲבוֹת (חֶרֶב כַּחֲלָל)', en: 'Av avos (chereiv k\'chalal)' } },
      { on: { he: 'שְׁאָר כֵּלִים', en: 'Other keilim' }, res: { he: 'טְמֵאִים שִׁבְעַת יָמִים', en: 'Tamei 7 days' } },
      { on: { he: 'כָּל שֶׁבְּאֹהֶל אֶחָד עִמּוֹ', en: 'Anything sharing ohel' }, res: { he: 'טָמֵא שִׁבְעָה', en: 'Tamei 7 days' } },
      { on: { he: 'אוֹכֶל וּמַשְׁקִין', en: 'Ochel / mashkin' }, res: { he: 'רִאשׁוֹן', en: 'Rishon' } },
    ],
    reach: REACH.avos,
    shiur: { he: 'רְבִיעִית הַלֹּג', en: 'Revi\'is halog' },
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'סֵדֶר אֵפֶר פָּרָה', en: 'Parah adumah sequence' },
  },
  {
    id: 'D9', cat: 'D', level: 'av_avos',
    he: 'דַּם תְּבוּסָה', en: 'Dam Tevusah (דַּם תְּבוּסָה)',
    desc: { he: 'דַּם הֶחָלָל הַמְעֹרָב (חַצְיוֹ מֵחַיִּים וְחַצְיוֹ אַחַר מִיתָה) — פְּרָטֵי דִינִים בְּאָהֳלוֹת', en: 'Mixed blood (half from life, half post-death) — rules in Ohalos' },
    sources: [
      { kind: 'mishnah', ref: 'אהלות ג, ה', text: 'דַּם הַתְּבוּסָה — טָמֵא. רַבִּי יְהוּדָה אוֹמֵר: אֵינוֹ מְטַמֵּא' },
      { kind: 'gemara', ref: 'נזיר נג ע"ב', text: 'דַּם הַתְּבוּסָה — דַּם הַיּוֹצֵא עִם יְצִיאַת הַנְּשָׁמָה, שֶׁסָּפֵק אִם מִן הַחַי אִם מִן הַמֵּת' },
      { kind: 'rambam', ref: 'טומאת מת ב, יב', text: 'דַּם תְּבוּסָה — הוּא דַּם הֶחָלָל שֶׁיָּצָא מִמֶּנּוּ עִם יְצִיאַת הַנֶּפֶשׁ, וְנִמְצָא מְעֹרָב וְדִינוֹ כְּדַם הַמֵּת' },
    ],
    mod: ['maga', 'masa', 'ohel'],
    creates: [
      { on: { he: 'אָדָם', en: 'Adam' }, res: { he: 'אַב הַטֻּמְאָה לְשִׁבְעַת יָמִים (לְדַעַת חֲכָמִים)', en: 'Av HaTumah — 7 days (per Chachamim)' } },
      { on: { he: 'כָּל שֶׁבְּאֹהֶל אֶחָד עִמּוֹ', en: 'Anything sharing ohel' }, res: { he: 'טָמֵא שִׁבְעָה בִּרְבִיעִית', en: 'Tamei 7 days if revi\'is' } },
      { on: { he: 'כְּלִי', en: 'Kli' }, res: { he: 'טָמֵא שִׁבְעָה', en: 'Tamei 7 days' } },
      { on: { he: 'לְדַעַת רַבִּי יְהוּדָה', en: "Per R' Yehudah" }, res: { he: 'אֵינוֹ מְטַמֵּא', en: 'Does not metamei' } },
    ],
    reach: REACH.avos,
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'סֵדֶר אֵפֶר פָּרָה', en: 'Parah adumah sequence' },
  },
  {
    id: 'D10', cat: 'D', level: 'paradox',
    he: 'מֵי חַטָּאת', en: 'Mei Chatas (מֵי חַטָּאת)',
    desc: { he: 'מְטַמְּאִין אֶת הַטְּהוֹרִים וּמְטַהֲרִין אֶת טְמֵאֵי מֵת כְּשֶׁמּוֹזִין בָּם כַּהֲלָכָה', en: 'Metamei the tahor; metaher tamei meis when sprinkled properly' },
    sources: [
      { kind: 'pasuk', ref: 'במדבר יט, יט', text: 'וְהִזָּה הַטָּהֹר עַל הַטָּמֵא בַּיּוֹם הַשְּׁלִישִׁי וּבַיּוֹם הַשְּׁבִיעִי' },
      { kind: 'pasuk', ref: 'במדבר יט, כא', text: 'כָּל הַנֹּגֵעַ בְּמֵי הַנִּדָּה יִטְמָא עַד הָעָרֶב' },
      { kind: 'mishnah', ref: 'פרה יא, ה', text: 'מֵי חַטָּאת שֶׁאֵין בָּהֶם כְּדֵי הַזָּיָה — טְהוֹרִין. הָרָאוּיִין לְהַזָּאָה — מְטַמְּאִין אֶת הַטָּהוֹר, וּמְטַהֲרִין אֶת הַטָּמֵא' },
      { kind: 'gemara', ref: 'יומא יד ע"א', text: 'מַזֶּה וּמַזִּין עָלָיו — טָהוֹר; אוֹחֵז מֵי חַטָּאת שֶׁאֵינָם רְאוּיִים לְהַזָּאָה — טָהוֹר' },
      { kind: 'rambam', ref: 'פרה אדומה טו, א', text: 'מֵי חַטָּאת הָרְאוּיִין לְהַזָּיָה — מְטַמְּאִין אֶת הַנּוֹשְׂאָן וְאֶת הַנּוֹגֵעַ בָּהֶן שֶׁלֹּא לְשֵׁם הַזָּיָה, וּמְטַהֲרִין בְּהַזָּיָתָן אֶת טְמֵא הַמֵּת' },
      { kind: 'sifrei', ref: 'ספרי זוטא, חוקת', text: 'וְהִזָּה הַטָּהֹר עַל הַטָּמֵא — הַמַּזֶּה טָהוֹר, וְהַנִּזָּה טָמֵא עַד שֶׁיִּטַּהֵר' },
    ],
    mod: ['maga', 'masa'],
    creates: [
      { on: { he: 'טָהוֹר שֶׁנָּגַע שֶׁלֹּא בְדֶרֶךְ הַזָּאָה', en: 'Tahor contacting outside haza\'ah' }, res: { he: 'טָמֵא', en: 'Tamei' } },
      { on: { he: 'טְמֵא מֵת בַּשְּׁלִישִׁי וּבַשְּׁבִיעִי', en: 'Tamei meis on day 3 & 7' }, res: { he: 'טָהֳרָה', en: 'Taharah' } },
    ],
    reach: { he: 'דִּין מְיֻחָד — שְׁנֵי כִּוּוּנִים', en: 'Unique bidirectional function' },
    rules: [
      { he: 'אֵין דֻּגְמָתוֹ בְּכָל הַטְּהָרוֹת — מְטַמֵּא וּמְטַהֵר', en: 'No parallel — metamei and metaher' },
      { he: 'מְטַהֵר עַל יְדֵי הַזָּאָה בָּאֵזוֹב בַּיּוֹם הָרָאוּי', en: 'Metaher via haza\'ah with eizov on proper day' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'אֵין — הֲרֵי הוּא נוֹזֵל תַּהֲלִיךְ', en: 'N/A — process fluid' },
  },

  // ━━━━━━━━━━━━━ E. OHEL HAMEIS ━━━━━━━━━━━━━
  {
    id: 'E1', cat: 'E', level: 'modality',
    he: 'אֹהֶל', en: 'Ohel (אֹהֶל)',
    desc: { he: 'מֵת בְּאֹהֶל שֶׁל טֶפַח עַל טֶפַח בְּרוּם טֶפַח — כָּל שֶׁבָּאֹהֶל טָמֵא שִׁבְעַת יָמִים', en: 'Meis in ohel of tefach³ — all inside tamei 7 days' },
    sources: [
      { kind: 'pasuk', ref: 'במדבר יט, יד-טו', text: 'אָדָם כִּי יָמוּת בְּאֹהֶל, כָּל הַבָּא אֶל הָאֹהֶל וְכָל אֲשֶׁר בָּאֹהֶל יִטְמָא שִׁבְעַת יָמִים' },
      { kind: 'mishnah', ref: 'אהלות ג, ז', text: 'טֶפַח עַל טֶפַח בְּרוּם טֶפַח, מְרֻבָּע — מֵבִיא אֶת הַטֻּמְאָה וְחוֹצֵץ בִּפְנֵי הַטֻּמְאָה' },
      { kind: 'gemara', ref: 'נזיר נג ע"ב', text: 'שָׁלֹשׁ טֻמְאוֹת בַּמֵּת — הַנּוֹגֵעַ, הַמַּסִּיט, וְהַמַּאֲהִיל' },
      { kind: 'rambam', ref: 'טומאת מת א, י', text: 'כֵּיצַד מְטַמֵּא הַמֵּת בְּאֹהֶל? הָאֹהֶל שֶׁהַמֵּת בְּתוֹכוֹ — כָּל מַה שֶּׁבְּתוֹכוֹ טָמֵא, וְכָל מַה שֶּׁבָּא עָלָיו לְמַעְלָה מִן הַמֵּת טָמֵא' },
    ],
    mod: ['structural'],
    creates: [{ on: { he: 'כָּל שֶׁבָּאֹהֶל', en: 'Everything in ohel' }, res: { he: 'טְמֵאִים שִׁבְעַת יָמִים (כַּמֵּת)', en: 'Tamei 7 days (meis-level)' } }],
    reach: REACH.avos,
    rules: [
      { he: 'צְרִיכִים שָׁלֹשׁ מְחִצּוֹת וְגַג, וְחָלָל שֶׁל טֶפַח עַל טֶפַח', en: 'Requires 3 walls + roof + tefach³ minimum' },
      { he: 'כְּלֵי מַתֶּכֶת נַעֲשִׂים אֲבִי אֲבוֹת עַל יְדֵי חֶרֶב כַּחֲלָל', en: 'Metal keilim → av avos via chereiv k\'chalal' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'הַזָּאַת אֵפֶר פָּרָה בַּיּוֹם הַשְּׁלִישִׁי וּבַיּוֹם הַשְּׁבִיעִי, וּטְבִילָה, וְהַעֲרֵב שֶׁמֶשׁ', en: 'Parah adumah hazaa day 3 & day 7, mikveh, haarev shemesh' },
  },
  {
    id: 'E2', cat: 'E', level: 'modality',
    he: 'טֻמְאָה רְצוּצָה', en: 'Tumah Retzutzah (טֻמְאָה רְצוּצָה)',
    desc: { he: 'מֵת הַמְעֻךְ אוֹ הַלָּחוּץ — טֻמְאָה בּוֹקַעַת וְעוֹלָה בְּלֹא אֹהֶל', en: 'Meis crushed or pressed — tumah pierces upward without ohel' },
    sources: [
      { kind: 'gemara', ref: 'נזיר נג ע"ב', text: 'טֻמְאָה רְצוּצָה בּוֹקַעַת וְעוֹלָה עַד לָרָקִיעַ — אֲפִלּוּ בְּכָל שֶׁהוּא' },
      { kind: 'mishnah', ref: 'אהלות ג, ז', text: 'כָּל שֶׁהַטֻּמְאָה רְצוּצָה — אֵין אֹהֶל חוֹצֵץ, וְטֻמְאָה בּוֹקַעַת וְעוֹלָה' },
      { kind: 'rambam', ref: 'טומאת מת ז, א', text: 'טֻמְאָה רְצוּצָה, כֵּיצַד? מֵת שֶׁהוּא לָחוּץ וּמְעֻךְ תַּחַת דָּבָר — טֻמְאָתוֹ בּוֹקַעַת וְעוֹלָה עַד לָרָקִיעַ, וְיוֹרֶדֶת עַד לַתְּהוֹם' },
    ],
    mod: ['structural'],
    creates: [{ on: { he: 'כָּל שֶׁמִּמַּעַל לוֹ', en: 'Everything above it' }, res: { he: 'טָמֵא עַד הָרָקִיעַ אוֹ עַד חֲצִיצָה רִאשׁוֹנָה', en: 'Tamei to sky or first chatzitzah' } }],
    reach: REACH.avos,
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'הַזָּאַת אֵפֶר פָּרָה בַּשְּׁלִישִׁי וּבַשְּׁבִיעִי, טְבִילָה, וְהַעֲרֵב שֶׁמֶשׁ', en: 'Parah adumah hazaa day 3 & 7, mikveh, haarev shemesh' },
  },
  {
    id: 'E3', cat: 'E', level: 'modality',
    he: 'טֻמְאָה בְּלוּעָה', en: 'Tumah Blu\'ah (טֻמְאָה בְּלוּעָה)',
    desc: { he: 'מֵת אוֹ אֵבֶר שֶׁנִּבְלָע בְּתוֹךְ חַי אוֹ בְּחָלָל סָתוּם — אֵינוֹ מְטַמֵּא', en: 'Meis/limb absorbed inside living body or sealed space — does not metamei while contained' },
    sources: [
      { kind: 'gemara', ref: 'חולין עא ע"א', text: 'טֻמְאָה בְּלוּעָה אֵינָהּ מְטַמְּאָה — שֶׁנֶּאֱמַר "וְכֹל אֲשֶׁר בְּתוֹכוֹ"' },
      { kind: 'mishnah', ref: 'אהלות יא, ז', text: 'כֶּלֶב שֶׁאָכַל בְּשַׂר הַמֵּת וּמֵת וְהוּא מֻטָּל עַל הָאַסְקֻפָּה — רַבִּי מֵאִיר אוֹמֵר: אִם יֵשׁ בַּצַּוָּאר פּוֹתֵחַ טֶפַח, מֵבִיא אֶת הַטֻּמְאָה' },
      { kind: 'rambam', ref: 'טומאת מת כ, א', text: 'טֻמְאָה בְלוּעָה אֵינָהּ מְטַמְּאָה — כָּל שֶׁנִּבְלַע בְּגוּף הַחַי אֵינוֹ מְטַמֵּא עַד שֶׁיֵּצֵא' },
    ],
    mod: ['structural'],
    creates: [{ on: { he: 'כָּל זְמַן שֶׁהוּא בָּלוּעַ', en: 'While contained' }, res: { he: 'אֵינוֹ מְטַמֵּא', en: 'Does not metamei' } }],
    rules: [{ he: 'גּוּף חַי הַבּוֹלֵעַ דָּבָר טָמֵא חוֹצֵץ עַד שֶׁיֵּצֵא', en: 'Living body containing tamei object blocks propagation until emergence' }],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'בִּשְׁעַת יְצִיאָה', en: 'Upon release' },
  },
  {
    id: 'E4', cat: 'E', level: 'modality',
    he: 'צָמִיד פָּתִיל וַחֲצִיצָה', en: 'Tzamid Pasil & Chatzitzah (צָמִיד פָּתִיל)',
    desc: { he: 'כְּלִי חֶרֶס שֶׁיֵּשׁ עָלָיו צָמִיד פָּתִיל — חוֹצֵץ בִּפְנֵי טֻמְאַת אֹהֶל', en: 'Sealed kli cheres blocks ohel penetration' },
    sources: [
      { kind: 'pasuk', ref: 'במדבר יט, טו', text: 'וְכֹל כְּלִי פָתוּחַ אֲשֶׁר אֵין צָמִיד פָּתִיל עָלָיו — טָמֵא הוּא' },
      { kind: 'mishnah', ref: 'כלים י, א', text: 'אֵלּוּ כֵלִים מַצִּילִין בְּצָמִיד פָּתִיל: כְּלֵי גְלָלִים, כְּלֵי אֲדָמָה, כְּלֵי אֲבָנִים, כְּלֵי חֶרֶס' },
      { kind: 'mishnah', ref: 'אהלות ה, ג', text: 'כְּלִי חֶרֶס מַצִּיל עַל הַכֹּל, דִּבְרֵי רַבִּי אֱלִיעֶזֶר' },
      { kind: 'rambam', ref: 'טומאת מת כא, א', text: 'כְּלִי חֶרֶס הַמֻּקָּף צָמִיד פָּתִיל בְּאֹהֶל הַמֵּת — כָּל שֶׁבְּתוֹכוֹ טָהוֹר, וְכֵן אֹכָלִים וּמַשְׁקִין שֶׁבְּתוֹכוֹ' },
    ],
    mod: ['structural'],
    creates: [],
    rules: [
      { he: 'רַק כְּלִי חֶרֶס — שְׁאָר הַכֵּלִים אֵינָם חוֹצְצִים', en: 'Only kli cheres; other materials do not block' },
      { he: 'הַפְּתִיל צָרִיךְ לִהְיוֹת שָׁלֵם וְסָתוּם לְגַמְרֵי', en: 'Seal must be complete' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'אֵין — דִּין חֲצִיצָה', en: 'N/A — blocking rule' },
  },
  {
    id: 'E5', cat: 'E', level: 'modality',
    he: 'כֵּלִים בָּאֹהֶל', en: "Keilim BaOhel (כֵּלִים בָּאֹהֶל)",
    desc: { he: 'כֵּלִים שֶׁבָּאֹהֶל מְקַבְּלִים טֻמְאָה כְּאָדָם שֶׁבּוֹ. וּכְלֵי מַתֶּכֶת — חֶרֶב כַּחֲלָל', en: 'Keilim in ohel become tamei like adam inside. Metal → chereiv k\'chalal' },
    sources: [
      { kind: 'mishnah', ref: 'אהלות ה, א', text: 'תַּנּוּר שֶׁהוּא עוֹמֵד בְּתוֹךְ הַבַּיִת וְעֵינוֹ קְמוּרָה לַחוּץ, וְהַשָּׁלִיחַ פּוֹרֵשׂ עָלָיו סָדִין — אַף עַל פִּי שֶׁקְּצָתוֹ מַאֲהִיל עַל הַמֵּת, הוּא טָהוֹר' },
      { kind: 'rambam', ref: 'טומאת מת ה, ג', text: 'כָּל הַכֵּלִים שֶׁבַּבַּיִת שֶׁהַמֵּת בְּתוֹכוֹ, בֵּין כְּלֵי מַתֶּכֶת בֵּין כְּלֵי עֵץ וּשְׁאָר כֵּלִים — טְמֵאִים טֻמְאַת שִׁבְעָה' },
    ],
    mod: ['structural'],
    creates: [
      { on: { he: 'כְּלִי מַתֶּכֶת', en: 'Metal kli' }, res: { he: 'אֲבִי אֲבוֹת (חֶרֶב כַּחֲלָל)', en: 'Av avos (chereiv k\'chalal)' } },
      { on: { he: 'עֵץ, בֶּגֶד, עוֹר', en: 'Wood / cloth / leather' }, res: { he: 'אַב הַטֻּמְאָה לְשִׁבְעַת יָמִים', en: 'Av HaTumah — 7 days' } },
    ],
    reach: REACH.avos,
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'הַזָּאַת אֵפֶר פָּרָה בַּשְּׁלִישִׁי וּבַשְּׁבִיעִי, טְבִילָה, וְהַעֲרֵב שֶׁמֶשׁ', en: 'Parah adumah hazaa day 3 & 7, mikveh, haarev shemesh' },
  },
  {
    id: 'E6', cat: 'E', level: 'modality',
    he: 'אֹהֶל נָטוּי וְאֹהֶל זָרוּק', en: 'Ohel Natuy / Zaruk (אֹהֶל נָטוּי)',
    desc: { he: 'גַּגּוֹת מְשֻׁפָּעִים, זִיזִין בּוֹלְטִים, אֹהָלִים זְרוּקִים — פְּרָטֵי דִינִים מְרֻבִּים', en: 'Slanted roofs, projecting eaves, unattached ohalos — many halachic details' },
    sources: [
      { kind: 'mishnah', ref: 'אהלות ח, א', text: 'יֵשׁ מְבִיאִין אֶת הַטֻּמְאָה וְחוֹצְצִין, מְבִיאִין וְלֹא חוֹצְצִין, חוֹצְצִין וְלֹא מְבִיאִין, לֹא מְבִיאִין וְלֹא חוֹצְצִין' },
      { kind: 'gemara', ref: 'סוכה כ ע"ב', text: 'אֹהֶל זָרוּק — מַחֲלֹקֶת אִם שְׁמוֹ אֹהֶל וְחוֹצֵץ בִּפְנֵי הַטֻּמְאָה' },
      { kind: 'rambam', ref: 'טומאת מת יג, א', text: 'אֹהֶל טָמֵא — הוּא שֶׁיִּהְיֶה בּוֹ חָלָל שֶׁל טֶפַח עַל טֶפַח בְּרוּם טֶפַח; כָּל פָּחוֹת מִכָּאן — אֵינוֹ אֹהֶל' },
    ],
    mod: ['structural'],
    creates: [],
    rules: [
      { he: 'מַחְלֹקוֹת רַבּוֹת בִּמְקוֹמוֹת הַסְּפֵקוֹת', en: 'Many disputes at edge cases' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא עִם מַחְלוֹקוֹת', en: 'D\'oraisa with machlokos' },
    purif: { he: 'הַזָּאַת אֵפֶר פָּרָה בַּשְּׁלִישִׁי וּבַשְּׁבִיעִי, טְבִילָה, וְהַעֲרֵב שֶׁמֶשׁ — בִּמְקוֹם שֶׁטָּמֵא בְּאֹהֶל', en: 'Parah adumah hazaa day 3 & 7, mikveh, haarev shemesh — where tamei via ohel' },
  },
  {
    id: 'E7', cat: 'E', level: 'drabbanan',
    he: 'בֵּית הַפְּרָס וְאֶרֶץ הָעַמִּים', en: "Bais HaPras / Eretz Ha'amim",
    desc: { he: 'שָׂדֶה שֶׁנֶּחְרַשׁ בָּהּ קֶבֶר / אֶרֶץ הָעַמִּים. בְּעִקָּר לְעִנְיַן כֹּהֵן', en: 'Field plowed over a grave / gentile lands. Primarily kohen concern' },
    sources: [
      { kind: 'mishnah', ref: 'אהלות יז, א', text: 'הַחוֹרֵשׁ אֶת הַקֶּבֶר — הֲרֵי זֶה עוֹשֶׂה בֵית הַפְּרָס מֵאָה אַמָּה' },
      { kind: 'gemara', ref: 'שבת טו ע"ב', text: 'גָּזְרוּ טֻמְאָה עַל אֶרֶץ הָעַמִּים וְעַל כְּלִי זְכוּכִית — מֵעֵת שֶׁחָזְרוּ בְּנֵי הַגּוֹלָה' },
      { kind: 'rambam', ref: 'טומאת מת יא, א', text: 'שָׂדֶה שֶׁנֶּחְרַשׁ בּוֹ קֶבֶר — נִקְרֵאת בֵּית הַפְּרָס, וּטְמֵאָה מִדִּבְרֵיהֶם' },
    ],
    mod: ['structural'],
    creates: [{ on: { he: 'כֹּהֵן', en: 'Kohen' }, res: { he: 'טָמֵא מִדְּרַבָּנַן', en: 'Tamei d\'rabbanan' } }],
    oraisa: { he: 'דְּרַבָּנַן', en: 'D\'rabbanan' },
    purif: { he: 'טְבִילָה; אִסּוּר כֹּהֵן בְּמָקוֹם אַחֵר', en: 'Mikveh; kohen prohibition separate' },
  },

  // ━━━━━━━━━━━━━ F. PARAH ADUMAH ━━━━━━━━━━━━━
  {
    id: 'F2', cat: 'F', level: 'tahor',
    he: 'אֵפֶר פָּרָה', en: 'Eifer Parah (אֵפֶר פָּרָה)',
    desc: { he: 'טָהוֹר מֵעִיקָרוֹ. וְנִטְמָא אִם נָגְעוּ בוֹ טְמֵאִים', en: 'Tahor by default. Becomes tamei if touched by tamei' },
    sources: [
      { kind: 'pasuk', ref: 'במדבר יט, ט-י', text: 'וְאָסַף אִישׁ טָהוֹר אֵת אֵפֶר הַפָּרָה, וְהִנִּיחַ מִחוּץ לַמַּחֲנֶה בְּמָקוֹם טָהוֹר' },
      { kind: 'mishnah', ref: 'פרה ג, יא', text: 'חִלְּקוּהוּ לִשְׁלֹשָׁה חֲלָקִים: אֶחָד נִתָּן בַּחֵיל, וְאֶחָד בְּהַר הַמִּשְׁחָה, וְאֶחָד הָיָה מִתְחַלֵּק לְכָל הַמִּשְׁמָרוֹת' },
      { kind: 'rambam', ref: 'פרה אדומה ה, ב', text: 'הָאֵפֶר עַצְמוֹ טָהוֹר, וְנִשְׁמָר בְּמָקוֹם טָהוֹר; וּמִי שֶׁאוֹסְפוֹ וּמִי שֶׁנּוֹשְׂאוֹ — טָהוֹר' },
    ],
    mod: ['maga', 'masa'],
    creates: [],
    rules: [
      { he: 'נִשְׁמָר בִּמְקוֹם טָהֳרָה מֻגְדָּר', en: 'Kept in designated taharah location' },
      { he: 'חֶזְקַת טֻמְאָה בִּרְשׁוּת הָרַבִּים', en: 'Chezkas tumah in public domain' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'אִם נִטְמָא — אֵינוֹ כָּשֵׁר לַעֲבוֹדָה', en: 'If tamei, unusable' },
  },
  {
    id: 'F3', cat: 'F', level: 'av',
    he: 'עוֹסֵק בַּפָּרָה', en: "Oseik BaParah (עוֹסֵק בַּפָּרָה)",
    desc: { he: 'הַכֹּהֵן הַשּׂוֹרֵף, הָאוֹסֵף אֶת הָאֵפֶר, וְהַמְמַלֵּא מַיִם — נִטְמָאִים בַּעֲבוֹדָתָם', en: 'The kohen shorfah, ha\'osef efrah, ha\'memalei mayim — become tamei in their service' },
    sources: [
      { kind: 'pasuk', ref: 'במדבר יט, ז', text: 'וְכִבֶּס בְּגָדָיו הַכֹּהֵן וְרָחַץ בְּשָׂרוֹ בַּמַּיִם, וְאַחַר יָבֹא אֶל הַמַּחֲנֶה, וְטָמֵא הַכֹּהֵן עַד הָעָרֶב' },
      { kind: 'pasuk', ref: 'במדבר יט, ח', text: 'וְהַשֹּׂרֵף אֹתָהּ יְכַבֵּס בְּגָדָיו בַּמַּיִם וְרָחַץ בְּשָׂרוֹ בַּמַּיִם, וְטָמֵא עַד הָעָרֶב' },
      { kind: 'pasuk', ref: 'במדבר יט, ט-י', text: 'וְאָסַף אִישׁ טָהוֹר אֵת אֵפֶר הַפָּרָה וְהִנִּיחַ מִחוּץ לַמַּחֲנֶה בְּמָקוֹם טָהוֹר... וְכִבֶּס הָאֹסֵף אֶת אֵפֶר הַפָּרָה אֶת בְּגָדָיו וְטָמֵא עַד הָעָרֶב' },
      { kind: 'mishnah', ref: 'פרה ד, ד', text: 'כֹּל הָעוֹסְקִין בַּפָּרָה מִתְּחִלָּה וְעַד סוֹף — מְטַמְּאִין בְּגָדִים' },
      { kind: 'rambam', ref: 'פרה אדומה ה, א', text: 'כָּל הָעוֹסְקִין בַּפָּרָה מִתְּחִלָּה וְעַד סוֹף — מְטַמְּאִין בְּגָדִים כָּל זְמַן שֶׁהֵן עוֹסְקִין בָּהּ' },
      { kind: 'sifrei', ref: 'ספרי זוטא, חוקת', text: 'וְכִבֶּס בְּגָדָיו הַכֹּהֵן — שׂוֹרֵף הַפָּרָה וְהַמַּשְׁלִיךְ אֶת עֵץ הָאֶרֶז — טְעוּנִין כִּבּוּס בְּגָדִים' },
    ],
    mod: ['process'],
    creates: [{ on: { he: 'הַכֹּהֵן וְהַמְּסַיְּעִים', en: 'Kohen and assistants' }, res: { he: 'טְמֵאִים עַד הָעֶרֶב, וּטְעוּנִים כִּבּוּס בְּגָדִים', en: 'Tamei until haarev shemesh, require kibbus begadim' } }],
    reach: REACH.av_full,
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'כִּבּוּס בְּגָדִים, טְבִילָה, וְהַעֲרֵב שֶׁמֶשׁ', en: 'Kibbus begadim + mikveh + haarev shemesh' },
  },
  {
    id: 'F4', cat: 'F', level: 'av',
    he: 'שׁוֹחֵט וּמַזֶּה', en: 'Shochet / Mazeh (שׁוֹחֵט / מַזֶּה)',
    desc: { he: 'הַשּׁוֹחֵט, הַמְקַבֵּל, וְהַמַּזֶּה — כָּל אֶחָד דִּינוֹ בִּפְנֵי עַצְמוֹ', en: 'Shochet, mekabel, mazeh — each has its own din' },
    sources: [
      { kind: 'mishnah', ref: 'פרה ד, א', text: 'פָּרַת חַטָּאת שֶׁשְּׁחָטָהּ שֶׁלֹּא לִשְׁמָהּ, קִבֵּל וְהִזָּה שֶׁלֹּא לִשְׁמָהּ, אוֹ לִשְׁמָהּ וְשֶׁלֹּא לִשְׁמָהּ, אוֹ שֶׁלֹּא לִשְׁמָהּ וְלִשְׁמָהּ — פְּסוּלָה' },
      { kind: 'rambam', ref: 'פרה אדומה ד, א', text: 'הַשּׁוֹחֵט אֶת הַפָּרָה, וְהַמְקַבֵּל אֶת דָּמָהּ, וְהַמַּזֶּה מִדָּמָהּ — כָּל אֶחָד מֵהֶן דִּינוֹ בִּפְנֵי עַצְמוֹ בִּקְבִיעוּת הַטֻּמְאָה' },
    ],
    mod: ['process'],
    creates: [{ on: { he: 'כָּל אֶחָד לְפִי עֲבוֹדָתוֹ', en: 'Per role' }, res: { he: '', en: '' } }],
    reach: REACH.av_full,
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'לְפִי עֲבוֹדָתוֹ', en: 'Per role' },
  },
  {
    id: 'F5', cat: 'F', level: 'modality',
    he: 'כֵּלִים בַּעֲשִׂיַּת הַפָּרָה', en: "Keilim in Parah Process",
    desc: { he: 'הַכֵּלִים שֶׁמִּשְׁתַּמְּשִׁים בָּהֶם בַּעֲשִׂיַּת הַפָּרָה — צְרִיכִים טָהֳרַת קֹדֶשׁ', en: 'Keilim used in parah process must be at taharas kodesh level' },
    sources: [
      { kind: 'mishnah', ref: 'פרה ה, א', text: 'הַמֵּבִיא אֶת חֶרֶס הַחַטָּאת — טוֹבֵל; וּמַטְבִּיל אֶת הַחֶרֶס בַּמַּיִם, וְנוֹתְנוֹ בְּתוֹךְ מַיִם חַיִּים' },
      { kind: 'rambam', ref: 'פרה אדומה ד, טז', text: 'הַכֵּלִים הַמְשַׁמְּשִׁין בְּמֵי חַטָּאת — טְעוּנִין טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ, וּצְרִיכִין לִהְיוֹת טְהוֹרִין בְּטָהֳרַת הַקֹּדֶשׁ' },
    ],
    mod: ['process'],
    creates: [],
    rules: [
      { he: 'צְרִיכִים לִהְיוֹת טְהוֹרִים בָּרָמָה הָעֶלְיוֹנָה קֹדֶם הַשִּׁמּוּשׁ', en: 'Must be tahor at highest level before use' },
      { he: 'דִּינֵי טְבִילָה מְיֻחָדִים', en: 'Specific tevilah requirements' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa' },
    purif: { he: 'טָהֳרָה בָּרָמָה הָעֶלְיוֹנָה', en: 'Highest-tier taharah' },
  },

  // ━━━━━━━━━━━━━ G. GENERAL RULES ━━━━━━━━━━━━━
  {
    id: 'G1', cat: 'G', level: 'special',
    he: 'עֲבוֹדָה זָרָה', en: 'Avodah Zara (עֲבוֹדָה זָרָה)',
    desc: { he: 'עֲבוֹדָה זָרָה וּמְשַׁמְּשֶׁיהָ. יֵשׁ אוֹמְרִים אֲבִי אֲבוֹת, וְיֵשׁ אוֹמְרִים אַב הַטֻּמְאָה', en: 'Idol and its attendants. Some hold av avos, others av hatumah' },
    sources: [
      { kind: 'gemara', ref: 'עבודה זרה מז ע"ב', text: 'עֲבוֹדָה זָרָה — מְטַמְּאָה בְּמַשָּׂא כְּנִדָּה: "תִּזְרֵם כְּמוֹ דָוָה — צֵא תֹּאמַר לוֹ"' },
      { kind: 'gemara', ref: 'שבת פב ע"ב', text: 'עֲבוֹדָה זָרָה וּמְשַׁמְּשֶׁיהָ וְתַקְרֻבְתָּהּ וְנוֹיָהּ — כֻּלָּן מְטַמְּאִין בְּמַשָּׂא' },
      { kind: 'mishnah', ref: 'עבודה זרה ג, ו', text: 'מִי שֶׁהָיָה בֵיתוֹ סָמוּךְ לַעֲבוֹדָה זָרָה וְנָפַל — אָסוּר לִבְנוֹתוֹ' },
      { kind: 'rambam', ref: 'עבודת כוכבים ז, ב', text: 'כָּל עֲבוֹדָה זָרָה וּמְשַׁמְּשֶׁיהָ וְתַקְרֹבֶת שֶׁלָּהּ וְכָל הַנַּעֲשֶׂה בִּשְׁבִילָהּ — אֲסוּרִין בַּהֲנָאָה, וּמְטַמְּאִין כְּנִדָּה' },
    ],
    mod: ['maga', 'masa'],
    creates: [{ on: { he: 'לְפִי הַשִּׁיטָה', en: 'Per shita' }, res: { he: 'אֲבִי אֲבוֹת / אַב הַטֻּמְאָה / דְּרַבָּנַן', en: 'Av avos / av hatumah / d\'rabbanan' } }],
    reach: { he: 'תָּלוּי בַּדַּרְגָּה', en: 'Depends on level' },
    rules: [
      { he: 'כּוֹלֵל מְשַׁמְּשֵׁי עֲבוֹדָה זָרָה', en: 'Includes meshamshei AZ' },
    ],
    oraisa: { he: 'מַחְלֹקֶת דְּאוֹרַיְתָא וּדְרַבָּנַן', en: 'Machlokes d\'oraisa/d\'rabbanan' },
    purif: { he: 'טְבִילָה וְהַעֲרֵב שֶׁמֶשׁ', en: 'Mikveh + haarev shemesh' },
  },
  {
    id: 'G2', cat: 'H', level: 'special',
    he: 'חֶזְקַת טֻמְאָה', en: 'Chezkas Tumah (חֶזְקַת טֻמְאָה)',
    desc: { he: 'עַם הָאָרֶץ וְנָכְרִי — בְּחֶזְקַת טְמֵאִים. חֶפְצֵי רְשׁוּת הָרַבִּים — חֶזְקַת טֻמְאָה', en: 'Am ha\'aretz (עַם הָאָרֶץ) and nachri (נָכְרִי) — presumed tamei. Items of reshus harabim — chezkas tumah' },
    sources: [
      { kind: 'gemara', ref: 'חגיגה יח ע"ב', text: 'עַם הָאָרֶץ — בְּגָדָיו מִדְרָס לְפָרוּשׁ, וּבִגְדֵי פָרוּשׁ מִדְרָס לְאוֹכְלֵי תְרוּמָה' },
      { kind: 'mishnah', ref: 'טהרות ז, א', text: 'הַקַּדָּר שֶׁהִנִּיחַ אֶת קַדֵּרוֹתָיו וְיָרַד לִשְׁתּוֹת — הַפְּנִימִיּוֹת טְהוֹרוֹת וְהַחִיצוֹנוֹת טְמֵאוֹת' },
      { kind: 'rambam', ref: 'מטמאי משכב ומושב י, א', text: 'כָּל עַם הָאָרֶץ — בְּחֶזְקַת שֶׁהוּא טָמֵא, שֶׁאֵין יוֹדֵעַ לְהִזָּהֵר בְּטָהֳרוֹת' },
    ],
    mod: [],
    creates: [{ on: { he: 'דִּין קָבוּעַ בְּמִי שֶׁאֵין יָדוּעַ', en: 'Default assumption for unknown' }, res: { he: '', en: '' } }],
    rules: [
      { he: 'עַם הָאָרֶץ — בְּחֶזְקַת טָמֵא', en: 'Am ha\'aretz — chezkas tamei' },
      { he: 'נָכְרִי — כְּזָב לְמַגָּע וּלְמַשָּׂא, וְאֵינוֹ מְטַמֵּא בְּמִדְרָס', en: 'Nachri — like zav for maga and masa; not midras' },
    ],
    oraisa: { he: 'הֲנָחָה דְּרַבָּנָן עִם יְסוֹד דְּאוֹרַיְתָא', en: 'D\'rabbanan assumption with d\'oraisa basis' },
    purif: { he: 'בֵּרוּר הַמַּצָּב בְּפֹעַל', en: 'Via actual state verification' },
  },
  {
    id: 'G3', cat: 'H', level: 'special',
    he: 'סְפֵק טֻמְאָה', en: 'Safek Tumah (סְפֵק טֻמְאָה)',
    desc: { he: 'סְפֵק טֻמְאָה בִּרְשׁוּת הַיָּחִיד — טָמֵא. בִּרְשׁוּת הָרַבִּים — טָהוֹר', en: 'Safek tumah in reshus hayachid — tamei. Reshus harabim — tahor' },
    sources: [
      { kind: 'gemara', ref: 'סוטה כח ע"ב', text: 'סְפֵק טֻמְאָה בִּרְשׁוּת הַיָּחִיד — טָמֵא; בִּרְשׁוּת הָרַבִּים — טָהוֹר. מְנָלַן? מִסּוֹטָה' },
      { kind: 'mishnah', ref: 'טהרות ד, יא; ו, ד', text: 'בִּרְשׁוּת הַיָּחִיד — סְפֵקוֹ טָמֵא. בִּרְשׁוּת הָרַבִּים — סְפֵקוֹ טָהוֹר' },
      { kind: 'rambam', ref: 'שאר אבות הטומאות טז, א', text: 'כָּל סָפֵק שֶׁל טֻמְאָה שֶׁאֵרַע בִּרְשׁוּת הַיָּחִיד — טָמֵא וַדַּאי; וּבִרְשׁוּת הָרַבִּים — סְפֵקוֹ טָהוֹר' },
    ],
    mod: [],
    creates: [],
    rules: [
      { he: 'נִלְמָד מִפָּרָשַׁת סוֹטָה, וְחָל בְּכָל הַטְּמָאוֹת', en: 'Derived from sotah, applies to all tumos' },
      { he: 'בִּמְקוֹמוֹת שֶׁל סָפֵק בַּמַּגָּע אוֹ בַּמֶּקוֹר', en: 'Applies when contact or source is uncertain' },
    ],
    oraisa: { he: 'דְּאוֹרַיְתָא', en: 'D\'oraisa (via sotah)' },
    purif: { he: 'לְפִי הַמַּצָּב אִם הִתְבָּרֵר', en: 'Per actual state if resolved' },
  },
];

// ═══════════════════════════════════════════════
// COMPONENTS
// ═══════════════════════════════════════════════

function LevelBadge({ level }) {
  const lang = useLang();
  const meta = LEVEL_META[level] || LEVEL_META.special;
  return (
    <span className={`inline-flex items-center gap-1.5 text-xs px-2 py-1 rounded-full bg-stone-50 ${meta.text} ring-1 ${meta.ring} font-medium tracking-wide`}
      style={{ fontFamily: lang === 'he' ? "'Frank Ruhl Libre', serif" : "'Fraunces', serif" }}>
      <span className={`w-1.5 h-1.5 rounded-full ${meta.dot}`} />
      {t(lang, meta.he, meta.en)}
    </span>
  );
}

function ModalityChip({ id, active, onClick }) {
  const lang = useLang();
  const m = MODALITIES[id];
  if (!m) return null;
  return (
    <button
      onClick={(e) => { e.stopPropagation(); onClick(id); }}
      className={`inline-flex items-center text-[12px] px-2 py-0.5 tracking-tight transition-all ${
        active
          ? 'bg-stone-900 text-stone-50 border border-stone-900'
          : 'bg-stone-900/5 text-stone-700 border border-stone-300/60 hover:border-stone-500 hover:bg-stone-900/10'
      }`}
      style={{ borderRadius: '2px', fontFamily: lang === 'he' ? "'Frank Ruhl Libre', serif" : "'JetBrains Mono', monospace" }}
      title={t(lang, m.desc.he, m.desc.en)}
    >
      {t(lang, m.he, m.en)}
    </button>
  );
}

function ModalityChipDisplay({ id, dashed }) {
  const lang = useLang();
  const m = MODALITIES[id];
  if (!m) return null;
  return (
    <span className={`inline-flex items-center text-[12px] px-2 py-0.5 tracking-tight bg-stone-900/5 text-stone-500 ${dashed ? 'border border-dashed border-stone-400' : 'border border-stone-300/60'}`}
      style={{ borderRadius: '2px', fontFamily: lang === 'he' ? "'Frank Ruhl Libre', serif" : "'JetBrains Mono', monospace" }}>
      {t(lang, m.he, m.en)}
      {dashed && <span className="ml-1 text-[10px]">{t(lang, '· מדרבנן', "· d'rabbanan")}</span>}
    </span>
  );
}

// Build a Sefaria URL from a Hebrew ref. Direct link for Chumash pesukim,
// search fallback for mishnah/gemara/rambam/etc.
function sefariaUrl(refStr) {
  const books = {
    'בראשית': 'Genesis', 'שמות': 'Exodus', 'ויקרא': 'Leviticus',
    'במדבר': 'Numbers', 'דברים': 'Deuteronomy',
  };
  const gemValues = {
    'א':1,'ב':2,'ג':3,'ד':4,'ה':5,'ו':6,'ז':7,'ח':8,'ט':9,
    'י':10,'כ':20,'ל':30,'מ':40,'נ':50,'ס':60,'ע':70,'פ':80,'צ':90,
    'ק':100,'ר':200,'ש':300,'ת':400,
    'ך':20,'ם':40,'ן':50,'ף':80,'ץ':90,
  };
  const gem = (s) => [...s.replace(/[״׳"'`]/g,'').trim()]
    .reduce((a,c)=>a+(gemValues[c]||0),0);

  // "BOOK CHAPTER, VERSE" or "BOOK CHAPTER, V1-V2"
  const m = refStr.match(/^([א-ת]+)\s+([א-ת״׳"']+),\s*([א-ת״׳"']+)(?:\s*[-–]\s*([א-ת״׳"']+))?/);
  if (m) {
    const [, heBook, heChap, heV1, heV2] = m;
    const enBook = books[heBook];
    if (enBook) {
      const ch = gem(heChap);
      const v1 = gem(heV1);
      if (ch > 0 && v1 > 0) {
        const v2 = heV2 ? gem(heV2) : null;
        return `https://www.sefaria.org/${enBook}.${ch}.${v1}${v2 && v2 > 0 ? '-' + v2 : ''}?lang=bi`;
      }
    }
  }
  return `https://www.sefaria.org/search?q=${encodeURIComponent(refStr)}`;
}

function SourceLine({ s }) {
  const lang = useLang();
  const kindLabels = {
    pasuk: { he: 'פָּסוּק', en: 'Pasuk' },
    mishnah: { he: 'מִשְׁנָה', en: 'Mishnah' },
    gemara: { he: 'גְּמָרָא', en: 'Gemara' },
    rambam: { he: 'רַמְבַּ"ם', en: 'Rambam' },
    sifra: { he: 'תּוֹרַת כֹּהֲנִים', en: 'Toras Kohanim' },
    sifrei: { he: 'סִפְרֵי', en: 'Sifrei' },
    ref: { he: 'הַפְנָיָה', en: 'Ref' },
  };
  const kl = kindLabels[s.kind] || { he: s.kind, en: s.kind };
  const url = sefariaUrl(s.ref);
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block text-[12px] text-stone-700 -mx-1 px-1 py-0.5 rounded hover:bg-stone-900/5 transition-colors group"
    >
      <div className="flex items-baseline gap-2 flex-wrap">
        <span className="uppercase tracking-wider text-stone-500 text-[10px] font-mono min-w-[90px]">
          {t(lang, kl.he, kl.en)}
        </span>
        <span className="text-stone-800 group-hover:text-stone-950 group-hover:underline decoration-stone-400 underline-offset-2" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>{s.ref}</span>
      </div>
      {s.text && (
        <div className="mt-1 pl-[100px] text-stone-700 italic leading-relaxed" style={{ fontFamily: "'Frank Ruhl Libre', serif", direction: 'rtl', textAlign: 'right', fontSize: '14px' }}>
          {s.text}
        </div>
      )}
    </a>
  );
}

function DetailRow({ label, children }) {
  const lang = useLang();
  return (
    <div className="grid grid-cols-[110px_1fr] gap-4 items-start" style={{ direction: lang === 'he' ? 'rtl' : 'ltr' }}>
      <div className="text-[10px] uppercase tracking-[0.15em] text-stone-500 pt-0.5 font-mono">{label}</div>
      <div>{children}</div>
    </div>
  );
}

function NodeCard({ node, expanded, onToggle, activeMods, toggleMod }) {
  const lang = useLang();
  const meta = LEVEL_META[node.level] || LEVEL_META.special;

  return (
    <div
      className={`relative bg-[#fdf9f0] border border-stone-300/70 transition-all duration-300 ${expanded ? 'shadow-[0_8px_32px_rgba(60,40,20,0.12)]' : 'hover:shadow-[0_4px_16px_rgba(60,40,20,0.08)]'}`}
      style={{ borderRadius: '2px' }}
    >
      <div className={`absolute ${lang === 'he' ? 'right-0' : 'left-0'} top-0 bottom-0 w-1 ${meta.bar}`} />

      <div className={`px-5 py-4 ${lang === 'he' ? 'pr-6' : 'pl-6'}`}>
        <button onClick={onToggle} className="w-full text-left" style={{ direction: lang === 'he' ? 'rtl' : 'ltr' }}>
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <div className="font-mono text-[10px] text-stone-500 tracking-widest uppercase mb-1">{node.id}</div>
              <div className="flex items-baseline gap-3 flex-wrap">
                <span className="text-2xl font-semibold text-stone-900" style={{ fontFamily: "'Frank Ruhl Libre', serif", direction: 'rtl' }}>
                  {node.he}
                </span>
                {lang === 'en' && (
                  <span className="text-sm text-stone-600 italic" style={{ fontFamily: "'Fraunces', serif" }}>{node.en}</span>
                )}
              </div>
              <p className="text-[14px] text-stone-700 mt-1.5 leading-relaxed" style={{ fontFamily: lang === 'he' ? "'Frank Ruhl Libre', serif" : "'Fraunces', serif", direction: lang === 'he' ? 'rtl' : 'ltr' }}>
                {t(lang, node.desc.he, node.desc.en)}
              </p>
            </div>
            <ChevronDown className={`w-4 h-4 text-stone-400 shrink-0 mt-1 transition-transform ${expanded ? 'rotate-180' : ''}`} />
          </div>
        </button>

        <div className="flex items-center gap-2 mt-3 flex-wrap">
          <LevelBadge level={node.level} />
          {node.mod && node.mod.map((m) => (
            <ModalityChip key={m} id={m} active={false} onClick={toggleMod} />
          ))}
          {node.modRab && node.modRab.map((m) => (
            <ModalityChipDisplay key={m} id={m} dashed />
          ))}
        </div>
      </div>

      {expanded && (
        <div className={`px-6 pb-5 pt-1 border-t border-stone-200/80 bg-gradient-to-b from-[#fdf9f0] to-[#f9f2e3]`}>
          <div className="grid gap-4 mt-4" style={{ fontFamily: lang === 'he' ? "'Frank Ruhl Libre', serif" : "'Fraunces', serif" }}>

            {node.mod && node.mod.length > 0 && (
              <DetailRow label={t(lang, 'דַּרְכֵי טֻמְאָה', 'Modalities')}>
                <div className="flex flex-wrap gap-1.5">
                  {node.mod.map((m) => <ModalityChip key={m} id={m} active={false} onClick={toggleMod} />)}
                  {node.modRab && node.modRab.map((m) => <ModalityChipDisplay key={m} id={m} dashed />)}
                </div>
              </DetailRow>
            )}

            {node.creates && node.creates.length > 0 && (
              <DetailRow label={t(lang, 'דִּינֵי הַטֻּמְאָה', 'Propagation Rules')}>
                <div className="space-y-1.5">
                  {node.creates.map((c, i) => (
                    <div key={i} className="text-[14px] text-stone-800">
                      <span className="font-medium">{t(lang, c.on.he, c.on.en)}</span>
                      {(c.res.he || c.res.en) && <span className="text-stone-600"> → {t(lang, c.res.he, c.res.en)}</span>}
                    </div>
                  ))}
                </div>
              </DetailRow>
            )}

            {node.reach && (
              <DetailRow label={t(lang, 'הֶקֵּף הַטֻּמְאָה', 'Reach')}>
                <div className="text-[14px] text-stone-800 leading-relaxed">
                  {t(lang, node.reach.he, node.reach.en)}
                </div>
              </DetailRow>
            )}

            {node.shiur && (
              <DetailRow label={t(lang, 'שִׁעוּר', 'Shiur')}>
                <div className="text-[14px] text-stone-800">{t(lang, node.shiur.he, node.shiur.en)}</div>
              </DetailRow>
            )}

            {node.rules && node.rules.length > 0 && (
              <DetailRow label={t(lang, 'דִּינִים', 'Rules')}>
                <ul className="space-y-1.5">
                  {node.rules.map((r, i) => (
                    <li key={i} className="text-[14px] text-stone-800 flex gap-2">
                      <span className={`shrink-0 w-1 h-1 rounded-full ${meta.dot} mt-2`} />
                      <span>{t(lang, r.he, r.en)}</span>
                    </li>
                  ))}
                </ul>
              </DetailRow>
            )}

            {node.oraisa && (
              <DetailRow label={t(lang, 'מִדְּאוֹרַיְתָא', "D'oraisa")}>
                <div className="text-[14px] text-stone-800">{t(lang, node.oraisa.he, node.oraisa.en)}</div>
              </DetailRow>
            )}

            {node.purif && (
              <DetailRow label={t(lang, 'טָהֳרָה', 'Purification')}>
                <div className="text-[14px] text-stone-800">{t(lang, node.purif.he, node.purif.en)}</div>
              </DetailRow>
            )}

            {node.sources && node.sources.length > 0 && (
              <DetailRow label={t(lang, 'מְקוֹרוֹת', 'Sources')}>
                <div className="flex flex-col gap-2.5">
                  {node.sources.map((s, i) => <SourceLine key={i} s={s} />)}
                </div>
              </DetailRow>
            )}

          </div>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════

function TumahTreeInner() {
  const lang = useLang();
  const [cat, setCat] = useState('all');
  const [search, setSearch] = useState('');
  const [expanded, setExpanded] = useState(null);
  const [activeMods, setActiveMods] = useState([]);

  const toggleMod = (id) => {
    setActiveMods(prev => prev.includes(id) ? prev.filter(m => m !== id) : [...prev, id]);
  };

  const filtered = useMemo(() => {
    return DATA.filter(n => {
      if (cat !== 'all' && n.cat !== cat) return false;
      if (activeMods.length > 0) {
        if (!n.mod || !activeMods.every(m => n.mod.includes(m))) return false;
      }
      if (search) {
        const s = search.toLowerCase();
        return n.he.includes(search) || n.en.toLowerCase().includes(s) || n.id.toLowerCase().includes(s) ||
          n.desc.en.toLowerCase().includes(s) || n.desc.he.includes(search);
      }
      return true;
    });
  }, [cat, search, activeMods]);

  const counts = useMemo(() => {
    const c = { all: DATA.length };
    DATA.forEach(n => { c[n.cat] = (c[n.cat] || 0) + 1; });
    return c;
  }, []);

  const filterableMods = Object.keys(MODALITIES).filter(m => !['rechifa', 'structural', 'process'].includes(m));

  return (
    <div className={`min-h-screen bg-[#f5efe3]`} style={{ fontFamily: lang === 'he' ? "'Frank Ruhl Libre', serif" : "'Fraunces', serif", direction: lang === 'he' ? 'rtl' : 'ltr' }}>
      <div className="relative max-w-6xl mx-auto px-6 py-8">

        {/* Header */}
        <header className="mb-10 pb-8 border-b-2 border-stone-800/30">
          <div className="flex items-center justify-between mb-6">
            <div className="text-[10px] tracking-[0.3em] text-stone-500 uppercase font-mono">
              {t(lang, 'אִילָן א · מְקוֹרוֹת הַטֻּמְאָה', 'Tree A · Sources of Tumah')}
            </div>
            <LanguageToggle />
          </div>

          <div className="text-center" style={{ direction: 'rtl' }}>
            <div className="text-[11px] tracking-[0.25em] text-stone-500 uppercase font-mono mb-2" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
              {t(lang, 'אֲבִי אֲבוֹת · אָבוֹת · תּוֹלָדוֹת', 'Av Avos · Avos · Toldos')}
            </div>
            <h1 className="text-5xl md:text-6xl font-medium text-stone-900 leading-none tracking-tight mb-3" style={{ fontFamily: "'Frank Ruhl Libre', serif" }}>
              מְקוֹרוֹת הַטֻּמְאָה
            </h1>
            {lang === 'en' && (
              <h2 className="text-xl text-stone-600 italic font-light" style={{ fontFamily: "'Fraunces', serif", direction: 'ltr' }}>
                Mekoros HaTumah · Sources of Tumah
              </h2>
            )}
          </div>

          <div className="flex items-center justify-center mt-6 gap-4 text-[11px] font-mono text-stone-500 uppercase tracking-wider flex-wrap">
            <span>{DATA.length} {t(lang, 'צְמָתִים', 'Nodes')}</span>
            <span className="text-stone-400">·</span>
            <span>{t(lang, 'זְמַן הַמִּקְדָּשׁ', 'Mikdash-Era')}</span>
            <span className="text-stone-400">·</span>
            <span>{t(lang, 'לְכַתְּחִלָּה כְּהָרַמְבַּ"ם', 'Default: Rambam')}</span>
          </div>
        </header>

        {/* Search */}
        <div className="mb-4 relative">
          <Search className={`absolute ${lang === 'he' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 w-4 h-4 text-stone-400`} strokeWidth={1.5} />
          <input
            type="text"
            placeholder={t(lang, 'חיפוש — עברית, אנגלית, סימן', 'Search — Hebrew, English, node ID')}
            value={search}
            onChange={e => setSearch(e.target.value)}
            className={`w-full ${lang === 'he' ? 'pr-12 pl-4' : 'pl-12 pr-4'} py-3 bg-[#fdf9f0] border border-stone-300/70 text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-500 transition-colors text-sm`}
            style={{ fontFamily: lang === 'he' ? "'Frank Ruhl Libre', serif" : "'Fraunces', serif", borderRadius: '2px', direction: lang === 'he' ? 'rtl' : 'ltr' }}
          />
        </div>

        {/* Category filter */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {CATEGORIES.map(c => {
            const active = cat === c.id;
            const count = counts[c.id] || 0;
            return (
              <button
                key={c.id}
                onClick={() => setCat(c.id)}
                className={`flex items-center gap-2 px-3.5 py-2 border transition-all text-sm ${
                  active ? 'bg-stone-900 text-stone-50 border-stone-900' : 'bg-[#fdf9f0] text-stone-700 border-stone-300/70 hover:border-stone-500'
                }`}
                style={{ borderRadius: '2px' }}
              >
                <span style={{ fontFamily: "'Frank Ruhl Libre', serif" }} className="text-base">{c.he}</span>
                {lang === 'en' && c.id !== 'all' && (
                  <span className="text-[11px] tracking-wider opacity-75" style={{ fontFamily: "'Fraunces', serif" }}>{c.en}</span>
                )}
                <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${active ? 'bg-stone-700' : 'bg-stone-200'}`}>{count}</span>
              </button>
            );
          })}
        </div>

        {/* Modality filter bar */}
        <div className="mb-4 p-3 bg-[#fdf9f0]/60 border border-stone-300/50" style={{ borderRadius: '2px' }}>
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-[10px] uppercase tracking-[0.15em] text-stone-500 font-mono mr-2">
              {t(lang, 'לְפִי דֶּרֶךְ טֻמְאָה', 'Filter by modality')}:
            </span>
            {filterableMods.map(m => (
              <ModalityChip key={m} id={m} active={activeMods.includes(m)} onClick={toggleMod} />
            ))}
            {activeMods.length > 0 && (
              <button
                onClick={() => setActiveMods([])}
                className="inline-flex items-center gap-1 text-[11px] text-stone-500 hover:text-stone-800 ml-2"
              >
                <X className="w-3 h-3" /> {t(lang, 'הָסֵר', 'Clear')}
              </button>
            )}
          </div>
        </div>

        {/* Nodes */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-stone-500">
              <Scroll className="w-10 h-10 mx-auto mb-3 opacity-40" strokeWidth={1} />
              <div className="text-sm italic">{t(lang, 'אֵין צְמָתִים הָעוֹנִים לַסִּנּוּן', 'No nodes match the current filter')}</div>
            </div>
          ) : (
            filtered.map(node => (
              <NodeCard
                key={node.id}
                node={node}
                expanded={expanded === node.id}
                onToggle={() => setExpanded(expanded === node.id ? null : node.id)}
                activeMods={activeMods}
                toggleMod={toggleMod}
              />
            ))
          )}
        </div>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-stone-400/40">
          <div className="grid md:grid-cols-2 gap-8" style={{ direction: lang === 'he' ? 'rtl' : 'ltr' }}>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-stone-500 mb-2 font-mono">
                {t(lang, 'שְׁאֵלוֹת לְעִיּוּן', 'Open Questions')}
              </div>
              <ul className="space-y-1.5 text-[14px] text-stone-700">
                <li>← {t(lang, 'A11 לעומת A6 (מצורע שנטמא במת קודם לכן)', 'A11 vs A6 (metzora who became tamei meis before)')}</li>
                <li>← {t(lang, 'D7 דם טוהר — מה מותר בהם', 'D7 dam tohar — permitted activities')}</li>
                <li>← {t(lang, 'G1 ע"ז — דאורייתא או דרבנן', "G1 avodah zara — d'oraisa or d'rabbanan")}</li>
                <li>← {t(lang, 'F3 היקף — לעיון או למעשה', 'F3 scope: document or practical')}</li>
                <li>← {t(lang, 'C1 זיהוי מיני השרצים', 'C1 species identification')}</li>
              </ul>
            </div>
            <div>
              <div className="text-[11px] uppercase tracking-[0.2em] text-stone-500 mb-2 font-mono">
                {t(lang, 'עִקָּרֵי הַפְּסִיקָה', 'Established Rulings')}
              </div>
              <ul className="space-y-1.5 text-[14px] text-stone-700">
                <li>✓ {t(lang, 'הרגשה — מוּנחת כַּנּוֹכֶחֶת', 'Hargasha — assumed present')}</li>
                <li>✓ {t(lang, 'כתמים — מדרבנן', "Kesamim — d'rabbanan")}</li>
                <li>✓ {t(lang, 'חומרא דר\' זירא — אופציה', "Chumra d'Rabbi Zeira — optional")}</li>
                <li>✓ {t(lang, 'דאורייתא בלבד — אופציה', "D'oraisa-only view — optional")}</li>
                <li>✓ {t(lang, 'עם הארץ ונכרי — בחזקת טמאים', "Am ha'aretz + nachri — presumed tamei")}</li>
                <li>✓ {t(lang, 'רמב"ם לכתחילה', 'Rambam default psak')}</li>
              </ul>
            </div>
          </div>
          <div className="mt-8 text-center text-[11px] text-stone-400 font-mono tracking-widest uppercase">
            · {t(lang, 'אילן א\' מתוך ה\' · הבא: דרכי מגע', 'Tree A of E · Next: Contact Modalities')} ·
          </div>
        </footer>
      </div>
    </div>
  );
}

function LanguageToggle() {
  const { lang, setLang } = useLangCtx();
  return (
    <button
      onClick={() => setLang(lang === 'he' ? 'en' : 'he')}
      className="flex items-center gap-2 px-3 py-1.5 bg-[#fdf9f0] border border-stone-300/70 hover:border-stone-500 transition-colors text-stone-700 text-xs font-mono uppercase tracking-widest"
      style={{ borderRadius: '2px' }}
    >
      <Globe className="w-3.5 h-3.5" strokeWidth={1.5} />
      {lang === 'he' ? 'EN' : 'עב'}
    </button>
  );
}

function TumahTreeA() {
  const [lang, setLang] = useState('he');

  return (
    <LangContext.Provider value={{ lang, setLang }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,300;9..144,400;9..144,500;9..144,600;9..144,700&family=Frank+Ruhl+Libre:wght@400;500;700;900&family=JetBrains+Mono:wght@400;500&display=swap');
        body { background: #f5efe3; }
      `}</style>
      <TumahTreeInner />
    </LangContext.Provider>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(TumahTreeA));
