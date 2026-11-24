# Second sweep (2026-11-24): Rishonim beyond Rashi and Tosafos who quote piyut lines.
# Each quote must occur (nikud-insensitive) in the Rishon's text as fetched from Sefaria;
# the build fails otherwise. Placement (W) is only what the Rishon states; anything else
# is left to the liturgy match done in build.py or marked unplaced.
# Tuple: (section, ref, [quotes], paytan as the Rishon names him, [(slot, note)] stated by the Rishon)
R = 'rishon'
MORE = [
 # ---- Torah: Chizkuni
 ("torah2", "Chizkuni, Genesis 30:21:1", ["עובר להמיר בבטן אחות"], "", []),
 ("torah2", "Chizkuni, Exodus 5:1:1", ["יכנס הבא במנה ואלה לבד באחרונה"], "", []),
 ("torah2", "Chizkuni, Exodus 12:2:3", ["ועד שלשים מחצות לא ניכר בחוצות"], "", []),
 ("torah2", "Chizkuni, Exodus 13:17:5", ["אם תשקור לי ולניני ולנכדי"], "", []),
 ("torah2", "Chizkuni, Exodus 14:21:1", ["פונו כאן וכאן שליש רוב מימות צועו הנותרים למדרס פעמות"], "", []),
 ("torah2", "Chizkuni, Exodus 17:16:2", ["נא זכור יום זבולך"], "", []),
 ("torah2", "Chizkuni, Leviticus 23:24:1", ["אם יקרה בשבת קדש זכרון תרועה מקרא קדש"], "", [("rh", "בקרובץ של ראש השנה")]),
 ("torah2", "Chizkuni, Leviticus 26:44:1", ["ואין שיור רק התורה הזאת"], "", []),
 ("torah2", "Chizkuni, Numbers 8:4:1", ["במה יתרצה אשכול הכופר"], "", []),
 ("torah2", "Chizkuni, Numbers 19:21:2", ["יביאו איל מוקרן במטרה בראשו חבל ושוט טהרה"], "הקליר", [("parah", "בפרשת פרה אדומה")]),
 ("torah2", "Chizkuni, Numbers 21:1:1", ["כסות ולשון שנה היות מלך ערד"], "ר' אליעזר הקליר", [("zachor", "בפרשת זכור")]),
 ("torah2", "Chizkuni, Deuteronomy 6:4:1", ["ושמו מעולה למעלה משבעים"], "", [("azharos", "באזהרת ראשית")]),
 # ---- Da'at Zekenim
 ("torah2", "Da'at Zekenim on Genesis 1:16:1", ["ראה והקטין צורת הלבנה"], "", [("shabbos", "ביוצר של שבת")]),
 ("torah2", "Da'at Zekenim on Genesis 41:1:2", ["ממכות עצמן מתקן רטיה"], "", []),
 ("torah2", "Da'at Zekenim on Exodus 6:20:1", ["אחות אב על כל נעלם תכסך בושה ונכרת לעולם"], "", [("azharos", "באזהרות")]),
 ("torah2", "Da'at Zekenim on Exodus 19:17:1", ["עטיפת הזיין צהלה ורנה"], "", [("azharos", "באזהרות ראשית")]),
 ("torah2", "Da'at Zekenim on Exodus 28:10:1", ["גלף מישפה תבנית"], "", [("purim", "בקרובץ של פורים")]),
 ("torah2", "Da'at Zekenim on Leviticus 11:45:1", ["נאה לקדוש פאר מקדושים"], "", []),
 ("torah2", "Da'at Zekenim on Numbers 20:8:1", ["נוקש בעשר"], "", []),
 ("torah2", "Da'at Zekenim on Numbers 28:30:1", ["דיום הבכורים חטאת לא נזכר", "קבלו מלכותי ולא תאשמו"], "", [("azharos", "בזולת של שבועות")]),
 ("torah2", "Da'at Zekenim on Numbers 29:2:1", ["הבוראים בריאה חדשה"], "", [("rh", "אחר האוחז; ולפי המדרש אין לאומרו כי אם ביום הכפורים")]),
 ("torah2", "Da'at Zekenim on Numbers 29:36:1", ["חקר לאספו עד שבעה"], "", [("shmini", "בשמיני חג העצרת")]),
 ("torah2", "Da'at Zekenim on Deuteronomy 26:5:1", ["וידוי נמוך ומקרא רם תענה"], "", []),
 ("torah2", "Da'at Zekenim on Deuteronomy 32:43:2", ["התאזר בקדושים"], "", []),
 # ---- Hadar Zekenim
 ("torah2", "Hadar Zekenim on Torah, Genesis 1:1:3", ["באשישת שלוחתו"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Genesis 37:23:1", ["ובעד מנעלים מכרוהו"], "", [("yk", "באלה אזכרה")]),
 ("torah2", "Hadar Zekenim on Torah, Genesis 41:1:2", ["ממכות עצמן מתקן רטייה"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Exodus 1:13:1", ["בתחלה בפה רך לסבלות הצאה"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Exodus 6:20:1", ["אחות אב על כל נעלם תכסך בושה ונכרת לעולם"], "", [("azharos", "באמת יהגה חכי")]),
 ("torah2", "Hadar Zekenim on Torah, Exodus 15:8:2", ["כאן וכאן שליש רום מימות"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Exodus 16:14:1", ["בכלכול להבדק"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Exodus 17:16:1", ["נא זכור יום זבולך וישלם לו משלך"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Exodus 18:4:1", ["נא מני יפרה מורה הלכה לשעתה"], "", [("parah", "בפרשת פרה")]),
 ("torah2", "Hadar Zekenim on Torah, Exodus 19:20:1", ["וחלון ברקיע פתח נגד סיני"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Exodus 20:8:2", ["זכירה ושמירה עדיו תנוכה"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Exodus 20:15:2", ["נחלק לז' קולות ולשבעים מסיני"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Exodus 30:12:1", ["ביקור ראשי שמותם לחשבון תעלה", "יקר שלישי בתוכם לא הופקד"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Leviticus 19:16:1", ["הולכי רכיל שלש מענישים"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Numbers 28:19:1", ["קבלו מלכותי ולא תאשמו"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Numbers 29:2:1", ["הבוראם בריה חדשה"], "", [("rh", "אחר האוחז; ולה\"ר אהרן אין לאומרו כי אם ביום כפור")]),
 ("torah2", "Hadar Zekenim on Torah, Deuteronomy 14:23:1", ["פטר שור וחמור בכורי רפתיך"], "", [("azharos", "באמת יהגה חכי")]),
 ("torah2", "Hadar Zekenim on Torah, Deuteronomy 25:18:2", ["נדד ויעף שלש פעמים"], "", []),
 ("torah2", "Hadar Zekenim on Torah, Deuteronomy 27:24:1", ["שלמו אלה ומאלה וכאלה"], "", []),
 # ---- Riva
 ("torah2", "Riva on Torah, Genesis 37:28:1", ["ובעד מנעלים נתנוהו"], "", [("yk", "באלה אזכרה")]),
 ("torah2", "Riva on Torah, Exodus 17:16:1", ["נא זכור יום זבולך"], "", [("zachor", "ביוצר של פרשת זכור")]),
 ("torah2", "Riva on Torah, Leviticus 27:3:1", ["זכור דבר עתק בערך"], "", []),
 ("torah2", "Riva on Torah, Deuteronomy 14:23:1", ["פטר חמור ושור בכורי רעתיך"], "", []),
 # ---- Paaneach Raza
 ("torah2", "Paaneach Raza, Bereshit 41", ["אז ביום כפור סליחה הורית"], "", [("yk", "ביוצר יום כפורים")]),
 ("torah2", "Paaneach Raza, Toldot 12", ["טרף אף וישחת רחם"], "", []),
 ("torah2", "Paaneach Raza, Beshalach 12", ["אות פקידה בוקר"], "", []),
 ("torah2", "Paaneach Raza, Emor 5", ["בדבור אמור שינה עוז פניו"], "", []),
 ("torah2", "Paaneach Raza, Chukat 11", ["יען נוקש בעשר נחרת בו מיתות עשר"], "", [("rh", "בפיוט ר\"ה")]),
 # ---- Rabbeinu Bahya, Rashbam, Ramban, Ibn Ezra, Abarbanel
 ("torah2", "Rabbeinu Bahya, Bereshit 2:7:11", ["תקן נשמות עם האור הראשון"], "", []),
 ("torah2", "Rabbeinu Bahya, Shemot 7:25:1", ["ירח ימים הוקצב לכל מכה"], "ר' אליעזר הקליר", []),
 ("torah2", "Rabbeinu Bahya, Shemot 25:10:9", ["חיות נראות כנושאות"], "", []),
 ("torah2", "Rabbeinu Bahya, Bamidbar 19:2:17", ["המת בבית הבית טהור"], "הקליר", [("parah", "בסלוק פרשת פרה")]),
 ("torah2", "Rashbam on Genesis 27:27:2", ["שדה מבורך כהריח ברכו במתן טל"], "ר' אליעזר הקליר", []),
 ("torah2", "Ramban on Genesis 46:15:1", ["יוכבד אמי אחרי התנחמי"], "", [("simchastorah", "ביום שמחת תורה (מדברי ראב\"ע)")]),
 ("torah2", "Ibn Ezra on Genesis 46:27:1", ["יוכבד אמי אחרי התנחמי"], "", [("simchastorah", "ביום שמחת תורה")]),
 ("torah2", "Abarbanel on Torah, Exodus 20:16:9", ["ולא תאחר בבצעך מלאתך ודמעך"], "ר' שלמה בן גבירול", [("azharos", "באזהרותיו")]),
 # ---- Shas and Mishnah, other Rishonim
 ("shas2", "Tosafot Yeshanim on Yoma 3a:1", ["קודש ללינה"], "ר\"ת", []),
 ("shas2", "Tosafot Yeshanim on Yoma 19b:4", ["גיא וכל עפרה בצרדא הכילו"], "", [("shekalim", "בפרשת שקלים")]),
 ("shas2", "Ritva on Yoma 19b:8", ["תבל וכל עפרה בצרדה הכילו"], "הקלירי", []),
 ("shas2", "Tosafot Yeshanim on Yoma 21b:1", ["ועודף אחרון כבוד לראשון"], "", []),
 ("shas2", "Tosafot Yeshanim on Yoma 53b:1", ["לבל רדות עם קדש רב בצעיר"], "", [("yk", "בסדר יוה\"כ")]),
 ("shas2", "Tosafot Yeshanim on Yoma 67b:4", ["והוציא חלבם והקטיר"], "", [("yk", "בסידור אתה כוננת")]),
 ("shas2", "Tosafot Yeshanim on Yoma 70a:8", ["והכליל אילו עם מוספי יום"], "", [("yk", "בסדר אתה כוננת")]),
 ("shas2", "Tosafot Shantz on Sotah 17a:3", ["פנו כאן וכאן שליש רום מימות"], "", []),
 ("shas2", "Meiri on Taanit 30b:3", ["איך אברך על לבת ובהיכל עברה לבת"], "הפייט הקדמון", []),
 ("shas2", "Rosh on Makkot 1:3:1", ["זמן עשר כי ילוונו בחצי ימיו יעזבנו"], "רבינו אליהו הזקן", [("azharos", "באזהרות")]),
 ("shas2", "Mordechai on Bava Batra 9:9", ["זמן עשר כסף כי ילונו"], "רבינו אליהו הזקן", [("azharos", "באזהרות")]),
 ("shas2", "Rabbeinu Yonah on Pirkei Avot 1:5:7", ["יונה פותה הולכת במדבר"], "", []),
 ("shas2", "Magen Avot on Avot 3:16:2", ["יונה פותה תועה במדבר"], "", []),
 ("shas2", "Nachalat Avot on Avot 3:1:5", ["ומחר תהיה רמה אחותי"], "", []),
 ("shas2", "Nachalat Avot on Avot 5:21:15", ["בן אדמה יזכור למולדתו"], "ראב\"ע", [("yk", "ויפה עשאו ליום הכפורים")]),
 # ---- Halakhah and minhag
 ("halacha", "Machzor Vitry, Order of Shabbat 161:2", ["כבודו איהל כהיום ברחמים"], "הקליר", []),
 ("halacha", "Machzor Vitry, Laws of Rosh HaShanah 325:1", ["כף רגל חמש מאות וחמש עשרה"], "הקליר", [("rh", "באופן של ראש השנה. וחיות אשר הנה")]),
 ("halacha", "Machzor Vitry, Laws of Pesach 60:2", ["יחצה אחת משלש מצות"], "ר' יוסף טוב עלם", []),
 ("halacha", "Machzor Vitry, Laws of Pesach 97:7", ["שירות אלה לשון שירה"], "", [("pesach", "בזולת אי פתרוס")]),
 ("halacha", "Machzor Vitry, Laws of the Four Species 384:1", ["השקיפה ממעון קדשך מן השמים"], "ר' אליעזר בירבי קליר", [("shmini", "קרובה על פרשת עשר תעשר, בסוכות")]),
 ("halacha", "Machzor Vitry, Order of Shavuot 287:4", ["חופות מחופות בחליות חרוזות"], "הקליר", []),
 ("halacha", "Machzor Vitry, Tractate Soferim 524:1:1", ["כאחור וקדם בתווך נחצב"], "", []),
 ("halacha", "Siddur Rashi 306:1", ["השקיפה ממעון קדשך"], "", [("shmini", "קרובה על פרשת עשר תעשר")]),
 ("halacha", "Kol Bo 11:38", ["ויצאו בם אלף ושמונה מאות"], "הקליר", []),
 ("halacha", "Kol Bo 45:33", ["כי מקום תהלה היתה לישראל"], "", [("purim", "")]),
 ("halacha", "Ohr Zarua, Volume I 20:1", ["מועד מזמין לנדגלים"], "", [("hachodesh", "בפ' החודש")]),
 ("halacha", "Ohr Zarua, Volume I 568:2", ["גיא וכל עפרה בצרדה הכילו"], "ר\"א הקליר", [("shekalim", "בסילוק של פרשת שקלים")]),
 ("halacha", "Ohr Zarua, Volume II 281:1", ["ואף הוא היה מתכוין לגמור את השם כנגד המברכים"], "", []),
 ("halacha", "Ohr Zarua, Volume II 322:1", ["כל שמונה נר חנוכה אסור בו להשתמש"], "", [("chanukah", "בתפילת אעדיף")]),
 ("halacha", "Ohr Zarua, Volume III, Piskei Bava Metzia 203:3", ["חכמי מדות מפריזים"], "רבינו משלם", []),
 ("halacha", "Ohr Zarua, Volume IV, Piskei Avodah Zarah 121:2", ["עשר כסף כי ילויני בחצי ימיו יעזבנו"], "רבינו אליהו הזקן", [("azharos", "באמת יהגה חכו")]),
 ("halacha", "Tur, Orach Chayim 621:1", ["ואף הוא היה מכוין לגמור את השם כנגד המברכין"], "", [("yk", "סדר העבודה")]),
 ("halacha", "Shibbolei HaLeket 28:10", ["בטל תחייה להחיותם"], "הקליר", [("shmini", "ליום טוב ראשון של שמיני עצרת")]),
 ("halacha", "Shibbolei HaLeket 168:3", ["מערב עד ערב מנות אחד"], "הקלירי", []),
 ("halacha", "Shibbolei HaLeket 207:17", ["להגעיל ברותחין יורות המרותחין"], "", [("pesach", "בקרובה")]),
 ("halacha", "Sefer HaMakhria 62:25", ["להגעיל ברותחין יורות המרותחין"], "", [("pesach", "בקרובץ")]),
 ("halacha", "Shibbolei HaLeket 218:102", ["ובוצע ומברך בפרוסה שתים המוציא לחם ומצה כהלכותיה"], "", [("hagadol", "בקרובה המיוחדת לשבת הגדול של פסח")]),
 ("halacha", "Shibbolei HaLeket, Hilkhot Milah 7:2", ["באור הנר בברור חיל אום ברית מגנבת"], "הקלירי", [("chanukah", "בשמונה עשרה של חנוכה")]),
 ("halacha", "Sefer Mitzvot Gadol, Negative Commandments 69:1", ["גמר מצוי אכול דצוי ורצוי"], "", []),
 ("halacha", "Seder Troyes 9:40", ["אחר גמר מיצוי אכול דצוי ורצוי"], "", []),
 ("halacha", "Sefer Mitzvot Gadol, Positive Commandments 233:1", ["טבילה בזמנה מצוה"], "רבי אליהו הזקן", [("azharos", "באזהרות")]),
 ("halacha", "Seder Troyes 9:35", ["ליום אחד בשנה שת קריאתו"], "", []),
 ("halacha", "Teshuvot Maharam, Prague Edition 441:1", ["קדירות חרס בשברונם"], "", []),
 ("halacha", "Sefer HaTashbetz, Part I 92:2", ["מלאכתי מרובה והיום קצר"], "הריא\"ג", []),
 ("halacha", "Abudarham, Shabbat Prayers, Evening Service 4", ["כי אשמר' שבת אל ישמרני"], "ר' אברהם בן עזרא", [("shabbos", "פיוט לשבת")]),
 ("halacha", "Sefer Chasidim 250:1", ["תמכתי יתדותי בשלש עשרה"], "אמיתי", [("selichot", "הפזמון ה' ה'")]),
 ("halacha", "Teshuvot Maharil 58:1", ["שקל כרתי או כוסברתא"], "רבינו יוסף טוב עלם", []),
 ("halacha", "Terumat HaDeshen, Part I 233:2", ["בלולי אש ומימות"], "ר' בנימין הגדול", []),
 ("halacha", "Tashbetz Katan 465:1", ["בקבלת כלה כתובת חתן"], "", []),
]

BOOK = {'Genesis':'בראשית','Exodus':'שמות','Leviticus':'ויקרא','Numbers':'במדבר','Deuteronomy':'דברים',
        'Bereshit':'בראשית','Shemot':'שמות','Vayikra':'ויקרא','Bamidbar':'במדבר','Devarim':'דברים'}
PARSHA = {'Toldot':'תולדות','Beshalach':'בשלח','Emor':'אמור','Chukat':'חקת'}
WORK = [('Chizkuni, ','חזקוני'),("Da'at Zekenim on ",'דעת זקנים'),('Hadar Zekenim on Torah, ','הדר זקנים'),
        ('Riva on Torah, ','ריב"א'),('Paaneach Raza, ','פענח רזא'),('Rabbeinu Bahya, ','רבינו בחיי'),
        ('Rashbam on ','רשב"ם'),('Ramban on ','רמב"ן'),('Ibn Ezra on ','אבן עזרא'),('Abarbanel on Torah, ','אברבנאל'),
        ('Tosafot Yeshanim on ','תוספות ישנים'),('Ritva on ','ריטב"א'),('Tosafot Shantz on ','תוספות שאנץ'),
        ('Meiri on ','מאירי'),('Rosh on ','רא"ש'),('Mordechai on ','מרדכי'),('Rabbeinu Yonah on Pirkei Avot ','רבינו יונה אבות'),
        ('Magen Avot on Avot ','מגן אבות (רשב"ץ) אבות'),('Nachalat Avot on Avot ','נחלת אבות (אברבנאל) אבות'),
        ('Machzor Vitry, ','מחזור ויטרי'),('Siddur Rashi ','סידור רש"י סי\''),('Kol Bo ','כלבו סי\''),
        ('Ohr Zarua, Volume I ','אור זרוע ח"א סי\''),('Ohr Zarua, Volume II ','אור זרוע ח"ב סי\''),
        ('Ohr Zarua, Volume III, Piskei Bava Metzia ','אור זרוע ח"ג, פסקי בבא מציעא סי\''),
        ('Ohr Zarua, Volume IV, Piskei Avodah Zarah ','אור זרוע ח"ד, פסקי עבודה זרה סי\''),
        ('Tur, Orach Chayim ','טור אורח חיים סי\''),('Shibbolei HaLeket, Hilkhot Milah ','שבלי הלקט, הלכות מילה סי\''),
        ('Shibbolei HaLeket ','שבלי הלקט סי\''),('Sefer HaMakhria ','ספר המכריע סי\''),
        ('Sefer Mitzvot Gadol, Negative Commandments ','סמ"ג לאוין'),('Sefer Mitzvot Gadol, Positive Commandments ','סמ"ג עשין'),
        ('Seder Troyes ','סדר טרויש'),('Teshuvot Maharam, Prague Edition ','שו"ת מהר"ם (דפוס פראג) סי\''),
        ('Sefer HaTashbetz, Part I ','שו"ת תשב"ץ ח"א סי\''),('Abudarham, Shabbat Prayers, Evening Service ','אבודרהם, תפילות שבת, ערבית'),
        ('Sefer Chasidim ','ספר חסידים סי\''),('Teshuvot Maharil ','שו"ת מהרי"ל סי\''),
        ('Terumat HaDeshen, Part I ','תרומת הדשן ח"א סי\''),('Tashbetz Katan ','תשב"ץ קטן סי\'')]
MAS = {'Yoma':'יומא','Sotah':'סוטה','Taanit':'תענית','Makkot':'מכות','Bava Batra':'בבא בתרא'}
SUB = {'Order of Shabbat':'סדר שבת סי\'','Laws of Rosh HaShanah':'הלכות ראש השנה סי\'','Laws of Pesach':'הלכות פסח סי\'',
       'Laws of the Four Species':'הלכות לולב סי\'','Order of Shavuot':'סדר שבועות סי\'','Tractate Soferim':'מסכת סופרים סי\''}

def heb(n):
    out = ''
    for v, ch in ((400,'ת'),(300,'ש'),(200,'ר'),(100,'ק')):
        while n >= v: out += ch; n -= v
    if n == 15: return out + 'טו'
    if n == 16: return out + 'טז'
    for v, ch in ((90,'צ'),(80,'פ'),(70,'ע'),(60,'ס'),(50,'נ'),(40,'מ'),(30,'ל'),(20,'כ'),(10,'י')):
        if n >= v: out += ch; n -= v; break
    if n: out += 'אבגדהוזחט'[n - 1]
    return out

import re
FIX = {'Rosh on Makkot 1:3:1': 'רא"ש מכות פרק א סי\' ג', 'Mordechai on Bava Batra 9:9': 'מרדכי בבא בתרא פרק ט סי\' ט',
       'Seder Troyes 9:40': 'סדר טרויש ט:מ', 'Seder Troyes 9:35': 'סדר טרויש ט:לה',
       'Paaneach Raza, Bereshit 41': 'פענח רזא, בראשית מא'}
def label(ref):
    if ref in FIX: return FIX[ref]
    for en, he in WORK:
        if ref.startswith(en):
            rest = ref[len(en):]; break
    m = re.match(r'(Genesis|Exodus|Leviticus|Numbers|Deuteronomy|Bereshit|Shemot|Vayikra|Bamidbar|Devarim) (\d+):(\d+)', rest)
    if m: return f'{he} {BOOK[m.group(1)]} {heb(int(m.group(2)))}:{heb(int(m.group(3)))}'
    m = re.match(r'(Toldot|Beshalach|Emor|Chukat|Bereshit) (\d+)$', rest)
    if m: return f'{he} פרשת {PARSHA.get(m.group(1), "בראשית")} {heb(int(m.group(2)))}'
    m = re.match(r'(\w+(?: \w+)?) (\d+)([ab]):(\d+)', rest)
    if m and m.group(1) in MAS: return f'{he} {MAS[m.group(1)]} {heb(int(m.group(2)))}{"." if m.group(3)=="a" else ":"}'
    m = re.match(r'(\w+(?: \w+)?) (\d+):(\d+)', rest)
    if m and m.group(1) in MAS: return f'{he} {MAS[m.group(1)]} פרק {heb(int(m.group(2)))}'
    m = re.match(r'(\d+):(\d+)', rest)
    if m and 'אבות' in he: return f'{he} {heb(int(m.group(1)))}:{heb(int(m.group(2)))}'
    for k, v in SUB.items():
        if rest.startswith(k + ' '):
            return f'{he}, {v} {heb(int(rest[len(k)+1:].split(":")[0]))}'
    m = re.match(r'(\d+)', rest)
    return f'{he} {heb(int(m.group(1)))}' if m else he

# Liturgy anchors set by hand where the Rishon's wording differs from the machzor's
EXTRA = {
    "Da'at Zekenim on Numbers 20:8:1": [("w_upad", "נוקש בעשר", None)],
    "Paaneach Raza, Chukat 11": [("w_upad", "נוקש בעשר נחרתו בו מיתות עשר", "במחזור: \"יַעַן אֲשֶׁר נוֹקַשׁ בְּעֶשֶׂר / נֶחֶרְתוּ בוֹ מִיתוֹת עֶשֶׂר\".")],
}
