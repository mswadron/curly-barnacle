# Collect Rashi's grammar comments and Targum comments on the whole Chumash by his own wording. Verbatim text only.
import json,re
from collections import Counter
from extract import strip,split_dh,S,BOOKS
from build import parasha
from kinds2 import GRAMMAR,TARGUM,OWN,TG
def collect(KS,prefix,special=None):
    union=re.compile('|'.join(p.pattern for t,p in KS if p is not None))
    out=[]
    for b in BOOKS:
        R=json.load(open(S+f'rashi_he_{b}.json'))['text']; E=json.load(open(S+f'rashi_en_{b}.json'))['text']
        for ci,ch in enumerate(R):
            for vi,v in enumerate(ch):
                for k,c in enumerate(v):
                    dh,body=split_dh(c); t=strip(body); tg=[]
                    for tag,p in KS:
                        if (special(t) if p is None else p.search(t)): tg.append(tag)
                    if not tg: continue
                    parts=re.split(r'(?<=[.;:?])\s+',body)
                    keep=[pt for pt in parts if union.search(strip(pt))]
                    try: tr=re.sub('<[^>]+>','',E[ci][vi][k]).strip()
                    except Exception: tr=''
                    p=parasha(b,ci+1,vi+1)
                    out.append(dict(id=f"{prefix}{b[:3]}{ci+1}_{vi+1}_{k+1}",book=b,ref=f"{ci+1}:{vi+1}",seg=k+1,par=p[0],parHe=p[1],dh=dh,ex=' … '.join(keep) if keep else parts[0],rashi=body,tr=tr,tag=tg[0],tags=tg))
    return out
for name,var,KS,prefix,sp in (('grammar','RASHI_GRAMMAR',GRAMMAR,'g',None),('targum','RASHI_TARGUM',TARGUM,'t',lambda t: bool(TG.search(t) and OWN.search(t)))):
    o=collect(KS,prefix,sp)
    open(f'../rashi-{name}.js','w',encoding='utf-8').write(f"/* Rashi's {name} comments on the Chumash, found by his own wording. Hebrew verbatim from the Rosenbaum and Silbermann edition; ex = the clauses that carry the point, cut from the same text. */\nwindow.{var}="+json.dumps(o,ensure_ascii=False,indent=1)+";\n")
    print(name,len(o),dict(Counter(x['book'] for x in o)),dict(Counter(t for x in o for t in x['tags'])))
