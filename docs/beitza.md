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

## Machlokes
Where amoraim or tannaim dispute the same point, the sides are shown in one box: the point in dispute, then each speaker on his own line with his words and daf (19 such boxes). Each side's words are an exact piece of an already-checked quote; a shared opening or closing line of the Gemara is shown above or below the sides in grey. (2026-10-12)

## Status chips on machlokes sides (2026-10-12)
A side of a machlokes may carry a chip, always in the source's own words, never the editor's:
- grey "נדחה" chip: the Gemara's word that sets the side aside (כי קושיין, אלא, תיובתא), linked to the daf, with the verbatim sentence under the quote.
- teal "וכן הלכה" / "הלכה" chip: a posek (Rambam, Shulchan Aruch) or the Gemara rules like that side; links to each source, with one verbatim sentence from the first.
Where neither applies there is no chip. 14 chips on 20 boxes: 2 נדחה (1:1 Rav Nachman, 2:6 Rava), 12 הלכה. Every chip sentence was checked by script against the Sefaria text (src/check_refs.py).
