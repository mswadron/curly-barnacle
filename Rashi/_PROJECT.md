# Rashi Study Guide

**Purpose:** A per-parasha study guide to Rashi on Chumash, built in sections. Each section collects one kind of thing Rashi does. Sample parasha: Bereshit (Genesis 1:1-6:8).

**Folder:** C:\Users\mswad\Claude\Projects\Torah JSX (1)\Rashi

**Key files**
- C:\Users\mswad\Claude\Projects\Torah JSX (1)\Rashi\Rashi.html (page; open this one)
- C:\Users\mswad\Claude\Projects\Torah JSX (1)\Rashi\rashi-sections.js (section titles only; the content is in the laaz-*.js, rashi-method.js, rashi-grammar.js, rashi-targum.js files)
- C:\Users\mswad\Claude\Projects\Torah JSX (1)\Rashi\rashi.js (render logic)

**Decisions**
- Section 3 is named יישובו של מקרא (Rashi's phrase at Genesis 4:8), not פשוטו של מקרא: Mordy says that title has a negative sound in his community. Rashi's own words inside the entries are left verbatim.
- Hebrew is copied verbatim from the Rosenbaum and Silbermann 1929-1934 print edition text. No AI-written Hebrew. Section names use Rashi's own phrases.
- Old French spellings in Latin letters come from the Silbermann English translation. English study notes are AI notes and are chipped as such.
- Look (current): type and color of C:\Users\mswad\Claude\Projects\Torah JSX (1)\apps\maharils_moon.html (cool grey, Newsreader, IBM Plex Sans and Mono, indigo accent, light and dark). Mordy rejected cream plus Georgia as pure Claude.
- Look (rejected): skin of C:\Users\mswad\Claude\Projects\Torah JSX (1)\apps\arba_minim.html (cream, tekhelet and gold, 860px column, cards open in place). Mordy rejected the first maroon rail version as looking like Claude. Three files, no build step.

**Done**
- Section 1, foreign words: complete for Bereshit, 9 words in 8 comments.
- Section 2, grammar points: 6 sample entries.
- Sections 3 and 4 (Settling the verse, יישובו של מקרא; Rashi and the Targum): proposed, 6 and 5 sample entries.

**Open questions**
- Old French spelling for 1:24 (קונמו"בריש) and 4:23 (מקא"דורה): the Silbermann Latin spelling does not match Rashi's Hebrew letters. Check against a la'azim reference work.
- Mordy to confirm sections 3 and 4, or swap them.
- One page per parasha, or one page with a parasha picker.
- Not yet in the curly-barnacle repo and not yet in the non-work PROJECT REGISTRY.md (Dropbox index folder was not connected in this chat).

## Whole-Chumash la'az build (started 2026-10-06)
- Scope: every la'az in Rashi on Chumash, book by book, published to the artifact after each book.
- Reference: Moshe Catane, Otzar La'azei Rashi (Jerusalem 1988), 266 Chumash entries: Genesis 65, Exodus 87, Leviticus 51, Numbers 29, Deuteronomy 34.
- Source files come from the public Sefaria export archive on GitHub (Sefaria/Sefaria-Export-Archive, commit 3f10136 of 2026-03-23), not typed by hand.
- Pipeline: build\extract.py (Catane entry + printed Rashi comment + verse), build\notes_<Book>.py (AI study notes keyed by Catane number), build\build.py writes laaz-<Book>.js.
- Print against Catane, by la'az marks in the printed Rashi: Genesis 60 verses marked vs 54 in Catane; Exodus 63 vs 66; Leviticus 27 vs 35; Numbers 19 vs 24; Deuteronomy 18 vs 27. Catane lists words the print gives without the word בלע"ז; a few print marks are false hits (לע"ז as an abbreviation for idolatry).
- Status by book: ALL FIVE DONE. Genesis 65, Exodus 87, Leviticus 51, Numbers 29, Deuteronomy 34, total 266.
- Every entry in all five books is matched to a comment in the printed Rashi. Where the printed la'az word could be picked out it is shown beside Catane's reading.
- Oddities in the digital text of Catane, handled and noted on the cards: fields printed in swapped order (Genesis 3027, Exodus 3094 and 3098); an entry numbered 3194א (Leviticus 19:19); the Numbers 11:29 entry numbered 3127, which by position should be 3217; Leviticus 3192 Hebrew meaning ריגול, probably a slip for ריצוי.
- Self-correction: Genesis 1:2 acoveter was first explained from couver (to brood); Catane translates it לכסות, to cover, and the card now follows him.

## Open after the whole-Chumash build
- All English meanings, modern French forms, similar words and word histories are AI study notes, not checked against a dictionary. Words marked "Not traced" on their cards: Genesis 3043, 3063; Exodus 3081, 3125, 3141; Leviticus 3157, 3164, 3172, 3191, 3204; Numbers 3208, 3212.
- Yiddish relatives: bloyz (Genesis 41:19) plus those added 2026-10-06 (royt, rer, plombe, pomerants, kastn, gume, krishtol, tort, shteyn and bok, vartn, vayn). All from Claude's own knowledge, unchecked.
- Rule from Mordy: where an English relative also has a coarse sense (tewel), give only the clean sense, out of respect for the Torah.
- Not yet done: push to the curly-barnacle site; row in C:\Users\mswad\Dropbox\_CLAUDE INDEX\PROJECT REGISTRY.md; folder and file are still named Rashi-Bereshit though the page now covers the whole Chumash; (grammar and Targum were extended to the whole Chumash on 2026-10-06, see below).

## Settling the verse (יישובו של מקרא), whole Chumash, built 2026-10-06
- File rashi-method.js, made by build\method.py. Rule: a comment is included if it has a plain-sense word (פשוטו and forms) together with a midrash word (אגדה, מדרש, רבותינו דרשו, דרשני), or one of the method phrases (ישובו של מקרא, מיושב, מתישב, על אופניו, לא באתי אלא, איני בא אלא, צחצוח).
- Five false hits removed by hand (listed in DROP inside build\method.py). No English summaries; the card shows Rashi's own clause and the Silbermann translation.
- Limit: a comment where Rashi contrasts the two without any of these words is not caught.

## Settling the verse, second pass 2026-10-06 (Mordy: last three books were thin)
- Now 298 comments: Genesis 113, Exodus 77, Leviticus 31, Numbers 50, Deuteronomy 27 (was 71 in all).
- Eight kinds, each found by Rashi's own wording (patterns in build\method.py): Method stated; Plain sense beside midrash; Midrash after the plain reading (ומדרשו, ורבותינו דרשו and the like after a first explanation); Plain sense named; His own reading (ואני אומר, נראה בעיני, ולי נראה); Says he does not know (לא ידעתי, איני יודע); Names his source (רבי משה הדרשן, מצאתי ב, שמעתי מ); Other interpreters (יש מפרשים, יש פותרים).
- About 50 false hits removed by hand after reading the candidates (quoted verses, a speaker's words, the halachic formula איני יודע ... תלמוד לומר, the nine continuation paragraphs at Numbers 19:22). Listed in DROP in build\method.py.
- Bare כמשמעו comments were tried and left out as too thin.
- Not reviewed line by line: the "Midrash after the plain reading" hits in Genesis and Exodus, and the "Plain sense named" hits in Genesis and Exodus.

## Grammar and Targum, whole Chumash, built 2026-10-06
- rashi-grammar.js: 351 comments (Genesis 138, Exodus 97, Leviticus 27, Numbers 52, Deuteronomy 37) in ten kinds. rashi-targum.js: 415 comments (137, 116, 30, 76, 56) in six kinds. Made by build\sections.py with the patterns in build\kinds2.py.
- Same card as Settling the verse: Rashi's own clause, full comment and Silbermann translation on opening. Nothing written by Claude.
- NOT reviewed for false hits. Only a random sample of about six per kind was read. Known risks: "A letter's work" fires on any spelled-out letter name; "Cites the Targum" fires on any form of תרגם; "Parts from the Targum" is any comment with a Targum word plus ואני אומר, טועה or similar, which does not prove Rashi disagrees with the Targum there.
- The six-entry Bereshit samples for these two sections in rashi-bereshit-data.js are no longer shown.

## State at end of 2026-10-06
- Page has four sections, all whole-Chumash: Foreign words 266, Grammar 351, Settling the verse 298, Targum 415.
- Published to the artifact only. Not pushed to the curly-barnacle site. Registry row in C:\Users\mswad\Dropbox\_CLAUDE INDEX\PROJECT REGISTRY.md not written.
- Next: false-hit review of Grammar and Targum; rename folder and file from Rashi-Bereshit; decide on site push.

## Notes, marking and search, added 2026-10-06
- Every card has "My note" (textarea, Save) and a button "This card does not belong here". A "My notes" tab gathers both in Chumash order with a link back to each card.
- Where they are kept: in the Claude artifact, notes go to the reader's own private space (data/users/<their id>/<card id>), which nobody else can read, not even the owner; marks go to flags/<their id> as {ids:{card id: "section book ref"}}, readable by the owner and by Claude so false hits can be collected and removed. Opened as a plain file or on the site, both fall back to that browser's storage.
- Search box above the list: looks through all five books of the current section (Hebrew without vowels, French, English, or a verse like 4:23).
- Catane's entry now laid out as labelled rows. Dead Transliteration button removed. The old six-entry Bereshit sample cards are no longer reachable.
- To harvest the marks: read the artifact's flags collection, then add those cards to DROP in build\method.py or to a new drop list in build\sections.py and rebuild.

## Spanish toggle, added 2026-10-06
- "Spanish" button beside "English" (off by default). On each foreign-word card it adds a line of current Spanish relatives with their meanings. 211 of the 266 words have one.
- Source: build\spanish.py, Claude's own knowledge, unchecked. Rule from Mordy: current words only, so archaic relatives (mesnada, triaca, tudel, escriño) were left out. Only same-root words are listed.
- Mordy's observation that maderne recalls Spanish madera: the cards at Genesis 44:2 and Exodus 25:31 say it is a look-alike from a different root (Latin materia). That etymology is Claude's, unchecked.

## Perek and pasuk navigation, added 2026-10-06 (Mordy: not hidden, drill down to a parasha)
- New first tab "Everything": all four sections merged in verse order. Drill down is book, then parasha (buttons with counts, plus "Whole book"), with a heading for each perek.
- Every card now carries its perek:pasuk large at the left, in numerals and in Hebrew letters. The four section tabs use the same book and parasha drill-down, with the kind filters under it.
- Parasha boundaries are in build\build.py (PAR). A parasha with no cards does not appear as a button.

## The guide's own readings, added 2026-10-06
- Standing instruction from Mordy: do not simply follow Catane; originality is wanted as long as it is grounded.
- File build\own.py holds the guide's own argued readings, each with its grounds (Rashi's words elsewhere, the letters of the printed text, spelling habits in Catane's own entries). Shown on the card in a dashed box, with a filter "This guide's own readings" in the Foreign words tab.
- Seven so far: Genesis 1:2 acoveter (brooding, from Rashi on Deuteronomy 32:11; differs); Genesis 4:23 (sides with Catane's navredure on the evidence of Rashi at Exodus 21:25, reversing this guide's earlier defence of the print); Genesis 38:16 (destorner, differs); Exodus 21:25 petza (pointer); Exodus 21:25 chaburah (tache, differs); Numbers 24:17 (forer, differs); Leviticus 3192 (moved from 19:5 to 19:16 on Catane's own note).
- Self-correction: the earlier guess that Catane's ריגול at Leviticus 3192 was a slip for ריצוי was wrong. His note shows the entry is about רכיל at 19:16. The printed French word at Leviticus 19:5 (אפיי"צימנטו) has no Catane entry.
- Not yet done: the same weighing for the other 259 entries. Only entries already looked at in conversation were weighed.

## Manuscript Leipzig 1 and the limudlab site (2026-10-06)
- Second witness added beside Catane: manuscript Leipzig 1 (Universitaetsbibliothek Leipzig, B.H.1), from AlHaTorah's transcription at https://alhatorah.org/Commentators:Rashi_Leipzig_1/<Bereshit|Shemot|Vayikra|Bemidbar|Devarim>_<chapter>. Readings are in build/leipzig.py (LZ, keyed by book and Catane number), field lz on each card, shown as "In manuscript Leipzig 1". 178 of 266 cards have one.
- The words were picked out of the transcription by Claude (text beside a la'az marker, or a vocalized word in the verse). Not checked one by one against the page. Some may be the wrong word of the verse. 88 cards have none: not located, or the verse is missing from the transcription (Bereshit 1:2, 1:11, 1:27, 11:3; Shemot 20:23; Vayikra 1:9, 11:16; Devarim 14:5), or the page was not found (Vayikra 3, 4, 6).
- The manuscript changed the guide's own readings (build/own.py): Bereshit 4:23 confirmed for Catane (navredure); Bereshit 38:16, Shemot 21:25 and Bemidbar 24:17 withdrawn, the guide now follows Catane and says why. Only Bereshit 1:2 (acoveter as brooding) still differs from Catane; the manuscript lacks that verse.
- Site: the live site is limudlab.com (Cloudflare Pages from main of github.com/mswadron/curly-barnacle; this folder C:\Users\mswad\Claude\Projects\Torah JSX (1) is the clone). Git must be run through Desktop Commander on Windows, never in the sandbox mount (see C:\Users\mswad\Claude\Projects\Torah JSX (1)\dev\FIX-PROMPTS.md).
- Not reached: HebrewBooks (Greenberg, Targum HaLaaz, Marpe Lashon), Darmesteter and Blondheim.

## Renamed (2026-10-06)
- Folder and files renamed so the name no longer says Bereshit: C:\Users\mswad\Claude\Projects\Torah JSX (1)\Rashi\Rashi.html, rashi.js, rashi-sections.js (window.RASHI_SECTIONS). Live at https://limudlab.com/Rashi/Rashi.html.
- C:\Users\mswad\Claude\Projects\Torah JSX (1)\Rashi-Bereshit\Rashi-Bereshit.html is kept as a redirect to the new page so old links work. Nothing else is in that folder.
- The page has always held all five books; it opens on Bereshit because that is the current parsha (week of 2026-10-06).

## Once-over (2026-10-07)
- Display names switched to Ashkenazi spelling (site house rule in C:\Users\mswad\Claude\Projects\Torah JSX (1)\dev\FIX-PROMPTS.md): map PN and BN in rashi.js; data files keep Sefaria spellings (Genesis, Bereshit) because the Sefaria links and the build keys use them.
- Data audit: 266 foreign-word cards all have a Rashi comment, translation, verse, meaning and English; no duplicate card ids; 7 of the 1,064 comment cards have no dibbur hamaschil in the printed text (parenthetical comments) and show their first three words instead.
- Still open: Grammar and Targum false-hit review; Leipzig 1 readings unchecked against the page; 259 la'az entries not weighed independently; registry row in C:\Users\mswad\Dropbox\_CLAUDE INDEX\PROJECT REGISTRY.md.
