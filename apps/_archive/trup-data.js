/* =========================================================
   TRUP — Ta'amei HaMikra master data
   window.TRUP_DATA
   Motif pitch sequences are CONTOUR-ACCURATE REFERENCE
   TRANSCRIPTIONS in equal temperament, keyed to the cited
   documented sources. They are study aids, not recordings.
   ========================================================= */
window.TRUP_DATA = {

  /* ---------- disjunctive ranks ---------- */
  ranks: {
    emperor:  { he:'קֵיסָרִים', en:'Emperors',  se:'Keisarim',  color:'var(--p-mita)',       note:'End of verse (sof pasuk / silluq) and mid-verse rest (esnachta).' },
    king:     { he:'מְלָכִים',  en:'Kings',      se:'Melachim',  color:'var(--p-karet)',      note:'Zakef katan (or gadol alone); tipcha near the emperors; segol / shalsheles in very long verses.' },
    duke:     { he:'מִשְׁנִים',  en:'Dukes',      se:'Mishnim',   color:'var(--p-rabbinic)',   note:'Revia by default; zarka near segol, pashta/yesiv near zakef, tevir near tipcha.' },
    count:    { he:'שְׁלִישִׁים', en:'Counts',     se:'Shlishim',  color:'var(--p-structural)', note:'Pazer, geresh, gershayim, telisha gedolah, munach legarmeh, karnei farah — cluster early in half-verses, so their motifs are the most florid.' },
    conj:     { he:'מְשָׁרְתִים', en:'Conjunctives', se:'Meshorsim', color:'var(--mute-soft)',  note:'Servants — join a word to what follows: munach, mercha, mahpach, darga, kadma, telisha ketanah, yerach ben yomo, mercha kefulah.' }
  },

  /* ---------- the 21-books (prose) taamim ---------- */
  prose: [
    { id:'sofpasuk', glyph:'סוֹף פָּסֽוּק', rank:'emperor',
      names:{ ashk:{he:'סוֹף פָּסוּק', se:'Sof Pasuk'}, sef:{he:'סוֹף פָּסוּק', se:'Sof Pasuk'}, ital:{he:'סוֹף פָּסוּק', se:'Sof Pasuk'} },
      meaning:'End of verse; the final note is also called silluk ("taking leave").',
      fn:'Closes every pasuk. Functions like a full stop.',
      seq:'(Mercha) Tipcha (Mercha) Sof-Pasuk — ends every verse.' },
    { id:'esnachta', glyph:'אֶתְנַחְתָּ֑א', rank:'emperor',
      names:{ ashk:{he:'אֶתְנַחְתָּא', se:'Esnachta'}, sef:{he:'אַתְנָח', se:'Atnach'}, ital:{he:'אַתְנָח', se:'Atnach'} },
      meaning:'"Rest, pause."',
      fn:'Marks the main mid-verse division — the semicolon of the pasuk. Everything before it is cited as "a," after as "b."',
      seq:'(Mercha) Tipcha (Munach) Esnachta.' },
    { id:'segol', glyph:'סֶגּוֹל֒', rank:'king',
      names:{ ashk:{he:'סֶגּוֹל', se:'Segol'}, sef:{he:'סְגוֹלְתָּא', se:'Segolta'}, ital:{he:'שְׁרֵי', se:'Shere'} },
      meaning:'"Grape-bunch," from its three-dot shape.',
      fn:'Strong second-level break used only in very long verses; always preceded by zarka.',
      seq:'(Munach) Zarka (Munach) Segol.' },
    { id:'shalsheles', glyph:'שַׁלְשֶׁ֓לֶת', rank:'king',
      names:{ ashk:{he:'שַׁלְשֶׁלֶת', se:'Shalsheles'}, sef:{he:'שַׁלְשֶׁלֶת', se:'Shalshelet'}, ital:{he:'שַׁלְשֶׁלֶת', se:'Shalshelet'} },
      meaning:'"Chain" — a long oscillating run.',
      fn:'Replaces a segol standing alone at the start of a verse.',
      occur:'Only 4 in the Torah: Bereishis 19:16, 24:12, 39:8; Vayikra 8:23 — each a moment of hesitation.',
      seq:'Stands alone; always first word of the pasuk.' },
    { id:'zakefkatan', glyph:'זָקֵף קָטָ֔ן', rank:'king',
      names:{ ashk:{he:'זָקֵף קָטָן', se:'Zakef Katan'}, sef:{he:'זָקֵף קָטוֹן', se:'Zakef Katon'}, ital:{he:'זָקֵף קָטוֹן', se:'Zakef Katon'} },
      meaning:'"Small upright."',
      fn:'The workhorse second-level disjunctive — the comma of the system.',
      seq:'(Mahpach) Pashta (Munach) Zakef-katan.' },
    { id:'zakefgadol', glyph:'זָקֵף גָּד֕וֹל', rank:'king',
      names:{ ashk:{he:'זָקֵף גָּדוֹל', se:'Zakef Gadol'}, sef:{he:'זָקֵף גָּדוֹל', se:'Zakef Gadol'}, ital:{he:'זָקֵף גָּדוֹל', se:'Zakef Gadol'} },
      meaning:'"Large upright."',
      fn:'Replaces zakef katan when it stands on its own phrase (no pashta or munach before it).',
      seq:'Stands alone in place of a zakef sequence.' },
    { id:'tipcha', glyph:'טִפְחָ֖א', rank:'king',
      names:{ ashk:{he:'טִפְחָא', se:'Tipcha'}, sef:{he:'טַרְחָא', se:'Tarcha'}, ital:{he:'טַרְחָא', se:'Tarcha'} },
      meaning:'"Hand-breadth" (possibly a cheironomy gesture); Sephardim: tarcha, "dragging" — hence the saying "after tarcha, atnach": after toil, rest.',
      fn:'Second-level disjunctive that replaces zakef immediately before sof pasuk or esnachta.',
      seq:'(Mercha) Tipcha — before both emperors.' },
    { id:'revia', glyph:'רְבִ֗יעַ', rank:'duke',
      names:{ ashk:{he:'רְבִיעִי', se:'Revia'}, sef:{he:'רָבִיעַ', se:'Ravia'}, ital:{he:'רְבִיעַ', se:'Revia'} },
      meaning:'Aramaic "fourth" (likely its four-note tune) or "crouching"; folk etymology: "square."',
      fn:'Default third-level disjunctive.',
      seq:'Munach Revia; Darga Munach Revia; Munach-legarmeh (Munach) Revia.' },
    { id:'zarka', glyph:'זַרְקָא֮', rank:'duke',
      names:{ ashk:{he:'זַרְקָא', se:'Zarka'}, sef:{he:'זַרְקָא', se:'Zarka'}, ital:{he:'זַרְקָא', se:'Zarka'} },
      meaning:'"Scatterer / thrower."',
      fn:'Third-level disjunctive appearing only before segol.',
      seq:'(Munach) Zarka (Munach) Segol.' },
    { id:'pashta', glyph:'פַּשְׁטָא֙', rank:'duke',
      names:{ ashk:{he:'פַּשְׁטָא', se:'Pashta'}, sef:{he:'קַדְמָא', se:'Kadma'}, ital:{he:'פַּשְׁטָא', se:'Pashta'} },
      meaning:'"Stretching out." NB: Sephardim call this sign kadma — and call the Ashkenazi kadma "azla."',
      fn:'Third-level disjunctive near zakef. Written on the last consonant; doubled (shenei pashtin / terei kadmin) when stress is not final.',
      seq:'(Mahpach) Pashta … Zakef-katan.' },
    { id:'yesiv', glyph:'יְ֚תִיב', rank:'duke',
      names:{ ashk:{he:'יְתִיב', se:'Yesiv'}, sef:{he:'(שׁוֹפָר) יְתִיב', se:'(Shofar) Yetiv'}, ital:{he:'שׁוֹפָר יְתִיב', se:'Shofar Yetiv'} },
      meaning:'"Sitting / resting horn."',
      fn:'Replaces pashta on a short word standing alone before zakef.',
      seq:'Yesiv (Munach) Zakef-katan.' },
    { id:'tevir', glyph:'תְּבִ֛יר', rank:'duke',
      names:{ ashk:{he:'תְּבִיר', se:'Tevir'}, sef:{he:'תְּבִיר', se:'Tevir'}, ital:{he:'תְּבִיר', se:'Tevir'} },
      meaning:'"Broken" — a downward tumble.',
      fn:'Third-level disjunctive in the neighborhood of tipcha.',
      seq:'Darga Tevir or Mercha Tevir.' },
    { id:'pazer', glyph:'פָּזֵ֡ר', rank:'count',
      names:{ ashk:{he:'פָּזֵר', se:'Pazer'}, sef:{he:'פָּזֶר גָּדוֹל', se:'Pazer Gadol'}, ital:{he:'פָּזֶר גָּדוֹל', se:'Pazer Gadol'} },
      meaning:'"Lavish, strewn."',
      fn:'Fourth-level disjunctive; usually followed by a telisha, may take several munachs.',
      seq:'(Munach…) Pazer Telisha…' },
    { id:'karneifarah', glyph:'קַרְנֵי פָרָ֟ה', rank:'count',
      names:{ ashk:{he:'קַרְנֵי פָרָה', se:'Karnei Farah'}, sef:{he:'קַרְנֵי פָרָה', se:'Karne Farah'}, ital:{he:'קַרְנֵי פָרָה', se:'Karne Farah'} },
      meaning:'"Horns of a cow."',
      fn:'Grand pazer. Preceded by yerach ben yomo.',
      occur:'Once in the entire Torah — Bamidbar 35:5 (אַלְפַּיִם בָּאַמָּה, Parashas Masei).',
      seq:'Yerach-ben-yomo Karnei-farah.' },
    { id:'telishagedolah', glyph:'תְּ֠לִישָא גְדוֹלָה', rank:'count',
      names:{ ashk:{he:'תְּלִישָׁא גְדוֹלָה', se:'Telisha Gedolah'}, sef:{he:'תַּלְשָׁא', se:'Talsha'}, ital:{he:'תִּרְצָה', se:'Tirtzah'} },
      meaning:'"Detached (large)."',
      fn:'Fourth-level disjunctive; written on the first consonant.',
      seq:'(Munach) Telisha-gedolah … Kadma.' },
    { id:'geresh', glyph:'אַזְלָא־גֵּ֜רֵשׁ', rank:'count',
      names:{ ashk:{he:'אַזְלָא־גֵּרֵשׁ', se:'Azla-Geresh'}, sef:{he:'גְּרִישׁ', se:'Gerish'}, ital:{he:'גֵּרֵשׁ', se:'Geresh'} },
      meaning:'"Expulsion / divorce"; azla = "going away."',
      fn:'Fourth-level disjunctive, usually in the pair kadma-v\'azla; doubled glyph unless following kadma or on non-final stress.',
      seq:'Kadma v\'Azla (Sephardic: Azla Gerish).' },
    { id:'gershayim', glyph:'גֵּרְשַׁ֞יִם', rank:'count',
      names:{ ashk:{he:'גֵּרְשַׁיִם', se:'Gershayim'}, sef:{he:'שְׁנֵי גְרִישִׁין', se:'Shenei Gerishin'}, ital:{he:'שְׁנֵי גְרֵישִׁין', se:'Shene Ghereshin'} },
      meaning:'"Double geresh."',
      fn:'Fulfils the function of kadma-v\'azla on a single word.',
      seq:'Stands alone where kadma-v\'azla would go.' },
    { id:'munachlegarmeh', glyph:'מֻנַּח לְגַרְמֵ֣הּ׀', rank:'count',
      names:{ ashk:{he:'מֻנַּח לְגַרְמֵהּ', se:'Munach Legarmeh'}, sef:{he:'פָּסֵק', se:'Pasek'}, ital:{he:'לְגַרְמֵהּ', se:'Legarmeh'} },
      meaning:'"Munach on its own" — distinguished by the pesik line after the word.',
      fn:'Disjunctive munach, mainly before revia.',
      seq:'Munach-legarmeh (Munach) Revia.' },
    { id:'mercha', glyph:'מֵרְכָ֥א', rank:'conj',
      names:{ ashk:{he:'מֵרְכָא', se:'Mercha'}, sef:{he:'מַאֲרִיךְ', se:'Maarich'}, ital:{he:'מַאֲרִיךְ', se:'Maarich'} },
      meaning:'"Lengthener."',
      fn:'Conjunctive before tipcha, sof pasuk, and sometimes tevir.',
      seq:'Mercha Tipcha; Mercha Sof-Pasuk.' },
    { id:'munach', glyph:'מֻנַּ֣ח', rank:'conj',
      names:{ ashk:{he:'מֻנַּח', se:'Munach'}, sef:{he:'שׁוֹפָר הוֹלֵךְ', se:'Shofar Holech'}, ital:{he:'שׁוֹפָר עִלּוּי', se:'Shofar Illui'} },
      meaning:'"Resting"; Sephardim: "going horn," from its shofar shape.',
      fn:'The general conjunctive — before esnachta, zakef, segol, revia and more.',
      seq:'Munach Esnachta; Munach Zakef-katan…' },
    { id:'mahpach', glyph:'מַהְפַּ֤ךְ', rank:'conj',
      names:{ ashk:{he:'מַהְפַּךְ', se:'Mahpach'}, sef:{he:'(שׁוֹפָר) מְהֻפָּךְ', se:'(Shofar) Mehuppach'}, ital:{he:'שׁוֹפָר הָפוּךְ', se:'Shofar Hafuch'} },
      meaning:'"Turning round" — a reversed horn.',
      fn:'Conjunctive before pashta.',
      seq:'Mahpach Pashta.' },
    { id:'darga', glyph:'דַּרְגָּ֧א', rank:'conj',
      names:{ ashk:{he:'דַּרְגָּא', se:'Darga'}, sef:{he:'דַּרְגָּא', se:'Darga'}, ital:{he:'דַּרְגָּא', se:'Darga'} },
      meaning:'"Stairstep," from its shape and sound.',
      fn:'Conjunctive before tevir in longer phrases (mercha serves shorter ones).',
      seq:'Darga Tevir; occasionally Darga Munach Revia.' },
    { id:'kadma', glyph:'קַדְמָ֨א', rank:'conj',
      names:{ ashk:{he:'קַדְמָא', se:'Kadma'}, sef:{he:'אַזְלָא', se:'Azla'}, ital:{he:'קַדְמָא', se:'Kadma'} },
      meaning:'"Preceding." Sephardim reserve "azla" for this sign before gerish; elsewhere it is kadma mechabber.',
      fn:'Conjunctive before geresh (kadma-v\'azla) and mahpach.',
      seq:'Kadma v\'Azla.' },
    { id:'telishaketanah', glyph:'תְּלִישָא קְטַנָּה֩', rank:'conj',
      names:{ ashk:{he:'תְּלִישָׁא קְטַנָּה', se:'Telisha Ketanah'}, sef:{he:'תַּלְשָׁא / תַּרְסָא', se:'Tarsa'}, ital:{he:'תַּרְסָא', se:'Tarsa'} },
      meaning:'"Detached (small)"; written on the last consonant.',
      fn:'Conjunctive before kadma, typically after pazer.',
      seq:'Pazer Telisha-ketanah Kadma…' },
    { id:'merchakefulah', glyph:'מֵרְכָא כְּפוּלָ֦ה', rank:'conj',
      names:{ ashk:{he:'מֵרְכָא כְּפוּלָה', se:'Mercha Kefulah'}, sef:{he:'תְּרֵי טַעֲמֵי', se:'Terei Taamei'}, ital:{he:'תְּרֵין חוּטְרִין', se:'Teren Chutrin'} },
      meaning:'"Double mercha." Debated whether conjunctive or occasional tevir-replacement.',
      occur:'Only 5 in the Torah: Bereishis 27:25; Shemos 5:15; Vayikra 10:1; Bamidbar 14:3, 32:42 — and once in a haftarah.',
      fn:'Rare; usually after darga, functioning like tevir.',
      seq:'Darga Mercha-kefulah.' },
    { id:'yerach', glyph:'יֶרַח בֶּן יוֹמ֪וֹ', rank:'conj',
      names:{ ashk:{he:'יֶרַח בֶּן יוֹמוֹ', se:'Yerach Ben Yomo'}, sef:{he:'יָרֵחַ בֶּן יוֹמוֹ', se:'Yareach Ben Yomo'}, ital:{he:'יֶרַח בֶּן יוֹמוֹ', se:'Yerach Ben Yomo'} },
      meaning:'"Day-old moon"; also called galgal ("circle").',
      fn:'Conjunctive serving only karnei farah.',
      occur:'Once in the Torah — Bamidbar 35:5.',
      seq:'Yerach-ben-yomo Karnei-farah.' }
  ],

  /* ---------- ta'amei emes (Tehillim · Mishlei · Iyov) ---------- */
  emes: [
    { id:'e_silluk', glyph:'סוֹף פָּסֽוּק', rank:'emperor', names:{ashk:{he:'סִלּוּק',se:'Silluk'}},
      meaning:'End of verse.', fn:'Closes every pasuk, as in the prose system.' },
    { id:'e_olehveyored', glyph:'עוֹלֶ֫ה וְיוֹרֵ֥ד', rank:'emperor', names:{ashk:{he:'עוֹלֶה וְיוֹרֵד',se:'Oleh V\'Yored'}},
      meaning:'"Rising and falling."',
      fn:'Ends the FIRST stich of a three-stich verse — stronger than esnachta here. Looks like mahpach above the word followed by tipcha, on one word or two.' },
    { id:'e_esnachta', glyph:'אֶתְנַחְתָּ֑א', rank:'emperor', names:{ashk:{he:'אֶתְנַחְתָּא',se:'Esnachta'}},
      meaning:'"Rest."', fn:'Ends the first stich of a two-stich verse, or the second of a three-stich verse. Weaker in emes than in prose.' },
    { id:'e_reviagadol', glyph:'רְבִ֗יעַ גָּדוֹל', rank:'king', names:{ashk:{he:'רְבִיעַ גָּדוֹל',se:'Revia Gadol'}},
      meaning:'"Great revia."', fn:'Major divider inside a stich (away from oleh v\'yored).' },
    { id:'e_reviakatan', glyph:'רְבִ֗יעַ קָטָן', rank:'king', names:{ashk:{he:'רְבִיעַ קָטָן',se:'Revia Katan'}},
      meaning:'"Small revia."', fn:'Immediately before oleh v\'yored.' },
    { id:'e_reviamugrash', glyph:'רְבִ֗יעַ מֻגְרָ֝שׁ', rank:'king', names:{ashk:{he:'רְבִיעַ מֻגְרָשׁ',se:'Revia Mugrash'}},
      meaning:'Revia + geresh-muqdam sign.', fn:'Divides the final stich before silluk.' },
    { id:'e_tzinnor', glyph:'צִנּוֹר֮', rank:'king', names:{ashk:{he:'צִנּוֹר',se:'Tzinnor'}},
      meaning:'"Pipe" — looks like the prose zarka.', fn:'Major disjunctive within a stich.' },
    { id:'e_dechi', glyph:'דֶּחִ֭י', rank:'duke', names:{ashk:{he:'דֶּחִי',se:'Dechi'}},
      meaning:'"Pushed aside" — looks like tipcha but sits UNDER the first letter, right of the vowel.',
      fn:'Divides the first (or only) stich.' },
    { id:'e_pazer', glyph:'פָּזֵ֡ר', rank:'count', names:{ashk:{he:'פָּזֵר גָּדוֹל',se:'Pazer Gadol'}},
      meaning:'"Lavish."', fn:'Minor disjunctive.' },
    { id:'e_shalshelesgedolah', glyph:'שַׁלְשֶׁ֓לֶת׀', rank:'count', names:{ashk:{he:'שַׁלְשֶׁלֶת גְּדוֹלָה',se:'Shalsheles Gedolah'}},
      meaning:'"Great chain," with pesik.', fn:'Minor disjunctive.' },
    { id:'e_azlalegarmeh', glyph:'אַזְלָ֨א לְגַרְמֵהּ׀', rank:'count', names:{ashk:{he:'אַזְלָא לְגַרְמֵהּ',se:'Azla Legarmeh'}},
      meaning:'Looks like kadma, with pesik.', fn:'Minor disjunctive.' },
    { id:'e_mehupachlegarmeh', glyph:'מְהֻפָּ֤ךְ לְגַרְמֵהּ׀', rank:'count', names:{ashk:{he:'מְהֻפָּךְ לְגַרְמֵהּ',se:'Mehupach Legarmeh'}},
      meaning:'Looks like mahpach, with pesik.', fn:'Minor disjunctive; without pesik it can open a stich.' },
    { id:'e_illuy', glyph:'עִלּ֬וּי', rank:'conj', names:{ashk:{he:'עִלּוּי',se:'Illuy'}},
      meaning:'"Elevated" — a munach written ABOVE the word.', fn:'Conjunctive.' },
    { id:'e_tsinnoris', glyph:'צִנּוֹרִת֘', rank:'conj', names:{ashk:{he:'צִנּוֹרִית',se:'Tsinnoris'}},
      meaning:'Small tzinnor; combines with mercha or mahpach.', fn:'Conjunctive combination sign. (Unicode swaps the zarka/tsinnorit code points — U+05AE is the real zarka/tzinnor, U+0598 the tsinnorit.)' },
    { id:'e_galgal', glyph:'גַּלְגַּ֪ל', rank:'conj', names:{ashk:{he:'גַּלְגַּל',se:'Galgal'}},
      meaning:'"Wheel" — the prose yerach ben yomo.', fn:'Conjunctive.' },
    { id:'e_atnachhafukh', glyph:'אֶתְנָח הָפוּךְ֢', rank:'conj', names:{ashk:{he:'אֶתְנָח הָפוּךְ',se:'Atnach Hafuch'}},
      meaning:'"Inverted esnachta."', fn:'Conjunctive (poetic books only).' }
  ],

  /* ---------- the six+ melody systems (kriyos) ---------- */
  systems: [
    { id:'torah',   he:'קְרִיאַת הַתּוֹרָה', se:'Krias HaTorah', en:'Torah — year-round',
      when:'Shabbos, Mondays & Thursdays, Rosh Chodesh, Yom Tov, fasts.',
      character:'The base melody. Ashkenaz-East: major-tinged mode circling a reciting tone, cadencing low at sof pasuk. Sephardi-Yerushalmi, Syrian, Egyptian & Baghdadi: always (or almost always) Maqam Sigah. A coda motif replaces the trup on the last words of every aliyah; a grander coda ends each chumash, cueing "Chazak chazak v\'nischazek!"' },
    { id:'hnr',     he:'יָמִים נוֹרָאִים', se:'Yamim Noraim', en:'Torah — Rosh Hashanah & Yom Kippur',
      when:'Rosh Hashanah, Yom Kippur; echoes on Simchas Torah and in some fast-day readings.',
      character:'Ashkenazi-only system (no Sephardic tradition has a special RH/YK tune). Shares scale and focal pitches with the Haftarah mode but stays grounded on its reciting tone — solemn, with tonal-center shifts at verse endings.' },
    { id:'haftarah',he:'הַפְטָרָה', se:'Haftarah', en:'Haftarah / Nevi\'im',
      when:'After every Torah reading on Shabbos, Yom Tov and fasts.',
      character:'Minor-mode; reaches upward with "gestures of yearning" (Ashk). Coda at the end of the haftarah modulates minor→major into the closing brachos. Also the theoretical tune for private study of Nevi\'im and late Kesuvim.' },
    { id:'esther',  he:'מְגִלַּת אֶסְתֵּר', se:'Megillas Esther', en:'Esther — Purim',
      when:'Purim night and morning.',
      character:'Light and joyous with unusual melodic mobility; the pasuk coda dips major→minor for seriousness. Churban-verses are read in Eicha melody; folk customs (neighing on סוס) are extra-masoretic. Syrian tradition: Maqam Saba-Mouhayar.' },
    { id:'eicha',   he:'מְגִלַּת אֵיכָה', se:'Megillas Eicha', en:'Eicha — Tisha B\'Av',
      when:'Tisha B\'Av night; also the haftaros of the Three Weeks (non-chassidic custom) and churban-verses elsewhere.',
      character:'Mournful, narrow-range, with a signature "tonal collapse" — phrases sag downward. The most emotionally marked of the six. Syrian tradition, counterintuitively: Maqam Ajam.' },
    { id:'megillos',he:'שָׁלֹשׁ מְגִלּוֹת', se:'Shalosh Megillos', en:'Shir HaShirim · Rus · Koheles',
      when:'Pesach (Shir), Shavuos (Rus), Sukkos (Koheles).',
      character:'The "general" megillah melody of Ashkenaz — flowing, pastoral major. Eastern communities instead keep distinct tunes: Syrian Shir HaShirim is Maqam Bayat (read every leil Shabbos), Rus is Maqam Hoseni — and the Rus tune is the default for any Kesuvim book lacking its own (Iyov 1–2, Koheles, Daniel, Ezra-Nechemiah, Divrei HaYamim).' },
    { id:'emes',    he:'טַעֲמֵי אֱמֶ"ת', se:'Ta\'amei Emes', en:'Tehillim · Mishlei · Iyov',
      when:'Syrian & Eastern: Mishlei on the Shabbosos of Sefirah, Iyov on Tisha B\'Av, Tehillim on many occasions.',
      character:'A different accent SYSTEM, not just a tune — verses divide into 1–3 stichs governed by oleh v\'yored / esnachta. Ashkenaz preserved no melody for it; the Syrian tradition did (Tehillim in Maqam Nahwand, Egyptians in Rast; Mishlei in a Sigah distinct from Torah; Iyov in "undeveloped Rast," its narrative frame read like Rus until 3:2). Yerushalayim\'s Aderet Eliyahu (Zilberman) yeshiva revived an adaptation.' },
    { id:'extras',  he:'מִנְהָגֵי קְרִיאָה', se:'Minhagei Kriah', en:'Liturgical extras',
      when:'Special passages inside the Torah reading.',
      character:'Ta\'am elyon for the Aseres HaDibros (S&P "High Na\'um" tune); Az Yashir brick-pattern chant; the Masa\'os list; Tocheicha read low and fast; special codas before Chazak.' }
  ],

  /* ---------- traditions (mesoros) with earliest documentation ---------- */
  traditions: [
    { id:'ashkE', he:'אַשְׁכְּנַז — מִזְרָח', se:'Ashkenaz — Lita/Polin', en:'Eastern Ashkenazi',
      blurb:'Polish-Lithuanian melody; the most widely used trup in the world today, in Israel and the diaspora. Six full melody systems. This site\'s Torah bank is transcribed directly from the JE 1905 plates ("Ashkenazim, 1902" row).',
      earliest:{ date:'1905 / 1957–59', src:'Systematic notation: Jewish Encyclopedia comparative plates by F.L. Cohen (1905, pp. 539–547 — including a fully worked Bereishis 22:1); S. Rosowsky, The Cantillation of the Bible (1957); A.W. Binder, Biblical Chant (1959). The oral tradition itself is centuries older.' } },
    { id:'ashkW', he:'אַשְׁכְּנַז — מַעֲרָב', se:'Ashkenaz — Yekkish', en:'Western Ashkenazi (German)',
      blurb:'Central/West-European melody, diminished after the Churban of Europe but alive in communities such as Great Britain (and KAJ). Applies a haftarah coda to every verse. Now a playable first-class bank on this site, transcribed from the JE 1905 "Ashkenazim, 1518" row.',
      earliest:{ date:'1518', src:'Böschenstein\'s four-part transcription in Johannes Reuchlin, De Accentibus et Orthographia Linguae Hebraicae (Hagenau 1518), Book III — the EARLIEST musical notation of trup anywhere. The melody Reuchlin recorded is recognizably the German tradition still in use; JE 1905 reprints it as a dedicated comparison row.' } },
    { id:'sefY', he:'סְפָרַדִּי־יְרוּשַׁלְמִי', se:'Sepharadi-Yerushalmi', en:'Jerusalem-Sephardic',
      blurb:'The dominant Sephardic melody in Israel; one family with the Syrian, Egyptian, Turkish/Balkan and Baghdad melodies. Torah is read in Maqam Sigah. Descends from the simpler of the two Syrian modes.',
      earliest:{ date:'1905 / 1914–32', src:'Jewish Encyclopedia (1905) prints a single "Syria and Egypt" melody; A.Z. Idelsohn, Thesaurus of Hebrew Oriental Melodies vol. IV — Oriental Sephardim (1923), from phonograph fieldwork in Yerushalayim 1907–1921.' } },
    { id:'syr', he:'אֲרַם צוֹבָא', se:'Halab / Syrian', en:'Syrian (Aleppo & Damascus)',
      blurb:'Two Torah modes — a simple general one (ancestor of Sepharadi-Yerushalmi) and an elaborate chazzanic one. Uniquely rich: keeps melodies for Tehillim, Mishlei and the poetry of Iyov, each assigned a maqam (per pizmonim.org): Torah Sigah · Mishlei Sigah-variant · Tehillim Nahwand · Iyov "undeveloped Rast" · Shir Bayat · Rus Hoseni · Eicha Ajam · Esther Saba-Mouhayar · Mishnah Nawah.',
      earliest:{ date:'1743 / 1911 / 1923', src:'Baghdad melody possibly imported from Syria with Chief Rabbi Sadka Bekhor Hussein (1743); phonograph recordings of Salem Aisbeda & Haim Asriqi (1911, preserved on pizmonim.org); JE tables (1905); Idelsohn Thesaurus vol. IV (1923). Modern scholarship: Mark Kligman on Syrian maqam practice.' } },
    { id:'sp', he:'סְפָרַדִּים מַעֲרָבִיִּים', se:'Spanish & Portuguese', en:'Spanish & Portuguese',
      blurb:'London, Amsterdam, Livorno, Gibraltar, New York. Related to Spanish-Moroccan and Mosul-Iraqi melodies — remains of an old Arab-Jewish layer predating the Ottoman-Sephardic tradition. "High Na\'um" tune for the Aseres HaDibros b\'ta\'am elyon. No psalm-trup tradition, though evening-service psalm melodies resemble Syrian psalm cantillation — a possible remnant.',
      earliest:{ date:'1699 / 1857', src:'David de Pinna\'s four pages of noted Pentateuch cantillation (Amsterdam Portuguese tradition) in Jablonski\'s Biblia Hebraica (Berlin 1699) — an early and highly important published notation of Sephardic trup. Systematic publication: de Sola & Aguilar, The Ancient Melodies of the Liturgy of the Spanish and Portuguese Jews (London 1857).' } },
    { id:'iraq', he:'בָּבֶל', se:'Bavli / Iraqi', en:'Iraqi (Baghdad & Mosul)',
      blurb:'Two melodies: Baghdad (close to Syrian, perhaps imported 1743) and a distinct Mosul melody — likely the older Iraqi layer — carried by the Iraqi diaspora, especially India.',
      earliest:{ date:'1923', src:'Idelsohn, Thesaurus vol. II — Songs of the Babylonian Jews (1923). The geonic-era Babylonian LETTER notation (below, Timeline) is this community\'s ancient ancestor.' } },
    { id:'mor', he:'מָרוֹקוֹ', se:'Maroko', en:'Moroccan',
      blurb:'Spanish-Moroccan on the northern coast; Arab-Moroccan inland. Algerian, Tunisian and Libyan melodies sit between Moroccan and Jerusalem-Sephardic.',
      earliest:{ date:'1929–32', src:'Idelsohn, Thesaurus vol. V — Songs of the Moroccan Jews; 20th-c. field recordings.' } },
    { id:'yem', he:'תֵּימָן', se:'Teiman', en:'Yemenite (Baladi)',
      blurb:'Eight disjunctive motifs in four patterns — molikh (moving), mafsik (pausing), ma\'amid (elongating), plus the esnacha and silluk patterns — conjunctives on a monotone. A living relic of the Babylonian eight-break system. Children learn a simplified tune used for the 6th aliyah and Targum.',
      earliest:{ date:'1914 / 1917', src:'Idelsohn, Thesaurus vol. I — Songs of the Yemenite Jews (1914); Phonographierte Gesänge (Vienna 1917). Structure mirrors geonic Babylonian manuscripts (8 letter-signs, no conjunctives).' } },
    { id:'ital', he:'אִיטַלְיָה', se:'Italia', en:'Italian',
      blurb:'Highly local — Rome resembles S&P; the north differs. Italy preserves living CHEIRONOMY: hand-signals showing the reader the tune, the practice that may have named tipcha ("hand-breadth").',
      earliest:{ date:'1954–61', src:'Leo Levi\'s Italian field-recording campaign (CNSMP/National Sound Archives); earlier partial notations in 19th-c. Italian cantorial books.' } },
    { id:'rom', he:'רוֹמַנְיוֹטִים', se:'Romaniote', en:'Romaniote (Greek)',
      blurb:'Byzantine-rooted style, today in Greece, Israel and New York.',
      earliest:{ date:'20th c.', src:'Modern field recordings; the community\'s Byzantine matrix suggests far older roots.' } }
  ],

  /* ---------- Tehillim tunes — the special section ---------- */
  tehillim: {
    intro:'Tehillim carries the emes accent system, but which communities can actually SING it? The documented map:',
    facts:[
      { he:'סוּרְיָא', title:'Syrian psalm cantillation', txt:'The fullest living tradition: real motifs for oleh v\'yored, esnachta, revia, dechi and tzinnor, sung when Tehillim is read liturgically — in Maqam Nahwand (Egyptian communities: Maqam Rast). Documented by Idelsohn (Thesaurus IV), 1911 phonograph recordings (Aisbeda/Asriqi), and living recordings of G. Shrem and others on pizmonim.org.' },
      { he:'אַשְׁכְּנַז', title:'Ashkenaz — a lost melody', txt:'European Jewry never read Tehillim/Mishlei/Iyov publicly with trup, so no Ashkenazi emes melody survives. The Aderet Eliyahu ("Zilberman") yeshiva in the Old City adapted the Syrian melody, and this revival is spreading among Ashkenazim.' },
      { he:'סְפָרַד', title:'Spanish & Portuguese — a remnant', txt:'No formal psalm-trup tradition, but the melodies used for several psalms in Arvis are noticeably similar to Syrian psalm cantillation — likely the fossil of a lost tradition.' },
      { he:'תֵּימָן', title:'Yemenite', txt:'Applies its 8-motif Babylonian-style system to the poetic books as to everything else — same four patterns, different realization.' },
      { he:'הַלֵּל', title:'Hallel & liturgy vs. trup', txt:'When Tehillim enters davening (Hallel, Kabbalas Shabbos, Pesukei d\'Zimra) it is sung to LITURGICAL melodies and nusach modes, not to the emes accents — a separate musical channel that often preserves older modal material.' },
      { he:'עִיּוּן', title:'Scholarly reconstructions', txt:'Suzanne Haïk-Vantoura (1976) claimed to decode the original emes music from the sign shapes; musicologists broadly reject the method. Jeffrey Burns\' The Music of Psalms, Proverbs and Job in the Hebrew Bible (posth. 2011) is the serious modern musicological treatment.' }
    ],
    mechanics:'Verse anatomy: 1–3 stichs. Two stichs → first ends with esnachta. Three → first ends with OLEH V\'YORED (the strongest divider, outranking esnachta here), second with esnachta. Inside a stich: revia katan (right before oleh v\'yored), revia gadol (elsewhere), tzinnor; dechi divides a first stich, revia mugrash the last. Minor disjunctives: pazer, shalsheles gedolah, azla legarmeh, mehupach legarmeh — all but pazer carry a pesik.'
  },

  /* ---------- historical timeline ---------- */
  timeline: [
    { date:'c. 444 BCE', he:'עֶזְרָא', title:'Ezra\'s public reading', cls:'text',
      txt:'"וַיִּקְרְאוּ בַסֵּפֶר… מְפֹרָשׁ וְשׂוֹם שֶׂכֶל וַיָּבִינוּ בַּמִּקְרָא" (Nechemiah 8:8). The Gemara (Nedarim 37b, Megillah 3a) reads "vayavinu bamikra" as פִּסּוּק טְעָמִים — the earliest text the mesorah itself cites for trup.' },
    { date:'3rd c. CE', he:'אָמוֹרָאִים', title:'Talmudic testimony to chant', cls:'text',
      txt:'Megillah 32a — R\' Yochanan: "Whoever reads without ne\'imah and learns without zimrah…" (Yechezkel 20:25 applied). Nedarim 37b debates whether pisuk te\'amim is m\'Sinai. Chironomy (hand-signals) is described by Rashi (Berachos 62a) as ta\'amei Torah shown with the right hand.' },
    { date:'c. 500–900', he:'בָּבֶל', title:'Babylonian letter notation', cls:'notation',
      txt:'Geonic-era Bavli manuscripts mark verse-breaks with up to EIGHT small Hebrew letters (e.g. tav for tevir) — disjunctives only, no conjunctives, no low-grade breaks. Its eight-break skeleton survives today in the Yemenite 8-motif system.' },
    { date:'c. 600–800', he:'אֶרֶץ יִשְׂרָאֵל', title:'Palestinian dot notation', cls:'notation',
      txt:'Fragmentary Genizah manuscripts from Judaea/Galilee mark PHRASES (tipcha-esnachta, zarka-segolta, pashta-zakef chains) with dot-sequences — likely readers\' aide-mémoire. Its phrase-logic survives in Sephardic modes, where conjunctives are flourishes leading into the next disjunctive.' },
    { date:'7th–9th c.', he:'טְבֶרְיָה', title:'The Tiberian system', cls:'notation',
      txt:'The Masoretes of Teveryah (Ben Asher school) build the comprehensive system — one symbol on every word, a full grammar of disjunctive ranks and conjunctive servants. This is the notation in every Tanach today.' },
    { date:'895 CE', he:'כֶּתֶר', title:'Cairo Codex of the Prophets', cls:'ms',
      txt:'Moshe ben Asher\'s codex of Nevi\'im — earliest dated Tiberian-pointed codex (colophon date; debated by some scholars).' },
    { date:'c. 930', he:'כֶּתֶר אֲרָם צוֹבָא', title:'Aleppo Codex & Dikdukei HaTe\'amim', cls:'ms',
      txt:'The Keter — written by Shlomo ben Buya\'a, pointed by Aharon ben Moshe ben Asher, the model Tiberian codex. Ben Asher\'s treatise דִּקְדּוּקֵי הַטְּעָמִים is the first rule-book of the accents (names and classes differ somewhat from today\'s).' },
    { date:'1008', he:'לֶנִינְגְרַד', title:'Leningrad Codex', cls:'ms',
      txt:'Oldest complete Tanach manuscript, fully pointed with te\'amim — the base of modern critical editions.' },
    { date:'11th c.', he:'אבן בלעם', title:'First emes monograph', cls:'text',
      txt:'R\' Yehudah ibn Bil\'am, Sha\'ar Ta\'amei Sheloshah Sifrei Eme"s (printed 1556) — dedicated treatise on the poetic accents. A medieval versified rulebook, Ta\'amei Eme"s BaCharuzim by Yosef bar Kalonymus, survives in the Machzor of Casal Maggiore (printed 1485).' },
    { date:'c. 1102–1150', he:'עוֹבַדְיָה הַגֵּר', title:'Earliest Hebrew music notation', cls:'music',
      txt:'Ovadiah the Norman Ger (Johannes of Oppido, converted 1102) writes piyyutim — including מִי עַל הַר חוֹרֵב — in Lombardic/Beneventan NEUMES. Found in the Cairo Genizah (identified 1918/1965). The oldest surviving notated Jewish music — though piyyut, not trup.' },
    { date:'13th c.', he:'הִתְפַּשְּׁטוּת', title:'Tiberian system universal', cls:'notation',
      txt:'All communities have adopted Tiberian signs, each re-mapping its inherited chant onto them — one short motif per symbol. The process goes furthest in Western Ashkenaz and the Ottoman-Sephardic world.' },
    { date:'1518', he:'רייכלין', title:'First notated trup', cls:'music',
      txt:'Böschenstein\'s transcription in Reuchlin\'s De Accentibus (Hagenau) — trup as tenor cantus firmus in four-part harmony. The melody matches the German (Yekkish) tradition still sung today: proof of 500+ years of melodic stability.' },
    { date:'1699', he:'די פינה', title:'de Pinna notates Sephardic trup', cls:'music',
      txt:'David de Pinna — surgeon and parnas of the Amsterdam Portuguese kehillah — contributes four pages of noted Pentateuch cantillation to Jablonski\'s Biblia Hebraica (Berlin 1699). An early and highly important published notation of Sephardic / Amsterdam-Portuguese Pentateuch cantillation — 181 years after Reuchlin\'s Ashkenazi transcription.' },
    { date:'1743', he:'בגדאד', title:'Syrian melody to Baghdad?', cls:'music',
      txt:'Appointment of Chief Rabbi Sadka Bekhor Hussein — the likely conduit of the Syrian-type melody to Baghdad, while Mosul kept the older Iraqi tune.' },
    { date:'1808', he:'היידנהיים', title:'Mishpetei HaTe\'amim', cls:'text',
      txt:'Wolf Heidenheim\'s grammar of the accents — the classic Ashkenazi reference; W. Wickes\' English treatises follow (1881/1887).' },
    { date:'1852', he:'בער', title:'Toras Emes — the emes rulebook', cls:'text',
      txt:'Seligman Baer, Toras Emes (Rödelheim 1852) — the systematic modern grammar of the poetic accents of Tehillim, Mishlei and Iyov; Wickes\' English treatises follow (poetic books 1881, prose books 1887).' },
    { date:'1905', he:'אנציקלופדיה', title:'Jewish Encyclopedia tables', cls:'music',
      txt:'Comparative notated tables of cantillation across traditions — documenting a still-unified Ottoman-Sephardic melody for "Syria and Egypt."' },
    { date:'1911', he:'הקלטות', title:'Early Syrian field recordings', cls:'music',
      txt:'Early phonograph recordings of Salem Aisbeda and Haim Asriqi — Torah, Tehillim, Mishlei/Iyov, Rus, Eicha samples — preserved today on pizmonim.org: the community\'s chanting captured in sound before Idelsohn\'s volumes appeared.' },
    { date:'1914–1932', he:'אידלסון', title:'Idelsohn\'s Thesaurus', cls:'music',
      txt:'A.Z. Idelsohn, Thesaurus of Hebrew Oriental Melodies, 10 vols: I Yemen (1914) · II Bavel (1923) · III Persia/Bukhara/Daghestan · IV Oriental Sephardim (1923) · V Morocco · VI–X Ashkenaz. Based on 1,000+ phonograph recordings (Yerushalayim 1907–21) — the foundation of comparative cantillation study, demonstrating an underlying unity of the traditions.' },
    { date:'1957–2002', he:'תיעוד', title:'Systematic Ashkenazi notation', cls:'music',
      txt:'Rosowsky, The Cantillation of the Bible (1957); Binder, Biblical Chant (1959); Jacobson, Chanting the Hebrew Bible (2002) — the Lithuanian tradition fully transcribed.' },
    { date:'1976 / 2011', he:'שחזור', title:'Reconstruction attempts', cls:'music',
      txt:'Haïk-Vantoura, La musique de la Bible révélée (1976) — a from-the-signs "decoding," methodologically rejected by most musicologists. Jeffrey Burns (posth. 2011) — the modern musicological study of the emes books.' }
  ],

  /* ---------- liturgical extras detail ---------- */
  extras: [
    { he:'טַעַם עֶלְיוֹן', title:'Aseres HaDibros — ta\'am elyon', txt:'The Dibros carry a DOUBLE set of accents: ta\'am tachton (private/verse-division) and ta\'am elyon (public reading, dividing by commandment). S&P sing the elyon to the special "High Na\'um" tune, also used for other emphasized passages; Syrians observe the double accents without a special melody; Ashkenaz reads elyon in the regular (or Yamim-Noraim) mode.' },
    { he:'אָז יָשִׁיר', title:'Shiras HaYam', txt:'Written brick-over-brick (ariach al gabei leveinah); read with festive melodic expansions and congregational responses at the famous phrases. Uses the year-round trup skeleton with special elaborations — and the Yamim-Noraim echo on the phrase Hashem yimloch in some communities.' },
    { he:'מַסָּעוֹת', title:'The Masa\'os list', txt:'The 42 journeys (Bamidbar 33) get a special chained melody in many communities — one musical arc per journey pair.' },
    { he:'תּוֹכָחָה', title:'Tocheicha', txt:'The rebukes (Bechukosai, Ki Savo) are read faster and in a lowered voice — a performance convention, not a different trup. The ba\'al koreh is customarily called to the aliyah himself.' },
    { he:'חֲזַק', title:'Book-end codas', txt:'Every aliyah ends with a coda motif overriding the printed trup; each chumash ends with a grander coda cueing the kahal\'s "Chazak chazak v\'nischazek!" A parallel haftarah coda modulates minor→major into the closing brachos — shared Ashkenazi-Sephardi structure suggesting a common ancient origin.' },
    { he:'מִשְׁנָה', title:'Mishnah b\'ta\'am', txt:'Medieval manuscripts of the Mishnah (and the Sifra, per Genizah fragments — Yeivin 1960) sometimes carry cantillation marks. The Syrian tradition still chants Mishnah in Maqam Nawah (Shrem recordings on pizmonim.org); Ashkenaz keeps only the un-notated lernen-steiger and the Bameh Madlikin tune.' }
  ],

  /* =========================================================
     MOTIFS — playable reference transcriptions.
     Format: arrays of [pitch, beats]. null pitch = breath.
     Sources: JE 1905 tables; Rosowsky 1957; Binder 1959;
     Jacobson 2002 (Ashkenaz-East); Idelsohn I & IV (Yemen,
     Sephardi/Syrian); Reuchlin-Böschenstein 1518 (Yekkish
     existence, not encoded here). Contour-accurate, tempered.
     ========================================================= */
  motifs: {
    /* ---- Eastern-Ashkenazi: six systems ---- */
    ashkE: {
      torah: {
        _note:'Polish-Lithuanian Torah mode, transcribed from the Jewish Encyclopedia 1905 cantillation plates ("Ashkenazim, 1902" row, pp. 539–545, F.L. Cohen) — tonic G, reciting tone B, upper tenor D. [Evidence grade B — published notation.]',
        _grade:'B',
        munach:[['A4',.4],['B4',.8]],
        mercha:[['A4',.3],['G4',.3],['F#4',.2],['G4',.4]],
        tipcha:[['B4',.5],['C5',.25],['D5',.25],['C5',.25],['B4',.25],['A4',.75]],
        esnachta:[['G4',.4],['F#4',.3],['G4',.3],['E4',1.3]],
        sofpasuk:[['B4',.35],['C5',.35],['A4',.5],['G4',1.3]],
        mahpach:[['A4',.3],['G4',.3],['A4',.3],['B4',.5]],
        pashta:[['A4',.25],['B4',.25],['D5',1.25]],
        zakefkatan:[['C5',.33],['D5',.33],['C5',.33],['B4',1]],
        zakefgadol:[['A4',.33],['A4',.33],['A4',.33],['D5',.75],['B4',.5],['A4',1]],
        yesiv:[['B4',.25],['D5',.9],['C5',.3],['B4',.45]],
        revia:[['A4',.6],['B4',.25],['D5',.5],['C5',.3],['B4',.3],['A4',.3],['G4',1]],
        zarka:[['A4',.5],['B4',.3],['C5',.3],['B4',.3],['C5',.3],['D5',.3],['C5',.3],['B4',.25],['A4',.25],['G4',.25],['A4',.5]],
        segol:[['B4',.75],['A4',.75],['G4',1]],
        shalsheles:[['G4',.3],['A4',.3],['B4',.3],['C5',.3],['B4',.3],['C5',.3],['B4',.3],['C5',.3],['B4',.3],['A4',.3],['G4',.6]],
        kadma:[['G4',.4],['A4',.6]],
        geresh:[['B4',.3],['C5',1],['B4',.5]],
        gershayim:[['B4',.4],['C5',.2],['B4',.2],['C5',.2],['B4',.3],['B4',.5]],
        darga:[['A4',.4],['B4',.2],['C5',.17],['D5',.17],['C5',.17],['B4',.17],['C5',.17],['B4',.17],['A4',.25],['G4',.25],['A4',.5]],
        tevir:[['C5',.33],['B4',.33],['A4',.33],['G4',1.2]],
        telishaketanah:[['A4',.4],['B4',.17],['C5',.17],['B4',.17],['A4',.25],['B4',.5]],
        telishagedolah:[['G4',.4],['A4',.2],['B4',.33],['C5',.33],['D5',.33],['C5',.25],['B4',.25],['A4',.25],['B4',.5]],
        pazer:[['B4',.4],['C5',.25],['D5',.25],['E5',.25],['D5',.25],['C5',.25],['D5',.25],['C5',.4],['B4',.8]],
        munachlegarmeh:[['G4',.5],['B4',.75],['C5',.25],['D5',.25],['C5',.3],['B4',.3],['A4',.3]],
        merchakefulah:[['A4',.3],['G4',.3],['A4',.3],['G4',.3],['F#4',.2],['G4',.5]],
        karneifarah:[['B4',.3],['C5',.3],['B4',.3],['D5',.3],['C5',.3],['E5',.5],['D5',.3],['C5',.3],['B4',.3],['A4',.5]],
        yerach:[['G4',.3],['A4',.3],['G4',.3],['F#4',.3],['G4',.3],['A4',.3],['B4',.5]],
        coda:[['G4',.3],['A4',.3],['B4',.3],['G4',.4],['B4',.6],['A4',.3],['A4',.8],['G4',1.2]]
      },
      hnr: {
        _note:'Rosh Hashanah / Yom Kippur Torah mode — Haftarah-family scale, grounded reciting tone, majestic cadences (JE 1905 prints a "Pentateuch, Penitential" row; full transcription pending). [Evidence grade C — pedagogic approximation.]',
        _grade:'C',
        munach:[['A3',.5],['C4',1]],
        mercha:[['C4',.5],['B3',.5],['C4',1]],
        tipcha:[['D4',.5],['C4',.5],['B3',.5],['C4',1]],
        esnachta:[['C4',.5],['D4',.5],['C4',.5],['B3',.5],['A3',1.5]],
        sofpasuk:[['C4',.5],['B3',.5],['A3',.5],['G3',.5],['A3',1.5]],
        mahpach:[['B3',.5],['D4',.5],['C4',1]],
        pashta:[['C4',.5],['D4',.5],['E4',1]],
        zakefkatan:[['C4',.5],['E4',1],['D4',.5],['C4',1]],
        zakefgadol:[['C4',.5],['F4',1],['E4',.5],['D4',.5],['C4',1]],
        revia:[['F4',1],['E4',.5],['D4',.5],['C4',1]],
        zarka:[['C4',.5],['D4',.5],['C4',.5],['D4',.5],['F4',1],['E4',1]],
        segol:[['F4',1],['E4',.5],['D4',.5],['E4',.5],['D4',.5],['C4',1]],
        kadma:[['C4',.5],['D4',1]],
        geresh:[['E4',.5],['F4',1],['E4',.5],['D4',1]],
        darga:[['A3',.5],['C4',.5],['B3',.5],['D4',.5],['C4',.5],['E4',1]],
        tevir:[['C4',.5],['F3',1],['G3',.5],['A3',1]]
      },
      haftarah: {
        _note:'Minor mode with upward "yearning" figures; the verse-end rises and hangs suspended (double fermata in the JE 1905 Prophets row) — the coda into the brachos turns minor→major. [Evidence grade C — pedagogic approximation; verse-close after JE 1905.]',
        _grade:'C',
        munach:[['A3',.5],['C4',1]],
        mercha:[['C4',.5],['B3',.5],['C4',1]],
        tipcha:[['C4',.5],['B3',.5],['A3',.5],['B3',1]],
        esnachta:[['C4',.5],['B3',.5],['A3',.5],['G3',1.5]],
        sofpasuk:[['C4',.4],['B3',.4],['A3',.6],['C4',.35],['D4',.9]],
        mahpach:[['B3',.5],['D4',.5],['C4',1]],
        pashta:[['C4',.5],['D4',.5],['E4',1]],
        zakefkatan:[['C4',.5],['E4',1],['D4',.5],['C4',1]],
        zakefgadol:[['C4',.5],['F4',1],['E4',.5],['D4',.5],['C4',1]],
        revia:[['E4',1],['D4',.5],['C4',.5],['B3',1]],
        zarka:[['C4',.5],['D4',.5],['C4',.5],['D4',.5],['F4',1],['E4',1]],
        segol:[['F4',1],['E4',.5],['D4',.5],['E4',.5],['D4',.5],['C4',1]],
        shalsheles:[['C4',.5],['D4',.5],['E4',.5],['F4',.5],['E4',.5],['F4',.5],['E4',.5],['F4',.5],['E4',.5],['D4',.5],['C4',1.5]],
        kadma:[['C4',.5],['D4',1]],
        geresh:[['D4',.5],['E4',1],['D4',.5],['C4',1]],
        gershayim:[['D4',.5],['E4',.5],['E4',.5],['D4',.5],['C4',1]],
        darga:[['G3',.5],['B3',.5],['A3',.5],['C4',.5],['B3',.5],['D4',1]],
        tevir:[['C4',.5],['F3',1],['G3',.5],['A3',1]],
        telishaketanah:[['D4',.5],['C4',.5],['D4',.5],['E4',1]],
        telishagedolah:[['C4',.5],['F4',1],['E4',.5],['F4',.5],['D4',1]],
        pazer:[['C4',.5],['D4',.5],['C4',.5],['E4',.5],['D4',.5],['F4',1],['E4',.5],['D4',.5],['C4',1]]
      },
      esther: {
        _note:'Light, mobile, major-leaning; the pasuk coda dips into minor. Churban verses switch to Eicha. [Evidence grade C — pedagogic approximation; consult recordings for the living tradition.]',
        _grade:'C',
        munach:[['D4',.5],['F4',.5]],
        mercha:[['F4',.25],['E4',.25],['F4',.5]],
        tipcha:[['F4',.5],['E4',.25],['D4',.25],['E4',.5]],
        esnachta:[['F4',.5],['E4',.25],['D4',.25],['C4',1]],
        sofpasuk:[['F4',.5],['E4',.5],['D4',.5],['C4',.5],['D4',1]],
        mahpach:[['E4',.25],['G4',.25],['F4',.5]],
        pashta:[['F4',.25],['G4',.25],['A4',.5]],
        zakefkatan:[['F4',.25],['A4',.5],['G4',.25],['F4',.5]],
        zakefgadol:[['F4',.25],['B4',.5],['A4',.25],['G4',.25],['F4',.5]],
        revia:[['B4',.5],['A4',.25],['G4',.25],['F4',.5]],
        zarka:[['F4',.25],['G4',.25],['F4',.25],['G4',.25],['B4',.5],['A4',.5]],
        segol:[['B4',.5],['A4',.25],['G4',.25],['A4',.25],['G4',.25],['F4',.5]],
        kadma:[['F4',.25],['G4',.5]],
        geresh:[['A4',.25],['B4',.5],['A4',.25],['G4',.5]],
        darga:[['D4',.25],['F4',.25],['E4',.25],['G4',.25],['F4',.25],['A4',.5]],
        tevir:[['F4',.25],['C4',.5],['D4',.25],['E4',.5]],
        pazer:[['F4',.25],['G4',.25],['F4',.25],['A4',.25],['G4',.25],['B4',.5],['A4',.25],['G4',.25],['F4',.5]]
      },
      eicha: {
        _note:'Mournful, narrow, with "tonal collapse" — phrases sag toward the low tonic. [Evidence grade C — pedagogic approximation; consult recordings for the living tradition.]',
        _grade:'C',
        munach:[['D4',.5],['E4',1]],
        mercha:[['E4',.5],['D4',.5],['E4',1]],
        tipcha:[['E4',.5],['D4',.5],['C4',1]],
        esnachta:[['E4',.5],['D4',.5],['C4',.5],['B3',.5],['A3',1.5]],
        sofpasuk:[['D4',.5],['C4',.5],['B3',.5],['A3',1.5]],
        mahpach:[['C4',.5],['E4',.5],['D4',1]],
        pashta:[['D4',.5],['E4',.5],['F4',1]],
        zakefkatan:[['D4',.5],['F4',1],['E4',.5],['D4',1]],
        revia:[['F4',1],['E4',.5],['D4',.5],['C4',1]],
        kadma:[['D4',.5],['E4',1]],
        geresh:[['E4',.5],['F4',1],['E4',.5],['D4',1]],
        darga:[['A3',.5],['C4',.5],['B3',.5],['D4',.5],['C4',.5],['E4',1]],
        tevir:[['D4',.5],['G3',1],['A3',.5],['B3',1]],
        pazer:[['D4',.5],['E4',.5],['D4',.5],['F4',.5],['E4',.5],['G4',1],['F4',.5],['E4',.5],['D4',1]]
      },
      megillos: {
        _note:'The pastoral "general" megillah tune — Shir HaShirim, Rus, Koheles. [Evidence grade C — pedagogic approximation; consult recordings for the living tradition.]',
        _grade:'C',
        munach:[['C4',.5],['E4',1]],
        mercha:[['E4',.5],['D4',.5],['E4',1]],
        tipcha:[['G4',.5],['F4',.5],['E4',.5],['F4',1]],
        esnachta:[['G4',.5],['F4',.5],['E4',.5],['D4',.5],['C4',1.5]],
        sofpasuk:[['E4',.5],['F4',.5],['E4',.5],['D4',.5],['C4',1.5]],
        mahpach:[['D4',.5],['F4',.5],['E4',1]],
        pashta:[['E4',.5],['F4',.5],['G4',1]],
        zakefkatan:[['E4',.5],['G4',1],['F4',.5],['E4',1]],
        revia:[['A4',1],['G4',.5],['F4',.5],['E4',1]],
        zarka:[['E4',.5],['F4',.5],['E4',.5],['F4',.5],['A4',1],['G4',1]],
        segol:[['A4',1],['G4',.5],['F4',.5],['G4',.5],['F4',.5],['E4',1]],
        kadma:[['E4',.5],['F4',1]],
        geresh:[['G4',.5],['A4',1],['G4',.5],['F4',1]],
        darga:[['C4',.5],['E4',.5],['D4',.5],['F4',.5],['E4',.5],['G4',1]],
        tevir:[['E4',.5],['A3',1],['B3',.5],['C4',1]]
      }
    },

    /* ---- Western Ashkenazi (Yekkish) Torah — the Reuchlin line ---- */
    ashkW: {
      torah: {
        _note:'Western Ashkenazi (German) Torah mode, transcribed from the JE 1905 plates ("Ashkenazim, 1518" row — the tradition Böschenstein notated for Reuchlin\'s De Accentibus). Same G-frame as the Eastern melody, flatter contours — 400 years of documented stability. [Evidence grade B — published notation.]',
        _grade:'B',
        munach:[['A4',.4],['B4',.8]],
        mercha:[['A4',.3],['G4',.3],['G4',.4]],
        tipcha:[['B4',.5],['C5',.3],['B4',.3],['A4',.3],['G4',.6]],
        esnachta:[['G4',.4],['F#4',.3],['G4',.3],['E4',1.2]],
        sofpasuk:[['B4',.3],['A4',.4],['G4',1.3]],
        mahpach:[['A4',.3],['G4',.3],['A4',.3],['B4',.5]],
        pashta:[['A4',.25],['B4',.25],['D5',1]],
        zakefkatan:[['B4',.33],['C5',.33],['B4',.5],['A4',.75]],
        zakefgadol:[['A4',.33],['A4',.33],['A4',.33],['D5',.6],['B4',.5],['A4',1]],
        yesiv:[['G4',.3],['A4',.7],['A4',.3],['B4',.4]],
        revia:[['A4',.5],['B4',.3],['C5',.4],['B4',.3],['A4',.3],['G4',1]],
        zarka:[['A4',.5],['A4',.3],['B4',.3],['C5',.3],['C5',.3],['D5',.3],['C5',.3],['B4',.3],['A4',.3],['G4',.3],['A4',.5]],
        segol:[['A4',1],['G4',.75]],
        kadma:[['G4',.4],['A4',.6]],
        geresh:[['C5',.8],['B4',.5]],
        gershayim:[['G4',.25],['A4',.25],['C5',.7],['B4',.5]],
        darga:[['A4',.4],['B4',.2],['B4',.2],['C5',.2],['B4',.2],['A4',.25],['G4',.25],['A4',.5]],
        tevir:[['B4',.3],['A4',.3],['G4',1.2]],
        telishaketanah:[['A4',.4],['B4',.2],['C5',.2],['B4',.2],['B4',.5]],
        telishagedolah:[['G4',.4],['A4',.3],['B4',.3],['C5',.3],['B4',.25],['A4',.25],['G4',.25],['A4',.5]],
        pazer:[['G4',.4],['A4',.3],['B4',.3],['C5',.3],['B4',.3],['C5',.3],['B4',.4],['A4',.6]],
        munachlegarmeh:[['G4',.5],['B4',.6],['C5',.3],['B4',.3],['A4',.3]]
      }
    },

    /* ---- Sephardi-Yerushalmi Torah (Maqam Sigah, tempered approx.) ---- */
    sefY: {
      torah: {
        _note:'Maqam Sigah — finalis on E with a characteristic half-flat second (E-half-flat family). Piano is a TEMPERED approximation; the real maqam uses quarter tones. Conjunctives are flourishes into the following disjunctive (the old Palestinian phrase-logic). [Evidence grade D — PROTOTYPE, schematic; grade-A audio exists: pizmonim.org recordings incl. 1911 field audio.]',
        _grade:'D',
        munach:[['E4',.5],['F4',.5]],
        mercha:[['F4',.5],['E4',.5]],
        tipcha:[['G4',.5],['F4',.5],['E4',1]],
        esnachta:[['G4',.5],['F4',.5],['E4',.5],['D4',1.5]],
        sofpasuk:[['A4',.5],['G4',.5],['F4',.5],['E4',1.5]],
        pashta:[['E4',.5],['G4',.5],['F4',1]],
        zakefkatan:[['F4',.5],['G4',.5],['A4',.5],['G4',.5],['F4',1]],
        revia:[['A4',.5],['B4',.5],['A4',.5],['G4',.5],['F4',1]],
        zarka:[['F4',.5],['G4',.5],['A4',.5],['B4',.5],['A4',1]],
        segol:[['B4',.5],['A4',.5],['G4',.5],['A4',.5],['G4',.5],['F4',1]],
        geresh:[['G4',.5],['A4',.5],['G4',.5],['F4',1]],
        darga:[['D4',.5],['E4',.5],['F4',.5],['G4',1]],
        tevir:[['F4',.5],['D4',1],['E4',.5],['F4',1]],
        pazer:[['F4',.5],['G4',.5],['F4',.5],['A4',.5],['G4',.5],['B4',1],['A4',.5],['G4',.5],['F4',1]]
      }
    },

    /* ---- Yemenite Torah: the eight motifs (schematic, per Idelsohn I) ---- */
    yem: {
      torah: {
        _note:'Only DISJUNCTIVES carry motifs; conjunctives recite on a monotone — a living relic of the Babylonian 8-letter system. Eight motifs in four patterns (schematic transcription after Idelsohn vol. I). [Evidence grade D — PROTOTYPE, schematic after grade-B notation, Idelsohn 1914.]',
        _grade:'D',
        _labels:{ molikh:'Molikh — moving (conjunctives & minor disjunctives)', mafsik1:'Mafsik — 3rd-level pause (type 1)', mafsik2:'Mafsik — 3rd-level pause (type 2)', maamid1:'Ma\'amid — elongating (type 1)', maamid2:'Ma\'amid — elongating (type 2)', maamid3:'Ma\'amid — elongating (type 3)', esnacha:'Esnacha pattern', silluk:'Silluk (sof pasuk) pattern' },
        molikh:[['D4',.5],['D4',.5],['D4',.5]],
        mafsik1:[['D4',.5],['E4',.5],['D4',1]],
        mafsik2:[['D4',.5],['C4',.5],['D4',1]],
        maamid1:[['D4',.5],['F4',1],['E4',1]],
        maamid2:[['D4',.5],['E4',.5],['F4',1],['E4',.5],['D4',1]],
        maamid3:[['C4',.5],['D4',.5],['E4',1],['D4',1]],
        esnacha:[['E4',.5],['D4',.5],['C4',1],['D4',.5],['C4',1.5]],
        silluk:[['E4',.5],['D4',.5],['C4',.5],['B3',.5],['A3',2]]
      }
    },

    /* ---- Ta'amei Emes — Syrian-style (basis of the Zilberman revival) ---- */
    syr: {
      emes: {
        _note:'Representative Syrian-tradition psalm cantillation motifs (after Idelsohn IV and community notation) — Maqam Nahwand; the system Aderet Eliyahu adapted for Ashkenazi use. Tempered approximation of a maqam idiom. [Evidence grade D — PROTOTYPE, schematic; grade-A audio: pizmonim.org Tehillim recordings incl. 1911.]',
        _grade:'D',
        e_silluk:[['G4',.5],['F4',.5],['E4',.5],['D4',1.5]],
        e_olehveyored:[['E4',.5],['G4',1],['F4',.5],['E4',.5],['D4',.5],['C4',1.5]],
        e_esnachta:[['F4',.5],['E4',.5],['D4',1.5]],
        e_reviagadol:[['G4',1],['A4',.5],['G4',.5],['F4',.5],['E4',1]],
        e_reviakatan:[['F4',.5],['G4',.5],['F4',.5],['E4',1]],
        e_reviamugrash:[['A4',.5],['G4',.5],['F4',.5],['G4',.5],['E4',1]],
        e_tzinnor:[['E4',.5],['F4',.5],['G4',.5],['A4',.5],['G4',1]],
        e_dechi:[['E4',.5],['D4',.5],['E4',.5],['F4',1]],
        e_pazer:[['E4',.5],['F4',.5],['E4',.5],['G4',.5],['F4',.5],['A4',1],['G4',.5],['F4',1]],
        e_shalshelesgedolah:[['E4',.5],['F4',.5],['G4',.5],['F4',.5],['G4',.5],['F4',.5],['G4',.5],['F4',.5],['E4',1]],
        e_azlalegarmeh:[['F4',.5],['G4',1],['F4',.5]],
        e_mehupachlegarmeh:[['E4',.5],['G4',.5],['F4',1]],
        e_illuy:[['F4',.5],['G4',.5]],
        e_galgal:[['D4',.5],['E4',.5],['D4',.5]]
      }
    }
  },

  /* ---------- bank tonics (finalis) for transpose display ---------- */
  tonics:{ ashkE:{torah:'G4',hnr:'A3',haftarah:'A3',esther:'D4',eicha:'A3',megillos:'C4'}, ashkW:{torah:'G4'}, sefY:{torah:'E4'}, yem:{torah:'A3'}, syr:{emes:'D4'} },

  /* ---------- specimen pesukim — MAM text (CC-BY-SA, via Sefaria/Wikisource) ---------- */
  specimens:[
    { id:'bereishis', ref:'Bereishis 1:1–5', he:'בְּרֵאשִׁית', system:'torah', tradition:'ashkE',
      note:'The opening of the Torah — the base prose system at work: esnachta/sof-pasuk emperors, the mahpach-pashta-zakef royal phrase (1:2), kadma (1:5), and a mahpach-with-pesik.',
      verses:[
        'בְּרֵאשִׁ֖ית בָּרָ֣א אֱלֹהִ֑ים אֵ֥ת הַשָּׁמַ֖יִם וְאֵ֥ת הָאָֽרֶץ׃',
        'וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֙הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְה֑וֹם וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃',
        'וַיֹּ֥אמֶר אֱלֹהִ֖ים יְהִ֣י א֑וֹר וַֽיְהִי־אֽוֹר׃',
        'וַיַּ֧רְא אֱלֹהִ֛ים אֶת־הָא֖וֹר כִּי־ט֑וֹב וַיַּבְדֵּ֣ל אֱלֹהִ֔ים בֵּ֥ין הָא֖וֹר וּבֵ֥ין הַחֹֽשֶׁךְ׃',
        'וַיִּקְרָ֨א אֱלֹהִ֤ים ׀ לָאוֹר֙ י֔וֹם וְלַחֹ֖שֶׁךְ קָ֣רָא לָ֑יְלָה וַֽיְהִי־עֶ֥רֶב וַֽיְהִי־בֹ֖קֶר י֥וֹם אֶחָֽד׃'
      ] },
    { id:'nachamu', ref:'Yeshayahu 40:1–2 (Haftaras Nachamu)', he:'נַחֲמוּ', system:'haftarah', tradition:'ashkE',
      note:'The same prose signs, sung in the minor haftarah mode — note the gershayim opening 40:2 and the doubled pashta on Yerushalayim.',
      verses:[
        'נַחֲמ֥וּ נַחֲמ֖וּ עַמִּ֑י יֹאמַ֖ר אֱלֹהֵיכֶֽם׃',
        'דַּבְּר֞וּ עַל־לֵ֤ב יְרוּשָׁלַ֙͏ִם֙ וְקִרְא֣וּ אֵלֶ֔יהָ כִּ֤י מָֽלְאָה֙ צְבָאָ֔הּ כִּ֥י נִרְצָ֖ה עֲוֺנָ֑הּ כִּ֤י לָֽקְחָה֙ מִיַּ֣ד יְהֹוָ֔ה כִּפְלַ֖יִם בְּכׇל־חַטֹּאתֶֽיהָ׃'
      ] },
    { id:'esther', ref:'Esther 1:1', he:'אֶסְתֵּר', system:'esther', tradition:'ashkE',
      note:'The festive Purim mode — every ta\'am here has an Esther-bank motif, from the opening tipcha to the tevir on שֶׁבַע.',
      verses:[
        'וַיְהִ֖י בִּימֵ֣י אֲחַשְׁוֵר֑וֹשׁ ה֣וּא אֲחַשְׁוֵר֗וֹשׁ הַמֹּלֵךְ֙ מֵהֹ֣דּוּ וְעַד־כּ֔וּשׁ שֶׁ֛בַע וְעֶשְׂרִ֥ים וּמֵאָ֖ה מְדִינָֽה׃'
      ] },
    { id:'eicha', ref:'Eicha 1:1', he:'אֵיכָה', system:'eicha', tradition:'ashkE',
      note:'The mourning mode. The very first word carries munach-legarmeh (munach + pesik) — a lonely opening cry.',
      verses:[
        'אֵיכָ֣ה ׀ יָשְׁבָ֣ה בָדָ֗ד הָעִיר֙ רַבָּ֣תִי עָ֔ם הָיְתָ֖ה כְּאַלְמָנָ֑ה רַבָּ֣תִי בַגּוֹיִ֗ם שָׂרָ֙תִי֙ בַּמְּדִינ֔וֹת הָיְתָ֖ה לָמַֽס׃'
      ] },
    { id:'rus', ref:'Rus 1:1', he:'רוּת', system:'megillos', tradition:'ashkE',
      note:'The general megillah mode — with a kadma-v\'azla pair (וַיֵּלֶךְ אִישׁ) and the rarer darga-munach-revia chain.',
      verses:[
        'וַיְהִ֗י בִּימֵי֙ שְׁפֹ֣ט הַשֹּׁפְטִ֔ים וַיְהִ֥י רָעָ֖ב בָּאָ֑רֶץ וַיֵּ֨לֶךְ אִ֜ישׁ מִבֵּ֧ית לֶ֣חֶם יְהוּדָ֗ה לָגוּר֙ בִּשְׂדֵ֣י מוֹאָ֔ב ה֥וּא וְאִשְׁתּ֖וֹ וּשְׁנֵ֥י בָנָֽיו׃'
      ] },
    { id:'tehillim', ref:'Tehillim 1:1–3', he:'תְּהִלִּים', system:'emes', tradition:'syr',
      note:'A complete emes showcase: pasuk 1 alone contains mehupach-legarmeh, tzinnor, ATNACH HAFUCH, oleh v\'yored, dechi, esnachta, revia mugrash and silluk. Pasuk 3 adds illuy and azla-legarmeh.',
      verses:[
        'אַ֥שְֽׁרֵי־הָאִ֗ישׁ אֲשֶׁ֤ר ׀ לֹ֥א הָלַךְ֮ בַּעֲצַ֢ת רְשָׁ֫עִ֥ים וּבְדֶ֣רֶךְ חַ֭טָּאִים לֹ֥א עָמָ֑ד וּבְמוֹשַׁ֥ב לֵ֝צִ֗ים לֹ֣א יָשָֽׁב׃',
        'כִּ֤י אִ֥ם־בְּתוֹרַ֥ת יְהֹוָ֗ה חֶ֫פְצ֥וֹ וּֽבְתוֹרָת֥וֹ יֶהְגֶּ֗ה יוֹמָ֥ם וָלָֽיְלָה׃',
        'וְֽהָיָ֗ה כְּעֵץ֮ שָׁת֢וּל עַֽל־פַּלְגֵ֫י־מָ֥יִם אֲשֶׁ֤ר פִּרְי֨וֹ ׀ יִתֵּ֬ן בְּעִתּ֗וֹ וְעָלֵ֥הוּ לֹֽא־יִבּ֑וֹל וְכֹ֖ל אֲשֶׁר־יַעֲשֶׂ֣ה יַצְלִֽיחַ׃'
      ] }
  ],

  /* ---------- common phrase groups (tzerufim) ---------- */
  phrases:{
    prose:[
      { he:'מֵרְכָא טִפְחָא מֻנַּח אֶתְנַחְתָּא', en:'Mercha Tipcha Munach Esnachta', ids:['mercha','tipcha','munach','esnachta'] },
      { he:'מֵרְכָא טִפְחָא מֵרְכָא סוֹף־פָּסוּק', en:'Mercha Tipcha Mercha Sof-Pasuk', ids:['mercha','tipcha','mercha','sofpasuk'] },
      { he:'מַהְפַּךְ פַּשְׁטָא מֻנַּח זָקֵף־קָטָן', en:'Mahpach Pashta Munach Zakef-Katan', ids:['mahpach','pashta','munach','zakefkatan'] },
      { he:'מֻנַּח זַרְקָא מֻנַּח סֶגּוֹל', en:'Munach Zarka Munach Segol', ids:['munach','zarka','munach','segol'] },
      { he:'דַּרְגָּא תְּבִיר', en:'Darga Tevir', ids:['darga','tevir'] },
      { he:'קַדְמָא וְאַזְלָא', en:'Kadma v\'Azla', ids:['kadma','geresh'] },
      { he:'סִיּוּם עֲלִיָּה', en:'Aliyah-end coda (JE 1905, p. 539)', ids:['coda'] },
      { he:'מֻנַּח־לְגַרְמֵהּ מֻנַּח רְבִיעִי', en:'Munach-legarmeh Munach Revia', ids:['munachlegarmeh','munach','revia'] },
      { he:'פָּזֵר תְּלִישָׁא־קְטַנָּה קַדְמָא וְאַזְלָא', en:'Pazer Telisha-ketanah Kadma v\'Azla', ids:['pazer','telishaketanah','kadma','geresh'] },
      { he:'יֶרַח־בֶּן־יוֹמוֹ קַרְנֵי־פָרָה', en:'Yerach-ben-yomo Karnei-farah', ids:['yerach','karneifarah'] }
    ],
    emes:[
      { he:'דֶּחִי … אֶתְנַחְתָּא', en:'Dechi … Esnachta (first-stich skeleton)', ids:['e_dechi','e_esnachta'] },
      { he:'רְבִיעַ־קָטָן עוֹלֶה־וְיוֹרֵד', en:'Revia-katan Oleh v\'Yored', ids:['e_reviakatan','e_olehveyored'] },
      { he:'צִנּוֹר רְבִיעַ־גָּדוֹל', en:'Tzinnor Revia-gadol', ids:['e_tzinnor','e_reviagadol'] },
      { he:'רְבִיעַ־מֻגְרָשׁ סִלּוּק', en:'Revia-mugrash Silluk (verse close)', ids:['e_reviamugrash','e_silluk'] }
    ]
  },

  /* ---------- recordings registry — link-only, verified URLs ----------
     hosting_policy: link_only for ALL entries; licenses remain with the
     source sites; verify rights before any reuse or embedding.          */
  recordings:[
    { tr:'Ashkenazi (East 1902 + West 1518) & 6 more', sys:'Torah + all systems', title:'JE 1905 comparative notation plates (Cohen)', performer:'F.L. Cohen (ed.), Jewish Encyclopedia vol. III', date:'1901–1906', type:'Published notation (public domain scans)', grade:'B',
      url:'https://commons.wikimedia.org/wiki/Category:The_Jewish_Encyclopedia_(1901%E2%80%931906)', note:'The source of this site\'s Eastern-Ashkenazi and Yekkish Torah banks: pp. 539–547, incl. a fully worked Bereishis 22:1 and a Penitential (Yamim Noraim) row. On Wikimedia Commons.' },
    { tr:'Syrian', sys:'All kriyos + emes', title:'Pizmonim.org Ta\'amim hub', performer:'Community archive (Shrem, Kairey, Tawil, Daya…)', date:'1911–present', type:'Field & liturgical audio', grade:'A',
      url:'https://www.pizmonim.org/taamim.php', note:'Torah (Sigah) incl. 1911 Aisbeda recording · Tehillim (Nahwand) · Mishlei · Iyov · Shir (Bayat) · Rus (Hoseni) · Eicha (Ajam) · Esther (Saba-Mouhayar) · Mishnah (Nawah). Streams on site.' },
    { tr:'Syrian', sys:'Names of the ta\'amim', title:'Seder Shemos HaTe\'amim (zarka table)', performer:'Jack Azar', date:'20th c.', type:'Pedagogy', grade:'A',
      url:'https://www.pizmonim.org/book.php?recording=1232', note:'The sung accent-name chain — compare with this site\'s Map order.' },
    { tr:'Syrian', sys:'Emes — Tehillim', title:'Psalm 1 in Maqam Nahwand', performer:'Gabriel A. Shrem', date:'20th c.', type:'Liturgical audio', grade:'A',
      url:'https://www.pizmonim.org/taamim.php', note:'Same pesukim as this site\'s Tehillim specimen — direct comparison possible.' },
    { tr:'Ashkenazi (Chabad/East)', sys:'Torah', title:'Torah Reading Trop — audio per ta\'am', performer:'Chabad.org', date:'modern', type:'Pedagogy', grade:'A',
      url:'https://www.chabad.org/multimedia/music_cdo/aid/931078/jewish/Torah-Reading-Trop.htm', note:'Each ta\'am sung individually.' },
    { tr:'Eastern Ashkenazi', sys:'All six systems', title:'Cantillation Café tune library', performer:'Cantor N. Schall tradition', date:'modern', type:'Pedagogy', grade:'A–B',
      url:'https://www.cantoreducator.com/ccafe/tunes/tunes.shtml', note:'Torah, Haftarah, Esther, Eicha, Megillos, Yamim Noraim.' },
    { tr:'Eastern Ashkenazi', sys:'Torah', title:'Kol Kore learners\' guide', performer:'—', date:'modern', type:'Pedagogy', grade:'B',
      url:'https://kol-kore.org/en/torah-cantillation-guide-for-learners/', note:'Structured learning sequence.' },
    { tr:'Spanish & Portuguese', sys:'Torah + Haftarah', title:'London Sephardi Music — Ta\'amim', performer:'S&P London tradition', date:'modern', type:'Community archive', grade:'A',
      url:'https://sites.google.com/site/londonsephardimusic/ta-amim', note:'The tradition de Pinna notated in 1699.' },
    { tr:'Sephardic (various)', sys:'Torah', title:'Samples of Sephardic cantillation', performer:'Yeshivat Deah VeHaskel', date:'modern', type:'Pedagogy', grade:'B',
      url:'https://www.ydvh.org/samples-of-sephardic-cantillation/', note:'Comparative samples.' },
    { tr:'Yemenite · Bavli · Sephardi', sys:'Documentation', title:'Idelsohn, Thesaurus vol. I scan', performer:'A.Z. Idelsohn (ed.)', date:'1914', type:'Archive scan (notation)', grade:'B',
      url:'https://archive.org/details/thesaurusoforien00idel', note:'The published notation behind this site\'s Yemenite bank.' },
    { tr:'Italian (medieval)', sys:'Piyyut, not trup', title:'Ovadiah HaGer manuscripts + realization', performer:'JMRC, Hebrew University', date:'c. 1102–1150', type:'Manuscript + modern realization', grade:'B (MS: A)',
      url:'https://jewish-music.huji.ac.il/en/content/obadiah-proselyte', note:'Oldest notated Jewish music — Mi al Har Chorev in Beneventan neumes.' },
    { tr:'Eastern Ashkenazi', sys:'Analysis', title:'Eastern Ashkenazi Biblical Cantillation: An Interpretive Musical Analysis', performer:'JMRC (Yuval)', date:'modern', type:'Scholarship', grade:'B',
      url:'https://jewish-music.huji.ac.il/en/yuval/22542', note:'The musicology behind the six-system description.' }
  ],

  /* ---------- MEASURED pitches — extracted programmatically from PocketTorah
     trope recordings (rneiss/PocketTorahTrope, GPL-3) via in-browser
     autocorrelation pitch tracking. Frame: tonic G, reciting tone D (a FIFTH
     up — a different school from the JE 1905 G/B frame). Durations are real.
     Grade A-derived; pending Mordy's ear-confirmation on the calibrate page. */
  measuredPT:{
    _src:'PocketTorahTrope repo audio, analyzed 2026-07-03; sung trope-names, word-level label timings',
    munach:[['A3',.1],['D4',.3],['C4',.25],['A3',.4]],
    esnachta:[['G3',.2],['G3',.3],['D4',.55]],
    tipcha:[['D4',.2],['E4',.45],['D4',.5]],
    zakefkatan:[['E4',.4],['G3',.15],['D4',.75]],
    pashta:[['E4',.15],['C4',.2],['A3',.1],['G3',.5]],
    mahpach:[['C4',.35],['F#4',.35]],
    zarka:[['D4',.9],['C4',.2],['A3',.35],['B3',.2],['A3',.1],['G3',.75]],
    segol:[['C4',.4],['E4',.25],['D4',.85]]
  },

  /* which tradition tabs to show per system */
  systemTraditions: {
    torah:['ashkE','ashkW','sefY','yem'],
    hnr:['ashkE'],
    haftarah:['ashkE'],
    esther:['ashkE'],
    eicha:['ashkE'],
    megillos:['ashkE'],
    emes:['syr']
  },

  disclaimer:'Evidence grades: A = direct audio of a named tradition-bearer · B = published notation by a named scholar or tradition-bearer · C = contour reference keyed to grade-B notation (this site\'s Ashkenazi banks) · D = schematic reconstruction (Yemenite, Sigah, emes banks) · E = hypothesis. All playback is equal-tempered; maqam traditions use quarter tones a piano cannot render. Key documents: de Pinna 1699 · Reuchlin-Böschenstein 1518 · JE 1905 · Idelsohn 1914–32 · Rosowsky 1957 · Binder 1959 · Jacobson 2002. Further scholarship: M. Kligman (Syrian maqam), B. Tarsi (Ashkenazi nusach), E. Schleifer. Grade-A audio to link next: pizmonim.org (incl. 1911 recordings), NLI/JMRC archives. These are study aids — not substitutes for a living mesorah.'
};
