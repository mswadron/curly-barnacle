(function(){
const Q="q",I="i",N="n";
const {SL,TOGGLES,PRESETS,ED}=window.DINAH_DATA;
const state={wed:7,gap:9,pause:0,overlap:"strict",stay:1.5,levi:13,yosef:14,dinah:7,order:"seq"};
let LANG="he";
try{const l=localStorage.getItem("tw-lang");if(l==="he"||l==="en")LANG=l;}catch(e){}
const $=id=>document.getElementById(id);
const L=(he,en)=>LANG==="he"?he:en;
const E=(o,k)=>LANG==="en"&&o.en&&o.en[k]!=null?o.en[k]:o[k];
const FR={0:"",0.25:"¼",0.5:"½",0.75:"¾"};

function age0(v){const q=Math.round(v*4)/4;if(Math.abs(q-v)>1e-6){const y=Math.floor(v),m=Math.round((v-y)*12);return L(y+" ו־"+m+" ח׳",y+" yrs "+m+" mo");}const w=Math.floor(q+1e-9),f=+(q-w).toFixed(2);return (w||!f?w:"")+FR[f];}
function age(v){const s=age0(v);return /ח׳|mo/.test(s)||LANG==="en"?s:"⁦"+s+"⁩";}
function fmt(s,v){
 if(s.unit==="m")return L(v+" חודשים",v+" months");
 if(s.id==="pause"&&v===0)return L("בלי הפסקה","No pause");
 if(s.id==="wed")return v===0?L("בתחילת העבודה","At the start of the work"):L("שנה ","Year ")+age(v);
 if(s.unit==="y")return s.id==="yosef"?L("שנה ","Year ")+age(v):(v===0?L("מיד","Right away"):age(v)+L(" שנים"," years"));
 return L("בן/בת ","Age ")+age(v);
}
function matches(o,v,step){return o.lo!=null?(v>=o.lo-1e-9&&v<=o.hi+1e-9):Math.abs(o.v-v)<step/2+1e-9;}
function chip(t){return t===Q?`<span class="chip q">${L("ציטוט","Quote")}</span>`:t===I?`<span class="chip i">${L("היסק","Inference")}</span>`:`<span class="chip n">${L("אין מקור","No source")}</span>`;}
const aiChip=()=>`<span class="chip ai">${L("הסבר","Explanation")}</span>`;
function refLink(o){const r=E(o,"ref");return o.url?`<a class="ref" href="${o.url}" target="_blank" rel="noopener">${r} ↗</a>`:`<span class="ref">${r}</span>`;}
function srcBlock(o){
 if(!o.src)return "";
 let s=`<div class="src" dir="rtl" lang="he">${o.src}</div>`;
 if(LANG==="en"){
  s+=o.tr?`<div class="tr" dir="ltr" lang="en">${o.tr.en}<span class="tr-ed">${ED[o.tr.ed].en}</span></div>`
         :`<div class="tr none" dir="ltr">No published English translation found; Hebrew only.</div>`;
 }
 return s;
}
function why(w){if(!w)return "";const x=LANG==="en"&&w.en?w.en:w;
 return `<div class="why"><div class="why-h">${L("למה הדעות חלוקות","Why the opinions differ")} ${aiChip()}</div><p>${x.lead}</p><ul>${x.items.map(i=>`<li><b>${i[0]}:</b> ${i[1]}</li>`).join("")}</ul></div>`;}

function buildStatic(){
 const w=document.querySelector(".wrap");w.dir=L("rtl","ltr");w.lang=LANG;
 document.documentElement.lang=LANG;
 document.title=L("בת כמה היתה דינה","How Old Was Dinah?");
 $("h1").textContent=L("בת כמה היתה דינה במעשה שכם","How old was Dinah at Shechem?");
 $("intro").textContent=L("כל מחוון הוא חוליה אחת בחשבון. תחת כל מחוון רשומות הדעות, כל אחת עם לשון המקור. שבצו את המחוון על דעה; כשהמחוון עומד במקום שאין דעה שמחזיקה בו, יופיע על כך סימון.",
  "Each slider is one link in the calculation. Under each slider are the opinions, each with the source's own words. Set the slider on an opinion; when it stands where no opinion holds, the page says so. Source texts stay in Hebrew; a published English translation is shown under each one where it exists.");
 $("legend").innerHTML=`<span>${chip(Q)} ${L("לשון המקור","the source's own words")}</span><span>${chip(I)} ${L("נלמד מן המקור ואינו מפורש בו","drawn from the source, not stated in it")}</span><span>${chip(N)} ${L("לא נמצא מקור","no source found")}</span><span>${aiChip()} ${L("ניסוח שלנו, לא מן המקור","our wording, not from the source")}</span>`;
 $("presets").innerHTML=Object.keys(PRESETS).sort((a,b)=>["rashi","so","gur","ie","ralbag"].indexOf(a)-["rashi","so","gur","ie","ralbag"].indexOf(b)).map(k=>`<button type="button" data-p="${k}">${LANG==="en"?PRESETS[k].en.name:PRESETS[k].name}</button>`).join("");
 $("rulesH").textContent=L("טבלת החוליות","The links");
 $("foot").innerHTML=L(
  `<p>על פי המאמר של ר' יהושע וקסמן, <a href="https://scribalerror.substack.com/p/how-old-was-dinah-a-constraint-satisfaction" target="_blank" rel="noopener">How Old Was Dinah? A Constraint Satisfaction Problem, Explained</a>, תשרי תשפ"ז. שנים נמנות מבואו של יעקב לבית לבן; מעשה שכם בשנה 20 ועוד השהייה.</p><p>מהדורות: מקרא על פי המסורה; רש"י, מהדורת רוזנבאום־זילברמן; בראשית רבה, תורת אמת; סדר עולם, ורשה תרס"ד; גמרא מגילה, מהדורת דוידסון; מסכת סופרים, וילנא; גור אריה, מכון ירושלים; אבן עזרא וקרני אור, פיוטרקוב; רלב"ג, ונציה ש"ז; רבנו בחיי; סדר הדורות, ורשה.</p>`,
  `<p>Based on Joshua Waxman, <a href="https://scribalerror.substack.com/p/how-old-was-dinah-a-constraint-satisfaction" target="_blank" rel="noopener">How Old Was Dinah? A Constraint Satisfaction Problem, Explained</a> (Scribal Error, October 2026). Years are counted from Yaakov's arrival at Lavan's house; Shechem is year 20 plus the stay.</p><p>Hebrew editions: Mikra al pi haMesorah; Rashi, Rosenbaum-Silbermann; Bereishis Rabbah, Torat Emet; Seder Olam, Warsaw 1904; Gemara Megillah, Davidson; Maseches Soferim, Vilna; Gur Aryeh, Machon Yerushalayim; Ibn Ezra and Karnei Ohr, Piotrkow; Ralbag, Venice 1547; Rabbeinu Bachya; Seder HaDoros, Warsaw. English translations: ${Object.values(ED).map(e=>e.en).join("; ")}.</p>`);
 document.querySelectorAll(".lang button").forEach(b=>b.classList.toggle("on",b.dataset.lang===LANG));
}

function buildControls(){
 const host=$("controls");host.innerHTML="";
 SL.forEach(s=>{
  const sec=document.createElement("section");sec.className="card";sec.id="c-"+s.id;
  const pct=v=>((v-s.min)/(s.max-s.min)*100);
  let marks="";
  s.ops.forEach(o=>{
   if(o.lo!=null){const a=pct(o.lo),b=pct(Math.min(o.hi,s.max));marks+=`<div class="bandm ${o.t===I?"inf":""}" style="inset-inline-start:${a}%;width:${b-a}%"></div>`;}
   else marks+=`<div class="mark ${o.t===I?"inf":o.t===N?"none":""}" style="inset-inline-start:${pct(o.v)}%"><i></i></div>`;
  });
  const ticks=[];const n=s.unit==="m"?s.max-s.min:4;for(let k=0;k<=n;k++)ticks.push(s.min+(s.max-s.min)*k/n);
  sec.innerHTML=`
   <div class="ctl-head"><h3>${E(s,"title")}</h3><div class="ctl-val" id="${s.id}V"></div></div>
   <p class="ai-note">${aiChip()} ${E(s,"about")}</p>
   ${why(s.why)}
   ${s.same?`<div class="allsame">${E(s,"choices")}</div>`:`<p class="choices">${aiChip()} ${L("הבחירות האמיתיות","The real choices")}: <b>${E(s,"choices")}</b></p>`}
   <div class="slider">
    <div class="track">${s.id==="dinah"?'<div class="feas" id="feas"></div>':""}${marks}</div>
    <input id="${s.id}" type="range" min="${s.min}" max="${s.max}" step="${s.step}" aria-label="${E(s,"title")}">
    <div class="scale">${ticks.map(t=>`<span>${s.unit==="m"?t:age(t)}</span>`).join("")}</div>
   </div>
   <div class="warn" id="${s.id}W" hidden>${L("המקום הזה במחוון לא תואם אף דעה שנמצאה.","No opinion found holds this position on the slider.")}</div>
   <ul class="ops">${s.ops.map((o,i)=>`<li class="op" data-s="${s.id}" data-i="${i}" tabindex="0">
     <div class="who"><b>${E(o,"who")}</b><span class="v">${o.lo!=null?age(o.lo)+(o.hi>=s.max?L(" ומעלה"," and up"):L(" עד "," to ")+age(o.hi)):fmt(s,o.v)}</span>${chip(o.t)}${refLink(o)}</div>
     ${srcBlock(o)}
     ${E(o,"note")?`<p class="ai-note">${aiChip()} ${E(o,"note")}</p>`:""}
   </li>`).join("")}</ul>`;
  host.appendChild(sec);
  TOGGLES.filter(t=>t.after===s.id).forEach(t=>{
   const o=document.createElement("section");o.className="card";
   o.innerHTML=`<div class="ctl-head"><h3>${E(t,"title")}</h3></div>
    ${why(t.why)}
    <p class="choices">${aiChip()} ${L("הבחירות האמיתיות","The real choices")}: <b>${E(t,"choices")}</b></p>
    <div class="seg" role="group">${t.opts.map(x=>`<button type="button" data-k="${t.key}" data-o="${x.k}"><b>${E(x,"who")}</b><span class="ref">${refLink(x)} ${chip(x.t)}</span>${srcBlock(x)}${E(x,"note")?`<span class="ai-note">${aiChip()} ${E(x,"note")}</span>`:""}</button>`).join("")}</div>
    <p class="ai-note">${aiChip()} ${E(t,"note")}</p>`;
   host.appendChild(o);
  });
 });
 document.querySelectorAll(".op").forEach(li=>{
  const go=()=>{const s=SL.find(x=>x.id===li.dataset.s),o=s.ops[+li.dataset.i];
   state[s.id]=o.lo!=null?(s.id==="stay"?Math.max(o.lo,5):s.id==="pause"?o.lo:Math.round(((o.lo+Math.min(o.hi,o.lo+2))/2)*4)/4):o.v;render();};
  li.addEventListener("click",e=>{if(e.target.closest("a"))return;go();});
  li.addEventListener("keydown",e=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();go();}});
 });
 SL.forEach(s=>$(s.id).addEventListener("input",e=>{state[s.id]=parseFloat(e.target.value);render();}));
 document.querySelectorAll(".seg button").forEach(b=>b.addEventListener("click",e=>{if(e.target.closest("a"))return;state[b.dataset.k]=b.dataset.o;render();}));
 document.querySelectorAll(".presets button").forEach(b=>b.addEventListener("click",()=>{const q=PRESETS[b.dataset.p];["wed","gap","pause","overlap","stay","levi","yosef","order"].forEach(k=>state[k]=q[k]);render();}));
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
 const ov=p.overlap==="overlap";
 const rules=[
  [p.wed?L("חתונה בשנה "+age(p.wed)+", ואחריה הריון","Wedding in year "+age(p.wed)+", then a pregnancy"):L("חתונה בתחילת העבודה, ואחריה הריון","Wedding at the start of the work, then a pregnancy"),p.wed?L("בראשית כט כ כא","Bereishis 29:20-21"):L("רלב\"ג כט א","Ralbag 29:1"),L("ראובן בשנה ","Reuven in year ")+age(b.Reuven),true],
  [L("ראובן, שמעון, לוי, יהודה זה אחר זה","Reuven, Shimon, Levi, Yehuda one after another"),L("בראשית כט לב לה","Bereishis 29:32-35"),L("כל אחד "+p.gap+" חודשים אחרי הקודם","each "+p.gap+" months after the last"),true],
  [L("בני זלפה אחרי \"ותעמוד מלדת\"","Zilpah's sons after Leah stopped bearing"),L("בראשית כט לה; ל ט","Bereishis 29:35; 30:9"),L("גד אחרי יהודה","Gad after Yehuda"),true],
  [L("הפסקה אחרי יהודה (\"ותעמוד מלדת\")","Pause after Yehuda"),L("בראשית כט לה","Bereishis 29:35"),p.pause?age(p.pause)+L(" שנים"," years"):L("בלי הפסקה","no pause"),true],
  [ov?L("יששכר בלי להמתין לבני זלפה","Yissachar without waiting for Zilpah's sons"):L("יששכר אחרי הדודאים, לא לפני אשר","Yissachar after the dudaim, not before Asher"),ov?L("אבן עזרא ל כג","Ibn Ezra 30:23"):L("בראשית ל ט; ל יד","Bereishis 30:9; 30:14"),L("יששכר בשנה ","Yissachar in year ")+age(b.Yissachar),true],
  [seq?L("זבולון, ואחר כך דינה","Zevulun, then Dinah"):L("דינה בלי סדר","Dinah not placed in the order"),seq?L("בראשית ל יט כא","Bereishis 30:19-21"):L("אבן עזרא ל כג","Ibn Ezra 30:23"),L("דינה נולדה לכל המוקדם בשנה ","Dinah born in year ")+age(b.Dinah)+L(""," at the earliest"),true],
  [seq?L("דינה לפני יוסף","Dinah before Yosef"):L("דינה בתוך עשרים השנים","Dinah within the twenty years"),seq?L("בראשית ל כא כה","Bereishis 30:21-25"):L("בראשית לא מא","Bereishis 31:41"),L("שנה ","year ")+age(b.Dinah)+L(" עד "," to ")+age(birthLast),okOrder],
  [L("לוי לפחות בן ","Levi at least ")+age(p.levi),L("בראשית לד כה; ב\"ר פ י","Bereishis 34:25; Bereishis Rabbah 80:10"),L("לוי בן ","Levi is ")+age(leviAge),okLevi],
  [L("דינה בת ","Dinah aged ")+age(p.dinah),"",okOrder?L("מותר: ","allowed: ")+age(Math.max(0,dLo))+L(" עד "," to ")+age(dHi):L("אין טווח","no range"),okD]
 ];
 return {b,sh,leviAge,dLo:Math.max(0,dLo),dHi,okOrder,okLevi,okD,rules,feasible:okOrder&&okLevi};
}

