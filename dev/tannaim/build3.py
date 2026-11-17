import json, re, collections, unicodedata
s=open('tannaim-data.js').read(); D=json.loads(s[s.index('=')+1:].rstrip().rstrip(';'))
F=json.load(open('sefaria_figures.json'))
M=json.load(open('match.json'))
MEN=json.load(open('mentions.json'))['mentions']
OVR={'Rabban Shimon ben Gamliel':'rabban-shimon-b-gamliel-(ii)','Rabban Shimon ben Gamliel HaZaken':'rabban-shimon-b-gamliel',
 'Rabban Gamliel':'rabban-gamliel','Rabban Gamliel HaZaken':'rabban-gamliel-hazaken-(i)','Rabban Gamliel son of Rebbe':'rabban-gamliel-b-rabbi-(iii)',
 'Ben Beseira':None,'Rabbi Shimon ben Nesanel':None,'Rabbi Nechunya':None,'Rabbi Yishmael son of Rabbi Yossi':'rabbi-yishmael-b-yose',
 'Rabbi Yossi ben Meshulam':'rabbi-yose-b-hameshullam','Rabbi Yossi ben Durmaskis':'rabbi-yose-b-dormasqit','Rabbi Dosa ben Harkinas':'rabbi-dosa-b-harkinas',
 'Rabbi Elazar ben Arach':'rabbi-elazar-b-arakh','Rabbi Yossi HaKohen':'rabbi-yose-hakohen','Rabbi Yishmael beno shel Rabbi Yochanan ben Beroka':'rabbi-yishmael-b-yohanan-b-berokah'}
# one name, two people in Sefaria: keep both, do not choose
TWO={'Rabbi Eliezer ben Yaakov':['rabbi-eliezer-b-yaakov-(i)','rabbi-eliezer-b-yaakov-(ii)'],
     'Rabbi Elazar ben Tzadok':['rabbi-elazar-b-tzadok-(i)','rabbi-elazar-b-tzadok-(ii)'],
     'Rabbi Yehuda ben Beseira':['rabbi-yehudah-b-betera-(i)','rabbi-yehudah-b-betera-(ii)']}
slug_of={}
for p in D['people']:
  pid=p['id']
  if pid in TWO: continue
  if pid in OVR: sl=OVR[pid]
  else: sl=(M.get(pid) or [None])[0]
  if sl: slug_of[pid]=sl
id_of={v:k for k,v in slug_of.items()}
for k,v in TWO.items():
  for sl in v: id_of.setdefault(sl,k)
REL={'learned-from':'teachers','taught':'students','child-of':'parents','parent-of':'children','ancestor-of':'descendants','descendant-of':'ancestors',
     'sibling-of':'siblings','spouse-of':'spouse','child-in-law-of':'parents_in_law','parent-in-law-of':'children_in_law','opposed':'opposed','member-of':'member_of','related-to':'related'}
def sefrec(sl):
  f=F.get(sl)
  if not f: return None
  links={}
  for k,v in (f.get('links') or {}).items():
    if k in REL:
      links[REL[k]]=[{'id':id_of.get(x['slug']),'slug':x['slug'],'en':x['en'],'he':x['he']} for x in v]
  return {'slug':sl,'gen':(f.get('properties') or {}).get('generation'),'title':f.get('primaryTitle'),'desc':f.get('description'),'links':links}
GEN_ORDER=['Z1','Z2','Z3','Z4','Z5','T1','T2','T3','T4','T5','T6','TA']
for p in D['people']:
  pid=p['id']
  if pid in TWO:
    recs=[sefrec(x) for x in TWO[pid]]
    p['sefaria']={'two':recs,'gen':None,'note':'Sefaria lists two sages of this name ('+' and '.join(r['gen'] for r in recs)+'); which one each mishnah means is not resolved here.'}
  elif pid in slug_of:
    p['sefaria']=sefrec(slug_of[pid])
  else: p['sefaria']=None
  # per-mishnah forms, so the page can flag a mishnah where only a short form appears
  forms=collections.defaultdict(collections.Counter)
  for x in MEN.get(pid,[]):
    r=x['ref']; forms['Mishnah %s %d:%d'%(r[0],r[1],r[2])][x['form']]+=1
  for m in p['mishnayos']:
    f=forms.get(m['ref'])
    if f and len(set(p['name']['he_forms']))>1: m['f']=list(f)
  if pid=='Rabbi Dosa ben Harkinas':
    for m in p['mishnayos']:
      if m.get('f')==['רבי דוסא']:
        m['identified']={'rule':'Only "רבי דוסא" appears here; counted as R\' Dosa ben Harkinas. Sefaria also lists a later Rabbi Dosa (T6).','source':None,'default':True}
