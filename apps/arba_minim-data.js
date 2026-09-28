/* ============================================================================
   ARBA MINIM  ·  The Four Species as plants
   Sukkah 32a–36a  ·  Shulchan Aruch OC 645–648  ·  Magen Avraham 648:23
   This map does NOT pasken. Each card sets what the plant is actually doing
   (botany, horticulture, genetics) beside what the sugya and the Shulchan
   Aruch say about it, and names the she'eilah where the two meet. Every
   source is quoted as written and linked.
   ========================================================================== */
window.ARBA_DATA = {

  status: {
    pasul:    { cls:"b-pasul",  en:"Pasul in the sugya" },
    cond:     { cls:"b-cond",   en:"Conditional / machlokes" },
    kosher:   { cls:"b-kosher", en:"Kosher in the sugya" },
    hiddur:   { cls:"b-hiddur", en:"Not a psul: hiddur or market grade" },
    open:     { cls:"b-open",   en:"Contemporary she'eilah" }
  },
  layer: {
    botany: { cls:"b-botany", en:"Botany" },
    sugya:  { cls:"b-sugya",  en:"Sugya" },
    market: { cls:"b-market", en:"Trade" }
  },

  principle: {
    en: "One pasuk names four plants by description, not by species name. The Gemara turns each description into a botanical test: a tree whose wood and fruit taste alike; a frond that is still bound; a branch whose leaves hide its stem, three to a node; a brook-side tree with a red twig and a long, smooth-edged leaf. Those tests are things a plant does, so modern botany can say how each species meets them, how easy or hard it is to find a specimen that does, and where a marketplace grade (Deri, meshulash, a closed pitom) is a hiddur rather than a din. What the halacha IS at each junction is the work of the poskim, not of this map.",
    sources: [
      { ref:"Leviticus 23:40",
        he:"וּלְקַחְתֶּם לָכֶם בַּיּוֹם הָרִאשׁוֹן פְּרִי עֵץ הָדָר כַּפֹּת תְּמָרִים וַעֲנַף עֵץ־עָבֹת וְעַרְבֵי־נָחַל וּשְׂמַחְתֶּם לִפְנֵי יְהֹוָה אֱלֹהֵיכֶם שִׁבְעַת יָמִים",
        se:"u-lekachtem lachem ba-yom ha-rishon pri eitz hadar, kapos temarim, va-anaf eitz avos, ve-arvei nachal",
        en:"On the first day you shall take the product of hadar trees, branches of palm trees, boughs of leafy trees, and willows of the brook, and you shall rejoice before the Eternal your God seven days." }
    ]
  },

  categories: [

    /* ------------------------------------------------------------------ */
    { id:"esrog",
      name:{ he:"אֶתְרוֹג", se:"Esrog", en:"Esrog" },
      latin:"Citrus medica L.",
      lead:"The only one of the four that is a fruit, and the only one where the fear is not a look-alike species but a hidden history: was this tree grafted, was it cross-bred, and can anyone tell from the fruit. Three different things get lumped together as \"murkav\"; the botany separates them, and only one of the three shows up in DNA.",
      nodes:[

        { id:"esrog-what",
          name:{ he:"מַה הוּא אֶתְרוֹג", se:"mah hu esrog", en:"What an esrog is, botanically" },
          organism:"Citrus medica L. (citron), family Rutaceae",
          layer:"botany", status:"kosher",
          biology:"The citron is one of the three or four ancestral species from which nearly every commercial citrus descends (with pummelo, mandarin and the papedas). The lemon is a hybrid with a citron parent; the citron itself is a founder. The fruit is mostly rind: a thin oil-bearing outer skin (flavedo) over a very thick white spongy layer (albedo), with a small, nearly juiceless core of segments. The tree is everflowering in a warm climate, so fruit of several ages hang together, and a fruit can stay on the tree for a year or more without dropping.",
          match:"The Gemara's three identifiers are each a botanical trait of exactly this plant. \"The taste of its wood and its fruit are alike\": the young green wood and the rind carry the same citron oils. \"Dar be-ilano mi-shana le-shana\": it stays on its tree from year to year, which is the persistence of the fruit and the year-round bloom. Rebbi's reading, \"when the small ones come the large ones are still there\", is a description of a tree that carries flowers, small fruit and mature fruit at the same time, which an everflowering citron does and a seasonal fruit tree does not.",
          question:"None. The identification of pri eitz hadar with the citron is not contested in the sugya; the only alternative the Gemara raises (peppers) it rejects on practical grounds.",
          sources:[
            { ref:"Sukkah 35a", he:"תָּנוּ רַבָּנַן: ״פְּרִי עֵץ הָדָר״, עֵץ שֶׁטַּעַם עֵצוֹ וּפִרְיוֹ שָׁוֶה — הֱוֵי אוֹמֵר זֶה אֶתְרוֹג.", se:"eitz she-taam eitzo u-firyo shaveh, hevei omer zeh esrog", en:"The Sages taught: \"Fruit of a beautiful tree\", a tree that the taste of its tree trunk and the taste of its fruit are alike. You must say it is the esrog tree." },
            { ref:"Sukkah 35a", he:"רַבִּי אֲבָהוּ אָמַר: אַל תִּקְרֵי ״הָדָר״, אֶלָּא ״הַדָּר״ — דָּבָר שֶׁדָּר בְּאִילָנוֹ מִשָּׁנָה לְשָׁנָה.", se:"davar she-dar be-ilano mi-shanah le-shanah", en:"Rabbi Abbahu said: Do not read it hadar, but rather read it haddar, meaning one that dwells, referring to an item that dwells on its tree from year to year." },
            { ref:"Sukkah 35a", he:"אֶלָּא הָכִי קָאָמַר: עַד שֶׁבָּאִין קְטַנִּים, עֲדַיִין גְּדוֹלִים קַיָּימִים.", se:"ad she-ba'in ketanim, adayin gedolim kayamim", en:"Rather, this is what he is saying: when the small ones come into being, the large ones still exist on the tree." }
          ],
          reading:[
            { t:"UC Riverside Citrus Variety Collection: Etrog citron", u:"https://citrusvariety.ucr.edu/crc3891" },
            { t:"Springer: Etrog Citron (Citrus medica var. ethrog)", u:"https://link.springer.com/chapter/10.1007/978-3-031-37534-7_7" }
          ] },

        { id:"esrog-three",
          name:{ he:"הַרְכָּבָה, הַכְלָאָה, הַאֲבָקָה", se:"harkavah, hachla'ah, ha'avakah", en:"Grafting vs cross-breeding vs cross-pollination: three different things" },
          organism:"Citrus medica scion; rootstocks used in the trade: lemon, sour orange, rough lemon, citron seedling",
          layer:"botany", status:"open",
          biology:"Three processes get called \"murkav\" and they are not the same event in the plant. (1) Cross-pollination: pollen from a neighboring lemon or orange lands on an esrog flower and fertilizes it. The result is hybrid SEEDS. The fruit around them (rind, albedo, segment walls) is the mother tree's own tissue and carries only the mother's genome; pollen has almost no effect on citrus fruit flesh. So a fruit from a pure tree next to a lemon grove is a pure esrog; only planting its seeds would give you hybrids. (2) Cross-breeding (hybridization): the TREE grew from a hybrid seed. Every cell in it, including the fruit, carries both parents' DNA, and molecular markers see it. (3) Grafting: an esrog bud or branch (scion) is spliced onto the roots of another citrus (rootstock). The two plants share water, minerals and hormones across the graft union, but they do not exchange chromosomes. Every cell above the union stays genetically esrog. The rootstock can change vigor, rind thickness, juiciness and fruit size through what it supplies, not through the genes.",
          match:"The psul of a grafted esrog is not in the Gemara or the Shulchan Aruch text. It surfaces in the sixteenth century in Italy, in a teshuvah of R' Yehuda of Padua brought in the Teshuvos of the Rema (126), and is fixed in the Ashkenazi mainstream by the Magen Avraham. The Magen Avraham quotes the three signs verbatim and adds the Levush's fourth: (1) the graft is smooth while an esrog has small raised bumps over its whole body; (2) the graft's stem (oketz) protrudes while the esrog's is sunken; (3) inside, the graft has a wide pulp and much juice and a thin rind, the esrog the reverse, thick rind, little pulp, nearly dry; (4, Levush) the esrog's seed stands upright along the fruit's axis, the graft's lies across it. Every one of these is a rootstock-influenced PHENOTYPE, which is exactly what grafting changes and exactly what DNA does not.",
          question:"The she'eilah the botany forces is which of the three the din is about. On what has been measured: a 2005 genetic study of twelve esrog accessions (Calabria Chabad, Diamante, an Italian Etrog, two Moroccan, three Yemenite, and the Israeli Kibilevitz, Braverman, Chazon Ish Halperin and Chazon Ish Lefkovich lines) used RAPD, SCAR and chloroplast markers and found none of the known pummelo, mandarin, lemon or sour-orange markers in any of them: no cross-breeding. The same authors write that there is no molecular way to establish that a tree was never grafted. An Israeli comparative study of twelve strains (Goldschmidt, Halichos Sadeh 146) reached the same two conclusions. So DNA can rule out (2) and says nothing about (3). Whether the sixteenth-century signs remain reliable once the rootstock and horticulture have changed, and whether the psul turns on the act of kilayim or on the fruit not being \"esrog\" at all (the Magen Avraham's own final reasoning), are questions the poskim divide on. Left to them.",
          sources:[
            { ref:"Magen Avraham 648:23", he:"אתרוג המורכב מלימוני ואתרוג פסול, ויש בו ג' סימנים הא' המורכב חלק ולאתרוג בליטות קטנות בכל גופם וגובה להם הב' המורכב העוקץ בולט ועוקץ האתרוג שוקע, הג' הוא כי תוך המורכב דהיינו המוץ רחב והמוהל שלו רב והקליפה התיכונ' קצרה ובאתרוג הוא להפך כי הקליפ' רחבה והתוך קצר והוא כמעט יבש", se:"esrog ha-murkav mi-limoni ve-esrog pasul, ve-yesh bo gimmel simanim", en:"An esrog grafted from lemon and esrog is pasul, and it has three signs. The first: the grafted one is smooth, while the esrog has small protrusions over its whole body with height to them. The second: on the grafted one the oketz protrudes, while the esrog's oketz is sunken. The third: the inside of the grafted one, that is the pulp, is wide and its juice plentiful and the middle rind narrow, while in the esrog it is the reverse, the rind wide and the inside small and nearly dry." },
            { ref:"Magen Avraham 648:23", he:"וסימנים אלו מובהקים לאתרוגים המורכבים הגדלים אצלנו אבל ממחוז פולייא באים אתרוגים אשר אנחנו מסופקים בהם ... והמורכב פסול אפי' בשעת הדחק עכ\"ל ר\"י פדואה בתשובת רמ\"א סימן קכ\"ו", se:"ve-simanim elu muvhakim la-esrogim ha-murkavim ha-gedelim etzlenu", en:"And these signs are clear for the grafted esrogim that grow by us, but from the province of Puglia come esrogim about which we are in doubt ... and the grafted one is pasul even in pressing circumstances. Thus far R' Yehuda of Padua in the Teshuvos of the Rema, 126." },
            { ref:"Magen Avraham 648:23", he:"ובע\"ש כתב עוד סימן שהאתרוג הגרעין זקוף לאורך האתרוג ובמורכב הגרעין מושכב לרוחב האתרוג ... ול\"נ דפסול משום דלא מקרי אתרוג כלל", se:"ha-esrog ha-garin zakuf le-orech ha-esrog u-va-murkav ha-garin mushkav le-rochav ha-esrog", en:"And in the Levush he wrote a further sign: in the esrog the seed stands upright along the length of the esrog, and in the grafted one the seed lies across the width of the esrog ... And it seems to me that it is pasul because it is not called esrog at all." }
          ],
          reading:[
            { t:"Nicolosi et al. 2005, The Search for the Authentic Citron: Historic and Genetic Analysis (HortScience)", u:"https://www.researchgate.net/publication/290793892_The_Search_for_the_Authentic_Citron_Citrus_medica_L_Historic_and_Genetic_Analysis" },
            { t:"Toraland (Prof. Zohar Amar): Grafted and hybrid etrogim", u:"https://en.toraland.org.il/beit-midrash/articles/around-the-jewish-year/sukkot/grafted-and-hybrid-etrogim/" },
            { t:"Yeshivat Har Etzion: The Grafted Etrog", u:"https://etzion.org.il/en/holidays/sukkot/grafted-etrog" },
            { t:"Horticulture Research 2022: molecular aspects of grafting in fruit trees (what does and does not cross a graft union)", u:"https://academic.oup.com/hr/article/doi/10.1093/hr/uhac032/6532224" }
          ] },

        { id:"esrog-pitom",
          name:{ he:"פִּטָּם, דַּד וְשׁוֹשַׁנְתָּא", se:"pitom, dad ve-shoshanta", en:"The pitom: how it grows and why it stays or falls" },
          organism:"Persistent style and stigma of the citron flower",
          layer:"botany", status:"cond",
          biology:"Every citrus flower has a pistil: an ovary (which becomes the fruit), a stalk above it (the style) and a sticky cap on top (the stigma). In almost all citrus the style and stigma dry and drop off within days of pollination; an orange has no pitom because that tissue abscised. In the citron the style often does not abscise. It stays attached, hardens, and becomes the woody \"dad\"; the stigma on its tip persists as the \"shoshanta\", the little flower-shaped head. Whether it stays is decided by hormone balance at the abscission zone, a narrow ring of cells at the base of the style. Above a threshold of growth hormone the ring does not activate and the pitom stays; below it, the ring dissolves and the pitom drops, usually early, leaving a scar that heals brown on the tree. Fruit with and without a pitom grow on the same branch. Growers can hold the pitom on by spraying a synthetic auxin during fruit set, which keeps the abscission zone from firing.",
          match:"The Mishnah lists \"nitlah pitmaso\" as a psul and \"nital uktzo\" as kosher; Rabbi Yitzchak ben Elazar glosses the pitom as \"buchnaso\", its pestle. The Shulchan Aruch defines the dad as the small head that carries the shoshanta and says removing it is pasul; the Rema records a stricter view that removing even the shoshanta is pasul, says it is good to be strict where possible, and then makes the decisive distinction: all this is when it was REMOVED, but an esrog that never had a dad is kosher, \"and such are most of the esrogim brought to these countries\". The botany is the same distinction: an abscission that happened on the tree in the first weeks leaves a smooth, healed, slightly sunken brown scar; a pitom knocked off after harvest leaves a fresh break that darkens.",
          question:"Whether a hormone-retained pitom is any different in din from a naturally retained one (no source treats it differently; the tissue is the plant's own). Whether a healed scar that is level with the rind counts as \"never had\" or \"removed\": the Rema's line is about history, and the scar is the evidence of that history. A posek reads the scar.",
          sources:[
            { ref:"Mishnah Sukkah 3:6", he:"עָלְתָה חֲזָזִית עַל רֻבּוֹ, נִטְּלָה פִטְמָתוֹ, נִקְלַף, נִסְדַּק, נִקַּב וְחָסַר כָּל שֶׁהוּא, פָּסוּל. עָלְתָה חֲזָזִית עַל מִעוּטוֹ, נִטַּל עֻקְצוֹ, נִקַּב וְלֹא חָסַר כָּל שֶׁהוּא, כָּשֵׁר.", se:"nitlah pitmaso ... pasul; nital uktzo ... kasher", en:"If boil-like blemishes arose on the majority of the esrog; if its pestle-like protuberance was removed; if it was peeled, split, or pierced and is missing any amount, it is pasul. If blemishes arose only on its minority; if its stem was removed; or it was pierced but is not missing any amount, it is kosher." },
            { ref:"Sukkah 35b", he:"נִטְּלָה פִּטְמָתוֹ. תָּנָא רַבִּי יִצְחָק בֶּן אֶלְעָזָר: נִטְּלָה בּוּכְנָתוֹ.", se:"tana Rabbi Yitzchak ben Elazar: nitlah buchnaso", en:"If its pitom was removed. Rabbi Yitzchak ben Elazar taught: this means if its pestle-like protuberance at its upper end was removed." },
            { ref:"Shulchan Arukh OC 648:7", he:"ניטל דדו והוא הראש הקטן ששושנתו בו פסול: הגה ויש מחמירין אם נטלה השושנתא דהיינו מה שאנו קורין פיטמא (ר\"ן) וטוב להחמיר במקום שאפשר מיהו לענין דינא אין לפסול אא\"כ ניטל הדד דהיינו העץ שראש הפיטמא עליו והראש נקרא שושנתא (המגיד) וכל זה דוקא בניטלה אבל אם לא היה לו דד מעולם כשר וכן הם רוב האתרוגים שמביאים במדינות אלו (הרא\"ש)", se:"aval im lo hayah lo dad me-olam kasher", en:"If its dad, which is the small head that holds the shoshanta, is removed, it is pasul. Rema: Some are stringent if the shoshanta is removed, that which we call the pitma (Ran), and it is good to be stringent where possible. However, legally it is not pasul unless the dad is removed, which is the wood that the pitma head sits on, and this head is called the shoshanta (the Maggid). This all refers to cases where it was removed. However, if there never was a dad, it is kosher, as is the case with most esrogim brought to these countries (Rosh)." }
          ],
          reading:[
            { t:"Toraland: The etrog's pitom (style, stigma, hormones, treatment)", u:"https://en.toraland.org.il/beit-midrash/articles/around-the-jewish-year/sukkot/sukkot-the-etrogs-pitom/" }
          ] },

        { id:"esrog-oketz",
          name:{ he:"עֹקֶץ", se:"oketz", en:"The oketz: the stem end" },
          organism:"Pedicel (fruit stalk) and its abscission zone",
          layer:"botany", status:"cond",
          biology:"The fruit hangs from a short stalk (pedicel). Where stalk meets fruit there is a second abscission zone; a ripe citron left long enough will drop by dissolving that ring, taking the stalk with it and leaving a clean button. Harvesters cut the stalk with clippers a few millimeters out so a stub remains. If the stalk is torn out instead of cut, it pulls a plug of rind with it and leaves a pit.",
          match:"The Mishnah: the oketz removed is kosher. The Shulchan Aruch adds the case the Mishnah does not address: if the wood by which it hung was pulled out of the body of the esrog and a hollow remains in its place, it is pasul; the Rema: if part of the wood was removed and some thickness remains so the whole width of the hollow is covered, it is kosher. In plant terms: a clean cut or a natural abscission button is kosher; a torn-out pedicel that gouged the albedo is chaser, missing flesh.",
          question:"None beyond reading the stem end for a gouge.",
          sources:[
            { ref:"Shulchan Arukh OC 648:8", he:"ניטל העץ שהוא תלוי בו באילן מעיקר האתרוג ונשאר מקומו גומא פסול: הגה ואם ינטל קצת העץ ונשאר עובי כל שהוא שכל רוחב הגומא מכוסה כשר (טור)", se:"nital ha-eitz she-hu talui bo ba-ilan me-ikar ha-esrog ve-nishar mekomo guma pasul", en:"If the wood by which it hung on the tree was removed from the root of the esrog leaving a hollow in its place, it is pasul. Rema: if part of the wood was removed and some thickness remains such that the whole width of the hollow is covered, it is kosher (Tur)." }
          ] },

        { id:"esrog-growth",
          name:{ he:"גִּדּוּל הָאֶתְרוֹג עַל הָעֵץ", se:"gidul ha-esrog al ha-eitz", en:"How the fruit grows, and what the grower does to it" },
          organism:"Citron orchard practice, Israel and Calabria",
          layer:"market", status:"hiddur",
          biology:"Spring bloom sets the fruit that will be harvested in late summer. The rind is soft and thin-skinned for the first weeks, which is when nearly every mark it will carry is made: a citron branch carries stout thorns, its leaves are stiff, and wind rubs both against the fruit. Scale insects and thrips feed on the young rind and leave dark specks or silvery scarring. Growers tie leaves back, clip thorns, bag or net individual fruit, and spray before bloom, then weaken the sprays as the fruit hardens because the chemicals themselves mark it. A Kfar Chabad grower puts the loss at roughly half the crop discarded at picking and another fifth to a third in the following weeks. Color at harvest is a chlorophyll question: the fruit is picked green-yellow and finishes yellow off the tree as the chlorophyll breaks down, which is the yarok-ke-karti rule in horticultural terms. A fruit grown inside a mold takes the mold's shape; the Gemara knew the practice.",
          match:"The sugya's psulim are about the state of the fruit, not the grower's methods, and the Shulchan Aruch fixes the grower-side cases: an esrog grown in a mold to look like another creature is pasul, shaped like itself even in plank-like sections it is kosher; green like field grass is pasul unless it will return to esrog color when left; smaller than an egg is pasul, an egg's size even unripe is kosher, and there is no upper limit.",
          question:"Netting and bagging remove the marks; they do not create a she'eilah. The only grower practice that ever did is grafting, treated in its own card.",
          sources:[
            { ref:"Sukkah 36a", he:"גִּדְּלוֹ בִּדְפוּס וַעֲשָׂאוֹ כְּמִין בְּרִיָּה אַחֶרֶת — פָּסוּל.", se:"gidlo bidfus va-asa'o ke-min beriah acheres, pasul", en:"If he grew the esrog in a mold and shaped it to appear like a different entity, it is pasul." },
            { ref:"Shulchan Arukh OC 648:21", he:"הירוק שדומה לעשבי השדה פסול אלא אם כן חוזר למראה אתרוג כשר כשמשהין אותו", se:"ha-yarok she-domeh le-isvei ha-sadeh pasul ela im ken chozer le-mar'eh esrog", en:"A green one like the grass of the fields is pasul unless it returns to the look of an esrog, in which case it is kosher after leaving it." },
            { ref:"Shulchan Arukh OC 648:22", he:"שיעור אתרוג קטן פחות מכביצה פסול אבל אם הוא כביצה אפי' אם הוא בוסר שעדיין לא נגמר פריו כשר ואם היה גדול כל שהוא כשר", se:"shiur esrog katan pachos mi-ke-beitzah pasul", en:"The measure of a small esrog: smaller than an egg is pasul, but if it is the size of an egg, even if it is unripe and has not finished growing, it is kosher; and however big it is, it is kosher." }
          ],
          reading:[
            { t:"Jerusalem Post: The quest for the perfect etrog (Kfar Chabad orchard practice, loss rates)", u:"https://www.jpost.com/judaism/article-760987" },
            { t:"Springer: Preserving Etrog Quality After Harvest", u:"https://link.springer.com/chapter/10.1007/978-3-031-25775-9_5" }
          ] },

        { id:"esrog-varieties",
          name:{ he:"זְנֵי הָאֶתְרוֹג", se:"zenei ha-esrog", en:"The named strains and what DNA says about them" },
          organism:"Citrus medica cultivar groups: Yemenite (Temani), Moroccan, Calabria / Yanova (Diamante), Chazon Ish lines, Braverman, Kibilevitz, Balady",
          layer:"botany", status:"kosher",
          biology:"The strains sold as esrogim differ in shape, ribbing, size and pulp. The Yemenite citron is the outlier to the eye: very large, thick-rinded, and with no juicy pulp at all, only dry white tissue around the seeds. On markers, all twelve accessions tested in 2005 clustered tightly together and apart from every other citrus, and the Yemenite grouped with the Mediterranean citrons rather than with Indian material, which the authors take as evidence of a Near Eastern or Mediterranean origin rather than a separate lineage. None carried lemon, sour orange, mandarin or pummelo markers.",
          match:"Every strain in that list is Citrus medica and none is a cross. The differences between them are the ordinary variation of a species, which is what Rebbi's \"hadir\" image describes: large and small, whole and blemished, in one pen. Provenance chains (Chazon Ish trees traced to the Salant orchard, Yanova trees to Calabrian stock, Moroccan trees to the Atlas foothills) are the community's answer to the grafting question that DNA cannot answer.",
          question:"Which chain of custody one relies on is a question of trust in the grower, not of botany.",
          sources:[
            { ref:"Sukkah 35a", he:"רַבִּי אוֹמֵר: אַל תִּקְרֵי ״הָדָר״, אֶלָּא ״הַדִּיר״. מָה דִּיר זֶה יֵשׁ בּוֹ גְּדוֹלִים וּקְטַנִּים, תְּמִימִים וּבַעֲלֵי מוּמִין", se:"mah dir zeh yesh bo gedolim u-ketanim, temimim u-va'alei mumin", en:"Rebbi says: do not read hadar but hadir, the pen. Just as in this pen there are large and small, unblemished and blemished, so too this tree has large and small fruits, flawless and blemished fruits." }
          ],
          reading:[
            { t:"Nicolosi et al. 2005 (full text, academia.edu)", u:"https://www.academia.edu/99106279/The_Search_for_the_Authentic_Citron_Citrus_medica_L_Historic_and_Genetic_Analysis" },
            { t:"Wikipedia: Moroccan citron", u:"https://en.wikipedia.org/wiki/Moroccan_citron" },
            { t:"Wikipedia: Balady citron", u:"https://en.wikipedia.org/wiki/Balady_citron" }
          ] }
      ] },

    /* ------------------------------------------------------------------ */
    { id:"lulav",
      name:{ he:"לוּלָב", se:"Lulav", en:"Lulav" },
      latin:"Phoenix dactylifera L.",
      lead:"A lulav is a date-palm leaf caught at one moment of its life: after it has grown to length but before it unfolds. Everything the sugya cares about, the bound leaflets, the twinned central leaf, the spine, is the anatomy of a frond that has not yet opened. \"Deri\" is not a species; it is the date cultivar whose unopened leaf happens to stay shut the longest.",
      nodes:[

        { id:"lulav-what",
          name:{ he:"כַּפּוֹת תְּמָרִים", se:"kapos temarim", en:"What a lulav is: an unopened frond" },
          organism:"Phoenix dactylifera, immature pinnate leaf (spear leaf)",
          layer:"botany", status:"kosher",
          biology:"A date palm makes a new leaf from the crown as a tightly folded spear. The midrib (the future spine, shidrah) runs its whole length; the leaflets are folded forward against it in pairs, and each leaflet is itself creased down its middle so its two halves lie back to back. That crease is what the Shulchan Aruch describes: the leaves grow two by two, joined at their back, and the joined back is the tiyomes. As the leaf matures the leaflets swing outward, the creases open, and the spear becomes the familiar spread frond, which the Gemara calls a charusa and excludes. Cut at the right week, the spear is about a meter long, green, straight, and still closed.",
          match:"The Gemara reads kapos as kafus, bound: the object has to be capable of being spread but is not. That rules out the hardened open frond (charusa), which cannot be bound, and the trunk (ufta), which is always bound; the immature thorny stage (kufra) is excluded because its ways are not ways of pleasantness. Tzinei Har HaBarzel, a palm with short sparse leaflets, is kosher only if the tip of one leaflet reaches the base of the next above it, so the spine is covered.",
          question:"None on identification. The living questions are all about the state of the spear: how open, how split, how bent.",
          sources:[
            { ref:"Sukkah 32a", he:"תַּנְיָא, רַבִּי יְהוּדָה אוֹמֵר מִשּׁוּם רַבִּי טַרְפוֹן: ״כַּפּוֹת תְּמָרִים״ — כְּפוֹת, אִם הָיָה פָּרוּד יִכְפְּתֶנּוּ.", se:"kapos temarim, kafus: im hayah parud yichpetenu", en:"Rabbi Yehuda says in the name of Rabbi Tarfon: \"branches [kapos] of a date palm\", bound [kafus]: if the leaves were spread, one should bind it." },
            { ref:"Sukkah 32a", he:"אֵימָא חֲרוּתָא! בָּעֵינָא כְּפוֹת וְלֵיכָּא. וְאֵימָא אוּפְתָּא! ״כְּפוֹת״ — מִכְּלָל דְּאִיכָּא פָּרוּד, וְהַאי כָּפוּת וְעוֹמֵד לְעוֹלָם. וְאֵימָא כּוּפְרָא? אָמַר אַבָּיֵי: ״דְּרָכֶיהָ דַרְכֵי נוֹעַם״ כְּתִיב.", se:"eima charusa ... eima ufta ... eima kufra", en:"Say it is the hardened branch: we require bound, and it is not. Say it is the trunk: \"bound\" implies it could be spread, and this is perpetually bound. Say it is the young thorny branch: Abaye said, \"Its ways are ways of pleasantness\" is written." },
            { ref:"Shulchan Arukh OC 645:3", he:"בריית עלין של לולב כך היא כשהם גדלים גדלים שנים שנים ודבוקים מגבן וגב של שני עלין היא הנקרא תיומת", se:"beriyas alin shel lulav kach hi: ke-she-hem gedelim, gedelim shnayim shnayim u-devukim mi-gaban", en:"The growth of a lulav's leaves is thus: when they grow, they grow in pairs joined at their back, and the back of the two leaves is what is called the tiyomes." },
            { ref:"Sukkah 32a", he:"צִינֵּי הַר הַבַּרְזֶל — כְּשֵׁרָה. אָמַר אַבָּיֵי: לֹא שָׁנוּ אֶלָּא שֶׁרֹאשׁוֹ שֶׁל זֶה מַגִּיעַ לְצַד עִיקָּרוֹ שֶׁל זֶה", se:"lo shanu ela she-rosho shel zeh magia le-tzad ikaro shel zeh", en:"Palms of the Iron Mountain are kosher. Abaye said: they taught this only where the top of this leaf reaches the base of that one." }
          ] },

        { id:"lulav-deri",
          name:{ he:"לוּלַב דֶּרִי", se:"lulav Deri", en:"What is so special about Deri" },
          organism:"Phoenix dactylifera cv. Deri (Dayri), a dark-fruited date of Iraqi origin grown in the Beit She'an and Jordan valleys",
          layer:"market", status:"hiddur",
          biology:"Deri is a date cultivar, chosen for its fruit long before anyone looked at its leaf. In 1985, at Kibbutz Tirat Zvi in the Beit She'an valley, R' Shabsai Cobin examined the spear leaves of the nine date varieties the kibbutz grew and found Deri's the best lulav. The trait is a cultivar phenotype: the leaflets of a Deri spear, and above all the central twin leaf, adhere to one another longer and more tightly, so the tiyomes stays closed through harvest, cold storage and the week of Sukkos, when other cultivars' tips have already begun to part. The spear is also straight and carries little of the brown papery sheath (kora) at the tip. Tirat Zvi keeps about 13,000 palms for lulavim, takes roughly 14 spears a tree a year, cuts them at about a meter before the leaflets begin to split, harvests from early spring for seven months, and holds them in cold storage; about 150,000 a year ship from that one kibbutz. Cold storage is also why Israel stopped importing lulavim from Egypt and Morocco.",
          match:"There is no din \"Deri\". Every date palm is kapos temarim. What Deri delivers is the Rema's lechatchila: \"it is the preferred way of the mitzvah to take a lulav whose top leaf is not split at all, since some are strict even when it is split a little\". The Brisker Rav's standard, a tightly shut center, green without sunburn, no kora, is the grade the market built the Deri trade around. The din itself, per the Rema quoting the Terumas Hadeshen, is that the top center leaf split down to the spine is nechlekah ha-tiyomes and pasul; short of that it is a hiddur.",
          question:"Whether a lulav whose tiyomes has been glued or bound shut, or whose kora is left on to hold it, is \"not split\" for the hiddur. Whether the Canary Island palm (Phoenix canariensis, \"kaneri\"), whose fruit is not a marketable date, is \"temarim\" at all is a separate contemporary she'eilah that this map notes and does not decide.",
          sources:[
            { ref:"Shulchan Arukh OC 645:3", he:"הגה וי\"מ לומר דאם נחלק העלה העליון האמצעי שעל השדרה עד השדרה מיקרי נחלק התיומת ופסול והכי נוהגין (ת\"ה סי' צ\"ו) מיהו לכתחלה מצוה מן המובחר נוהגין ליטול לולב שלא נחלק העלה העליון כלל כי יש מחמירין אפילו בנחלק קצת ואם אותו העלה אינה כפול מתחלת ברייתו פסול [כל בו]", se:"lechatchilah mitzvah min ha-muvchar nohagin litol lulav she-lo nechlak ha-aleh ha-elyon klal", en:"Rema: Some interpret that if the central top leaf on the spine is split down to the spine, it is considered a split tiyomes and is pasul, and this is our practice (Terumas Hadeshen 96). However, initially it is the preferred way of the mitzvah to take a lulav whose top leaf is not split at all, because some are stringent even when it is split a little. If that leaf is not doubled from the start of its growth, it is pasul (Kol Bo)." },
            { ref:"Sukkah 32a", he:"בָּעֵי רַב פָּפָּא: נֶחְלְקָה הַתְּיוֹמֶת, מַהוּ? ... אִיכָּא דְּאָמְרִי: אָמַר רַבִּי יְהוֹשֻׁעַ בֶּן לֵוִי: נֶחְלְקָה הַתְּיוֹמֶת, נַעֲשָׂה כְּמִי שֶׁנִּיטְּלָה הַתְּיוֹמֶת וּפְסוּל.", se:"nechlekah ha-tiyomes, na'asah ke-mi she-nitlah ha-tiyomes u-fasul", en:"Rav Pappa asked: if the central twin-leaf split, what is the halacha? ... Some say Rabbi Yehoshua ben Levi said: if the twin-leaf split, it becomes as one whose twin-leaf was removed, and it is pasul." }
          ],
          reading:[
            { t:"Times of Israel: Largest lulav-harvesting kibbutz (Tirat Zvi, Deri, numbers)", u:"https://www.timesofisrael.com/largest-lulav-harvesting-kibbutz-has-fronds-in-high-places/" },
            { t:"Mishpacha: Focused on Fronds (Cobin, the Brisker Rav's standard)", u:"https://mishpacha.com/focused-on-fronds/" },
            { t:"Wikipedia: List of date cultivars", u:"https://en.wikipedia.org/wiki/List_of_date_cultivars" }
          ] },

        { id:"lulav-defects",
          name:{ he:"פְּסוּלֵי לוּלָב", se:"psulei lulav", en:"Reading a lulav: the defects and what each one is in the leaf" },
          organism:"Frond anatomy: spine, leaflets, central twin leaf, tip",
          layer:"sugya", status:"cond",
          biology:"Niktam rosho: the tip of the spine snapped, usually in handling; the spear tip is the softest tissue. Nifretzu alav: leaflets torn free of the spine and hanging, a broom (chufya), a mechanical injury or a frond that opened and dried. Nifredu: leaflets merely parted from the spine but attached, the natural first stage of opening. Akum: a spear bowed like a sickle; toward the spine's back is how a palm leaf grows, toward its front or sideways is a defect. Chad hutza: leaflets on one side only, a developmental fault. Yavesh: dry, brittle, whitened; the leaf has lost water. Kora: the brown sheath at the tip is a normal part of the young leaf.",
          match:"The Mishnah sets four: stolen, dry, tip severed, leaflets torn: pasul; parted: kosher. The Gemara's baraisa adds thorny, split (Rav Pappa: like a fork, two spines), curved like a sickle (Rava: forward only), hardened like wood, and Rava's one-sided lulav. The Shulchan Aruch: parted leaves that did not hang like the open frond's are kosher even unbound; hanging ones are pasul, and the Rema: so too leaves hardened like wood, and all this for a majority of the leaves.",
          question:"How far a partly opened tiyomes must part before it is \"split\" is the she'eilah under every lulav sale; the Rema places the din at split to the spine and the hiddur at not split at all.",
          sources:[
            { ref:"Mishnah Sukkah 3:1", he:"לוּלָב הַגָּזוּל וְהַיָּבֵשׁ, פָּסוּל. ... נִקְטַם רֹאשׁוֹ, נִפְרְצוּ עָלָיו, פָּסוּל. נִפְרְדוּ עָלָיו, כָּשֵׁר. רַבִּי יְהוּדָה אוֹמֵר, יֶאֶגְדֶנּוּ מִלְמָעְלָה.", se:"niktam rosho, nifretzu alav, pasul; nifredu alav, kasher", en:"A lulav that was stolen or dry is pasul ... If its top was severed or its leaves were torn off, it is pasul. If its leaves were spread, it is kosher. Rabbi Yehuda says: one should bind it from the top." },
            { ref:"Sukkah 32a", he:"אָמַר רַב פָּפָּא: נִפְרְצוּ — דְּעָבֵיד כִּי חוּפְיָא. נִפְרְדוּ — דְּאִיפָּרוּד אִפָּרוֹדֵי.", se:"nifretzu, de-avid ki chufya; nifredu, de-iparud iparudei", en:"Rav Pappa said: torn means it is made like a broom; spread means the leaves are merely separated." },
            { ref:"Sukkah 32a", he:"קָווּץ, סָדוּק, עָקוֹם דּוֹמֶה לְמַגָּל — פָּסוּל. חָרוּת — פָּסוּל. דּוֹמֶה לְחָרוּת — כָּשֵׁר. ... עָקוֹם דּוֹמֶה לְמַגָּל, אָמַר רָבָא: לָא אֲמַרַן אֶלָּא לְפָנָיו, אֲבָל לְאַחֲרָיו — בִּרְיָיתֵיהּ הוּא. ... וְאָמַר רָבָא: הַאי לוּלַבָּא דְּסָלֵיק בְּחַד הוּצָא — בַּעַל מוּם הוּא, וּפָסוּל.", se:"akum domeh le-magal: lo amaran ela le-fanav, aval le-acharav biryaseh hu", en:"Thorny, split, or curved like a sickle is pasul; hardened is pasul, resembling hardened is kosher ... Curved like a sickle: Rava said, we said this only forward, but backward is its nature ... And Rava said: a lulav that grew with leaves on one side is blemished and pasul." },
            { ref:"Shulchan Arukh OC 645:1-2", he:"לולב שנפרדו עליו זה מעל זה ולא נדלדלו כעלי החריות כשר אפי' לא אגדו ... נפרצו עליו והוא שידלדלו משדרו של לולב כעלי החריות פסול", se:"nifredu alav ... kasher afilu lo agdo; nifretzu alav ... pasul", en:"A lulav whose leaves separated from one another but did not hang loose like the leaves of the open frond is kosher even unbound ... If its leaves burst, that is, hang loose from the spine like the open frond's leaves, it is pasul." }
          ] }
      ] },

    /* ------------------------------------------------------------------ */
    { id:"hadas",
      name:{ he:"הֲדַס", se:"Hadas", en:"Hadas" },
      latin:"Myrtus communis L.",
      lead:"Myrtle is a common Mediterranean shrub; a myrtle that meets the sugya's standard is not. The whole difficulty is one word, avos, which the Gemara turns into a count: three leaves rising from one point on the stem. On a normal myrtle shoot the leaves come two at a time. Rava says it outright: a fully dense three-tefach branch is hard to find.",
      nodes:[

        { id:"hadas-what",
          name:{ he:"עֲנַף עֵץ עָבֹת", se:"anaf eitz avos", en:"What the sugya's tests describe, and what a myrtle does" },
          organism:"Myrtus communis, evergreen shrub, Myrtaceae",
          layer:"botany", status:"kosher",
          biology:"Myrtle leaves are small, glossy, evergreen, and aromatic when crushed (the leaf oil is the same as the wood's: \"the taste of its wood and fruit alike\"). On the ordinary shoot they are arranged in opposite pairs, each pair set at a right angle to the one below (decussate), so from the side the stem is hidden under overlapping leaves: \"its leaves cover its wood\". Some shoots, on some plants, switch to putting out three leaves at each node instead of two (a whorled arrangement). That shift is a developmental variant of the shoot, not a different species; it runs stronger in some individuals and can be encouraged by selection and by hard pruning, which is how Israeli growers now produce branches that are three-to-a-node for their whole length.",
          match:"The Gemara's baraisa reads anaf eitz avos as a tree whose branches cover its wood and whose leaves are plaited like a braid and chain-like; olive fails the plaiting, the plane tree fails the covering, oleander fails \"ways of pleasantness\". Then the count: Rav Yehuda, three leaves at each node; Rav Kahana, even two and one; Mar bar Ameimar's father called the two-and-one a hadas shoteh. The Shulchan Aruch rules for three or more at one node; two level with a third above is a hadas shoteh.",
          question:"None on identification. The whole she'eilah is the count, next card.",
          sources:[
            { ref:"Sukkah 32b", he:"תָּנוּ רַבָּנַן: ״עֲנַף עֵץ עָבוֹת״ — שֶׁעֲנָפָיו חוֹפִין אֶת עֵצוֹ. וְאֵי זֶה הוּא? הֱוֵי אוֹמֵר זֶה הֲדַס. וְאֵימָא זֵיתָא! בָּעֵינַן ״עָבוֹת״, וְלֵיכָּא. וְאֵימָא דּוּלְבָּא! בָּעֵינַן עֲנָפָיו חוֹפִין אֶת עֵצוֹ, וְלֵיכָּא. וְאֵימָא הִירְדּוּף! אָמַר אַבָּיֵי: ״דְּרָכֶיהָ דַרְכֵי נוֹעַם״, וְלֵיכָּא.", se:"she-anafav chofin es eitzo ... eima zeisa ... eima dulba ... eima hirduf", en:"The Sages taught: \"Boughs of a dense-leaved tree\": a tree whose leaves obscure its tree. Which is that? The myrtle. Say the olive: we require dense-leaved, and it is not. Say the plane tree: we require leaves obscuring the tree, and it is not. Say the oleander: Abaye said, \"Its ways are ways of pleasantness\", and it is not." },
            { ref:"Sukkah 32b", he:"תָּנוּ רַבָּנַן: קָלוּעַ כְּמִין קְלִיעָה וְדוֹמֶה לְשַׁלְשֶׁלֶת, זֶהוּ הֲדַס. רַבִּי אֱלִיעֶזֶר בֶּן יַעֲקֹב אוֹמֵר: ״עֲנַף עֵץ עָבוֹת״ — עֵץ שֶׁטַּעַם עֵצוֹ וּפִרְיוֹ שָׁוֶה, הֱוֵי אוֹמֵר זֶה הֲדַס.", se:"kalua ke-min kelia ve-domeh le-shalsheles, zehu hadas", en:"The Sages taught: plaited like a braid and chain-like, that is the myrtle. Rabbi Eliezer ben Yaakov says: a tree whose wood and fruit taste alike, that is the myrtle." }
          ],
          reading:[
            { t:"Flora of Israel: Myrtus communis", u:"https://flora.org.il/en/plants/myrcom/" },
            { t:"Springer: Myrtle, a native Mediterranean and cultured crop species", u:"https://link.springer.com/chapter/10.1007/978-94-017-9276-9_14" }
          ] },

        { id:"hadas-meshulash",
          name:{ he:"תְּלָתָא תְּלָתָא טַרְפֵי בְּקִינָּא", se:"tlasa tlasa tarfei be-kina", en:"Meshulash: how easy is it to find, and why" },
          organism:"Whorled (three-leaf) nodes on Myrtus communis shoots",
          layer:"market", status:"cond",
          biology:"On a wild or garden myrtle, most shoots are two-leaved throughout, a minority carry a few three-leaf nodes, and a shoot that is three-leaved for a continuous three tefachim (roughly 24 to 30 cm) is rare. That is Rava's remark in the Gemara made into horticulture: \"now a dense branch of three we do not find\". Two things changed the trade. First, growers select mother plants whose shoots run whorled and propagate them by cuttings, so the trait is fixed clonally. Second, cutting the bush back hard forces vigorous new shoots, and vigorous shoots are the ones most likely to run three-to-a-node. Israeli hadas farms work both levers, which is why a fully meshulash branch went from a rarity to a standard retail grade. Berries are a second constraint: myrtle flowers in early summer and its dark blue-black berries ripen in autumn, at Sukkos; a heavily fruiting shoot will carry more berries than leaves.",
          match:"The din (Shulchan Aruch): three or more leaves at one node the whole length; the Rema records that in Ashkenaz they used imported hadasim that were NOT three-to-a-node lechatchila, relying on Rav Kahana's view and on the argument that a two-over-two branch is not the Gemara's hadas shoteh, and \"therefore the custom is to be lenient\" per the Maharik and the Terumas Hadeshen. Leaves fallen: if most fell but three remain at one node it is kosher. Berries: more berries than leaves and they are black or red, pasul; green, kosher; one may reduce them before Yom Tov but not on it.",
          question:"Whether a hadas that is meshulash for most of its length but not all (rov meshulash) meets the din is the live retail question; the Shulchan Aruch text says three at each node, the Rema's leniency runs the other way, and the poskim place the line. Left to them.",
          sources:[
            { ref:"Sukkah 32b", he:"הֵיכִי דָּמֵי עָבוֹת? אָמַר רַב יְהוּדָה: וְהוּא דְּקָיְימִי תְּלָתָא תְּלָתָא טַרְפֵי בְּקִינָּא. רַב כָּהֲנָא אָמַר: אֲפִילּוּ תְּרֵי וְחַד. רַב אַחָא בְּרֵיהּ דְּרָבָא מְהַדַּר אַתְּרֵי וְחַד, הוֹאִיל וּנְפַיק מִפּוּמֵּיהּ דְּרַב כָּהֲנָא. אֲמַר לֵיהּ מָר בַּר אַמֵּימָר לְרַב אָשֵׁי: אַבָּא לְהָהוּא — הֲדַס שׁוֹטֶה קָרֵי לֵיהּ.", se:"ve-hu de-kaimei tlasa tlasa tarfei be-kina ... afilu trei ve-chad ... hadas shoteh karei leh", en:"What is dense-leaved? Rav Yehuda said: three leaves emerge from each base. Rav Kahana said: even two and one. Rav Acha son of Rava would seek two-and-one since it came from Rav Kahana's mouth. Mar bar Ameimar said to Rav Ashi: my father called that a wild myrtle." },
            { ref:"Sukkah 32b", he:"אָמַר רָבָא: שְׁרָא לֵיהּ מָרֵיהּ לְרַבִּי טַרְפוֹן. הַשְׁתָּא עָבוֹת שְׁלֹשָׁה לָא מַשְׁכְּחִינַן, בַּת חֲמִשָּׁה מִבַּעְיָא!", se:"hashta avos sheloshah la mashkechinan, bas chamishah miba'ya", en:"Rava said: may his Master forgive Rabbi Tarfon. Now, we do not find even a dense-leaved myrtle branch three handbreadths long; is it necessary to say five?" },
            { ref:"Shulchan Arukh OC 646:3", he:"ענף עץ עבות האמור בתורה היא ההדס שעליו חופין את עציו כגון שלשה עלין או יותר בגבעול אחד אבל אם היו שני העלין בשוה זה כנגד זה והעלה השלישי למעלה מהן אין זה עבות אבל נקרא הדס שוטה: הגה ופסול אפי' בשעת הדחק ואיכא מאן דאמר בגמר' דכשר וע\"כ נוהגין באלו המדינות לכתחלה לצאת באלו ההדסים המובאים ואין ג' עלין בגבעול אחד ... ולכן נהגו להקל", se:"sheloshah alin o yoser be-giv'ol echad ... aval nikra hadas shoteh", en:"The dense-leaved bough of the Torah is the myrtle whose leaves cover its wood, such as three or more leaves at one node; but two leaves level with each other and a third above them is not dense, but is called a wild myrtle. Rema: and it is pasul even in pressing circumstances; there is an opinion in the Gemara that it is kosher, and therefore in these lands the custom is to use lechatchila the imported myrtles that do not have three leaves at one node ... and therefore the custom is to be lenient." },
            { ref:"Shulchan Arukh OC 646:1-2", he:"נשרו רוב עליו אם נשתייר ג' עלין בקן אחד כשר: היו ענביו מרובות מעליו אם ירוקות כשר ואם אדומות או שחורות פסול ואם מיעטן כשר ואין ממעטין אותם בי\"ט לפי שהוא כמתקן", se:"nashru rov alav im nishtayer gimmel alin be-ken echad kasher", en:"If most of its leaves fell but three remain at one node, it is kosher. If its berries outnumber its leaves: green, kosher; red or black, pasul. If he reduced them, kosher; one does not reduce them on Yom Tov because it is like repairing." }
          ] }
      ] },

    /* ------------------------------------------------------------------ */
    { id:"aravah",
      name:{ he:"עֲרָבָה", se:"Aravah", en:"Aravah" },
      latin:"Salix spp.",
      lead:"The easiest of the four to find and the hardest to keep. Willows line every stream; a cut willow twig loses its leaves to wilt and blackening within a day or two. The sugya's worry is a look-alike, the tzaftzafah, and it gives a three-point field key to tell them apart.",
      nodes:[

        { id:"aravah-what",
          name:{ he:"עַרְבֵי נָחַל וְצַפְצָפָה", se:"arvei nachal ve-tzaftzafah", en:"Willow vs tzaftzafah: the Gemara's field key" },
          organism:"Salix acmophylla (brook willow, native to Israel), Salix alba, Salix babylonica; the look-alike is generally identified with Populus euphratica (Euphrates poplar)",
          layer:"botany", status:"kosher",
          biology:"The willows of Israel's streams, above all Salix acmophylla, have reddish to red-brown young twigs and long, narrow, lance-shaped leaves with a smooth or very finely toothed margin: the Gemara's red stem, elongated leaf, smooth edge. The Euphrates poplar, which grows with them and is in the same family, has pale twigs and, on mature shoots, rounded to heart-shaped leaves with coarse teeth like a saw; its juvenile leaves are willow-like, which is what makes it a look-alike. The willow's leaf is thin and transpires fast, so a cut twig dries and its leaf tips blacken within a day unless kept cold and damp. Weeping willow, the common American aravah, has a finely serrate margin; the Shulchan Aruch's last clause covers exactly that: very small teeth like a small sickle, kosher.",
          match:"The baraisa: willow, its stem red, its leaf drawn out, its edge smooth; tzaftzafah, its stem white, its leaf round, its edge like a sickle. The Gemara reconciles a second baraisa (like a sickle kosher, like a saw pasul) with Abaye's chilfa gila, a willow with a toothed margin that is nonetheless kosher, \"arvei nachal\" in any case. Rav Chisda adds that the names swapped after the destruction, so \"chalafta\" and \"aravta\" changed places, a warning that the common name is not the key; the leaf is. \"Of the brook\" is where most of the species grows, but a willow of the field or the mountains is kosher.",
          question:"None on the key itself. Whether a given ornamental willow with a coarser toothing is \"like a sickle\" or \"like a saw\" is a leaf-in-hand question.",
          sources:[
            { ref:"Sukkah 34a", he:"תָּנוּ רַבָּנַן: אֵי זֶהוּ עֲרָבָה וְאֵיזֶהוּ צַפְצָפָה? עֲרָבָה, קָנֶה שֶׁלָּהּ אָדוֹם, וְעָלֶה שֶׁלָּהּ מָשׁוּךְ וּפִיהָ חָלָק. צַפְצָפָה, קָנֶה שֶׁלָּהּ לָבָן, וְעָלֶה שֶׁלָּהּ עָגוֹל וּפִיהָ דּוֹמֶה לְמַגָּל. וְהָא תַּנְיָא: דּוֹמֶה לְמַגָּל כָּשֵׁר, דּוֹמֶה לְמַסָּר — פָּסוּל! אֲמַר אַבָּיֵי: כִּי תַּנְיָא הָהִיא, בְּחִילְפָא גִּילָא.", se:"aravah, kaneh shelah adom, ve-aleh shelah mashuch u-fiha chalak; tzaftzafah, kaneh shelah lavan, ve-aleh shelah agol u-fiha domeh le-magal", en:"What is a willow and what is a tzaftzafah? A willow: its stem is red, its leaf elongated, its edge smooth. A tzaftzafah: its stem white, its leaf round, its edge serrated like a sickle. But is it not taught: like a sickle is kosher, like a saw is pasul? Abaye said: that was taught about the chilfa gila." },
            { ref:"Sukkah 33b", he:"תָּנוּ רַבָּנַן: ״עַרְבֵי נַחַל״ — הַגְּדֵילִין עַל הַנַּחַל. דָּבָר אַחֵר: ״עַרְבֵי נַחַל״, שֶׁעָלֶה שֶׁלָּהּ מָשׁוּךְ כְּנַחַל. ... שֶׁל בַּעַל וְשֶׁל הָרִים מִנַּיִין — תַּלְמוּד לוֹמַר: ״עַרְבֵי נַחַל״ מִכׇּל מָקוֹם.", se:"she-aleh shelah mashuch ke-nachal ... arvei nachal mi-kol makom", en:"\"Willows of the brook\": those that grow by the brook. Another reading: a tree whose leaf is drawn out like a brook ... Of the field and of the mountains, from where? The verse says \"willows of the brook\", in any case." },
            { ref:"Sukkah 34a", he:"אָמַר רַב חִסְדָּא: הָנֵי תְּלָת מִילֵּי אִשְׁתַּנִּי שְׁמַיְיהוּ מִכִּי חֲרַב בֵּית הַמִּקְדָּשׁ: חֲלַפְתָּא — עֲרַבְתָּא, עֲרַבְתָּא — חֲלַפְתָּא. מַאי נָפְקָא מִינַּהּ? לְלוּלָב.", se:"chalafta aravta, aravta chalafta; mai nafka minah? le-lulav", en:"Rav Chisda said: these three things changed their names since the Temple was destroyed: what was called chalafta is called aravta and aravta chalafta. What is the practical difference? For the lulav." },
            { ref:"Shulchan Arukh OC 647:1", he:"ערבי נחל האמור בתורה הוא מין ידוע הנקרא כן עלה שלו משוך כנחל ופיו חלק וקנה שלו אדום ... ויש מין אחד דומה לערבה אלא שעלה שלו עגול ופיו דומה למסר וקנה שלו אינו אדום וזהו הנקרא צפצפה והיא פסולה ויש מין ערבה שאין פי העלה שלה חלק ואינו כמסר אלא יש בו תלמים קטנים עד מאוד כמו פי מגל קטן וזה כשר", se:"ve-yesh min aravah she-ein pi ha-aleh shelah chalak ... yesh bo telamim ketanim ad me'od kemo pi magal katan ve-zeh kasher", en:"The willow of the brook is a known species: its leaf is drawn out like a brook, its edge smooth, its stem red ... There is a species like the willow but its leaf is round, its edge like a saw and its stem not red; this is the tzaftzafah and it is pasul. And there is a kind of willow whose leaf edge is not smooth and not like a saw but has very small furrows like the edge of a small sickle, and it is kosher." }
          ],
          reading:[
            { t:"Wildflowers of Israel: Salix acmophylla", u:"https://www.wildflowers.co.il/english/plant.asp?ID=633" },
            { t:"Wikipedia: Salix acmophylla", u:"https://en.wikipedia.org/wiki/Salix_acmophylla" },
            { t:"Wikipedia: Salix babylonica (weeping willow)", u:"https://en.wikipedia.org/wiki/Salix_babylonica" }
          ] },

        { id:"aravah-keeping",
          name:{ he:"כְּמוּשָׁה וִיבֵשָׁה", se:"kemushah vi-yveishah", en:"How easy: everywhere to find, hard to keep" },
          organism:"Cut Salix twigs: transpiration, leaf abscission, tip necrosis",
          layer:"market", status:"cond",
          biology:"Willow is the least scarce of the four: it is a pioneer of every wet bank and is planted for shade and erosion control. The cost is in the leaf. Willow leaves are thin, have no waxy protection to speak of, and keep their stomata open; a cut twig at room temperature loses turgor in hours, the leaf tips brown and then blacken as the cells die, and within a day or two the leaves begin to drop from their stalks. Cold and a wet wrap slow all three processes, which is why aravos are cut last, sold in damp paper, and kept in the refrigerator, and why the Hoshana Rabbah bundles are cut separately.",
          match:"The Mishnah draws the line the plant draws: wilted (kemushah) kosher, dry (yeveishah) pasul; some leaves fallen kosher; top severed pasul (unlike hadas, where the Shulchan Aruch rules a severed top kosher). A willow from a dry field is kosher.",
          question:"When wilt becomes dryness, and how many blackened tips make a leaf \"fallen\", are the daily questions of the holiday; the Mishnah's categories are the frame.",
          sources:[
            { ref:"Mishnah Sukkah 3:3", he:"עֲרָבָה גְזוּלָה וִיבֵשָׁה, פְּסוּלָה. שֶׁל אֲשֵׁרָה וְשֶׁל עִיר הַנִּדַּחַת, פְּסוּלָה. נִקְטַם רֹאשָׁהּ, נִפְרְצוּ עָלֶיהָ, וְהַצַּפְצָפָה, פְּסוּלָה. כְּמוּשָׁה, וְשֶׁנָּשְׁרוּ מִקְצָת עָלֶיהָ, וְשֶׁל בַּעַל, כְּשֵׁרָה.", se:"kemushah, ve-she-nashru miktzas aleha, ve-shel ba'al, kesheirah", en:"A willow branch that was stolen or dry is pasul ... If the top was severed, or its leaves were torn off, or if it is the tzaftzafah, it is pasul. Slightly wilted, or a minority of its leaves fell, or from a non-irrigated field, it is kosher." },
            { ref:"Shulchan Arukh OC 646:1", he:"הדס שנקטם ראשו כשר", se:"hadas she-niktam rosho kasher", en:"A myrtle whose top was severed is kosher." }
          ] }
      ] }
  ],

  /* ====================================================================
     BLEMISH GUIDE  ·  the esrog by region
     region: "chotem" (from where it narrows to the pitom), "body", "pitom", "oketz", "all"
     ==================================================================== */
  regions: {
    pitom: { he:"פִּטָּם", en:"Pitom (dad + shoshanta)" },
    chotem:{ he:"חוֹטֶם", en:"Chotem: from where it starts to narrow up to the pitom" },
    body:  { he:"גּוּף הָאֶתְרוֹג", en:"Body, below the chotem" },
    oketz: { he:"עֹקֶץ", en:"Oketz: the stem end" },
    all:   { he:"כָּל הָאֶתְרוֹג", en:"Whole fruit" }
  },
  blemishes: [
    { id:"blackdot", region:"chotem",
      see:{ he:"נְקוּדָּה שְׁחוֹרָה", en:"Black dot or speck" },
      cause:"Feeding scars of thrips or scale insects on the young rind; sooty mold growing on scale honeydew; a fungal speck. On the tree the rind seals the wound and the spot stays dark.",
      status:"cond",
      sugya:"Black or white in one place: pasul on a majority; in two or three places it is judged like chazazis, pasul even on a minority. On the chotem, any change of appearance, however small, is pasul. A dot on the body below the chotem is a minority in one place and is not a psul in the sugya; the market prices it as one.",
      sources:[
        { ref:"Shulchan Arukh OC 648:16", he:"אם הוא שחור או לבן במקום א' פוסל ברובו בשנים או בשלשה מקומות דינו כחזזית ליפסל אפי' במיעוטו", se:"im hu shachor o lavan be-makom echad posel be-rubo", en:"If it is black or white in one place, it is pasul on a majority; in two or three places its law is as chazazis, pasul even on a minority." },
        { ref:"Shulchan Arukh OC 648:12", he:"מחוטמו ואילך דהיינו ממקום שמתחיל לשפע עד הפיטמ' פוסל חזזית וכל שינוי מראה בכל שהוא", se:"me-chotmo ve-eilach ... posel chazazis ve-kol shinui mar'eh be-kol shehu", en:"From its chotem onward, that is from where it begins to slope up to the pitom, chazazis and any change of appearance whatsoever is pasul." } ] },
    { id:"scratch", region:"body",
      see:{ he:"שְׂרִיטָה חוּמָה, בְּלֶעטְלַאךְ", en:"Brown scratch, thorn scar, leaf-rub mark (\"bletlach\")" },
      cause:"The tree's own thorns and stiff leaves rubbing the soft young fruit in wind. The rind heals the scrape as a flat brown line or patch of cork, level with the surface or slightly sunken, never raised. Growers tie leaves back and clip thorns to prevent it.",
      status:"hiddur",
      sugya:"The Rema keeps thorn punctures made on the tree kosher even with slight loss, \"because that is the way it grows\", and defines chazazis as something raised that the finger feels; flat marks (\"mul\") are kosher for that reason, or, per the Terumas Hadeshen, because they are so common they are the look of an esrog. A scar is a psul only if it is raised, sits on the chotem, or has flesh missing.",
      sources:[
        { ref:"Shulchan Arukh OC 648:2 (Rema)", he:"הגה ונהגו להכשיר הנקבים שנעשו באילן ע\"י קוצים אע\"פ שיש בהם חסרון שזהו דרך גדילתו (ת\"ה סי' צ\"ט)", se:"ve-nahagu le-hachshir ha-nekavim she-na'asu ba-ilan al yedei kotzim ... she-zehu derech gedilaso", en:"Rema: It is the practice to validate punctures made on the tree by thorns, even if there is some loss, because this is the way it grows (Terumas Hadeshen 99)." },
        { ref:"Shulchan Arukh OC 648:13", he:"חזזית הוא כמו אבעבועות ויש בו ממש שמקומו ניכר במישוש שהוא גבוה מהאתרוג: הגה ולכן יש להכשיר אותן חזזית שקורין בל\"א מו\"ל לפי שאינן גבוהים משאר האתרוג (מהרי\"ל) ויש מי שכ' דיש להכשירם מטעם דנחשבים מראה אתרוג מאחר דרגילים להיות הרבה כך (ת\"ה סי' צ\"ט)", se:"chazazis hu kemo ava'bu'os ve-yesh bo mamash she-mekomo nikar be-mishush", en:"Chazazis is like boils and has substance, its place felt by touch as higher than the esrog. Rema: therefore one validates those marks called in German \"mul\", since they are not higher than the rest of the esrog (Maharil); and one writes to validate them because they count as the look of an esrog, since it is usual for there to be many of them (Terumas Hadeshen 99)." } ] },
    { id:"chazazis", region:"all",
      see:{ he:"חֲזָזִית", en:"Chazazis: raised, warty or scabby eruption" },
      cause:"Corky outgrowth of the rind: wind-rub callus that keeps growing, citrus scab, or a healed insect gall. The defining feature is relief: it stands above the surrounding rind.",
      status:"pasul",
      sugya:"Mishnah: on a majority pasul, on a minority kosher. Rav (via Rav Chisda), as the Gemara finally reads him: even a minority, if it is in two or three places, is speckled (menumar) and pasul; Rava: on the chotem even the smallest amount is pasul. The Shulchan Aruch codifies all three, and the machlokes on what \"two or three places\" measures (spread over a majority of the surface, or any two spots on one side).",
      sources:[
        { ref:"Sukkah 35b", he:"עַל מִיעוּטוֹ — כָּשֵׁר. אָמַר רַב חִסְדָּא: דָּבָר זֶה רַבֵּינוּ הַגָּדוֹל אֲמָרוֹ, וְהַמָּקוֹם יִהְיֶה בְּעֶזְרוֹ: לֹא שָׁנוּ אֶלָּא בְּמָקוֹם אֶחָד, אֲבָל בִּשְׁנַיִם וּשְׁלֹשָׁה מְקוֹמוֹת — הָוֵה לֵיהּ כִּמְנוּמָּר, וּפָסוּל. אָמַר רָבָא: וְעַל חוֹטְמוֹ — וַאֲפִילּוּ בְּמַשֶּׁהוּ נָמֵי פָּסוּל.", se:"be-shnayim u-sheloshah mekomos, haveh leh ki-menumar u-fasul; ve-al chotmo, va-afilu be-mashehu nami pasul", en:"On its minority, kosher. Rav Chisda said: our great rabbi said this: they taught it only in one place, but in two or three places it is as if speckled and pasul. Rava said: and on its chotem, even the smallest amount is pasul." },
        { ref:"Shulchan Arukh OC 648:9-10", he:"עלתה חזזית עליו אם בשנים או בשלשה מקומות פסול ואם במקום אחד אם עלה על רובו פסול ואם על חוטמו אפי' כל שהוא פסול וחוטמו היינו ממקום שמתחיל להתקצר ולהתחדד כלפי ראשו: י\"א דהא דבב' וג' מקומות פסול היינו דוקא כשנתפשט הנימור ברובו ... ויש פוסלים אפי' במיעוטו של צד א'", se:"ve-chotmo haynu mi-makom she-maschil le-hiskatzer u-le-hischaded klapei rosho", en:"If chazazis arose in two or three places, pasul; in one place, pasul if on a majority; on the chotem, any amount is pasul, and the chotem is from where it begins to narrow and sharpen toward its head. Some say two or three places is pasul only when the speckling spreads over a majority ... and some invalidate even a minority of one side." } ] },
    { id:"menumar", region:"all",
      see:{ he:"מְנוּמָּר", en:"Speckled, patched in two or more colors" },
      cause:"Uneven ripening, sunscald on one face, mixed insect and fungal marking; the fruit reads as leopard-spotted rather than one color.",
      status:"pasul",
      sugya:"The baraisa lists menumar with tafuach, saruach, pickled, boiled, kushi and white as pasul; the Shulchan Aruch repeats it.",
      sources:[
        { ref:"Sukkah 36a", he:"תָּא שְׁמַע: אֶתְרוֹג תָּפוּחַ סָרוּחַ, כָּבוּשׁ, שָׁלוּק, כּוּשִׁי, לָבָן, וּמְנוּמָּר — פָּסוּל. אֶתְרוֹג כְּכַדּוּר — פָּסוּל, וְיֵשׁ אוֹמְרִים: אַף הַתְּיוֹם.", se:"esrog tafuach, saruach, kavush, shaluk, kushi, lavan u-menumar, pasul", en:"An esrog that is swollen, decayed, pickled, boiled, Cushite-black, white, or speckled is pasul. An esrog like a ball is pasul, and some say even a twin." } ] },
    { id:"sunburn", region:"body",
      see:{ he:"כְּתָם צָהֹב אוֹ חוּם רָחָב", en:"Broad yellow-brown or bleached patch on one face" },
      cause:"Sunscald: the side of the fruit that faced the afternoon sun after a leaf moved or was tied back. The rind cells bleach, then brown; the patch is flat and follows the fruit's curve.",
      status:"open",
      sugya:"Not named in the sugya. The nearest categories are \"white\" (Sukkah 36a; SA 648:16, a majority in one place) and \"any change of appearance\" on the chotem (648:12). Where a given patch falls is a posek's reading of shinui mar'eh; the map places the question, not the answer.",
      sources:[
        { ref:"Shulchan Arukh OC 648:12", he:"מחוטמו ואילך ... פוסל חזזית וכל שינוי מראה בכל שהוא ויש מי שאומר דה\"ה דיבש פוסל שם בכל שהוא", se:"ve-kol shinui mar'eh be-kol shehu; ve-yesh mi she-omer de-hu ha-din de-yavesh posel sham be-kol shehu", en:"From its chotem onward, chazazis and any change of appearance whatsoever is pasul; and one says the same of dryness there, any amount." } ] },
    { id:"peel", region:"all",
      see:{ he:"נִקְלַף", en:"Peeled patch: outer skin gone, green layer showing" },
      cause:"Abrasion of the thin oily outer skin (flavedo) against a branch, a crate or a hand, exposing the layer beneath without removing flesh.",
      status:"cond",
      sugya:"Mishnah: peeled is pasul. Rava: peeled like a red date (only the outer skin) is kosher; the Gemara: the Mishnah is all of it, Rava is part of it. Shulchan Aruch: outer peel removed with nothing missing: all of it, pasul; any remains, kosher; some require a sela's worth to remain.",
      sources:[
        { ref:"Sukkah 35b-36a", he:"נִקְלַף. אָמַר רָבָא: הַאי אֶתְרוֹגָא דְּאַגְלֵיד כַּאֲהִינָא סוּמָּקָא — כְּשֵׁרָה. וְהָא אֲנַן תְּנַן: נִקְלַף — פָּסוּל! לָא קַשְׁיָא, הָא בְּכוּלַּהּ, הָא בְּמִקְצָתַהּ.", se:"ha be-chulah, ha be-miktzasah", en:"Peeled. Rava said: an esrog peeled like a red date is kosher. But we learned: peeled is pasul! Not difficult: this, all of it; that, part of it." },
        { ref:"Shulchan Arukh OC 648:6", he:"נקלף הקליפה החיצונה שלו שאינו מחסרו אלא נשאר ירוק כמות שהוא ברייתו אם נקלף כולו פסול אם נשאר ממנו כל שהוא כשר וי\"א שצריך שישתייר כסלע", se:"im niklaf kulo pasul, im nishar mimenu kol shehu kasher", en:"If its outer peel was removed without loss, so it remains green as it grows: all of it removed, pasul; any remains, kosher; some say a sela's worth must remain." } ] },
    { id:"hole", region:"all",
      see:{ he:"נִקַּב, חָסֵר", en:"Puncture, hole, missing flesh" },
      cause:"Thorn puncture on the tree (heals over), insect boring, bird peck, or post-harvest damage. Depth is what matters: through the rind into the seed chambers, or through the whole fruit.",
      status:"cond",
      sugya:"Mishnah: pierced and missing any amount, pasul; pierced with nothing missing, kosher. Ulla bar Chanina: a through-hole, any size; not through, an issar. Shulchan Aruch records both readings of \"through\" (side to side, or into the seed chambers) and the Rema's leniency for thorn holes made on the tree.",
      sources:[
        { ref:"Sukkah 36a", he:"תָּנֵי עוּלָּא בַּר חֲנִינָא: נִיקַּב נֶקֶב מְפוּלָּשׁ — בְּמַשֶּׁהוּ, וְשֶׁאֵינוֹ מְפוּלָּשׁ — בִּכְאִיסָּר.", se:"nikav nekev mefulash be-mashehu, ve-she-eino mefulash bi-ke-isar", en:"Ulla bar Chanina taught: pierced with a hole that goes through, any size; that does not go through, the size of an issar." },
        { ref:"Shulchan Arukh OC 648:2-3", he:"אתרוג שניקב נקב מפולש כל שהוא פסול ושאינו מפולש אם היה כאיסר פסול ואם חסר כל שהוא פסול ... מפולש יש מפרשים כפשוטו דהיינו שניקב מצד זה לצד זה ויש מפרשים שכיון שניקב עד חדרי הזרע שהגרעינים בתוכו מקרי מפולש", se:"ve-yesh mefarshim she-keivan she-nikav ad chadrei ha-zera ... mikrei mefulash", en:"An esrog pierced through, any size, is pasul; not through, an issar is pasul; missing any amount, pasul ... \"Through\": some explain simply, side to side; some, once it reaches the seed chambers it is called through." } ] },
    { id:"crack", region:"all",
      see:{ he:"נִסְדַּק", en:"Crack, split in the rind" },
      cause:"Rind splitting after sudden water uptake (rain or irrigation after drought) when the pulp swells faster than the rind can stretch; also frost cracking.",
      status:"cond",
      sugya:"Split the whole length top to bottom, even with nothing missing, pasul; a remnant unsplit above and below, kosher; one view: at the chotem any split is pasul; Rema: some invalidate a majority split, and a split that does not go through most of the thick rind is not a split.",
      sources:[
        { ref:"Shulchan Arukh OC 648:5", he:"נסדק כולו מראשו לסופו אפילו אינו חסר כלום פסול אבל נשאר בו שיור למעלה ולמטה אפי' כל שהוא כשר ויש מי שאומר דדוקא מלמטה אבל בחוטמו אפי' כל שהוא פסול: הגה ויש מחמירים לפסול בנסדק רובו וכל שלא נסדק רוב קליפתו העבה לא מקרי נסדק", se:"nisdak kulo me-rosho le-sofo ... pasul; aval nishar bo shiyur le-ma'alah u-le-matah ... kasher", en:"Split entirely from top to bottom, even missing nothing, pasul; but a remnant above and below, any amount, kosher; one says only at the bottom, but at the chotem any split is pasul. Rema: some invalidate a majority split, and whatever has not split most of the thick rind is not called split." } ] },
    { id:"pitomoff", region:"pitom",
      see:{ he:"נִטְּלָה פִּטְמָתוֹ", en:"Pitom missing: fell, or never grew" },
      cause:"The style abscised. Early on the tree: a smooth, sunken, brown-healed scar. After harvest: a fresh break, pale then darkening. Hormone level at the abscission zone decides; growers can hold it with an auxin spray.",
      status:"cond",
      sugya:"Removed: pasul (Mishnah). Never had one: kosher (Rema, quoting the Rosh: \"and such are most of the esrogim brought to these countries\"). Shoshanta alone removed: some are strict, and it is good to be strict where possible, but by din the psul is the dad.",
      sources:[
        { ref:"Shulchan Arukh OC 648:7", he:"וכל זה דוקא בניטלה אבל אם לא היה לו דד מעולם כשר וכן הם רוב האתרוגים שמביאים במדינות אלו (הרא\"ש)", se:"ve-chol zeh davka be-nitlah, aval im lo hayah lo dad me-olam kasher", en:"All this is when it was removed; but if it never had a dad it is kosher, and such are most of the esrogim brought to these countries (Rosh)." } ] },
    { id:"oketzhole", region:"oketz",
      see:{ he:"נִטַּל עֻקְצוֹ, גּוּמָא", en:"Stem torn out leaving a pit" },
      cause:"Pedicel ripped instead of clipped; the plug of rind comes away with it.",
      status:"cond",
      sugya:"Stem removed: kosher (Mishnah). The wood pulled from the body leaving a hollow: pasul; a covering thickness remaining: kosher (SA 648:8 and Rema).",
      sources:[
        { ref:"Mishnah Sukkah 3:6", he:"נִטַּל עֻקְצוֹ ... כָּשֵׁר", se:"nital uktzo, kasher", en:"If its stem was removed ... kosher." },
        { ref:"Shulchan Arukh OC 648:8", he:"ניטל העץ שהוא תלוי בו באילן מעיקר האתרוג ונשאר מקומו גומא פסול", se:"ve-nishar mekomo guma pasul", en:"If the wood by which it hung was removed from the root of the esrog and a hollow remains in its place, pasul." } ] },
    { id:"green", region:"all",
      see:{ he:"יָרוֹק כְּכַרְתִי", en:"Deep green like grass" },
      cause:"Chlorophyll not yet broken down: picked early, or a strain that yellows late. A fruit that will degreen in a warm room is physiologically mature; one that stays grass-green is not.",
      status:"cond",
      sugya:"Mishnah: leek-green, Rabbi Meir kosher, Rabbi Yehuda pasul. Shulchan Aruch: green like field grass is pasul unless it returns to esrog color when left.",
      sources:[
        { ref:"Mishnah Sukkah 3:6", he:"וְהַיָרוֹק כְּכַרְתִי, רַבִּי מֵאִיר מַכְשִׁיר, וְרַבִּי יְהוּדָה פּוֹסֵל", se:"ve-ha-yarok ke-charti, Rabbi Meir machshir, ve-Rabbi Yehudah posel", en:"Leek green: Rabbi Meir deems it kosher and Rabbi Yehuda deems it pasul." },
        { ref:"Shulchan Arukh OC 648:21", he:"הירוק שדומה לעשבי השדה פסול אלא אם כן חוזר למראה אתרוג כשר כשמשהין אותו", se:"ela im ken chozer le-mar'eh esrog, kasher ke-she-mashhin oso", en:"Green like the grass of the fields is pasul, unless it returns to the look of an esrog, in which case it is kosher after leaving it." } ] },
    { id:"shape", region:"all",
      see:{ he:"כַּדּוּר, תְּיוֹם, קָטָן", en:"Round as a ball; twin fruit; undersized" },
      cause:"Ball shape: a strain or growth pattern without the taper. Twin: two ovaries fused in the flower. Small: picked before an egg's volume.",
      status:"cond",
      sugya:"Ball: pasul. Twin: the baraisa's \"some say\" pasul; Shulchan Aruch rules kosher. Smaller than an egg: pasul; an egg's size even unripe: kosher; no upper limit.",
      sources:[
        { ref:"Shulchan Arukh OC 648:18-20", he:"העגול ככדור פסול: ... התיום דהיינו שגדל שנים דבוקים זה בזה כשר", se:"ha-agol ke-kadur pasul ... ha-tiyom ... kasher", en:"Round as a ball, pasul ... A twin, two grown attached to each other, kosher." },
        { ref:"Shulchan Arukh OC 648:22", he:"שיעור אתרוג קטן פחות מכביצה פסול", se:"shiur esrog katan pachos mi-ke-beitzah pasul", en:"A small esrog less than an egg is pasul." } ] },
    { id:"dry", region:"all",
      see:{ he:"יָבֵשׁ", en:"Dry: no moisture in the rind" },
      cause:"Water lost from the albedo over months; last year's fruit. Test in the Shulchan Aruch: pass a threaded needle through and look for moisture on the thread.",
      status:"pasul",
      sugya:"Dry is pasul (Mishnah); the measure is no moisture at all; last year's esrog is certainly dry (Maharil).",
      sources:[
        { ref:"Shulchan Arukh OC 648:1", he:"אתרוג היבש פסול ושיעור היבשות כשאינו מוציא שום ליחה ויבדוק על ידי שיעביר בו מחט ובו חוט ואם יש בו ליחה יראה בחוט", se:"ve-yivdok al yedei she-ya'avir bo machat u-vo chut", en:"A dry esrog is pasul; the measure of dryness is when it gives no moisture; test by passing a needle with thread through it, and if there is moisture it will show on the thread." } ] }
  ]
};
