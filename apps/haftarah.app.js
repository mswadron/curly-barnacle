import React, { useState, useMemo } from "react";

/*
  HAFTARAH & FESTIVAL READING REFERENCE — v4 (bilingual: English / traditional Hebrew)
  Sources retrieved via the Sefaria connector (pre-modern), plus the Cairo Geniza (cited).
  Chabad layer anchored to Shulchan Arukh HaRav (Alter Rebbe), OC 284, on Sefaria.
*/

const C = {
  bg: "#F5F1E8", panel: "#FBF8F1", ink: "#1B2230", sub: "#586074", line: "#D9D2C2",
  tekhelet: "#1F4E79", tekheletSoft: "#E5ECF4", gold: "#946321", goldSoft: "#FBF1DD",
  rule: "#C9B79A", flag: "#8A3A2E", flagSoft: "#F7E7E2", reason: "#3C6336", reasonSoft: "#E8F0E6",
};

const L = {
  mishnah: { en: "Mishnah / Tosefta", he: "מִשְׁנָה / תּוֹסֶפְתָּא", color: "#6B7280" },
  baraita: { en: "Baraita", he: "בָּרַיְתָא", color: "#2C6E9B" },
  amora: { en: "Amora", he: "אֲמוֹרָא", color: "#3F3D8C" },
  haidna: { en: "Shift — v'ha'idna", he: "וְהָאִדְּנָא", color: "#946321" },
  pesikta: { en: "Principle — Pesikta", he: "עִקָּר — פְּסִיקְתָּא", color: "#6D4C9F" },
  abudraham: { en: "Enumeration — Abudraham", he: "מִנְיָן — אֲבוּדַרְהַם", color: "#0F766E" },
  geniza: { en: "Attestation — Cairo Geniza (cited)", he: "עֵדוּת — גְּנִיזַת קַהִיר (צִיטוּט)", color: "#7C5A2E" },
  rambam: { en: "Rishon — Rambam", he: "רִאשׁוֹן — רַמְבַּ״ם", color: "#4B7A45" },
  pesak: { en: "Pesak — SA / Rema", he: "פְּסָק — שֻׁלְחָן עָרוּךְ / רְמָ״א", color: "#8A3A2E" },
};

const A = (n) => ({ label: "Abudraham \u00a7" + n, he: "אֲבוּדַרְהַם \u00a7" + n, url: "https://www.sefaria.org/Abudarham,_Hebrew_Calendar,_Order_of_Parashiot_and_Haftarot." + n });
const S = {
  meg30a: { label: "Megillah 30a", he: "מְגִלָּה ל׳.", url: "https://www.sefaria.org/Megillah.30a" },
  meg31a: { label: "Megillah 31a", he: "מְגִלָּה ל״א.", url: "https://www.sefaria.org/Megillah.31a" },
  meg31b: { label: "Megillah 31b", he: "מְגִלָּה ל״א:", url: "https://www.sefaria.org/Megillah.31b" },
  tos: { label: "Tosefta Megillah 3", he: "תּוֹסֶפְתָּא מְגִלָּה ג׳", url: "https://www.sefaria.org/Tosefta_Megillah.3" },
  pesikta43: A(43),
  ram: (n) => ({ label: "Rambam, Tefillah 13:" + n, he: "רַמְבַּ״ם תְּפִלָּה י״ג:" + n, url: "https://www.sefaria.org/Mishneh_Torah,_Prayer_and_the_Priestly_Blessing.13." + n }),
  sa: (n) => ({ label: "SA OC " + n, he: "שֻׁלְחָן עָרוּךְ או״ח " + n, url: "https://www.sefaria.org/Shulchan_Arukh,_Orach_Chayim." + n }),
  rashi31a: { label: "Rashi, Megillah 31a", he: "רַשִׁ״י מְגִלָּה ל״א.", url: "https://www.sefaria.org/Rashi_on_Megillah.31a" },
  rashi31b: { label: "Rashi, Megillah 31b", he: "רַשִׁ״י מְגִלָּה ל״א:", url: "https://www.sefaria.org/Rashi_on_Megillah.31b" },
  srav: { label: "Shulchan Arukh HaRav OC 284:1", he: "שֻׁלְחָן עָרוּךְ הָרַב או״ח רפ״ד:א", url: "https://www.sefaria.org/Shulchan_Arukh_HaRav,_Orach_Chayim.284.1" },
  srav11: { label: "SA HaRav OC 284:11", he: "שו״ע הָרַב או״ח רפ״ד:יא", url: "https://www.sefaria.org/Shulchan_Arukh_HaRav,_Orach_Chayim.284.11" },
};

