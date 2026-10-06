/* Rashi study guide, Parashat Bereshit: data only.
   Every Hebrew string below is copied from the fetched print-edition text
   (Rosenbaum and Silbermann, 1929-1934). No Hebrew here was written by AI.
   src tiers: "verbatim" = fetched Hebrew, "silbermann" = fetched English translation,
   "ai" = Claude's own note, unverified. */
window.RASHI_BERESHIT = {
  parasha: { he: `בראשית`, se: `Bereshit`, en: `Bereshit`, ref: `Genesis 1:1-6:8` },
  edition: `Pentateuch with Rashi's commentary, M. Rosenbaum and A.M. Silbermann, 1929-1934`,
  sections: [
    {
      id: `laaz`,
      he: `בְּלַעַ"ז`,
      en: `Foreign words`,
      blurb: `Every place in the parasha where Rashi gives the word in the spoken French of his day. 9 words in 8 comments.`,
      items: [
        {
          id: `l1`, travel: `Old French to modern French: es- before a consonant lost its s and became é- (estude became étude, escole became école), and the ending -ison gave way to -issement. Rashi's letters still write the s (the ש). Old French to English: English borrowed estourdi, dazed or reckless, around 1300 and dropped the opening e. A sturdy man was first a reckless, violent one, then a stubborn one, and only later a strong, solid one.`, modern: `étourdissement`, modernEn: `a daze, dizziness`, sim: [{ w: `sturdy`, lang: `English`, why: `from Old French estourdi, dazed or reckless` }], ref: `1:2`, rashiRef: `Rashi on Genesis 1:2:2`,
          dh: `תהו`, se: `tohu`,
          laaz: `אשטורדי"שון`, gloss: `estordison`, en: `astonishment, daze`,
          pasuk: `וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֙הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְה֑וֹם וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃`,
          rashi: `אשטורדי"שון בְּלַעַ"ז:`,
          tr: `תהו is estordison in old French.`,
          note: `Compare modern French étourdissement, a daze. Rashi's previous comment sets it up: a person is astonished at the emptiness.`
        },
        {
          id: `l2`, travel: `The root is Latin cubare, to lie down. Old French cover meant to lie on eggs, and modern French keeps it as couver. The brood that comes out of the hatching was a covée, and English took that word in the 1300s as covey, a family of partridges. English incubate is the same Latin verb taken directly.`, modern: `couver`, modernEn: `to sit on eggs`, sim: [{ w: `covey`, lang: `English`, why: `a brood of birds, from the same French verb` }], ref: `1:2`, rashiRef: `Rashi on Genesis 1:2:5`,
          dh: `ורוח אלהים מרחפת`, se: `veruach Elohim merachefet`,
          laaz: `אקוב"טיר`, gloss: `acoveter`, en: `to brood, hover over a nest`,
          pasuk: `וְהָאָ֗רֶץ הָיְתָ֥ה תֹ֙הוּ֙ וָבֹ֔הוּ וְחֹ֖שֶׁךְ עַל־פְּנֵ֣י תְה֑וֹם וְר֣וּחַ אֱלֹהִ֔ים מְרַחֶ֖פֶת עַל־פְּנֵ֥י הַמָּֽיִם׃`,
          rashi: `כִּסֵא הַכָּבוֹד עוֹמֵד בָּאֲוִיר וּמְרַחֵף עַל פְּנֵי הַמַּיִם בְּרוּחַ פִּיו שֶׁל הַקָּבָּ"ה וּבְמַאֲמָרוֹ, כְּיוֹנָה הַמְרַחֶפֶת עַל הַקֵּן, אקוב"טיר בְּלַעַ"ז:`,
          tr: `The throne of Divine Glory was standing in space, hovering over the face of the waters by the breath of the mouth of the Holy One, blessed be He, and by His command, even as a dove hovers over its nest. In old French acoveter.`,
          note: `Compare modern French couver, to sit on eggs.`
        },
        {
          id: `l3`, travel: `No detour here. Latin herba gave French herbe and the collective herbage, and English borrowed both.`, modern: `herbage`, modernEn: `grass cover, pasture`, sim: [{ w: `herbage`, lang: `English`, why: `` }, { w: `herb`, lang: `English`, why: `` }], ref: `1:11`, rashiRef: `Rashi on Genesis 1:11:2`,
          dh: `תדשא הארץ`, se: `tadshe ha'aretz`,
          laaz: `ארבריץ`, gloss: `herbaries`, en: `herbage, a cover of mixed grasses`,
          pasuk: `וַיֹּ֣אמֶר אֱלֹהִ֗ים תַּֽדְשֵׁ֤א הָאָ֙רֶץ֙ דֶּ֗שֶׁא עֵ֚שֶׂב מַזְרִ֣יעַ זֶ֔רַע עֵ֣ץ פְּרִ֞י עֹ֤שֶׂה פְּרִי֙ לְמִינ֔וֹ אֲשֶׁ֥ר זַרְעוֹ־ב֖וֹ עַל־הָאָ֑רֶץ וַֽיְהִי־כֵֽן׃`,
          rashi: `תִּתְמַלֵּא וְתִתְכַּסֶּה לְבוּשׁ עֲשָׂבִים. בִּלְשׁוֹן לַעַז נִקְרָא דֶּשֶׁא ארבריץ, כֻּלָן בְּעִרְבּוּבְיָא, וְכָל שֹׁרֶשׁ לְעַצְמוֹ נִקְרָא עֵשֶׂב:`,
          tr: `Let it be filled and covered with a garment of different grasses. In old French דשא is called herbaries; English herbage, meaning all species of herbs growing together collectively whilst each root by itself is called an עשב.`,
          note: `The French word does the work of the comment: one collective noun for the whole green cover, against a separate word for each plant.`
        },
        {
          id: `l4`, travel: `Latin movere gave French mouvoir and, through the French of Norman England, English move. If Rashi's letters carry a prefix con-, the English relative is commotion, from Latin commovere, to set in motion together. That reading is not confirmed.`, modern: `mouvoir`, modernEn: `to move`, sim: [{ w: `move`, lang: `English`, why: `` }, { w: `commotion`, lang: `English`, why: `` }], ref: `1:24`, rashiRef: `Rashi on Genesis 1:24:3`,
          dh: `ורמש`, se: `varemes`,
          laaz: `קונמו"בריש`, gloss: `mouvoir`, en: `to move, creep`,
          pasuk: `וַיֹּ֣אמֶר אֱלֹהִ֗ים תּוֹצֵ֨א הָאָ֜רֶץ נֶ֤פֶשׁ חַיָּה֙ לְמִינָ֔הּ בְּהֵמָ֥ה וָרֶ֛מֶשׂ וְחַֽיְתוֹ־אֶ֖רֶץ לְמִינָ֑הּ וַֽיְהִי־כֵֽן׃`,
          rashi: `הֵם שְׁרָצִים, שֶׁהֵם נְמוּכִים וְרוֹמְשִׂים עַל הָאָרֶץ וְנִרְאִים כְּאִלּוּ נִגְרָרִים שֶׁאֵין הִלוּכָן נִכָּר. כָּל לְשׁוֹן רֶמֶשׂ וְשֶׁרֶץ בִּלְשׁוֹנֵנוּ קונמו"בריש בלע"ז:`,
          tr: `It means creeping swarms that creep low upon the ground; they appear as though they are dragged along, for how they move is not discernible. What we call רמש and שרץ in our (Hebrew) language, they call in old French mouvoir; English to move.`,
          note: `Rashi states this as a rule for every רמש and שרץ.`,
          flag: `The Hebrew letters open with קונ, which the translator's "mouvoir" does not show. The Latin spelling needs checking against a la'azim reference work before anyone relies on it.`
        },
        {
          id: `l5`, travel: `The root is Latin cuneus, a wedge. Old French coin meant a wedge, then the wedge-shaped die that stamps money, which is Rashi's meaning. English borrowed the word and moved it from the die to the stamped piece. French went the other way: coin stayed with wedge and corner, and money became pièce. Quoin is the same word in an older spelling, kept for wedges and cornerstones. Cuneiform, wedge writing, is the same Latin root.`, modern: `coin`, modernEn: `now a corner or wedge; the stamping-die sense is old`, sim: [{ w: `coin`, lang: `English`, why: `the stamped money` }, { w: `quoin`, lang: `English`, why: `a wedge or cornerstone` }], ref: `1:27`, rashiRef: `Rashi on Genesis 1:27:1`,
          dh: `ויברא אלהים את האדם בצלמו`, se: `vayivra Elohim et ha'adam betzalmo`,
          laaz: `קוי"ן`, gloss: `coin`, en: `a die for stamping coins`,
          pasuk: `וַיִּבְרָ֨א אֱלֹהִ֤ים ׀ אֶת־הָֽאָדָם֙ בְּצַלְמ֔וֹ בְּצֶ֥לֶם אֱלֹהִ֖ים בָּרָ֣א אֹת֑וֹ זָכָ֥ר וּנְקֵבָ֖ה בָּרָ֥א אֹתָֽם׃`,
          rashi: `בִּדְפוּס הֶעָשׂוּי לוֹ, שֶׁהַכֹּל נִבְרָא בְּמַאֲמָר וְהוּא נִבְרָא בַּיָּדַיִם, שֶׁנֶּאֱמַר וַתָּשֶׁת עָלַי כַּפֶּכָה (תהילים קל"ט); נַעֲשָׂה בְחוֹתָם כְּמַטְבֵּעַ הָעֲשׂוּיָה עַל יְדֵי רֹשֶׁם שֶׁקּוֹרִין קוי"ן בלע"ז וְכֵן הוּא אוֹמֵר תִּתְהַפֵּךְ כְּחֹמֶר חוֹתָם (איוב ל"ח):`,
          tr: `He was made by a seal as a coin that is made by a die that is called in old French coin.`,
          note: `In French the word names the stamping die. English later took the same word for the stamped piece of money.`
        },
        {
          id: `l6`, travel: `The root is Latin lamina, a thin plate of metal. In French the thin plate became the blade of a sword or knife, and lame still means blade. Lamé is the French for plated with thin metal, borrowed whole into English. Laminate was taken straight from the Latin.`, modern: `lame`, modernEn: `blade`, sim: [{ w: `laminate`, lang: `English`, why: `from Latin lamina, thin plate` }, { w: `lamé`, lang: `English`, why: `cloth with thin metal thread` }], ref: `3:24`, rashiRef: `Rashi on Genesis 3:24:3`,
          dh: `החרב המתהפכת`, se: `hacherev hamit'hapechet`,
          laaz: `לא"מא`, gloss: `lame`, en: `blade`,
          pasuk: `וַיְגָ֖רֶשׁ אֶת־הָֽאָדָ֑ם וַיַּשְׁכֵּן֩ מִקֶּ֨דֶם לְגַן־עֵ֜דֶן אֶת־הַכְּרֻבִ֗ים וְאֵ֨ת לַ֤הַט הַחֶ֙רֶב֙ הַמִּתְהַפֶּ֔כֶת לִשְׁמֹ֕ר אֶת־דֶּ֖רֶךְ עֵ֥ץ הַֽחַיִּֽים׃`,
          rashi: `וְלָהּ לַהַט לְאַיֵּם עָלָיו מִלִּכָּנֵס עוֹד לַגַּן תַּרְגּוּם לַהַט שְׁנַן, כְּמוֹ שָׁלַף שְׁנָנָא וּבִלְשׁוֹן לַעַז לא"מא וּמִדְרְשֵׁי אַגָּדָה יֵשׁ, וַאֲנִי אֵינִי בָא אֶלָּא לִפְשׁוּטוֹ:`,
          tr: `The Targum of להט, however, is שנן, like (Sanhedrin 82a) שלף שננא he drew his blade; old French lame. There are Agadic Midrashim, but I come only to explain it according to its plain sense.`,
          note: `Modern French still says lame for a blade. This one comment also belongs to two other sections of the guide: Targum, and settling the verse.`
        },
        {
          id: `l7`, travel: `Latin nasci became Old French naistre. The s went silent and modern French marks the lost letter with a circumflex: naître. Rashi's letters still write the s (the ש). Née is the feminine past participle of the same verb, born, borrowed into English unchanged. Nascent and natal come straight from the Latin.`, modern: `naître`, modernEn: `to be born`, sim: [{ w: `née`, lang: `English`, why: `born, used before a maiden name` }, { w: `nascent`, lang: `English`, why: `` }, { w: `natal`, lang: `English`, why: `` }], ref: `4:18`, rashiRef: `Rashi on Genesis 4:18:1`,
          dh: `ועירד ילד`, se: `ve'Irad yalad`,
          laaz: `ניש"טרא`, gloss: `naitre`, en: `the woman's giving birth`,
          pasuk: `וַיִּוָּלֵ֤ד לַֽחֲנוֹךְ֙ אֶת־עִירָ֔ד וְעִירָ֕ד יָלַ֖ד אֶת־מְחֽוּיָאֵ֑ל וּמְחִיָּיאֵ֗ל יָלַד֙ אֶת־מְת֣וּשָׁאֵ֔ל וּמְתוּשָׁאֵ֖ל יָלַ֥ד אֶת־לָֽמֶךְ׃`,
          rashi: `יֵשׁ מָקוֹם שֶׁהוּא אוֹמֵר בְּזָכָר הוֹלִיד וְיֵשׁ מָקוֹם שֶׁהוּא אוֹמֵר יָלַד, שֶׁהַלֵּדָה מְשַׁמֶּשֶׁת שְׁתֵּי לְשׁוֹנוֹת, לֵדַת הָאִשָּׁה ניש"טרא בְּלַעַז וּזְרִיעַת תּוֹלְדוֹת הָאִישׁ אינזי"ראר בְּלַעַז. כְּשֶׁהוּא אוֹמֵר הוֹלִיד בִּלְשׁוֹן הִפְעִיל, מְדַבֵּר בְּלֵדַת הָאִשָּׁה – פְּלוֹנִי הוֹלִיד אֶת אִשְׁתּוֹ בֵּן אוֹ בַת, כְּשֶׁהוּא אוֹמֵר יָלַד, מְדַבֵּר בִּזְרִיעַת הָאִישׁ:`,
          tr: `this root ילד is used in two senses: in reference to a woman giving birth to a child through the agency of a male old French naitre; English to give birth to and the act of begetting by a man old French engendrer; English engender, beget.`,
          note: `First of a pair. French has two verbs where Hebrew has one root, so Rashi uses French to pull the two meanings apart. Modern French: naître.`
        },
        {
          id: `l8`, travel: `Latin ingenerare, from genus, kind or birth. The French form grew a d between n and r that Latin never had, and English borrowed the word with it. The same added d is in gender, from Old French gendre, Latin genus. Generate skips French and comes from the Latin directly.`, modern: `engendrer`, modernEn: `to beget, to cause`, sim: [{ w: `engender`, lang: `English`, why: `` }, { w: `generate`, lang: `English`, why: `` }], ref: `4:18`, rashiRef: `Rashi on Genesis 4:18:1`,
          dh: `ועירד ילד`, se: `ve'Irad yalad`,
          laaz: `אינזי"ראר`, gloss: `engendrer`, en: `the man's begetting`,
          pasuk: `וַיִּוָּלֵ֤ד לַֽחֲנוֹךְ֙ אֶת־עִירָ֔ד וְעִירָ֕ד יָלַ֖ד אֶת־מְחֽוּיָאֵ֑ל וּמְחִיָּיאֵ֗ל יָלַד֙ אֶת־מְת֣וּשָׁאֵ֔ל וּמְתוּשָׁאֵ֖ל יָלַ֥ד אֶת־לָֽמֶךְ׃`,
          rashi: `יֵשׁ מָקוֹם שֶׁהוּא אוֹמֵר בְּזָכָר הוֹלִיד וְיֵשׁ מָקוֹם שֶׁהוּא אוֹמֵר יָלַד, שֶׁהַלֵּדָה מְשַׁמֶּשֶׁת שְׁתֵּי לְשׁוֹנוֹת, לֵדַת הָאִשָּׁה ניש"טרא בְּלַעַז וּזְרִיעַת תּוֹלְדוֹת הָאִישׁ אינזי"ראר בְּלַעַז. כְּשֶׁהוּא אוֹמֵר הוֹלִיד בִּלְשׁוֹן הִפְעִיל, מְדַבֵּר בְּלֵדַת הָאִשָּׁה – פְּלוֹנִי הוֹלִיד אֶת אִשְׁתּוֹ בֵּן אוֹ בַת, כְּשֶׁהוּא אוֹמֵר יָלַד, מְדַבֵּר בִּזְרִיעַת הָאִישׁ:`,
          tr: `this root ילד is used in two senses: in reference to a woman giving birth to a child through the agency of a male old French naitre; English to give birth to and the act of begetting by a man old French engendrer; English engender, beget.`,
          note: `Second of the pair. English kept this one as "engender." The same comment is a grammar point (הוליד in hif'il against ילד in kal) and appears in that section too.`
        },
        {
          id: `l9`, travel: `Not traced. Modern French mâchure, a bruise on fruit or a flaw in cloth, looks like the translator's word, but the route is not confirmed, and Rashi's letters point to a different spelling.`, modern: `mâchure`, modernEn: `a bruise; rare today`, sim: [], ref: `4:23`, rashiRef: `Rashi on Genesis 4:23:3`,
          dh: `פצע`, se: `petza`,
          laaz: `מקא"דורה`, gloss: `macheure`, en: `a wound from sword or arrow`,
          pasuk: `וַיֹּ֨אמֶר לֶ֜מֶךְ לְנָשָׁ֗יו עָדָ֤ה וְצִלָּה֙ שְׁמַ֣עַן קוֹלִ֔י נְשֵׁ֣י לֶ֔מֶךְ הַאְזֵ֖נָּה אִמְרָתִ֑י כִּ֣י אִ֤ישׁ הָרַ֙גְתִּי֙ לְפִצְעִ֔י וְיֶ֖לֶד לְחַבֻּרָתִֽי׃`,
          rashi: `מַכַּת חֶרֶב אוֹ חֵץ מקא"דורה בְּלַעַז:`,
          tr: `פצע wound, is the stroke inflicted by a sword or arrow (old French macheure).`,
          note: `Rashi defines the word twice over: by the weapon that makes it, then by the French.`,
          flag: `The Hebrew letters (with ק and ד) do not line up with the translator's "macheure." The Latin spelling needs checking against a la'azim reference work.`
        }
      ]
    },
    {
      id: `dikduk`,
      he: `לְשׁוֹן`,
      en: `Grammar points`,
      blurb: `Sample of the next section. Places where Rashi reads the verse from a prefix, a vowel, the stress, or a verb form.`,
      items: [
        { id: `g1`, ref: `2:5`, rashiRef: `Rashi on Genesis 2:5:1`, dh: `טרם יהיה בארץ`, se: `terem yihyeh va'aretz`, tag: `Word meaning`,
          rashi: `כָּל טֶרֶם שֶׁבַּמִּקְרָא לְשׁוֹן עַד לֹא הוּא, וְאֵינוֹ לְשׁוֹן קֹדֶם, וְאֵינוֹ נִפְעָל לוֹמַר הִטְרִים, כַּאֲשֶׁר יֹאמַר הִקְדִים`,
          en: `טרם always means "not yet," never "before," and it cannot be turned into a verb the way קדם can.` },
        { id: `g2`, ref: `4:9`, rashiRef: `Rashi on Genesis 4:9:3`, dh: `השומר אחי`, se: `hashomer achi`, tag: `Vowels`,
          rashi: `לְשׁוֹן תֵּמַהּ הוּא, וְכֵן כָּל הֵ"א הַנְּקוּדָה בַּחֲטַף פַּתָּח:`,
          en: `A heh pointed with chataf patach opens a question. The vowel tells you Kayin is asking, not stating.` },
        { id: `g3`, ref: `4:22`, rashiRef: `Rashi on Genesis 4:22:2`, dh: `לטש כל חרש נחשת וברזל`, se: `lotesh kol choresh nechoshet uvarzel`, tag: `Vowels and stress`,
          rashi: `חוֹרֵשׁ אֵינוֹ לְשׁוֹן פֹּעֶל אֶלָּא לְשׁוֹן פּוֹעֵל, שֶׁהֲרֵי נָקוּד קָמָץ קָטָן וְטַעְמוֹ לְמַטָּה`,
          en: `Rashi proves the word is a participle (one who does) and not a noun from two signs: the vowel and the stress on the last syllable.`,
          note: `Rashi's "kamatz katan" is the vowel now called tzere.` },
        { id: `g4`, ref: `2:22`, rashiRef: `Rashi on Genesis 2:22:2`, dh: `ויבן את הצלע לאשה`, se: `vayiven et hatzela le'isha`, tag: `Prefix`,
          rashi: `לִהְיוֹת אִשָּׁה, כְּמוֹ וַיַּעַשׂ אוֹתוֹ גִדְעוֹן לְאֵפוֹד (שופטים ח'), לִהְיוֹת אֵפוֹד:`,
          en: `The lamed prefix here means "to become": built so that it would be a woman. Rashi brings a second verse built the same way.` },
        { id: `g5`, ref: `4:18`, rashiRef: `Rashi on Genesis 4:18:1`, dh: `ועירד ילד`, se: `ve'Irad yalad`, tag: `Verb form`,
          rashi: `כְּשֶׁהוּא אוֹמֵר הוֹלִיד בִּלְשׁוֹן הִפְעִיל, מְדַבֵּר בְּלֵדַת הָאִשָּׁה – פְּלוֹנִי הוֹלִיד אֶת אִשְׁתּוֹ בֵּן אוֹ בַת, כְּשֶׁהוּא אוֹמֵר יָלַד, מְדַבֵּר בִּזְרִיעַת הָאִישׁ:`,
          en: `הוליד (hif'il) says the man caused his wife to bear. ילד said of a man means his own begetting. Linked to the two French words in the first section.` },
        { id: `g6`, ref: `6:3`, rashiRef: `Rashi on Genesis 6:3:3`, dh: `בשגם הוא בשר`, se: `beshagam hu vasar`, tag: `Prefix`,
          rashi: `כְּמוֹ בְּשֶׁגַּם, כְּלוֹמַר, בִּשְׁבִיל שֶׁגַּם זֹאת בוֹ`,
          en: `Read the word as three parts: ב + ש + גם, "because this too is in him." Rashi goes on to bring two verses where ש is pointed the same unusual way.` }
      ]
    },
    {
      id: `peshat`,
      he: `יִשּׁוּבוֹ שֶׁל מִקְרָא`,
      en: `Settling the verse`,
      blurb: `Proposed section. Places where Rashi says out loud which kind of explanation he is giving. Bereshit has more of these than any other parasha is likely to.`,
      items: [
        { id: `p1`, ref: `3:8`, rashiRef: `Rashi on Genesis 3:8:1`, dh: `וישמעו`, se: `vayishme'u`, tag: `Rashi's rule`,
          rashi: `וַאֲנִי לֹא בָאתִי אֶלָּא לִפְשׁוּטוֹ שֶׁל מִקְרָא וּלְאַגָּדָה הַמְיַשֶּׁבֶת דִּבְרֵי הַמִּקְרָא דָבָר דָּבוּר עַל אׇפְנָיו`,
          en: `The statement of method: plain sense, plus only the aggadah that settles the words of the verse.` },
        { id: `p2`, ref: `1:1`, rashiRef: `Rashi on Genesis 1:1:2`, dh: `בראשית ברא`, se: `bereshit bara`, tag: `Derash first`,
          rashi: `אֵין הַמִּקְרָא הַזֶּה אוֹמֵר אֶלָּא דָּרְשֵׁנִי`,
          en: `The verse itself asks to be expounded. Rashi gives the derash, then the plain sense.` },
        { id: `p3`, ref: `1:4`, rashiRef: `Rashi on Genesis 1:4:1`, dh: `וירא אלהים את האור כי טוב ויבדל`, se: `vayar Elohim et ha'or ki tov vayavdel`, tag: `Aggadah needed`,
          rashi: `אַף בָּזֶה אָנוּ צְרִיכִין לְדִבְרֵי אַגַּדָה`,
          en: `Here too the verse needs aggadah. Rashi then adds how to read it by the plain sense.` },
        { id: `p4`, ref: `4:8`, rashiRef: `Rashi on Genesis 4:8:1`, dh: `ויאמר קין אל הבל`, se: `vayomer Kayin el Hevel`, tag: `Aggadah set aside`,
          rashi: `וְיֵשׁ בָּזֶה מִדְרְשֵׁי אַגָּדָה, אַךְ זֶה יִשּׁוּבוֹ שֶׁל מִקְרָא:`,
          en: `Midrashim exist, but this is what settles the verse.` },
        { id: `p5`, ref: `3:22`, rashiRef: `Rashi on Genesis 3:22:2`, dh: `ועתה פן ישלח ידו`, se: `ve'ata pen yishlach yado`, tag: `Aggadah set aside`,
          rashi: `וְיֵשׁ מִדְרְשֵׁי אַגָּדָה, אֲבָל אֵין מְיֻשָּׁבִין עַל פְּשׁוּטוֹ:`,
          en: `Midrashim exist, but they do not sit on the plain sense.` },
        { id: `p6`, ref: `6:3`, rashiRef: `Rashi on Genesis 6:3:4`, dh: `והיו ימיו וגו'`, se: `vehayu yamav`, tag: `Aggadah set aside`,
          rashi: `יֵשׁ מִדְרְשֵׁי אַגָּדָה רַבִּים בְּלֹא יָדוֹן, אֲבָל זֶה הוּא צִחְצוּחַ פְּשׁוּטוֹ:`,
          en: `Many midrashim on לא ידון, but this is the polished plain sense.` }
      ]
    },
    {
      id: `targum`,
      he: `כְּתַרְגּוּמוֹ`,
      en: `Rashi and the Targum`,
      blurb: `Proposed section. Places where Rashi leans on the Aramaic translation, sends you to it, or uses Aramaic to explain a name.`,
      items: [
        { id: `t1`, ref: `4:7`, rashiRef: `Rashi on Genesis 4:7:1`, dh: `הלא אם תיטיב`, se: `halo im teitiv`, tag: `Sends you to it`,
          rashi: `כְּתַרְגּוּמוֹ פֵּרוּשׁוֹ:`,
          en: `The whole comment: the explanation is as the Targum has it. A reader has to open the Targum to learn the verse.` },
        { id: `t2`, ref: `3:15`, rashiRef: `Rashi on Genesis 3:15:2`, dh: `ישופך`, se: `yeshufcha`, tag: `Proof`,
          rashi: `יְכַתֶּתְךָ (סוטה ט') כְּמוֹ וָאֶכֹּת אֹתוֹ (דברים ט), וְתַרְגּוּמוֹ וְשָׁפִית יָתֵי':`,
          en: `Rashi proves the meaning "crush" from the Targum of a different verse, where the same Aramaic root appears.` },
        { id: `t3`, ref: `3:24`, rashiRef: `Rashi on Genesis 3:24:3`, dh: `החרב המתהפכת`, se: `hacherev hamit'hapechet`, tag: `Word meaning`,
          rashi: `תַּרְגּוּם לַהַט שְׁנַן, כְּמוֹ שָׁלַף שְׁנָנָא וּבִלְשׁוֹן לַעַז לא"מא`,
          en: `Hebrew word, then Aramaic, then French: three languages for one blade. Linked to the first section.` },
        { id: `t4`, ref: `4:19`, rashiRef: `Rashi on Genesis 4:19:3`, dh: `עדה`, se: `Ada`, tag: `Name`,
          rashi: `עָדָה תַּרְגּוּם שֶׁל סוּרָה:`,
          en: `The name is explained through Aramaic: עדה is how the Targum renders "removed."` },
        { id: `t5`, ref: `6:6`, rashiRef: `Rashi on Genesis 6:6:2`, dh: `ויתעצב`, se: `vayit'atzev`, tag: `Named source`,
          rashi: `הָאָדָם אֶל לִבּוֹ שֶׁל מָקוֹם, עָלָה בְמַחֲשַׁבְתּוֹ שֶׁל מָקוֹם לְהַעֲצִיבוֹ, זֶהוּ תַּרְגוּם אֻנְקְלוֹס.`,
          en: `Rashi gives a reading and then names Onkelos as its source, before offering a second reading of his own.` }
      ]
    }
  ]
};
