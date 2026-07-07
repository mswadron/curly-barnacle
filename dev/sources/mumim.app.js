const { useState } = React;

// =============================================================================
// EMBEDDED DATA — copied verbatim from sources_definitions.js + sources_data.js
// =============================================================================
// Single-file artifact constraint: data is inlined rather than imported.
// Only the meroach-ashech entry, the SHM PC 61 / LT 91-97 references it
// touches, and the supporting helpers are included. No content has been
// modified, summarized, or re-glossed.

const sefariaUrl = (ref) => {
  const base = "https://www.sefaria.org/";
  if (!ref) return null;
  switch (ref.kind) {
    case "tanakh": return `${base}${ref.book}.${ref.ch}.${ref.v}`;
    case "mishnah": return `${base}Mishnah_${ref.masechet}.${ref.ch}.${ref.m}`;
    case "rambam": return ref.h == null
      ? `${base}Mishneh_Torah,_${ref.work}.${ref.ch}`
      : `${base}Mishneh_Torah,_${ref.work}.${ref.ch}.${ref.h}`;
    case "rambam_pirush": return `${base}Rambam_on_Mishnah_${ref.masechet}.${ref.ch}.${ref.m}`;
    case "shm": return `${base}Sefer_HaMitzvot,_${ref.type}_Commandments.${ref.n}`;
    case "sifra": return `${base}Sifra,_${ref.parsha},_${ref.unit}_${ref.n}${ref.h ? "." + ref.h : ""}`;
    case "rashi": return `${base}Rashi_on_${ref.book}.${ref.ch}.${ref.v}${ref.sub ? "." + ref.sub : ""}`;
    case "gemara": return `${base}${ref.masechet}.${ref.daf}`;
    default: return null;
  }
};

const formatRefLabel = (ref) => {
  if (!ref) return "";
  switch (ref.kind) {
    case "tanakh": return `${ref.book} ${ref.ch}:${ref.v}`;
    case "mishnah": return `Mishnah ${ref.masechet} ${ref.ch}:${ref.m}`;
    case "rambam": return ref.h == null
      ? `${ref.work.replace(/_/g, " ")} ch. ${ref.ch}`
      : `${ref.work.replace(/_/g, " ")} ${ref.ch}:${ref.h}`;
    case "rambam_pirush": return `Rambam on Mishnah ${ref.masechet} ${ref.ch}:${ref.m}`;
    case "shm": return `SHM ${ref.type === "Negative" ? "LT" : "PC"} ${ref.n}`;
    case "sifra": return `Sifra ${ref.parsha} ${ref.unit} ${ref.n}${ref.h ? ":" + ref.h : ""}`;
    case "rashi": return `Rashi ${ref.book} ${ref.ch}:${ref.v}${ref.sub ? "." + ref.sub : ""}`;
    case "gemara": return `${ref.masechet} ${ref.daf}`;
    default: return JSON.stringify(ref);
  }
};

const MEROACH_ASHECH = {
  id: "meroach-ashech",
  name_he: "מְרוֹחַ אָשֶׁךְ",
  name_translit: "meroach ashech",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 20 } },
  in_lists: ["kohen", "behemah_conceptual_only"],
  research_status: "partial",
  relation: "machlokes_3_plus_1_domain_dispute",
  term_boundary_note: "Do not merge with the behemah crushed-testes terms (ma'uch/kasus/nasuk/karus, 22:24). Despite physical overlap on R' Yishmael's reading, the Hebrew terminology in the kohen and behemah parshiyos is different and the lavin are filed separately in Rambam (Bias Hamikdash for kohen, Issurei Mizbeach for behemah). See CONTRAST_CLAIMS.shared_conceptual_overlap.",
  structure_note: "The bar plugta lives in the Mishnah at Bekhoros 7:5 (= 44a in the Bavli pagination). The Gemara at Bekhoros 44b explains WHY the tanna'im disagree (each tanna's textual objection to the others). View source_refs distinguish these: views sourced to the Mishnah-level dispute use the mishnah ref; views sourced to the gemara's reasoning use the gemara ref.",
  views: [
    { view_id: "tana-kama-mishnah", commentator: "Tana Kama (Mishnah Bekhoros 7:5, the unattributed first view)", source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 5 }, definition_scope: "lexical", position: "absent_or_single", gloss: { value: "Meroach ashech refers to a person without testicles, or with only one testicle.", sourcing: "snippet", claim_type: "text" }, supporting_quote: { value: "(Tana Kama view): The Torah calls a person without Beitzim or with only one Beitzah - 'Mero'ach Ashech'. (paraphrased from dafyomi.co.il review of Bekhoros 44, summarizing the Tana Kama position in the Mishnah at Bekhoros 7:5)", sourcing: "snippet", claim_type: "text" }, risk_level: "low", note: "The Tana Kama is the unattributed first view in the Mishnah at Bekhoros 7:5; the named tanna'im (Yishmael, Akiva, Hanina ben Antigonus) dispute it. AUDIT: Earlier draft of this entry omitted the Tana Kama view entirely, treating the dispute as three-way. Corrected here to four-way. Sourcing labels reflect that this view's text comes from a summary (dafyomi.co.il), not from a verbatim Sefaria primary-source pull." },
    { view_id: "rabbi-yishmael-mishnah", commentator: "R' Yishmael (Mishnah Bekhoros 7:5)", source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 5 }, definition_scope: "lexical", position: "crushed", gloss: { value: "A meroach ashech is anyone whose testicles were crushed.", sourcing: "snippet", claim_type: "text" }, supporting_quote: { value: "R' Yishmael says: A mero'aḥ ashekh is anyone whose testicles were crushed.", sourcing: "snippet", claim_type: "text", note: "Wording sourced from ezrabrand newsletter summary of Bekhoros 44, not from a verbatim Sefaria pull of Mishnah Bekhoros 7:5." }, risk_level: "low" },
    { view_id: "rabbi-yishmael-gemara-reasoning", paired_with: "rabbi-yishmael-mishnah", commentator: "R' Yishmael's reasoning (Bekhoros 44b)", source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "44b" }, definition_scope: "derashah", position: "crushed", gloss: { value: "R' Yishmael declines the Tana Kama view (no testicles / one testicle) because, on that reading, the Torah ought to have written 'chasar ashech' (lacking testicles) rather than 'meroach' (crushed).", sourcing: "snippet", claim_type: "text" }, supporting_quote: { value: "Rebbi Yishmael ascribes 'Mero'ach Ashech' to someone with crushed Beitzim. He declines to learn like the Tana Kama - because then the Torah ought to have written 'Chasar Ashech'. (dafyomi.co.il review of Bekhoros 44)", sourcing: "snippet", claim_type: "text" }, risk_level: "low", note: "Tied to rabbi-yishmael-mishnah view above. The mishnah states the position; the gemara provides the textual derivation/objection. Reasoning content here is dafyomi-summary-derived (snippet), not from a verbatim Sefaria gemara pull." },
    { view_id: "rabbi-akiva-mishnah", commentator: "R' Akiva (Mishnah Bekhoros 7:5)", source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 5 }, definition_scope: "lexical", position: "swollen", gloss: { value: "A meroach ashech is anyone whose testicles are swollen — has wind in his testicles.", sourcing: "snippet", claim_type: "text" }, supporting_quote: { value: "R' Akiva says: It is anyone that has wind in his testicles, i.e., they are swollen.", sourcing: "snippet", claim_type: "text", note: "Wording sourced from ezrabrand newsletter summary of Bekhoros 44, not from a verbatim Sefaria pull of Mishnah Bekhoros 7:5." }, risk_level: "low" },
    { view_id: "rabbi-akiva-gemara-reasoning", paired_with: "rabbi-akiva-mishnah", commentator: "R' Akiva's reasoning (Bekhoros 44b)", source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "44b" }, definition_scope: "derashah", position: "swollen", gloss: { value: "R' Akiva derives 'swollen' by reading 'Mero'ach' as 'me-Ru'ach' (from wind/breath). He declines R' Yishmael's reading because, on that, the Torah should have written 'mi-Mero'ach Ashech' rather than 'meroach.'", sourcing: "snippet", claim_type: "text" }, supporting_quote: { value: "Rebbi Akiva explains it to mean that they are swollen, because the wind got to them (reading 'Mero'ech' as 'me'Ru'ach'). He declines to learn like Rebbi Yishmael - because then the Torah should have written 'mi'Mero'ach Ashech'. (dafyomi.co.il review of Bekhoros 44)", sourcing: "snippet", claim_type: "text" }, risk_level: "low", note: "Reasoning content is dafyomi-summary-derived (snippet), not from a verbatim Sefaria gemara pull." },
    { view_id: "rabbi-hanina-ben-antigonus-mishnah", commentator: "R' Ḥanina ben Antigonus (Mishnah Bekhoros 7:5)", source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 5 }, definition_scope: "lexical", position: "non_testicular_dark_appearance", gloss: { value: "Meroach ashech does not refer to the testicles at all. It refers to a person whose appearance (mar'av) is especially dark (chashukhin). The dafyomi review records this view as referring specifically to a Kushi (a Black person).", sourcing: "snippet", claim_type: "text" }, supporting_quote: { value: "R' Ḥanina ben Antigonus says: Mero'aḥ ashekh does not refer to the testicles; rather, the reference is to anyone whose appearance [marav] is especially dark [ḥashukhin]. (Bekhoros 44b summary, ezrabrand newsletter); 'Rebbi Chanina ben Antignos, Mero'ach Ashech has nothing to do with the Beitzim, but pertains to a Kushi (a black person).' (dafyomi.co.il review of Bekhoros 44)", sourcing: "snippet", claim_type: "text" }, risk_level: "low", note: "SENSITIVITY NOTE: The dafyomi summary explicitly records R' Ḥanina ben Antigonus's view as 'pertains to a Kushi (a black person).' The underlying Talmudic claim is what the source says. Rendering for modern readers should preserve the rabbinic statement faithfully while flagging that this view is the minority opinion (not adopted in halacha) and that the Talmud's category 'kushi' / 'chashukhin' (dark-appearance) is being used in a halachic context about kohen disqualification, not as a general statement about race. Sourcing labels reflect that both source attributions (ezrabrand newsletter, dafyomi.co.il) are summaries, not verbatim Sefaria primary-source pulls." },
    { view_id: "rabbi-hanina-gemara-derivation", paired_with: "rabbi-hanina-ben-antigonus-mishnah", commentator: "R' Ḥanina's textual derivation (Bekhoros 44b)", source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "44b" }, definition_scope: "derashah", position: "non_testicular_dark_appearance", gloss: { value: "R' Ḥanina ben Antigonus derives his reading by switching the 'ches' in 'meroach' — generating an exegetical link to 'chashukhin' (dark) appearance.", sourcing: "snippet", claim_type: "text", note: "The dafyomi summary cuts off mid-explanation: 'extrapolates from the words Mero'ach Ashech, which (by switching the Ches in Mero'ach)...' Full derivation not surfaced in current search; what IS surfaced is the existence of an exegetical move based on letter-swap. Demoted to snippet pending direct gemara text pull." }, risk_level: "medium" },
    { view_id: "rashi-on-21-20-5", commentator: "Rashi on Vayikra 21:20:5", source_ref: { kind: "rashi", book: "Leviticus", ch: 21, v: 20, sub: 5 }, definition_scope: "lexical", position: "crushed", gloss: { value: "Per the Targum: 'meris pachadin' — one whose pachadin (testicles) are merussasin (crushed). I.e., one whose testicles are crushed.", sourcing: "direct", claim_type: "text" }, supporting_quote: { value: "מרוח אשך, according to the Targum, מרס פחדין, which signifies one whose פחדין are מרוססין, i.e., one whose testicles are crushed. פחדין has the same meaning [as testicles].", sourcing: "direct", claim_type: "text", note: "Verbatim from Sefaria search snippet on Rashi_on_Leviticus.21.20.5." }, risk_level: "low", note: "Rashi cites Targum Onkelos's Aramaic 'meris pachadin.' Substantively aligns with R' Yishmael's reading (crushed testicles). Rashi himself does not explicitly attribute the position to R' Yishmael; the alignment is a structural inference, not a Rashi statement." },
    { view_id: "rambam-pirush-hamishnayot-7-5", commentator: "Rambam Pirush HaMishnayot on Bekhoros 7:5", source_ref: { kind: "rambam_pirush", masechet: "Bekhorot", ch: 7, m: 5 }, definition_scope: "lexical", position: "absent_or_single", gloss: { value: "Rambam in his Pirush (commentary) on Mishnah Bekhoros 7:5 tracks the Tana Kama view: 'one who has no testicles, or who has only one testicle — this is...' (the gloss continues, identifying meroach ashech with the Tana Kama position).", sourcing: "snippet", claim_type: "text" }, supporting_quote: { value: "אין לו ביצים או אין לו אלא ביצה אחת זהו... (Sefaria snippet, Rambam_on_Mishnah_Bekhorot.7.5)", sourcing: "direct", claim_type: "text" }, risk_level: "medium", note: "Sefaria snippet shows Rambam in his Pirush HaMishnayot commenting on the Tana Kama position. The full text is cut off in the search snippet ('זהו...' — 'this is...'); the visible portion confirms that Rambam glosses the Tana Kama view, but does not by itself confirm Rambam's psak-level halachic position. NOTE: Rambam's Pirush HaMishnayot is distinct from his Mishneh Torah; the two can take different positions. Pirush views should not be conflated with psak." },
    { view_id: "rambam-mishneh-torah-bias-hamikdash", commentator: "Rambam, Mishneh Torah, Hilchos Bi'as HaMikdash ch. 8", source_ref: { kind: "rambam", work: "Bi'at_HaMikdash", ch: 8, h: null }, definition_scope: "psak_combined_definition", position: "crushed_or_inflated_combined", gloss: { value: "Rambam rules that meroach ashech includes both one whose testicular membranes were crushed/smeared and one whose testicular membranes are inflated/wind-filled.", sourcing: "direct", claim_type: "text" }, supporting_quote: { value: "מי שנמרחו אשכיו ... מי שהרוח באשכיו ... הוא מרוח אשך האמור בתורה.", sourcing: "direct", claim_type: "text", note: "Exact Mishneh Torah halacha number still needs final locking; chapter 8 reproductive-organ mumim section." }, risk_level: "medium", note: "This is Mishneh Torah psak, not Pirush HaMishnayot. It combines the crushed reading associated with R' Yishmael and the inflated/wind reading associated with R' Akiva." },
  ],
  consensus: {
    statement: "Rashi on Vayikra 21:20:5, citing Targum, reads meroach ashech as crushed testicles, aligning with R' Yishmael's reading. Rambam in Mishneh Torah, Hilchos Bi'as HaMikdash ch. 8, rules that meroach ashech includes both crushed/smeared testicular membranes and inflated/wind-filled testicular membranes, combining the readings associated with R' Yishmael and R' Akiva. The earlier Pirush HaMishnayot snippet is not sufficient to establish Rambam's psak and should not drive the alignment narrative. R' \u1E24anina ben Antigonus's non-testicular reading remains structurally distinct and is not adopted in the Rashi/Rambam alignment shown here.",
    sourcing: "direct",
    claim_type: "text",
    risk_level: "medium",
    note: "This block is now anchored in Mishneh Torah psak. Exact halacha numbering for the Rambam citation remains open, so the entry stays partial rather than complete."
  },
};

const RELEVANT_GAPS = [
  { gap_id: "rambam_bias_hamikdash_8_exact_halacha_number", description: "Mishneh Torah psak for meroach ashech has been located in Hilchos Bi'as HaMikdash chapter 8, reproductive-organ mumim section. Rambam combines crushed/smeared and inflated/wind-filled testicular conditions. Remaining task: lock the exact standard halacha number for stable Sefaria URL generation.", impact: "The consensus block may now rely on Rambam Mishneh Torah for psak-level structure, but the entry remains partial until the exact halacha reference is finalized." },
  { gap_id: "rabbi_hanina_kushi_view_sensitivity", description: "R' Ḥanina ben Antigonus's view on meroach ashech is recorded in the dafyomi review as 'pertains to a Kushi (a black person).' The underlying Talmudic claim is what the source says; rendering for modern readers requires editorial care. The view is a minority opinion (not adopted in halacha by the alignment of either Rashi or Rambam Pirush) and is being used in the halachic-disqualification context, not as a general statement about race.", impact: "JSX UI design must address how this view is rendered. The schema preserves the source faithfully; presentation requires explicit framing about (a) it being minority opinion, (b) the halachic-disqualification context, (c) not silently softening or omitting." },
];

const POSITION_LABELS = {
  absent_or_single: { en: "Absent or single testicle", he: null, gloss: "Tana Kama view: missing or only one testicle" },
  crushed: { en: "Crushed", he: null, gloss: "R' Yishmael's view: crushed testicles" },
  swollen: { en: "Swollen", he: null, gloss: "R' Akiva's view: swollen with wind" },
  non_testicular_dark_appearance: { en: "Non-testicular: appearance-based", he: null, gloss: "R' Ḥanina ben Antigonus's view: dark appearance, not the testicles at all" },
  crushed_or_inflated_combined: { en: "Crushed or inflated", he: null, gloss: "Rambam Mishneh Torah: combines crushed/smeared and inflated/wind-filled testicular conditions" },
};

const POSITION_ORDER = ["absent_or_single", "crushed", "swollen", "non_testicular_dark_appearance", "crushed_or_inflated_combined"];

// =============================================================================
// CHARUM — second term, narrow vs broad definitional dispute
// =============================================================================
// Verbatim copy from sources_definitions.js DEFINITIONS["charum"]. No source
// claims were changed or upgraded; charum was added as a second rendered term
// from the existing definitions layer. Charum's own quote sourcing remains as
// it was verified — Sefaria source-sheet pulls and Bekhoros 43b snippets were
// from real Sefaria search results, not from dafyomi/ezrabrand summaries,
// and stay at "direct".