const KOREN = "The_Koren_Jerusalem_Bible";
const ABBR = { Isa: "Isaiah", Jer: "Jeremiah", Ezek: "Ezekiel", Zech: "Zechariah", Hab: "Habakkuk", Hos: "Hosea", Mic: "Micah", Obad: "Obadiah", Mal: "Malachi" };
function naviUrl(rangeStr) {
  if (!rangeStr) return null;
  let r = String(rangeStr).split(/[;/]/)[0].trim().replace(/,.*$/, "").trim();
  if (!r || r === "\u2014" || r === "varies") return null;
  const m = r.match(/^((?:[IVX]+\s)?[A-Za-z'\u2019.]+)\s*(.*)$/);
  if (!m) return null;
  let book = m[1].replace(/\.$/, "").trim();
  book = ABBR[book] || book;
  const loc = m[2].trim().replace(/[\u2013\u2014-]/g, "-").replace(/:/g, ".").replace(/\s+/g, "");
  const ref = loc ? book.replace(/\s+/g, "_") + "." + loc : book.replace(/\s+/g, "_");
  return "https://www.sefaria.org/" + ref + "?lang=bi&ven=" + KOREN;
}
const tr = (lang, o) => (o ? o[lang] : "");
const YU_SLUG = {
  "Bereishit": "bereishit",
  "Noach": "noach",
  "Lech Lecha": "lech-lecha",
  "Vayera": "vayeira",
  "Chayei Sarah": "chayei-sara",
  "Toldot": "toldot",
  "Vayetzei": "vayeitzei",
  "Vayishlach": "vayishlach",
  "Vayeshev": "vayeishev",
  "Miketz": "mikeitz",
  "Vayigash": "vayigash",
  "Vayechi": "vayechi",
  "Shemot": "shemot",
  "Vaera": "va-era",
  "Bo": "bo",
  "Beshalach": "beshalach",
  "Yitro": "yitro",
  "Mishpatim": "mishpatim",
  "Terumah": "teruma",
  "Tetzaveh": "tetzaveh",
  "Ki Tisa": "ki-tisa",
  "Vayakhel": "vayakhel",
  "Pekudei": "pekudei",
  "Vayikra": "vayikra",
  "Tzav": "tzav",
  "Shmini": "shemini",
  "Tazria": "tazria",
  "Metzora": "metzora",
  "Acharei Mot": "acharei-mot",
  "Kedoshim": "kedoshim",
  "Emor": "emor",
  "Behar": "behar",
  "Bechukotai": "bechukotai",
  "Bamidbar": "bamidbar",
  "Naso": "naso",
  "Beha'alotcha": "behaalotecha",
  "Shelach": "shelach",
  "Korach": "korach",
  "Chukat": "chukat",
  "Balak": "balak",
  "Pinchas": "pinchas",
};
const yuUrl = (p) => "https://www.yutorah.org/search/?s=" + encodeURIComponent(p + " haftarah");
const OU_AID = {
  "Bereishit": 134795,
  "Noach": 78074,
  "Lech Lecha": 78455,
  "Vayera": 109456,
  "Chayei Sarah": 78778,
  "Toldot": 79013,
  "Vayetzei": 79286,
  "Vayishlach": 79551,
  "Vayeshev": 111653,
  "Miketz": 80032,
  "Vayigash": 80303,
  "Vayechi": 80547,
  "Shemot": 80832,
  "Bo": 81565,
  "Beshalach": 81734,
  "Yitro": 81993,
  "Mishpatim": 117613,
  "Terumah": 117824,
  "Tetzaveh": 82707,
  "Ki Tisa": 118604,
  "Vayikra": 83229,
  "Tazria": 84173,
  "Metzora": 84173,
  "Acharei Mot": 84506,
  "Kedoshim": 122672,
  "Emor": 84776,
  "Behar": 85035,
  "Bechukotai": 85035,
  "Bamidbar": 85260,
  "Naso": 85545,
  "Beha'alotcha": 85780,
  "Shelach": 86097,
  "Korach": 86359,
  "Chukat": 86680,
  "Balak": 87017,
};
const HLINKS = {
  "Bereishit": { nut: "https://www.chabad.org/parshah/article_cdo/aid/573554/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3469983/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-bereishis/" },
  "Noach": { nut: "https://www.chabad.org/parshah/article_cdo/aid/578168/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3476758/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-noach/" },
  "Lech Lecha": { nut: "https://www.chabad.org/parshah/article_cdo/aid/579794/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3476782/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-lechlecha/" },
  "Vayera": { nut: "https://www.chabad.org/parshah/article_cdo/aid/579813/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3490047/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-vayera/" },
  "Chayei Sarah": { nut: "https://www.chabad.org/parshah/article_cdo/aid/585783/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3495198/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-chayeisarah/" },
  "Toldot": { nut: "https://www.chabad.org/parshah/article_cdo/aid/587261/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3502319/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-toldos/" },
  "Vayetzei": { nut: "https://www.chabad.org/parshah/article_cdo/aid/593837/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3505968/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-vayeitzei/" },
  "Vayishlach": { nut: "https://www.chabad.org/parshah/article_cdo/aid/596328/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3514794/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5785-vayishlach/" },
  "Vayeshev": { nut: "https://www.chabad.org/parshah/article_cdo/aid/1019527/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3523178/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-vayeishev/" },
  "Miketz": { nut: "https://www.chabad.org/parshah/article_cdo/aid/605821/jewish/Haftorah-in-a-Nutshell.htm", torg: "https://torah.org/torah-portion/haftorah-miketz/" },
  "Vayigash": { nut: "https://www.chabad.org/parshah/article_cdo/aid/610065/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3533432/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-vayigash/" },
  "Vayechi": { nut: "https://www.chabad.org/parshah/article_cdo/aid/611890/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3549010/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-vayechi/" },
  "Shemot": { nut: "https://www.chabad.org/parshah/article_cdo/aid/615789/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3555178/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-shemos/" },
  "Vaera": { nut: "https://www.chabad.org/parshah/article_cdo/aid/619492/jewish/Haftorah-in-a-Nutshell.htm", torg: "https://torah.org/torah-portion/haftorah-5786-vaera/" },
  "Bo": { nut: "https://www.chabad.org/parshah/article_cdo/aid/619493/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3567754/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-bo/" },
  "Beshalach": { nut: "https://www.chabad.org/parshah/article_cdo/aid/626290/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3567861/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-beshalach/" },
  "Yitro": { nut: "https://www.chabad.org/parshah/article_cdo/aid/472350/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3582416/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-yisro/" },
  "Mishpatim": { nut: "https://www.chabad.org/parshah/article_cdo/aid/819841/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3948839/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/commentary-5786-mishpatim/" },
  "Terumah": { nut: "https://www.chabad.org/parshah/article_cdo/aid/632637/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3591530/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-terumah/" },
  "Tetzaveh": { nut: "https://www.chabad.org/parshah/article_cdo/aid/819846/jewish/Haftorah-in-a-Nutshell.htm", torg: "https://torah.org/torah-portion/haftorah-tetzaveh/" },
  "Ki Tisa": { nut: "https://www.chabad.org/parshah/article_cdo/aid/819865/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/library/article_cdo/aid/3942331/jewish/The-Story-of-Elijah-and-the-Prophets-of-Baal-on-Mount-Carmel.htm", torg: "https://torah.org/torah-portion/haftorah-kisisa/" },
  "Vayakhel": { nut: "https://www.chabad.org/parshah/article_cdo/aid/639863/jewish/Haftorah-in-a-Nutshell.htm", torg: "https://torah.org/torah-portion/haftorah-vayakhelpekudei/" },
  "Pekudei": { nut: "https://www.chabad.org/parshah/article_cdo/aid/639933/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/4306414/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-pekudei/" },
  "Vayikra": { nut: "https://www.chabad.org/parshah/article_cdo/aid/649861/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3630026/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-commentary-5786-vayikra/" },
  "Tzav": { nut: "https://www.chabad.org/parshah/article_cdo/aid/651957/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3630531/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-commentary-5786-tzav/" },
  "Shmini": { nut: "https://www.chabad.org/parshah/article_cdo/aid/657618/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3642101/jewish/Haftarah-Companion.htm" },
  "Tazria": { nut: "https://www.chabad.org/parshah/article_cdo/aid/659332/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/4000720/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-tazria/" },
  "Metzora": { nut: "https://www.chabad.org/parshah/article_cdo/aid/660997/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3651842/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-metzorah/" },
  "Acharei Mot": { nut: "https://www.chabad.org/parshah/article_cdo/aid/663392/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3656650/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-achareimos/" },
  "Kedoshim": { nut: "https://www.chabad.org/parshah/article_cdo/aid/668555/jewish/Haftorah-in-a-Nutshell.htm", torg: "https://torah.org/torah-portion/haftorah-kedoshim/" },
  "Emor": { nut: "https://www.chabad.org/parshah/article_cdo/aid/671841/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3662332/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-emor/" },
  "Behar": { nut: "https://www.chabad.org/parshah/article_cdo/aid/671842/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/4029320/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-behar/" },
  "Bechukotai": { nut: "https://www.chabad.org/parshah/article_cdo/aid/671843/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3671013/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-bechukosai/" },
  "Bamidbar": { nut: "https://www.chabad.org/parshah/article_cdo/aid/895213/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3677153/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-bamidbar/" },
  "Naso": { nut: "https://www.chabad.org/parshah/article_cdo/aid/681090/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3680863/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5786-naso/" },
  "Beha'alotcha": { nut: "https://www.chabad.org/parshah/article_cdo/aid/598114/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3694187/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-behaaloscha/" },
  "Shelach": { nut: "https://www.chabad.org/parshah/article_cdo/aid/691124/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/library/article_cdo/aid/3700192/jewish/Rahab-the-Harlot-and-the-Spies.htm", torg: "https://torah.org/torah-portion/haftorah-5785-shlach/" },
  "Korach": { nut: "https://www.chabad.org/parshah/article_cdo/aid/1229167/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/4043037/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-5785-korach/" },
  "Chukat": { nut: "https://www.chabad.org/parshah/article_cdo/aid/696127/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3709898/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-chukas/" },
  "Balak": { nut: "https://www.chabad.org/parshah/article_cdo/aid/696140/jewish/Haftorah-in-a-Nutshell.htm", comp: "https://www.chabad.org/parshah/article_cdo/aid/3715918/jewish/Haftarah-Companion.htm", torg: "https://torah.org/torah-portion/haftorah-balak/" },
  "Pinchas": { nut: "https://www.chabad.org/parshah/article_cdo/aid/1229209/jewish/Haftorah-in-a-Nutshell.htm", torg: "https://torah.org/torah-portion/haftorah-5757-pinchas/" },
};

const T = {
  eyebrow: { en: "Tosefta \u00b7 Talmud \u00b7 Pesikta \u00b7 Abudraham \u00b7 Rambam \u00b7 SA", he: "תּוֹסֶפְתָּא \u00b7 תַּלְמוּד \u00b7 פְּסִיקְתָּא \u00b7 אֲבוּדַרְהַם \u00b7 רַמְבַּ״ם \u00b7 שֻׁלְחָן עָרוּךְ" },
  title: { en: "Haftarah & Festival Readings", he: "הַפְטָרוֹת וּקְרִיאוֹת הַמּוֹעֲדִים" },
  subtitle: { en: "Each reading is tagged by its source layer. The weekly cycle is Abudraham's enumeration (Sephardi rite), with its provenance traced below.", he: "כָּל קְרִיאָה מְסֻמֶּנֶת לְפִי שִׁכְבַת מְקוֹרָהּ. הַמַּחֲזוֹר הַשְּׁבוּעִי הוּא מִנְיַן אֲבוּדַרְהַם (מִנְהַג סְפָרַד), וְשַׁלְשֶׁלֶת מְקוֹרוֹ לְהַלָּן." },
  print: { en: "Print / Save PDF", he: "הַדְפֵּס / שְׁמֹר PDF" },
  provTitle: { en: "Provenance of the weekly haftarah", he: "שַׁלְשֶׁלֶת הַהַפְטָרָה הַשְּׁבוּעִית" },
  provIntro: { en: "No tannaitic or Talmudic source fixes the ordinary weekly haftarah (Tosefta Meg. 3 and Megillah 31a cover only special days). The weekly cycle is post-Talmudic. Its lineage:", he: "אֵין מָקוֹר תַּנָּאִי אוֹ תַּלְמוּדִי הַקּוֹבֵעַ אֶת הַהַפְטָרָה הַשְּׁבוּעִית הָרְגִילָה (הַתּוֹסֶפְתָּא וּמְגִלָּה ל״א. עוֹסְקוֹת רַק בְּיָמִים מְיֻחָדִים). הַמַּחֲזוֹר הַשְּׁבוּעִי בָּתַר־תַּלְמוּדִי. וְזוֹ שַׁלְשַׁלְתּוֹ:" },
  onSefaria: { en: "ON SEFARIA", he: "בְּסֵפַרְיָא" },
  citedOnly: { en: "CITED ONLY", he: "צִיטוּט בִּלְבַד" },
  source: { en: "Source", he: "מָקוֹר" },
  weeklyHeader: { en: "Weekly cycle — Abudraham (Sephardi)", he: "מַחֲזוֹר שְׁבוּעִי — אֲבוּדַרְהַם (סְפָרַד)" },
  riteCoverage: { en: "Rite coverage", he: "מִנְהֲגֵי הָעֵדוֹת" },
  riteNote: { en: "This list is the Sephardi rite (Abudraham), with his own 'yesh maftirin' variants where he gives them. Ashkenaz, Chabad, Teiman, and Italki diverge mainly on the closing verse, but no pre-modern Sefaria text enumerates those boundaries rite-by-rite. Teiman largely follows Rambam; Chabad's haftarah law is in Shulchan Arukh HaRav OC 284.", he: "רְשִׁימָה זוֹ הִיא מִנְהַג סְפָרַד (אֲבוּדַרְהַם), עִם חִלּוּפֵי ״וְיֵשׁ מַפְטִירִין״ שֶׁלּוֹ. אַשְׁכְּנַז, חַבַּ״ד, תֵּימָן וְאִיטַלְיָא חוֹלְקִים בְּעִקָּר בִּפְסוּק הַסִּיּוּם, אַךְ אֵין מָקוֹר קַדְמוֹן בְּסֵפַרְיָא הַמּוֹנֶה אֶת הַגְּבוּלוֹת לְפִי כָּל עֵדָה. תֵּימָן הוֹלֶכֶת בְּעִקָּר אַחַר הָרַמְבַּ״ם; דִּין הַהַפְטָרָה לְחַבַּ״ד בְּשֻׁלְחָן עָרוּךְ הָרַב או״ח רפ״ד." },
  chabadNote: { en: "Chabad anchor — Shulchan Arukh HaRav (Alter Rebbe), OC 284. The principle (§1): the haftarah is read 'from the theme of the portion' (me'inyan ha-parsha). The distinctive Chabad practice (§11): the congregation does not rely on hearing alone — 'they themselves read the haftarah, for a reason known to them.'", he: "עֹגֶן חַבַּ״ד — שֻׁלְחָן עָרוּךְ הָרַב או״ח רפ״ד. הַכְּלָל (סְעִיף א׳): ״וְקָרְאוּ בִּנְבִיאִים מֵעִנְיַן הַפָּרָשָׁה.״ וּמִנְהַג חַבַּ״ד הַמְיֻחָד (סְעִיף י״א): ״וְיֵשׁ נוֹהֲגִים מִטַּעַם הַיָּדוּעַ לָהֶם... אֶלָּא הֵם בְּעַצְמָם קוֹרִין הַהַפְטָרָה.״" },
  remaining: { en: "Remaining parshiyot", he: "שְׁאָר הַפָּרָשִׁיּוֹת" },
  weeklyTail: { en: "Matot, Masei, Devarim, Va'etchanan, Eikev, Re'eh, Shoftim, Ki Tetze, Ki Tavo, Nitzavim, Vayelech, Ha'azinu — these fall after 17 Tammuz, so their haftarot are the seasonal ones (3 rebuke / 7 consolation / 2 repentance), not parsha-matched. (Abudraham \u00a743.)", he: "מַטּוֹת, מַסְעֵי, דְּבָרִים, וָאֶתְחַנַּן, עֵקֶב, רְאֵה, שׁוֹפְטִים, כִּי תֵצֵא, כִּי תָבוֹא, נִצָּבִים, וַיֵּלֶךְ, הַאֲזִינוּ — בָּאוֹת לְאַחַר י״ז בְּתַמּוּז, וְעַל כֵּן הַפְטָרוֹתֵיהֶן הֵן שֶׁל הַמַּחֲזוֹר (ג׳ דְּפֻרְעָנוּתָא / ז׳ דְּנֶחָמְתָּא / ב׳ דְּתִיּוּבְתָּא), וְלֹא לְפִי הַפָּרָשָׁה. (אֲבוּדַרְהַם \u00a7מ״ג.)" },
  torah: { en: "Torah", he: "תּוֹרָה" },
  haftaraText: { en: "Haftarah text (Koren)", he: "נֹסַח הַהַפְטָרָה (קֶרֶן)" },
  halachicSource: { en: "Halachic source", he: "מְקוֹר הֲלָכָתִי" },
  reason: { en: "Reason", he: "טַעַם" },
  changeLabel: { en: "Change over time", he: "שִׁנּוּי בְּמֶשֶׁךְ הַדּוֹרוֹת" },
  machloket: { en: "MACHLOKET", he: "מַחֲלֹקֶת" },
  changed: { en: "CHANGED", he: "נִשְׁתַּנָּה" },
  dispute: { en: "Dispute", he: "מַחֲלֹקֶת" },
  resolved: { en: "Resolved", he: "לַהֲלָכָה" },
  read: { en: "Read \u00b7 Koren", he: "עַיֵּן \u00b7 קֶרֶן" },
  identNote: { en: "verse numbers added", he: "מספור הפסוקים הוסף" },
  nutshell: { en: "Nutshell · Chabad", he: "תַּמְצִית · חב״ד" },
  companion: { en: "Companion · Chabad", he: "מַדְרִיךְ · חב״ד" },
  torahorg: { en: "Commentary · Torah.org", he: "בֵּאוּר · Torah.org" },
  ouhelper: { en: "Haftarah · OU", he: "הַפְטָרָה · OU" },
  yutorah: { en: "Shiur · YU", he: "שִׁעוּר · ישיבה" },
  connection: { en: "Connection", he: "הֶקְשֵׁר" },
  offSefaria: { en: "off-Sefaria · pre-modern", he: "מִחוּץ לְסֵפַרְיָא · קַדְמוֹן" },
  showSource: { en: "\u25b8 Show source text", he: "\u25c2 הַצֵּג לְשׁוֹן הַמָּקוֹר" },
  hideSource: { en: "\u25be Hide source text", he: "\u25be הַסְתֵּר לְשׁוֹן הַמָּקוֹר" },
  nothing: { en: "Nothing matches.", he: "אֵין תּוֹצָאוֹת." },
  search: { en: "Search parsha, occasion, reading, or Hebrew incipit\u2026", he: "חַפֵּשׂ פָּרָשָׁה, מוֹעֵד, הַפְטָרָה אוֹ פְּתִיחָה\u2026" },
  footer: { en: "Hebrew is the public-domain source text, verbatim. The 'Read \u00b7 Koren' links open the passage on Sefaria in the Koren Jerusalem Bible (switch to JPS 1917 or Hebrew inside Sefaria). Weekly endpoints are Abudraham's own words; verse ranges are identifications. The Cairo Geniza layer is cited (Mann, Internet Archive; B\u00fcchler JQR 1893\u201394; T-S Cambridge), reflecting the triennial cycle. Chabad law via Shulchan Arukh HaRav. All else via the Sefaria connector.", he: "הַלָּשׁוֹן הָעִבְרִית הִיא לְשׁוֹן הַמָּקוֹר, כִּלְשׁוֹנָהּ. קִשּׁוּרֵי ״עַיֵּן · קֶרֶן״ פּוֹתְחִים אֶת הַכָּתוּב בְּסֵפַרְיָא בְּתַרְגּוּם קֶרֶן. פְּסוּקֵי הַסִּיּוּם הַשְּׁבוּעִיִּים הֵם לְשׁוֹן אֲבוּדַרְהַם; טְוַח הַפְּסוּקִים הוּא זִהוּי. שִׁכְבַת הַגְּנִיזָה בְּצִיטוּט (מַאן; בִּיכְלֶר; קַיְמְבְּרִידְג׳), וּמְשַׁקֶּפֶת אֶת הַמַּחֲזוֹר הַתְּלָת־שְׁנָתִי. דִּין חַבַּ״ד מִשֻּׁלְחָן עָרוּךְ הָרַב. הַשְּׁאָר מִסֵּפַרְיָא." },
};

const LINEAGE = [
  {
    tier: { en: "Earliest written attestation", he: "הָעֵדוּת הַכְּתוּבָה הַקַּדְמוּתִית" }, layer: "geniza", anchor: "cited",
    what: { en: "Palestinian triennial-cycle haftarot, paired with each seder (often via piyyut). The earliest physical evidence of fixed weekly haftarot — but a different system from our annual cycle, so no one-to-one map.", he: "הַפְטָרוֹת הַמַּחֲזוֹר הַתְּלָת־שְׁנָתִי שֶׁל אֶרֶץ יִשְׂרָאֵל, מְחֻבָּרוֹת לְכָל סֵדֶר (לִפְעָמִים דֶּרֶךְ פִּיּוּט). הָעֵדוּת הַגַּשְׁמִית הַקַּדְמוּתִית בְּיוֹתֵר לְהַפְטָרוֹת שְׁבוּעִיּוֹת קְבוּעוֹת — אַךְ שִׁיטָה אַחֶרֶת מִמַּחֲזוֹרֵנוּ הַשְּׁנָתִי, וְאֵין הַתְאָמָה אַחַת לְאַחַת." },
    cite: { en: "Reconstructed from Geniza fragments by J. Mann (full text below); first published by A. Büchler, JQR o.s. 5 (1893) & 6 (1894); manuscripts in the T-S Collection, Cambridge UL.", he: "שֻׁחְזַר מִקִּטְעֵי הַגְּנִיזָה בִּידֵי י׳ מַאן; נִדְפַּס רִאשׁוֹנָה בִּידֵי א׳ בִּיכְלֶר (JQR ה׳–ו׳, 1893–94); כִּתְבֵי הַיָּד בְּאֹסֶף טֵיְלוֹר־שֶׁכְטֶר, קַיְמְבְּרִידְג׳." },
    cites: [
      { label: "Mann, Bible as Read & Preached (Internet Archive) ↗", he: "מַאן, אַרְכִיוֹן הָאִינְטֶרְנֶט ↗", url: "https://archive.org/details/bibleasreadpreac0001mann" },
      { label: "T-S Genizah Collection, Cambridge ↗", he: "אֹסֶף הַגְּנִיזָה, קַיְמְבְּרִידְג׳ ↗", url: "https://cudl.lib.cam.ac.uk/collections/genizah/1" },
    ],
  },
  {
    tier: { en: "Governing principle", he: "הַכְּלָל הַמַּנְחֶה" }, layer: "pesikta", anchor: "sefaria",
    what: { en: "From Bereishit until 17 Tammuz the haftarah matches the parsha 'like to like' (domeh l'domeh); from there the year follows the season — three of rebuke, seven of consolation, two of repentance.", he: "מִבְּרֵאשִׁית וְעַד י״ז בְּתַמּוּז הַהַפְטָרָה דּוֹמָה לַפָּרָשָׁה ״דּוֹמֶה לְדוֹמֶה״; מִשָּׁם וָאֵילָךְ הַשָּׁנָה הוֹלֶכֶת לְפִי הַזְּמַן — שָׁלֹשׁ דְּפֻרְעָנוּתָא, שֶׁבַע דְּנֶחָמְתָּא, שְׁתַּיִם דְּתִיּוּבְתָּא." },
    cite: { en: "Pesikta, quoted verbatim by Abudraham §43.", he: "פְּסִיקְתָּא, מוּבֵאת כִּלְשׁוֹנָהּ בַּאֲבוּדַרְהַם §מ״ג." },
    cites: [S.pesikta43],
  },
  {
    tier: { en: "Earliest clean enumeration (on Sefaria)", he: "הַמִּנְיָן הַמְּסֻדָּר הַקַּדְמוּתִי (בְּסֵפַרְיָא)" }, layer: "abudraham", anchor: "sefaria",
    what: { en: "Sefer Abudraham (R. David Abudraham, Seville, c. 1340) lists every parsha's haftarah by opening and closing words. Reflects the Sephardi rite. This is the live weekly data below.", he: "סֵפֶר אֲבוּדַרְהַם (ר׳ דָּוִד אֲבוּדַרְהַם, סְבִילְיָה, ~1340) מוֹנֶה אֶת הַפְטָרַת כָּל פָּרָשָׁה לְפִי תֵּבוֹת הַפְּתִיחָה וְהַסִּיּוּם. מְשַׁקֵּף מִנְהַג סְפָרַד. אֵלּוּ הַנְּתוּנִים הַשְּׁבוּעִיִּים לְהַלָּן." },
    cite: { en: "Abudraham, Order of Parashiot and Haftarot §1ff.", he: "אֲבוּדַרְהַם, סֵדֶר הַפָּרָשִׁיּוֹת וְהַהַפְטָרוֹת §א׳ וְאֵילָךְ." },
    cites: [A(1)],
  },
];

const BOOK_HE = { Isaiah: "יְשַׁעְיָה", "II Kings": "מְלָכִים ב׳", "I Kings": "מְלָכִים א׳", Malachi: "מַלְאָכִי", Hosea: "הוֹשֵׁעַ", Obadiah: "עוֹבַדְיָה", Amos: "עָמוֹס", Ezekiel: "יְחֶזְקֵאל", Jeremiah: "יִרְמְיָה", Judges: "שׁוֹפְטִים", "II Samuel": "שְׁמוּאֵל ב׳", "I Samuel": "שְׁמוּאֵל א׳", Joshua: "יְהוֹשֻׁעַ", Micah: "מִיכָה", Zechariah: "זְכַרְיָה", Habakkuk: "חֲבַקּוּק", Jonah: "יוֹנָה" };
const bookName = (lang, b) => (lang === "he" ? (BOOK_HE[b] || b) : b);

const WEEKLY = [
  { p: "Bereishit", pHe: "בְּרֵאשִׁית", inc: "כֹּה אָמַר הָאֵל ה׳", end: "וְאַחֲרַי לֹא יִהְיֶה", book: "Isaiah", range: "42:5–43:10", seg: 2 },
  { p: "Noach", pHe: "נֹחַ", inc: "רׇנִּי עֲקָרָה", end: "וְלִקְדוֹשׁ יִשְׂרָאֵל כִּי פֵאֲרָךְ", book: "Isaiah", range: "54:1–55:5", seg: 3 },
  { p: "Lech Lecha", pHe: "לֶךְ לְךָ", inc: "לָמָּה תֹאמַר יַעֲקֹב", end: "בִּקְדוֹשׁ יִשְׂרָאֵל תִּתְהַלָּל", book: "Isaiah", range: "40:27–41:16", seg: 4 },
  { p: "Vayera", pHe: "וַיֵּרָא", inc: "וְאִשָּׁה אַחַת מִנְּשֵׁי בְנֵי הַנְּבִיאִים", end: "וַתִּשָּׂא אֶת בְּנָהּ וַתֵּצֵא", book: "II Kings", range: "4:1–37", seg: 5 },
  { p: "Chayei Sarah", pHe: "חַיֵּי שָׂרָה", inc: "וְהַמֶּלֶךְ דָּוִד זָקֵן", end: "וַתִּכּוֹן מַלְכוּתוֹ מְאֹד", book: "I Kings", range: "1:1–31", seg: 6 },
  { p: "Toldot", pHe: "תּוֹלְדוֹת", inc: "מַשָּׂא דְבַר ה׳", end: "כִּי מַלְאַךְ ה׳ צְבָאוֹת הוּא", book: "Malachi", range: "1:1–2:7", seg: 7 },
  { p: "Vayetzei", pHe: "וַיֵּצֵא", inc: "וְעַמִּי תְלוּאִים", end: "בְּאֶרֶץ תַּלְאוּבוֹת", book: "Hosea", range: "11:7–13:5", seg: 8 },
  { p: "Vayishlach", pHe: "וַיִּשְׁלַח", inc: "חֲזוֹן עֹבַדְיָה", end: "עַד סוֹף סִפְרוֹ", book: "Obadiah", range: "1:1–21", seg: 9 },
  { p: "Vayeshev", pHe: "וַיֵּשֶׁב", inc: "עַל שְׁלֹשָׁה פִּשְׁעֵי יִשְׂרָאֵל", end: "מִי לֹא יִנָּבֵא", book: "Amos", range: "2:6–3:8", seg: 10 },
  { p: "Miketz", pHe: "מִקֵּץ", inc: "וַיִּיקַץ שְׁלֹמֹה", end: "מֶלֶךְ עַל כָּל יִשְׂרָאֵל", book: "I Kings", range: "3:15–4:1", seg: 11 },
  { p: "Vayigash", pHe: "וַיִּגַּשׁ", inc: "וְאַתָּה בֶן אָדָם קַח לְךָ עֵץ אֶחָד", end: "בִּהְיוֹת מִקְדָּשִׁי בְּתוֹכָם לְעוֹלָם", book: "Ezekiel", range: "37:15–28", seg: 12 },
  { p: "Vayechi", pHe: "וַיְחִי", inc: "וַיִּקְרְבוּ יְמֵי דָוִד לָמוּת", end: "וַתִּכֹּן מַלְכוּתוֹ מְאֹד", book: "I Kings", range: "2:1–12", seg: 13 },
  { p: "Shemot", pHe: "שְׁמוֹת", inc: "דִּבְרֵי יִרְמְיָהוּ", end: "רָעָה תָּבֹא אֲלֵיהֶם נְאֻם ה׳", book: "Jeremiah", range: "1:1–2:3", seg: 14,
    vars: [{ en: 'Yesh maftirin: "בֶּן אָדָם הוֹדַע" — Ezekiel 16', he: 'וְיֵשׁ מַפְטִירִין: ״בֶּן אָדָם הוֹדַע אֶת יְרוּשָׁלִַם״ — יְחֶזְקֵאל ט״ז' }, { en: 'Yesh maftirin: "אוֹ יַחֲזֵק בְּמָעֻזִּי" — Isaiah 27:6', he: 'וְיֵשׁ מַפְטִירִין: ״אוֹ יַחֲזֵק בְּמָעֻזִּי״ — יְשַׁעְיָה כ״ז:ו' }] },
  { p: "Vaera", pHe: "וָאֵרָא", inc: "בְּקַבְּצִי אֶת בֵּית יִשְׂרָאֵל", end: "בַּיּוֹם הַהוּא אַצְמִיחַ", book: "Ezekiel", range: "28:25–29:21", seg: 15 },
  { p: "Bo", pHe: "בֹּא", inc: "הַדָּבָר אֲשֶׁר דִּבֶּר ה׳", end: "וְנַקֵּה לֹא אֲנַקֶּךָּ", book: "Jeremiah", range: "46:13–28", seg: 16,
    vars: [{ en: 'Yesh maftirin: "מַשָּׂא מִצְרַיִם" — Isaiah 19', he: 'וְיֵשׁ מַפְטִירִין: ״מַשָּׂא מִצְרַיִם״ — יְשַׁעְיָה י״ט' }] },
  { p: "Beshalach", pHe: "בְּשַׁלַּח", inc: "וּדְבוֹרָה אִשָּׁה נְבִיאָה", end: "עַד סוֹף הַשִּׁירָה", book: "Judges", range: "4:4–5:31", seg: 17 },
  { p: "Yitro", pHe: "יִתְרוֹ", inc: "בִּשְׁנַת מוֹת", end: "וְקָרָאת שְׁמוֹ עִמָּנוּ אֵל", book: "Isaiah", range: "6:1–7:14", seg: 18 },
  { p: "Mishpatim", pHe: "מִשְׁפָּטִים", inc: "הַדָּבָר אֲשֶׁר הָיָה אֶל יִרְמְיָהוּ ... אַחֲרֵי כְּרֹת", end: "אִם לֹא בְרִיתִי יוֹמָם וָלָיְלָה", book: "Jeremiah", range: "34:8–22; 33:25–26", seg: 19 },
  { p: "Terumah", pHe: "תְּרוּמָה", inc: "וַה׳ נָתַן חָכְמָה לִשְׁלֹמֹה", end: "וְלֹא אֶעֱזֹב אֶת עַמִּי יִשְׂרָאֵל", book: "I Kings", range: "5:26–6:13", seg: 20 },
  { p: "Tetzaveh", pHe: "תְּצַוֶּה", inc: "אַתָּה בֶן אָדָם הַגֵּד אֶת בֵּית יִשְׂרָאֵל", end: "וְרָצִיתִי אֶתְכֶם נְאֻם ה׳", book: "Ezekiel", range: "43:10–27", seg: 21 },
  { p: "Ki Tisa", pHe: "כִּי תִשָּׂא", inc: "וַיִּשְׁלַח אַחְאָב בְּכָל בְּנֵי יִשְׂרָאֵל", end: "ה׳ הוּא הָאֱלֹקִים", book: "I Kings", range: "18:1–39", seg: 22 },
  { p: "Vayakhel", pHe: "וַיַּקְהֵל", inc: "וַיִּשְׁלַח הַמֶּלֶךְ שְׁלֹמֹה וַיִּקַּח אֶת חִירָם", end: "אַלְפַּיִם בַּת יָכִיל", book: "I Kings", range: "7:13–26", seg: 23 },
  { p: "Pekudei", pHe: "פְּקוּדֵי", inc: "וַיַּעַשׂ חִירָם", end: "הִיא צִיּוֹן", book: "I Kings", range: "7:40–8:1", seg: 24 },
  { p: "Vayikra", pHe: "וַיִּקְרָא", inc: "עַם זוּ יָצַרְתִּי לִי", end: "וּבְיִשְׂרָאֵל יִתְפָּאָר", book: "Isaiah", range: "43:21–44:23", seg: 25 },
  { p: "Tzav", pHe: "צַו", inc: "עֹלוֹתֵיכֶם סְפוּ עַל זִבְחֵיכֶם", end: "אַל יִתְהַלֵּל חָכָם בְּחָכְמָתוֹ", book: "Jeremiah", range: "7:21–8:3; 9:22–23", seg: 26 },
  { p: "Shmini", pHe: "שְׁמִינִי", inc: "וַיֹּסֶף עוֹד דָּוִד", end: "וַיֵּלֶךְ כָּל הָעָם אִישׁ לְבֵיתוֹ", book: "II Samuel", range: "6:1–7:17", seg: 27 },
  { p: "Tazria", pHe: "תַזְרִיעַ", inc: "וְאִישׁ בָּא מִבַּעַל שָׁלִשָׁה", end: "כִּבְרַת אֶרֶץ", book: "II Kings", range: "4:42–5:19", seg: 28 },
  { p: "Metzora", pHe: "מְצֹרָע", inc: "וְאַרְבָּעָה אֲנָשִׁים הָיוּ מְצֹרָעִים", end: "וַיִּרְמְסוּ אוֹתוֹ הָעָם בַּשַּׁעַר וַיָּמֹת", book: "II Kings", range: "7:3–20", seg: 29 },
  { p: "Acharei Mot", pHe: "אַחֲרֵי מוֹת", inc: "הִנֵּה יָמִים בָּאִים", end: "עַד סוֹף הַסֵּפֶר", book: "Amos", range: "9:7–15", seg: 30,
    vars: [{ en: 'Yesh maftirin: "הֲתִשְׁפֹּט" — Ezekiel 22:1–16 (Sephardi per SA/Rema 428)', he: 'וְיֵשׁ מַפְטִירִין: ״וְאַתָּה בֶן אָדָם הֲתִשְׁפֹּט״ — יְחֶזְקֵאל כ״ב:א–טז' }] },
  { p: "Kedoshim", pHe: "קְדוֹשִׁים", inc: "הֲלִדְרֹשׁ אֹתִי אַתֶּם בָּאִים", end: "לָדַעַת כִּי אֲנִי ה׳ אֱלֹקֵיכֶם", book: "Ezekiel", range: "20:1–20", seg: 31 },
  { p: "Emor", pHe: "אֱמוֹר", inc: "וְהַכֹּהֲנִים הַלְוִיִּם", end: "לֹא יֹאכְלוּ הַכֹּהֲנִים", book: "Ezekiel", range: "44:15–31", seg: 32 },
  { p: "Behar", pHe: "בְּהַר", inc: "הִנֵּה חֲנַמְאֵל", end: "הֲמִמֶּנִּי יִפָּלֵא כָּל דָּבָר", book: "Jeremiah", range: "32:6–27", seg: 33 },
  { p: "Bechukotai", pHe: "בְּחֻקֹּתַי", inc: "ה׳ עֻזִּי וּמָעֻזִּי", end: "כִּי תְהִלָּתִי אָתָּה", book: "Jeremiah", range: "16:19–17:14", seg: 34,
    reason: { text: { en: "Ezra ordained that the curses in Vayikra be read before Shavuot, so that the year and its curses conclude with the outgoing year.", he: "תִּקֵּן עֶזְרָא שֶׁיְּהוּ קוֹרִין קְלָלוֹת שֶׁבְּתוֹרַת כֹּהֲנִים קֹדֶם עֲצֶרֶת, כְּדֵי שֶׁתִּכְלֶה שָׁנָה וְקִלְלוֹתֶיהָ." }, heb: "כְּדֵי שֶׁתִּכְלֶה שָׁנָה וְקִלְלוֹתֶיהָ.", src: S.meg31b } },
  { p: "Bamidbar", pHe: "בְּמִדְבַּר", inc: "וְהָיָה מִסְפַּר בְּנֵי יִשְׂרָאֵל", end: "וְיָדַעַתְּ אֶת ה׳", book: "Hosea", range: "2:1–22", seg: 35 },
  { p: "Naso", pHe: "נָשֹׂא", inc: "וַיְהִי אִישׁ אֶחָד מִצָּרְעָה", end: "וּבֵין אֶשְׁתָּאֹל", book: "Judges", range: "13:2–25", seg: 36 },
  { p: "Beha'alotcha", pHe: "בְּהַעֲלֹתְךָ", inc: "רׇנִּי וְשִׂמְחִי", end: "חֵן חֵן לָהּ", book: "Zechariah", range: "2:14–4:7", seg: 37 },
  { p: "Shelach", pHe: "שְׁלַח", inc: "וַיִּשְׁלַח יְהוֹשֻׁעַ בִּן נוּן", end: "וְגַם נָמֹגוּ כָּל יֹשְׁבֵי הָאָרֶץ מִפָּנֵינוּ", book: "Joshua", range: "2:1–24", seg: 38 },
  { p: "Korach", pHe: "קֹרַח", inc: "וַיֹּאמֶר שְׁמוּאֵל", end: "לַעֲשׂוֹת אֶתְכֶם לוֹ לְעָם", book: "I Samuel", range: "11:14–12:22", seg: 39 },
  { p: "Chukat", pHe: "חֻקַּת", inc: "וַיִּפְתָּח הַגִּלְעָדִי", end: "וַיִּכָּנְעוּ בְּנֵי עַמּוֹן מִפְּנֵי בְּנֵי יִשְׂרָאֵל", book: "Judges", range: "11:1–33", seg: 40 },
  { p: "Balak", pHe: "בָּלָק", inc: "וְהָיָה שְׁאֵרִית יִשְׂרָאֵל", end: "וְהַצְנֵעַ לֶכֶת עִם אֱלֹקֶיךָ", book: "Micah", range: "5:6–6:8", seg: 41 },
  { p: "Pinchas", pHe: "פִּינְחָס", inc: "וְיַד ה׳ הָיְתָה אֶל אֵלִיָּהוּ", end: "וַיֵּלֶךְ אַחֲרֵי אֵלִיָּהוּ וַיְשָׁרְתֵהוּ", book: "I Kings", range: "18:46–19:21", seg: 42 },
];

const CATS = ["All", "Weekly Cycle", "Festivals", "Yamim Nora'im", "Seasonal Cycle", "Arba Parshiyot", "Other"];
const CATS_HE = { All: "הַכֹּל", "Weekly Cycle": "מַחֲזוֹר שְׁבוּעִי", Festivals: "מוֹעֲדִים", "Yamim Nora'im": "יָמִים נוֹרָאִים", "Seasonal Cycle": "מַחֲזוֹר הַשָּׁנָה", "Arba Parshiyot": "אַרְבַּע פָּרָשִׁיּוֹת", Other: "שְׁאָר" };
const catName = (lang, c) => (lang === "he" ? CATS_HE[c] : c);
const TRAD_HE = { All: "כֻּלָּם", Sefard: "סְפָרַד", Ashkenaz: "אַשְׁכְּנַז", Baraita: "בָּרַיְתָא", Settled: "לַהֲלָכָה", SA: "שֻׁלְחָן עָרוּךְ", "2nd Shabbat": "שַׁבָּת ב׳" };
const tradName = (lang, t) => (lang === "he" ? (TRAD_HE[t] || t) : t);

const DATA = [
  { cat: "Festivals", occ: { en: "Pesach — Day 1", he: "פֶּסַח — יוֹם א׳" },
    torah: [{ label: { en: "Talmud/Mishnah: Parashat Mo'adot", he: "תַּלְמוּד: פָּרָשַׁת מוֹעֲדוֹת" }, range: "Lev. 22:26–23:44" }, { label: { en: "Rambam (minhag): Mishchu u'kchu", he: "רַמְבַּ״ם: מִשְׁכוּ וּקְחוּ" }, range: "Ex. 12:21–51" }],
    haftarot: [{ trad: "All", layer: "baraita", inc: "בְּפֶסַח גִּלְגָּל", en: "Pesach at Gilgal", range: "Joshua 5:2–14 / 5:2–15" }],
    change: { text: { en: 'Rambam records the minhag had moved to "Mishchu u\'kchu" for Day 1.', he: "הָרַמְבַּ״ם מוֹסֵר שֶׁהַמִּנְהָג נִשְׁתַּנָּה לְ״מִשְׁכוּ וּקְחוּ״ בְּיוֹם א׳." }, src: S.ram(8) },
    flags: [{ en: "Endpoint differs: Talmud/Davidson Joshua 5:14 vs Rambam 5:15.", he: "פְּסוּק הַסִּיּוּם חוֹלֵק: תַּלְמוּד יְהוֹשֻׁעַ ה׳:יד מוּל רַמְבַּ״ם ה׳:טו." }], sources: [S.meg31a, S.ram(8)],
    heb: "בְּפֶסַח קוֹרִין בְּפָרָשַׁת מוֹעֲדוֹת וּמַפְטִירִין בְּפֶסַח גִּלְגָּל.", hebSrc: { en: "Megillah 31a", he: "מְגִלָּה ל״א." } },
  { cat: "Festivals", occ: { en: "Pesach — Day 7 (last yom tov)", he: "פֶּסַח — יוֹם ז׳" },
    torah: [{ label: { en: "Vayehi B'shalach", he: "וַיְהִי בְּשַׁלַּח" }, range: "Ex. 13:17–15:26" }],
    haftarot: [{ trad: "All", layer: "baraita", inc: "וַיְדַבֵּר דָּוִד", en: "The song of David", range: "II Samuel 22:1–51" }],
    reason: { text: { en: "Day 7 is when Israel sang the Song at the Sea; David's song is likewise a shira recounting the Exodus.", he: "בְּיוֹם ז׳ אָמְרוּ שִׁירָה עַל הַיָּם; שִׁירַת דָּוִד אַף הִיא שִׁירָה וּמְדַבֶּרֶת בִּיצִיאַת מִצְרַיִם." }, heb: "לְפִי שֶׁבְּיוֹם ז׳ שֶׁל פֶּסַח אָמְרוּ שִׁירָה עַל הַיָּם... וַיְדַבֵּר דָּוִד — שֶׁהִיא שִׁירָה כְּמוֹתָהּ וּמְדַבֵּר בָּהּ מִיצִיאַת מִצְרַיִם.", src: S.rashi31a },
    change: null, flags: [], sources: [S.meg31a, S.ram(8)],
    heb: "יוֹם טוֹב הָאַחֲרוֹן שֶׁל פֶּסַח קוֹרִין ״וַיְהִי בְּשַׁלַּח״, וּמַפְטִירִין ״וַיְדַבֵּר דָּוִד״.", hebSrc: { en: "Megillah 31a", he: "מְגִלָּה ל״א." } },
  { cat: "Festivals", occ: { en: "Shavuot — Day 1", he: "שָׁבוּעוֹת — יוֹם א׳" },
    torah: [{ label: { en: "BaChodesh HaShlishi (settled)", he: "בַּחֹדֶשׁ הַשְּׁלִישִׁי" }, range: "Ex. 19:1–20:23" }],
    haftarot: [{ trad: "All", layer: "pesak", inc: "מַעֲשֵׂה מֶרְכָּבָה", en: "The Chariot of Ezekiel", range: "Ezekiel 1, ending 3:12" }],
    machloket: { dispute: { en: "Talmud: TK (Habakkuk) vs Acherim (Merkava).", he: "תַּלְמוּד: ת״ק (חֲבַקּוּק) מוּל אֲחֵרִים (מֶרְכָּבָה)." }, resolution: { en: "Settled (Rambam + SA 494): Day 1 = Merkava.", he: "לַהֲלָכָה (רַמְבַּ״ם וְשו״ע תצ״ד): יוֹם א׳ = מֶרְכָּבָה." }, src: S.sa(494) },
    change: { text: { en: "V'ha'idna (two days): both kept in reverse order.", he: "וְהָאִדְּנָא (שְׁנֵי יָמִים): נוֹהֲגִים כִּשְׁנֵיהֶם בְּהֵפֶךְ." }, src: S.meg31a },
    reason: { text: { en: "The Merkava is read because the Sinai revelation, like Ezekiel's vision, came amid myriads of angels.", he: "מַפְטִירִין בַּמֶּרְכָּבָה לְפִי שֶׁהִתְגַּלּוּת סִינַי, כְּמַרְאֵה יְחֶזְקֵאל, הָיְתָה בְּרִבּוֹא רְבָבוֹת מַלְאָכִים." }, heb: "בַּמֶּרְכָּבָה דִּיחֶזְקֵאל — עַל שֵׁם שֶׁנִּגְלָה בְּסִינַי בְּרִבּוֹ רְבָבוֹת אַלְפֵי שִׁנְאָן.", src: S.rashi31a },
    flags: [{ en: "Endpoint verified against navi: SA 494 ends at Ezekiel 3:12, not Rambam's 1:28.", he: "פְּסוּק הַסִּיּוּם נִבְדַּק: שו״ע תצ״ד מְסַיֵּם בִּיחֶזְקֵאל ג׳:יב, וְלֹא א׳:כח כָּרַמְבַּ״ם." }],
    sources: [S.meg31a, S.ram(10), S.sa(494)],
    heb: "אֲחֵרִים אוֹמְרִים: ״בַּחֹדֶשׁ הַשְּׁלִישִׁי״, וּמַפְטִירִין בַּמֶּרְכָּבָה.", hebSrc: { en: "Megillah 31a; SA OC 494:1", he: "מְגִלָּה ל״א.; שו״ע או״ח תצ״ד:א" } },
  { cat: "Festivals", occ: { en: "Shavuot — Day 2 (diaspora)", he: "שָׁבוּעוֹת — יוֹם ב׳" },
    torah: [{ label: { en: "Kol HaB'chor", he: "כָּל הַבְּכוֹר" }, range: "Deut. 15:19–16:17" }],
    haftarot: [{ trad: "All", layer: "pesak", inc: "וַה׳ בְּהֵיכַל קׇדְשׁוֹ", en: "Habakkuk's prayer", range: "Habakkuk 2:20–3:19" }],
    reason: { text: { en: "Habakkuk is read because it speaks of the giving of the Torah ('God comes from Teiman').", he: "מַפְטִירִין בַּחֲבַקּוּק לְפִי שֶׁמְּדַבֵּר בְּמַתַּן תּוֹרָה (״אֱלוֹהַּ מִתֵּימָן יָבוֹא״)." }, heb: "וּמַפְטִירִין בַּחֲבַקּוּק — שֶׁמְּדַבֵּר בְּמַתַּן תּוֹרָה, אֱלוֹהַּ מִתֵּימָן יָבוֹא.", src: S.rashi31a },
    change: null, flags: [], sources: [S.ram(10), S.sa(494)],
    heb: "וּמַפְטִירִין בַּחֲבַקּוּק.", hebSrc: { en: "Rambam 13:10; SA OC 494:2", he: "רַמְבַּ״ם י״ג:י; שו״ע או״ח תצ״ד:ב" } },
  { cat: "Festivals", occ: { en: "Sukkot — Day 1", he: "סֻכּוֹת — יוֹם א׳" },
    torah: [{ label: { en: "Parashat Mo'adot", he: "פָּרָשַׁת מוֹעֲדוֹת" }, range: "Lev. 22:26–23:44" }],
    haftarot: [{ trad: "All", layer: "baraita", inc: "הִנֵּה יוֹם בָּא לַה׳", en: "Behold the day of the Lord comes", range: "Zechariah 14" }],
    reason: { text: { en: "Zechariah 14 is read because it speaks explicitly of keeping the festival of Sukkot.", he: "מַפְטִירִין בִּזְכַרְיָה י״ד לְפִי שֶׁנֶּאֱמַר בּוֹ בְּפֵרוּשׁ ״לָחֹג אֶת חַג הַסֻּכּוֹת״." }, heb: "הִנֵּה יוֹם בָּא לַה׳ — דִּכְתִיב בֵּיהּ לָחֹג אֶת חַג הַסֻּכּוֹת.", src: S.rashi31a },
    change: null, flags: [], sources: [S.meg31a, S.ram(12)],
    heb: "וּמַפְטִירִין ״הִנֵּה יוֹם בָּא לַה׳״.", hebSrc: { en: "Megillah 31a", he: "מְגִלָּה ל״א." } },
  { cat: "Festivals", occ: { en: "Simchat Torah", he: "שִׂמְחַת תּוֹרָה" },
    torah: [{ label: { en: "V'Zot HaBracha", he: "וְזֹאת הַבְּרָכָה" }, range: "Deut. 33–34" }],
    haftarot: [{ trad: "Baraita", layer: "baraita", inc: "וַיַּעֲמֹד שְׁלֹמֹה", en: "And Solomon stood", range: "I Kings 8:22–53" }, { trad: "Ashkenaz", layer: "rambam", inc: "וַיְהִי אַחֲרֵי מוֹת מֹשֶׁה", en: "Joshua", range: "Joshua 1" }],
    machloket: { dispute: { en: "Talmud: Vayaamod Shlomo.", he: "תַּלְמוּד: וַיַּעֲמֹד שְׁלֹמֹה." }, resolution: { en: 'Rambam records "yesh mi she-maftirin" Joshua 1 — the Ashkenazi custom.', he: "הָרַמְבַּ״ם מוֹסֵר ״יֵשׁ מִי שֶׁמַּפְטִירִין״ יְהוֹשֻׁעַ א׳ — מִנְהַג אַשְׁכְּנַז." }, src: S.ram(12) },
    change: null, flags: [], sources: [S.meg31a, S.ram(12)],
    heb: "וְיֵשׁ מִי שֶׁמַּפְטִירִין ״וַיְהִי אַחֲרֵי מוֹת מֹשֶׁה״.", hebSrc: { en: "Rambam 13:12", he: "רַמְבַּ״ם י״ג:יב" } },
  { cat: "Yamim Nora'im", occ: { en: "Rosh HaShana — Day 1", he: "רֹאשׁ הַשָּׁנָה — יוֹם א׳" },
    torah: [{ label: { en: "Va-Hashem Pakad et Sarah", he: "וַה׳ פָּקַד אֶת שָׂרָה" }, range: "Gen. 21" }],
    haftarot: [{ trad: "Settled", layer: "pesak", inc: "וַיְהִי אִישׁ אֶחָד", en: "Hannah", range: "I Samuel 1:1–2:10" }],
    machloket: { dispute: { en: "Talmud: TK (Haben Yakir) vs Yesh Omrim (Hannah).", he: "תַּלְמוּד: ת״ק (הֲבֵן יַקִּיר) מוּל יֵשׁ אוֹמְרִים (חַנָּה)." }, resolution: { en: "Settled (Rambam): Day 1 = Hannah.", he: "לַהֲלָכָה (רַמְבַּ״ם): יוֹם א׳ = חַנָּה." }, src: S.ram(11) },
    change: { text: { en: "V'ha'idna: Day 2 = the Akeida.", he: "וְהָאִדְּנָא: יוֹם ב׳ = הָעֲקֵדָה." }, src: S.meg31a }, flags: [], sources: [S.meg31a, S.ram(11)],
    reason: { text: { en: "Hannah is read because she was remembered on Rosh HaShana; the Akeida is invoked so we be remembered in judgment.", he: "מַפְטִירִין בְּחַנָּה לְפִי שֶׁנִּפְקְדָה בְּרֹאשׁ הַשָּׁנָה; וְהָעֲקֵדָה כְּדֵי שֶׁנִּזָּכֵר בַּמִּשְׁפָּט." }, heb: "מַפְטִירִין בְּחַנָּה — לְפִי שֶׁפְּקִידָתָהּ הָיְתָה בְּרֹאשׁ הַשָּׁנָה, וַעֲקֵידַת יִצְחָק מַזְכִּירִין כְּדֵי שֶׁתִּזָּכֵר לָנוּ הַיּוֹם בַּמִּשְׁפָּט.", src: S.rashi31a },
    heb: "וְיֵשׁ אוֹמְרִים: ״וַה׳ פָּקַד אֶת שָׂרָה״, וּמַפְטִירִין בְּחַנָּה.", hebSrc: { en: "Megillah 31a", he: "מְגִלָּה ל״א." } },
  { cat: "Yamim Nora'im", occ: { en: "Yom Kippur — Shacharit", he: "יוֹם הַכִּפּוּרִים — שַׁחֲרִית" },
    torah: [{ label: { en: "Acharei Mot", he: "אַחֲרֵי מוֹת" }, range: "Lev. 16" }],
    haftarot: [{ trad: "All", layer: "baraita", inc: "כִּי כֹה אָמַר רָם וְנִשָּׂא", en: "Thus says the High and Lofty One", range: "Isaiah 57:14–58:14" }],
    reason: { text: { en: "Isaiah 'Ki ko amar ram' is read because it speaks of repentance ('Is this not the fast I choose').", he: "מַפְטִירִין ״כִּי כֹה אָמַר רָם״ לְפִי שֶׁמְּדַבֵּר בְּמִדַּת הַתְּשׁוּבָה (״הֲלֹא זֶה צוֹם אֶבְחָרֵהוּ״)." }, heb: "כִּי כֹה אָמַר רָם וְנִשָּׂא... שֶׁמְּדַבֵּר בְּמִדַּת הַתְּשׁוּבָה, הֲלֹא זֶה צוֹם אֶבְחָרֵהוּ.", src: S.rashi31a },
    change: null, flags: [], sources: [S.meg31a, S.ram(12)],
    heb: "וּמַפְטִירִין ״כִּי כֹה אָמַר רָם וְנִשָּׂא״.", hebSrc: { en: "Megillah 31a", he: "מְגִלָּה ל״א." } },
  { cat: "Yamim Nora'im", occ: { en: "Yom Kippur — Mincha", he: "יוֹם הַכִּפּוּרִים — מִנְחָה" },
    torah: [{ label: { en: "Arayot", he: "עֲרָיוֹת" }, range: "Lev. 18" }],
    haftarot: [{ trad: "All", layer: "baraita", inc: "יוֹנָה", en: "Jonah", range: "Jonah" }],
    change: null, flags: [], sources: [S.meg31a],
    heb: "וּבַמִּנְחָה קוֹרִין בָּעֲרָיוֹת וּמַפְטִירִין בְּיוֹנָה.", hebSrc: { en: "Megillah 31a", he: "מְגִלָּה ל״א." } },
  { cat: "Seasonal Cycle", occ: { en: "Three of Rebuke (Telata d'puranuta)", he: "תְּלָתָא דְּפֻרְעָנוּתָא" },
    torah: [{ label: { en: "(weekly portions, 17 Tammuz → Tisha b'Av)", he: "(פָּרָשִׁיּוֹת שְׁבוּעִיּוֹת, י״ז תַּמּוּז ← ט׳ בְּאָב)" } }],
    haftarot: [{ trad: "SA", layer: "pesak", inc: "דִּבְרֵי יִרְמְיָהוּ", en: "1. Words of Jeremiah", range: "Jer. 1:1–2:3" }, { trad: "SA", layer: "pesak", inc: "שִׁמְעוּ דְבַר ה׳", en: "2. Hear the word", range: "Jer. 2:4–28" }, { trad: "SA", layer: "pesak", inc: "חֲזוֹן יְשַׁעְיָהוּ", en: "3. Vision of Isaiah", range: "Isa. 1:1–27" }],
    machloket: { dispute: { en: "Rambam's set ends with Isaiah 1:21.", he: "סִדְרַת הָרַמְבַּ״ם מְסַיֶּמֶת בִּ״אֵיכָה הָיְתָה לְזוֹנָה״ (יְשַׁעְיָה א׳:כא)." }, resolution: { en: "SA/Tur order: Divrei Yirmiyahu → Shimu → Chazon.", he: "סֵדֶר שו״ע/טוּר: דִּבְרֵי יִרְמְיָהוּ ← שִׁמְעוּ ← חֲזוֹן." }, src: S.sa(428) },
    change: { text: { en: "Custom rooted in the Pesikta; fixed with ranges by SA.", he: "מִנְהָג מְיֻסָּד עַל הַפְּסִיקְתָּא; נִקְבַּע בִּגְבוּלוֹת בַּשו״ע." }, src: S.pesikta43 },
    flags: [{ en: "Sources differ on the set/order: Rambam 13:19 vs Pesikta/SA 428.", he: "הַמְּקוֹרוֹת חוֹלְקִים בַּסֵּדֶר: רַמְבַּ״ם י״ג:יט מוּל פְּסִיקְתָּא/שו״ע תכ״ח." }], sources: [S.pesikta43, S.ram(19), S.sa(428)],
    heb: "תְּלָתָא דְּפֻרְעָנוּתָא: דִּבְרֵי יִרְמְיָה, שִׁמְעוּ דְבַר ה׳, חֲזוֹן יְשַׁעְיָהוּ.", hebSrc: { en: "SA OC 428:8; Pesikta (Abudraham §43)", he: "שו״ע או״ח תכ״ח:ח; פְּסִיקְתָּא (אֲבוּדַרְהַם §מ״ג)" } },
  { cat: "Seasonal Cycle", occ: { en: "Seven of Consolation (Sheva d'nechemta)", he: "שֶׁבַע דְּנֶחָמְתָּא" },
    torah: [{ label: { en: "(weekly portions, Tisha b'Av → Rosh HaShana)", he: "(פָּרָשִׁיּוֹת שְׁבוּעִיּוֹת, ט׳ בְּאָב ← רֹאשׁ הַשָּׁנָה)" } }],
    haftarot: [
      { trad: "SA", layer: "pesak", inc: "נַחֲמוּ נַחֲמוּ", en: "1", range: "Isa. 40:1–26" },
      { trad: "SA", layer: "pesak", inc: "וַתֹּאמֶר צִיּוֹן", en: "2", range: "Isa. 49:14–51:3" },
      { trad: "SA", layer: "pesak", inc: "עֲנִיָּה סוֹעֲרָה", en: "3", range: "Isa. 54:11–55:5" },
      { trad: "SA", layer: "pesak", inc: "אָנֹכִי אָנֹכִי", en: "4", range: "Isa. 51:12–52:12" },
      { trad: "SA", layer: "pesak", inc: "רָנִּי עֲקָרָה", en: "5", range: "Isa. 54:1–10" },
      { trad: "SA", layer: "pesak", inc: "קוּמִי אוֹרִי", en: "6", range: "Isa. 60:1–22" },
      { trad: "SA", layer: "pesak", inc: "שׂוֹשׂ אָשִׂישׂ", en: "7", range: "Isa. 61:10–63:9" }],
    change: { text: { en: "Pesikta principle; Rambam: minhag pashut; SA fixes the seven.", he: "עִקַּר הַפְּסִיקְתָּא; רַמְבַּ״ם: ״מִנְהָג פָּשׁוּט בְּעָרֵינוּ״; שו״ע קוֹבֵעַ אֶת הַשֶּׁבַע." }, src: S.pesikta43 }, flags: [], sources: [S.pesikta43, S.ram(20), S.sa(428)],
    heb: "שֶׁבַע דְּנֶחָמְתָּא: נַחֲמוּ, וַתֹּאמֶר צִיּוֹן, עֲנִיָּה סוֹעֲרָה, אָנֹכִי, רָנִּי עֲקָרָה, קוּמִי אוֹרִי, שׂוֹשׂ אָשִׂישׂ.", hebSrc: { en: "SA OC 428:8", he: "שו״ע או״ח תכ״ח:ח" } },
  { cat: "Seasonal Cycle", occ: { en: "Two of Repentance (Tarti d'tiyuvta)", he: "תַּרְתֵּי דְּתִיּוּבְתָּא" },
    torah: [{ label: { en: "Tzom Gedalia (mincha) · Shabbat Shuva", he: "צוֹם גְּדַלְיָה (מִנְחָה) · שַׁבָּת שׁוּבָה" } }],
    haftarot: [{ trad: "SA", layer: "pesak", inc: "דִּרְשׁוּ ה׳", en: "Tzom Gedalia mincha", range: "Isa. 55:6–56:8" }, { trad: "SA", layer: "pesak", inc: "שׁוּבָה יִשְׂרָאֵל", en: "Shabbat Shuva", range: "Hosea 14:2–10" }],
    change: null, flags: [], sources: [S.sa(428)],
    heb: "תַּרְתֵּי דְּתִיּוּבְתָּא: דִּרְשׁוּ, שׁוּבָה יִשְׂרָאֵל.", hebSrc: { en: "SA OC 428:8", he: "שו״ע או״ח תכ״ח:ח" } },
  { cat: "Arba Parshiyot", occ: { en: "Shekalim", he: "שְׁקָלִים" }, torah: [{ label: { en: "Ki Tisa", he: "כִּי תִשָּׂא" }, range: "Ex. 30:11–16" }],
    haftarot: [{ trad: "All", layer: "mishnah", inc: "יְהוֹיָדָע הַכֹּהֵן", en: "Jehoiada the priest", range: "II Kings 12:1–17 / 11:17–12:17" }],
    change: null, flags: [{ en: "Earliest: Tosefta Meg. 3. Start differs: Talmud 12:1 vs Rambam 11:17.", he: "הַקַּדְמוֹן: תּוֹסֶפְתָּא מְגִלָּה ג׳. הַתְחָלָה חוֹלֶקֶת: תַּלְמוּד יב:א מוּל רַמְבַּ״ם יא:יז." }], sources: [S.tos, S.meg30a, S.ram(21)],
    heb: "ר״ח אֲדָר שֶׁחָל בְּשַׁבָּת קוֹרִין פ׳ שְׁקָלִים וּמַפְטִירִין בִּיהוֹיָדָע הַכֹּהֵן.", hebSrc: { en: "Tosefta Megillah 3; Megillah 30a", he: "תּוֹסֶפְתָּא מְגִלָּה ג׳; מְגִלָּה ל׳." } },
  { cat: "Arba Parshiyot", occ: { en: "Zachor", he: "זָכוֹר" }, torah: [{ label: { en: "Zakhor", he: "זָכוֹר" }, range: "Deut. 25:17–19" }],
    haftarot: [{ trad: "All", layer: "mishnah", inc: "פָּקַדְתִּי אֵת אֲשֶׁר עָשָׂה עֲמָלֵק", en: "I remembered Amalek", range: "I Samuel 15:1–34" }],
    change: null, flags: [], sources: [S.tos, S.meg30a],
    heb: "בַּשְּׁנִיָּה זָכוֹר וּמַפְטִירִין ״פָּקַדְתִּי אֵת אֲשֶׁר עָשָׂה עֲמָלֵק״.", hebSrc: { en: "Tosefta Megillah 3; Megillah 30a", he: "תּוֹסֶפְתָּא מְגִלָּה ג׳; מְגִלָּה ל׳." } },
  { cat: "Arba Parshiyot", occ: { en: "Parah", he: "פָּרָה" }, torah: [{ label: { en: "Para Aduma", he: "פָּרָה אֲדֻמָּה" }, range: "Num. 19:1–22" }],
    haftarot: [{ trad: "All", layer: "mishnah", inc: "וְזָרַקְתִּי עֲלֵיכֶם", en: "I will sprinkle clean water", range: "Ezekiel 36:25–38 / 36:16–38" }],
    change: null, flags: [{ en: "Start differs: Tosefta/Talmud 36:25 vs Rambam 36:16.", he: "הַתְחָלָה חוֹלֶקֶת: תּוֹסֶפְתָּא/תַּלְמוּד לו:כה מוּל רַמְבַּ״ם לו:טז." }], sources: [S.tos, S.meg30a, S.ram(21)],
    heb: "בַּשְּׁלִישִׁית פָּרָה אֲדֻמָּה וּמַפְטִירִין ״וְזָרַקְתִּי עֲלֵיכֶם מַיִם טְהוֹרִים״.", hebSrc: { en: "Tosefta Megillah 3; Megillah 30a", he: "תּוֹסֶפְתָּא מְגִלָּה ג׳; מְגִלָּה ל׳." } },
  { cat: "Arba Parshiyot", occ: { en: "HaChodesh", he: "הַחֹדֶשׁ" }, torah: [{ label: { en: "HaChodesh hazeh", he: "הַחֹדֶשׁ הַזֶּה" }, range: "Ex. 12:1–20" }],
    haftarot: [{ trad: "All", layer: "mishnah", inc: "בָּרִאשׁוֹן בְּאֶחָד לַחֹדֶשׁ", en: "In the first month, first day", range: "Ezekiel 45:18–46:18 / 45:16–46:18" }],
    change: null, flags: [{ en: "Start differs: Tosefta/Talmud 45:18 vs Rambam 45:16.", he: "הַתְחָלָה חוֹלֶקֶת: תּוֹסֶפְתָּא/תַּלְמוּד מה:יח מוּל רַמְבַּ״ם מה:טז." }], sources: [S.tos, S.meg30a, S.ram(21)],
    heb: "רְבִיעִית הַחֹדֶשׁ וּמַפְטִירִין ״בָּרִאשׁוֹן בְּאֶחָד לַחֹדֶשׁ״.", hebSrc: { en: "Tosefta Megillah 3; Megillah 30a", he: "תּוֹסֶפְתָּא מְגִלָּה ג׳; מְגִלָּה ל׳." } },
  { cat: "Other", occ: { en: "Chanukah", he: "חֲנֻכָּה" }, torah: [{ label: { en: "HaNesi'im", he: "הַנְּשִׂיאִים" }, range: "Numbers 7" }],
    haftarot: [{ trad: "All", layer: "baraita", inc: "נֵרוֹת דִּזְכַרְיָה", en: "Lamps of Zechariah", range: "Zechariah 2:14–4:7" }, { trad: "2nd Shabbat", layer: "baraita", inc: "נֵרוֹת שְׁלֹמֹה", en: "Lamps of Solomon", range: "I Kings 7:40–50" }],
    change: { text: { en: "Two Shabbatot in Chanukah: 1st Nerot Zechariah, 2nd Nerot Shlomo.", he: "שְׁתֵּי שַׁבָּתוֹת בַּחֲנֻכָּה: א׳ נֵרוֹת זְכַרְיָה, ב׳ נֵרוֹת שְׁלֹמֹה." }, src: S.meg31a }, flags: [], sources: [S.meg31a],
    reason: { text: { en: "Zechariah's menorah vision; the second Shabbat reads Solomon's menorahs.", he: "מַרְאֵה הַמְּנוֹרָה דִּזְכַרְיָה; וּבַשַּׁבָּת הַשְּׁנִיָּה נֵרוֹת שְׁלֹמֹה." }, heb: "נֵרוֹת דִּזְכַרְיָה — רָנִּי וְשִׂמְחִי, עַל שֵׁם רָאִיתִי וְהִנֵּה מְנוֹרַת זָהָב כֻּלָּהּ. נֵרוֹת דִּשְׁלֹמֹה — וַיַּעַשׂ חִירוֹם... אֶת הַמְּנוֹרוֹת חָמֵשׁ.", src: S.rashi31a },
    heb: "בַּחֲנֻכָּה בַּנְּשִׂיאִים וּמַפְטִירִין בְּנֵרוֹת דִּזְכַרְיָה.", hebSrc: { en: "Megillah 31a", he: "מְגִלָּה ל״א." } },
  { cat: "Other", occ: { en: "Tisha b'Av — Shacharit", he: "תִּשְׁעָה בְּאָב — שַׁחֲרִית" }, torah: [{ label: { en: "Ki tolid banim", he: "כִּי תוֹלִיד בָּנִים" }, range: "Deut. 4:25–40" }],
    haftarot: [{ trad: "All", layer: "haidna", inc: "אָסֹף אֲסִיפֵם", en: "I will utterly consume them", range: "Jeremiah 8:13–9:23" }],
    machloket: { dispute: { en: "Talmud lists several options (Rav: Isaiah 1:21).", he: "הַתַּלְמוּד מוֹנֶה כַּמָּה (רַב: ״אֵיכָה הָיְתָה״, יְשַׁעְיָה א׳:כא)." }, resolution: { en: "Settled (Abaye, codified by Rambam): Ki tolid banim / Asof asifem.", he: "לַהֲלָכָה (אַבַּיֵּי, וְנִפְסַק בָּרַמְבַּ״ם): כִּי תוֹלִיד בָּנִים / אָסֹף אֲסִיפֵם." }, src: S.ram(19) },
    change: { text: { en: "V'ha'idna (Abaye): everyone reads Ki tolid banim / Asof asifem.", he: "וְהָאִדְּנָא (אַבַּיֵּי): נְהוּג עָלְמָא לְמִקְרֵי ״כִּי תוֹלִיד בָּנִים״, וּמַפְטִירִין ״אָסֹף אֲסִיפֵם״." }, src: S.meg31b }, flags: [], sources: [S.meg31b, S.ram(19)],
    heb: "אָמַר אַבַּיֵּי: הָאִדְּנָא נְהוּג עָלְמָא לְמִקְרֵי ״כִּי תוֹלִיד בָּנִים״, וּמַפְטִירִין ״אָסֹף אֲסִיפֵם״.", hebSrc: { en: "Megillah 31b", he: "מְגִלָּה ל״א:" } },
];

function LayerBadge({ k, lang }) {
  const l = L[k]; if (!l) return null;
  return <span style={{ fontSize: 9.5, fontWeight: 700, color: "#fff", background: l.color, padding: "2px 6px", borderRadius: 4, whiteSpace: "nowrap" }}>{l[lang]}</span>;
}

function WeeklyRow({ w, lang }) {
  const [open, setOpen] = useState(false);
  const he = lang === "he";
  const wl = HLINKS[w.p] || {};
  return (
    <div className="card" style={{ border: `1px solid ${C.line}`, borderRadius: 10, background: C.panel, marginBottom: 8, padding: "12px 14px" }} dir={he ? "rtl" : "ltr"}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 10 }}>
        <span style={{ fontSize: 15, fontWeight: 700 }} className={he ? "heb" : ""}>{he ? w.pHe : w.p}</span>
        <a href={A(w.seg).url} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, fontWeight: 600, textDecoration: "none", color: C.tekhelet, border: `1px solid ${C.tekhelet}`, borderRadius: 999, padding: "2px 8px" }}>{he ? A(w.seg).he : A(w.seg).label} ↗</a>
      </div>
      <div style={{ marginTop: 7, display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontSize: 12.5, color: C.gold, fontWeight: 700 }} className={he ? "heb" : ""}>{bookName(lang, w.book)} {w.range}</span>
        <span style={{ fontSize: 10.5, color: C.sub }}>{tr(lang, T.identNote)}</span>
        <a href={naviUrl(`${w.book} ${w.range}`)} target="_blank" rel="noreferrer" style={{ fontSize: 11, fontWeight: 700, textDecoration: "none", color: "#fff", background: C.tekhelet, borderRadius: 999, padding: "2px 10px" }}>{tr(lang, T.read)} ↗</a>
        {wl.nut && <a href={wl.nut} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, fontWeight: 700, textDecoration: "none", color: C.tekhelet, border: `1px solid ${C.tekhelet}`, borderRadius: 999, padding: "2px 9px" }}>{tr(lang, T.nutshell)} ↗</a>}
        {wl.comp && <a href={wl.comp} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, fontWeight: 700, textDecoration: "none", color: C.tekhelet, border: `1px solid ${C.tekhelet}`, borderRadius: 999, padding: "2px 9px" }}>{tr(lang, T.companion)} ↗</a>}
        {wl.torg && <a href={wl.torg} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, fontWeight: 700, textDecoration: "none", color: C.tekhelet, border: `1px solid ${C.tekhelet}`, borderRadius: 999, padding: "2px 9px" }}>{tr(lang, T.torahorg)} ↗</a>}
        {OU_AID[w.p] && <a href={"https://outorah.org/p/" + OU_AID[w.p] + "/"} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, fontWeight: 700, textDecoration: "none", color: C.tekhelet, border: `1px solid ${C.tekhelet}`, borderRadius: 999, padding: "2px 9px" }}>{tr(lang, T.ouhelper)} ↗</a>}
        {yuUrl(w.p) && <a href={yuUrl(w.p)} target="_blank" rel="noreferrer" style={{ fontSize: 10.5, fontWeight: 700, textDecoration: "none", color: C.tekhelet, border: `1px solid ${C.tekhelet}`, borderRadius: 999, padding: "2px 9px" }}>{tr(lang, T.yutorah)} ↗</a>}
      </div>
      <div dir="rtl" className="heb" style={{ marginTop: 7, fontSize: 16, color: C.ink, lineHeight: 1.7 }}>
        {w.inc} <span style={{ color: C.sub }}>… עד …</span> {w.end}
      </div>
      {w.reason && (
        <div style={{ marginTop: 7, fontSize: 12.5, background: C.reasonSoft, border: "1px solid #4B7A45", borderRadius: 6, padding: "8px 10px", lineHeight: 1.5 }} className={he ? "heb" : ""}>
          <span style={{ fontWeight: 700, color: C.reason }}>{tr(lang, T.reason)} · </span>{tr(lang, w.reason.text)}
          <div dir="rtl" className="heb" style={{ fontSize: 15, color: C.ink, marginTop: 5, lineHeight: 1.7 }}>{w.reason.heb}</div>
          <div style={{ fontSize: 11, color: C.sub, marginTop: 3 }}>{he ? w.reason.src.he : w.reason.src.label}</div>
        </div>
      )}
      {w.conn && w.conn.heb && (
        <div style={{ marginTop: 7, fontSize: 12.5, background: C.goldSoft, border: `1px solid ${C.rule}`, borderRadius: 6, padding: "8px 10px", lineHeight: 1.5 }} className={he ? "heb" : ""}>
          <span style={{ fontWeight: 700, color: C.gold }}>{tr(lang, T.connection)} · </span>
          <span style={{ fontSize: 9.5, fontWeight: 700, color: C.flag, background: "#fff", border: `1px solid ${C.flag}`, borderRadius: 4, padding: "1px 5px" }}>{tr(lang, T.offSefaria)}</span>
          <div dir="rtl" className="heb" style={{ fontSize: 15, color: C.ink, marginTop: 5, lineHeight: 1.7 }}>{w.conn.heb}</div>
          <div style={{ fontSize: 11, color: C.sub, marginTop: 3 }}>{he ? w.conn.src.he : w.conn.src.label}</div>
        </div>
      )}
      {w.vars && (
        <div className="no-print" style={{ marginTop: 4 }}>
          <button onClick={() => setOpen(o => !o)} style={{ fontSize: 11, fontWeight: 600, color: C.tekhelet, background: "none", border: "none", cursor: "pointer", padding: 0 }}>
            {open ? (he ? "▾ הַסְתֵּר" : "▾ Hide variants") : `▸ ${w.vars.length} ${he ? "חִלּוּפִים" : "variant(s)"}`}
          </button>
          {open && w.vars.map((v, i) => <div key={i} dir="rtl" className="heb" style={{ fontSize: 13.5, color: C.sub, marginTop: 4, textAlign: "right" }}>{he ? v.he : v.en}</div>)}
        </div>
      )}
    </div>
  );
}

