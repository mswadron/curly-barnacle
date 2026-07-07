# Ta'amei HaMikra · טַעֲמֵי הַמִּקְרָא

**Seder:** Luach & Reference
**Tile:** [apps/trup-real.html](../apps/trup-real.html) (+ clarinet synth view)
**Status:** Live (linked from index.html) — two views under one tile

## What it covers
The niggun of the ta'amim, measured from real leining and sounded back — each ta'am's melody taken from a recorded voice rather than guessed, and played on a clarinet. The first cells of a comparative atlas of leining across the communities: Torah and Haftarah measured so far.

## Sources
Ta'amei HaMikra · Torah · Haftarah · measured recordings

## Files (live)
- `apps/trup-real.html` — the measured sound lab (primary view)
- `apps/taamim_clarinet_synth.html` — clarinet synth · GPT (alternate view)

## Related reference (in `dev/trup/`, not served)
- `dev/trup/TRUP-HANDOFF.md` / `TRUP-HANDOFF.docx` — handoff / PRD notes (current, 112 lines)
- `dev/trup/TRUP-HANDOFF-old-2026-07-03.md` — superseded earlier handoff, kept for reference
- `dev/trup/trup_events.json`, `dev/trup/trup_full.json` — trup event data
- `dev/sugya_data.md` — source notes

## Archived (older / experimental — in `apps/_archive/`)
- `Trup.html` + `trup.js` + `trup-data.js` — earlier trup app, superseded by `trup-real.html`
- `trup-calibrate.html`, `clarinet-lab.html` — calibration / lab experiments

## Notes
Two big self-contained HTML files (~4.7–4.8 MB each) because measured audio is embedded. The `trup-real.html` measured lab is the current direction; the clarinet-synth view is the GPT-preferred synthesis. Both are linked from the index tile.
_(add further design decisions, data provenance, open questions)_
