import json, collections, re, mtext, map as M, pandas as pd
T=mtext.load()
s=open('tannaim-data.js').read(); old=json.loads(s[s.index('=')+1:].rstrip().rstrip(';'))
OLD={p['id']:p for p in old['people']}
OLD['Rabbi Yakim Ish Hadar']=OLD.pop('Rabbi Yakim Ish Chadid')
MEN=json.load(open('mentions.json'))['mentions']
JE='Jewish Encyclopedia (1906), "Tannaim and Amoraim"'
# entries the dispute data did not have, or that are now split out: (id, jfi term, JE generation, era)
NEW={
"Rabban Gamliel HaZaken":("Gamaliel",1,"tannaim"),
"Rabban Gamliel son of Rebbe":("Gamaliel III",None,"tannaim"),
"Rabban Shimon ben Gamliel HaZaken":("Simeon ben Gamliel",1,"tannaim"),
"Shimon HaTzaddik":("Simeon the Just",None,"anshei knesses hagedolah"),
"Antigonos Ish Socho":("Antigonus of Sokho",None,"pre-zugot"),
"Rabbi Elazar ben Arach":("Eleazar ben Arach",None,"tannaim"),
"Rabbi Yossi HaKohen":("Yose HaKohen",None,"tannaim"),
"Rabbi Shimon ben Nesanel":("Shimon ben Nethanel",None,"tannaim"),
"Rabbi Chanina ben Dosa":("Hanina ben Dosa",None,"tannaim"),
"Rabbi Elazar HaModai":("Eleazar of Modi'im",None,"tannaim"),
"Rabbi Elazar HaKappar":("Eleazar ha-Kappar",None,"tannaim"),
"Rabbi Levitas Ish Yavneh":("Rabbi Levitas of Yavne",None,"tannaim"),
"Rabbi Yonasan":("Rabbi Jonathan",None,"tannaim"),
"Rabbi Yaakov":("רבי יעקב",None,"tannaim"),
"Shmuel HaKatan":("Shmuel ha-Katan",None,"tannaim"),
"Elisha ben Avuya":("Elisha ben Abuyah",None,"tannaim"),
"Ben Bag Bag":("Ben Bag-Bag",None,"tannaim"),
"Ben Hei Hei":("בן הא הא",None,"tannaim"),
"Yehuda ben Teima":(None,None,"tannaim"),
"Rabbi Chanina ben Chachinai":("Hanina ben Hakinai",None,"tannaim"),
"Rabbi Dostai beRabbi Yannai":("Dostai ben Jannai",None,"tannaim"),
"Rabbi Yossi ben Kisma":("Jose ben Kisma",None,"tannaim"),
"Rabbi Chananya ben Akashya":("Chananya ben Akashya",None,"tannaim"),
"Rabbi Shimon ben Akashya":(None,None,"tannaim"),
"Rabbi Pinchas ben Yair":("Phinehas ben Jair",None,"tannaim"),
"Rabbi Yochanan ben Gudgeda":("רבי יוחנן בן גודגדא",None,"tannaim"),
"Rabbi Yochanan ben HaChoranis":("Yochanan ben HaChoranit",None,"tannaim"),
"Rabbi Chutzpis":("Hutzpit the Interpreter",None,"tannaim"),
"Rabbi Shimon Ish HaMitzpa":(None,None,"tannaim"),
"Rabbi Mayasha":("רבי מיאשא",None,"tannaim"),
"Rabbi Shimon ben HaSegan":("Shimon ben hasgan",None,"tannaim"),
"Rabbi Shimon ben Chalafta":("Shimon ben Halafta",None,"tannaim"),
"Abba Yossi ben Chanan":("Abba Jose ben Hanan",None,"tannaim"),
"Abba Yossi ben Dostai":(None,None,"tannaim"),
"Nachum HaLavlar":("נחום הלבלר",None,"tannaim"),
"Rabbi Yishmael son of Rabbi Yossi":("Ishmael ben Jose",6,"tannaim"),
"Rabbi Yehuda HaNachtom":("Judah HaNahtom",None,"tannaim"),
"Rabbi Yehoshua ben Korcha":("Joshua ben Karha",4,"tannaim"),
"Rabbi Elazar ben Pila":(None,None,"tannaim"),
"Rabbi Yehoshua HaGarsi":("רבי יהושע הגרסי",None,"tannaim"),
"Rabbi Nechunya ben HaKana":("Nehunya ben HaKanah",None,"tannaim"),
"Rabbi Yehoshua ben Levi":(None,None,"semi-tannaim"),
"Rabbi Chalafta ben Dosa":(None,None,"tannaim"),
"Rabbi Yannai":("Rabbi Yannai",None,"tannaim"),
"Rabbi Eliezer ben Diglai":(None,None,"tannaim"),
"Rabbi Nechunya ben Gudgeda":(None,None,"tannaim"),
"Rabbi Zecharya ben HaKatzav":("זכריה בן הקצב",None,"tannaim"),
"Rabbi Elazar ben Parta":("Eleazar ben Perata I",None,"tannaim"),
"Rabbi Menachem":(None,None,"tannaim"),
"Rabbi Elazar ben Masya":("רבי אלעזר בן מתיא",None,"tannaim"),
"Rabbi Hurkenos":(None,None,"tannaim"),
"Rabbi Chanina ben Akiva":(None,None,"tannaim"),
}
j=pd.read_csv('/home/claude/dl/jfi/names_extended.csv')
J={}
for _,r in j.iterrows(): J[r.term]=r; J.setdefault(r.hebrew_term,r)
src=open('build.py').read()
TRACT=eval(src[src.index('TRACT=')+6:src.index('}',src.index('TRACT='))+1])
SEDER_OF={}
for t in ['Berakhot','Peah','Demai','Kilayim','Sheviit','Terumot','Maasrot','Maaser_Sheni','Challah','Orlah','Bikkurim']: SEDER_OF[t]='זרעים'
for t in ['Shabbat','Eruvin','Pesachim','Shekalim','Yoma','Sukkah','Beitzah','Rosh_Hashanah','Taanit','Megillah','Moed_Katan','Chagigah']: SEDER_OF[t]='מועד'
for t in ['Yevamot','Ketubot','Nedarim','Nazir','Sotah','Gittin','Kiddushin']: SEDER_OF[t]='נשים'
for t in ['Bava_Kamma','Bava_Metzia','Bava_Batra','Sanhedrin','Makkot','Shevuot','Eduyot','Avodah_Zarah','Pirkei_Avot','Horayot']: SEDER_OF[t]='נזיקין'
for t in ['Zevachim','Menachot','Chullin','Bekhorot','Arakhin','Temurah','Keritot','Meilah','Tamid','Middot','Kinnim']: SEDER_OF[t]='קדשים'
for t in ['Kelim','Oholot','Negaim','Parah','Tahorot','Mikvaot','Niddah','Makhshirin','Zavim','Tevul_Yom','Yadayim','Oktzin']: SEDER_OF[t]='טהרות'
def expand(t,loc):
  out=[];ch=None
  for part in loc.split(';'):
    part=part.strip()
    if ':' in part: ch,rest=part.split(':')
    else: rest=part
    if '-' in rest: a,b=rest.split('-'); out+=[(t,int(ch),x) for x in range(int(a),int(b)+1)]
    else: out.append((t,int(ch),int(rest)))
  return out
