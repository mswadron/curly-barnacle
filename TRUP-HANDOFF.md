# TRUP PROJECT — HANDOFF (2026-07-03)

Continuation doc for the Ta'amei HaMikra site. Everything below is verified state, not aspiration. Owner: Mordy (Ashkenazi, hears Litvish leining 3×/week — he is the ground-truth ear).

## Files (all in `apps/`)

| File | Role |
|---|---|
| `Trup.html` | Shell + all CSS (design-system compliant: maroon `#5a1421`, sharp corners, `--bg #f7ecec`). Loads abcjs\@6.4.4 (jsDelivr) + Taamey Frank CLM font (jsDelivr ← Sefaria repo, verified live) |
| `trup-data.js` | ALL data → `window.TRUP_DATA`. Taamim (26 prose + 16 emes, trilingual he/se/en), 8 kriya systems, 10 traditions w/ earliest-documentation records, 21-event dated timeline, motif banks, 6 MAM specimen texts, phrases, recordings registry, `measuredPT` |
| `trup.js` | Render + engines. Views: Map, Pesukim, Kriyos, Tehillim, Timeline, Mesoros, Kolos. Sticky top bar = kriya-system chips + tradition chips + grade badge. `window.TRUP_DEBUG={parseVerse,resolveSeq,shiftNote,seqToABC,state}` |
| `trup-calibrate.html` | **THE ACTIVE ITEM.** Standalone listening panel: pashta/munach/zarka × 11 candidates each, YES/~ marking, report line at bottom. Candidate #11 of each = MEASURED from PocketTorah recording |

## Engines (all working, verified by node smoke tests)

- **Parser**: live Unicode ta'am parser (codepoints U+0591–05AE), prose + emes resolution incl. paseq-combos (munach→munach-legarmeh, kadma+paseq→azla-legarmeh, oleh v'yored via U+05AB, revia mugrash via U+059D+U+0597). 40-assertion test suite passed against real MAM text.
- **Audio**: clarinet-style synth (odd harmonics 1/3/5, sustained envelope, lowpass) — replaced piano per Mordy ("Eastern European → clarinet"). Recitative pacing: 0.30s/beat base, short notes clipped 15%, word gaps 0.12 beats. Tempo control ♩−/♩+ (60–170%) + transpose ±6 st in rail; tonic key marked on keyboard.
- **ABC layer**: `seqToABC()` converts motif arrays on the fly → abcjs staff notation in rail + Download MIDI button. Single source of truth stays the `[[note,beats]]` arrays.
- **Grades UI**: banks carry `_grade`; C shows warning ("pedagogic approximation…"), D/E show PROTOTYPE label + grey play. Top bar shows current grade badge.

## Locked rules (consensus PRD — do not relitigate)

