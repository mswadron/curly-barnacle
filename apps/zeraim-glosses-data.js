/* ============================================================================
   SEDER ZERAIM · Rambam gloss decoder  ->  window.ZERAIM_GLOSSES
   ----------------------------------------------------------------------------
   The printed Peirush HaMishnayot (Vilna) is a medieval Hebrew translation of
   Rambam's JUDEO-ARABIC. For plant names it typically gives TWO layers:
     - Rambam's own Arabic term, transliterated into Hebrew letters   (בערבי …)
     - a לַעַז — an Old-French / Provençal gloss the TRANSLATOR added   (ובלע"ז …)
   The laaz is the translator's addition, NOT Rambam's words — and it sometimes
   points to a different plant than Rambam's Arabic (see uzradim: azarole vs sorb).
   Keyed by species id. Uncertain readings are flagged.
   ============================================================================ */
window.ZERAIM_GLOSSES = {
  uzradim: {
    ref: "Kilayim 1:4",
    arabic: { term: 'עזרו"ד', translit: "al-zu'rur", meaning: { he: "עֻזְרָד (הָעֻזְרָר הַמָּצוּי)", en: "azarole — Crataegus azarolus, the common Levantine hawthorn" }, note: { he: "בְּפֵירוּשׁוֹ לִדְמַאי א׳:א׳ אַף הָרַמְבַּם כּוֹתֵב אֶלְעַזְדוּר (זֻעְרוּר) בְּלֹא לַעַז — עֵדוּת שֶׁזּוֹ מִלַּת הָרַמְבַּם.", en: "In his Peirush to Demai 1:1 Rambam writes the same Arabic (al-zu'rur) with no laaz — evidence this is Rambam's own word." } },
    laaz: { term: 'שורב"ש', translit: "sorbes", lang: { he: "לַעַז (צָרְפָתִית עַתִּיקָה / פְּרוֹבַנְסָלִית)", en: "Old French / Provençal" }, meaning: { he: "פְּרִי עֵץ הַחֻזְרָר (סוֹרְבּוּס, Sorbus domestica) — עֵץ אַחֵר!", en: "the sorb / service-tree fruit (Sorbus domestica) — a different tree!" } },
    crux: { he: "הָעֲרָבִית שֶׁל הָרַמְבַּם מְכַוֶּנֶת לָעֻזְרָד (Crataegus); הַלַּעַז שֶׁהוֹסִיף הַמְתַרְגֵּם מְכַוֵּן לַסּוֹרְבּוּס — פְּרִי אַחֵר. פֶלִיקְס וְלֶעװ הוֹלְכִים אַחַר הָעֲרָבִית: עֻזְרָד.", en: "Rambam's Arabic means the azarole (Crataegus); the translator's laaz means the sorb (Sorbus) — a different fruit. Feliks & Low follow the Arabic: azarole." }
  },
  chazrad: {
    ref: "Kilayim 1:4",
    arabic: { term: "אל עזרן", translit: "al-'azran", meaning: { he: "צוּרָה שֶׁל זֻעְרוּר (עֻזְרָד) — וּמִכָּאן הַמַּחֲלֹקֶת", en: "a variant of zu'rur (azarole) — hence the dispute" } },
    crux: { he: "לְפִי קְרִיאַת הָרַמְבַּם (עַזְרָן ≈ זֻעְרוּר) חַזְרָד הוּא עֻזְרָד/סוֹרְבּוּס וְחוֹפֵף עִם עוּזְרָדִים; פֶלִיקְס וְלֶעװ: אַגָּס סוּרִי בָּר (Pyrus syriaca).", en: "On Rambam's reading (azran approx. zu'rur) chazrad is an azarole/sorb, overlapping uzradim; Feliks & Low read it as the wild Syrian pear (Pyrus syriaca)." }
  },
  rimin: {
    ref: "Kilayim 1:4",
    arabic: { term: "אלנבק", translit: "al-nabq", meaning: { he: "פְּרִי הַשֵּׁיזָף הַמָּצוּי (Ziziphus spina-christi), הַנַּבְּק/דּוֹם הַבָּר", en: "the fruit of the Christ's-thorn jujube (Ziziphus spina-christi) — the wild 'nabk / dom'" }, note: { he: "הָרַמְבַּם: כְּבָר פֵּירַשְׁנוּ אוֹתוֹ בִּדְמַאי (א׳:א׳), שָׁם הָרִימִין נִמְנִים עִם פֵּירוֹת הַבָּר הַקַּלִּין.", en: "Rambam cross-refers to his Peirush on Demai 1:1, where rimin is counted among the lenient wild fruits." } }
  },
  shkedin: {
    ref: "Kilayim 1:4",
    arabic: { term: "אללוז", translit: "al-lawz", meaning: { he: "שָׁקֵד", en: "almond" } },
    laaz: { term: 'אמינדל"ס', translit: "amandes / amandles", lang: { he: "לַעַז (צָרְפָתִית עַתִּיקָה)", en: "Old French" }, meaning: { he: "שְׁקֵדִים", en: "almonds" } },
    note: { he: "הָרַמְבַּם מוֹסִיף: הָאֲפַרְסְקִים בְּקָטְנָם דּוֹמִים לִשְׁקֵדִים, וּבְגָמְרָם נִקְרָאִים בַּעֲרָבִית עֻנָּאב (unnab) — שֵׁם הַשֵּׁיזָף.", en: "Rambam adds: unripe peaches resemble almonds, and when ripe are called in Arabic 'unnab — the jujube's name." }
  },
  perishim: {
    ref: "Kilayim 1:4",
    laaz: { term: 'קודונ"ץ', translit: "codonyz / coudonz", lang: { he: "לַעַז (צָרְפָתִית עַתִּיקָה / קָטָלָנִית)", en: "Old French / Catalan" }, meaning: { he: "חֲבוּשׁ (Cydonia oblonga)", en: "quince (Cydonia oblonga)" } },
    note: { he: "בַּעֲרָבִית: סָפַרְגַ׳ל (safarjal) — חֲבוּשׁ.", en: "Arabic elsewhere: safarjal — quince." }
  },
  krustumelin: {
    ref: "Kilayim 1:4",
    arabic: { term: 'כמתה"י', translit: "kummathra", meaning: { he: "אַגָּס", en: "pear" } },
    laaz: { term: 'פירא"ש', translit: "peras", lang: { he: "לַעַז (רוֹמָנִית)", en: "Romance" }, meaning: { he: "אַגָּסִים", en: "pears" } }
  },
  agasim: {
    ref: "Kilayim 1:4",
    arabic: { term: 'עגו"ץ', translit: "ijjas", meaning: { he: "אַגָּס (בַּעֲרָבִית שֶׁל אֶרֶץ יִשְׂרָאֵל)", en: "pear (Levantine Arabic)" }, note: { he: "וְהֶהָמוֹן קוֹרְאִים בַּרְקוּק (barquq).", en: "commonly also called barquq." } },
    laaz: { term: 'מורייג"ס / אנפרשיג"ס', translit: "(Old French)", lang: { he: "לַעַז", en: "Old French" }, meaning: { he: "אַגָּסִים — הַתַּעְתִּיק הַמְדֻיָּק אֵינוֹ וַדַּאי", en: "pears — the exact reading is uncertain" } }
  },
  parskim: {
    ref: "Kilayim 1:4",
    arabic: { term: 'אלפוך', translit: "al-khawkh (?)", meaning: { he: "אֲפַרְסֵק — הַתַּעְתִּיק אֵינוֹ וַדַּאי", en: "peach — reading uncertain" } },
    laaz: { term: 'פירשג"ש', translit: "persegues", lang: { he: "לַעַז (פְּרוֹבַנְסָלִית)", en: "Provençal" }, meaning: { he: "אֲפַרְסְקִים", en: "peaches" } }
  }
,
  sapir: { ref: "Kilayim 1:1",
    arabic: { term: 'מא"ש', translit: "mash", meaning: { he: "מָאשׁ (מִין קִטְנִית)", en: "mung bean / a pulse" } } },
  purkedan: { ref: "Kilayim 1:1",
    arabic: { term: 'גלבא"ן', translit: "julban", meaning: { he: "טֹפֵחַ / קִטְנִית מִן הַלַּתִירוּס", en: "chickling / grass-pea group (Lathyrus)" } },
    laaz: { term: 'וש"ש', translit: "vesse", lang: { he: "לַעַז", en: "Old French" }, meaning: { he: "בִּקְיָה (וִיקְיָה) — הַתַּעְתִּיק אֵינוֹ וַדַּאי", en: "vetch — reading uncertain" } } },
  tofeach: { ref: "Kilayim 1:1",
    note: { he: "הָרוֹפְאִים קוֹרְאִים אוֹתוֹ קַרְטוּמָן.", en: "The physicians call it kartuman." } },
  sheuim: { ref: "Kilayim 1:1",
    arabic: { term: 'לובי"א', translit: "lubya", meaning: { he: "לוּבְּיָה (שְׁעוּעִית מִצְרִית)", en: "cowpea (lubya)" } } },
  kishut: { ref: "Kilayim 1:2",
    arabic: { term: "אלפקון", translit: "al-faqqus", meaning: { he: "קִשּׁוּא הַנָּחָשׁ / מְלָפְפוֹן יָרֹק", en: "the snake / Armenian cucumber" } } },
  melafefon: { ref: "Kilayim 1:2",
    arabic: { term: 'פיא"ר', translit: "fiyar (khiyar?)", meaning: { he: "קִשּׁוּאִים לְבָנִים — הַתַּעְתִּיק אֵינוֹ וַדַּאי", en: "white cucumbers/melon — reading uncertain" } } },
  chazeret: { ref: "Kilayim 1:2",
    arabic: { term: "אלחסא", translit: "al-khass", meaning: { he: "חַסָּה (גַּנִּית וַהֲרָרִית)", en: "lettuce (garden & mountain kinds)" } } },
  ulshin: { ref: "Kilayim 1:2",
    arabic: { term: "אלהנדבא", translit: "al-hindiba", meaning: { he: "עֻלֶּשֶׁת / עִנְדְּבִי", en: "endive / chicory (garden & wild)" } } },
  kreishim: { ref: "Kilayim 1:2",
    arabic: { term: "אלכראת", translit: "al-kurrath", meaning: { he: "כְּרֵשָׁה", en: "leek (garden & wild)" } } },
  teradim: { ref: "Kilayim 1:3",
    arabic: { term: "סלק", translit: "silq", meaning: { he: "תֶּרֶד / סֶלֶק", en: "chard / beet" } } },
  leunim: { ref: "Kilayim 1:3",
    arabic: { term: "קטף", translit: "qataf", meaning: { he: "לְעוּנִים (מַלּוּחַ)", en: "orache / saltbush" } },
    laaz: { term: 'ארמול"ש', translit: "armols", lang: { he: "לַעַז", en: "Old French / Spanish" }, meaning: { he: "מַלּוּחַ (אַרְמוֹלֶש)", en: "orache (armoles)" } } },
  turmos: { ref: "Kilayim 1:3",
    laaz: { term: 'פיישו"ל', translit: "faishol", lang: { he: "לַעַז (פְּרוֹבַנְסָלִית)", en: "Provençal" }, meaning: { he: "תֻּרְמוֹס / קִטְנִית (fesols) — הַתַּעְתִּיק אֵינוֹ וַדַּאי", en: "lupine / beans (fesols) — reading uncertain" } } }
,
  lafsan: { ref: "Kilayim 1:5",
    note: { he: "הָרוֹפְאִים קוֹרְאִים אוֹתוֹ לַפְסִין (חַרְדָּל הַשָּׂדֶה).", en: "The physicians call it lapsin (charlock / wild mustard)." } },
  peigam: { ref: "Kilayim 1:8",
    arabic: { term: "סד'אב", translit: "sadhab", meaning: { he: "פֵּיגָם", en: "rue" } },
    laaz: { term: "רודע", translit: "rude", lang: { he: "לַעַז", en: "Old French" }, meaning: { he: "פֵּיגָם (Ruta)", en: "rue (Ruta)" } } },
  chalamit: { ref: "Kilayim 1:8",
    arabic: { term: "כטמיה", translit: "khatmiya", meaning: { he: "חֻלְמִית / חֻטְמִית (מַלּוֹאָה) — 'יֵשׁ אוֹמְרִים'", en: "mallow / marshmallow — 'some say' (uncertain id)" } },
    laaz: { term: 'מליו"ן', translit: "malve", lang: { he: "לַעַז", en: "Old French" }, meaning: { he: "מַלּוֹאָה", en: "mallow" } } },
  istis: { ref: "Kilayim 2:5",
    arabic: { term: "אלניל", translit: "al-nilaj", meaning: { he: "אִסָּטִיס / נִיל — צֶמַח צֶבַע", en: "woad / indigo — the dye plant" } },
    laaz: { term: "אינדו", translit: "indo", lang: { he: "לַעַז", en: "Romance" }, meaning: { he: "אִינְדִּיגוֹ — צוֹבְעִין בּוֹ תְּכֵלֶת", en: "indigo — used to dye techeiles" } } },
  tiltan: { ref: "Kilayim 2:5",
    arabic: { term: "חלבה", translit: "hulba", meaning: { he: "תִּלְתָּן / חִילְבָּה", en: "fenugreek" } },
    laaz: { term: "פנגריג", translit: "fenugrec", lang: { he: "לַעַז", en: "Old French" }, meaning: { he: "תִּלְתָּן", en: "fenugreek" } } },
  charia: { ref: "Kilayim 2:8",
    arabic: { term: "עצפור", translit: "usfur", meaning: { he: "חָרִיעַ / קוֹרְטָם — צֶבַע וּמַאֲכָל", en: "safflower — dye & food" } } },
  irus: { ref: "Kilayim 5:8",
    arabic: { term: 'סוסנב"ר / נענע', translit: "sawsanbar / nana", meaning: { he: "מִין נַעֲנָע רְחַב־עָלִים", en: "a broad-leaved mint" } },
    laaz: { term: 'מינט"א', translit: "menta", lang: { he: "לַעַז", en: "Romance" }, meaning: { he: "נַעֲנָע", en: "mint" } } },
  kissom: { ref: "Kilayim 5:8",
    arabic: { term: "ללבב", translit: "lablab", meaning: { he: "קִיסוֹס / חֲבַלְבַּל מְטַפֵּס", en: "ivy / bindweed (a climber)" } },
    laaz: { term: 'קוריול"ה', translit: "coriole", lang: { he: "לַעַז", en: "Old French" }, meaning: { he: "חֲבַלְבַּל (Convolvulus)", en: "bindweed (Convolvulus)" } } },
  "shoshanat-hamelech": { ref: "Kilayim 5:8",
    arabic: { term: "שקאיק אל נעמן", translit: "shaqaiq al-numan", meaning: { he: "כַּלָּנִית / פֶּרֶג", en: "anemone / poppy" } },
    laaz: { term: "רושילא", translit: "rosela", lang: { he: "לַעַז", en: "Romance" }, meaning: { he: "הַתַּעְתִּיק אֵינוֹ וַדַּאי", en: "reading uncertain" } } },
  kinras: { ref: "Kilayim 5:8",
    arabic: { term: "אלקנאריה", translit: "al-qanniriya", meaning: { he: "קִנְרָס — חַרְשָׁף / אַרְטִישׁוֹק", en: "cardoon / artichoke" } } },
  pishtan: { ref: "Kilayim 9:1",
    note: { he: "'שֵׁשׁ' שֶׁבַּתּוֹרָה הוּא הַפִּשְׁתָּן (לְפִי הָרַמְבַּם).", en: "The biblical 'shesh' is flax (per Rambam)." } }
,
  nitzpa: { ref: "Demai 1:1",
    arabic: { term: 'קפא"ד', translit: "al-kabbar", meaning: { he: "צָלָף / נִצְפָּה (Capparis)", en: "caper (Capparis)" } } },
  "bnos-shuach": { ref: "Demai 1:1",
    note: { he: "רַמְבַּם: מִין תְּאֵנִים לְבָנִים הַנּוֹתְנִים פִּרְיָם מִשָּׁלֹשׁ שָׁנִים לְשָׁלֹשׁ.", en: "Rambam: a kind of white fig that yields its fruit once every three years." } }
};
