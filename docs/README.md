# Torah Interactive — Documentation

Master index for the **Torah Interactive** (`לימוד`) app library. Every app is a self-contained static page under `apps/`; each tile below has its own sub-doc in this folder.

- **Live site entry:** [`index.html`](../index.html)
- **Changelog:** [`CHANGELOG.md`](../CHANGELOG.md)
- **Shared UI:** [`site-chrome.js`](../site-chrome.js) — beta chip, home button, and login/feedback panel injected into every page.
- **Login & comments setup:** [`SETUP-login-comments.md`](SETUP-login-comments.md) — the Firebase steps only you can do.
- **Convention:** each app quotes every citation verbatim and links it to Sefaria. No build step — serve the repo root.

## Tiles

Grouped by seder, in the order they appear on the index page.

### חומש · Chumash

| Tile | App | Sub-doc |
|------|-----|---------|
| Nisyonos in the Midbar | [nisyonos.html](../apps/nisyonos.html) | [nisyonos.md](nisyonos.md) |
| The Counts (Pekudim) | [Counts.html](../apps/Counts.html) | [counts.md](counts.md) |
| Arayot Tree | [arayot.html](../apps/arayot.html) | [arayot.md](arayot.md) |

### קדשים וטהרות · Kodashim & Taharos

| Tile | App | Sub-doc |
|------|-----|---------|
| Tumah Tree | [tumah.html](../apps/tumah.html) | [tumah.md](tumah.md) |
| Tzara'as Diagnostic (Negaim) | [negaim.html](../apps/negaim.html) | [negaim.md](negaim.md) |
| Mumim Catalog | [mumim.html](../apps/mumim.html) | [mumim.md](mumim.md) |
| Avodas Yom HaKippurim | [yom_kippur_avodah.html](../apps/yom_kippur_avodah.html) | [yom-kippur-avodah.md](yom-kippur-avodah.md) |

### כשרות · Kashrus

| Tile | App | Sub-doc |
|------|-----|---------|
| The Forbidden Birds (3 parts) | [jewish_ornithology_guide.html](../apps/jewish_ornithology_guide.html) | [forbidden-birds.md](forbidden-birds.md) |
| Kosher Locusts (Chagavim) | [chagavim.html](../apps/chagavim.html) | [chagavim.md](chagavim.md) |
| Karnayim | [Karnayim.html](../apps/Karnayim.html) | [karnayim.md](karnayim.md) |
| Tolaim in Food | [tolaim.html](../apps/tolaim.html) | [tolaim.md](tolaim.md) |

### זרעים · Zeraim

| Tile | App | Sub-doc |
|------|-----|---------|
| Seder Zeraim — Plants & Land-Mitzvos | [zeraim.html](../apps/zeraim.html) | [zeraim.md](zeraim.md) |
| Talmud Flora — Plants of Kilayim | [talmudflora.html](../apps/talmudflora.html) | [talmudflora.md](talmudflora.md) |

### לוח · Luach & Reference

| Tile | App | Sub-doc |
|------|-----|---------|
| Zmanim — One Zman, Every Method | [zmanim.html](../apps/zmanim.html) | [zmanim.md](zmanim.md) |
| Haftarah Reference | [haftarah.html](../apps/haftarah.html) | [haftarah.md](haftarah.md) |
| Ta'amei HaMikra | [trup-real.html](../apps/trup-real.html) | [trup.md](trup.md) |

## Repository layout

```
index.html            library index (the tiles)
apps/                 each live app + its runtime .js data/renderer files
apps/_archive/        orphan / superseded / experimental pages — not linked from index.html
dev/                  working sources & notes, not served
dev/sources/          uncompiled .app.js sources (the .app.compiled.js versions are what run)
docs/                 this folder — master index + one sub-doc per tile
CHANGELOG.md          repo-wide history
```

## Sub-doc template

Each tile doc records: title (EN + Hebrew), seder, what it covers, sources, the files it depends on, and a Notes section for design decisions, data provenance, and open questions. Keep repo-wide changes in `CHANGELOG.md`; keep tile-specific notes in the tile's own doc.
