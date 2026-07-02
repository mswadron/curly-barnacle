import { useState, useCallback, useRef, useMemo, useEffect, createContext, useContext } from "react";

/* ═══ CONTEXT ═══ */
const Ctx = createContext({lang:"he",setLang:()=>{},theme:"light",setTheme:()=>{}});
function useCtx(){return useContext(Ctx);}
function tx(l,h,e,se){return l==="he"?h:l==="se"?seph(se||e):e;}

/* ═══ GLOSSARY — Ashkenazi + Sephardic ═══ */
const G={baheres:"Baheres (intense white spot)",seis:"S'eis (rising/swelling)",sapachas:"Sapachas (secondary shade)",michya:"Michya (raw/living flesh)",pisyon:"Pisyon (spreading)",nesek:"Nesek (scalp/beard nega)",shechin:"Shechin (healed boil)",michva:"Michvas Eish (burn)",bohak:"Bohak (dull white rash)",karachas:"Karachas (back bald)",gabachas:"Gabachas (front bald)",mameres:"Mameres (malignant)",pecheses:"Pecheses (entrenched)",porachas:"Porachas (recurring)",keihah:"Keihah (faded)",musgar:"Musgar (confined)",muchlat:"Muchlat (confirmed tamei)",gris:"Gris (min. nega size)",tzareves:"Tzareves (scar tissue)",noshenes:"Noshenes (chronic)",pruim:"Pruim (torn garments)",parua:"Paru'a (unshorn hair)",yerakrak:"Yerakrak (deep green)",adamdam:"Adamdam (deep red)"};

/* Sephardic pronunciation — just the words that differ */
const SEPH={
"Baheres":"Baheret","baheres":"baheret",
"S'eis":"Se'et","s'eis":"se'et",
"Sapachas":"Sapahat","sapachas":"sapahat",
"Tzara'as":"Tzara'at","tzara'as":"tzara'at",
"Nesek":"Netek","nesek":"netek",
"Mameres":"Mameret","mameres":"mameret",
"Pecheses":"Peheset","pecheses":"peheset",
"Porachas":"Porahat","porachas":"porahat",
"Noshenes":"Noshenet","noshenes":"noshenet",
"Tzareves":"Tzarevet","tzareves":"tzarevet",
"Karachas":"Qarahat","karachas":"qarahat",
"Gabachas":"Gabahat","gabachas":"gabahat",
"Michvas Eish":"Mikhvat Esh",
"Mispachas":"Mispahat","mispachas":"mispahat",
"Muchlat":"Muhlat","muchlat":"muhlat",
"tamei":"tame","Tamei":"Tame","TAMEI":"TAME",
"tumah":"tum'ah","Tumah":"Tum'ah",
"Musgar":"Musgar",
"Pruim":"Perumim",
"Shechin":"Shehin","shechin":"shehin",
};
function seph(s){if(!s)return s;let r=s;for(const[k,v]of Object.entries(SEPH)){r=r.split(k).join(v);}return r;}
function se(lang,t){return lang==="se"?seph(t):t;}
function gl(l,k){return l==="se"?seph(G[k]):G[k];};

/* ═══ SOURCES ═══ */
function mkS(p,m,h,e,r){return{pasuk:p,mishnah:m,he:h,en:e,rambam:r||null};}
const S={
fourShades:mkS("ויקרא יג:ב","נגעים א:א","מראות נגעים שנים שהן ארבע","The appearances of nega'im are two that are four","א:א"),
kohenOnly:mkS("ויקרא יג:ב","נגעים ג:א","הכהן מטמא ומטהר","Only a Kohen can declare tamei or tahor","א:א"),
whiteHair:mkS("ויקרא יג:ג","נגעים ד:ד","שער לבן — סימן טומאה","White hair — a sign of tumah","ב:ב"),
deeper:mkS("ויקרא יג:ג","נגעים א:א",'עמוק — כחמה לעומת צל (רש"י)',"Deeper — like sunlight vs. shade (Rashi)"),
hesger:mkS("ויקרא יג:ד-ה","נגעים ג:ג","הסגיר — שבעת ימים","Hesger (confinement) — seven days"),
spreading:mkS("ויקרא יג:ז","נגעים ג:ה","פשיון — סימן טומאה","Pisyon (spreading) — a sign of tumah"),
michya:mkS("ויקרא יג:י","נגעים ד:ג","מחיית בשר חי — סימן טומאה","Michya (raw flesh) — a sign of tumah","ג:א"),
fullBody:mkS("ויקרא יג:יב-יג","נגעים ח:א","פרחה בכולו — טהור","Entire body covered — tahor","ז:א"),
fullBodyRaw:mkS("ויקרא יג:יד-טו",null,"בשר חי בפורח — טמא","Raw flesh in full coverage — tamei","ז:א"),
shechin:mkS("ויקרא יג:יח-כג","נגעים ט:א","שחין — שלא מחמת האש","Shechin — wound NOT caused by fire","ה:ג"),
burn:mkS("ויקרא יג:כד-כח","נגעים ט:א","מכוית אש","Burn from fire/heat","ה:ג"),
oneHesger:mkS("ויקרא יג:כא,כו","נגעים ג:ד","שחין/מכוה — הסגר אחד בלבד","Shechin/burn — only ONE hesger","ה:ג"),
nesek:mkS("ויקרא יג:כט-לב","נגעים י:א","נתק — ראש/זקן","Nesek — nega on the head or beard","ח:א"),
yellowHair:mkS("ויקרא יג:ל","נגעים י:א","שער צהוב דק — סימן בנתק","Thin yellow hair — the tumah sign in nesek","ח:ב"),
nesekSpread:mkS("ויקרא יג:לה-לו","נגעים י:א","נתק פשה — לא יבקש לשער הצהוב","Nesek spread — no need to check yellow hair","ח:א"),
shaving:mkS("ויקרא יג:לג","נגעים י:ה","גילוח סביב הנתק","Shave around the nesek, not the nesek itself","ח:א"),
blackHair:mkS("ויקרא יג:לז","נגעים י:ט","שער שחור — סימן ריפוי","Black hair — a sign of healing"),
bohak:mkS("ויקרא יג:לח-לט",null,"בהק — לבן כהה מתחת לארבע מראות. טהור","Bohak — dull white below the four shades. Tahor"),
baldness:mkS("ויקרא יג:מ-מד","נגעים י:י","קרחת/גבחת — מחיה ופשיון בלבד","Karachas/Gabachas — signs are michya and spreading only","י:א"),
metzora:mkS("ויקרא יג:מה-מו","נגעים יג:יב","בדד ישב מחוץ למחנה מושבו","He shall dwell alone, outside the camp"),
clothing:mkS("ויקרא יג:מז-נט","נגעים יא:א","נגע בבגד צמר/פשתים","Nega in a garment of wool or linen","יב:א"),
selfExam:mkS("—","נגעים ב:ה","חוץ מנגעי עצמו","A person may examine all nega'im except his own"),
lightReq:mkS("—","נגעים ב:ב","אין רואין בשחרית/ערביים/בית","Nega'im may not be examined early morning, late afternoon, or indoors","ט:ו"),
grisSize:mkS("—","נגעים ו:א","כגריס הקלקי מרובע","Minimum size — like a Cilician gris, squared","א:ג"),
hairOrder:mkS("ויקרא יג:ג","נגעים ד:יא","נזקקין לסדר הופעה","The order of appearance matters","ב:ב"),
unkOrder:mkS("—","נגעים ד:יא","ספק — ר׳ יהושע: כהה. סתם משנה: טמא","Uncertain — Stam Mishnah: tamei. R' Yehoshua: keihah","ב:ט"),
houses:mkS("ויקרא יד:לג-נג","נגעים יב:א","נגע צרעת בבית — בארץ ישראל בלבד","House tzara'as — only in Eretz Yisrael, after conquest and division"),
housesColor:mkS("ויקרא יד:לז","נגעים יב:ה","שקערורות ירקרקות/אדמדמות, עמוק מן הקיר","Greenish/reddish streaks appearing deeper than the wall"),
housesEmpty:mkS("ויקרא יד:לו",null,"ופנו את הבית בטרם יבא הכהן — להציל הכלים מטומאה","Empty the house BEFORE the Kohen enters — to save contents from tumah"),
housesDemolish:mkS("ויקרא יד:מג-מה",null,"צרעת ממארת — ונתץ את הבית, אבניו ועציו וכל עפרו","Mameres — demolish the house: stones, wood, and all plaster"),
housesClean:mkS("ויקרא יד:מח",null,"לא פשה אחרי הטיח — וטהר את הבית","Did not spread after replastering — the Kohen declares it tahor"),
houseSize:mkS("—","נגעים יב:ג","שיעור נגע הבית: כשני גריסין — לא אחד כנגעי עור","House nega minimum: two gris (not one like skin)"),
beisHastarim:mkS("—","נגעים ו:ח","בית הסתרים אינו מיטמא בנגעים","Hidden body areas (beis hastarim) are not subject to nega'im"),
groomDeferral:mkS("—","נגעים ג:ב","חתן — נותנין לו שבעת ימי המשתה. וכן ברגל","A groom gets his 7 celebration days. Same for a festival (Regel)"),
skinExamRule:mkS("—","נגעים ב:ד","בני ישראל כאשכרוע — בינונים. נראין בבשר הבינוני","Bnei Yisrael are intermediate. Examined on average-toned skin"),
/* Taharah / remedy sources */
muchlat:mkS("ויקרא יג:מה-מו","נגעים יג:יב","בגדיו פרומים, ראשו פרוע, וטמא טמא יקרא. בדד ישב","Garments torn, hair unshorn, calls 'Tamei!' Dwells alone outside the camp"),
taharahBirds:mkS("ויקרא יד:ב-ז",null,"שתי צפרים חיות טהורות, עץ ארז, שני תולעת ואזוב","Two live tahor birds, cedar wood, scarlet yarn, and hyssop"),
taharahShave:mkS("ויקרא יד:ח-ט",null,"יום ז: גילוח כל שערו — ראש, זקן, גבות — וטבל","Day 7: shave ALL hair — head, beard, eyebrows — and immerse in mikvah"),
taharahKorban:mkS("ויקרא יד:י-כ",null,"יום ח: שני כבשים ועשרון סולת. אשם + חטאת + עולה. דל: שתי תורים","Day 8: two lambs + flour. Asham + Chatas + Olah. Poor person: two turtledoves"),
clothingBurn:mkS("ויקרא יג:נב","נגעים יא:א","ושרף את הבגד — צמר או פשתים או עור","Burn the garment — wool, linen, or leather"),
houseTaharah:mkS("ויקרא יד:מח-נג",null,"וטהר הכהן את הבית. שתי צפרים, ארז, שני, אזוב — כטהרת המצורע","Kohen declares tahor. Two birds, cedar, scarlet, hyssop — same as metzora taharah"),
};

/* ═══ SOURCE TEXTS ═══ */
const PK={"יג:ב":{h:"אָדָם כִּי יִהְיֶה בְעוֹר בְּשָׂרוֹ שְׂאֵת אוֹ סַפַּחַת אוֹ בַהֶרֶת... וְהוּבָא אֶל אַהֲרֹן הַכֹּהֵן אוֹ אֶל אַחַד מִבָּנָיו הַכֹּהֲנִים.",e:"When a person has on the skin of his body a s'eis, sapachas, or baheres... he shall be brought to Aharon the Kohen or one of his sons.",rh:"שאת — לשון גבהות. ספחת — טפילה. בהרת — לבנה עזה. והובא אל אהרן — גזירת הכתוב שטומאת נגעים וטהרתן על פי כהן.",re:"S'eis — rising. Sapachas — secondary shade. Baheres — intensely white. 'Brought to Aharon' — Torah decree: tumah/taharah only through a Kohen."},"יג:ג":{h:"וְרָאָה הַכֹּהֵן... וְשֵׂעָר בַּנֶּגַע הָפַךְ לָבָן וּמַרְאֵה הַנֶּגַע עָמֹק מֵעוֹר בְּשָׂרוֹ נֶגַע צָרַעַת הוּא...",e:"The Kohen shall look: if the hair turned white and it appears deeper — it is tzara'as, and the Kohen declares him tamei.",rh:"הפך לבן — סימן טומאה, ומיעוט שיער שנים. עמוק — מראה חמה עמוקה מן הצל.",re:"White hair — tumah sign; minimum two hairs. Deeper — like sunlight appears deeper than shade."},"יג:ד-ה":{h:"וְאִם בַּהֶרֶת לְבָנָה... וְהִסְגִּיר הַכֹּהֵן אֶת הַנֶּגַע שִׁבְעַת יָמִים... וְהִסְגִּירוֹ שִׁבְעַת יָמִים שֵׁנִית.",e:"If not deeper and hair not white — the Kohen confines him 7 days. On day 7 if same — confines 7 more days.",rh:"והסגיר — יסגירנו לבדו. עמד בעיניו — לא נתוסף ולא נתמעט.",re:"Confine alone. Stayed the same — neither increased nor decreased."},"יג:ו":{h:"... כֵּהָה הַנֶּגַע וְלֹא פָשָׂה... וְטִהֲרוֹ הַכֹּהֵן מִסְפַּחַת הִוא וְכִבֶּס בְּגָדָיו וְטָהֵר.",e:"If it faded and didn't spread — tahor; it is a mispachas. He washes his clothes and is tahor.",rh:"כהה — נתמעט מארבע מראות. מספחת — אינה צרעת. וכבס בגדיו — שהמוסגר מטמא בגדים.",re:"Faded — below four shades. Mispachas — not tzara'as. Wash clothes — musgar transmits tumah to clothing."},"יג:ז":{h:"וְאִם פָּשֹׂה תִפְשֶׂה הַמִּסְפַּחַת בָּעוֹר אַחֲרֵי הֵרָאֹתוֹ...",e:"But if the mispachas spread after being shown to the Kohen — he returns.",rh:"אחרי שטיהרו, אם פשתה — יחזור.",re:"After declared tahor, if it spread — returns to the Kohen."},"יג:י":{h:"... שְׂאֵת לְבָנָה... הָפְכָה שֵׂעָר לָבָן וּמִחְיַת בָּשָׂר חַי בַּשְׂאֵת.",e:"White rising that turned hair white, with michya (living flesh).",rh:"מחית בשר חי — בשר שנשאר כברייתו בתוך הנגע, סימן טומאה.",re:"Michya — flesh remaining natural within the nega; a tumah sign."},"יג:יב-יג":{h:"... פָּרוֹחַ תִּפְרַח הַצָּרַעַת... כִסְּתָה אֶת כָּל בְּשָׂרוֹ... כֻּלּוֹ הָפַךְ לָבָן טָהוֹר הוּא.",e:"If tzara'as covers all his flesh — tahor; it all turned white.",rh:"אין כאן נגע ניכר. כשכולו לבן אין היכר.",re:"No distinct nega. All white = no distinction."},"יג:יד-טו":{h:"וּבְיוֹם הֵרָאוֹת בּוֹ בָּשָׂר חַי יִטְמָא...",e:"When raw flesh appears — tamei.",rh:"שאם פרחה בכולו ונראה בשר חי, חזר לטומאתו.",re:"If covered everything then raw flesh appeared — returns to tumah."},"יג:יח-כג":{h:"... שְׁחִין וְנִרְפָּא...",e:"Shechin (boil) that heals...",rh:"שחין — מכה שלא מחמת האש.",re:"Shechin — wound not from fire."},"יג:כא,כו":{h:"... וְהִסְגִּירוֹ שִׁבְעַת יָמִים.",e:"The Kohen confines him seven days.",rh:"שחין ומכוה — הסגר אחד בלבד.",re:"Shechin/burn — one confinement only."},"יג:כד-כח":{h:"... מִכְוַת אֵשׁ...",e:"Burn from fire...",rh:"שנכוה באש או בגחלת או ברותחין שהוחמו באש.",re:"Burned by fire, coal, or hot liquids heated by fire."},"יג:כט-לב":{h:"... נָגַע בְּרֹאשׁ אוֹ בְזָקָן...",e:"A nega on the head or beard...",rh:"מקום שיער, וזהו נתק.",re:"A hairy area; this is a nesek."},"יג:ל":{h:"... מַרְאֵהוּ עָמֹק... וּבוֹ שֵׂעָר צָהֹב דָּק — נֶתֶק הוּא.",e:"If deeper and thin yellow hair — it is a nesek.",rh:"שער צהב — ולא לבן. דק — קצר.",re:"Yellow — not white. Thin — short."},"יג:לג":{h:"וְהִתְגַּלָּח וְאֶת הַנֶּתֶק לֹא יְגַלֵּחַ...",e:"He shall shave but not the nesek itself.",rh:"סביבות הנתק. ואת הנתק לא יגלח.",re:"Around the nesek. Not the nesek itself."},"יג:לה-לו":{h:"... פָּשֹׂה יִפְשֶׂה הַנֶּתֶק... לֹא יְבַקֵּשׁ לַשֵּׂעָר הַצָּהֹב טָמֵא הוּא.",e:"If the nesek spread — tamei. He need not check for yellow hair.",rh:"לא יבקש — הפשיון לבדו מטמא.",re:"Need not check — spreading alone makes tamei."},"יג:לז":{h:"... שֵׂעָר שָׁחֹר צָמַח בּוֹ — נִרְפָּא הַנֶּתֶק טָהוֹר הוּא.",e:"If black hair grew — nesek is healed; tahor.",rh:"שער שחור — סימן טהרה, אפילו שתי שערות.",re:"Black hair — healing sign; even two hairs."},"יג:לח-לט":{h:"... בֶּהָרֹת לְבָנֹת... בֹּהַק הוּא... טָהוֹר הוּא.",e:"White spots... bohak... tahor.",rh:"בהק — לבן שאין בו עז כארבע מראות. אינו צרעת.",re:"Bohak — white not as intense as four shades. Not tzara'as."},"יג:מ-מד":{h:"... קֵרֵחַ הוּא טָהוֹר... נֶגַע לָבָן אֲדַמְדָּם — צָרַעַת פֹּרַחַת...",e:"Bald — tahor... But reddish-white nega — it is tzara'as.",rh:"קרח — מאחוריו. גבח — מלפניו. הסימנים: מחיה ופשיון.",re:"Keireach — behind. Gibeiach — front. Signs: michya and spreading."},"יג:מה-מו":{h:"... בְּגָדָיו פְרֻמִים וְרֹאשׁוֹ פָרוּעַ... וְטָמֵא טָמֵא יִקְרָא. בָּדָד יֵשֵׁב...",e:"Garments torn, head unshorn, calls 'Tamei!' Dwells alone, outside the camp.",rh:"כאבל. מודיע צערו ורבים מבקשים רחמים. הבדיל בלה\"ר — לפיכך יבדל.",re:"Like a mourner. Announces distress so others pray. Separated via lashon hara — so separated."},"יג:מז-נט":{h:"... נֶגַע צָרָעַת בְּבֶגֶד צֶמֶר אוֹ בְּבֶגֶד פִּשְׁתִּים.",e:"Tzara'as in a garment of wool or linen.",rh:"צמר או פשתים — ולא בשאר מינים. כשעטנז.",re:"Wool or linen only — like sha'atnez, mentioned together."}};
const MN={"נגעים א:א":{h:"מראות נגעים שנים שהן ארבע. בהרת עזה כשלג, שנייה לה כסיד ההיכל. השאת כקרום ביצה, שנייה לה כצמר לבן — ר׳ מאיר. וחכמים: השאת כצמר לבן, שנייה כקרום ביצה.",e:"Appearances: two that are four. Baheres=snow, secondary=plaster. R' Meir: S'eis=egg, secondary=wool. Chachamim: S'eis=wool, secondary=egg."},"נגעים ב:ב":{h:"אין רואין הנגעים בשחרית ולא בין הערביים, ולא בתוך הבית, ולא ביום המעונן. ולא בצהרים.",e:"Not examined early morning, late afternoon, indoors, cloudy, or midday."},"נגעים ב:ה":{h:"כל הנגעים אדם רואה, חוץ מנגעי עצמו. ר׳ מאיר: אף לא נגעי קרוביו.",e:"One may examine all except his own. R' Meir: not even relatives'."},"נגעים ג:א":{h:"הכל כשרים לראות, אלא שהטומאה והטהרה בידי כהן.",e:"Everyone qualified to examine, but tumah/taharah through a Kohen."},"נגעים ג:ג":{h:"כל הנגעים — בתחילה כהן רואהו. פשה — טמא. עמד — מסגירו שבעת ימים.",e:"All nega'im — Kohen sees first. Spread=tamei. Same=confine 7 days."},"נגעים ג:ד":{h:"שחין ומכוה — מסגירן שבעת ימים. פשה — טמא, לאו — טהור.",e:"Shechin/burn — confine 7 days. Spread=tamei; not=tahor."},"נגעים ג:ה":{h:"הפשיון — סימן טומאה בכל הנגעים.",e:"Spreading — tumah sign in all nega'im."},"נגעים ד:ג":{h:"המחיה סימן טומאה בנגעי עור הבשר.",e:"Michya — tumah sign in skin nega'im."},"נגעים ד:ד":{h:"שער לבן סימן טומאה. ומיעוט שער — שתים.",e:"White hair — tumah sign. Minimum: two hairs."},"נגעים ד:יא":{h:"ספק שקדם שער ספק שקדמה בהרת — טמא. ר׳ יהושע: כהה.",e:"Uncertain order: tamei. R' Yehoshua: keihah."},"נגעים ו:א":{h:"שיעור בהרת — כגריס הקלקי מרובע.",e:"Minimum: Cilician gris, squared."},"נגעים ח:א":{h:"הפורח מן הטמא — טהור. מן הטהור — טמא.",e:"Covers tamei person — tahor. Covers tahor person — tamei."},"נגעים ט:א":{h:"השחין והמכוה — מיטמאין בשבוע אחד בשני סימנין.",e:"Shechin/burn — tamei through 1 week, 2 signs."},"נגעים י:א":{h:"הנתקים — מיטמאין בשער צהוב דק ובפשיון.",e:"Nesakim — tamei by thin yellow hair and spreading."},"נגעים י:ה":{h:"מגלח חוצה לו, כדי שיהא הפשיון ניכר.",e:"Shave outside it so spreading is visible."},"נגעים י:ט":{h:"שער שחור מציל בנתק. שיעורו — שתי שערות.",e:"Black hair saves in nesek. Minimum: 2 hairs."},"נגעים י:י":{h:"הקרחת והגבחת — במחיה ובפשיון, שני שבועות.",e:"Karachas/gabachas — michya and spreading, two weeks."},"נגעים יא:א":{h:"בגדי צמר ופשתים — מיטמאין בנגעים.",e:"Wool/linen garments become tamei."},"נגעים יג:יב":{h:"כל זמן שהוא מוחלט — בגדיו פרומים וראשו פרוע.",e:"While muchlat — clothes torn, head unshorn."},
"נגעים יב:א":{h:"כל הבתים מיטמאין בנגעים, חוץ משל עובדי כוכבים.",e:"All houses become tamei through nega'im, except those of idolaters."},
"נגעים יב:ג":{h:"שיעור הנגע בבית — כשני גריסין.",e:"Minimum house nega size — two gris."},
"נגעים יב:ה":{h:"הנגע בבית — שקערורות ירקרקות או אדמדמות, שפלות מן הקיר.",e:"House nega — greenish/reddish streaks, lower/deeper than the wall surface."},
"נגעים ב:ד":{h:"הגרמני נראה בבשרו הכהה, והכושי נראה בבשרו הלבן. ר׳ ישמעאל אומר: בני ישראל — הרי הם כאשכרוע, לא לבנים ולא שחורים אלא בינונים.",e:"A German (fair-skinned person) is examined on his darker areas; a Kushite (dark-skinned) on his lighter areas. R' Yishmael: Bnei Yisrael are intermediate — like boxwood."},
"נגעים ג:ב":{h:"חתן שנראה בו נגע — נותנין לו שבעת ימי המשתה, לו ולביתו ולכסותו. וכן ברגל — נותנין לו כל ימות הרגל.",e:"A groom in whom a nega appears — he is given his seven days of celebration, for himself, his house, and his clothing. Similarly during a festival — he is given all the days of the festival."},
"נגעים ו:ח":{h:"בית הסתרים — אינו מיטמא בנגעים: תוך העין, תוך האוזן, תוך החוטם, תוך הפה, הקמטים, קמטי הצואר, תחת הדד, בית השחי, כף הרגל, הציפורן, הראש והזקן... כל שאינו נראה בבת אחת.",e:"Hidden areas (beis hastarim) do not become tamei through nega'im: inside the eye, ear, nose, mouth, skin folds, neck folds, under breasts, armpits, sole of foot, under nails, head/beard hair area... any area not visible at a single glance."},
};
const RM={"א:א":{h:'ארבע מראות נגעים... בהרת כשלג. שאת כצמר לבן. שניה לבהרת כסיד. שניה לשאת כקרום ביצה.',e:"Four appearances: Baheres=snow. S'eis=wool. Secondary to baheres=plaster. Secondary to s'eis=egg.",ref:"טומאת צרעת א:א"},"א:ג":{h:'שיעור הבהרת כגריס הקלקי מרובע, רחב ארבע שערות.',e:"Minimum: Cilician gris squared — width of four hairs.",ref:"טומאת צרעת א:ג"},"ב:ב":{h:'שער לבן — שתי שערות לא פחות, שיהפכו לבנות אחר הנגע.',e:"White hair: at least two, turned white after the nega.",ref:"טומאת צרעת ב:ב"},"ב:ט":{h:'ספק שער לבן קדם ספק בהרת קדמה — טמא.',e:"Uncertain which came first — tamei.",ref:"טומאת צרעת ב:ט"},"ג:א":{h:'מחיה — בשר כברייתו בתוך הבהרת, שיעורה כעדשה מרובעת.',e:"Michya: natural flesh inside the baheres, minimum lentil-square.",ref:"טומאת צרעת ג:א"},"ה:ג":{h:'צרבת השחין ומחית המכוה — בשער לבן ובפשיון, הסגר שבוע אחד.',e:"Shechin/burn crust — white hair and spreading, one week hesger.",ref:"טומאת צרעת ה:ג"},"ז:א":{h:'מי שהלבין כולו — טהור. נראה בשר חי — טמא.',e:"Entirely white — tahor. Raw flesh appears — tamei.",ref:"טומאת צרעת ז:א"},"ח:א":{h:'הנתקים — בשער צהוב דק ובפשיון.',e:"Nesakim: thin yellow hair and spreading.",ref:"טומאת צרעת ח:א"},"ח:ב":{h:'שער צהוב דק — שתי שערות, לא פחות.',e:"Thin yellow hair: two hairs, no fewer.",ref:"טומאת צרעת ח:ב"},"ט:ו":{h:'אין רואין הנגעים אלא בשעות ד ה ח ט.',e:"Examine only during hours 4, 5, 8, 9.",ref:"טומאת צרעת ט:ו"},"י:א":{h:'קרחת וגבחת — במחיה ובפשיון, הסגר שני שבועות.',e:"Karachas/gabachas: michya and spreading, two weeks hesger.",ref:"טומאת צרעת י:א"},"יב:א":{h:'נגע הבגדים — אינו בא אלא בצמר או פשתים או עור.',e:"Clothing nega'im: only wool, linen, or leather.",ref:"טומאת צרעת יב:א"}};

