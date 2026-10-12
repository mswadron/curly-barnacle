# The Mishnah as Torah She-Ba'al Peh · משנה כתורה שבעל פה (Maseches Beitzah)

**Seder:** Mishnah
**Tile:** [apps/beitza.html](../apps/beitza.html)
**Status:** Live (linked from index.html), added 2026-10-11

## What it covers
All 42 mishnayos of Maseches Beitzah (perakim 1 to 5). Each card gives the Mishnah, a short editor line on what the Gemara adds (labeled as editor wording), then the Gemara's teachings on it, each quoted verbatim, linked to its daf, and tagged by kind. Where the Gemara itself rules, the halacha line is shown. Each card has an empty slot for a mnemonic (סימן).

Ten kinds (tags): 1 העמדה, 2 הגדרת מונח, 3 גבול המחלוקת, 4 טעם נסתר, 5 שורש המחלוקת, 6 מוחלפת השיטה, 7 דלא כי האי תנא, 8 אינה להלכה (only where the Gemara shows the anonymous Mishnah is one view or not the ruling), 9 דיוק בלשון, 10 מציאות. Tapping a kind shows only the mishnayos that have it and dims the other teachings; tabs switch between the whole masechta and each perek.

## Sources
Mishnah: Sefaria, Torat Emet 357. Gemara: Sefaria, William Davidson Edition, Vocalized Aramaic. All 182 Gemara quotes were checked by script as exact substrings of the downloaded Sefaria text of Beitzah 2a-40b (pieces split on "..."); 0 failures. The 42 Mishnah texts match Sefaria after Unicode normalization. Checker and source dump: C:\Users\mswad\Dropbox\curly-barnacle-incoming\_PROJECT\beitza\src (verify.py, beitza_src.json).

## Files
`apps/beitza.html`, `apps/beitza.js` (render), `apps/beitza-data.js` (window.BEITZA_DATA).

## Open
- Mnemonics not yet written.
- Editor lines for 3:5 and 4:4 still mention the search for the tanna after those moves were dropped.