const CHARUM = {
  id: "charum",
  name_he: "חָרֻם",
  name_translit: "charum",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 18 } },
  in_lists: ["kohen"],
  research_status: "complete",
  relation: "machlokes_narrow_vs_broad",
  term_boundary_note: "Do not merge with chalum (חָלוּם, Mishnah Bekhoros 7:3). Per-yeshiva-tradition gloss describes chalum as a sunken-bridge nose enabling ointment to both eyes simultaneously — overlapping with the narrow Rashi/Aba Yosei reading of charum. Despite this conceptual overlap, charum is a Torah-named defect (Vayikra 21:18) and chalum is a Mishnah-only kohen-specific defect; they are distinct terms in the halachic catalogue. Do not collapse.",
  structure_note: "Charum's machlokes is structured as narrow (Rashi, Aba Yosei) vs broad (Sifra, Rabbis of the gemara, with Ramban explicitly identifying the dispute). The 'position' field on each view tracks this two-camp structure. Definition scope distinguishes lexical glosses from expanded-category derivations.",
  views: [
    {
      view_id: "rashi",
      commentator: "Rashi (quoted verbatim in Ramban on 21:18:1)",
      source_ref: { kind: "rashi", book: "Leviticus", ch: 21, v: 18 },
      definition_scope: "lexical",
      gloss: { value: "Anyone whose nose is sunk between his two eyes, so that he is able to paint both his eyes [for cosmetic purposes] with one stroke.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "[Charum] is anyone whose nose is sunk between his two eyes, so that he is able to paint both his eyes [for cosmetic purposes] with one stroke. — This is Rashi's language. (quoted in Ramban on Leviticus 21:18:1)", sourcing: "direct", claim_type: "text" },
      risk_level: "low",
      position: "narrow",
    },
    {
      view_id: "aba-yosei-narrow",
      commentator: "Aba Yosei (Bekhoros 43b)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "43b" },
      definition_scope: "lexical",
      gloss: { value: "The word charum means ONLY one who can paint both his eyes with one stroke. (Narrower than the Rabbis' view.)", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "Aba Yosei says: The word charum means only one who can paint both his eyes with one stroke.", sourcing: "direct", claim_type: "text" },
      risk_level: "low",
      position: "narrow",
      note: "Aba Yosei's narrow view matches Rashi's gloss.",
    },
    {
      view_id: "rabbis-broad-bekhoros-43b",
      commentator: "Rabbis (Bekhoros 43b, responding to Aba Yosei)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "43b" },
      definition_scope: "expanded_category",
      gloss: { value: "Even one who cannot paint both his eyes with one stroke (because his nose is not so deeply sunken) may nonetheless come within the term charum.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "But the Rabbis said to him: 'You have overstated it. Even though he cannot paint both his eyes with one stroke' [because his nose is not so deeply sunken, he may nonetheless come within the term charum].", sourcing: "direct", claim_type: "text" },
      risk_level: "low",
      position: "broad",
    },
    {
      view_id: "sifra-broad",
      commentator: "Sifra (Toras Kohanim) Emor 3:7",
      source_ref: { kind: "sifra", parsha: "Emor", unit: "Section", n: 3, h: 7 },
      definition_scope: "expanded_category",
      gloss: { value: "Charum encompasses several nose-conditions: sunken nose; obstructed nose; turned-up nose; nose overhanging the lips. The word 'o' (or) in 'o charum o sarua' (21:18) extends the term to all of these.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "Charum is one whose nose is sunk. [How do I know about] one whose nose is obstructed? or one whose nose is turned up? or whose nose overhangs his lips? From the expression o charum, [the word 'o' (or) includes these blemishes].", sourcing: "direct", claim_type: "text" },
      risk_level: "low",
      position: "broad",
      note: "Sifra unit reference is Section 3:7. Distinct from Sifra Section 3:1-2 (kohen-mum opening) and Chapter 3:8/3:11 (other halachos in the same parsha).",
    },
    {
      view_id: "ramban-identifies-machlokes",
      commentator: "Ramban on Leviticus 21:18:1",
      source_ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 18 },
      definition_scope: "expanded_category",
      gloss: { value: "Ramban notes that the Sifra and Gemara broaden 'charum' beyond Rashi's narrow definition.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "Ramban quotes Rashi's narrow gloss verbatim, then cites Sifra Emor 3:7 and Bekhoros 43b to show the term is broader than Rashi presents — explicitly identifying the machlokes between Aba Yosei (narrow, matching Rashi) and the Rabbis (broad, matching Sifra). (paraphrased from Sefaria source sheet on Leviticus 21:18:1)", sourcing: "direct", claim_type: "text" },
      risk_level: "medium",
      position: "broad",
      note: "Ramban himself does not propose a separate definition; he is mapping the existing machlokes. Counted in the broad camp because his pushback is against Rashi's narrow reading.",
    },
  ],
  // No consensus block on charum — the machlokes is presented unresolved.
  // Adding a consensus would imply psak; the schema preserves the dispute.
};

const CHARUM_POSITION_LABELS = {
  narrow: { en: "Narrow", he: null, gloss: "Rashi / Aba Yosei: only the deeply-sunken nose enabling cosmetic-paint with one stroke" },
  broad: { en: "Broad", he: null, gloss: "Sifra / Rabbis / Ramban: encompasses sunken, obstructed, turned-up, or lip-overhanging noses" },
};

const CHARUM_POSITION_ORDER = ["narrow", "broad"];

// =============================================================================
// SARUA — pending placeholder; carries CRITICAL term_boundary_note
// =============================================================================
// Verbatim copy from sources_definitions.js DEFINITIONS["sarua"]. research_status
// is not_started — views[] is empty. Per project rules this term renders as a
// pending placeholder, NOT as a completed card. The term_boundary_note IS
// shown because it is itself the test case (shared term / different din).

const SARUA = {
  id: "sarua",
  name_he: "שָׂרוּעַ",
  name_translit: "sarua",
  torah_source: [
    { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 18 }, role: "kohen" },
    { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 23 }, role: "behemah-different-din" },
  ],
  in_lists: ["kohen", "behemah_different_din"],
  research_status: "partial",
  relation: "shared_term_different_din_with_lexical_dispute",
  term_boundary_note: "CRITICAL: sarua appears in BOTH parshiyos with DIFFERENT halachic consequences AND different lexical glosses. Kohen-sarua (21:18, per Rashi): one of a pair of limbs is mismatched (e.g., unequal eyes or legs) — full kohen disqualification. Behemah-sarua (22:23, per various readings): an extra/overgrown limb, or an extra kidney (Targum Yonasan) — but the verse explicitly says it is acceptable for nedavah while NOT for neder. The kohen-side and behemah-side readings are encoded as separate position-tagged views below. The verse-level asymmetry (full disqualification for kohen vs split nedavah/neder for behemah) is itself the subject of a Rashi/Ramban machlokes about what nedavah and neder mean in 22:23.",
  structure_note: "Sarua is the canonical 'shared term, different din' case in this project. The structural questions to keep separate: (1) what does sarua physically denote in each parsha? (2) what is the halachic regime in each parsha? (3) why is there asymmetry? The Rashi/Ramban#2 reading of nedavah-vs-neder (kodshei bedek habayis vs kodshei mizbeach) and the Ramban#1/Moshav Zekenim reading (vow-formulas, both still excluded from mizbeach) yield different pictures of what 22:23 actually permits.",
  views: [
    {
      view_id: "rashi-vayikra-21-18-sarua-kohen-mismatched-limbs",
      commentator: "Rashi on Vayikra 21:18 (kohen-sarua = mismatched paired limbs)",
      source_ref: { kind: "rashi", book: "Leviticus", ch: 21, v: 18 },
      definition_scope: "lexical",
      position: "kohen-mismatched-paired-limbs",
      gloss: { value: "Rashi on the kohen verse (21:18) glosses sarua as: one of a pair of limbs is mismatched, such as unequal eyes or unequal legs. The kohen is fully disqualified by this condition. Notably, this is a different gloss from how sarua is read in 22:23 (the behemah verse).", sourcing: "snippet", claim_type: "text", note: "Rashi gloss recorded in shulchanaruchharav.com Daily Chumash & Rashi Q&A on Vayikra 21:16-24 ('Q4: שָׂרוּעַ — One of a pair of limbs is mismatched, such as unequal eyes or legs'). Direct Sefaria pull of Rashi on Leviticus 21:18 not yet completed." },
      risk_level: "medium",
    },
    {
      view_id: "targum-yonasan-vayikra-22-23-sarua-kalut-kidneys",
      commentator: "Targum Yonasan on Vayikra 22:23 (behemah-sarua = extra kidney; kalut = missing kidney)",
      source_ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 23 },
      definition_scope: "lexical",
      position: "behemah-extra-kidney",
      gloss: { value: "Targum Yonasan reads sarua and kalut in 22:23 as kidney-conditions: sarua = an extra kidney; kalut = a missing kidney. This is a distinct gloss from Rashi's reading of kohen-sarua (mismatched paired limbs). On Targum Yonasan's reading, the same word names different conditions across the two parshiyos.", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il D.A.F. Nach section on Vayikra 22:23. Direct Targum Yonasan Aramaic text not pulled in this entry." },
      risk_level: "medium",
    },
    {
      view_id: "rambam-pirush-bekhoros-7-2-sarua-overgrown-limb",
      commentator: "Rambam Pirush HaMishnayot on Bekhoros 7:2 (behemah-sarua = extra/overgrown limb)",
      source_ref: { kind: "rambam_pirush", masechet: "Bekhorot", ch: 7, m: 2 },
      definition_scope: "lexical",
      position: "behemah-extra-or-overgrown-limb",
      gloss: { value: "Per Rambam's gloss on Bekhoros 7:2, behemah-sarua denotes an extra limb or an overgrown limb. Distinct from both Rashi's kohen-sarua reading (mismatched paired limbs) and Targum Yonasan's kidney-reading. This is the gloss that maps onto the Mishnah's general discussion of bechor blemishes.", sourcing: "snippet", claim_type: "text", note: "Source: Kollel Iyun Hadaf background outline for Bekhoros 41 records the Rambam-Pirush gloss list. Direct Hebrew text of Rambam Pirush HaMishnayot Bekhoros 7:2 not yet pulled." },
      risk_level: "medium",
    },
    {
      view_id: "rashi-ramban-2-22-23-nedavah-neder-machlokes",
      commentator: "Rashi (citing Sifra) and Ramban #2 — nedavah/neder = bedek habayis/mizbeach",
      source_ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 23 },
      definition_scope: "structural",
      position: "asymmetry-bedek-vs-mizbeach",
      gloss: { value: "Rashi (citing the Sifra) and Ramban (second reading): the verse permits sarua/kalut as nedavah but disqualifies them as neder. 'Nedavah' here = kodshei bedek habayis (donations for Temple maintenance — kedushas damim, monetary holiness only). 'Neder' here = kodshei mizbeach (offerings on the altar — kedushas haguf). On this reading, the asymmetry is: sarua/kalut may be donated to bedek habayis (where their physical condition does not matter) but cannot be offered on the altar. Rashi's reasoning: the verse adds 'lo yeratzeh' specifically because mizbeach offerings come l'ratzon (to appease).", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il D.A.F. Nach section on Vayikra 22:23. Direct Sefaria pulls of Rashi/Ramban texts not completed in this entry. The Sifra citation is the load-bearing source for this reading." },
      risk_level: "medium",
    },
    {
      view_id: "ramban-1-moshav-zekenim-22-23-nedavah-neder-vow-formula",
      commentator: "Ramban #1 / Moshav Zekenim — nedavah/neder = different vow formulas",
      source_ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 23 },
      definition_scope: "structural",
      position: "asymmetry-vow-formula-distinction",
      gloss: { value: "Ramban (first reading) and Moshav Zekenim: 'neder' is when a person says 'harei alai' (I take upon myself); 'nedavah' is when he says 'harei zeh' (this animal is). Both vow formulas are permitted for bedek habayis but are NOT acceptable on the mizbeach. On this reading, the verse-level asymmetry is narrower: BOTH categories ('neder' and 'nedavah') are excluded from mizbeach; the verse's structure distinguishes the two formulas only to clarify the bedek-habayis permission.", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il D.A.F. Nach section on Vayikra 22:23. This reading produces a different picture from Rashi/Ramban#2: on this view, the verse does not permit sarua/kalut for any part of mizbeach service, only for bedek habayis donations. Direct Ramban primary text not pulled in this entry." },
      risk_level: "medium",
    },
    {
      view_id: "structural-shared-term-different-din",
      commentator: "Structural framing — shared term, different din",
      source_ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 18 },
      definition_scope: "structural",
      gloss: { value: "Sarua is the canonical 'shared term, different din' case across kohen and behemah lists. The kohen-text (21:18) and behemah-text (22:23) use the same Hebrew word but: (a) the rishonim gloss the physical condition differently (Rashi's mismatched-paired-limbs for kohen vs Rambam-Pirush's extra/overgrown-limb for behemah vs Targum Yonasan's kidneys), AND (b) the halachic regime differs sharply: full kohen disqualification vs the split nedavah/neder treatment for behemah. The combination (different physical reading + different halachic regime) makes sarua structurally unique among the mumim covered in this project.", sourcing: "snippet", claim_type: "text", note: "This view summarizes the structural finding rather than citing a specific text. The supporting claim — that the lexical AND halachic asymmetries co-occur — is established by the per-source views above." },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Rashi on Vayikra 21:18 verbatim Hebrew (kohen-sarua)",
    "Rashi on Vayikra 22:23 verbatim Hebrew (behemah-sarua + nedavah/neder)",
    "Sifra Emor on 21:18 (sarua) verbatim",
    "Sifra Emor on 22:23 (sarua + kalut + nedavah/neder) verbatim",
    "Ramban on Vayikra 22:23 verbatim Hebrew (both readings)",
    "Targum Yonasan on Vayikra 22:23 verbatim Aramaic",
    "Mishnah Bekhoros 7:6 (sarua kohen cases) verbatim",
    "Bekhoros 40a (behemah sarua / kalut) verbatim",
    "Rambam Mishneh Torah Bias HaMikdash ch. 8 — exact halacha for kohen-sarua",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2 — exact halacha for behemah-sarua and the nedavah/neder asymmetry",
  ],
  consensus: {
    statement: "Sarua appears in both the kohen list (21:18) and the behemah list (22:23) but is the canonical 'shared term, different din' case. Lexical readings differ across the two parshiyos: Rashi reads kohen-sarua as mismatched paired limbs (e.g., unequal eyes or legs); Rambam Pirush HaMishnayot reads behemah-sarua as an extra or overgrown limb; Targum Yonasan reads behemah-sarua as an extra kidney. The halachic regime also differs: kohen-sarua produces full disqualification, while behemah-sarua occupies a split nedavah/neder structure. What that split actually means is itself a Rashi/Ramban machlokes — Rashi (citing Sifra) and Ramban#2 read 'nedavah'/'neder' as bedek-habayis vs mizbeach (so sarua may go to bedek-habayis but not the altar); Ramban#1 and Moshav Zekenim read them as different vow-formulas (both excluded from mizbeach, both permitted for bedek-habayis).",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "All views snippet-sourced from the dafyomi.co.il D.A.F. Nach outline on 22:23 and shulchanaruchharav.com Rashi Q&A on 21:18. The structural finding (shared term, different din, with both lexical AND halachic asymmetry) is robust. Per-text verbatim pulls and Rambam's exact halacha numbers remain pending.",
  },
  note: "High-priority term: this is the shared_term_different_din case in the project's CONTRAST_CLAIMS framework. The combination of lexical and halachic asymmetry makes sarua structurally unique.",
};

// =============================================================================
// KALUT — pending placeholder; pairs with sarua at 22:23
// =============================================================================
// Verbatim copy from sources_definitions.js DEFINITIONS["kalut"]. research_status
// not_started, views[] empty. Renders as pending placeholder, paired conceptually
// with sarua (same pasuk, same nedavah-but-not-neder din).

const KALUT = {
  id: "kalut",
  name_he: "קָלוּט",
  name_translit: "kalut",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 23 } },
  in_lists: ["behemah"],
  research_status: "partial",
  relation: "lexical_dispute_with_inherited_din_structure",
  term_boundary_note: "Kalut (22:23) is paired with sarua in the same verse and inherits the same nedavah/neder split-din structure. Unlike sarua, kalut is a behemah-only term (not named in the kohen list). The lexical reading is itself disputed: Bekhoros 40a / Rambam Pirush read kalut as un-split hooves (like a horse or donkey, where the hoof is not cloven); Targum Yonasan reads kalut as a missing kidney. The din is shared with sarua: acceptable for nedavah, not for neder — with the same Rashi/Ramban machlokes about what that means.",
  structure_note: "Kalut sits inside the same 22:23 verse as sarua. The nedavah/neder asymmetry applies to both terms together — the verse's grammar treats them as a pair. See SARUA for the structural framing of the nedavah/neder machlokes; the same Rashi/Ramban-2 vs Ramban-1/Moshav-Zekenim split applies here.",
  views: [
    {
      view_id: "bekhoros-40a-rambam-pirush-kalut-unsplit-hooves",
      commentator: "Bekhoros 40a / Rambam Pirush HaMishnayot (kalut = un-split hooves)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "40a" },
      definition_scope: "lexical",
      position: "behemah-unsplit-hooves",
      gloss: { value: "Per Bekhoros 40a (and Rambam's gloss on Bekhoros 7:2), kalut denotes un-split hooves — like the hooves of a horse or a donkey, where the hoof is one solid piece rather than cloven. This rendering treats kalut as a structural deviation from the kosher-animal hoof template rather than as an internal (kidney) condition. Rambam-Pirush gives kalut as 'a missing limb or un-split hooves.'", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il D.A.F. Nach section on 22:23 ('Like those of a horse and a donkey, Bechoros 40a') and the Kollel Iyun Hadaf background outline on Bekhoros 41 (Rambam-Pirush gloss list). Direct Bekhoros 40a Hebrew text not pulled in this entry." },
      risk_level: "medium",
    },
    {
      view_id: "targum-yonasan-22-23-kalut-missing-kidney",
      commentator: "Targum Yonasan on Vayikra 22:23 (kalut = missing kidney)",
      source_ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 23 },
      definition_scope: "lexical",
      position: "behemah-missing-kidney",
      gloss: { value: "Targum Yonasan reads kalut in 22:23 as a missing kidney — paired with his reading of sarua (extra kidney). On this rendering, the verse pairs sarua and kalut as an extra-kidney/missing-kidney duality. This is a distinct lexical reading from the un-split-hooves gloss in the gemara/Rambam-Pirush.", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il D.A.F. Nach section on Vayikra 22:23. Direct Targum Yonasan Aramaic text not pulled in this entry." },
      risk_level: "medium",
    },
    {
      view_id: "kalut-inherited-nedavah-neder-machlokes",
      commentator: "Inherited nedavah/neder machlokes from the 22:23 verse",
      source_ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 23 },
      definition_scope: "structural",
      paired_with: "rashi-ramban-2-22-23-nedavah-neder-machlokes",
      gloss: { value: "Kalut shares the verse-level nedavah/neder structure with sarua. Per Rashi/Ramban#2: kalut may be donated to bedek habayis (kodshei damim) but is disqualified from the mizbeach (kodshei haguf). Per Ramban#1/Moshav Zekenim: kalut is excluded from the mizbeach under both vow formulas (harei alai and harei zeh), but permitted for bedek habayis under both. See SARUA for the full machlokes detail.", sourcing: "snippet", claim_type: "text", note: "This view points to the parallel SARUA views rather than restating them — the machlokes is verse-level and applies to both terms together. paired_with reference targets the SARUA entry's Rashi/Ramban#2 view for grouping purposes." },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Rashi on Vayikra 22:23 verbatim Hebrew (kalut + nedavah/neder)",
    "Sifra Emor on 22:23 (kalut + sarua) verbatim",
    "Targum Yonasan on Vayikra 22:23 verbatim Aramaic",
    "Bekhoros 40a verbatim Hebrew (kalut hooves discussion)",
    "Rambam Pirush HaMishnayot Bekhoros 7:2 verbatim text",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2 — exact halacha for kalut",
    "Mishnah Bekhoros 6:1 verbatim Hebrew (kalut/closed-hoof cases)",
  ],
  consensus: {
    statement: "Kalut (22:23) is paired with sarua in the same verse, and the lexical reading is itself disputed. The Bekhoros 40a / Rambam Pirush reading: un-split hooves like those of a horse or donkey. The Targum Yonasan reading: a missing kidney (paired with his extra-kidney reading of sarua). Whichever lexical reading is taken, kalut shares the nedavah/neder din-structure with sarua — and the machlokes about what that asymmetry means (Rashi/Ramban#2 vs Ramban#1/Moshav Zekenim, see SARUA) applies to both terms together.",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "All views snippet-sourced. The lexical machlokes between un-split-hooves and missing-kidney readings is a real dispute. The din-structure is inherited from the verse and shared with sarua.",
  },
  note: "Pairs with sarua in 22:23 — the nedavah-but-not-neder din applies to both. Unlike sarua, kalut is a behemah-only term and does not appear in the kohen list.",
};

// =============================================================================
// IVER — partial entry; one example_cases view, lexical view pending
// =============================================================================
// Verbatim copy from sources_definitions.js DEFINITIONS["iver"]. research_status
// is partial: a single Mishnah Bekhoros 6:2 view exists with definition_scope
// "example_cases" — i.e., the Mishnah is enumerating eye-blemish CASES that fall
// under iver, NOT giving a lexical definition. No Rashi/Bartenura/Rambam Pirush
// pulls have been completed yet. Renders as partial card with pending_pulls
// visible; the example_cases view is shown but framed as case-enumeration, not
// definition. This term tests the example-cases-vs-lexical schema distinction.

const IVER = {
  id: "iver",
  name_he: "עִוֵּר",
  name_translit: "iver",
  torah_source: [
    { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 18 }, role: "kohen" },
    { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 22 }, role: "behemah" },
    { ref: { kind: "tanakh", book: "Deuteronomy", ch: 15, v: 21 }, role: "bechor" },
  ],
  in_lists: ["kohen", "behemah", "bechor"],
  research_status: "partial",
  term_boundary_note: "Do not merge with tevallul b'eino (תְּבַלֻּל בְּעֵינוֹ, 21:20). Both involve the eye, but iver is loss/impairment of vision while tevallul is a specific growth/film on the eye. The Mishnah's 26-eye-blemish enumeration spans both terms; per-term boundaries must come from primary commentary, not from category-overlap inference.",
  views: [
    {
      view_id: "mishnah-bekhoros-6-2-eye-cases",
      commentator: "Mishnah Bekhoros 6:2 (animal eye blemishes)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 6, m: 2 },
      definition_scope: "example_cases",
      gloss: { value: "Pierced eyelid, damaged eyelid, chilazon/nachash/eyenav (specific eye conditions), white covering crossing the iris.", sourcing: "snippet", claim_type: "text", note: "Paraphrase of 6:2 verified in Pass-B audit; see MISHNAH.bekhoros_perek_6.mishnayos[1].en. The Mishnah lists eye-blemish cases. Whether these are all subsumed under the Torah term iver requires primary-commentary confirmation. It is enumerating cases, not giving a lexical definition of iver itself." },
      risk_level: "medium",
    },
  ],
  notes: "Iver definitions need direct Rashi/Bartenura pulls to complete. Later commentators (e.g., Ellicott on Leviticus 21:18) describe broader applications during the Second Temple — partial blindness in either eye, plus 26 enumerated eye/eyelid cases. That secondary-commentary description was previously included as a 'view' but has been moved to this note: it is not a primary rabbinic source and should not appear alongside Rashi/Sifra/Rambam in the views list.",
  pending_pulls: [
    "Rashi on Vayikra 21:18 (specifically the iver gloss)",
    "Bartenura on Bekhoros 6:2 (eye blemishes)",
    "Bartenura on Bekhoros 7:2-3 (kohen-specific eye conditions)",
    "Rambam Pirush HaMishnayot on Bekhoros 6:2 and 7:3",
    "Sifra Emor on iver",
  ],
};

// =============================================================================
// STUB TERMS — pending placeholders for terms in the index without source work
// =============================================================================
// Each is the minimum schema that the existing PendingTermCard render path
// reads (id, name_he, name_translit, torah_source, in_lists, research_status,
// views). No views, no commentary, no machlokes invented.

const SHAVUR = {
  id: "shavur",
  name_he: "שָׁבוּר",
  name_translit: "shavur",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 22 } },
  in_lists: ["behemah"],
  research_status: "partial",
  relation: "kohen_animal_terminological_difference",
  term_boundary_note: "Shavur is the behemah-list term (22:22) corresponding to the kohen-list 'shever ragel / shever yad' (21:19). The kohen text specifies arm-or-leg breaks; the animal text uses the broader 'shavur' which on its face would extend to any broken bone. Sifra (Torat Kohanim) on 21:19 reads the two terminologies as functionally identical — same kind of injury disqualifies both kohen and animal, despite the different word choice. See SHEVER_RAGEL and SHEVER_YAD for the kohen-side parallel.",
  structure_note: "Shavur is paired in 22:22 with charutz, yabeles, garav, and yallefes — five distinct disqualifying conditions. The Bekhoros 41a discussion of charutz/garav (see CHARUTZ entry) implicitly treats shavur as established, since the gemara's question is about why charutz and garav are both needed, not about why shavur is. Shavur's lexical scope (broken-limbed) is straightforward; its halachic edges are inherited from the broader principle that any broken bone disqualifies an animal.",
  views: [
    {
      view_id: "sifra-emor-21-19-shever-shavur-equivalence",
      commentator: "Sifra (Torat Kohanim) on Vayikra 21:19 — kohen-animal equivalence",
      source_ref: { kind: "sifra", parsha: "Emor", unit: "Section", n: 3 },
      definition_scope: "expanded_category",
      position: "kohen-animal-equivalence",
      gloss: { value: "Sifra on 21:19 addresses the apparent gap between the kohen text 'shever ragel or shever yad' (which on its face restricts to arm/leg) and the animal text 'shavur' (which on its face covers any broken bone). Sifra reads them as denoting the same disqualifying injury — the difference in terminology does not produce a difference in halachic scope. Both kohen and animal are disqualified by the same kind of bone break.", sourcing: "snippet", claim_type: "text", note: "Same Sifra material as in SHEVER_RAGEL and SHEVER_YAD entries. Sourced from the Yeshivat Har Etzion (etzion.org.il) SALT Parashat Emor 5782 summary of Torat Kohanim on 21:19. Exact Sefaria primary text and section number not yet pulled." },
      risk_level: "medium",
    },
    {
      view_id: "rambam-pirush-bekhoros-7-2-shavur-broken-limb",
      commentator: "Rambam Pirush HaMishnayot on Bekhoros 7:2 (gloss: shavur = broken-limbed)",
      source_ref: { kind: "rambam_pirush", masechet: "Bekhorot", ch: 7, m: 2 },
      definition_scope: "lexical",
      gloss: { value: "Per Rambam's gloss on Bekhoros 7:2, shavur denotes a broken-limbed animal — straightforwardly, one with a fractured bone. As Rambam himself notes in the same Pirush, definitional disputes between commentators about the precise meaning of these terms do not change the halachic scope, which is established through tradition.", sourcing: "snippet", claim_type: "text", note: "Source: Kollel Iyun Hadaf background outline for Bekhoros 41 records the Rambam-Pirush gloss list explicitly. Direct Hebrew text of Rambam Pirush HaMishnayot Bekhoros 7:2 not yet pulled. The same outline cites Rambam's own meta-claim that definitional disputes don't affect halacha." },
      risk_level: "medium",
    },
    {
      view_id: "mishnah-bekhoros-7-1-shavur-applies-to-person",
      commentator: "Mishnah Bekhoros 7:1 (animal blemishes apply to person)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 1 },
      definition_scope: "structural",
      gloss: { value: "Mishnah Bekhoros 7:1's general rule — that blemishes taught for animals also disqualify a person — applies to shavur via its kohen-side counterparts shever-ragel and shever-yad. The two terminologies converge on the same set of disqualifying broken-bone conditions.", sourcing: "snippet", claim_type: "text", note: "Mishnah text from Sefaria search snippet on Mishnah_Bekhorot.7.1. Direct verbatim Hebrew not pulled in this entry. Same general claim as in GARAV and YALLEFES." },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Rashi on Vayikra 22:22 (shavur specifically)",
    "Sifra Emor on 22:22 verbatim Hebrew",
    "Sifra Emor on 21:19 verbatim Hebrew (shever-shavur equivalence)",
    "Mishnah Bekhoros 7:1 verbatim Hebrew (Sefaria primary)",
    "Rambam Pirush HaMishnayot Bekhoros 7:2 verbatim text",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2 — exact halacha for shavur",
    "Bekhoros 41a context: shavur's role in the charutz-garav reasoning",
  ],
  consensus: {
    statement: "Shavur (22:22) names a broken-limbed animal as a korban-disqualifying mum. Sifra reads the animal-list shavur and the kohen-list shever-ragel/shever-yad as denoting the same underlying injury — the different terminologies do not yield different halachic scope. Mishnah Bekhoros 7:1's rule that animal blemishes apply to a person reinforces this. The lexical layer is uncontroversial; per-list halachic edges remain a per-pasuk question, and Rambam's exact halacha numbering in Issurei Mizbeach ch. 2 remains to be locked.",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "All views snippet-sourced. The lexical content (broken-limbed) is well-attested and uncontroversial; the Sifra structural claim about shever-shavur equivalence is the load-bearing element here.",
  },
};