PARENT={'Rabban Gamliel HaZaken':'Rabban Gamliel','Rabban Gamliel son of Rebbe':'Rabban Gamliel','Rabban Shimon ben Gamliel HaZaken':'Rabban Shimon ben Gamliel','Rabbi Elazar ben Arach':'Rabbi Elazar','Rabbi Yossi HaKohen':'Rabbi Yossi','Rabbi Shimon ben Nesanel':'Rabbi Shimon'}
def mbset(pid):
  p=OLD.get(PARENT.get(pid,pid)); out=set()
  if p:
    for t,loc in p['refs']: out|=set(expand(t,loc))
  return out
STORY=re.compile(r'(?:^|\s)ו?מעשה(?=\s?[בש,]|$)|פעם אחת|אמרו עליו|משמת|כשנכנס|כשבא')
TEST=re.compile(r'העיד|העידו|מעיד|שמעתי|מקבלני|מקבל אני|כך מקבלני')
def kind(pid,ref,mb):
  t,c,m=ref
  tol=(0,) if (t=='Pirkei_Avot' or pid in PARENT) else (-1,0,1)
  if any((t,c,m+k) in mb for k in tol): return 'dispute'
  x=T[(t,c,m)]
  if TEST.search(x): return 'testimony'
  if STORY.search(x): return 'story'
  if t=='Pirkei_Avot' or 'היה אומר' in x: return 'saying'
  return 'ruling'
