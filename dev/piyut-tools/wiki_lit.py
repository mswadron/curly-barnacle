# Build wiki_lit.json from the Wikisource page dumps fetched on Mordy's PC
# (dev/piyut-wikisource/p*.json, MediaWiki action=parse). Text is never retyped here:
# the rendered HTML is reduced to segments (one stanza each) with headings kept as <big>.
import json, re, html, sys, urllib.parse
SRC = '/home/claude/piyut/wiki'
# key -> (file number, Hebrew label, nusach/placement label)
PAGES = {
    'w_oryesha':   (1,  'יוצר לפסח: אור ישע מאושרים (ר\' שלמה הבבלי)', 'מנהג אשכנז, יום א\' של פסח (במגנצא יום ב\')'),
    'w_afik':      (2,  'יוצר לפסח: אפיק רנן ושירים (ר\' משלם בן קלונימוס)', 'מנהג אשכנז, יום ב\' של פסח (במגנצא יום א\')'),
    'w_erchatz':   (3,  'קדושתא לסוכות: ארחץ בנקיון כפות (ר\' אלעזר הקליר)', 'מנהג אשכנז, יום ב\' של סוכות (וורמייזא, מגנצא ופיורדא: יום א\')'),
    'w_eepatros':  (4,  'זולת לפסח: אי פתרוס בעברך', 'מנהג אשכנז, שביעי ואחרון של פסח'),
    'w_asocheach': (5,  'סדר העבודה: אשוחח נפלאותיך צור עולמים (ר\' משולם בן קלונימוס)', 'קצת קהילות אשכנז, מוסף יום הכפורים (מחזור נירנברג)'),
    'w_ashishat':  (6,  'פתיחה: אשישת שלוחתו', 'מנהג וורמייזא, שבת בראשית, לפני "שבח נותנים לו"'),
    'w_emet':      (7,  'אזהרות: אמת יהגה חכי (ר\' אליהו הזקן)', 'אזהרות לשבועות'),
    'w_vechayot':  (8,  'קדושה למוסף ראש השנה: וחיות אשר הנה מרובעות כסא (ר\' אלעזר הקליר)', 'מנהגי אשכנז, חזרת הש"ץ למוסף, שני ימי ראש השנה'),
    'w_eintzur':   (11, 'זולת לחנוכה: אין צור חלף (ר\' שלמה הבבלי)', 'מנהג אשכנז, שבת א\' של חנוכה'),
    'w_odecha':    (12, 'יוצר לחנוכה: אודך כי אנפת (יוסף בר שלמה)', 'מנהג אשכנז, שבת א\' של חנוכה'),
    'w_asirim':    (13, 'קדושתא לפסח: אסירים אשר בכושר שעשעת (ר\' אלעזר הקליר)', 'מנהג אשכנז בחו"ל, חזרת הש"ץ לשחרית, יום טוב שני של פסח'),
    'w_sheshmeot': (14, 'אהבה לפרשת שלח: שש מאות נקראות (מיוחס לר\' שלמה אבן גבירול)', 'מנהג אשכנז המזרחי, שבת פרשת שלח לך'),
    'w_eshnabei':  (21, 'אופן לשמחת תורה: אשנבי שחקים', 'מנהג אשכנז המזרחי, שחרית שמחת תורה'),
    'w_leil':      (22, 'מעריב לפסח: ליל שמורים אור עולמו נגלה (ר\' מאיר שליח צבור)', 'מחזור ויטרי, ליל א\' של פסח (מנהג צרפת: ליל ב\')'),
}
out = {}
for key, (n, he, nus) in PAGES.items():
    d = json.load(open(f'{SRC}/p{n}.json', encoding='utf-8-sig'))['parse']
    t = d['text']
    t = re.sub(r'<style.*?</style>', '', t, flags=re.S)
    t = re.sub(r'<sup class="reference".*?</sup>', '', t, flags=re.S)
    t = re.sub(r'<(h[1-6])[^>]*>.*?<span[^>]*class="mw-headline"[^>]*>(.*?)</span>.*?</\1>', r'\n\n<big>\2</big>\n\n', t, flags=re.S)
    t = re.sub(r'<(h[1-6])[^>]*>(.*?)</\1>', r'\n\n<big>\2</big>\n\n', t, flags=re.S)
    t = re.sub(r'<br\s*/?>', '\n', t)
    t = re.sub(r'</(p|div|li|tr|table|dd|dt)>', '\n\n', t)
    t = re.sub(r'<(?!/?big>)[^>]+>', '', t)
    t = html.unescape(t)
    t = re.sub(r'\[עריכה\]', '', t)
    segs = []
    for para in re.split(r'\n\s*\n', t):
        lines = [l.strip() for l in para.split('\n') if l.strip()]
        if not lines: continue
        segs.append('<br>'.join(lines))
    # drop the Wikisource category/footer lines
    segs = [s for s in segs if not s.startswith('קטגוריות') and not s.startswith('קטגוריה')]
    # drop the short metadata table rows above the first stanza heading (סימן)
    first = next((i for i, s in enumerate(segs) if s.startswith('סימן')), 0)
    segs = [s for i, s in enumerate(segs) if i >= first or len(s) > 40 or s.startswith('<big>')]
    out[key] = dict(ref=d['title'], he=he, nusach=nus, version=f'ויקיטקסט, גרסה {d["revid"]}',
                    source='https://he.wikisource.org/', url='https://he.wikisource.org/wiki/' + urllib.parse.quote(d['title'].replace(' ', '_')),
                    segs=segs)
    print(key, d['title'], len(segs))
json.dump(out, open('/home/claude/piyut/wiki_lit.json', 'w'), ensure_ascii=False)
