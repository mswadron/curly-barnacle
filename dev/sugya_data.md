# Part D Data — Signs-Derivation Sugya (Chullin 60b–61b)

This is the data file for the new scaffolded Part D. All text is verbatim from Sefaria via the connector, retrieved this session. No paraphrases of the Gemara — every Aramaic line is reproduced exactly as it appears in the William Davidson Edition (Vocalized Aramaic). Same discipline as Parts A, B, C.

---

## 1. Scope of This Sugya

**Sugya boundaries (verified from Sefaria connector):**
- **Start:** Chullin 60b, final sentence — `סִימָנֵי הָעוֹף לֹא נֶאֶמְרוּ, וְלָא? וְהָתַנְיָא: ״נֶשֶׁר״`
- **End:** Chullin 61b, after the *gemiri* count statement, closing with `אֶלָּא, תּוֹרִין דִּכְתַב רַחֲמָנָא לְמָה לִי? אָמַר רַב עוּקְבָא בַּר חָמָא: לְקׇרְבָּן`
- **Total span:** approximately 13 distinct sugya moves

The Gemara is responding to the Mishnah's claim (Chullin 3:6) that *"the signs of birds were not stated"* by saying *"and indeed not? Wasn't it taught..."* — a baraita appears that purports to derive the signs from both *nesher* (the prototype non-kosher bird) and *tor* (the prototype kosher bird). The sugya then runs in cascading circles trying to determine how strict the derivation should be: 4 signs missing → forbidden? 3? 2? 1? — and at each level, the Torah's separate listing of other birds blocks that derivation.

---

## 2. Schema

Every scaffold unit has these fields:

| Field | Type | Notes |
|---|---|---|
| `unit_id` | string | e.g. `"u01"` |
| `unit_label` | string | display, e.g. "Opening · The Baraita" |
| `move_type` | enum | "baraita" / "challenge" / "attempted derivation" / "rejection" / "principle" / "structural claim" / "resolution" |
| `aramaic` | string | verbatim Aramaic from Sefaria, exact |
| `sefaria_url` | string | direct link |
| `daf_position` | string | e.g. "60b end" / "61a §1" |
| `transliteration_marker` | string \| null | the key phrase that signals what this move is doing |
| `unit_summary` | string \| null | one-line plain English description of what's happening (not a paraphrase of the Gemara — a label) |
| `connects_to_prev` | string \| null | how this unit responds to the previous |
| `connects_to_next` | string \| null | what move comes next |
| `english_davidson` | string \| null | TBD per decision point below |

---

## 3. Decisions Needed Before Rendering

**Decision 1: Davidson English under each Aramaic unit?**

I can fetch the William Davidson Edition English translation for each segment via the same connector. Options:

