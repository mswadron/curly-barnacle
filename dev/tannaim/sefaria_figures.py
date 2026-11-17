# Pulls every Sefaria "talmudic-figures" person topic with titles, generation and links.
# Usage: python sefaria_figures.py <output folder>
import json, sys, time, urllib.request, urllib.parse
base = sys.argv[1]
def get(url):
    req = urllib.request.Request(url, headers={'User-Agent': 'limudlab-tannaim/1.0'})
    with urllib.request.urlopen(req, timeout=60) as r:
        return json.loads(r.read().decode('utf-8'))
cat = get('https://www.sefaria.org/api/v2/topics/talmudic-figures?with_links=1')
members = []
for k, v in (cat.get('links') or {}).items():
    for x in v.get('links', []):
        members.append(x.get('topic'))
members = sorted(set(m for m in members if m))
print('members', len(members), flush=True)
out = {}
for slug in members:
    try:
        t = get('https://www.sefaria.org/api/v2/topics/' + urllib.parse.quote(slug) + '?with_links=1&annotate_links=1')
    except Exception as e:
        out[slug] = {'error': str(e)}; continue
    links = {}
    for k, v in (t.get('links') or {}).items():
        if k in ('sheets-related-to', 'has-sheets-related-to', 'displays-under'): continue
        links[k] = [{'slug': x.get('topic'), 'en': (x.get('title') or {}).get('en'), 'he': (x.get('title') or {}).get('he')} for x in v.get('links', [])]
    out[slug] = {'slug': slug, 'primaryTitle': t.get('primaryTitle'), 'titles': t.get('titles'), 'description': t.get('description'),
                 'properties': {k: (v.get('value') if isinstance(v, dict) else v) for k, v in (t.get('properties') or {}).items()},
                 'links': links, 'numSources': t.get('numSources')}
    time.sleep(0.15)
json.dump(out, open(base + '/sefaria_figures.json', 'w', encoding='utf-8'), ensure_ascii=False, indent=1)
print('done', len(out), flush=True)
