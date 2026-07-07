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
};