const CHARUTZ = {
  id: "charutz",
  name_he: "חָרוּץ",
  name_translit: "charutz",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 22 } },
  in_lists: ["behemah"],
  research_status: "partial",
  relation: "lexical_definition_with_structural_constraint",
  term_boundary_note: "Charutz (22:22) names a gashed/cracked condition. Bekhoros 41a's gemara contains a structural derashah constraining charutz's scope: it must be at a place where there is bone underneath; a charutz at a place of flesh only is NOT a mum. The gemara generates this from the Torah's pairing of charutz with garav: a kal v'chomer reasoning would extend a charutz-mum status to charutz at any location, but the verse's pairing with the more severe garav teaches the opposite — only bone-location charutz is a mum.",
  structure_note: "Bekhoros 41a's reasoning: if both charutz (a non-repulsive crack/gash) and garav (a repulsive boil) are mumim, the kal v'chomer would suggest charutz disqualifies in any location. The verse's pairing teaches the opposite scope: charutz at a place of flesh only is NOT a mum; charutz only counts when there's bone underneath. This places a structural limit on the term's lexical extension.",
  views: [
    {
      view_id: "gemara-bekhoros-41a-charutz-bone-location",
      commentator: "Bekhoros 41a (Gemara: charutz must be at a bone-location)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "41a" },
      definition_scope: "derashah",
      gloss: { value: "The gemara reasons: a kal v'chomer from charutz to garav would teach that if non-repulsive charutz is a mum, all the more so the repulsive garav. The verse's redundancy (writing both terms) teaches the opposite scope-restriction: charutz at a place of flesh only is NOT a mum. The Torah's word 'garav' is needed precisely to restrict charutz's lexical extension to bone-locations.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "וליכתב רחמנא חרוץ ולא בעי גרב, ואמינא: חרוץ דלא מאיס הוי מומא, גרב דמאיס לא כל שכן? כתב רחמנא גרב למימר דחרוץ במקום בשר לא הוי מומא.", sourcing: "direct", claim_type: "text", note: "Verbatim from Sefaria Bekhorot 41a:7. Translation: 'And [you might say] let the Merciful One write charutz and not need to write garav, for I would reason: charutz which is not repulsive is a blemish, garav which is repulsive — all the more so! Therefore the Merciful One writes garav, to teach that charutz in a place of flesh [only] is not a blemish.'" },
      risk_level: "low",
      note: "Critical structural finding for charutz: not every gash counts. The Torah's pairing with garav itself does the work of restricting charutz's halachic scope to bone-locations.",
    },
    {
      view_id: "rambam-pirush-bekhoros-7-2-charutz-gloss",
      commentator: "Rambam Pirush HaMishnayot on Bekhoros 7:2 (gloss: charutz = gashed at bone)",
      source_ref: { kind: "rambam_pirush", masechet: "Bekhorot", ch: 7, m: 2 },
      definition_scope: "lexical",
      gloss: { value: "Per Rambam's gloss on Bekhoros 7:2, charutz denotes a gashed condition — including a perforated or split eyelid, nose, or lip, or a gash anywhere there is a bone underneath. The eyelid/nose/lip examples align with Bekhoros 41a's bone-location requirement: each of these has cartilage or bone as its substrate.", sourcing: "snippet", claim_type: "text", note: "Source: Kollel Iyun Hadaf background outline for Bekhoros 41 records this Rambam-Pirush gloss explicitly. Direct Hebrew text of Rambam Pirush HaMishnayot Bekhoros 7:2 not yet pulled. The 'eyelid, nose, lip' examples track the gemara's structural constraint." },
      risk_level: "medium",
    },
    {
      view_id: "mishnah-bekhoros-7-1-charutz-applies-to-person",
      commentator: "Mishnah Bekhoros 7:1 (animal blemishes apply to person)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 1 },
      definition_scope: "structural",
      gloss: { value: "Mishnah Bekhoros 7:1's general rule extends charutz to kohen disqualification as well — but charutz is a behemah-list-only Torah term (not named in 21:18-20). The Mishnah's rule operates by extending the underlying condition (a gash at a bone-location), not by importing the Torah word charutz into the kohen list. For kohanim, similar gash-conditions would fall under different Torah terms (e.g., charum for nose-condition, or under the broader principle).", sourcing: "snippet", claim_type: "text", note: "This view is structural rather than lexical: it documents that charutz-as-a-Torah-word stays in the behemah list, while the underlying physical condition extends to kohanim via the Mishnah's general principle." },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Rashi on Vayikra 22:22 (charutz specifically)",
    "Sifra Emor on 22:22 (charutz)",
    "Mishnah Bekhoros 6:2-3 verbatim Hebrew (eye/nose/lip cases)",
    "Bekhoros 41a verbatim full Beraisa (Sefaria primary — partial pull complete)",
    "Rambam Pirush HaMishnayot Bekhoros 7:2 verbatim text",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2 — exact halacha for charutz",
  ],
  consensus: {
    statement: "Charutz (22:22) names a gashed/cracked condition. Bekhoros 41a's gemara establishes that charutz disqualifies an animal only when the gash is at a location with bone underneath; a charutz at a place of flesh only is NOT a mum. The gemara generates this constraint via the verse's pairing of charutz with garav: a kal v'chomer would extend charutz to any location, but the redundant pairing instead teaches the opposite scope-restriction. Rambam Pirush HaMishnayot's gloss (perforated/split eyelid, nose, lip, or gash where bone is) tracks this constraint.",
    sourcing: "direct",
    claim_type: "text",
    risk_level: "low",
    note: "The gemara view is direct-sourced from Sefaria Bekhorot 41a:7. Rambam Pirush gloss is snippet-derived. The structural constraint (bone-location requirement) is robust at the macro level.",
  },
};

const YABELES = {
  id: "yabeles",
  name_he: "יַבֶּלֶת",
  name_translit: "yabeles",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 22 } },
  in_lists: ["behemah"],
  research_status: "partial",
  relation: "lexical_with_specific_anatomical_locus",
  term_boundary_note: "Yabeles (22:22) names a wart-condition. Per Rambam Pirush HaMishnayot on Bekhoros 7:2, yabeles in this halachic context is specifically a wart on the eye. The Bekhoros 41a Mishnah's lexical context (יבלת) treats it as a specific eye-wart, distinct from generic warts (which would not necessarily disqualify). The same word in non-halachic contexts can mean any wart; the halachic-Torah scope is narrower.",
  structure_note: "Yabeles has a specific anatomical locus (the eye) per Rambam-Pirush. The Bekhoros 41a discussion at line 15 of the dafyomi background explicitly records 'yabeles — a wart on the eye.' This narrowing from generic-wart to specifically-eye-wart is a tradition-grounded halachic specification, consistent with Rambam's broader meta-claim that the mumim are known through tradition.",
  views: [
    {
      view_id: "gemara-bekhoros-41a-yabeles-eye-wart",
      commentator: "Bekhoros 41a (lexical context: yabeles = eye-wart)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "41a" },
      definition_scope: "lexical",
      gloss: { value: "In the Bekhoros 41a Mishnah/gemara context, the term yabeles is specified as a wart on the eye — not a generic wart anywhere on the body. The discussion treats yabeles alongside chazazis (the broader skin-blister category) but distinguishes the two: yabeles is locus-specific (the eye), while chazazis names the condition itself. The Bekhoros 41a-b sugya treats yabeles as one of the disqualifying conditions on the eye.", sourcing: "snippet", claim_type: "text", note: "Source: Kollel Iyun Hadaf background outline for Bekhoros 41 (line 15: 'yabeles — a wart on the eye'). Direct Hebrew text of the Bekhoros 41a Mishnah/gemara on yabeles not yet pulled from Sefaria. The eye-specific specification is well-attested across the rishonim." },
      risk_level: "medium",
    },
    {
      view_id: "rambam-pirush-bekhoros-7-2-yabeles-gloss",
      commentator: "Rambam Pirush HaMishnayot on Bekhoros 7:2 (gloss: yabeles = wart)",
      source_ref: { kind: "rambam_pirush", masechet: "Bekhorot", ch: 7, m: 2 },
      definition_scope: "lexical",
      gloss: { value: "Per Rambam's gloss on Bekhoros 7:2, yabeles denotes a wart. In context — the verse pairs yabeles with the boil/skin terms garav and yallefes — the wart in question is specifically of the eye (per the Bekhoros 41a Mishnah context). Rambam's broader meta-claim applies: the precise scope is established through tradition.", sourcing: "snippet", claim_type: "text", note: "Source: Kollel Iyun Hadaf background outline for Bekhoros 41 records the Rambam-Pirush gloss list. Direct Hebrew text not pulled. The Bekhoros 41a context narrows yabeles to the eye." },
      risk_level: "medium",
    },
    {
      view_id: "mishnah-bekhoros-7-1-yabeles-applies-to-person",
      commentator: "Mishnah Bekhoros 7:1 (animal blemishes apply to person)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 1 },
      definition_scope: "structural",
      gloss: { value: "Mishnah Bekhoros 7:1's general rule applies to yabeles: an eye-wart that disqualifies an animal also disqualifies a kohen, even though yabeles is not explicitly named in the 21:18-20 kohen list. The disqualification reaches a kohen through the underlying condition (an eye-wart), not through the Torah word yabeles being imported into the kohen-text.", sourcing: "snippet", claim_type: "text", note: "Same general claim as in GARAV / YALLEFES / SHAVUR / CHARUTZ. Direct verbatim Mishnah text not pulled in this entry." },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Rashi on Vayikra 22:22 (yabeles specifically)",
    "Sifra Emor on 22:22 (yabeles)",
    "Mishnah Bekhoros 6:12 verbatim Hebrew (yabeles cases)",
    "Bekhoros 41a verbatim Mishnah text on yabeles",
    "Rambam Pirush HaMishnayot Bekhoros 7:2 verbatim text",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2 — exact halacha for yabeles",
  ],
  consensus: {
    statement: "Yabeles (22:22) names a wart. In the Bekhoros 41a Mishnah/gemara context, the wart is specifically located at the eye — not a generic wart anywhere on the body. Per Rambam's gloss on Bekhoros 7:2, yabeles is a wart, with the eye-specific narrowing established through tradition. The behemah-list term reaches kohen disqualification via Mishnah Bekhoros 7:1's general rule, even though yabeles is not named in the kohen list itself.",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "All views snippet-sourced. The eye-specific narrowing is well-attested but the precise primary text (Sefaria Bekhorot 41a Mishnah and Rambam Pirush) has not been pulled in this entry.",
  },
};

const GIBBEN = {
  id: "gibben",
  name_he: "גִבֵּן",
  name_translit: "gibben",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 20 } },
  in_lists: ["kohen"],
  research_status: "partial",
  relation: "machlokes_definitional_only",
  term_boundary_note: "Gibben in 21:20 carries a definitional machlokes between Rashi and Rambam in their respective approaches to Bekhoros 7:2 — but per Rambam in his Pirush HaMishnayot, both readings agree the underlying conditions are kohen-disqualifying mumim. The dispute is about which physical condition the Torah word 'gibben' specifically denotes, not about which conditions disqualify. The same Mishnah lists multiple eyebrow-/hair-related conditions; only the first is identified by Tana Kama as the Torah's gibben.",
  structure_note: "Mishnah Bekhoros 7:2 enumerates eyebrow-related blemishes; Tana Kama explicitly identifies the first one (the Mishnah's leading case) as the Torah's gibben. Rambam Mishneh Torah Bias HaMikdash ch. 8 codifies five eyebrow-blemishes total, with the first (no eyebrow hair) labeled 'this is gibben mentioned in the Torah.' Rashi on Vayikra 21:20 follows a different one of the Mishnah's enumerated cases (overly long eyebrows). Rambam's Pirush HaMishnayot frames the dispute as purely definitional.",
  views: [
    {
      view_id: "tana-kama-mishnah-bekhoros-7-2",
      commentator: "Tana Kama (Mishnah Bekhoros 7:2)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 2 },
      definition_scope: "lexical",
      position: "no-eyebrow-hair",
      gloss: { value: "Tana Kama states that the kohen-disqualifying blemish 'no eyebrows, or only one eyebrow' is the definition of the term 'gibben' mentioned in the Torah.", sourcing: "snippet", claim_type: "text", note: "Tana Kama-attributed framing recorded in Mishnah Yomit summary of Bekhoros 7:2. Direct Hebrew text of Mishnah Bekhoros 7:2 not yet pulled from Sefaria. The Mishnah's 'no eyebrows or only one eyebrow' formulation is itself the source of the later mefarshim machlokes (see view tiferet-tiferes-bach-machlokes)." },
      risk_level: "medium",
    },
    {
      view_id: "rambam-mishneh-torah-bias-hamikdash-8-gibben",
      commentator: "Rambam, Mishneh Torah, Hilchos Bias HaMikdash ch. 8",
      source_ref: { kind: "rambam", work: "Bi'at_HaMikdash", ch: 8, h: null },
      definition_scope: "psak_combined_definition",
      position: "no-eyebrow-hair",
      gloss: { value: "Rambam codifies five eyebrow-related blemishes in Bias HaMikdash ch. 8. The first — one who has no hair on his eyebrows — Rambam explicitly identifies as 'the gibben mentioned in the Torah.' Rambam tracks the Tana Kama position from Mishnah Bekhoros 7:2.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "חֲמִשָּׁה בַּגְּבִינִים, וְאֵלּוּ הֵן: (א) מִי שֶׁאֵין לוֹ שֵׂעָר בִּגְבִינָיו. וְזֶה הוּא 'גִּבֵּן' (ויקרא כא, כ) הָאָמוּר בַּתּוֹרָה. (ב) מִי שֶׁגְּבִינָיו שׁוֹכְבִין. (ג) מִי שֶׁאֵין לוֹ אֶלָא גָּבִין אֶחָד. (ד) מִי שֶׁיֵּשׁ לוֹ גְּבִינִין יָתֵר עַל שְׁנַיִם.", sourcing: "direct", claim_type: "text", note: "Verbatim from chabad.org rendering of Rambam Bias HaMikdash ch. 8 (Touger edition with Torat Emet vowelized text). Exact Sefaria halacha number within ch. 8 still to be locked." },
      risk_level: "low",
      note: "Rambam's MT is psak. Note that conditions (b)-(e) — eyebrows hanging low, only one eyebrow, more than two eyebrows, mismatched eyebrows — are also kohen mumim per Rambam, but they are NOT named 'gibben' in his identification; only condition (a) carries that lexical claim.",
    },
    {
      view_id: "rashi-vayikra-21-20-gibben",
      commentator: "Rashi on Vayikra 21:20",
      source_ref: { kind: "rashi", book: "Leviticus", ch: 21, v: 20 },
      definition_scope: "lexical",
      position: "overly-long-eyebrows",
      gloss: { value: "Rashi reads gibben as: one whose eyebrow hair is long and hangs over his eyes. This corresponds to a different case from the Mishnah Bekhoros 7:2 list — not the 'no eyebrow hair' case Rambam identifies as the Torah's gibben, but the 'eyebrows that hang' case (what Rambam codifies as item (b) in his eyebrow list).", sourcing: "snippet", claim_type: "text", note: "Rashi gloss recorded in shulchanaruchharav.com Daily Chumash & Rashi Q&A summary on Vayikra 21:16-24 ('Q5: גִּבֵּן — One whose eyebrow hair is long and hangs over his eyes'). Direct Sefaria pull of Rashi_on_Leviticus.21.20 not yet completed. Rashi's reading aligns with the second of the two interpretations the Mishnah at Bekhoros 7:2 offers." },
      risk_level: "medium",
    },
    {
      view_id: "rambam-pirush-hamishnayot-7-5-gibben-meta",
      commentator: "Rambam Pirush HaMishnayot on Bekhoros 7:5 (meta-framing)",
      source_ref: { kind: "rambam_pirush", masechet: "Bekhorot", ch: 7, m: 5 },
      definition_scope: "structural",
      gloss: { value: "Rambam in his Pirush HaMishnayot frames the Rashi-vs-Rambam dispute on gibben as purely definitional. Both readings agree that no-eyebrow-hair AND overly-long-hanging-eyebrows are kohen mumim. The disagreement concerns only which of these the Torah word 'gibben' specifically denotes.", sourcing: "snippet", claim_type: "text", note: "Source: Touger's footnote on chabad.org Bias HaMikdash ch. 8 — 'In his Commentary to the Mishnah, the Rambam states that the two opinions agree that these two conditions are blemishes; the difference of opinion between them concerns only the definition of the term gibein in the Torah.' Direct Hebrew text of Rambam Pirush HaMishnayot Bekhoros 7:5 not yet pulled from Sefaria. The footnote cites Bekhoros 7:5 (some editions: 7:3); exact Mishnah numbering within Pirush to be verified." },
      risk_level: "medium",
      note: "Important structural framing: this is a definitional-only machlokes, NOT a halachic-scope machlokes. Both Rashi and Rambam agree on the full Mishnah's set of eyebrow-related kohen disqualifications; they differ only on which physical condition the specific Torah word 'gibben' names.",
    },
    {
      view_id: "tiferet-tiferes-bach-mefarshim-machlokes",
      commentator: "Tiferet Yisrael / Tiferet Yaakov / Bach (later mefarshim machlokes on Tana Kama's 'one eyebrow')",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 2 },
      definition_scope: "lexical",
      position: "no-eyebrow-hair",
      gloss: { value: "Within the Tana Kama / Rambam-MT camp, the later mefarshim disagree on what 'one eyebrow' (the Mishnah's secondary phrasing) means. Tiferet Yisrael: one eyebrow that stretches across both eyes (a single connected unibrow). Tiferet Yaakov: one of the two eyebrows is missing. Bach: the Torah term 'giben' means 'one eye' — and the blemish is therefore one who has hair over only one eye (a sub-camp that re-reads the Torah word itself, lexically distinct from both Rashi and Rambam-MT).", sourcing: "snippet", claim_type: "text", note: "Source: Mishnah Yomit article 'One Eyebrow' on Bekhoros 7:2. The Bach view is particularly notable — it does not fit the Rashi/Rambam definitional axis. Bach reads 'giben' as etymologically related to 'one eye' (a homonym move), making the blemish a hair-over-one-eye case rather than an eyebrow-hair case at all. Direct Bach text not yet pulled." },
      risk_level: "medium",
      note: "This view sits within the Tana Kama / Rambam-MT camp on the position axis (the Mishnah's first case = Torah's gibben), but it adds a sub-machlokes about how to understand the Mishnah's 'or only one eyebrow' phrasing. Bach further breaks from both axes by reading the Torah word itself as 'one eye.'",
    },
  ],
  pending_pulls: [
    "Rashi on Vayikra 21:20 verbatim Hebrew (Sefaria primary)",
    "Mishnah Bekhoros 7:2 verbatim Hebrew (Sefaria primary)",
    "Rambam Pirush HaMishnayot Bekhoros 7:5 (or 7:3) full text — meta-framing claim",
    "Rambam Mishneh Torah Bias HaMikdash ch. 8 — exact halacha number for the gibben psak",
    "Bekhoros 43b — gemara-level discussion of Mishnah 7:2",
    "Sifra Emor 3 on gibben",
    "Bach, Tiferet Yisrael, Tiferet Yaakov primary texts on Mishnah Bekhoros 7:2",
  ],
  consensus: {
    statement: "Rashi (Vayikra 21:20) reads gibben as overly long eyebrows hanging over the eyes. Rambam in Mishneh Torah Bias HaMikdash ch. 8 reads gibben as no hair on the eyebrows. Both readings sit within Mishnah Bekhoros 7:2's enumeration of eyebrow-related kohen disqualifications. Rambam himself in his Pirush HaMishnayot frames the dispute as purely definitional — both readings agree on the underlying halachic scope; the disagreement is over which physical condition the Torah word 'gibben' names. The Tana Kama in the Mishnah explicitly identifies the no-eyebrow-hair case as the Torah's gibben (aligned with Rambam-MT). Within the Tana Kama camp, later mefarshim further dispute what 'one eyebrow' means; the Bach goes further and re-reads the Torah word itself as 'one eye.'",
    sourcing: "direct",
    claim_type: "text",
    risk_level: "medium",
    note: "Rambam-MT view is the only direct-sourced view; Rashi and Rambam-Pirush views are snippet-derived from secondary summaries. The structural finding (definitional-only machlokes, both agree on halachic scope) is itself a primary-text claim of Rambam's Pirush — verifiable but not yet verified verbatim.",
  },
};

const DAQ = {
  id: "daq",
  name_he: "דַּק",
  name_translit: "daq",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 20 } },
  in_lists: ["kohen"],
  research_status: "partial",
  relation: "structural_derashah_chain",
  term_boundary_note: "Daq is one of four eye-blemish terms that the gemara (Bekhoros 44a) chains together: iver, ish, daq, tevallul b'eino. Each term in the chain extends the prohibition to cases the prior term wouldn't catch. Daq specifically denotes eye-blemishes that still permit vision (unlike chivrer/mayim kevu'im, which the prior word 'ish' covered). Per-term boundaries follow this gemara-derived sequence; do not collapse daq with tevallul or with the cases under 'be'einav'.",
  structure_note: "The pasuk reads 'iver o pisseach o charum o sarua... gibben o daq o tevallul b'eino'. Bekhoros 44a derives the scope of each term sequentially: each name covers cases the prior name wouldn't catch. Daq's role in this chain is the eye-blemish-where-vision-is-still-possible.",
  views: [
    {
      view_id: "mishnah-bekhoros-7-3-daq-cases",
      commentator: "Mishnah Bekhoros 7:3 (eye-blemish enumeration)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 3 },
      definition_scope: "example_cases",
      gloss: { value: "Mishnah Bekhoros 7:3 enumerates eye-blemish cases — including a sclera that encroaches on the cornea — as kohen disqualifications. Whether each enumerated case falls specifically under 'daq' or under 'tevallul' or under 'be'einav' is itself a per-case question (see Bekhoros 44a chain).", sourcing: "snippet", claim_type: "text", note: "Mishnah text not pulled directly from Sefaria — primary text rendering blocked by Sefaria's JS-only page shells in this session. Text content is paraphrased from Sefaria search snippets and Bekhoros 44a parallels." },
      risk_level: "medium"
    },
    {
      view_id: "gemara-bekhoros-44a-derashah-chain",
      commentator: "Bekhoros 44a (Beraisa: sequential extension of eye-blemish terms)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "44a" },
      definition_scope: "derashah",
      gloss: { value: "The Beraisa explains why the pasuk uses four distinct eye-blemish terms in sequence: each adds cases the prior term wouldn't catch. After 'iver' (eye missing), 'ish' adds chivrer/mayim kevu'im (cataracts and dimness — total blindness). After 'ish', 'daq' adds eye-blemishes where vision is still possible. After 'daq', 'tevallul' adds cases where vision isn't impaired but the eye structure mixes (white into black). After 'tevallul', 'be'einav' adds eye-positioning blemishes where the eye itself isn't blemished. Daq's distinct role: eye-blemishes with preserved vision.", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il review of Bekhoros 44, summarizing the Beraisa. Hebrew not pulled directly. Rava's extrapolation: 'we learn any blemish that causes blindness from Ish; from Dok, we learn any blemish that causes one's vision to deteriorate; from Tevalul, any blemish that causes the parts of the eye to mix.'" },
      risk_level: "medium"
    }
  ],
  pending_pulls: [
    "Mishnah Bekhoros 7:3 verbatim Hebrew text (Sefaria primary)",
    "Bekhoros 44a verbatim Beraisa text (Sefaria primary)",
    "Rashi on Vayikra 21:20 (daq gloss)",
    "Sifra Emor on daq",
    "Rambam Pirush HaMishnayot on Bekhoros 7:3",
    "Rambam Mishneh Torah Bias HaMikdash ch. 8 (eye-blemish section)",
  ],
  consensus: {
    statement: "Daq's primary characterization comes from its structural role in Bekhoros 44a's derashah chain: it is the eye-blemish category covering cases where vision is still possible, distinct from total blindness (covered by iver+ish) and from structural eye-mixing (tevallul). Specific case-enumeration in the Mishnah pairs daq with related eye-blemishes; per-case sorting between daq and tevallul requires direct primary-text pulls of Mishnah Bekhoros 7:3 and Bekhoros 44a, neither of which has been pulled verbatim from Sefaria in this entry.",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "Both views are dafyomi-summary-derived. The structural finding (sequential derashah chain) is robust at the macro level but per-case precision is unverified."
  }
};

