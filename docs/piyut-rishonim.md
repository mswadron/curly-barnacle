# Piyut in the Rishonim · פיוט בדברי הראשונים

**Seder:** Tefilah & Liturgy
**Tile:** [apps/piyut-rishonim.html](../apps/piyut-rishonim.html)
**Status:** Live (linked from index.html), added 2026-10-07

## What it covers
An index of every place Rashi and Tosafos quote a line of piyut: 65 entries, Rashi on Chumash (2), Rashi on Nach (18), Rashi on Shas (3), Tosafos (42). Each entry leads with the quoted line, then the Rishon's words with the quotation in bold (short excerpt, or the whole dibbur on request), then where in the year the piyut is said and how that is known. Selecting an entry opens the machzor page on the left: the piyut stanza block that holds the line, with the quoted line underlined, and a control to widen the view by twenty stanzas on each side.

Only Rishonim who quote piyut lines are included, not those who discuss whether piyutim should be said.

Order: by the calendar from Rosh Hashanah (Rosh Hashanah, Aseres Yemei Teshuvah, Yom Kippur, Sukkos, Shemini Atzeres, Simchas Torah, Shabbos Bereishis, Chanukah, Taanis Esther, the four parshiyos, Shabbos HaGadol, Pesach, Shavuos azharos, Shabbos Shelach, Tisha B'Av, weekday, unplaced), or by sefer. Filters: by sefer, and by whether the piyut text was located.

## Sources
All Rishon text verbatim from Sefaria: Shas with Rashi and Tosafos (Vilna), Rashi on Torah (Rosenbaum and Silbermann), Rashi on Nach. Piyut text verbatim from Sefaria where it has the piyut (Koren Rosh Hashanah shacharis, Machzor Rosh Hashanah Sefard musaf days 1 and 2, Selichos Lita and Polin, Kinnos Ashkenaz, Yotzros for Shekalim, Zachor, Parah, HaChodesh, Shabbos HaGadol, Esther, Yotzer Or) and otherwise from Hebrew Wikisource, fetched by MediaWiki API and reduced to stanzas by `dev/piyut-tools/wiki_lit.py` (the raw page dumps with revision ids are in `dev/piyut-wikisource/`). Wikisource pages used: אור ישע מאושרים, אפיק רנן ושירים, ארחץ בנקיון כפות (with the silluk כי אקח מועד), אי פתרוס בעברך, אשוחח נפלאותיך צור עולמים, אשישת שלוחתו, אמת יהגה חכי, וחיות אשר הנה מרובעות כסא, אין צור חלף, אודך כי אנפת, אסירים אשר בכושר שעשעת, שש מאות נקראות, אשנבי שחקים, ליל שמורים אור עולמו נגלה. Each entry and each piyut links to its page and names the edition or revision. Wording differences between the Rishon and the text before us are noted beside the piyut.

Where each piyut is said rests on one of: the machzor or Wikisource page it was found in (which states the custom); the Rishon's own words; the editor's bracketed note on Sefaria; or another source named in the note. Prior lists: Seder HaDoros, index "פייט"; Teshuva MeAhava I:1 (R. Elazar Fleckeles, Prague 1793), which lists piyutim cited by Rashi and Tosafos with their place in the machzor and supplied four entries here (Rashi Zechariah 5:11, Tosafos Berachos 11a and 17b, Tosafos Rosh Hashanah 11a).

## Files
- `apps/piyut-rishonim.html` — page and styles (shaar-blatt skin: Frank Ruhl Libre + Crimson Pro, paper #f7f2e9, maroon #5a1421).
- `apps/piyut-rishonim.js` — renderer (calendar or sefer grouping, entry excerpting, machzor rail).
- `apps/piyut-rishonim-data.js` — `window.PIYUT_DATA`: slots, sections, liturgy sources with segments, entries with Rishon HTML and anchored piyut blocks. Built by `dev/piyut-tools/build.py` from `entries.py` (the citations, quotes and anchors), `calendar_map.py` (placements with their basis), the harvested Sefaria texts (`harvest.json`, kept outside the repo) and `wiki_lit.json`; not hand-edited. Every quote is checked against the Rishon text and every anchor against the piyut text, nikud-insensitive, or the build fails.

## Notes
- 61 of 65 entries have the piyut text located (Sefaria or Wikisource). Not found: the Lombardy yotzer in Rashi Beitzah 33a; "רביעית היא שמינית" (Rashi Zechariah 5:11); "אחר גמר מיצוי אכול בדצוי ורצוי" (Tosafos Shabbos 114b); the tzitzis silluk of R. Yosef Tov Elem (Tosafos Arachin 2b). Tosafos Rosh Hashanah 27a cites the Kalir's Geshem and Tal for their view, not a line; both piyutim are shown from their openings and the intended line is not identified. "אור יום הנף" (Tosafos Berachos 11a) is the bikur in R. Meir Sheliach Tzibur's maariv ליל שמורים אור ישראל, second night of Pesach. Also not found: the line "השר המשרת נער נקרא" (Tosafos Yevamos 16b and Chullin 60a); its companion line is in the ofan אשנבי שחקים.
- Tosafos Bava Basra 14a ("תבנית אות יוסף עמודיו עשה כסף") is in R. Shlomo HaBavli's Pesach yotzer אור ישע מאושרים, said on the first day of Pesach, not in a Rosh Hashanah yotzer as first placed.
- Tosafos Menachos 41b's "רבי שלמה ספרדי" is the ahavah שש מאות נקראות attributed to ibn Gabirol, said in Eastern Ashkenaz on Shabbos Parshas Shelach.
- Tosafos Sukkah 36b's אשישת שלוחתו is a pesicha said in Worms on Shabbos Bereishis.
- Divrei HaYamim commentary is Sefaria's פירוש המיוחס לרש"י.
- Rashi on Daniel quotes "שבועים ששה"; the siddur has "שבעים שבעה".
- Tosafos Chagigah 12a attributes the Shekalim silluk line to R. Binyamin.
- Yom Kippur placements rest on Tosafos' "פייס דתרומת הדשן ... בסדר יום הכפורים" (confirmed by Maaseh Rokeach).
- Azharos placed on Shavuos on the strength of Teshuva MeAhava I:1 §47 (azharos are a Shavuos genre); the day is not stated in the Wikisource page of אמת יהגה חכי. Six entries unplaced.

## Second sweep, 2026-11-24: the other Rishonim
109 more places, found by searching Sefaria for the formulas Rishonim use to cite a payetan (יסד הפייט, וכן יסד, בפיוט, הקליר, ביוצר, בקרובץ, באזהרות and others) across the Rishonim on Chumash and Nach, on Shas and Avos, and in halachah and minhag. Every quote is checked by the build against the Rishon's text as fetched; nothing is typed by hand.
- Sections added: שאר ראשונים על התורה (Chizkuni, Da'as Zekenim, Hadar Zekenim, Riva, Paaneach Raza, Rabbeinu Bachya, Rashbam, Ramban, Ibn Ezra, Abarbanel), שאר ראשונים על הש"ס ועל אבות (Tosafos Yeshanim, Tosafos Shantz, Ritva, Meiri, Rosh, Mordechai, Rabbeinu Yonah, Rashbatz, Abarbanel), ספרי הלכה ומנהג (Machzor Vitry, Siddur Rashi, Kol Bo, Or Zarua, Tur, Shibbolei HaLeket, Sefer HaMachria, Smag, Seder Troyes, Maharam, Tashbetz, Abudarham, Sefer Chasidim, Maharil, Terumas HaDeshen, Tashbetz Katan). Abarbanel, Rashbatz, Maharil and Terumas HaDeshen are late Rishonim.
- Calendar slots added: Purim, Shabbos. "Shavuos: Azharos" renamed "Shavuos and Azharos".
- Piyut text: 50 of the 109 located, matched automatically against every liturgy source on file (a whole line, or its opening words when the line breaks across stanzas; matches on a shared verse only are excluded by hand in build.py NOAUTO). 18 more Wikisource pages fetched for this (dev/piyut-tools/wiki_lit2.py; dumps q1-q18 in dev/piyut-wikisource/).
- Placement: from the machzor page where the line was found; otherwise only what the Rishon himself says (basis "כך כתב"); otherwise unplaced.
- Left out: paraphrases without the payetan's words (Smag Asin 209, Tosafos Rid Kiddushin 11a); Piskei Tosafos (a digest of Tosafos already indexed); "Rosh on Torah", which is the Hadar Zekenim text again; Ibn Ezra on Koheles 5:1, who quotes Kalir only to argue against saying piyutim; running commentaries on a piyut (Or Zarua II 256 on אלהי הרוחות, Machzor Vitry on the Aramaic Shavuos piyutim).
- Not searched or not on Sefaria: Rokeach, Sefer HaManhig, Minhagei Maharil, Orchos Chaim, Hagahos Maimoniyos, Raavyah, Eshkol, Ittim, Raavan, Sefer HaPardes. Shaarei Teshuvah and Ramban's Milchamos and Derashos not searched.
- Build: dev/piyut-tools/build.py now carries every previously published entry over from the last build unchanged (frozen-data.js = the published data file), and builds only entries whose Rishon text is in the current harvest.
