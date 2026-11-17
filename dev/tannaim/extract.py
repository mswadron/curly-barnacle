import re, json, collections, mtext, aliases
T=mtext.load()
PUN=re.compile(r'[,.:;!?()\[\]"״׳\']')
def norm_tokens(s):
  s=s.replace('בר רבי','ברבי')
  out=[]
  for w in s.split(' '):
    p=bool(re.search(r'[,.:;!?]$',w)); w=PUN.sub('',w)
    if not w: continue
    if w in('בר','ברבי'): w='בן'
    out.append((w,p))
  return out
AL=[]
for cid,forms in aliases.A.items():
  for f in forms: AL.append((tuple(f.split(' ')),cid))
AL.sort(key=lambda x:-len(x[0]))
FIRST=set(a[0][0] for a in AL)
PREF=['','ו','ש','ל','מ','כ','ד','וש','ול','ומ','וכ','שב','מש']
REBBE_NEXT={'אומר','אוסר','מתיר','התיר','מכשיר','פוסל','מטמא','מטהר','מחיב','מחייב','פוטר','ובית','אמר','מתירין','הושיב'}
def match(toks,i):
  w,_=toks[i]
  for p in PREF:
    if p and not w.startswith(p): continue
    w0=w[len(p):]
    if w0 not in FIRST and w0!='רבי': continue
    for form,cid in AL:
      L=len(form)
      if i+L>len(toks): continue
      if form[0]!=w0: continue
      if all(toks[i+k][0]==form[k] for k in range(1,L)):
        # a following name word means a longer unknown name: stop at it
        return cid,L,p,' '.join(form)
    if w0=='רבי' and i+1<len(toks) and (toks[i][1] or toks[i+1][0] in REBBE_NEXT):
      return 'Rebbe',1,p,'רבי'
    if w0=='רבי' and i+1==len(toks): return 'Rebbe',1,p,'רבי'
  return None
mentions=collections.defaultdict(list); unknown=collections.Counter()
for key,s in T.items():
  t,c,m=key; toks=norm_tokens(s); i=0
  while i<len(toks):
    r=match(toks,i)
    if not r:
      w=toks[i][0]
      if re.sub('^(ו|ש|ל|מ|כ|ד)','',w) in('רבי','רבן') and i+1<len(toks): unknown[' '.join(x[0] for x in toks[i:i+3])]+=1
      i+=1; continue
    cid,L,p,form=r; ident=None
    nxt=toks[i+L][0] if i+L<len(toks) else ''
    prev=toks[i-1][0] if i>0 else ''
    if cid=='Rebbe' and (t,c,m)==('Rosh_Hashanah',2,9): i+=L; continue
    if cid=='Hillel' and (p in('ל','ומ') or prev in('טעון','וקראו','בו','ה\'')): i+=L; continue
    if cid=='Chanan ben Avishalom' and form=='חנן' and t!='Ketubot': i+=L; continue
    # if the matched form is followed by בן or איש, it is a longer name not in the table: record and skip
    if nxt in('בן','איש') and not toks[i+L-1][1] and cid not in('Beis Shammai','Beis Hillel','Chachamim'):
      unknown[' '.join(x[0] for x in toks[i:i+L+2])]+=1; i+=L+2; continue
    for (ct,cc,(a,b)),mp in aliases.CONTEXT.items():
      if t==ct and c==cc and a<=m<=b and cid in mp: cid=mp[cid]; ident={'rule':'Plain name in Avos 2:9-14 refers to the five students listed in Avos 2:8','source':'Mishnah Avos 2:8'}
    if cid=='Rabbi Yishmael' and nxt=='בנו':
      if (t,c,m)==('Pirkei_Avot',4,5): cid='Rabbi Yishmael beno shel Rabbi Yochanan ben Beroka'
      elif (t,c,m)==('Pirkei_Avot',4,7): cid='Rabbi Yishmael son of Rabbi Yossi'
      ident={'rule':'"Rabbi Yishmael his son" follows the father named just before it','source':'Mishnah Avos 4:4 and 4:6'}
      L+=1
    if cid=='Rabban Gamliel':
      if (t,c,m)==('Pirkei_Avot',1,16): cid='Rabban Gamliel HaZaken'; ident={'rule':'Grandson of Hillel','source':'Tosafos Yom Tov on Avos 1:16'}
      else: ident={'rule':'Default: Rabban Gamliel of Yavneh; not checked mishnah by mishnah','source':None,'default':True}
    if cid=='Rabban Gamliel HaZaken' and not ident: ident={'rule':'The Mishnah itself says HaZaken','source':'Mishnah text'}
    if cid=='Rabban Shimon ben Gamliel':
      if (t,c,m)==('Keritot',1,7): cid='Rabban Shimon ben Gamliel HaZaken'; ident={'rule':'Same Shimon as Avos 1:17','source':'Tosafos Yom Tov on Kerisos 1:7'}
      elif (t,c,m)==('Pirkei_Avot',1,18): ident={'rule':'Father of Rebbe, grandson of the Shimon in Avos 1:17','source':'Tosafos Yom Tov on Avos 1:18'}
      else: ident={'rule':'Default: Rabban Shimon ben Gamliel of Usha, father of Rebbe; not checked mishnah by mishnah','source':None,'default':True}
    mentions[cid].append({'ref':[t,c,m],'form':form,'ident':ident})
    i+=L
  # Avos 1:17 "Shimon his son"
  if (t,c,m)==('Pirkei_Avot',1,17) and toks and toks[0][0]=='שמעון':
    mentions['Rabban Shimon ben Gamliel HaZaken'].append({'ref':[t,c,m],'form':'שמעון בנו','ident':{'rule':'Son of Rabban Gamliel HaZaken of Avos 1:16','source':'Mishnah Avos 1:17; Tosafos Yom Tov on Avos 1:18'}})
json.dump({'mentions':mentions,'unknown':unknown},open('mentions.json','w'),ensure_ascii=False)
print(sorted([(len(v),k) for k,v in mentions.items()],reverse=True)[:30])
print('UNKNOWN'); [print(v,k) for k,v in unknown.most_common(120)]