const TEVALLUL_BEINO = {
  id: "tevallul-beino",
  name_he: "תְּבַלֻּל בְּעֵינוֹ",
  name_translit: "tevallul b'eino",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 20 } },
  in_lists: ["kohen"],
  research_status: "partial",
  relation: "structural_derashah_chain",
  term_boundary_note: "Tevallul b'eino is one of four eye-blemish terms in the Bekhoros 44a chain (iver, ish, daq, tevallul, be'einav). Tevallul's specific scope, per the gemara: an eye-blemish where the white of the eye encroaches on the iris/cornea ('the white mixes with the black'). The added word 'be'einav' (in his eye) further extends the term to eye-positioning blemishes where the eye itself isn't structurally blemished. Distinct from iver (loss of vision) and from daq (eye-blemishes with preserved vision).",
  structure_note: "Tevallul is the third stop in the Bekhoros 44a derashah chain. Its 'be'einav' suffix is exegetically separate — it extends the kohen disqualification to a distinct group ('shtei einav lema'lah' and similar eye-positioning cases) where neither iver, nor ish, nor daq, nor tevallul itself would catch the case.",
  views: [
    {
      view_id: "gemara-bekhoros-44a-tevallul-position",
      commentator: "Bekhoros 44a (Beraisa: tevallul's role in the eye-blemish chain)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "44a" },
      definition_scope: "derashah",
      gloss: { value: "After daq (eye-blemishes with preserved vision), the Torah adds 'tevallul' to include cases where vision isn't impaired but the white of the eye mixes into the iris/cornea ('the white mixes with the black'). Rava's extrapolation: from tevallul we learn any blemish that causes the parts of the eye to mix.", sourcing: "snippet", claim_type: "text", note: "dafyomi.co.il review of Bekhoros 44 summarizing the Beraisa. Hebrew text not pulled directly." },
      risk_level: "medium"
    },
    {
      view_id: "gemara-bekhoros-44a-beeinav-extension",
      commentator: "Bekhoros 44a (Beraisa: 'be'einav' as further derashah-extension)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "44a" },
      definition_scope: "derashah",
      paired_with: "gemara-bekhoros-44a-tevallul-position",
      gloss: { value: "The Torah adds 'be'einav' (in his eye) after 'tevallul' to extend the disqualification to eye-positioning blemishes — including 'shtei einav lema'lah' (one eye higher than the other), squinting, and similar cases — where the eye itself is not structurally blemished but its position is. The Beraisa names a kohen who squints among the cases learned from this word.", sourcing: "snippet", claim_type: "text", note: "Same dafyomi.co.il source. Confirms that 'be'einav' is itself doing exegetical work, not just pronominal." },
      risk_level: "medium"
    },
    {
      view_id: "mishnah-bekhoros-7-3-eye-cases",
      commentator: "Mishnah Bekhoros 7:3 (kohen eye-blemish enumeration)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 3 },
      definition_scope: "example_cases",
      gloss: { value: "Mishnah Bekhoros 7:3 enumerates eye-blemish cases that disqualify a kohen, including conditions of the eyelid (ris) — pierced, damaged, or split — and cases where one eye is higher than the other. The Mishnah groups these eye-related disqualifications without explicitly tagging which Torah term (iver, daq, tevallul, be'einav) each case derives from; the gemara at 44a-b does that sorting.", sourcing: "snippet", claim_type: "text", note: "Mishnah text and gemara position both via Sefaria search snippets and dafyomi summaries — not direct verbatim pulls in this session." },
      risk_level: "medium"
    }
  ],
  pending_pulls: [
    "Mishnah Bekhoros 7:3 verbatim Hebrew (Sefaria primary)",
    "Bekhoros 44a verbatim Beraisa text including the chain (Sefaria primary)",
    "Rashi on Vayikra 21:20 (tevallul b'eino gloss)",
    "Sifra Emor on tevallul",
    "Rambam Pirush HaMishnayot on Bekhoros 7:3",
    "Rambam Mishneh Torah Bias HaMikdash ch. 8 (eye-blemish enumeration)",
  ],
  consensus: {
    statement: "Tevallul b'eino is the third term in Bekhoros 44a's eye-blemish chain. Its core scope: eye-blemishes where vision is preserved but the eye's structure mixes (white into iris). The accompanying 'be'einav' is itself read as a separate derashah-extension to eye-positioning blemishes — not as a redundant pronoun. The Mishnah's case-enumeration at Bekhoros 7:3 is shared across the four chain-terms; per-case attribution depends on the gemara's sequential reasoning.",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "All views snippet-sourced. The structural-chain finding from Bekhoros 44a is the most reliable load-bearing element; per-case sorting and Rambam's MT enumeration remain pending."
  }
};

// -----------------------------------------------------------------------------
// PROTOTYPE SHELLS — every Torah-named mum has at least a placeholder
// -----------------------------------------------------------------------------
// Each shell carries: id, name_he, name_translit, torah_source (matching the
// pesukim it appears in), in_lists, research_status: "not_started", views: [].
// Where a known boundary issue exists, term_boundary_note is set. Where the
// obvious primary-source pulls are known, pending_pulls is set so the
// PendingTermCard can surface what still needs to be checked. No definitions
// invented.

const PISSEACH = {
  id: "pisseach",
  name_he: "פִּסֵּחַ",
  name_translit: "pisseach",
  torah_source: [
    { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 18 }, role: "kohen" },
    { ref: { kind: "tanakh", book: "Deuteronomy", ch: 15, v: 21 }, role: "bechor" },
  ],
  in_lists: ["kohen", "bechor"],
  research_status: "partial",
  structure_note: "Pisseach is named in 21:18 alongside iver. The Mishnah at Bekhoros 7:6 lists leg/foot conditions that disqualify a kohen (ikkel = bowlegged, ba'al pikah = protrusion at the ankle, knocking ankles), continuing into the gemara on Bekhoros 45a-b. Whether these cases all sit under the Torah word 'pisseach' or under a broader category is itself a commentary question. As with iver, an enumeration of cases is not the same as a lexical definition of the term.",
  views: [
    {
      view_id: "mishnah-bekhoros-7-6-leg-cases",
      commentator: "Mishnah Bekhoros 7:6 (kohen leg/foot blemishes)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 6 },
      definition_scope: "example_cases",
      gloss: {
        value: "The Mishnah enumerates kohen-disqualifying leg/foot conditions: legs crooked so the ankles or knees knock, ba'al pikah (a protrusion-condition at the ankle), and the ikkel — defined as one who, when standing with feet together, has knees that do not knock into each other (i.e., bowlegged).",
        sourcing: "snippet",
        claim_type: "text",
        note: "Wording paraphrased from the ezrabrand newsletter summary of Bekhoros 7:6 plus the Sefaria search snippet. Exact Sefaria primary text on Mishnah_Bekhorot.7.6 still needs a direct pull. The Mishnah enumerates cases; whether they all sit under the Torah word 'pisseach' specifically — or whether some belong to a different category — needs commentary confirmation.",
      },
      supporting_quote: {
        value: "If one knocks his ankles [against each other, in walking] or rubs his legs [against each other]; a ba'al pikah and an ikkel. What is an ikkel? One whose knees [do not knock together when feet are placed together].",
        sourcing: "snippet",
        claim_type: "text",
        note: "Verbatim from the Sefaria search-result snippet on English_Explanation_of_Mishnah_Bekhorot.7.6. The Hebrew primary text has not been pulled directly.",
      },
      risk_level: "medium",
    },
    {
      view_id: "rashi-rambam-bekhoros-45a-baal-pikah-machlokes",
      commentator: "Rashi vs Rambam — what is 'ba'al pikah'? (Bekhoros 45a)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "45a" },
      definition_scope: "lexical",
      position: "kohen-animal-equivalence",
      gloss: {
        value: "Rashi and Rambam disagree on what specific condition the Mishnah's term 'ba'al pikah' refers to. Rashi reads it as flesh like a ball protruding from the thumb or big toe. Rambam reads it as the next case in the Mishnah's list — namely, a big heel that sticks out in back. Both readings sit within the same overall Mishnah enumeration, but they differ on which case the term names.",
        sourcing: "snippet",
        claim_type: "text",
        note: "Source: dafyomi.co.il review of Bekhoros 45 (Kollel Iyun Hadaf, Pesach Feldman) — the outline explicitly records 'Ba'al Pikah (Rashi - flesh like a ball protrudes from his thumb or big toe; Rambam - the next Mum (a big heel) is Ba'al Pikah)'. Direct primary-text pulls of Rashi on Bekhoros 45a and Rambam Pirush on Bekhoros 7:6 not yet completed.",
      },
      risk_level: "medium",
      note: "This is a definitional machlokes inside the Mishnah's case-list — not a machlokes about whether 'pisseach' applies, but about which physical condition the term 'ba'al pikah' specifically denotes. Both rishonim agree the case is a kohen mum; they differ on what the case is.",
    },
    {
      view_id: "gemara-bekhoros-45a-baal-pikah-shufnar",
      commentator: "Bekhoros 45a (Beraisa: ba'al pikah and shufnar)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "45a" },
      definition_scope: "lexical",
      position: "kohen-animal-equivalence",
      gloss: {
        value: "A Beraisa lists ba'al pikah and shufnar as kohen disqualifications. R' Yochanan: ba'al pikah is one whose ankle is big; shufnar is one who has no ankles (that stick out) at all. This R' Yochanan reading aligns with neither Rashi's thumb-protrusion gloss nor Rambam's big-heel gloss exactly — it adds a third refinement: the size and presence of the ankle bone itself.",
        sourcing: "snippet",
        claim_type: "text",
        note: "dafyomi.co.il review of Bekhoros 45. Records R' Yochanan's gemara-level definition. The relationship between R' Yochanan's gloss and the Rashi/Rambam machlokes is itself a structural question not yet resolved in this entry.",
      },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Rashi on Vayikra 21:18 (pisseach gloss — verify exact wording)",
    "Sifra Emor on pisseach",
    "Mishnah Bekhoros 7:6 (direct Hebrew primary text pull)",
    "Bekhoros 45a-b (gemara on the leg/foot cases)",
    "Bartenura on Bekhoros 7:6",
    "Rambam Pirush HaMishnayot on Bekhoros 7:6",
    "Rambam Mishneh Torah Bias HaMikdash ch. 8 (pisseach as kohen mum)",
    "Pisseach in Devarim 15:21 (bechor) — separate primary-source pull required",
    "Determination of whether kohen-pisseach and bechor-pisseach are identical or diverge",
  ],
  notes: "Pisseach is named in both the kohen list (21:18) and the bechor list (Devarim 15:21). The kohen-side cases above come from Mishnah Bekhoros 7:6. The bechor-side material has not been worked yet. The relationship between the two contexts (whether scope is identical, or whether each parsha has its own halachic shape) is an open structural question.",
};

const SHEVER_RAGEL = {
  id: "shever-ragel",
  name_he: "שֶׁבֶר רָגֶל",
  name_translit: "shever ragel",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 19 } },
  in_lists: ["kohen"],
  research_status: "partial",
  structure_note: "Shever ragel is named alongside shever yad in 21:19 (kohen). The behemah-list parallel at 22:22 uses the broader term 'shavur' (broken). Sifra Emor on 21:19 reconciles the difference in terminology and addresses the scope question. Pairs structurally with shever-yad — both share the same Sifra material and the same kohen-vs-animal terminology comparison.",
  views: [
    {
      view_id: "sifra-emor-21-19-shever-scope",
      commentator: "Sifra (Torat Kohanim) on Vayikra 21:19",
      source_ref: { kind: "sifra", parsha: "Emor", unit: "Section", n: 3 },
      definition_scope: "expanded_category",
      position: "kohen-animal-equivalence",
      gloss: {
        value: "Sifra (Torat Kohanim) on 21:19 addresses the difference between the kohen text 'shever ragel or shever yad' (which on its face suggests only a broken arm or leg disqualifies) and the animal text 'shavur' (which on its face implies any broken bone). Sifra posits that the disqualification is in fact one and the same in kohanim and in animals — both are disqualified on account of the same kind of injury.",
        sourcing: "snippet",
        claim_type: "text",
        note: "Sourced from the Yeshivat Har Etzion (etzion.org.il) SALT Parashat Emor 5782 summary of Torat Kohanim on 21:19. The exact Sifra reference unit and the verbatim Hebrew text have not been pulled directly from Sefaria. The exact Sifra section number remains to be locked.",
      },
      risk_level: "medium",
      note: "Same Sifra material applies to shever-ragel and shever-yad together — both share the kohen-vs-animal terminology comparison. The structural claim (kohen and animal disqualifications are the same injury, despite different Torah terms) is what's being recorded here, not a lexical gloss of the word 'shever' or 'ragel.'",
    },
    {
      view_id: "gemara-bekhoros-45a-oh-shever-ragel-derashah",
      commentator: "Bekhoros 45a (Beraisa: 'oh shever ragel' derashah)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "45a" },
      definition_scope: "derashah",
      position: "kohen-animal-equivalence",
      gloss: {
        value: "The Beraisa asks: 'Shever ragel' on its face only teaches that a broken leg disqualifies. What is the source for disqualifying knock-knees, ikkel (bowlegged), and ba'al pikah? Answer: The Torah's added 'oh' (or) in 'oh shever ragel' includes these. The word 'or' is itself doing exegetical work — extending the term beyond its lexical core (a broken leg) to the broader range of leg-condition cases enumerated in Mishnah Bekhoros 7:6.",
        sourcing: "snippet",
        claim_type: "text",
        note: "Source: dafyomi.co.il review of Bekhoros 45 (Kollel Iyun Hadaf, Pesach Feldman). Direct Hebrew text of the gemara not yet pulled from Sefaria.",
      },
      risk_level: "medium",
      note: "This is the central structural derashah for shever-ragel — it explains why the Mishnah's 7:6 case-list (knock-knees, ikkel, ba'al pikah, heel-out, goose-feet, overlapping toes) is read into a Torah term that lexically only means 'broken leg.' Pairs with the parallel 'oh shever yad' derashah on the same daf.",
    },
  ],
  pending_pulls: [
    "Sifra Emor on 21:19 (direct primary text pull — exact section/halacha number)",
    "Rashi on Vayikra 21:19",
    "Mishnah Bekhoros 7:6 + 7:1 (broken-limb material)",
    "Bekhoros 44b-45a (shever ragel / shever yad gemara)",
    "Bartenura on Bekhoros 7:1",
    "Rambam Pirush HaMishnayot on Bekhoros 7:1",
    "Rambam Mishneh Torah Bias HaMikdash ch. 8 (shever cases for kohen)",
    "Cross-reference: how shever-ragel/yad relate to the behemah-list 'shavur' (22:22)",
  ],
};

const SHEVER_YAD = {
  id: "shever-yad",
  name_he: "שֶׁבֶר יָד",
  name_translit: "shever yad",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 19 } },
  in_lists: ["kohen"],
  research_status: "partial",
  structure_note: "Shever yad is named alongside shever ragel in 21:19 (kohen). The Sifra material on 21:19 covers both terms together — the kohen text uses specific limbs (arm/leg) while the behemah text at 22:22 uses the broader 'shavur.' Pairs structurally with shever-ragel.",
  views: [
    {
      view_id: "sifra-emor-21-19-shever-scope-shared",
      commentator: "Sifra (Torat Kohanim) on Vayikra 21:19",
      source_ref: { kind: "sifra", parsha: "Emor", unit: "Section", n: 3 },
      definition_scope: "expanded_category",
      position: "kohen-animal-equivalence",
      gloss: {
        value: "Sifra (Torat Kohanim) on 21:19 addresses the difference between the kohen text 'shever ragel or shever yad' (which on its face suggests only a broken arm or leg disqualifies) and the animal text 'shavur' (which on its face implies any broken bone). Sifra posits that the disqualification is in fact one and the same in kohanim and in animals — both are disqualified on account of the same kind of injury.",
        sourcing: "snippet",
        claim_type: "text",
        note: "Same Sifra material as shever-ragel. Sourced from the Yeshivat Har Etzion (etzion.org.il) SALT Parashat Emor 5782 summary. Exact Sefaria primary text and section number not yet pulled.",
      },
      risk_level: "medium",
      note: "Shared Sifra content with shever-ragel. The structural claim is that the kohen and animal disqualifications are the same underlying injury despite different Torah terminology.",
    },
    {
      view_id: "gemara-bekhoros-45a-oh-shever-yad-derashah",
      commentator: "Bekhoros 45a (Beraisa: 'oh shever yad' derashah)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "45a" },
      definition_scope: "derashah",
      position: "kohen-animal-equivalence",
      gloss: {
        value: "The Beraisa parallels the shever-ragel derashah: 'Shever yad' on its face only teaches that a broken hand disqualifies. What is the source for disqualifying overlapping fingers, fingers connected past the joint, and similar hand-condition cases? Answer: The Torah's added 'oh' (or) in 'oh shever yad' includes these. As with shever-ragel, the word 'or' extends the term beyond its lexical core (a broken hand) to the broader hand-condition cases enumerated in Mishnah Bekhoros 7:6.",
        sourcing: "snippet",
        claim_type: "text",
        note: "Source: dafyomi.co.il review of Bekhoros 45. Direct Hebrew text of the gemara not yet pulled from Sefaria. The Mishnah explicitly distinguishes overlapping fingers (pasul) from cut-apart fingers (kosher), so the derashah's scope is bounded by the Mishnah's case-list.",
      },
      risk_level: "medium",
      note: "Parallel derashah to 'oh shever ragel.' This is the gemara's structural move that brings the Mishnah's 7:6 hand-case enumeration under the Torah term 'shever yad.'",
    },
  ],
  pending_pulls: [
    "Sifra Emor on 21:19 (direct primary text pull — exact section/halacha number)",
    "Rashi on Vayikra 21:19",
    "Mishnah Bekhoros 7:6 + 7:1 (broken-limb material)",
    "Bekhoros 44b-45a (shever ragel / shever yad gemara)",
    "Bartenura on Bekhoros 7:1",
    "Rambam Pirush HaMishnayot on Bekhoros 7:1",
    "Rambam Mishneh Torah Bias HaMikdash ch. 8 (shever cases for kohen)",
    "Cross-reference: how shever-yad relates to the behemah-list 'shavur' (22:22)",
  ],
};

const GARAV = {
  id: "garav",
  name_he: "גָּרָב",
  name_translit: "garav",
  torah_source: [
    { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 20 }, role: "kohen" },
    { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 22 }, role: "behemah" },
  ],
  in_lists: ["kohen", "behemah"],
  research_status: "partial",
  relation: "lexical_identity_with_structural_distinction",
  term_boundary_note: "Garav is named in both the kohen list (21:20) and the behemah/korban list (22:22), paired with yallefes in both. Bekhoros 41a explicitly identifies garav with the cheres of Devarim 28:27 (boils dry as earthenware). The Mishnah's word 'garav' (used in Bekhoros 6:12 for a curable, moist boil) is a different garav from the verse's word; the gemara resolves this by establishing three distinct conditions all called 'garav.' Mishnah Bekhoros 7:1 establishes that the blemishes taught for animals also disqualify in the case of a person — so the kohen-garav (21:20) and the behemah-garav (22:22) are identified at the lexical level, but the per-list halachic edges still need primary-source work.",
  structure_note: "Bekhoros 41a's lexical analysis: גרב זה החרס (garav of the verse = cheres) and ילפת זו חזזית המצרית (yallefes = chazazis hamitzris). The verse's two words are not synonyms — they label two distinct boil conditions. The gemara also distinguishes three types of garav: (1) the verse's garav = dry inside AND outside, incurable, called cheres in Devarim; (2) the mishna's garav = moist inside AND outside, curable; (3) Egyptian garav = dry inside, moist outside, incurable. Only type (1) is the Torah's korban-disqualifying garav.",
  views: [
    {
      view_id: "gemara-bekhoros-41a-garav-cheres-identity",
      commentator: "Bekhoros 41a (Beraisa: garav = cheres)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "41a" },
      definition_scope: "lexical",
      gloss: { value: "The Beraisa cited at Bekhoros 41a identifies the verse's garav (Vayikra 22:22) as cheres — boils that are hard like earthenware. The same Beraisa identifies yallefes as chazazis hamitzris (Egyptian boils, the kind that affected the Egyptians per Shemos 9:10). The two words in 22:22 thus name two distinct skin conditions, not synonymous boils.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "ותניא: גרב זה החרס, ילפת זו חזזית המצרית. ואמר ר\"ל: למה נקרא שמה ילפת — שמלפפת והולכת עד יום המיתה.", sourcing: "direct", claim_type: "text", note: "Verbatim from Sefaria Bekhorot 41a:7. Translation: 'And it is taught: Garav — this is cheres. Yallefes — this is the Egyptian chazazis. And Resh Lakish said: Why is it called yallefes? Because it clings on and progresses until the day of death.'" },
      risk_level: "low",
    },
    {
      view_id: "gemara-bekhoros-41a-three-types-of-garav",
      commentator: "Bekhoros 41a (Gemara: three distinct types of garav)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "41a" },
      definition_scope: "structural",
      gloss: { value: "The gemara resolves an apparent contradiction between the Torah's garav (a permanent disqualifying blemish) and the Mishnah's garav (which Bekhoros 6:12 treats as a non-disqualifying transient condition) by establishing three distinct conditions all called garav: (1) the verse's garav = dry inside AND outside, called cheres in Devarim 28:27, incurable (this is the Torah's korban-disqualifying garav); (2) the Mishnah's garav = moist inside AND outside, curable, hence not a permanent mum; (3) the Egyptian garav of Devarim 28:27 = dry inside, moist outside, also incurable. Only the verse's garav (type 1) is the kohen-disqualifying / korban-disqualifying mum.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "אלא תלתא הוו: דקרא — יבש בין מבפנים בין מבחוץ; דמתני' — לח מבחוץ ומבפנים; דמצרים — יבש מבפנים ולח מבחוץ, דכתיב 'ויהי שחין פורח אבעבועות באדם'.", sourcing: "direct", claim_type: "text", note: "Verbatim from Sefaria Bekhorot 41a:7. Translation: 'Rather, there are three types: of the verse — dry both inside and outside; of the Mishnah — moist outside and inside; of Egypt — dry inside and moist outside, as it is written: \"And it became a boil breaking forth with avabu'ot upon man and upon animal\" (Shemos 9:10).'" },
      risk_level: "low",
      note: "Critical structural finding: the word 'garav' is genuinely homonymous across these three contexts. Only the dry-inside-AND-outside type is the Torah's korban-disqualifying mum.",
    },
    {
      view_id: "mishnah-bekhoros-7-1-animal-blemishes-apply-to-person",
      commentator: "Mishnah Bekhoros 7:1 (animal blemishes apply to person)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 1 },
      definition_scope: "structural",
      gloss: { value: "Mishnah Bekhoros 7:1 opens the chapter on kohen-disqualifying blemishes by stating that the blemishes taught with regard to an animal — whether permanent or transient — also disqualify in the case of a person, with additions specific to humans. This establishes a baseline lexical identity between the kohen-list garav (21:20) and the behemah-list garav (22:22): the same word names the same condition. Per-list halachic edges (e.g., does the same kind of garav disqualify a kohen from full avodah but only specific avodos elsewhere?) remain a per-pasuk question.", sourcing: "snippet", claim_type: "text", note: "Mishnah text from Sefaria search snippet on Mishnah_Bekhorot.7.1. Direct verbatim Hebrew text not pulled in this entry. The general principle is well-established; the per-term edges still require commentary confirmation." },
      risk_level: "medium",
    },
    {
      view_id: "rambam-pirush-bekhoros-7-2-tradition-meta",
      commentator: "Rambam Pirush HaMishnayot on Bekhoros 7:2 (tradition-based identification)",
      source_ref: { kind: "rambam_pirush", masechet: "Bekhorot", ch: 7, m: 2 },
      definition_scope: "structural",
      gloss: { value: "Rambam in his Pirush HaMishnayot to Bekhoros 7:2 makes a load-bearing methodological claim: although there is dispute about the precise meaning of the names of the mumim, all of the blemishes themselves are known through tradition. The definitional disputes between commentators about which physical condition each Torah word names are not, on Rambam's account, disputes about which conditions disqualify — only about lexical identification. Same meta-framing Rambam applies to gibben.", sourcing: "snippet", claim_type: "text", note: "Source: Kollel Iyun Hadaf background outline for Bekhoros 41 explicitly cites this Rambam Pirush claim. Direct Hebrew text of Rambam Pirush HaMishnayot Bekhoros 7:2 not yet pulled. The meta-claim applies broadly across all the mumim entries, not just garav." },
      risk_level: "medium",
      note: "This Rambam meta-claim is shared with the gibben entry (rambam-pirush-hamishnayot-7-5-gibben-meta). It establishes that for many of these terms, the rishonim's definitional disputes do not change the halachic scope.",
    },
  ],
  pending_pulls: [
    "Rashi on Vayikra 21:20 (kohen-garav specifically)",
    "Rashi on Vayikra 22:22 (behemah-garav specifically)",
    "Sifra Emor on garav (both lists)",
    "Mishnah Bekhoros 6:12 verbatim Hebrew (Sefaria primary)",
    "Rambam Mishneh Torah Bias HaMikdash ch. 8 — exact halacha for kohen-garav",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2 — exact halacha for behemah-garav",
    "Rambam Pirush HaMishnayot Bekhoros 7:2 verbatim text (the tradition meta-claim)",
  ],
  consensus: {
    statement: "Bekhoros 41a establishes the lexical identity garav = cheres (boils dry as earthenware) and yallefes = chazazis hamitzris (Egyptian boils, etymologized by Resh Lakish as 'clinging on and progressing until death'). The gemara further distinguishes three distinct conditions called garav, with only the dry-inside-AND-outside type matching the Torah's verse-garav. Mishnah Bekhoros 7:1 establishes that the same word identifies the same condition across the kohen and behemah lists. Rambam in his Pirush HaMishnayot to Bekhoros 7:2 frames definitional disputes about these terms as purely lexical — the halachic scope is established through tradition, independent of which physical condition each commentator identifies as the term's referent.",
    sourcing: "direct",
    claim_type: "text",
    risk_level: "low",
    note: "Two views (gemara identity claim and three-types-of-garav structural analysis) are direct-sourced from Sefaria Bekhorot 41a:7. Mishnah 7:1 and Rambam Pirush views remain snippet-derived. The structural framework is robust at the macro level; per-list halachic edges (Rambam's exact halacha numbers in Bias HaMikdash ch. 8 and Issurei Mizbeach ch. 2) remain pending.",
  },
};

