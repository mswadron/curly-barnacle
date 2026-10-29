# The Mishnah as Torah She-Ba'al Peh · משנה כתורה שבעל פה (Maseches Beitzah)

**Seder:** Mishnah
**Tile:** [apps/beitza.html](../apps/beitza.html)
**Status:** Live (linked from index.html), added 2026-10-11

## What it covers
All 42 mishnayos of Maseches Beitzah (perakim 1 to 5). Each card gives the Mishnah, a short editor line on what the Gemara adds (labeled as editor wording), then the Gemara's teachings on it, each quoted verbatim, linked to its daf, and tagged by kind. Where the Gemara itself rules, the halacha line is shown. Each card has an empty slot for a mnemonic (סימן).

Eleven kinds (tags): 1 במאי עסקינן, מוקמינן לה, 2 הגדרת מונח, 3 גבול המחלוקת, 4 טעם נסתר, 5 שורש המחלוקת, 6 מוחלפת השיטה, 7 דלא כי האי תנא, 8 אינה להלכה (only where the Gemara shows the anonymous Mishnah is one view or not the ruling), 9 דיוק בלשון (inference from the words as they stand), 10 מציאות, 11 הכי קתני (the Gemara re-reads or completes the Mishnah's words: הכי קאמר, חסורי מחסרא, אלא אימא, מאן דכר שמיה; added 2026-10-12). Tapping a kind shows only the mishnayos that have it and dims the other teachings; tabs switch between the whole masechta and each perek.

## Sources
Mishnah: Sefaria, Torat Emet 357. Gemara: Sefaria, William Davidson Edition, Vocalized Aramaic. All 182 Gemara quotes were checked by script as exact substrings of the downloaded Sefaria text of Beitzah 2a-40b (pieces split on "..."); 0 failures. The 42 Mishnah texts match Sefaria after Unicode normalization. Checker and source dump: C:\Users\mswad\Dropbox\curly-barnacle-incoming\_PROJECT\beitza\src (verify.py, beitza_src.json).

## Files
`apps/beitza.html`, `apps/beitza.js` (render), `apps/beitza-data.js` (window.BEITZA_DATA).

## Open
- Mnemonics not yet written.
- Editor lines for 3:5 and 4:4 still mention the search for the tanna after those moves were dropped.
- 1:2, אפר כירה (noted 2026-10-28, unclear on the card): the card gives Rav Yehuda's rule (only שהוסק מערב יום טוב; הוסק ביום טוב אסור; ראוי לצלות בו ביצה מותר) but not why. A reader can think the wood being ready before Yom Tov should be enough. It is not: Rashi ח. "דליכא למימר דעתיה עלויה מאתמול"; Bartenura the same; Tosafos Yom Tov citing Tosafos "נולד גמור דמעיקרא עצים והשתא אפר". הוסק means lit, not already burnt to ash. Rashi's "מאתמול בעודם עצים היו מוכנים להסק" is only on the hot-ash exception. Not yet decided how to show the reason, since the card quotes only the Gemara.

## Machlokes
Where amoraim or tannaim dispute the same point, the sides are shown in one box: the point in dispute, then each speaker on his own line with his words and daf (19 such boxes). Each side's words are an exact piece of an already-checked quote; a shared opening or closing line of the Gemara is shown above or below the sides in grey. (2026-10-12)

## Status chips on machlokes sides (2026-10-12)
A side of a machlokes may carry a chip, always in the source's own words, never the editor's:
- grey "נדחה" chip: the Gemara's word that sets the side aside (כי קושיין, אלא, תיובתא), linked to the daf, with the verbatim sentence under the quote.
- teal "וכן הלכה" / "הלכה" chip: a posek (Rambam, Shulchan Aruch) or the Gemara rules like that side; links to each source, with one verbatim sentence from the first.
Where neither applies there is no chip. 14 chips on 20 boxes: 2 נדחה (1:1 Rav Nachman, 2:6 Rava), 12 הלכה. Every chip sentence was checked by script against the Sefaria text (src/check_refs.py).

## פירוש expander (2026-10-12)
Every Gemara box, machlokes side and halacha line has a פירוש button. It fetches the Steinsaltz Hebrew commentary for exactly that Gemara segment from the Sefaria API (ref stored per quote as `ref`, e.g. "2a.7-8", computed by src/segmap.py against the downloaded text; 4 quotes that run into the next amud fall back to the whole amud) and shows it inline under the quote, with a link to the source page. If the fetch fails the button shows a plain link. Nothing is stored on the site; the commentary is Steinsaltz's own text, loaded on demand.

## Editor lines, rewritten (2026-10-12)
All 42 "מה שהגמרא מוסיפה" lines rewritten to one pattern: what the words say on their face, then one clause per box in card order, concrete (which reason, which case, which meaning), both sides of a machlokes named, the halacha line last. Nothing beyond what is on the card.

## Omissions review (2026-10-15)
Prompted by 1:1, where the second clause (שאור בכזית וחמץ בככותבת) had no box though the Gemara on 7b limits the dispute to ביעור. Every card was checked clause by clause, with the author's Beitza.docx notes as a checklist for perek 1. Added 13 boxes, each on a clause that had none or lacked the Gemara's key reading: 1:1 (ביעור, not eating), 1:2 (ומודים: only with a spike set before Yom Tov, in loose earth; אפר כירה: only from a fire lit before Yom Tov unless hot enough to roast an egg), 2:4 (Ulla's verses for each side), 2:6 (גריצין: needless exertion, so every Yom Tov), 2:10 (טמאה מדרס / נטלת בשבת), 3:3 (נשחטה בחזקת היתר), 3:4 (the root: רואין מומין ביום טוב), 3:8 (what Rabbi Yehuda adds, Shmuel and Rava), 4:2 (from the sukkah: סותר אהל), 4:4 (charcoal: להזיע וקודם גזרה), 4:6 (both agree he may not trim the splinter), 5:2 (reasons for swimming and clapping). Held back: 2:1 (limit stands only on one answer), 5:2 Rav Papa (names the tanna), 5:5 (repeats the box's closing line), 5:7 (about Rebbi's consistency in the baraisa). All quotes checked by script against the source; every quote's daf label checked (5:4 Abaye and Rava corrected to לח:).
