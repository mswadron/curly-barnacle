# Changelog

All notable changes to **Torah Interactive**. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/). Dates are YYYY-MM-DD.

## [Unreleased]

### Added
- `apps/piyut-rishonim.html` (+ `.js`, `-data.js`), new index section Tefilah & Liturgy and its first tile: Piyut in the Rishonim. Every place Rashi (Chumash, Nach, Shas) and Tosafos quote a line of piyut, 61 entries, each with the quoted line, the Rishon's words verbatim, the piyut stanza as it stands in the machzor (27 located on Sefaria), and when it is said, ordered by the calendar from Rosh Hashanah or by sefer. Doc: `docs/piyut-rishonim.md`. (2026-10-07)
- Arba Minim: corrected the origin of the murkav psul (Katzenellenbogen of Padua via Rema 126 and the Maharam Alshich in Tzfas, not Italy alone); added Chasam Sofer OC 207's thick-rind sign, strain drift and regional-strain sources (Sukkah 36a, OC 648:17), and nucellar polyembryony. (2026-10-01)
- `apps/maharils_moon.html` and index tile (Luach & Reference): Maharil's Moon. The sky over Mainz on Hoshana Rabbah night for every year of the Maharil's rabbinate (1387 to 1426) plus 2026, around the incident in Sha'arei Teshuvah OC 664:1 (quoted verbatim, linked). Night altitude chart, forty-year moonrise/sunset chart, orbit ellipse, brightness breakdown, cloud optical-depth model with time, moon-height and year sliders, and a For teaching note on clock time vs sha'os zmaniyos. Doc: `docs/maharils-moon.md`. (2026-09-30)
- `apps/arba_minim-lineage.js`: Esrog lineages section in The Four Species as Plants. Orchard-by-orchard history (Yanova/Calabria, Corfu, old Eretz Yisrael, Chazon Ish, Ordang/Braverman/Ludmir/Shlomai, Moroccan, Yemenite), what was claimed against each and who relied on it, plus the acharonim on the murkav signs. Also corrected the Chazon Ish provenance line in the strains card. (2026-09-28)
- `apps/arba_minim.html` (+ `-data.js`, `.js`) and index tile: The Four Species as Plants. Botany x sugya for esrog, lulav, hadas, aravah; grafting vs cross-breeding vs cross-pollination and what DNA can see; Deri; meshulash; esrog blemish guide by region. Sources verbatim from Sukkah 32a-36a, OC 645-648, Magen Avraham 648:23. (2026-09-27)
- `docs/` — documentation set: a master index (`docs/README.md`) plus one sub-doc per live tile (16 tiles).
- `CHANGELOG.md` — this file.
- `site-chrome.js` — one shared UI layer injected into every app and the index. Provides: a "Beta" chip with an expandable note (framed as a feature, links back to the מקור ethos); a redesigned **home button** (house icon, replaces the old 2×2 grid glyph; auto-removes the legacy inline `#lib-home`); and a **"Leave a note"** feedback panel with Google sign-in. Trigger icon: outlined speech bubble (option A).
- Login + private comments via **Firebase** (Auth + Firestore), wired in `site-chrome.js`. Dormant until `firebase-config.js` exists, so the site works unchanged until it's switched on. Sign-in is required to comment; notes are private (readable only by the owner in the Firebase console).
- `firebase-config.example.js` — template to copy to `firebase-config.js`.
- `docs/SETUP-login-comments.md` — click-by-click Firebase setup, including the Firestore security rule that keeps feedback private.
- Contributions: a single italic line in the index footer — "Free to use, always — contributions to help it grow are welcome" — linking to paypal.me/swadron. No dedicated page. Torah content stays free; support is additive.
- Live Firebase project `torah-interactive` connected: `firebase-config.js` written with real config; Google sign-in, Firestore, private security rule, and the `mswadron.github.io` authorized domain all set up.

### Wired
- Added the `site-chrome.js` include before `</body>` in all 20 live app pages and `index.html` (relative `../site-chrome.js` in `apps/`, `site-chrome.js` at root).

### Added (zmanim defaults)
- The Zmanim app now remembers your defaults: chosen location, the view (concept + filter), and a preferred shita per zman. Tap the star (★) on any method to set it as your default — the row highlights. Saved per-device with no login needed; when signed in, it syncs across devices via Firestore (`users/{uid}`). Login is additive — the Torah content and the app stay fully open.

### Changed
- Reorganized the repository for a smaller working set:
  - `apps/_archive/` now holds orphan / superseded / experimental pages that are **not** linked from `index.html`: `Trup.html` (+ `trup.js`, `trup-data.js`), `arayot-v6.html`, `clarinet-lab.html`, `trup-calibrate.html`, `zimanim.html`.
  - `dev/sources/` now holds the uncompiled `.app.js` sources (`mumim`, `negaim`, `nisyonos`, `tumah`, `haftarah`) — the `.app.compiled.js` versions remain in `apps/` and are what the pages load.
  - `dev/trup/` now holds trup reference material moved out of the repo root: `TRUP-HANDOFF.md`, `TRUP-HANDOFF.docx`, `trup_events.json`, `trup_full.json` (none are served by any app). The stale older `apps/TRUP-HANDOFF.md` was moved here as `TRUP-HANDOFF-old-2026-07-03.md`. Root now holds only `index.html` and `README.md`.

### Removed
- `apps/taamim_clarinet_synth_bundle.zip` — 3.1 MB, unreferenced.
- `apps/.fuse_hidden0000000700000001` — leftover junk from an interrupted edit.

### Fixed
- Restored `haftarah.html` (+ `haftarah.app.compiled.js`), `trup-real.html`, and `taamim_clarinet_synth.html` to `apps/` after they were briefly archived — they are live tiles linked from `index.html`.

---

_Older history predates this changelog. See git log for commit-level detail._
