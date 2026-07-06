/* ============================================================================
   TOLAEI HA-MAZON  ·  Parasites of Food & the Sugya of Tola'im
   Chullin 66b–67b  ·  Shulchan Arukh YD 84  ·  contemporary teshuvot
   This map does NOT pasken. It places each organism into the category the
   Talmud / SA discuss, and states the she'eilah on which poskim are
   stringent or lenient. Primary sources (Talmud, SA) first; teshuvot follow.
   ========================================================================== */
window.TOLAIM_DATA = {

  axis: {
    bornIn:    { he: "נוֹצַר בִּמְקוֹמוֹ",     se: "notzar bi-mkomo",     en: "Born in place" },
    crawledIn: { he: "בָּא מִבַּחוּץ / פֵּירֵשׁ", se: "ba mi-bachutz / peirash", en: "Came from outside / separated" },
    contested: { he: "מַחְלֹקֶת בַּמְּצִיאוּת",  se: "machloket ba-metziut",  en: "Contested — where was it born?" }
  },

  principle: {
    en: "The Torah engages only הַשֶּׁרֶץ הַשֹּׁרֵץ עַל הָאָרֶץ — a creature that crawls upon the earth. So two facts about any real organism drive the whole sugya: where it was generated (inside a food/host, or outside), and whether it ever פֵּירֵשׁ — separated onto a surface, the ground, or the open air. Modern parasitology answers those two questions for each creature. What the halacha then IS — where to be machmir or meikil — whether the she'eilah is one of מְצִיאוּת or of din — is the work of the poskim, not of this map.",
    sources: [
      { ref: "Chullin 67b", he: "שֶׁלֹּא אָסְרָה תּוֹרָה אֶלָּא שֶׁרֶץ הַשּׁוֹרֵץ עַל הָאָרֶץ", se: "she-lo asra Torah ela sheretz ha-shoretz al ha-aretz", en: "The Torah engaged only a swarming thing that swarms upon the earth." },
      { ref: "Chullin 67b", he: "וְהָנֵי כִּי קָא גָבְלָן — בְּהֶתֵּירָא קָא גָבְלָן", se: "ve-hanei ki ka gavlan — be-hetera ka gavlan", en: "And when these [fish worms] form, they form in a permitted domain." }
    ]
  },

  categories: [
    {
      id: "water",
      name: { he: "מַיִם", se: "Mayim", en: "Water" },
      lead: "Split by the body of water. The Talmud's own line runs between STILL/contained water and FLOWING water — and the biology of who breeds where lands almost exactly on that line. The NYC-reservoir copepod machlokes lives inside this very category.",
      nodes: [
        { id: "copepods",
          name: { he: "שַׁלְשׁוּלֵי הַמַּיִם (קוֹפֵּפּוֹדוֹת)", se: "shalshulei ha-mayim", en: "Copepods / Cyclops" },
          organism: "Cyclops spp., Daphnia (water fleas)",
          waterType: "Still / contained water",
          origin: "born-in", grade: "A",
          sugyaCase: "Still-water creatures — YD 84:1",
          biology: "Microscopic crustaceans that breed almost exclusively in STILL and slow water — ponds, cisterns, barrels, reservoirs — clinging to algae along quiet banks. Moving current washes them out, so fast streams and springs are largely free of them. They are the intermediate host of the guinea worm and the fish tapeworm, and are precisely the organism found in NYC's unfiltered reservoir tap water.",
          match: "The Talmud and SA treat fin-less creatures found in בּוֹרוֹת שִׁיחִין וּמְעָרוֹת and in כֵּלִים as a category apart from flowing water, because that water is 'עֲצוּרִין כְּכֵלִים' — contained and still. That is exactly where copepods genuinely breed: the halachic category and the real breeding domain coincide.",
          exclusivity: "Near-exclusive to still water. Current physically removes them, so their presence is a strong signal of standing water — the same distinction the sugya draws between still and flowing.",
          question: "Whether reservoir copepods engage the din at all is the classic modern machlokes. R' Belsky was lenient — the reservoirs have the status of מֵי בּוֹרוֹת (SA 84:1), and after a century of unnoticed drinking they are arguably not נִרְאֶה לָעֵינַיִם nor a מִיעוּט הַמָּצוּי in a given cup. The OU followed R' Schachter to require filtering — a she'eilah resting partly on מְצִיאוּת (are they נִרְאֶה לָעֵינַיִם, how common) and partly on din (the status of reservoir water), left to the poskim.",
          sources: [
            { ref: "Chullin 67a", he: "מַאי מַיעֵט? בּוֹרוֹת שִׁיחִין וּמְעָרוֹת", se: "mai me'et? borot shichin u-me'arot", en: "What does it exclude [from the flowing-water category]? Pits, ditches and caves." },
            { ref: "Chullin 67a", he: "מְרַבֶּה אֲנִי בּוֹרוֹת שִׁיחִין וּמְעָרוֹת שֶׁהֵן עֲצוּרִים כְּכֵלִים", se: "merabeh ani borot shichin u-me'arot she-hen atzurin ke-kelim", en: "I include pits, ditches and caves, which are contained like vessels [still water]." },
            { ref: "Shulchan Arukh YD 84:1", he: "שְׁרָצִים הַגְּדֵלִים בְּמַיִם שֶׁבַּכֵּלִים וְשֶׁבְּבוֹרוֹת שִׁיחִין וּמְעָרוֹת שֶׁאֵינָם נוֹבְעִים ... שׁוֹחֶה וְשׁוֹתֶה מֵהֶם", se: "sheratzim ha-gedelim be-mayim she-ba-kelim ... shocheh ve-shoteh me-hem", en: "Creatures that grow in water in vessels, pits, ditches and caves that do not flow — one may bend and drink from them." }
          ],
          teshuvot: [
            { t: "R' J.D. Bleich, Contemporary Halakhic Problems VI ch. 7 — NYC Water", u: "https://www.sefaria.org/Contemporary_Halakhic_Problems,_Vol_VI,_Chapter_7_New_York_City_Water" },
            { t: "OU Kosher — NYC Tap Water statement", u: "https://oukosher.org/blog/consumer-news/nyc-water/" },
            { t: "OU Halacha Yomis — copepods in NYC water", u: "https://oukosher.org/halacha-yomis/new-york-city-water-is-unfiltered-and-can-contain-copepods-small-crustaceans-some-poskim-allow-drinking-new-york-city-water-as-is-for-reasons-beyond-the-scope-of-this-halacha-yomis-while-others/" }
          ] },
        { id: "mosquito",
          name: { he: "יַתּוּשִׁים (זַחֲלֵי מַיִם)", se: "yatushim", en: "Mosquito & midge larvae" },
          organism: "Culex / Chironomus larvae ('wrigglers', 'bloodworms')",
          waterType: "Still / stagnant water (obligate)",
          origin: "born-in", grade: "A",
          sugyaCase: "Still-water creatures — YD 84:1",
          biology: "Obligate still-water breeders. Females lay on the surface of standing water; larvae hang from the surface film to breathe and cannot develop in current. Mosquito control is fundamentally about draining or moving standing water.",
          match: "Same still-water category as copepods — the organism that most rigidly requires standing water sits squarely in the sugya's contained-water bucket ('עֲצוּרִין כְּכֵלִים').",
          exclusivity: "Strongly exclusive to standing water; obligate dependence makes water-body type an almost deterministic predictor of their presence.",
          question: "Practical points the poskim weigh here are the same family: visibility, and whether the water was drawn into a vessel — SA 84:1 notes 'אֲבָל אָסוּר לִשְׁאוֹב בִּכְלִי וְלִשְׁתּוֹת מֵהֶם'.",
          sources: [
            { ref: "Chullin 67a", he: "שֶׁשּׁוֹחֶה וְשׁוֹתֶה מֵהֶן וְאֵינוֹ נִמְנָע — תַּלְמוּד לוֹמַר תֹּאכְלוּ מִכֹּל אֲשֶׁר בַּמָּיִם", se: "she-shocheh ve-shoteh me-hen ve-eino nimna", en: "One may bend and drink from them and need not refrain — 'these you may eat of all that are in the water.'" },
            { ref: "Shulchan Arukh YD 84:1", he: "(אֲבָל אָסוּר לִשְׁאוֹב בִּכְלִי וְלִשְׁתּוֹת מֵהֶם)", se: "(aval asur lish'ov bi-chli ve-lishtot me-hem)", en: "(But it is forbidden to draw them in a vessel and drink from them.)" }
          ] },
        { id: "blackfly",
          name: { he: "זַחֲלֵי זְבוּב שָׁחֹר", se: "zachalei zevuv shachor", en: "Blackfly larvae" },
          organism: "Simulium spp.",
          waterType: "Flowing / running water (obligate)",
          origin: "born-in", grade: "A",
          sugyaCase: "Flowing-water creatures — YD 84:2",
          biology: "The mirror image of the mosquito: blackfly larvae live ONLY in flowing water. They anchor to rocks with silk threads and filter the current for food; they suffocate in still water. They are the one aquatic 'worm' that genuinely breeds in rivers and channels.",
          match: "The Talmud places fin-less creatures of flowing water — יַמִּים, נְחָלִים, and by inclusion חֲרִיצִין וּנְעִיצִין ('שֶׁהֵם מוֹשְׁכִים') — opposite the still-water category. Blackfly larvae are the real organism populating exactly that zone, so the biological still-vs-flowing split maps onto the sugya's split with genuine exclusivity on both poles.",
          exclusivity: "Near-exclusive to running water. Between copepods/mosquitoes (still) and blackflies (flowing), water-body type sorts the fauna almost completely — along the sugya's dividing line.",
          question: "On the flowing-but-not-spring cases (חֲרִיצִין וּנְעִיצִין) the SA itself records a straight machlokes — יֵשׁ אוֹסְרִים וְיֵשׁ מַתִּירִים — so this is a dispute already inside the classical literature.",
          sources: [
            { ref: "Chullin 67a", he: "חֲרִיצִין וּנְעִיצִין לְאִיסּוּרָא", se: "charitzin u-ne'itzin le-issura", en: "Trenches and channels [flowing] — the stringent side." },
            { ref: "Shulchan Arukh YD 84:2", he: "הַגְּדֵלִים בְּמַיִם שֶׁבַּחֲרִיצִין וּנְעִיצִין ... שֶׁהֵם מוֹשְׁכִים וְאֵינָם נוֹבְעִים — יֵשׁ אוֹסְרִים וְיֵשׁ מַתִּירִים", se: "ha-gedelim ... she-hem moshchim ve-einam nov'im — yesh osrim ve-yesh matirim", en: "Those growing in trench/channel water that flows but is not spring-fed — some are stringent and some lenient." }
          ] }
      ] },
    {
      id: "fish",
      name: { he: "דָּגִים", se: "Dagim", en: "Fish" },
      lead: "Fish need no shechita, so the sugya treats a worm born in a fish differently from one in an animal. But YD 84:16 draws a sharp inner line: a fish's INNARDS versus its FLESH. Every real fish parasite tests where it truly originated relative to that line — the heart of the Anisakis machlokes.",
      nodes: [
        { id: "anisakis",
          name: { he: "תּוֹלַעַת הָאָנִיסָאקִיס", se: "tola'at ha-anisakis", en: "Anisakis (herring worm)" },
          organism: "Anisakis simplex / A. pegreffii",
          waterType: "Marine (saltwater) fish",
          origin: "contested", grade: "A",
          sugyaCase: "Fish innards vs. flesh — YD 84:16 · דרני דכוורי",
          biology: "Eggs hatch in seawater; larvae are eaten by copepods; fish eat the copepods. The larvae burrow through the fish's GUT WALL and encyst on the viscera — then migrate into the edible FLESH, especially post-mortem during cold storage (documented at 0–4°C over 1–3 days). Its origin is unquestionably OUTSIDE the fish, entering through the food chain and lodging first in the gut.",
          match: "The sharpest match in the whole sugya. YD 84:16 distinguishes worms in a fish's מֵעַיִם from those in its flesh, and the Gemara's own objection to the origin question — 'if they came from outside they would be found by way of the digestive tract' — is literally true of Anisakis, which IS found in the gut.",
          exclusivity: null,
          question: "The live machlokes turns on which fact the din follows. R' Belsky and R' Vaye (and, it is reported, earlier poskim) were lenient — the worm completes its growth in the flesh, and at its ingested microscopic stage it was below the threshold of a sheretz; many Eretz-Yisrael poskim signed a kol koreh to be stringent — it demonstrably came from outside/the water. This is now less a machlokes in the מְצִיאוּת — the pathway itself is not really in doubt — than a question of din: whether the heter follows where the worm is found, in the flesh, or where it originated, outside.",
          sources: [
            { ref: "Chullin 67b", he: "דַּרְנֵי דְּבִשְׂרָא — אֲסִירִי, דְּכַוְּורֵי — שַׁרְיָין", se: "darnei d-visra asiri, d-kavarei sharyan", en: "The Gemara: worms of [animal] flesh are engaged; those of fish are treated as formed-in-place." },
            { ref: "Chullin 67b", he: "אִי מֵעָלְמָא אָתוּ — לִישְׁתַּכְּחוּ דֶּרֶךְ בֵּית הָרֶעִי", se: "i me-alma atu — lishtakchu derech beit ha-re'i", en: "If they came from outside, they should be found by way of the digestive tract." },
            { ref: "Shulchan Arukh YD 84:16", he: "וְהַנִּמְצָאִים בְּדָגִים בִּמְעֵיהֶם ... בֵּין עוֹר לַבָּשָׂר אוֹ בְּתוֹךְ הַבָּשָׂר", se: "ve-ha-nimtza'im be-dagim bi-m'eihem ... be-toch ha-basar", en: "Those found in fish in the innards [one way] ... between skin and flesh or within the flesh [another]." }
          ],
          teshuvot: [
            { t: "Kashrut.com — Worms in Fish: the recent tumult", u: "https://www.kashrut.com/articles/WormsInFish/" },
            { t: "Matzav — R' Belsky on worms in the flesh of fish", u: "https://matzav.com/rav-belskys-stance-on-the-kashrus-of-worms-in-flesh-of-fish/" },
            { t: "Matzav — R' Moshe Vaye on Anisakis", u: "https://matzav.com/formost-bug-expert-rav-moshe-vaya-reiterates-that-one-need-not-be-concerned-regarding-anisakis-work-in-fish/" },
            { t: "VIN — Leading rabbis: Anisakis stringency (kol koreh)", u: "https://www.vosizneias.com/84809/2011/06/01/new-york-leading-rabbis-reiterate-anisakis-worm-in-fish-forbidden/" }
          ] },
        { id: "tapeworm",
          name: { he: "תּוֹלַעַת סֶרֶט שֶׁל דָּגִים", se: "tola'at seret shel dagim", en: "Broad / fish tapeworm" },
          organism: "Diphyllobothrium latum",
          waterType: "Freshwater & anadromous fish",
          origin: "crawled-in", grade: "B",
          sugyaCase: "Fish innards vs. flesh — YD 84:16",
          biology: "Copepod → fish. The plerocercoid larva encysts in the fish's viscera and musculature. Acquired, like Anisakis, entirely from outside via the still-water copepod it starts in.",
          match: "Same YD 84:16 line and same origin picture as Anisakis: not generated in the flesh, but arriving from the water through the food chain, first to the viscera.",
          exclusivity: null,
          question: "The 84:16 distinction between the מעיים and the flesh, and the same 'did it originate outside' question, apply directly; poskim treat it within the broader worms-in-fish discussion.",
          sources: [
            { ref: "Chullin 67b", he: "אֲבָל דָּגִים בַּאֲסִיפָה בְּעָלְמָא מִישְׁתְּרוּ", se: "aval dagim ba-asifa be-alma mishtaru", en: "But fish are rendered fit by mere gathering [no shechita]." },
            { ref: "Shulchan Arukh YD 84:16", he: "וְהָא דַּאֲסָרִינַן דַּוְקָא דְּמֵחַיִּים", se: "ve-ha da-asarinan davka de-mechayim", en: "And that which is engaged is specifically what formed while alive." }
          ] },
        { id: "myxo",
          name: { he: "נַבְגָּנִים שֶׁבַּבָּשָׂר", se: "navganim she-ba-basar", en: "Muscle-dwelling microsporidia" },
          organism: "Kudoa / Myxobolus spp.",
          waterType: "Marine & freshwater fish flesh",
          origin: "contested", grade: "C",
          sugyaCase: "Below visibility · נראה לעינים",
          biology: "Microscopic spore-forming parasites that develop cysts within fish MUSCLE (Kudoa causes post-mortem 'soft flesh'). They complete a tissue stage inside the flesh, but the full cycle still passes through waterborne spores and aquatic worms.",
          match: "These come closest to the sugya's assumed picture of a worm formed in the flesh — and they foreground the נִרְאֶה לָעֵינַיִם threshold that also drives the Anisakis and NYC-water discussions: a parasite below the eye's resolution is not engaged by the din of sheretz at all.",
          exclusivity: null,
          question: "The operative question is the visibility threshold itself — at what point a developing organism becomes a בְּרִיָּה נִרְאֵית — a general principle the poskim apply well beyond fish.",
          sources: [
            { ref: "Chullin 67b", he: "וְהָנֵי כִּי קָא גָבְלָן — בְּהֶתֵּירָא קָא גָבְלָן", se: "ve-hanei ki ka gavlan — be-hetera ka gavlan", en: "When these form, they form in a permitted domain [the fish's flesh]." }
          ] }
      ] },
    {
      id: "vegetables",
      name: { he: "יְרָקוֹת", se: "Yerakot", en: "Vegetables" },
      lead: "Leafy produce is inspected (bedikas ha-mazon) because its infesters live on and in a plant still ATTACHED to the ground — the paradigm of שֶׁרֶץ הַשּׁוֹרֵץ עַל הָאָרֶץ. The origin here is almost always 'from outside, onto attached produce'.",
      nodes: [
        { id: "aphids",
          name: { he: "כְּנִימוֹת וּתְּרִיפְּסִים", se: "kenimot u-tripsim", en: "Aphids & thrips" },
          organism: "Aphidoidea, Thysanoptera",
          origin: "crawled-in", grade: "A",
          sugyaCase: "שורץ על הארץ on attached produce — YD 84:8",
          biology: "Settle, feed and reproduce on the exposed surface of growing leaves — lettuce, herbs, strawberries, celery. They crawl over produce that is rooted and attached, and are the single largest reason leafy vegetables are inspected.",
          match: "The literal picture of a creature crawling on the surface of produce attached to the earth — the category SA 84:8 addresses when it requires בְּדִיקָה of produce prone to infestation.",
          exclusivity: null,
          question: "How much infestation establishes a חֶזְקַת תּוֹלָעִים, what counts as a מִיעוּט הַמָּצוּי requiring checking, and which bedika method suffices — these are where contemporary vegetable-checking standards and poskim differ.",
          sources: [
            { ref: "Shulchan Arukh YD 84:8", he: "כָּל מִינֵי פֵּירוֹת שֶׁדַּרְכָּן לְהַתְלִיעַ כְּשֶׁהֵם מְחוּבָּרִים — לֹא יֹאכַל עַד שֶׁיִּבְדֹּק", se: "kol minei perot she-darkan le-hatlia ke-she-hem mechubarim — lo yochal ad she-yivdok", en: "Any produce that tends to become infested while attached — one may not eat until he inspects it." }
          ] },
        { id: "leafminer",
          name: { he: "מְנַקְּבֵי הֶעָלִים", se: "menakvei he-alim", en: "Leafminers" },
          organism: "Liriomyza spp.",
          origin: "crawled-in", grade: "A",
          sugyaCase: "Bred in attached produce (מחובר) — YD 84:6",
          biology: "The adult fly lays eggs on the leaf SURFACE; the larva then tunnels INSIDE the living leaf, leaving pale winding mines. It both enters from outside and develops within a plant attached to the ground.",
          match: "SA 84:6 treats a worm bred in attached produce as כְּשׁוֹרֵץ עַל הָאָרֶץ once it has moved (שֶׁרִיחֵשׁ). The leaf-miner, developing inside an attached leaf, is squarely in that category.",
          exclusivity: null,
          question: "Whether the larva has 'moved' (רִיחֵשׁ) within its mine, and the מְחוּבָּר status of the leaf at the moment it formed, are the operative facts the poskim weigh.",
          sources: [
            { ref: "Shulchan Arukh YD 84:6", he: "תּוֹלָעִים הַגְּדֵלִים בְּפֵירוֹת בְּעוֹדָם בְּמְחוּבָּר — חָשׁוּב כְּשׁוֹרֵץ עַל הָאָרֶץ ... וְהוּא שֶׁרִיחֵשׁ", se: "tola'im ha-gedelim be-ferot be-odam bi-mchubar — chashuv ke-shoretz al ha-aretz ... ve-hu she-richesh", en: "Worms that grow in produce while still attached are considered as swarming on the earth ... provided the worm moved." }
          ] },
        { id: "legume-weevil",
          name: { he: "תּוֹלַעַת הַקִּטְנִיּוֹת", se: "tola'at ha-kitniyot", en: "Bean / pea weevil" },
          organism: "Bruchus / Callosobruchus spp.",
          origin: "born-in", grade: "B",
          sugyaCase: "Narrow-space exception — YD 84:6",
          biology: "The larva bores into a single dried bean or pea and develops in a tight chamber inside the seed, without room to move about, until it matures.",
          match: "SA 84:6 distinguishes worms under the skin of beans and peas — 'מוּנָּחִים בְּמָקוֹם צַר', in a tight space with no room to crawl — from those in an open pod (שַׁרְבִיטִין) that have room to רְחֹשׁ. The weevil confined in the seed is the narrow-space case.",
          exclusivity: null,
          question: "Which side of the מָקוֹם צַר / room-to-crawl line a given legume pest falls on is the operative determination.",
          sources: [
            { ref: "Shulchan Arukh YD 84:6", he: "מוּנָּחִים בְּמָקוֹם צַר ... אֲבָל הַנִּמְצָאִים בַּשַּׁרְבִיטִים שֶׁיֵּשׁ לָהֶם מָקוֹם לִרְחֹשׁ", se: "munachim be-makom tzar ... aval ha-nimtza'im ba-sharvitin she-yesh la-hem makom lirchosh", en: "Lying in a tight space ... but those found in the pods, which have room to crawl [are treated otherwise]." }
          ] }
      ] },
    {
      id: "fruit",
      name: { he: "פֵּירוֹת", se: "Perot", en: "Fruit" },
      lead: "The classic laboratory of the sugya. Everything turns on מְחוּבָּר vs תָּלוּשׁ (attached vs detached) and whether the worm פֵּירֵשׁ. Two nearly identical flies — one that lays in attached fruit, one in fallen fruit — land in opposite categories.",
      nodes: [
        { id: "swd",
          name: { he: "זְבוּב הַפֵּירוֹת מְנֻקַּד־כָּנָף", se: "zevuv ha-perot menukad-kanaf", en: "Spotted-wing drosophila" },
          organism: "Drosophila suzukii",
          origin: "born-in-attached", grade: "A",
          sugyaCase: "Bred in attached fruit (מחובר) — Shmuel, Chullin 67a",
          biology: "Unlike ordinary fruit flies, the female has a serrated ovipositor that cuts into INTACT, ripening fruit still ON the plant, laying eggs just under the skin. The larva develops inside the fruit while it is attached to the tree and is present at harvest — the modern scourge of cherries, berries and grapes.",
          match: "This is Shmuel's קִישּׁוּת שֶׁהִתְלִיעָה בְּאִבֶּיהָ made literal — a worm born inside fruit while still attached. It shows that born-in-place does not by itself settle the category: the sugya treats מְחוּבָּר as its own frame.",
          exclusivity: null,
          question: "Whether the fruit counted as מְחוּבָּר when the larva actually formed, and whether the larva שֶׁרִיחֵשׁ, are live factual questions for each crop and stage — not foregone.",
          sources: [
            { ref: "Chullin 67a", he: "אָמַר שְׁמוּאֵל: קִישּׁוּת שֶׁהִתְלִיעָה בְּאִבֶּיהָ אֲסוּרָה מִשּׁוּם הַשֶּׁרֶץ הַשּׁוֹרֵץ עַל הָאָרֶץ", se: "amar Shmuel: kishut she-hitli'a be-ibeha", en: "Shmuel: a cucumber that became infested while still attached — on account of 'the swarming thing that swarms upon the earth.'" }
          ] },
        { id: "vinegarfly",
          name: { he: "זְבוּב הַחֹמֶץ הַמָּצוּי", se: "zevuv ha-chometz ha-matzui", en: "Common vinegar fly" },
          organism: "Drosophila melanogaster",
          origin: "born-in-detached", grade: "A",
          sugyaCase: "Bred in detached fruit (תלוש) — YD 84:4",
          biology: "The opposite habit: it lays only on DAMAGED, overripe, or fallen fruit — already detached. The larva develops inside that detached fruit.",
          match: "SA 84:4 speaks of a worm בְּפֵירוֹת בְּתָלוּשׁ that never פֵּירֵשׁ. The contrast with the spotted-wing fly is the entire מְחוּבָּר / תָּלוּשׁ axis captured in two closely related insects.",
          exclusivity: null,
          question: "Whether a given larva ever separated — even onto the fruit's skin, its seed, or from fruit to fruit — is the whole question, and it is a factual one the poskim assess case by case.",
          sources: [
            { ref: "Shulchan Arukh YD 84:4", he: "תּוֹלָעִים הַגְּדֵלִים בְּפֵירוֹת בְּתָלוּשׁ ... בְּמֶה דְּבָרִים אֲמוּרִים שֶׁלֹּא פֵּירְשׁוּ מִן הַפְּרִי", se: "tola'im ha-gedelim be-ferot be-talush ... she-lo peirshu min ha-peri", en: "Worms that grow in detached fruit ... this is where they never separated from the fruit." }
          ] },
        { id: "codling",
          name: { he: "עַשׁ הַתַּפּוּחַ", se: "ash ha-tapuach", en: "Codling moth / plum curculio" },
          organism: "Cydia pomonella; Conotrachelus nenuphar",
          origin: "crawled-in", grade: "A",
          sugyaCase: "Entered from outside / חורו נקוב — YD 84:4 (Rema)",
          biology: "The egg is laid on the fruit's SURFACE (or a nearby leaf); the hatchling larva then bores INTO the fruit from outside, leaving the familiar entry tunnel — the 'wormhole' to the outside.",
          match: "The Rema in 84:4 addresses a bore-hole open to the outside — 'אִם חוֹרוֹ נָקוּב לַחוּץ' — as its own case, 'וְהָכִי נָהוּג'. The codling moth's entry tunnel is precisely such a hole.",
          exclusivity: null,
          question: "Whether an entry tunnel proves the worm פֵּירֵשׁ, and how the differing customs (the Rema's stringency vs. the Mechaber) are followed, are the points the poskim weigh.",
          sources: [
            { ref: "Shulchan Arukh YD 84:4", he: "אֲבָל פֵּירְשׁוּ מִן הַפְּרִי ... אוֹ שֶׁלֹּא פֵּירֵשׁ אֶלָּא עַל גַּבֵּי הַפְּרִי אוֹ עַל הַגַּרְעִין שֶׁבְּתוֹכוֹ", se: "aval peirshu min ha-peri ... o al gabei ha-peri o al ha-gar'in", en: "But if they separated from the fruit ... or even only onto the surface of the fruit or onto the pit within it." },
            { ref: "Shulchan Arukh YD 84:4 (Rema)", he: "(וְיֵשׁ אוֹסְרִים אִם חוֹרוֹ נָקוּב לַחוּץ) ... וְהָכִי נָהוּג", se: "(ve-yesh osrim im choro nakuv la-chutz) ... ve-hachi nahug", en: "(And some are stringent if its hole is bored through to the outside) ... and so is the custom." }
          ] },
        { id: "driedfig",
          name: { he: "תּוֹלַעַת הַתְּמָרִים וְהַגְּרוֹגְרוֹת", se: "tola'at ha-temarim ve-ha-grogarot", en: "Date & dried-fig worm" },
          organism: "Carpophilus, Ephestia (stored-fruit moths & beetles)",
          origin: "born-in-detached", grade: "B",
          sugyaCase: "Detached fruit vs. the tree itself — Chullin 67b",
          biology: "Larvae found inside stored, detached dates and dried figs, versus larvae in the tree's own wood and roots.",
          match: "The baraita's paired list sorts the same guild by attachment: worms 'שֶׁבַּתְּמָרִים וְשֶׁבַּגְּרוֹגְרוֹת' (detached dried fruit) on one side, worms 'שֶׁבְּעִיקָּרֵי זֵיתִים וְשֶׁבְּעִיקָּרֵי גְפָנִים' — in the very trunk and roots — on the other, as the attached tree itself.",
          exclusivity: null,
          question: "Identifying which structure a given larva actually bred in — the detached fruit or the attached tree — is the practical determination.",
          sources: [
            { ref: "Chullin 67b", he: "לְהוֹצִיא ... וְתוֹלַעַת שֶׁבַּתְּמָרִים וְשֶׁבַּגְּרוֹגְרוֹת ... לְרַבּוֹת תּוֹלַעַת שֶׁבְּעִיקָּרֵי זֵיתִים וְשֶׁבְּעִיקָּרֵי גְפָנִים", se: "... tola'at she-ba-temarim ve-she-ba-grogarot ... tola'at she-be-ikarei zeitim ve-she-be-ikarei gefanim", en: "To exclude ... the worm in dates and dried figs ... to include the worm in the roots of olives and vines." }
          ] }
      ] },
    {
      id: "meat",
      name: { he: "בָּשָׂר", se: "Basar", en: "Meat" },
      lead: "An animal is rendered fit only through shechita, so the sugya treats a worm that formed in it while alive differently from one in a fish. Strikingly, the Gemara's own mechanism — the animal sleeps and worms enter it — is, in modern terms, exactly how these parasites arrive.",
      nodes: [
        { id: "warble",
          name: { he: "זַחַל זְבוּב הַבָּקָר (דַּרְנָא)", se: "zachal zevuv ha-bakar", en: "Cattle grub / warble fly" },
          organism: "Hypoderma bovis / H. lineatum",
          origin: "crawled-in", grade: "A",
          sugyaCase: "בין עור לבשר / kukyanei — YD 84:16, Chullin 67b",
          biology: "The fly glues eggs to the leg HAIRS of a live cow. Larvae hatch, burrow through the skin, migrate through the body for months (to the gullet or spinal canal), and finally reach the animal's BACK, forming cysts (warbles) BETWEEN SKIN AND FLESH before exiting to pupate.",
          match: "YD 84:16 speaks of worms in an animal 'בֵּין עוֹר לַבָּשָׂר' — where the mature grub sits — and the Gemara's mechanism for kukyanei, 'מֵינָם נָיֵים וְעָיְילִי לֵיהּ ... תּוֹלָעִים' (the animal sleeps and worms enter it), is a near-verbatim description of larvae penetrating the living animal from outside.",
          exclusivity: null,
          question: "Whether a given grub formed מֵחַיִּים (while the animal lived) and precisely where it lodged are the operative facts within the 84:16 framework.",
          sources: [
            { ref: "Chullin 67b", he: "וְהִלְכְתָא: קוּקְיָאנֵי אֲסִירִי, מַאי טַעְמָא? מֵינָם נָיֵים וְעָיְילִי לֵיהּ בְּאוּסְיֵיהּ תּוֹלָעִים", se: "ve-hilcheta: kukyanei asiri ... meinam nayim ve-ayili leih be-usyeih tola'im", en: "The Gemara concludes on kukyanei: the animal sleeps and worms enter it through its nostril." },
            { ref: "Shulchan Arukh YD 84:16", he: "כָּל תּוֹלָעִים הַנִּמְצָאִים בַּבְּהֵמָה, בֵּין שֶׁהֵם בֵּין עוֹר לַבָּשָׂר בֵּין שֶׁהֵם בְּמֵעֶיהָ", se: "kol tola'im ha-nimtza'im ba-behema, bein she-hem bein or la-basar bein she-hem be-me'eha", en: "All worms found in an animal — whether between skin and flesh or in its innards." }
          ] },
        { id: "fasciola",
          name: { he: "תּוֹלַעַת הַכָּבֵד (קוּקְיָאנֵי)", se: "tola'at ha-kaved", en: "Liver fluke — kukyanei" },
          organism: "Fasciola hepatica",
          origin: "crawled-in", grade: "A",
          sugyaCase: "Kukyanei (lung & liver) — Chullin 67b",
          biology: "Encysted metacercariae sit on low, marshy PASTURE VEGETATION. A grazing cow or sheep SWALLOWS them; the young flukes penetrate the gut wall, cross the body cavity, and burrow into the LIVER — an internal-organ parasite acquired by eating vegetation.",
          match: "This is the Gemara's kukyanei almost word for word. R' Sheshes frames worms in the lung and liver as 'מֵעָלְמָא אָתוּ' — from outside, the animal having swallowed them with vegetation. Fasciola is exactly a liver parasite swallowed on vegetation, and Rav Ashi's objection (they'd then be in the gut) is answered by the real route: they transit the gut wall and migrate onward.",
          exclusivity: null,
          question: "The sugya's own back-and-forth (R' Sheshes vs. Rav Ashi, and the two versions of the exchange) shows the origin determination was non-obvious even in the Gemara — precisely the factual question modern biology now clarifies.",
          sources: [
            { ref: "Chullin 67b", he: "אָמַר רַב שֵׁשֶׁת בְּרֵיהּ דְּרַב אִידִי: קוּקְיָאנֵי אֲסִירִי, מַאי טַעְמָא? מֵעָלְמָא אָתוּ", se: "kukyanei asiri, mai taama? me-alma atu", en: "R' Sheshes: kukyanei [worms in lung and liver] — because they came from the outside world." }
          ] },
        { id: "cysticercus",
          name: { he: "דַּרְנֵי דְּבִשְׂרָא", se: "darnei d-visra", en: "Muscle cysticercus" },
          organism: "Taenia saginata (beef); Sarcocystis",
          origin: "crawled-in", grade: "A",
          sugyaCase: "דרני דבשרא (formed while alive) — Chullin 67b",
          biology: "Cattle swallow tapeworm eggs on pasture contaminated by waste. The embryos travel through the bloodstream and encyst as cysticerci within the MUSCLE ('measly beef'). Born from an outside egg, resident in the flesh, formed while the animal was alive.",
          match: "The Gemara's 'דַּרְנֵי דְּבִשְׂרָא' — worms in the flesh of the animal, contrasted with fish — because the animal is rendered fit only by shechita and these formed מֵחַיִּים, so 'בְּאִיסּוּרַיְיהוּ קָיְימָן'. Cysticercus in muscle is the textbook darnei d-visra.",
          exclusivity: null,
          question: "That such worms formed while the animal lived (and so are untouched by the later shechita) is the sugya's operative distinction from fish; the factual timing and location are what a posek assesses.",
          sources: [
            { ref: "Chullin 67b", he: "בְּהֵמָה בִּשְׁחִיטָה הוּא דְּמִשְׁתַּרְיָא, וְהָנֵי מִדְּלָא קָא מַהְנְיָא לְהוּ שְׁחִיטָה — בְּאִיסּוּרַיְיהוּ קָיְימָן", se: "behema bi-shchita hu de-mishtarya ... be-issuraiyhu kaiman", en: "An animal is rendered fit only by slaughter; and since slaughter does not avail these worms, they remain as they were." }
          ] }
      ] },
    {
      id: "byproducts",
      name: { he: "תּוֹצְרֵי לְוַאי (מַשְׁקִים)", se: "Totzrei levai", en: "By-products (juice · wine · vinegar)" },
      lead: "How it trickles down to liquids. A drink 'שֶׁדַּרְכּוֹ לִיגָּדֵל בּוֹ תּוֹלָעִים' has its own frame: the sugya distinguishes a creature bred in the liquid from one strained IN or that crawled out and back — because straining and separating are themselves acts of פֵּירֵשׁ.",
      nodes: [
        { id: "vinegareels",
          name: { he: "תּוֹלְעֵי הַחֹמֶץ", se: "tol'ei ha-chometz", en: "Vinegar eels" },
          organism: "Turbatrix aceti",
          origin: "born-in", grade: "A",
          sugyaCase: "המסנן / רביתיה — YD 84:3, Chullin 67a",
          biology: "Free-living nematodes that breed in unfiltered, fermenting vinegar and sour liquids, feeding on the microbial culture. They genuinely live and multiply in the drink itself.",
          match: "The exact case of a liquid 'שֶׁדֶּרֶךְ לִיגָּדֵל בּוֹ תּוֹלָעִים'. The Gemara's rule (יַבְחוּשִׁין שֶׁסִּינְּנָן — 'טַעְמָא דְּסִינְּנָן, הָא לָא סִינְּנָן') and SA 84:3 turn on straining and on רְבִיתֵיהּ — a creature in its own medium versus one that separated.",
          exclusivity: null,
          question: "Whether a creature bred in the liquid is treated as still 'in its manner of growth' (הַיְינוּ רְבִיתֵיהּ) or as having separated once one strains — and what filtering itself implies — is the discussion the poskim carry.",
          sources: [
            { ref: "Chullin 67a", he: "לְרַבּוֹת יַבְחוּשִׁין שֶׁסִּינְּנָן; טַעְמָא דְּסִינְּנָן, הָא לָא סִינְּנָן — שְׁרֵי", se: "le-rabot yavchushin she-sinnenan; taama de-sinnenan, ha la sinnenan — shrei", en: "To include gnats that one strained: the reason is that he strained them — but had he not strained them [it is otherwise]." },
            { ref: "Shulchan Arukh YD 84:3", he: "הַמְסַנֵּן מַיִם אוֹ שְׁאָר מַשְׁקִים וְהָיוּ בּוֹ תּוֹלָעִים ... אַף עַל פִּי שֶׁחָזְרוּ לְתוֹכוֹ ... שֶׁכְּבָר פֵּירְשׁוּ", se: "ha-mesanen mayim o she'ar mashkim ... she-kevar peirshu", en: "One who strains water or other liquids that had worms — even if they returned — because they already separated." }
          ] },
        { id: "juiceflies",
          name: { he: "זַחֲלֵי הַזְּבוּב בַּמִּיץ", se: "zachalei ha-zevuv ba-mitz", en: "Fruit-fly larvae in juice / cider" },
          organism: "Drosophila larvae in pressed juice & must",
          origin: "crawled-in", grade: "B",
          sugyaCase: "Worm that left the fruit → the drink — YD 84:3–4",
          biology: "When infested fruit is crushed for juice or cider, larvae that were inside the fruit are carried into the liquid — or flies breed in the fermenting must. The trickle-down from the Fruit category into a by-product.",
          match: "The crossover the whole scheme points to. A larva that had already LEFT its fruit (פֵּירֵשׁ) before or during pressing sits in the 84:4 frame; a creature breeding in the must sits in the 84:3 drink frame; and Rav Huna's night-straining caution — 'דִּילְמָא פָּרֵישׁ ... וַהֲדַר נָפֵיל' — governs the filtering of juice and wine directly.",
          exclusivity: null,
          question: "Which frame applies to a given larva — one that had left its fruit, versus one bred in the liquid — and whether straining a wormy drink helps or harms, are the practical questions poskim address for juices and wine.",
          sources: [
            { ref: "Chullin 67a", he: "לָא לִשְׁפֵּי אִינָשׁ שִׁיכְרָא בְּצִבְיָיתָא בְּאוּרְתָּא, דִּילְמָא פָּרֵישׁ לְעֵיל מִצִּבְיָיתָא וַהֲדַר נָפֵיל לְכָסָא", se: "la lishpei inash shichra be-tzivyata be-urta ... va-hadar nafeil le-chasa", en: "One should not strain beer through straw at night, lest a creature separate above the straw and then fall back into the cup." },
            { ref: "Shulchan Arukh YD 84:4", he: "אֲבָל פֵּירְשׁוּ מִן הַפְּרִי אֲפִילּוּ לֹא הִגִּיעַ לָאָרֶץ", se: "aval peirshu min ha-peri afilu lo higia la-aretz", en: "But if they separated from the fruit — even if [the worm] never reached the ground." }
          ] }
      ] }
  ]
};