function parsePasuk(r){if(!r||r==="—")return null;return r.replace("ויקרא ","");}

/* ═══ SOURCE MODAL ═══ */
function SourceModal({type,refKey,onClose}){const{lang}=useCtx();if(!refKey)return null;
let data=null,title="";
if(type==="pasuk"){const k=parsePasuk(refKey);data=PK[k];title=`ויקרא ${k}`;}
else if(type==="mishnah"){data=MN[refKey];title=`משנה ${refKey}`;}
else if(type==="rambam"){data=RM[refKey];title=`רמב״ם ${data?.ref||refKey}`;}
if(!data)return <div style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(0,0,0,.4)",display:"flex",alignItems:"flex-end",justifyContent:"center"}} onClick={onClose}>
<div style={{background:"var(--s)",borderRadius:"16px 16px 0 0",padding:24,maxWidth:480,width:"100%"}} onClick={e=>e.stopPropagation()}>
<div style={{textAlign:"center",color:"var(--t3)",padding:40}}>Source not found: {refKey}</div></div></div>;
return <div style={{position:"fixed",inset:0,zIndex:10000,background:"rgba(0,0,0,.4)",display:"flex",alignItems:"flex-end",justifyContent:"center",animation:"fadeIn .2s"}} onClick={onClose}>
<style>{`@keyframes slideUp{from{transform:translateY(100%)}to{transform:translateY(0)}}@keyframes fadeIn{from{opacity:0}to{opacity:1}}`}</style>
<div style={{background:"var(--s)",borderRadius:"16px 16px 0 0",padding:"20px 20px 32px",maxWidth:480,width:"100%",maxHeight:"75vh",overflowY:"auto",animation:"slideUp .25s",boxShadow:"0 -4px 20px rgba(0,0,0,.1)"}} onClick={e=>e.stopPropagation()}>
<div style={{width:40,height:4,borderRadius:2,background:"var(--bd2)",margin:"0 auto 16px"}}/>
<div style={{fontFamily:"var(--fd)",fontSize:17,fontWeight:700,color:"var(--ac)",marginBottom:16,textAlign:"center",direction:"rtl"}}>{title}</div>
<div style={{fontSize:17,lineHeight:2,color:"var(--t)",direction:"rtl",textAlign:"right",fontFamily:"var(--fd)",marginBottom:12,padding:"12px 16px",background:"rgba(139,105,64,.05)",borderRadius:10,border:"1px solid var(--bd)"}}>{data.h}</div>
{lang!=="he"&&<div style={{fontSize:14,lineHeight:1.7,color:"var(--t2)",direction:"ltr",textAlign:"left",marginBottom:16}}>{se(lang,data.e)}</div>}
{type==="pasuk"&&data.rh&&<><div style={{fontSize:13,fontWeight:600,color:"var(--ac)",marginBottom:8}}>{tx(lang,'רש"י',"Rashi")}</div>
<div style={{fontSize:15,lineHeight:1.9,color:"var(--t)",direction:"rtl",textAlign:"right",fontFamily:"var(--fd)",padding:"10px 14px",background:"rgba(139,105,64,.06)",borderRight:"3px solid rgba(139,105,64,.2)",borderRadius:"0 8px 8px 0"}}>{data.rh}</div>
{lang!=="he"&&<div style={{fontSize:13,lineHeight:1.7,color:"var(--t2)",direction:"ltr",textAlign:"left",marginTop:8}}>{se(lang,data.re)}</div>}</>}
<button type="button" onClick={onClose} style={{width:"100%",padding:12,marginTop:20,background:"var(--s2)",border:"1px solid var(--bd)",borderRadius:10,color:"var(--t2)",fontFamily:"var(--fb)",fontSize:14,cursor:"pointer"}}>{tx(lang,"סגור","Close")}</button>
</div></div>;}

/* ═══ TAPPABLE SOURCES ═══ */
function SRef({s}){const[m,setM]=useState(null);if(!s)return null;
return <><div style={{display:"flex",flexWrap:"wrap",gap:6,marginTop:8}}>
{s.pasuk&&s.pasuk!=="—"&&<span className="st" onClick={()=>setM({t:"pasuk",r:s.pasuk})}>📖 {s.pasuk}</span>}
{s.mishnah&&<span className="st" onClick={()=>setM({t:"mishnah",r:s.mishnah})}>📜 {s.mishnah}</span>}
{s.rambam&&<span className="st" style={{background:"rgba(46,107,58,.08)",borderColor:"rgba(46,107,58,.18)",color:"#2E6B3A"}} onClick={()=>setM({t:"rambam",r:s.rambam})}>📗 {s.rambam}</span>}
</div>{m&&<SourceModal type={m.t} refKey={m.r} onClose={()=>setM(null)}/>}</>;
}
function SNote({s,xh,xe}){const{lang}=useCtx();if(!s)return null;const x=lang==="he"?xh:xe;
return <div className="nb" style={{marginTop:10}}>
<div style={{fontFamily:"var(--fd)",fontSize:15,color:"var(--t)",marginBottom:4,direction:"rtl",textAlign:"right"}}>{s.he}</div>
{lang!=="he"&&<div style={{fontSize:14,color:"var(--t2)",marginTop:4,direction:"ltr",textAlign:"left"}}>{se(lang,s.en)}</div>}
<SRef s={s}/>{x&&<div style={{marginTop:8,fontSize:12,color:"var(--t3)",direction:lang==="he"?"rtl":"ltr",textAlign:lang==="he"?"right":"left"}}>{x}</div>}</div>;}

/* ═══ CONTROLS ═══ */
function LangToggle(){const{lang,setLang}=useCtx();const mk=(id,lbl)=>({id,lbl,on:lang===id});const opts=[mk("he","עב"),mk("en","EN"),mk("se","SE")];
return <div style={{display:"inline-flex",borderRadius:8,overflow:"hidden",border:"1px solid var(--bd2)",fontSize:11,fontFamily:"var(--fm)",fontWeight:600}}>
{opts.map((o,i)=><button key={o.id} type="button" onClick={()=>setLang(()=>o.id)} style={{padding:"5px 10px",cursor:"pointer",border:"none",borderLeft:i>0?"1px solid var(--bd2)":"none",background:o.on?"var(--ac)":"transparent",color:o.on?"#fff":"var(--t3)",transition:"all .15s"}}>{o.lbl}</button>)}
</div>;}
function ThemeToggle(){const{theme,setTheme}=useCtx();return <button type="button" onClick={()=>setTheme(t=>t==="light"?"dark":"light")} style={{display:"inline-flex",alignItems:"center",justifyContent:"center",width:34,height:34,borderRadius:8,border:"1px solid var(--bd2)",background:"transparent",cursor:"pointer",fontSize:16}}>{theme==="light"?"☽":"☀"}</button>;}
function Controls(){return <div style={{display:"flex",gap:8,alignItems:"center"}}><ThemeToggle/><LangToggle/></div>;}

/* ═══ TYPES / DATA ═══ */
const CC=[{id:"person",he:"אדם — נגע בגוף",en:"Person — Bodily Nega",se:"Person — Bodily Nega"},{id:"clothing",he:"בגד — נגע בבגד/עור",en:"Clothing — Garment Nega",se:"Clothing — Garment Nega"},{id:"house",he:"בית — נגעי בתים",en:"House — Negaei Batim",se:"House — Nega'ei Batim"}];
const PT=[{id:"skin",he:"עור הבשר",en:"Skin Nega",dh:"בהרת / שאת / ספחת",de:`${G.baheres} / ${G.seis} / ${G.sapachas}`,p:"יג:ב-יז",ic:"◐"},{id:"shechin",he:"שחין",en:G.shechin,dh:"על שחין שנרפא",de:"On a healed non-fire wound",p:"יג:יח-כג",ic:"◉"},{id:"burn",he:"מכוית אש",en:G.michva,dh:"על כוויה שנרפאה",de:"On a healed fire/heat wound",p:"יג:כד-כח",ic:"◎"},{id:"nesek",he:"נתק",en:G.nesek,dh:"שער צהוב דק",de:"Thin yellow hair (not white)",p:"יג:כט-לז",ic:"◈"},{id:"bohak",he:"בהק",en:G.bohak,dh:"כתמים לבנים כהים",de:"Dull white spots — not a nega",p:"יג:לח-לט",ic:"○"},{id:"bald",he:"קרחת/גבחת",en:`${G.karachas}/${G.gabachas}`,dh:"על עור קרח",de:"Nega on bald skin",p:"יג:מ-מד",ic:"◌"}];
const BA=[{id:"torso",he:"גוף",en:"Torso"},{id:"arm_r",he:"יד ימין",en:"Right arm"},{id:"arm_l",he:"יד שמאל",en:"Left arm"},{id:"leg_r",he:"רגל ימין",en:"Right leg"},{id:"leg_l",he:"רגל שמאל",en:"Left leg"},{id:"head_back",he:"ראש — קרחת",en:"Head — Karachas (back)"},{id:"head_front",he:"ראש — גבחת",en:"Head — Gabachas (front)"},{id:"beard",he:"זקן",en:"Beard"},{id:"face",he:"פנים",en:"Face"}];
const SC=[{id:"baheres",he:"בהרת — כשלג",en:`${G.baheres} — like snow`},{id:"sid",he:"כסיד ההיכל",en:"Like Temple plaster — secondary to Baheres"},{id:"seis",he:"שאת (חכמים) — כצמר לבן",en:"S'eis (Chachamim) — like white wool",nh:"ר׳ מאיר: כקרום ביצה",ne:"R' Meir: like egg membrane"},{id:"seis2",he:"שנייה לשאת — כקרום ביצה",en:"Secondary to S'eis — like egg membrane",nh:"ר׳ מאיר: כצמר לבן",ne:"R' Meir: like white wool"}];
function validateVisit(nt,v){if((nt==="shechin"||nt==="burn")&&v>2)return{valid:false,he:"שחין/מכוה — הסגר אחד בלבד!",en:"Shechin/burn — ONE hesger only! No third visit."};return{valid:true};}

/* ═══════════════════════════════════════
   TREE DATA
   ═══════════════════════════════════════ */