- Evidence grades A–E; **No Fake Mesorah**: nothing sounds "official" below grade B; every motif needs named source + grade.
- de Pinna 1699 = "early and highly important published notation" (NOT "earliest"). 1911 Aisbeda/Asriqi = "early phonograph recordings". Baer 1852 = emes *grammar* source.
- Maqam map locked (per pizmonim.org): Torah Sigah · Mishlei Sigah-variant · Tehillim Nahwand(Syr)/Rast(Eg) · Iyov "undeveloped Rast", frame read like Rus until 3:2 · Shir Bayat · Rus Hoseni · Eicha Ajam · Esther Saba-Mouhayar · Mishnah Nawah.
- Emes = separate system (dechi, oleh v'yored, revia katan/gadol/mugrash, tzinnor); never mixed with liturgical psalm nusach. Mercha kefulah = prose rarity (5× Torah).
- REJECTED as hallucinations: "OpenMabin", "Vicki Cantillation Project", Leipzig-Mahzor-notation claim.
- Recordings layer = link-only; rights stay with source sites.

## Sources established

- **JE 1905 plates** (Cohen, Jewish Encyclopedia III pp. 539–547, Wikimedia Commons): comparative notation, rows "Ashkenazim 1902" (Litvish), "Ashkenazim 1518" (Yekkish/Reuchlin), Sephardim, Morocco, Egypt&Syria, Bagdad, Penitential, Prophets, Esther, Lamentations, Ruth. p. 539 = fully worked Bereishis 22:1 + coda. I transcribed both Ashkenazi Torah rows from screenshots → current grade-B banks (frame: tonic G4, reciting B4, tenor D5).
- **PocketTorah** (`rneiss/PocketTorahTrope`, GPL-3): `data/audio/*.mp3` = sung trope NAMES; `data/labels/*.txt` = comma-sep start-times per name; `data/text/*.xml` = which trope each segment is. torah-1: tipcha/esnachta/munach/mercha · torah-2: sof-pasuk · torah-3: katan/pashta/mahpach/kadma · torah-4: revia · torah-5: kadma-azla · torah-6: gershayim/geresh · torah-7: darga/tevir · torah-8: telishos · torah-9: pazer · torah-10: yetiv · torah-11: zakef-gadol · torah-12: zarka/segol.
- **Extraction method (proven)**: in-browser (Chrome tab on any page) fetch repo mp3 → decodeAudioData → autocorrelation (50ms win/20ms hop, 85–400Hz, half-lag octave check, median-5 smoothing, octave-snap to local median) → segments `[midi, sec]`. Code pattern saved as `window.ptClean` in the session; rewrite from this spec.
- Timeline anchors: Nechemiah 8:8 → Bavli letter-notation (geonic) → Palestinian dots → Tiberian 7th–9th c. → Cairo Codex 895 → Aleppo ~930 + Dikdukei HaTe'amim → Leningrad 1008 → ibn Bil'am 11th c. → Ovadiah HaGer c. 1102–50 → 13th c. universal → Reuchlin/Böschenstein 1518 → de Pinna 1699 → Bagdad 1743 → Baer 1852 → JE 1905 → 1911 recordings → Idelsohn 1914–32 → Rosowsky/Binder/Jacobson.

## THE OPEN PROBLEM

Mordy rejects the synthesized sounds ("almost none reflect reality"). Fixed so far: tempo (his #1 complaint) + clarinet timbre. Two competing pitch-frames now on the table:

1. **JE-1905 frame** (current banks): tonic G, reciting a THIRD up (B). 
2. **PocketTorah measured frame** (`TRUP_DATA.measuredPT`, 8 taamim, real durations): tonic G, reciting a FIFTH up (D). Different school. E.g. munach = A3·D4·C4·A3 (leap-4th, walk down); zarka = long descent D4→G3; pashta descends home.

**WAITING ON**: Mordy's picks from `trup-calibrate.html` (his report line, e.g. "pashta #3, munach #11, zarka none, transpose +2"). Then:
- If #11s win → run the extraction over all torah-1…12 (+ haftarah/esther/eicha/megillot files) and rebuild the ashkE banks from measured data (grade A-derived).
- If the classic candidates win → adjust JE bank to the picked shapes.
- If nothing wins → repeat extraction against Virtual Cantor mp3s (virtualcantor.com, Eastern-Ashkenazi standard) or Judaica Press Leining Master (most yeshivish).

## TropeTrainer findings (architecture to borrow, data untouchable)

Next.js + Firestore; melodies as **ABC notation** via abcjs (adopted ✓); per-sefer voicing slots incl. SEPARATE Shir/Rus/Koheles (we still lump "3 Megillos" — split pending); voicing systems credited to named notators (Binder, Rosowsky, Goldenberg, Chabad, British-W-Europe, Gaster S&P, Aleppo…) = our grade system in commercial form; settings: vocal-range presets (Child…Bass), divineNameMode, trope-group coloring, sheva-na marks in text, ta'am elyon/tachton toggle; React model ships precomputed `wordTropes` + `tropeGroups` + per-passage `custom_voicing` exceptions (their Az Yashir/Dibros/Chazak mechanism). Word spans id'd `passage-chapter-verse-word`, font = Taamey Frank (adopted ✓).

## Roadmap queue (in order)

1. Calibration verdict → rebuild banks from confirmed school (extraction pipeline above).
2. Full-sefer extraction: PocketTorah also has complete parsha/haftarah recordings w/ word timestamps — could align measured audio to our parsed pesukim for word-by-word real playback.
3. Precompute wordTropes/tropeGroups JSON per sefer (build step; live parser stays as generator).
4. `custom_voicing` exceptions layer (Az Yashir, Dibros elyon, Masa'os, Chazak coda).
5. Split 3-Megillos into separate system slots; vocal-range presets over transpose.
6. Deploy to GitHub Pages (curly-barnacle repo; commit via Desktop Commander on Windows — NEVER git inside the sandbox mount).

## Environment gotchas (Cowork-specific)

- Sandbox mount of the project folder serves **stale truncated file sizes** after edits. To verify: PowerShell (Desktop Commander) `Copy-Item` the file to a NEW name (`_v.bin`), wait for sync loop in bash, `node --check` the copy. Node is NOT installed on Mordy's Windows.
- Chrome extension can't navigate `file://`; test headlessly (fake-DOM boot script) instead.
- web_fetch can't read raw-wikitext/binary; use Chrome tab JS fetch for APIs/binary analysis (CORS: github raw + api = open).
- MAM Hebrew from Sefaria contains HTML artifacts (`<span class="mam-…">`, `&thinsp;`, paseq as separate token) — parser handles; keep `.replace(/<[^>]*>/g,'')` discipline.

## Voice & style

Concise, direct, minimal fluff. Yeshivish transliteration in `se` fields (esnachta, zakef, sof pasuk, Bereishis). Design system: no gradients/gold/rounded corners; Hebrew RTL baked in; maroon everywhere. He responds well to honest evidence-grading and being told exactly what is guess vs. measured.