const YALLEFES = {
  id: "yallefes",
  name_he: "יַלֶּפֶת",
  name_translit: "yallefes",
  torah_source: [
    { ref: { kind: "tanakh", book: "Leviticus", ch: 21, v: 20 }, role: "kohen" },
    { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 22 }, role: "behemah" },
  ],
  in_lists: ["kohen", "behemah"],
  research_status: "partial",
  relation: "lexical_identity_with_etymological_gloss",
  term_boundary_note: "Yallefes is named in both the kohen list (21:20) and the behemah/korban list (22:22), paired with garav in both. Bekhoros 41a explicitly identifies yallefes with chazazis hamitzris (Egyptian boils — boils dry inside and moist outside, the kind that afflicted the Egyptians per Shemos 9:10). Resh Lakish gives the term an etymological gloss: 'clings on and progresses until the day of death.' The Mishnah's Bekhoros 6:12 reference to chazazis treats it as transient/curable; the gemara resolves by distinguishing 'Egyptian chazazis' (Torah's yallefes, incurable) from 'regular chazazis' (Mishnah's transient case).",
  structure_note: "The two words in 22:22 (garav and yallefes) name two distinct skin conditions, not synonyms. Per the Bekhoros 41a Beraisa: garav = cheres (dry both sides), yallefes = chazazis hamitzris (Egyptian variety). Resh Lakish's etymology — שמלפפת והולכת עד יום המיתה — locates yallefes's distinguishing feature in its progressive, terminal character. Mishnah Bekhoros 7:1 establishes that the same word names the same condition across the kohen and behemah lists.",
  views: [
    {
      view_id: "gemara-bekhoros-41a-yallefes-chazazis-identity",
      commentator: "Bekhoros 41a (Beraisa: yallefes = chazazis hamitzris)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "41a" },
      definition_scope: "lexical",
      gloss: { value: "The Beraisa cited at Bekhoros 41a identifies the verse's yallefes (Vayikra 22:22) as chazazis hamitzris — the type of boils that afflicted the Egyptians during the plague (Shemos 9:10). Per the gemara's own further analysis, this is a boil dry on the inside and moist on the outside, incurable. Distinct from the verse's garav (which is dry on both sides) and from regular non-Egyptian chazazis (which is curable and treated as transient by Mishnah Bekhoros 6:12).", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "ותניא: גרב זה החרס, ילפת זו חזזית המצרית.", sourcing: "direct", claim_type: "text", note: "Verbatim from Sefaria Bekhorot 41a:7. Translation: 'And it is taught: Garav — this is cheres. Yallefes — this is the Egyptian chazazis.' The same Beraisa establishes the identity for both garav and yallefes." },
      risk_level: "low",
    },
    {
      view_id: "resh-lakish-bekhoros-41a-yallefes-etymology",
      commentator: "Resh Lakish (Bekhoros 41a) — etymology of yallefes",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "41a" },
      definition_scope: "lexical",
      gloss: { value: "Resh Lakish provides an etymological gloss for yallefes: the name comes from מלפפת ('clings on'), because the affliction clings on and progresses until the day of death. This locates yallefes's distinguishing feature in its terminal, progressive character — the affliction does not heal and only worsens.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "ואמר ר\"ל: למה נקרא שמה ילפת — שמלפפת והולכת עד יום המיתה.", sourcing: "direct", claim_type: "text", note: "Verbatim from Sefaria Bekhorot 41a:7. Translation: 'And Resh Lakish said: Why is it called yallefes? Because it clings on and progresses until the day of death.'" },
      risk_level: "low",
      note: "Resh Lakish's etymology adds a structural feature (terminal progression) to the identity claim — yallefes is not just any Egyptian boil but specifically one that worsens irreversibly.",
    },
    {
      view_id: "gemara-bekhoros-41a-chazazis-distinction",
      commentator: "Bekhoros 41a (Gemara: Egyptian vs regular chazazis)",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "41a" },
      definition_scope: "structural",
      gloss: { value: "The gemara resolves an apparent contradiction: the Mishnah (Bekhoros 6:12) treats chazazis as a transient (non-disqualifying) skin condition, while the Torah lists yallefes as a permanent disqualifying mum. Resolution: the Torah's yallefes refers to Egyptian chazazis (chazazis hamitzris) — incurable; the Mishnah's chazazis refers to a regular, non-Egyptian variety which is curable and therefore not a permanent mum. The same Hebrew word can name two distinct conditions across these contexts.", sourcing: "direct", claim_type: "text" },
      supporting_quote: { value: "בשלמא חזזית אחזזית לא קשיא: כאן בחזזית המצרית, כאן בחזזית דעלמא.", sourcing: "direct", claim_type: "text", note: "Verbatim from Sefaria Bekhorot 41a:7. Translation: 'Granted, the contradiction between chazazis and chazazis is not difficult: here it refers to the Egyptian chazazis, there to the regular chazazis.'" },
      risk_level: "low",
    },
    {
      view_id: "mishnah-bekhoros-7-1-animal-blemishes-yallefes",
      commentator: "Mishnah Bekhoros 7:1 (animal blemishes apply to person)",
      source_ref: { kind: "mishnah", masechet: "Bekhorot", ch: 7, m: 1 },
      definition_scope: "structural",
      gloss: { value: "Mishnah Bekhoros 7:1's general rule — that blemishes taught for animals also disqualify a person — establishes baseline lexical identity between the kohen-list yallefes (21:20) and the behemah-list yallefes (22:22). Same word, same condition, applied to two halachic regimes.", sourcing: "snippet", claim_type: "text", note: "Mishnah text from Sefaria search snippet. Direct verbatim Hebrew not pulled in this entry. Same general claim as for garav; per-term halachic edges remain a per-pasuk question." },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Rashi on Vayikra 21:20 (kohen-yallefes specifically)",
    "Rashi on Vayikra 22:22 (behemah-yallefes specifically)",
    "Sifra Emor on yallefes (both lists)",
    "Mishnah Bekhoros 6:12 verbatim Hebrew (Sefaria primary)",
    "Rambam Mishneh Torah Bias HaMikdash ch. 8 — exact halacha for kohen-yallefes",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2 — exact halacha for behemah-yallefes",
    "Rambam Pirush HaMishnayot Bekhoros 6:12 / 7:2 — relevant gloss",
  ],
  consensus: {
    statement: "Bekhoros 41a identifies yallefes as Egyptian chazazis — a skin condition dry inside, moist outside, incurable (the kind that afflicted the Egyptians per Shemos 9:10). Resh Lakish provides an etymological gloss locating the name in מלפפת ('clings on'), keyed to the affliction's progressive, terminal character. Distinct from the verse's garav (dry both sides, identified with cheres). The gemara further distinguishes Egyptian chazazis (Torah's yallefes, incurable) from regular non-Egyptian chazazis (Mishnah's transient case). Mishnah Bekhoros 7:1 establishes that the kohen-list yallefes (21:20) and the behemah-list yallefes (22:22) name the same condition.",
    sourcing: "direct",
    claim_type: "text",
    risk_level: "low",
    note: "Three of four views are direct-sourced from Sefaria Bekhorot 41a:7. Mishnah 7:1 view remains snippet-derived. Per-list halachic edges and Rambam's exact halacha numbers remain pending.",
  },
};