- (a) Include Davidson English directly under each Aramaic unit — fastest comprehension for students, doubles the visual density
- (b) Aramaic only with "Verify at Sefaria" link (matches Part B's strict policy)
- (c) Hover/click toggle — Aramaic primary, English revealed on tap

**Decision 2: Visual format**

- (a) Linear scaffold cards (one card per unit, same as Part B's specimen cards) — top to bottom
- (b) Flowchart visual showing the cascade of failed derivations branching from each rejection
- (c) Both — primary linear scaffold, with one summary flowchart at the top showing the 4→3→2→1→0 cascade in one glance

**Decision 3: Integration with the trilogy**

This becomes **Part D**, sitting after Part C. The four-part nav becomes "Framework · Specimens · Orders · Sugya." Part A Section II already mentions the Mishnah and the four signs; Part D is the "show your work" deep-dive showing the Gemara's actual derivation attempts.

Cross-links:
- Part A Section II → "See the full Gemara derivation in Part D"
- Part D individual mentions of *nesher*, *peres*, *ozniyah*, *orev*, *tor* → link to the corresponding Part B specimen rows where they exist (no Part B row for *tor* since it's not on the forbidden list, but mentions in Part D can carry an inline footnote)
- Part D closing → cross-references back to Part A Section III (mesorah)

---

## 4. The 13 Scaffold Units

### Unit 01 — Opening Challenge
- `unit_id`: `u01`
- `unit_label`: "I · Opening — *Are the signs not stated?*"
- `move_type`: baraita
- `daf_position`: 60b §17
- `transliteration_marker`: `סימני העוף לא נאמרו, ולא?`
- `aramaic`: `סִימָנֵי הָעוֹף לֹא נֶאֶמְרוּ, וְלָא? וְהָתַנְיָא: ״נֶשֶׁר״`
- `sefaria_url`: `https://www.sefaria.org/Chullin.60b`
- `unit_summary`: "The Gemara challenges the Mishnah's flat statement that the bird signs are unstated. A baraita on *nesher* will be cited to argue the signs *are* derivable from the Torah."
- `connects_to_prev`: "Picks up the closing line of Mishnah Chullin 3:6"
- `connects_to_next`: "The baraita's content follows on 61a"

### Unit 02 — The Two-Sided Baraita (nesher + tor)
- `unit_id`: `u02`
- `unit_label`: "II · The Baraita — Two Prototypes"
- `move_type`: baraita
- `daf_position`: 61a §1
- `transliteration_marker`: `מה נשר מיוחד... תורין שיש להן...`
- `aramaic`: `מָה נֶשֶׁר מְיוּחָד שֶׁאֵין לוֹ אֶצְבַּע יְתֵרָה וְזֶפֶק וְאֵין קוּרְקְבָנוֹ נִקְלָף וְדוֹרֵס וְאוֹכֵל – טָמֵא, אַף כׇּל כַּיּוֹצֵא בּוֹ – טָמֵא. תּוֹרִין שֶׁיֵּשׁ לָהֶן אֶצְבַּע יְתֵרָה וְזֶפֶק וְקוּרְקְבָן נִקְלָף וְאֵין דּוֹרְסִין וְאוֹכְלִין – טְהוֹרִין, אַף כׇּל כַּיּוֹצֵא בָּהֶן – טְהוֹרִין. אָמַר אַבָּיֵי: לֹא נֶאֱמַר פֵּירוּשָׁן מִדִּבְרֵי תוֹרָה אֶלָּא מִדִּבְרֵי סוֹפְרִים.`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61a.1`
- `unit_summary`: "The baraita derives from both ends: *nesher* (0/4 positive signs, all forbidden traits → forbidden) and *tor* (4/4 positive signs → permitted). Abaye glosses: the signs themselves are *m'divrei sofrim* — even if the derivation logic is Toraitic, the specific identification of which traits count comes from the Sages."
- `connects_to_prev`: "This is the baraita cited at u01"
- `connects_to_next`: "R. Chiya will push back on whether 1 sign is enough"

### Unit 03 — R. Chiya's One-Sign Position
- `unit_id`: `u03`
- `unit_label`: "III · R. Chiya — One Sign Is Enough"
- `move_type`: principle
- `daf_position`: 61a §2
- `transliteration_marker`: `עוף הבא בסימן אחד טהור`
- `aramaic`: `תָּנֵי רַבִּי חִיָּיא: עוֹף הַבָּא בְּסִימָן אֶחָד טָהוֹר, לְפִי שֶׁאֵין דּוֹמֶה לְנֶשֶׁר. נֶשֶׁר דְּלֵית לֵיהּ כְּלָל – הוּא דְּלָא תֵּיכוֹל, הָא אִיכָּא דְּאִית לֵיהּ חַד – תֵּיכוֹל.`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61a.2`
- `unit_summary`: "R. Chiya: a bird with even *one* positive sign is permitted, because it no longer matches *nesher* (which has zero). The *nesher*-based derivation forbids only birds with **no** positive signs."
- `connects_to_prev`: "Reads the baraita's *nesher* clause strictly"
- `connects_to_next`: "The Gemara now asks: why not derive the opposite way, from *tor* requiring all 4?"

### Unit 04 — Why Not Derive From Tor?
- `unit_id`: `u04`
- `unit_label`: "IV · The First Inversion — Derive From *Tor*?"
- `move_type`: attempted derivation
- `daf_position`: 61a §3
- `transliteration_marker`: `ולילף מתורין... עד דאיכא כולהו ארבעה`
- `aramaic`: `וְלֵילַף מִתּוֹרִין: מָה תּוֹרִין דְּאִיכָּא כּוּלְּהוּ אַרְבְּעָה, אַף הָכָא נָמֵי עַד דְּאִיכָּא כּוּלְּהוּ אַרְבְּעָה?`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61a.3`
- `unit_summary`: "Why not derive from *tor* (the kosher prototype) and require all four positive signs for kashrut? Under this reading, R. Chiya's one-sign permission would fail."
- `connects_to_prev`: "Challenges R. Chiya's permissive reading"
- `connects_to_next`: "The Gemara rejects this with a structural argument"

### Unit 05 — Rejection: Why List Other Birds Then?
- `unit_id`: `u05`
- `unit_label`: "V · Rejection — Why Are Other Birds Listed?"
- `move_type`: rejection
- `daf_position`: 61a §4
- `transliteration_marker`: `אם כן, שאר עופות טמאין דכתב רחמנא למה לי?`
- `aramaic`: `אִם כֵּן, שְׁאָר עוֹפוֹת טְמֵאִין דִּכְתַב רַחֲמָנָא לְמָה לִי?`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61a.4`
- `unit_summary`: "If we required all four positive signs (the *tor* derivation), the Torah's explicit list of other forbidden birds would be redundant. **This is the move that will repeat at every level of the cascade.**"
- `connects_to_prev`: "Blocks the *tor* derivation"
- `connects_to_next`: "Now the Gemara tries to derive from the listed birds themselves"

### Unit 06 — Three-Sign Birds: Derive From Them?
- `unit_id`: `u06`
- `unit_label`: "VI · Three Signs — Derive From the Listed Birds?"
- `move_type`: attempted derivation
- `daf_position`: 61a §5
- `transliteration_marker`: `ונילף מינייהו... מה התם תלתא ולא אכלינן`
- `aramaic`: `וְנֵילַף מִינַּיְיהוּ: מָה הָתָם תְּלָתָא וְלָא אָכְלִינַן, אַף כֹּל תְּלָתָא וְלָא נֵיכוֹל, וְכׇל שֶׁכֵּן תְּרֵי וְחַד?`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61a.5`
- `unit_summary`: "Twenty of the listed forbidden birds have *three* of the four signs (lacking only *dores*). Why not derive: any bird with three signs is forbidden? *Kal va-chomer* extends this to two-sign and one-sign birds."
- `connects_to_prev`: "Alternative to deriving from *tor*"
- `connects_to_next`: "*Orev* blocks this — it has only 2 signs"

### Unit 07 — Rejection: But Then Why List *Orev*?
- `unit_id`: `u07`
- `unit_label`: "VII · Rejection — But Why List *Orev*?"
- `move_type`: rejection
- `daf_position`: 61a §6
- `transliteration_marker`: `אם כן, עורב, דכתב רחמנא, למה לי?`
- `aramaic`: `אִם כֵּן, עוֹרֵב, דִּכְתַב רַחֲמָנָא, לְמָה לִי? הַשְׁתָּא דְּאִית לֵיהּ תְּלָתָא לָא אָכְלִינַן, דְּאִית לֵיהּ תְּרֵי מִיבַּעְיָא?`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61a.6`
- `unit_summary`: "If three-sign birds are already covered by kal va-chomer (from the major group), why does the Torah separately list *orev* (which has only two signs)? The kal va-chomer collapses the need for the listing — therefore the derivation must be wrong."
- `connects_to_prev`: "Same structural objection as u05, one level down"
- `connects_to_next`: "Try deriving from *orev* itself (two-sign baseline)"

### Unit 08 — Two-Sign Birds: Derive From *Orev*?
- `unit_id`: `u08`
- `unit_label`: "VIII · Two Signs — Derive From *Orev*?"
- `move_type`: attempted derivation
- `daf_position`: 61b §1 (first half)
- `transliteration_marker`: `ולילף מעורב... מה התם תרי לא`
- `aramaic`: `וְלֵילַף מֵעוֹרֵב: מָה הָתָם תְּרֵי לָא, אַף כֹּל תְּרֵי לָא?`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61b.1`
- `unit_summary`: "Then derive from *orev*: two signs is enough to forbid, and kal va-chomer extends to one-sign birds."
- `connects_to_prev`: "Same logic, lower threshold"
- `connects_to_next`: "*Peres* and *ozniyah* block this — they have only 1 sign"

### Unit 09 — Rejection: Why List *Peres* and *Ozniyah*?
- `unit_id`: `u09`
- `unit_label`: "IX · Rejection — But Why List *Peres* and *Ozniyah*?"
- `move_type`: rejection
- `daf_position`: 61b §1 (second half)
- `transliteration_marker`: `אם כן, פרס ועזניה דכתב רחמנא למה לי?`
- `aramaic`: `אִם כֵּן, פֶּרֶס וְעׇזְנִיָּה דִּכְתַב רַחֲמָנָא לְמָה לִי? הַשְׁתָּא דְּאִית לֵיהּ תְּרֵי לָא אָכְלִינַן, דְּאִית לֵיהּ חַד מִיבַּעְיָא!`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61b.1`
- `unit_summary`: "If two-sign birds are forbidden by kal va-chomer, why does the Torah list *peres* and *ozniyah* (each with one sign)? The cascade has reached the next-to-last level."
- `connects_to_prev`: "The same blocking move continues downward"
- `connects_to_next`: "Try deriving from *peres* and *ozniyah* themselves"

### Unit 10 — One-Sign Birds: Derive From *Peres* and *Ozniyah*?
- `unit_id`: `u10`
- `unit_label`: "X · One Sign — Derive From *Peres* and *Ozniyah*?"
- `move_type`: attempted derivation
- `daf_position`: 61b §2 (first half)
- `transliteration_marker`: `ונגמר מפרס ועזניה`
- `aramaic`: `וְנִיגְמַר מִפֶּרֶס וְעׇזְנִיָּה?`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61b.2`
- `unit_summary`: "Then derive from *peres* and *ozniyah*: one positive sign is enough to forbid. Kal va-chomer would then forbid zero-sign birds too — which collapses back into the *nesher* case."
- `connects_to_prev`: "The cascade has fully wound down to one sign"
- `connects_to_next`: "*Nesher* now becomes the redundancy"

### Unit 11 — Rejection: Why List *Nesher*?
- `unit_id`: `u11`
- `unit_label`: "XI · Rejection — But Why List *Nesher*?"
- `move_type`: rejection / partial resolution
- `daf_position`: 61b §2 (second half)
- `transliteration_marker`: `אם כן, נשר דכתב רחמנא למה לי?`
- `aramaic`: `אִם כֵּן, נֶשֶׁר דִּכְתַב רַחֲמָנָא לְמָה לִי? הַשְׁתָּא דְּאִית לֵיהּ חַד לָא אָכְלִינַן, דְּלֵית לֵיהּ כְּלָל מִיבַּעְיָא! אֶלָּא נֶשֶׁר דְּלֵית לֵיהּ כְּלָל – הוּא דְּלָא תֵּיכוֹל, הָא דְּאִית לֵיהּ חַד – אֱכוֹל.`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61b.2`
- `unit_summary`: "If one-sign birds are forbidden, why does the Torah list *nesher* (zero signs)? The kal va-chomer would already cover it. **Resolution begins:** *nesher* must be listed precisely *because* it has none — only the zero-sign case is forbidden by the *nesher* derivation; one-sign birds are permitted (which is R. Chiya's position from u03)."
- `connects_to_prev`: "Closes the cascade by pulling it back to R. Chiya"
- `connects_to_next`: "But this raises a new problem about *peres* and *ozniyah* — addressed in u12"

### Unit 12 — The Two-Verses Principle
- `unit_id`: `u12`
- `unit_label`: "XII · *Shnei Kesuvim Ha-ba'in Ke-echad*"
- `move_type`: principle
- `daf_position`: 61b §3
- `transliteration_marker`: `שני כתובין הבאין כאחד אין מלמדין`
- `aramaic`: `וְאֶלָּא, טַעְמָא דִּכְתַב רַחֲמָנָא נֶשֶׁר, הָא לָאו הָכִי הֲוָה אָמֵינָא: לֵילַף מִפֶּרֶס וְעׇזְנִיָּה? הָוֵה לֵיהּ פֶּרֶס וְעׇזְנִיָּה שְׁנֵי כְתוּבִין הַבָּאִין כְּאֶחָד, וּשְׁנֵי כְּתוּבִין הַבָּאִין כְּאֶחָד אֵין מְלַמְּדִין.`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61b.3`
- `unit_summary`: "Refining: even without *nesher*, the *peres*-and-*ozniyah* derivation would have failed independently. *Peres* and *ozniyah* are 'two verses that come as one' — and a principle of the Talmud is that such pairs cannot teach a derived rule. So *nesher*'s listing isn't strictly needed to block the *peres/ozniyah* derivation; it's blocked already."
- `connects_to_prev`: "Strengthens u11 with a separate Toraitic principle"
- `connects_to_next`: "The Gemara now articulates *why* peres and ozniyah qualify as shnei kesuvim ha-ba'in ke-echad"

### Unit 13 — The Structural Count and Resolution
- `unit_id`: `u13`
- `unit_label`: "XIII · The 24-Bird Structural Count"
- `move_type`: structural claim / resolution
- `daf_position`: 61b §5–6
- `transliteration_marker`: `גמירי: עשרים וארבעה עופות טמאים הוו...`
- `aramaic`: `גְּמִירִי, דְּאִיכָּא בְּהַאי לֵיכָּא בְּהַאי, וּדְאִיכָּא בְּהַאי לֵיכָּא בְּהַאי. מִכְּדֵי עֶשְׂרִים וְאַרְבָּעָה עוֹפוֹת טְמֵאִים הָווּ, אִי אֶפְשָׁר דְּחַד דְּאִיכָּא בְּהָנָךְ לֵיכָּא בְּהָנֵי, וְהָווּ לְהוּ שְׁנֵי כְּתוּבִים הַבָּאִים כְּאֶחָד. גְּמִירִי: עֶשְׂרִים וְאַרְבָּעָה עוֹפוֹת טְמֵאִים הָווּ, וְאַרְבָּעָה סִימָנִין. תְּלָתָא הָדְרִי בְּכוּלְּהוּ, עֶשְׂרִים מֵהֶם שְׁלֹשָׁה שְׁלֹשָׁה, וּתְרֵי בְּעוֹרֵב, חַד בְּפֶרֶס וְחַד בְּעׇזְנִיָּה, דְּאִיתֵיהּ בְּהָא לֵיתֵיהּ בְּהָא. מַהוּ דְּתֵימָא לֵילַיף מִינֵּיהּ – כְּתַב רַחֲמָנָא ״נֶשֶׁר״, נֶשֶׁר דְּלֵית לֵיהּ כְּלָל הוּא דְּלָא תֵּיכוֹל, הָא אִיכָּא דְּאִית לֵיהּ חַד – אֱכוֹל.`
- `sefaria_url`: `https://www.sefaria.org/Chullin.61b.5`
- `unit_summary`: "The closing structural claim that anchors the whole sugya. **Received tradition** (*gemiri*): there are exactly 24 non-kosher birds and four signs. Twenty of them have three of the four signs (lacking only *dores*). Two signs are in *orev*. One sign each in *peres* and *ozniyah* — and the sign present in *peres* is **absent** in *ozniyah*, and vice versa. This proves *peres* and *ozniyah* are *shnei kesuvim ha-ba'in ke-echad* in the formal sense: each carries information the other lacks, so neither alone is sufficient and together they cannot teach by *binyan av*. The Torah's explicit listing of *nesher* is therefore necessary as the zero-sign anchor — which establishes R. Chiya's position that **one positive sign is enough to permit**."
- `connects_to_prev`: "Provides the data that justifies the *shnei kesuvim* principle from u12"
- `connects_to_next`: "Sugya closes; the question 'why list *tor* then?' is answered with Rav Ukva bar Chama's *l'korban* (for sacrifice) — which is outside the kashrut derivation entirely"

---

## 5. The Cascade Visualized (Summary Table)

| Threshold | Derived from | Blocked by | Move |
|---|---|---|---|
| **4 signs required** | *tor* (kosher prototype) | *Other listed birds redundant* | u04 → u05 |
| **3 signs forbids** | The 20 listed birds | *Why list orev?* | u06 → u07 |
| **2 signs forbids** | *orev* | *Why list peres/ozniyah?* | u08 → u09 |
| **1 sign forbids** | *peres* + *ozniyah* | *Why list nesher?* | u10 → u11 |
| **0 signs forbids only** | *nesher* | (Resolution) | u11 |

The cascade goes **down** from 4 → 0. Each attempted derivation is blocked by the next level of listed birds becoming redundant. The resolution lands at R. Chiya's permissive reading: only *nesher*-level birds (zero positive signs) are forbidden by the *nesher* derivation; one-sign birds are permitted.

---

## 6. Cross-Links to Parts A, B, C

Each unit's content connects to existing trilogy anchors:

- **u02** (nesher / tor baraita) → cross-link to Part B `#nesher` for *nesher* specimen, footnote for *tor* (not in Part B since it's not forbidden)
- **u02** (Abaye's *m'divrei sofrim*) → cross-link to Part A `#four-signs` for the Mishnah text
- **u03** (R. Chiya's one-sign principle) → cross-link to Part A Section II
- **u07** (*orev*) → Part B `#orev`
- **u08–u13** (*peres*, *ozniyah*) → Part B `#peres` and `#ozniyah` (which already carry the **Structural anchor only** chip referring to this very sugya)
- **u13** (the 24-bird count) → Part B `#nesher` row (which already quotes this gemiri verbatim) — closes a clean loop

---

## 7. Part D Navigation Integration

Part D becomes the fourth tab in the existing nav:

`Part A · Framework  |  Part B · Specimens  |  Part C · Orders  |  Part D · Sugya`

Cross-link updates in the existing parts:
- **Part A Section II** end of the four-signs block: add a closing line *"For the full Gemara derivation showing how the Sages arrived at these signs, see Part D."*
- **Part B `#peres` and `#ozniyah` rows** (currently chipped "Structural anchor only"): the chip already references Chullin 61b's structural count — add a cross-link to Part D unit u13 where this is fully unpacked
- **Part C Accipitriformes caveat** about peres/ozniyah's one-sign status: link to Part D u13

---

## 8. What Part D Does NOT Contain

Same discipline as the trilogy:

- No paraphrased Aramaic presented as Gemara
- No attributions to Rishonim unless verbatim text is reproduced with link
- No halakhic conclusions about which birds are kosher
- No reconstruction of arguments not present in the verbatim text
- No evolution / convergent / phylogeny language
- Hebrew/Aramaic spans all carry `lang="he" dir="rtl"`
- Print-friendly CSS

---

## 9. Open Questions Before Rendering

1. **Davidson English under each unit?** (a / b / c from §3)
2. **Visual format?** (a / b / c from §3)
3. **Unit summaries — appropriate level of editorial voice?** I've labeled what each move is doing in plain English. These are NOT paraphrases of the Gemara (they don't put words in the Gemara's mouth) — they're descriptive labels about what the sugya structure is doing. But they're still my voice. Acceptable, or should they be stripped/shortened?
4. **`gemiri` translation.** I left *gemiri* in transliteration ("received tradition") in u13. Davidson renders it "it is learned by tradition." Either way works. Preference?
5. **The "cascade table" in §5.** Useful summary or noise? It compresses the whole sugya into 5 rows — your call whether that aids the bite-sized goal or undercuts the scaffold-card format.

Awaiting your sign-off on these 5 questions, then I render Part D and update Parts A, B, C with the new cross-links.