const TREE=[
{id:"skin_entry",cat:"skin_entry",label:"עור — כניסה",en:"Skin — Entry",ref:"יג:ב",children:[
  {label:"צבע אחר",en:"Other color — not one of the four shades",result:"none",note:"Not among the four nega appearances",src:S.fourShades},
  {label:"קטן מגריס",en:"Below minimum size (gris)",result:"none",note:"נגעים ו:א — below minimum",src:S.grisSize},
]},
{id:"skin_signs",cat:"skin_signs",label:"עור — סימנים",en:"Skin — Signs",ref:"יג:ג-יא",children:[
  {label:"מחיה",en:"Michya (raw flesh) → tamei",result:"tamei",note:"Michya is an independent tumah sign — sufficient on its own (13:14). If white hair is also present, it is classified as Noshenes (צרעת נושנת, chronic — 13:10-11) but the ruling is the same: tamei muchlat.",src:S.michya,remedy:{he:"מוחלט. בגדיו פרומים, ראשו פרוע, בדד ישב. טהרה: שתי צפרים (יום א), גילוח כל שער + מקוה (יום ז), קרבנות אשם+חטאת+עולה (יום ח). ויקרא יד:א-לב",en:"Muchlat. Torn garments, unshorn hair, dwells alone. Taharah: two birds (day 1), shave all hair + mikvah (day 7), korbanot asham+chatas+olah (day 8). Vayikra 14:1-32"}},
  {label:"שער לבן (2+) + עמוק",en:"White hair (2+) + deeper appearance",children:[
    {label:"הנגע קדם",en:"Nega appeared first → tamei (muchlat)",result:"tamei",note:"Both signs confirmed — 13:3",src:S.whiteHair,remedy:{he:"מוחלט. בגדיו פרומים, ראשו פרוע, בדד ישב. טהרה: יד:א-לב",en:"Muchlat. Torn garments, unshorn hair, dwells alone. Taharah: Vayikra 14:1-32"}},
    {label:"השער קדם",en:"Hair was white before nega → hesger",result:"hesger",note:"Pre-existing hair is not a sign — 13:4",src:S.hairOrder},
    {label:"ספק — לא ידוע",en:"Order unknown → Stam Mishnah: tamei / R' Yehoshua: keihah",result:"refer",note:"נגעים ד:יא — refer to Chacham",src:S.unkOrder},
  ]},
  {label:"שער לבן + עמוק לא ברור",en:"White hair present but depth unclear → hesger",result:"hesger",note:"Need both signs for immediate tamei",src:S.deeper},
  {label:"שערה אחת בלבד",en:"Only 1 white hair — NOT a sign (min. 2)",result:"hesger",note:"מיעוט שער שנים — Rashi 13:3",src:S.whiteHair},
]},
{id:"skin_hesger",cat:"skin_hesger",label:"עור — הסגר",en:"Skin — Hesger Flow",ref:"יג:ד-ח",children:[
  {label:"הסגר ראשון (7 ימים)",en:"1st hesger — 7 days",src:S.hesger,children:[
    {label:"פשה",en:"Spread → tamei",result:"tamei",note:"Pisyon — 13:7",src:S.spreading,remedy:{he:"מוחלט. בגדיו פרומים, ראשו פרוע, בדד ישב. טהרה: יד:א-לב",en:"Muchlat. Torn garments, unshorn hair, dwells alone. Taharah: Vayikra 14:1-32"}},
    {label:"כהה + לא פשה",en:"Faded below four shades + no spread → tahor",result:"tahor",note:"Mispachas — 13:6. Wash clothes",src:S.hesger},
    {label:"עמד — לא השתנה",en:"Same — no change",children:[
      {label:"הסגר שני (7 ימים)",en:"2nd hesger — 7 more days",src:S.hesger,children:[
        {label:"פשה",en:"Spread → tamei",result:"tamei",src:S.spreading,remedy:{he:"מוחלט. טהרה: יד:א-לב",en:"Muchlat. Taharah: Vayikra 14:1-32"}},
        {label:"כהה / לא פשה",en:"Faded or same after 2 weeks → tahor",result:"tahor",note:"13:6 — wash clothes",src:S.hesger},
      ]},
    ]},
  ]},
  {label:"אחרי שחרור — פשה",en:"Post-release spreading → tamei (muchlat)",result:"tamei",note:"13:7-8 — no more hesger",src:S.spreading,remedy:{he:"מוחלט. טהרה: יד:א-לב",en:"Muchlat. Taharah: Vayikra 14:1-32"}},
]},
{id:"skin_fullbody",cat:"skin_fullbody",label:"פרחה בכולו",en:"Full Body Coverage",ref:"יג:יב-יז",children:[
  {label:"פרחה מן הטמא — מוחלט/מוסגר",en:"Spread over someone already tamei (muchlat/musgar)",note:"נגעים ח:א — הפורח מן הטמא טהור",src:S.fullBody,children:[
    {label:"ללא בשר חי",en:"No raw flesh → tahor",result:"tahor",note:"13:12-13 — all white, no distinction",src:S.fullBody},
    {label:"עם בשר חי (מחיה)",en:"Raw flesh appeared → tamei again",result:"tamei",note:"13:14-15 — raw flesh reverses it",src:S.fullBodyRaw,remedy:{he:"חזר לטומאתו. בגדיו פרומים, ראשו פרוע, בדד ישב. אם חזר ללבן — טהור. טהרה: יד:א-לב",en:"Returns to tumah. Torn garments, unshorn hair, dwells alone. If turns white again — tahor. Taharah: Vayikra 14:1-32"}},
    {label:"בשר חי חזר ללבן",en:"Raw flesh turned white again → tahor again",result:"tahor",note:"Back-and-forth possible — 13:16-17",src:S.fullBody},
  ]},
  {label:"פרחה מן הטהור — לאחר שטוהר",en:"Spread over someone already declared tahor",note:"נגעים ח:א — הפורח מן הטהור טמא",result:"tamei",src:S.fullBody,remedy:{he:"טמא. טהרה: יד:א-לב",en:"Tamei. Taharah: Vayikra 14:1-32"}},
]},
{id:"shechin",cat:"shechin",label:"שחין",en:"Shechin (Healed Boil)",ref:"יג:יח-כג",children:[
  {label:"סוג מכה שגוי",en:"Wrong wound type — not shechin",result:"none",note:"Recheck — shechin is non-fire wound",src:S.shechin},
  {label:"צבע אחר",en:"Other color — not a valid nega appearance",result:"none",src:S.fourShades},
  {label:"שער לבן + עמוק",en:"White hair + deeper → tamei",result:"tamei",note:"Both signs — 13:20",src:S.shechin,remedy:{he:"מוחלט. טהרה: שתי צפרים, גילוח, מקוה, קרבנות — יד:א-לב",en:"Muchlat. Taharah: two birds, shaving, mikvah, korbanot — Vayikra 14:1-32"}},
  {label:"אין שני סימנים",en:"Missing one or both signs",children:[
    {label:"הסגר אחד (7 ימים)",en:"ONE hesger only — no second week",note:"נגעים ג:ד",src:S.oneHesger,children:[
      {label:"פשה",en:"Spread → tamei",result:"tamei",src:S.spreading,remedy:{he:"מוחלט. טהרה: יד:א-לב",en:"Muchlat. Taharah: Vayikra 14:1-32"}},
      {label:"לא פשה / כהה",en:"No spread or faded → tahor (tzareves/scar)",result:"tahor",note:"Scar of the shechin — 13:23",src:S.shechin},
    ]},
  ]},
]},
{id:"burn",cat:"burn",label:"מכוית אש",en:"Burn (Michvas Eish)",ref:"יג:כד-כח",children:[
  {label:"סוג מכה שגוי",en:"Wrong wound type — not a burn",result:"none",src:S.burn},
  {label:"צבע אחר",en:"Other color",result:"none",src:S.fourShades},
  {label:"שער לבן + עמוק",en:"White hair + deeper → tamei",result:"tamei",note:"13:25",src:S.burn,remedy:{he:"מוחלט. טהרה: שתי צפרים, גילוח, מקוה, קרבנות — יד:א-לב",en:"Muchlat. Taharah: two birds, shaving, mikvah, korbanot — Vayikra 14:1-32"}},
  {label:"אין שני סימנים",en:"Missing signs",children:[
    {label:"הסגר אחד (7 ימים)",en:"ONE hesger only",src:S.oneHesger,children:[
      {label:"פשה",en:"Spread → tamei",result:"tamei",src:S.spreading,remedy:{he:"מוחלט. טהרה: יד:א-לב",en:"Muchlat. Taharah: Vayikra 14:1-32"}},
      {label:"לא פשה / כהה",en:"No spread or faded → tahor (burn scar)",result:"tahor",note:"13:28",src:S.burn},
    ]},
  ]},
]},
{id:"nesek",cat:"nesek",label:"נתק — ראש/זקן",en:"Nesek (Head/Beard)",ref:"יג:כט-לז",children:[
  {label:"שער שחור צמח (2+)",en:"Black hair grew (2+) → tahor (healing sign)",result:"tahor",note:"13:37 — even 2 dark hairs suffice",src:S.blackHair},
  {label:"צהוב + שחור ביחד",en:"Both yellow AND black hair → refer to Chacham",result:"refer",note:"Black saves (נגעים י:ט) but combination needs expert review",src:S.blackHair},
  {label:"צהוב דק (2+) + עמוק",en:"Thin yellow hair (2+) + deeper → tamei",result:"tamei",note:"13:30 — nesek confirmed",src:S.yellowHair,remedy:{he:"מוחלט. בדד ישב. טהרה: שתי צפרים (יד:ב), גילוח כל שערו (יד:ט), מקוה, קרבנות (יד:י-כ)",en:"Muchlat. Dwells alone. Taharah: two birds (14:2), shave ALL hair (14:9), mikvah, korbanot (14:10-20)"}},
  {label:"צהוב ללא עמוק",en:"Yellow hair but no depth → hesger",result:"hesger",note:"Need both per the pasuk",src:S.yellowHair},
  {label:"אין צהוב, אין שחור",en:"No yellow, no black hair",children:[
    {label:"הסגר ראשון (7 ימים)",en:"1st hesger — 7 days",src:S.hesger,children:[
      {label:"פשה",en:"Spread → tamei (no need to check yellow hair)",result:"tamei",note:"13:35-36 — spreading alone suffices",src:S.nesekSpread,remedy:{he:"מוחלט. טהרה: יד:א-לב",en:"Muchlat. Taharah: Vayikra 14:1-32"}},
      {label:"לא פשה → גילוח סביב",en:"No spread → shave around nesek (not the nesek itself)",note:"13:33 — so spreading is visible",src:S.shaving,children:[
        {label:"הסגר שני (7 ימים)",en:"2nd hesger — 7 more days",src:S.hesger,children:[
          {label:"פשה",en:"Spread → tamei",result:"tamei",src:S.nesekSpread,remedy:{he:"מוחלט. טהרה: יד:א-לב",en:"Muchlat. Taharah: Vayikra 14:1-32"}},
          {label:"לא פשה",en:"No spread after 2 weeks → tahor",result:"tahor",note:"13:34 — wash clothes",src:S.hesger},
        ]},
      ]},
    ]},
  ]},
]},
{id:"bohak",cat:"bohak",label:"בהק",en:"Bohak (White Spots)",ref:"יג:לח-לט",children:[
  {label:"כהה — מתחת לארבע מראות",en:"Dull white — below all four shades → tahor",result:"tahor",note:"Bohak = not tzara'as — 13:39",src:S.bohak},
  {label:"עז — כאחת מארבע",en:"Bright — matches a shade → examine as skin nega",result:"refer",note:"Not bohak — redirect to full skin examination",src:S.fourShades},
  {label:"לא בטוח",en:"Unsure — distinction requires expertise → refer to Chacham",result:"refer",note:"Consult an experienced Kohen/Chacham"},
]},
{id:"bald",cat:"bald",label:"קרחת / גבחת",en:"Bald Area (Karachas/Gabachas)",ref:"יג:מ-מד",children:[
  {label:"אין נגע",en:"No nega on bald area → tahor",result:"tahor",note:"Baldness alone is tahor — 13:40-41",src:S.baldness},
  {label:"נגע אדמדם-לבן",en:"Reddish-white nega present",note:"Signs: michya and spreading ONLY — not deeper, not white hair (נגעים י:י)",src:S.baldness,children:[
    {label:"מחיה",en:"Michya (raw flesh) → tamei",result:"tamei",note:"Immediate — נגעים י:י",src:S.michya,remedy:{he:"מוחלט. בדד ישב. טהרה: שתי צפרים, גילוח כל שערו, מקוה, קרבנות — יד:א-לב",en:"Muchlat. Dwells alone. Taharah: two birds, shave all hair, mikvah, korbanot — Vayikra 14:1-32"}},
    {label:"אין מחיה",en:"No michya → hesger flow",src:S.hesger,children:[
      {label:"הסגר ראשון",en:"1st hesger",src:S.hesger,children:[
        {label:"פשה",en:"Spread → tamei",result:"tamei",src:S.spreading,remedy:{he:"מוחלט. טהרה: יד:א-לב",en:"Muchlat. Taharah: Vayikra 14:1-32"}},
        {label:"לא פשה",en:"No spread → 2nd hesger",children:[
          {label:"הסגר שני",en:"2nd hesger",src:S.hesger,children:[
            {label:"פשה",en:"Spread → tamei",result:"tamei",src:S.spreading,remedy:{he:"מוחלט. טהרה: יד:א-לב",en:"Muchlat. Taharah: Vayikra 14:1-32"}},
            {label:"לא פשה / אין מחיה",en:"No spread, no michya after 2 weeks → tahor",result:"tahor",note:"Wash clothing",src:S.hesger},
          ]},
        ]},
      ]},
    ]},
  ]},
]},
{id:"clothing",cat:"clothing",label:"בגד",en:"Clothing (Wool/Linen/Leather)",ref:"יג:מז-נט",children:[
  {label:"חומר אחר",en:"Other material — not susceptible to clothing nega'im",result:"none",note:"Only wool, linen, leather",src:S.clothing},
  {label:"צבע אחר",en:"Other color — not yerakrak/adamdam",result:"none",src:S.clothing},
  {label:"צמר/פשתן/עור + ירקרק/אדמדם",en:"Valid material + green/red color",src:S.clothing,children:[
    {label:"הסגר (7 ימים)",en:"Hesger — 7 days",src:S.hesger,children:[
      {label:"פשה",en:"Spread → tamei — burn garment (mameres)",result:"tamei",note:"13:51-52",src:S.clothingBurn,remedy:{he:"ישרף — צמר, פשתן או עור. ויקרא יג:נב",en:"Must be burned — wool, linen, or leather. Vayikra 13:52"}},
      {label:"לא פשה → כיבוס",en:"No spread → must launder the garment",src:S.clothing,children:[
        {label:"הסגר שני אחרי כיבוס",en:"2nd hesger after laundering",src:S.hesger,children:[
          {label:"לא השתנה",en:"Unchanged after wash → tamei — burn (pecheses)",result:"tamei",note:"Deep-set — 13:55",src:S.clothingBurn,remedy:{he:"ישרף — פחתת (עמוק), בין קרחתו בין גבחתו. יג:נה",en:"Must be burned — pecheses (deep-set), front or back. 13:55"}},
          {label:"כהה",en:"Faded",children:[
            {label:"יקרע מקום הנגע",en:"Tear out the affected area",src:S.clothing,children:[
              {label:"חזר",en:"Reappeared elsewhere → tamei — burn entire garment (porachas)",result:"tamei",note:"13:57",src:S.clothingBurn,remedy:{he:"פורחת — ישרף כל הבגד. יג:נז",en:"Porachas (recurring) — burn the entire garment. 13:57"}},
              {label:"לא חזר → כיבוס שני",en:"Stayed gone → 2nd laundering → tahor",result:"tahor",note:"13:58",src:S.clothing},
            ]},
          ]},
          {label:"נעלם",en:"Completely gone → 2nd laundering → tahor",result:"tahor",note:"13:58",src:S.clothing},
        ]},
      ]},
    ]},
  ]},
]},
{id:"houses",cat:"houses",label:"בית — נגעי בתים",en:"Houses (Negaei Batim)",ref:"יד:לג-נג",children:[
  {label:"לא בארץ ישראל",en:"Not in Eretz Yisrael → does not apply",result:"none",note:"14:34 — only after conquest and division. Rashi: בשורה היא — Canaanites hid gold in walls",src:S.houses},
  {label:"חומר שאינו אבן/עץ/טיח",en:"Not stone/wood/plaster construction → does not apply",result:"none",note:"נגעים יב:א — only standard houses",src:S.houses},
  {label:"קטן משני גריסין",en:"Smaller than two gris → not a house nega",result:"none",note:"נגעים יב:ג — house minimum is TWO gris (not one)",src:S.houseSize},
  {label:"בית ובו נגע ירקרק/אדמדם",en:"House with greenish/reddish streaks",src:S.housesColor,children:[
    {label:"בעל הבית מדווח לכהן",en:"Owner reports to Kohen: 'like a nega' (not definitive)",note:"14:35 — Rashi: even a scholar says 'כנגע' not 'nega'",src:S.houses,children:[
      {label:"פינוי הבית לפני הבדיקה",en:"Empty house before Kohen examines",note:"14:36 — to save contents from tumah",src:S.housesEmpty,children:[
        {label:"כהן בודק: שקערורות, עמוק מהקיר",en:"Kohen examines: streaks deeper than wall surface",note:"14:37",src:S.housesColor,children:[
          {label:"הסגר הבית 7 ימים",en:"Seal (hesger) the house — 7 days",note:"14:38",src:S.hesger,children:[
            {label:"פשה בקירות",en:"Spread in the walls",src:S.spreading,children:[
              {label:"חילוץ אבנים + גרירה + טיח חדש",en:"Remove affected stones, scrape walls, replaster",note:"14:40-42",src:S.housesDemolish,children:[
                {label:"חזר הנגע אחרי הטיח",en:"Nega returned after replastering → mameres",result:"tamei",note:"14:43-45 — demolish entire house. Stones, wood, plaster to tamei place outside city",src:S.housesDemolish,remedy:{he:"צרעת ממארת. ינתץ את הבית — אבניו, עציו, וכל עפרו. יוציא אל מחוץ לעיר. טהרת הבית: שתי צפרים, ארז, שני ואזוב — יד:מח-נג",en:"Mameres. Demolish — stones, wood, all plaster removed outside the city. House taharah: two birds, cedar, scarlet, hyssop — 14:48-53"}},
                {label:"לא חזר",en:"Did not return after replastering → tahor",result:"tahor",note:"14:48 — Kohen declares the house tahor",src:S.housesClean},
              ]},
            ]},
            {label:"לא פשה",en:"Did not spread",children:[
              {label:"הסגר שני (7 ימים נוספים)",en:"2nd hesger — 7 more days",src:S.hesger,children:[
                {label:"פשה",en:"Spread → remove stones, scrape, replaster",result:"hesger",note:"Same process as above — 14:40-42",src:S.housesDemolish},
                {label:"לא פשה",en:"Did not spread → tahor",result:"tahor",note:"14:48",src:S.housesClean},
              ]},
            ]},
          ]},
        ]},
      ]},
    ]},
  ]},
  {label:"נכנס לבית מוסגר",en:"Entering a sealed house",src:S.houses,children:[
    {label:"נכנס",en:"Entered → tamei until evening",result:"tamei",note:"14:46 — tamei until evening",src:S.houses,remedy:{he:"טמא עד הערב. טובל ומעריב שמשו",en:"Tamei until evening. Immerse in mikvah and wait for sunset"}},
    {label:"שכב או אכל בבית",en:"Lay down or ate inside → must wash clothes",result:"tamei",note:"14:47 — wash clothes",src:S.houses,remedy:{he:"טמא עד הערב. יכבס בגדיו, טובל ומעריב שמשו",en:"Tamei until evening. Wash clothes, immerse in mikvah, wait for sunset"}},
  ]},
]},
];

