# Fix prompts — curly-barnacle backlog (written 2026-07-08)

**How to use:** paste the COMMON PREAMBLE plus exactly ONE task block into a fresh session.
Tasks are independent unless marked. Written so a smaller model can execute safely.

---

## COMMON PREAMBLE (paste first, always)

> You are working on Mordy's Torah Interactive site. Repo on Windows at
> `C:\Users\mswad\Claude\Projects\Torah JSX (1)` (branch main → pushes auto-deploy via
> Cloudflare Pages to limudlab.com; GitHub Pages mirror). Live apps in `apps\`; retired
> files in `apps\_archive\`; working docs in `dev\`.
>
> **Environment rules (violating these has corrupted work before):**
> - Edit files on the Windows paths with the file tools. NEVER run git inside the bash
>   sandbox mount. Run git via Desktop Commander in the repo dir; if identity is missing:
>   `git config user.name mswadron` / `git config user.email mswadron@gmail.com`.
> - The sandbox mount can serve STALE or TRUNCATED reads of repo files. To verify or
>   compile in the sandbox, first Copy-Item (Desktop Commander) the file into the Cowork
>   outputs folder under a NEW filename each round (overwrites do not propagate), confirm
>   byte size matches on both sides, then work on that copy.
> - Recompiling the React apps (nisyonos, negaim, tumah): source of truth is
>   `dev\sources\*.app.js`. Compile in the sandbox with @babel/cli installed in `~/` (NOT
>   /tmp — permissions), config `{"presets":[["@babel/preset-react",{"runtime":"classic",
>   "development":false}]]}` — Babel 8's default automatic runtime (`_jsxDEV`) BREAKS these
>   script-tag React pages. After compiling, grep the Windows-side result for `jsxDEV`
>   (must be 0) and smoke-test with jsdom + global React/ReactDOM. Copy compiled back to
>   `apps\*.app.compiled.js`.
> - jsdom smoke rendering works for nisyonos/negaim/mumim; it HANGS on
>   haftarah/Karnayim/zmanim (pre-existing harness issue, not a bug) — for those use
>   `node --check` plus targeted unit tests of any function you changed.
>
> **House rules (locked):** yeshivish/Ashkenazi transliteration (Shabbos, haftaros,
> machlokes; NOT Shabbat/haftarot/machloket) except inside Sefaria URLs and canonical
> work titles, which must stay exactly as Sefaria spells them. No Bricolage Grotesque,
> no eyebrow microlabels, no letterspaced-uppercase chips, no AI-defensive copy
> ("verified", "anti-hallucination"). Sefer aesthetic; Hebrew is RTL, baked in.
>
> **Citation discipline (the site's core promise):** never write a Hebrew quotation from
> memory. Fetch the text from Sefaria (the Sefaria MCP if connected, else web) and paste
> it EXACTLY. If a text cannot be fetched and verified, cite and LINK it — do not quote
> it. Machlokesin are shown, never flattened. Sefaria title spellings verified this
> session: `Mishnah_<Tractate>` (Oholot, Zavim, Tahorot, Kelim, Keritot, Mikvaot,
> Negaim, Niddah, Avodah_Zarah, Eduyot, Parah, Bekhorot, Chullin, Megillah);
> Bavli `<Tractate>.<daf>a/b`; Rambam `Mishneh_Torah,_Forbidden_Intercourse`,
> `..._Defilement_by_a_Corpse`, `..._Defilement_by_Leprosy`,
> `..._Those_Who_Defile_Bed_or_Seat`, `..._Foreign_Worship_and_Customs_of_the_Nations`,
> `..._Red_Heifer`, `..._Other_Sources_of_Defilement`,
> `..._Admission_into_the_Sanctuary`, `..._Things_Forbidden_on_the_Altar`,
> `..._Service_on_the_Day_of_Atonement`. Any OTHER Rambam title: verify on Sefaria
> before building a URL — guessed titles have 404'd before.
>
> **Ship ritual:** node --check every edited JS; verify no stray edits with `git status`;
> commit with a message describing WHAT and WHY; push to origin main; confirm
> `git status -sb` shows `## main...origin/main` clean. Then report the live URL of what
> changed. If you saved new lessons, they belong in the session memory, not the repo.

