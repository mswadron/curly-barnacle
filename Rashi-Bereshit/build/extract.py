# Build per-book la'az records: Catane's entry + printed Rashi comment + verse. No Hebrew is generated here.
import json,re,sys
S='/home/claude/src/'
BOOKS=['Genesis','Exodus','Leviticus','Numbers','Deuteronomy']
strip=lambda s: re.sub(r'[֑-ׇ]','',s)
HN='אבגדהוזחטיכלמנסעפצקרשת'; VAL=[1,2,3,4,5,6,7,8,9,10,20,30,40,50,60,70,80,90,100,200,300,400]
gem=lambda s: sum(VAL[HN.index(c)] for c in s if c in HN)
MARK=re.compile(r'(?<![א-ת])(?:ו?ב?לע"ז|ו?ב?לעז|לשון לעז)(?![א-ת])')
def clean_verse(t):
    t=re.sub(r'<small>(.*?)</small>',r'\1',t); t=re.sub(r'<[^>]+>','',t); t=t.replace('&thinsp;',' ').replace('&nbsp;',' ')
    t=re.sub(r'\{[ספ]\}','',t); return re.sub(r'\s+',' ',t).strip()
def split_dh(c):
    m=re.match(r'\s*<b>(.*?)</b>\s*(.*)',c,re.S)
    dh,body=(m.group(1),m.group(2)) if m else ('',c)
    body=re.sub(r'<[^>]+>','',body); return dh.strip().rstrip('.').strip(), body.strip()
def print_words(body):
    """la'az words in the printed comment: quoted-letter tokens next to a la'az mark"""
    s=strip(body).replace('״','"'); toks=s.split(); out=[]
    for i,t in enumerate(toks):
        tt=t.strip('.,:;()')
        if MARK.fullmatch(tt) or tt in('לעז','בלעז','ובלעז','בלע"ז','ובלע"ז','לע"ז'):
            cand=None
            for j in (i-1,i-2,i+1,i-3):
                if 0<=j<len(toks):
                    w=toks[j].strip('.,:;()')
                    if '"' in w and len(w.replace('"',''))>=2 and not MARK.fullmatch(w) and w not in('הקב"ה','אע"פ','ד"א','כ"ש','ס"א','רז"ל'):
                        cand=w;break
            out.append(cand)
    return out
# Entries filed under the wrong verse in the digital text of Catane, moved on the evidence of his own note.
VERSE_FIX={('Leviticus','3192'):(19,16)}
def load(b):
    R=json.load(open(S+f'rashi_he_{b}.json'))['text']; E=json.load(open(S+f'rashi_en_{b}.json'))['text']
    T=json.load(open(S+f'torah_{b}.json'))['text']; O=json.load(open(S+'otzar.json'))['text']['Tanakh'][b]
    return R,E,T,O
def parse_entry(e):
    m=re.match(r'\s*(\d+[א-ת]?)\s*/\s*\((\S+?) ([^,]+),([^)]+)\)\s*/\s*<b>(.*?)</b><br>(.*?)\s*/\s*(.*?)\s*/\s*<b>(.*?)</b><br><small>(.*?)</small>',e,re.S)
    if not m: return None
    no,bk,ch,vs,hw,let,of,mean,note=m.groups()
    swapped=False
    if re.search('[א-ת]',of) and re.search('[a-z]',mean): of,mean=mean,of; swapped=True
    if re.search('[a-z]',let) and re.search('[א-ת]',of): let,of=of,let; swapped=True
    return dict(no=no,c=gem(ch),v=gem(vs),hw=hw.strip(),cl=let.strip(),of=of.strip(),he=mean.strip(),cn=re.sub(r'<[^>]+>','',note).strip(),swapped=swapped,raw=e)
def build(b):
    R,E,T,O=load(b); recs=[]; byv={}
    for oi,e in enumerate(O):
        p=parse_entry(e)
        if not p: print('UNPARSED',e[:80],file=sys.stderr); continue
        p['oi']=oi
        if (b,p['no']) in VERSE_FIX: p['c'],p['v']=VERSE_FIX[(b,p['no'])]
        byv.setdefault((p['c'],p['v']),[]).append(p)
    for (c,v),ents in byv.items():
        try: comments=R[c-1][v-1]
        except IndexError: comments=[]
        try: ens=E[c-1][v-1]
        except IndexError: ens=[]
        marks=[]  # (comment index, printed word)
        for k,cm in enumerate(comments):
            for w in print_words(split_dh(cm)[1]): marks.append((k,w))
        for i,p in enumerate(ents):
            k=None; pw=None; how=''
            if len(marks)==len(ents): k,pw=marks[i]; how='order'
            else:
                # match by letters overlap between Catane's spelling and a printed word
                cl=p['cl'].replace('"','')
                best=(0,None)
                for (kk,w) in marks:
                    ww=(w or '').replace('"','')
                    sc=len(set(cl)&set(ww))/max(1,len(set(cl)|set(ww)))
                    if sc>best[0]: best=(sc,(kk,w))
                if best[1] and best[0]>=0.5: k,pw=best[1]; how='letters'
                else:
                    hw=strip(p['hw']).strip('()[] ')
                    for kk,cm in enumerate(comments):
                        if hw and hw.split()[0] in strip(cm): k=kk; how='headword'; break
            p.update(pasuk=clean_verse(T[c-1][v-1]) if c-1<len(T) and v-1<len(T[c-1]) else '')
            if k is None:
                # wider search: any quoted token in any comment on the verse that resembles Catane's spelling
                cl=p['cl'].replace('"',''); best=(0,None)
                for kk,cm in enumerate(comments):
                    for w in strip(split_dh(cm)[1]).replace('״','"').split():
                        w=w.strip('.,:;()')
                        if '"' in w:
                            ww=w.replace('"',''); sc=len(set(cl)&set(ww))/max(1,len(set(cl)|set(ww)))
                            if sc>best[0]: best=(sc,(kk,w))
                if best[1] and best[0]>=0.6: k,pw=best[1]; how='wide'
            if k is None:
                hws=[w.strip('()[]') for w in strip(p['hw']).replace('דה"מ','').split()]
                hws=[w[1:] if w.startswith('ה') and len(w)>3 else w for w in hws if len(w)>=2]
                for kk,cm in enumerate(comments):
                    if hws and all(w in strip(cm) for w in hws[:2]): k=kk; how='headword2'; break
            if k is None and comments:
                bodies=[split_dh(cm) for cm in comments]
                p.update(dh='',rashi='\n'.join((d+'. ' if d else '')+b for d,b in bodies),tr='\n'.join(re.sub(r'<[^>]+>','',x).strip() for x in ens),seg=None,pw=None,how='allverse')
            elif k is None:
                p.update(dh='',rashi='',tr='',seg=None,pw=None,how='none',ncomments=len(comments))
            else:
                dh,body=split_dh(comments[k])
                tr=re.sub(r'<[^>]+>','',ens[k]).strip() if k<len(ens) else ''
                p.update(dh=dh,rashi=body,tr=tr,seg=k+1,pw=pw,how=how)
            recs.append(p)
    recs.sort(key=lambda p:(p['c'],p['v'],p['oi'])); return recs
if __name__=='__main__':
    b=sys.argv[1]; recs=build(b); json.dump(recs,open(f'{b}.records.json','w'),ensure_ascii=False,indent=0)
    for p in recs:
        print(f"{p['no']}\t{p['c']}:{p['v']}\t{p['hw']}\t{p['cl']}\t{p['of']}\t{p['he']}\t|{p['pw']}|{p['how']}{' SWAP' if p['swapped'] else ''}")