const CAT_LABELS={skin_entry:{he:"כניסה",en:"Entry",c:"#C4956A"},skin_signs:{he:"סימנים",en:"Signs",c:"#B08050"},skin_hesger:{he:"הסגר",en:"Hesger",c:"#9A7040"},skin_fullbody:{he:"פרחה",en:"Full Body",c:"#8A6030"},shechin:{he:"שחין",en:"Shechin",c:"#B87A4A"},burn:{he:"מכוה",en:"Burn",c:"#C45A3A"},nesek:{he:"נתק",en:"Nesek",c:"#7A8B5A"},bohak:{he:"בהק",en:"Bohak",c:"#9A9A7A"},bald:{he:"קרחת",en:"Bald",c:"#8A7A6A"},clothing:{he:"בגד",en:"Clothing",c:"#6A7A8A"},houses:{he:"בתים",en:"Houses",c:"#5A6A5A"}};
const RC={tamei:{bg:"#A33A2A",l:"טמא"},tahor:{bg:"#2E6B3A",l:"טהור"},hesger:{bg:"#8B7B3A",l:"הסגר"},refer:{bg:"#6B5B8A",l:"חכם"},none:{bg:"#888",l:"—"}};

/* ═══════════════════════════════════════
   TREE VIEW COMPONENT
   ═══════════════════════════════════════ */
function TreeNode({node,depth=0,lang,path=[]}){
  const[exp,setExp]=useState(depth<2);
  const ch=node.children&&node.children.length>0;const rc=node.result?RC[node.result]:null;
  const T=(h,e)=>tx(lang,h,e);
  const curPath=[...path,{he:node.label,en:node.en||node.label}];
  return <div style={{marginLeft:depth>0?20:0}}>
    <div onClick={()=>ch&&setExp(e=>!e)} style={{display:"flex",alignItems:"center",gap:8,padding:"8px 12px",margin:"3px 0",background:rc?rc.bg:ch?"rgba(44,36,24,.04)":"transparent",color:rc?"#fff":"var(--t)",borderRadius:8,border:rc?"none":"1px solid rgba(44,36,24,.06)",cursor:ch?"pointer":"default",fontSize:depth===0?16:14,fontWeight:depth===0?700:rc?600:400,fontFamily:"var(--fd)",direction:"rtl",textAlign:"right"}}>
      {ch&&<span style={{fontSize:10,opacity:.5,flexShrink:0,transition:"transform .2s",transform:exp?"rotate(90deg)":"rotate(0)",fontFamily:"system-ui"}}>▶</span>}
      {rc&&<span style={{fontSize:11,fontFamily:"var(--fm)",opacity:.8,flexShrink:0,padding:"1px 6px",background:"rgba(255,255,255,.15)",borderRadius:4}}>{rc.l}</span>}
      <span style={{flex:1}}><span>{node.label}</span>{lang!=="he"&&node.en&&<span style={{fontSize:depth===0?13:12,opacity:.6,marginRight:6}}> — {se(lang,node.en)}</span>}</span>
      {depth===0&&node.ref&&<span style={{fontSize:10,fontFamily:"var(--fm)",padding:"2px 6px",background:"rgba(139,105,64,.1)",borderRadius:4,color:"var(--ac)",flexShrink:0}}>{node.ref}</span>}
    </div>
    {/* Source link */}
    {!ch&&node.src&&<div style={{margin:"0 0 2px 32px"}}><SRef s={node.src}/></div>}
    {/* Input path — shows on leaf nodes */}
    {!ch&&depth>0&&<div style={{margin:"4px 0 2px 32px",padding:"6px 10px",background:"rgba(139,105,64,.04)",border:"1px solid rgba(139,105,64,.08)",borderRadius:6,fontSize:11,lineHeight:1.5,color:"var(--t3)",direction:lang==="he"?"rtl":"ltr",textAlign:lang==="he"?"right":"left"}}>
      <span style={{fontWeight:600,color:"var(--t2)",fontSize:10}}>{T("תנאים:","Conditions:")}</span>{" "}
      {curPath.map((p,i)=><span key={i}>{i>0&&" → "}{lang==="he"?p.he:se(lang,p.en)}</span>)}
    </div>}
    {/* Note */}
    {!ch&&node.note&&lang!=="he"&&<div style={{margin:"0 0 2px 32px",fontSize:12,color:"var(--t3)",fontStyle:"italic",lineHeight:1.5,direction:lang==="he"?"rtl":"ltr",textAlign:lang==="he"?"right":"left"}}>{se(lang,node.note)}</div>}
    {/* Remedy for tamei */}
    {!ch&&node.remedy&&<div style={{margin:"4px 0 4px 32px",padding:"8px 12px",background:"rgba(163,58,42,.06)",border:"1px solid rgba(163,58,42,.12)",borderRadius:8,fontSize:12,lineHeight:1.6,color:"var(--t2)",direction:lang==="he"?"rtl":"ltr",textAlign:lang==="he"?"right":"left"}}><span style={{fontWeight:700,fontSize:11,color:"var(--dg)"}}>{T("תיקון / טהרה:","Remedy / Taharah:")}</span> {T(node.remedy.he,node.remedy.en)}</div>}
    {ch&&exp&&<div style={{borderRight:lang==="he"?"1.5px solid rgba(44,36,24,.08)":"none",borderLeft:lang==="he"?"none":"1.5px solid rgba(44,36,24,.08)",marginRight:lang==="he"?6:0,marginLeft:lang==="he"?0:6,paddingRight:lang==="he"?8:0,paddingLeft:lang==="he"?0:8}}>
      {node.children.map((c,i)=><TreeNode key={i} node={c} depth={depth+1} lang={lang} path={curPath}/>)}
      {node.src&&<div style={{padding:"2px 12px"}}><SRef s={node.src}/></div>}
      {node.note&&lang!=="he"&&<div style={{fontSize:11,color:"var(--t3)",fontStyle:"italic",padding:"4px 12px",direction:lang==="he"?"rtl":"ltr",textAlign:lang==="he"?"right":"left"}}>{se(lang,node.note)}</div>}
    </div>}
  </div>;
}

function TreeView(){
  const{lang}=useCtx();const T=(h,e)=>tx(lang,h,e);
  const[filters,setFilters]=useState(new Set(Object.keys(CAT_LABELS)));
  const[areaFilter,setAreaFilter]=useState("all");
  const toggle=k=>{setFilters(p=>{const n=new Set(p);if(n.has(k))n.delete(k);else n.add(k);return n;});};

  // Area → which tree categories apply
  const AREA_CATS={
    all:Object.keys(CAT_LABELS),
    torso:["skin_entry","skin_signs","skin_hesger","skin_fullbody","shechin","burn","bohak"],
    arm:["skin_entry","skin_signs","skin_hesger","skin_fullbody","shechin","burn","bohak"],
    leg:["skin_entry","skin_signs","skin_hesger","skin_fullbody","shechin","burn","bohak"],
    face:["skin_entry","skin_signs","skin_hesger","skin_fullbody","shechin","burn","bohak"],
    beard:["nesek","bohak"],
    head_back:["nesek","bald","bohak"],
    head_front:["nesek","bald","bohak"],
    clothing:["clothing"],
    houses:["houses"],
  };
  const AREA_OPTS=[
    {id:"all",he:"הכל",en:"All"},
    {id:"torso",he:"גוף / גפיים / פנים",en:"Body / limbs / face"},
    {id:"beard",he:"זקן",en:"Beard"},
    {id:"head_back",he:"קרחת (אחור)",en:"Karachas (back)"},
    {id:"head_front",he:"גבחת (פנים)",en:"Gabachas (front)"},
    {id:"clothing",he:"בגד",en:"Clothing"},
    {id:"houses",he:"בתים",en:"Houses"},
  ];

  const handleArea=(id)=>{
    setAreaFilter(id);
    setFilters(new Set(AREA_CATS[id]||Object.keys(CAT_LABELS)));
  };

  const relevantCats=AREA_CATS[areaFilter]||Object.keys(CAT_LABELS);
  const filtered=useMemo(()=>TREE.filter(n=>filters.has(n.cat)),[filters]);

  return <div>
    {/* Area selector */}
    <div style={{padding:"12px 0 8px"}}>
      <label>{T("סנן לפי מיקום:","Filter by location:")}</label>
      <div className="tg">
        {AREA_OPTS.map(a=><button key={a.id} type="button" className={`tb ${areaFilter===a.id?"on":""}`} style={{flex:"none",padding:"6px 12px",fontSize:12}} onClick={()=>handleArea(a.id)}>{T(a.he,a.en)}</button>)}
      </div>
    </div>
    {/* Category chips — only show relevant ones */}
    <div style={{padding:"4px 0 12px",display:"flex",flexWrap:"wrap",gap:6,alignItems:"center"}}>
      <button type="button" onClick={()=>setFilters(new Set(relevantCats))} style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600,fontFamily:"var(--fm)",cursor:"pointer",background:relevantCats.every(c=>filters.has(c))?"rgba(44,36,24,.12)":"transparent",color:"var(--t3)",border:"1px solid var(--bd)"}}>{T("הכל","All")}</button>
      <button type="button" onClick={()=>setFilters(new Set())} style={{padding:"4px 10px",borderRadius:20,fontSize:11,fontWeight:600,fontFamily:"var(--fm)",cursor:"pointer",background:filters.size===0?"rgba(44,36,24,.12)":"transparent",color:"var(--t3)",border:"1px solid var(--bd)"}}>{T("ללא","None")}</button>
      <div style={{width:1,height:16,background:"var(--bd)"}}/>
      {Object.entries(CAT_LABELS).filter(([k])=>relevantCats.includes(k)).map(([k,cat])=>{const on=filters.has(k);return <button key={k} type="button" onClick={()=>toggle(k)} style={{padding:"4px 10px",borderRadius:20,fontSize:12,fontWeight:600,fontFamily:"var(--fb)",cursor:"pointer",background:on?cat.c:"transparent",color:on?"#fff":"var(--t3)",border:`1px solid ${on?cat.c:"var(--bd)"}`}}>{T(cat.he,cat.en)}</button>;})}
    </div>
    {/* Legend */}
    <div style={{display:"flex",gap:12,marginBottom:12,fontSize:10,color:"var(--t3)"}}>
      {Object.entries(RC).filter(([k])=>k!=="none").map(([k,r])=><div key={k} style={{display:"flex",alignItems:"center",gap:4}}><div style={{width:8,height:8,borderRadius:"50%",background:r.bg}}/><span>{r.l}</span></div>)}
    </div>
    {/* Tree */}
    {filtered.length===0&&<div style={{textAlign:"center",padding:40,color:"var(--t3)"}}>{T("בחר קטגוריה או מיקום","Select a category or location")}</div>}
    {filtered.map((n,i)=><div key={n.id} style={{marginBottom:16}}><TreeNode node={n} depth={0} lang={lang}/></div>)}
  </div>;
}

/* ═══════════════════════════════════════
   DIAGNOSTIC APP — Steps + Verdict
   ═══════════════════════════════════════ */
