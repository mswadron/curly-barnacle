/* ============================================================================
   SEDER ZERAIM · MAASROS module  →  window.ZERAIM_MODULE_MAASROS
   ----------------------------------------------------------------------------
   Verbatim Mishnah (Torat Emet, via Sefaria) + a per-produce aspect layer.
   Two obligation moments carried per crop:
     • onah   — the ripening stage from which the fruit is "chayav" (ch. 1:2-4)
     • goren  — gemar-melacha / point the tithing obligation fixes (ch. 1:5-8)
   English lines are editorial translation (badge n/a), never the primary text.
   Reused spine ids point at existing Kilayim species; new ids seed the spine.
   ============================================================================ */
window.ZERAIM_MODULE_MAASROS = {
  masechta: {
    key: "maasros", he: "מַעַשְׂרוֹת", translit: "Maasros", en: "Tithes",
    seder: "Zeraim", order: 7, accent: "maasros",
    blurb: {
      he: "מֵאֵימָתַי הַפֵּרוֹת חַיָּבוֹת בַּמַּעַשְׂרוֹת — כְּלַל הַחִיּוּב וְעוֹנַת כָּל פְּרִי וּפְרִי.",
      en: "When produce becomes obligated in tithes — the general rule, and the ripening stage (onah) for each fruit."
    },
    framework: {
      kelal: {
        he: "כָּל שֶׁהוּא אֹכֶל, וְנִשְׁמָר, וְגִדּוּלָיו מִן הָאָרֶץ, חַיָּב בַּמַּעַשְׂרוֹת.",
        en: "Anything that is food, is guarded (owned), and grows from the ground is obligated in tithes.",
        ref: "1:1"
      },
      moments: [
        { he: "עוֹנָה", en: "Onah — ripening", note: { he: "מִשֶּׁיִּגְמַר הַפְּרִי לְהִתְבַּשֵּׁל דֵּי צָרְכּוֹ, נַעֲשֶׂה בַּר־חִיּוּב.", en: "Once the fruit ripens enough it becomes liable in principle (ch. 1:2-4)." } },
        { he: "גֹּרֶן", en: "Goren — gemar melacha", note: { he: "מִשֶּׁנִּגְמְרָה מְלַאכְתּוֹ (עֲרֵמָה, כְּלִי, אֲגֻדָּה) נִקְבַּע לְמַעֲשֵׂר וְאָסוּר בַּאֲכִילַת עֲרַאי.", en: "Once processing is finished (heap, vessel, bundle) the obligation fixes and casual eating is forbidden (ch. 1:5-8)." } }
      ],
      cycle: {
        he: "מַעֲשֵׂר רִאשׁוֹן בְּכָל שָׁנָה לַלֵּוִי; מַעֲשֵׂר שֵׁנִי בַּשָּׁנִים א׳ ב׳ ד׳ ה׳; מַעֲשֵׂר עָנִי בַּשָּׁנִים ג׳ ו׳.",
        en: "Maaser Rishon every year (to the Levite); Maaser Sheni in years 1,2,4,5; Maaser Ani in years 3,6 of the shmita cycle."
      }
    }
  },

  /* ---- verbatim texts (Sefaria, Torat Emet) ---- */
  texts: {
    "1:1": { sefaria: "https://www.sefaria.org/Mishnah_Maasrot.1.1",
      he: "כְּלָל אָמְרוּ בַּמַּעַשְׂרוֹת, כָּל שֶׁהוּא אֹכֶל, וְנִשְׁמָר, וְגִדּוּלָיו מִן הָאָרֶץ, חַיָּב בַּמַּעַשְׂרוֹת. וְעוֹד כְּלָל אַחֵר אָמְרוּ, כָּל שֶׁתְּחִלָּתוֹ אֹכֶל וְסוֹפוֹ אֹכֶל, אַף עַל פִּי שֶׁהוּא שׁוֹמְרוֹ לְהוֹסִיף אֹכֶל, חַיָּב קָטָן וְגָדוֹל. וְכָל שֶׁאֵין תְּחִלָּתוֹ אֹכֶל אֲבָל סוֹפוֹ אֹכֶל, אֵינוֹ חַיָּב עַד שֶׁיֵּעָשֶׂה אֹכֶל:",
      en: "They stated a rule about tithes: anything that is food, guarded, and grows from the ground is obligated in tithes. And a further rule: anything whose beginning is food and whose end is food — though one keeps it to add food — is obligated small or large; and anything whose beginning is not food but whose end is food is not obligated until it becomes food." },
    "1:2": { sefaria: "https://www.sefaria.org/Mishnah_Maasrot.1.2",
      he: "מֵאֵימָתַי הַפֵּרוֹת חַיָּבוֹת בַּמַּעַשְׂרוֹת. הַתְּאֵנִים, מִשֶּׁיַּבְחִילוּ. הָעֲנָבִים וְהָאֳבָשִׁים, מִשֶּׁהִבְאִישׁוּ. הָאוֹג וְהַתּוּתִים, מִשֶּׁיַּאְדִּימוּ. וְכָל הָאֲדֻמִּים, מִשֶּׁיַּאְדִּימוּ. הָרִמּוֹנִים, מִשֶּׁיִּמַּסּוּ. הַתְּמָרִים, מִשֶּׁיָּטִּילוּ שְׂאֹר. הָאֲפַרְסְקִים, מִשֶּׁיָּטִּילוּ גִידִים. הָאֱגוֹזִים, מִשֶּׁיַּעֲשׂוּ מְגוּרָה. רַבִּי יְהוּדָה אוֹמֵר, הָאֱגוֹזִים וְהַשְּׁקֵדִים, מִשֶּׁיַּעֲשׂוּ קְלִפָּה:",
      en: "From when is produce obligated in tithes? Figs — once they soften. Grapes and wild grapes — once they turn (ripen). Sumac and mulberries — once they redden; and all red fruits — once they redden. Pomegranates — once they soften. Dates — once they froth. Peaches — once they show veins. Walnuts — once they form a chamber. R. Yehuda says: walnuts and almonds — once they form a shell." },
    "1:3": { sefaria: "https://www.sefaria.org/Mishnah_Maasrot.1.3",
      he: "הֶחָרוּבִין, מִשֶּׁיִּנָּקֵדוּ. וְכָל הַשְּׁחוֹרִים, מִשֶּׁיִּנָּקְדוּ. הָאֲגָסִים וְהַקְּרֻסְטוֹמֵלִין וְהַפָּרִישִׁין וְהָעֻזְרָדִים, מִשֶּׁיִּקָּרֵחוּ. וְכָל הַלְּבָנִים, מִשֶּׁיִּקָּרֵחוּ. הַתִּלְתָּן, מִשֶּׁתְּצַמֵּחַ. הַתְּבוּאָה וְהַזֵּיתִים, מִשֶּׁיַּכְנִיסוּ שְׁלִישׁ:",
      en: "Carobs — once they get black spots; and all black fruits — once they spot. Pears, crustumenian pears, quinces and azaroles — once they smooth (lose down); and all white fruits — once they smooth. Fenugreek — once it sprouts (its seed can grow). Grain and olives — once they reach a third of their growth." },
    "1:4": { sefaria: "https://www.sefaria.org/Mishnah_Maasrot.1.4",
      he: "וּבַיָּרָק, הַקִּשּׁוּאִין וְהַדְּלוּעִים וְהָאֲבַטִּיחִים וְהַמְּלָפְפוֹנוֹת, הַתַּפּוּחִים וְהָאֶתְרוֹגִין, חַיָּבִים גְּדוֹלִים וּקְטַנִּים. רַבִּי שִׁמְעוֹן פּוֹטֵר אֶת הָאֶתְרוֹגִים בְּקָטְנָן. הַחַיָּב בַּשְּׁקֵדִים הַמָּרִים, פָּטוּר בַּמְּתוּקִים, הַחַיָּב בַּמְּתוּקִים, פָּטוּר בַּמָּרִים:",
      en: "And among vegetables: cucumbers, gourds, watermelons and muskmelons, apples and etrogim — obligated whether large or small. R. Shimon exempts etrogim while small. What is obligated among bitter almonds is exempt among sweet, and what is obligated among sweet is exempt among bitter." },
    "1:5": { sefaria: "https://www.sefaria.org/Mishnah_Maasrot.1.5",
      he: "אֵיזֶהוּ גָּרְנָן לַמַּעַשְׂרוֹת. הַקִּשּׁוּאִים וְהַדְּלוּעִים, מִשֶּׁיְּפַקְסוּ. וְאִם אֵינוֹ מְפַקֵּס, מִשֶּׁיַּעֲמִיד עֲרֵמָה. אֲבַטִּיחַ, מִשֶּׁיְּשַׁלֵּק. וְאִם אֵינוֹ מְשַׁלֵּק, עַד שֶׁיַּעֲשֶׂה מֻקְצֶה. יָרָק הַנֶּאֱגָד, מִשֶּׁיֹּאגַד. אִם אֵינוֹ אוֹגֵד, עַד שֶׁיְּמַלֵּא אֶת הַכְּלִי. וְאִם אֵינוֹ מְמַלֵּא אֶת הַכְּלִי, עַד שֶׁיְּלַקֵּט כָּל צָרְכּוֹ. כַּלְכָּלָה, עַד שֶׁיְּחַפֶּה. וְאִם אֵינוֹ מְחַפֶּה, עַד שֶׁיְמַלֵּא אֶת הַכְּלִי. וְאִם אֵינוֹ מְמַלֵּא אֶת הַכְּלִי, עַד שֶׁיְּלַקֵּט כָּל צָרְכּוֹ. בַּמֶּה דְבָרִים אֲמוּרִים, בְּמוֹלִיךְ לַשּׁוּק. אֲבָל בְּמוֹלִיךְ לְבֵיתוֹ, אוֹכֵל מֵהֶם עֲרַאי עַד שֶׁהוּא מַגִּיעַ לְבֵיתוֹ:",
      en: "What is the 'threshing-floor' (fixing point) for tithes? Cucumbers and gourds — once one removes their fuzz; if he doesn't, once he stacks a pile. Watermelon — once he scalds it; if not, once he sets it aside. Bound vegetables — once bound; if not bound, once he fills the vessel; if not, once he gathers all he needs. A basket (of fruit) — once he covers it; if not, once he fills the vessel; if not, once he gathers all he needs. This applies to one bringing to market; but one bringing home may eat of them casually until he reaches his house." }
  },

  /* ---- species aspects ---- */
  species: [
    /* fruit — reusing existing Kilayim spine ids */
    { id: "teena", aspect: { category: "peiros", obligated: true,
      onah: { he: "מִשֶּׁיַּבְחִילוּ", en: "once they soften", ref: "1:2" } } },
    { id: "gefen", aspect: { category: "tirosh", obligated: true, liquid: true,
      onah: { he: "מִשֶּׁהִבְאִישׁוּ", en: "once they ripen/turn", ref: "1:2" },
      note: { he: "עֲנָבִים — 'תִּירוֹשׁ', חִיּוּב מִן הַתּוֹרָה; נַעֲשׂוֹת יַיִן וּמִתְעַשְּׂרוֹת כְּמַשְׁקֶה.", en: "Grapes (tirosh) are obligated d'Oraisa and, uniquely with olives, are tithed as their liquid (wine)." } } },
    { id: "zayit", aspect: { category: "yitzhar", obligated: true, liquid: true,
      onah: { he: "מִשֶּׁיַּכְנִיסוּ שְׁלִישׁ", en: "once they reach a third", ref: "1:3" },
      note: { he: "זֵיתִים — 'יִצְהָר', חִיּוּב מִן הַתּוֹרָה; מִתְעַשְּׂרִים כְּשֶׁמֶן.", en: "Olives (yitzhar) are obligated d'Oraisa and, uniquely with grapes, tithed as their liquid (oil)." } } },
    { id: "shkedin", aspect: { category: "peiros", obligated: true,
      onah: { he: "מִשֶּׁיַּעֲשׂוּ קְלִפָּה (ר׳ יְהוּדָה)", en: "once they form a shell (R. Yehuda)", ref: "1:2" },
      note: { he: "הַחַיָּב בַּמָּרִים פָּטוּר בַּמְּתוּקִים וְכֵן לְהֵפֶךְ (א:ד).", en: "Bitter vs. sweet almonds ripen to obligation at opposite points (1:4)." } } },
    { id: "parskim", aspect: { category: "peiros", obligated: true,
      onah: { he: "מִשֶּׁיָּטִּילוּ גִידִים", en: "once they show veins", ref: "1:2" } } },
    { id: "agasim", aspect: { category: "peiros", obligated: true,
      onah: { he: "מִשֶּׁיִּקָּרֵחוּ", en: "once they smooth (lose down)", ref: "1:3" } } },
    { id: "krustumelin", aspect: { category: "peiros", obligated: true,
      onah: { he: "מִשֶּׁיִּקָּרֵחוּ", en: "once they smooth", ref: "1:3" } } },
    { id: "perishim", aspect: { category: "peiros", obligated: true,
      onah: { he: "מִשֶּׁיִּקָּרֵחוּ", en: "once they smooth", ref: "1:3" } } },
    { id: "uzradim", aspect: { category: "peiros", obligated: true,
      onah: { he: "מִשֶּׁיִּקָּרֵחוּ", en: "once they smooth", ref: "1:3" } } },
    { id: "tapuach", aspect: { category: "peiros", obligated: true,
      onah: { he: "חַיָּבִים גְּדוֹלִים וּקְטַנִּים", en: "obligated large or small", ref: "1:4" } } },
    { id: "tiltan", aspect: { category: "zeraim", obligated: true,
      onah: { he: "מִשֶּׁתְּצַמֵּחַ", en: "once its seed can sprout", ref: "1:3" } } },
    { id: "chitim", aspect: { category: "dagan", obligated: true,
      onah: { he: "מִשֶּׁיַּכְנִיסוּ שְׁלִישׁ", en: "once the grain reaches a third", ref: "1:3" },
      note: { he: "תְּבוּאָה — 'דָּגָן', חִיּוּב מִן הַתּוֹרָה.", en: "Grain (dagan) — obligated d'Oraisa." } } },
    { id: "seorim", aspect: { category: "dagan", obligated: true,
      onah: { he: "מִשֶּׁיַּכְנִיסוּ שְׁלִישׁ", en: "once the grain reaches a third", ref: "1:3" } } },
    /* vegetables (yerek) — obligated large or small; goren workflow in 1:5 */
    { id: "kishut", aspect: { category: "yerek", obligated: true,
      onah: { he: "חַיָּבִים גְּדוֹלִים וּקְטַנִּים", en: "obligated large or small", ref: "1:4" },
      goren: { he: "מִשֶּׁיְּפַקְסוּ / מִשֶּׁיַּעֲמִיד עֲרֵמָה", en: "once de-fuzzed, or once piled", ref: "1:5" } } },
    { id: "delaat", aspect: { category: "yerek", obligated: true,
      onah: { he: "חַיָּבִים גְּדוֹלִים וּקְטַנִּים", en: "obligated large or small", ref: "1:4" },
      goren: { he: "מִשֶּׁיְּפַקְסוּ / מִשֶּׁיַּעֲמִיד עֲרֵמָה", en: "once de-fuzzed, or once piled", ref: "1:5" } } },
    { id: "avatiach", aspect: { category: "yerek", obligated: true,
      onah: { he: "חַיָּבִים גְּדוֹלִים וּקְטַנִּים", en: "obligated large or small", ref: "1:4" },
      goren: { he: "מִשֶּׁיְּשַׁלֵּק / עַד שֶׁיַּעֲשֶׂה מֻקְצֶה", en: "once scalded, or once set aside", ref: "1:5" } } },
    { id: "melafefon", aspect: { category: "yerek", obligated: true,
      onah: { he: "חַיָּבִים גְּדוֹלִים וּקְטַנִּים", en: "obligated large or small", ref: "1:4" } } },

    /* new spine species (seed taxonomy) */
    { id: "rimon", spine: {
        names: { he: "רִמּוֹן", translit: "rimon", en: ["pomegranate"] },
        taxonomy: { binomial: "Punica granatum", family: "Lythraceae", confidence: "settled",
          id_source: "Feliks; Amar; Löw — the biblical rimon. (Distinct from Kilayim's rimin = jujube.)", badge: "lexicon" },
        etymology_latin: {
          Punica: "Latin 'Punic (Carthaginian) apple' — malum punicum, as the Romans knew it via Carthage.",
          granatum: "Latin 'seeded, grainy' (from 'granum', grain/seed), for the many seeds."
        }
      },
      aspect: { category: "peiros", obligated: true,
        onah: { he: "מִשֶּׁיִּמַּסּוּ", en: "once they soften", ref: "1:2" } } },
    { id: "temarim", spine: {
        names: { he: "תְּמָרִים", translit: "temarim", en: ["dates"] },
        taxonomy: { binomial: "Phoenix dactylifera", family: "Arecaceae", confidence: "settled",
          id_source: "Feliks; Amar; universal — the date palm.", badge: "lexicon" },
        etymology_latin: {
          Phoenix: "Greek 'phoinix', the date palm (also 'Phoenician / purple-red'), the classical name.",
          dactylifera: "Latin 'finger-bearing' (Greek 'daktylos', finger), for the finger-shaped dates."
        }
      },
      aspect: { category: "peiros", obligated: true,
        onah: { he: "מִשֶּׁיָּטִּילוּ שְׂאֹר", en: "once they froth (soften)", ref: "1:2" } } },
    { id: "egozim", spine: {
        names: { he: "אֱגוֹזִים", translit: "egozim", en: ["walnuts"] },
        taxonomy: { binomial: "Juglans regia", family: "Juglandaceae", confidence: "settled",
          id_source: "Feliks; Amar; Löw — egoz = Persian/common walnut (egoz melech).", badge: "lexicon" },
        etymology_latin: {
          Juglans: "Latin, contraction of 'Jovis glans' — 'the acorn/nut of Jupiter'.",
          regia: "Latin 'royal' (regius), the 'royal nut' (cf. Hebrew egoz melech)."
        }
      },
      aspect: { category: "peiros", obligated: true,
        onah: { he: "מִשֶּׁיַּעֲשׂוּ מְגוּרָה", en: "once they form an inner chamber", ref: "1:2" } } },
    { id: "charuvin", spine: {
        names: { he: "חָרוּבִין", translit: "charuvin", en: ["carob"] },
        taxonomy: { binomial: "Ceratonia siliqua", family: "Fabaceae", confidence: "settled",
          id_source: "Feliks; Amar; Löw — the carob tree. (Distinct from Kilayim's charuv = a long-podded cowpea.)", badge: "lexicon" },
        etymology_latin: {
          Ceratonia: "Greek 'keras/keration' (horn), for the horn-shaped pod (source of 'carat').",
          siliqua: "Latin 'pod', the classical word for a legume pod."
        }
      },
      aspect: { category: "peiros", obligated: true,
        onah: { he: "מִשֶּׁיִּנָּקֵדוּ", en: "once they develop black spots", ref: "1:3" } } },
    { id: "og", spine: {
        names: { he: "אוֹג", translit: "og", en: ["sumac"] },
        taxonomy: { binomial: "Rhus coriaria", family: "Anacardiaceae", confidence: "settled",
          id_source: "Feliks; Löw — the Sicilian/tanner's sumac, its red drupes used as a spice.", badge: "lexicon" },
        etymology_latin: {
          Rhus: "Latin/Greek 'rhous', the classical name for sumac.",
          coriaria: "Latin 'of leather/tanners' (from 'corium', hide), as its fruit/leaves were used in tanning."
        }
      },
      aspect: { category: "peiros", obligated: true,
        onah: { he: "מִשֶּׁיַּאְדִּימוּ", en: "once they redden", ref: "1:2" } } },
    { id: "tutim", spine: {
        names: { he: "תּוּתִים", translit: "tutim", en: ["mulberries"] },
        taxonomy: { binomial: "Morus nigra", family: "Moraceae", confidence: "settled",
          id_source: "Feliks; Löw — the black mulberry (tut / shikma-related name debate aside).", badge: "lexicon" },
        etymology_latin: {
          Morus: "Classical Latin name for the mulberry tree.",
          nigra: "Latin 'black', for the dark fruit."
        }
      },
      aspect: { category: "peiros", obligated: true,
        onah: { he: "מִשֶּׁיַּאְדִּימוּ", en: "once they redden", ref: "1:2" } } },
    { id: "etrog", spine: {
        names: { he: "אֶתְרוֹג", translit: "etrog", en: ["citron"] },
        taxonomy: { binomial: "Citrus medica", family: "Rutaceae", confidence: "settled",
          id_source: "Feliks; Amar; Löw — the citron; the 'pri etz hadar'.", badge: "lexicon" },
        etymology_latin: {
          Citrus: "Latin 'citrus', originally the citron/citron-wood tree.",
          medica: "Latin 'of Media (Persia)' — the 'Median apple', its supposed origin."
        }
      },
      aspect: { category: "yerek", obligated: true,
        onah: { he: "חַיָּבִים גְּדוֹלִים וּקְטַנִּים (ר׳ שִׁמְעוֹן פּוֹטֵר בְּקָטְנָן)", en: "obligated large or small; R. Shimon exempts small etrogim", ref: "1:4" },
        note: { he: "הָאֶתְרוֹג — הוֹלֵךְ אַחַר שְׁעַת לְקִיטָתוֹ לְעִנְיַן מַעֲשֵׂר וּשְׁבִיעִית.", en: "The etrog follows its picking-time for tithe/shevi'is status (unusual among tree-fruit)." } } }
  ]
};