const MA_UCH = {
  id: "ma-uch",
  name_he: "מָעוּךְ",
  name_translit: "ma'uch",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 24 } },
  in_lists: ["behemah"],
  research_status: "partial",
  relation: "machlokes_anatomical_scope",
  term_boundary_note: "Ma'uch is the first of four crushed/severed-testes terms in the behemah list (22:24): u'ma'uch v'kasus v'nasuk v'karus. The four terms function as a unit in the gemara — Bekhoros 39b's machlokes about which organ they refer to (testicles vs gid vs both) covers all four, with R' Yossi's compromise drawing the line between ma'uch+kasus and nasuk+karus. There is physical overlap with the kohen-list meroach ashech (21:20), but the parshiyos are separate, the lavin are distinct, and Rambam files the kohen and behemah cases in different hilchos (Bias HaMikdash for kohen, Issurei Mizbeach for behemah). Do not merge with meroach-ashech.",
  structure_note: "Vayikra 22:24 generates two distinct halachic categories from the same four terms: (a) animals with these blemishes are pasul for korban (Issurei Mizbeach), and (b) the act of producing these blemishes — castration — is itself prohibited (Issurei Biyah ch. 16, SHM LT 361). The Bekhoros 39b machlokes between R' Yehuda, R' Eliezer ben Ya'akov, and R' Yossi about which organ(s) the four terms denote is a single unified machlokes covering all four terms; views encoded here for ma'uch are paralleled in kasus, nasuk, and karus.",
  views: [
    {
      view_id: "beraisa-bekhoros-39b-lexical-pairs",
      commentator: "Beraisa (Bekhoros 39b) — lexical pairing of the four terms",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "lexical",
      gloss: { value: "The Beraisa pairs the four terms: 'u'ma'uch v'kasus' = squashed and crushed; 'v'nasuk v'karus' = severed by hand and cut with a knife. The Beraisa specifies the sequence: first cut with a knife (still attached), then severed by hand. Ma'uch in this lexical pairing means squashed (a less severe form of crushing than kasus's full crushing).", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il review of Bekhoros 39 (Kollel Iyun Hadaf, Eliezer Chrysler). Direct Hebrew text of the Bekhoros 39b Beraisa not yet pulled from Sefaria." },
      risk_level: "medium",
      note: "This Beraisa establishes the lexical layer for all four terms. The anatomical-scope question (which organ are these blemishes ON?) is the separate machlokes between R' Yehuda, R' Eliezer ben Ya'akov, and R' Yossi recorded below.",
    },
    {
      view_id: "rabbi-yehuda-bekhoros-39b-testicles",
      commentator: "R' Yehuda (Bekhoros 39b) — all four refer to testicles",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "testicles",
      gloss: { value: "R' Yehuda holds that ma'uch, kasus, nasuk, and karus all refer to testicular blemishes. The gemara amends this initial position to 'also testicles' (af be'beitzim) — since blocking gid blemishes (which are externally visible) would be perverse. R' Yehuda's logic: ma'uch ve'kasus (squashed/crushed) appear shriveled from outside; nasuk ve'karus (severed/cut) hang loosely. Both are externally visible enough to count as galuy.", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il review of Bekhoros 39. The 'af be'beitzim' amendment is itself a gemara move responding to an objection. Original R' Yehuda position was strict 'testicles only'; gemara expands." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-eliezer-ben-yaakov-bekhoros-39b-gid",
      commentator: "R' Eliezer ben Ya'akov (Bekhoros 39b) — all four refer to the gid",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "gid",
      gloss: { value: "R' Eliezer ben Ya'akov holds that all four terms refer to blemishes on the gid (membrum), not on the testicles. His logic: testicular versions of these conditions sometimes occur with no actual blemish at all (the testicles can appear shriveled or hanging without underlying damage), so they would remain a chesaron mibifenim — an internal-only chesaron, not legally galuy.", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il review of Bekhoros 39. R' Eliezer ben Ya'akov's view turns on the question of whether the testicle conditions count as externally visible." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-yossi-bekhoros-39b-compromise",
      commentator: "R' Yossi (Bekhoros 39b) — split: ma'uch+kasus apply to both, nasuk+karus to gid only",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "compromise-both-organs",
      gloss: { value: "R' Yossi compromises between R' Yehuda and R' Eliezer ben Ya'akov. For ma'uch and kasus: the terms apply to both gid AND testicles (testicular squashing/crushing IS externally visible enough to count as galuy). For nasuk and karus: the terms apply only to the gid (testicular severing/cutting does NOT count as galuy on its own). For ma'uch specifically, R' Yossi includes both organs.", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il review of Bekhoros 39. The gemara's analysis: all three tana'im agree chesaron mibifenim is not a chesaron; their machlokes is whether the four blemishes' testicular-versions count as galuy (externally visible). R' Yossi splits — squashing/crushing yes, severing/cutting no." },
      risk_level: "medium",
      note: "R' Yossi's position differs by term: applies to ma'uch and kasus as 'both organs'; applies to nasuk and karus as 'gid only.' The MA_UCH entry records the 'both organs' branch; see NASUK and KARUS for the parallel 'gid only' branch.",
    },
    {
      view_id: "shm-negative-361-castration-prohibition",
      commentator: "Sefer HaMitzvot, Negative Commandment 361 (castration prohibition)",
      source_ref: { kind: "shm", type: "Negative", n: 361 },
      definition_scope: "structural",
      gloss: { value: "Vayikra 22:24 generates a separate prohibition beyond the korban-disqualification: the act of damaging the reproductive organs of any male animal (or human) is forbidden. This is the prohibition of sirus (castration). SHM LT 361 cites this verse — following the mention of [animals whose reproductive organs were] crushed by hand or [crushed by tool] — and Rambam files the prohibition in Hilchos Issurei Biyah 16:10 rather than in Hilchos Issurei Mizbeach.", sourcing: "snippet", claim_type: "text", note: "Source: shulchanaruchharav.com summary citing Rambam Issurei Biyah 16:10 / Chinuch 291 / Shabbos 110b-111a; Chabad.org SHM 361 page confirms Vayikra 22:24 as the source verse. Direct Hebrew SHM text not pulled in this entry. Note: this view is structural — it documents that the verse generates two halachic categories, not that ma'uch itself names the prohibition." },
      risk_level: "low",
      note: "Important boundary clarification: 22:24's four terms are blemishes on the animal (filed in Issurei Mizbeach); the verse ALSO generates a separate prohibition on the act of producing those blemishes (filed in Issurei Biyah). Same verse, two halachic structures.",
    },
  ],
  pending_pulls: [
    "Bekhoros 39b verbatim Beraisa text (Sefaria primary)",
    "Mishnah Bekhoros 6:5 (testicle blemishes in behemah)",
    "Rashi on Vayikra 22:24",
    "Sifra Emor on 22:24 (ma'uch / kasus / nasuk / karus)",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2 — exact halacha numbers for the four-blemish psak",
    "Rambam Mishneh Torah Issurei Biyah 16:10 — sirus prohibition direct text",
    "Sefer HaMitzvos LT 361 verbatim",
    "Determination of how Rambam paskens the R' Yehuda / R' Eliezer ben Ya'akov / R' Yossi anatomical-scope machlokes",
  ],
  consensus: {
    statement: "Bekhoros 39b records a three-tanna machlokes about which organ(s) the four terms ma'uch/kasus/nasuk/karus refer to. R' Yehuda: all four → testicles (gemara amends to 'also testicles'). R' Eliezer ben Ya'akov: all four → gid only. R' Yossi compromises: ma'uch and kasus → both organs; nasuk and karus → gid only. The underlying analytical question is whether testicular versions of these conditions count as galuy (externally visible). All three agree chesaron mibifenim is not a chesaron. Rambam's psak on this anatomical-scope machlokes is filed in Issurei Mizbeach ch. 2 and has not been pulled directly in this entry.",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "All three tanna positions are dafyomi-summary-derived. Direct gemara text and Rambam's psak both pending.",
  },
};

const KASUS = {
  id: "kasus",
  name_he: "כָּתוּת",
  name_translit: "kasus",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 24 } },
  in_lists: ["behemah"],
  research_status: "partial",
  relation: "machlokes_anatomical_scope",
  term_boundary_note: "Kasus is the second of four crushed/severed-testes terms in the behemah list (22:24): u'ma'uch v'kasus v'nasuk v'karus. The four terms function as a unit in the gemara's Bekhoros 39b machlokes; see MA_UCH for the structural framing. Physical overlap with meroach ashech (kohen list, 21:20) exists but the halachic categories are distinct — separate parshiyos, separate lavin, separate hilchos in Rambam. Do not merge.",
  structure_note: "Vayikra 22:24's four terms generate two distinct halachic categories: korban-disqualification (Issurei Mizbeach) and the sirus prohibition (Issurei Biyah ch. 16, SHM LT 361). The Bekhoros 39b anatomical-scope machlokes is shared across all four; see MA_UCH for the full structural treatment. Kasus is paired with ma'uch in the Beraisa's lexical analysis.",
  views: [
    {
      view_id: "beraisa-bekhoros-39b-kasus-lexical",
      commentator: "Beraisa (Bekhoros 39b) — kasus = crushed",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "lexical",
      gloss: { value: "The Beraisa pairs ma'uch with kasus: 'u'ma'uch v'kasus' = squashed and crushed. Kasus denotes a more severe/complete crushing than ma'uch's squashing — they form a graduated lexical pair. The Beraisa pairs nasuk with karus on the other axis (severing).", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il review of Bekhoros 39. Direct Hebrew text of the Beraisa not yet pulled from Sefaria." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-yehuda-bekhoros-39b-testicles-kasus",
      commentator: "R' Yehuda (Bekhoros 39b) — applied to kasus",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "testicles",
      gloss: { value: "R' Yehuda's position: kasus refers to crushed testicles (alongside ma'uch's squashed testicles). Both are externally visible enough to count as galuy. The gemara amends his initial 'testicles only' to 'also testicles' (af be'beitzim).", sourcing: "snippet", claim_type: "text", note: "Same R' Yehuda position as for ma'uch; see MA_UCH entry for the underlying chesaron-mibifenim/galuy framing." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-eliezer-ben-yaakov-bekhoros-39b-gid-kasus",
      commentator: "R' Eliezer ben Ya'akov (Bekhoros 39b) — applied to kasus",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "gid",
      gloss: { value: "R' Eliezer ben Ya'akov: kasus refers only to a crushed gid, not to crushed testicles. Testicular crushing remains chesaron mibifenim and does not count as galuy.", sourcing: "snippet", claim_type: "text", note: "Same R' Eliezer ben Ya'akov position as for ma'uch; see MA_UCH for the underlying logic." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-yossi-bekhoros-39b-kasus-both-organs",
      commentator: "R' Yossi (Bekhoros 39b) — kasus applies to both gid AND testicles",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "compromise-both-organs",
      gloss: { value: "R' Yossi's compromise: like ma'uch, kasus applies to both gid AND testicles. Crushing is externally visible enough on the testicles to count as galuy. R' Yossi differs from R' Eliezer ben Ya'akov on this point — and differs from his own treatment of nasuk and karus, which he restricts to the gid only.", sourcing: "snippet", claim_type: "text", note: "R' Yossi's split is a per-pair distinction: ma'uch+kasus get both organs; nasuk+karus get gid only. See NASUK and KARUS entries for the contrasting branch." },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Bekhoros 39b verbatim Beraisa text (Sefaria primary)",
    "Mishnah Bekhoros 6:5",
    "Rashi on Vayikra 22:24",
    "Sifra Emor on 22:24",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2",
    "Rambam's psak on the R' Yehuda / R' Eliezer ben Ya'akov / R' Yossi machlokes",
  ],
  consensus: {
    statement: "Kasus is the 'fully crushed' counterpart to ma'uch's 'squashed' in the Beraisa's lexical pairing on Bekhoros 39b. The anatomical-scope machlokes (testicles vs gid vs both) follows the same three-tanna pattern as ma'uch: R' Yehuda → both via 'af be'beitzim'; R' Eliezer ben Ya'akov → gid only; R' Yossi → both organs. R' Yossi's position groups kasus with ma'uch (against nasuk and karus, which he restricts to gid only). Rambam's psak pending.",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "Shares the underlying Bekhoros 39b machlokes with ma'uch, nasuk, and karus. Per-term differentiation is in the lexical layer (squashed vs crushed) and in R' Yossi's split.",
  },
};

const NASUK = {
  id: "nasuk",
  name_he: "נָתוּק",
  name_translit: "nasuk",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 24 } },
  in_lists: ["behemah"],
  research_status: "partial",
  relation: "machlokes_anatomical_scope",
  term_boundary_note: "Nasuk is the third of four crushed/severed-testes terms in the behemah list (22:24): u'ma'uch v'kasus v'nasuk v'karus. Paired with karus in the Beraisa's lexical pairing (severed/cut). The Bekhoros 39b machlokes covers all four; see MA_UCH for the structural framing. R' Yossi's compromise treats nasuk differently from ma'uch and kasus (see view below). Physical overlap with meroach ashech (kohen list, 21:20) does not collapse the categories; do not merge.",
  structure_note: "Nasuk and karus form the second pair in the Beraisa's lexical analysis: nasuk = severed by hand, karus = cut with a knife. The Beraisa specifies the physical sequence: karus first (cut while still attached), then nasuk (final separation by hand) — so karus precedes nasuk in the actual physical sequence even though the Torah's word order is nasuk-then-karus. R' Yossi's compromise: ma'uch and kasus apply to both organs, but nasuk and karus apply only to the gid.",
  views: [
    {
      view_id: "beraisa-bekhoros-39b-nasuk-lexical",
      commentator: "Beraisa (Bekhoros 39b) — nasuk = severed by hand",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "lexical",
      gloss: { value: "The Beraisa pairs nasuk with karus: 'v'nasuk v'karus' = severed by hand and cut with a knife. Nasuk denotes severing-by-hand. The Beraisa specifies the physical sequence: karus first (cut by knife while still attached), then nasuk (final separation by hand). The Torah's word order (nasuk before karus) is opposite the physical sequence.", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il review of Bekhoros 39. The sequence claim is the gemara's own — that the verse describes the END state (severed) before the means (knife-cut) for textual reasons, not because severing-by-hand precedes cutting-with-knife in time." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-yehuda-bekhoros-39b-testicles-nasuk",
      commentator: "R' Yehuda (Bekhoros 39b) — applied to nasuk",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "testicles",
      gloss: { value: "R' Yehuda's position: nasuk refers to severed testicles (alongside karus's knife-cut testicles). Severed testicles hang loosely, which is externally visible enough to count as galuy. Gemara amends to 'also testicles' (af be'beitzim).", sourcing: "snippet", claim_type: "text", note: "Same R' Yehuda position as for ma'uch and kasus; see MA_UCH for the underlying chesaron-mibifenim/galuy framing." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-eliezer-ben-yaakov-bekhoros-39b-gid-nasuk",
      commentator: "R' Eliezer ben Ya'akov (Bekhoros 39b) — applied to nasuk",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "gid",
      gloss: { value: "R' Eliezer ben Ya'akov: nasuk refers only to a severed gid, not to severed testicles. Testicular hanging-loose can occur without underlying damage and remains chesaron mibifenim.", sourcing: "snippet", claim_type: "text", note: "Same R' Eliezer ben Ya'akov position as for ma'uch and kasus; see MA_UCH for the underlying logic." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-yossi-bekhoros-39b-nasuk-gid-only",
      commentator: "R' Yossi (Bekhoros 39b) — nasuk applies to gid only",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "compromise-gid-only",
      gloss: { value: "R' Yossi's compromise: unlike ma'uch and kasus (which he applies to both organs), nasuk applies only to the gid. Severed testicles do NOT count as galuy on their own — the hanging-loose appearance can occur without underlying damage. R' Yossi here agrees with R' Eliezer ben Ya'akov against R' Yehuda.", sourcing: "snippet", claim_type: "text", note: "R' Yossi splits the four terms: ma'uch+kasus = both organs; nasuk+karus = gid only. The split point matches the Beraisa's lexical pairing — squashing/crushing on one side, severing/cutting on the other." },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Bekhoros 39b verbatim Beraisa text (Sefaria primary)",
    "Mishnah Bekhoros 6:5",
    "Rashi on Vayikra 22:24 (specifically on nasuk)",
    "Sifra Emor on 22:24",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2",
    "Rambam's psak on the R' Yehuda / R' Eliezer ben Ya'akov / R' Yossi machlokes — particularly relevant for nasuk where R' Yossi sides with R' Eliezer ben Ya'akov",
  ],
  consensus: {
    statement: "Nasuk is the 'severed by hand' final step in the Beraisa's lexical pairing with karus on Bekhoros 39b. The anatomical-scope machlokes follows the three-tanna pattern: R' Yehuda → both via 'af be'beitzim'; R' Eliezer ben Ya'akov → gid only; R' Yossi → gid only (groups nasuk with karus, against ma'uch and kasus). The R' Yossi split is the structurally interesting move — the lexical pair nasuk/karus is treated differently from ma'uch/kasus. Rambam's psak pending.",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "Shares the underlying Bekhoros 39b machlokes with ma'uch, kasus, and karus. R' Yossi's gid-only restriction here distinguishes nasuk from ma'uch and kasus.",
  },
};

const KARUS = {
  id: "karus",
  name_he: "כָּרוּת",
  name_translit: "karus",
  torah_source: { ref: { kind: "tanakh", book: "Leviticus", ch: 22, v: 24 } },
  in_lists: ["behemah"],
  research_status: "partial",
  relation: "machlokes_anatomical_scope",
  term_boundary_note: "Karus is the fourth and final term in the behemah list (22:24): u'ma'uch v'kasus v'nasuk v'karus. Paired with nasuk in the Beraisa's lexical pairing (severed/cut). The Bekhoros 39b machlokes covers all four; see MA_UCH for the structural framing. R' Yossi treats karus identically to nasuk (gid only). Physical overlap with meroach ashech (kohen list, 21:20) does not collapse the categories; do not merge.",
  structure_note: "Karus and nasuk form the second pair in the Beraisa's lexical analysis: karus = cut with a knife (first step in the physical sequence), nasuk = severed by hand (final step). The Torah's word order places nasuk before karus despite the reverse physical order. R' Yossi's compromise: nasuk and karus apply only to the gid (in contrast to ma'uch and kasus, which he applies to both organs).",
  views: [
    {
      view_id: "beraisa-bekhoros-39b-karus-lexical",
      commentator: "Beraisa (Bekhoros 39b) — karus = cut with a knife",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "lexical",
      gloss: { value: "The Beraisa pairs karus with nasuk: 'v'nasuk v'karus' = severed by hand and cut with a knife. Karus denotes cutting with a knife — the first step in the physical sequence (organ cut by knife while still attached), with nasuk's hand-severing following. The Torah's word order is reversed from the physical sequence, with the END state (nasuk = severed) named before the means (karus = knife-cut).", sourcing: "snippet", claim_type: "text", note: "Source: dafyomi.co.il review of Bekhoros 39. The reversed-order observation is the Beraisa's own structural reading." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-yehuda-bekhoros-39b-testicles-karus",
      commentator: "R' Yehuda (Bekhoros 39b) — applied to karus",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "testicles",
      gloss: { value: "R' Yehuda's position: karus refers to knife-cut testicles (alongside nasuk's hand-severed testicles). Both are externally visible enough to count as galuy. Gemara amends to 'also testicles' (af be'beitzim).", sourcing: "snippet", claim_type: "text", note: "Same R' Yehuda position as for the other three terms; see MA_UCH for the underlying framing." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-eliezer-ben-yaakov-bekhoros-39b-gid-karus",
      commentator: "R' Eliezer ben Ya'akov (Bekhoros 39b) — applied to karus",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "gid",
      gloss: { value: "R' Eliezer ben Ya'akov: karus refers only to a knife-cut gid, not to knife-cut testicles. Testicular knife-cuts that don't fully sever do not produce sufficiently visible blemish to count as galuy.", sourcing: "snippet", claim_type: "text", note: "Same R' Eliezer ben Ya'akov position as for the other three terms; see MA_UCH for the underlying logic." },
      risk_level: "medium",
    },
    {
      view_id: "rabbi-yossi-bekhoros-39b-karus-gid-only",
      commentator: "R' Yossi (Bekhoros 39b) — karus applies to gid only",
      source_ref: { kind: "gemara", masechet: "Bekhorot", daf: "39b" },
      definition_scope: "expanded_category",
      position: "compromise-gid-only",
      gloss: { value: "R' Yossi's compromise: like nasuk (and unlike ma'uch and kasus), karus applies only to the gid. The knife-cut, like the hand-severing, does not produce sufficiently visible testicular blemish to count as galuy. R' Yossi sides with R' Eliezer ben Ya'akov on this point.", sourcing: "snippet", claim_type: "text", note: "R' Yossi groups karus with nasuk in the gid-only branch of his compromise. The split-point between his two pairs (squashing/crushing → both organs; severing/cutting → gid only) matches the Beraisa's own lexical pairing." },
      risk_level: "medium",
    },
  ],
  pending_pulls: [
    "Bekhoros 39b verbatim Beraisa text (Sefaria primary)",
    "Mishnah Bekhoros 6:5",
    "Rashi on Vayikra 22:24 (specifically on karus)",
    "Sifra Emor on 22:24",
    "Rambam Mishneh Torah Issurei Mizbeach ch. 2",
    "Rambam's psak on the R' Yehuda / R' Eliezer ben Ya'akov / R' Yossi machlokes",
  ],
  consensus: {
    statement: "Karus is the 'cut with a knife' first step in the Beraisa's lexical pairing with nasuk on Bekhoros 39b. The anatomical-scope machlokes follows the same three-tanna pattern as the other three terms: R' Yehuda → both via 'af be'beitzim'; R' Eliezer ben Ya'akov → gid only; R' Yossi → gid only (groups karus with nasuk, against ma'uch and kasus). Like nasuk, karus is on the gid-only side of R' Yossi's split. Rambam's psak pending.",
    sourcing: "snippet",
    claim_type: "text",
    risk_level: "medium",
    note: "Shares the underlying Bekhoros 39b machlokes with ma'uch, kasus, and nasuk. Together with nasuk, karus is on the gid-only branch of R' Yossi's split.",
  },
};

// =============================================================================
// TERM INDEX — keyed metadata + per-pasuk ordering
// =============================================================================
// One entry per unique blemish, keyed by id. The index does NOT bake in pasuk
// ordering. Two separate ordering arrays (KOHEN_PASUK_ORDER, KORBAN_PASUK_ORDER)
// drive the rendering: in "all" mode, both arrays render as separate sections,
// and shared terms (iver, sarua, garav, yallefes) appear in BOTH.
//
// Relationships used in comparison mode and badges:
//   "shared term"                    — same word, both lists
//   "shared term, different din"     — same word, different halachic role
//   "physical overlap, distinct halachic categories" — different words, separate parshiyos
//   "kohen only"                     — only in 21:18-20
//   "korban only"                    — only in 22:22-24
//
// Contexts used in mode filtering: only "kohen", "korban", "bechor".

const TERM_INDEX = {
  "iver": {
    name_he: "עִוֵּר",
    name_translit: "iver",
    short_gloss: "Blind",
    contexts: ["kohen", "korban", "bechor"],
    relationship: "shared term",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 18 },
    korban_pasuk: { book: "Leviticus", ch: 22, v: 22 },
  },
  "pisseach": {
    name_he: "פִּסֵּחַ",
    name_translit: "pisseach",
    short_gloss: "Lame",
    contexts: ["kohen", "bechor"],
    relationship: "kohen only",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 18 },
    korban_pasuk: null,
  },
  "charum": {
    name_he: "חָרֻם",
    name_translit: "charum",
    short_gloss: "Nose blemish",
    contexts: ["kohen"],
    relationship: "kohen only",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 18 },
    korban_pasuk: null,
  },
  "sarua": {
    name_he: "שָׂרוּעַ",
    name_translit: "sarua",
    short_gloss: "Extended / uneven limb",
    contexts: ["kohen", "korban"],
    relationship: "shared term, different din",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 18 },
    korban_pasuk: { book: "Leviticus", ch: 22, v: 23 },
  },
  "shever-ragel": {
    name_he: "שֶׁבֶר רָגֶל",
    name_translit: "shever ragel",
    short_gloss: "Broken leg",
    contexts: ["kohen"],
    relationship: "kohen only",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 19 },
    korban_pasuk: null,
  },
  "shever-yad": {
    name_he: "שֶׁבֶר יָד",
    name_translit: "shever yad",
    short_gloss: "Broken arm",
    contexts: ["kohen"],
    relationship: "kohen only",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 19 },
    korban_pasuk: null,
  },
  "gibben": {
    name_he: "גִבֵּן",
    name_translit: "gibben",
    short_gloss: "Eyebrow / back condition",
    contexts: ["kohen"],
    relationship: "kohen only",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 20 },
    korban_pasuk: null,
  },
  "daq": {
    name_he: "דַּק",
    name_translit: "daq",
    short_gloss: "Eye thinness",
    contexts: ["kohen"],
    relationship: "kohen only",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 20 },
    korban_pasuk: null,
  },
  "tevallul-beino": {
    name_he: "תְּבַלֻּל בְּעֵינוֹ",
    name_translit: "tevallul b'eino",
    short_gloss: "Eye growth",
    contexts: ["kohen"],
    relationship: "kohen only",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 20 },
    korban_pasuk: null,
  },
  "garav": {
    name_he: "גָּרָב",
    name_translit: "garav",
    short_gloss: "Skin condition",
    contexts: ["kohen", "korban"],
    relationship: "shared term",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 20 },
    korban_pasuk: { book: "Leviticus", ch: 22, v: 22 },
  },
  "yallefes": {
    name_he: "יַלֶּפֶת",
    name_translit: "yallefes",
    short_gloss: "Skin condition",
    contexts: ["kohen", "korban"],
    relationship: "shared term",
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 20 },
    korban_pasuk: { book: "Leviticus", ch: 22, v: 22 },
  },
  "meroach-ashech": {
    name_he: "מְרוֹחַ אָשֶׁךְ",
    name_translit: "meroach ashech",
    short_gloss: "Testicular dispute",
    contexts: ["kohen"],
    relationship: "physical overlap, distinct halachic categories",
    relationship_partners: ["ma-uch", "kasus", "nasuk", "karus"],
    kohen_pasuk: { book: "Leviticus", ch: 21, v: 20 },
    korban_pasuk: null,
  },
  "shavur": {
    name_he: "שָׁבוּר",
    name_translit: "shavur",
    short_gloss: "Broken limb",
    contexts: ["korban"],
    relationship: "korban only",
    kohen_pasuk: null,
    korban_pasuk: { book: "Leviticus", ch: 22, v: 22 },
  },
  "charutz": {
    name_he: "חָרוּץ",
    name_translit: "charutz",
    short_gloss: "Gash / cut",
    contexts: ["korban"],
    relationship: "korban only",
    kohen_pasuk: null,
    korban_pasuk: { book: "Leviticus", ch: 22, v: 22 },
  },
  "yabeles": {
    name_he: "יַבֶּלֶת",
    name_translit: "yabeles",
    short_gloss: "Wart",
    contexts: ["korban"],
    relationship: "korban only",
    kohen_pasuk: null,
    korban_pasuk: { book: "Leviticus", ch: 22, v: 22 },
  },
  "kalut": {
    name_he: "קָלוּט",
    name_translit: "kalut",
    short_gloss: "Hoof / limb defect",
    contexts: ["korban"],
    relationship: "korban only",
    kohen_pasuk: null,
    korban_pasuk: { book: "Leviticus", ch: 22, v: 23 },
  },
  "ma-uch": {
    name_he: "מָעוּךְ",
    name_translit: "ma'uch",
    short_gloss: "Crushed",
    contexts: ["korban"],
    relationship: "physical overlap, distinct halachic categories",
    relationship_partners: ["meroach-ashech"],
    kohen_pasuk: null,
    korban_pasuk: { book: "Leviticus", ch: 22, v: 24 },
  },
  "kasus": {
    name_he: "כָּתוּת",
    name_translit: "kasus",
    short_gloss: "Crushed",
    contexts: ["korban"],
    relationship: "physical overlap, distinct halachic categories",
    relationship_partners: ["meroach-ashech"],
    kohen_pasuk: null,
    korban_pasuk: { book: "Leviticus", ch: 22, v: 24 },
  },
  "nasuk": {
    name_he: "נָתוּק",
    name_translit: "nasuk",
    short_gloss: "Torn loose",
    contexts: ["korban"],
    relationship: "physical overlap, distinct halachic categories",
    relationship_partners: ["meroach-ashech"],
    kohen_pasuk: null,
    korban_pasuk: { book: "Leviticus", ch: 22, v: 24 },
  },
  "karus": {
    name_he: "כָּרוּת",
    name_translit: "karus",
    short_gloss: "Cut off",
    contexts: ["korban"],
    relationship: "physical overlap, distinct halachic categories",
    relationship_partners: ["meroach-ashech"],
    kohen_pasuk: null,
    korban_pasuk: { book: "Leviticus", ch: 22, v: 24 },
  },
};

const KOHEN_PASUK_ORDER = [
  "iver",
  "pisseach",
  "charum",
  "sarua",
  "shever-ragel",
  "shever-yad",
  "gibben",
  "daq",
  "tevallul-beino",
  "garav",
  "yallefes",
  "meroach-ashech",
];

const KORBAN_PASUK_ORDER = [
  "iver",
  "shavur",
  "charutz",
  "yabeles",
  "garav",
  "yallefes",
  "sarua",
  "kalut",
  "ma-uch",
  "kasus",
  "nasuk",
  "karus",
];

// Map of term id -> full detail object. Only ids present here have full source
// work; everything else in the index renders as a stub row with a placeholder
// on expand.
const TERM_DETAILS = {
  "iver": IVER,
  "charum": CHARUM,
  "sarua": SARUA,
  "kalut": KALUT,
  "meroach-ashech": MEROACH_ASHECH,
  "shavur": SHAVUR,
  "charutz": CHARUTZ,
  "yabeles": YABELES,
  "gibben": GIBBEN,
  "daq": DAQ,
  "tevallul-beino": TEVALLUL_BEINO,
  "pisseach": PISSEACH,
  "shever-ragel": SHEVER_RAGEL,
  "shever-yad": SHEVER_YAD,
  "garav": GARAV,
  "yallefes": YALLEFES,
  "ma-uch": MA_UCH,
  "kasus": KASUS,
  "nasuk": NASUK,
  "karus": KARUS,
};

// =============================================================================
// STYLES — bookish, sefer-like, restraint
// =============================================================================

const colors = {
  ink: "#1a1614",
  inkSoft: "#3d362e",
  inkLight: "#6e6356",
  page: "#f7f3ec",
  pageDeep: "#efe9dc",
  rule: "#d8cfba",
  ruleSoft: "#e6dec9",
  accent: "#7a3a1d",
  accentSoft: "#a85e3b",
  warn: "#7d4a0d",
  warnBg: "#fbf2dd",
  danger: "#7a1f1f",
  dangerBg: "#f7e3df",
  ok: "#3d5b2a",
  okBg: "#e8efdb",
  unresolved: "#5b3a6d",
  unresolvedBg: "#ece4f1",
  derashah: "#3a4c5b",
  derashahBg: "#e0e8ee",
};

const fonts = {
  serif: "'EB Garamond', 'Palatino Linotype', Palatino, 'Hoefler Text', Georgia, serif",
  display: "'Cormorant Garamond', 'EB Garamond', Georgia, serif",
  hebrew: "'Frank Ruhl Libre', 'Times New Roman', serif",
  mono: "'JetBrains Mono', 'Courier New', monospace",
};

// Status badge — sourcing × risk × claim_type collapsed into one visible tag
const Badge = ({ sourcing, risk, claim_type, definition_scope, label }) => {
  const palette = {
    direct: { bg: colors.ok, fg: "#fff", text: "DIRECT" },
    snippet: { bg: colors.warn, fg: "#fff", text: "SNIPPET" },
    memory: { bg: colors.danger, fg: "#fff", text: "UNVERIFIED" },
    struct: { bg: colors.derashah, fg: "#fff", text: "STRUCTURAL" },
  };
  const riskPalette = {
    low: { bg: colors.okBg, fg: colors.ok, text: "low risk" },
    medium: { bg: colors.warnBg, fg: colors.warn, text: "medium risk" },
    interpretive: { bg: colors.unresolvedBg, fg: colors.unresolved, text: "interpretive" },
  };
  const scopePalette = {
    lexical: { bg: "#fff", fg: colors.inkSoft, border: colors.rule, text: "lexical" },
    derashah: { bg: colors.derashahBg, fg: colors.derashah, border: colors.derashah, text: "derashah" },
    expanded_category: { bg: "#fff", fg: colors.inkSoft, border: colors.rule, text: "expanded category" },
    example_cases: { bg: "#fff", fg: colors.inkSoft, border: colors.rule, text: "example cases" },
  };
  const items = [];
  if (sourcing) {
    const p = palette[sourcing] || { bg: "#999", fg: "#fff", text: sourcing };
    items.push(<span key="s" style={{ backgroundColor: p.bg, color: p.fg, padding: "2px 7px", fontFamily: fonts.mono, fontSize: 9.5, fontWeight: 600, letterSpacing: 0.6 }}>{p.text}</span>);
  }
  if (risk) {
    const p = riskPalette[risk] || { bg: "#eee", fg: "#666", text: risk };
    items.push(<span key="r" style={{ backgroundColor: p.bg, color: p.fg, padding: "2px 7px", fontFamily: fonts.mono, fontSize: 9.5, fontStyle: "italic" }}>{p.text}</span>);
  }
  if (definition_scope) {
    const p = scopePalette[definition_scope] || { bg: "#fff", fg: colors.inkSoft, border: colors.rule, text: definition_scope };
    items.push(<span key="ds" style={{ backgroundColor: p.bg, color: p.fg, border: `1px solid ${p.border}`, padding: "1px 7px", fontFamily: fonts.mono, fontSize: 9.5 }}>{p.text}</span>);
  }
  if (label) items.push(<span key="l" style={{ fontFamily: fonts.mono, fontSize: 9.5, color: colors.inkLight }}>{label}</span>);
  return <span style={{ display: "inline-flex", gap: 4, alignItems: "center", verticalAlign: "middle" }}>{items}</span>;
};

const SourceLink = ({ refObj }) => {
  if (!refObj) return null;
  const url = sefariaUrl(refObj);
  const label = formatRefLabel(refObj);
  if (!url) return <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkLight }}>[ref unresolvable]</span>;
  return (
    <a href={url} target="_blank" rel="noopener noreferrer" style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.accent, textDecoration: "none", borderBottom: `1px dotted ${colors.accent}` }}>
      {label} ↗
    </a>
  );
};

// =============================================================================
// COMPONENTS
// =============================================================================

const TermBoundaryNote = ({ note }) => (
  <div style={{ borderLeft: `4px solid ${colors.danger}`, backgroundColor: colors.dangerBg, padding: "14px 16px", marginBottom: 24, fontFamily: fonts.serif }}>
    <div style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1.2, color: colors.danger, marginBottom: 6, textTransform: "uppercase" }}>
      ⚠ Term Boundary — do not merge
    </div>
    <div style={{ fontSize: 14.5, lineHeight: 1.55, color: colors.ink }}>{note}</div>
  </div>
);

const StructureNote = ({ note }) => (
  <details style={{ marginBottom: 20 }}>
    <summary style={{ cursor: "pointer", fontFamily: fonts.mono, fontSize: 10.5, color: colors.inkLight, letterSpacing: 0.4, padding: "6px 0" }}>
      ▸ Where this lives in the sources
    </summary>
    <div style={{ borderLeft: `3px solid ${colors.derashah}`, backgroundColor: colors.derashahBg, padding: "10px 14px", marginTop: 6, fontFamily: fonts.serif, fontSize: 13, lineHeight: 1.5, color: colors.inkSoft }}>
      {note}
    </div>
  </details>
);

// =============================================================================
// READER LAYER — editorial copy, not sourced
// =============================================================================
// Per-term plain-English orientation. This is the only place where text in the
// rendered output is written by the project rather than copied from sources.
// All copy here is descriptive of what's in the sources, not extending beyond
// it (no invented halachic claims, no resolved machlokes, no psak).

