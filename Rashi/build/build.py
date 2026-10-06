# Join Catane records with study notes and write laaz-<Book>.js for the page.
import json,sys,importlib,subprocess
from spanish import SP,NOTE
from own import OWN
from leipzig import LZ
PAR={
'Genesis':[("Bereshit","בראשית",1,1),("Noach","נח",6,9),("Lech Lecha","לך לך",12,1),("Vayera","וירא",18,1),("Chayei Sarah","חיי שרה",23,1),("Toldot","תולדות",25,19),("Vayetze","ויצא",28,10),("Vayishlach","וישלח",32,4),("Vayeshev","וישב",37,1),("Miketz","מקץ",41,1),("Vayigash","ויגש",44,18),("Vayechi","ויחי",47,28)],
'Exodus':[("Shemot","שמות",1,1),("Vaera","וארא",6,2),("Bo","בא",10,1),("Beshalach","בשלח",13,17),("Yitro","יתרו",18,1),("Mishpatim","משפטים",21,1),("Terumah","תרומה",25,1),("Tetzaveh","תצוה",27,20),("Ki Tisa","כי תשא",30,11),("Vayakhel","ויקהל",35,1),("Pekudei","פקודי",38,21)],
'Leviticus':[("Vayikra","ויקרא",1,1),("Tzav","צו",6,1),("Shemini","שמיני",9,1),("Tazria","תזריע",12,1),("Metzora","מצורע",14,1),("Acharei Mot","אחרי מות",16,1),("Kedoshim","קדושים",19,1),("Emor","אמור",21,1),("Behar","בהר",25,1),("Bechukotai","בחקתי",26,3)],
'Numbers':[("Bamidbar","במדבר",1,1),("Naso","נשא",4,21),("Behaalotcha","בהעלתך",8,1),("Shelach","שלח",13,1),("Korach","קרח",16,1),("Chukat","חקת",19,1),("Balak","בלק",22,2),("Pinchas","פינחס",25,10),("Matot","מטות",30,2),("Masei","מסעי",33,1)],
'Deuteronomy':[("Devarim","דברים",1,1),("Vaetchanan","ואתחנן",3,23),("Ekev","עקב",7,12),("Re'eh","ראה",11,26),("Shoftim","שופטים",16,18),("Ki Tetze","כי תצא",21,10),("Ki Tavo","כי תבוא",26,1),("Nitzavim","נצבים",29,9),("Vayelech","וילך",31,1),("Haazinu","האזינו",32,1),("Vezot Haberachah","וזאת הברכה",33,1)]}
def parasha(b,c,v):
    cur=PAR[b][0]
    for p in PAR[b]:
        if (c,v)>=(p[2],p[3]): cur=p
    return cur
def main(b):
    subprocess.run([sys.executable,'extract.py',b],stdout=subprocess.DEVNULL,check=True)
    recs=json.load(open(f'{b}.records.json')); N={str(k):v for k,v in importlib.import_module(f'notes_{b}').N.items()}
    missing=[r['no'] for r in recs if r['no'] not in N]; extra=[k for k in N if k not in {r['no'] for r in recs}]
    assert not missing and not extra,(missing,extra)
    SPB={str(k):v for k,v in SP.get(b,{}).items()}
    bad=[k for k in SPB if k not in {r['no'] for r in recs}]; assert not bad,bad
    out=[]
    for r in recs:
        n=N[r['no']]; p=parasha(b,r['c'],r['v'])
        out.append(dict(id=f"{b[:3]}{r['no']}",no=r['no'],book=b,ref=f"{r['c']}:{r['v']}",par=p[0],parHe=p[1],hw=r['hw'],laaz=r['cl'],gloss=r['of'],he=r['he'],cn=r['cn'],
          pw=r['pw'],dh=r['dh'],rashi=r['rashi'],seg=r['seg'],tr=r['tr'],pasuk=r['pasuk'],en=n['en'],modern=n.get('mod',''),sim=[dict(w=w,lang=l) for w,l in n.get('sim',[])],travel=n.get('tv',''),es=[dict(w=x.split('=')[0].strip(),g=x.split('=')[1].strip()) for x in SPB.get(r['no'],'').split(';') if '=' in x],esNote=NOTE.get((b,r['no']),''),lz={str(k):v for k,v in LZ.get(b,{}).items()}.get(r['no'],''),ownKind=OWN.get((b,r['no']),('',''))[0],own=OWN.get((b,r['no']),('',''))[1]))
    js="/* La'az entries for %s. Hebrew fields are verbatim: verse (Miqra according to the Masorah), Rashi (Rosenbaum and Silbermann edition),\n   and Catane, Otzar La'azei Rashi, Jerusalem 1988 (hw, laaz, gloss, he, cn). Fields en, modern, sim, travel, es, esNote are AI study notes; own is this guide's own argued reading. */\n(window.RASHI_LAAZ=window.RASHI_LAAZ||{})[%s]=%s;\n"%(b,json.dumps(b),json.dumps(out,ensure_ascii=False,indent=1))
    open(f'../laaz-{b}.js','w',encoding='utf-8').write(js)
    print(b,len(out),'entries;','no Rashi segment matched:',[r['no'] for r in recs if r['seg'] is None],'; no printed word:',len([r for r in recs if not r['pw']]))

if __name__=='__main__': main(sys.argv[1])
