# Sugya Scout · מפת הסוגיות

**Seder:** לוח · Luach & Reference (it covers every masechta of Bavli)
**App:** [`apps/sugyascout.html`](../apps/sugyascout.html) (self-contained, no data file)

## What it covers

Pick a masechta and a daf. The page fetches the amud live, maps every segment to its sugya using the source's canonical passage records, and shows one card per sugya: the opening words quoted as written, the boundary refs, and marks for a sugya that carries in from the previous daf or runs past this one. Shekalim is left out (the printed Bavli Shekalim is Yerushalmi and its divisions differ).

Each card links to:

- **מקור** - the text at the sugya's first segment (sefaria.org, segment-level deep link)
- **צילום** - the printed daf scan (hebrewbooks.org `shas.aspx?mesechta=NN&daf=NN&format=pdf`, per their published scheme; mesechta numbers 1-37 are baked into the page)
- **טקסט** - the same daf as text (`format=text`)

**Scaffold** opens the sugya into step-by-step moves. The model receives the numbered verbatim segments and returns structure only: move type (Mishnah / Beraita / Question / Objection / Resolution / ...), segment span, and one-line summaries in English and rabbinic Hebrew. No Hebrew text ever comes from a model; "reveal the Gemara" shows the page's own fetched segments, each with a segment-level source link. Span coverage is validated (gaps and overlaps are flagged).

**Review (second model)** sends each move's verbatim span plus its summary to a second model, which flags three error classes: omissions, misstatements (the serious class, shown as filled maroon bars), and unsupported attributions (naming a work, speaker, or identification the text does not name). If the reviewer equals the scaffolder, the summary line says so. Reasoning models' chain of thought, when returned, shows in a collapsible panel.

## Model setup (bring your own key)

Providers: OpenRouter, Google Gemini, OpenAI, Anthropic. The key is pasted once and saved in that browser's localStorage only (per provider; "forget" erases). Nothing is ever sent anywhere except the chosen provider and the text sources. The scan itself (sugya map, openings, links) needs no key and works for every visitor.

Suggested free setup: scaffold with Gemini `gemini-2.5-flash` (free tier at ai.google.dev), review with an OpenRouter `:free` model, or the reverse. Anthropic default is `claude-haiku-4-5`.

## Data provenance

- Amud text: `www.sefaria.org/api/v3/texts/{ref}` (first version with text; HTML stripped client-side)
- Sugya boundaries: `www.sefaria.org/api/passages/{ref|ref|...}` (canonical passage records; chunked 25 refs per call)
- Daf scans / text: hebrewbooks.org deep-link schemes from developers.hebrewbooks.org (links only; they publish no API)
- Model output: structure and summaries only, validated for span coverage before render

## Files

- `apps/sugyascout.html` - everything (markup, styles, logic)
- `dev/publish-sugyascout.ps1` - the one-command script that inserted the index tile, changelog entry, and this doc's README row, then pushed

## Notes

- Built July 2026 in chat (versions v1-v5.2), published 2026-10-22 restyled to the site look (Frank Ruhl Libre + Crimson Pro, maroon, no display-caps labels) and de-branded per the מקור convention.
- Known pairing results from testing on Chullin 65a and Bava Kamma 66a: DeepSeek-chat scaffolds with occasional polarity inversions that Gemini Flash catches on review; Flash scaffolds more precisely but once attributed unnamed beraitos to the Tosefta, which is what the unsupported-attribution rule now guards.
- Open: repair pass (feed accepted findings back for a revised scaffold), uphold/dismiss buttons with a per-pairing scoreboard, mechanical pre-review lint for source-class names, JSON schema mode per provider, Kimi K3 as reviewing model.
- Open: whether the canonical passage divisions match Mordy's own lamdanus everywhere; divergences worth recording here when found.
