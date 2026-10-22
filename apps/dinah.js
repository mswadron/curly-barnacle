(function(){
const Q="q",I="i",N="n";
const {SL,TOGGLES,PRESETS}=window.DINAH_DATA;
const state={wed:7,gap:9,pause:0,overlap:"strict",stay:1.5,levi:13,yosef:14,dinah:7,order:"seq"};
const $=id=>document.getElementById(id);
const FR={0:"",0.25:"¼",0.5:"½",0.75:"¾"};
function age0(v){const q=Math.round(v*4)/4;if(Math.abs(q-v)>1e-6){const y=Math.floor(v),m=Math.round((v-y)*12);return y+" ו־"+m+" ח׳";}const w=Math.floor(q+1e-9),f=+(q-w).toFixed(2);return (w||!f?w:"")+FR[f];}
function age(v){const s=age0(v);return /ח׳/.test(s)?s:"⁦"+s+"⁩";}
function fmt(s,v){if(s.unit==="m")return v+" חודשים";if(s.id==="pause"&&v===0)return "בלי הפסקה";if(s.id==="wed")return v===0?"בתחילת העבודה":"שנה "+age(v);if(s.unit==="y"){return s.id==="yosef"?"שנה "+age(v):(v===0?"מיד":age(v)+" שנים");}return "בן/בת "+age(v);}
function matches(o,v,step){return o.lo!=null?(v>=o.lo-1e-9&&v<=o.hi+1e-9):Math.abs(o.v-v)<step/2+1e-9;}
function chip(t){return t===Q?'<span class="chip q">ציטוט</span>':t===I?'<span class="chip i">היסק</span>':'<span class="chip n">אין מקור</span>';}

function buildControls(){
 const host=$("controls");
 SL.forEach(s=>{
  const sec=document.createElement("section");sec.className="card";sec.id="c-"+s.id;
  const pct=v=>((v-s.min)/(s.max-s.min)*100);
  let marks="";
  s.ops.forEach(o=>{
   if(o.lo!=null){const a=pct(o.lo),b=pct(Math.min(o.hi,s.max));marks+=`<div class="bandm ${o.t===I?"inf":""}" style="right:${a}%;width:${b-a}%"></div>`;}
   else marks+=`<div class="mark ${o.t===I?"inf":o.t===N?"none":""}" style="right:${pct(o.v)}%"><i></i></div>`;
  });
  const ticks=[];const n=s.unit==="m"?s.max-s.min:4;for(let k=0;k<=n;k++)ticks.push(s.min+(s.max-s.min)*k/n);
  sec.innerHTML=`
   <div class="ctl-head"><h3>${s.title}</h3><div class="ctl-val" id="${s.id}V"></div></div>
   <p class="ai-note"><span class="chip ai">הסבר</span> ${s.about}</p>
   ${s.same?`<div class="allsame">${s.choices}</div>`:`<p class="choices"><span class="chip ai">הסבר</span> הבחירות האמיתיות: <b>${s.choices}</b></p>`}
   <div class="slider">
    <div class="track">${s.id==="dinah"?'<div class="feas" id="feas"></div>':""}${marks}</div>
    <input id="${s.id}" type="range" min="${s.min}" max="${s.max}" step="${s.step}" aria-label="${s.title}">
    <div class="scale">${ticks.map(t=>`<span>${s.unit==="m"?t:age(t)}</span>`).join("")}</div>
   </div>
   <div class="warn" id="${s.id}W" hidden>המקום הזה במחוון לא תואם אף דעה שנמצאה.</div>
   <ul class="ops">${s.ops.map((o,i)=>`<li class="op" data-s="${s.id}" data-i="${i}" tabindex="0">
     <div class="who"><b>${o.who}</b><span class="v">${o.lo!=null?age(o.lo)+(o.hi>=s.max?" ומעלה":" עד "+age(o.hi)):fmt(s,o.v)}</span>${chip(o.t)}${o.url?`<a class="ref" href="${o.url}" target="_blank" rel="noopener">${o.ref} ↗</a>`:`<span class="ref">${o.ref}</span>`}</div>
     ${o.src?`<div class="src">${o.src}</div>`:""}
     ${o.note?`<p class="ai-note"><span class="chip ai">הסבר</span> ${o.note}</p>`:""}
   </li>`).join("")}</ul>`;
  host.appendChild(sec);
  TOGGLES.filter(t=>t.after===s.id).forEach(t=>{
   const o=document.createElement("section");o.className="card";
   o.innerHTML=`<div class="ctl-head"><h3>${t.title}</h3></div>
    <p class="choices"><span class="chip ai">הסבר</span> הבחירות האמיתיות: <b>${t.choices}</b></p>
    <div class="seg" role="group">${t.opts.map(x=>`<button type="button" data-k="${t.key}" data-o="${x.k}"><b>${x.who}</b><span class="ref">${x.url?`<a class="ref" href="${x.url}" target="_blank" rel="noopener">${x.ref} ↗</a>`:x.ref} ${chip(x.t)}</span><span class="src">${x.src}</span>${x.note?`<span class="ai-note"><span class="chip ai">הסבר</span> ${x.note}</span>`:""}</button>`).join("")}</div>
    <p class="ai-note"><span class="chip ai">הסבר</span> ${t.note}</p>`;
   host.appendChild(o);
  });
 });
 document.querySelectorAll(".op").forEach(li=>{
  const go=()=>{const s=SL.find(x=>x.id===li.dataset.s),o=s.ops[+li.dataset.i];
   state[s.id]=o.lo!=null?(s.id==="stay"?Math.max(o.lo,5):s.id==="pause"?o.lo:Math.round(((o.lo+Math.min(o.hi,o.lo+2))/2)*4)/4):o.v;render();};
  li.addEventListener("click",go);li.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});
 });
 SL.forEach(s=>$(s.id).addEventListener("input",e=>{state[s.id]=parseFloat(e.target.value);render();}));
 document.querySelectorAll(".seg button").forEach(b=>b.addEventListener("click",e=>{if(e.target.closest("a"))return;state[b.dataset.k]=b.dataset.o;render();}));
 document.querySelectorAll(".presets button").forEach(b=>b.addEventListener("click",()=>{Object.assign(state,PRESETS[b.dataset.p]);delete state.note;render();}));
}