function Row({ d, lang }) {
  const [open, setOpen] = useState(false);
  const he = lang === "he";
  return (
    <div className="card" style={{ border: `1px solid ${C.line}`, borderRadius: 10, background: C.panel, overflow: "hidden", marginBottom: 10 }} dir={he ? "rtl" : "ltr"}>
      <button onClick={() => setOpen(o => !o)} style={{ width: "100%", textAlign: he ? "right" : "left", background: "transparent", border: "none", cursor: "pointer", padding: "14px 16px", display: "block" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12 }}>
          <span style={{ fontSize: 16, fontWeight: 700 }} className={he ? "heb" : ""}>{tr(lang, d.occ)}</span>
          <span style={{ display: "flex", gap: 6, flexWrap: "wrap", justifyContent: "flex-end" }}>
            {d.machloket && <span style={{ fontSize: 10, fontWeight: 700, color: C.tekhelet, background: C.tekheletSoft, padding: "2px 7px", borderRadius: 999 }}>{tr(lang, T.machloket)}</span>}
            {d.change && <span style={{ fontSize: 10, fontWeight: 700, color: C.gold, background: C.goldSoft, padding: "2px 7px", borderRadius: 999 }}>{tr(lang, T.changed)}</span>}
          </span>
        </div>
        <div style={{ marginTop: 8, fontSize: 13, color: C.sub }} className={he ? "heb" : ""}>
          <span style={{ fontWeight: 700, color: C.gold }}>{tr(lang, T.torah)}&nbsp;</span>
          {d.torah.map((t, i) => <span key={i}>{i > 0 && <span style={{ color: C.line }}> · </span>}{tr(lang, t.label)}{t.range && <span style={{ color: C.gold, fontWeight: 600 }}> [{t.range}]</span>}</span>)}
        </div>
        <div style={{ marginTop: 9, display: "flex", flexDirection: "column", gap: 7 }}>
          {d.haftarot.map((h, i) => (
            <div key={i} style={{ display: "flex", flexWrap: "wrap", alignItems: "baseline", gap: 8 }}>
              <LayerBadge k={h.layer} lang={lang} />
              {h.trad !== "All" && <span style={{ fontSize: 10.5, fontWeight: 700, color: C.tekhelet, border: `1px solid ${C.tekhelet}`, borderRadius: 4, padding: "1px 6px" }}>{tradName(lang, h.trad)}</span>}
              <span dir="rtl" className="heb" style={{ fontSize: 17 }}>{h.inc}</span>
              {!he && <span style={{ fontSize: 12.5, color: C.sub, fontStyle: "italic" }}>{h.en}</span>}
              {h.range !== "—" && <span style={{ fontSize: 12, color: C.gold, fontWeight: 600 }}>[{h.range}]</span>}
            </div>
          ))}
        </div>
        {d.machloket && (
          <div style={{ marginTop: 10, fontSize: 12.5, background: C.tekheletSoft, border: `1px solid ${C.tekhelet}`, borderRadius: 6, padding: "8px 10px", lineHeight: 1.5 }} className={he ? "heb" : ""}>
            <div><span style={{ fontWeight: 700, color: C.tekhelet }}>{tr(lang, T.dispute)} · </span>{tr(lang, d.machloket.dispute)}</div>
            <div style={{ marginTop: 3 }}><span style={{ fontWeight: 700, color: C.tekhelet }}>{tr(lang, T.resolved)} · </span>{tr(lang, d.machloket.resolution)} <span style={{ color: C.sub }}>({he ? d.machloket.src.he : d.machloket.src.label})</span></div>
          </div>
        )}
        {d.change && <div style={{ marginTop: 8, fontSize: 12.5, background: C.goldSoft, border: `1px solid ${C.rule}`, borderRadius: 6, padding: "7px 10px", lineHeight: 1.5 }} className={he ? "heb" : ""}><span style={{ fontWeight: 700, color: C.gold }}>{tr(lang, T.changeLabel)} · </span>{tr(lang, d.change.text)} <span style={{ color: C.sub }}>({he ? d.change.src.he : d.change.src.label})</span></div>}
        {d.reason && (
          <div style={{ marginTop: 8, fontSize: 12.5, background: C.reasonSoft, border: "1px solid #4B7A45", borderRadius: 6, padding: "8px 10px", lineHeight: 1.5 }} className={he ? "heb" : ""}>
            <span style={{ fontWeight: 700, color: C.reason }}>{tr(lang, T.reason)} · </span>{tr(lang, d.reason.text)}
            <div dir="rtl" className="heb" style={{ fontSize: 15, color: C.ink, marginTop: 5, lineHeight: 1.7 }}>{d.reason.heb}</div>
            <div style={{ fontSize: 11, color: C.sub, marginTop: 3 }}>— {he ? d.reason.src.he : d.reason.src.label}</div>
          </div>
        )}
        {d.flags && d.flags.map((f, i) => <div key={i} style={{ marginTop: 8, fontSize: 12, color: C.flag, background: C.flagSoft, border: `1px solid ${C.flag}`, borderRadius: 6, padding: "7px 10px", lineHeight: 1.45 }} className={he ? "heb" : ""}><span style={{ fontWeight: 700 }}>⚑ </span>{tr(lang, f)}</div>)}
        <div style={{ marginTop: 10, fontSize: 11.5, color: C.tekhelet, fontWeight: 600 }} className="no-print">{open ? tr(lang, T.hideSource) : tr(lang, T.showSource)}</div>
      </button>
      {open && (
        <div style={{ borderTop: `1px solid ${C.line}`, background: "#fff", padding: "14px 16px" }}>
          <div dir="rtl" className="heb" style={{ fontSize: 18, lineHeight: 1.9 }}>{d.heb}</div>
          <div style={{ marginTop: 8, fontSize: 11, color: C.sub }} className={he ? "heb" : ""}>— {tr(lang, d.hebSrc)}</div>
          <div style={{ marginTop: 10, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.sub }} className={he ? "heb" : ""}>{tr(lang, T.haftaraText)}:</span>
            {d.haftarot.filter(h => naviUrl(h.range)).map((h, i) => (
              <a key={i} href={naviUrl(h.range)} target="_blank" rel="noreferrer" style={{ fontSize: 11.5, fontWeight: 700, textDecoration: "none", color: "#fff", background: C.tekhelet, borderRadius: 999, padding: "3px 10px" }}>{h.range} ↗</a>
            ))}
          </div>
          <div style={{ marginTop: 8, display: "flex", gap: 8, flexWrap: "wrap", alignItems: "baseline" }}>
            <span style={{ fontSize: 11, fontWeight: 700, color: C.sub }} className={he ? "heb" : ""}>{tr(lang, T.halachicSource)}:</span>
            {d.sources.map((s, i) => <a key={i} href={s.url} target="_blank" rel="noreferrer" style={{ fontSize: 11.5, fontWeight: 600, color: C.tekhelet, textDecoration: "none", border: `1px solid ${C.tekhelet}`, borderRadius: 999, padding: "3px 10px" }}>{he ? s.he : s.label} ↗</a>)}
          </div>
        </div>
      )}
    </div>
  );
}

