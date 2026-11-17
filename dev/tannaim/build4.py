import json, collections, re
s=open('tannaim-data.v3.js').read(); D=json.loads(s[s.index('=')+1:].rstrip().rstrip(';'))
R=json.load(open('wd_rows.json',encoding='utf-8-sig')); IDS=json.load(open('wd_ids.json',encoding='utf-8-sig'))
v=lambda x,k: (x.get(k) or {}).get('value') if isinstance(x.get(k),dict) else x.get(k)
by=collections.defaultdict(list)
for r in R: by[v(r,'item').split('/')[-1]].append(r)
DROP={'Q801','Q1669578','Q1003997','Q155321','Q23792','Q2277','Q858'}
REGION={'Q83241','Q104028','Q5684'}
KIND={'P19':'born','P20':'died','P119':'buried','P937':'active','P551':'lived'}
JE_YEARS={1:(10,80),2:(80,120),3:(120,140),4:(140,165),5:(165,200),6:(200,220)}
SEF2JE={'T1':1,'T2':1,'T3':2,'T4':3,'T5':4,'T6':5,'TA':6}
def yr(val,prec):
  m=re.match(r'^(-?)(\d+)-',val); y=int(m.group(2))*(-1 if m.group(1) else 1)
  # the query service counts 1 BCE as year 0, so BCE years come back one short; century values are not shifted
  if y<=0 and int(prec)>=8: y-=1
  return {'y':y,'prec':int(prec)}
places_all={}
# review 2026-11-17: 'Rabbi Chanina ben Akiva' had been matched to Sefaria's Hananyah b. Akabia, a different sage
for p in D['people']:
  if p['id']=='Rabbi Chanina ben Akiva': p['sefaria']=None
  for r in ([p['sefaria']] if p.get('sefaria') and not p['sefaria'].get('two') else (p.get('sefaria') or {}).get('two',[])):
    for lst in (r.get('links') or {}).values():
      for l in lst:
        if l.get('slug')=='rabbi-hananyah-b-akabia': l['id']='Rabbi Chananya ben Akavya'
for st in D['chains']['nesiim']:
  if st.get('id')=='Rabban Gamliel': st['src'][0]['label']='תוספות יום טוב אבות א:יח (שם נאמר שרבן שמעון בן גמליאל הוא נכדו של שמעון; רבן גמליאל דיבנה, הבן שביניהם, אינו נזכר שם בשמו)'
D['meta']['gaps']=[g for g in D['meta']['gaps'] if not g.startswith('The Jewish Encyclopedia and Sefaria disagree')]+['The Jewish Encyclopedia and Sefaria disagree on the generation of five sages: R\' Tarfon, R\' Elazar ben Azarya, R\' Dosa ben Harkinas, R\' Tzadok and R\' Nasan. Each is placed on the page by Sefaria; his years follow the Encyclopedia; the profile shows both.']
for p in D['people']:
  q=(p.get('wikidata') or {}).get('id')
  life={'born':[],'died':[],'floruit':[]}; places=[]
  if q and q in by:
    seenp=set(); seeny=set()
    for r in by[q]:
      pr=v(r,'prop')
      if pr in ('P569','P570','P1317'):
        k={'P569':'born','P570':'died','P1317':'floruit'}[pr]; e=yr(v(r,'val'),v(r,'prec'))
        if (k,e['y'],e['prec']) in seeny: continue
        seeny.add((k,e['y'],e['prec'])); life[k].append(e)
      elif pr in KIND:
        pq=v(r,'val').split('/')[-1]
        if pq in DROP or re.fullmatch(r'\d+',v(r,'valLabel') or ''): continue
        if (pr,pq) in seenp: continue
        seenp.add((pr,pq))
        c=v(r,'coord'); lat=lon=None
        if c:
          m=re.match(r'Point\(([-\d.]+) ([-\d.]+)\)',c); lon,lat=float(m.group(1)),float(m.group(2))
        e={'kind':KIND[pr],'qid':pq,'en':v(r,'valLabel'),'he':v(r,'heLabel'),'lat':lat,'lon':lon}
        places.append(e)
        if lat is not None: places_all.setdefault(pq,{'qid':pq,'en':e['en'],'he':e['he'],'lat':round(lat,4),'lon':round(lon,4),'region':pq in REGION})
    for k in life:
      if any(e['prec']>=8 for e in life[k]): life[k]=[e for e in life[k] if e['prec']>=8]  # a century adds nothing beside a year
      life[k].sort(key=lambda e:(e['y'],-e['prec']))
  if any(life.values()): p['life']=dict(life,src='Wikidata '+q)
  if places:
    # one entry per place and kind; a place may carry two coordinates, keep the first
    p['places']=[{k:e[k] for k in ('kind','qid','en','he')} for e in places]
  # generation span, from the Jewish Encyclopedia table
  je=(p.get('generation') or {}).get('value'); via='je'
  if not je:
    g=(p.get('sefaria') or {}).get('gen')
    if g: je=SEF2JE.get(g.split('/')[0]); via='sefaria'
  if je:
    a,b=JE_YEARS[je]; p['period']={'from':a,'to':b,'je_gen':je,'via':via}