# nesiim of the house of Hillel, father to son, with the source for each step
NASI=['Hillel','Rabban Gamliel HaZaken','Rabban Shimon ben Gamliel HaZaken','Rabban Gamliel','Rabban Shimon ben Gamliel','Rebbe','Rabban Gamliel son of Rebbe']
for p in D['people']:
  if p['id'] in NASI: p['nasi']=True
T={}
for t in json.load(open('/home/claude/work/tract_meta.json')): T[t['key']]=t
mt=lambda c,m: json.load(open('/home/claude/dl/mishnah/Pirkei Avot.json'))
AV=json.load(open('/home/claude/dl/mishnah/Pirkei Avot.json'))
def av(c,m,upto=1):
  t=re.sub('<[^>]+>','',AV['text'][c-1][m-1]).strip()
  parts=re.split(r'(?<=[.:])\s',t)
  return ' '.join(parts[:upto]).strip()
SH='הִלֵּל וְשִׁמְעוֹן, גַּמְלִיאֵל וְשִׁמְעוֹן, נָהֲגוּ נְשִׂיאוּתָן לִפְנֵי הַבַּיִת מֵאָה שָׁנָה.'
kab=[
 {'ref':'Mishnah Pirkei_Avot 1:1','who':[{'he':'משה'},{'he':'יהושע'},{'he':'זקנים'},{'he':'נביאים'},{'he':'אנשי כנסת הגדולה'}],'text':av(1,1)},
 {'ref':'Mishnah Pirkei_Avot 1:2','who':[{'id':'Shimon HaTzaddik'}],'text':av(1,2)},
 {'ref':'Mishnah Pirkei_Avot 1:3','who':[{'id':'Antigonos Ish Socho'}],'text':av(1,3)},
 {'ref':'Mishnah Pirkei_Avot 1:4','who':[{'id':'Yossi ben Yoezer'},{'id':'Yossi ben Yochanan'}],'text':av(1,4)},
 {'ref':'Mishnah Pirkei_Avot 1:6','who':[{'id':'Yehoshua ben Perachya'},{'id':'Nittai HaArbeli'}],'text':av(1,6)},
 {'ref':'Mishnah Pirkei_Avot 1:8','who':[{'id':'Yehuda ben Tabbai'},{'id':'Shimon ben Shatach'}],'text':av(1,8)},
 {'ref':'Mishnah Pirkei_Avot 1:10','who':[{'id':'Shemaya'},{'id':'Avtalyon'}],'text':av(1,10)},
 {'ref':'Mishnah Pirkei_Avot 1:12','who':[{'id':'Hillel'},{'id':'Shammai'}],'text':av(1,12)},
 {'ref':'Mishnah Pirkei_Avot 2:8','who':[{'id':'Rabban Yochanan ben Zakkai'}],'text':av(2,8)},
 {'ref':'Mishnah Pirkei_Avot 2:8','who':[{'id':'Rabbi Eliezer'},{'id':'Rabbi Yehoshua'},{'id':'Rabbi Yossi HaKohen'},{'id':'Rabbi Shimon ben Nesanel'},{'id':'Rabbi Elazar ben Arach'}],'text':None,'text_from':(2,8)},
]
# the sentence of Avos 2:8 that names the five students
t=re.sub('<[^>]+>','',AV['text'][1][7]); k=t.find('תַלְמִידִים'); i=t.rfind('. ',0,k)+2; j2=t.find('.',t.find('עֲרָךְ',k))
kab[-1]['text']=t[i:j2+1]
nes=[
 {'id':'Hillel','src':[{'ref':'Shabbat 15a:10','text':SH,'label':'שבת טו.'}]},
 {'he':'שמעון','en':'Shimon','src':[{'ref':'Shabbat 15a:10','text':SH,'label':'שבת טו.'}],'off':True},
 {'id':'Rabban Gamliel HaZaken','src':[{'ref':'Tosafot Yom Tov on Pirkei Avot 1:16','text':'רבן גמליאל אומר. והוא בן בנו של הלל','label':'תוספות יום טוב אבות א:טז'}]},
 {'id':'Rabban Shimon ben Gamliel HaZaken','src':[{'ref':'Mishnah Pirkei_Avot 1:17','text':av(1,17,1).split(',')[0]+'...','label':'אבות א:יז'}]},
 {'id':'Rabban Gamliel','src':[{'ref':'Tosafot Yom Tov on Pirkei Avot 1:18','text':'הוא נכדו של שמעון הנזכר במשנה הקודמת','label':'תוספות יום טוב אבות א:יח'}]},
 {'id':'Rabban Shimon ben Gamliel','src':[{'ref':'Tosafot Yom Tov on Pirkei Avot 1:18','text':'וזהו אביו של רבי הוא רבינו הקדוש','label':'תוספות יום טוב אבות א:יח'}]},
 {'id':'Rebbe','src':[{'ref':'Tosafot Yom Tov on Pirkei Avot 1:18','text':'וזהו אביו של רבי הוא רבינו הקדוש','label':'תוספות יום טוב אבות א:יח'}]},
 {'id':'Rabban Gamliel son of Rebbe','src':[{'ref':'Mishnah Pirkei_Avot 2:2','text':'רַבָּן גַּמְלִיאֵל בְּנוֹ שֶׁל רַבִּי יְהוּדָה הַנָּשִׂיא','label':'אבות ב:ב'}]},
]
D['chains']={'kabbalah':kab,'nesiim':nes}
D['meta']['tractates']=list(T.values())
D['meta']['version']=3
D['meta']['sources'].append({'id':'sefaria','title':'Sefaria topic pages (generation, teachers, students, family, summary), fetched 2026-11-17','url':'https://www.sefaria.org/topics/category/talmudic-figures'})
D['meta']['gen_scheme']={'source':'Sefaria','codes':{'Z1':'זוגות · זוג א','Z2':'זוגות · זוג ב','Z3':'זוגות · זוג ג','Z4':'זוגות · זוג ד','Z5':'זוגות · זוג ה','T1':'תנאים · דור א','T2':'תנאים · דור ב','T3':'תנאים · דור ג','T4':'תנאים · דור ד','T5':'תנאים · דור ה','T6':'תנאים · דור ו','TA':'בין תנאים לאמוראים'},
 'note':'Generations follow Sefaria\'s scheme, in which the generation of the Churban is T1 and Rebbe is T6. The Jewish Encyclopedia numbers one lower (Rabban Yochanan ben Zakkai is its first generation, Sefaria\'s T2), so its number is shown separately in each profile.'}