---

## TASK 1 — trup-real polish

> In `apps/trup-real.html` (single self-contained file, ~5MB — read it in slices, never
> whole): (1) The evidence-grade badge is hardcoded as the string "grade A" inside the
> card template (search for `grade` near the card-render function, around the `Source ↗`
> button). Make the grade a per-motif data field: motifs measured from recordings
> (PocketTorah + own-voice) are "A"; anything else must carry its own grade from
> APP_DATA. If a motif lacks a grade field, render "—", never a default "A".
> (2) All 45 PocketTorah motifs share one `sourceUrl` pointing at the repo root
> `https://github.com/rneiss/PocketTorahTrope`. Each motif came from a specific track
> (torah-1..12, haftarah-1..14 — check APP_DATA for a track/tr field). Point each
> Source ↗ at its track's audio file:
> `https://github.com/rneiss/PocketTorahTrope/blob/master/data/audio/<track>.mp3`.
> Verify TWO such URLs resolve (fetch them) before applying to all.
> (3) Remove the Bricolage Grotesque font link and its uses (it is also drawn into a
> canvas — search `Bricolage` everywhere in the file); replace with Frank Ruhl Libre for
> Hebrew and Georgia/Crimson Pro for Latin.
> (4) The header pill says "Source: clarinet" where it means playback mode — relabel to
> "Mode".
> Do NOT touch the audio engine, the measured data, or the glide/clarinet toggle.
> Background: dev/trup/TRUP-HANDOFF.md. jsdom smoke may not work on this file — verify
> by node --check on extracted <script> content and by careful diff review.

---

## TASK 2 — Commons photo attribution (bird guide parts + Karnayim)

> Legal fix. Files: `apps/01_framework.html`, `apps/02_specimens.html`,
> `apps/03_orders.html`, and `apps/Karnayim.app.compiled.js` (note: Karnayim has no dev
> source — edit the compiled file's data strings directly; its image URLs live in a
> SPECIMENS map). Every hotlinked `upload.wikimedia.org` image must carry author +
> license. Method: extract each image's `File:` name from its URL; query the Commons API
> `https://commons.wikimedia.org/w/api.php?action=query&titles=File:<name>&prop=imageinfo&iiprop=extmetadata&format=json`
> and read `Artist` + `LicenseShortName`. Add a small credit line under each figure
> (bird parts: extend the existing "Photograph via Wikimedia Commons" caption to
> "Photo: <Artist> · <License> · via Wikimedia Commons"; Karnayim: the credit strings
> already name source/license partially — complete any missing artist). Public-domain
> images may say "public domain · via Wikimedia Commons" with no artist if none is
> recorded. Also add `loading="lazy"` to every hotlinked `<img>` in the three bird part
> files. Do not download or rehost images in this task.

---

## TASK 3 — Karnayim: link the quotes, wire the nav

> `apps/Karnayim.app.compiled.js` (compiled file IS the source — no dev copy; it is
> plain readable JS). (1) The rail quotes carry plain-text refs like "Chullin 59b",
> "Chullin 60b s.v. ...". Add a tiny ref→URL helper (Bavli: `Chullin 59b` →
> `https://www.sefaria.org/Chullin.59b`; Rashi s.v. refs: link the daf, keep the s.v.
> text as plain label) and render each ref as a link like the Further Reading section
> already does. Quotes themselves must not be altered.
> (2) The header nav "Primer / Signs / Cases / Sources" is inert spans. Give the four
> section roots ids and make the nav items scroll to them (anchor links or
> scrollIntoView). Verify with node --check; jsdom render of this file hangs — do not
> rely on it. Check the result visually via the live site after push.

---

## TASK 4 — tumah off the Tailwind Play CDN

