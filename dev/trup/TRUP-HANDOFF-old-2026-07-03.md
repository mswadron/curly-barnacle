# TRUP PROJECT — HANDOFF

Continuation doc for the Ta'amei HaMikra ("trup") interactive. Owner: **Mordy** (mswadron@gmail.com) — Ashkenazi, hears Litvish leining ~3×/week; he is the ground-truth ear for the first cell. Last substantive update: 2026-07-06.

**The point of the project is big.** It is a **complete, comparative atlas of ta'amei ha-mikra — every Jewish community's mesorah, across every kind of leining — with every melody _measured_ from a real recording, not guessed.** The current build is deliberately narrowed to the **yeshivish/Litvish** cell; that was a scoping choice, chosen first to *get the method right* (measurement pipeline + a sound Mordy trusts + the UI) before scaling to all the other communities and reading-types. Do not mistake the current narrowness for the goal.

---

## THE PROMPT

*Paste this into a fresh session to pick the project back up. It is self-contained.*

> You're continuing the **Ta'amei HaMikra ("trup") interactive** for Mordy (mswadron@gmail.com), an Ashkenazi/Litvish ground-truth listener. **The real goal is a complete, comparative atlas of cantillation — EVERY community's mesorah (Ashkenazi: Litvish/Polish/Yekkish/Western; Sephardic: S&P/Moroccan/Jerusalem; Mizrahi: Iraqi/Syrian/Egyptian/Persian; Yemenite; Italian) across EVERY reading-type (Torah, Haftarah, Esther, Eicha, Shir/Rus/Koheles, Yamim Noraim, Tehillim/Emes, and learning-nusach) — each melody _measured_ from a real recording of that community, evidence-graded.** It is deliberately narrowed right now to the yeshivish/Litvish cell to perfect the method first; do not treat that narrowness as the scope. This lives inside his **"Torah Interactive · לימוד"** study site at **github.com/mswadron/curly-barnacle** (GitHub Pages, **main** branch → https://mswadron.github.io/curly-barnacle/), alongside his other apps (nisyonos, negaim, tumah, mumim, Counts, chagavim, talmudflora, yom_kippur_avodah, the Jewish-ornithology guide, haftarah, zmanim). He separately runs **bloomline** (github.com/mswadron/bloomline → bloomline.app, a wildflower-route finder; sources in C:\Users\mswad\Dropbox\BLOOMLINE) — unrelated. **Do NOT push anything to his "limud labs" repo.**
>
> The active piece is `apps/`**`trup-real.html`** — a sound lab that plays *measured* pitch contours back through a browser clarinet. It currently carries **55 measured motifs**: **Your Voice** (Mordy's 10 own-voice recordings = ground truth for the yeshivish cell, embedded mp3 for A/B) and a proof-of-scale **Torah** (22) + **Haftarah** (23) set pitch-measured from **PocketTorah** (`rneiss/PocketTorahTrope`, GPL-3), shifted −12 st into his register. These are the **first cells of the atlas**, not the whole thing. Default playback is **CLARINET** (discrete, articulated notes) — he dislikes pitch **"slope"/glide**, which is only a secondary toggle. Own-voice recordings keep embedded audio; measured-from-source tropes are **link-only** (*Source ↗*). Also present: legacy `Trup.html` + `trup.js` + `trup-data.js`, `trup-calibrate.html`, and GPT's `taamim_clarinet_synth.html` (origin file: his 10 own-voice mp3s + librosa contours).
>
> **To scale:** the same extraction pipeline (below) fills any **community × reading-type** cell from that community's recordings. Grow the UI from today's single toggle into a **two-axis selector (community × reading-type)**.
>
> **House rules.** Yeshivish/Ashkenazi transliteration by default (Sephardic terms stay Sephardic). No "Claude-y" design — no Bricolage Grotesque, no eyebrow microlabels, no letterspaced-uppercase chips, no AI-defensive copy. Sefer aesthetic: Frank Ruhl Libre + Crimson Pro, maroon `#5a1421`, Hebrew RTL baked in. Evidence-graded, **no fake mesorah** — every motif needs a named source + grade; measured-from-recording = grade A-derived.
>
> **When you finish a change:** edit files on Windows (source of truth), then run git **via Desktop Commander** in the repo at `C:\Users\mswad\Claude\Projects\Torah JSX (1)` — `git config core.longpaths true`, set repo-local identity (`git config user.name mswadron` / `user.email mswadron@gmail.com`), commit, and **push to `origin` (github.com/mswadron/curly-barnacle) `main`**. **NEVER** run git inside the sandbox mount, and **NEVER** push to limud labs. Then report the live URL.

---

## The mission — all communities, all leining

The end state is a matrix. Each **cell = one community × one reading-type**, populated with motifs **measured from a real recording** of that community and evidence-graded. Yeshivish/Litvish was done first *only* to prove out the method; the same pipeline fills every other cell.

**Communities (mesoros / nusachim):**

- **Ashkenazi** — Lithuanian (Litvish / yeshivish), Polish–Hungarian (Chassidish), German (Yekkish; Reuchlin/Böschenstein 1518), Western-European.
- **Sephardic** — Spanish-Portuguese (S&P / Gaster, London–Amsterdam), Moroccan, Jerusalem-Sephardi.
- **Mizrahi / Eastern** — Iraqi (Baghdadi), Syrian (Aleppo / Halab), Egyptian, Persian.
- **Yemenite** — Baladi / Shami (the Babylonian eight-motif system).
- **Italian** — Italki.

**Reading-types (each has its own melody-set):**

- Torah (weekly kriah) · Haftarah · Megillas Esther · Eicha · Shir HaShirim / Rus / Koheles (often distinct tunes) · Yamim Noraim (High-Holy-Day Torah) · Tehillim / Ta'amei Emes (Iyov · Mishlei · Tehillim) · learning-nusach (Mishnah / Gemara) where it exists.

**Where we are in the matrix:** one community (Ashkenazi, via Mordy's own voice as ground truth + a full PocketTorah proof-set) across two reading-types (Torah, Haftarah). Everything else is open — and reachable with the pipeline below.

## Current state — `apps/trup-real.html` (the proving ground)

A single self-contained HTML sound lab, in Mordy's design system (maroon, sharp corners, Frank Ruhl Libre RTL Hebrew, trilingual he/se/en). Today's toggle:

| Toggle | Count | Source | Audio |
|---|---|---|---|
| Your Voice | 10 | Mordy's own recordings — ground truth for the yeshivish cell | embedded mp3 (`Original`) |
| Torah | 22 | PocketTorah, measured (pipeline proof-of-scale) | link-only (`Source ↗`) |
| Haftarah | 23 | PocketTorah, measured (incl. mercha-kefula) | link-only (`Source ↗`) |

*(This toggle is the seed of the eventual community × reading-type matrix — right now it mixes "source" and "reading-type" on one axis; splitting it into two axes is the next structural step.)*

**Two playback modes:**

- **Clarinet (default)** — measured note events as discrete, articulated pitches, *no sliding*. Timbre: chalumeau-register odd-harmonic spectrum (strong 1/3/5/7/9, near-silent evens = the hollow woody tone), a ~1.5 kHz body-resonance formant peak, a soft reed-breath onset, and vibrato that only enters after a note settles. The mode Mordy wants — he rejected pitch glide as unrealistic.
- **Glide (secondary)** — one oscillator slides through the measured contour (original GPT behavior). Comparison only.

Controls: transpose (default +12), tempo, brightness, breath, vibrato. Phrase builder + preset chains. Pitch-contour scope + extracted-event readout in the rail.

## Files (all in `apps/` unless noted)

| File | Role |
|---|---|
| `trup-real.html` | **THE ACTIVE ITEM.** 55-motif measured sound lab. Self-contained; data + engine inlined. |
| `taamim_clarinet_synth.html` | GPT's origin file — embeds Mordy's 10 own-voice mp3s + librosa contours. Archive/reference. |
| `Trup.html` + `trup.js` + `trup-data.js` | Legacy design-system app: Map / Pesukim / Kriyos / Tehillim / Timeline / Mesoros / Kolos; live Unicode ta'am parser; JE-1905 & measured banks; abcjs staff + MIDI export. It already models **multiple traditions × systems** — the natural home for the full matrix. |
| `trup-calibrate.html` | Standalone listening / calibration panel. |
| `TRUP-HANDOFF.md` / `../TRUP-HANDOFF.md` | This document. |
| `trup_full.json` (repo root) | Raw measured dataset for all 45 PocketTorah tropes (Torah + Haftarah). |

## Extraction pipeline (the engine that fills every cell)

Measuring any community's recording into motifs — proven, browser-based (the sandbox cannot fetch binary/CORS; the live Chrome connection can). This is the tool for the whole matrix, not just PocketTorah:

1. **Source map.** For a name-drill track (PocketTorah `torah-N`/`haftarah-N` = a cantor singing trope names): `data/text/<track>.xml` names the trope per `<