function solve(p){
 const g=p.gap/12,b={};
 b.Reuven=p.wed+g;b.Shimon=b.Reuven+g;b.Levi=b.Shimon+g;b.Yehuda=b.Levi+g;b.Gad=b.Yehuda+g;b.Asher=b.Gad+g;
 const yAfter=b.Yehuda+g+p.pause;b.Yissachar=p.overlap==="overlap"?yAfter:Math.max(b.Asher,yAfter);b.Zevulun=b.Yissachar+g;
 const seq=p.order==="seq";
 b.Dinah=seq?b.Zevulun+g:p.wed+g;
 const birthLast=seq?p.yosef:20;
 const sh=20+p.stay, leviAge=sh-b.Levi;
 const okOrder=b.Dinah<=birthLast+1e-9;
 const dLo=sh-birthLast, dHi=sh-b.Dinah;
 const okLevi=leviAge>=p.levi-1e-9;
 const okD=okOrder&&p.dinah>=dLo-1e-9&&p.dinah<=dHi+1e-9;
 const rules=[
  [p.wed?"חתונה בשנה "+age(p.wed)+", ואחריה הריון":"חתונה בתחילת העבודה, ואחריה הריון",p.wed?"בראשית כט כ כא":"רלב\"ג כט א","ראובן בשנה "+age(b.Reuven),true],
  ["ראובן, שמעון, לוי, יהודה זה אחר זה","בראשית כט לב לה","כל אחד "+p.gap+" חודשים אחרי הקודם",true],
  ["בני זלפה אחרי \"ותעמוד מלדת\"","בראשית כט לה; ל ט","גד אחרי יהודה",true],
  ["הפסקה אחרי יהודה (\"ותעמוד מלדת\")","בראשית כט לה",p.pause?age(p.pause)+" שנים":"בלי הפסקה",true],
  [p.overlap==="overlap"?"יששכר בלי להמתין לבני זלפה":"יששכר אחרי הדודאים, לא לפני אשר",p.overlap==="overlap"?"אבן עזרא ל כג":"בראשית ל ט; ל יד","יששכר בשנה "+age(b.Yissachar),true],
  [seq?"זבולון, ואחר כך דינה":"דינה בלי סדר",seq?"בראשית ל יט כא":"אבן עזרא ל כג","דינה נולדה לכל המוקדם בשנה "+age(b.Dinah),true],
  [seq?"דינה לפני יוסף":"דינה בתוך עשרים השנים",seq?"בראשית ל כא כה":"בראשית לא מא","שנה "+age(b.Dinah)+" עד "+age(birthLast),okOrder],
  ["לוי לפחות בן "+age(p.levi),"בראשית לד כה; ב\"ר פ י","לוי בן "+age(leviAge),okLevi],
  ["דינה בת "+age(p.dinah),"",okOrder?"מותר: "+age(Math.max(0,dLo))+" עד "+age(dHi):"אין טווח",okD]
 ];
 return {b,sh,leviAge,dLo:Math.max(0,dLo),dHi,okOrder,okLevi,okD,rules,feasible:okOrder&&okLevi};
}

