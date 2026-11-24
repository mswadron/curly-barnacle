import json, re, sys, html
sys.path.insert(0, '/home/claude/piyut/tools')
from entries import E, SECTIONS, LIT
from calendar_map import SLOTS, WHEN
from entries_more import MORE, EXTRA, label as more_label
# Second sweep: other Rishonim. Liturgy is matched automatically against every source on file.
for sec, ref, qs, paytan, said in MORE:
    E.append(dict(sec=sec, ref=ref, label=more_label(ref), paytan=paytan, q=qs, kind='line', lit=[], auto=True,
                  stated=said))

H = json.load(open('/home/claude/piyut/harvest.json'))
try: P109 = json.load(open('/home/claude/piyut/raw_tosafos_p109.json'))
except FileNotFoundError: P109 = {}
# Frozen: the last published build. An entry or liturgy source whose Sefaria text is not in this
# session's harvest is carried over from it unchanged (it was verified when first built).
_old = open('/home/claude/piyut/frozen-data.js', encoding='utf-8').read()
OLD = json.loads(_old[_old.index('{'):_old.rindex('}') + 1])
OLD_E = {x['ref']: x for x in OLD['entries']}

NIKUD = re.compile(r'[֑-ׇ]')
TAG = re.compile(r'<[^>]+>')
FINAL = str.maketrans('ךםןףץ', 'כמנפצ')
KEEP = re.compile(r'[א-ת]')

def norm_map(s):
    """letters-only normalized string plus index map back to the original."""
    out, idx = [], []
    i = 0
    s2 = s
    in_tag = False
    for i, ch in enumerate(s2):
        if ch == '<': in_tag = True
        if in_tag:
            if ch == '>': in_tag = False
            continue
        if KEEP.match(ch):
            out.append(ch.translate(FINAL)); idx.append(i)
    return ''.join(out), idx

def norm(s):
    return norm_map(s)[0]

# spelling-tolerant: drop vav/yod (matres lectionis) for anchor matching
def loose(s):
    return s.replace('ו', '').replace('י', '')

def loose_map(s):
    n, idx = norm_map(s)
    o, j = [], []
    for c, k in zip(n, idx):
        if c in 'וי': continue
        o.append(c); j.append(k)
    return ''.join(o), j

def get_text(ref, sub=None):
    if ref == 'Tosafot on Pesachim 109a:7:1':
        return P109[ref], 'Vilna Edition', 'https://www.nli.org.il/he/books/NNL_ALEPH001300957'
    h = H[ref]
    t = h['text']
    if sub is not None:
        for k in sub: t = t[k]
    if isinstance(t, list):
        t = '<br>'.join(x if isinstance(x, str) else ' '.join(x) for x in t)
    return t, h['versionTitle'], h['versionSource']

SAFE = re.compile(r'</?(b|small|big|i|br)\b[^>]*>', re.I)
def clean(s):
    # keep a small whitelist of inline tags; drop everything else
    s = re.sub(r'<(?!/?(b|small|big|i|br)\b)[^>]*>', '', s)
    s = re.sub(r'<(b|small|big|i)\b[^>]*>', lambda m: '<' + m.group(1) + '>', s)
    s = re.sub(r'<br\s*/?>', '<br>', s)
    return s.strip()

LITSLOT = {'shekalim': 'shekalim', 'zachor': 'zachor', 'parah': 'parah', 'hagadol': 'hagadol', 'hachodesh': 'hachodesh',
    'rh1': 'rh', 'rh1_musaf': 'rh', 'rh2_musaf': 'rh', 'selichot2': 'teshuva', 'selichot_polin5': 'teshuva', 'esther': 'esther',
    'yotzer_or': 'everyday', 'kinot11': 'tishabav', 'kinot24': 'tishabav', 'w_oryesha': 'pesach', 'w_afik': 'pesach',
    'w_eepatros': 'pesach', 'w_asirim': 'pesach', 'w_leil': 'pesach', 'w_leil2': 'pesach', 'w_tal': 'pesach', 'w_erchatz': 'sukkos',
    'w_asocheach': 'yk', 'w_ashishat': 'bereishis', 'w_emet': 'azharos', 'w_vechayot': 'rh', 'w_eintzur': 'chanukah',
    'w_odecha': 'chanukah', 'w_sheshmeot': 'shelach', 'w_eshnabei': 'simchastorah', 'w_geshem': 'shmini',
    'w_blulei': 'hagadol', 'w_atakonanta': 'yk', 'w_negdecha': None, 'w_etchayil': 'rh', 'w_tzaaka': None, 'w_haadir': 'yk',
    'w_vayeehav': 'purim', 'w_korei': 'purim', 'w_zecharbris': 'selichot', 'w_zachor_y': 'zachor', 'w_imneni': 'azharos',
    'w_amhut': 'shabbos', 'w_ezkera': 'selichot', 'w_upad': 'rh', 'w_kadosh': 'yk', 'w_azbeyom': 'yk', 'w_imrascha': 'rh',
    'w_orach': 'azharos'}