function chart(p,r){
 const W=720,H=300,T=26,B=40,rtl=LANG==="he";
 const NW=110,PAD=30;
 const end=Math.max(22,r.sh+1),x0=p.wed<6?-0.5:6;
 const a=rtl?W-NW:NW,z=rtl?PAD:W-PAD;
 const x=v=>a+(v-x0)/(end-x0)*(z-a);
 const rows=[["Reuven","ראובן","--leah"],["Shimon","שמעון","--leah"],["Levi","לוי","--levi"],["Yehuda","יהודה","--leah"],["Gad","גד","--zilpah"],["Asher","אשר","--zilpah"],["Yissachar","יששכר","--leah"],["Zevulun","זבולון","--leah"],["Dinah","דינה","--dinah"]];
 const rh=(H-T-B)/rows.length;
 let s=`<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${L("ציר לידות","Birth timeline")}">`;
 for(let t=Math.max(0,Math.ceil(x0));t<=end;t+=2)s+=`<line x1="${x(t)}" x2="${x(t)}" y1="${T-6}" y2="${H-B}" stroke="var(--rule)"/><text x="${x(t)}" y="${H-B+18}" font-size="11" text-anchor="middle" fill="var(--muted)">${t}</text>`;
 s+=`<text x="${(a+z)/2}" y="${H-4}" font-size="11" text-anchor="middle" fill="var(--muted)">${L("שנים מבואו של יעקב לבית לבן","Years since Yaakov arrived at Lavan's house")}</text>`;
 const mark=(v,lab,col)=>`<line x1="${x(v)}" x2="${x(v)}" y1="${T-10}" y2="${H-B}" stroke="var(${col})" stroke-width="2" stroke-dasharray="4 3"/><text x="${x(v)}" y="${T-13}" font-size="11" text-anchor="middle" fill="var(${col})" font-weight="600">${lab}</text>`;
 s+=mark(p.wed,L("חתונה","wedding"),"--muted")+mark(p.yosef,L("יוסף","Yosef"),"--muted")+mark(20,L("יציאה","leave"),"--muted")+mark(r.sh,L("שכם","Shechem"),r.feasible&&r.okD?"--ok":"--bad");
 rows.forEach(([k,he,c],i)=>{
  const y=T+i*rh+rh/2,bx=x(r.b[k]);
  s+=rtl?`<text x="${W-NW+12}" y="${y+4}" font-size="13" text-anchor="start" fill="var(--ink)" direction="rtl">${he}</text>`
        :`<text x="${NW-12}" y="${y+4}" font-size="13" text-anchor="end" fill="var(--ink)">${k}</text>`;
  s+=`<line x1="${bx}" x2="${x(r.sh)}" y1="${y}" y2="${y}" stroke="var(${c})" stroke-opacity=".35" stroke-width="6" stroke-linecap="round"/><circle cx="${bx}" cy="${y}" r="5" fill="var(${c})"/>`;
  if(k==="Levi"||k==="Dinah")s+=`<text x="${x(r.sh)+(rtl?-6:6)}" y="${y+4}" font-size="11" text-anchor="${rtl?"end":"start"}" fill="var(${c})">${age(r.sh-r.b[k])}</text>`;
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
 if(r.okOrder&&r.dHi>=ds.min){f.hidden=false;f.style.insetInlineStart=pct(r.dLo)+"%";f.style.width=(pct(r.dHi)-pct(r.dLo))+"%";}else f.hidden=true;
 const v=$("verdict");
 const range=r.okOrder?(Math.abs(r.dHi-r.dLo)<1e-6?age(r.dHi):age(r.dLo)+L(" עד "," to ")+age(r.dHi)):L("אין","none");
 if(r.feasible){
  v.className="verdict ok";
  v.innerHTML=`<div class="head">${L("דינה היתה בת ","Dinah was ")}${range}</div>
   <p>${r.okD?L("הגיל שבחרת ("+age(state.dinah)+") מתיישב עם שאר הבחירות.","The age you chose ("+age(state.dinah)+") fits the other choices."):L("הגיל שבחרת ("+age(state.dinah)+") לא מתיישב עם שאר הבחירות.","The age you chose ("+age(state.dinah)+") does not fit the other choices.")}</p>
   <div class="stats"><div class="stat"><span>${L("לוי במעשה שכם","Levi at Shechem")}</span><b>${age(r.leviAge)}</b></div>
   <div class="stat"><span>${L("מעשה שכם, שנה","Shechem, year")}</span><b>${age(r.sh)}</b></div>
   <div class="stat"><span>${L("לידת דינה, לכל המוקדם","Dinah's birth, earliest")}</span><b>${L("שנה ","year ")}${age(r.b.Dinah)}</b></div></div>`;
 }else{
  v.className="verdict bad";
  const br=r.rules.slice(0,-1).filter(x=>!x[3]).map(x=>x[0]+" ("+x[2]+")");
  v.innerHTML=`<div class="head">${L("אין פתרון","No solution")}</div><p>${L("החוליות האלה לא יכולות להתקיים יחד. נשבר: ","These links cannot all hold together. Broken: ")}${br.join("; ")}.</p>`;
 }
 $("chart").innerHTML=chart(state,r);
 $("rules").innerHTML=`<thead><tr><th>${L("חוליה","Link")}</th><th>${L("מקור","Source")}</th><th>${L("ערך","Value")}</th><th></th></tr></thead><tbody>`+r.rules.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td class="num">${x[2]}</td><td class="st ${x[3]?"y":"n"}">${x[3]?"✓":"✗"}</td></tr>`).join("")+"</tbody>";
 let pn="";
 document.querySelectorAll(".presets button").forEach(b=>{const q=PRESETS[b.dataset.p];const on=["wed","gap","pause","overlap","stay","levi","yosef","order"].every(k=>q[k]===state[k]);b.setAttribute("aria-pressed",on?"true":"false");if(on)pn=LANG==="en"?q.en.note:q.note;});
 $("presetNote").innerHTML=pn?aiChip()+" "+pn:"";
}

function build(){buildStatic();buildControls();render();}
document.querySelectorAll(".lang button").forEach(b=>b.addEventListener("click",()=>{if(LANG===b.dataset.lang)return;LANG=b.dataset.lang;try{localStorage.setItem("tw-lang",LANG);}catch(e){}build();}));
["wed","gap","pause","overlap","stay","levi","yosef","order"].forEach(k=>state[k]=PRESETS.rashi[k]);
build();
})();