D['places']=places_all
D['basemap']=json.load(open('/home/claude/geo/basemap.json'))
D['meta']['years']={
 'periods':'Generation spans are the Jewish Encyclopedia (1906) table: 1st 10-80, 2nd 80-120, 3rd 120-140, 4th 140-165, 5th 165-200, 6th 200-220 CE. Where the Encyclopedia does not place a sage, his Sefaria generation is matched to its number (Sefaria T1 and T2 = 1st, T3 = 2nd, T4 = 3rd, T5 = 4th, T6 = 5th, TA = 6th; checked on Rabban Yochanan ben Zakkai, R\' Eliezer, R\' Akiva, R\' Meir, Rebbe, which both place).',
 'life':'Birth and death years are Wikidata\'s, shown as given with their precision (year, decade, century). Where Wikidata holds two values both are shown. They are estimates by historians, not dates from the sources.',
 'jewish_year':'The Jewish year is the secular year converted by adding 3760 (3761 before the common era); a secular year covers parts of two Jewish years. This follows the secular dating; the traditional count of Seder Olam puts the Churban in 3828 rather than 3830, so traditional years for this period run about two years earlier.',
 'places':'Places of birth, death, burial and teaching are Wikidata\'s. Burial places are mostly the traditional sites. Entries that name only a modern state, a Roman province or the empire are left out; regions (Galilee, Judea, Babylon) are listed but not put on the map.'}
D['meta']['sources'].append({'id':'naturalearth','title':'Natural Earth 1:10m coastline, lakes and rivers (public domain), for the map','url':'https://www.naturalearthdata.com'})
D['meta']['sources'].append({'id':'wikidata','title':'Wikidata (dates, places, coordinates), queried 2026-11-17','url':'https://www.wikidata.org'})
D['meta']['version']=4
open('tannaim-data.v4.js','w').write('/* Tannaim of the Mishnah, v4, 2026-11-17. v3 plus years (Wikidata, Jewish Encyclopedia generation spans) and places (Wikidata). See meta.sources, meta.years and meta.gaps. */\nwindow.TANNAIM_DATA = '+json.dumps(D,ensure_ascii=False,separators=(',',':'))+';\n')
ppl=[p for p in D['people'] if p['kind']=='person']
print('people',len(ppl),'life',sum(1 for p in ppl if p.get('life')),'places',sum(1 for p in ppl if p.get('places')),'period',sum(1 for p in ppl if p.get('period')),'distinct places',len(places_all))
print(collections.Counter(e['kind'] for p in ppl for e in p.get('places',[])))
print([p['id'] for p in ppl if not p.get('period')][:60])
