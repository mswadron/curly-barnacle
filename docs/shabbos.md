# The Mishnah as Torah She-Ba'al Peh · משנה כתורה שבעל פה (Maseches Shabbos)

**Seder:** Mishnah
**Tile:** [apps/shabbos.html](../apps/shabbos.html)
**Status:** Live, first full draft 2026-10-12

## What it covers
All 139 mishnayos of Maseches Shabbos (24 perakim), built on the rules settled on the Beitzah page (see beitza.md): each card has the Mishnah, an editor line in the approved pattern, the Gemara's teachings on it quoted verbatim and tagged (eleven kinds), machlokes as one box with each side by speaker, a halacha line only where the Gemara rules on the Mishnah's own dispute and the sugya leaves it standing, and a פירוש button per quote that loads the Steinsaltz commentary for that exact segment.

## Sources and checks
Mishnah: Sefaria, Torat Emet 357. Gemara: Sefaria, William Davidson Edition, Vocalized Aramaic. All 697 quote pieces (476 boxes) checked by script as exact substrings of the downloaded text of Shabbat 2a-157b: 0 failures. Source dump and fetch script: C:\Users\mswad\Dropbox\curly-barnacle-incoming\_PROJECT\shabbos\src.

## Files
`apps/shabbos.html`, `apps/shabbos.js` (the Beitzah renderer pointed at window.SHABBOS_DATA, Hebrew numerals to 39), `apps/shabbos-data.js`.

## Review and chips (2026-10-12)
- Independent review of all 24 perakim: 16 boxes and 4 duplicate machlokes sides removed, 14 retagged, 3 speakers fixed, 16 editor lines rewritten. 460 boxes. Cards 1:8 and 9:4 have no boxes (the Gemara adds nothing to their wording; the editor line says so).
- Status chips on machlokes sides, same rules as Beitzah: 12 נדחה (the Gemara's own אלא / קשיא, linked), 26 הלכה / וכן הלכה (Gemara's own ruling, or Rambam / Shulchan Aruch quoted and linked). Gemara chip lines checked by script against the source dump; posek lines re-fetched and checked independently.

## Open
- Second review pass (Beitzah had two).
- Mnemonics.
