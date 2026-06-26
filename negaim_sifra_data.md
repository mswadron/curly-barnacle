# Negaim × Toras Kohanim (Sifra) — Source Data File

**Status:** Batch 1 of ~3 — for review before any rendering.
**Purpose:** Add the tannaitic Sifra (Toras Kohanim) layer *beneath* the existing Rambam (`RM`) and Mishnah (`MN`) registries in `negaim_working.jsx`. Sifra is the halachic midrash on Vayikra and is the primary tannaitic source from which the negaim halachos in the Mishnah and Rambam derive.

**Source discipline (per project standard):**
- Every entry carries a **verbatim** quote pulled directly from Sefaria (`sourcing: "direct"`) plus a plain descriptive gloss (my neutral wording, never attributed to the Sifra).
- Hebrew = *Venice 1545* edition (Sefaria's vocalized base text for Sifra). English = *Sifra, Rabbi Shraga Silverstein* (the only English on Sefaria).
- `ref` values are live Sefaria references, verified to resolve.
- No paraphrase is presented as the Sifra's words; no derashah is summarized as if quoted.

**Proposed integration:** a new `TK` registry parallel to `RM`/`MN`, with each tree node's `src` gaining an optional `tk` pointer. The right-rail source block would then show **Pasuk → Sifra (Toras Kohanim) → Mishnah → Rambam** — i.e. verse, then the tannaitic derashah, then the codified Mishnah, then the psak.

**Schema per entry (mirrors the Mumim app):**
`{ he, en, ref, sourcing, claim_type, risk_level, anchors[], gloss, note }`

---

## BATCH 1 — verified anchors

### TK-1 · Only a kohen declares tamei/tahor
- **anchors existing:** `S.kohenOnly` · `MN "נגעים ג:א"` · `RM "א:א"`
- **ref:** `Sifra, Tazria Parashat Negaim, Section 1:9`
- **sourcing:** direct · **claim_type:** text · **risk_level:** low
- **gloss (descriptive):** The pronouncement of tumah/taharah must be made by a kohen; a learned Israelite may perform the inspection and instruct the kohen what to declare.
- **he (verbatim):** "אם סופינו לרבות כל ישראל מה תלמוד לומר 'או אל אחד מבניו הכהנים'? אלא ללמד שאין טומאה וטהרה אלא מפי כהן. הא כיצד? חכם שבישראל רואה את הנגעים ואומר לכהן, אעפ\"י שוטה – 'אמור טמא', והוא אומר טמא. 'אמור טהור', והוא אומר טהור."
- **en (verbatim):** "If in the end all Jews are included (for inspection), why is it written 'of his sons, the Cohanim'? To teach that the pronouncement of 'tumah' and 'taharah' must be made by a Cohein. How is this effected? An Israelite sage inspects the plague-spots and says to the Cohein, even if he himself is unversed (in their inspection): Say 'tamei,' and he says 'tamei'; say 'tahor,' and he says 'tahor.'"
- **note:** This is the tannaitic source for the rule the app currently attributes to Mishnah Negaim 3:1. Section 1:9–10 continues with the day-time and single-examiner derashos (compared to monetary disputes) if you want those as sub-anchors.

### TK-2 · The four appearances (two that are four)
- **anchors existing:** `S.fourShades` · `MN "נגעים א:א"` · `RM "א:א"`
- **ref:** `Sifra, Tazria Parashat Negaim, Section 1:4`
- **sourcing:** direct · **claim_type:** text · **risk_level:** low
- **gloss (descriptive):** Defines se'eis (a "rising," like a shadow appearing higher than sunlight), baheres, and sapachas (an adjunct/secondary shade); the terms combine for negation, confirmation, and quarantine.
- **he (verbatim):** "'שאת' – זו שאת. 'בהרת' – זו בהרת. 'ספחת' – זו שני לבהרת... מה לשון שאת? מוגבהת כמראה הצל שהם גבוהים ממראה החמה. מה לשון עמוק? עמוקה כמראה חמה שהם עמוקים מן הצל. מה לשון ספחת? טפילה שנאמר 'ספחיני נא אל אחת הכהונות'. 'והיה' – מלמד שהם מצטרפין זה עם זה לפטור ולהחליט ולהסגיר."
- **en (verbatim):** "'se'eth': This is (the distinct plague-spot known as) 'se'eth.' 'bahereth': This is (the distinct plague-spot known as) 'bahereth.' 'sapachath': This is an adjunct to (i.e., a lesser form of) se'eth... What is signified by 'se'eth'? A 'rising,' as the appearance of a shadow, which seems higher than that of the sun. What is signified by 'deeper'? As the appearance of the sun, which seems deeper than that of the shadow. What is signified by 'sapachath'? 'adjunct'... 'and it shall be': (We are hereby taught...) that they combine with each other for purposes of negation (of leprosy), confirmation, and quarantine."
- **note:** Anchors the "deeper = like sunlight vs shade" gloss the app currently marks as Rashi (`S.deeper`). The Sifra is the source of that very image ("כמראה הצל / כמראה חמה"); worth showing both.

### TK-3 · Examined on intermediate skin tone (Germani / Kushi)
- **anchors existing:** `S.skinExamRule` · `MN "נגעים ב:ד"`
- **ref:** `Sifra, Tazria Parashat Negaim, Section 1:4–5`
- **sourcing:** direct · **claim_type:** text · **risk_level:** low
- **SENSITIVITY:** Handle exactly as the Mumim app handles the R' Ḥanina "kushi" view — preserve the rabbinic statement faithfully; frame it as a halachic standard for *contrast visibility* of a spot against skin tone, not a statement about race. R' Yishmael's "כאשכרוע / intermediate" is the adopted standard.
- **gloss (descriptive):** A bright spot looks dull on fair skin and a dull spot looks bright on dark skin; therefore Bnei Yisrael are inspected as "intermediate" toned, so the appearance is judged leniently.
- **he (verbatim):** "'בעור בשרו' – בעור בשר של נראה. מכאן אמרו בהרת עזה נראית בגרמני כהה, והכהה בכושי עזה. ר׳ ישמעאל אומר בית ישראל הריני כפרתן הרי הן כאשכרוע, לא שחורים ולא לבנים אלא בינונים."
- **en (verbatim):** "'in the skin of his flesh': in (i.e., relative to) the skin of the flesh of the observed. In this connection it was stated: A very bright spot seems dull in a (light-complected) German, and a dull spot in an Ethiopian seems bright. R. Yishmael says: The children of Israel ('may I be an atonement for them') are like the eshkeroa (the box-tree), neither black nor white but intermediate."
- **note:** Directly underlies Mishnah Negaim 2:4 (already in the app's `MN`). The Mishnah's "כאשכרוע" is quoting this Sifra.

### TK-4 · Minimum size — a gris
- **anchors existing:** `S.grisSize` · `MN "נגעים ו:א"` · `RM "א:ג"`
- **ref:** `Sifra, Tazria Parashat Negaim, Section 1:6`
- **sourcing:** direct · **claim_type:** text · **risk_level:** low
- **gloss (descriptive):** The word "tzara'as" (read as redundant) teaches the spot must be at least the size of a gris (bean).
- **he (verbatim):** "'צרעת' – כגריס. הלא דין הוא! טימא כאן וטימא במחיה, מה מחיה כגריס אף כאן בגריס."
- **en (verbatim):** "The (redundant) 'leprosy' indicates that it must be (at least) the size of a garis (a bean). (Why is a verse necessary for this?) Does it not follow? viz.: 'timei' is written here, and 'timei' is written in respect to michyah. Just as there, the size of a garis; here, too, the size of a garis."
- **note:** Tannaitic source for the gris-square minimum the app shows via Mishnah Negaim 6:1 and Rambam 1:3.

### TK-5 · White-hair ORDER rule + the safek dispute  ★ highest value
- **anchors existing:** `S.hairOrder` · `S.unkOrder` · `MN "נגעים ד:יא"` · `RM "ב:ב"`/`"ב:ט"`
- **ref:** `Sifra, Tazria Parashat Negaim, Chapter 2:2`
- **sourcing:** direct · **claim_type:** text · **risk_level:** low
- **gloss (descriptive):** White hair is a tumah-sign only if it appeared *after* the spot. If the spot preceded the hair — tamei; if the hair preceded the spot — tahor; if the order is in doubt — tamei (R' Yehoshua: keihah / quarantine).
- **he (verbatim):** "'בנגע הפך לבן' – לא הקודם. מכאן אמרו אם בהרת קדמה לשער לבן – טמא. ואם שער לבן קודם לבהרת – טהור. ואם ספק – טמא. ר' יהושוע אומר כהה."
- **en (verbatim):** "'has turned white': and not (if it was white) before (the appearance of the plague-spot). From here they ruled: If the bahereth preceded the white hair, he is tamei; if the white hair preceded the bahereth, he is tahor; if there is a doubt (as to which preceded which), he is tamei. R. Yehoshua says: It is 'dim' (and he is to be quarantined)."
- **note:** This is the **tannaitic origin of the exact safek machlokes the app already renders** at the `skin_signs → ספק — לא ידוע` node (currently sourced only to Mishnah Negaim 4:11 + Rambam 2:9). The Mishnah's "ספק... טמא. ר' יהושע: כהה" is lifted from this Sifra. Strongest single addition in this batch.

### TK-6 · White hair — minimum two; root vs. tip
- **anchors existing:** `S.whiteHair` · `MN "נגעים ד:ד"` · `RM "ב:ב"`
- **ref:** `Sifra, Tazria Parashat Negaim, Chapter 2:2–3`
- **sourcing:** direct · **claim_type:** text · **risk_level:** low
- **gloss (descriptive):** "Hair" = at least two hairs; what matters is the root: roots black/tips white = tahor, roots white/tips black = tamei.
- **he (verbatim):** "'ושיער' מיעוט שיער שתי שערות... 'ושיער בנגע הפך לבן' – מכאן אמרו שתי שערות עיקרן משחיר וראשן מלבין, טהור. עיקרם מלבין וראשם משחיר, טמא."
- **en (verbatim):** "'If hair in the plague-spot': at least two hairs... 'If the hair in the plague-spot has turned white': From here they ruled: (If there were) two hairs, their roots black and their tops white, he is tahor; their roots white and their tops black, he is tamei."
- **note:** Underlies the app's "minimum 2 hairs" rule (currently Mishnah Negaim 4:4 / Rashi 13:3). The root-vs-tip detail is an enrichment not currently in the app.

### TK-7 · White (nega) vs. yellow (nesek) — why hair color differs
- **anchors existing:** distinguishes `S.whiteHair` (nega) from `S.yellowHair` (nesek)
- **ref:** `Sifra, Tazria Parashat Negaim, Chapter 2:4`
- **sourcing:** direct · **claim_type:** text · **risk_level:** low
- **gloss (descriptive):** In a skin-nega the tumah-sign hair must be white — not red, green, black, or yellow; yellow hair is the sign specifically for a nesek, not a nega.
- **he (verbatim):** "'לבן' – לא אדום ולא ירוק ולא שחור. אוציא את כולם ולא אוציא שער צהוב?... ת\"ל 'שיער לבן' ולא צהוב."
- **en (verbatim):** "'has turned white': and not red, and not green, and not black. I would exclude all of these, but not yellow... It is, therefore, written: 'white hair,' and not yellow."
- **note:** Good connective tissue between the app's skin-nega branch and its nesek branch — explains *why* the sign-color flips.

### TK-8 · The 24 limb-tips not subject to michya (single-glance rule)
- **anchors existing:** relates `S.michya` · `S.beisHastarim` · `MN "נגעים ו:ח"`
- **ref:** `Sifra, Tazria Parashat Negaim, Chapter 2:8–9`
- **sourcing:** direct · **claim_type:** text · **risk_level:** low
- **gloss (descriptive):** A nega must be seen in a single glance; therefore 24 curved limb-tips (finger/toe tips, ear tips, nose tip, etc.) cannot become tamei via michya.
- **he (verbatim):** "'וראהו' – כולו כאחת... מיכן אמרו עשרים וארבעה ראשי איברים שבאדם שאינם מיטמאים משום מחיה: ראשי אצבעות ידים ורגלים, וראשי אזנים, וראש החוטם, וראש הגויה, וראשי דדים שבאשה."
- **en (verbatim):** "'and he shall see it': all as one... From here they ruled: There are twenty-four limb tips in a man which (because they cannot be observed in one sighting) do not become tamei by reason of michyah: the finger tips of hands and feet, the ear tips, the nose tip, the membrum tip, and the breast tips in a woman."
- **note:** Pairs with the app's beis-hastarim rule (Mishnah Negaim 6:8, already present). The "single glance" principle is the shared root of both.

---

## BATCH 2 — to pull next (mapping known, text not yet retrieved)
Each maps to an existing `S` entry; I'll pull verbatim HE+EN the same way once you approve the format above.

- **michya as a positive tumah-sign** (`S.michya`, Vayikra 13:10) → Sifra Chapter ~3–4
- **hesger / confinement seven days** (`S.hesger`, 13:4–5) → Sifra Section 2
- **pisyon / spreading** (`S.spreading`, 13:7) → Sifra Section 2–3
- **"פרח בכולו טהור" — full-body coverage** (`S.fullBody`/`S.fullBodyRaw`, 13:12–15) → Sifra Chapter ~7
- **shechin & michva — one hesger only** (`S.shechin`/`S.burn`/`S.oneHesger`, 13:18–28) → Sifra Chapter ~9
- **nesek — yellow hair positive sign** (`S.yellowHair`/`S.nesek`, 13:29–37) → Sifra Chapter ~10–11
- **karachas / gabachas** (`S.baldness`, 13:40–44) → Sifra Chapter ~12
- **garment nega'im — wool/linen/leather** (`S.clothing`/`S.clothingBurn`, 13:47–59) → Sifra Chapter ~14–16
- **metzora — "בדד ישב" dwelling alone** (`S.metzora`/`S.muchlat`, 13:45–46) → Sifra (note: the "נתקו לעשה" form is Pesachim 67a; the Sifra parallel to confirm)
- **metzora taharah — birds / shaving / korbanos** (`S.taharahBirds`/`Shave`/`Korban`, 14:1–32) → Sifra Metzora
- **negaei batim — houses** (`S.houses`/`housesColor`/`housesEmpty`/`housesDemolish`, 14:33–53) → Sifra Metzora

---

## Open questions for you
1. **Rail order** — confirm Pasuk → Sifra → Mishnah → Rambam (Sifra placed between verse and Mishnah)?
2. **Depth** — for each anchor, show the *full* Sifra segment (verbatim, can be long) or a trimmed verbatim core with a "full text on Sefaria" link?
3. **Hebrew edition** — Venice 1545 is Sefaria's base; acceptable, or do you want me to check for a Weiss/other edition where it matters?
4. **Scope** — proceed through all of Batch 2, or only the person/skin branch for now?
