# The Sages of the Mishnah · חכמי המשנה

**Seder:** Mishnah
**Tile:** [apps/tannaim.html](../apps/tannaim.html)
**Status:** Live (linked from index.html), added 2026-11-17

## What it covers
Every sage named in the Mishnah, 152 entries (named sages, Beis Shammai and Beis Hillel, and the unnamed voices Tanna Kamma, Chachamim, Stam Mishnah, Yesh Omrim). For each: how many times he is named, in how many mishnayos, and in what way (dispute, testimony, story, saying, ruling or mention); his generation; his teachers, students and family; the sages he disputes with most; and every mishnah he appears in.

## Views
- **Generations (דורות):** before the Zugos (Shimon HaTzaddik, Antigonos, in the order of Avos 1:2-3), the five Zugos, Tannaim T1 to T6, the transition to the Amoraim, then the sages not yet placed and the unnamed voices. Each card shows the mention count and a bar by kind.
- **Chains (שלשלאות):** the chain of receiving as Avos 1:1 to 2:8 states it, each step quoted; the Nesiim of the house of Hillel father to son, each step with its source (Shabbos 15a, Avos 1:16-18 and 2:2, Tosafos Yom Tov); and a teacher-and-student chart for any sage, where tapping a name moves to him.
- **Work a Mishnah (לימוד משנה):** pick any mishnah (or come from a sage's list). The text loads from Sefaria (Torat Emet 357) with each named sage marked and tappable. Below: the sages with the kind of mention, an exercise to put them in order earliest first, then the lineup by generation and any teacher-student or father-son link between them. Beitzah and Shabbos link to the matching card in The Mishnah as Torah She-Ba'al Peh.
- **Map (מפה):** places from Wikidata (birth, death, burial, teaching), filter by kind and a Galilee zoom; tap a point for its sages. Drawn in the page as SVG from Natural Earth's public-domain coastline, lakes and rivers (no outside scripts, works offline). The same map sits at the top of the Generations page, and each sage card shows his main place and years.
- **Index (רשימה):** sortable by name, generation, mentions, mishnayos, disputes; shows each generation's span.

The view tabs, search and legend stay frozen under the header while the page scrolls. The profile (rail on desktop, a sheet on phones) has the counts, Sefaria's summary (marked as Sefaria's, not checked against the sources), teachers, students, family, identification notes and the mishnayos by tractate. State is kept in the URL hash (`#v=work&m=Mishnah Yadayim 4:3&s=Rabbi Akiva`).

## Sources
- Text and counts: Mishnah, Torat Emet 357, from Sefaria-Export-Archive (GitHub, commit 3f10136). Each sage's name forms searched in the whole Mishnah, longest form first. Agrees with MishnaBase on 97.5% of its dispute references; the rest are numbering differences or Kaufmann readings (R' Elazar where Torat Emet has R' Eliezer).
- Disputes: MishnaBase, Kazhdan and Kay, JSIJ 22 (2022), github.com/BenjaminKay/MishnaBase.
- Generations, teachers, students, family, summaries: Sefaria topic pages (talmudic-figures, 260 figures), fetched 2026-11-17. Sefaria numbers the generation of the Churban T1 and Rebbe T6; the Jewish Encyclopedia (1906) numbers one lower and is shown separately.
- Wikidata teacher and student links via Ezra Brand, jewish-figures-index (MIT); dates, places and coordinates queried from Wikidata directly (2026-11-17).
- Same-name identification: the Mishnah itself (הזקן, בנו של), Avos 2:8 for the plain names of Avos 2:9-14, Avos 4:4 and 4:6 for "רבי ישמעאל בנו", Tosafos Yom Tov on Avos 1:16, 1:18 and Kerisos 1:7.

## Years and places (added 2026-11-17)
- Generation span: the Jewish Encyclopedia (1906) table (1st 10-80, 2nd 80-120, 3rd 120-140, 4th 140-165, 5th 165-200, 6th 200-220 CE). Where it does not place a sage, his Sefaria generation is matched to its number (T1 and T2 = 1st, T3 = 2nd, T4 = 3rd, T5 = 4th, T6 = 5th, TA = 6th; checked on sages both place). Shown on each band and in each profile. 82 sages have a span; the Zugos and the minor sages without a Sefaria generation do not.
- Birth and death years: Wikidata, as given, with precision (year, decade, century); two values are both shown. 74 sages.
- Jewish year: secular year + 3760 (3761 before the common era), shown beside every year and span. This follows the secular dating; Seder Olam's count puts the Churban in 3828, not 3830, so traditional years run about two earlier. Stated in the footer.
- Places: Wikidata birth, death, burial, work location and residence, 52 sages, 32 places. Entries naming only a modern state, a Roman province or the empire are dropped; regions (Galilee, Judea, Babylon) are listed but not mapped. Burial places are mostly the traditional sites. A place in the sage's own name in the Mishnah ("איש ...") is shown as "from his name in the Mishnah".

## Method notes
- Kind of mention: "dispute" where MishnaBase codes the sage in a dispute at that mishnah (or the one beside it); otherwise by wording: testimony (העיד, שמעתי, מקבלני), story (מעשה, פעם אחת, אמרו עליו, משמת), saying (Avos, היה אומר), else ruling or mention. Word-pattern sorting, not checked mishnah by mishnah.
- Plain names follow the usual identification (R' Yehuda bar Ilai, R' Yossi ben Chalafta, R' Shimon bar Yochai, R' Eliezer ben Hurkenos, R' Yehoshua ben Chananya, R' Elazar ben Shamua).
- Temple officials and Kohanim Gedolim are left out.

## Files
`apps/tannaim.html`, `apps/tannaim.js` (render), `apps/tannaim-data.js` (window.TANNAIM_DATA). Build scripts: `dev/tannaim/` (extract.py, aliases.py, build2.py, build3.py, match.py, sefaria_figures.py and helpers). Project records: C:\Users\mswad\Dropbox\curly-barnacle-incoming\_PROJECT\tannaim.

## Open
- Dates and places for the Zugos and the minor sages come only where Wikidata has them; a fuller source (Hyman, Seder HaDoros) is still to be added.
- About 50 sages have no generation (Sefaria does not list them). Next source: Hyman, Toldot Tannaim ve-Amoraim.
- R' Eliezer ben Yaakov, R' Elazar ben Tzadok and R' Yehuda ben Beseira are each two people in Sefaria; which one each mishnah means is not resolved.
- Rabban Gamliel and Rabban Shimon ben Gamliel outside the places a source settles are marked default.
- The kind tags are by wording; a hand check is still to do.
- Biographies beyond Sefaria's summary are not written yet.