D['meta']['gaps']=[g for g in D['meta']['gaps'] if not g.startswith('Generation is filled')]+['Sages Sefaria does not list have no generation here; they sit in the "not placed" row until a source is added.','Sefaria\'s summaries are quoted as Sefaria wrote them and have not been checked against the sources.']
D['meta']['built']='2026-11-17'
HEX={'Tanna Kamma':'תנא קמא','Stam Mishnah':'סתם משנה','Yesh Omrim':'יש אומרים'}
for p in D['people']:
  if p['id'] in HEX and not p['name'].get('he'): p['name']['he']=HEX[p['id']]
  if p['id']=='Rebbe': p['name']['he_display']='רבי יהודה הנשיא'; p['name']['he_display_src']='Mishnah Avos 2:2'
# before the Zugos, in the order Avos 1:2-1:3 gives
for pid,ref in (('Shimon HaTzaddik','Mishnah Pirkei_Avot 1:2'),('Antigonos Ish Socho','Mishnah Pirkei_Avot 1:3')):
  if pid in [p['id'] for p in D['people']]:
    [p for p in D['people'] if p['id']==pid][0]['pre_zugot']=ref

open('tannaim-data.v3.js','w').write('/* Tannaim of the Mishnah, v3, 2026-11-17. Every mention in the Mishnah (Torat Emet 357) by kind; MishnaBase disputes; Sefaria generations, teachers, students, family and summaries; Wikidata links; chains of Avos 1-2 and of the Nesiim. See meta.sources and meta.gaps. */\nwindow.TANNAIM_DATA = '+json.dumps(D,ensure_ascii=False,separators=(',',':'))+';\n')
print('people',len(D['people']),'with sefaria',sum(1 for p in D['people'] if p.get('sefaria')))
g=collections.Counter((p.get('sefaria') or {}).get('gen') for p in D['people']); print(g)
print(kab[-1]['text']); print(nes[3]['src'])