function getAllSteps(nt,cd,lang){const v=cd?.visitNum||1;const TT=(h,e)=>tx(lang,h,e);const always=()=>true;
if(nt==="skin")return[
{k:"color",q:TT("מהו מראה (צבע) הנגע?","What is the color of the nega?"),src:S.fourShades,derm:true,xh:"חכמים: שאת כצמר, שנייה כקרום ביצה. ר׳ מאיר: הפוך.",xe:"Chachamim: S'eis=wool, secondary=egg. R' Meir reverses shades 3-4.",show:always,opts:[...SC.map(c=>({l:tx(lang,c.he,c.en),v:c.id,s:c.nh?tx(lang,c.nh,c.ne):undefined})),{l:TT("צבע אחר — אינו מארבע המראות","Other color — not one of the four nega shades"),v:"other",fin:true}]},
{k:"size",q:TT("האם גודל הנגע לפחות כגריס?",`Is the nega at least a ${G.gris}?`),src:S.grisSize,show:({a})=>a.color!=="other",opts:[{l:TT("כן — כגריס או יותר","Yes — gris-sized or larger"),v:"y"},{l:TT("לא — קטן מגריס","No — smaller than a gris"),v:"n",fin:true}]},
{k:"deeper",q:TT("האם הנגע נראה עמוק מעור הבשר?","Does the nega appear deeper than the surrounding skin?"),src:S.deeper,show:({a})=>a.size==="y",opts:[{l:TT("כן — כמראה חמה לעומת צל","Yes — like sunlight vs. shade"),v:"y"},{l:TT("לא — באותו גובה","No — level with the skin"),v:"n"},{l:TT("לא ברור","Unclear"),v:"u"}]},
{k:"wh",q:TT("האם יש שער לבן בתוך הנגע? (לפחות 2 שערות)","Is there white hair inside the nega? (minimum 2 hairs)"),src:S.whiteHair,show:({a})=>a.size==="y",opts:[{l:TT("כן — 2 שערות לבנות או יותר","Yes — 2 or more white hairs"),v:"y"},{l:TT("לא — אין שער לבן","No white hair"),v:"n"},{l:TT("שערה אחת בלבד — אינה סימן (מיעוט שער שנים)","Only 1 hair — not a sign (minimum is two)"),v:"1"}]},
{k:"ho",q:TT("מה הופיע ראשון — הנגע או השער הלבן?","Which appeared first — the nega or the white hair?"),src:S.hairOrder,xh:"ספק — סתם משנה (ד:יא): טמא. ר׳ יהושע: כהה.",xe:"If uncertain — Stam Mishnah (4:11): tamei. R' Yehoshua: keihah (faded/doubtful).",show:({a})=>a.wh==="y",opts:[{l:TT("הנגע קדם — ואחר כך הלבין השער","Nega appeared first — then hair turned white"),v:"nf",s:TT("סימן טומאה","Sign of tumah")},{l:TT("השער היה לבן לפני הנגע","Hair was white before the nega appeared"),v:"hf",s:TT("אינו סימן טומאה","NOT a sign of tumah")},{l:TT("הסדר אינו ידוע","Order unknown"),v:"unk",s:TT("ספק — ראה נגעים ד:יא","Safek — see Negaim 4:11")}]},
{k:"mi",q:TT("האם יש מחיה (בשר חי) בתוך הנגע?",`Is there ${G.michya} inside the nega?`),src:S.michya,show:({a})=>a.size==="y",opts:[{l:TT("כן — בשר חי נראה בתוך הלבן","Yes — raw/living flesh visible inside the white area"),v:"y"},{l:TT("לא — הכל לבן","No — entirely white"),v:"n"}]},
{k:"sp",q:TT("האם הנגע פשה (גדל) מאז הביקור הקודם?",`Has the nega shown ${G.pisyon} since the last visit?`),src:S.spreading,show:({a})=>v>=2&&a.size==="y",opts:[{l:TT("כן — הנגע גדל","Yes — the nega spread"),v:"y"},{l:TT("לא — נשאר כמות שהיה","No — remained the same size"),v:"n"},{l:TT("כהה — דהה מתחת לארבע המראות",`${G.keihah} — faded below the four shades`),v:"f"}]},
{k:"fb",q:TT("האם הצרעת פרחה בכל הגוף מראשו ועד רגליו?","Has the tzara'as covered the ENTIRE body — head to toe?"),src:S.fullBody,show:({a})=>a.size==="y",opts:[{l:TT("כן — כיסתה את כל הגוף","Yes — covers the entire body"),v:"y"},{l:TT("לא — הנגע מקומי","No — localized"),v:"n"}]},
{k:"fbPrior",q:TT("מה היה מצבו לפני שפרחה בכולו?","What was his status BEFORE the full-body coverage?"),src:S.fullBody,xh:"נגעים ח:א — הפורח מן הטמא טהור. מן הטהור טמא.",xe:"Negaim 8:1 — Spreading over a tamei person = tahor. Over a tahor person = tamei.",show:({a})=>a.fb==="y",opts:[{l:TT("היה טמא (מוחלט או מוסגר) — ואז פרחה","Was tamei (muchlat or musgar) — then it spread"),v:"tamei"},{l:TT("היה טהור (כבר שוחרר) — ואז פרחה","Was tahor (already released) — then it spread"),v:"tahor"}]}];
if(nt==="shechin"||nt==="burn"){const isSh=nt==="shechin";return[
{k:"wt",q:isSh?TT("אימות: האם המכה המקורית היתה שלא מחמת האש?","Verify: Was the original wound NOT caused by fire/heat?"):TT("אימות: האם המכה המקורית היתה מחמת האש?","Verify: Was the original wound caused by fire or heat?"),src:isSh?S.shechin:S.burn,show:always,opts:[{l:TT("כן — מאומת","Yes — confirmed"),v:"ok"},{l:TT("לא — סוג מכה אחר","No — different wound type"),v:"no",fin:true}]},
{k:"color",q:TT("מהו מראה הנגע?","What color is the nega?"),src:S.fourShades,derm:true,show:({a})=>a.wt==="ok",opts:[{l:TT("לבן — אחד מארבע המראות","White — one of the four shades"),v:"w"},{l:TT("אדמדם-לבן","Reddish-white"),v:"rw"},{l:TT("צבע אחר — אינו נגע","Other color — not a nega"),v:"other",fin:true}]},
{k:"deeper",q:TT("האם הנגע נראה עמוק מהעור?","Does the nega appear deeper than the skin?"),src:S.deeper,show:({a})=>a.wt==="ok"&&a.color!=="other",opts:[{l:TT("כן — נראה עמוק","Yes — appears deeper"),v:"y"},{l:TT("לא","No"),v:"n"}]},
{k:"wh",q:TT("האם יש שער לבן בנגע? (לפחות 2 שערות)","White hair in the nega? (at least 2)"),src:S.whiteHair,show:({a})=>a.wt==="ok"&&a.color!=="other",opts:[{l:TT("כן","Yes"),v:"y"},{l:TT("לא","No"),v:"n"}]},
{k:"sp",q:TT("האם הנגע פשה מאז הביקור הקודם?","Has the nega spread since the last visit?"),src:S.spreading,warn:TT("שחין/מכוה — הסגר אחד בלבד!","Shechin/burn — ONE hesger only!"),show:({a})=>v>=2&&a.wt==="ok"&&a.color!=="other",opts:[{l:TT("כן — פשה","Yes — it spread"),v:"y"},{l:TT("לא — לא פשה","No — did not spread"),v:"n"},{l:TT("כהה — דהה",`Faded (${G.keihah})`),v:"f"}]}];}
if(nt==="nesek")return[
{k:"deeper",q:TT("האם הנתק נראה עמוק מהעור?",`Does the ${G.nesek} appear deeper than the skin?`),src:S.nesek,show:always,opts:[{l:TT("כן — נראה עמוק","Yes — appears deeper"),v:"y"},{l:TT("לא","No"),v:"n"}]},
{k:"yh",q:TT("האם יש שער צהוב דק בנתק? (לפחות 2)","Thin yellow hair in the nesek? (min. 2)"),src:S.yellowHair,xh:"בנתק הסימן הוא צהוב, לא לבן!",xe:"In nesek: the tumah sign is YELLOW hair — not white!",show:always,opts:[{l:TT("כן — 2+ שערות צהובות דקות","Yes — 2+ thin yellow hairs"),v:"y"},{l:TT("לא — אין שער צהוב","No yellow hair"),v:"n"}]},
{k:"bh",q:TT("האם צמח שער שחור/כהה בנתק? (2+)","Has black/dark hair grown in the nesek? (2+)"),src:S.blackHair,xh:"שער שחור = סימן ריפוי. 2 שערות מספיקות.",xe:"Black/dark hair = sign of healing. Even 2 dark hairs suffice.",show:always,opts:[{l:TT("כן — שער שחור צמח","Yes — dark hair has grown"),v:"y"},{l:TT("לא — אין שער שחור","No dark hair"),v:"n"},{l:TT("גם צהוב וגם שחור נמצאים","Both yellow and black hair present"),v:"both"}]},
{k:"sp",q:TT("האם הנתק פשה מאז הביקור הקודם?","Has the nesek spread since the last visit?"),src:S.nesekSpread,show:()=>v>=2,opts:[{l:TT("כן — פשה","Yes — it spread"),v:"y"},{l:TT("לא — לא פשה","No — did not spread"),v:"n"}]},
{k:"shv",q:TT("האם גילחו סביב הנתק?","Was the area around the nesek shaved?"),src:S.shaving,xh:"סביב הנתק — לא הנתק עצמו!",xe:"Around the nesek — NOT the nesek itself! So the Kohen can detect spreading.",show:({a})=>v===2&&a.sp==="n",opts:[{l:TT("כן — גילחו סביב","Yes — shaved around"),v:"y"},{l:TT("לא — טרם","Not yet"),v:"n"}]}];
if(nt==="bohak")return[{k:"ci",q:TT("האם הכתמים הלבנים כהים ועמומים — מתחת לעוצמת כל ארבע המראות (שלג, סיד, צמר, קרום ביצה)?","Are the white spots dull and faded — BELOW all four nega shades (snow, plaster, wool, egg membrane)?"),src:S.bohak,xh:"בהק = לבן כהה שאינו מגיע לעוצמת אף אחד מארבע המראות.",xe:"Bohak = dull white that doesn't reach the intensity of ANY of the four shades.",show:always,opts:[{l:TT("כן — כהה מכל ארבע המראות","Yes — clearly duller than all four shades"),v:"dull",fin:true},{l:TT("לא — עז כאחת מארבע המראות","No — as bright as one of the four shades"),v:"bright",fin:true},{l:TT("לא בטוח — קשה להבדיל","Unsure — hard to distinguish"),v:"unsure",fin:true}]}];
if(nt==="bald")return[
{k:"bt",q:TT("סוג הקרחת:","Type of baldness:"),src:S.baldness,show:always,opts:[{l:TT("קרחת — מהקדקד לאחור (לכיוון העורף)",`${G.karachas} — toward the neck`),v:"k"},{l:TT("גבחת — מהקדקד לפנים (לכיוון הפנים)",`${G.gabachas} — toward the face`),v:"g"}]},
{k:"np",q:TT("האם יש נגע אדמדם-לבן על מקום הקרחת?","Is there a reddish-white nega on the bald area?"),src:S.baldness,xh:"בקרחת/גבחת אין שער — הסימנים: מחיה ופשיון בלבד (נגעים י:י). לא עמוק, לא שער לבן.",xe:"On bald skin there's no hair. Signs: michya and spreading ONLY (Negaim 10:10). Not deeper, not white hair.",show:always,opts:[{l:TT("כן — נגע אדמדם-לבן","Yes — reddish-white nega"),v:"y"},{l:TT("לא — אין נגע","No nega present"),v:"n",fin:true}]},
{k:"mi",q:TT("האם יש מחיה (בשר חי) בנגע?",`Is there ${G.michya} inside the nega?`),src:S.michya,xh:"מחיה — סימן טומאה בקרחת/גבחת.",xe:"Michya — tumah sign in karachas/gabachas.",show:({a})=>a.np==="y",opts:[{l:TT("כן","Yes"),v:"y"},{l:TT("לא","No"),v:"n"}]},
{k:"sp",q:TT("האם הנגע פשה?","Has the nega spread?"),src:S.spreading,xh:"פשיון — הסימן השני בקרחת/גבחת.",xe:"Spreading — the second sign in karachas/gabachas.",show:({a})=>v>=2&&a.np==="y",opts:[{l:TT("כן — פשה","Yes — it spread"),v:"y"},{l:TT("לא — לא פשה","No — did not spread"),v:"n"}]}];
if(nt==="clothing")return[
{k:"mat",q:TT("מהו חומר הבגד?","What is the garment material?"),src:S.clothing,show:always,opts:[{l:TT("צמר","Wool"),v:"wool"},{l:TT("פשתן","Linen"),v:"linen"},{l:TT("עור","Leather"),v:"leather"},{l:TT("חומר אחר — אינו מקבל נגע","Other material — cannot receive a nega"),v:"other",fin:true}]},
{k:"color",q:TT("מהו צבע הנגע בבגד?","What color is the nega on the garment?"),src:S.clothing,derm:true,xh:"נגעי בגדים: ירקרק או אדמדם — לא לבן.",xe:`Clothing nega'im are ${G.yerakrak} or ${G.adamdam} — NOT white.`,show:({a})=>a.mat!=="other",opts:[{l:TT("ירקרק — ירוק שבירוקים",`${G.yerakrak} — deep green`),v:"green"},{l:TT("אדמדם — אדום שבאדומים",`${G.adamdam} — deep red`),v:"red"},{l:TT("צבע אחר — אינו נגע בגד","Other color — not a clothing nega"),v:"other",fin:true}]},
{k:"sp",q:TT("האם הנגע פשה בבגד?","Has the nega spread in the garment?"),src:S.spreading,show:({a})=>v>=2&&a.mat!=="other"&&a.color!=="other",opts:[{l:TT("כן — פשה","Yes — it spread"),v:"y",fin:true},{l:TT("לא — לא פשה","No"),v:"n"}]},
{k:"washed",q:TT("האם הבגד כובס?","Has the garment been laundered?"),src:S.clothing,show:({a})=>v>=2&&a.sp==="n",opts:[{l:TT("כן — כובס","Yes — laundered"),v:"y"},{l:TT("לא — יש לכבס תחילה","No — must launder first"),v:"n",fin:true}]},
{k:"aw",q:TT("מצב הנגע לאחר הכיבוס:","State of the nega after laundering:"),src:S.clothing,show:({a})=>a.washed==="y",opts:[{l:TT("לא השתנה — אותו צבע",`Unchanged — ${G.pecheses}`),v:"same",fin:true},{l:TT("כהה — דהה",`Faded — ${G.keihah}`),v:"faded",fin:true},{l:TT("נעלם לחלוטין","Completely gone"),v:"gone",fin:true}]}];
if(nt==="house")return[
{k:"loc",q:TT("האם הבית בארץ ישראל?","Is the house in Eretz Yisrael?"),src:S.houses,xh:'רש"י (יד:לד): "ונתתי" — בשורה היא להם, שהכנענים הטמינו מטמוניות זהב בקירות.',xe:'Rashi (14:34): "I will place" — actually good news; Canaanites hid gold treasures in the walls.',show:always,opts:[{l:TT("כן — בארץ ישראל","Yes — in Eretz Yisrael"),v:"y"},{l:TT("לא","No"),v:"n",fin:true}]},
{k:"mat",q:TT("האם הבית בנוי מאבנים, עץ וטיח?","Is the house built of stone, wood, and plaster?"),src:S.houses,show:({a})=>a.loc==="y",opts:[{l:TT("כן","Yes"),v:"y"},{l:TT("לא — חומר אחר","No — other material"),v:"n",fin:true}]},
{k:"size",q:TT("האם גודל הנגע לפחות כשני גריסין?","Is the nega at least two gris in size?"),src:S.houseSize,xh:"שיעור נגע הבית: שני גריסין — כפול מנגעי עור.",xe:"House nega minimum: two gris — double the skin/clothing minimum.",show:({a})=>a.mat==="y",opts:[{l:TT("כן — שני גריסין או יותר","Yes — two gris or more"),v:"y"},{l:TT("לא — קטן משני גריסין","No — smaller"),v:"n",fin:true}]},
{k:"color",q:TT("מהו צבע הנגע בקיר?","What color are the streaks in the wall?"),src:S.housesColor,derm:true,show:({a})=>a.size==="y",opts:[{l:TT("ירקרקות — גוון ירוק","Greenish streaks"),v:"green"},{l:TT("אדמדמות — גוון אדום","Reddish streaks"),v:"red"},{l:TT("צבע אחר","Other color"),v:"other",fin:true}]},
{k:"deeper",q:TT("האם הנגע נראה שקוע/עמוק מפני הקיר?","Do the streaks appear deeper/sunken compared to the wall surface?"),src:S.housesColor,show:({a})=>a.color!=="other"&&a.size==="y",opts:[{l:TT("כן — שקערורות, נראה עמוק","Yes — sunken, appears deeper"),v:"y"},{l:TT("לא","No"),v:"n"}]},
{k:"sp",q:TT("האם הנגע פשה בקירות מאז ההסגר?","Has the nega spread in the walls since hesger?"),src:S.spreading,show:({a})=>v>=2&&a.size==="y"&&a.color!=="other",opts:[{l:TT("כן — פשה","Yes — it spread"),v:"y"},{l:TT("לא — לא פשה","No — did not spread"),v:"n"}]},
{k:"replastered",q:TT("האם חילצו אבנים, גרדו וטייחו מחדש?","Were stones removed, walls scraped, and replastered?"),src:S.housesDemolish,show:({a})=>v>=2&&a.sp==="y",opts:[{l:TT("כן — טויח מחדש","Yes — replastered"),v:"y"},{l:TT("לא — טרם","Not yet"),v:"n",fin:true}]},
{k:"returned",q:TT("האם הנגע חזר אחרי הטיח החדש?","Did the nega return after replastering?"),src:S.housesDemolish,show:({a})=>a.replastered==="y",opts:[{l:TT("כן — חזר","Yes — returned"),v:"y",fin:true},{l:TT("לא — לא חזר","No — did not return"),v:"n",fin:true}]}];
return[];}

function calc(nt,a,cd,lang){const v=cd?.visitNum||1;const g=k=>a[k];const T=(h,e)=>tx(lang,h,e);
// House — checked first because it uses different keys/thresholds than skin/clothing
if(nt==="house"){
  if(g("loc")==="n")return{v:T("לא חל","Does Not Apply"),x:T("נגעי בתים רק בארץ ישראל לאחר כיבוש וחילוק.","House nega'im only apply in Eretz Yisrael after conquest and division."),s:[S.houses]};
  if(g("mat")==="n")return{v:T("לא חל","Does Not Apply"),x:T("רק בתי אבנים, עץ וטיח.","Only stone, wood, and plaster houses."),s:[S.houses]};
  if(g("size")==="n")return{v:T("אינו נגע בית","Not a House Nega"),x:T("קטן משני גריסין — שיעור נגע בית: שני גריסין, לא אחד כנגעי עור.","Smaller than two gris — house nega minimum is TWO gris (unlike skin which is one)."),s:[S.houseSize]};
  if(g("color")==="other")return{v:T("אינו נגע בית","Not a House Nega"),x:T("צבע שאינו ירקרק/אדמדם — אינו נגע בית.","Color not greenish/reddish — not a house nega."),s:[S.housesColor]};
  if(g("returned")==="y")return{v:T("טמא — ינתץ","TAMEI — Demolish"),x:T("צרעת ממארת בבית. ינתץ את הבית — אבניו, עציו, וכל עפרו. יוציא אל מחוץ לעיר אל מקום טמא.","Mameres in the house. Demolish — stones, wood, and all plaster taken outside the city to a tamei place."),s:[S.housesDemolish]};
  if(g("returned")==="n")return{v:T("טהור","TAHOR"),x:T("הנגע לא חזר אחרי טיח חדש — הכהן מטהר את הבית.","Nega did not return after replastering — the Kohen declares the house tahor."),s:[S.housesClean]};
  if(g("replastered")==="n")return{v:T("יש לחלץ ולטייח","Remove + Replaster"),x:T("הנגע פשה. יש לחלץ את האבנים הנגועות, לגרד סביב, ולטייח בטיח חדש. לאחר מכן — לבדוק אם חזר.","The nega spread. Remove affected stones, scrape around, replaster with new plaster. Then check if it returns."),s:[S.housesDemolish]};
  if(v>=2&&g("sp")==="y")return{v:T("חילוץ אבנים","Remove Stones"),x:T("הנגע פשה בקירות. יש לחלץ אבנים נגועות, לגרד את הבית, ולטייח מחדש.","Spread in the walls. Remove affected stones, scrape the house, and replaster."),s:[S.housesDemolish]};
  if(v===2&&g("sp")==="n")return{v:T("הסגר שני","2nd HESGER"),x:T("לא פשה — הסגר שני, שבעת ימים נוספים.","Did not spread — second hesger, 7 more days."),s:[S.houses]};
  if(v>=3&&g("sp")==="n")return{v:T("טהור","TAHOR"),x:T("לא פשה לאחר שני הסגרות — טהור.","No spread after two hesger periods — tahor."),s:[S.housesClean]};
  return{v:T("הסגר","HESGER"),x:T("הבית יוסגר (יינעל) שבעת ימים. הנכנס לבית מוסגר — טמא עד הערב (יד:מו). השוכב או האוכל בבית — יכבס בגדיו (יד:מז).","The house is sealed for 7 days. Anyone entering during hesger — tamei until evening (14:46). One who lies down or eats inside — must wash clothes (14:47)."),s:[S.houses,S.housesEmpty]};
}
if(g("color")==="other"&&nt==="clothing")return{v:T("אינו נגע בגד","Not a Clothing Nega"),x:T("הצבע אינו ירקרק או אדמדם.",`Color is not ${G.yerakrak} or ${G.adamdam}.`),s:[S.clothing]};
if(g("color")==="other"&&nt!=="clothing")return{v:T("אינו נגע","Not a Nega"),x:T("הצבע אינו מארבע המראות.","The color doesn't match any of the four nega shades."),s:[S.fourShades]};
if(g("size")==="n")return{v:T("אינו נגע","Not a Nega"),x:T("קטן מכגריס — אין שיעור נגע.",`Smaller than a ${G.gris} — below minimum size.`),s:[S.grisSize]};
if(g("wt")==="no")return{v:T("בדוק שוב","Re-examine"),x:T("סוג המכה אינו תואם. שחין = שלא מחמת אש. מכוה = מחמת אש.","Wound type mismatch. Shechin = not fire. Burn = fire/heat."),s:[S.shechin,S.burn]};
if(g("mat")==="other")return{v:T("אינו נגע בגד","Not a Clothing Nega"),x:T("נגעי בגדים רק בצמר, פשתן, או עור.","Clothing nega'im only in wool, linen, or leather."),s:[S.clothing]};
if(nt==="skin"){
  // Full body — prior status matters (Negaim 8:1)
  if(g("fb")==="y"&&g("fbPrior")==="tahor")return{v:T("טמא","TAMEI"),x:T("פרחה בכולו מן הטהור — טמא. נגעים ח:א: הפורח מן הטהור טמא.","Full-body coverage on someone already tahor — tamei. Negaim 8:1: spreading over a tahor person = tamei."),s:[S.fullBody]};
  if(g("fb")==="y"&&g("mi")==="y")return{v:T("טמא","TAMEI"),x:T("פרחה בכולו מן הטמא אך נראה בשר חי — חזר לטומאתו.","Full-body coverage from tamei, but raw flesh appeared — returns to tumah."),s:[S.fullBodyRaw]};
  if(g("fb")==="y")return{v:T("טהור","TAHOR"),x:T("פרחה בכולו מן הטמא, אין בשר חי — טהור. נגעים ח:א: הפורח מן הטמא טהור. אם יופיע בשר חי — יחזור לטומאה.","Full-body coverage from tamei, no raw flesh — tahor. Negaim 8:1: spreading over a tamei person = tahor. If raw flesh appears — returns to tumah."),s:[S.fullBody]};
  if(g("mi")==="y"&&g("wh")==="y"&&g("ho")==="nf")return{v:T("טמא","TAMEI"),x:T("מחיה + שער לבן = צרעת נושנת. טמא מוחלט.",`${G.michya} + white hair = ${G.noshenes}. ${G.muchlat}.`),s:[S.michya,S.whiteHair]};
  if(g("mi")==="y")return{v:T("טמא","TAMEI"),x:T("מחיית בשר חי בנגע — סימן טומאה. טמא מוחלט.",`${G.michya} inside the nega — an independent tumah sign. ${G.muchlat}.`),s:[S.michya]};
  if(g("wh")==="y"&&g("deeper")==="y"&&g("ho")==="nf")return{v:T("טמא","TAMEI"),x:T("שער לבן (שהפך לאחר הנגע) + עמוק מהעור = טמא מוחלט.",`White hair (turned after nega) + deeper = ${G.muchlat}.`),s:[S.whiteHair,S.deeper]};
  if(g("wh")==="y"&&g("ho")==="hf")return{v:T("הסגר","HESGER"),x:T("שער לבן קדם לנגע — אינו סימן טומאה. יוסגר שבעת ימים.","White hair preceded the nega — not a tumah sign. Hesger 7 days."),s:[S.hairOrder,S.hesger]};
  if(g("wh")==="y"&&g("ho")==="unk")return{v:T("ספק — חכם","SAFEK — Chacham"),x:T("סדר הופעת השער והנגע אינו ידוע. סתם משנה (ד:יא): טמא. ר׳ יהושע: כהה. יש להפנות לחכם/פוסק.","Unknown order. Stam Mishnah (4:11): tamei. R' Yehoshua: keihah. Refer to Chacham/Posek."),s:[S.unkOrder]};
  if(g("wh")==="y"&&g("deeper")!=="y"&&g("ho")==="nf")return{v:T("הסגר","HESGER"),x:T("שער לבן נמצא אך מראה עמוק לא ברור — צריך שני סימנים. יוסגר.","White hair found but depth unclear — need both signs. Hesger."),s:[S.whiteHair,S.deeper,S.hesger]};
  if(v>=2&&g("sp")==="y")return{v:T("טמא","TAMEI"),x:T("הנגע פשה — סימן טומאה. טמא.",`The nega spread (${G.pisyon}) — tumah sign. Tamei.`),s:[S.spreading]};
  if(v>=2&&g("sp")==="f")return{v:T("טהור","TAHOR"),x:T("כהה מתחת לארבע מראות ולא פשה — טהור. יכבס בגדיו.",`${G.keihah} — faded below four shades and didn't spread — tahor. Wash clothing.`),s:[S.hesger]};
  if(v===2&&g("sp")==="n")return{v:T("הסגר שני","2nd HESGER"),x:T("לא פשה בשבוע הראשון — הסגר שני, שבעת ימים נוספים.","Didn't spread in first week — second hesger, 7 more days."),s:[S.hesger]};
  if(v>=3&&g("sp")==="n")return{v:T("טהור","TAHOR"),x:T("לא פשה לאחר שני שבועות — טהור. יכבס בגדיו.","No spread after two weeks — tahor. Wash clothing."),s:[S.hesger]};
  if(g("wh")==="1")return{v:T("הסגר","HESGER"),x:T("שערה אחת בלבד — אינה סימן (מיעוט שער שנים). יוסגר שבעת ימים.","Only one hair — not a sign (minimum two). Hesger 7 days."),s:[S.whiteHair,S.hesger]};
  return{v:T("הסגר","HESGER"),x:T("אין סימני טומאה מובהקים (שער לבן, מחיה, פשיון). יוסגר שבעת ימים.","No clear tumah signs (white hair, michya, spreading). Hesger 7 days."),s:[S.hesger]};
}
if(nt==="shechin"||nt==="burn"){const nm=nt==="shechin"?T("שחין","shechin"):T("מכוה","burn");
  if(g("wh")==="y"&&g("deeper")==="y")return{v:T("טמא","TAMEI"),x:T(`שער לבן + עמוק = צרעת פרחה ב${nm}. טמא.`,`White hair + deeper on ${nm} — tamei.`),s:[nt==="shechin"?S.shechin:S.burn]};
  if(v>=2&&g("sp")==="y")return{v:T("טמא","TAMEI"),x:T("הנגע פשה — טמא.",`${G.pisyon} — the nega spread. Tamei.`),s:[S.spreading,S.oneHesger]};
  if(v>=2&&(g("sp")==="n"||g("sp")==="f"))return{v:T("טהור","TAHOR"),x:T(`לא פשה — צרבת ה${nm}. אינה צרעת. טהור.`,`No spread — ${G.tzareves} of the ${nm}. Not tzara'as. Tahor.`),s:[nt==="shechin"?S.shechin:S.burn]};
  return{v:T("הסגר","HESGER"),x:T("הסגר אחד בלבד (שבעת ימים). שחין ומכוה אינם מקבלים הסגר שני.","ONE hesger only (7 days). Shechin/burn do NOT get a second hesger."),s:[S.oneHesger]};
}
if(nt==="nesek"){
  if(g("bh")==="both")return{v:T("ספק — חכם","Refer to Chacham"),x:T("נמצאו שער צהוב וגם שחור. שער שחור מציל — אך בשילוב עם צהוב יש להתייעץ.","Both yellow and black hair present. Black saves — but combination needs expert review."),s:[S.blackHair,S.yellowHair]};
  if(g("bh")==="y")return{v:T("טהור","TAHOR"),x:T("שער שחור צמח בנתק — סימן ריפוי. טהור.","Black hair grew in the nesek — sign of healing. Tahor."),s:[S.blackHair]};
  if(g("yh")==="y"&&g("deeper")==="y")return{v:T("טמא","TAMEI"),x:T("שער צהוב דק + עמוק = נתק. טמא.","Thin yellow hair + deeper = nesek confirmed. Tamei."),s:[S.yellowHair,S.nesek]};
  if(v>=2&&g("sp")==="y")return{v:T("טמא","TAMEI"),x:T("הנתק פשה — טמא. לא צריך לבדוק שער צהוב.","Nesek spread — tamei. No need to check for yellow hair."),s:[S.nesekSpread]};
  if(v===2&&g("sp")==="n")return{v:T("הסגר שני + גילוח","2nd HESGER + Shaving"),x:T("לא פשה. יגלח סביב הנתק (לא הנתק עצמו) — הסגר שני.","Didn't spread. Shave around nesek (not it) — second hesger."),s:[S.shaving]};
  if(v>=3&&g("sp")==="n")return{v:T("טהור","TAHOR"),x:T("לא פשה לאחר שני שבועות — טהור. יכבס בגדיו.","No spread after two weeks — tahor. Wash clothing."),s:[S.nesek]};
  return{v:T("הסגר","HESGER"),x:T("אין סימני טומאה מובהקים בנתק. יוסגר שבעת ימים.","No clear nesek signs. Hesger 7 days."),s:[S.nesek,S.hesger]};
}
if(nt==="bohak"){
  if(g("ci")==="dull")return{v:T("טהור","TAHOR"),x:T("בהק — לבן כהה מתחת לארבע המראות. אינו צרעת. טהור.",`${G.bohak} — dull white below the four shades. Not tzara'as. Tahor.`),s:[S.bohak]};
  if(g("ci")==="bright")return{v:T("בדוק כנגע עור","Examine as Skin Nega"),x:T("לבן עז המגיע לאחת מארבע המראות — ייתכן שזהו נגע. יש לבדוק כנגע עור.","White intensity matches one of the four shades — may be a nega. Examine as skin nega."),s:[S.fourShades]};
  return{v:T("ספק — חכם","Refer to Chacham"),x:T("קשה להבדיל בין בהק לנגע. ההבחנה דורשת מומחיות. הפנה לחכם/כהן מנוסה.","Difficult to distinguish bohak from nega. Requires expertise. Refer to Chacham."),s:[S.bohak,S.fourShades]};
}
if(nt==="bald"){
  if(g("np")==="n")return{v:T("טהור","TAHOR"),x:T("קרחת/גבחת ללא נגע — טהור. אין טומאה בנשירת שער.","Baldness without a nega — tahor. No tumah from hair loss."),s:[S.baldness]};
  if(g("mi")==="y")return{v:T("טמא","TAMEI"),x:T("מחיה בקרחת/גבחת — טמא. מחיה היא אחד משני הסימנים בקרחת/גבחת (נגעים י:י).",`${G.michya} on bald area — tamei. Michya is one of the two signs in karachas/gabachas (Negaim 10:10).`),s:[S.baldness,S.michya]};
  if(v>=2&&g("sp")==="y")return{v:T("טמא","TAMEI"),x:T("פשה — טמא. פשיון הוא הסימן השני בקרחת/גבחת.",`${G.pisyon} — the nega spread. Spreading is the second sign in karachas/gabachas.`),s:[S.spreading,S.baldness]};
  if(v>=3&&g("sp")==="n")return{v:T("טהור","TAHOR"),x:T("לא פשה ואין מחיה לאחר שני שבועות — טהור. יכבס בגדיו.","No spread and no michya after two weeks — tahor. Wash clothing."),s:[S.baldness]};
  return{v:T("הסגר","HESGER"),x:T("נגע בקרחת/גבחת ללא סימנים מובהקים (מחיה או פשיון). יוסגר שבעת ימים. שני שבועות הסגר בקרחת/גבחת.",`Nega on bald area without clear signs (${G.michya} or ${G.pisyon}). Hesger 7 days. Karachas/gabachas get two hesger weeks.`),s:[S.baldness,S.hesger]};
}
if(nt==="clothing"){
  if(g("color")==="other")return{v:T("אינו נגע בגד","Not a Clothing Nega"),x:T("צבע שאינו ירקרק או אדמדם.",`Not ${G.yerakrak} or ${G.adamdam}.`),s:[S.clothing]};
  if(v>=2&&g("sp")==="y")return{v:T("טמא — ישרף","TAMEI — Burn It"),x:T("צרעת ממארת — הנגע פשה. הבגד ישרף.",`${G.mameres} — spread in garment. Must be burned.`),s:[S.clothing]};
  if(g("washed")==="n")return{v:T("יכובס","Must Launder"),x:T("הבגד לא כובס. יש לכבסו ולהסגירו שבעת ימים נוספים.","Garment not yet laundered. Must be washed, then confined 7 more days."),s:[S.clothing]};
  if(g("aw")==="same")return{v:T("טמא — ישרף","TAMEI — Burn It"),x:T("פחתת — הנגע לא השתנה אחרי כיבוס. ישרף.",`${G.pecheses} — unchanged after laundering. Burn.`),s:[S.clothing]};
  if(g("aw")==="faded")return{v:T("יקרע — ויבדוק","Tear Out + Check"),x:T("כהה אחרי כיבוס — יקרע את מקום הנגע. אם יחזור — ישרף הכל. אם לא — כיבוס שני וטהור.",`Faded — tear out area. If ${G.porachas} — burn all. If not — 2nd laundering and tahor.`),s:[S.clothing]};
  if(g("aw")==="gone")return{v:T("טהור — כיבוס שני","TAHOR — 2nd Laundering"),x:T("הנגע נעלם. יכובס פעם שנייה וטהור.","Nega gone. Second laundering and tahor."),s:[S.clothing]};
  return{v:T("הסגר","HESGER"),x:T("בגד עם נגע ירקרק/אדמדם — יוסגר שבעת ימים.","Garment with green/red nega — hesger 7 days."),s:[S.clothing,S.hesger]};
}
return{v:"—",x:"",s:[]};}



