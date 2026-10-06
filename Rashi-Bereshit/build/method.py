# Collect Rashi comments on Chumash where he speaks about his own method. Verbatim text only; nothing is written here.
# Second pass 2026-10-06: wider than plain-sense-against-midrash. Kinds are found by Rashi's own wording; false hits are listed in DROP after review.
import json,re,sys
from extract import strip,split_dh,S,BOOKS
from build import PAR,parasha
KINDS=[  # (tag, pattern) in priority order
 ("Method stated",re.compile(r'ישובו של מקרא|ישוב פשוטו|מישבת|מישב|מיושב|מתישב|מתיישב|על אפניו|על אופניו|לא באתי אלא|איני בא אלא|צחצוח פשוטו')),
 ("Says he does not know",re.compile(r'לא ידעתי|איני יודע|לא נודע לי|לא שמעתי ולא מצאתי')),
 ("His own reading",re.compile(r'ואני אומר|(?<![א-ת])אומר אני|ואומר אני|נראה בעיני|ולי נראה|ונראה לי|ולבי אומר|ואני מפרש|לכך אני אומר')),
 ("Names his source",re.compile(r'משה הדרשן|יסודו של|(?<![א-ת])ו?מצאתי ב|כך מצאתי|זו מצאתי|ראיתי ב|שמעתי מ|מפי אחרים שמעתי|ומ"א שמעתי|שמעתי בפרשה|שמעתי שאותו|רבי מכיר')),
 ("Other interpreters",re.compile(r'יש מפרשים|יש פותרים|והפותרים')),
 ("Plain sense beside midrash",None),
 ("Midrash after the plain reading",re.compile(r'.{25,}(ומדרשו|ומדרש אגדה|ומ"א|ורבותינו דרשו|ורבותינו פרשו|ורבותינו אמרו|ואגדה|ומדרש רבותינו|ובמדרש)')),
 ("Plain sense named",re.compile(r'פשוטו|פשוטן|פשוטה של')),
]
P=re.compile(r'פשוטו|פשוטה|פשוטן|כמשמעו|כמשמעה')
A=re.compile(r'אגדה|מדרש|רבותינו דרשו|דרשו רבותינו|ורבותינו|דרשני|דרשוהו רבותינו')
CL=re.compile('|'.join(p.pattern for t,p in KINDS[:5])+r'|פשוטו|פשוטה|פשוטן|כמשמעו|כמשמעה|ומדרשו|ומדרש אגדה|ומ"א|ורבותינו דרשו|ורבותינו פרשו|ורבותינו אמרו|ואגדה|ומדרש רבותינו|ובמדרש')
def D(b,s): return {(b,)+tuple(int(x) for x in r.split(':')) for r in s.split()}
# False hits found by reading every candidate: the trigger words are inside a quoted verse, a speaker's words, or a halachic derivation ("איני יודע ... תלמוד לומר").
DROP=set().union(
 D('Genesis','18:12:2 34:3:1 21:9:1 43:11:1 10:21:2 27:2:1 28:9:1 37:24:1 43:30:1 37:27:1 42:1:1 49:3:2'),
 D('Exodus','1:12:2 33:21:1 18:7:2 21:28:2 22:23:1 32:24:2 6:5:1 19:9:4 20:8:1 32:34:3 33:13:1 33:13:2 38:22:1'),
 D('Leviticus','26:32:1 13:55:3 25:43:1 16:10:1 23:30:1 25:9:2 10:20:1'),
 D('Numbers','33:53:1 26:54:1 5:9:1 13:23:2 22:34:1 30:6:1 31:17:2 22:32:1 14:27:3 24:21:1 19:22:4 19:22:5 19:22:6 19:22:7 19:22:8 19:22:9 19:22:10 19:22:11 19:22:12'),
 D('Deuteronomy','1:13:4 1:14:1 1:15:2 3:24:4'))
def tags(t):
    out=[]
    for tag,p in KINDS:
        hit=(bool(P.search(t)) and bool(A.search(t))) if p is None else bool(p.search(t))
        if hit: out.append(tag)
    if "Plain sense beside midrash" in out or "Midrash after the plain reading" in out:
        out=[x for x in out if x!="Plain sense named"]
    if "Plain sense beside midrash" in out: out=[x for x in out if x!="Midrash after the plain reading"]
    return out
def clauses(body):
    parts=re.split(r'(?<=[.;:?])\s+',body)
    keep=[pt for pt in parts if CL.search(strip(pt))]
    return ' … '.join(keep) if keep else parts[0]
def first_plus(body,tg):
    ex=clauses(body)
    if tg[0]=="Midrash after the plain reading":
        first=re.split(r'(?<=[.;:?])\s+',body)[0]
        if not ex.startswith(first): ex=first+' … '+ex
    return ex
def collect():
    out=[]
    for b in BOOKS:
        R=json.load(open(S+f'rashi_he_{b}.json'))['text']; E=json.load(open(S+f'rashi_en_{b}.json'))['text']
        for ci,ch in enumerate(R):
            for vi,v in enumerate(ch):
                for k,c in enumerate(v):
                    if (b,ci+1,vi+1,k+1) in DROP: continue
                    dh,body=split_dh(c); tg=tags(strip(body))
                    if not tg: continue
                    try: tr=re.sub('<[^>]+>','',E[ci][vi][k]).strip()
                    except Exception: tr=''
                    p=parasha(b,ci+1,vi+1)
                    out.append(dict(id=f"m{b[:3]}{ci+1}_{vi+1}_{k+1}",book=b,ref=f"{ci+1}:{vi+1}",seg=k+1,par=p[0],parHe=p[1],dh=dh,ex=first_plus(body,tg),rashi=body,tr=tr,tag=tg[0],tags=tg))
    return out
if __name__=='__main__':
    o=collect()
    from collections import Counter
    if len(sys.argv)>1:
        for x in o:
            if x['tag'] in sys.argv[1:]: print(x['book'][:3],x['ref'],x['seg'],'|',strip(x['ex'])[:130])
    else:
        open('../rashi-method.js','w',encoding='utf-8').write("/* Where Rashi speaks about his own method. Hebrew verbatim from the Rosenbaum and Silbermann edition; ex = the clauses that carry the statement, cut from the same text. */\nwindow.RASHI_METHOD="+json.dumps(o,ensure_ascii=False,indent=1)+";\n")
    print(len(o),dict(Counter(x['book'] for x in o))); print(dict(Counter(x['tag'] for x in o)))
    for b in BOOKS: print(b,dict(Counter(x['tag'] for x in o if x['book']==b)))