function chart(p,r){
 const W=720,H=300,R=110,L=30,T=26,B=40;
 const end=Math.max(22,r.sh+1),x0=Math.min(6,Math.floor(p.wed)-1),x=v=>W-R-(v-x0)/(end-x0)*(W-R-L);
 const rows=[["Reuven","ראובן","--leah"],["Shimon","שמעון","--leah"],["Levi","לוי","--levi"],["Yehuda","יהודה","--leah"],["Gad","גד","--zilpah"],["Asher","אשר","--zilpah"],["Yissachar","יששכר","--leah"],["Zevulun","זבולון","--leah"],["Dinah","דינה","--dinah"]];
 const rh=(H-T-B)/rows.length;
 let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="ציר לידות">`;
 for(let t=Math.ceil(x0);t<=end;t+=2)s+=`<line x1="${x(t)}" x2="${x(t)}" y1="${T-6}" y2="${H-B}" stroke="var(--rule)"/><text x="${x(t)}" y="${H-B+18}" font-size="11" text-anchor="middle" fill="var(--muted)">${t}</text>`;
 s+=`<text x="${(W-R+L)/2}" y="${H-4}" font-size="11" text-anchor="middle" fill="var(--muted)">שנים מבואו של יעקב לבית לבן</text>`;
 const mark=(v,lab,col)=>`<line x1="${x(v)}" x2="${x(v)}" y1="${T-10}" y2="${H-B}" stroke="var(${col})" stroke-width="2" stroke-dasharray="4 3"/><text x="${x(v)}" y="${T-13}" font-size="11" text-anchor="middle" fill="var(${col})" font-weight="600">${lab}</text>`;
 s+=mark(p.wed,"חתונה","--muted")+mark(p.yosef,"יוסף","--muted")+mark(20,"יציאה","--muted")+mark(r.sh,"שכם",r.feasible&&r.okD?"--ok":"--bad");
 rows.forEach(([k,he,c],i)=>{
  const y=T+i*rh+rh/2,bx=x(r.b[k]);
  s+=`<text x="${W-R+12}" y="${y+4}" font-size="13" text-anchor="start" fill="var(--ink)" direction="rtl">${he}</text>`;
  s+=`<line x1="${bx}" x2="${x(r.sh)}" y1="${y}" y2="${y}" stroke="var(${c})" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/><circle cx="${bx}" cy="${y}" r="5" fill="var(${c})"/>`;
  if(k==="Levi"||k==="Dinah")s+=`<text x="${x(r.sh)-6}" y="${y+4}" font-size="11" text-anchor="end" fill="var(${c})">${age(r.sh-r.b[k])}</text>`;
 });
 return s+"</svg>";
}

function render(){
 SL.forEach(s=>{
  const v=state[s.id];$(s.id).value=v;$(s.id+"V").textContent=fmt(s,v);
  let any=false;
  document.querySelectorAll(`#c-${s.id} .op`).forEach(li=>{const on=matches(s.ops[+li.dataset.i],v,s.step);li.classList.toggle("on",on);any=any||on;});
  $(s.id+"W").hidden=any;
 });
 document.querySelectorAll(".seg button").forEach(b=>b.setAttribute("aria-pressed",b.dataset.o===state[b.dataset.k]?"true":"false"));
 const r=solve(state);
 const ds=SL.find(x=>x.id==="dinah"),pct=v=>((Math.min(Math.max(v,ds.min),ds.max)-ds.min)/(ds.max-ds.min)*100);
 const f=$("feas");
 if(r.okOrder&&r.dHi>=ds.min){f.hidden=false;f.style.right=pct(r.dLo)+"%";f.style.width=(pct(r.dHi)-pct(r.dLo))+"%";}else f.hidden=true;
 const v=$("verdict");
 const range=r.okOrder?(Math.abs(r.dHi-r.dLo)<1e-6?age(r.dHi):age(r.dLo)+" עד "+age(r.dHi)):"אין";
 if(r.feasible){
  v.className="verdict ok";
  v.innerHTML=`<div class="head">דינה היתה בת ${range}</div>
   <p>${r.okD?"הגיל שבחרת ("+age(state.dinah)+") מתיישב עם שאר הבחירות.":"הגיל שבחרת ("+age(state.dinah)+") לא מתיישב עם שאר הבחירות."}</p>
   <div class="stats"><div class="stat"><span>לוי במעשה שכם</span><b>${age(r.leviAge)}</b></div>
   <div class="stat"><span>מעשה שכם, שנה</span><b>${age(r.sh)}</b></div>
   <div class="stat"><span>לידת דינה, לכל המוקדם</span><b>שנה ${age(r.b.Dinah)}</b></div></div>`;
 }else{
  v.className="verdict bad";
  const br=r.rules.filter(x=>!x[3]&&!x[0].startsWith("דינה בת")).map(x=>x[0]+" ("+x[2]+")");
  v.innerHTML=`<div class="head">אין פתרון</div><p>החוליות האלה לא יכולות להתקיים יחד. נשבר: ${br.join("; ")}.</p>`;
 }
 $("chart").innerHTML=chart(state,r);
 $("rules").innerHTML="<thead><tr><th>חוליה</th><th>מקור</th><th>ערך</th><th></th></tr></thead><tbody>"+r.rules.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td class="num">${x[2]}</td><td class="st ${x[3]?"y":"n"}">${x[3]?"✓":"✗"}</td></tr>`).join("")+"</tbody>";
 let pn="";
 document.querySelectorAll(".presets button").forEach(b=>{const q=PRESETS[b.dataset.p];const on=["wed","gap","pause","overlap","stay","levi","yosef","order"].every(k=>q[k]===state[k]);b.setAttribute("aria-pressed",on?"true":"false");if(on)pn=q.note;});
 $("presetNote").innerHTML=pn?'<span class="chip ai">הסבר</span> '+pn:"";
}
buildControls();
Object.assign(state,PRESETS.rashi);state.dinah=7;render();
})();
