import json,sys
log=sys.argv[1]; out=sys.argv[2]
uses={}; res={}
for line in open(log):
    try: e=json.loads(line)
    except: continue
    m=e.get('message') or {}
    c=m.get('content')
    if not isinstance(c,list): continue
    for b in c:
        if b.get('type')=='tool_use' and b.get('name','').endswith('get_text'):
            uses[b['id']]=b['input'].get('reference')
        if b.get('type')=='tool_result':
            cc=b.get('content')
            if isinstance(cc,list): cc=''.join(x.get('text','') for x in cc if isinstance(x,dict))
            res[b['tool_use_id']]=cc
got={}
for k,ref in uses.items():
    r=res.get(k)
    if not r or r.startswith('Error'): continue
    try:
        o=json.loads(r)
        if 'result' in o: o=json.loads(o['result'])
    except Exception as ex:
        continue
    v=o['versions'][0]
    got[ref]={'text':v['text'],'versionTitle':v['versionTitle'],'versionSource':v.get('versionSource')}
json.dump(got,open(out,'w'),ensure_ascii=False)
print(len(got)); print('\n'.join(sorted(got)))
