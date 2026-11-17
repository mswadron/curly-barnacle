import json,re,unicodedata,collections
F=json.load(open('sefaria_figures.json'))
s=open('tannaim-data.js').read();D=json.loads(s[s.index('=')+1:].rstrip().rstrip(';'))
def nh(t):
  t=''.join(ch for ch in unicodedata.normalize('NFD',t) if not unicodedata.combining(ch))
  t=re.sub(r'[\[\]\(\)"״׳,.]','',t).replace("ר' ","רבי ").replace('ר\'','רבי ')
  t=re.sub(r'\bבר\b','בן',t); t=re.sub(r'\s+',' ',t).strip()
  return t
def ne(t):
  t=t.lower().replace('[','').replace(']','').replace('(','').replace(')','')
  t=re.sub(r'\bb\.\s*','ben ',t).replace('rabban ','rabbi ').replace("r. ",'rabbi ')
  for a,b in [('yossi','yose'),('yehuda ','yehudah '),('yehoshua','yehoshua'),('elazar','elazar'),('chananya','hananyah'),('ch','h'),('kh','h'),('tz','z'),('ts','z'),('ss','s'),('y','i'),('ah ',' '),('a ',' ')]:
    t=t.replace(a,b)
  t=re.sub(r'[^a-z ]','',t); t=re.sub(r'(a|h)$','',t.strip()); return re.sub(r'\s+',' ',t).strip()
cand={k:v for k,v in F.items() if re.match(r'^(Z|T)',(v.get('properties') or {}).get('generation') or '') or (v.get('properties') or {}).get('generation') in (None,'TA')}
HE=collections.defaultdict(set); EN=collections.defaultdict(set)
for k,v in cand.items():
  for t in v.get('titles') or []:
    (HE if t['lang']=='he' else EN)[nh(t['text']) if t['lang']=='he' else ne(t['text'])].add(k)
res={}
for p in D['people']:
  if p['kind']=='collective': continue
  forms=[nh(f) for f in (p['name'].get('he_forms') or [])+[p['name']['he'] or '']]
  hits=collections.Counter()
  for f in forms:
    for k in HE.get(f,()): hits[k]+=2
  for k in EN.get(ne(p['id']),()): hits[k]+=1
  res[p['id']]=hits.most_common(3)
json.dump({k:[h[0] for h in v] for k,v in res.items()},open('match.json','w'),ensure_ascii=False,indent=0)
for k,v in res.items():
  print(k,'=>',[(h,(F[h]['primaryTitle'] or {}).get('en'),F[h]['properties'].get('generation'),n) for h,n in v])
print('unused Sefaria T/Z figures:')
used=set(h for v in res.values() for h,_ in v[:1])
for k,v in cand.items():
  if k not in used: print('  ',k,(v['primaryTitle'] or {}).get('en'),'|',(v['primaryTitle'] or {}).get('he'),v['properties'].get('generation'))
