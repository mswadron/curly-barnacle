# ZmanimMethods.jsx — Handover

A single-file React artifact comparing halachic-time (zmanim) methods, with a validated solar/lunar engine, Sefaria-anchored primary sources, a twilight side-graph, and a per-row equation system in a shared variable language. Fully client-side, no network calls at runtime.

## Files

- **Deliverable:** `/mnt/user-data/outputs/ZmanimMethods.jsx` (~1047 lines, ~92 KB source; compiles to ~100 KB cjs).
- Dormant older sibling: `/mnt/user-data/outputs/ZmanimLearner.jsx` (ignore unless asked).
- This doc: `/mnt/user-data/outputs/ZmanimMethods_HANDOVER.md`.

## How to work on it (validation harness)

After any edit, always re-validate compile + SSR render:

```
# compile jsx -> cjs
npx esbuild ZmanimMethods.jsx --bundle --format=cjs --loader:.jsx=jsx \
  --outfile=/tmp/app.cjs --external:react --external:react-dom

# SSR render (use BARE require('react') / require('react-dom/server'),
# NOT absolute paths — absolute-path requires throw a spurious
# "Invalid hook call" two-React-copies error that is not a real bug)
node -e "const R=require('react'),S=require('react-dom/server'),M=require('/tmp/app.cjs');
console.log(S.renderToString(R.createElement(M.default)).length)"
```

Expanded-row content (the `eq` chip, derivation, Hebrew) only renders when a row is open (`openRow` state), so it will not appear in default SSR output. That is expected; the render path still compiles.

## User and working standards (respect these)

- User is an advanced Torah learner and an Excel/VBA developer. Mostly on mobile.
- **Terse output. No em dashes.** Working deliverables over instructions.
- **Sourcing discipline:** pre-modern claims must be verbatim from Sefaria with the Hebrew shown. He rejects unsourced rabbinic claims and will check. Modern poskim not on Sefaria are cited by sefer, never dressed up as verbatim text.
- He pushes back hard and fast on errors, hand-waving, or verbosity. Confirm halachic framing before baking it in; he likes to vet.

## Engine (all validated in node, do not silently change)

- **Solar:** NOAA/Meeus, ported from KosherJava (LGPL). `solarEvent()`, `sunDepression()` (geometric depression; sea-level sunrise = 0.833 deg), `sunAzimuth()`.
- **Moon:** Schlyter. `moonPos/moonAltAz/moonEvents/moonIllum`.
- **Molad:** Dershowitz-Reingold. `moladData()`, `hebrewMonthYear()` via Intl hebrew calendar. Month interval 29.530594 d.
- **Stars:** `starsTonight()` computes per-date/place appearance order from magnitude + airmass extinction; `starAltAz()` via GMST. 21-star bright catalog with full physical data (spectral/lum class, parallax, ang. diameter, Teff) and derived radius/luminosity.
- Per-place calc context exposes: `c.sr` (sunrise), `c.ss` (sunset/shkiah), `c.srVis`/`c.ssVis` (elevation-adjusted), `c.dayMs` (sunrise-to-sunset span, the Gra day), `c.addMin(t,m)`, `c.prop(start,end,hours)` (proportional hour = (end-start)/12), `c.dR(deg)` (sunrise at depression), `c.dS(deg)` (sunset at depression).

## UI features (complete)

- Concept tabs: alos, misheyakir, netz, shma, tfilla, plag, shkia, tzeis.
- Per concept: method rows sorted by time, tagged by TYPE (degrees / fixed / zmaniyos / horizon), type filter, spread-rail, minute-spread summary.
- Tap-to-expand rows: show **equation chip** (gold, monospace, top of detail), derivation prose, verbatim Hebrew, Sefaria link.
- Per-concept SOURCES block: verbatim Hebrew + own English + Sefaria link + variance note.
- Moon & Molad panel (rise/set + compass, illumination, molad in Jerusalem + local time, chalakim format).
- Sunrise/sunset azimuth line in netz/shkia.
- Twilight side-graph: depression bands Day/Civil/Nautical/Astronomical/Night, stars plotted by appearance depth, numbered opinion ticks that jump to rows, minutes-after-sunset ruler, star detail cards.

