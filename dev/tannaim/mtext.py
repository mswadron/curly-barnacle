import json,glob,os,re,unicodedata
def strip(s):
  s=re.sub(r'<[^>]+>','',s)
  s=''.join(ch for ch in unicodedata.normalize('NFD',s) if not unicodedata.combining(ch))
  s=s.replace('־',' ').replace('־',' ')
  return re.sub(r'\s+',' ',s).strip()
def load():
  out={}
  for f in glob.glob('/home/claude/dl/mishnah/*.json'):
    d=json.load(open(f)); t=os.path.basename(f)[:-5].replace('Mishnah ','').replace(' ','_').replace("'",'')
    for ci,ch in enumerate(d['text']):
      for mi,m in enumerate(ch):
        out[(t,ci+1,mi+1)]=strip(m)
  return out