> `apps/tumah.html` loads `cdn.tailwindcss.com` (dev-only runtime, ~100KB, console
> warning) and — unlike the other apps — tumah's compiled JS genuinely USES Tailwind
> classes. Migration: (1) list every className string in
> `dev/sources/tumah.app.js` (grep `className="` and template-string classNames);
> (2) generate a static stylesheet covering exactly those utilities — either run the
> Tailwind CLI once (content = the source file) and inline the output into tumah.html,
> or hand-write the ~dozens of utilities actually used (they are mostly text-size,
> color-stone, spacing, borders, grid/flex); (3) remove the CDN script tag; (4) recompile
> per the preamble pipeline and verify the page renders identically (jsdom smoke works
> for tumah? if it hangs, node --check + live check). Do not restyle anything in this
> task — same look, zero CDN.

---

## TASK 5 — small hardening batch (one commit)

> Five contained fixes: (1) `apps/zeraim-core.js` — `ingestKilayim()` silently returns
> if `window.KILAYIM_FLORA` is missing (it lives in talmudflora-data.js); log a console
> error AND render a visible one-line notice in the app instead of silently dropping the
> Kilayim masechta. (2) `apps/zeraim.js` line ~8 — `window.ZERAIM_TITHES` is read without
> a fallback; give it `|| {}` and guard the `.gifts/.grid/.levels` uses so a mis-load
> degrades instead of throwing. (3) `apps/tolaim.js` — `refUrl` only handles Chullin +
> YD 84; make the fallback return null and have `sourceBlock` render an unlinked ref
> (never an empty href) when refUrl is null. (4) `apps/chagavim.js` — the three `<img>`
> renders have no onerror; add the same graceful hide/fallback tolaim uses.
> (5) `dev/sources/nisyonos.app.js` — composite citations like "שמות לב, א · לב, ד" link
> only the first source; render each ref segment as its own link (split on "·"), then
> recompile nisyonos per the preamble pipeline. Verify: node --check all five; jsdom
> smoke nisyonos.

---

## TASK 6 — style sweep (BLOCKED: needs Mordy's scope answer first)

> Ask Mordy (plain text, not the question widget — it fails on his machine): full
> sefer-skin repaint / banned-items-only / app-by-app / defer. THEN: banned items are
> Bricolage Grotesque (direct loads in nisyonos, chagavim, Counts, Karnayim, trup-real),
> eyebrow microlabels, letterspaced-uppercase chips (`letter-spacing` ≥ .1em +
> `text-transform:uppercase` combos), and any AI-defensive copy. Off-brand skins if he
> approves the bigger pass: zmanim (navy/Inter/gold), talmudflora + zeraim (green
> Fraunces/Inter). Target look: tolaim's tokens (see apps/tolaim.html :root) or the
> maroon sefer system (see apps/arayot.html). Sweep app-own CSS only — site-chrome.js
> is already clean. Push after each app so he can eyeball and stop the pass.

---

## TASK 7 — Counts SE layer (BLOCKED: needs Mordy's answer first)

> Ask Mordy what the "Se" toggle should mean: (a) yeshivish transliteration layer,
> (b) deliberately Sephardic contrast layer, (c) leave mixed. If (a): sweep every `se:`
> field in apps/counts-data.js + counts.js to yeshivish (Yeridas, reshimas, b'sheimos,
> mibben esrim...) — display strings only, never URLs; if (b): revert the four
> already-converted items (Yetzias Mitzrayim, machatzis ha-shekel, Arvos Moav, Machlokes
> rishonim se-fields — check git log 8c90b75/98a2b84 for exact spots) back to Sephardic
> forms and rename nothing else. Either way the EN-context strings stay yeshivish.

---

## TASK 8 — next trup cell (the real roadmap)

> Read `dev/trup/TRUP-HANDOFF.md` first — it is the complete self-contained brief,
> including the working browser-based extraction pipeline and its gotchas. The next
> concrete step it names: measure Virtual Cantor (virtualcantor.com, Eastern-Ashkenazi,
> closest free option to Mordy's Litvish ear) through the same pipeline, add it as a
> third measured system in trup-real.html beside PocketTorah (link-only audio, grade A
> measured, register-normalized), or record/measure a full own-voice set. Requires the
> Chrome MCP (sandbox web_fetch cannot do binary/CORS). Do not add any motif without a
> named source + grade — the No-Fake-Mesorah policy is locked.