## Equation / variable system (added this session)

Every row carries an `eq` field rendered as a gold chip at the top of its expanded detail. Shared variable language, defined once in the methodology note:

- **S** = shkiah (sunset, sun center 0.833 deg below horizon). **N** = hanetz (sunrise).
- **mil** = walking unit; 40 mil per day (Pesachim 93b).
- **M** = length of one mil in minutes. Disputed: 18 (Shulchan Arukh l'chatchila; Shulchan Arukh HaRav), 22.5, 24 (Magen Avraham, Pri Chadash, Chok Yaakov, Gra) — per Biur Halacha OC 459:2.
- **H** = sha'ah zmanit = D/12. **D** = day-span (Gra: N to S; MGA: alos to tzeis).
- **A, T** = stretched MGA dawn/nightfall bounds.
- **theta** = sun depression in degrees. Degree rows fire when the sun reaches theta; the theta values are calibrated to reproduce a minute-shiur at the Yerushalayim equinox, then rescale by latitude/season.

## Consolidated methodology note (added this session)

Collapsible block at bottom of the panel ("Method, variables and sources", `methodOpen` state), scrollable. Contains: the variable legend, the mil chain (3/4 mil from Shabbat 34b -> mil-time from Pesachim 93b -> the 18/22.5/24 split per Biur Halacha 459:2), the degrees explanation, and an honesty note (verbatim vs calibration). The three gemara/Biur Halacha quotes in it are verbatim from Sefaria.

## Current row inventory (57 rows, all with `eq`)

**alos:** 72 / 90 / 96 / 120 min before sunrise [fixed]; 72 / 90 zmaniyos [zmaniyos]; 16.1 / 18 / 19.8 / 26 deg, Baal HaTanya 16.9 deg [degrees].

**misheyakir:** 11.5 / 11 / 10.2 deg [degrees]; 60 / 36 min before sunrise [fixed].

**netz:** Sea level (mishor) / Visible (elevation-adjusted) / Netz amiti (Baal HaTanya) [horizon].

**shma:** Gra [zmaniyos]; MGA day bounded 72 / 90 min [fixed]; MGA bounded 16.1 / 18 / 19.8 deg [degrees]; Baal HaTanya [zmaniyos].

**tfilla:** Gra; MGA 72 / 90 min; MGA 16.1 / 19.8 deg; Baal HaTanya.

**plag:** Gra; MGA 72 min; MGA 16.1 deg; Baal HaTanya.

**shkia:** Sea level / Visible / Shkia amitis (Baal HaTanya) [horizon].

**tzeis:** 3.7 / 3.8 / 4.8 / 5.95 deg, Baal HaTanya 6 deg, 7.083 deg (3 medium stars), 8.5 deg (3 small stars) [degrees]; 13.5 / 18 / 42 / 50 / 72 (RT) / 90 (RT) min [fixed]; 72 zmaniyos (RT), **Achtel 1/8 day (Brisk)**, **Sekstel 1/6 day (extreme Brisk)** [zmaniyos]; 16.1 / 18 deg (RT) [degrees].

## Sourcing status

**Verbatim from Sefaria this session (solid):**
- Shabbat 34b — bein hashmashot = 3/4 mil.
- Pesachim 93b — 40 mil (10 parsa) per day, the 5+30+5 partition.
- Pesachim 94a — R' Yochanan 5 mil = rakia 1/6 of day; R' Yehuda braisa 4 mil = rakia 1/10; "tiyuvta d'Rava tiyuvta d'Ulla"; R' Yochanan's "ana bimama hu d'amari... d'ka chashvin d'kadma vachashucha".
- Biur Halacha OC 459:2 — mil = 18 (mechaber l'chatchila, + Shulchan Arukh HaRav), 22.5, or 24 ("shlish sha'ah v'chelek 15 min hasha'ah"; MA, Pri Chadash, Chok Yaakov, Gra).

**Cited by sefer (not on Sefaria, never quoted as verbatim):** Igros Moshe, Tukachinsky Luach, Yisrael VeHazmanim, Peninei Halacha, Ohr Meir, B. Cohn luach.

**Brisk achtel/sekstel:** gemara (Pesachim 94a) is the cited text for the 4-mil/1-8 and 5-mil/1-6; Brisk attribution and the "mostly zmaniyos in practice, small faction does sekstel" framing are oral mesorah (e.g. Uvdos veHanhagos leBeis Brisk), labeled as practice, not text.

## Changes made this session

1. Added `eq` to all 57 rows; render as gold chip at top of expanded detail (CSS `.zm-roweq`).
2. Added the collapsible consolidated methodology note (`methodOpen`).
3. **Correction:** old tzeis "24 min" row was incoherent (labeled 3/4 mil but 3/4 x 24 = 18). Replaced with **18 min** = `S + 3/4 M, M=24`, the real 3/4-mil-at-the-24-min-mil shiur. Flagged to user.
4. **Correction to earlier memory:** the 24-min mil is MA / Pri Chadash / Chok Yaakov / Gra (per Biur Halacha 459:2), not primarily Rambam as previously stated.
5. Added two tzeis zmaniyos rows on the Gra day-span, self-sourced verbatim to Pesachim 94a:
   - **Achtel, 1/8 day (Brisk):** `S + D/8` (= 1.5 zmaniyos hrs; 90 min at Yeru equinox). The surviving 4-mil tzeis read against the 32-mil daytime.
   - **Sekstel, 1/6 day (extreme Brisk):** `S + D/6` (= 2 zmaniyos hrs; 120 min at equinox). R' Yochanan's 5-mil, the side the braisa is a tiyuvta against; abandoned opinion, small faction.

## Open / pending items

1. **alos relabel (pending):** apply the same 94a logic to the dawn side. The alos "90 zmaniyos" already computes `dayMs x 90/720` = 1/8 of the day but is not labeled as the achtel/survivor; the alos "72 zmaniyos" is `dayMs/10` (1/10 of the *daytime*, engineered to land on 72) and is mis-framed as the gemara's clean fraction. Plan: relabel 90-zmaniyos as the 1/8 survivor, fix the 72-zmaniyos eq so it does not pose as the gemara's 1/10, note the 1/6 as the refuted reckoning. User said tzeis-only for now; this is queued.
2. **Tighten tzeis "50 min" (Rav Moshe) row:** currently reads as his Shema/motzaei-Shabbos nightfall. It should read specifically as his **motzaei-Shabbos chumra** (safek d'oraysa), since for ordinary weekday tzeis he holds a shorter time. Pending user go.
3. **Add a Rav Henkin (R' Yosef Eliyahu) row:** same Geonic short-fixed-minute camp, leading opponent of importing Rabbeinu Tam to America. Blocked on pinning his exact figure and source (Eidus L'Yisrael / collected Kisvei; not on Sefaria). Do not add a guessed number.
4. **Methodology note still paraphrases the 18/24 attributions.** Optional: pull Biur Halacha 459:2 (and a Rambam ref) as their own quoted lines, the way per-concept source blocks already quote, so the attributions sit on cited text. (Note: Igros Moshe and Rav Y.E. Henkin's zmanim works are confirmed absent from Sefaria; only B'nei Banim by his grandson is there.)

## Offered earlier, not requested

Widen star catalog to hundreds; bolometric luminosity with BC; live satellite passes via TLE (needs network); a second ruler counting mil-units; move SA netz/shkia anchors to row level.