export default function HaftarahReference() {
  const [cat, setCat] = useState("All");
  const [q, setQ] = useState("");
  const [lang, setLang] = useState("en");
  const he = lang === "he";

  const rows = useMemo(() => {
    const term = q.trim().toLowerCase();
    return DATA.filter(d => cat === "All" || d.cat === cat).filter(d => {
      if (!term) return true;
      const hay = (d.occ.en + " " + d.occ.he + " " + d.heb + " " + d.haftarot.map(h => h.en + h.inc + h.range + h.trad).join(" ")).toLowerCase();
      return hay.includes(term);
    });
  }, [cat, q]);

  const weeklyRows = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!(cat === "All" || cat === "Weekly Cycle")) return [];
    return WEEKLY.filter(w => !term || (w.p + w.pHe + w.inc + w.end + w.book + w.range).toLowerCase().includes(term));
  }, [cat, q]);

  const btn = (active) => ({ fontSize: 12.5, fontWeight: 600, padding: "6px 12px", borderRadius: 999, cursor: "pointer", border: `1px solid ${active ? C.tekhelet : C.line}`, background: active ? C.tekhelet : "transparent", color: active ? "#fff" : C.sub, fontFamily: "Georgia, serif" });

  return (
    <div dir={he ? "rtl" : "ltr"} style={{ background: C.bg, minHeight: "100vh", padding: "28px 18px", color: C.ink, fontFamily: he ? "'Frank Ruhl Libre', Georgia, serif" : "Georgia, 'Times New Roman', serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@400;500;700&display=swap');
        .heb { font-family: 'Frank Ruhl Libre','Times New Roman',serif; }
        a { color: ${C.tekhelet}; }
        @media print { .no-print { display:none !important; } .card { break-inside: avoid; border:1px solid #999 !important; } }
      `}</style>

      <div style={{ maxWidth: 820, margin: "0 auto" }}>
        <header style={{ borderBottom: `2px solid ${C.tekhelet}`, paddingBottom: 14, marginBottom: 8 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", gap: 12, flexWrap: "wrap" }}>
            <div style={{ fontSize: 11, letterSpacing: he ? "0" : "0.14em", textTransform: he ? "none" : "uppercase", color: C.gold, fontWeight: 700 }} className={he ? "heb" : ""}>{tr(lang, T.eyebrow)}</div>
            <div style={{ display: "flex", gap: 8 }} className="no-print">
              <div style={{ display: "flex", borderRadius: 999, overflow: "hidden", border: `1px solid ${C.tekhelet}` }}>
                <button onClick={() => setLang("en")} style={{ fontSize: 12, fontWeight: 700, padding: "5px 12px", cursor: "pointer", border: "none", background: !he ? C.tekhelet : "transparent", color: !he ? "#fff" : C.tekhelet, fontFamily: "Georgia, serif" }}>EN</button>
                <button onClick={() => setLang("he")} style={{ fontSize: 13, fontWeight: 700, padding: "5px 12px", cursor: "pointer", border: "none", background: he ? C.tekhelet : "transparent", color: he ? "#fff" : C.tekhelet, fontFamily: "'Frank Ruhl Libre', serif" }}>עברית</button>
              </div>
              <button onClick={() => window.print()} style={{ fontSize: 12, fontWeight: 700, color: "#fff", background: C.tekhelet, border: "none", borderRadius: 999, padding: "6px 14px", cursor: "pointer", fontFamily: he ? "'Frank Ruhl Libre', serif" : "Georgia, serif" }}>{tr(lang, T.print)}</button>
            </div>
          </div>
          <h1 style={{ margin: "8px 0 0", fontSize: 28, fontWeight: 800 }} className={he ? "heb" : ""}>{tr(lang, T.title)}</h1>
          <p style={{ margin: "8px 0 0", fontSize: 13.5, color: C.sub, lineHeight: 1.55 }} className={he ? "heb" : ""}>{tr(lang, T.subtitle)}</p>
        </header>

        {/* PROVENANCE */}
        <div style={{ margin: "16px 0", border: `1px solid ${C.line}`, borderRadius: 10, background: C.panel, padding: "16px 18px" }}>
          <h2 style={{ margin: "0 0 3px", fontSize: 17, fontWeight: 800 }} className={he ? "heb" : ""}>{tr(lang, T.provTitle)}</h2>
          <p style={{ margin: "0 0 12px", fontSize: 12.5, color: C.sub, lineHeight: 1.5 }} className={he ? "heb" : ""}>{tr(lang, T.provIntro)}</p>
          {LINEAGE.map((t, i) => (
            <div key={i} style={{ display: "flex", gap: 12, padding: "10px 0", borderTop: i ? `1px solid ${C.line}` : "none" }}>
              <span style={{ width: 8, height: 8, borderRadius: 999, background: L[t.layer].color, marginTop: 6, flexShrink: 0 }} />
              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "baseline", flexWrap: "wrap" }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700 }} className={he ? "heb" : ""}>{tr(lang, t.tier)}</span>
                  <LayerBadge k={t.layer} lang={lang} />
                  <span style={{ fontSize: 10, fontWeight: 700, color: t.anchor === "sefaria" ? "#0F766E" : C.flag, background: t.anchor === "sefaria" ? "#DEF0EE" : C.flagSoft, padding: "2px 7px", borderRadius: 999 }} className={he ? "heb" : ""}>{t.anchor === "sefaria" ? tr(lang, T.onSefaria) : tr(lang, T.citedOnly)}</span>
                </div>
                <div style={{ fontSize: 12.5, color: C.ink, marginTop: 4, lineHeight: 1.5 }} className={he ? "heb" : ""}>{tr(lang, t.what)}</div>
                <div style={{ fontSize: 11.5, color: C.sub, marginTop: 4, lineHeight: 1.45 }} className={he ? "heb" : ""}><span style={{ fontWeight: 700 }}>{tr(lang, T.source)}: </span>{tr(lang, t.cite)}</div>
                {t.cites.length > 0 && <div style={{ marginTop: 6, display: "flex", gap: 6, flexWrap: "wrap" }}>{t.cites.map((c, j) => <a key={j} href={c.url} target="_blank" rel="noreferrer" style={{ fontSize: 11, fontWeight: 600, textDecoration: "none", border: `1px solid ${C.tekhelet}`, borderRadius: 999, padding: "2px 9px" }} className={he ? "heb" : ""}>{he ? c.he : c.label}</a>)}</div>}
              </div>
            </div>
          ))}
        </div>

        {/* legend + filters */}
        <div className="no-print" style={{ display: "flex", flexWrap: "wrap", gap: 6, margin: "0 0 12px" }}>
          {Object.keys(L).map(k => <span key={k} style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, color: C.sub }} className={he ? "heb" : ""}><span style={{ width: 11, height: 11, borderRadius: 3, background: L[k].color }} />{L[k][lang]}</span>)}
        </div>
        <div className="no-print" style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 10 }}>
          {CATS.map(c => <button key={c} onClick={() => setCat(c)} style={btn(cat === c)} className={he ? "heb" : ""}>{catName(lang, c)}</button>)}
        </div>
        <input className="no-print" value={q} onChange={e => setQ(e.target.value)} placeholder={tr(lang, T.search)} style={{ width: "100%", boxSizing: "border-box", padding: "10px 14px", fontSize: 14, borderRadius: 8, border: `1px solid ${C.line}`, background: C.panel, color: C.ink, marginBottom: 16, fontFamily: he ? "'Frank Ruhl Libre', serif" : "Georgia, serif", outline: "none", textAlign: he ? "right" : "left" }} />

        {/* WEEKLY */}
        {weeklyRows.length > 0 && (
          <div style={{ marginBottom: 14 }}>
            {cat === "All" && <h2 style={{ margin: "0 0 8px", fontSize: 16, fontWeight: 800 }} className={he ? "heb" : ""}>{tr(lang, T.weeklyHeader)}</h2>}
            {(cat === "All" || cat === "Weekly Cycle") && !q && (
              <div style={{ fontSize: 12, color: C.ink, background: C.flagSoft, border: `1px solid ${C.flag}`, borderRadius: 8, padding: "9px 12px", lineHeight: 1.5, marginBottom: 10 }} className={he ? "heb" : ""}>
                <span style={{ fontWeight: 700, color: C.flag }}>{tr(lang, T.riteCoverage)} · </span>{tr(lang, T.riteNote)}
                <div style={{ marginTop: 6, paddingTop: 6, borderTop: `1px solid ${C.rule}` }}>{tr(lang, T.chabadNote)} <a href={S.srav.url} target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>{he ? S.srav.he : S.srav.label} ↗</a> <span style={{ color: C.line }}>·</span> <a href={S.srav11.url} target="_blank" rel="noreferrer" style={{ fontWeight: 700 }}>{he ? S.srav11.he : S.srav11.label} ↗</a></div>
              </div>
            )}
            {weeklyRows.map((w, i) => <WeeklyRow key={i} w={w} lang={lang} />)}
            {(cat === "All" || cat === "Weekly Cycle") && !q && (
              <div style={{ fontSize: 12, color: C.ink, background: C.goldSoft, border: `1px solid ${C.rule}`, borderRadius: 8, padding: "9px 12px", lineHeight: 1.5 }} className={he ? "heb" : ""}>
                <span style={{ fontWeight: 700, color: C.gold }}>{tr(lang, T.remaining)} · </span>{tr(lang, T.weeklyTail)}
              </div>
            )}
          </div>
        )}

        {/* FESTIVAL / SPECIAL */}
        {rows.map((d, i) => <Row key={i} d={d} lang={lang} />)}
        {rows.length === 0 && weeklyRows.length === 0 && <div style={{ textAlign: "center", color: C.sub, fontSize: 14, padding: "30px 0" }} className={he ? "heb" : ""}>{tr(lang, T.nothing)}</div>}

        <footer style={{ marginTop: 20, paddingTop: 14, borderTop: `1px solid ${C.line}`, fontSize: 11.5, color: C.sub, lineHeight: 1.65 }} className={he ? "heb" : ""}>
          {tr(lang, T.footer)}
        </footer>
      </div>
    </div>
  );
}
