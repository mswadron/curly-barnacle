# Source recordings — trup (Boruch Green)

**Recorded by Boruch Green, used with permission.** (The folder name
`own-voice` is historical: these were first assumed to be Mordy's voice.)

**Canonical master:** Dropbox `/simchos/TRUP/` — `TRUP REG/` (Torah) and
`HAFTORAH/` (both shared folders), plus `trup1.pdf` / `trup2.pdf`. Never edit
there. **This folder** is a verified working copy for the site: every file was
byte-matched to Dropbox's content_hash on 2026-10-02. `manifest.json` maps each
file here to its Dropbox source, recording date, size and sha256.

Duplicates resolved 2026-10-02: the ten mp3s that were here before were
byte-identical copies of `TRUP REG` files (same sha256). The folder now holds
the complete set.

| Set | Count | Recorded | Path |
|---|---|---|---|
| Torah trope names | 23 | 2014-09-13 | `*.mp3` (this folder) |
| Haftorah trope names | 21 | 2014-12-08 | `haftorah/01–21_*.m4a` |
| Haftorah brachos (before + 4 after) | 5 | 2014-12-08 | `haftorah/22–26_*.m4a` |
| Trope charts | 2 | 2014-11-30 | `charts/trup1.pdf`, `charts/trup2.pdf` |
| Voice note: pashta into zakef katon | 1 | 2017-02-14 | `pashta_katon.opus` |

Correction: an earlier version of this README dated the recordings
2026-07-03. That was only the date they were uploaded to GPT. The recordings
themselves are from 2014.

**Voice attribution: Boruch Green, used with permission** (confirmed by
Mordy, 2026-10-02). Credit him wherever these recordings are played or
measured. The apps' former "Your Voice" label now reads "Boruch Green".

Downstream:

- The original ten Torah files are the source of the **Boruch Green** bank in
  `apps/trup-real.html` and `apps/clarinet-lab.html`.
- `taamim_clarinet_contours.json` is GPT's librosa pitch-contour extraction of
  those ten. The other 13 Torah and 21 haftorah tropes have not been measured
  yet.

`pashta_katon.opus` was `/simchos/TRUP/pashta katon` in Dropbox: a 5.2 s
WhatsApp voice note (Ogg/Opus, mono, 16 kHz) saved without its extension.
Same voice and register as the Torah set, singing a pashta into a zakef
katon.

Filenames are lowercase with underscores; the original Dropbox names (with
spaces and apostrophes) are in the manifest.