KIND={'dispute':{'he':'מחלוקת','en':'Dispute'},'testimony':{'he':'עדות','en':'Testimony'},'story':{'he':'מעשה','en':'Story'},'saying':{'he':'מאמר','en':'Saying'},'ruling':{'he':'הלכה או אזכור','en':'Ruling or mention'}}
def jfirec(term):
  r=J.get(term) if term else None
  if r is None: return None
  def links(s):
    out=[]
    if isinstance(s,str):
      for part in s.split(';'):
        en,_,he=part.strip().partition(' / ')
        if en: out.append({'en':en.strip(),'he':he.strip() or None})
    return out
  g=lambda v: v if isinstance(v,str) else None
  return {'id':r.wikidata_id,'wikipedia_he':g(r.wikipedia_he),'wikipedia_en':g(r.wikipedia_en),'he_title':g(r.hebrew_term),'teachers':links(r.student_of),'students':links(r.student),'father':links(r.father),'born':g(r.date_of_birth),'died':g(r.date_of_death),'source':'Wikidata via EzraBrand/jewish-figures-index (MIT)'}
people=[]
ids=[p[0] for p in M.P]+[k for k in NEW if k not in [p[0] for p in M.P]]
mp={p[0]:p for p in M.P}
for pid in ids:
  op=OLD.get(pid)
  if pid in mp: _,names,jt,gen,era,kd,note=mp[pid]
  else: jt,gen,era=NEW[pid]; kd='person'; note=None; names=[]
  ms=MEN.get(pid,[]); mb=mbset(pid)
  per=collections.OrderedDict()
  for x in ms:
    r=tuple(x['ref']); per.setdefault(r,{'n':0,'forms':collections.Counter(),'ident':None}); per[r]['n']+=1; per[r]['forms'][x['form']]+=1
    if x['ident']: per[r]['ident']=x['ident']
  mishnayos=[]; bykind=collections.Counter(); byseder=collections.Counter(); bytr=collections.Counter()
  for r,v in per.items():
    k=kind(pid,r,mb); bykind[k]+=1; byseder[SEDER_OF[r[0]]]+=1; bytr[r[0]]+=1
    e={'ref':'Mishnah %s %d:%d'%(r[0],r[1],r[2]),'kind':k,'n':v['n']}
    if v['ident']: e['identified']=v['ident']
    mishnayos.append(e)
  forms=collections.Counter()
  for v in per.values(): forms.update(v['forms'])
  jr=jfirec(jt)
  rec={'id':pid,'kind':kd,'era':era,
   'name':{'en':pid,'he':forms.most_common(1)[0][0] if forms else (op['name']['he_mishnah'] if op else None),'he_source':'Most common form in the Mishnah, Torat Emet 357' if forms else 'MishnaBase name stem','he_forms':[f for f,_ in forms.most_common()]},
   'generation':({'value':gen,'source':JE} if gen else None),
   'text_counts':{'mentions':sum(v['n'] for v in per.values()),'mishnayos':len(per),'by_kind':dict(bykind),'by_seder':dict(byseder),'top_tractates':bytr.most_common(6),'source':'Name search of the full Mishnah, Sefaria Torat Emet 357 (Sefaria-Export-Archive commit 3f10136)'} if per else None,
   'dispute_counts':({k:op['counts'][k] for k in ('arguments','tractates','by_seder')}|{'source':'MishnaBase (Kazhdan and Kay 2022)'}) if op and op['counts']['arguments'] else None,
   'disputes_most_with':op['disputes_most_with'] if op else [],
   'mishnayos':mishnayos,
   'note':note}
  if jr: rec['wikidata']=jr
  if pid in('Rabban Gamliel','Rabban Shimon ben Gamliel'):
    rec['note']='Identified mishnah by mishnah only where the Mishnah or Tosafos Yom Tov says which one; every other place is marked default.'
  people.append(rec)
