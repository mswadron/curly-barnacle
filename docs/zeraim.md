# Seder Zeraim — Plants & the Land-Mitzvos · זְרָעִים

**Seder:** Zeraim
**Tile:** [apps/zeraim.html](../apps/zeraim.html)
**Status:** Live (linked from index.html)

## What it covers
One shared database of Seder-Zeraim plants, sortable by taxonomy — with each masechta layering its own aspects onto the same crops: Kilayim pairings, Terumos, Maasros, and Maaser Sheni. A juxtaposition graph sets the three tithes side by side by produce category, and every crop carries the ripening stage from which it becomes chayav. Mishnah and Rambam brought verbatim from Sefaria; the science is a springboard.

## Sources
Kilayim · Terumos · Maasros · Maaser Sheni · 84 plants

## Files
`zeraim.html` loads these in order (all in `apps/`):
- `talmudflora-data.js` — shared plant base (also used by Talmud Flora)
- `zeraim-maasros-data.js`, `zeraim-terumos-data.js`, `zeraim-maaser-sheini-data.js` — the tithe layers
- `zeraim-tithes-matrix.js` — three-tithes juxtaposition matrix
- `zeraim-culinary-data.js`, `zeraim-ancient-data.js`, `zeraim-usetype-data.js`, `zeraim-extra-species.js` — supplementary crop data
- `zeraim-glosses-data.js` — glosses
- `zeraim-core.js` — shared logic
- `zeraim.js` — renderer

## Notes
Shares `talmudflora-data.js` with the Talmud Flora tile — edits to that file affect both. See [talmudflora.md](talmudflora.md).
_(add further design decisions, data provenance, open questions)_
