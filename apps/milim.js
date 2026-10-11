(function(){
const D = window.TW;
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ---------- helpers ----------
const NW = D.W.length;
const wordVerse = new Int32Array(NW);
for (let v = 0; v < D.V.length; v++) {
  const end = v + 1 < D.V.length ? D.V[v+1][3] : NW;
  for (let i = D.V[v][3]; i < end; i++) wordVerse[i] = v;
}
const verseEnd = v => v + 1 < D.V.length ? D.V[v+1][3] : NW;
function gem(n){
  const o=['','א','ב','ג','ד','ה','ו','ז','ח','ט'], t=['','י','כ','ל','מ','נ','ס','ע','פ','צ'], h=['','ק','ר','ש','ת'];
  let s=''; if(n>=100){s+=h[Math.floor(n/100)]; n%=100;}
  if(n===15) return s+'טו'; if(n===16) return s+'טז';
  return s+t[Math.floor(n/10)]+o[n%10];
}
const refOfVerse = v => { const x=D.V[v]; return D.B[x[0]]+' '+gem(x[1])+':'+gem(x[2]); };
const refOfWord = wi => refOfVerse(wordVerse[wi]);
const parshaOfVerse = v => D.P.findIndex(p => v >= p[2] && v <= p[3]);
const NIQ = /[\u0591-\u05C7\u05BE]/g;
const FIN = {'ך':'כ','ם':'מ','ן':'נ','ף':'פ','ץ':'צ'};
const cons = s => s.replace(NIQ,'').replace(/[ךםןףץ]/g, c => FIN[c]).replace(/[^\u05D0-\u05EA]/g,'');
const relaxed = s => { const c = cons(s); return c.slice(0,1) + c.slice(1).replace(/[וי]/g,''); };
const X = i => ({k:D.X[i][0], v:D.X[i][1], g:D.X[i][2], sp:D.X[i][3], n:D.X[i][4], tn:D.X[i][5], lang:D.X[i][6]});
const M = i => { const a = D.M[i].split('|'); return {sp:a[0], vs:a[1], vt:a[2], ps:a[3], gn:a[4], nu:a[5], st:a[6], sfx:a[7]}; };
const MINOR = new Set(['conj','art','prep']);
function mainPart(wi){
  const parts = D.WP[wi];
  let best = null;
  for (const [li, mi] of parts) {
    if (MINOR.has(D.X[li][3]) && parts.length > 1) continue;
    if (!best || D.X[li][5] < D.X[best[0]][5]) best = [li, mi];
  }
  return best || parts[parts.length-1];
}

// ---------- labels ----------
const SP = {subs:'שם עצם',verb:'פועל',adjv:'שם תואר',advb:'תואר הפועל',nmpr:'שם פרטי',prps:'כינוי גוף',prde:'כינוי רומז',prin:'כינוי שאלה',intj:'מילת קריאה',nega:'מילת שלילה',inrg:'מילת שאלה',conj:'מילת חיבור',art:'ה"א הידיעה',prep:'מילת יחס'};
const VS = {qal:'קל',nif:'נפעל',piel:'פיעל',pual:'פֻּעַל',hif:'הפעיל',hof:'הֻפְעַל',hit:'התפעל',hsht:'השתפעל',hotp:'הותפעל',nit:'נתפעל',pasq:'קל סביל',peal:'פעל (ארמית)',peil:'פעיל (ארמית)',pael:'פעל דגוש (ארמית)',haf:'הפעל (ארמית)',afel:'אפעל (ארמית)',htpe:'התפעל (ארמית)',htpa:'התפעל דגוש (ארמית)'};
const VT = {perf:'עבר',wqtl:'ו + עבר',impf:'עתיד',wayq:'ו"ההיפוך',impv:'ציווי',infc:'מקור נטוי',infa:'מקור מוחלט',ptca:'בינוני פועל',ptcp:'בינוני פעול'};
const PGN = {p3msg:'הוא',p3fsg:'היא',p2msg:'אתה',p2fsg:'את',p1sg:'אני',p3mpl:'הם',p3fpl:'הן',p3pl:'הם / הן',p2mpl:'אתם',p2fpl:'אתן',p2pl:'אתם / אתן',p1pl:'אנחנו'};
const SFX = {p1sg:'אותי / שלי',p2msg:'אותך / שלך (ז)',p2fsg:'אותך / שלך (נ)',p3msg:'אותו / שלו',p3fsg:'אותה / שלה',p1pl:'אותנו / שלנו',p2mpl:'אתכם / שלכם',p2fpl:'אתכן / שלכן',p3mpl:'אותם / שלהם',p3fpl:'אותן / שלהן',p2sg:'אותך / שלך',p3sg:'שלו / שלה',p3pl:'אותם / שלהם',p2pl:'אתכם / שלכם'};
const GN = {m:'זכר',f:'נקבה'}, NU = {sg:'יחיד',pl:'רבים',du:'זוגי'}, ST = {a:'נפרד',c:'נסמך',e:'מיודע (ארמית)'};

const TENSE_EXPLAIN = {
  perf:'<b>עבר</b> מתאר פעולה שהושלמה. הגוף מסומן בסוף המילה: שָׁמַר (הוא), שָׁמַרְתָּ (אתה), שָׁמַרְתִּי (אני), שָׁמְרוּ (הם).',
  wqtl:'<b>ו + עבר</b> (וְקָטַל). בסיפור ובציווי בתורה ו׳ לפני פועל בעבר בדרך כלל הופכת אותו לעתיד או להמשך ציווי: וְשָׁמַרְתָּ = ותשמור. לא כל ו׳ לפני עבר היא ו׳ ההיפוך. הכלי מסמן כאן כל פועל בעבר שיש לפניו ו׳, ועל הלומד להכריע לפי ההקשר.',
  impf:'<b>עתיד</b> מתאר פעולה שתבוא, או פעולה חוזרת. הגוף מסומן בתחילת המילה באותיות אית"ן: אֶשְׁמֹר, תִּשְׁמֹר, יִשְׁמֹר, נִשְׁמֹר.',
  wayq:'<b>ו"ההיפוך</b> (וַיִּקְטֹל) היא צורת הסיפור הרגילה בתורה. ו׳ בפתח ודגש באות שאחריה (לפני א׳ בקמץ, בלי דגש) הופכים צורת עתיד לעבר: וַיֹּאמֶר = ואמר, וַיָּרָץ = ורץ.',
  impv:'<b>ציווי</b> הוא פקודה, ורק בגוף נוכח: שְׁמֹר, שִׁמְרִי, שִׁמְרוּ. לפעמים נוספת ה׳ בסוף (שָׁמְרָה) או "נא" אחריו.',
  infc:'<b>מקור נטוי</b> הוא שם הפעולה, ובדרך כלל בא עם אות שימוש (לִשְׁמֹר, בִּשְׁמֹר, כִּשְׁמֹר) או עם כינוי (שָׁמְרוֹ = השמירה שלו).',
  infa:'<b>מקור מוחלט</b> בא לרוב לפני פועל מאותו שורש כדי לחזק אותו: שָׁמוֹר תִּשְׁמְרוּן. לפעמים הוא בא במקום ציווי: זָכוֹר, שָׁמוֹר.',
  ptca:'<b>בינוני פועל</b> הוא מי שעושה את הפעולה, ומשמש גם כהווה: שֹׁמֵר, שֹׁמֶרֶת, שֹׁמְרִים. מתאים במין ובמספר.',
  ptcp:'<b>בינוני פעול</b> מתאר מה שהפעולה נעשתה בו, ובא בעיקר בבניין קל: שָׁמוּר, בָּרוּךְ, כָּתוּב.'
};
const BINYAN_EXPLAIN = {
  qal:'<b>קל</b>: הבניין הפשוט, פעולה רגילה. שָׁמַר.',
  nif:'<b>נפעל</b>: בדרך כלל סביל או חוזר של קל. נ׳ בעבר (נִשְׁמַר), ודגש באות הראשונה של השורש בעתיד (יִשָּׁמֵר).',
  piel:'<b>פיעל</b>: דגש באות השנייה של השורש. לפעמים מחזק את הפעולה או גורם לה. דִּבֵּר, שִׁלַּח.',
  pual:'<b>פֻּעַל</b>: הסביל של פיעל, עם דגש באות השנייה ותנועת u. דֻּבַּר, מְשֻׁלָּח.',
  hif:'<b>הפעיל</b>: לרוב גורם לאחר לעשות. ה׳ בעבר (הִקְרִיב), ובדרך כלל י׳ לפני האות האחרונה.',
  hof:'<b>הֻפְעַל</b>: הסביל של הפעיל. הָקְרַב, הֻשְׁלַךְ.',
  hit:'<b>התפעל</b>: פעולה שאדם עושה לעצמו, או פעולה הדדית. הִתְהַלֵּךְ. לפני ס׳ ש׳ צ׳ ה-ת׳ מתחלפת: הִשְׁתַּמֵּר.',
  hsht:'<b>השתפעל</b>: צורה מיוחדת, בעיקר בפועל הִשְׁתַּחֲוָה.',
  hotp:'<b>הותפעל</b>: צורה נדירה של התפעל עם תנועת u: הֻתְפָּקְדוּ.',
  nit:'<b>נתפעל</b>: צורה נדירה שמשלבת נ׳ ו-ת׳.',
  pasq:'<b>קל סביל</b>: צורה סבילה עתיקה של קל, לפי ניתוח ETCBC.'
};

// ---------- state ----------
let state = {p: -1, level: 1, sel: null};
try { const s = JSON.parse(localStorage.getItem('tw-state')||'null'); if (s && typeof s.p === 'number') state.level = s.level ?? 1; } catch(e){}
const save = () => { try { localStorage.setItem('tw-state', JSON.stringify({p:state.p, level:state.level})); } catch(e){} };

// ---------- sefer / parsha pickers ----------
const SEFER_OF_P = D.P.map(p => D.V[p[2]][0]);
function fillSefer(){
  $('sefer').innerHTML = D.B.map((b,i) => `<option value="${i}">${b}</option>`).join('');
}
function fillParsha(si){
  $('parsha').innerHTML = D.P.map((p,i) => SEFER_OF_P[i]===si ? `<option value="${i}">${p[1]}${D.E[i] ? '' : ' (אין רשימה)'}</option>` : '').join('');
}
$('sefer').addEventListener('change', e => { fillParsha(+e.target.value); selectParsha(+$('parsha').value); });
$('parsha').addEventListener('change', e => selectParsha(+e.target.value));
document.querySelectorAll('.seg button').forEach(b => b.addEventListener('click', () => { state.level = +b.dataset.lv; save(); renderList(); }));

// ---------- tags ----------
function tags(li){
  const x = X(li), out = [];
  if (x.n === 1) out.push('<span class="tag rare">יחידאי בתנ"ך</span>');
  else if (x.tn === 1) out.push('<span class="tag rare">פעם אחת בתורה</span>');
  else if (x.tn <= 5) out.push('<span class="tag rare">נדיר בתורה</span>');
  if (x.lang === 'A') out.push('<span class="tag">ארמית</span>');
  return out.join(' ');
}

// ---------- list ----------
const BASIC_MIN = 3;   // basic level: words whose root appears at least 3 times in the Torah
function entryRows(pi){
  const E = D.E[pi] || [];
  return E.map((e, i) => ({kind:'entry', e, i}));
}
function renderList(){
  const pi = state.p;
  document.querySelectorAll('.seg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.lv === state.level)));
  const P = D.P[pi];
  $('ltitle').textContent = 'פרשת ' + P[1];
  const E = D.E[pi];
  const list = $('list');
  if (!E) {
    $('lcount').textContent = '';
    const cand = D.C[pi] || [];
    list.innerHTML = `<div class="sect">אין רשימה שלך לפרשה הזאת${P[0]==='Shemot' ? ' (הקובץ שמות.docx מכיל שאלות, לא מילים)' : ''}. למטה: מילים נדירות שהכלי מצא בפרשה (שורש שמופיע עד פעמיים בתורה).</div>` + cand.map(wi => candRow(wi)).join('');
    $('lvnote').textContent = '';
    bindRows(); return;
  }
  const rows = [];
  const matched = E.map((e,i)=>({e,i})).filter(o => o.e.h !== null);
  const missing = E.map((e,i)=>({e,i})).filter(o => o.e.h === null);
  let shown = matched;
  if (state.level === 0) shown = matched.filter(o => D.X[o.e.x][5] >= BASIC_MIN);
  rows.push(shown.map(o => entryRow(o.e, o.i)).join(''));
  if (state.level === 2) {
    const cand = D.C[pi] || [];
    rows.push(`<div class="sect">מועמדים להוספה: מילים בפרשה ששורשן מופיע עד פעמיים בתורה ואינן ברשימה שלך (${cand.length})</div>` + cand.map(candRow).join(''));
  }
  if (missing.length && state.level >= 1) {
    rows.push(`<div class="sect">לבדיקה: לא נמצאו בתורה כפי שנכתבו (${missing.length})</div>` + missing.map(o => `<div class="row" tabindex="-1"><div class="w">${esc(o.e.r)}</div><div class="meta"><span class="tag warn">לא נמצא</span>אולי שגיאת הקלדה, או מילה מרש"י</div></div>`).join(''));
  }
  list.innerHTML = rows.join('');
  const nOwn = matched.length, nBasic = matched.filter(o => D.X[o.e.x][5] >= BASIC_MIN).length;
  $('lcount').textContent = state.level === 0 ? `${nBasic} מתוך ${nOwn}` : state.level === 2 ? `${nOwn} + ${(D.C[pi]||[]).length} מועמדים` : `${nOwn} מילים`;
  $('lvnote').textContent = state.level === 0 ? `בסיסי: רק מילים ששורשן מופיע ${BASIC_MIN} פעמים או יותר בתורה, כלומר שווה ללמוד אותן` : state.level === 2 ? 'מורחב: הרשימה שלך ועוד מילים נדירות מהפרשה' : (P[0]==='Lech Lecha' ? 'שתי הרשימות של לך לך מאוחדות כאן' : '');
  bindRows();
}
function entryRow(e, i){
  const li = e.x, x = X(li);
  const where = e.w === 'elsewhere' ? `<span class="tag warn">נמצא ב${refOfVerse(e.v)}</span>` : '';
  const partial = e.t.filter(t => !t[1].length).map(t => t[0]);
  return `<div class="row" tabindex="0" data-w="${e.h}" data-e="${i}" role="button">
    <div class="w">${esc(e.r)}</div>
    <div class="nums">תורה ${x.tn} · תנ"ך ${x.n}</div>
    <div class="meta">${refOfVerse(e.v)} · ${esc(x.v)} ${tags(li)} ${where} ${partial.length ? `<span class="tag warn">לא זוהה: ${esc(partial.join(' '))}</span>` : ''}</div></div>`;
}
function candRow(wi){
  const [li] = mainPart(wi), x = X(li);
  return `<div class="row" tabindex="0" data-w="${wi}" role="button">
    <div class="w">${esc(D.W[wi].replace('־',''))}</div>
    <div class="nums">תורה ${x.tn} · תנ"ך ${x.n}</div>
    <div class="meta">${refOfWord(wi)} · ${esc(x.v)} <span class="tag">מועמד</span> ${tags(li)}</div></div>`;
}
function bindRows(){
  $('list').querySelectorAll('.row[data-w]').forEach(r => {
    const go = () => { openWord(+r.dataset.w, r.dataset.e !== undefined ? D.E[state.p][+r.dataset.e] : null); markCurrent(r); };
    r.addEventListener('click', go);
    r.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(); } });
  });
}
function markCurrent(r){
  $('list').querySelectorAll('.row').forEach(x => x.removeAttribute('aria-current'));
  if (r) r.setAttribute('aria-current','true');
}
function selectParsha(pi){
  state.p = pi; save();
  $('sefer').value = SEFER_OF_P[pi]; fillParsha(SEFER_OF_P[pi]); $('parsha').value = pi;
  renderList();
  const first = $('list').querySelector('.row[data-w]');
  if (first) first.click();
}

