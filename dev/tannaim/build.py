import json, collections, pandas as pd, sys, map as M, re
MB='/home/claude/dl/MishnaBase/'; JFI='/home/claude/dl/jfi/names_extended.csv'
TRACT={'ברכות':'Berakhot','פאה':'Peah','דמאי':'Demai','כלאים':'Kilayim','שביעית':'Sheviit','תרומות':'Terumot','מעשר':'Maasrot','מעשר שני':'Maaser_Sheni','חלה':'Challah','ערלה':'Orlah','בכורים':'Bikkurim',
'שבת':'Shabbat','עירובין':'Eruvin','פסחים':'Pesachim','שקלים':'Shekalim','יומא':'Yoma','סוכה':'Sukkah','ביצה':'Beitzah','ראש השנה':'Rosh_Hashanah','תענית':'Taanit','מגילה':'Megillah','מועד קטן':'Moed_Katan','חגיגה':'Chagigah',
'יבמות':'Yevamot','כתובות':'Ketubot','נדרים':'Nedarim','נזיר':'Nazir','סוטה':'Sotah','גיטין':'Gittin','קידושין':'Kiddushin',
'בבא קמא':'Bava_Kamma','בבא מציעא':'Bava_Metzia','בבא בתרא':'Bava_Batra','סנהדרין':'Sanhedrin','מכות':'Makkot','שבועות':'Shevuot','עדיות':'Eduyot','עבודה זרה':'Avodah_Zarah','אבות':'Pirkei_Avot','הוריות':'Horayot',
'זבחים':'Zevachim','מנחות':'Menachot','חולין':'Chullin','בכורות':'Bekhorot','ערכין':'Arakhin','תמורה':'Temurah','כריתות':'Keritot','מעילה':'Meilah','תמיד':'Tamid','מדות':'Middot','קינים':'Kinnim',
'כלים':'Kelim','אהלות':'Oholot','נגעים':'Negaim','פרה':'Parah','טהרות':'Tahorot','מקוואות':'Mikvaot','נדה':'Niddah','מכשירין':'Makhshirin','זבים':'Zavim','טבול יום':'Tevul_Yom','ידים':'Yadayim','עוקצים':'Oktzin'}
SEDER={'Zeraim':'זרעים','Moed':'מועד','Nashim':'נשים','Nezikin':'נזיקין','Kodashim':'קדשים','Tahorot':'טהרות','Taharot':'טהרות'}
a=pd.read_csv(MB+'arguments.csv'); a=a[a['keep'].astype(str).str.strip().str.upper()=='TRUE']
d=pd.read_csv(MB+'disputes.csv')
# English -> Hebrew stem as MishnaBase wrote it
heb={}
for i in (1,2):
  for e,h in zip(d[f'Disputant_{i}'],d[f'Disputant_Hebrew_D{i}']):
    if isinstance(e,str) and isinstance(h,str) and h!='NA':
      for ee,hh in zip(e.replace('\xa0',' ').split('/'),h.split('/')): heb.setdefault(ee.strip(),hh.strip())
name2id={}
for p in M.P:
  for n in p[1]: name2id[n]=p[0]
cnt=collections.Counter(); tr=collections.defaultdict(collections.Counter); sd=collections.defaultdict(collections.Counter); refs=collections.defaultdict(list); partners=collections.defaultdict(collections.Counter)
for _,r in a.iterrows():
  ids=set()
  for i in range(1,7):
    x=r[f'Disputant_{i}']
    if isinstance(x,str) and x.strip() not in ('NA',''):
      for n in x.replace('\xa0',' ').split('/'):
        if n.strip() in name2id: ids.add(name2id[n.strip()])
  t=r['Tractate_Name_Hebrew'].strip(); s=str(r['Seder_Name']).strip(); loc=str(r['Location']).strip()
  for i in ids:
    cnt[i]+=1; tr[i][t]+=1; sd[i][SEDER.get(s,s)]+=1; refs[i].append([TRACT[t],loc])
    for j in ids:
      if j!=i: partners[i][j]+=1
j=pd.read_csv(JFI); j=j[j.category.str.contains('Tannaim|Zugot',na=False)|j.term.isin(['Hillel the Elder','Shammai the elder'])]
J={r.term:r for _,r in j.iterrows()}
J.update({r.hebrew_term:r for _,r in j.iterrows()})
jterm2id={p[2]:p[0] for p in M.P if p[2]}
def links(s):
  out=[]
  if not isinstance(s,str): return out
  for part in s.split(';'):
    part=part.strip()
    if not part: continue
    en,_,he=part.partition(' / ')
    rid=jterm2id.get(en.strip()) or jterm2id.get(he.strip())
    out.append({'id':rid,'en':en.strip(),'he':he.strip() or None})
  return out