# automatic matches that are only a shared verse, not the piyut the Rishon means
NOAUTO = {('Machzor Vitry, Laws of the Four Species 384:1', 'rh1_musaf'), ('Siddur Rashi 306:1', 'rh1_musaf')}
def auto_when(e, lits):
    if not e.get('auto'): return []
    w = [[LITSLOT[x['src']], 'text', lit_out[x['src']]['he']] for x in lits if LITSLOT.get(x['src'])]
    seen = set(); w = [x for x in w if not (x[0] in seen or seen.add(x[0]))]
    for slot, note in e.get('stated') or []:
        if not any(x[0] == slot for x in w): w.append([slot, 'rishon', note])
    return w or [['unknown', None, None]]
errors = []
lit_out = {}
entries_out = []

for key, (ref, he, nus) in LIT.items():
    if ref not in H:
        lit_out[key] = OLD['lit'][key]; continue
    segs = H[ref]['text']
    lit_out[key] = dict(ref=ref, he=he, nusach=nus, version=H[ref]['versionTitle'],
                        source=H[ref]['versionSource'],
                        url='https://www.sefaria.org/' + ref.replace(' ', '_').replace(',', '%2C').replace(';', '%3B'),
                        segs=[clean(x) for x in segs])
# Liturgy fetched from Wikisource (pages Sefaria does not carry); see tools/wiki_lit.py
for key, v in json.load(open('/home/claude/piyut/wiki_lit.json')).items():
    lit_out[key] = dict(ref=v['ref'], he=v['he'], nusach=v['nusach'], version=v['version'], source=v['source'], url=v['url'],
                        segs=[clean(x) for x in v['segs']])


# Boundaries: standard prayer text and refrains that separate one piyut from the next.
STD = [norm(x) for x in ["ברוך אתה", "אדני שפתי", "מכלכל חיים", "מסוד חכמים", "אל נא לעולם", "ובכן",
    "קדושה", "נקדישך", "נקדש את שמך", "ימלוך", "ימלך", "חי וקים", "חי וקיים", "אתה קדוש", "ישמח משה", "ושמרו",
    "ולא נתתו", "ישמחו", "אלהינו ואלהי אבותינו רצה", "רצה", "ותחזינה", "מודים", "ועל כלם", "וכל החיים", "ברכת כהנים",
    "שים שלום", "יהיו לרצון", "אלהי נצור", "קדיש", "יתגדל", "יהא שלמא", "עשה שלום", "אל מלך יושב", "ויעבר",
    "יהוה יהוה", "סלח לנו", "כרחם אב", "סלח נא", "ויאמר יהוה", "הטה אלהי", "אבות", "גבורות", "אתה גבור",
    "זכרנו לחיים", "מי כמוך אב", "יוצרות", "יוצר ל", "קודם", "קהל", "ותוקעין", "כשחל", "לשבת", "שיר של יום",
    "היום יום", "מזמור שיר", "תתקבל", "יעלה ויבא", "בראש חודש", "מודים דרבנן", "סליחה מיוסד", "פזמון מיוסד",
    "מיוסד", "על פי אב", "אלהינו ואלהי אבותינו"]]
def is_boundary(seg):
    n = norm(TAG.sub('', seg))
    if len(n) < 3: return True
    if '<big>' in seg: return True
    if is_header(seg): return True
    return any(n.startswith(x) for x in STD)
def is_header(seg):
    t = TAG.sub('', seg)
    return ('חתום' in t or 'מיוסד' in t or t.startswith('סימן')) and len(norm(t)) < 120
def block(segs, i, cap=6):
    a = i
    while a - 1 >= 0 and not is_boundary(segs[a - 1]) and i - a < cap: a -= 1
    b = i
    while b + 1 < len(segs) and not is_boundary(segs[b + 1]) and b - i < cap: b += 1
    head = None
    for j in range(a - 1, max(-1, a - 4), -1):
        if is_header(segs[j]): head = j; break
    return a, b, head

def mark(text, phrase, loosely=False):
    """wrap the first occurrence of phrase (nikud-insensitive) in <mark>; return (html, found)."""
    f = loose_map if loosely else norm_map
    n, idx = f(text)
    p = (loose if loosely else (lambda x: x))(norm(phrase))
    k = n.find(p)
    if k < 0:
        return text, False
    a, b = idx[k], idx[k + len(p) - 1] + 1
    mid = re.sub(r'([^<>]+)(?=<|$)', lambda m: '\u0001' + m.group(1) + '\u0002' if m.group(1).strip() else m.group(1), text[a:b])
    return text[:a] + mid + text[b:], True

