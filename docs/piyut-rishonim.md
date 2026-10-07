# Piyut in the Rishonim · פיוט בדברי הראשונים

**Seder:** Tefilah & Liturgy
**Tile:** [apps/piyut-rishonim.html](../apps/piyut-rishonim.html)
**Status:** Live (linked from index.html), added 2026-10-07

## What it covers
An index of every place Rashi and Tosafos quote a line of piyut: 61 entries, Rashi on Chumash (2), Rashi on Nach (17), Rashi on Shas (3), Tosafos (37, with 2 further entries under Rashi on Shas). Each entry leads with the quoted line, then the Rishon's words with the quotation in bold (short excerpt, or the whole dibbur on request), then where in the year the piyut is said and how that is known. Selecting an entry opens the machzor page on the left: the piyut stanza block that holds the line, with the quoted line underlined, and a control to widen the view by twenty stanzas on each side.

Only Rishonim who quote piyut lines are included, not those who discuss whether piyutim should be said.

Order: by the calendar from Rosh Hashanah (Rosh Hashanah, Aseres Yemei Teshuvah, Selichos, Yom Kippur, Sukkos, Shemini Atzeres, Chanukah, Purim, the four parshiyos, Shabbos HaGadol, Pesach, Tisha B'Av, weekday, Azharos, unplaced), or by sefer. Filters: by sefer, and by whether the piyut text was located.

## Sources
All Hebrew text verbatim from Sefaria: Shas with Rashi and Tosafos (Vilna), Rashi on Torah (Rosenbaum and Silbermann), Rashi on Nach, and ten liturgy sources (Koren Rosh Hashanah shacharis, Machzor Rosh Hashanah Sefard musaf day 1, Selichos, Yotzros for Shekalim, Zachor, Parah, HaChodesh, Shabbos HaGadol, Esther, Yotzer Or). Each entry and each piyut links to its Sefaria page and names the edition.

Where each piyut is said rests on one of: the machzor it was found in; the Rishon's own words; the editor's bracketed note on Sefaria; the context; or the user's word (marked "טרם אומת"). The entry for Seder HaDoros's index "פייט" was the prior partial list.

## Files
- `apps/piyut-rishonim.html` — page and styles (shaar-blatt skin: Frank Ruhl Libre + Crimson Pro, paper #f7f2e9, maroon #5a1421).
- `apps/piyut-rishonim.js` — renderer (calendar or sefer grouping, entry excerpting, machzor rail).
- `apps/piyut-rishonim-data.js` — `window.PIYUT_DATA`: slots, sections, liturgy sources with segments, entries with Rishon HTML and anchored piyut blocks. Built from the harvested Sefaria texts by a build script outside the repo; not hand-edited.

## Notes
- 27 of 61 entries have the piyut text located on Sefaria; the rest show the line as the Rishon brought it and say the text was not found.
- Divrei HaYamim commentary is Sefaria's פירוש המיוחס לרש"י.
- Rashi on Daniel quotes "שבועים ששה"; the siddur has "שבעים שבעה".
- Tosafos Chagigah 12a attributes the Shekalim silluk line to R. Binyamin.
- Tosafos Bava Basra 14a placed under Rosh Hashanah on the user's word, not yet verified.
- Yom Kippur placements rest on Tosafos' "פייס דתרומת הדשן ... בסדר יום הכפורים" (confirmed by Maaseh Rokeach).
- Azharos day unverified; ten entries unplaced.