people=[]
for p in M.P:
  pid,names,jt,gen,era,kind,note=p
  jr=J.get(jt) if jt else None
  mbheb=next((heb[n] for n in names if n in heb),None)
  rec={'id':pid,'kind':kind,'era':era,
   'name':{'en':pid,'he_mishnah':mbheb,'he_full':(jr.hebrew_term if jr is not None and isinstance(jr.hebrew_term,str) and re.search('[א-ת]',jr.hebrew_term) else None)},
   'mishnabase_names':names,
   'generation':({'value':gen,'source':'Jewish Encyclopedia (1906), "Tannaim and Amoraim"'} if gen else None),
   'counts':{'arguments':cnt[pid],'tractates':len(tr[pid]),'by_seder':dict(sd[pid]),'top_tractates':[[TRACT[k],v] for k,v in tr[pid].most_common(6)],'source':'MishnaBase (Kazhdan and Kay 2022), arguments.csv, keep=TRUE'},
   'disputes_most_with':[[k,v] for k,v in partners[pid].most_common(6)],
   'refs':refs[pid],
   'note':note}
  if jr is not None:
    rec['wikidata']={'id':jr.wikidata_id,'wikipedia_he':jr.wikipedia_he if isinstance(jr.wikipedia_he,str) else None,'wikipedia_en':jr.wikipedia_en if isinstance(jr.wikipedia_en,str) else None,
      'teachers':links(jr.student_of),'students':links(jr.student),'father':links(jr.father),
      'born':jr.date_of_birth if isinstance(jr.date_of_birth,str) else None,'died':jr.date_of_death if isinstance(jr.date_of_death,str) else None,
      'source':'Wikidata via EzraBrand/jewish-figures-index (MIT), names_extended.csv'}
  people.append(rec)
people.sort(key=lambda r:-r['counts']['arguments'])
out={'meta':{'built':'2026-11-16','total_arguments':int(len(a)),
 'what_counts_mean':'Number of MishnaBase arguments (positions in a dispute) a sage takes part in. Sayings, stories and undisputed rulings are NOT counted, so sages known mainly from Avos or aggadah are undercounted.',
 'sources':[{'id':'mishnabase','title':'MishnaBase, Kazhdan and Kay, JSIJ 22 (2022)','url':'https://github.com/BenjaminKay/MishnaBase'},
  {'id':'je','title':'Jewish Encyclopedia (1906), Tannaim and Amoraim','url':'https://www.jewishencyclopedia.com/articles/14238'},
  {'id':'jfi','title':'Ezra Brand, jewish-figures-index (Wikidata)','url':'https://github.com/EzraBrand/jewish-figures-index'}],
 'generations':{'1':'10-80','2':'80-120','3':'120-140','4':'c.140-c.165','5':'165-200','6':'200-220'},
 'gaps':['Generation is filled only for sages the Jewish Encyclopedia names as principal tannaim; the rest are blank until checked against Hyman, Toldot Tannaim ve-Amoraim.',
   'Rabban Gamliel, Rabban Shimon ben Gamliel and Rabbi Eliezer ben Yaakov are each two people; MishnaBase does not separate them.',
   'Teacher and student links come from Wikidata and are empty for many lesser-known tannaim.',
   'Hebrew he_mishnah is the name stem as MishnaBase recorded it; he_full is the Hebrew Wikipedia title.']},
 'people':people}
open(sys.argv[1],'w').write('/* Tannaim of the Mishnah: counts, generations, teachers and students. Built 2026-11-16 from MishnaBase, Jewish Encyclopedia and Wikidata. See meta.sources. */\nwindow.TANNAIM_DATA = '+json.dumps(out,ensure_ascii=False,indent=1)+';\n')
for r in people[:40]: print(r['counts']['arguments'],r['id'],'|',r['name']['he_full'] or r['name']['he_mishnah'],'| gen',(r['generation'] or {}).get('value'),'| T:',[t['en'] for t in r.get('wikidata',{}).get('teachers',[])])
print(len(people), sum(1 for r in people if r['generation']), sum(1 for r in people if 'wikidata' in r))
