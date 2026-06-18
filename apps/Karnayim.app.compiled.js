const {
  useState
} = React;

// Data shape per item: { he, se, en, ref }
const SIGNS = [{
  id: "mefutzalot",
  he: "מְפֻצָּלוֹת",
  se: "mefutzalot",
  en: "branched / forked",
  color: "var(--p-mita)",
  rashi: {
    he: 'פורקייר"ש בלע"ז',
    se: "\"forchies\" in Old French",
    en: "forked",
    ref: "Rashi, Chullin 59b s.v. מפוצלות"
  },
  talmud: {
    he: "הֵיכָא דְּמִיפַּצְלָא — לָא דִּינָא וְלָא דַּיָּינָא",
    se: "heicha de-mipatzla — la dina ve-la dayyana",
    en: "Where it is forked — no judgment and no judge (no further inquiry needed).",
    ref: "Chullin 59b"
  },
  anatomy: {
    en: "Branching is the diagnostic feature of antlers (Cervidae). Antlers are not true horns: pure bone, grown from a pedicle on the frontal bone, sheathed in vascular skin (velvet) during growth, and shed annually. They lack the keratin sheath that defines a true horn. Branching is unique to deer in living zoology.",
    he: "הקרניים המסתעפות הללו אינן קרניים אמיתיות במובן המודרני, אלא קַרְנֵי־צְבִי: עצם בלבד, ללא נדן קרטין, נושרות מדי שנה."
  },
  exemplar: {
    he: "אַיָּל",
    se: "ayal",
    en: "deer, stag"
  },
  note: {
    en: "Rashi notes a difficulty: the Gemara says \"and the tzvi is not forked\" — but a tzvi IS forked! Rashi resolves: \"what we call tzvi, they did not call tzvi; rather they called the שטיינבו\"ק [ibex], whose horns are not forked.\" Fundamental for the whole sugya.",
    ref: "Rashi, Chullin 59b s.v. והרי צבי דאין מפוצלות"
  }
}, {
  id: "keruchot",
  he: "כְּרוּכוֹת",
  se: "keruchot",
  en: "wrapped, layered in concentric sheaths",
  color: "var(--p-rabbinic)",
  rashi: {
    he: "גִּלְדֵּי גִּלְדֵּי, קְלִיפָּה עַל קְלִיפָּה, כְּעֵין קַרְנֵי הַשּׁוֹר",
    se: "gildei gildei, kelipa al kelipa, ke-ein karnei ha-shor",
    en: "Layer upon layer, sheath upon sheath, like the horns of an ox.",
    ref: "Rashi, Chullin 59b s.v. כרוכות"
  },
  talmud: {
    he: "וַהֲרֵי שׁוֹר, דִּכְרוּכוֹת, וְחֶלְבּוֹ אָסוּר",
    se: "va-harei shor, dikhruchot, ve-chelbo asur",
    en: "But the ox is keruchot — and its cheilev is forbidden! (Therefore keruchot alone is insufficient.)",
    ref: "Chullin 59b"
  },
  anatomy: {
    en: "Lands almost exactly on the modern definition of a true horn (Bovidae): a permanent bony core (processus cornualis, an outgrowth of the frontal bone) sheathed by keratin laid down in successive growth layers. The sheath is never shed; new keratin is added at the base and pushes older keratin distally.",
    he: "לִיבָּה גַּרְמִית קבועה (זיז של עצם המצח) עטופה בנְדַן קֶרָטִין הנבנה בשכבות עוקבות. תיאור רש\"י \"גלדי גלדי\" מתאר במדויק את הלמלות הקרטיניות."
  },
  exemplar: {
    he: "שׁוֹר",
    se: "shor",
    en: "ox"
  }
}, {
  id: "charukot",
  he: "חֲרוּקוֹת",
  se: "charukot",
  en: "notched, ridged",
  color: "var(--p-karet)",
  rashi: {
    he: "מְלֵאוֹת פְּגִימוֹת וַחֲרִיצִים",
    se: "meleot pegimot va-charitzim",
    en: "Full of nicks and grooves.",
    ref: "Rashi, Chullin 59b s.v. חרוקות"
  },
  talmud: {
    he: "וְהוּא דְּמִיבְּלַע חִירְקַיְיהוּ",
    se: "ve-hu de-mivla chirkayyahu",
    en: "...and provided that the notches are absorbed (tightly packed and integrated, not separated).",
    ref: "Chullin 59b"
  },
  anatomy: {
    en: "Growth ridges on the keratin sheath. As the sheath accretes from the base, periodic differences in growth rate (often seasonal) leave transverse ridges. The sugya distinguishes the goat's ridges from the gazelle's by requiring מִיבְּלַע חִירְקַיְיהוּ — that the notches be absorbed into one another.",
    he: "טַבָּעוֹת גְּדִילָה רוחביות על נְדַן הקרטין, הנוצרות מקצב גדילה משתנה. בולטות במיוחד בעיזים ובכבשים."
  },
  exemplar: {
    he: "עֵז",
    se: "ez",
    en: "goat / ibex (separated rings FAIL the absorption test)"
  },
  note: {
    en: "Rashi on דְּמִיבְּלַע חִירְקַיְיהוּ: \"Their grooves are dense, adjacent, and absorbed into one another.\"",
    he: "חֲרִיצֵיהֶן תְּכוּפוֹת וּסְמוּכִין וּמוּבְלָעִים זֶה בָּזֶה",
    ref: "Rashi, Chullin 59b s.v. דמיבלע חירקייהו"
  }
}, {
  id: "chadurot",
  he: "חֲדוּרוֹת",
  se: "chadurot",
  en: "tapered / sharp at the apex",
  color: "var(--p-structural)",
  rashi: {
    he: "חֲדוּרוֹת כְּעֵין קַרְנֵי אַיָּל וּצְבִי שֶׁחַדִּין לְמַעְלָה",
    se: "chadurot ke-ein karnei ayal u-tzvi she-chadin lemala",
    en: "Chadurot like the horns of deer and gazelle, which taper sharply upward.",
    ref: "Rashi, Chullin 59b s.v. חדורות"
  },
  talmud: {
    he: "וַהֲרֵי צְבִי, דְּאֵין מְפוּצָּלוֹת, וְחֶלְבּוֹ מוּתָּר? חֲדוּרוֹת בָּעֵינַן",
    se: "va-harei tzvi, de-ein mefutzalot, ve-chelbo mutar? chadurot ba'einan",
    en: "But the tzvi is not forked, and its cheilev is permitted! [Answer:] We require chadurot.",
    ref: "Chullin 59b"
  },
  anatomy: {
    en: "On Rashi's reading, this picks out the slender, distally-tapering profile typical of antelopes and gazelles, distinguished from the broad-based horns of domestic goats. The bony core itself tapers, and the keratin sheath follows, producing a needle-like apex.",
    he: "פרופיל קרן הולך וצר כלפי מעלה: גם הליבה הגרמית וגם נדן הקרטין מתחדדים. אופייני לאנטילופות וצבאים."
  },
  exemplar: {
    he: "צְבִי",
    se: "tzvi",
    en: "gazelle (passes all three sign-test)"
  },
  note: {
    en: "Textual variant: Rambam writes הֲדוּרוֹת with ה rather than חֲדוּרוֹת with ח. Some explain הדורות as \"splendid in form,\" which fits the tapering profile equally.",
    ref: "Mishneh Torah, Forbidden Foods 1:10"
  }
}];
const CASES = [{
  animal: "עֵז",
  se: "ez",
  has: "Horns + hooves, charukot, keruchot",
  fails: "Not mefutzal; charukot NOT absorbed",
  verdict: "behema · cheilev אסור"
}, {
  animal: "שׁוֹר",
  se: "shor",
  has: "Horns + hooves, keruchot",
  fails: "Not mefutzal, not charukot",
  verdict: "behema · cheilev אסור"
}, {
  animal: "צְבִי",
  se: "tzvi",
  has: "Keruchot, chadurot, charukot with absorbed notches",
  fails: "—",
  verdict: "chaya · cheilev מותר"
}, {
  animal: "אַיָּל",
  se: "ayal",
  has: "Mefutzalot",
  fails: "—",
  verdict: "chaya · cheilev מותר (sufficient alone)"
}, {
  animal: "עֵז כַּרְכּוּז",
  se: "ez karkoz",
  has: "All three chaya signs; called \"goat\" in name",
  fails: "Identity unresolved — Rav Achai forbade",
  verdict: "Halacha follows R. Shmuel: permitted"
}];
const ANATOMY_PLATES = [{
  src: "https://upload.wikimedia.org/wikipedia/commons/9/9a/Anatomy_and_physiology_of_animals_A_horn.jpg",
  title: "True horn · cross-section",
  he: "כְּרוּכוֹת",
  caption: "Cutaway diagram of a bovid horn. Keratin sheath wraps the bony cornual process in concentric layers — Rashi's גלדי גלדי, קליפה על קליפה.",
  credit: "Anatomy and Physiology of Animals · Wikimedia · CC BY-SA",
  contain: true
}, {
  src: "https://upload.wikimedia.org/wikipedia/commons/6/65/Anatomy_and_physiology_of_animals_Deer_antler.jpg",
  title: "Antler · anatomical diagram",
  he: "מְפֻצָּלוֹת",
  caption: "Companion diagram. Antler is pure bone rising from the pedicle on the frontal bone. Branching tines diagnostic of cervids. No keratin sheath.",
  credit: "Anatomy and Physiology of Animals · Wikimedia · CC BY-SA",
  contain: true
}, {
  src: "https://upload.wikimedia.org/wikipedia/commons/e/e7/Aurochs_skull.jpg",
  title: "Aurochs skull · cores exposed",
  he: "לִיבָּה גַּרְמִית",
  caption: "Bos primigenius preserved without horn sheaths. The bare bony cornual processes — what lies beneath the keratin in living bovids.",
  credit: "Wikimedia Commons · public domain"
}, {
  src: "https://upload.wikimedia.org/wikipedia/commons/d/dd/Bos_primigenius_horns_Montevarchi_03.jpg",
  title: "Bovine horn cores · museum",
  he: "מבנה הקרן",
  caption: "Massive Bos primigenius horn cores. Surface is rough, vascularized, grooved — the substrate that the keratin sheath grows over and adheres to.",
  credit: "Wikimedia Commons · CC BY-SA"
}, {
  src: "https://upload.wikimedia.org/wikipedia/commons/e/ea/Capra_ibex_nubiana_near_Mitzpe_Ramon_in_summer_2011_%284%29.JPG",
  title: "Nubian ibex · separated ridges",
  he: "חֲרוּקוֹת",
  caption: "Transverse growth ridges on the keratin sheath, prominently separated. The pattern that FAILS the Gemara's absorption test for chaya status.",
  credit: "Wikimedia · Mitzpe Ramon · CC BY"
}, {
  src: "https://upload.wikimedia.org/wikipedia/commons/4/4c/Capreolus_capreolus_-_antlers.jpg",
  title: "Roe deer antlers · close-up",
  he: "מְפֻצָּלוֹת",
  caption: "Tines, the burr (rough ring at base), and the dead-bone surface texture with characteristic pearling. The unmistakable visual signature of Cervidae.",
  credit: "Wikimedia Commons · CC BY-SA"
}, {
  src: "https://upload.wikimedia.org/wikipedia/commons/d/d3/Antlers_of_a_roe_buck.jpg",
  title: "Roe buck antlers · detail",
  he: "מְפֻצָּלוֹת",
  caption: "Detail view of mature roe buck antlers showing branching pattern, pearling around the burr, and the dead-bone matte finish after velvet shedding.",
  credit: "Wikimedia Commons · CC BY-SA"
}, {
  src: "https://upload.wikimedia.org/wikipedia/commons/a/ad/Antler_specimens.jpg",
  title: "Antler specimens · collection",
  he: "מְפֻצָּלוֹת",
  caption: "Multiple shed antlers. Variation in branching pattern across age and individual — but in every case, pure bone with no keratin.",
  credit: "Wikimedia Commons · CC BY-SA"
}, {
  src: "https://upload.wikimedia.org/wikipedia/commons/1/1f/Velvet-antler-slices.JPG",
  title: "Antler · sliced cross-sections",
  he: "פנים הקרן",
  caption: "Slices through antler reveal solid bone interior with no keratin layer. This architecture distinguishes antlers from true horns.",
  credit: "Wikimedia Commons · CC BY-SA"
}];
const SPECIMENS = {
  mefutzalot: {
    src: "https://upload.wikimedia.org/wikipedia/commons/3/33/Red_Deer_Stag%2C_Badminton_Park%2C_Gloucestershire_-_geograph.org.uk_-_8210733.jpg",
    credit: "Red deer · Wikimedia · geograph.org.uk · CC BY-SA"
  },
  keruchot: {
    src: "https://upload.wikimedia.org/wikipedia/commons/f/f3/Hereford_bull_large.jpg",
    credit: "Hereford bull · Wikimedia · public domain"
  },
  charukot: {
    src: "https://upload.wikimedia.org/wikipedia/commons/8/80/Alpensteinbock%2C_Capra_ibex_01.JPG",
    credit: "Alpine ibex · Wikimedia · Böhringer · CC BY-SA"
  },
  chadurot: {
    src: "https://upload.wikimedia.org/wikipedia/commons/7/79/Gazella_gazella.jpg",
    credit: "Mountain gazelle · Wikimedia"
  }
};
const FURTHER_READING = [{
  he: "תַּלְמוּד בָּבְלִי",
  title: "Chullin 59b",
  note: "Primary sugya · William Davidson",
  url: "https://www.sefaria.org/Chullin.59b"
}, {
  he: "רַשִׁ\"י",
  title: "Rashi on Chullin 59b",
  note: "All four term definitions",
  url: "https://www.sefaria.org/Rashi_on_Chullin.59b"
}, {
  he: "רַמְבַּ\"ם",
  title: "Mishneh Torah, Forbidden Foods 1:10",
  note: "Codified three-sign test",
  url: "https://www.sefaria.org/Mishneh_Torah%2C_Forbidden_Foods.1.10"
}, {
  he: null,
  title: "WikiVet · Horn — Anatomy & Physiology",
  note: "Veterinary teaching wiki",
  url: "https://en.wikivet.net/Horn_-_Anatomy_%26_Physiology"
}, {
  he: null,
  title: "AMNH · Horns and Antlers",
  note: "Conservation study, museum skulls",
  url: "https://www.amnh.org/research/science-conservation/projects/case-studies/horns-and-antlers"
}, {
  he: null,
  title: "ScienceDirect · Horn (topic)",
  note: "Veterinary textbook excerpts",
  url: "https://www.sciencedirect.com/topics/agricultural-and-biological-sciences/horn"
}, {
  he: null,
  title: "Royal Society Interface · Keratinous horn microstructure",
  note: "Open access · lamellar keratin under scope",
  url: "https://royalsocietypublishing.org/doi/10.1098/rsif.2018.0093"
}];
function App() {
  const [lang, setLang] = useState({
    he: true,
    se: false,
    en: true
  });
  const [activeSign, setActiveSign] = useState("mefutzalot");
  const [view, setView] = useState("signs");
  const toggleLang = k => setLang(l => {
    if (k === "he") return l;
    return {
      ...l,
      [k]: !l[k]
    };
  });
  const sign = SIGNS.find(s => s.id === activeSign) || SIGNS[0];
  const specimen = SPECIMENS[sign.id];
  return /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("header", {
    className: "shell-header"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "center",
      gap: 28
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "brand"
  }, "Karnayim ", /*#__PURE__*/React.createElement("span", {
    className: "heb"
  }, "קַרְנַיִם")), /*#__PURE__*/React.createElement("div", {
    className: "navs"
  }, /*#__PURE__*/React.createElement("span", {
    className: "active"
  }, "Primer"), /*#__PURE__*/React.createElement("span", null, "Signs"), /*#__PURE__*/React.createElement("span", null, "Cases"), /*#__PURE__*/React.createElement("span", null, "Sources"))), /*#__PURE__*/React.createElement("div", {
    className: "header-right"
  }, /*#__PURE__*/React.createElement("div", {
    className: "crumb"
  }, "Chullin · 59b"), /*#__PURE__*/React.createElement("div", {
    className: "lang-toggle"
  }, /*#__PURE__*/React.createElement("button", {
    className: lang.he ? "active" : "",
    disabled: true,
    title: "Hebrew is always on"
  }, "HE"), /*#__PURE__*/React.createElement("button", {
    className: lang.se ? "active" : "",
    onClick: () => toggleLang("se")
  }, "SE"), /*#__PURE__*/React.createElement("button", {
    className: lang.en ? "active" : "",
    onClick: () => toggleLang("en")
  }, "EN")))), /*#__PURE__*/React.createElement("div", {
    className: "shell-body"
  }, /*#__PURE__*/React.createElement("main", {
    className: "main"
  }, /*#__PURE__*/React.createElement("div", {
    className: "headline"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "A Primer · For Chullin 59b"), /*#__PURE__*/React.createElement("span", {
    className: "he"
  }, "סִימָנֵי הַקַּרְנַיִם"), /*#__PURE__*/React.createElement("h1", null, "On the Anatomy of Horns"), /*#__PURE__*/React.createElement("p", {
    className: "dek"
  }, "Modern zoological anatomy paired with the four kashrut signs set down by the Gemara and glossed by Rashi.")), /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "§ I · Anatomy"), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "The Two Structures"))), /*#__PURE__*/React.createElement("div", {
    className: "prose"
  }, lang.en && /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("p", null, "The word “horn” in modern zoology covers two structures that look superficially alike but are anatomically distinct."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "True horns"), " belong to the family Bovidae — cattle, sheep, goats, antelopes, gazelles. They are ", /*#__PURE__*/React.createElement("em", null, "permanent."), " A bony core (", /*#__PURE__*/React.createElement("em", null, "processus cornualis"), ", ", /*#__PURE__*/React.createElement("span", {
    className: "he-inline"
  }, "לִיבָּה גַּרְמִית"), ") grows out of the frontal bone of the skull, and over it grows a sheath of keratin — the same protein as fingernails — laid down in successive layers from the base. Old keratin is pushed distally; the horn is never shed."), /*#__PURE__*/React.createElement("p", null, /*#__PURE__*/React.createElement("strong", null, "Antlers"), " belong to the family Cervidae — the deer family. They are ", /*#__PURE__*/React.createElement("em", null, "not"), " true horns. They are pure bone, they branch, they are sheathed only in vascular skin (“velvet”) during their growth phase, and they are ", /*#__PURE__*/React.createElement("em", null, "shed and regrown each year."), " Branching is the feature that, in living zoology, is exclusive to this family."), /*#__PURE__*/React.createElement("p", null, "The Gemara’s four signs map remarkably onto these structures.")))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "§ II · The Four Signs"), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hebrew)",
      direction: "rtl",
      display: "inline-block",
      marginRight: 8,
      color: "var(--maroon)"
    }
  }, "אַרְבָּעָה סִימָנִים"))), /*#__PURE__*/React.createElement("div", {
    className: "segmented"
  }, /*#__PURE__*/React.createElement("button", {
    className: view === "signs" ? "active" : "",
    onClick: () => setView("signs")
  }, "Signs"), /*#__PURE__*/React.createElement("button", {
    className: view === "flow" ? "active" : "",
    onClick: () => setView("flow")
  }, "Flow"))), view === "signs" && /*#__PURE__*/React.createElement("div", {
    className: "signs"
  }, SIGNS.map((s, i) => /*#__PURE__*/React.createElement("div", {
    key: s.id,
    className: "sign-card" + (activeSign === s.id ? " active" : ""),
    style: {
      borderTopColor: s.color
    },
    onClick: () => setActiveSign(s.id)
  }, /*#__PURE__*/React.createElement("div", {
    className: "sign-row"
  }, /*#__PURE__*/React.createElement("span", {
    className: "sign-num"
  }, String(i + 1).padStart(2, "0")), /*#__PURE__*/React.createElement("span", {
    className: "sign-he"
  }, s.he), lang.se && /*#__PURE__*/React.createElement("span", {
    className: "sign-translit"
  }, s.se), lang.en && /*#__PURE__*/React.createElement("span", {
    className: "sign-gloss"
  }, "— ", s.en), /*#__PURE__*/React.createElement("span", {
    style: {
      marginLeft: "auto"
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "chip outline"
  }, s.exemplar.he)))))), view === "flow" && /*#__PURE__*/React.createElement("div", {
    className: "flow"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-branch"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-num"
  }, "01"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flow-head"
  }, "If the horns are forked"), /*#__PURE__*/React.createElement("div", {
    className: "flow-heb"
  }, "הֵיכָא דְּמִיפַּצְלָא — לָא דִּינָא וְלָא דַּיָּינָא"), lang.se && /*#__PURE__*/React.createElement("div", {
    className: "translit"
  }, "heicha de-mipatzla — la dina ve-la dayyana"), lang.en && /*#__PURE__*/React.createElement("div", {
    className: "flow-en"
  }, "Where it is forked, no judgment and no judge. Mefutzalot alone settles it: chaya, cheilev permitted."), /*#__PURE__*/React.createElement("div", {
    className: "flow-ref"
  }, "Chullin 59b"))), /*#__PURE__*/React.createElement("div", {
    className: "flow-branch"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-num"
  }, "02"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flow-head"
  }, "If the horns are not forked"), /*#__PURE__*/React.createElement("div", {
    className: "flow-heb"
  }, "בָּעֵינַן כְּרוּכוֹת, חֲדוּרוֹת, וַחֲרוּקוֹת — וְהוּא דְּמִיבְּלַע חִירְקַיְיהוּ"), lang.en && /*#__PURE__*/React.createElement("div", {
    className: "flow-en"
  }, "All three remaining signs must be present: layered like an ox, tapered like a gazelle, ridged — provided the ridges are absorbed (not the deep separated rings of a goat)."), /*#__PURE__*/React.createElement("div", {
    className: "flow-ref"
  }, "Chullin 59b"))), /*#__PURE__*/React.createElement("div", {
    className: "flow-branch"
  }, /*#__PURE__*/React.createElement("div", {
    className: "flow-num"
  }, "03"), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    className: "flow-head"
  }, "Rambam codifies the three-sign test"), /*#__PURE__*/React.createElement("div", {
    className: "flow-heb"
  }, "כָּל שֶׁאֵין קַרְנָיו מְפֻצָּלוֹת — אִם הָיוּ קַרְנָיו כְּרוּכוֹת כְּקַרְנֵי הַשּׁוֹר וַחֲרוּקוֹת כְּקַרְנֵי הָעֵז וְיִהְיֶה הֶחָרָק מֻבְלָע בָּהֶן וַהֲדוּרוֹת כְּקַרְנֵי הַצְּבִי — הֲרֵי זוֹ חַיָּה טְהוֹרָה"), /*#__PURE__*/React.createElement("div", {
    className: "flow-ref"
  }, "Mishneh Torah, Forbidden Foods 1:10"))))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "§ III · Horn Anatomy"), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hebrew)",
      direction: "rtl",
      display: "inline-block",
      marginRight: 8,
      color: "var(--maroon)"
    }
  }, "מִבְנֵה הַקֶּרֶן")))), /*#__PURE__*/React.createElement("div", {
    className: "grid-2"
  }, ANATOMY_PLATES.map((p, i) => /*#__PURE__*/React.createElement(Plate, {
    key: i,
    item: p
  })))), /*#__PURE__*/React.createElement("section", {
    style: {
      marginBottom: 36
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "§ IV · Test Cases"), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hebrew)",
      direction: "rtl",
      display: "inline-block",
      marginRight: 8,
      color: "var(--maroon)"
    }
  }, "מַעֲשִׂים שֶׁבַּסּוּגְיָא")))), /*#__PURE__*/React.createElement("table", {
    className: "case-table"
  }, /*#__PURE__*/React.createElement("thead", null, /*#__PURE__*/React.createElement("tr", null, /*#__PURE__*/React.createElement("th", null, "Animal"), /*#__PURE__*/React.createElement("th", null, "Has"), /*#__PURE__*/React.createElement("th", null, "Fails"), /*#__PURE__*/React.createElement("th", null, "Verdict"))), /*#__PURE__*/React.createElement("tbody", null, CASES.map(c => /*#__PURE__*/React.createElement("tr", {
    key: c.animal
  }, /*#__PURE__*/React.createElement("td", null, /*#__PURE__*/React.createElement("div", {
    className: "heb"
  }, c.animal), lang.se && /*#__PURE__*/React.createElement("div", {
    className: "translit",
    style: {
      fontSize: 12
    }
  }, c.se)), /*#__PURE__*/React.createElement("td", null, c.has), /*#__PURE__*/React.createElement("td", null, c.fails), /*#__PURE__*/React.createElement("td", null, c.verdict)))))), /*#__PURE__*/React.createElement("section", null, /*#__PURE__*/React.createElement("div", {
    className: "section-head"
  }, /*#__PURE__*/React.createElement("div", {
    className: "section-head-left"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "§ V · Further Reading"), /*#__PURE__*/React.createElement("div", {
    className: "section-title"
  }, "Sources & Links"))), FURTHER_READING.map((r, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    className: "reading-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: r.url,
    target: "_blank",
    rel: "noopener noreferrer"
  }, r.he && /*#__PURE__*/React.createElement("span", {
    className: "reading-he"
  }, r.he), /*#__PURE__*/React.createElement("span", {
    className: "reading-title"
  }, r.title)), /*#__PURE__*/React.createElement("div", {
    className: "reading-note"
  }, r.note)))), /*#__PURE__*/React.createElement("div", {
    className: "foot"
  }, /*#__PURE__*/React.createElement("div", {
    className: "eyebrow"
  }, "Colophon"), /*#__PURE__*/React.createElement("div", null, "Primary text and Rashi from Sefaria (William Davidson Vocalized Aramaic; Vilna Rashi). Rambam from Mishneh Torah, Hilchot Maachalot Asurot 1:10. Anatomical content is standard zoology of Bovidae and Cervidae — memory-grounded, not from Sefaria. Images from Wikimedia Commons (CC licensed where indicated)."))), /*#__PURE__*/React.createElement("aside", {
    className: "rail"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-sticky"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-label"
  }, "Active Sign"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      marginBottom: 4
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hebrew)",
      fontWeight: 700,
      direction: "rtl",
      fontSize: 28,
      color: sign.color
    }
  }, sign.he), lang.se && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--body)",
      fontStyle: "italic",
      color: "var(--mute)"
    }
  }, sign.se)), lang.en && /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: "var(--body)",
      fontSize: 14,
      color: "var(--ink)"
    }
  }, sign.en)), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-label"
  }, "In the Sugya"), /*#__PURE__*/React.createElement("div", {
    className: "pasuk"
  }, /*#__PURE__*/React.createElement("div", {
    className: "pasuk-he"
  }, sign.talmud.he), lang.se && /*#__PURE__*/React.createElement("div", {
    className: "pasuk-translit"
  }, sign.talmud.se), lang.en && /*#__PURE__*/React.createElement("div", {
    className: "pasuk-en"
  }, sign.talmud.en), /*#__PURE__*/React.createElement("div", {
    className: "pasuk-ref"
  }, sign.talmud.ref))), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-label"
  }, "Rashi ", /*#__PURE__*/React.createElement("span", {
    className: "chip",
    style: {
      marginLeft: 4
    }
  }, "direct")), /*#__PURE__*/React.createElement("div", {
    className: "commentary"
  }, /*#__PURE__*/React.createElement("div", {
    className: "heb-block"
  }, sign.rashi.he), lang.se && /*#__PURE__*/React.createElement("p", {
    className: "it"
  }, sign.rashi.se), lang.en && /*#__PURE__*/React.createElement("p", null, "“", sign.rashi.en, "”"), /*#__PURE__*/React.createElement("div", {
    className: "pasuk-ref",
    style: {
      marginTop: 6
    }
  }, sign.rashi.ref))), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-label"
  }, "Modern Anatomy"), /*#__PURE__*/React.createElement("div", {
    className: "commentary"
  }, lang.en && /*#__PURE__*/React.createElement("p", null, sign.anatomy.en), sign.anatomy.he && /*#__PURE__*/React.createElement("div", {
    className: "heb-block"
  }, sign.anatomy.he))), /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-label"
  }, "Exemplar"), /*#__PURE__*/React.createElement("div", {
    className: "commentary"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: "flex",
      alignItems: "baseline",
      gap: 10,
      marginBottom: 8
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: "var(--hebrew)",
      fontWeight: 700,
      direction: "rtl",
      fontSize: 22,
      color: sign.color
    }
  }, sign.exemplar.he), lang.se && /*#__PURE__*/React.createElement("span", {
    className: "it"
  }, sign.exemplar.se)), lang.en && /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 13
    }
  }, sign.exemplar.en), specimen && /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10,
      background: "var(--paper)",
      border: "1px solid var(--rule)"
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: specimen.src,
    alt: sign.exemplar.en,
    style: {
      display: "block",
      width: "100%",
      height: "auto",
      maxHeight: 220,
      objectFit: "cover"
    },
    onError: e => {
      e.target.style.display = 'none';
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "plate-credit",
    style: {
      padding: "6px 10px"
    }
  }, specimen.credit)))), sign.note && /*#__PURE__*/React.createElement("div", {
    className: "rail-section"
  }, /*#__PURE__*/React.createElement("div", {
    className: "rail-label"
  }, "A Note Worth Pausing On"), /*#__PURE__*/React.createElement("div", {
    className: "commentary"
  }, sign.note.he && /*#__PURE__*/React.createElement("div", {
    className: "heb-block"
  }, sign.note.he), lang.en && /*#__PURE__*/React.createElement("p", null, sign.note.en), sign.note.ref && /*#__PURE__*/React.createElement("div", {
    className: "pasuk-ref",
    style: {
      marginTop: 6
    }
  }, sign.note.ref)))))));
}
function Plate({
  item
}) {
  return /*#__PURE__*/React.createElement("div", {
    className: "plate"
  }, /*#__PURE__*/React.createElement("div", {
    className: "plate-img-wrap" + (item.contain ? " contain" : "")
  }, /*#__PURE__*/React.createElement("img", {
    src: item.src,
    alt: item.title,
    onError: e => {
      e.target.style.display = "none";
      const fb = e.target.parentElement.querySelector(".plate-img-fallback");
      if (fb) fb.style.display = "flex";
    }
  }), /*#__PURE__*/React.createElement("div", {
    className: "plate-img-fallback"
  }, "[image failed — replace src]")), /*#__PURE__*/React.createElement("div", {
    className: "plate-body"
  }, /*#__PURE__*/React.createElement("div", {
    className: "plate-title"
  }, item.he && /*#__PURE__*/React.createElement("span", {
    className: "plate-he"
  }, item.he), item.title), /*#__PURE__*/React.createElement("div", {
    className: "plate-caption"
  }, item.caption), /*#__PURE__*/React.createElement("div", {
    className: "plate-credit"
  }, item.credit)));
}
ReactDOM.createRoot(document.getElementById('root')).render(/*#__PURE__*/React.createElement(App, null));