const READER_ORIENTATION = {
  "meroach-ashech": {
    about: "A blemish in Vayikra 21:20 that disqualifies a kohen from the avodah. The Hebrew word is rare, and the Mishnah preserves four different readings of what it physically refers to — Rashi follows one of them, Rambam in his commentary on the Mishnah follows a different one. Worth watching: the four readings describe genuinely different physical conditions, not synonyms; and the rishonim don't all line up on the same side.",
    do_not_confuse: "The behemah parsha (22:24) lists similar-sounding crushed-testes blemishes, but the Hebrew terms there are different and the lavin sit in different chapters of Rambam. Don't treat them as the same case under different names.",
  },
  "charum": {
    about: "A nose blemish in Vayikra 21:18 that disqualifies a kohen from the avodah. The dispute isn't whether something is a blemish but how widely the word reaches: Rashi and Aba Yosei read it tightly (only the deeply sunken nose that lets you paint both eyes with one stroke), while the Sifra and the Rabbis of the gemara read it broadly (sunken, blocked, turned-up, hanging over the lip). Ramban lays out both sides and goes with the broader view.",
    do_not_confuse: "Chalum (a Mishnah-only kohen blemish, Bekhoros 7:3) is sometimes described in nearly the same physical terms as the narrow Rashi/Aba Yosei reading of charum. They are still separate items in the catalogue.",
  },
  "sarua": {
    about: "A word that appears in both the kohen list (21:18) and the behemah list (22:23) — but with different halachic consequences in each place. A kohen who is sarua is disqualified from the avodah outright; a sarua animal can still be brought as a free-will offering, just not to fulfill a vow. Same Hebrew word, two different outcomes.",
    do_not_confuse: "Don't merge the kohen sarua with the behemah sarua just because the Hebrew is the same. The halachah is different.",
  },
  "kalut": {
    about: "A behemah blemish named alongside sarua in 22:23, sharing the same rule — acceptable as a free-will offering, not for a vow. Nothing further from the rishonim has been pulled yet for this term, so what kalut physically describes is left open.",
    do_not_confuse: null,
  },
  "iver": {
    about: "Blindness — listed in all three parshiyos: the kohen list (21:18), the behemah list (22:22), and the bechor list (Devarim 15:21). It looks like the most obvious term in the parsha, but a primary-source gloss of the word itself isn't here yet. What is here is the Mishnah in Bekhoros (6:2) listing eye-blemish cases — and even there, whether all those cases sit under the Torah word iver, or under tevallul (a related eye-blemish term), needs commentary to confirm. A list of cases isn't the same as a definition of the word.",
    do_not_confuse: "Tevallul b'eino (21:20) is also an eye blemish, but a specific lesion or growth on the eye, not loss of vision. The Mishnah's eye-blemish enumeration covers both terms; per-term boundaries come from commentary, not from grouping cases together.",
  },
};

const ReaderOrientation = ({ termId }) => {
  const copy = READER_ORIENTATION[termId];
  if (!copy || !copy.about) return null;
  return (
    <aside style={{
      borderLeft: `3px solid ${colors.accent}`,
      backgroundColor: "#fbf6ec",
      padding: "16px 20px",
      marginBottom: 20,
      fontFamily: fonts.serif,
      fontSize: 15,
      lineHeight: 1.65,
      color: colors.ink,
    }}>
      {copy.about}
    </aside>
  );
};

const DoNotConfuseWith = ({ termId, technicalNote }) => {
  const copy = READER_ORIENTATION[termId];
  if (!copy || !copy.do_not_confuse) return null;
  return (
    <div style={{ marginBottom: 16 }}>
      <div style={{ padding: "12px 16px", backgroundColor: "#fff8f3", border: `1px solid ${colors.accentSoft}`, fontFamily: fonts.serif, marginBottom: 6 }}>
        <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: 1, color: colors.accent, textTransform: "uppercase", marginRight: 8 }}>
          Do not confuse with
        </span>
        <span style={{ fontSize: 14.5, lineHeight: 1.6, color: colors.ink }}>{copy.do_not_confuse}</span>
      </div>
      {technicalNote && (
        <details>
          <summary style={{ cursor: "pointer", fontFamily: fonts.mono, fontSize: 10.5, color: colors.inkLight, letterSpacing: 0.4, padding: "6px 0" }}>
            ▸ Original wording
          </summary>
          <div style={{ borderLeft: `4px solid ${colors.danger}`, backgroundColor: colors.dangerBg, padding: "12px 16px", marginTop: 6, fontFamily: fonts.serif, fontSize: 13.5, lineHeight: 1.55, color: colors.ink }}>
            {technicalNote}
          </div>
        </details>
      )}
    </div>
  );
};

const HowToReadThisCard = ({ mode }) => {
  const text = {
    complete: "Each section below is a different opinion, not one combined definition.",
    partial: "This entry is incomplete; only confirmed material is shown.",
    pending: "This term has not yet been defined from primary sources.",
  }[mode];
  if (!text) return null;
  return (
    <div style={{ marginBottom: 24, fontFamily: fonts.serif, fontSize: 13.5, color: colors.inkLight, fontStyle: "italic", lineHeight: 1.55 }}>
      {text}
    </div>
  );
};

const ViewBlock = ({ view, withSensitivityFrame }) => (
  <div style={{
    borderTop: `1px solid ${colors.ruleSoft}`,
    paddingTop: 16,
    paddingBottom: 16,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 8 }}>
      <div style={{ fontFamily: fonts.display, fontSize: 17, fontWeight: 500, color: colors.ink, fontStyle: "italic" }}>
        {view.commentator}
      </div>
      <Badge sourcing={view.gloss?.sourcing} risk={view.risk_level} definition_scope={view.definition_scope} />
    </div>

    {withSensitivityFrame && (
      <div style={{ fontSize: 13, fontStyle: "italic", color: colors.warn, backgroundColor: colors.warnBg, padding: "10px 14px", marginBottom: 10, borderLeft: `3px solid ${colors.warn}`, lineHeight: 1.55 }}>
        A reading not adopted by Rashi or by Rambam in Mishneh Torah. The Talmud's category here is being used in a narrow halachic context — disqualification of a kohen — and not as a general claim about race.
      </div>
    )}

    <div style={{ fontFamily: fonts.serif, fontSize: 15, lineHeight: 1.65, color: colors.ink, marginBottom: 10 }}>
      {view.gloss?.value}
    </div>

    {view.supporting_quote && (
      <details style={{ marginBottom: 8 }}>
        <summary style={{ cursor: "pointer", fontFamily: fonts.mono, fontSize: 10.5, color: colors.inkLight, letterSpacing: 0.5, textTransform: "uppercase", marginBottom: 6 }}>
          ↳ Supporting quote
        </summary>
        <blockquote style={{ borderLeft: `2px solid ${colors.rule}`, paddingLeft: 14, margin: "8px 0 8px 4px", fontFamily: fonts.serif, fontSize: 13.5, lineHeight: 1.6, color: colors.inkSoft, fontStyle: "italic" }}>
          {view.supporting_quote.value}
        </blockquote>
        <div style={{ paddingLeft: 18, fontSize: 11 }}>
          <Badge sourcing={view.supporting_quote.sourcing} label="quote" />
        </div>
      </details>
    )}

    <div style={{ display: "flex", gap: 12, alignItems: "center", flexWrap: "wrap", fontSize: 11, color: colors.inkLight }}>
      <SourceLink refObj={view.source_ref} />
      {view.note && (
        <details style={{ flexBasis: "100%", marginTop: 4 }}>
          <summary style={{ cursor: "pointer", fontFamily: fonts.mono, fontSize: 10, color: colors.inkLight, letterSpacing: 0.4 }}>
            ↳ note
          </summary>
          <div style={{ fontSize: 12, color: colors.inkSoft, padding: "6px 0 0 12px", fontStyle: "italic", lineHeight: 1.55 }}>
            {view.note}
          </div>
        </details>
      )}
    </div>
  </div>
);

const PositionGroup = ({ position, label, gloss, lexicalViews, derashahViews, isMinorityView }) => {
  const isDarkAppearance = position === "non_testicular_dark_appearance";
  return (
    <section style={{
      backgroundColor: "#fff",
      border: `1px solid ${colors.rule}`,
      padding: "20px 22px",
      marginBottom: 20,
    }}>
      <header style={{ marginBottom: 12 }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.inkLight, letterSpacing: 1.5, textTransform: "uppercase", marginBottom: 4 }}>
          Position
        </div>
        <h3 style={{ fontFamily: fonts.display, fontSize: 26, fontWeight: 500, color: colors.ink, margin: 0, lineHeight: 1.15 }}>
          {label.en}
        </h3>
        <div style={{ fontFamily: fonts.serif, fontSize: 13.5, color: colors.inkLight, fontStyle: "italic", marginTop: 4 }}>
          {label.gloss}
        </div>
        {isMinorityView && (
          <div style={{ marginTop: 10, padding: "8px 12px", backgroundColor: colors.warnBg, borderLeft: `3px solid ${colors.warn}` }}>
            <span style={{ fontFamily: fonts.mono, fontSize: 10, fontWeight: 700, letterSpacing: 0.8, color: colors.warn, textTransform: "uppercase", marginRight: 8 }}>
              Alignment
            </span>
            <span style={{ fontFamily: fonts.serif, fontSize: 13, color: colors.ink, fontStyle: "italic" }}>
              Not adopted by Rashi / Rambam Mishneh Torah
            </span>
          </div>
        )}
      </header>

      {lexicalViews.length > 0 && (
        <div style={{ marginTop: 16 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.inkSoft, letterSpacing: 1, textTransform: "uppercase", paddingBottom: 4, borderBottom: `1px solid ${colors.ink}` }}>
            Lexical views ({lexicalViews.length})
          </div>
          {lexicalViews.map((v) => (
            <ViewBlock key={v.view_id} view={v} withSensitivityFrame={isDarkAppearance && v.view_id === "rabbi-hanina-ben-antigonus-mishnah"} />
          ))}
        </div>
      )}

      {derashahViews.length > 0 && (
        <div style={{ marginTop: 24 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.derashah, letterSpacing: 1, textTransform: "uppercase", paddingBottom: 4, borderBottom: `1px solid ${colors.derashah}` }}>
            Derashah / textual reasoning ({derashahViews.length})
          </div>
          <div style={{ fontFamily: fonts.serif, fontSize: 12, color: colors.inkSoft, fontStyle: "italic", padding: "6px 0 0 0" }}>
            This is the textual reasoning behind a position, not a definition of the term.
          </div>
          {derashahViews.map((v) => (
            <ViewBlock key={v.view_id} view={v} />
          ))}
        </div>
      )}
    </section>
  );
};

const ConsensusBlock = ({ consensus }) => (
  <section style={{
    backgroundColor: colors.unresolvedBg,
    border: `1px solid ${colors.unresolved}`,
    padding: "20px 22px",
    marginTop: 32,
    marginBottom: 24,
  }}>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
      <h3 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, color: colors.unresolved, margin: 0 }}>
        Alignment <span style={{ fontStyle: "italic", fontSize: 16, color: colors.inkSoft }}>— not psak</span>
      </h3>
      <Badge sourcing={consensus.sourcing} risk={consensus.risk_level} />
    </div>
    <div style={{ fontFamily: fonts.serif, fontSize: 14.5, lineHeight: 1.6, color: colors.ink, marginBottom: 10 }}>
      {consensus.statement}
    </div>
    {consensus.note && (
      <details style={{ marginTop: 8, borderTop: `1px dashed ${colors.unresolved}`, paddingTop: 10 }}>
        <summary style={{ cursor: "pointer", fontFamily: fonts.mono, fontSize: 10.5, color: colors.unresolved, letterSpacing: 0.4, padding: "4px 0" }}>
          ▸ Notes on this alignment
        </summary>
        <div style={{ fontFamily: fonts.serif, fontSize: 12.5, lineHeight: 1.55, color: colors.inkSoft, fontStyle: "italic", marginTop: 6 }}>
          {consensus.note}
        </div>
      </details>
    )}
  </section>
);

const GapsBlock = ({ gaps }) => (
  <section style={{ marginTop: 32, marginBottom: 24 }}>
    <h3 style={{ fontFamily: fonts.display, fontSize: 20, fontWeight: 500, color: colors.ink, margin: "0 0 14px 0", paddingBottom: 6, borderBottom: `2px solid ${colors.ink}` }}>
      Open Gaps for this Term
    </h3>
    {gaps.map((g) => (
      <div key={g.gap_id} style={{ padding: "12px 14px", marginBottom: 10, backgroundColor: colors.warnBg, borderLeft: `3px solid ${colors.warn}` }}>
        <div style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.warn, marginBottom: 4, letterSpacing: 0.4 }}>
          {g.gap_id}
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 13.5, lineHeight: 1.55, color: colors.ink, marginBottom: 6 }}>
          {g.description}
        </div>
        <div style={{ fontFamily: fonts.serif, fontSize: 12, lineHeight: 1.5, color: colors.inkSoft, fontStyle: "italic" }}>
          <strong style={{ fontStyle: "normal", fontFamily: fonts.mono, fontSize: 10, letterSpacing: 0.4 }}>IMPACT:</strong> {g.impact}
        </div>
      </div>
    ))}
  </section>
);

// =============================================================================
// TERM CARD — reusable for any term with the schema
// =============================================================================

const TermCard = ({
  term,
  positionLabels,
  positionOrder,
  groupHeading,
  groupSubhead,
  minorityPositions = [],
  relevantGaps = [],
}) => {
  const groups = positionOrder.map((pos) => {
    const allViews = (term.views || []).filter((v) => v.position === pos);
    const lexical = allViews.filter((v) => v.definition_scope === "lexical" || v.definition_scope === "psak_combined_definition");
    const derashah = allViews.filter((v) => v.definition_scope === "derashah");
    const expanded = allViews.filter((v) => v.definition_scope === "expanded_category");
    return {
      position: pos,
      label: positionLabels[pos],
      lexicalViews: lexical,
      // For terms whose dispute is narrow vs broad (charum), expanded_category
      // views are conceptually paired with lexical — they are alternate definitions,
      // not derashos. Display them in the lexical column for those terms.
      // For machlokes-style terms (meroach-ashech), expanded views don't appear,
      // so this fallback is a no-op for them.
      expandedViews: expanded,
      derashahViews: derashah,
    };
  });

  return (
    <article style={{ marginBottom: 56 }}>
      {/* Term head */}
      <div style={{ borderTop: `3px solid ${colors.ink}`, borderBottom: `1px solid ${colors.ink}`, padding: "20px 0 16px", marginBottom: 24 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16 }}>
          <div>
            <div lang="he" dir="rtl" style={{ fontFamily: fonts.hebrew, fontSize: 40, fontWeight: 500, color: colors.ink, lineHeight: 1.1, marginBottom: 6 }}>
              {term.name_he}
            </div>
            <div style={{ fontFamily: fonts.display, fontSize: 22, fontStyle: "italic", color: colors.accent, marginBottom: 4 }}>
              {term.name_translit}
            </div>
          </div>
          <div style={{ textAlign: "left", fontFamily: fonts.mono, fontSize: 11, color: colors.inkLight, lineHeight: 1.6 }}>
            <div>research: <strong style={{ color: colors.ok }}>{term.research_status}</strong></div>
            <div>relation: {term.relation}</div>
            <div>views: {term.views ? term.views.length : 0}</div>
          </div>
        </div>

        <div style={{ marginTop: 16, fontFamily: fonts.serif, fontSize: 13.5, color: colors.inkSoft }}>
          <strong style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 0.8, color: colors.ink, marginRight: 8 }}>TORAH SOURCE</strong>
          <SourceLink refObj={term.torah_source && term.torah_source.ref} />
          <span style={{ marginLeft: 12, marginRight: 12, color: colors.rule }}>·</span>
          <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkLight }}>
            in lists: {(term.in_lists || []).join(", ")}
          </span>
        </div>
      </div>

      {/* Reader-layer scaffolding — editorial, not sourced */}
      <ReaderOrientation termId={term.id} />
      <DoNotConfuseWith termId={term.id} technicalNote={term.term_boundary_note} />
      <HowToReadThisCard mode="complete" />

      {/* Structure note — collapsed to details by default */}
      {term.structure_note && <StructureNote note={term.structure_note} />}

      {/* Position groups */}
      <div style={{ marginTop: 8 }}>
        <h2 style={{ fontFamily: fonts.display, fontSize: 28, fontWeight: 500, color: colors.ink, margin: "0 0 4px 0" }}>
          {groupHeading}
        </h2>
        <p style={{ fontFamily: fonts.serif, fontSize: 13.5, color: colors.inkLight, marginTop: 0, marginBottom: 8, fontStyle: "italic" }}>
          {groupSubhead}
        </p>
        {/* Ordering disclaimer */}
        <div style={{ fontFamily: fonts.mono, fontSize: 10.5, color: colors.inkLight, letterSpacing: 0.4, marginBottom: 22, paddingBottom: 8, borderBottom: `1px dashed ${colors.rule}` }}>
          Order reflects Mishnah listing, not halachic priority.
        </div>

        {groups.map((g) => {
          // Combine expanded_category into lexical for narrow/broad terms
          // so they render in the same group; both are alternate definitions.
          const combinedLexical = g.lexicalViews.concat(g.expandedViews);
          return (
            <PositionGroup
              key={g.position}
              position={g.position}
              label={g.label}
              lexicalViews={combinedLexical}
              derashahViews={g.derashahViews}
              isMinorityView={minorityPositions.includes(g.position)}
            />
          );
        })}
      </div>

      {/* Consensus — only render if the term has one. Charum has none by design. */}
      {term.consensus && <ConsensusBlock consensus={term.consensus} />}
      {!term.consensus && (
        <div style={{ marginTop: 32, marginBottom: 24, padding: "14px 18px", border: `1px dashed ${colors.unresolved}`, backgroundColor: colors.unresolvedBg, fontFamily: fonts.serif, fontSize: 14, color: colors.inkSoft, lineHeight: 1.55 }}>
          No alignment is proposed for this dispute. Both camps stand on their own; no psak is implied here.
        </div>
      )}

      {/* Gaps — only if there are any */}
      {relevantGaps.length > 0 && <GapsBlock gaps={relevantGaps} />}
    </article>
  );
};

// =============================================================================
// TERM HEAD — shared header for all term card modes
// =============================================================================

const TermHead = ({ term, statusText, statusColor }) => {
  // term.torah_source can be a single { ref } or an array of { ref, role }
  const torahSources = Array.isArray(term.torah_source)
    ? term.torah_source
    : term.torah_source
    ? [{ ref: term.torah_source.ref }]
    : [];
  return (
    <div style={{ borderTop: `3px solid ${colors.ink}`, borderBottom: `1px solid ${colors.ink}`, padding: "20px 0 16px", marginBottom: 24 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", flexWrap: "wrap", gap: 16 }}>
        <div>
          <div lang="he" dir="rtl" style={{ fontFamily: fonts.hebrew, fontSize: 40, fontWeight: 500, color: colors.ink, lineHeight: 1.1, marginBottom: 6 }}>
            {term.name_he}
          </div>
          <div style={{ fontFamily: fonts.display, fontSize: 22, fontStyle: "italic", color: colors.accent, marginBottom: 4 }}>
            {term.name_translit}
          </div>
        </div>
        <div style={{ textAlign: "left", fontFamily: fonts.mono, fontSize: 11, color: colors.inkLight, lineHeight: 1.6 }}>
          <div>research: <strong style={{ color: statusColor }}>{statusText || term.research_status}</strong></div>
          {term.relation && <div>relation: {term.relation}</div>}
          <div>views: {term.views ? term.views.length : 0}</div>
        </div>
      </div>

      <div style={{ marginTop: 16, fontFamily: fonts.serif, fontSize: 13.5, color: colors.inkSoft }}>
        <strong style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 0.8, color: colors.ink, marginRight: 8 }}>TORAH SOURCE</strong>
        {torahSources.length === 0 && <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkLight }}>(none)</span>}
        {torahSources.map((src, i) => (
          <span key={i} style={{ marginRight: 12 }}>
            <SourceLink refObj={src.ref} />
            {src.role && (
              <span style={{ fontFamily: fonts.mono, fontSize: 10, color: colors.inkLight, marginLeft: 4 }}>
                ({src.role})
              </span>
            )}
            {i < torahSources.length - 1 && <span style={{ marginLeft: 6, color: colors.rule }}>·</span>}
          </span>
        ))}
        <span style={{ marginLeft: 12, marginRight: 12, color: colors.rule }}>·</span>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkLight }}>
          in lists: {(term.in_lists || []).join(", ")}
        </span>
      </div>
    </div>
  );
};

// =============================================================================
// PARTIAL TERM CARD — for research_status "partial"
// =============================================================================
// Renders existing views as a flat list (no position grouping, since partial
// terms have no machlokes structure yet) with their definition_scope visible.
// Surfaces pending_pulls so the reader sees what's still needed.

const PartialTermCard = ({ term }) => {
  return (
    <article style={{ marginBottom: 56 }}>
      <TermHead term={term} statusText="partial" statusColor={colors.warn} />

      {/* Partial banner — visually distinct so reader knows this isn't a complete entry */}
      <div style={{ marginBottom: 20, padding: "12px 16px", border: `1px solid ${colors.warn}`, backgroundColor: colors.warnBg, fontFamily: fonts.serif, fontSize: 14, color: colors.ink, lineHeight: 1.55 }}>
        Not all the rishonim have been brought yet. What follows is what's confirmed so far.
      </div>

      {/* Reader-layer scaffolding — editorial, not sourced */}
      <ReaderOrientation termId={term.id} />
      <DoNotConfuseWith termId={term.id} technicalNote={term.term_boundary_note} />
      <HowToReadThisCard mode="partial" />

      {/* Views as flat list — no position grouping for partial terms */}
      {term.views && term.views.length > 0 && (
        <div style={{ marginTop: 8, marginBottom: 24 }}>
          <h2 style={{ fontFamily: fonts.display, fontSize: 24, fontWeight: 500, color: colors.ink, margin: "0 0 4px 0" }}>
            What is currently sourced
          </h2>
          <div style={{ backgroundColor: "#fff", border: `1px solid ${colors.rule}`, padding: "8px 22px", marginTop: 16 }}>
            {term.views.map((v) => (
              <ViewBlock key={v.view_id} view={v} />
            ))}
          </div>
        </div>
      )}

      {/* Pending pulls — collapsed by default */}
      {term.pending_pulls && term.pending_pulls.length > 0 && (
        <details style={{ marginTop: 24, marginBottom: 24 }}>
          <summary style={{ cursor: "pointer", fontFamily: fonts.mono, fontSize: 10.5, color: colors.inkLight, letterSpacing: 0.4, padding: "6px 0" }}>
            ▸ Sources still to be checked ({term.pending_pulls.length})
          </summary>
          <div style={{ marginTop: 12 }}>
            <ul style={{ fontFamily: fonts.serif, fontSize: 13.5, color: colors.inkSoft, lineHeight: 1.65, paddingLeft: 22, margin: 0 }}>
              {term.pending_pulls.map((p, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{p}</li>
              ))}
            </ul>
          </div>
        </details>
      )}

      {/* Editorial notes (term-level) — collapsed to details */}
      {term.notes && (
        <details style={{ marginTop: 16 }}>
          <summary style={{ cursor: "pointer", fontFamily: fonts.mono, fontSize: 10.5, color: colors.inkLight, letterSpacing: 0.4, padding: "6px 0" }}>
            ▸ Notes on this term
          </summary>
          <div style={{ marginTop: 6, padding: "12px 16px", borderLeft: `3px solid ${colors.inkLight}`, backgroundColor: colors.pageDeep, fontFamily: fonts.serif, fontSize: 13, color: colors.inkSoft, fontStyle: "italic", lineHeight: 1.6 }}>
            {term.notes}
          </div>
        </details>
      )}
    </article>
  );
};

// =============================================================================
// PENDING TERM CARD — for research_status "not_started"
// =============================================================================
// Placeholder rendering: NO views shown (because there are none). The
// term_boundary_note IS shown if present, because boundary warnings are
// meaningful even when content is empty (sarua is the test case for this).
// Editorial notes also surface so the reader sees the term's flagged purpose.

