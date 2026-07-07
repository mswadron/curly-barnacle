# Zmanim — One Zman, Every Method · זְמַנִּים

**Seder:** Luach & Reference
**Tile:** [apps/zmanim.html](../apps/zmanim.html)
**Status:** Live (linked from index.html)

## What it covers
Every shitah for each zman of the day — degrees, fixed minutes, sha'os zmaniyos, horizon — computed live for your location, with the sources for each method inside.

## Sources
Brachos · Shabbos · Pesachim · Shulchan Aruch OC

## Files
- `apps/zmanim.html` — page (loads the renderer with a `?v=` cache-buster)
- `apps/zmanim.app.compiled.js` — compiled renderer (loaded at runtime)
- `dev/ZmanimMethods.jsx` — working JSX source
- `dev/ZmanimMethods_HANDOVER.md` — handover notes

## Notes
Computes zmanim live from the user's location — the one tile with real-time astronomical calculation rather than static data.
_(add further design decisions, data provenance, open questions)_
