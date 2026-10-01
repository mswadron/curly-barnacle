# The Four Species as Plants · אַרְבַּעַת הַמִּינִים

**Seder:** Zeraim (agricultural apps)
**Tile:** [apps/arba_minim.html](../apps/arba_minim.html)
**Status:** Live (linked from index.html), pushed 2026-09-27 as b0cc726

## What it covers
What each of the four species is doing as a plant, set against what the sugya asks of it. Esrog: grafting vs cross-breeding vs cross-pollination as three separate plant events, the 2005 twelve-strain DNA study (Nicolosi et al., HortScience), Magen Avraham 648:23's murkav signs verbatim, pitom as persistent style and stigma, oketz, grower practice, strains. Lulav: unopened-frond anatomy, tiyomes, why Deri stays shut. Hadas: whorled vs paired nodes, why a full meshulash is rare, Rema's leniency. Aravah: the Gemara's field key vs tzaftzafah, why it is easy to find and hard to keep. Blemish guide: clickable esrog diagram (pitom / chotem / body / oketz) filtering 12 mark types.

## Sources
Vayikra 23:40 · Mishnah Sukkah 3:1-6 · Sukkah 32a-36a · Shulchan Aruch OC 645-648 · Magen Avraham 648:23. Science: Nicolosi et al. 2005; Toraland (Amar) on grafted esrogim and the pitom; Times of Israel on Tirat Zvi Deri harvest; Mishpacha on Cobin; JPost on Kfar Chabad orchard practice.

## Files
- `apps/arba_minim.html` (page, tolaim house skin)
- `apps/arba_minim-data.js` (four species, principle, regions, 12 blemishes; `window.ARBA_DATA`)
- `apps/arba_minim-lineage.js` (Esrog lineages section, added 2026-09-28: acharonim on the murkav signs, how lines are established, Yanova/Calabria, Corfu, old Eretz Yisrael, Chazon Ish + Kibilevitz, other Israeli lines, Moroccan, Yemenite; inserts itself after the Esrog section)
- `apps/arba_minim.js` (renderer: All / per-species / Blemish guide views, source language toggles, SVG region filter)

## Notes
- Does not pasken. Status badges: pasul in the sugya / conditional or machlokes / kosher / hiddur or market grade / contemporary she'eilah.
- Hebrew is verbatim from Sefaria (Davidson vocalized Aramaic; Maginei Eretz Shulchan Aruch; Magen Avraham). Commentator tags stripped.
- Sunburn is flagged as not named in the sugya; placed under shinui mar'eh as an open question.
- Canary palm (kaneri) question is noted, not decided; no source fetched for it yet.
- Open: rov meshulash line; hormone-retained pitom; Corfu history card if wanted.
- 2026-09-28: lineage section sourced mainly from the Toraland encyclopedia entry "אתרוג - בירור זני האתרוגים" (quoted verbatim, linked) plus Sefaria (Rema 126, Chasam Sofer OC 183/207, Aruch HaShulchan 648:28, MB 648:65, Kaf HaChayim 648:136, Mishpetei Uziel I OC 24:8, B'Mareh HaBazak III 52:7, SA HaRav 648:31). Sources may carry an explicit `url` field; renderer uses it before refUrl().
- 2026-09-28: corrected the strains card; it had said the Chazon Ish trees trace to a "Salant orchard". Correct: Halperin from Nachal Amud or Shechem stock; Lefkovitz from a seed of the Chazon Ish's own esrog.
- Open: HebrewBooks search for acharonim on an own-rooted cutting taken from a grafted esrog scion; Yeshurun 33 article on Chazon Ish lineage not yet read directly.
- 2026-10-01: four content edits. (1) Strains card: psul origin corrected to R' Shmuel Yehuda Katzenellenbogen of Padua (Rema 126) together with the Maharam Alshich in Tzfas (110, 1586); it had said the psul surfaced in Italy. (2) Lineage signs card: Chasam Sofer OC 207's thick-rind d'oraisa sign added verbatim. (3) Strains card: how isolated lines drift (founders, bud sports, selection, climate), Moroccan acidless, Yemenite juice sacs; Sukkah 36a ha lan ve-ha lehu and SA 648:17 on regional strains added verbatim. (4) Cross-pollination card: nucellar polyembryony.