/* ═══ DIAGNOSTIC SCREENS ═══ */
/* ═══ CATEGORY PICKER WITH ICONS ═══ */

function CategoryPicker({cat,setCat,lang}){
  const T=(h,e)=>tx(lang,h,e);
  const items=[
    {id:"person",he:"אדם",en:"Person",icon:<svg viewBox="0 0 40 40" style={{width:36,height:36}}><circle cx="20" cy="12" r="7" fill="none" stroke="currentColor" strokeWidth="1.5"/><path d="M8,38 Q8,24 20,22 Q32,24 32,38" fill="none" stroke="currentColor" strokeWidth="1.5"/></svg>},
    {id:"clothing",he:"בגד",en:"Clothing",icon:<svg viewBox="0 0 40 40" style={{width:36,height:36}}><path d="M12,6 L6,14 L12,16 L12,36 L28,36 L28,16 L34,14 L28,6 L23,10 Q20,12 17,10 Z" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/></svg>},
    {id:"house",he:"בית",en:"House",icon:<svg viewBox="0 0 40 40" style={{width:36,height:36}}><path d="M6,20 L20,8 L34,20" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/><rect x="10" y="20" width="20" height="16" fill="none" stroke="currentColor" strokeWidth="1.5"/><rect x="16" y="26" width="8" height="10" fill="none" stroke="currentColor" strokeWidth="1"/></svg>},
  ];
  return <div style={{display:"flex",gap:10,justifyContent:"center"}}>
    {items.map(it=>{const on=cat===it.id;return <button key={it.id} type="button" onClick={()=>setCat(it.id)} style={{
      flex:1,maxWidth:120,padding:"16px 8px",borderRadius:12,cursor:"pointer",
      display:"flex",flexDirection:"column",alignItems:"center",gap:8,
      background:on?"var(--ac)":"var(--s)",color:on?"#fff":"var(--t2)",
      border:`2px solid ${on?"var(--ac)":"var(--bd)"}`,transition:"all .2s",
      fontFamily:"var(--fb)",fontSize:13,fontWeight:on?700:500,
    }}>{it.icon}<span>{T(it.he,it.en)}</span></button>;})}
  </div>;
}

/* ═══ BODY PICKER — Profile head beside front body ═══ */
function BodyPicker({area,setArea,lang}){
  const T=(h,e)=>tx(lang,h,e);
  const s=id=>area===id;
  const f=id=>s(id)?"var(--ac)":"rgba(139,105,64,.06)";
  const sk=id=>s(id)?"var(--ac)":"rgba(139,105,64,.2)";
  const sw=id=>s(id)?2.5:1;
  const lc=id=>s(id)?"var(--ac)":"var(--t3)";
  const fw=id=>s(id)?700:400;

  return <div style={{display:"flex",flexDirection:"column",alignItems:"center",gap:6}}>
    <svg viewBox="0 0 320 300" style={{width:"100%",maxWidth:340,height:"auto"}}>

      {/* ═══ LEFT: Front-facing body (no head) ═══ */}
      {/* Neck stub */}
      <line x1="82" y1="10" x2="78" y2="28" stroke="var(--bd2)" strokeWidth="1"/>
      <line x1="98" y1="10" x2="102" y2="28" stroke="var(--bd2)" strokeWidth="1"/>
      {/* Body outline */}
      <path d="M60,28 L40,36 L36,120 L50,122 L54,44 L60,40 L60,142 L58,248 L76,250 L78,160 L102,160 L104,250 L122,248 L120,142 L120,40 L126,44 L130,122 L144,120 L140,36 L120,28 Z" fill="none" stroke="var(--bd2)" strokeWidth="1.2" strokeLinejoin="round"/>
      
      {/* Tappable body zones */}
      <rect x="60" y="28" width="60" height="114" rx="4" fill={f("torso")} stroke={sk("torso")} strokeWidth={sw("torso")} onClick={()=>setArea("torso")} style={{cursor:"pointer"}}/>
      <text x="90" y="88" fontSize="10" fill={lc("torso")} fontFamily="var(--fb)" textAnchor="middle" fontWeight={fw("torso")}>{T("גוף","Torso")}</text>
      
      <path d="M60,28 L40,36 L36,120 L50,122 L54,44 L60,40 Z" fill={f("arm_l")} stroke={sk("arm_l")} strokeWidth={sw("arm_l")} onClick={()=>setArea("arm_l")} style={{cursor:"pointer"}}/>
      <text x="28" y="80" fontSize="8" fill={lc("arm_l")} fontFamily="var(--fb)" textAnchor="end" fontWeight={fw("arm_l")}>{T("שמאל","L")}</text>
      
      <path d="M120,28 L140,36 L144,120 L130,122 L126,44 L120,40 Z" fill={f("arm_r")} stroke={sk("arm_r")} strokeWidth={sw("arm_r")} onClick={()=>setArea("arm_r")} style={{cursor:"pointer"}}/>
      <text x="152" y="80" fontSize="8" fill={lc("arm_r")} fontFamily="var(--fb)" fontWeight={fw("arm_r")}>{T("ימין","R")}</text>
      
      <path d="M60,142 L88,142 L86,250 L58,248 Z" fill={f("leg_l")} stroke={sk("leg_l")} strokeWidth={sw("leg_l")} onClick={()=>setArea("leg_l")} style={{cursor:"pointer"}}/>
      <text x="55" y="200" fontSize="8" fill={lc("leg_l")} fontFamily="var(--fb)" textAnchor="end" fontWeight={fw("leg_l")}>{T("שמאל","L")}</text>
      
      <path d="M92,142 L120,142 L122,248 L94,250 Z" fill={f("leg_r")} stroke={sk("leg_r")} strokeWidth={sw("leg_r")} onClick={()=>setArea("leg_r")} style={{cursor:"pointer"}}/>
      <text x="132" y="200" fontSize="8" fill={lc("leg_r")} fontFamily="var(--fb)" fontWeight={fw("leg_r")}>{T("ימין","R")}</text>

      {/* ═══ RIGHT: Human side-profile — BIGGER for easy tapping ═══ */}
      {/* Direction labels */}
      <text x="168" y="14" fontSize="9" fill="var(--t3)" fontFamily="var(--fm)" textAnchor="end" fontWeight="600">← {T("פנים","FRONT")}</text>
      <text x="308" y="14" fontSize="9" fill="var(--t3)" fontFamily="var(--fm)" fontWeight="600">{T("אחור","BACK")} →</text>

      {/* Head profile outline */}
      <path d="
        M256,20 C280,20 296,40 296,64
        L296,72 C296,75 294,78 292,82
        C289,88 283,96 275,104
        L264,114 L256,122 Q248,136 245,145
        L242,145 Q239,136 232,126
        L222,114 L217,104 L214,96
        L211,88 L214,82 L211,76
        L206,76 L209,64 L214,50
        C222,30 236,20 256,20 Z
      " fill="none" stroke="var(--bd2)" strokeWidth="2" strokeLinejoin="round"/>
      
      {/* Ear */}
      <path d="M294,58 C304,64 304,78 294,84" fill="none" stroke="var(--bd2)" strokeWidth="2"/>
      <path d="M296,64 C299,68 299,76 296,78" fill="none" stroke="var(--bd2)" strokeWidth="1"/>
      
      {/* Eye */}
      <ellipse cx="230" cy="60" rx="7" ry="4" fill="var(--bd2)"/>
      <circle cx="232" cy="60" r="2" fill="var(--bg)"/>
      
      {/* Eyebrow */}
      <path d="M222,53 C229,47 239,48 245,53" fill="none" stroke="var(--bd2)" strokeWidth="2"/>
      
      {/* Nose — bold */}
      <path d="M214,50 L209,64 L206,76 L211,76" fill="none" stroke="var(--bd2)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round"/>
      
      {/* Mouth */}
      <path d="M211,88 L219,85 L211,82" fill="none" stroke="var(--bd2)" strokeWidth="1.5" strokeLinejoin="round"/>
      
      {/* Beard strokes */}
      <g stroke="var(--bd2)" strokeWidth="1" opacity="0.3">
        <line x1="222" y1="106" x2="228" y2="120"/><line x1="234" y1="102" x2="240" y2="118"/>
        <line x1="246" y1="100" x2="252" y2="114"/><line x1="258" y1="96" x2="264" y2="108"/>
        <line x1="218" y1="110" x2="222" y2="122"/><line x1="270" y1="92" x2="274" y2="102"/>
      </g>

      {/* ── Crown dividing line ── */}
      <line x1="170" y1="44" x2="310" y2="44" stroke="var(--t3)" strokeWidth="1" strokeDasharray="4,2"/>

      {/* Karachas — back of skull */}
      <path d="M260,20 C280,20 296,40 296,44 L260,44 C250,44 248,32 260,20 Z" fill={f("head_back")} stroke={sk("head_back")} strokeWidth={sw("head_back")} onClick={()=>setArea("head_back")} style={{cursor:"pointer"}}/>

      {/* Gabachas — forehead */}
      <path d="M260,20 C236,20 222,32 214,44 L260,44 C250,44 248,32 260,20 Z" fill={f("head_front")} stroke={sk("head_front")} strokeWidth={sw("head_front")} onClick={()=>setArea("head_front")} style={{cursor:"pointer"}}/>

      {/* Face — crown to chin */}
      <path d="M214,44 L209,64 L206,76 L211,76 L211,82 L214,88 L218,94 L264,94 L282,78 L296,64 L296,44 Z" fill={f("face")} stroke={sk("face")} strokeWidth={sw("face")} onClick={()=>setArea("face")} style={{cursor:"pointer"}}/>

      {/* Beard — jaw to chin point */}
      <path d="M218,94 L214,98 L211,106 L218,112 L222,114 L232,126 Q239,136 242,145 L245,145 Q248,136 256,122 L264,114 L275,104 C283,96 280,94 264,94 Z" fill={f("beard")} stroke={sk("beard")} strokeWidth={sw("beard")} onClick={()=>setArea("beard")} style={{cursor:"pointer"}}/>

      {/* Labels */}
      <text x="280" y="34" fontSize="11" fill={lc("head_back")} fontFamily="var(--fb)" textAnchor="middle" fontWeight={fw("head_back")}>{T("קרחת","Back")}</text>
      <text x="232" y="34" fontSize="11" fill={lc("head_front")} fontFamily="var(--fb)" textAnchor="middle" fontWeight={fw("head_front")}>{T("גבחת","Front")}</text>
      <text x="194" y="72" fontSize="11" fill={lc("face")} fontFamily="var(--fb)" textAnchor="end" fontWeight={fw("face")}>{T("פנים","Face")}</text>
      <text x="194" y="118" fontSize="11" fill={lc("beard")} fontFamily="var(--fb)" textAnchor="end" fontWeight={fw("beard")}>{T("זקן","Beard")}</text>

    </svg>
    {area&&<div style={{fontSize:13,fontWeight:600,color:"var(--ac)",textAlign:"center",padding:"6px 16px",background:"rgba(139,105,64,.08)",borderRadius:8}}>{T("נבחר: ","Selected: ")}{tx(lang,BA.find(a=>a.id===area)?.he,BA.find(a=>a.id===area)?.en)}</div>}
  </div>;
}

