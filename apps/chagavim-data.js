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
};
