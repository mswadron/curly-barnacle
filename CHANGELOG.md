# Changelog

All notable changes to **Torah Interactive**. Format loosely follows
[Keep a Changelog](https://keepachangelog.com/). Dates are YYYY-MM-DD.

## [Unreleased]

### Added
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