# drop names that have neither text mentions nor disputes
people=[p for p in people if p['text_counts'] or p['dispute_counts']]
people.sort(key=lambda r:-((r['text_counts'] or {}).get('mentions',0) or (r['dispute_counts'] or {}).get('arguments',0)))
# resolve teacher/student links to ids in this file
term2id={}
for pid in ids:
  jt=mp[pid][2] if pid in mp else NEW[pid][0]
  if jt: term2id[jt]=pid
for p in people:
  w=p.get('wikidata')
  if w:
    for k in ('teachers','students','father'):
      for l in w[k]: l['id']=term2id.get(l['en']) or term2id.get(l['he'] or '')
out={'meta':{'built':'2026-11-16','version':2,
 'kinds':KIND,
 'kind_method':'dispute = MishnaBase codes the sage in a dispute at this mishnah or the one beside it (to absorb numbering differences). Otherwise, from the wording of the mishnah: testimony (העיד, שמעתי, מקבלני), story (מעשה, פעם אחת, אמרו עליו, משמת), saying (Avos or היה אומר), else ruling or mention. Word-pattern sorting; not checked mishnah by mishnah.',
 'identification':'Plain names follow the usual identification (R\' Yehuda = bar Ilai, R\' Yossi = ben Chalafta, R\' Shimon = bar Yochai, R\' Eliezer = ben Hurkenos, R\' Yehoshua = ben Chananya, R\' Elazar = ben Shamua). Where the Mishnah or a commentary says it is someone else, the mishnah carries an "identified" note with the source.',
 'sources':[{'id':'text','title':'Mishnah, Torat Emet 357, via Sefaria-Export-Archive','url':'https://github.com/Sefaria/Sefaria-Export-Archive'},
  {'id':'mishnabase','title':'MishnaBase, Kazhdan and Kay, JSIJ 22 (2022)','url':'https://github.com/BenjaminKay/MishnaBase'},
  {'id':'je','title':'Jewish Encyclopedia (1906), Tannaim and Amoraim','url':'https://www.jewishencyclopedia.com/articles/14238'},
  {'id':'jfi','title':'Ezra Brand, jewish-figures-index (Wikidata)','url':'https://github.com/EzraBrand/jewish-figures-index'},
  {'id':'tyt','title':'Tosafos Yom Tov on Avos 1:16, 1:18 and Kerisos 1:7 (Sefaria, Romm Vilna 1913)','url':'https://www.sefaria.org/Tosafot_Yom_Tov_on_Pirkei_Avot.1.16'}],
 'generations':{'1':'10-80','2':'80-120','3':'120-140','4':'c.140-c.165','5':'165-200','6':'200-220'},
 'gaps':['Generation is filled only where the Jewish Encyclopedia names the sage; the rest wait for Hyman, Toldot Tannaim ve-Amoraim.',
   'R\' Eliezer ben Yaakov (two of that name) is not split; no source checked yet says which one each mishnah means.',
   'Rabban Gamliel and Rabban Shimon ben Gamliel are split only where a source says so; the rest are marked default.',
   'MishnaBase follows the Kaufmann manuscript in places (R\' Elazar where Torat Emet has R\' Eliezer); this file counts by Torat Emet.',
   'Temple officials and Kohanim Gedolim named in the Mishnah (ben Gamla, ben Piavi, Yoma 3) are left out; this is a list of sages.',
   'Tanna Kamma and Stam Mishnah have no name in the text, so they carry MishnaBase counts only.']},
 'people':people}
open('tannaim-data.js','w').write('/* Tannaim of the Mishnah, v2, 2026-11-16. Every mention in the Mishnah (Torat Emet 357) sorted by kind, MishnaBase dispute counts, generations, teachers and students. See meta.sources and meta.gaps. */\nwindow.TANNAIM_DATA = '+json.dumps(out,ensure_ascii=False,indent=1)+';\n')
print(len(people))
for p in people[:45]:
  tc=p['text_counts'] or {}
  print(tc.get('mentions'),tc.get('mishnayos'),p['id'],'|',p['name']['he'],'|',(p['generation'] or {}).get('value'),'|',tc.get('by_kind'))