function LoginScr({T,nav,onLogin}){const{lang,setLang,theme,setTheme}=useCtx();const[mode,setMode]=useState(null);const[id,setId]=useState("");const[nm,setNm]=useState("");const[cc,setCc]=useState("");const[err,setErr]=useState("");const dir=lang==="he"?"rtl":"ltr";const al=lang==="he"?"right":"left";
return <div className="sc" style={{paddingTop:40}}>
{/* Big language + theme controls on login */}
<div style={{display:"flex",justifyContent:"center",gap:6,marginBottom:24}}>
{[{id:"he",lbl:"עברית"},{id:"en",lbl:"English"},{id:"se",lbl:"Sephardic"}].map(l=><button key={l.id} type="button" onClick={()=>setLang(()=>l.id)} style={{padding:"10px 18px",fontSize:15,fontWeight:700,borderRadius:10,border:`2px solid ${lang===l.id?"var(--ac)":"var(--bd)"}`,background:lang===l.id?"var(--ac)":"var(--s)",color:lang===l.id?"#fff":"var(--t2)",cursor:"pointer",fontFamily:"var(--fb)"}}>{l.lbl}</button>)}
<button type="button" onClick={()=>setTheme(t=>t==="light"?"dark":"light")} style={{padding:"10px 14px",fontSize:18,borderRadius:10,border:"2px solid var(--bd)",background:"var(--s)",cursor:"pointer"}}>{theme==="light"?"☽":"☀"}</button>
</div>
<div style={{textAlign:"center",marginBottom:40}}><div style={{fontSize:48,fontFamily:"var(--fd)",fontWeight:900,color:"var(--ac)",lineHeight:1,marginBottom:8}}>נגעים</div><div style={{fontFamily:"var(--fd)",fontSize:20,fontWeight:300,color:"var(--t2)"}}>{T("מערכת אבחון צרעת","Tzara'as Diagnostic System")}</div><div style={{marginTop:12}}><SRef s={S.kohenOnly}/></div></div>
{!mode&&<div style={{display:"flex",flexDirection:"column",gap:12,direction:dir}}>
<button type="button" className="bn" onClick={()=>setMode("k")} style={{textAlign:al}}><span style={{fontSize:24}}>כ</span><div><div style={{fontWeight:600}}>{T("כניסת כהן מוסמך","Certified Kohen Login")}</div><div style={{fontSize:12,color:"var(--t3)"}}>{T("נדרש קוד הסמכה מבית דין","Requires Beis Din certification code")}</div></div></button>
<button type="button" className="bn" onClick={()=>{onLogin({type:"guest",name:T("אורח","Guest"),certified:false});nav("home");}} style={{textAlign:al}}><span style={{fontSize:24}}>א</span><div><div style={{fontWeight:600}}>{T("אורח — מצב לימוד","Guest — Training Mode")}</div><div style={{fontSize:12,color:"var(--t3)"}}>{T("תרגול ולימוד בלבד. אין תוקף הלכתי.","Practice and study only. No halachic validity.")}</div></div></button>
<SNote s={S.selfExam} xh="ר׳ מאיר: אף לא נגעי קרוביו" xe="R' Meir's view: not even the nega'im of his relatives"/></div>}
{mode==="k"&&<div style={{display:"flex",flexDirection:"column",gap:14,direction:dir}}>
<div><label>{T("שם הכהן","Kohen's Name")}</label><input className="if" style={{direction:dir,textAlign:al}} value={nm} onChange={e=>{setNm(e.target.value);setErr("");}}/></div>
<div><label>{T("מספר מזהה","ID Number")}</label><input className="if" style={{direction:"ltr",textAlign:"left"}} value={id} onChange={e=>{setId(e.target.value);setErr("");}}/></div>
<div><label>{T("קוד הסמכה (בית דין)","Certification Code (Beis Din)")}</label><input className="if" style={{direction:"ltr",textAlign:"left"}} value={cc} onChange={e=>{setCc(e.target.value);setErr("");}}/></div>
{err&&<div className="er">{err}</div>}
<button type="button" className="bn bp" onClick={()=>{if(!id.trim()||!nm.trim()){setErr(T("נא למלא את כל השדות","Please fill all fields"));return;}if(!cc.trim()){setErr(T("נדרש קוד הסמכה מבית דין מוסמך.","Beis Din certification code required."));return;}onLogin({type:"kohen",id:id.trim(),name:nm.trim(),certified:true});nav("home");}}>{T("כניסה","Login")}</button>
<button type="button" className="bk" onClick={()=>setMode(null)}>{T("→ חזרה","← Back")}</button></div>}
</div>;}

function HomeScr({T,user,nav,hist,logout,onNew}){const{lang}=useCtx();const ig=user?.type==="guest";
return <div className="sc">
{ig&&<div className="cd" style={{marginBottom:16,borderColor:"rgba(139,105,64,.18)"}}><div style={{fontSize:13,color:"var(--ac)"}}>⚠ {T("מצב לימוד בלבד — אין תוקף הלכתי לתוצאות.","Training mode only — results have no halachic validity.")}</div></div>}
<button type="button" className="bn bp" onClick={onNew} style={{marginBottom:24,fontSize:17,padding:16}}>+ {T("בדיקה חדשה","New Examination")}</button>
{hist.length>0&&<div><div style={{fontSize:14,fontWeight:600,color:"var(--t2)",marginBottom:12}}>{T("היסטוריה","History")}</div>
{hist.map((c,i)=>{const nt=[...PT,{id:"clothing",he:"בגד",en:"Clothing"},{id:"house",he:"בית",en:"House"}].find(x=>x.id===c.negaType);const vc=c.verdict?.includes("טמא")||c.verdict?.includes("TAMEI")||c.verdict?.includes("TAME")?"var(--tm)":c.verdict?.includes("טהור")||c.verdict?.includes("TAHOR")?"var(--th)":"var(--hg)";
return <div key={i} className="cd" style={{padding:"12px 16px",display:"flex",justifyContent:"space-between",alignItems:"center",marginBottom:8}}><div style={{fontSize:14,fontWeight:600}}>{c.patientId?T(`מטופל ${c.patientId}`,`Patient ${c.patientId}`):T("תרגול","Practice")} — {nt?tx(lang,nt.he,nt.en):""}</div>
<span className="rb" style={{fontSize:13,padding:"4px 10px",background:vc,color:"#fff"}}>{c.verdict}</span></div>;})}</div>}
<button type="button" onClick={logout} style={{background:"none",border:"none",color:"var(--t3)",fontSize:12,cursor:"pointer",marginTop:24,padding:0,fontFamily:"var(--fb)"}}>{T("התנתק","Sign out")}</button>
</div>;}

function NewCaseScr({T,user,onStart,back}){const{lang}=useCtx();const[cat,setCat]=useState(null);const[pid,setPid]=useState("");const[area,setArea]=useState(null);const[vn,setVn]=useState("1");const[lok,setLok]=useState(null);const[photo,setPhoto]=useState(null);
const[specialSit,setSpecialSit]=useState(null); // null | "none" | "groom" | "regel"
const[beisHastarim,setBeisHastarim]=useState(null); // null | "visible" | "hidden"
const fr=useRef();const ig=user?.type==="guest";const dir=lang==="he"?"rtl":"ltr";
useEffect(()=>()=>{if(photo?.url)URL.revokeObjectURL(photo.url);},[photo]);
const vs=[{v:"1",he:"ביקור ראשון",en:"First visit"},{v:"2",he:"הסגר ראשון (יום 7)",en:"1st Hesger (day 7)"},{v:"3",he:"הסגר שני (יום 14)",en:"2nd Hesger (day 14)"}];

/*
  BEIS HASTARIM (Negaim 6:8) — Hidden areas not subject to nega'im:
  - Inside eye, ear, nose, mouth
  - Skin folds (neck folds, under breasts, armpits)
  - Sole of foot, between fingers/toes
  - Under nails
  - Hair-covered head/beard (those are nesek territory, not skin)
  - Any area "not visible at a single glance" (שאינו נראה בבת אחת)
  
  SPECIAL SITUATIONS:
  - Groom during sheva brachos (Negaim 3:2) — 7-day deferral for himself, house, clothing
  - During a Regel/festival (Negaim 3:2) — deferred until after the festival
  - These are DEFERRALS, not exemptions — the nega must be examined afterward
  
  SKIN EXAMINATION RULE (Negaim 2:4):
  - Fair-skinned person: examine on darker body areas
  - Dark-skinned person: examine on lighter areas
  - Standard: intermediate-toned skin (Bnei Yisrael compared to boxwood)
*/

const isDeferred = specialSit==="groom"||specialSit==="regel";
const isHidden = beisHastarim==="hidden";
const ok=cat==="clothing"||cat==="house"?lok===true:cat==="person"&&area!==null&&lok===true&&!isDeferred&&!isHidden;
const go=()=>{if(pid.trim()&&pid.trim()===user?.id){alert(T("לא ניתן לבדוק נגעי עצמך!","Cannot examine your own nega'im!"));return;}
if(cat==="clothing"){onStart({patientId:null,area:null,category:"clothing",photo:photo?.url||null,visitNum:parseInt(vn),negaType:"clothing"});return;}
if(cat==="house"){onStart({patientId:null,area:null,category:"house",photo:photo?.url||null,visitNum:parseInt(vn),negaType:"house"});return;}
onStart({patientId:pid.trim()||null,area,category:"person",photo:photo?.url||null,visitNum:parseInt(vn),negaType:null});};
return <div className="sc"><div className="hd"><div style={{fontSize:18,fontFamily:"var(--fd)",fontWeight:700}}>{T("בדיקה חדשה","New Examination")}</div><button type="button" className="bk" onClick={back}>{T("→ חזרה","← Back")}</button></div>
<div className="sg"><label>{T("קטגוריה","Category")}</label><CategoryPicker cat={cat} setCat={setCat} lang={lang}/></div>

{/* ═══ SPECIAL SITUATIONS — Groom / Regel (Negaim 3:2) ═══ */}
{cat==="person"&&<div className="sg"><label>{T("מצב מיוחד","Special Circumstances")}</label>
<div className="tg">
<button type="button" className={`tb ${specialSit==="none"?"on":""}`} onClick={()=>setSpecialSit("none")}>{T("אין — רגיל","None — regular")}</button>
<button type="button" className={`tb ${specialSit==="groom"?"on":""}`} onClick={()=>setSpecialSit("groom")}>{T("חתן — שבעת ימי משתה","Groom — 7 days")}</button>
<button type="button" className={`tb ${specialSit==="regel"?"on":""}`} onClick={()=>setSpecialSit("regel")}>{T("רגל — חג","Festival — Regel")}</button>
</div>
{isDeferred&&<div className="cd" style={{marginTop:10,borderColor:"var(--hg)"}}>
<div style={{fontSize:15,fontWeight:700,color:"var(--hg)",fontFamily:"var(--fd)",marginBottom:6}}>{specialSit==="groom"?T("חתן — דחיית בדיקה","Groom — Examination Deferred"):T("רגל — דחיית בדיקה","Festival — Examination Deferred")}</div>
<div style={{fontSize:14,lineHeight:1.7,color:"var(--t2)"}}>{specialSit==="groom"
  ?T("חתן שנראה בו נגע — נותנין לו שבעת ימי המשתה, לו ולביתו ולכסותו. הבדיקה נדחית עד לאחר שבעת ימי השמחה.",
     "A groom in whom a nega appears — he is given his seven days of celebration, for himself, his house, and his clothing. Examination deferred until after the seven days.")
  :T("ברגל — נותנין לו כל ימות הרגל. הבדיקה נדחית עד לאחר החג.",
     "During a festival — he is given all the days of the festival. Examination deferred until after the holiday.")
}</div>
<SRef s={S.groomDeferral}/>
<div style={{marginTop:8,fontSize:12,color:"var(--t3)",fontStyle:"italic"}}>{T("הערה: זוהי דחייה, לא פטור. יש לבדוק לאחר התקופה.","Note: This is a deferral, not an exemption. Must be examined afterward.")}</div>
</div>}
</div>}

{cat==="person"&&!isDeferred&&<><div className="sg"><label>{T("מספר מזהה למטופל","Patient ID")}</label><input className="if" style={{direction:"ltr",textAlign:"left"}} placeholder={ig?T("לא חובה במצב לימוד","Optional in training mode"):""} value={pid} onChange={e=>setPid(e.target.value)}/></div>
<div className="sg"><label>{T("מיקום הנגע","Nega Location")}</label><BodyPicker area={area} setArea={setArea} lang={lang}/></div>

{/* ═══ BEIS HASTARIM CHECK (Negaim 6:8) ═══ */}
{area&&<div className="sg"><label>{T("מיקום מדויק — בית הסתרים","Exact Location — Hidden Areas")}</label>
<div style={{fontSize:13,lineHeight:1.7,color:"var(--t2)",marginBottom:10}}>{T(
  "בית הסתרים אינו מיטמא בנגעים. האם הנגע במקום גלוי הנראה בבת אחת?",
  "Hidden areas (beis hastarim) are not subject to nega'im. Is the nega in a visible area that can be seen at a single glance?"
)}</div>
<div className="tg">
<button type="button" className={`tb ${beisHastarim==="visible"?"on":""}`} onClick={()=>setBeisHastarim("visible")}>{T("כן — מקום גלוי","Yes — visible area")}</button>
<button type="button" className={`tb ${beisHastarim==="hidden"?"on":""}`} onClick={()=>setBeisHastarim("hidden")}>{T("לא — בית הסתרים","No — hidden area")}</button>
</div>
{isHidden&&<div className="cd" style={{marginTop:10,borderColor:"var(--hg)"}}>
<div style={{fontSize:15,fontWeight:700,color:"var(--hg)",fontFamily:"var(--fd)",marginBottom:6}}>{T("בית הסתרים — אינו מיטמא","Beis HaStarim — Not Subject to Nega'im")}</div>
<div style={{fontSize:14,lineHeight:1.7,color:"var(--t2)"}}>{T(
  "נגע במקום מוסתר אינו מיטמא בנגעים. מקומות אלו כוללים: תוך העין, האוזן, החוטם, הפה; קמטי הצואר; תחת הדד; בית השחי; כף הרגל מלמטה; בין האצבעות; תחת הציפורן; כל מקום שאינו נראה בבת אחת.",
  "A nega in a hidden area is not subject to nega'im tumah. These areas include: inside the eye, ear, nose, mouth; neck folds; under breasts; armpits; sole of foot; between fingers/toes; under nails; any area not visible at a single glance."
)}</div>
<SRef s={S.beisHastarim}/>
</div>}
{beisHastarim==="visible"&&<SNote s={S.skinExamRule} xh="בהיר — בודק במקום כהה. כהה — בודק במקום בהיר." xe="Fair-skinned — examine darker areas. Dark-skinned — examine lighter areas."/>}
</div>}
</>}
{cat&&<><div className="sg"><label>{T("מספר ביקור","Visit Number")}</label><div className="tg">{vs.map(x=><button key={x.v} type="button" className={`tb ${vn===x.v?"on":""}`} onClick={()=>setVn(x.v)}>{tx(lang,x.he,x.en)}</button>)}</div><SRef s={S.hesger}/></div>
<div className="sg"><label>{T("בדיקת תאורה","Lighting Check")}</label><SNote s={S.lightReq}/><div className="tg" style={{marginTop:10}}><button type="button" className={`tb ${lok===true?"on":""}`} onClick={()=>setLok(true)}>{T("תאורה תקינה","Lighting OK")}</button><button type="button" className={`tb ${lok===false?"on":""}`} onClick={()=>setLok(false)} style={lok===false?{borderColor:"var(--dg)",color:"var(--dg)"}:{}}>{T("תאורה לא מתאימה","Inadequate Lighting")}</button></div>
{lok===false&&<div className="wn" style={{marginTop:8}}>{T("⚠ אין לבדוק בתנאי תאורה אלו.","⚠ Cannot examine under these conditions.")}</div>}</div>
{lok===true&&<div className="cd" style={{marginTop:8,opacity:0.45,padding:"14px 16px"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><span style={{fontSize:14,fontWeight:700,color:"var(--t3)"}}>{T("כיול מסך ⬜","Screen Calibration ⬜")}</span><span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"var(--s3)",color:"var(--t3)",fontFamily:"var(--fm)",fontWeight:600}}>{T("בקרוב","COMING SOON")}</span></div>
</div>}
<div className="sg"><label>{T("צילום הנגע (רשות)","Photo of Nega (optional)")}</label><input type="file" accept="image/*" ref={fr} style={{display:"none"}} onChange={e=>{const f=e.target.files?.[0];if(f){if(photo?.url)URL.revokeObjectURL(photo.url);setPhoto({url:URL.createObjectURL(f)});}}}/>
{!photo?<div className="pu" onClick={()=>fr.current?.click()}><div style={{fontSize:32,opacity:.3}}>📷</div><div style={{color:"var(--t2)",fontSize:14}}>{T("לחץ לצילום או העלאה","Tap to take photo or upload")}</div></div>
:<div style={{position:"relative"}}><img src={photo.url} alt="nega" style={{width:"100%",borderRadius:12}}/><button type="button" className="bn bs bo" style={{position:"absolute",top:8,left:8}} onClick={()=>{URL.revokeObjectURL(photo.url);setPhoto(null);}}>✕</button></div>}</div>
<button type="button" className="bn bp" disabled={!ok} onClick={go} style={{opacity:ok?1:.4,marginBottom:30}}>{T("המשך לבדיקה →","Continue to Examination →")}</button></>}
</div>;}

function SelTypeScr({T,ac,setAc,nav,back}){const{lang}=useCtx();const al=lang==="he"?"right":"left";
useEffect(()=>{if(ac?.category==="clothing"||ac?.category==="house")nav("examine");},[ac,nav]);
if(ac?.category==="clothing"||ac?.category==="house")return null;
const aid=ac?.area;
const AREA_TYPES={
  torso:["skin","shechin","burn","bohak"],arm_r:["skin","shechin","burn","bohak"],arm_l:["skin","shechin","burn","bohak"],
  leg_r:["skin","shechin","burn","bohak"],leg_l:["skin","shechin","burn","bohak"],face:["skin","shechin","burn","bohak"],
  beard:["nesek","bohak"],head_back:["nesek","bald","bohak"],head_front:["nesek","bald","bohak"],
};
const allowed=AREA_TYPES[aid]||[];
const fl=PT.filter(x=>allowed.includes(x.id));
const sel=id=>{const vr=validateVisit(id,ac.visitNum);if(!vr.valid){alert(tx(lang,vr.he,vr.en));return;}setAc(p=>({...p,negaType:id}));nav("examine");};
return <div className="sc"><div className="hd"><div style={{fontSize:18,fontFamily:"var(--fd)",fontWeight:700}}>{T("סוג הנגע","Nega Type")}</div><button type="button" className="bk" onClick={back}>{T("→ חזרה","← Back")}</button></div>
<div style={{fontSize:13,color:"var(--t2)",marginBottom:16}}>{T("מיקום","Location")}: {tx(lang,BA.find(a=>a.id===aid)?.he,BA.find(a=>a.id===aid)?.en)}</div>
<div style={{display:"flex",flexDirection:"column",gap:10}}>{fl.map(x=><button key={x.id} type="button" className="bn" onClick={()=>sel(x.id)} style={{textAlign:al}}>
<span style={{fontSize:22,opacity:.5,width:32,textAlign:"center",flexShrink:0}}>{x.ic}</span><div style={{flex:1}}><div style={{fontWeight:600}}>{tx(lang,x.he,x.en)}</div><div style={{fontSize:12,color:"var(--t3)"}}>{tx(lang,x.dh,x.de)}</div></div><span className="st">{x.p}</span></button>)}</div></div>;}

