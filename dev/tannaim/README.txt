Build scripts for apps/tannaim-data.js (The Sages of the Mishnah). Run in order:
1. count.py / build.py   MishnaBase dispute counts (inputs: BenjaminKay/MishnaBase arguments.csv, disputes.csv)
2. extract.py            name search over the Mishnah text (mtext.py loads Torat Emet 357 JSON from Sefaria-Export-Archive commit 3f10136; aliases.py holds the name forms)
3. build2.py             merges text counts, kinds, MishnaBase, Jewish Encyclopedia generations, Wikidata (EzraBrand/jewish-figures-index)
4. sefaria_figures.py    (on a machine with internet) pulls Sefaria talmudic-figures topics
5. match.py, build3.py   match sages to Sefaria topics, add generations, links, summaries, the Avos and Nesiim chains
Paths inside the scripts point at the working folders used on 2026-11-17; adjust before rerunning.