// ---------- word card ----------
function describePart(li, mi){
  const x = X(li), m = M(mi), bits = [];
  if (m.sp === 'verb') {
    bits.push('פועל', VS[m.vs] || m.vs, VT[m.vt] || m.vt);
    const pg = m.ps + m.gn + m.nu;
    if (PGN[pg]) bits.push(PGN[pg]);
    else if (m.gn || m.nu) bits.push([GN[m.gn], NU[m.nu]].filter(Boolean).join(' '));
  } else {
    bits.push(SP[m.sp] || m.sp);
    if (m.gn || m.nu) bits.push([GN[m.gn], NU[m.nu]].filter(Boolean).join(' '));
    if (m.st && m.sp !== 'verb') bits.push(ST[m.st] || m.st);
  }
  if (m.sfx) bits.push('כינוי: ' + (SFX[m.sfx] || m.sfx));
  return {lex: x.v, gloss: x.g, desc: bits.filter(Boolean).join(', ')};
}
function openWord(wi, entry){
  state.sel = wi;
  const v = wordVerse[wi];
  const hits = new Set(entry ? entry.t.flatMap(t => t[1]) : [wi]);
  hits.add(wi);
  const [li, mi] = mainPart(wi);
  const x = X(li), m = M(mi);
  $('cref').textContent = refOfVerse(v);
  let pasuk = '';
  for (let i = D.V[v][3]; i < verseEnd(v); i++) {
    const t = D.W[i];
    const sep = t.endsWith('־') ? '' : ' ';
    pasuk += `<span data-w="${i}" class="${hits.has(i) ? 'hl' : ''} ${i===wi ? 'sel' : ''}">${esc(t)}</span>${sep}`;
  }
  const parts = D.WP[wi].map(([l, mm]) => { const d = describePart(l, mm); return `<li><span class="f-he">${esc(d.lex)}</span>: ${esc(d.desc)} <span class="note">(${esc(d.gloss)})</span></li>`; }).join('');
  const fam = family(li);
  const pi = parshaOfVerse(v);
  $('card').innerHTML = `
    <div><div class="big">${esc(D.W[wi].replace('־',''))}</div>
      <div class="note">${refOfVerse(v)} · פרשת ${D.P[pi][1]}${entry ? ' · מהרשימה שלך: ' + esc(entry.r) : ''}</div></div>
    <div class="pasuk" id="pasuk">${pasuk.trim()}׃</div>
    <div><p class="h3">פירוק המילה</p><ul style="margin:0;padding-inline-start:18px">${parts}</ul></div>
    <dl class="kv">
      <dt>ערך מילוני</dt><dd><span class="f-he">${esc(x.v)}</span> · ${SP[x.sp] || x.sp} · באנגלית (ETCBC): ${esc(x.g)}</dd>
      <dt>בתורה</dt><dd>${x.tn} פעמים ${tags(li)}</dd>
      <dt>בכל התנ"ך</dt><dd>${x.n} פעמים</dd>
      ${fam ? `<dt>אותן אותיות</dt><dd>${fam}</dd>` : ''}
    </dl>
    <div><p class="h3">כל הצורות של ${esc(x.v)} שכתובות בתנ"ך</p>${formsTable(li, D.W[wi], mi)}</div>
    <div id="refbox"></div>
    ${x.sp === 'verb' ? conjugation(li, mi, D.W[wi]) : ''}`;
  $('pasuk').querySelectorAll('span[data-w]').forEach(s => s.addEventListener('click', () => openWord(+s.dataset.w, null)));
  bindCard(li);
  if (window.innerWidth <= 860) $('card').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
}
function family(li){
  const base = D.X[li][0].replace(/[\[\/=]+$/,'');
  const out = [];
  D.X.forEach((r, i) => { if (i !== li && r[0].replace(/[\[\/=]+$/,'') === base) out.push(`<a class="fam" data-l="${i}" style="cursor:pointer;color:var(--accent);text-decoration:underline"><span class="f-he">${esc(r[1])}</span></a> (${SP[r[3]]||r[3]}, ${esc(r[2])}, ×${r[5]} בתורה)`); });
  return out.join(' · ');
}

// all forms of a lexeme, Torah + Nach
function formsOf(li){ return (D.FO[li] || []).map(f => ({mi:f[0], m:M(f[0]), t:f[1], tn:f[2], nn:f[3], ref:f[4]})); }
function formsTable(li, curText, curMi){
  const fs = formsOf(li).sort((a,b) => (b.tn - a.tn) || (b.nn - a.nn));
  const cur = cons(curText);
  const rows = fs.slice(0, 200).map((f, i) => {
    const d = describePart(li, f.mi);
    const nachRef = f.ref ? `${D.NB[f.ref[0]]} ${gem(f.ref[1])}:${gem(f.ref[2])}` : '';
    return `<tr><td><span class="f ${(cons(f.t)===cur && f.mi===curMi) ? 'cur':''}" data-fi="${i}">${esc(f.t.replace('־',''))}</span></td><td>${esc(d.desc)}</td>
      <td class="nums">${f.tn || ''}</td><td class="nums">${f.nn || ''}${nachRef && !f.tn ? ` <span class="c">(${nachRef})</span>` : ''}</td></tr>`;
  }).join('');
  return `<div class="scroll formsbox"><table id="ftable"><thead><tr><th>צורה</th><th>ניתוח</th><th>בתורה</th><th>בנביאים וכתובים</th></tr></thead><tbody>${rows}</tbody></table></div>
    ${fs.length > 200 ? `<p class="note">מוצגות 200 הצורות הנפוצות מתוך ${fs.length}.</p>` : ''}`;
}

// ---------- conjugation grid: real forms first, constructed forms clearly marked ----------
const FIN_T = ['perf','wqtl','impf','wayq','impv'];
const ROWS = ['p3msg','p3fsg','p3pl','p2msg','p2fsg','p1sg','p3mpl','p3fpl','p2mpl','p2fpl','p2pl','p1pl'];
const FULL_ROWS = ['p3msg','p3fsg','p2msg','p2fsg','p1sg','p3pl','p3mpl','p3fpl','p2mpl','p2fpl','p1pl'];
const MAIN7 = ['qal','nif','piel','pual','hif','hof','hit'];
const PERF_ONLY = new Set(['p3pl']), IMPF_ONLY = new Set(['p3mpl','p3fpl']);
let conjMode = 'full';
try { const m = localStorage.getItem('tw-conj'); if (m === 'real' || m === 'full') conjMode = m; } catch(e){}
let conjState = {vs:null, tense:null};

// root letters (with shin / sin dot) from the dictionary form
const FIN2 = {'ך':'כ','ם':'מ','ן':'נ','ף':'פ','ץ':'צ'};
const TOFIN = {'כ':'ך','מ':'ם','נ':'ן','פ':'ף','צ':'ץ'};
function rootOf(li){
  const out = [];
  for (const ch of D.X[li][1]) {
    if (/[ׁׂ]/.test(ch) && out.length) out[out.length-1] += ch;
    else if (/[א-ת]/.test(ch)) out.push(FIN2[ch] || ch);
  }
  return out;
}
function weakReason(R){
  if (R.length !== 3) return 'השורש אינו בן שלוש אותיות';
  const b = R.map(r => r[0]);
  if (b.some(c => 'אהחע'.includes(c))) return 'יש בשורש אות גרונית (א׳ ה׳ ח׳ ע׳)';
  if (b[0] === 'ר' || b[1] === 'ר') return 'ר׳ בתחילת השורש או באמצעו';
  if ('יונ'.includes(b[0])) return 'האות הראשונה של השורש היא י׳, ו׳ או נ׳';
  if ('וי'.includes(b[1])) return 'האות האמצעית של השורש היא ו׳ או י׳';
  if ('יונת'.includes(b[2])) return 'האות האחרונה של השורש היא י׳, ו׳, נ׳ או ת׳';
  if (b[1] === b[2]) return 'שורש כפול (שתי האותיות האחרונות שוות)';
  return '';
}
// template: 1/2/3 = root letter; * = dagesh chazak; ~ = dagesh kal (only on בגדכפת); H = the התפעל prefix chunk
function hitChunk(R){
  const b = R[0][0];
  if ('דטת'.includes(b)) return null;
  if (b === 'ס' || b === 'ש') return R[0] + 'ְתַּ';
  if (b === 'צ') return R[0] + 'ְטַ';
  if (b === 'ז') return R[0] + 'ְדַּ';
  return 'תְ1~ַ';
}
function fill(tpl, R){
  if (tpl.includes('H')) { const h = hitChunk(R); if (!h) return null; tpl = tpl.replace('H', h); }
  let out = '';
  for (let i = 0; i < tpl.length; i++) {
    const c = tpl[i];
    if (c >= '1' && c <= '3') {
      const idx = +c - 1;
      let mark = '';
      if (tpl[i+1] === '*' || tpl[i+1] === '~') { mark = tpl[i+1]; i++; }
      const rest = tpl.slice(i + 1);
      let L = R[idx];
      if (idx === 2 && !/[א-ת123]/.test(rest) && TOFIN[L[0]]) L = TOFIN[L[0]] + L.slice(1);
      const dg = mark === '*' || (mark === '~' && 'בגדכפת'.includes(R[idx][0]));
      out += L + (dg ? 'ּ' : '');
    } else out += c;
  }
  return out;
}
const PERF = {qal:['1~ָ2ַ3','1~ָ2ְ3','1~ָ2ַ3','1~ְ2ַ3'], nif:['נִ1ְ2~ַ3','נִ1ְ2~ְ3','נִ1ְ2~ַ3','נִ1ְ2~ַ3'],
  piel:['1~ִ2*ֵ3','1~ִ2*ְ3','1~ִ2*ַ3','1~ִ2*ַ3'], pual:['1~ֻ2*ַ3','1~ֻ2*ְ3','1~ֻ2*ַ3','1~ֻ2*ַ3'],
  hif:['הִ1ְ2~ִי3','הִ1ְ2~ִי3','הִ1ְ2~ַ3','הִ1ְ2~ַ3'], hof:['הָ1ְ2~ַ3','הָ1ְ2~ְ3','הָ1ְ2~ַ3','הָ1ְ2~ַ3'],
  hit:['הִH2*ֵ3','הִH2*ְ3','הִH2*ַ3','הִH2*ַ3']};
const PERF_END = {p3msg:[0,''], p3fsg:[1,'ָה'], p2msg:[2,'ְתָּ'], p2fsg:[2,'ְתְּ'], p1sg:[2,'ְתִּי'], p3pl:[1,'וּ'], p2mpl:[3,'ְתֶּם'], p2fpl:[3,'ְתֶּן'], p1pl:[2,'ְנוּ']};
const IMPF_STEM = {qal:{n:'1ְ2~ֹ3',i:'1ְ2~ְ3ִי',u:'1ְ2~ְ3וּ',na:'1ְ2~ֹ3ְנָה'}, nif:{n:'1*ָ2ֵ3',i:'1*ָ2ְ3ִי',u:'1*ָ2ְ3וּ',na:'1*ָ2ַ3ְנָה'},
  piel:{n:'1ַ2*ֵ3',i:'1ַ2*ְ3ִי',u:'1ַ2*ְ3וּ',na:'1ַ2*ֵ3ְנָה'}, pual:{n:'1ֻ2*ַ3',i:'1ֻ2*ְ3ִי',u:'1ֻ2*ְ3וּ',na:'1ֻ2*ַ3ְנָה'},
  hif:{n:'1ְ2~ִי3',i:'1ְ2~ִי3ִי',u:'1ְ2~ִי3וּ',na:'1ְ2~ֵ3ְנָה',short:'1ְ2~ֵ3'}, hof:{n:'1ְ2~ַ3',i:'1ְ2~ְ3ִי',u:'1ְ2~ְ3וּ',na:'1ְ2~ַ3ְנָה'},
  hit:{n:'H2*ֵ3',i:'H2*ְ3ִי',u:'H2*ְ3וּ',na:'H2*ֵ3ְנָה'}};
const PV = {qal:['ִ','ֶ'], nif:['ִ','ֶ'], piel:['ְ','ֲ'], pual:['ְ','ֲ'], hif:['ַ','ַ'], hof:['ָ','ָ'], hit:['ִ','ֶ']};
const IMPF_P = {p3msg:['י','n'], p3fsg:['ת','n'], p2msg:['ת','n'], p2fsg:['ת','i'], p1sg:['א','n'], p3mpl:['י','u'], p3fpl:['ת','na'], p2mpl:['ת','u'], p2fpl:['ת','na'], p1pl:['נ','n']};
const IMPV = {qal:{p2msg:'1~ְ2ֹ3',p2fsg:'1~ִ2ְ3ִי',p2mpl:'1~ִ2ְ3וּ',p2fpl:'1~ְ2ֹ3ְנָה'}, nif:{p2msg:'הִ1*ָ2ֵ3',p2fsg:'הִ1*ָ2ְ3ִי',p2mpl:'הִ1*ָ2ְ3וּ',p2fpl:'הִ1*ָ2ַ3ְנָה'},
  piel:{p2msg:'1~ַ2*ֵ3',p2fsg:'1~ַ2*ְ3ִי',p2mpl:'1~ַ2*ְ3וּ',p2fpl:'1~ַ2*ֵ3ְנָה'}, hif:{p2msg:'הַ1ְ2~ֵ3',p2fsg:'הַ1ְ2~ִי3ִי',p2mpl:'הַ1ְ2~ִי3וּ',p2fpl:'הַ1ְ2~ֵ3ְנָה'},
  hit:{p2msg:'הִH2*ֵ3',p2fsg:'הִH2*ְ3ִי',p2mpl:'הִH2*ְ3וּ',p2fpl:'הִH2*ֵ3ְנָה'}};
const INFC = {qal:'1~ְ2ֹ3', nif:'הִ1*ָ2ֵ3', piel:'1~ַ2*ֵ3', hif:'הַ1ְ2~ִי3', hit:'הִH2*ֵ3'};
const INFA = {qal:'1~ָ2וֹ3', nif:'נִ1ְ2~ֹ3', piel:'1~ַ2*ֹ3', pual:'1~ֻ2*ֹ3', hif:'הַ1ְ2~ֵ3', hof:'הָ1ְ2~ֵ3'};
const PTC_KEYS = ['msg','fsg','mpl','fpl'];
const PTCA = {qal:['1~ֹ2ֵ3','1~ֹ2ֶ3ֶת','1~ֹ2ְ3ִים','1~ֹ2ְ3וֹת'], nif:['נִ1ְ2~ָ3','נִ1ְ2~ֶ3ֶת','נִ1ְ2~ָ3ִים','נִ1ְ2~ָ3וֹת'],
  piel:['מְ1ַ2*ֵ3','מְ1ַ2*ֶ3ֶת','מְ1ַ2*ְ3ִים','מְ1ַ2*ְ3וֹת'], hif:['מַ1ְ2~ִי3','מַ1ְ2~ֶ3ֶת','מַ1ְ2~ִי3ִים','מַ1ְ2~ִי3וֹת'],
  hit:['מִH2*ֵ3','מִH2*ֶ3ֶת','מִH2*ְ3ִים','מִH2*ְ3וֹת']};
const PTCP = {qal:['1~ָ2וּ3','1~ְ2וּ3ָה','1~ְ2וּ3ִים','1~ְ2וּ3וֹת'], pual:['מְ1ֻ2*ָ3','מְ1ֻ2*ָ3ָה','מְ1ֻ2*ָ3ִים','מְ1ֻ2*ָ3וֹת'],
  hof:['מָ1ְ2~ָ3','מָ1ְ2~ָ3ָה','מָ1ְ2~ָ3ִים','מָ1ְ2~ָ3וֹת']};

// qal verbs whose real future has patach before the last root letter (like יִלְמַד) get the a-pattern
function qalAClass(li, R){
  const re = new RegExp(R[1][0] + '[\\u05BC\\u05C1\\u05C2]*\\u05B7' + '[' + R[2][0] + (TOFIN[R[2][0]] || '') + ']');
  return formsOf(li).some(f => f.m.vs === 'qal' && ['impf','wayq','impv'].includes(f.m.vt) && re.test(f.t));
}
function genForm(vs, vt, key, R, aClass){
  const qa = s => (vs === 'qal' && aClass) ? s.replace('ֹ', 'ַ') : s;
  if (vt === 'perf' || vt === 'wqtl') {
    const e = PERF_END[key]; if (!e || !PERF[vs]) return null;
    const f = fill(PERF[vs][e[0]] + e[1], R); if (!f) return null;
    if (vt === 'perf') return f;
    const first = f[0];
    let rest = f.slice(1).replace(/^([ׁׂ]?)ּ/, '$1');
    const vav = ('במפ'.includes(first) || /^[ּׁׂ]*ְ/.test(f.slice(1))) ? 'וּ' : 'וְ';
    return vav + first + rest;
  }
  if (vt === 'impf' || vt === 'wayq') {
    const p = IMPF_P[key]; if (!p || !IMPF_STEM[vs]) return null;
    const [P, end] = p;
    let stem = IMPF_STEM[vs][end];
    if (vt === 'wayq' && vs === 'hif' && end === 'n' && P !== 'א') stem = IMPF_STEM.hif.short;
    stem = qa(stem);
    const body = fill(stem, R); if (!body) return null;
    const vow = P === 'א' ? PV[vs][1] : PV[vs][0];
    if (vt === 'impf') return P + (P === 'ת' ? 'ּ' : '') + vow + body;
    if (P === 'א') return 'וָ' + P + vow + body;
    const dg = (P === 'י' && vow === 'ְ') ? '' : 'ּ';
    return 'וַ' + P + dg + vow + body;
  }
  if (vt === 'impv') { const t = IMPV[vs] && IMPV[vs][key]; return t ? fill(qa(t), R) : null; }
  if (vt === 'infc') { const t = INFC[vs]; return t ? fill(t, R) : null; }
  if (vt === 'infa') { const t = INFA[vs]; return t ? fill(t, R) : null; }
  if (vt === 'ptca' || vt === 'ptcp') {
    const tbl = vt === 'ptca' ? PTCA : PTCP; const k = PTC_KEYS.indexOf(key);
    return (tbl[vs] && k >= 0) ? fill(tbl[vs][k], R) : null;
  }
  return null;
}

function conjugation(li, mi, curText){
  const m = M(mi), fs = formsOf(li).filter(f => f.m.sp === 'verb');
  const order = s => { const i = Object.keys(VS).indexOf(s); return i < 0 ? 99 : i; };
  const attested = [...new Set(fs.map(f => f.m.vs))].sort((a,b) => order(a) - order(b));
  const R = rootOf(li), weak = weakReason(R);
  conjState = {vs: m.vs, tense: m.vt, li, curText, curMi: mi, attested, R, weak, aClass: qalAClass(li, R)};
  return `<div><p class="h3">טבלת נטייה של ${esc(X(li).v)}</p>
    <div class="bar" style="margin:0 0 8px">
      <div class="seg" role="group" aria-label="מה להציג בטבלה">
        <button type="button" id="cm-real" data-cm="real">רק מה שבמקרא</button>
        <button type="button" id="cm-full" data-cm="full">טבלה מלאה</button>
      </div>
      <span class="note" id="cmnote"></span>
    </div>
    <div class="builder" id="builder"></div>
    <div class="vsum" id="vsum"></div>
    <div class="tabs" id="vstabs"></div>
    <div class="explain" id="binyanx"></div>
    <div id="conjgrid" style="margin-top:10px"></div>
    <div class="explain" id="tensex" style="margin-top:10px"></div>
    <p class="note">צורה מודגשת = הצורה שבחרת. מספר = כמה פעמים בתורה, ובסוגריים כמה בנביאים וכתובים. <span class="f g" style="font-size:14px">צורה במסגרת מקווקוות</span> = נבנתה לפי דגם השלמים ואינה כתובה בתנ"ך (בלי טעמים ובלי צורות הפסק). לחיצה על כותרת עמודה מסבירה את הזמן.</p></div>`;
}
function renderTabs(){
  const {li, attested} = conjState;
  const fs = formsOf(li).filter(f => f.m.sp === 'verb');
  const stems = conjMode === 'full' ? [...attested, ...MAIN7.filter(s => !attested.includes(s))] : attested;
  if (!stems.includes(conjState.vs)) conjState.vs = stems[0];
  $('vstabs').innerHTML = stems.map(s => {
    const n = fs.filter(f => f.m.vs === s).reduce((a,f) => a + f.tn + f.nn, 0);
    return `<button type="button" data-vs="${s}" aria-pressed="${s===conjState.vs}" ${n ? '' : 'class="g"'}>${VS[s]||s} ${n ? `(${n})` : '(לא במקרא)'}</button>`;
  }).join('');
  $('vstabs').querySelectorAll('button').forEach(b => b.addEventListener('click', () => { conjState.vs = b.dataset.vs; if (conjState.b) conjState.b.vs = b.dataset.vs; renderTabs(); renderConj(); renderBuilder(); }));
  // one line with every real form, grouped by binyan, so nothing hides behind a tab
  $('vsum').innerHTML = '<span class="note">בתנ"ך לפי בניין: </span>' + attested.map(s => {
    const list = fs.filter(f => f.m.vs === s).sort((a,b) => (b.tn+b.nn) - (a.tn+a.nn));
    const n = list.reduce((a,f) => a + f.tn + f.nn, 0);
    const shown = list.slice(0, 3).map(f => `<span class="f-he">${esc(f.t.replace('־',''))}</span>`).join(', ');
    return `<a data-vs="${s}" class="vlink"><b>${VS[s]||s}</b> ×${n}: ${shown}${list.length > 3 ? ' ...' : ''}</a>`;
  }).join(' · ');
  $('vsum').querySelectorAll('a').forEach(a => a.addEventListener('click', () => { conjState.vs = a.dataset.vs; renderTabs(); renderConj(); }));
  document.querySelectorAll('[data-cm]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cm === conjMode)));
  const canGen = !conjState.weak;
  $('cmnote').textContent = conjMode === 'real' ? 'מוצגות רק שורות ועמודות שיש בהן צורה מהמקרא'
    : canGen ? 'משבצות ריקות מולאו בצורות בנויות, מסומנות בקו מקווקו'
    : `השורש ${R2s(conjState.R)} אינו שלם: ${conjState.weak}. הכלי עדיין לא בונה צורות לשורש כזה, כדי לא להציג צורה שגויה. מוצגות רק צורות מהמקרא.`;
}
const R2s = R => R.join('');
function renderConj(){
  const {li, vs, curText, R, weak, aClass} = conjState;
  const g = $('conjgrid'); if (!g) return;
  const cur = cons(curText);
  const fs = formsOf(li).filter(f => f.m.sp === 'verb' && f.m.vs === vs);
  const full = conjMode === 'full', canGen = full && !weak;
  const attestedCell = (list, vt, key) => '<td>' + list.slice(0,6).map(f => `<span class="f ${(cons(f.t)===cur && f.mi===conjState.curMi)?'cur':''}" data-vt="${vt}" data-key="${key}" title="${esc(describePart(li,f.mi).desc)}">${esc(f.t.replace('־',''))}</span><span class="c">${f.tn||''}${f.nn?` (${f.nn})`:''}</span>`).join('<br>') + (list.length>6?`<br><span class="c">ועוד ${list.length-6}</span>`:'') + '</td>';
  const cell = (pred, vt, key) => {
    const list = fs.filter(pred).sort((a,b) => (b.tn+b.nn) - (a.tn+a.nn));
    if (list.length) return attestedCell(list, vt, key);
    if (canGen) { const gform = genForm(vs, vt, key, R, aClass); if (gform) return `<td><span class="f g" data-vt="${vt}" data-key="${key}" title="נבנה לפי הדגם. לא כתוב בתנ״ך">${esc(gform)}</span></td>`; }
    return '<td class="empty">·</td>';
  };
  const pgn = f => f.m.ps + f.m.gn + f.m.nu;
  const has = (t, r) => fs.some(f => f.m.vt === t && (r === undefined || pgn(f) === r));
  const cols = full ? FIN_T.filter(t => t !== 'impv' || IMPV[vs] || has('impv')) : FIN_T.filter(t => has(t));
  const rows = full ? FULL_ROWS.concat(fs.some(f => pgn(f) === 'p2pl') ? ['p2pl'] : [])
                    : ROWS.filter(r => cols.some(t => has(t, r)));
  let h = '';
  if (cols.length && rows.length) {
    h += `<div class="scroll"><table><thead><tr><th></th>${cols.map(t => `<th class="click" data-t="${t}">${VT[t]}</th>`).join('')}</tr></thead><tbody>`;
    for (const r of rows) h += `<tr><th>${PGN[r]}</th>${cols.map(t => {
      const perfLike = t === 'perf' || t === 'wqtl';
      if ((t === 'impv' && !r.startsWith('p2')) || (perfLike && IMPF_ONLY.has(r) && !has(t, r)) || (!perfLike && PERF_ONLY.has(r) && !has(t, r))) return '<td class="na">-</td>';
      return cell(f => f.m.vt === t && pgn(f) === r, t, r);
    }).join('')}</tr>`;
    h += '</tbody></table></div>';
  }
  const PT = [['msg','יחיד'],['fsg','יחידה'],['mpl','רבים'],['fpl','רבות']];
  const nfCols = [['infc','מקור נטוי'],['infa','מקור מוחלט'],['ptca','בינוני פועל'],['ptcp','בינוני פעול']]
    .filter(([t]) => full ? (has(t) || (canGen && (t==='infc'?INFC:t==='infa'?INFA:t==='ptca'?PTCA:PTCP)[vs])) : has(t));
  if (nfCols.length) {
    h += `<div class="scroll" style="margin-top:8px"><table><thead><tr>${nfCols.map(([t,l]) => `<th class="click" data-t="${t}">${l}</th>`).join('')}</tr></thead><tbody><tr>`;
    for (const [t] of nfCols) {
      if (t === 'infc' || t === 'infa') { h += cell(f => f.m.vt === t, t, ''); continue; }
      const parts = PT.map(([k,l]) => { const c = cell(f => f.m.vt === t && (f.m.gn + f.m.nu) === k, t, k); return c.includes('class="empty"') ? '' : `<div class="c">${l}</div>${c.replace(/^<td>|<\/td>$/g,'')}`; }).join('');
      h += `<td>${parts || '·'}</td>`;
    }
    h += '</tr></tbody></table></div>';
  }
  g.innerHTML = h || '<p class="note">אין בבניין הזה צורות להציג.</p>';
  g.querySelectorAll('.f[data-vt]').forEach(s => s.addEventListener('click', () => { setBuilder(vs, s.dataset.vt, s.dataset.key); $('builder').scrollIntoView({block:'nearest'}); }));
  $('binyanx').innerHTML = BINYAN_EXPLAIN[vs] || `<b>${VS[vs]||vs}</b>`;
  $('tensex').innerHTML = TENSE_EXPLAIN[conjState.tense] || TENSE_EXPLAIN.perf;
  g.querySelectorAll('th.click').forEach(th => th.addEventListener('click', () => { conjState.tense = th.dataset.t; $('tensex').innerHTML = TENSE_EXPLAIN[th.dataset.t]; }));
}

// ---------- conjugation builder: pick binyan, tense, person; see the form and why ----------
const ALL_T = ['perf','wqtl','impf','wayq','impv','infc','infa','ptca','ptcp'];
const KEYS_FOR = t => (t === 'perf' || t === 'wqtl') ? ['p3msg','p3fsg','p2msg','p2fsg','p1sg','p3pl','p2mpl','p2fpl','p1pl']
  : (t === 'impf' || t === 'wayq') ? ['p3msg','p3fsg','p2msg','p2fsg','p1sg','p3mpl','p3fpl','p2mpl','p2fpl','p1pl']
  : t === 'impv' ? ['p2msg','p2fsg','p2mpl','p2fpl'] : (t === 'ptca' || t === 'ptcp') ? ['msg','fsg','mpl','fpl'] : [''];
const KEY_LABEL = k => PGN[k] || ({msg:'יחיד', fsg:'יחידה', mpl:'רבים', fpl:'רבות', '':'(אין גוף)'}[k]);
const MARK = {
  perf:{p3msg:'בלי סיומת', p3fsg:'סיומת ־ָה', p2msg:'סיומת ־תָּ', p2fsg:'סיומת ־תְּ', p1sg:'סיומת ־תִּי', p3pl:'סיומת ־וּ', p2mpl:'סיומת ־תֶּם', p2fpl:'סיומת ־תֶּן', p1pl:'סיומת ־נוּ'},
  impf:{p3msg:'תחילית י׳', p3fsg:'תחילית ת׳', p2msg:'תחילית ת׳', p2fsg:'תחילית ת׳ וסיומת ־ִי', p1sg:'תחילית א׳', p3mpl:'תחילית י׳ וסיומת ־וּ', p3fpl:'תחילית ת׳ וסיומת ־נָה', p2mpl:'תחילית ת׳ וסיומת ־וּ', p2fpl:'תחילית ת׳ וסיומת ־נָה', p1pl:'תחילית נ׳'},
  impv:{p2msg:'בלי סיומת', p2fsg:'סיומת ־ִי', p2mpl:'סיומת ־וּ', p2fpl:'סיומת ־נָה'},
  ptc:{msg:'בלי סיומת', fsg:'סיומת ־ֶת (או ־ָה)', mpl:'סיומת ־ִים', fpl:'סיומת ־וֹת'}
};
function markFor(vt, key){
  if (vt === 'perf') return MARK.perf[key];
  if (vt === 'wqtl') return 'ו׳ בתחילה, ו' + MARK.perf[key];
  if (vt === 'impf') return MARK.impf[key];
  if (vt === 'wayq') return 'וַ בתחילה ודגש באות שאחריה, ו' + MARK.impf[key];
  if (vt === 'impv') return MARK.impv[key];
  if (vt === 'ptca' || vt === 'ptcp') return MARK.ptc[key];
  return '';
}
function setBuilder(vs, vt, key){ conjState.b = {vs, vt, key}; renderBuilder(); }
function renderBuilder(){
  const box = $('builder'); if (!box) return;
  const {li, R, weak, aClass, attested} = conjState;
  const fsAll = formsOf(li).filter(f => f.m.sp === 'verb');
  if (!conjState.b) {
    const m = M(conjState.curMi);
    conjState.b = {vs: m.vs, vt: m.vt, key: (m.vt === 'ptca' || m.vt === 'ptcp') ? m.gn + m.nu : (m.vt.startsWith('inf') ? '' : m.ps + m.gn + m.nu)};
  }
  let {vs, vt, key} = conjState.b;
  const keys = KEYS_FOR(vt);
  if (!keys.includes(key)) key = conjState.b.key = keys[0];
  const stems = [...attested, ...MAIN7.filter(s => !attested.includes(s))];
  const match = f => f.m.vs === vs && f.m.vt === vt && (vt.startsWith('inf') ? true : (vt === 'ptca' || vt === 'ptcp') ? (f.m.gn + f.m.nu) === key : (f.m.ps + f.m.gn + f.m.nu) === key);
  const real = fsAll.filter(match).sort((a,b) => (b.tn+b.nn) - (a.tn+a.nn));
  const gen = (!weak && !real.length) ? genForm(vs, vt, key, R, aClass) : null;
  let out;
  if (real.length) {
    out = real.slice(0, 4).map((f, i) => `<span class="form">${esc(f.t.replace('־',''))}</span><span class="tag">כתוב בתנ"ך: ${f.tn ? `${f.tn} בתורה` : ''}${f.tn && f.nn ? ', ' : ''}${f.nn ? `${f.nn} בנ"ך` : ''}</span> <a class="vlink" data-ri="${i}" style="cursor:pointer;color:var(--accent);text-decoration:underline">איפה?</a>`).join('<br>');
  } else if (gen) {
    out = `<span class="form g">${esc(gen)}</span><span class="tag warn">לא במקרא. נבנה לפי דגם השלמים</span>`;
  } else if (weak) {
    out = `<span class="note">הצורה הזאת לא כתובה בתנ"ך, והשורש ${R.join('')} אינו שלם (${weak}), לכן הכלי לא בונה אותה.</span>`;
  } else {
    out = `<span class="note">אין צורה כזאת בבניין ${VS[vs]||vs}.</span>`;
  }
  const mk = markFor(vt, key);
  box.innerHTML = `<div class="h3" style="margin:0">בונה צורות: בחר בניין, זמן וגוף</div>
    <div class="sels">
      <label class="note" for="b-vs">בניין</label><select id="b-vs">${stems.map(s => `<option value="${s}" ${s===vs?'selected':''}>${VS[s]||s}${attested.includes(s) ? '' : ' (לא במקרא)'}</option>`).join('')}</select>
      <label class="note" for="b-vt">זמן</label><select id="b-vt">${ALL_T.map(t => `<option value="${t}" ${t===vt?'selected':''}>${VT[t]}</option>`).join('')}</select>
      <label class="note" for="b-key">גוף</label><select id="b-key">${keys.map(k => `<option value="${k}" ${k===key?'selected':''}>${KEY_LABEL(k)}</option>`).join('')}</select>
      <label class="note" for="b-root">שורש אחר</label><input id="b-root" placeholder="למשל שמר" value="">
    </div>
    <div class="out">${out}</div>
    <div class="why"><b>${VS[vs]||vs}</b>, <b>${VT[vt]}</b>${key ? `, <b>${KEY_LABEL(key)}</b>` : ''}${mk ? `: ${mk}.` : '.'} <span class="note">${(BINYAN_EXPLAIN[vs]||'').replace(/<[^>]+>/g,'')}</span></div>
    <div class="why note">${(TENSE_EXPLAIN[vt]||'').replace(/<[^>]+>/g,'')}</div>`;
  $('b-vs').addEventListener('change', e => { conjState.b.vs = e.target.value; conjState.vs = e.target.value; renderTabs(); renderConj(); renderBuilder(); });
  $('b-vt').addEventListener('change', e => { conjState.b.vt = e.target.value; renderBuilder(); });
  $('b-key').addEventListener('change', e => { conjState.b.key = e.target.value; renderBuilder(); });
  box.querySelectorAll('a[data-ri]').forEach(a => a.addEventListener('click', () => showRefs(li, real[+a.dataset.ri])));
  $('b-root').addEventListener('change', e => openRoot(e.target.value));
}
// jump to another root: open its first appearance in the Torah if it is a verb there
function openRoot(txt){
  const c = cons(txt); if (c.length < 2) return;
  let found = -1;
  D.X.forEach((r, i) => { if (found < 0 && r[3] === 'verb' && cons(r[1]) === c) found = i; });
  if (found >= 0) { const wi = firstWordOfLex(found); if (wi >= 0) { openWord(wi, null); return; } }
  const box = $('builder');
  box.querySelector('.out').innerHTML = `<span class="note">השורש ${esc(c)} לא נמצא כפועל בתורה. נסה בחיפוש למעלה.</span>`;
}
function bindCard(li){
  if ($('vstabs')) {
    document.querySelectorAll('[data-cm]').forEach(b => b.addEventListener('click', () => {
      conjMode = b.dataset.cm; try { localStorage.setItem('tw-conj', conjMode); } catch(e){}
      renderTabs(); renderConj();
    }));
    renderTabs(); renderConj(); renderBuilder();
  }
  const fs = formsOf(li).sort((a,b) => (b.tn - a.tn) || (b.nn - a.nn));
  document.querySelectorAll('#ftable .f').forEach(s => s.addEventListener('click', () => showRefs(li, fs[+s.dataset.fi])));
  document.querySelectorAll('.fam').forEach(a => a.addEventListener('click', () => {
    const l = +a.dataset.l; const wi = firstWordOfLex(l); if (wi >= 0) openWord(wi, null);
  }));
}
function firstWordOfLex(l){ for (let i = 0; i < NW; i++) if (D.WP[i].some(p => p[0]===l)) return i; return -1; }
function showRefs(li, f){
  const target = cons(f.t), out = [];
  for (let i = 0; i < NW; i++) if (D.WP[i].some(p => p[0]===li && p[1]===f.mi) && cons(D.W[i])===target) out.push(i);
  const nach = f.nn ? `<p class="note">בנביאים וכתובים: ${f.nn} פעמים${f.ref ? `, הראשונה ב${D.NB[f.ref[0]]} ${gem(f.ref[1])}:${gem(f.ref[2])}` : ''}.</p>` : '';
  $('refbox').innerHTML = `<p class="h3">איפה מופיעה הצורה <span class="f-he">${esc(f.t.replace('־',''))}</span></p>
    <div class="refs">${out.map(i => `<a data-w="${i}">${refOfWord(i)}</a>`).join('') || '<span class="note">לא בתורה</span>'}</div>${nach}`;
  $('refbox').querySelectorAll('a').forEach(a => a.addEventListener('click', () => openWord(+a.dataset.w, null)));
  $('refbox').scrollIntoView({block:'nearest'});
}

// ---------- search ----------
let consIdx = null, relIdx = null;
$('sform').addEventListener('submit', ev => {
  ev.preventDefault();
  const q = $('q').value.trim(); if (!q) return;
  if (!consIdx) { consIdx = D.W.map(cons); relIdx = D.W.map(relaxed); }
  const mode = $('m-part').checked ? 'part' : 'whole';
  const c = cons(q), r = relaxed(q);
  const PFX = /^[והבכלמש]{1,3}$/;
  const pre = (full, t) => full.endsWith(t) && full.length > t.length && PFX.test(full.slice(0, full.length - t.length));
  let hits = [];
  for (let i = 0; i < NW; i++) {
    const a = consIdx[i], b = relIdx[i];
    if (mode === 'part' ? (a.includes(c) || (r.length > 2 && b.includes(r))) : (a===c || b===r || pre(a,c) || (r.length>1 && pre(b,r)))) hits.push(i);
  }
  const groups = new Map();
  for (const i of hits) { const [li] = mainPart(i); if (!groups.has(li)) groups.set(li, []); groups.get(li).push(i); }
  const list = $('list');
  $('ltitle').textContent = `חיפוש: ${q}`;
  $('lcount').textContent = `${hits.length} מופעים, ${groups.size} ערכים`;
  $('lvnote').textContent = mode === 'whole' ? 'מילה שלמה: כולל אותיות שימוש בתחילת המילה, ובלי הבדל בין כתיב מלא לחסר' : 'בתוך מילה';
  list.innerHTML = [...groups.entries()].sort((a,b) => b[1].length - a[1].length).slice(0, 300).map(([li, ws]) => {
    const x = X(li);
    return `<div class="row" tabindex="0" data-w="${ws[0]}" role="button"><div class="w">${esc(x.v)}</div><div class="nums">כאן ${ws.length} · תורה ${x.tn} · תנ"ך ${x.n}</div>
      <div class="meta">${esc(x.g)} · ראשון: ${refOfWord(ws[0])} ${tags(li)}</div></div>`;
  }).join('') || '<div class="sect">לא נמצא בתורה. נסה בתוך מילה, או פחות אותיות.</div>';
  bindRows();
  const first = list.querySelector('.row[data-w]'); if (first) first.click();
});

// ---------- start ----------
fillSefer();
const startP = D.P.findIndex(p => p[0] === 'Chayei Sara');
selectParsha(startP);
// open on הגמיאיני as the worked example when it is in the list
const ex = (D.E[startP]||[]).findIndex(e => e.r === 'הגמאיני');
if (ex >= 0) { const row = $('list').querySelector(`.row[data-e="${ex}"]`); if (row) row.click(); }
})();
