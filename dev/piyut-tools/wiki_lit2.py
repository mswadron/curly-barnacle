# Second batch of Wikisource liturgy (2026-11-24), merged into wiki_lit.json.
# Same reduction as wiki_lit.py: rendered HTML -> stanza segments; text is never retyped.
import json, re, html, urllib.parse
SRC = '/mnt/user-data/uploads/curly-barnacle/dev/piyut-wikisource'
PAGES = {
    'w_blulei':     (1,  "אופן לשבת הגדול: בלולי אש ומימות (ר' בנימין בן זרח)", "מנהג אשכנז המזרחי, שבת הגדול"),
    'w_atakonanta': (2,  "סדר העבודה: אתה כוננת עולם ברב חסד (יוסי בן יוסי)", "היה נהוג בצרפת, מוסף יום הכפורים"),
    'w_negdecha':   (3,  "אדני נגדך כל תאותי (ר' יהודה הלוי)", "מקום אמירתו לא צוין בדף"),
    'w_etchayil':   (4,  "קדושתא לראש השנה: את חיל יום פקודה (ר' אלעזר הקליר)", "קהילות אשכנז, שחרית יום א' של ראש השנה"),
    'w_tzaaka':     (5,  "צעקה יוכבד", "מקום אמירתו לא צוין בדף"),
    'w_haadir':     (6,  "האדיר בשמי עליות", "מנהג אשכנז, שחרית יום הכפורים"),
    'w_vayeehav':   (7,  "קרובה לפורים: ויאהב אומן (ר' אלעזר הקליר)", "מנהג אשכנז, פורים"),
    'w_korei':      (8,  "קוראי מגילה (ר' אברהם אבן עזרא)", "פורים"),
    'w_zecharbris': (9,  "סליחה: זכור ברית, אבדנו מארץ טובה (רבינו גרשום)", "עדות אשכנז, הימים הנוראים"),
    'w_zachor_y':   (10, "יוצר לפרשת זכור: זכור את אשר עשה", "מנהג אשכנז, שבת זכור"),
    'w_imneni':     (11, "יוצר לשבועות: אדון אימנני (ר' שמעון הגדול)", "מנהג אשכנז, שבועות"),
    'w_amhut':      (12, "אמהות עת נכבשה (ר' שמעון בר יצחק)", "מנהג אשכנז, שבת חתן"),
    'w_ezkera':     (13, "סליחה: אזכרה אלהים ואהמיה (אמיתי)", "סליחות לשני תנינא"),
    'w_upad':       (14, "קדושתא למוסף ראש השנה: אפד מאז (ר' אלעזר הקליר)", "מנהגי אשכנז, מוסף יום א' של ראש השנה"),
    'w_kadosh':     (15, "אופן ליום הכפורים: קדוש אדיר בעליתו", "מנהגי אשכנז ואיטליה"),
    'w_azbeyom':    (16, "יוצר ליום הכפורים: אז ביום כפור סליחה הורית", "מנהגי אשכנז ואיטליה"),
    'w_imrascha':   (17, "קדושתא לראש השנה: אמרתך צרופה ועדותיך צדק (ר' שמעון הגדול)", "קהילות אשכנז, שחרית יום ב' של ראש השנה"),
    'w_orach':      (18, "קדושתא לשבועות: אורח חיים מוסר תוכחת (ר' שמעון הגדול)", "רוב קהילות אשכנז המערבי, יום א' של שבועות"),
}
out = json.load(open('/home/claude/piyut/wiki_lit.json', encoding='utf-8'))
for key, (n, he, nus) in PAGES.items():
    d = json.load(open(f'{SRC}/q{n}.json', encoding='utf-8-sig'))['parse']
    t = d['text']
    t = re.sub(r'<style.*?</style>', '', t, flags=re.S)
    t = re.sub(r'<sup class="reference".*?</sup>', '', t, flags=re.S)
    t = re.sub(r'<div[^>]*(toc|infobox)[^>]*>.*?</div>', '', t, flags=re.S)
    t = re.sub(r'<table.*?</table>', lambda m: '' if 'סוג:' in m.group(0) or 'מועד:' in m.group(0) else m.group(0), t, flags=re.S)  # page infobox only
    t = re.sub(r'</td>', ' </td>', t)
    t = re.sub(r'<(h[1-6])[^>]*>.*?<span[^>]*class="mw-headline"[^>]*>(.*?)</span>.*?</\1>', r'\n\n<big>\2</big>\n\n', t, flags=re.S)
    t = re.sub(r'<(h[1-6])[^>]*>(.*?)</\1>', r'\n\n<big>\2</big>\n\n', t, flags=re.S)
    t = re.sub(r'<br\s*/?>', '\n', t)
    t = re.sub(r'</(p|div|li|tr|table|dd|dt)>', '\n\n', t)
    t = re.sub(r'<(?!/?big>)[^>]+>', '', t)
    t = html.unescape(t).replace('[עריכה]', '')
    segs = []
    for para in re.split(r'\n\s*\n', t):
        lines = [l.strip() for l in para.split('\n') if l.strip()]
        # a long run with no paragraph breaks is cut every four lines, so one stanza can be shown alone
        for k in range(0, len(lines), 4 if len(lines) > 8 else len(lines) or 1):
            if lines[k:k + 4 if len(lines) > 8 else None]: segs.append('<br>'.join(lines[k:k + 4] if len(lines) > 8 else lines))
    segs = [s for s in segs if not s.startswith('קטגוריות') and not s.startswith('קטגוריה')]
    out[key] = dict(ref=d['title'], he=he, nusach=nus, version=f'ויקיטקסט, גרסה {d["revid"]}',
                    source='https://he.wikisource.org/', url='https://he.wikisource.org/wiki/' + urllib.parse.quote(d['title'].replace(' ', '_')),
                    segs=segs)
    print(key, d['title'], len(segs))
json.dump(out, open('/home/claude/piyut/wiki_lit.json', 'w'), ensure_ascii=False)
