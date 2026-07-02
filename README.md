# Torah Interactive · לימוד

Interactive Torah study apps. Every citation is quoted verbatim and linked to its source on Sefaria.

**Apps** (in `apps/`): Nisyonos in the Midbar · The Counts (Pekudim) · Tumah Tree · Tzara'as Diagnostic · Mumim Catalog · Avodas Yom HaKippurim · The Forbidden Birds (3-part ornithology guide) · Kosher Locusts · Karnayim · Talmud Flora (Kilayim) · Zmanim · Haftarah Reference

**Structure**
- `index.html` — library index
- `apps/` — each app is a self-contained page (some pair a data `.js` with a renderer `.js`)
- `dev/` — working sources and notes, not served

Static site — no build step. Serve the root directory.
