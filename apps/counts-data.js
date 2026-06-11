/* counts-data.js
 * All counts data — source-grounded.
 * Numbers verified against Sefaria (Bereishis 46, Shemos 1/12/30/38, Bamidbar 1/3/4/26).
 * Shape per item: { he, se, en, ref? } where applicable.
 */
window.COUNTS_DATA = {

  /* ============================================================
   * EIGHT COUNTS — chronological
   * ============================================================ */
  events: [

    {
      id: 'descent',
      ord: 1,
      category: 'baseline',
      narrative: false,
      total: 70,
      label: {
        he: 'יוֹרְדֵי מִצְרַיִם',
        se: 'Yordei Mitzrayim',
        en: 'Descent to Egypt'
      },
      timing: {
        he: 'ירידת יעקב מצרימה',
        se: 'Yeridat Yaakov Mitzraymah',
        en: 'Yaakov\'s descent to Egypt'
      },
      method: {
        he: 'רְשִׁימַת רָאשֵׁי בָּתֵּי אָב בְּשֵׁמוֹת',
        se: 'reshimat rashei batei av be-shemot',
        en: 'Roster of household heads, by name'
      },
      age: {
        he: 'כָּל הַנֶּפֶשׁ — בְּלִי הַגְבָּלַת גִּיל',
        se: 'kol ha-nefesh — beli hagbalat gil',
        en: 'All souls — no age cap'
      },
      gender: {
        he: 'זְכָרִים בְּעִיקָּר; דִּינָה וְשֶׂרַח בַּת אָשֵׁר נִמְנוּ; יוֹכֶבֶד נוֹלְדָה בֵּין הַחוֹמוֹת (רש"י)',
        se: 'Mostly male; Dinah and Serach bat Asher named; Yocheved born "between the walls" per Rashi',
        en: 'Predominantly male; Dinah and Serach bat Asher named explicitly; Rashi reads Yocheved as born at the gates of Egypt to round to 70'
      },
      purpose: {
        he: 'יִחוּס שׁוֹרֶשׁ הָאוּמָּה — הַבָּסִיס לְכָל מִפְקָד שֶׁאַחֲרָיו',
        se: 'Yichus shoresh ha-umah',
        en: 'Genealogical baseline — the seed-figure against which all later counts are measured'
      },
      refs: ['Bereishis 46:8–27', 'Shemos 1:5', 'Devarim 10:22'],
      pasuk: {
        he: 'כׇּל־הַנֶּפֶשׁ לְבֵית־יַעֲקֹב הַבָּאָה מִצְרַיְמָה שִׁבְעִים׃',
        se: 'kol ha-nefesh le-veit Yaakov ha-ba\'ah Mitzraymah shiv\'im',
        en: 'All the souls of the house of Yaakov who came to Egypt were seventy.',
        ref: 'Bereishis 46:27'
      },
      commentary: [
        {
          source: 'Rashi',
          ref: 'Bereishis 46:15',
          he: 'מנה הכתוב למעלה בניו של יעקב ל"ג, ואי אתה מוצא אלא ל"ב, אלא זו יוכבד שנולדה בין החומות בכניסתן לעיר.',
          en: 'The text lists 33 of Yaakov\'s descendants here but only 32 names are found. The thirty-third is Yocheved, born "between the walls" as they entered Egypt — rounding the count to seventy.'
        },
        {
          source: 'Ramban',
          ref: 'Bereishis 46:15',
          he: 'והנכון בעיני… שהשבעים כוללים את יעקב עצמו.',
          en: 'Ramban prefers the reading in which Yaakov himself is counted in the seventy — an alternative to Rashi\'s "Yocheved at the gates" solution.'
        }
      ]
    },

    {
      id: 'exodus',
      ord: 2,
      category: 'narrative',
      narrative: true,
      total: 600000,
      totalLabel: 'c. 600,000',
      label: {
        he: 'יְצִיאַת מִצְרַיִם — הַמִּסְפָּר הַסִּפּוּרִי',
        se: 'Yetziat Mitzrayim — ha-mispar ha-sippuri',
        en: 'Exodus headcount (narrative)'
      },
      timing: {
        he: 'ט"ו בְּנִיסָן, שְׁנַת הַיְצִיאָה',
        se: '15 Nissan, year of the Exodus',
        en: '15 Nissan, year of the Exodus'
      },
      method: {
        he: 'מִסְפָּר עָגוֹל סִפּוּרִי — לֹא מִפְקָד פוֹרְמָלִי',
        se: 'mispar agol sippuri — lo mifkad formali',
        en: 'Narrative round figure — not a formal census'
      },
      age: {
        he: '"גְּבָרִים" — בּוֹגְרִים זְכָרִים',
        se: '"gevarim" — adult males',
        en: '"Gevarim" — adult males (no explicit age cutoff)'
      },
      gender: {
        he: 'זְכָרִים בִּלְבָד; "לְבַד מִטָּף"',
        se: 'Zekharim bilvad; "levad mi-taf"',
        en: 'Males only; "besides children" (taf)'
      },
      purpose: {
        he: 'גֶּשֶׁר נַרָטִיבִי בֵּין הַשִּׁבְעִים וּמַעֲמַד סִינַי',
        se: 'Gesher narativi',
        en: 'Narrative bridge between the seventy and the formal Sinai census'
      },
      refs: ['Shemos 12:37'],
      pasuk: {
        he: 'וַיִּסְעוּ בְנֵי־יִשְׂרָאֵל מֵרַעְמְסֵס סֻכֹּתָה כְּשֵׁשׁ־מֵאוֹת אֶלֶף רַגְלִי הַגְּבָרִים לְבַד מִטָּף׃',
        se: 'va-yis\'u venei Yisrael me-Ra\'amses Sukkotah ke-shesh me\'ot elef ragli ha-gevarim levad mi-taf',
        en: 'The Israelites journeyed from Ra\'amses to Sukkot, about six hundred thousand men on foot, besides children.',
        ref: 'Shemos 12:37'
      },
      commentary: [
        {
          source: 'Note',
          ref: '—',
          en: 'This is not classed by Chazal as one of the formal mifkadim. The number anticipates the precise Sinai count of 603,550 but is presented in the narrative as a round figure.'
        }
      ]
    },

    {
      id: 'shekalim',
      ord: 3,
      category: 'mifkad',
      narrative: false,
      total: 603550,
      label: {
        he: 'פִּקּוּד הַשְּׁקָלִים',
        se: 'Pikkud ha-Shekalim',
        en: 'Half-shekel census'
      },
      timing: {
        he: 'מַחֲלוֹקֶת רִאשׁוֹנִים: רמב"ן — לְאַחַר יוֹם הַכִּפּוּרִים; אַחֵרִים — כְּמִפְקָד בְּמִדְבַּר א׳',
        se: 'Machloket rishonim: Ramban — after Yom Kippur; others — same as Bamidbar 1',
        en: 'Disputed: Ramban places it after Yom Kippur of year 1; others identify it with the Bamidbar 1 census'
      },
      method: {
        he: 'מַחֲצִית הַשֶּׁקֶל — סְפִירַת מַטְבְּעוֹת, לֹא רָאשִׁים',
        se: 'machatzit ha-shekel — sefirat matbe\'ot, lo rashim',
        en: 'Each man brings a half-shekel — coins are counted, not heads'
      },
      age: {
        he: 'מִבֶּן עֶשְׂרִים שָׁנָה וָמַעְלָה',
        se: 'mi-ben esrim shanah va-ma\'lah',
        en: 'Age 20 and up'
      },
      gender: {
        he: 'זְכָרִים בִּלְבָד',
        se: 'Zekharim bilvad',
        en: 'Males only'
      },
      purpose: {
        he: '"כֹּפֶר נֶפֶשׁ" וּמִמּוּן אַדְנֵי הַמִּשְׁכָּן',
        se: '"kofer nefesh" u-mimun adnei ha-Mishkan',
        en: 'Atonement ("kofer nefesh") and funding the silver sockets of the Mishkan'
      },
      refs: ['Shemos 30:11–16', 'Shemos 38:25–26'],
      pasuk: {
        he: 'כִּי תִשָּׂא אֶת־רֹאשׁ בְּנֵי־יִשְׂרָאֵל לִפְקֻדֵיהֶם וְנָתְנוּ אִישׁ כֹּפֶר נַפְשׁוֹ לַה׳ בִּפְקֹד אֹתָם וְלֹא־יִהְיֶה בָהֶם נֶגֶף בִּפְקֹד אֹתָם׃',
        se: 'Ki tissa et rosh benei Yisrael li-fkudeihem ve-natnu ish kofer nafsho la-Shem bi-fkod otam',
        en: 'When you take a census of the Israelites according to their numbers, each man shall give a ransom for himself to the Lord when they are counted, that no plague come upon them through counting.',
        ref: 'Shemos 30:12'
      },
      commentary: [
        {
          source: 'Rashi',
          ref: 'Shemos 30:15',
          he: 'דבר הראוי להתכפר עליו, לפי שאין הברכה שורה במנוי.',
          en: 'A half-shekel is given because counting heads directly invites the evil eye and removes the divine blessing — atonement is needed for the act of being counted.'
        },
        {
          source: 'Ramban',
          ref: 'Shemos 30:12',
          he: 'הזכיר זה הכתוב ענין הפקודים שבמדבר סיני… שהם פקודי החיל.',
          en: 'Ramban holds the Shemos 30 census and the Bamidbar 1 census are distinct events. The first funds the Mishkan; the second organizes the military camp.'
        },
        {
          source: 'Rashi (alt.)',
          ref: 'Shemos 38:26',
          en: 'Rashi on 38:26 implies the Shemos count and the Bamidbar count yield the same figure (603,550) because they reflect the same population reality, even if performed twice.'
        }
      ]
    },

    {
      id: 'bamidbar1',
      ord: 4,
      category: 'mifkad',
      narrative: false,
      total: 603550,
      label: {
        he: 'מִפְקַד בְּמִדְבַּר סִינַי',
        se: 'Mifkad Bamidbar Sinai',
        en: 'Sinai military census'
      },
      timing: {
        he: 'אֶחָד בְּאִיָּר, שָׁנָה שְׁנִיָּה לַיְצִיאָה',
        se: '1 Iyyar, year 2 from Exodus',
        en: '1 Iyyar, year 2 after the Exodus'
      },
      method: {
        he: '"שְׂאוּ אֶת־רֹאשׁ" — בְּמִסְפַּר שֵׁמוֹת לְגֻלְגְּלֹתָם, לְמִשְׁפְּחֹתָם, לְבֵית אֲבֹתָם',
        se: '"Se\'u et rosh" — by name, by skull, by family, by tribe',
        en: 'Name by name, by tribe and family — full personal census'
      },
      age: {
        he: 'מִבֶּן עֶשְׂרִים שָׁנָה וָמַעְלָה',
        se: 'mi-ben esrim shanah va-ma\'lah',
        en: 'Age 20 and up'
      },
      gender: {
        he: 'זְכָרִים — "כֹּל יֹצֵא צָבָא בְּיִשְׂרָאֵל"',
        se: 'Zekharim — "kol yotzei tzava be-Yisrael"',
        en: 'Males fit for military service'
      },
      purpose: {
        he: 'אִרְגּוּן הַמַּחֲנֶה — דְּגָלִים, סֵדֶר מַסָּעוֹת וּמִלְחָמָה',
        se: 'Irgun ha-machaneh — degalim u-mil\'chamah',
        en: 'Organizing the camp into four banners and preparing the people for entry into the Land'
      },
      refs: ['Bamidbar 1:1–46'],
      pasuk: {
        he: 'שְׂאוּ אֶת־רֹאשׁ כׇּל־עֲדַת בְּנֵי־יִשְׂרָאֵל לְמִשְׁפְּחֹתָם לְבֵית אֲבֹתָם בְּמִסְפַּר שֵׁמוֹת כׇּל־זָכָר לְגֻלְגְּלֹתָם׃',
        se: 'Se\'u et rosh kol adat benei Yisrael le-mishpechotam le-veit avotam be-mispar shemot kol zakhar le-gulgelotam',
        en: 'Take a census of the entire community of Israel by their families, by their fathers\' houses, in the count of names, every male, head by head.',
        ref: 'Bamidbar 1:2'
      },
      commentary: [
        {
          source: 'Rashi',
          ref: 'Bamidbar 1:1',
          he: 'מתוך חיבתן לפניו מונה אותם כל שעה.',
          en: 'Because of His love for them, He counts them at every significant moment — when they descended to Egypt, when they left, after the Golden Calf, and now when the Shechinah comes to rest on them.'
        },
        {
          source: 'Ramban',
          ref: 'Bamidbar 1:3',
          en: 'Ramban: this count is distinct from the half-shekel census of Shemos 30 — that one was for atonement and funding, this one is to organize the military camp.'
        }
      ]
    },

    {
      id: 'levi_chodesh',
      ord: 5,
      category: 'levi',
      narrative: false,
      total: 22000,
      totalNote: 'family sum: 22,300',
      label: {
        he: 'פְּקוּדֵי הַלְוִיִּם מִבֶּן חֹדֶשׁ',
        se: 'Pekudei ha-Leviim mi-ben chodesh',
        en: 'Levites — one month and up'
      },
      timing: {
        he: 'אִיָּר—סִיוָן, שָׁנָה שְׁנִיָּה',
        se: 'Iyyar–Sivan, year 2',
        en: 'Iyyar–Sivan of year 2, concurrent with Bamidbar 1'
      },
      method: {
        he: 'לְבֵית אֲבוֹת, לְמִשְׁפְּחֹתָם — גֵּרְשׁוֹן, קְהָת, מְרָרִי',
        se: 'le-veit avot, le-mishpechotam — Gershon, Kehat, Merari',
        en: 'By household and family — Gershon, Kehat, Merari counted separately'
      },
      age: {
        he: 'מִבֶּן חֹדֶשׁ וָמָעְלָה',
        se: 'mi-ben chodesh va-ma\'lah',
        en: 'One month and up'
      },
      gender: {
        he: 'זְכָרִים',
        se: 'Zekharim',
        en: 'Males'
      },
      purpose: {
        he: 'תַּחַת הַבְּכוֹרוֹת — כָּל אֶחָד פּוֹדֶה אֶחָד',
        se: 'Tachat ha-bechorot — each Levite redeems one firstborn',
        en: 'To replace the firstborn — each Levite redeems one firstborn Israelite'
      },
      refs: ['Bamidbar 3:14–39'],
      pasuk: {
        he: 'כׇּל־פְּקוּדֵי הַלְוִיִּם אֲשֶׁר פָּקַד מֹשֶׁה וְאַהֲרֹן עַל־פִּי ה׳ לְמִשְׁפְּחֹתָם כׇּל־זָכָר מִבֶּן־חֹדֶשׁ וָמַעְלָה שְׁנַיִם וְעֶשְׂרִים אֶלֶף׃',
        se: 'Kol pekudei ha-Leviim asher pakad Moshe ve-Aharon al pi Hashem le-mishpechotam kol zakhar mi-ben chodesh va-ma\'lah shnayim ve-esrim elef',
        en: 'All the Levites whom Moshe and Aharon counted at God\'s command, by their families, every male from one month and up: twenty-two thousand.',
        ref: 'Bamidbar 3:39'
      },
      commentary: [
        {
          source: 'Rashi',
          ref: 'Bamidbar 3:39',
          he: 'ובפרטן אתה מוצא שלש מאות יתירים… בכורות היו, ודיים שיפקיעו עצמן מן הפדיון.',
          en: 'The family-by-family sum is 22,300 (7,500 + 8,600 + 6,200), yet the text states 22,000. The extra 300 are themselves firstborn Levites — and a firstborn cannot redeem another firstborn, so they only redeem themselves.'
        },
        {
          source: 'Ibn Ezra',
          ref: 'Bamidbar 3:39',
          en: 'Ibn Ezra: the count is rounded down to 22,000 because the Torah only records the number of Levites available to redeem firstborn Israelites — the 300 firstborn Levites are excluded from that operative figure.'
        }
      ],
      breakdown: [
        { id: 'gershon', label: { he: 'גֵּרְשׁוֹן', se: 'Gershon', en: 'Gershon' }, value: 7500, ref: 'Bamidbar 3:22' },
        { id: 'kehat',   label: { he: 'קְהָת',   se: 'Kehat',   en: 'Kehat'   }, value: 8600, ref: 'Bamidbar 3:28' },
        { id: 'merari',  label: { he: 'מְרָרִי', se: 'Merari',  en: 'Merari'  }, value: 6200, ref: 'Bamidbar 3:34' }
      ]
    },

    {
      id: 'bechorot',
      ord: 6,
      category: 'bechorot',
      narrative: false,
      total: 22273,
      label: {
        he: 'פְּקוּדֵי הַבְּכוֹרוֹת',
        se: 'Pekudei ha-Bechorot',
        en: 'Firstborn count'
      },
      timing: {
        he: 'בְּסָמוּךְ לִפְקוּדֵי הַלְוִיִּם, שָׁנָה שְׁנִיָּה',
        se: 'Adjacent to Levite count, year 2',
        en: 'Conducted alongside the Levite count, year 2'
      },
      method: {
        he: 'בְּמִסְפַּר שֵׁמוֹת — כָּל בְּכוֹר זָכָר מִבֶּן חֹדֶשׁ',
        se: 'Be-mispar shemot — every firstborn male from one month',
        en: 'By name — every firstborn male from one month and up'
      },
      age: {
        he: 'מִבֶּן חֹדֶשׁ וָמָעְלָה',
        se: 'mi-ben chodesh va-ma\'lah',
        en: 'One month and up'
      },
      gender: {
        he: 'זְכָרִים — בְּכוֹרוֹת בִּלְבָד',
        se: 'Zekharim — bechorot bilvad',
        en: 'Males — firstborn only'
      },
      purpose: {
        he: 'חֶשְׁבּוֹן הַפִּדְיוֹן — 273 בְּכוֹרוֹת עוֹדְפִים פּוֹדִים בְּ-5 שְׁקָלִים',
        se: 'Cheshbon ha-pidyon — 273 surplus redeemed at 5 shekels each',
        en: 'Redemption mathematics: 22,273 − 22,000 = 273 surplus firstborn, redeemed at five shekels each (total 1,365 shekels)'
      },
      refs: ['Bamidbar 3:40–51'],
      pasuk: {
        he: 'וַיְהִי כׇל־בְּכוֹר זָכָר בְּמִסְפַּר שֵׁמוֹת מִבֶּן־חֹדֶשׁ וָמַעְלָה לִפְקֻדֵיהֶם שְׁנַיִם וְעֶשְׂרִים אֶלֶף שְׁלֹשָׁה וְשִׁבְעִים וּמָאתָיִם׃',
        se: 'Va-yehi kol bekhor zakhar be-mispar shemot mi-ben chodesh va-ma\'lah li-fkudeihem shnayim ve-esrim elef sheloshah ve-shiv\'im u-matayim',
        en: 'All the firstborn males from one month and up, counted by name, were twenty-two thousand two hundred and seventy-three.',
        ref: 'Bamidbar 3:43'
      },
      commentary: [
        {
          source: 'Rashi',
          ref: 'Bamidbar 3:43',
          he: 'תמה על עצמך, אחר שמנו הלוים והבכורות נמצאו הבכורות עודפים על הלוים מאתים ושבעים ושלשה.',
          en: 'A striking statistic: out of all of Israel (over 600,000 adult males), only 22,273 are firstborn. Rashi notes that this implies an exceptionally high birthrate — many sons per family.'
        }
      ]
    },

    {
      id: 'levi_avodah',
      ord: 7,
      category: 'levi',
      narrative: false,
      total: 8580,
      label: {
        he: 'פְּקוּדֵי הַלְוִיִּם לָעֲבוֹדָה',
        se: 'Pekudei ha-Leviim la-avodah',
        en: 'Levites — fit for service (30–50)'
      },
      timing: {
        he: 'אַחֲרֵי פְּקוּדֵי הַלְוִיִּם הָרִאשׁוֹנִים, שָׁנָה שְׁנִיָּה',
        se: 'After the first Levite count, year 2',
        en: 'After the one-month-and-up Levite count, year 2'
      },
      method: {
        he: 'בְּמִשְׁפְּחֹתָם וּבְבֵית אֲבוֹתָם — לְפִי שֵׁרוּת',
        se: 'By family and household — by service unit',
        en: 'By family and service assignment (carrying the Mishkan)'
      },
      age: {
        he: 'מִבֶּן שְׁלֹשִׁים שָׁנָה וְעַד בֶּן חֲמִשִּׁים',
        se: 'mi-ben sheloshim shanah ve-ad ben chamishim',
        en: 'Age 30 to 50 — the workable years for transporting the Mishkan'
      },
      gender: {
        he: 'זְכָרִים',
        se: 'Zekharim',
        en: 'Males'
      },
      purpose: {
        he: 'עֲבוֹדַת מַשָּׂא וְשֵׁרוּת בַּמִּשְׁכָּן',
        se: 'Avodat masa ve-sherut ba-Mishkan',
        en: 'Active service: transport and labor of the Mishkan'
      },
      refs: ['Bamidbar 4:34–49'],
      pasuk: {
        he: 'כׇּל־הַפְּקֻדִים אֲשֶׁר פָּקַד מֹשֶׁה וְאַהֲרֹן וּנְשִׂיאֵי יִשְׂרָאֵל אֶת־הַלְוִיִּם לְמִשְׁפְּחֹתָם וּלְבֵית אֲבֹתָם׃ מִבֶּן שְׁלֹשִׁים שָׁנָה וָמַעְלָה וְעַד בֶּן־חֲמִשִּׁים שָׁנָה כׇּל־הַבָּא לַעֲבֹד עֲבֹדַת עֲבֹדָה וַעֲבֹדַת מַשָּׂא בְּאֹהֶל מוֹעֵד׃ וַיִּהְיוּ פְּקֻדֵיהֶם שְׁמֹנַת אֲלָפִים וַחֲמֵשׁ מֵאוֹת וּשְׁמֹנִים׃',
        se: 'Kol ha-pekudim asher pakad Moshe ve-Aharon u-nesi\'ei Yisrael et ha-Leviim… mi-ben sheloshim shanah va-ma\'lah ve-ad ben chamishim shanah… va-yihyu pekudeihem shemonat alafim va-chamesh me\'ot u-shemonim',
        en: 'All the Levites whom Moshe and Aharon and the chieftains of Israel counted, by their families and households — every man from age thirty to fifty fit for the service of the Tent of Meeting — were eight thousand five hundred and eighty.',
        ref: 'Bamidbar 4:46–48'
      },
      commentary: [
        {
          source: 'Rashi',
          ref: 'Bamidbar 4:3',
          he: 'פחות משלשים לא נתמלא כחו… יותר מבן חמשים, כחו מכחיש.',
          en: 'Under thirty, his strength is not yet full; over fifty, his strength wanes. Hence the narrow window of active service.'
        }
      ],
      breakdown: [
        { id: 'kehat',   label: { he: 'קְהָת',   se: 'Kehat',   en: 'Kehat'   }, value: 2750, ref: 'Bamidbar 4:36' },
        { id: 'gershon', label: { he: 'גֵּרְשׁוֹן', se: 'Gershon', en: 'Gershon' }, value: 2630, ref: 'Bamidbar 4:40' },
        { id: 'merari',  label: { he: 'מְרָרִי', se: 'Merari',  en: 'Merari'  }, value: 3200, ref: 'Bamidbar 4:44' }
      ]
    },

    {
      id: 'bamidbar26',
      ord: 8,
      category: 'mifkad',
      narrative: false,
      total: 601730,
      leviteSubtotal: 23000,
      label: {
        he: 'מִפְקַד עַרְבוֹת מוֹאָב',
        se: 'Mifkad Arvot Moav',
        en: 'Plains of Moav census'
      },
      timing: {
        he: 'שָׁנָה אַרְבָּעִים, אַחֲרֵי הַמַּגֵּפָה',
        se: 'Year 40, after the plague of Baal Peor',
        en: 'Year 40, on the plains of Moav, just after the plague of Baal Peor'
      },
      method: {
        he: 'לְמִשְׁפְּחוֹתָם — מִפְקָד שֵׁבֶט-שֵׁבֶט, בְּשֵׁמוֹת בָּתֵּי הָאָבוֹת',
        se: 'Le-mishpechotam — tribe by tribe, family by family',
        en: 'Tribe by tribe, by family unit, with family names listed'
      },
      age: {
        he: 'מִבֶּן עֶשְׂרִים שָׁנָה וָמַעְלָה',
        se: 'mi-ben esrim shanah va-ma\'lah',
        en: 'Age 20 and up'
      },
      gender: {
        he: 'זְכָרִים — "כֹּל יֹצֵא צָבָא"',
        se: 'Zekharim — "kol yotzei tzava"',
        en: 'Males fit for military service'
      },
      purpose: {
        he: 'הֲכָנָה לְכִבּוּשׁ וְחִלּוּק הָאָרֶץ — "לָאֵלֶּה תֵּחָלֵק הָאָרֶץ"',
        se: 'Hachanah le-kibush ve-chiluk ha-aretz',
        en: 'Preparation for conquest and land allotment — "to these the Land shall be apportioned"'
      },
      refs: ['Bamidbar 26:1–62'],
      pasuk: {
        he: 'אֵלֶּה פְּקוּדֵי בְּנֵי יִשְׂרָאֵל שֵׁשׁ־מֵאוֹת אֶלֶף וָאָלֶף שְׁבַע מֵאוֹת וּשְׁלֹשִׁים׃',
        se: 'Eleh pekudei benei Yisrael shesh me\'ot elef va-elef sheva me\'ot u-sheloshim',
        en: 'These are the counted of the Israelites: six hundred and one thousand, seven hundred and thirty.',
        ref: 'Bamidbar 26:51'
      },
      commentary: [
        {
          source: 'Rashi',
          ref: 'Bamidbar 26:1',
          he: 'משל לרועה שנכנסו זאבים לתוך עדרו… עומד ומונה אותן לידע מנין הנותרות.',
          en: 'A shepherd whose flock has been attacked by wolves counts the survivors. So too after Baal Peor — God counts those who remain.'
        },
        {
          source: 'Ramban',
          ref: 'Bamidbar 26:53',
          en: 'Ramban: this count has a dual purpose — it both registers the new generation that will enter the Land and serves as the basis for distributing the Land by lot among the tribes proportionally to their numbers.'
        }
      ]
    }
  ],

  /* ============================================================
   * TRIBAL DATA — Bamidbar 1 vs Bamidbar 26
   * Verified against Sefaria (Numbers 1:20–43, 26:7–50).
   * ============================================================ */
  tribes: [
    { id: 'reuven',    label: { he: 'רְאוּבֵן',    se: 'Reuven',    en: 'Reuven'    }, sinai: 46500, moav: 43730 },
    { id: 'shimon',    label: { he: 'שִׁמְעוֹן',    se: 'Shimon',    en: 'Shimon'    }, sinai: 59300, moav: 22200 },
    { id: 'gad',       label: { he: 'גָּד',         se: 'Gad',       en: 'Gad'       }, sinai: 45650, moav: 40500 },
    { id: 'yehuda',    label: { he: 'יְהוּדָה',     se: 'Yehuda',    en: 'Yehuda'    }, sinai: 74600, moav: 76500 },
    { id: 'yissachar', label: { he: 'יִשָּׂשכָר',   se: 'Yissachar', en: 'Yissachar' }, sinai: 54400, moav: 64300 },
    { id: 'zevulun',   label: { he: 'זְבוּלוּן',    se: 'Zevulun',   en: 'Zevulun'   }, sinai: 57400, moav: 60500 },
    { id: 'menashe',   label: { he: 'מְנַשֶּׁה',    se: 'Menashe',   en: 'Menashe'   }, sinai: 32200, moav: 52700 },
    { id: 'ephraim',   label: { he: 'אֶפְרַיִם',    se: 'Ephraim',   en: 'Ephraim'   }, sinai: 40500, moav: 32500 },
    { id: 'binyamin',  label: { he: 'בִּנְיָמִין',   se: 'Binyamin',  en: 'Binyamin'  }, sinai: 35400, moav: 45600 },
    { id: 'dan',       label: { he: 'דָּן',         se: 'Dan',       en: 'Dan'       }, sinai: 62700, moav: 64400 },
    { id: 'asher',     label: { he: 'אָשֵׁר',       se: 'Asher',     en: 'Asher'     }, sinai: 41500, moav: 53400 },
    { id: 'naftali',   label: { he: 'נַפְתָּלִי',   se: 'Naftali',   en: 'Naftali'   }, sinai: 53400, moav: 45400 }
  ],
  tribeTotals: { sinai: 603550, moav: 601730 },
  leviteTotals: { sinai: 22000, moav: 23000 },

  /* Tribal narrative notes — what the deltas mean */
  tribalNotes: [
    {
      id: 'shimon-collapse',
      tribeId: 'shimon',
      label: { en: 'Shimon collapse', he: 'נְפִילַת שִׁמְעוֹן' },
      en: 'Shimon dropped 37,100 (−62.6%) between the two counts. Chazal and Rashi (Bamidbar 25:9, 26:13) tie this directly to the plague of Baal Peor: most of the 24,000 who died were of the tribe of Shimon, since Zimri ben Salu was their nasi.'
    },
    {
      id: 'menashe-gain',
      tribeId: 'menashe',
      label: { en: 'Menashe surge', he: 'גִּדּוּל מְנַשֶּׁה' },
      en: 'Menashe grew 20,500 (+63.7%) — the largest proportional gain. Reverses the Sinai-era pattern in which Ephraim was the larger half of Yosef.'
    },
    {
      id: 'ephraim-decline',
      tribeId: 'ephraim',
      label: { en: 'Ephraim slip', he: 'יְרִידַת אֶפְרַיִם' },
      en: 'Ephraim shrank 8,000 (−19.8%) even as its sibling Menashe surged — a notable inversion of Yaakov\'s blessing in Bereishis 48 placing Ephraim before Menashe.'
    }
  ],

  /* ============================================================
   * METHODOLOGY — comparing how each count was performed
   * ============================================================ */
  methods: [
    {
      id: 'roster',
      label: { he: 'רְשִׁימַת שֵׁמוֹת', se: 'Reshimat shemot', en: 'Named-roster' },
      events: ['descent'],
      what: { en: 'Heads of households listed by personal name with their immediate descendants.' },
      counts: { en: 'Heads, not heads-of-population. Women appear when narratively notable (Dinah, Serach).' },
      excludes: { en: 'No age criterion; the women, servants, and the broader household are implicit.' }
    },
    {
      id: 'narrative',
      label: { he: 'מִסְפָּר סִפּוּרִי', se: 'Mispar sippuri', en: 'Narrative figure' },
      events: ['exodus'],
      what: { en: 'A round number reported by the verse describing the journey itself.' },
      counts: { en: '"Gevarim" on foot — adult males, not specified as 20+. Children explicitly excluded.' },
      excludes: { en: 'Not a halachic mifkad. Tribes not enumerated. Not done via shekel or by name.' }
    },
    {
      id: 'shekel',
      label: { he: 'מַחֲצִית הַשֶּׁקֶל', se: 'Machatzit ha-shekel', en: 'Half-shekel coins' },
      events: ['shekalim'],
      what: { en: 'Each male 20+ brings a half-shekel; coins are counted, not heads.' },
      counts: { en: 'Indirect headcount — protects against the "ayin ha-ra" of direct enumeration (Rashi).' },
      excludes: { en: 'Levites; women; men under 20. The coins also serve as kofer nefesh and fund the silver sockets.' }
    },
    {
      id: 'name',
      label: { he: 'בְּמִסְפַּר שֵׁמוֹת', se: 'Be-mispar shemot', en: 'Name-by-name census' },
      events: ['bamidbar1', 'bamidbar26'],
      what: { en: 'Full personal census: every male 20+ by tribe, family, and household, called by name "le-gulgelotam".' },
      counts: { en: 'Used at Sinai (year 2) for organizing the camp, and at Arvot Moav (year 40) for inheritance distribution.' },
      excludes: { en: 'Levites counted separately under different criteria. Women not enumerated.' }
    },
    {
      id: 'family',
      label: { he: 'לְבֵית אֲבוֹת', se: 'Le-veit avot', en: 'By family unit' },
      events: ['levi_chodesh', 'levi_avodah', 'bechorot'],
      what: { en: 'Levites and firstborn — by family (Gershon/Kehat/Merari for Levites) with full sub-totals reported.' },
      counts: { en: 'Levites from one month (1mo+) for redemption arithmetic, then 30–50 for active service. Firstborn one-month-up.' },
      excludes: { en: 'Levites excluded from the military census; firstborn from non-Levite tribes counted separately.' }
    }
  ],

  /* The shemos/bamidbar machlokes — a flagged item for the methodology view */
  shemosBamidbarMachloket: {
    question: {
      en: 'Is the half-shekel census of Shemos 30 the same event as the Bamidbar 1 census, or two distinct counts?'
    },
    positions: [
      {
        who: 'Ramban',
        ref: 'Ramban on Shemos 30:12',
        position: { en: 'Two distinct events. Shemos 30 funds the Mishkan and atones (year 1, after Yom Kippur). Bamidbar 1 organizes the military camp (1 Iyyar year 2). Both happen to yield 603,550 because the underlying population did not change appreciably.' }
      },
      {
        who: 'Rashi (read straightforwardly)',
        ref: 'Rashi on Shemos 38:26',
        position: { en: 'Some read Rashi as identifying the two counts: the Mishkan was funded from this same census of 603,550. On this view, the silver sockets reflect the same headcount the Bamidbar 1 text later records.' }
      }
    ]
  },

  /* ============================================================
   * GROWTH ARC — for the number-line visualization
   * ============================================================ */
  growth: [
    { id: 'descent',     year: -210, label: { en: 'Descent',  he: 'יְרִידָה' }, value: 70,     ratio: 1 },
    { id: 'exodus',      year: 0,    label: { en: 'Exodus',   he: 'יְצִיאָה' }, value: 600000, ratio: 8571 },
    { id: 'shekalim',    year: 0.5,  label: { en: 'Shekalim', he: 'שְׁקָלִים' }, value: 603550, ratio: 8622 },
    { id: 'bamidbar1',   year: 1,    label: { en: 'Sinai',    he: 'סִינַי' }, value: 603550, ratio: 8622 },
    { id: 'bamidbar26',  year: 40,   label: { en: 'Moav',     he: 'מוֹאָב' }, value: 601730, ratio: 8596 }
  ],

  /* Category metadata */
  categories: {
    baseline:  { he: 'יִחוּס',    se: 'Yichus',    en: 'Baseline / Genealogical', color: '#4a2a5a' },
    narrative: { he: 'סִפּוּרִי',  se: 'Sippuri',   en: 'Narrative',                color: '#6e6663' },
    mifkad:    { he: 'מִפְקָד',   se: 'Mifkad',    en: 'Formal census',            color: '#5a1421' },
    levi:      { he: 'לְוִיִּם',    se: 'Leviim',    en: 'Levite count',             color: '#3a4a6b' },
    bechorot:  { he: 'בְּכוֹרוֹת', se: 'Bechorot',  en: 'Firstborn',                color: '#4a2a5a' }
  },

  /* ============================================================
   * PURPOSES — the reasons a count happens
   * The matrix maps event_id → array of purpose_ids that apply.
   * ============================================================ */
  purposes: [
    { id: 'yichus',    label: { he: 'יִחוּס שֹׁרֶשׁ', en: 'Genealogical baseline' }, source: 'Bereishis 46:8' },
    { id: 'chibah',    label: { he: 'חִבָּה',          en: 'Marker of love' },         source: 'Rashi on Bamidbar 1:1', commentator: 'Rashi' },
    { id: 'narrative', label: { he: 'סִפּוּרִי',       en: 'Narrative bridge' },      source: 'Shemos 12:37' },
    { id: 'kofer',     label: { he: 'כֹּפֶר נֶפֶשׁ',     en: 'Atonement' },             source: 'Shemos 30:12' },
    { id: 'mishkan',   label: { he: 'אַדְנֵי הַמִּשְׁכָּן', en: 'Mishkan funding' },    source: 'Shemos 38:25' },
    { id: 'army',      label: { he: 'יֹצֵא צָבָא',     en: 'Military readiness' },    source: 'Bamidbar 1:3' },
    { id: 'camp',      label: { he: 'סֵדֶר הַמַּחֲנֶה',  en: 'Camp organization' },     source: 'Bamidbar 2:2' },
    { id: 'redeem',    label: { he: 'תַּחַת הַבְּכוֹר',  en: 'Redeem the firstborn' }, source: 'Bamidbar 3:12' },
    { id: 'serve',     label: { he: 'עֲבוֹדַת מַשָּׂא',   en: 'Active service' },        source: 'Bamidbar 4:3' },
    { id: 'land',      label: { he: 'נַחֲלַת הָאָרֶץ',  en: 'Land allotment' },        source: 'Bamidbar 26:53' },
    { id: 'aftermath', label: { he: 'אַחֲרֵי הַמַּגֵּפָה', en: 'Post-disaster' },        source: 'Rashi on Bamidbar 26:1', commentator: 'Rashi' }
  ],

  /* Matrix: event_id → which purpose_ids apply */
  purposeMatrix: {
    descent:      ['yichus'],
    exodus:       ['narrative'],
    shekalim:     ['kofer', 'mishkan', 'chibah'],
    bamidbar1:    ['army', 'camp', 'chibah'],
    levi_chodesh: ['redeem'],
    bechorot:     ['redeem'],
    levi_avodah:  ['serve'],
    bamidbar26:   ['army', 'land', 'aftermath', 'chibah']
  },

  /* ============================================================
   * EXCLUSIONS — who is NOT counted
   * ============================================================ */
  exclusions: [
    {
      id: 'women',
      label: { he: 'נָשִׁים', en: 'Women' },
      where: { en: 'All formal counts use male language: "rosh," "gevarim," "zakhar." Women are not enumerated as part of the population pool in any of the eight counts.' },
      why: { en: 'The counts are organized by "bet av" — the paternal household — and (for #3, #4, #8) by "yotzei tzava," military age. Women are absent from both frames as a matter of structure, not absence of significance.' },
      exceptions: [
        { name: 'Dinah bat Yaakov', ref: 'Bereishis 46:15' },
        { name: 'Serach bat Asher (both counts)', ref: 'Bereishis 46:17' },
        { name: 'Serach in Bamidbar 26', ref: 'Bamidbar 26:46' },
        { name: 'Daughters of Tzelafchad', ref: 'Bamidbar 26:33' }
      ],
      source: 'Bamidbar 1:2'
    },
    {
      id: 'minors',
      label: { he: 'פָּחוּת מִבֶּן עֶשְׂרִים', en: 'Under twenty' },
      where: { en: 'Excluded from the military counts (#3 Shekalim, #4 Bamidbar 1, #8 Bamidbar 26). Also implicitly from the Exodus narrative figure (gevarim "besides children").' },
      why: { en: '"Mi-ben esrim shanah va-ma\'lah kol yotzei tzava" — the criterion is military age. Under 20 is below the threshold.' },
      source: 'Bamidbar 1:3'
    },
    {
      id: 'levites-mil',
      label: { he: 'לְוִיִּם בַּצָּבָא', en: 'Levites in military count' },
      where: { en: 'Bamidbar 1 (#4) and Bamidbar 26 (#8) explicitly exclude Levi. They are counted separately under different criteria (#5, #7).' },
      why: { en: '"Ach et matei Levi lo tifkod, ve-et roshem lo tisa be-toch benei Yisrael" — Levites are categorically separated from the military population. They protect the Mishkan from within the camp.' },
      source: 'Bamidbar 1:47-49'
    },
    {
      id: 'erev-rav',
      label: { he: 'עֵרֶב רַב', en: 'Mixed multitude' },
      where: { en: 'Mentioned at the Exodus (Shemos 12:38) but excluded from any formal count of Bnei Yisrael.' },
      why: { en: 'Non-Israelite converts who left Egypt with the nation. Rashi (Shemos 32:7): their corruption was foundational to the sin of the Egel. The counts of Israel never include them.' },
      source: 'Shemos 12:38'
    },
    {
      id: 'dor-hamidbar',
      label: { he: 'דּוֹר הַמִּדְבָּר', en: 'Wilderness generation' },
      where: { en: 'Conspicuously absent from #8 — Bamidbar 26 marks the moment when none of the men counted in Bamidbar 1 remain alive (except Yehoshua and Calev).' },
      why: { en: 'The text closes the count with explicit attestation: "u-ve-eleh lo hayah ish mi-pekudei Moshe ve-Aharon ha-Kohen asher pakdu et benei Yisrael be-midbar Sinai." The two censuses bracket a complete generational turnover.' },
      source: 'Bamidbar 26:64-65'
    }
  ],

  /* ============================================================
   * TANACH COUNTS — beyond Chumash
   * ============================================================ */
  tanachCounts: [
    {
      id: 'yehoshua',
      label: { he: 'יְהוֹשֻׁעַ', en: 'Yehoshua' },
      kind: 'silence',
      total: null,
      summary: { en: 'No formal census. Bamidbar 26 carries forward as the operative count.' },
      detail: { en: 'Sefer Yehoshua performs no census of Bnei Yisrael — the book is structured around the consequences of the Bamidbar 26 count. Verse 26:53–54 explicitly designates that count as the basis for land allotment: "to these the land shall be divided… each according to its counted." The lot-drawing in the Achan episode (Yehoshua 7) mirrors census architecture — tribe, family, household, individual — but is identification, not enumeration.' },
      sources: ['Bamidbar 26:53-54', 'Yehoshua 7:16-18', 'Yehoshua 18:4']
    },
    {
      id: 'shaul-bezek',
      label: { he: 'שָׁאוּל · בָּזֶק', en: 'Shaul at Bezek' },
      kind: 'pre-war',
      total: 330000,
      breakdown: { en: 'Israel 300,000 · Yehuda 30,000' },
      summary: { en: 'Before the war with Ammon.' },
      detail: { en: 'Shaul musters the people at Bezek before relieving Yavesh Gilad. Yoma 22b reads the verse to extract the prohibition against direct counting: Shaul counted via shards ("Bezek" = potsherds) rather than heads — a counting method already understood as the legal workaround.' },
      sources: ['Shmuel I 11:8', 'Yoma 22b']
    },
    {
      id: 'shaul-telaim',
      label: { he: 'שָׁאוּל · טְלָאִים', en: 'Shaul at Telaim' },
      kind: 'pre-war',
      total: 210000,
      breakdown: { en: 'Israel 200,000 · Yehuda 10,000' },
      summary: { en: 'Before the war with Amalek.' },
      detail: { en: 'Each man brings a lamb (טְלֶה) — Shaul counts the lambs rather than the men. Yoma 22b cites this verse as the second proof for the prohibition: even for a milchemet mitzvah (the war against Amalek is a Torah-mandated war), Shaul still uses an indirect method.' },
      sources: ['Shmuel I 15:4', 'Yoma 22b']
    },
    {
      id: 'david',
      label: { he: 'דָּוִד', en: 'David\'s census' },
      kind: 'catastrophe',
      total: 1300000,
      breakdown: { en: 'Shmuel II 24:9 — Israel 800,000 + Yehuda 500,000 · Divrei Hayamim I 21:5 — Israel 1,100,000 + Yehuda 470,000' },
      summary: { en: 'The catastrophic count — 70,000 die in the plague that follows.' },
      detail: { en: 'David counts directly, against the Yoma 22b prohibition. Yoav protests and partially obeys — Divrei Hayamim 21:6 records that he refused to count Levi and Binyamin. After the count, a three-day plague kills 70,000. The plague stops at the threshing-floor of Aravna ha-Yevusi — the future site of the Beis HaMikdash. The number discrepancy between Shmuel and Divrei Hayamim is a classical question; Radak suggests Shmuel counts only the ready militia, Divrei Hayamim the full registered force.' },
      sources: ['Shmuel II 24:1-9', 'Divrei Hayamim I 21:1-7', 'Divrei Hayamim I 21:6']
    },
    {
      id: 'shlomo',
      label: { he: 'שְׁלֹמֹה · פּוֹעֲלִים', en: 'Shlomo\'s workforce' },
      kind: 'labor',
      total: 183300,
      breakdown: { en: '30,000 timber crews · 70,000 porters · 80,000 quarriers · 3,300 officers' },
      summary: { en: 'A labor census for building the Mikdash — not a population count.' },
      detail: { en: 'Shlomo organizes labor for the Mikdash construction. The figures count workers by function, not the wider population. Significant shift in genre: where the Torah counts measure nation-formation, this one measures national output — what the polity can build.' },
      sources: ['Melachim I 5:27-30']
    },
    {
      id: 'ezra',
      label: { he: 'עֶזְרָא · שִׁיבַת צִיּוֹן', en: 'Ezra · the return' },
      kind: 'return',
      total: 42360,
      breakdown: { en: 'Returnees 42,360 · servants 7,337 · singers 200' },
      summary: { en: 'The remnant counted back into the Land.' },
      detail: { en: 'The first formal Israelite count since David — about 500 years. Ezra 2 organizes by family and city of return, recalling the Bamidbar method of "bet av." The aggregate 42,360 is dramatically smaller than any Torah count, reflecting the post-Exile reality. The doubled register (Ezra 2 and Nechemiah 7) is nearly identical with minor numerical variations — a classical interpretive question (see Ibn Ezra on Ezra 2:64).' },
      sources: ['Ezra 2:1-67', 'Ezra 2:64', 'Nechemiah 7:6-67']
    }
  ],

  /* ============================================================
   * HALACHA — what each count became as binding law
   * ============================================================ */
  halacha: [
    {
      id: 'shekalim',
      label: { he: 'מַחֲצִית הַשֶּׁקֶל הַשְּׁנָתִית', en: 'Annual half-shekel' },
      summary: { en: 'The Torah\'s one-time half-shekel becomes an annual obligation.' },
      torahSource: { ref: 'Shemos 30:11-16', display: 'Shemos 30:11–16' },
      rabbinic: [
        { ref: 'Mishnah Shekalim 1:1', display: 'Mishnah Shekalim 1:1' },
        { ref: 'Megillah 13b', display: 'Megillah 13b' }
      ],
      rambam: { ref: 'Mishneh Torah, Shekel Dues 1:1', display: 'Rambam, Shekel Dues 1:1' },
      today: { en: 'No longer collected in the absence of the Mikdash, but the obligation underlies the custom of "zecher le-machatzit ha-shekel" — three half-coins given to tzedakah before Purim (Rama, Orach Chaim 694:1).' },
      detail: { en: 'From the first of Adar, courts publicly announce the obligation. By the first of Nissan, all funds must be collected — used to purchase that year\'s communal offerings and replenish the silver vessels of the Mikdash. The one-time Shemos 30 count generalizes into a permanent annual ritual of the same indirect method.' }
    },
    {
      id: 'pidyon',
      label: { he: 'פִּדְיוֹן הַבֵּן', en: 'Pidyon ha-Ben' },
      summary: { en: 'The Levite-firstborn arithmetic of Bamidbar 3 becomes permanent law.' },
      torahSource: { ref: 'Bamidbar 18:15-16', display: 'Bamidbar 18:15–16' },
      rabbinic: [
        { ref: 'Bekhorot 8a', display: 'Bekhoros 8a' },
        { ref: 'Bamidbar 3:47', display: 'Bamidbar 3:47 (the 5-shekel basis)' }
      ],
      rambam: { ref: 'Mishneh Torah, First Fruits and other Gifts to Priests Outside the Sanctuary 11:1', display: 'Rambam, Bikkurim 11:1' },
      today: { en: 'Practiced today: a firstborn son is redeemed at thirty days for five silver coins given to a Kohen. Exempt: Levite firstborn, Kohen firstborn, firstborn of a daughter of a Kohen or Levite, and any son not the firstborn of his mother (the criterion is "peter rechem").' },
      detail: { en: 'The 273 surplus firstborn of Bamidbar 3:46–47, each redeemed at 5 shekels, fix the redemption price for every Israelite firstborn son in perpetuity. Bamidbar 18 generalizes the procedure: the Kohen, not the Levite, is now the recipient — reflecting the post-Mishkan transition of redemption from the Levite framework to the Kohanic one.' }
    },
    {
      id: 'prohibition',
      label: { he: 'אִיסּוּר לִמְנוֹת אֶת יִשְׂרָאֵל', en: 'The prohibition on counting Israel' },
      summary: { en: 'The Shemos 30:12 principle becomes a categorical halacha.' },
      torahSource: { ref: 'Shemos 30:12', display: 'Shemos 30:12' },
      rabbinic: [
        { ref: 'Yoma 22b', display: 'Yoma 22b · Rabbi Yitzchak, Rabbi Elazar' },
        { ref: 'Hoshea 2:1', display: 'Hoshea 2:1 (the proof text)' }
      ],
      rambam: null,
      today: { en: 'Practical applications: a minyan is counted by a ten-word verse (typically "Hoshia et amecha"), one word per person — not by enumerating numerals. Statistical counts of Jews are similarly avoided through proxies (households, voter rolls).' },
      detail: { en: 'Rabbi Yitzchak: it is forbidden to count Israel even for a mitzvah ("dichtiv va-yifkdem be-Bezek"). Rabbi Elazar: one who counts Israel transgresses a lav, from Hoshea 2:1 — "ve-hayah mispar benei Yisrael ke-chol ha-yam asher lo yimad." Rav Nachman bar Yitzchak intensifies: two lavin, since the verse adds "ve-lo yisafer." The David disaster (Shmuel II 24) is read as the operative warning.' }
    },
    {
      id: 'levite-age',
      label: { he: 'גִּיל עֲבוֹדַת הַלְוִיִּם', en: 'Levite service age' },
      summary: { en: 'Three different age ranges across Tanach — Rashi harmonizes.' },
      torahSource: { ref: 'Bamidbar 4:3', display: 'Bamidbar 4:3 — 30 to 50' },
      rabbinic: [
        { ref: 'Bamidbar 8:24-25', display: 'Bamidbar 8:24–25 — 25 to 50' },
        { ref: 'Divrei Hayamim I 23:24-27', display: 'Divrei Hayamim I 23:24–27 — 20 and up (David)' }
      ],
      rambam: { ref: 'Mishneh Torah, Vessels of the Sanctuary 3:7', display: 'Rambam, Klei ha-Mikdash 3:7' },
      today: { en: 'Halachic evolution rather than contradiction. Rashi: from 25 the Levite learns; from 30 performs full service; at 50 retires from carrying. David lowers the floor to 20 only after the Beis HaMikdash is constructed — once the structure is fixed, the heavy carrying-work that defined the Bamidbar 4 age range no longer applies.' },
      detail: { en: 'The three texts describe three phases of the same office: (1) the wilderness, where Levites carry the Mishkan and require the 30–50 strength window; (2) the same wilderness for non-load Levite work, where the floor drops to 25 (apprentice years); (3) the fixed Mikdash under David, where age 20 suffices because the labor profile has changed.' }
    }
  ]
};
