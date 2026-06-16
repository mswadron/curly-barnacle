/* ============================================================================
   CHAGAVIM — Kosher Locusts of Chullin 65 / Leviticus 11
   Source-verified data layer.  window.CHAGAVIM_DATA
   ----------------------------------------------------------------------------
   SOURCING DISCIPLINE
   - badge "direct"   : verbatim primary text, Sefaria reference attached.
   - badge "lexicon"  : factual lexical datum reported by a dictionary
                        (Klein / Jastrow) with Sefaria reference. Presented as
                        a plain descriptive statement ("Klein lists…").
   - badge "descript" : plain descriptive / observational statement, no source claim.
   - research: complete | partial | not_started
   No paraphrase is ever attributed to Chazal as if it were their wording.
   No halakhic conclusion is asserted beyond what the cited text states.
   ============================================================================ */

window.CHAGAVIM_DATA = {

  meta: {
    title:   { he: "חֲגָבִים טְהוֹרִים", se: "Ḥagavim Ṭehorim", en: "Kosher Locusts" },
    sugya:   { he: "חולין ס״ה.–ס״ה:", se: "Ḥullin 65a–65b", en: "Chullin 65a–65b" },
    verse:   { he: "ויקרא י״א, כ׳–כ״ג", se: "Vayikra 11:20–23", en: "Leviticus 11:20–23" },
    note_se: "Sephardic transliteration follows classical pronunciation (ḥ = ח, ṭ = ט, q = ק).",
  },

  /* ----------------------------------------------------------------- VERSES */
  verses: [
    {
      ref: "Leviticus 11:21",
      sefaria: "https://www.sefaria.org/Leviticus.11.21",
      badge: "direct", research: "complete",
      he: "אַ֤ךְ אֶת־זֶה֙ תֹּֽאכְל֔וּ מִכֹּל֙ שֶׁ֣רֶץ הָע֔וֹף הַהֹלֵ֖ךְ עַל־אַרְבַּ֑ע אֲשֶׁר־[ל֤וֹ] כְרָעַ֙יִם֙ מִמַּ֣עַל לְרַגְלָ֔יו לְנַתֵּ֥ר בָּהֵ֖ן עַל־הָאָֽרֶץ׃",
      se: "Akh et-zeh tokhelu mikol sheretz ha‘of haholekh ‘al-arba‘, asher [lo] khera‘ayim mima‘al le-raglav, lenatter bahen ‘al-ha’aretz.",
      en: "Yet these may you eat among all the winged swarming things that walk on fours: those that have jointed legs above their feet, with which to leap upon the ground.",
      tag: { he: "סִימַן הַנִּתּוּר", se: "siman ha-nittur", en: "the leaping-leg sign" },
    },
    {
      ref: "Leviticus 11:22",
      sefaria: "https://www.sefaria.org/Leviticus.11.22",
      badge: "direct", research: "complete",
      he: "אֶת־אֵ֤לֶּה מֵהֶם֙ תֹּאכֵ֔לוּ אֶת־הָֽאַרְבֶּ֣ה לְמִינ֔וֹ וְאֶת־הַסׇּלְעָ֖ם לְמִינֵ֑הוּ וְאֶת־הַחַרְגֹּ֣ל לְמִינֵ֔הוּ וְאֶת־הֶחָגָ֖ב לְמִינֵֽהוּ׃",
      se: "Et-eleh mehem tokhelu: et-ha’arbeh leminó, ve’et-hasol‘am leminehú, ve’et-haḥargol leminehú, ve’et-heḥagav leminehú.",
      en: "These of them you may eat: the arbeh after its kind, the sol‘am after its kind, the ḥargol after its kind, and the ḥagav after its kind.",
      tag: { he: "אַרְבָּעָה מִינִים", se: "the four named kinds", en: "the four named kinds" },
    },
    {
      ref: "Leviticus 11:23",
      sefaria: "https://www.sefaria.org/Leviticus.11.23",
      badge: "direct", research: "complete",
      he: "וְכֹל֙ שֶׁ֣רֶץ הָע֔וֹף אֲשֶׁר־ל֖וֹ אַרְבַּ֣ע רַגְלָ֑יִם שֶׁ֥קֶץ ה֖וּא לָכֶֽם׃",
      se: "Vekhol sheretz ha‘of asher-lo arba‘ raglayim, sheqetz hu lakhem.",
      en: "But all other winged swarming things that have four legs are an abomination to you.",
      tag: { he: "סְיָג", se: "the exclusion", en: "the exclusion" },
    },
  ],

  /* ----------------------------------------------------------------- MISHNAH */
  mishnah: {
    ref: "Mishnah Chullin 3:7",
    sefaria: "https://www.sefaria.org/Mishnah_Chullin.3.7",
    badge: "direct", research: "complete",
    he: "וּבַחֲגָבִים, כֹּל שֶׁיֶּשׁ לוֹ אַרְבַּע רַגְלַיִם, וְאַרְבַּע כְּנָפַיִם, וְקַרְסֻלַּיִם, וּכְנָפָיו חוֹפִין אֶת רֻבּוֹ. רַבִּי יוֹסֵי אוֹמֵר, וּשְׁמוֹ חָגָב.",
    se: "Uvaḥagavim, kol sheyesh lo arba‘ raglayim, ve’arba‘ kenafayim, veqarsullayim, ukhenafav ḥofin et rubbo. Rabbi Yosei omer: ushemo ḥagav.",
    en: "And concerning locusts: any that has four legs, four wings, jointed [jumping] legs, and whose wings cover most of it. Rabbi Yosei says: and its name is ḥagav.",
  },

  /* --------------------------------------------- THE FOUR TORAH-NAMED KINDS */
  /* talmudName_65a vs talmudName_65b are recorded SEPARATELY because the two
     beraitot disagree on which vernacular name maps to sol‘am vs ḥargol.
     See cruxes[0]. We do not silently harmonise them. */
  torahTypes: [
    {
      id: "arbeh",
      torahName: { he: "אַרְבֶּה", se: "arbeh", en: "arbeh" },
      talmudName_65a: { he: "גּוֹבַאי", se: "govai", en: "govai" },
      talmudName_65b: null, // unchanged in 65b
      sign: {
        he: "אֵין לוֹ גַּבַּחַת וְאֵין לוֹ זָנָב",
        se: "ein lo gabaḥat ve’ein lo zanav",
        en: "no smooth forehead, no tail",
        badge: "direct", ref: "Chullin 65b",
        sefaria: "https://www.sefaria.org/Chullin.65b",
      },
      source: {
        he: "אַרְבֶּה – זֶה גּוֹבַאי",
        se: "arbeh — zeh govai",
        en: "“arbeh” — this is the govai",
        badge: "direct", ref: "Chullin 65a:9",
        sefaria: "https://www.sefaria.org/Chullin.65a.9",
      },
      etymology: [
        { badge: "lexicon", ref: "Klein Dictionary, אַרְבֶּה",
          sefaria: "https://www.sefaria.org/Klein_Dictionary%2C_%D7%90%D6%B7%D7%A8%D6%B0%D7%91%D6%B6%D6%BC%D7%94",
          lang: "Akkadian", forms: "āribu · ēribu · erbū",
          text_en: "Klein lists Akkadian cognates āribu / ēribu / erbū (= locust) and Ugaritic ʾrby; he relates arbeh to the base meaning ‘to multiply’ or ‘to devastate.’" },
        { badge: "lexicon", ref: "Jastrow, גּוֹבַאי",
          sefaria: "https://www.sefaria.org/Jastrow%2C_%D7%92%D6%BC%D7%95%D6%B9%D7%91%D6%B7%D7%90%D7%99",
          lang: "for govai", forms: "גּוֹב / גִּבֵּחַ",
          text_en: "Jastrow glosses govai as ‘the hump-backed,’ comparing גּוֹב and גִּבֵּחַ, and cites Berakhot 6:3 and Shabbat 32b." },
      ],
      research: "complete",
    },
    {
      id: "solam",
      torahName: { he: "סָלְעָם", se: "sol‘am", en: "sol‘am" },
      talmudName_65a: { he: "רָשׁוֹן", se: "rashon", en: "rashon" },
      talmudName_65b: { he: "נִיפּוּל", se: "nippul", en: "nippul" },  // the swap
      sign: {
        he: "יֵשׁ לוֹ גַּבַּחַת וְאֵין לוֹ זָנָב",
        se: "yesh lo gabaḥat ve’ein lo zanav",
        en: "has a smooth forehead, no tail",
        badge: "direct", ref: "Chullin 65b:2",
        sefaria: "https://www.sefaria.org/Chullin.65b.2",
      },
      source: {
        he: "סַלְעָם – זֶה רָשׁוֹן  ‖  [ס״ה:]  סׇלְעָם – זֶה נִיפּוּל",
        se: "65a: sal‘am — zeh rashon  ‖  65b: sol‘am — zeh nippul",
        en: "65a: “sol‘am” — this is the rashon  ‖  65b: “sol‘am” — this is the nippul",
        badge: "direct", ref: "Chullin 65a:9 ; 65b:2",
        sefaria: "https://www.sefaria.org/Chullin.65b.2",
      },
      etymology: [
        { badge: "lexicon", ref: "Klein Dictionary, סָלְעָם",
          sefaria: "https://www.sefaria.org/Klein_Dictionary%2C_%D7%A1%D6%B8%D7%9C%D6%B0%D7%A2%D6%B8%D7%9D",
          lang: "etymology", forms: "—",
          text_en: "Klein records sol‘am as a biblical hapax (Lev. 11:22) ‘of uncertain origin.’" },
        { badge: "lexicon", ref: "Jastrow, רָשׁוֹן",
          sefaria: "https://www.sefaria.org/Jastrow%2C_%D7%A8%D6%B8%D7%A9%D7%95%D6%B9%D7%9F",
          lang: "for rashon", forms: "רשש",
          text_en: "Jastrow derives rashon from רשש, identifies it with biblical sol‘am, and notes that Chullin 65b instead reads ḥargol = rashon." },
      ],
      research: "complete",
    },
    {
      id: "hargol",
      torahName: { he: "חַרְגֹּל", se: "ḥargol", en: "ḥargol" },
      talmudName_65a: { he: "נִיפּוּל", se: "nippul", en: "nippul" },
      talmudName_65b: { he: "רָשׁוֹן", se: "rashon", en: "rashon" },  // the swap
      sign: {
        he: "יֵשׁ לוֹ גַּבַּחַת וְיֵשׁ לוֹ זָנָב",
        se: "yesh lo gabaḥat veyesh lo zanav",
        en: "has a smooth forehead and a tail",
        badge: "direct", ref: "Chullin 65b",
        sefaria: "https://www.sefaria.org/Chullin.65b",
      },
      source: {
        he: "חַרְגּוֹל – זֶה נִיפּוּל  ‖  [ס״ה:]  חַרְגֹּל – זֶה רָשׁוֹן",
        se: "65a: ḥargol — zeh nippul  ‖  65b: ḥargol — zeh rashon",
        en: "65a: “ḥargol” — this is the nippul  ‖  65b: “ḥargol” — this is the rashon",
        badge: "direct", ref: "Chullin 65a:9 ; 65b:3",
        sefaria: "https://www.sefaria.org/Chullin.65b.3",
      },
      etymology: [
        { badge: "lexicon", ref: "Klein Dictionary, חַרְגּוֹל",
          sefaria: "https://www.sefaria.org/Klein_Dictionary%2C_%D7%97%D6%B7%D7%A8%D6%B0%D7%92%D6%BC%D7%95%D6%B9%D7%9C",
          lang: "Aramaic / Arabic", forms: "חַרְגְּלָא · ḥarjala",
          text_en: "Klein relates ḥargol to Aramaic-Syriac ḥargela (= locust) and Arabic ḥarjala (= a swarm of locusts; also ‘to run swiftly, run right and left’); modern Hebrew applies it to Tettigonia viridissima." },
      ],
      research: "complete",
    },
    {
      id: "hagav",
      torahName: { he: "חָגָב", se: "ḥagav", en: "ḥagav" },
      talmudName_65a: { he: "נַדְיָאן", se: "nadyan", en: "nadyan / gadyan" },
      talmudName_65b: null,
      sign: {
        he: "רֹאשׁוֹ אָרוֹךְ",
        se: "rosho arokh",
        en: "long-headed (per the binyan-av; see derivation)",
        badge: "direct", ref: "Chullin 65b:5",
        sefaria: "https://www.sefaria.org/Chullin.65b.5",
      },
      source: {
        he: "חָגָב – זֶה נַדְיָאן",
        se: "ḥagav — zeh nadyan",
        en: "“ḥagav” — this is the nadyan",
        badge: "direct", ref: "Chullin 65a:9",
        sefaria: "https://www.sefaria.org/Chullin.65a.9",
      },
      etymology: [
        { badge: "lexicon", ref: "Klein Dictionary, חָגָב",
          sefaria: "https://www.sefaria.org/Klein_Dictionary%2C_%D7%97%D6%B8%D7%92%D6%B8%D7%91",
          lang: "etymology", forms: "JAram. חָגְבָא",
          text_en: "Klein groups ḥagav with Jewish-Aramaic ḥagva and marks it ‘of unknown origin.’" },
      ],
      variant_note: {
        en: "The vocalised Aramaic of Chullin 65a reads נַדְיָאן (nadyan); the Koren–Davidson English and Rashi read גַּדְיָאן (gadyan). Both forms preserved.",
        ref: "Chullin 65a:9 ; Rashi on Chullin 65a:9",
        badge: "direct",
      },
      research: "complete",
    },
  ],

  /* ------------------------ EXTRA KOSHER SPECIES BROUGHT BY “לְמִינֵהוּ” */
  /* Each fourfold "after its kind" includes one further species (65a), and the
     65b beraita derives additional ones. Rashi assigns each to a parent type. */
  extraSpecies: [
    {
      id: "tziporet",
      name: { he: "צִיפּוֹרֶת כְּרָמִים", se: "tzipporet keramim", en: "tzipporet keramim (‘vineyard bird’)" },
      parent: "arbeh",
      source: { he: "לְהָבִיא צִיפּוֹרֶת כְּרָמִים", se: "lehavi tzipporet keramim",
        en: "to include the tzipporet keramim", badge: "direct", ref: "Chullin 65a:9 / 65b:1",
        sefaria: "https://www.sefaria.org/Chullin.65b.1" },
      rashi: { he: "מִין אַרְבֶּה דְּאֵין לוֹ גַּבַּחַת", se: "min arbeh de’ein lo gabaḥat",
        en: "a kind of arbeh, having no smooth forehead", badge: "direct",
        ref: "Rashi on Chullin 65a:9", sefaria: "https://www.sefaria.org/Rashi_on_Chullin.65a.9" },
      etymology_status: "name only — no established cognate located in Klein/Jastrow",
      research: "partial",
    },
    {
      id: "yochana",
      name: { he: "יוֹחָנָא יְרוּשַׁלְמִית", se: "yoḥana yerushalmit", en: "Jerusalem yoḥana" },
      parent: "solam",
      source: { he: "וְיוֹחָנָא יְרוּשַׁלְמִית", se: "veyoḥana yerushalmit",
        en: "and the Jerusalem yoḥana", badge: "direct", ref: "Chullin 65a:9",
        sefaria: "https://www.sefaria.org/Chullin.65a.9" },
      rashi: { he: "מִין סַלְעָם דְּיֵשׁ לוֹ גַּבַּחַת", se: "min sal‘am deyesh lo gabaḥat",
        en: "a kind of sol‘am, having a smooth forehead", badge: "direct",
        ref: "Rashi on Chullin 65a:9", sefaria: "https://www.sefaria.org/Rashi_on_Chullin.65a.9" },
      etymology_status: "name only — no established cognate located in Klein/Jastrow",
      research: "partial",
    },
    {
      id: "artzuvya",
      name: { he: "הָעַרְצוּבְיָא", se: "ha‘artzuvya", en: "artzuvya" },
      parent: "hargol",
      source: { he: "וְהָעַרְצוּבְיָא", se: "veha‘artzuvya",
        en: "and the artzuvya", badge: "direct", ref: "Chullin 65a:9",
        sefaria: "https://www.sefaria.org/Chullin.65a.9" },
      rashi: { he: "מִין חַרְגּוֹל דְּיֵשׁ לוֹ זָנָב", se: "min ḥargol deyesh lo zanav",
        en: "a kind of ḥargol, having a tail", badge: "direct",
        ref: "Rashi on Chullin 65a:9", sefaria: "https://www.sefaria.org/Rashi_on_Chullin.65a.9" },
      etymology_status: "name only — no established cognate located in Klein/Jastrow",
      research: "partial",
    },
    {
      id: "razbanit",
      name: { he: "הָרַזְבָּנִית", se: "harazbanit", en: "razbanit" },
      parent: "hagav",
      source: { he: "וְהָרַזְבָּנִית", se: "veharazbanit",
        en: "and the razbanit", badge: "direct", ref: "Chullin 65a:9",
        sefaria: "https://www.sefaria.org/Chullin.65a.9" },
      rashi: { he: "מִין חָגָב וְאֵינוֹ דּוֹמֶה לְאֵלּוּ בְּמַרְאֶה", se: "min ḥagav ve’eino domeh la’elu bemar’eh",
        en: "a kind of ḥagav, not resembling these in appearance", badge: "direct",
        ref: "Rashi on Chullin 65a:9", sefaria: "https://www.sefaria.org/Rashi_on_Chullin.65a.9" },
      etymology_status: "name only — no established cognate located in Klein/Jastrow",
      research: "partial",
    },
    {
      id: "ushkaf",
      name: { he: "הָאוּשְׁכָּף", se: "ha’ushkaf", en: "ushkaf" },
      parent: "solam",
      source: { he: "לְמִינֵהוּ – לְהָבִיא אֶת הָאוּשְׁכָּף", se: "leminehu — lehavi et ha’ushkaf",
        en: "“after its kind” — to include the ushkaf (smooth-foreheaded, like sol‘am)", badge: "direct",
        ref: "Chullin 65b:2", sefaria: "https://www.sefaria.org/Chullin.65b.2" },
      etymology_status: "name only — no established cognate located in Klein/Jastrow",
      research: "partial",
    },
    {
      id: "karsefet",
      name: { he: "הַכַּרְסֶפֶת", se: "hakarsefet", en: "karsefet" },
      parent: "hargol",
      source: { he: "לְמִינֵהוּ – לְהָבִיא אֶת הַכַּרְסֶפֶת וְאֶת הַשַּׁחֲלָנִית", se: "leminehu — lehavi et hakarsefet ve’et hashaḥlanit",
        en: "“after its kind” — to include the karsefet and the shaḥlanit (tailed, like ḥargol)", badge: "direct",
        ref: "Chullin 65b:3", sefaria: "https://www.sefaria.org/Chullin.65b.3" },
      etymology_status: "name only — no established cognate located in Klein/Jastrow",
      research: "partial",
    },
    {
      id: "shachlanit",
      name: { he: "הַשַּׁחֲלָנִית", se: "hashaḥlanit", en: "shaḥlanit" },
      parent: "hargol",
      source: { he: "וְאֶת הַשַּׁחֲלָנִית", se: "ve’et hashaḥlanit",
        en: "and the shaḥlanit", badge: "direct", ref: "Chullin 65b:3",
        sefaria: "https://www.sefaria.org/Chullin.65b.3" },
      etymology_status: "name only — no established cognate located in Klein/Jastrow",
      research: "partial",
    },
  ],

  /* ------------------------------------------------------------ THE SIGNS */
  simanim: {
    base: [ // from the verse + Mishnah — required of every kosher locust
      { id: "raglayim", he: "אַרְבַּע רַגְלַיִם", se: "arba‘ raglayim", en: "four [walking] legs",
        badge: "direct", ref: "Mishnah Chullin 3:7", sefaria: "https://www.sefaria.org/Mishnah_Chullin.3.7" },
      { id: "kenafayim", he: "אַרְבַּע כְּנָפַיִם", se: "arba‘ kenafayim", en: "four wings",
        badge: "direct", ref: "Mishnah Chullin 3:7", sefaria: "https://www.sefaria.org/Mishnah_Chullin.3.7" },
      { id: "karsulayim", he: "קַרְסֻלַּיִם", se: "qarsullayim", en: "jointed jumping legs (above the feet)",
        badge: "direct", ref: "Mishnah Chullin 3:7 ; Lev. 11:21", sefaria: "https://www.sefaria.org/Mishnah_Chullin.3.7" },
      { id: "rubo", he: "כְּנָפָיו חוֹפִין אֶת רֻבּוֹ", se: "kenafav ḥofin et rubbo", en: "wings covering most of it",
        badge: "direct", ref: "Mishnah Chullin 3:7", sefaria: "https://www.sefaria.org/Mishnah_Chullin.3.7",
        gemara: { he: "בָּעֵינַן רוֹב אׇרְכּוֹ וּבָעֵינַן רוֹב הֶקֵּיפוֹ", se: "ba‘inan rov orko uva‘inan rov heqefo",
          en: "Rav Pappa: both most of its length and most of its circumference are required",
          ref: "Chullin 65a:7", sefaria: "https://www.sefaria.org/Chullin.65a.7", badge: "direct" } },
      { id: "shem", he: "וּשְׁמוֹ חָגָב", se: "ushemo ḥagav", en: "its name is ḥagav",
        badge: "direct", ref: "Mishnah Chullin 3:7 (R. Yosei) ; Chullin 65b:6",
        sefaria: "https://www.sefaria.org/Chullin.65b.6",
        note_en: "Per the beraita, the name requirement excludes the tzartzur even though it bears all four physical signs." },
    ],
    derived: [ // the three distinguishing features the klal-prat-klal works through
      { id: "gabachat", he: "גַּבַּחַת", se: "gabaḥat", en: "smooth (bald) forehead",
        badge: "direct", ref: "Chullin 65b:2", sefaria: "https://www.sefaria.org/Chullin.65b.2" },
      { id: "zanav", he: "זָנָב", se: "zanav", en: "tail",
        badge: "direct", ref: "Chullin 65b:3", sefaria: "https://www.sefaria.org/Chullin.65b.3" },
      { id: "roshArokh", he: "רֹאשׁוֹ אָרוֹךְ", se: "rosho arokh", en: "long head",
        badge: "direct", ref: "Chullin 65b:4–10", sefaria: "https://www.sefaria.org/Chullin.65b.4" },
    ],
  },

  /* ------------------------------------------------------ NON-KOSHER LOOK-ALIKE */
  excluded: {
    id: "tzartzur",
    name: { he: "צַרְצוּר", se: "tzartzur", en: "tzartzur" },
    source: {
      he: "וַהֲלֹא הַצַּרְצוּר הַזֶּה יֵשׁ לוֹ אַרְבַּע רַגְלַיִם וְאַרְבַּע כְּנָפַיִם וְקַרְצוּלַּיִם וּכְנָפָיו חוֹפִין אֶת רוּבּוֹ… תַּלְמוּד לוֹמַר ״חָגָב״ שֶׁשְּׁמוֹ חָגָב",
      se: "vahalo hatzartzur hazeh yesh lo arba‘ raglayim ve’arba‘ kenafayim veqartzullayim ukhenafav ḥofin et rubbo… talmud lomar ‘ḥagav’ shesh’mo ḥagav",
      en: "Though this tzartzur has four legs, four wings, jumping legs, and wings covering most of it — the verse says “ḥagav,” [teaching] that its name must be ḥagav.",
      badge: "direct", ref: "Chullin 65b:6", sefaria: "https://www.sefaria.org/Chullin.65b.6",
    },
    point_en: "The tzartzur is the proof case that the four physical signs alone are insufficient: a creature bearing all of them is still excluded because its name is not ḥagav.",
    etymology_status: "name only — no established cognate located in Klein/Jastrow",
    research: "complete",
  },

  /* ----------------------------------------------- DERIVATION (klal-prat-klal) */
  derivation: {
    title: { he: "כְּלָל וּפְרָט וּכְלָל / בִּנְיַן אָב", se: "Klal–prat–klal & binyan av", en: "How the four kinds generate the rule" },
    steps: [
      { stage: "klal", he: "אֲשֶׁר לוֹ כְרָעַיִם… לְנַתֵּר", en: "General clause: jointed legs for leaping (v.21).",
        ref: "Leviticus 11:21", sefaria: "https://www.sefaria.org/Leviticus.11.21", badge: "direct" },
      { stage: "prat", he: "אַרְבֶּה, סָלְעָם, חַרְגֹּל, חָגָב", en: "Four named details (v.22).",
        ref: "Leviticus 11:22", sefaria: "https://www.sefaria.org/Leviticus.11.22", badge: "direct" },
      { stage: "klal", he: "לְמִינוֹ … לְמִינֵהוּ (×4)", en: "Repeated ‘after its kind’ — a second general clause that includes look-alikes.",
        ref: "Chullin 65a:9", sefaria: "https://www.sefaria.org/Chullin.65a.9", badge: "direct" },
      { stage: "binyan-av",
        he: "הַצַּד הַשָּׁוֶה: אַרְבַּע רַגְלַיִם, אַרְבַּע כְּנָפַיִם, קַרְצוּלַּיִם, כְּנָפָיו חוֹפִין אֶת רוּבּוֹ",
        en: "The school of R. Yishmael: the three differ from one another (forehead, tail), so their common denominator — four legs, four wings, jumping legs, wings covering most — is the operative rule; even a long-headed locust qualifies.",
        ref: "Chullin 65b:5", sefaria: "https://www.sefaria.org/Chullin.65b.5", badge: "direct" },
      { stage: "rav-achai",
        he: "אָמַר רַב אַחַאי: סָלְעָם יַתִּירָא הוּא… תְּנֵהוּ עִנְיָן לְרֹאשׁוֹ אָרוֹךְ",
        en: "Rav Aḥai: sol‘am is textually redundant for its own derivation, so it is applied to teach that a long-headed locust is kosher.",
        ref: "Chullin 65b:10", sefaria: "https://www.sefaria.org/Chullin.65b.10", badge: "direct" },
    ],
  },

  /* ------------------------------------------ FULL BERAISOS (verbatim) */
  /* The two beraisos the whole sugya rests on, quoted in full (William Davidson /
     Torat Emet), instead of the one-line fragments used on the cards. */
  beraisos: {
    title: { he: "הַבָּרַיְתוֹת בִּשְׁלֵמוּתָן", se: "The full beraisos", en: "The beraisos in full" },
    intro: {
      he: "אֵלּוּ שְׁתֵּי הַבָּרַיְתוֹת שֶׁכָּל הַסּוּגְיָא נִבְנֵית עֲלֵיהֶן — בְּחולין ס״ה. (הַשֵּׁמוֹת) וּבְחולין ס״ה: (בֵּית רַבִּי יִשְׁמָעֵאל) — מוּבָאוֹת כָּאן בִּשְׁלֵמוּתָן, לֹא בִּקְטָעִים.",
      en: "The two beraisos the entire sugya is built on — Chullin 65a (the vernacular names) and Chullin 65b (the school of R. Yishmael) — quoted here in full rather than as the one-line fragments shown on the cards.",
    },
    items: [
      {
        id: "b65a", label: { he: "בָּרַיְתָא ס״ה. — אַרְבַּעַת הַשֵּׁמוֹת וּ׳לְמִינֵהוּ׳", se: "65a — the four names", en: "65a — the four names & 'after its kind'" },
        ref: "Chullin 65a:9", sefaria: "https://www.sefaria.org/Chullin.65a.9", badge: "direct",
        he: "תָּנוּ רַבָּנַן: ״אֶת אֵלֶּה מֵהֶם תֹּאכֵלוּ אֶת הָאַרְבֶּה וְגוֹ׳״. אַרְבֶּה – זֶה גּוֹבַאי, סַלְעָם – זֶה רָשׁוֹן, חַרְגּוֹל – זֶה נִיפּוּל, חָגָב – זֶה נַדְיָאן. מָה תַּלְמוּד לוֹמַר ״לְמִינוֹ״ ״לְמִינֵהוּ״ ״לְמִינֵהוּ״ ״לְמִינֵהוּ״ אַרְבַּע פְּעָמִים? לְהָבִיא צִיפּוֹרֶת כְּרָמִים, וְיוֹחָנָא יְרוּשַׁלְמִית, וְהָעַרְצוּבְיָא, וְהָרַזְבָּנִית.",
        en: "The Sages taught: 'These of them you may eat: the arbeh after its kinds…' The arbeh is the govai; the sol'am is the rashon; the ḥargol is the nippul; the ḥagav is the gadyan. Why does the verse say 'after its kinds' four times? To include four similar species: the vineyard bird (tzipporet keramim), the Jerusalem yoḥana, the artzuveya, and the razbanit — which are also kosher.",
      },
      {
        id: "pappa", label: { he: "רַב פָּפָּא — רוֹב אֹרֶךְ וְרוֹב הֶקֵּף", se: "Rav Pappa", en: "Rav Pappa — length & circumference" },
        ref: "Chullin 65a:7", sefaria: "https://www.sefaria.org/Chullin.65a.7", badge: "direct",
        he: "מַאי רוּבּוֹ? אָמַר רַב יְהוּדָה אָמַר רַב: רוֹב אׇרְכּוֹ, וְאָמְרִי לַהּ: רוֹב הֶקֵּיפוֹ. אָמַר רַב פָּפָּא: הִלְכָּךְ בָּעֵינַן רוֹב אׇרְכּוֹ, וּבָעֵינַן רוֹב הֶקֵּיפוֹ.",
        en: "What is 'most of it'? Rav Yehuda said in the name of Rav: most of its length; others say: most of its circumference. Rav Pappa said: therefore we require both — most of its length and most of its circumference.",
      },
      {
        id: "b65b2", label: { he: "בֵּית ר׳ יִשְׁמָעֵאל — גַּבַּחַת: סָלְעָם=נִיפּוּל", se: "65b — smooth forehead", en: "65b — smooth forehead (sol'am = nippul)" },
        ref: "Chullin 65b:2", sefaria: "https://www.sefaria.org/Chullin.65b.2", badge: "direct",
        he: "אֵין לִי אֶלָּא הַבָּא וְאֵין לוֹ גַּבַּחַת. הַבָּא וְיֵשׁ לוֹ גַּבַּחַת מִנַּיִן? תַּלְמוּד לוֹמַר ״סׇלְעָם״ – זֶה נִיפּוּל, ״לְמִינֵהוּ״ – לְהָבִיא אֶת הָאוּשְׁכָּף.",
        en: "I have derived only one that has no smooth forehead. One that has a smooth forehead — from where? The verse says 'sol'am' — this is the nippul (which has a smooth forehead); and 'after its kind' includes the ushkaf.",
      },
      {
        id: "b65b3", label: { he: "זָנָב: חַרְגּוֹל=רָשׁוֹן", se: "65b — tail", en: "65b — tail (ḥargol = rashon)" },
        ref: "Chullin 65b:3", sefaria: "https://www.sefaria.org/Chullin.65b.3", badge: "direct",
        he: "וְאֵין לִי אֶלָּא הַבָּא וְאֵין לוֹ גַּבַּחַת. הַבָּא וְיֵשׁ לוֹ גַּבַּחַת, הַבָּא וְאֵין לוֹ זָנָב, הַבָּא וְיֵשׁ לוֹ זָנָב מִנַּיִן? תַּלְמוּד לוֹמַר ״חַרְגֹּל״ – זֶה רָשׁוֹן, ״לְמִינֵהוּ״ – לְהָבִיא אֶת הַכַּרְסֶפֶת וְאֶת הַשַּׁחֲלָנִית.",
        en: "And I have only those without a tail. One that has a tail — from where? The verse says 'ḥargol' — this is the rashon (which has a tail); and 'after its kind' includes the karsefet and the shaḥlanit.",
      },
      {
        id: "b65b4", label: { he: "רֹאשׁ אָרוֹךְ — מִנַּיִן?", se: "65b — long head", en: "65b — the long-headed question" },
        ref: "Chullin 65b:4", sefaria: "https://www.sefaria.org/Chullin.65b.4", badge: "direct",
        he: "וְאֵין לִי אֶלָּא הַבָּא וְאֵין לוֹ גַּבַּחַת, הַבָּא וְיֵשׁ לוֹ גַּבַּחַת, הַבָּא וְאֵין לוֹ זָנָב, הַבָּא וְיֵשׁ לוֹ זָנָב, הַבָּא וְאֵין רֹאשׁוֹ אָרוֹךְ, הַבָּא וְרֹאשׁוֹ אָרוֹךְ מִנַּיִן?",
        en: "And I have only those without a smooth forehead, with one, without a tail, with a tail, and without a long head. One whose head is long — from where?",
      },
      {
        id: "b65b5", label: { he: "בִּנְיַן אָב — הַצַּד הַשָּׁוֶה", se: "65b — binyan av", en: "65b — the common denominator" },
        ref: "Chullin 65b:5", sefaria: "https://www.sefaria.org/Chullin.65b.5", badge: "direct",
        he: "אָמַרְתָּ: הֲרֵי אַתָּה דָן בִּנְיַן אָב מִשְּׁלׇשְׁתָּן, לֹא רְאִי אַרְבֶּה כִּרְאִי חַרְגּוֹל, וְלֹא רְאִי חַרְגּוֹל כִּרְאִי אַרְבֶּה, וְלֹא רְאִי שְׁנֵיהֶם כִּרְאִי סׇלְעָם, וְלֹא רְאִי סׇלְעָם כִּרְאִי שְׁנֵיהֶם. הַצַּד הַשָּׁוֶה שֶׁבָּהֶן – שֶׁיֵּשׁ לוֹ אַרְבַּע רַגְלַיִם, וְאַרְבַּע כְּנָפַיִם, וְקַרְצוּלַּיִם, וּכְנָפָיו חוֹפִין אֶת רוּבּוֹ; אַף כֹּל שֶׁיֵּשׁ לוֹ אַרְבַּע רַגְלַיִם, וְאַרְבַּע כְּנָפַיִם, וְקַרְצוּלַּיִם, וּכְנָפָיו חוֹפִין אֶת רוּבּוֹ.",
        en: "You derive a binyan av (paradigm) from the three: the arbeh is unlike the ḥargol, the ḥargol unlike the arbeh, and neither is like the sol'am. Their common denominator is four legs, four wings, jumping legs, and wings covering most of the body — so too any species with these is kosher, even if its head is long.",
      },
      {
        id: "b65b6", label: { he: "הַצַּרְצוּר — ׳וּשְׁמוֹ חָגָב׳", se: "65b — the tzartzur", en: "65b — the tzartzur & the name" },
        ref: "Chullin 65b:6", sefaria: "https://www.sefaria.org/Chullin.65b.6", badge: "direct",
        he: "וַהֲלֹא הַצַּרְצוּר הַזֶּה יֵשׁ לוֹ אַרְבַּע רַגְלַיִם, וְאַרְבַּע כְּנָפַיִם, וְקַרְצוּלַּיִם, וּכְנָפָיו חוֹפִין אֶת רוּבּוֹ, יָכוֹל יְהֵא מוּתָּר? תַּלְמוּד לוֹמַר ״חָגָב״, שֶׁשְּׁמוֹ חָגָב.",
        en: "But this tzartzur has four legs, four wings, jumping legs, and wings covering most of its body — might it be permitted? The verse says 'ḥagav' — [only one] whose name is ḥagav. (This includes all the species above, but not the tzartzur.)",
      },
      {
        id: "b65b7", label: { he: "עַד שֶׁיְּהֵא בּוֹ כָּל הַסִּימָנִין", se: "65b — all signs required", en: "65b — name plus all signs" },
        ref: "Chullin 65b:7", sefaria: "https://www.sefaria.org/Chullin.65b.7", badge: "direct",
        he: "אִי שְׁמוֹ חָגָב, יָכוֹל אֵין בּוֹ כׇּל הַסִּימָנִין הַלָּלוּ? תַּלְמוּד לוֹמַר ״לְמִינֵהוּ״ – עַד שֶׁיְּהֵא בּוֹ כׇּל הַסִּימָנִין הַלָּלוּ. (סוֹף בָּרַיְתָא דְּבֵי רַבִּי יִשְׁמָעֵאל)",
        en: "But if its name is ḥagav, might it be kosher even without all these signs? The verse says 'after its kind' — it is not kosher unless it has all these signs. (End of the beraisa of the school of R. Yishmael.)",
      },
      {
        id: "achai", label: { he: "רַב אַחַאי — סָלְעָם יַתִּירָא → רֹאשׁ אָרוֹךְ", se: "Rav Aḥai", en: "Rav Aḥai — the redundant sol'am" },
        ref: "Chullin 65b:10", sefaria: "https://www.sefaria.org/Chullin.65b.10", badge: "direct",
        he: "אֶלָּא אָמַר רַב אַחַאי: סׇלְעָם יַתִּירָא הוּא, לָא לִיכְתּוֹב רַחֲמָנָא ״סׇלְעָם״, וְתֵיתֵי מֵאַרְבֶּה וּמֵחַרְגּוֹל… אִם אֵינוֹ עִנְיָן לְגוּפוֹ – תְּנֵהוּ עִנְיָן לְרֹאשׁוֹ אָרוֹךְ.",
        en: "Rather Rav Aḥai said: 'sol'am' is redundant — it could have been derived from the arbeh and ḥargol together. If it is not needed for its own matter, apply it to the long-headed locust, to teach that it too is kosher.",
      },
    ],
    rashi: {
      ref: "Rashi on Chullin 65a:9", sefaria: "https://www.sefaria.org/Rashi_on_Chullin.65a.9",
      he: "רשון ניפול גדיאן יוחנא ירושלמית - כך שמם: צפורת כרמים - מין ארבה דאין לו גבחת. יוחנא - מין סלעם דיש לו גבחת. ערצוביא - מין חרגול דיש לו זנב, ולשנים הראשונים אין זנב. הרזבנית - מין חגב ואינו דומה לאלו במראה.",
      note: { he: "רש״י (חולין ס״ה. ובס״ה:) מְפָרֵשׁ אֶת הַשֵּׁמוֹת וּמְצַיֵּן בְּעַצְמוֹ אֶת הַחִילּוּף: ׳הָא אֲמַרַן לְעֵיל סָלְעָם הוּא רָשׁוֹן, וְהָכָא מְפָרֵשׁ לֵיהּ זֶה נִיפּוּל׳ (רש״י ס״ה: ד״ה ת״ל).", en: "Rashi glosses each vernacular name, and himself flags the 65a/65b reversal: 'we said above sol'am is rashon, yet here it is explained as nippul' (Rashi 65b)." },
    },
  },

  /* ------------------------------------------ MISC. PRIMARY-TEXT FRAGMENTS */
  extras: [
    { id: "zachal",
      he: "אֵין לוֹ עַכְשָׁיו וְעָתִיד לְגַדֵּל לְאַחַר זְמַן כְּגוֹן הַזַּחַל – מוּתָּר… מַאי זַחַל? אָמַר אַבָּיֵי: אַסְקְרָא",
      se: "ein lo ‘akhshav ve‘atid legaddel le’aḥar zeman kegon hazaḥal — muttar… mai zaḥal? amar Abaye: asqera",
      en: "A locust lacking [wings/legs] now that will grow them later — e.g. the zaḥal — is permitted. What is the zaḥal? Abaye: the asqera (Aramaic name).",
      badge: "direct", ref: "Chullin 65a:8", sefaria: "https://www.sefaria.org/Chullin.65a.8",
      rashi: { he: "זַחַל – מִין חָגָב בִּלְשׁוֹן אֲרַמִּי", en: "Rashi: zaḥal — a kind of locust in Aramaic.",
        ref: "Rashi on Chullin 65a:8", sefaria: "https://www.sefaria.org/Rashi_on_Chullin.65a.8", badge: "direct" } },
  ],

  /* ------------------------------------------------------------------ MEDIA */
  /* All images: Wikimedia Commons, served via Special:FilePath (original-safe,
     no /thumb 404). Captions state ONLY what the image depicts; no image is
     captioned as a positive identification of an unidentified Talmudic min. */
  media: {
    desertLocust: {
      file: "Afrikanische Wanderheuschrecke (Schistocerca gregaria), Costa Calma, Fuerteventura (41464223162).jpg",
      kind: "photo",
      credit: "Wikimedia Commons / Charles J. Sharp (CC BY-SA)",
      page: "https://commons.wikimedia.org/wiki/Category:Schistocerca_gregaria",
      caption: { he: "אַרְבֶּה הַמִּדְבָּר (Schistocerca gregaria)", se: "Desert locust — Schistocerca gregaria",
        en: "Desert locust (Schistocerca gregaria) — the species with a documented continuous Yemenite eating-tradition; commonly identified with the arbeh." },
      tie: "arbeh", honesty: "tradition-based identification, not a Talmudic claim",
    },
    bushCricket: {
      file: "Tettigonia viridissima (Tettigoniidae) (Great Green Bush Cricket) - (female imago), Arnhem, the Netherlands - 2.jpg",
      kind: "photo",
      credit: "Wikimedia Commons / Bj.schoenmakers (CC0)",
      page: "https://commons.wikimedia.org/wiki/Category:Tettigonia_viridissima",
      caption: { he: "חַרְגּוֹל יָרֹק גָּדוֹל (Tettigonia viridissima)", se: "Great green bush-cricket — Tettigonia viridissima",
        en: "Great green bush-cricket (Tettigonia viridissima) — the insect Klein's dictionary assigns to ḥargol in modern Hebrew usage. Note its long ovipositor (a ‘tail’)." },
      tie: "hargol", honesty: "modern Hebrew lexical assignment (Klein), not a Talmudic claim",
    },
    head: {
      file: "Grasshopper-head.jpg",
      kind: "photo",
      credit: "Wikimedia Commons (CC BY 2.5)",
      page: "https://commons.wikimedia.org/wiki/File:Grasshopper-head.jpg",
      caption: { he: "רֹאשׁ הֶחָגָב — הַמֵּצַח וְהָעֵינַיִם", se: "Head of an orthopteran",
        en: "Head of an orthopteran. The smoothness or texture of the forehead region is the feature the sugya calls gabaḥat." },
      tie: "gabachat", honesty: "general anatomy",
    },
    wing: {
      file: "Right Wing of Othoptera (Unidentified Grasshopper) (21777070111).jpg",
      kind: "photo",
      credit: "Wikimedia Commons (CC0)",
      page: "https://commons.wikimedia.org/wiki/Category:Orthoptera_anatomy",
      caption: { he: "כָּנָף שֶׁל חָגָב", se: "Wing of an unidentified grasshopper",
        en: "Wing of a grasshopper. A kosher locust must have four wings that cover most of its length and circumference." },
      tie: "kenafayim", honesty: "general anatomy",
    },
    plate: {
      file: "48-Indian-Insect-Life - Harold Maxwell-Lefroy - Orthoptera.jpg",
      kind: "drawing",
      credit: "H. Maxwell-Lefroy, Indian Insect Life (1909), via Wikimedia Commons (PD)",
      page: "https://commons.wikimedia.org/wiki/Category:Orthoptera_anatomy",
      caption: { he: "לוּחַ אוֹרְתּוֹפְּטֶרָה — ציור עתיק", se: "Orthoptera plate, Indian Insect Life (1909)",
        en: "Historical plate of Orthoptera (locusts, grasshoppers, crickets) from Maxwell-Lefroy’s Indian Insect Life, 1909." },
      tie: "general", honesty: "historical illustration",
    },
  },

  /* -------------------------------------------------- SCHOLARLY CRUXES / NOTES */
  cruxes: [
    {
      id: "name-swap",
      title: { he: "חִילּוּף הַשֵּׁמוֹת ס״ה. / ס״ה:", se: "The 65a / 65b name reversal", en: "The 65a / 65b name reversal" },
      body_en: "The two beraitot identify sol‘am and ḥargol with opposite vernacular names. " +
               "Chullin 65a: sol‘am = rashon, ḥargol = nippul. " +
               "Chullin 65b (school of R. Yishmael): sol‘am = nippul (smooth forehead), ḥargol = rashon (has a tail). " +
               "Both are reproduced verbatim above; the app does not pick a winner. Jastrow (s.v. רָשׁוֹן) flags the same divergence.",
      refs: ["Chullin 65a:9", "Chullin 65b:2", "Chullin 65b:3", "Jastrow, רָשׁוֹן"],
      badge: "direct",
    },
    {
      id: "nadyan-gadyan",
      title: { he: "נַדְיָאן / גַּדְיָאן", se: "nadyan vs. gadyan", en: "nadyan vs. gadyan" },
      body_en: "ḥagav’s vernacular name appears as נַדְיָאן in the vocalised Aramaic and as גַּדְיָאן in Rashi and the Koren–Davidson English. Recorded as a spelling variant, not resolved.",
      refs: ["Chullin 65a:9", "Rashi on Chullin 65a:9"],
      badge: "direct",
    },
  ],

  /* ------------------------------------------------------ OPEN DECISIONS (footer) */
  openDecisions: [
    "Should the default name-mapping shown on each card follow 65a or 65b? (Currently both are shown side by side.)",
    "Do you want the Sifra Shemini (Parashah 3, ch. 5) parallel pulled in as a primary source alongside the Bavli beraita?",
    "For the rare lemino species (tzipporet keramim, yoḥana, artzuvya, razbanit, ushkaf, karsefet, shaḥlanit, tzartzur) the lexica give no clean cognate — leave as ‘name only,’ or attempt a deeper search (Tosefta, Yerushalmi, Arukh)?",
    "Include a live ‘siman checker’ diagnostic (toggle the 4 base signs + 3 derived features → kosher/not), or keep it reference-only like the bird app?",
    "Should modern entomological identifications (e.g. Tettigonia viridissima for ḥargol) appear, clearly badged as lexicon/modern, or be omitted to avoid implying a halakhic mesorah on species ID?",
  ],

  /* ============================================================================
     CHAGAVIM ACROSS SHAS — every place locusts surface in the Mishnah/Talmud
     OUTSIDE the Chullin 65 identification sugya. All text verbatim from Sefaria
     (Torat Emet / William Davidson), each with a segment-level ref + link.
     ========================================================================== */
  talmud: {
    title: { he: "בְּכָל הַשַּׁ״ס", se: "Across Shas", en: "Chagavim Across the Talmud" },
    intro: {
      he: "מִלְּבַד סוּגְיַת הַזִּהוּי בְּחולין ס״ה, הֶחָגָב מוֹפִיעַ בְּכַמָּה מְקוֹמוֹת בַּמִּשְׁנָה וּבַתַּלְמוּד — בִּבְרָכָה, בִּשְׁחִיטָה, בְּצִיר, בִּרְפוּאָה וּבְעֵרוּב.",
      en: "Beyond the identification sugya of Chullin 65, the locust surfaces across the Mishnah and Talmud — in the laws of blessings, slaughter, brine, idolatry-suspicion, and even folk medicine. Each passage below is verbatim with a Sefaria link.",
    },
    sugyot: [
      {
        id: "bracha",
        topic: { he: "בִּרְכַּת שֶׁהַכֹּל", se: "The blessing", en: "The blessing over locusts" },
        he: "עַל הַחֹמֶץ וְעַל הַנּוֹבְלוֹת וְעַל הַגּוֹבַאי אוֹמֵר שֶׁהַכֹּל.",
        en: "And over vinegar, over novelot (spoiled dates), and over locusts, one recites: she-hakol nihyeh bidvaro (by whose word all things came to be).",
        badge: "direct", research: "complete",
        ref: "Mishnah Berakhot 6:3", sefaria: "https://www.sefaria.org/Mishnah_Berakhot.6.3",
        note_en: "The Mishnah's word for locust here is govai — the same vernacular name the Chullin beraita gives for the arbeh. The blessing is she-hakol, the all-purpose blessing.",
        note_he: "לְשׁוֹן הַמִּשְׁנָה כָּאן ׳גּוֹבַאי׳ — הוּא שֵׁם הָאַרְבֶּה בַּבָּרַיְתָא דְּחולין. הַבְּרָכָה: שֶׁהַכֹּל נִהְיֶה בִּדְבָרוֹ.",
      },
      {
        id: "no-shechita",
        topic: { he: "אֵינָם טְעוּנִים שְׁחִיטָה", se: "No sheḥitah", en: "Eaten without slaughter" },
        he: "דַּם דָּגִים דַּם חֲגָבִים – שֶׁכּוּלּוֹ הֶיתֵּר.",
        en: "The blood of fish and the blood of locusts — for it is entirely permitted.",
        badge: "direct", research: "complete",
        ref: "Keritot 21a", sefaria: "https://www.sefaria.org/Keritot.21a.1",
        note_en: "Locusts, like fish, are eaten with no sheḥitah, and even their blood carries no prohibition. The slaughter-exemption is derived for fish from 'or if all the fish of the sea be gathered for them' (Chullin 27b) — mere gathering suffices — and locusts are grouped together with fish.",
        note_he: "חֲגָבִים כְּדָגִים נֶאֱכָלִים בְּלֹא שְׁחִיטָה, וְאַף דָּמָם מֻתָּר. פְּטוֹר הַשְּׁחִיטָה נִלְמָד בְּדָגִים מִ׳אִם אֶת כָּל דְּגֵי הַיָּם יֵאָסֵף לָהֶם׳ (חולין כז ע״ב) — אֲסִיפָה בְּעָלְמָא דַּיָּהּ — וַחֲגָבִים בִּכְלָלָם.",
      },
      {
        id: "mesorah",
        topic: { he: "וּשְׁמוֹ חָגָב — מָסֹרֶת", se: "The name / mesorah", en: "The name requirement → mesorah" },
        he: "רַבִּי יוֹסֵי אוֹמֵר, וּשְׁמוֹ חָגָב.",
        en: "Rabbi Yosei says: and this applies only if the name of its species is ḥagav.",
        badge: "direct", research: "complete",
        ref: "Mishnah Chullin 3:7", sefaria: "https://www.sefaria.org/Mishnah_Chullin.3.7",
        note_en: "From this name-requirement the later authorities (Rosh on Chullin ch. 3; Shulḥan Arukh YD 85:1) rule that a locust may be eaten only where a continuous tradition (mesorah) holds the species kosher. This is why most communities no longer eat locusts, while Yemenite Jews, who preserved such a tradition, still do. — The 'mesorah' framing is from these later authorities, not an explicit line of the Gemara.",
        note_he: "מִדְּרִישַׁת הַשֵּׁם לָמְדוּ הָאַחֲרוֹנִים (רֹא״שׁ חולין פֶּרֶק ג; שׁוּלְחָן עָרוּךְ יו״ד פ״ה) שֶׁאֵין אוֹכְלִין חָגָב אֶלָּא בְּמָקוֹם שֶׁיֵּשׁ מָסֹרֶת שֶׁהַמִּין כָּשֵׁר. לְפִיכָךְ רֹב הַקְּהִלּוֹת אֵינָן אוֹכְלוֹת חֲגָבִים, וְהַתֵּימָנִים שֶׁשָּׁמְרוּ מָסֹרֶת — אוֹכְלִים. עִנְיַן הַ׳מָּסֹרֶת׳ מִן הָאַחֲרוֹנִים, וְלֹא מַאֲמָר מְפֹרָשׁ בַּגְּמָרָא.",
        note_badge: "descript",
      },
      {
        id: "brine",
        topic: { he: "צִיר חֲגָבִים", se: "Locust brine", en: "Brine of locusts" },
        he: "הֵעִיד רַבִּי צָדוֹק עַל צִיר חֲגָבִים טְמֵאִים, שֶׁהוּא טָהוֹר.",
        en: "Rabbi Zadok testified concerning the brine of non-kosher locusts that it is pure (permitted).",
        badge: "direct", research: "complete",
        ref: "Mishnah Eduyot 7:2", sefaria: "https://www.sefaria.org/Mishnah_Eduyot.7.2",
        note_en: "Unlike the brine of non-kosher fish, the liquid exuded by even non-kosher locusts conveys no prohibition — a testimony (eidut) recorded in the name of R. Zadok.",
        note_he: "שֶׁלֹּא כְּצִיר דָּגִים טְמֵאִים, הַנּוֹזֵל מֵחֲגָבִים טְמֵאִים אֵינוֹ אוֹסֵר — עֵדוּת מִשּׁוּם רַבִּי צָדוֹק.",
      },
      {
        id: "storehouse",
        topic: { he: "חֲגָבִים מִן הַשּׁוּק", se: "From the vendor", en: "Locusts from a vendor" },
        he: "הַחֲגָבִים הַבָּאִים מִן הַסְּלוּלָה, אֲסוּרִין. מִן הַהַפְתֵּק, מֻתָּרִין. וְכֵן לִתְרוּמָה.",
        en: "Locusts that come from a salesman's basket are prohibited; those that come from the storeroom (heftek) are permitted; and likewise for teruma.",
        badge: "direct", research: "complete",
        ref: "Mishnah Avodah Zarah 2:7", sefaria: "https://www.sefaria.org/Mishnah_Avodah_Zarah.2.7",
        note_en: "Locusts displayed loose in a gentile vendor's basket are forbidden — they may have been sprinkled with wine to preserve them — but those drawn from the bulk storeroom are permitted.",
        note_he: "חֲגָבִים הַמּוּנָּחִים בְּסַל הַמּוֹכֵר הַגּוֹי — אֲסוּרִין, שֶׁמָּא רֻסְּסוּ בְּיַיִן; אֲבָל הַבָּאִים מִן הָאוֹצָר — מֻתָּרִין.",
      },
      {
        id: "chargol-remedy",
        topic: { he: "בֵּיצַת הַחַרְגּוֹל", se: "The ḥargol egg", en: "The ḥargol egg (folk remedy)" },
        he: "יוֹצְאִין בְּבֵיצַת הַחַרְגּוֹל וּבְשֵׁן שׁוּעָל וּבְמַסְמֵר מִן הַצָּלוּב מִשּׁוּם רְפוּאָה, דִּבְרֵי רַבִּי מֵאִיר. וַחֲכָמִים אוֹמְרִים, אַף בְּחֹל אָסוּר מִשּׁוּם דַּרְכֵי הָאֱמוֹרִי.",
        en: "One may go out on Shabbat with a ḥargol-locust egg, a fox's tooth, and a nail from a gallows, for healing — the words of Rabbi Meir. The Sages forbid these even on a weekday, as the ways of the Amorite.",
        badge: "direct", research: "complete",
        ref: "Mishnah Shabbat 6:10", sefaria: "https://www.sefaria.org/Mishnah_Shabbat.6.10",
        note_en: "The ḥargol — one of the Torah's four kosher kinds — appears here outside the food laws entirely: its egg was carried as an amulet against earache. R. Meir permits it on Shabbat; the Sages forbid it as darkhei ha-Emori (superstition).",
        note_he: "הַחַרְגּוֹל — אֶחָד מֵאַרְבַּעַת הַמִּינִים — מוֹפִיעַ כָּאן מִחוּץ לְדִינֵי אֲכִילָה: בֵּיצָתוֹ נִשֵּׂאת כִּסְגֻלָּה לִכְאֵב אֹזֶן. רַבִּי מֵאִיר מַתִּיר בְּשַׁבָּת; חֲכָמִים אוֹסְרִים אַף בְּחֹל מִשּׁוּם דַּרְכֵי הָאֱמוֹרִי.",
      },
    ],
  },

  /* ============================================================================
     THE LOCUST ACROSS TANAKH & LITURGY — non-halachic appearances (imagery,
     narrative, prayer). Verbatim: Miqra al pi haMesorah / JPS; Hoshana from the
     Ashkenaz siddur. Separate from the kashrut material on purpose.
     ========================================================================== */
  tanach: {
    title: { he: "הֶחָגָב בַּמִּקְרָא", se: "Locust in Tanakh", en: "The Locust Across Tanakh" },
    intro: {
      he: "מִחוּץ לְדִינֵי הַכַּשְׁרוּת, הֶחָגָב וְהָאַרְבֶּה מוֹפִיעִים בַּמִּקְרָא כְּדִמּוּי לְקַטְנוּת וּלְחֻלְשָׁה, וּכְמַכָּה — וְאַף בַּהוֹשַׁעְנוֹת.",
      en: "Outside the dietary laws, the chagav and arbeh appear throughout Scripture as images of smallness and frailty, and as a devastating plague — and even in the Hoshanot.",
    },
    groups: [
      { cat: { he: "תּוֹרָה", en: "Torah" }, items: [
        { id: "spies", label: { he: "הַמְּרַגְּלִים — כַּחֲגָבִים", en: "The spies — 'like grasshoppers'" }, word: "חֲגָבִים",
          ref: "Numbers 13:33", sefaria: "https://www.sefaria.org/Numbers.13.33",
          he: "וְשָׁם רָאִינוּ אֶת־הַנְּפִילִים בְּנֵי עֲנָק מִן־הַנְּפִלִים וַנְּהִי בְעֵינֵינוּ כַּחֲגָבִים וְכֵן הָיִינוּ בְּעֵינֵיהֶם׃",
          en: "There we saw the Nephilim… and we looked like grasshoppers (ka-chagavim) to ourselves, and so we must have looked to them.",
          gist_en: "The spies' self-image before the giants — the locust as the very picture of insignificance." },
        { id: "arbeh-plague", label: { he: "מַכַּת אַרְבֶּה", en: "The plague of locusts" }, word: "אַרְבֶּה",
          ref: "Exodus 10:14", sefaria: "https://www.sefaria.org/Exodus.10.14",
          he: "וַיַּעַל הָאַרְבֶּה עַל כׇּל־אֶרֶץ מִצְרַיִם וַיָּנַח בְּכֹל גְּבוּל מִצְרָיִם כָּבֵד מְאֹד לְפָנָיו לֹא־הָיָה כֵן אַרְבֶּה כָּמֹהוּ וְאַחֲרָיו לֹא יִהְיֶה־כֵּן׃",
          en: "Locusts (arbeh) invaded all the land of Egypt… never before had there been so many, nor will there ever be so many again.",
          gist_en: "The eighth plague — the arbeh, one of the four kosher kinds, as an instrument of judgment." },
      ]},
      { cat: { he: "נְבִיאִים", en: "Prophets" }, items: [
        { id: "isaiah", label: { he: "כַּחֲגָבִים יוֹשְׁבֵי הָאָרֶץ", en: "Inhabitants like grasshoppers" }, word: "חֲגָבִים",
          ref: "Isaiah 40:22", sefaria: "https://www.sefaria.org/Isaiah.40.22",
          he: "הַיֹּשֵׁב עַל־חוּג הָאָרֶץ וְיֹשְׁבֶיהָ כַּחֲגָבִים הַנּוֹטֶה כַדֹּק שָׁמַיִם וַיִּמְתָּחֵם כָּאֹהֶל לָשָׁבֶת׃",
          en: "It is God enthroned above the vault of the earth, so that its inhabitants seem as grasshoppers (ka-chagavim)…",
          gist_en: "Divine transcendence: from above, humanity appears as tiny grasshoppers." },
        { id: "amos", label: { he: "חֲזוֹן הַגֹּבַי", en: "Amos's locust vision (govai)" }, word: "גֹּבַי",
          ref: "Amos 7:1", sefaria: "https://www.sefaria.org/Amos.7.1",
          he: "כֹּה הִרְאַנִי אֲדֹנָי יֱהֹוִה וְהִנֵּה יוֹצֵר גֹּבַי בִּתְחִלַּת עֲלוֹת הַלָּקֶשׁ וְהִנֵּה־לֶקֶשׁ אַחַר גִּזֵּי הַמֶּלֶךְ׃",
          en: "Thus the Lord GOD showed me: He was forming a swarm of locusts (govai) as the late crop began to sprout…",
          gist_en: "Amos's first vision uses govai — the very name the Talmud (Chullin 65a) gives the arbeh." },
        { id: "nahum", label: { he: "שָׂרֵי נִינְוֵה כְּאַרְבֶּה", en: "Nineveh's officers like locusts" }, word: "אַרְבֶּה / גֹּבָי",
          ref: "Nahum 3:17", sefaria: "https://www.sefaria.org/Nahum.3.17",
          he: "מִנְּזָרַיִךְ כָּאַרְבֶּה וְטַפְסְרַיִךְ כְּגוֹב גֹּבָי הַחוֹנִים בַּגְּדֵרוֹת בְּיוֹם קָרָה שֶׁמֶשׁ זָרְחָה וְנוֹדַד וְלֹא־נוֹדַע מְקוֹמוֹ אַיָּם׃",
          en: "Your guards were like locusts (arbeh), your marshals like piles of hoppers (gov govai)… when the sun comes out they fly away.",
          gist_en: "Nineveh's officials as locust swarms that vanish at sunrise — power that evaporates." },
        { id: "joel", label: { he: "אַרְבַּעַת שְׁמוֹת הָאַרְבֶּה", en: "Joel's four locust names" }, word: "גָּזָם · אַרְבֶּה · יֶלֶק · חָסִיל",
          ref: "Joel 1:4", sefaria: "https://www.sefaria.org/Joel.1.4",
          he: "יֶתֶר הַגָּזָם אָכַל הָאַרְבֶּה וְיֶתֶר הָאַרְבֶּה אָכַל הַיָּלֶק וְיֶתֶר הַיֶּלֶק אָכַל הֶחָסִיל׃",
          en: "What the gazam left, the arbeh devoured; what the arbeh left, the yelek devoured; and what the yelek left, the chasil devoured.",
          gist_en: "Joel's relentless plague names four locust forms in sequence — the same names the Hoshana below invokes." },
      ]},
      { cat: { he: "כְּתוּבִים", en: "Writings" }, items: [
        { id: "ps109", label: { he: "נִנְעַרְתִּי כָּאַרְבֶּה", en: "'Shaken off like a locust'" }, word: "אַרְבֶּה",
          ref: "Psalms 109:23", sefaria: "https://www.sefaria.org/Psalms.109.23",
          he: "כְּצֵל־כִּנְטוֹתוֹ נֶהֱלָכְתִּי נִנְעַרְתִּי כָּאַרְבֶּה׃",
          en: "I fade like a lengthening shadow; I am shaken off like a locust (ka-arbeh).",
          gist_en: "The psalmist's frailty — tossed away as lightly as a locust." },
        { id: "ps105", label: { he: "אַרְבֶּה בְּמַכּוֹת מִצְרַיִם", en: "Locusts of the Egypt plague" }, word: "אַרְבֶּה · יֶלֶק",
          ref: "Psalms 105:34", sefaria: "https://www.sefaria.org/Psalms.105.34",
          he: "אָמַר וַיָּבֹא אַרְבֶּה וְיֶלֶק וְאֵין מִסְפָּר׃",
          en: "He spoke, and locusts came (arbeh), and hoppers (yelek) without number.",
          gist_en: "The Hallel-Psalm's poetic recounting of the eighth plague." },
        { id: "kohelet", label: { he: "וְיִסְתַּבֵּל הֶחָגָב", en: "'The grasshopper drags itself'" }, word: "חָגָב",
          ref: "Ecclesiastes 12:5", sefaria: "https://www.sefaria.org/Ecclesiastes.12.5",
          he: "גַּם מִגָּבֹהַּ יִרָאוּ וְחַתְחַתִּים בַּדֶּרֶךְ וְיָנֵאץ הַשָּׁקֵד וְיִסְתַּבֵּל הֶחָגָב וְתָפֵר הָאֲבִיּוֹנָה כִּי־הֹלֵךְ הָאָדָם אֶל־בֵּית עוֹלָמוֹ וְסָבְבוּ בַשּׁוּק הַסּוֹפְדִים׃",
          en: "…the almond tree blossoms, the grasshopper (he-chagav) drags itself along, and the caper-berry fails; for man goes to his eternal home…",
          gist_en: "Kohelet's allegory of old age — the burdened grasshopper as the failing body." },
        { id: "chronicles", label: { he: "אֲצַוֶּה עַל חָגָב", en: "'I command the locust'" }, word: "חָגָב",
          ref: "II Chronicles 7:13", sefaria: "https://www.sefaria.org/II_Chronicles.7.13",
          he: "הֵן אֶעֱצֹר הַשָּׁמַיִם וְלֹא־יִהְיֶה מָטָר וְהֵן־אֲצַוֶּה עַל־חָגָב לֶאֱכוֹל הָאָרֶץ וְאִם־אֲשַׁלַּח דֶּבֶר בְּעַמִּי׃",
          en: "If I shut up the heavens so there is no rain, or command the locust (chagav) to devour the land, or send pestilence among My people…",
          gist_en: "God's word to Solomon at the Temple's dedication — the chagav as a summoned chastisement." },
      ]},
      { cat: { he: "בַּתְּפִלָּה — הוֹשַׁעְנוֹת", en: "In the liturgy — Hoshanot" }, items: [
        { id: "hoshana", label: { he: "הוֹשַׁעְנָא ׳אֲדָמָה מֵאָרֶר׳", en: "Hoshana — 'save each crop from its plague'" }, word: "חָגָב · גּוֹבָי · יָלֶק · אַרְבֶּה · צְלָצַל · סָלְעָם · חָסִיל · גָּזָם",
          ref: "Hoshanot, Hoshana Rabba", sefaria: "https://www.sefaria.org/Siddur_Ashkenaz,_Festivals,_Sukkot,_Hosha'anot,_Hosha'ana_Rabba.45",
          he: "…גֹּרֶן מִגָּזָם… חִטָּה מֵחָגָב. טֶרֶף מִגּוֹבָי. יֶקֶב מִיָּלֶק… לֶקֶשׁ מֵאַרְבֶּה. מֶגֶד מִצְּלָצַל… שׂבַע מִסׇּלְעָם… תְּבוּאָה מֵחָסִיל׃",
          en: "(Hoshana Rabba acrostic, save-us prayer) …the threshing-floor from gazam… wheat from chagav, fodder from govai, the winepress from yelek… aftergrowth from arbeh, choice fruit from tzelatzal… plenty from sol'am… grain from chasil.",
          gist_en: "The Hoshana Rabba alphabetical plea pairs each crop with a plague — and names EIGHT locust types, including chagav, govai (Amos's word), sol'am and the Joel-quartet (arbeh, yelek, chasil, gazam). The full sugya's vocabulary surfaces in prayer." },
      ]},
    ],
  },
};
