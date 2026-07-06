/* ============================================================================
   TOLAEI HA-MAZON  ·  Parasites of Food & the Sugya of Tola'im
   Chullin 66b–67b  ·  Shulchan Arukh YD 84  ·  contemporary poskim
   Data model: window.TOLAIM_DATA
   Each source block is trilingual { he, se, en, ref } — the HE·SE·EN toggle
   swaps which language of the PRIMARY SOURCE is shown. Biology/match is analysis.
   ========================================================================== */
window.TOLAIM_DATA = {

  /* The single organizing axis of the whole sugya ------------------------- */
  axis: {
    bornIn:    { he: "נוֹצַר בְּמָקוֹם הַהֶתֵּר",  se: "notzar bi-mkom ha-heter",  en: "Born inside a permitted domain" },
    crawledIn: { he: "בָּא מִבַּחוּץ / פֵּירֵשׁ",   se: "ba mi-bachutz / peirash",   en: "Came from outside / separated" },
    contested: { he: "מַחְלֹקֶת בַּמְּצִיאוּת",     se: "machloket ba-metziut",       en: "Contested — where was it really born?" }
  },

  /* The governing principle ---------------------------------------------- */
  principle: {
    en: "The Torah forbids only הַשֶּׁרֶץ הַשֹּׁרֵץ עַל הָאָרֶץ — a creature that crawls upon the earth. A worm that was generated inside a domain that is itself permitted, and that never פֵּירֵשׁ (separated onto a surface, the ground, or the open air), stays permitted. A creature that came in from outside, was swallowed, was strained in, or crawled out and back, is forbidden. Modern parasitology lets us ask the sugya's own question of each real organism: was it born here, or did it crawl in?",
    sources: [
      { ref: "Chullin 67b", he: "שֶׁלֹּא אָסְרָה תּוֹרָה אֶלָּא שֶׁרֶץ הַשּׁוֹרֵץ עַל הָאָרֶץ", se: "she-lo asra Torah ela sheretz ha-shoretz al ha-aretz", en: "The Torah forbade only a swarming thing that swarms upon the earth." },
      { ref: "Chullin 67b", he: "וְהָנֵי כִּי קָא גָבְלָן — בְּהֶתֵּירָא קָא גָבְלָן", se: "ve-hanei ki ka gavlan — be-hetera ka gavlan", en: "And when these [fish worms] are formed, they are formed in a permitted state." }
    ]
  },

  categories: [
    {
      id: "water",
      name: { he: "מַיִם", se: "Mayim", en: "Water" },
      lead: "Split by the body of water. The Torah's own line runs between STILL/contained water (permitted) and FLOWING water (forbidden) — and the biology of who actually breeds where lands almost exactly on that line.",
      nodes: [

        { id: "copepods",
          name: { he: "שַׁלְשׁוּלֵי הַמַּיִם (קוֹפֵּפּוֹדוֹת)", se: "shalshulei ha-mayim", en: "Copepods / Cyclops" },
          organism: "Cyclops spp., Daphnia (water fleas)",
          waterType: "Still / contained water",
          origin: "born-in", verdict: "permitted", grade: "A",
          biology: "Microscopic crustaceans that breed almost exclusively in STILL and slow water — ponds, cisterns, barrels, storage vessels — clinging to algae along quiet banks. Moving current washes them out, so fast streams and springs are largely free of them. They are the intermediate host of the guinea worm and the fish tapeworm.",
          match: "The Torah permits fin-less, scale-less creatures found in בּוֹרוֹת שִׁיחִין וּמְעָרוֹת and in כֵּלִים — pits, cisterns, caves and vessels — because that water is 'עֲצוּרִין כְּכֵלִים', contained and still. Those are precisely the water bodies where copepods genuinely breed. The halachic permit tracks the real breeding domain: a creature born in still, contained water is treated as born-in-place, exactly what it is.",
          exclusivity: "Near-exclusive to still water. Because current physically removes them, their presence is a strong signal of standing water — the same distinction the sugya draws.",
          sources: [
            { ref: "Chullin 67a", he: "מַאי מַיעֵט? בּוֹרוֹת שִׁיחִין וּמְעָרוֹת לְהֶתֵּירָא", se: "mai me'et? borot shichin u-me'arot le-hetera", en: "What does it exclude? Pits, ditches, and caves — to permit them." },
            { ref: "Chullin 67a", he: "מְרַבֶּה אֲנִי בּוֹרוֹת שִׁיחִין וּמְעָרוֹת שֶׁהֵן עֲצוּרִים כְּכֵלִים", se: "merabeh ani borot shichin u-me'arot she-hen atzurin ke-kelim", en: "I include pits, ditches and caves, which are contained like vessels [still water]." },
            { ref: "Shulchan Arukh YD 84:1", he: "שְׁרָצִים הַגְּדֵלִים בְּמַיִם שֶׁבַּכֵּלִים וְשֶׁבְּבוֹרוֹת שִׁיחִין וּמְעָרוֹת שֶׁאֵינָם נוֹבְעִים מוּתָּרִים", se: "sheratzim ha-gedelim be-mayim she-ba-kelim ... she-einam nov'im mutarim", en: "Creatures that grow in water in vessels, pits, ditches and caves that do not flow — are permitted, even without fins and scales." }
          ] },

        { id: "mosquito",
          name: { he: "יַתּוּשִׁים (זַחֲלֵי מַיִם)", se: "yatushim", en: "Mosquito & midge larvae" },
          organism: "Culex / Chironomus larvae ('wrigglers', 'bloodworms')",
          waterType: "Still / stagnant water (obligate)",
          origin: "born-in", verdict: "permitted", grade: "A",
          biology: "Obligate still-water breeders. Females lay on the surface of standing water; larvae hang from the surface film to breathe. They cannot develop in flowing water — even mild current disrupts them. This is why mosquito control is fundamentally about draining or moving standing water.",
          match: "Same permit as copepods: born inside contained/still water that the Torah treats as 'עֲצוּרִין כְּכֵלִים'. The organism that most rigidly requires standing water falls squarely in the permitted category — a clean case of a creature born in its permitted domain.",
          exclusivity: "Strongly exclusive to standing water. Their obligate dependence makes water-body type an almost deterministic predictor of their presence.",
          sources: [
            { ref: "Chullin 67a", he: "שֶׁשּׁוֹחֶה וְשׁוֹתֶה מֵהֶן וְאֵינוֹ נִמְנָע — תַּלְמוּד לוֹמַר תֹּאכְלוּ מִכֹּל אֲשֶׁר בַּמָּיִם", se: "she-shocheh ve-shoteh me-hen ve-eino nimna", en: "One may bend and drink from them [pits/caves] and need not refrain — 'these you may eat of all that are in the water.'" }
          ] },

        { id: "blackfly",
          name: { he: "זַחֲלֵי זְבוּב שָׁחֹר", se: "zachalei zevuv shachor", en: "Blackfly larvae" },
          organism: "Simulium spp.",
          waterType: "Flowing / running water (obligate)",
          origin: "born-in", verdict: "disputed (flowing)", grade: "A",
          biology: "The mirror image of the mosquito: blackfly larvae live ONLY in flowing water. They anchor to rocks with silk threads and filter the current for food; they suffocate in still water. They are the one aquatic 'worm' that genuinely breeds in rivers and channels.",
          match: "The Torah FORBIDS fin-less creatures in flowing water — יַמִּים, נְחָלִים, and by inclusion חֲרִיצִין וּנְעִיצִין (trenches and channels 'שֶׁהֵם מוֹשְׁכִים') — with a recorded dispute (יֵשׁ אוֹסְרִים וְיֵשׁ מַתִּירִים) on the flowing-but-not-spring cases. Blackfly larvae are the real organism that populates exactly that forbidden/disputed zone. So the biological still-vs-flowing split maps onto the halachic still(permitted)/flowing(forbidden) split — with genuine exclusivity on both poles.",
          exclusivity: "Near-exclusive to running water. Between copepods/mosquitoes (still) and blackflies (flowing), water-body type sorts the fauna almost completely — precisely along the sugya's dividing line.",
          sources: [
            { ref: "Chullin 67a", he: "חֲרִיצִין וּנְעִיצִין לְאִיסּוּרָא", se: "charitzin u-ne'itzin le-issura", en: "Trenches and channels [flowing] — to forbid." },
            { ref: "Shulchan Arukh YD 84:2", he: "הַגְּדֵלִים בְּמַיִם שֶׁבַּחֲרִיצִין וּנְעִיצִין ... שֶׁהֵם מוֹשְׁכִים וְאֵינָם נוֹבְעִים — יֵשׁ אוֹסְרִים וְיֵשׁ מַתִּירִים", se: "ha-gedelim ... she-hem moshchim ve-einam nov'im — yesh osrim ve-yesh matirim", en: "Those growing in trench/channel water that flows but is not spring-fed — some forbid and some permit." }
          ] }
      ] },

    {
      id: "fish",
      name: { he: "דָּגִים", se: "Dagim", en: "Fish" },
      lead: "The sugya rules fish-worms permitted where an animal's are forbidden — because fish need no shechita, so a worm born in the fish is born already-permitted. But YD 84:16 draws a sharp inner line: worms in the fish's INNARDS are forbidden; only those in the FLESH are permitted. Every real fish parasite tests that line.",
      nodes: [

        { id: "anisakis",
          name: { he: "תּוֹלַעַת הָאָנִיסָאקִיס", se: "tola'at ha-anisakis", en: "Anisakis (herring worm)" },
          organism: "Anisakis simplex / A. pegreffii",
          waterType: "Marine (saltwater) fish",
          origin: "contested", verdict: "disputed", grade: "A",
          biology: "Eggs hatch in seawater; larvae are eaten by copepods; fish eat the copepods. The larvae burrow through the fish's GUT WALL and encyst on the viscera — and then migrate into the edible FLESH, especially post-mortem during cold storage (documented at 0–4°C over 1–3 days). So its origin is unquestionably OUTSIDE the fish, entering through the food chain and lodging first in the gut.",
          match: "This is the sharpest match in the whole sugya — and the live contemporary machlokes. YD 84:16: worms in a fish's מֵעַיִם (innards) are forbidden; in the flesh, permitted. Anisakis sits exactly on that seam: a gut/viscera parasite that migrates into flesh. The Gemara's own objection to permitting kukyanei — 'if they came from outside they'd be found in the digestive tract' — is literally true of Anisakis (it IS found in the gut). Contemporary poskim split: R' Yisroel Belsky, R' Moshe Vaye, and (reportedly) R' S.Z. Auerbach and R' Moshe Feinstein permit — the worm completes its growth in the flesh, and at its ingested microscopic stage it was below the threshold of a visible sheretz; many Eretz-Yisrael poskim (a signed kol koreh) forbid — it demonstrably came from outside/the water.",
          exclusivity: null,
          sources: [
            { ref: "Chullin 67b", he: "דַּרְנֵי דְּבִשְׂרָא — אֲסִירִי, דְּכַוְּורֵי — שַׁרְיָין", se: "darnei d-visra asiri, d-kavarei sharyan", en: "Worms of [animal] flesh are forbidden; those of fish are permitted." },
            { ref: "Chullin 67b", he: "אִי מֵעָלְמָא אָתוּ — לִישְׁתַּכְּחוּ דֶּרֶךְ בֵּית הָרֶעִי", se: "i me-alma atu — lishtakchu derech beit ha-re'i", en: "If they came from outside, they should be found by way of the digestive tract." },
            { ref: "Shulchan Arukh YD 84:16", he: "וְהַנִּמְצָאִים בְּדָגִים בִּמְעֵיהֶם אֲסוּרִים, בֵּין עוֹר לַבָּשָׂר אוֹ בְּתוֹךְ הַבָּשָׂר מוּתָּרִים", se: "ve-ha-nimtza'im be-dagim bi-m'eihem asurim ... be-toch ha-basar mutarim", en: "Those found in fish in the innards are forbidden; between skin and flesh or within the flesh, permitted." }
          ] },

        { id: "tapeworm",
          name: { he: "תּוֹלַעַת סֶרֶט שֶׁל דָּגִים", se: "tola'at seret shel dagim", en: "Broad / fish tapeworm" },
          organism: "Diphyllobothrium latum",
          waterType: "Freshwater & anadromous fish",
          origin: "crawled-in", verdict: "innards forbidden / flesh disputed", grade: "B",
          biology: "Copepod → fish. The plerocercoid larva encysts in the fish's viscera and musculature. Acquired, like Anisakis, entirely from outside via the copepod it starts in — the very still-water crustacean of the Water category.",
          match: "Same YD 84:16 line as Anisakis, and the same origin problem: it is not spontaneously generated in the flesh but arrives from the water through the food chain. Where it sits in the innards it is forbidden by the Shulchan Arukh outright.",
          exclusivity: null,
          sources: [
            { ref: "Shulchan Arukh YD 84:16", he: "וְהָא דַּאֲסָרִינַן דַּוְקָא דְּמֵחַיִּים", se: "ve-ha da-asarinan davka de-mechayim", en: "What we forbid is specifically that which formed while [the creature was] alive." }
          ] },

        { id: "myxo",
          name: { he: "נַבְגָּנִים שֶׁבַּבָּשָׂר", se: "navganim she-ba-basar", en: "Muscle-dwelling microsporidia" },
          organism: "Kudoa / Myxobolus spp.",
          waterType: "Marine & freshwater fish flesh",
          origin: "contested", verdict: "below-visibility", grade: "C",
          biology: "Microscopic spore-forming parasites that develop cysts within fish MUSCLE (Kudoa causes post-mortem 'soft flesh'). They complete a tissue stage inside the flesh, but their full cycle still passes through waterborne spores and aquatic worms.",
          match: "These come closest to the sugya's assumed picture of a worm 'formed in the flesh' — and they highlight the visibility principle invoked in the Anisakis heter: a parasite below the threshold of the eye is not treated as a sheretz at all. They show how thin the ground is for any claim of true spontaneous generation in fish flesh.",
          exclusivity: null,
          sources: [
            { ref: "Chullin 67b", he: "דָּגִים בַּאֲסִיפָה בְּעָלְמָא מִישְׁתְּרוּ", se: "dagim ba-asifa be-alma mishtaru", en: "Fish are rendered permitted by mere gathering [no shechita]." }
          ] }
      ] },

    {
      id: "vegetables",
      name: { he: "יְרָקוֹת", se: "Yerakot", en: "Vegetables" },
      lead: "Leafy produce is checked (bedikas ha-mazon) because its infesters live on and in a plant still ATTACHED to the ground — the paradigm of שֶׁרֶץ הַשּׁוֹרֵץ עַל הָאָרֶץ. Origin here is almost always 'from outside, onto attached produce'.",
      nodes: [

        { id: "aphids",
          name: { he: "כְּנִימוֹת וּתְּרִיפְּסִים", se: "kenimot u-tripsim", en: "Aphids & thrips" },
          organism: "Aphidoidea, Thysanoptera",
          origin: "crawled-in", verdict: "forbidden", grade: "A",
          biology: "Settle, feed and reproduce on the exposed surface of growing leaves — lettuce, herbs, strawberries, celery. They crawl over produce that is rooted and attached, and are the single largest reason leafy vegetables require inspection.",
          match: "The literal case of שֶׁרֶץ הַשּׁוֹרֵץ עַל הָאָרֶץ: a creature crawling on the surface of produce attached to the earth. Forbidden — and the operative concern of all contemporary vegetable-checking.",
          exclusivity: null,
          sources: [
            { ref: "Shulchan Arukh YD 84:8", he: "כָּל מִינֵי פֵּירוֹת שֶׁדַּרְכָּן לְהַתְלִיעַ כְּשֶׁהֵם מְחוּבָּרִים — לֹא יֹאכַל עַד שֶׁיִּבְדֹּק", se: "kol minei perot she-darkan le-hatlia ke-she-hem mechubarim — lo yochal ad she-yivdok", en: "Any produce that tends to become infested while attached — one may not eat until he inspects it." }
          ] },

        { id: "leafminer",
          name: { he: "מְנַקְּבֵי הֶעָלִים", se: "menakvei he-alim", en: "Leafminers" },
          organism: "Liriomyza spp.",
          origin: "crawled-in", verdict: "forbidden", grade: "A",
          biology: "The adult fly lays eggs on the leaf SURFACE; the larva then tunnels INSIDE the living leaf, leaving pale winding mines. It both enters from outside and develops within a plant that is attached to the ground.",
          match: "Doubly caught by YD 84:6: it develops inside produce while מְחוּבָּר (attached) — 'חָשׁוּב כְּשׁוֹרֵץ עַל הָאָרֶץ' — and it has 'מָקוֹם לִרְחֹשׁ', room to crawl within the leaf tissue, which is exactly the criterion that makes such a worm forbidden.",
          exclusivity: null,
          sources: [
            { ref: "Shulchan Arukh YD 84:6", he: "תּוֹלָעִים הַגְּדֵלִים בְּפֵירוֹת בְּעוֹדָם בְּמְחוּבָּר — חָשׁוּב כְּשׁוֹרֵץ עַל הָאָרֶץ וְאָסוּר אַף עַל פִּי שֶׁלֹּא פֵּירֵשׁ, וְהוּא שֶׁרִיחֵשׁ", se: "tola'im ha-gedelim be-ferot be-odam bi-mchubar — chashuv ke-shoretz al ha-aretz", en: "Worms that grow in produce while still attached are considered as swarming on the earth and forbidden even if they never separated — provided the worm moved." }
          ] },

        { id: "legume-weevil",
          name: { he: "תּוֹלַעַת הַקִּטְנִיּוֹת", se: "tola'at ha-kitniyot", en: "Bean / pea weevil" },
          organism: "Bruchus / Callosobruchus spp.",
          origin: "born-in", verdict: "narrow-space permitted", grade: "B",
          biology: "The larva bores into a single dried bean or pea and develops in a tight chamber inside the seed, without room to move about — until it matures.",
          match: "YD 84:6's striking exception: worms found under the skin of beans and peas, 'מוּנָּחִים בְּמָקוֹם צַר', lying in a tight space with no room to crawl, are permitted — 'לֹא קָרִינַן בְּהוּ הַשּׁוֹרֵץ עַל הָאָרֶץ'. But once there is room to crawl (e.g. in the open pod, שַׁרְבִיטִין), they are forbidden. The weevil in the seed is the permitted, confined case.",
          exclusivity: null,
          sources: [
            { ref: "Shulchan Arukh YD 84:6", he: "מוּתָּרִים לְפִי שֶׁהֵם מוּנָּחִים בְּמָקוֹם צַר ... אֲבָל הַנִּמְצָאִים בַּשַּׁרְבִיטִים אֲסוּרִים שֶׁיֵּשׁ לָהֶם מָקוֹם לִרְחֹשׁ", se: "mutarim lefi she-hem munachim be-makom tzar ... aval ha-nimtza'im ba-sharvitin asurim", en: "Permitted, because they lie in a tight space ... but those found in the pods are forbidden, for they have room to crawl." }
          ] }
      ] },

    {
      id: "fruit",
      name: { he: "פֵּירוֹת", se: "Perot", en: "Fruit" },
      lead: "The classic laboratory of the sugya. Everything turns on מְחוּבָּר vs תָּלוּשׁ (attached vs detached) and whether the worm פֵּירֵשׁ. Two nearly identical flies — one that lays in attached fruit and one that lays in fallen fruit — land on opposite sides of the law.",
      nodes: [

        { id: "swd",
          name: { he: "זְבוּב הַפֵּירוֹת מְנֻקַּד־כָּנָף", se: "zevuv ha-perot menukad-kanaf", en: "Spotted-wing drosophila" },
          organism: "Drosophila suzukii",
          origin: "born-in-attached", verdict: "forbidden", grade: "A",
          biology: "Unlike ordinary fruit flies, the female has a serrated ovipositor that cuts into INTACT, ripening fruit still ON the plant, laying eggs just under the skin. The larva develops inside the fruit while it is attached to the tree, and is present at harvest. The modern scourge of cherries, berries and grapes.",
          match: "This is Shmuel's קִישּׁוּת שֶׁהִתְלִיעָה בְּאִבֶּיהָ made literal — a worm born inside fruit while still attached to the ground. Even though it is genuinely born-in, it is forbidden: מְחוּבָּר is 'חָשׁוּב כְּשׁוֹרֵץ עַל הָאָרֶץ'. SWD is the paradigm case that born-inside is not automatically permitted.",
          exclusivity: null,
          sources: [
            { ref: "Chullin 67a", he: "אָמַר שְׁמוּאֵל: קִישּׁוּת שֶׁהִתְלִיעָה בְּאִבֶּיהָ אֲסוּרָה מִשּׁוּם הַשֶּׁרֶץ הַשּׁוֹרֵץ עַל הָאָרֶץ", se: "amar Shmuel: kishut she-hitli'a be-ibeha asura", en: "Shmuel: a cucumber that became infested while still attached is forbidden, on account of 'the swarming thing that swarms upon the earth.'" }
          ] },

        { id: "vinegarfly",
          name: { he: "זְבוּב הַחֹמֶץ הַמָּצוּי", se: "zevuv ha-chometz ha-matzui", en: "Common vinegar fly" },
          organism: "Drosophila melanogaster",
          origin: "born-in-detached", verdict: "permitted (if never separated)", grade: "A",
          biology: "The opposite habit: it lays only on DAMAGED, overripe, or fallen fruit — i.e. fruit that is already detached. The larva develops inside that detached fruit.",
          match: "תּוֹלַעַת שֶׁבַּפְּרִי בְּתָלוּשׁ — a worm born in detached fruit — is permitted, as long as it never left the fruit (YD 84:4). The contrast with the spotted-wing fly is the entire מְחוּבָּר / תָּלוּשׁ axis captured in two closely related insects.",
          exclusivity: null,
          sources: [
            { ref: "Shulchan Arukh YD 84:4", he: "תּוֹלָעִים הַגְּדֵלִים בְּפֵירוֹת בְּתָלוּשׁ — מוּתָּרִים, שֶׁלֹּא אָסְרָה תּוֹרָה אֶלָּא שֶׁרֶץ הַשּׁוֹרֵץ עַל הָאָרֶץ", se: "tola'im ha-gedelim be-ferot be-talush — mutarim", en: "Worms that grow in detached fruit are permitted, for the Torah forbade only a swarming thing that swarms upon the earth." }
          ] },

        { id: "codling",
          name: { he: "עַשׁ הַתַּפּוּחַ", se: "ash ha-tapuach", en: "Codling moth / plum curculio" },
          organism: "Cydia pomonella; Conotrachelus nenuphar",
          origin: "crawled-in", verdict: "forbidden", grade: "A",
          biology: "The egg is laid on the fruit's SURFACE (or a nearby leaf); the hatchling larva then bores INTO the fruit from outside, leaving an entry tunnel — the familiar 'wormhole' to the outside.",
          match: "Even a worm found deep inside is forbidden if it entered from outside — it פֵּירֵשׁ. YD 84:4 forbids where the worm left even onto the fruit's surface or its seed; and Rema forbids specifically 'אִם חוֹרוֹ נָקוּב לַחוּץ' — when the bore-hole opens to the outside, 'וְהָכִי נָהוּג'. The codling moth's entry tunnel is that very hole.",
          exclusivity: null,
          sources: [
            { ref: "Shulchan Arukh YD 84:4 (Rema)", he: "וְיֵשׁ אוֹסְרִים אִם חוֹרוֹ נָקוּב לַחוּץ ... וְהָכִי נָהוּג", se: "ve-yesh osrim im choro nakuv la-chutz ... ve-hachi nahug", en: "Some forbid if its hole is bored through to the outside ... and so is the custom." }
          ] },

        { id: "driedfig",
          name: { he: "תּוֹלַעַת הַתְּמָרִים וְהַגְּרוֹגְרוֹת", se: "tola'at ha-temarim ve-ha-grogarot", en: "Date & dried-fig worm" },
          organism: "Carpophilus, Ephestia (stored-fruit moths & beetles)",
          origin: "born-in-detached", verdict: "permitted vs forbidden by attachment", grade: "B",
          biology: "Larvae found inside stored, detached dates and dried figs, versus larvae in the tree's own wood and roots.",
          match: "The baraita's paired list: worms 'שֶׁבַּתְּמָרִים וְשֶׁבַּגְּרוֹגְרוֹת' (in detached dried fruit) are permitted, while worms 'שֶׁבְּעִיקָּרֵי זֵיתִים וְשֶׁבְּעִיקָּרֵי גְפָנִים' — in the very trunk and roots of the olive and vine — are forbidden, because those are the attached tree itself. Same insect guild, sorted by attachment.",
          exclusivity: null,
          sources: [
            { ref: "Chullin 67b", he: "לְהוֹצִיא ... וְתוֹלַעַת שֶׁבַּתְּמָרִים וְשֶׁבַּגְּרוֹגְרוֹת ... לְרַבּוֹת תּוֹלַעַת שֶׁבְּעִיקָּרֵי זֵיתִים וְשֶׁבְּעִיקָּרֵי גְפָנִים", se: "... tola'at she-ba-temarim ve-she-ba-grogarot ... tola'at she-be-ikarei zeitim ve-she-be-ikarei gefanim", en: "To exclude ... the worm in dates and dried figs [permitted] ... to include the worm in the roots of olives and vines [forbidden]." }
          ] }
      ] },

    {
      id: "meat",
      name: { he: "בָּשָׂר", se: "Basar", en: "Meat" },
      lead: "An animal is permitted only through shechita, so a worm that formed in it while alive is never covered by that shechita — it 'stays in its forbidden state.' The sugya's own mechanism (the animal sleeps and worms enter it) is, in modern terms, exactly how these parasites arrive.",
      nodes: [

        { id: "warble",
          name: { he: "זַחַל זְבוּב הַבָּקָר (דַּרְנָא)", se: "zachal zevuv ha-bakar", en: "Cattle grub / warble fly" },
          organism: "Hypoderma bovis / H. lineatum",
          origin: "crawled-in", verdict: "forbidden", grade: "A",
          biology: "The fly glues eggs to the leg HAIRS of a live cow. Larvae hatch, burrow through the skin, and migrate through the body for months (to the gullet or spinal canal), finally reaching the animal's BACK, where they form cysts (warbles) BETWEEN SKIN AND FLESH before exiting to pupate.",
          match: "YD 84:16 forbids worms in an animal 'בֵּין עוֹר לַבָּשָׂר' — between skin and flesh — which is precisely where the mature grub sits. And the Gemara's stated mechanism for why kukyanei are forbidden — 'מֵינָם נָיֵים וְעָיְילִי לֵיהּ ... תּוֹלָעִים', the animal sleeps and worms enter it — is a near-verbatim description of larvae penetrating the living animal from outside.",
          exclusivity: null,
          sources: [
            { ref: "Chullin 67b", he: "וְהִלְכְתָא: קוּקְיָאנֵי אֲסִירִי, מַאי טַעְמָא? מֵינָם נָיֵים וְעָיְילִי לֵיהּ בְּאוּסְיֵיהּ תּוֹלָעִים", se: "ve-hilcheta: kukyanei asiri ... meinam nayim ve-ayili leih be-usyeih tola'im", en: "The halacha: kukyanei are forbidden. Why? The animal sleeps and worms enter it through its nostril." },
            { ref: "Shulchan Arukh YD 84:16", he: "כָּל תּוֹלָעִים הַנִּמְצָאִים בַּבְּהֵמָה, בֵּין שֶׁהֵם בֵּין עוֹר לַבָּשָׂר בֵּין שֶׁהֵם בְּמֵעֶיהָ — אֲסוּרִים", se: "kol tola'im ha-nimtza'im ba-behema ... asurim", en: "All worms found in an animal — whether between skin and flesh or in its innards — are forbidden." }
          ] },

        { id: "fasciola",
          name: { he: "תּוֹלַעַת הַכָּבֵד (קוּקְיָאנֵי)", se: "tola'at ha-kaved", en: "Liver fluke — kukyanei" },
          organism: "Fasciola hepatica",
          origin: "crawled-in", verdict: "forbidden", grade: "A",
          biology: "Encysted metacercariae sit on low, marshy PASTURE VEGETATION. A grazing cow or sheep SWALLOWS them; the young flukes penetrate the gut wall, cross the body cavity, and burrow into the LIVER. An internal-organ parasite acquired by eating vegetation.",
          match: "This is the Gemara's kukyanei almost word for word. Rav Sheshes forbids worms in the lung and liver 'מֵעָלְמָא אָתוּ' — they came from outside, the animal having 'swallowed them along with vegetation.' Fasciola is exactly a liver parasite swallowed on vegetation. Rav Ashi's objection (they'd then be found in the gut) is answered by the real route: they transit the gut wall and migrate onward to the organ.",
          exclusivity: null,
          sources: [
            { ref: "Chullin 67b", he: "אָמַר רַב שֵׁשֶׁת בְּרֵיהּ דְּרַב אִידִי: קוּקְיָאנֵי אֲסִירִי, מַאי טַעְמָא? מֵעָלְמָא אָתוּ", se: "kukyanei asiri, mai taama? me-alma atu", en: "R' Sheshes: kukyanei [worms in the lung and liver] are forbidden. Why? They came from the outside world." }
          ] },

        { id: "cysticercus",
          name: { he: "דַּרְנֵי דְּבִשְׂרָא", se: "darnei d-visra", en: "Muscle cysticercus" },
          organism: "Taenia saginata (beef); Sarcocystis",
          origin: "crawled-in", verdict: "forbidden", grade: "A",
          biology: "Cattle swallow tapeworm eggs on pasture contaminated by human/animal waste. The embryos travel through the bloodstream and encyst as cysticerci within the MUSCLE ('measly beef'). Born from an outside egg, resident in the flesh, formed while the animal was alive.",
          match: "The Gemara's 'דַּרְנֵי דְּבִשְׂרָא אֲסִירִי' — worms in the flesh of the animal are forbidden, unlike fish — precisely because the animal is permitted only by shechita and these formed while alive ('דְּמֵחַיִּים'), so 'בְּאִיסּוּרַיְיהוּ קָיְימָן'. Cysticercus in muscle is the textbook darnei d-visra.",
          exclusivity: null,
          sources: [
            { ref: "Chullin 67b", he: "בְּהֵמָה בִּשְׁחִיטָה הוּא דְּמִשְׁתַּרְיָא, וְהָנֵי מִדְּלָא קָא מַהְנְיָא לְהוּ שְׁחִיטָה — בְּאִיסּוּרַיְיהוּ קָיְימָן", se: "behema bi-shchita hu de-mishtarya ... be-issuraiyhu kaiman", en: "An animal is permitted only by slaughter; and since slaughter does not avail these worms, they remain in their forbidden state." }
          ] }
      ] },

    {
      id: "byproducts",
      name: { he: "תּוֹצְרֵי לְוַאי (מַשְׁקִים)", se: "Totzrei levai", en: "By-products (juice · wine · vinegar)" },
      lead: "How it trickles down to liquids. A drink 'שֶׁדַּרְכּוֹ לִיגָּדֵל בּוֹ תּוֹלָעִים' has its own rule: a creature bred in the liquid is one thing; a creature strained IN, or that crawled out and back, is forbidden — because straining and separating are themselves acts of פֵּירֵשׁ.",
      nodes: [

        { id: "vinegareels",
          name: { he: "תּוֹלְעֵי הַחֹמֶץ", se: "tol'ei ha-chometz", en: "Vinegar eels" },
          organism: "Turbatrix aceti",
          origin: "born-in", verdict: "permitted unstrained / forbidden if strained", grade: "A",
          biology: "Free-living nematodes that breed in unfiltered, fermenting vinegar and sour liquids, feeding on the microbial culture. They genuinely live and multiply in the drink itself.",
          match: "The exact case of a liquid 'שֶׁדֶּרֶךְ לִיגָּדֵל בּוֹ תּוֹלָעִים'. The Gemara's rule (יַבְחוּשִׁין שֶׁסִּינְּנָן — 'טַעְמָא דְּסִינְּנָן, הָא לָא סִינְּנָן שְׁרֵי') and YD 84:3 turn on straining: strain the liquid and a creature that then falls back is forbidden, because straining shows it had separated; unstrained, one that stays in its medium ('הַיְינוּ רְבִיתֵיהּ') is not treated as having crawled on the earth.",
          exclusivity: null,
          sources: [
            { ref: "Chullin 67a", he: "לְרַבּוֹת יַבְחוּשִׁין שֶׁסִּינְּנָן; טַעְמָא דְּסִינְּנָן, הָא לָא סִינְּנָן — שְׁרֵי", se: "le-rabot yavchushin she-sinnenan; taama de-sinnenan, ha la sinnenan — shrei", en: "To include gnats that one strained: the reason is that he strained them — but had he not strained them, they would be permitted." },
            { ref: "Shulchan Arukh YD 84:3", he: "הַמְסַנֵּן מַיִם אוֹ שְׁאָר מַשְׁקִים וְהָיוּ בּוֹ תּוֹלָעִים ... אַף עַל פִּי שֶׁחָזְרוּ לְתוֹכוֹ אֲסוּרִים שֶׁכְּבָר פֵּירְשׁוּ", se: "ha-mesanen mayim o she'ar mashkim ... asurim she-kevar peirshu", en: "One who strains water or other liquids that had worms — even if they returned, they are forbidden, for they already separated." }
          ] },

        { id: "juiceflies",
          name: { he: "זַחֲלֵי הַזְּבוּב בַּמִּיץ", se: "zachalei ha-zevuv ba-mitz", en: "Fruit-fly larvae in juice / cider" },
          organism: "Drosophila larvae in pressed juice & must",
          origin: "crawled-in / mixed", verdict: "forbidden if separated from fruit", grade: "B",
          biology: "When infested fruit is crushed for juice or cider, larvae that were inside the fruit are carried into the liquid — or flies breed in the fermenting must. The trickle-down from the Fruit category into a by-product.",
          match: "The crossover the whole scheme points to. A larva that had LEFT its fruit (פֵּירֵשׁ) before or during pressing is already forbidden by YD 84:4, and it does not become permitted by landing in juice. A creature breeding in the must falls under the drink rule (84:3). And Rav Huna's warning — do not strain such a drink at night ('דִּילְמָא פָּרֵישׁ ... וַהֲדַר נָפֵיל') — governs the filtering of juice and wine directly.",
          exclusivity: null,
          sources: [
            { ref: "Chullin 67a", he: "לָא לִשְׁפֵּי אִינָשׁ שִׁיכְרָא בְּצִבְיָיתָא בְּאוּרְתָּא, דִּילְמָא פָּרֵישׁ לְעֵיל מִצִּבְיָיתָא וַהֲדַר נָפֵיל לְכָסָא", se: "la lishpei inash shichra be-tzivyata be-urta ... va-hadar nafeil le-chasa", en: "One should not strain beer through straw at night, lest a creature separate above the straw and then fall back into the cup." }
          ] }
      ] }
  ]
};
