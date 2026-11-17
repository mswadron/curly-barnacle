import pandas as pd, collections, json, sys
a=pd.read_csv(sys.argv[1])
a=a[a['keep'].astype(str).str.strip().str.upper()=='TRUE']
c=collections.Counter(); tr=collections.defaultdict(collections.Counter); refs=collections.defaultdict(list)
for _,r in a.iterrows():
  seen=set()
  for i in range(1,7):
    d=r[f'Disputant_{i}']
    if isinstance(d,str) and d.strip() not in ('NA',''):
      for p in d.replace('\xa0',' ').split('/'): seen.add(p.strip())
  for d in seen:
    c[d]+=1; t=r['Tractate_Name_Hebrew'].strip(); tr[d][t]+=1; refs[d].append([t,str(r['Location']).strip()])
json.dump({'counts':c,'tractates':tr,'refs':refs},open('mb_counts.json','w'),ensure_ascii=False)
for k,v in c.most_common(): print(v,len(tr[k]),k)
print(sorted(set(a['Tractate_Name_Hebrew'].str.strip())))