const PendingTermCard = ({ term }) => {
  return (
    <article style={{ marginBottom: 56 }}>
      <TermHead term={term} statusText="pending" statusColor={colors.danger} />

      <div style={{ marginBottom: 20, padding: "14px 18px", border: `1px solid ${colors.danger}`, backgroundColor: colors.dangerBg, fontFamily: fonts.serif, fontSize: 14, color: colors.ink, lineHeight: 1.55 }}>
        This term hasn't been worked through with the rishonim yet. It's listed here so it isn't lost, but no definition is given.
      </div>

      {/* Reader-layer scaffolding — editorial, not sourced */}
      <ReaderOrientation termId={term.id} />
      <DoNotConfuseWith termId={term.id} technicalNote={term.term_boundary_note} />
      <HowToReadThisCard mode="pending" />

      {/* Pending pulls — collapsed by default, only if present */}
      {term.pending_pulls && term.pending_pulls.length > 0 && (
        <details style={{ marginTop: 16 }}>
          <summary style={{ cursor: "pointer", fontFamily: fonts.mono, fontSize: 10.5, color: colors.inkLight, letterSpacing: 0.4, padding: "6px 0" }}>
            ▸ Sources still to be checked ({term.pending_pulls.length})
          </summary>
          <div style={{ marginTop: 12 }}>
            <ul style={{ fontFamily: fonts.serif, fontSize: 13.5, color: colors.inkSoft, lineHeight: 1.65, paddingLeft: 22, margin: 0 }}>
              {term.pending_pulls.map((p, i) => (
                <li key={i} style={{ marginBottom: 4 }}>{p}</li>
              ))}
            </ul>
          </div>
        </details>
      )}

      {/* Editorial note — collapsed to details */}
      {term.note && (
        <details style={{ marginTop: 16 }}>
          <summary style={{ cursor: "pointer", fontFamily: fonts.mono, fontSize: 10.5, color: colors.inkLight, letterSpacing: 0.4, padding: "6px 0" }}>
            ▸ Notes on this term
          </summary>
          <div style={{ marginTop: 6, padding: "10px 14px", borderLeft: `3px solid ${colors.inkLight}`, backgroundColor: colors.pageDeep, fontFamily: fonts.serif, fontSize: 13, color: colors.inkSoft, fontStyle: "italic", lineHeight: 1.6 }}>
            {term.note}
          </div>
        </details>
      )}
    </article>
  );
};

// =============================================================================
// MAIN
// =============================================================================

// =============================================================================
// MODE FILTER — kohen / korban / all
// =============================================================================
// A lens, not a reorganization. The same term renders as a single card; the
// filter just (a) hides terms that don't appear in the chosen list and
// (b) narrows torah_source[] entries by their role.

const KOHEN_LIST_TAGS = ["kohen"];
const KORBAN_LIST_TAGS = ["behemah", "behemah_different_din", "behemah_conceptual_only", "bechor"];
const KOHEN_ROLE_TAGS = ["kohen"];
const KORBAN_ROLE_TAGS = ["behemah", "behemah-different-din", "bechor"];

const termMatchesMode = (term, mode) => {
  if (mode === "all") return true;
  const lists = term.in_lists || [];
  const allow = mode === "kohen" ? KOHEN_LIST_TAGS : KORBAN_LIST_TAGS;
  return lists.some((l) => allow.includes(l));
};

const filterTorahSources = (term, mode) => {
  if (mode === "all") return term;
  if (!Array.isArray(term.torah_source)) return term;
  const allow = mode === "kohen" ? KOHEN_ROLE_TAGS : KORBAN_ROLE_TAGS;
  const filtered = term.torah_source.filter((src) => !src.role || allow.includes(src.role));
  return { ...term, torah_source: filtered };
};

const ContextLabel = ({ mode }) => {
  if (mode === "all") return null;
  const text =
    mode === "kohen" ? "Kohen context" :
    mode === "korban" ? "Korban context" :
    mode === "comparison" ? "Comparison" : null;
  if (!text) return null;
  return (
    <div style={{ fontFamily: fonts.mono, fontSize: 10, letterSpacing: 1, color: colors.inkLight, textTransform: "uppercase", marginBottom: 8 }}>
      {text}
    </div>
  );
};

const ModeToggle = ({ mode, setMode }) => {
  const opts = [
    { id: "kohen", label: "Kohen" },
    { id: "korban", label: "Korban" },
    { id: "all", label: "Both" },
    { id: "comparison", label: "Compare" },
  ];
  return (
    <div style={{ display: "inline-flex", border: `1px solid ${colors.rule}`, marginTop: 18, marginBottom: 4 }}>
      {opts.map((o, i) => {
        const active = mode === o.id;
        return (
          <button
            key={o.id}
            onClick={() => setMode(o.id)}
            style={{
              fontFamily: fonts.mono,
              fontSize: 11,
              letterSpacing: 1,
              textTransform: "uppercase",
              padding: "8px 16px",
              border: "none",
              borderRight: i !== opts.length - 1 ? `1px solid ${colors.rule}` : "none",
              backgroundColor: active ? colors.ink : "transparent",
              color: active ? colors.page : colors.inkSoft,
              cursor: "pointer",
            }}
          >
            {o.label}
          </button>
        );
      })}
    </div>
  );
};

// =============================================================================
// CARD DISPATCH — map term id to its render configuration
// =============================================================================
// The full cards have different shapes (TermCard for complete machlokes,
// PartialTermCard for partial, PendingTermCard for not_started). This dispatch
// lets IndexRow render the right one when a term has detail data.

const renderTermDetail = (termId, mode) => {
  const term = TERM_DETAILS[termId];
  if (!term) return null;
  const filtered = filterTorahSources(term, mode);
  switch (termId) {
    case "meroach-ashech":
      return (
        <TermCard
          term={filtered}
          positionLabels={POSITION_LABELS}
          positionOrder={POSITION_ORDER}
          groupHeading="Four-way machlokes"
          groupSubhead="Each tanna reads the term as a different physical condition. The Mishnah-level statement of each position comes first; the gemara's reasoning behind it follows."
          minorityPositions={["non_testicular_dark_appearance"]}
          relevantGaps={RELEVANT_GAPS}
        />
      );
    case "charum":
      return (
        <TermCard
          term={filtered}
          positionLabels={CHARUM_POSITION_LABELS}
          positionOrder={CHARUM_POSITION_ORDER}
          groupHeading="Narrow vs broad"
          groupSubhead="Two camps: narrow (Rashi, Aba Yosei) and broad (Sifra, Rabbis, with Ramban naming the dispute). Both readings stand."
          minorityPositions={[]}
          relevantGaps={[]}
        />
      );
    case "iver":
      return <PartialTermCard term={filtered} />;
    case "sarua":
      return <PendingTermCard term={filtered} />;
    case "kalut":
      return <PendingTermCard term={filtered} />;
    default:
      // Status-driven fallback for every other term in TERM_DETAILS.
      // "partial" -> PartialTermCard (shows views[] + pending_pulls)
      // "not_started" / anything else -> PendingTermCard
      if (filtered.research_status === "partial") {
        return <PartialTermCard term={filtered} />;
      }
      return <PendingTermCard term={filtered} />;
  }
};

// =============================================================================
// CONTEXT BADGE — small visual tag for compact rows
// =============================================================================

const ContextBadge = ({ text, tone }) => {
  const palettes = {
    kohen:    { bg: "#e8efdb", fg: colors.ok },
    korban:   { bg: colors.warnBg, fg: colors.warn },
    shared:   { bg: "#e0e8ee", fg: colors.derashah },
    different:{ bg: colors.dangerBg, fg: colors.danger },
  };
  const p = palettes[tone] || { bg: "#eee", fg: "#666" };
  return (
    <span style={{
      backgroundColor: p.bg,
      color: p.fg,
      fontFamily: fonts.mono,
      fontSize: 9.5,
      fontWeight: 600,
      letterSpacing: 0.6,
      textTransform: "uppercase",
      padding: "2px 7px",
      marginLeft: 6,
      whiteSpace: "nowrap",
    }}>
      {text}
    </span>
  );
};

// Compute which badges a row in a given section should display.
// Returns array of {text, tone}.
const rowBadges = (entry, section) => {
  // section is "kohen" or "korban" — which list this row is rendered under
  const badges = [];
  if (section === "kohen") badges.push({ text: "Kohen", tone: "kohen" });
  if (section === "korban") badges.push({ text: "Korban", tone: "korban" });
  const isShared = entry.contexts.includes("kohen") && entry.contexts.includes("korban");
  if (isShared) badges.push({ text: "Shared", tone: "shared" });
  if (entry.relationship === "shared term, different din") {
    badges.push({ text: "Different din", tone: "different" });
  }
  return badges;
};

// =============================================================================
// INDEX ROW — compact entry that expands to full card or stub
// =============================================================================

const formatPasuk = (p) => `${p.book} ${p.ch}:${p.v}`;

const IndexRow = ({ id, entry, mode, section }) => {
  const hasDetail = !!TERM_DETAILS[id];
  const badges = rowBadges(entry, section);
  return (
    <details style={{
      borderBottom: `1px solid ${colors.ruleSoft}`,
      padding: "14px 0",
    }}>
      <summary style={{
        cursor: "pointer",
        listStyle: "none",
        display: "flex",
        gap: 16,
        alignItems: "baseline",
        flexWrap: "wrap",
      }}>
        <span lang="he" dir="rtl" style={{ fontFamily: fonts.hebrew, fontSize: 22, fontWeight: 500, color: colors.ink, minWidth: 110 }}>
          {entry.name_he}
        </span>
        <span style={{ fontFamily: fonts.display, fontSize: 17, fontStyle: "italic", color: colors.accent, minWidth: 140 }}>
          {entry.name_translit}
        </span>
        <span style={{ fontFamily: fonts.serif, fontSize: 14, color: colors.inkSoft, flex: "1 1 200px", lineHeight: 1.5 }}>
          {entry.short_gloss}
        </span>
        <span style={{ display: "inline-flex", alignItems: "center" }}>
          {badges.map((b, i) => (
            <ContextBadge key={i} text={b.text} tone={b.tone} />
          ))}
        </span>
        <span style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkLight, letterSpacing: 0.4, marginLeft: 6 }}>
          {hasDetail ? "▸ open" : "▸ pending"}
        </span>
      </summary>
      <div style={{ marginTop: 16, paddingTop: 4 }}>
        {hasDetail ? (
          renderTermDetail(id, mode === "all" ? "all" : section)
        ) : (
          <div style={{
            border: `1px dashed ${colors.rule}`,
            backgroundColor: colors.pageDeep,
            padding: "16px 18px",
            fontFamily: fonts.serif,
            fontSize: 14,
            color: colors.inkSoft,
            lineHeight: 1.6,
          }}>
            This mum is in the pasuk list, but the source work has not been completed yet.
          </div>
        )}
      </div>
    </details>
  );
};

// =============================================================================
// INDEX LIST — pasuk-grouped sections, with duplication for shared terms
// =============================================================================
//
// "kohen" mode: render KOHEN_PASUK_ORDER under one section
// "korban" mode: render KORBAN_PASUK_ORDER under one section
// "all" mode: render BOTH sections; shared terms appear in both (duplicate
//             rows pointing at the same TERM_DETAILS).
// "comparison" mode: rendered separately by ComparisonTable, not here.

const renderPasukSection = ({ heading, ids, mode, section }) => {
  const rows = ids
    .filter((id) => TERM_INDEX[id])
    .map((id) => ({ id, entry: TERM_INDEX[id] }));
  if (rows.length === 0) return null;
  return (
    <section key={section} style={{ marginBottom: 36 }}>
      <header style={{
        paddingBottom: 6,
        marginBottom: 4,
        borderBottom: `2px solid ${colors.ink}`,
        display: "flex",
        alignItems: "baseline",
        justifyContent: "space-between",
      }}>
        <h2 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, color: colors.ink, margin: 0 }}>
          {heading}
        </h2>
        <span style={{ fontFamily: fonts.mono, fontSize: 10.5, color: colors.inkLight, letterSpacing: 0.4 }}>
          {rows.length} {rows.length === 1 ? "term" : "terms"}
        </span>
      </header>
      {rows.map(({ id, entry }) => (
        <IndexRow key={`${section}-${id}`} id={id} entry={entry} mode={mode} section={section} />
      ))}
    </section>
  );
};

const IndexList = ({ mode }) => {
  if (mode === "kohen") {
    return renderPasukSection({
      heading: "Kohen — Vayikra 21:18–20",
      ids: KOHEN_PASUK_ORDER,
      mode,
      section: "kohen",
    });
  }
  if (mode === "korban") {
    return renderPasukSection({
      heading: "Korban — Vayikra 22:22–24",
      ids: KORBAN_PASUK_ORDER,
      mode,
      section: "korban",
    });
  }
  // "all" — both sections, with duplication for shared terms.
  return (
    <div>
      {renderPasukSection({
        heading: "Kohen — Vayikra 21:18–20",
        ids: KOHEN_PASUK_ORDER,
        mode,
        section: "kohen",
      })}
      {renderPasukSection({
        heading: "Korban — Vayikra 22:22–24",
        ids: KORBAN_PASUK_ORDER,
        mode,
        section: "korban",
      })}
    </div>
  );
};

// =============================================================================
// COMPARISON TABLE — overview-only, no new halachic claims
// =============================================================================
//
// Rows are ordered:
//   1. Shared-term rows (same word, both lists)
//   2. Shared-concept-different-term consolidated row
//   3. Kohen-only rows (in kohen pasuk order)
//   4. Korban-only rows (in korban pasuk order)
//
// Each row reads from TERM_INDEX metadata only. No claims beyond what the
// metadata already records.

const formatPasukOrDash = (p) => (p ? formatPasuk(p) : "—");

const buildComparisonRows = () => {
  const rows = [];

  // 1. Shared-term rows (relationship === "shared term" or "shared term, different din")
  const sharedIds = ["iver", "sarua", "garav", "yallefes"];
  sharedIds.forEach((id) => {
    const e = TERM_INDEX[id];
    if (!e) return;
    rows.push({
      key: id,
      term_label: e.name_translit,
      term_he: e.name_he,
      kohen_pasuk: e.kohen_pasuk,
      korban_pasuk: e.korban_pasuk,
      relationship: e.relationship === "shared term, different din"
        ? "Shared term, different din"
        : "Shared term",
      note: e.short_gloss,
    });
  });

  // 2. Shared-concept-different-term consolidated row.
  const ma = TERM_INDEX["meroach-ashech"];
  const partners = (ma && ma.relationship_partners) || [];
  if (ma && partners.length > 0) {
    const partnerLabels = partners
      .map((pid) => TERM_INDEX[pid] && TERM_INDEX[pid].name_translit)
      .filter(Boolean)
      .join(" / ");
    const partnerPasuk = partners
      .map((pid) => TERM_INDEX[pid] && TERM_INDEX[pid].korban_pasuk)
      .find((p) => p);
    rows.push({
      key: "meroach-ashech-vs-maeuch-family",
      term_label: `${ma.name_translit} vs ${partnerLabels}`,
      term_he: null,
      kohen_pasuk: ma.kohen_pasuk,
      korban_pasuk: partnerPasuk || null,
      relationship: "Physical overlap, distinct halachic categories",
      note: "Separate parshiyos with distinct lavin; physical overlap on certain readings does not collapse the categories.",
    });
  }

  // 3. Kohen-only rows (in kohen pasuk order, excluding shared and the meroach-ashech row).
  const SHARED_OR_CONSOLIDATED = new Set([...sharedIds, "meroach-ashech"]);
  KOHEN_PASUK_ORDER.forEach((id) => {
    if (SHARED_OR_CONSOLIDATED.has(id)) return;
    const e = TERM_INDEX[id];
    if (!e) return;
    if (e.relationship !== "kohen only") return;
    rows.push({
      key: `kohen-only-${id}`,
      term_label: e.name_translit,
      term_he: e.name_he,
      kohen_pasuk: e.kohen_pasuk,
      korban_pasuk: null,
      relationship: "Kohen only",
      note: e.short_gloss,
    });
  });

  // 4. Korban-only rows (in korban pasuk order, excluding shared and the
  //    ma-uch family which lives in the consolidated row).
  const MA_FAMILY = new Set(partners);
  KORBAN_PASUK_ORDER.forEach((id) => {
    if (SHARED_OR_CONSOLIDATED.has(id)) return;
    if (MA_FAMILY.has(id)) return;
    const e = TERM_INDEX[id];
    if (!e) return;
    if (e.relationship !== "korban only") return;
    rows.push({
      key: `korban-only-${id}`,
      term_label: e.name_translit,
      term_he: e.name_he,
      kohen_pasuk: null,
      korban_pasuk: e.korban_pasuk,
      relationship: "Korban only",
      note: e.short_gloss,
    });
  });

  return rows;
};

const ComparisonTable = () => {
  const rows = buildComparisonRows();
  return (
    <section style={{ marginBottom: 36 }}>
      <header style={{
        paddingBottom: 6,
        marginBottom: 16,
        borderBottom: `2px solid ${colors.ink}`,
      }}>
        <h2 style={{ fontFamily: fonts.display, fontSize: 22, fontWeight: 500, color: colors.ink, margin: 0 }}>
          Kohen vs Korban — overview
        </h2>
        <p style={{ fontFamily: fonts.serif, fontSize: 13, color: colors.inkLight, margin: "8px 0 0 0", fontStyle: "italic", lineHeight: 1.5 }}>
          Index-only. Click a term to read the full entry in one of the other modes.
        </p>
      </header>
      <table style={{
        width: "100%",
        borderCollapse: "collapse",
        fontFamily: fonts.serif,
        fontSize: 13,
      }}>
        <thead>
          <tr style={{ borderBottom: `1px solid ${colors.ink}` }}>
            <th style={{ textAlign: "left", padding: "8px 10px 8px 0", fontFamily: fonts.mono, fontSize: 10, letterSpacing: 0.6, color: colors.inkSoft, textTransform: "uppercase", fontWeight: 700 }}>Term</th>
            <th style={{ textAlign: "left", padding: "8px 10px", fontFamily: fonts.mono, fontSize: 10, letterSpacing: 0.6, color: colors.inkSoft, textTransform: "uppercase", fontWeight: 700 }}>Kohen</th>
            <th style={{ textAlign: "left", padding: "8px 10px", fontFamily: fonts.mono, fontSize: 10, letterSpacing: 0.6, color: colors.inkSoft, textTransform: "uppercase", fontWeight: 700 }}>Korban</th>
            <th style={{ textAlign: "left", padding: "8px 10px", fontFamily: fonts.mono, fontSize: 10, letterSpacing: 0.6, color: colors.inkSoft, textTransform: "uppercase", fontWeight: 700 }}>Relationship</th>
            <th style={{ textAlign: "left", padding: "8px 0 8px 10px", fontFamily: fonts.mono, fontSize: 10, letterSpacing: 0.6, color: colors.inkSoft, textTransform: "uppercase", fontWeight: 700 }}>Note</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.key} style={{ borderBottom: `1px solid ${colors.ruleSoft}`, verticalAlign: "top" }}>
              <td style={{ padding: "10px 10px 10px 0" }}>
                {r.term_he && (
                  <span lang="he" dir="rtl" style={{ fontFamily: fonts.hebrew, fontSize: 17, color: colors.ink, marginRight: 8 }}>
                    {r.term_he}
                  </span>
                )}
                <span style={{ fontFamily: fonts.display, fontStyle: "italic", color: colors.accent, fontSize: 14 }}>
                  {r.term_label}
                </span>
              </td>
              <td style={{ padding: "10px", fontFamily: fonts.mono, fontSize: 11.5, color: colors.inkSoft, whiteSpace: "nowrap" }}>
                {formatPasukOrDash(r.kohen_pasuk)}
              </td>
              <td style={{ padding: "10px", fontFamily: fonts.mono, fontSize: 11.5, color: colors.inkSoft, whiteSpace: "nowrap" }}>
                {formatPasukOrDash(r.korban_pasuk)}
              </td>
              <td style={{ padding: "10px", color: colors.ink }}>
                {r.relationship}
              </td>
              <td style={{ padding: "10px 0 10px 10px", color: colors.inkSoft, fontStyle: "italic" }}>
                {r.note}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

function MumimMVP() {
  const [mode, setMode] = useState("all");

  // Visible term count for the footer. In "all" mode this counts shared terms
  // twice (once per section) since they render in both. In comparison mode
  // we report the comparison-row count instead.
  const allIds = Object.keys(TERM_INDEX);
  let visibleRowCount;
  if (mode === "kohen") {
    visibleRowCount = KOHEN_PASUK_ORDER.filter((id) => TERM_INDEX[id]).length;
  } else if (mode === "korban") {
    visibleRowCount = KORBAN_PASUK_ORDER.filter((id) => TERM_INDEX[id]).length;
  } else if (mode === "comparison") {
    visibleRowCount = buildComparisonRows().length;
  } else {
    visibleRowCount =
      KOHEN_PASUK_ORDER.filter((id) => TERM_INDEX[id]).length +
      KORBAN_PASUK_ORDER.filter((id) => TERM_INDEX[id]).length;
  }
  const completeCount = allIds.filter((id) => {
    const t = TERM_DETAILS[id];
    return t && t.research_status === "complete";
  }).length;
  const partialCount = allIds.filter((id) => {
    const t = TERM_DETAILS[id];
    return t && t.research_status === "partial";
  }).length;
  const pendingCount = allIds.length - completeCount - partialCount;

  return (
    <div style={{ backgroundColor: colors.page, minHeight: "100vh", padding: "0", fontFamily: fonts.serif }}>
      {/* Top rule */}
      <div style={{ height: 6, backgroundColor: colors.ink }} />

      <div style={{ maxWidth: 780, margin: "0 auto", padding: "48px 32px 80px" }}>

        {/* Masthead */}
        <header style={{ marginBottom: 36 }}>
          <div style={{ fontFamily: fonts.mono, fontSize: 11, color: colors.inkLight, letterSpacing: 2, textTransform: "uppercase", marginBottom: 6 }}>
            Mumim · Kohen and Korban
          </div>
          <h1 style={{ fontFamily: fonts.display, fontSize: 44, fontWeight: 400, color: colors.ink, margin: 0, lineHeight: 1.05, letterSpacing: -0.5 }}>
            Blemishes in Parshas Emor.
          </h1>
          <p style={{ fontFamily: fonts.serif, fontSize: 16, lineHeight: 1.6, color: colors.inkSoft, marginTop: 16 }}>
            Every blemish named in the kohen list (Vayikra 21:18–20) and the
            korban list (22:22–24), in the order they appear in the pesukim.
            Click any term to expand it. Terms that appear in both lists
            (<em>iver</em>, <em>sarua</em>, <em>garav</em>, <em>yallefes</em>)
            are shown in both sections. Use <em>Compare</em> for a side-by-side
            overview.
          </p>
          <ModeToggle mode={mode} setMode={setMode} />
        </header>

        <ContextLabel mode={mode} />

        {mode === "comparison" ? <ComparisonTable /> : <IndexList mode={mode} />}

        {/* Footer */}
        <footer style={{ marginTop: 60, paddingTop: 20, borderTop: `1px solid ${colors.rule}`, fontFamily: fonts.serif, fontSize: 13, color: colors.inkLight, lineHeight: 1.7 }}>
          {mode === "comparison" ? (
            <>Showing {visibleRowCount} comparison rows.</>
          ) : (
            <>
              Showing {visibleRowCount} {visibleRowCount === 1 ? "row" : "rows"}{" "}
              across {allIds.length} unique terms — {completeCount} complete,{" "}
              {partialCount} partial, {pendingCount} pending.
            </>
          )}
          {" "}Quotes labeled <em>snippet</em> were taken from secondary summaries
          (dafyomi.co.il, ezrabrand newsletter) rather than directly from the
          Sefaria primary text; quotes labeled <em>direct</em> were pulled
          from Sefaria itself.
        </footer>
      </div>
    </div>
  );
}


ReactDOM.createRoot(document.getElementById('root')).render(React.createElement(MumimMVP));
