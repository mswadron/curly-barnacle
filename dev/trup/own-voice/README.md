# Own-voice source recordings — trup

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

Correction: an earlier version of this README dated the recordings
2026-07-03. That was only the date they were uploaded to GPT. The recordings
themselves are from 2014.

**Voice attribution: unconfirmed.** Whether this is Mordy's own voice or a
teacher's recording shared with him (the folders are Dropbox shared folders)
decides the credit line and whether embedding is rights-clean. Confirm before
publishing more of it in a served app.

Downstream:

- The original ten Torah files are the source of the **Your Voice** bank in
  `apps/trup-real.html` and `apps/clarinet-lab.html`.
- `taamim_clarinet_contours.json` is GPT's librosa pitch-contour extraction of
  those ten. The other 13 Torah and 21 haftorah tropes have not been measured
  yet.

Not copied: `/simchos/TRUP/pashta katon` (11 KB, no extension, unidentified).

Filenames are lowercase with underscores; the original Dropbox names (with
spaces and apostrophes) are in the manifest.