for i, e in enumerate(E):
    if e['ref'] not in H and e['ref'] != 'Tosafot on Pesachim 109a:7:1' or (e['ref'] == 'Tosafot on Pesachim 109a:7:1' and not P109):
        o = dict(OLD_E[e['ref']]); o['id'] = 'e%02d' % i
        o['when'] = [list(w) for w in WHEN.get(e['ref'], [])]
        o['sec'] = e['sec']; o['label'] = e['label']; o['paytan'] = e['paytan']
        entries_out.append(o); continue
    raw, ver, src = get_text(e['ref'], e.get('sub'))
    body = clean(raw)
    for q in e['q']:
        if norm(q) not in norm(raw):
            errors.append(('QUOTE', e['ref'], q))
    shown = body
    for q in e['q']:
        shown, ok = mark(shown, q)
    shown = html.escape(shown, quote=False) if False else shown
    shown = shown.replace('\u0001', '<mark>').replace('\u0002', '</mark>')
    shown = re.sub(r'</mark>(</?(?:b|i|small|big)>)<mark>', r'\1', shown)
    lits = []
    if e.get('auto'):
        e['lit'] = list(EXTRA.get(e['ref'], []))
        for q in e['q']:
            # the whole quote, else its longest opening run of words (a line can break across stanzas)
            words = q.split()
            tries = [' '.join(words[:n]) for n in range(len(words), 0, -1)]
            tries = [t for t in tries if len(loose(norm(t))) >= (8 if t == q else 11)]
            for t in tries:
                hit = [k for k, L in lit_out.items() if (e['ref'], k) not in NOAUTO and k not in [x[0] for x in e['lit']]
                       and any(mark(sg, t, loosely=True)[1] for sg in L['segs'])]
                for k in hit: e['lit'].append((k, t, None if t == q else 'נמצאה תחילת השורה; ההמשך שונה או בשורה הבאה במחזור.'))
                if hit: break
    for (k, anchor, note) in e['lit']:
        segs = lit_out[k]['segs']
        hit = None
        for si, sg in enumerate(segs):
            m, ok = mark(sg, anchor, loosely=True)
            if ok:
                hit = (si, m.replace('\u0001', '<mark>').replace('\u0002', '</mark>')); break
        if not hit:
            errors.append(('ANCHOR', e['ref'], k, anchor)); continue
        prev = next((x for x in lits if x['src'] == k and x['seg'] == hit[0]), None)
        if prev:
            m2, _ = mark(prev['segHtml'].replace('<mark>', '\u0001').replace('</mark>', '\u0002'), anchor, loosely=True)
            prev['segHtml'] = m2.replace('\u0001', '<mark>').replace('\u0002', '</mark>')
            prev['note'] = prev['note'] or note
        else:
            a, b, head = block(lit_out[k]['segs'], hit[0])
            lits.append(dict(src=k, seg=hit[0], segHtml=hit[1], note=note, a=a, b=b, head=head))
    said = e.get('said')
    if said is None and lits:
        said = ('text', lit_out[lits[0]['src']]['he'])
    entries_out.append(dict(
        id='e%02d' % i, sec=e['sec'], ref=e['ref'], label=e['label'], paytan=e['paytan'],
        kind=e['kind'], quotes=e['q'], rishonHtml=shown, version=ver, source=src,
        url='https://www.sefaria.org/' + e['ref'].replace(' ', '_').replace(',', '%2C'),
        lit=lits, said=list(said) if said else None,
        when=[list(w) for w in WHEN.get(e['ref'], [])] or auto_when(e, lits)))

ORDER = ['Isaiah','II Kings','Ezekiel','Psalms','Song of Songs','Lamentations','Daniel','I Chronicles','II Chronicles']
ORDER = ['II Kings','Isaiah','Ezekiel','Zechariah','Psalms','Song of Songs','Lamentations','Daniel','I Chronicles','II Chronicles']
def nkey(e):
    if e['sec'] != 'nach': return (0, 0)
    book = next(b for b in sorted(ORDER, key=len, reverse=True) if e['ref'].startswith('Rashi on ' + b + ' '))
    ch, v = e['ref'].rsplit(' ', 1)[1].split(':')[:2]
    return (ORDER.index(book), int(ch) * 1000 + int(v))
nach = sorted([x for x in entries_out if x['sec'] == 'nach'], key=nkey)
it = iter(nach)
entries_out = [next(it) if x['sec'] == 'nach' else x for x in entries_out]
ids = {x[0] for x in SLOTS}
for x in entries_out:
    if not x['when']: errors.append(('NOWHEN', x['ref']))
    for w in x['when']:
        if w[0] not in ids: errors.append(('SLOT', x['ref'], w[0]))
for r in WHEN:
    if r not in {x['ref'] for x in entries_out}: errors.append(('STRAY', r))
if errors:
    for x in errors: print('ERR', *x)
    sys.exit(1)

data = dict(slots=[dict(id=a, he=b) for a, b in SLOTS], sections=[dict(id=a, he=b) for a, b in SECTIONS], lit=lit_out, entries=entries_out,
            built='2026-11-24')
out = 'window.PIYUT_DATA = ' + json.dumps(data, ensure_ascii=False) + ';\n'
open(sys.argv[1], 'w').write(out)
print('ok', len(entries_out), 'entries,', sum(1 for x in entries_out if x['lit']), 'with full text;', len(out)//1024, 'KB')