function ExamineScr({T,ac,nav,onFinish}){const{lang}=useCtx();const[ans,setAns]=useState({});const nt=ac?.negaType;
const allSteps=useMemo(()=>getAllSteps(nt,ac,lang),[nt,ac,lang]);
const visSteps=useMemo(()=>allSteps.filter(s=>s.show({a:ans,cd:ac})),[allSteps,ans,ac]);
const[si,setSi]=useState(0);const cs=visSteps[si];const al=lang==="he"?"right":"left";
const ntd=[...PT,{id:"clothing",he:"בגד",en:"Clothing"},{id:"house",he:"בית",en:"House"}].find(x=>x.id===nt);
const doFin=a=>{const r=calc(nt,a,ac,lang);onFinish({...a,verdict:r.v,explanation:r.x,sources:r.s});};
const go=(k,val,fin)=>{const nx={...ans,[k]:val};setAns(nx);if(fin){doFin(nx);return;}const nv=allSteps.filter(s=>s.show({a:nx,cd:ac}));const ci=nv.findIndex(s=>s.k===k);if(ci<nv.length-1)setSi(ci+1);else doFin(nx);};
if(!cs)return <div className="sc" style={{paddingTop:40,textAlign:"center"}}><button type="button" className="bn bp" onClick={()=>doFin(ans)}>{T("חשב תוצאה","Compute Result")}</button></div>;
return <div className="sc">
<div className="hd"><div><div style={{fontSize:16,fontFamily:"var(--fd)",fontWeight:700}}>{ntd?tx(lang,ntd.he,ntd.en):""}</div><div style={{fontSize:11,color:"var(--t3)",fontFamily:"var(--fm)"}}>{T(`שלב ${si+1} מתוך ${visSteps.length}`,`Step ${si+1} of ${visSteps.length}`)}</div></div>
<button type="button" className="bk" onClick={()=>si>0?setSi(s=>s-1):nav(ac?.category==="clothing"||ac?.category==="house"?"newcase":"seltype")}>{T(si>0?"→ הקודם":"→ חזרה",si>0?"← Previous":"← Back")}</button></div>
<div style={{height:3,background:"var(--s2)",borderRadius:2,marginBottom:20}}><div style={{height:"100%",width:`${((si+1)/visSteps.length)*100}%`,background:"var(--ac)",borderRadius:2,transition:"width .3s"}}/></div>
<div key={cs.k} style={{animation:"si .2s ease"}}><div style={{fontSize:17,fontFamily:"var(--fd)",fontWeight:700,lineHeight:1.5,marginBottom:6}}>{cs.q}</div>
{cs.src&&<SNote s={cs.src} xh={cs.xh} xe={cs.xe}/>}{cs.warn&&<div className="wn" style={{marginTop:10}}>{cs.warn}</div>}
<div style={{display:"flex",flexDirection:"column",gap:10,marginTop:20}}>{cs.opts.map((o,i)=><button key={i} type="button" className={`bn ${ans[cs.k]===o.v?"bp":""}`} onClick={()=>go(cs.k,o.v,o.fin??false)} style={{textAlign:al}}>
<div style={{flex:1}}><div>{o.l}</div>{o.s&&<div style={{fontSize:12,color:"var(--t3)",marginTop:2}}>{o.s}</div>}</div></button>)}</div>
{cs.derm&&<><div className="cd" style={{marginTop:12,opacity:0.45,padding:"12px 16px"}}>
<div style={{display:"flex",alignItems:"center",gap:8}}><span style={{display:"flex",gap:2}}><span style={{width:14,height:14,borderRadius:3,background:"#FFFFFF",border:"1px solid #ddd"}}/><span style={{width:14,height:14,borderRadius:3,background:"#F2EBD9",border:"1px solid #ddd"}}/><span style={{width:14,height:14,borderRadius:3,background:"#EAE0CA",border:"1px solid #ddd"}}/><span style={{width:14,height:14,borderRadius:3,background:"#E2D6BC",border:"1px solid #ddd"}}/></span>
<span style={{fontSize:13,fontWeight:600,color:"var(--t3)"}}>{T("סולם צבעים","Color Scale")}</span><span style={{fontSize:10,padding:"2px 8px",borderRadius:10,background:"var(--s3)",color:"var(--t3)",fontFamily:"var(--fm)",fontWeight:600}}>{T("בקרוב","COMING SOON")}</span></div>
</div><div className="cd" style={{marginTop:8,borderColor:"rgba(155,48,48,.2)"}}><div style={{fontSize:13,color:"var(--t2)"}}>{T("אם הצבע אינו תואם — אינו נגע. מומלץ לפנות לרופא עור.","If the color doesn't match — not a nega. See a dermatologist.")}</div><SRef s={S.fourShades}/></div></>}
</div></div>;}

function ResultScr({T,hist,user,nav}){const{lang}=useCtx();const c=hist[0];if(!c)return null;
const isTm=c.verdict?.includes("טמא")||c.verdict?.includes("TAMEI")||c.verdict?.includes("TAME");const isTh=c.verdict?.includes("טהור")||c.verdict?.includes("TAHOR");
const vc=isTm?"var(--tm)":isTh?"var(--th)":"var(--hg)";const ig=user?.type==="guest";
return <div className="sc" style={{paddingTop:30}}>
<div style={{textAlign:"center",marginBottom:24}}><div className="rb" style={{background:vc,color:"#fff",display:"inline-flex",fontSize:22,padding:"10px 28px"}}>{c.verdict}</div></div>
{ig&&<div className="cd" style={{marginBottom:16,borderColor:"rgba(139,105,64,.18)"}}><div style={{fontSize:12,color:"var(--ac)"}}>⚠ {T("מצב לימוד — ללא תוקף הלכתי","Training mode — no halachic validity")}</div></div>}
<div className="cd" style={{marginBottom:16}}><div style={{fontSize:15,lineHeight:1.7}}>{c.explanation}</div></div>
{c.sources?.length>0&&<div className="cd" style={{marginBottom:16}}>
<div style={{fontSize:14,fontWeight:600,marginBottom:10,color:"var(--ac)"}}>{T("מקורות","Sources")}</div>
{c.sources.map((sr,i)=><div key={i} style={{marginBottom:i<c.sources.length-1?12:0}}>
<div style={{fontSize:14,fontFamily:"var(--fd)",direction:"rtl",textAlign:"right"}}>{sr.he}</div>
{lang!=="he"&&<div style={{fontSize:13,color:"var(--t2)",direction:"ltr",textAlign:"left"}}>{se(lang,sr.en)}</div>}
<SRef s={sr}/></div>)}</div>}
{isTm&&<div className="cd" style={{borderColor:"rgba(163,58,42,.2)"}}>
<div style={{fontSize:14,fontWeight:600,marginBottom:8}}>{T("דין המצורע","Laws of the Metzora")}</div>
<div style={{fontSize:14,lineHeight:1.7,color:"var(--t2)",direction:"rtl",textAlign:"right"}}>בגדיו פרומים, ראשו פרוע, על שפם יעטה, וטמא טמא יקרא. בדד ישב מחוץ למחנה.</div>
{lang!=="he"&&<div style={{fontSize:13,color:"var(--t2)",marginTop:8,direction:"ltr",textAlign:"left"}}>{se(lang,`His garments shall be ${G.pruim} (torn), his head ${G.parua} (unshorn), he covers his lip, and calls "Tamei! Tamei!" He dwells alone, outside the camp.`)}</div>}
<SRef s={S.metzora}/>
<div className="nb" style={{marginTop:10}}>{T('רש"י: כאבל. "טמא טמא" — מודיע צערו ורבים מבקשים עליו רחמים. חז"ל: הוא הבדיל בין איש לרעהו בלשון הרע — לפיכך יבדל.','Rashi: Like a mourner. "Tamei, tamei" — announces his distress so others will pray for him. Chazal: He separated people through lashon hara (evil speech), so he is separated from everyone.')}</div>
</div>}
<button type="button" className="bn bp" style={{marginTop:20,marginBottom:30}} onClick={()=>nav("home")}>{T("חזרה לתפריט","Back to Menu")}</button></div>;}

/* ═══════════════════════════════════════
   MAIN APP — Tabs + Theme
   ═══════════════════════════════════════ */
export default function App(){
  const[lang,setLang]=useState("he");const[theme,setTheme]=useState("light");
  const[tab,setTab]=useState("diag"); // "tree" or "diag"
  const[scr,setScr]=useState("login");const[user,setUser]=useState(null);const[ac,setAc]=useState(null);const[hist,setHist]=useState([]);
  const nav=useCallback(s=>{setScr(s);window.scrollTo(0,0);},[]);const initC=useCallback(d=>{setAc(d);setScr("seltype");},[]);
  const compC=useCallback(r=>{setHist(p=>[{...ac,...r,ts:new Date().toISOString()},...p]);setAc(null);setScr("result");},[ac]);
  const logout=useCallback(()=>{setUser(null);setAc(null);setScr("login");},[]);
  const dir=lang==="he"?"rtl":"ltr";const al=lang==="he"?"right":"left";const T=useCallback((h,e)=>tx(lang,h,e),[lang]);
  const themeVars=theme==="dark"?`:root{--bg:#0F0E0C;--s:#1A1814;--s2:#232019;--s3:#2C2820;--bd:rgba(212,195,160,.12);--bd2:rgba(212,195,160,.22);--t:#D4C3A0;--t2:rgba(212,195,160,.6);--t3:rgba(212,195,160,.35);--ac:#C4956A;--ac2:#A07A55;--tm:#A33A2A;--th:#2E6B3A;--hg:#8B7B3A;--dg:#D4836A;--fd:'Frank Ruhl Libre','Cormorant Garamond',serif;--fb:'Noto Sans Hebrew','Cormorant Garamond',sans-serif;--fm:'JetBrains Mono',monospace;--r:10px}`
  :`:root{--bg:#FAF7F2;--s:#FFFFFF;--s2:#F0ECE4;--s3:#E6E0D6;--bd:rgba(60,50,35,.1);--bd2:rgba(60,50,35,.2);--t:#2C2418;--t2:rgba(44,36,24,.65);--t3:rgba(44,36,24,.3);--ac:#8B6940;--ac2:#A07A45;--tm:#A33A2A;--th:#2E6B3A;--hg:#8B7B3A;--dg:#A03030;--fd:'Frank Ruhl Libre','Cormorant Garamond',serif;--fb:'Noto Sans Hebrew','Cormorant Garamond',sans-serif;--fm:'JetBrains Mono',monospace;--r:10px}`;

  const loggedIn = !!user;

  return <Ctx.Provider value={{lang,setLang,theme,setTheme}}>
  <div style={{minHeight:"100vh",background:"var(--bg)",color:"var(--t)",fontFamily:"var(--fb)",direction:dir,textAlign:al,transition:"background .3s,color .3s"}}>
  <style>{`@import url('https://fonts.googleapis.com/css2?family=Frank+Ruhl+Libre:wght@300;400;500;700;900&family=Noto+Sans+Hebrew:wght@300;400;500;600;700&family=Cormorant+Garamond:wght@400;600;700&family=JetBrains+Mono:wght@400;500&display=swap');
${themeVars}
*{box-sizing:border-box;margin:0;padding:0}.ac{max-width:480px;margin:0 auto;min-height:100vh;padding:0 16px}.sc{animation:si .3s ease}@keyframes si{from{opacity:0;transform:translateY(16px)}to{opacity:1;transform:translateY(0)}}
.bn{width:100%;padding:14px 18px;background:var(--s2);border:1px solid var(--bd);border-radius:var(--r);color:var(--t);font-family:var(--fb);font-size:16px;font-weight:500;cursor:pointer;transition:all .15s;display:flex;align-items:center;gap:12px}.bn:hover{background:var(--s3);border-color:var(--bd2)}.bn:active{transform:scale(.98)}
.bp{background:var(--ac2);border-color:var(--ac);color:#fff;font-weight:700;justify-content:center}.bp:hover{background:var(--ac)}.bs{padding:8px 14px;font-size:13px;width:auto}.bo{background:transparent;border:1px solid var(--bd2);color:var(--t2)}
.if{width:100%;padding:12px 16px;background:var(--s);border:1px solid var(--bd);border-radius:var(--r);color:var(--t);font-family:var(--fb);font-size:16px;font-weight:500;outline:none}.if:focus{border-color:var(--ac2)}.if::placeholder{color:var(--t3)}
.st{display:inline-flex;align-items:center;gap:4px;padding:4px 10px;background:rgba(139,105,64,.1);border:1px solid rgba(139,105,64,.18);border-radius:6px;font-size:12px;font-weight:600;color:var(--ac);white-space:nowrap;direction:rtl;cursor:pointer}
.cd{background:var(--s);border:1px solid var(--bd);border-radius:12px;padding:18px}.nb{background:rgba(139,105,64,.06);border-right:3px solid rgba(139,105,64,.2);padding:12px 14px;border-radius:0 8px 8px 0;font-size:14px;line-height:1.7;color:var(--t2)}
.tg{display:flex;gap:8px;flex-wrap:wrap}.tb{flex:1;min-width:0;padding:10px 8px;background:var(--s);border:1px solid var(--bd);border-radius:var(--r);color:var(--t2);font-family:var(--fb);font-size:15px;font-weight:500;cursor:pointer;text-align:center}.tb.on{background:var(--s3);border-color:var(--ac2);color:var(--t);font-weight:700}
.hd{display:flex;align-items:center;justify-content:space-between;padding:16px 0;border-bottom:1px solid var(--bd);margin-bottom:20px}.bk{background:none;border:none;color:var(--ac);font-family:var(--fb);font-size:14px;cursor:pointer}
.sg{margin-bottom:20px}label{display:block;font-size:13px;font-weight:600;color:var(--t2);margin-bottom:8px}
.pu{border:2px dashed var(--bd2);border-radius:12px;padding:30px 20px;text-align:center;cursor:pointer;background:var(--s)}.pu:hover{border-color:var(--ac2)}
.rb{display:inline-flex;align-items:center;gap:6px;padding:8px 20px;border-radius:8px;font-family:var(--fd);font-size:20px;font-weight:800}
.wn{padding:10px 14px;background:rgba(155,48,48,.08);border:1px solid rgba(155,48,48,.15);border-radius:8px;font-size:13px;color:var(--dg)}
.er{color:var(--dg);font-size:13px;padding:8px 12px;background:rgba(212,131,106,.08);border-radius:8px}`}</style>

  {/* ═══ FIXED TOP BAR — always above everything ═══ */}
  {loggedIn&&<div style={{position:"fixed",top:0,left:0,width:"100%",zIndex:9999,background:"var(--bg)",borderBottom:"1px solid var(--bd)",padding:"10px 16px",boxSizing:"border-box"}}>
    <div style={{maxWidth:480,margin:"0 auto",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
      <div style={{fontFamily:"var(--fd)",fontSize:20,fontWeight:900,color:"var(--ac)"}}>נגעים</div>
      <div style={{display:"flex",alignItems:"center",gap:6}}>
        {tab==="diag"&&scr!=="home"&&<button type="button" onClick={()=>{if(scr==="result"||scr==="newcase")nav("home");else if(scr==="seltype")nav("newcase");else if(scr==="examine"){const c=ac?.category;nav(c==="clothing"||c==="house"?"newcase":"seltype");}}} style={{background:"none",border:"none",cursor:"pointer",padding:"4px 6px",display:"flex",alignItems:"center",gap:3,color:"var(--ac)",fontSize:13,fontFamily:"var(--fb)",fontWeight:600}}><svg viewBox="0 0 20 20" style={{width:14,height:14}}><path d="M13,4 L7,10 L13,16" fill="none" stroke="var(--ac)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>{T("חזרה","Back")}</button>}
        <button type="button" onClick={()=>{setTab("diag");setScr("home");window.scrollTo(0,0);}} style={{background:"none",border:"none",cursor:"pointer",padding:"4px 6px",display:"flex",alignItems:"center"}} title={T("בית","Home")}><svg viewBox="0 0 24 24" style={{width:20,height:20}}><path d="M4,12 L12,5 L20,12" fill="none" stroke={scr==="home"&&tab==="diag"?"var(--ac)":"var(--t3)"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/><path d="M6,11 L6,19 L10,19 L10,15 L14,15 L14,19 L18,19 L18,11" fill="none" stroke={scr==="home"&&tab==="diag"?"var(--ac)":"var(--t3)"} strokeWidth="1.8" strokeLinejoin="round"/></svg></button>
        <Controls/>
      </div>
    </div>
    {/* Tabs */}
    <div style={{maxWidth:480,margin:"8px auto 0",display:"flex",gap:4}}>
      {[{id:"tree",he:"עץ אבחון",en:"Diagnostic Tree"},{id:"diag",he:"בדיקה",en:"Examination"}].map(t=>(
        <button key={t.id} type="button" onClick={()=>{setTab(t.id);window.scrollTo(0,0);}} style={{flex:1,padding:"8px 0",borderRadius:8,fontSize:13,fontWeight:600,fontFamily:"var(--fb)",cursor:"pointer",border:"1px solid "+(tab===t.id?"var(--ac)":"var(--bd)"),background:tab===t.id?"var(--ac)":"transparent",color:tab===t.id?"#fff":"var(--t3)",transition:"all .15s"}}>{T(t.he,t.en)}</button>
      ))}
    </div>
  </div>}

  {/* Content — offset for fixed nav */}
  <div className="ac" style={{paddingTop:loggedIn?95:0}}>
    {!loggedIn && <LoginScr T={T} nav={nav} onLogin={setUser}/>}
    {loggedIn && tab==="tree" && <TreeView/>}
    {loggedIn && tab==="diag" && <>
      {scr==="home"&&<HomeScr T={T} user={user} nav={nav} hist={hist} logout={logout} onNew={()=>nav("newcase")}/>}
      {scr==="newcase"&&<NewCaseScr T={T} user={user} onStart={initC} back={()=>nav("home")}/>}
      {scr==="seltype"&&<SelTypeScr T={T} ac={ac} setAc={setAc} nav={nav} back={()=>nav("newcase")}/>}
      {scr==="examine"&&<ExamineScr T={T} ac={ac} nav={nav} onFinish={compC}/>}
      {scr==="result"&&<ResultScr T={T} hist={hist} user={user} nav={nav}/>}
    </>}
  </div>
  </div></Ctx.Provider>;
}
