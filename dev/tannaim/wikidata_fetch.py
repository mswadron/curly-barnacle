# Pulls dates and places for each sage from Wikidata. Usage: python wikidata_fetch.py <work folder>
import json, sys, time, urllib.request, urllib.parse
base = sys.argv[1]
UA = {'User-Agent': 'limudlab-tannaim/1.0 (https://limudlab.com)'}
def get(url):
    req = urllib.request.Request(url, headers=UA)
    with urllib.request.urlopen(req, timeout=90) as r:
        return json.loads(r.read().decode('utf-8'))
raw = open(base + r'\tannaim-data-v2.js', encoding='utf-8').read()
D = json.loads(raw[raw.index('=') + 1:].rstrip().rstrip(';'))
qids = {}
search = {}
for p in D['people']:
    if p['kind'] != 'person': continue
    q = (p.get('wikidata') or {}).get('id')
    if q: qids[p['id']] = q; continue
    name = p['name'].get('he')
    if not name: continue
    try:
        r = get('https://www.wikidata.org/w/api.php?action=wbsearchentities&format=json&language=he&uselang=he&limit=7&search=' + urllib.parse.quote(name))
    except Exception as e:
        continue
    search[p['id']] = [{'qid': h['id'], 'label': h.get('label'), 'desc': h.get('description')} for h in r.get('search', [])]
    time.sleep(0.3)
ids = sorted(set(qids.values()) | {h['qid'] for v in search.values() for h in v})
Q = '''SELECT ?item ?prop ?val ?valLabel ?heLabel ?prec ?coord ?start ?end WHERE {
  VALUES ?item { %s }
  { ?item p:P569 ?st . BIND("P569" AS ?prop) ?st psv:P569 [ wikibase:timeValue ?val ; wikibase:timePrecision ?prec ] }
  UNION { ?item p:P570 ?st . BIND("P570" AS ?prop) ?st psv:P570 [ wikibase:timeValue ?val ; wikibase:timePrecision ?prec ] }
  UNION { ?item p:P1317 ?st . BIND("P1317" AS ?prop) ?st psv:P1317 [ wikibase:timeValue ?val ; wikibase:timePrecision ?prec ] }
  UNION { ?item wdt:P19 ?val . BIND("P19" AS ?prop) OPTIONAL { ?val wdt:P625 ?coord } }
  UNION { ?item wdt:P20 ?val . BIND("P20" AS ?prop) OPTIONAL { ?val wdt:P625 ?coord } }
  UNION { ?item wdt:P119 ?val . BIND("P119" AS ?prop) OPTIONAL { ?val wdt:P625 ?coord } }
  UNION { ?item wdt:P937 ?val . BIND("P937" AS ?prop) OPTIONAL { ?val wdt:P625 ?coord } }
  UNION { ?item wdt:P551 ?val . BIND("P551" AS ?prop) OPTIONAL { ?val wdt:P625 ?coord } }
  UNION { ?item wdt:P2348 ?val . BIND("P2348" AS ?prop) OPTIONAL { ?val wdt:P580 ?start } OPTIONAL { ?val wdt:P582 ?end } }
  UNION { ?item wdt:P106 ?val . BIND("P106" AS ?prop) }
  OPTIONAL { ?val rdfs:label ?heLabel . FILTER(LANG(?heLabel) = "he") }
  SERVICE wikibase:label { bd:serviceParam wikibase:language "en". }
}'''
json.dump({'qids': qids, 'search': search, 'ids': ids}, open(base + r'\wd_ids.json', 'w', encoding='utf-8'), ensure_ascii=False)
for i in range(0, len(ids), 60):
    open(base + r'\q_%02d.rq' % (i // 60), 'w', encoding='utf-8').write(Q % ' '.join('wd:' + x for x in ids[i:i + 60]))
print('ids', len(ids), len(search))

