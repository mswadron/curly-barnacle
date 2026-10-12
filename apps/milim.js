(function(){
const D = window.TW, TX = window.TX || null;
const $ = id => document.getElementById(id);
const esc = s => String(s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

// ---------- language ----------
let LANG = 'he';
try { const l = localStorage.getItem('tw-lang'); if (l === 'he' || l === 'en') LANG = l; } catch(e){}
const L = (he, en) => LANG === 'en' ? en : he;

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
const BOOK_EN = ['Genesis','Exodus','Leviticus','Numbers','Deuteronomy'];
const refOfVerse = v => { const x = D.V[v]; return LANG === 'en' ? `${BOOK_EN[x[0]]} ${x[1]}:${x[2]}` : `${D.B[x[0]]} ${gem(x[1])}:${gem(x[2])}`; };
const refOfWord = wi => refOfVerse(wordVerse[wi]);
const parshaOfVerse = v => D.P.findIndex(p => v >= p[2] && v <= p[3]);
const parshaName = pi => LANG === 'en' ? D.P[pi][0] : D.P[pi][1];
const bookName = b => LANG === 'en' ? BOOK_EN[b] : D.B[b];
const nachRef = (b, ch, vs) => LANG === 'en' ? `${ch}:${vs}` : `${gem(ch)}:${gem(vs)}`;
const nachBook = b => LANG === 'en' ? D.NE[b] : D.NB[b];
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
const PFX = /^[והבכלמש]{1,3}$/;
const preOk = (full, t) => full.endsWith(t) && full.length > t.length && PFX.test(full.slice(0, full.length - t.length));

// ---------- labels (Hebrew / English) ----------
const DICT = {
  SP: {he:{subs:'שם עצם',verb:'פועל',adjv:'שם תואר',advb:'תואר הפועל',nmpr:'שם פרטי',prps:'כינוי גוף',prde:'כינוי רומז',prin:'כינוי שאלה',intj:'מילת קריאה',nega:'מילת שלילה',inrg:'מילת שאלה',conj:'מילת חיבור',art:'ה"א הידיעה',prep:'מילת יחס'},
       en:{subs:'noun',verb:'verb',adjv:'adjective',advb:'adverb',nmpr:'proper name',prps:'personal pronoun',prde:'demonstrative',prin:'interrogative pronoun',intj:'interjection',nega:'negative',inrg:'interrogative',conj:'conjunction',art:'definite article',prep:'preposition'}},
  VS: {he:{qal:'קל',nif:'נפעל',piel:'פיעל',pual:'פֻּעַל',hif:'הפעיל',hof:'הֻפְעַל',hit:'התפעל',hsht:'השתפעל',hotp:'הותפעל',nit:'נתפעל',pasq:'קל סביל',peal:'פעל (ארמית)',peil:'פעיל (ארמית)',pael:'פעל דגוש (ארמית)',haf:'הפעל (ארמית)',afel:'אפעל (ארמית)',htpe:'התפעל (ארמית)',htpa:'התפעל דגוש (ארמית)'},
       en:{qal:'Kal',nif:'Nifal',piel:'Piel',pual:'Pual',hif:'Hifil',hof:'Hofal',hit:'Hispael',hsht:'Hishtafel',hotp:'Hotpaal',nit:'Nispael',pasq:'passive Kal',peal:'Peal (Aramaic)',peil:'Peil (Aramaic)',pael:'Pael (Aramaic)',haf:'Hafel (Aramaic)',afel:'Afel (Aramaic)',htpe:'Hispeel (Aramaic)',htpa:'Hispaal (Aramaic)'}},
  VT: {he:{perf:'עבר',wqtl:'ו + עבר',impf:'עתיד',wayq:'ו"ההיפוך',impv:'ציווי',infc:'מקור נטוי',infa:'מקור מוחלט',ptca:'בינוני פועל',ptcp:'בינוני פעול'},
       en:{perf:'past',wqtl:'vav + past',impf:'future',wayq:'vav hahipuch',impv:'command',infc:'infinitive (construct)',infa:'infinitive (absolute)',ptca:'active participle',ptcp:'passive participle'}},
  PGN:{he:{p3msg:'הוא',p3fsg:'היא',p2msg:'אתה',p2fsg:'את',p1sg:'אני',p3mpl:'הם',p3fpl:'הן',p3pl:'הם / הן',p2mpl:'אתם',p2fpl:'אתן',p2pl:'אתם / אתן',p1pl:'אנחנו'},
       en:{p3msg:'he',p3fsg:'she',p2msg:'you (m.)',p2fsg:'you (f.)',p1sg:'I',p3mpl:'they (m.)',p3fpl:'they (f.)',p3pl:'they',p2mpl:'you (m. pl.)',p2fpl:'you (f. pl.)',p2pl:'you (pl.)',p1pl:'we'}},
  SFX:{he:{p1sg:'אותי / שלי',p2msg:'אותך / שלך (ז)',p2fsg:'אותך / שלך (נ)',p3msg:'אותו / שלו',p3fsg:'אותה / שלה',p1pl:'אותנו / שלנו',p2mpl:'אתכם / שלכם',p2fpl:'אתכן / שלכן',p3mpl:'אותם / שלהם',p3fpl:'אותן / שלהן',p2sg:'אותך / שלך',p3sg:'שלו / שלה',p3pl:'אותם / שלהם',p2pl:'אתכם / שלכם'},
       en:{p1sg:'me / my',p2msg:'you / your (m.)',p2fsg:'you / your (f.)',p3msg:'him / his',p3fsg:'her',p1pl:'us / our',p2mpl:'you / your (m. pl.)',p2fpl:'you / your (f. pl.)',p3mpl:'them / their (m.)',p3fpl:'them / their (f.)',p2sg:'you / your',p3sg:'his / her',p3pl:'them / their',p2pl:'you / your (pl.)'}},
  GN: {he:{m:'זכר',f:'נקבה'}, en:{m:'masculine',f:'feminine'}},
  NU: {he:{sg:'יחיד',pl:'רבים',du:'זוגי'}, en:{sg:'singular',pl:'plural',du:'dual'}},
  ST: {he:{a:'נפרד',c:'נסמך',e:'מיודע (ארמית)'}, en:{a:'absolute',c:'construct',e:'emphatic (Aramaic)'}}
};
const lab = (d, k) => (DICT[d][LANG] && DICT[d][LANG][k]) || k;

const TENSE_EXPLAIN = {he:{
  perf:'<b>עבר</b> מתאר פעולה שהושלמה. הגוף מסומן בסוף המילה: שָׁמַר (הוא), שָׁמַרְתָּ (אתה), שָׁמַרְתִּי (אני), שָׁמְרוּ (הם).',
  wqtl:'<b>ו + עבר</b> (וְקָטַל). בסיפור ובציווי בתורה ו׳ לפני פועל בעבר בדרך כלל הופכת אותו לעתיד או להמשך ציווי: וְשָׁמַרְתָּ = ותשמור. לא כל ו׳ לפני עבר היא ו׳ ההיפוך. הכלי מסמן כאן כל פועל בעבר שיש לפניו ו׳, ועל הלומד להכריע לפי ההקשר.',
  impf:'<b>עתיד</b> מתאר פעולה שתבוא, או פעולה חוזרת. הגוף מסומן בתחילת המילה באותיות אית"ן: אֶשְׁמֹר, תִּשְׁמֹר, יִשְׁמֹר, נִשְׁמֹר.',
  wayq:'<b>ו"ההיפוך</b> (וַיִּקְטֹל) היא צורת הסיפור הרגילה בתורה. ו׳ בפתח ודגש באות שאחריה (לפני א׳ בקמץ, בלי דגש) הופכים צורת עתיד לעבר: וַיֹּאמֶר = ואמר, וַיָּרָץ = ורץ.',
  impv:'<b>ציווי</b> הוא פקודה, ורק בגוף נוכח: שְׁמֹר, שִׁמְרִי, שִׁמְרוּ. לפעמים נוספת ה׳ בסוף (שָׁמְרָה) או "נא" אחריו.',
  infc:'<b>מקור נטוי</b> הוא שם הפעולה, ובדרך כלל בא עם אות שימוש (לִשְׁמֹר, בִּשְׁמֹר, כִּשְׁמֹר) או עם כינוי (שָׁמְרוֹ = השמירה שלו).',
  infa:'<b>מקור מוחלט</b> בא לרוב לפני פועל מאותו שורש כדי לחזק אותו: שָׁמוֹר תִּשְׁמְרוּן. לפעמים הוא בא במקום ציווי: זָכוֹר, שָׁמוֹר.',
  ptca:'<b>בינוני פועל</b> הוא מי שעושה את הפעולה, ומשמש גם כהווה: שֹׁמֵר, שֹׁמֶרֶת, שֹׁמְרִים. מתאים במין ובמספר.',
  ptcp:'<b>בינוני פעול</b> מתאר מה שהפעולה נעשתה בו, ובא בעיקר בבניין קל: שָׁמוּר, בָּרוּךְ, כָּתוּב.'
}, en:{
  perf:'<b>Past</b> describes a finished action. The person is marked at the end of the word: שָׁמַר (he guarded), שָׁמַרְתָּ (you guarded), שָׁמַרְתִּי (I guarded), שָׁמְרוּ (they guarded).',
  wqtl:'<b>Vav + past</b> (וְקָטַל). In Torah narrative and commands, a vav before a past-tense verb usually turns it into future or a continued command: וְשָׁמַרְתָּ = and you shall guard. Not every vav before a past form is the converting vav; the tool marks every past form with a vav, and the reader decides from context.',
  impf:'<b>Future</b> describes an action still to come, or a repeated action. The person is marked at the start of the word by א, ת, י or נ: אֶשְׁמֹר, תִּשְׁמֹר, יִשְׁמֹר, נִשְׁמֹר.',
  wayq:'<b>Vav hahipuch</b> (וַיִּקְטֹל) is the normal storytelling form in the Torah. A vav with patach and a dagesh in the next letter (before א, a kamatz and no dagesh) turns a future form into past: וַיֹּאמֶר = and he said, וַיָּרָץ = and he ran.',
  impv:'<b>Command</b>, only in the second person: שְׁמֹר, שִׁמְרִי, שִׁמְרוּ. Sometimes a ה is added at the end (שָׁמְרָה) or נא follows.',
  infc:'<b>Infinitive construct</b> is the name of the action, usually with a prefix (לִשְׁמֹר to guard, בִּשְׁמֹר when guarding) or a suffix (שָׁמְרוֹ = his guarding).',
  infa:'<b>Infinitive absolute</b> usually stands before a verb of the same root to strengthen it: שָׁמוֹר תִּשְׁמְרוּן, you shall surely guard. Sometimes it serves as a command: זָכוֹר, שָׁמוֹר.',
  ptca:'<b>Active participle</b>: the one doing the action, also used as present tense: שֹׁמֵר, שֹׁמֶרֶת, שֹׁמְרִים. It agrees in gender and number.',
  ptcp:'<b>Passive participle</b>: what the action was done to, mostly in Kal: שָׁמוּר guarded, בָּרוּךְ blessed, כָּתוּב written.'
}};
const BINYAN_EXPLAIN = {he:{
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
}, en:{
  qal:'<b>Kal</b>: the simple binyan, the plain action. שָׁמַר he guarded.',
  nif:'<b>Nifal</b>: usually the passive or reflexive of Kal. A נ in the past (נִשְׁמַר), and a dagesh in the first root letter in the future (יִשָּׁמֵר).',
  piel:'<b>Piel</b>: a dagesh in the second root letter. Sometimes it intensifies the action or makes it happen. דִּבֵּר, שִׁלַּח.',
  pual:'<b>Pual</b>: the passive of Piel, with a dagesh in the second letter and a u vowel. דֻּבַּר, מְשֻׁלָּח.',
  hif:'<b>Hifil</b>: usually causing someone else to act. A ה in the past (הִקְרִיב), and usually a י before the last letter.',
  hof:'<b>Hofal</b>: the passive of Hifil. הָקְרַב, הֻשְׁלַךְ.',
  hit:'<b>Hispael</b>: an action done to oneself, or with each other. הִתְהַלֵּךְ. Before ס, ש or צ the ת switches places: הִשְׁתַּמֵּר.',
  hsht:'<b>Hishtafel</b>: a special form, mainly in the verb הִשְׁתַּחֲוָה, bowed down.',
  hotp:'<b>Hotpaal</b>: a rare Hispael form with a u vowel: הֻתְפָּקְדוּ.',
  nit:'<b>Nispael</b>: a rare form combining נ and ת.',
  pasq:'<b>Passive Kal</b>: an old passive of Kal, by ETCBC\'s analysis.'
}};

// ---------- state ----------
let state = {p: -1, level: 1, sel: null, entry: null};
try { const s = JSON.parse(localStorage.getItem('tw-state')||'null'); if (s) state.level = s.level ?? 1; } catch(e){}
const save = () => { try { localStorage.setItem('tw-state', JSON.stringify({p:state.p, level:state.level})); } catch(e){} };

// ---------- static text ----------
function applyLang(){
  document.documentElement.lang = LANG;
  document.documentElement.dir = LANG === 'en' ? 'ltr' : 'rtl';
  document.title = L('מילים נדירות בתנ"ך', 'Rare Words in Tanach');
  $('t-title').textContent = L('מילים נדירות בתנ"ך', 'Rare Words in Tanach');
  $('q').placeholder = L('חפש מילה, בכתיב מלא או חסר', 'Search a Hebrew word, full or short spelling');
  $('q').setAttribute('aria-label', L('חיפוש מילה', 'Search'));
  $('t-whole').textContent = L('מילה שלמה', 'Whole word');
  $('t-part').textContent = L('בתוך מילה', 'Inside a word');
  $('t-go').textContent = L('חפש', 'Search');
  $('t-sefer').textContent = L('ספר', 'Sefer');
  $('t-parsha').textContent = L('פרשה', 'Parsha');
  $('lv0').textContent = L('בסיסי', 'Basic');
  $('lv1').textContent = L('הרשימה שלך', 'Your list');
  $('lv2').textContent = L('מורחב', 'Extended');
  $('levelseg').setAttribute('aria-label', L('רמה', 'Level'));
  $('t-card').textContent = L('כרטיס מילה', 'Word card');
  $('listpanel').setAttribute('aria-label', L('רשימת המילים', 'Word list'));
  $('cardpanel').setAttribute('aria-label', L('כרטיס מילה', 'Word card'));
  $('footer').innerHTML = L(
    'הנתונים: ETCBC BHSA 2021 (רישיון CC BY-NC 4.0, שימוש לא מסחרי). רש"י (מהדורת רוזנבאום וזילברמן 1929 עד 1934), תרגום אונקלוס ותרגום JPS 1917: נחלת הכלל, מתוך הארכיון של ספריא. גבולות הפרשיות: ספריא. הרשימות: נבחרו ביד לכל פרשה. המונים בתורה ובתנ"ך נספרים לפי ערך מילוני (לקסמה) של ETCBC. כל הנתונים בתוך הדף, בלי טעינה מבחוץ.',
    'Data: ETCBC BHSA 2021 (CC BY-NC 4.0, non-commercial). Rashi (Rosenbaum and Silbermann edition, 1929 to 1934, Hebrew and English), Targum Onkelos and the JPS 1917 translation: public domain, from the Sefaria archive. Parsha boundaries: Sefaria. Word lists: chosen by hand for each parsha. Torah and Tanach counts are by ETCBC dictionary entry (lexeme). All data is inside the page; nothing loads from outside.');
  document.querySelectorAll('#langseg button').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.lang === LANG)));
}
document.querySelectorAll('#langseg button').forEach(b => b.addEventListener('click', () => {
  if (LANG === b.dataset.lang) return;
  LANG = b.dataset.lang; try { localStorage.setItem('tw-lang', LANG); } catch(e){}
  applyLang();
  const sel = state.sel, entry = state.entry, sv = $('sefer').value;
  fillSefer(); $('sefer').value = sv; fillParsha(+sv); $('parsha').value = state.p;
  if (lastSearch) runSearch(lastSearch, false); else renderList();
  if (sel !== null) { openWord(sel, entry, true); markRowFor(sel); }
}));

// ---------- sefer / parsha pickers ----------
const SEFER_OF_P = D.P.map(p => D.V[p[2]][0]);
function fillSefer(){ $('sefer').innerHTML = D.B.map((b,i) => `<option value="${i}">${bookName(i)}</option>`).join(''); }
function fillParsha(si){
  $('parsha').innerHTML = D.P.map((p,i) => SEFER_OF_P[i]===si ? `<option value="${i}">${parshaName(i)}${D.E[i] ? '' : L(' (אין רשימה)', ' (no list)')}</option>` : '').join('');
}
$('sefer').addEventListener('change', e => { fillParsha(+e.target.value); selectParsha(+$('parsha').value); });
$('parsha').addEventListener('change', e => selectParsha(+e.target.value));
document.querySelectorAll('#levelseg button').forEach(b => b.addEventListener('click', () => { state.level = +b.dataset.lv; save(); lastSearch = null; renderList(); }));

// ---------- tags ----------
function tags(li){
  const x = X(li), out = [];
  if (x.n === 1) out.push(`<span class="tag rare">${L('יחידאי בתנ"ך', 'only once in Tanach')}</span>`);
  else if (x.tn === 1) out.push(`<span class="tag rare">${L('פעם אחת בתורה', 'once in the Torah')}</span>`);
  else if (x.tn <= 5) out.push(`<span class="tag rare">${L('נדיר בתורה', 'rare in the Torah')}</span>`);
  if (x.lang === 'A') out.push(`<span class="tag">${L('ארמית', 'Aramaic')}</span>`);
  return out.join(' ');
}

// ---------- list ----------
const BASIC_MIN = 3;   // basic level: words whose root appears at least 3 times in the Torah
let lastSearch = null;
function renderList(){
  const pi = state.p;
  document.querySelectorAll('#levelseg button').forEach(b => b.setAttribute('aria-pressed', String(+b.dataset.lv === state.level)));
  const P = D.P[pi];
  $('ltitle').textContent = L('פרשת ', 'Parshas ') + parshaName(pi);
  const E = D.E[pi];
  const list = $('list');
  if (!E) {
    $('lcount').textContent = '';
    const cand = D.C[pi] || [];
    list.innerHTML = `<div class="sect">${L('אין רשימה שלך לפרשה הזאת', 'You have no list for this parsha')}${P[0]==='Shemot' ? L(' (הקובץ שמות.docx מכיל שאלות, לא מילים)', ' (the file שמות.docx holds questions, not words)') : ''}. ${L('למטה: מילים נדירות שהכלי מצא בפרשה (שורש שמופיע עד פעמיים בתורה).', 'Below: rare words the tool found in the parsha (roots that appear at most twice in the Torah).')}</div>` + cand.map(candRow).join('');
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
    rows.push(`<div class="sect">${L('מועמדים להוספה: מילים בפרשה ששורשן מופיע עד פעמיים בתורה ואינן ברשימה שלך', 'Candidates to add: words in the parsha whose root appears at most twice in the Torah and are not on your list')} (${cand.length})</div>` + cand.map(candRow).join(''));
  }
  if (missing.length && state.level >= 1) {
    rows.push(`<div class="sect">${L('לבדיקה: לא נמצאו בתורה כפי שנכתבו', 'To check: not found in the Torah as written')} (${missing.length})</div>` + missing.map(o => `<div class="row" tabindex="-1"><div class="w">${esc(o.e.r)}</div><div class="meta"><span class="tag warn">${L('לא נמצא', 'not found')}</span>${L('אולי שגיאת הקלדה, או מילה מרש"י', 'maybe a typo, or a word from Rashi')}</div></div>`).join(''));
  }
  list.innerHTML = rows.join('');
  const nOwn = matched.length, nBasic = matched.filter(o => D.X[o.e.x][5] >= BASIC_MIN).length;
  $('lcount').textContent = state.level === 0 ? L(`${nBasic} מתוך ${nOwn}`, `${nBasic} of ${nOwn}`) : state.level === 2 ? L(`${nOwn} + ${(D.C[pi]||[]).length} מועמדים`, `${nOwn} + ${(D.C[pi]||[]).length} candidates`) : L(`${nOwn} מילים`, `${nOwn} words`);
  $('lvnote').textContent = state.level === 0 ? L(`בסיסי: רק מילים ששורשן מופיע ${BASIC_MIN} פעמים או יותר בתורה, כלומר שווה ללמוד אותן`, `Basic: only words whose root appears ${BASIC_MIN} or more times in the Torah, so they are worth learning`)
    : state.level === 2 ? L('מורחב: הרשימה שלך ועוד מילים נדירות מהפרשה', 'Extended: your list plus more rare words from the parsha')
    : (P[0]==='Lech Lecha' ? L('שתי הרשימות של לך לך מאוחדות כאן', 'Both Lech Lecha lists are merged here') : '');
  bindRows();
}
const counts = x => L(`תורה ${x.tn} · תנ"ך ${x.n}`, `Torah ${x.tn} · Tanach ${x.n}`);
function entryRow(e, i){
  const li = e.x, x = X(li);
  const where = e.w === 'elsewhere' ? `<span class="tag warn">${L('נמצא ב', 'found in ')}${refOfVerse(e.v)}</span>` : '';
  const partial = e.t.filter(t => !t[1].length).map(t => t[0]);
  return `<div class="row" tabindex="0" data-w="${e.h}" data-e="${i}" role="button">
    <div class="w">${esc(e.r)}</div>
    <div class="nums">${counts(x)}</div>
    <div class="meta">${refOfVerse(e.v)} · <span class="f-he" style="font-size:inherit">${esc(x.v)}</span>${LANG === 'en' ? ' · ' + esc(x.g) : ''} ${tags(li)} ${where} ${partial.length ? `<span class="tag warn">${L('לא זוהה: ', 'not matched: ')}${esc(partial.join(' '))}</span>` : ''}</div></div>`;
}
function candRow(wi){
  const [li] = mainPart(wi), x = X(li);
  return `<div class="row" tabindex="0" data-w="${wi}" role="button">
    <div class="w">${esc(D.W[wi].replace('־',''))}</div>
    <div class="nums">${counts(x)}</div>
    <div class="meta">${refOfWord(wi)} · <span class="f-he" style="font-size:inherit">${esc(x.v)}</span>${LANG === 'en' ? ' · ' + esc(x.g) : ''} <span class="tag">${L('מועמד', 'candidate')}</span> ${tags(li)}</div></div>`;
}
function bindRows(){
  $('list').querySelectorAll('.row[data-w]').forEach(r => {
    const go = () => { openWord(+r.dataset.w, (r.dataset.e !== undefined && !lastSearch) ? D.E[state.p][+r.dataset.e] : null); markCurrent(r); };
    r.addEventListener('click', go);
    r.addEventListener('keydown', ev => { if (ev.key === 'Enter' || ev.key === ' ') { ev.preventDefault(); go(); } });
  });
}
function markCurrent(r){
  $('list').querySelectorAll('.row').forEach(x => x.removeAttribute('aria-current'));
  if (r) r.setAttribute('aria-current','true');
}
function markRowFor(wi){ markCurrent($('list').querySelector(`.row[data-w="${wi}"]`)); }
function selectParsha(pi){
  state.p = pi; save(); lastSearch = null;
  $('sefer').value = SEFER_OF_P[pi]; fillParsha(SEFER_OF_P[pi]); $('parsha').value = pi;
  renderList();
  const first = $('list').querySelector('.row[data-w]');
  if (first) first.click();
}

// ---------- word card ----------
function describePart(li, mi){
  const x = X(li), m = M(mi), bits = [];
  if (m.sp === 'verb') {
    bits.push(lab('SP','verb'), lab('VS', m.vs), lab('VT', m.vt));
    const pg = m.ps + m.gn + m.nu;
    if (DICT.PGN.he[pg]) bits.push(lab('PGN', pg));
    else if (m.gn || m.nu) bits.push([m.gn && lab('GN', m.gn), m.nu && lab('NU', m.nu)].filter(Boolean).join(' '));
  } else {
    bits.push(lab('SP', m.sp));
    if (m.gn || m.nu) bits.push([m.gn && lab('GN', m.gn), m.nu && lab('NU', m.nu)].filter(Boolean).join(' '));
    if (m.st) bits.push(lab('ST', m.st));
  }
  if (m.sfx) bits.push(L('כינוי: ', 'suffix: ') + lab('SFX', m.sfx));
  return {lex: x.v, gloss: x.g, desc: bits.filter(Boolean).join(', ')};
}
function openWord(wi, entry, keepScroll){
  state.sel = wi; state.entry = entry;
  const v = wordVerse[wi];
  const hits = new Set(entry ? entry.t.flatMap(t => t[1]) : [wi]);
  hits.add(wi);
  const [li, mi] = mainPart(wi);
  const x = X(li);
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
  const jps = TX && TX.j[v] ? `<div><p class="h3">${L('הפסוק באנגלית', 'The pasuk in English')}</p><div class="en-text">${esc(TX.j[v])}</div><div class="src">JPS 1917</div></div>` : '';
  $('card').innerHTML = `
    <div><div class="big">${esc(D.W[wi].replace('־',''))}</div>
      <div class="note">${refOfVerse(v)} · ${L('פרשת ', 'Parshas ')}${parshaName(pi)}${entry ? L(' · מהרשימה שלך: ', ' · from your list: ') + `<span class="f-he" style="font-size:inherit">${esc(entry.r)}</span>` : ''}</div></div>
    <div class="pasuk" id="pasuk">${pasuk.trim()}׃</div>
    ${LANG === 'en' ? jps : ''}
    ${LANG === 'en' ? `<div><p class="h3">Meaning</p><div><span class="f-he">${esc(x.v)}</span>: <b>${esc(x.g)}</b> <span class="src">(ETCBC gloss)</span></div></div>` : ''}
    ${rashiBlock(v, wi)}
    ${onkelosBlock(v)}
    ${thesaurusBlock(li)}
    <div><p class="h3">${L('פירוק המילה', 'Parts of the word')}</p><ul style="margin:0;padding-inline-start:18px">${parts}</ul></div>
    <dl class="kv">
      <dt>${L('ערך מילוני', 'Dictionary form')}</dt><dd><span class="f-he">${esc(x.v)}</span> · ${lab('SP', x.sp)} · ${L('באנגלית (ETCBC)', 'English (ETCBC)')}: ${esc(x.g)}</dd>
      <dt>${L('בתורה', 'In the Torah')}</dt><dd>${x.tn} ${L('פעמים', 'times')} ${tags(li)}</dd>
      <dt>${L('בכל התנ"ך', 'In all of Tanach')}</dt><dd>${x.n} ${L('פעמים', 'times')}</dd>
      ${fam ? `<dt>${L('אותן אותיות', 'Same letters')}</dt><dd>${fam}</dd>` : ''}
    </dl>
    <div><p class="h3">${L('כל הצורות של ', 'Every form of ')}<span class="f-he" style="font-size:inherit">${esc(x.v)}</span>${L(' שכתובות בתנ"ך', ' written in Tanach')}</p>${formsTable(li, D.W[wi], mi)}</div>
    <div id="refbox"></div>
    <div id="conjwrap">${x.sp === 'verb' ? conjugation(li, mi, D.W[wi]) : noConj(li, wi)}</div>`;
  $('pasuk').querySelectorAll('span[data-w]').forEach(s => s.addEventListener('click', () => openWord(+s.dataset.w, null)));
  bindCard(li);
  if (!keepScroll && window.innerWidth <= 860) $('card').scrollIntoView({behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block:'start'});
}
function family(li){
  const base = D.X[li][0].replace(/[\[\/=]+$/,'');
  const out = [];
  D.X.forEach((r, i) => { if (i !== li && r[0].replace(/[\[\/=]+$/,'') === base) out.push(`<a class="fam" data-l="${i}" style="cursor:pointer;color:var(--accent);text-decoration:underline"><span class="f-he">${esc(r[1])}</span></a> (${lab('SP', r[3])}, ${esc(r[2])}, ×${r[5]} ${L('בתורה', 'in the Torah')})`); });
  return out.join(' · ');
}

// ---------- Rashi on the pasuk: the comment on this word first ----------
function rashiBlock(v, wi){
  if (!TX) return '';
  const he = TX.rh[v] || [], en = TX.re[v] || [];
  if (!he.length) return `<div><p class="h3">${L('רש"י', 'Rashi')}</p><p class="note">${L('אין רש"י על הפסוק הזה.', 'Rashi has no comment on this pasuk.')}</p></div>`;
  const wc = cons(D.W[wi]), wr = relaxed(D.W[wi]);
  const matches = he.map(([dh]) => cons(dh) ? dh.split(/\s+/).some(tok => { const c = cons(tok), r = relaxed(tok); return c && (c === wc || (r.length > 2 && r === wr) || preOk(wc, c) || preOk(c, wc)); }) : false);
  const item = (i, isMatch) => {
    const [dh, body] = he[i];
    const heHtml = `<div class="rashi-he"><span class="dh">${esc(dh)}</span> ${esc(body)}</div>`;
    const enHtml = en[i] ? `<div class="en-text">${esc(en[i][0] ? en[i][0] + ' ' + en[i][1] : en[i][1])}</div>` : '';
    return `<div class="item ${isMatch ? 'match' : ''}">${LANG === 'en' ? enHtml + heHtml : heHtml}</div>`;
  };
  const mIdx = matches.map((m, i) => m ? i : -1).filter(i => i >= 0);
  const others = he.map((_, i) => i).filter(i => !matches[i]);
  let h = `<div><p class="h3">${L('רש"י', 'Rashi')}</p><div class="rashi">`;
  if (mIdx.length) h += `<div class="note">${L('רש"י על המילה הזאת:', 'Rashi on this word:')}</div>` + mIdx.map(i => item(i, true)).join('');
  else h += `<div class="note">${L('רש"י אינו מפרש את המילה הזאת בפסוק הזה.', 'Rashi does not comment on this word in this pasuk.')}</div>`;
  if (others.length) h += `<details><summary>${L(`עוד רש"י על הפסוק (${others.length})`, `More Rashi on this pasuk (${others.length})`)}</summary><div class="rashi">${others.map(i => item(i, false)).join('')}</div></details>`;
  return h + `</div><div class="src">${L('רש"י, מהדורת רוזנבאום וזילברמן', 'Rashi, Rosenbaum and Silbermann edition')}${LANG === 'en' ? ', English translation by the same editors' : ''}</div></div>`;
}
// ---------- Targum Onkelos on the whole pasuk ----------
function onkelosBlock(v){
  if (!TX) return '';
  const o = TX.o[v];
  return `<div><p class="h3">${L('תרגום אונקלוס', 'Targum Onkelos')}</p>${o ? `<div class="onk">${esc(o)}</div><div class="src">${L('אונקלוס מתרגם את כל הפסוק, והמילה שבחרת מתורגמת בתוכו.', 'Onkelos translates the whole pasuk; the word you chose is translated inside it.')}</div>` : `<p class="note">${L('אין תרגום לפסוק הזה בנתונים (חלוקת הפסוקים שונה).', 'No Onkelos for this pasuk in the data (the verse numbering differs).')}</p>`}</div>`;
}
// ---------- thesaurus: other words ETCBC translates the same way ----------
const GLOSS_INDEX = new Map();
D.X.forEach((r, i) => { if (r[3] === 'nmpr' || !r[2]) return; const g = r[2].toLowerCase().trim(); if (!GLOSS_INDEX.has(g)) GLOSS_INDEX.set(g, []); GLOSS_INDEX.get(g).push(i); });
function thesaurusBlock(li){
  const g = (D.X[li][2] || '').toLowerCase().trim();
  const same = (GLOSS_INDEX.get(g) || []).filter(i => i !== li && D.X[i][1] !== D.X[li][1]);
  const head = `<p class="h3">${L('מילים באותה משמעות', 'Words with the same meaning')}</p>`;
  if (!same.length) return `<div>${head}<p class="note">${L(`אין בתורה מילה אחרת שמתורגמת "${esc(g)}" לפי ETCBC.`, `No other word in the Torah has the ETCBC gloss "${esc(g)}".`)}</p></div>`;
  return `<div>${head}<div class="thes">${same.sort((a,b) => D.X[b][5] - D.X[a][5]).slice(0, 20).map(i => `<span><a class="thes-l" data-l="${i}"><span class="f-he">${esc(D.X[i][1])}</span></a> <span class="note">(${lab('SP', D.X[i][3])}, ×${D.X[i][5]} ${L('בתורה', 'in the Torah')})</span></span>`).join(' · ')}</div>
    <div class="src">${L(`מילים שהתרגום של ETCBC שלהן הוא "${esc(g)}", כמו המילה הזאת. התאמה לפי התרגום, לא קביעה שהמשמעות זהה בכל מקום.`, `Words whose ETCBC gloss is "${esc(g)}", like this word. A match by translation, not a claim that the meaning is identical everywhere.`)}</div></div>`;
}

// all forms of a lexeme, Torah + Nach
function formsOf(li){ return (D.FO[li] || []).map(f => ({mi:f[0], m:M(f[0]), t:f[1], tn:f[2], nn:f[3], refs:f[4] || []})); }
function formsTable(li, curText, curMi){
  const fs = formsOf(li).sort((a,b) => (b.tn - a.tn) || (b.nn - a.nn));
  const cur = cons(curText);
  const rows = fs.slice(0, 200).map((f, i) => {
    const d = describePart(li, f.mi);
    return `<tr><td><span class="f ${(cons(f.t)===cur && f.mi===curMi) ? 'cur':''}" data-fi="${i}">${esc(f.t.replace('־',''))}</span></td><td>${esc(d.desc)}</td>
      <td class="nums">${f.tn ? `<button type="button" class="cnt" data-fi="${i}" data-where="torah" title="${L('הצג את המקומות בתורה', 'Show the places in the Torah')}">${f.tn}</button>` : ''}</td>
      <td class="nums">${f.nn ? `<button type="button" class="cnt" data-fi="${i}" data-where="nach" title="${L('הצג את המקומות בנביאים וכתובים', 'Show the places in Nevi\'im and Kesuvim')}">${f.nn}</button>` : ''}</td></tr>`;
  }).join('');
  return `<div class="scroll formsbox"><table id="ftable"><thead><tr><th>${L('צורה', 'Form')}</th><th>${L('ניתוח', 'Parsing')}</th><th>${L('בתורה', 'Torah')}</th><th>${L('בנביאים וכתובים', 'Nevi\'im and Kesuvim')}</th></tr></thead><tbody>${rows}</tbody></table></div>
    <p class="note">${L('לחיצה על מספר מציגה את כל המקומות. לחיצה על הצורה מציגה את כל המקומות שלה בתורה ובנביאים וכתובים.', 'Click a number to list every place. Click a form to list all its places in the Torah and in Nevi\'im and Kesuvim.')}</p>
    ${fs.length > 200 ? `<p class="note">${L(`מוצגות 200 הצורות הנפוצות מתוך ${fs.length}.`, `Showing the 200 most common forms of ${fs.length}.`)}</p>` : ''}`;
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
      let Lt = R[idx];
      if (idx === 2 && !/[א-ת123]/.test(rest) && TOFIN[L[0]]) Lt = TOFIN[Lt[0]] + Lt.slice(1);
      const dg = mark === '*' || (mark === '~' && 'בגדכפת'.includes(R[idx][0]));
      out += Lt + (dg ? 'ּ' : '');
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


function weakReason(R){
  if (R.length !== 3) return L('השורש אינו בן שלוש אותיות', 'the root does not have three letters');
  const b = R.map(r => r[0]);
  if (b.some(c => 'אהחע'.includes(c))) return L('יש בשורש אות גרונית (א׳ ה׳ ח׳ ע׳)', 'the root has a guttural letter (א ה ח ע)');
  if (b[0] === 'ר' || b[1] === 'ר') return L('ר׳ בתחילת השורש או באמצעו', 'the root has ר as its first or second letter');
  if ('יונ'.includes(b[0])) return L('האות הראשונה של השורש היא י׳, ו׳ או נ׳', 'the first root letter is י, ו or נ');
  if ('וי'.includes(b[1])) return L('האות האמצעית של השורש היא ו׳ או י׳', 'the middle root letter is ו or י');
  if ('יונת'.includes(b[2])) return L('האות האחרונה של השורש היא י׳, ו׳, נ׳ או ת׳', 'the last root letter is י, ו, נ or ת');
  if (b[1] === b[2]) return L('שורש כפול (שתי האותיות האחרונות שוות)', 'a doubled root (the last two letters are the same)');
  return '';
}

function conjugation(li, mi, curText){
  const m = M(mi), fs = formsOf(li).filter(f => f.m.sp === 'verb');
  const order = s => { const i = Object.keys(DICT.VS.he).indexOf(s); return i < 0 ? 99 : i; };
  const attested = [...new Set(fs.map(f => f.m.vs))].sort((a,b) => order(a) - order(b));
  const R = rootOf(li), weak = weakReason(R);
  conjState = {vs: m.vs, tense: m.vt, li, curText, curMi: mi, attested, R, weak, aClass: qalAClass(li, R)};
  return `<div><p class="h3">${L('טבלת נטייה של ', 'Conjugation table of ')}<span class="f-he" style="font-size:inherit">${esc(X(li).v)}</span></p>
    <div class="bar" style="margin:0 0 8px">
      <div class="seg" role="group" aria-label="${L('מה להציג בטבלה', 'What the table shows')}">
        <button type="button" id="cm-real" data-cm="real">${L('רק מה שבמקרא', 'Only what is in Tanach')}</button>
        <button type="button" id="cm-full" data-cm="full">${L('טבלה מלאה', 'Full table')}</button>
      </div>
      <span class="note" id="cmnote"></span>
    </div>
    <div class="builder" id="builder"></div>
    <div class="vsum" id="vsum"></div>
    <div class="tabs" id="vstabs"></div>
    <div class="explain" id="binyanx"></div>
    <div id="conjgrid" style="margin-top:10px"></div>
    <div class="explain" id="tensex" style="margin-top:10px"></div>
    <p class="note">${L('צורה מודגשת = הצורה שבחרת. מספר = כמה פעמים בתורה, ובסוגריים כמה בנביאים וכתובים.', 'Highlighted form = the form you chose. Number = times in the Torah; in brackets, times in Nevi\'im and Kesuvim.')} <span class="f g" style="font-size:14px">${L('צורה במסגרת מקווקוות', 'A form in a dashed box')}</span> ${L('= נבנתה לפי דגם השלמים ואינה כתובה בתנ"ך (בלי טעמים ובלי צורות הפסק). לחיצה על כותרת עמודה מסבירה את הזמן.', '= built from the regular pattern and not written in Tanach (no cantillation, no pausal forms). Click a column heading to explain the tense.')}</p></div>`;
}
function renderTabs(){
  const {li, attested} = conjState;
  const fs = formsOf(li).filter(f => f.m.sp === 'verb');
  const stems = conjMode === 'full' ? [...attested, ...MAIN7.filter(s => !attested.includes(s))] : attested;
  if (!stems.includes(conjState.vs)) conjState.vs = stems[0];
  $('vstabs').innerHTML = stems.map(s => {
    const n = fs.filter(f => f.m.vs === s).reduce((a,f) => a + f.tn + f.nn, 0);
    return `<button type="button" data-vs="${s}" aria-pressed="${s===conjState.vs}" ${n ? '' : 'class="g"'}>${lab('VS', s)} ${n ? `(${n})` : L('(לא במקרא)', '(not in Tanach)')}</button>`;
  }).join('');
  $('vstabs').querySelectorAll('button').forEach(b => b.addEventListener('click', () => { conjState.vs = b.dataset.vs; if (conjState.b) conjState.b.vs = b.dataset.vs; renderTabs(); renderConj(); renderBuilder(); }));
  // one line with every real form, grouped by binyan, so nothing hides behind a tab
  $('vsum').innerHTML = `<span class="note">${L('בתנ"ך לפי בניין: ', 'In Tanach by binyan: ')}</span>` + attested.map(s => {
    const list = fs.filter(f => f.m.vs === s).sort((a,b) => (b.tn+b.nn) - (a.tn+a.nn));
    const n = list.reduce((a,f) => a + f.tn + f.nn, 0);
    const shown = list.slice(0, 3).map(f => `<span class="f-he">${esc(f.t.replace('־',''))}</span>`).join(', ');
    return `<a data-vs="${s}" class="vlink"><b>${lab('VS', s)}</b> ×${n}: ${shown}${list.length > 3 ? ' ...' : ''}</a>`;
  }).join(' · ');
  $('vsum').querySelectorAll('a').forEach(a => a.addEventListener('click', () => { conjState.vs = a.dataset.vs; if (conjState.b) conjState.b.vs = a.dataset.vs; renderTabs(); renderConj(); renderBuilder(); }));
  document.querySelectorAll('[data-cm]').forEach(b => b.setAttribute('aria-pressed', String(b.dataset.cm === conjMode)));
  const canGen = !conjState.weak;
  $('cmnote').textContent = conjMode === 'real' ? L('מוצגות רק שורות ועמודות שיש בהן צורה מהמקרא', 'Showing only rows and columns that have a form from Tanach')
    : canGen ? L('משבצות ריקות מולאו בצורות בנויות, מסומנות בקו מקווקו', 'Empty cells are filled with constructed forms, marked with a dashed box')
    : L(`השורש ${conjState.R.join('')} אינו שלם: ${conjState.weak}. הכלי עדיין לא בונה צורות לשורש כזה, כדי לא להציג צורה שגויה. מוצגות רק צורות מהמקרא.`,
        `The root ${conjState.R.join('')} is not a regular root: ${conjState.weak}. The tool does not build forms for such a root yet, so as not to show a wrong form. Only forms from Tanach are shown.`);
}
function renderConj(){
  const {li, vs, curText, R, weak, aClass} = conjState;
  const g = $('conjgrid'); if (!g) return;
  const cur = cons(curText);
  const fs = formsOf(li).filter(f => f.m.sp === 'verb' && f.m.vs === vs);
  const full = conjMode === 'full', canGen = full && !weak;
  const attestedCell = (list, vt, key) => '<td>' + list.slice(0,6).map(f => `<span class="f ${(cons(f.t)===cur && f.mi===conjState.curMi)?'cur':''}" data-vt="${vt}" data-key="${key}" title="${esc(describePart(li,f.mi).desc)}">${esc(f.t.replace('־',''))}</span><span class="c">${f.tn||''}${f.nn?` (${f.nn})`:''}</span>`).join('<br>') + (list.length>6?`<br><span class="c">${L('ועוד ', 'and ')}${list.length-6}${L('', ' more')}</span>`:'') + '</td>';
  const cell = (pred, vt, key) => {
    const list = fs.filter(pred).sort((a,b) => (b.tn+b.nn) - (a.tn+a.nn));
    if (list.length) return attestedCell(list, vt, key);
    if (canGen) { const gform = genForm(vs, vt, key, R, aClass); if (gform) return `<td><span class="f g" data-vt="${vt}" data-key="${key}" title="${L('נבנה לפי הדגם. לא כתוב בתנ״ך', 'Built from the pattern. Not written in Tanach')}">${esc(gform)}</span></td>`; }
    return '<td class="empty">·</td>';
  };
  const pgn = f => f.m.ps + f.m.gn + f.m.nu;
  const has = (t, r) => fs.some(f => f.m.vt === t && (r === undefined || pgn(f) === r));
  const cols = full ? FIN_T.filter(t => t !== 'impv' || IMPV[vs] || has('impv')) : FIN_T.filter(t => has(t));
  const rows = full ? FULL_ROWS.concat(fs.some(f => pgn(f) === 'p2pl') ? ['p2pl'] : [])
                    : ROWS.filter(r => cols.some(t => has(t, r)));
  let h = '';
  if (cols.length && rows.length) {
    h += `<div class="scroll"><table><thead><tr><th></th>${cols.map(t => `<th class="click" data-t="${t}">${lab('VT', t)}</th>`).join('')}</tr></thead><tbody>`;
    for (const r of rows) h += `<tr><th>${lab('PGN', r)}</th>${cols.map(t => {
      const perfLike = t === 'perf' || t === 'wqtl';
      if ((t === 'impv' && !r.startsWith('p2')) || (perfLike && IMPF_ONLY.has(r) && !has(t, r)) || (!perfLike && PERF_ONLY.has(r) && !has(t, r))) return '<td class="na">-</td>';
      return cell(f => f.m.vt === t && pgn(f) === r, t, r);
    }).join('')}</tr>`;
    h += '</tbody></table></div>';
  }
  const PT = [['msg', L('יחיד', 'm. sg.')],['fsg', L('יחידה', 'f. sg.')],['mpl', L('רבים', 'm. pl.')],['fpl', L('רבות', 'f. pl.')]];
  const nfCols = ['infc','infa','ptca','ptcp']
    .filter(t => full ? (has(t) || (canGen && (t==='infc'?INFC:t==='infa'?INFA:t==='ptca'?PTCA:PTCP)[vs])) : has(t));
  if (nfCols.length) {
    h += `<div class="scroll" style="margin-top:8px"><table><thead><tr>${nfCols.map(t => `<th class="click" data-t="${t}">${lab('VT', t)}</th>`).join('')}</tr></thead><tbody><tr>`;
    for (const t of nfCols) {
      if (t === 'infc' || t === 'infa') { h += cell(f => f.m.vt === t, t, ''); continue; }
      const parts = PT.map(([k,l]) => { const c = cell(f => f.m.vt === t && (f.m.gn + f.m.nu) === k, t, k); return c.includes('class="empty"') ? '' : `<div class="c">${l}</div>${c.replace(/^<td>|<\/td>$/g,'')}`; }).join('');
      h += `<td>${parts || '·'}</td>`;
    }
    h += '</tr></tbody></table></div>';
  }
  g.innerHTML = h || `<p class="note">${L('אין בבניין הזה צורות להציג.', 'No forms to show in this binyan.')}</p>`;
  g.querySelectorAll('.f[data-vt]').forEach(s => s.addEventListener('click', () => { setBuilder(vs, s.dataset.vt, s.dataset.key); $('builder').scrollIntoView({block:'nearest'}); }));
  $('binyanx').innerHTML = BINYAN_EXPLAIN[LANG][vs] || `<b>${lab('VS', vs)}</b>`;
  $('tensex').innerHTML = TENSE_EXPLAIN[LANG][conjState.tense] || TENSE_EXPLAIN[LANG].perf;
  g.querySelectorAll('th.click').forEach(th => th.addEventListener('click', () => { conjState.tense = th.dataset.t; $('tensex').innerHTML = TENSE_EXPLAIN[LANG][th.dataset.t]; }));
}

// ---------- conjugation builder: pick binyan, tense, person; see the form and why ----------
const ALL_T = ['perf','wqtl','impf','wayq','impv','infc','infa','ptca','ptcp'];
const KEYS_FOR = t => (t === 'perf' || t === 'wqtl') ? ['p3msg','p3fsg','p2msg','p2fsg','p1sg','p3pl','p2mpl','p2fpl','p1pl']
  : (t === 'impf' || t === 'wayq') ? ['p3msg','p3fsg','p2msg','p2fsg','p1sg','p3mpl','p3fpl','p2mpl','p2fpl','p1pl']
  : t === 'impv' ? ['p2msg','p2fsg','p2mpl','p2fpl'] : (t === 'ptca' || t === 'ptcp') ? ['msg','fsg','mpl','fpl'] : [''];
const KEY_LABEL = k => DICT.PGN.he[k] ? lab('PGN', k) : ({msg:L('יחיד', 'masculine singular'), fsg:L('יחידה', 'feminine singular'), mpl:L('רבים', 'masculine plural'), fpl:L('רבות', 'feminine plural'), '':L('(אין גוף)', '(no person)')}[k]);
const MARK = {he:{
  perf:{p3msg:'בלי סיומת', p3fsg:'סיומת ־ָה', p2msg:'סיומת ־תָּ', p2fsg:'סיומת ־תְּ', p1sg:'סיומת ־תִּי', p3pl:'סיומת ־וּ', p2mpl:'סיומת ־תֶּם', p2fpl:'סיומת ־תֶּן', p1pl:'סיומת ־נוּ'},
  impf:{p3msg:'תחילית י׳', p3fsg:'תחילית ת׳', p2msg:'תחילית ת׳', p2fsg:'תחילית ת׳ וסיומת ־ִי', p1sg:'תחילית א׳', p3mpl:'תחילית י׳ וסיומת ־וּ', p3fpl:'תחילית ת׳ וסיומת ־נָה', p2mpl:'תחילית ת׳ וסיומת ־וּ', p2fpl:'תחילית ת׳ וסיומת ־נָה', p1pl:'תחילית נ׳'},
  impv:{p2msg:'בלי סיומת', p2fsg:'סיומת ־ִי', p2mpl:'סיומת ־וּ', p2fpl:'סיומת ־נָה'},
  ptc:{msg:'בלי סיומת', fsg:'סיומת ־ֶת (או ־ָה)', mpl:'סיומת ־ִים', fpl:'סיומת ־וֹת'},
  wqtl:'ו׳ בתחילה, ו', wayq:'וַ בתחילה ודגש באות שאחריה, ו'
}, en:{
  perf:{p3msg:'no ending', p3fsg:'ending ־ָה', p2msg:'ending ־תָּ', p2fsg:'ending ־תְּ', p1sg:'ending ־תִּי', p3pl:'ending ־וּ', p2mpl:'ending ־תֶּם', p2fpl:'ending ־תֶּן', p1pl:'ending ־נוּ'},
  impf:{p3msg:'prefix י', p3fsg:'prefix ת', p2msg:'prefix ת', p2fsg:'prefix ת and ending ־ִי', p1sg:'prefix א', p3mpl:'prefix י and ending ־וּ', p3fpl:'prefix ת and ending ־נָה', p2mpl:'prefix ת and ending ־וּ', p2fpl:'prefix ת and ending ־נָה', p1pl:'prefix נ'},
  impv:{p2msg:'no ending', p2fsg:'ending ־ִי', p2mpl:'ending ־וּ', p2fpl:'ending ־נָה'},
  ptc:{msg:'no ending', fsg:'ending ־ֶת (or ־ָה)', mpl:'ending ־ִים', fpl:'ending ־וֹת'},
  wqtl:'a vav at the start, and ', wayq:'וַ at the start with a dagesh in the next letter, and '
}};
function markFor(vt, key){
  const mk = MARK[LANG];
  if (vt === 'perf') return mk.perf[key];
  if (vt === 'wqtl') return mk.wqtl + mk.perf[key];
  if (vt === 'impf') return mk.impf[key];
  if (vt === 'wayq') return mk.wayq + mk.impf[key];
  if (vt === 'impv') return mk.impv[key];
  if (vt === 'ptca' || vt === 'ptcp') return mk.ptc[key];
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
    out = real.slice(0, 4).map((f, i) => `<span class="form">${esc(f.t.replace('־',''))}</span><span class="tag">${L('כתוב בתנ"ך: ', 'in Tanach: ')}${f.tn ? L(`${f.tn} בתורה`, `${f.tn} in the Torah`) : ''}${f.tn && f.nn ? ', ' : ''}${f.nn ? L(`${f.nn} בנ"ך`, `${f.nn} in Nevi'im and Kesuvim`) : ''}</span> <a class="vlink" data-ri="${i}" style="cursor:pointer;color:var(--accent);text-decoration:underline">${L('איפה?', 'Where?')}</a>`).join('<br>');
  } else if (gen) {
    out = `<span class="form g">${esc(gen)}</span><span class="tag warn">${L('לא במקרא. נבנה לפי דגם השלמים', 'Not in Tanach. Built from the regular pattern')}</span>`;
  } else if (weak) {
    out = `<span class="note">${L(`הצורה הזאת לא כתובה בתנ"ך, והשורש ${R.join('')} אינו שלם (${weak}), לכן הכלי לא בונה אותה.`, `This form is not written in Tanach, and the root ${R.join('')} is not regular (${weak}), so the tool does not build it.`)}</span>`;
  } else {
    out = `<span class="note">${L(`אין צורה כזאת בבניין ${lab('VS', vs)}.`, `There is no such form in ${lab('VS', vs)}.`)}</span>`;
  }
  const mk = markFor(vt, key);
  box.innerHTML = `<div class="h3" style="margin:0">${L('בונה צורות: בחר בניין, זמן וגוף', 'Form builder: pick a binyan, tense and person')}</div>
    <div class="sels">
      <label class="note" for="b-vs">${L('בניין', 'Binyan')}</label><select id="b-vs">${stems.map(s => `<option value="${s}" ${s===vs?'selected':''}>${lab('VS', s)}${attested.includes(s) ? '' : L(' (לא במקרא)', ' (not in Tanach)')}</option>`).join('')}</select>
      <label class="note" for="b-vt">${L('זמן', 'Tense')}</label><select id="b-vt">${ALL_T.map(t => `<option value="${t}" ${t===vt?'selected':''}>${lab('VT', t)}</option>`).join('')}</select>
      <label class="note" for="b-key">${L('גוף', 'Person')}</label><select id="b-key">${keys.map(k => `<option value="${k}" ${k===key?'selected':''}>${KEY_LABEL(k)}</option>`).join('')}</select>
      <label class="note" for="b-root">${L('שורש אחר', 'Another root')}</label><input id="b-root" placeholder="${L('למשל שמר', 'e.g. שמר')}" value="">
    </div>
    <div class="out">${out}</div>
    <div class="why"><b>${lab('VS', vs)}</b>, <b>${lab('VT', vt)}</b>${key ? `, <b>${KEY_LABEL(key)}</b>` : ''}${mk ? `: ${mk}.` : '.'} <span class="note">${(BINYAN_EXPLAIN[LANG][vs]||'').replace(/<[^>]+>/g,'')}</span></div>
    <div class="why note">${(TENSE_EXPLAIN[LANG][vt]||'').replace(/<[^>]+>/g,'')}</div>`;
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
  $('builder').querySelector('.out').innerHTML = `<span class="note">${L(`השורש ${esc(c)} לא נמצא כפועל בתורה. נסה בחיפוש למעלה.`, `The root ${esc(c)} was not found as a verb in the Torah. Try the search at the top.`)}</span>`;
}
// no table for a word that is not a verb in this pasuk: say why, and offer a related verb
const baseKey = k => k.replace(/[\[\/=]+$/, '');
// verbs that may share this word's root: ETCBC's root when it gives one, otherwise the same letters,
// also trying the word without a final ה or ת (feminine endings), which is a guess and is labeled as one
function relatedVerbs(li){
  const r = D.X[li][7], stem = baseKey(D.X[li][0]);
  const sure = r ? [r] : [stem];
  const guess = r ? [] : [stem.replace(/[HT]$/, ''), stem.replace(/WT$/, '')].filter(s => s && s !== stem);
  const out = [];
  D.X.forEach((x, i) => {
    if (i === li || x[3] !== 'verb') return;
    const vb = baseKey(x[0]);
    if (sure.includes(vb)) out.push({i, how: r ? 'root' : 'same'});
    else if (guess.includes(vb)) out.push({i, how: 'guess'});
  });
  return out;
}
function noConj(li, wi){
  const x = X(li), rel = relatedVerbs(li);
  const what = lab('SP', x.sp);
  let h = `<div class="explain">${L(`<b>אין כאן טבלת נטייה.</b> בפסוק הזה המילה <span class="f-he">${esc(D.W[wi].replace('־',''))}</span> היא ${what}, לא פועל (לפי הניתוח של ETCBC לפסוק הזה), וטבלת נטייה בנויה רק לפועל.`,
    `<b>No conjugation table here.</b> In this pasuk the word <span class="f-he">${esc(D.W[wi].replace('־',''))}</span> is a ${what}, not a verb (by ETCBC's reading of this pasuk), and the table is built only for verbs.`)}`;
  if (x.sp === 'subs' || x.sp === 'adjv') h += L(' כל הצורות של המילה כשם (יחיד, רבים, נסמך, עם כינוי) נמצאות ברשימת הצורות למעלה.', ' All its forms as a noun (singular, plural, construct, with suffixes) are in the list of forms above.');
  if (rel.length) {
    const HOW = {root:L('לפי ETCBC זה אותו שורש', 'ETCBC gives the same root'), same:L('אותן אותיות. לפעמים אותו שורש ולפעמים לא (למשל גֹּמֶא, צמח, לעומת גמא, שתה)', 'the same letters; sometimes the same root and sometimes not (for example גֹּמֶא papyrus versus גמא drink)'), guess:L('אותיות דומות בלי הסיומת ה׳ או ת׳. ניחוש, לא קביעה', 'similar letters without a final ה or ת; a guess, not a ruling')};
    h += `<br>${L('יש פועל בתורה שאולי קשור. הוא מוצג בנפרד, לא במקום המילה שבפסוק:', 'There is a verb in the Torah that may be related. It is shown separately, not in place of the word in the pasuk:')}`;
    h += '<div class="tabs" style="margin-top:6px;flex-direction:column;align-items:flex-start">' + rel.map(o => `<button type="button" class="relv" data-l="${o.i}">${L('טבלת נטייה של הפועל ', 'Conjugation table of the verb ')}<span class="f-he">${esc(D.X[o.i][1])}</span> (${esc(D.X[o.i][2])}, ×${D.X[o.i][4]} ${L('בתנ"ך', 'in Tanach')}): ${HOW[o.how]}</button>`).join('') + '</div>';
  } else {
    h += '<br>' + L('לא נמצא בתורה פועל מאותו שורש. אם השם נגזר מפועל באופן אחר, חפשו את הפועל בחיפוש למעלה.', 'No verb from the same root was found in the Torah. If the noun comes from a verb some other way, look the verb up with the search at the top.');
  }
  return h + '</div>';
}
function showRelatedConj(l2){
  const vf = formsOf(l2).filter(f => f.m.sp === 'verb').sort((a,b) => (b.tn+b.nn) - (a.tn+a.nn));
  if (!vf.length) return;
  const note = `<div class="explain">${L('טבלת הנטייה של הפועל ', 'Conjugation table of the verb ')}<span class="f-he">${esc(D.X[l2][1])}</span>${L(', שאולי קשור למילה. המילה שבחרת בפסוק עצמה אינה פועל.', ', which may be related to the word. The word you chose in the pasuk is itself not a verb.')}</div>`;
  $('conjwrap').innerHTML = note + conjugation(l2, vf[0].mi, '');
  bindConj();
}
function bindConj(){
  if (!$('vstabs')) return;
  document.querySelectorAll('[data-cm]').forEach(b => b.addEventListener('click', () => {
    conjMode = b.dataset.cm; try { localStorage.setItem('tw-conj', conjMode); } catch(e){}
    renderTabs(); renderConj();
  }));
  renderTabs(); renderConj(); renderBuilder();
}
function bindCard(li){
  bindConj();
  document.querySelectorAll('.relv').forEach(b => b.addEventListener('click', () => showRelatedConj(+b.dataset.l)));
  const fs = formsOf(li).sort((a,b) => (b.tn - a.tn) || (b.nn - a.nn));
  document.querySelectorAll('#ftable .f').forEach(s => s.addEventListener('click', () => showRefs(li, fs[+s.dataset.fi])));
  document.querySelectorAll('#ftable .cnt').forEach(s => s.addEventListener('click', () => showRefs(li, fs[+s.dataset.fi], s.dataset.where)));
  document.querySelectorAll('.fam, .thes-l').forEach(a => a.addEventListener('click', () => {
    const l = +a.dataset.l; const wi = firstWordOfLex(l); if (wi >= 0) openWord(wi, null);
  }));
}
function firstWordOfLex(l){ for (let i = 0; i < NW; i++) if (D.WP[i].some(p => p[0]===l)) return i; return -1; }
const sefariaUrl = (en, ch, vs) => `https://www.sefaria.org/${encodeURIComponent(en.replace(/ /g,'_'))}.${ch}.${vs}?lang=${LANG === 'en' ? 'bi' : 'he'}`;
function showRefs(li, f, where){
  const target = cons(f.t), out = [];
  for (let i = 0; i < NW; i++) if (D.WP[i].some(p => p[0]===li && p[1]===f.mi) && cons(D.W[i])===target) out.push(i);
  const torah = `<div><p class="h3" style="margin:6px 0 4px">${L(`בתורה: ${f.tn} פעמים`, `In the Torah: ${f.tn} ${f.tn===1?'time':'times'}`)}</p>
    <div class="refs">${out.map(i => `<a data-w="${i}">${refOfWord(i)}</a>`).join('') || `<span class="note">${L('לא בתורה', 'Not in the Torah')}</span>`}</div>
    ${out.length ? `<p class="note">${L('לחיצה פותחת את הפסוק כאן.', 'Click to open the pasuk here.')}</p>` : ''}</div>`;
  // Nevi'im and Kesuvim: grouped by sefer, each place links to the pasuk on Sefaria (opens in a new tab)
  const byBook = new Map();
  for (const nv of f.refs) { const [b, ch, vs] = D.NV[nv]; if (!byBook.has(b)) byBook.set(b, []); byBook.get(b).push([ch, vs]); }
  const nach = `<div><p class="h3" style="margin:10px 0 4px">${L(`בנביאים וכתובים: ${f.nn} פעמים`, `In Nevi'im and Kesuvim: ${f.nn} ${f.nn===1?'time':'times'}`)}</p>
    ${f.nn ? [...byBook.entries()].map(([b, list]) => `<div class="refs"><b>${nachBook(b)}:</b> ${list.map(([ch, vs]) => `<a href="${sefariaUrl(D.NE[b], ch, vs)}" target="_blank" rel="noopener">${nachRef(b, ch, vs)}</a>`).join('')}</div>`).join('')
      + `<p class="note">${L('הפסוקים מנביאים וכתובים נפתחים בספריא, בלשונית חדשה.', 'Pesukim from Nevi\'im and Kesuvim open on Sefaria, in a new tab.')}</p>` : `<span class="note">${L('לא בנביאים וכתובים', 'Not in Nevi\'im and Kesuvim')}</span>`}</div>`;
  $('refbox').innerHTML = `<p class="h3">${L('איפה מופיעה הצורה ', 'Where the form appears: ')}<span class="f-he">${esc(f.t.replace('־',''))}</span></p>` + (where === 'nach' ? nach + torah : torah + nach);
  $('refbox').querySelectorAll('a[data-w]').forEach(a => a.addEventListener('click', () => openWord(+a.dataset.w, null)));
  $('refbox').scrollIntoView({block:'nearest'});
}

// ---------- search ----------
let consIdx = null, relIdx = null;
function runSearch(q, openFirst){
  if (!consIdx) { consIdx = D.W.map(cons); relIdx = D.W.map(relaxed); }
  lastSearch = q;
  const mode = $('m-part').checked ? 'part' : 'whole';
  const c = cons(q), r = relaxed(q);
  let hits = [];
  for (let i = 0; i < NW; i++) {
    const a = consIdx[i], b = relIdx[i];
    if (mode === 'part' ? (a.includes(c) || (r.length > 2 && b.includes(r))) : (a===c || b===r || preOk(a,c) || (r.length>1 && preOk(b,r)))) hits.push(i);
  }
  const groups = new Map();
  for (const i of hits) { const [li] = mainPart(i); if (!groups.has(li)) groups.set(li, []); groups.get(li).push(i); }
  const list = $('list');
  $('ltitle').textContent = L('חיפוש: ', 'Search: ') + q;
  $('lcount').textContent = L(`${hits.length} מופעים, ${groups.size} ערכים`, `${hits.length} hits, ${groups.size} entries`);
  $('lvnote').textContent = mode === 'whole' ? L('מילה שלמה: כולל אותיות שימוש בתחילת המילה, ובלי הבדל בין כתיב מלא לחסר', 'Whole word: includes prefix letters, and ignores full versus short spelling') : L('בתוך מילה', 'Inside a word');
  list.innerHTML = [...groups.entries()].sort((a,b) => b[1].length - a[1].length).slice(0, 300).map(([li, ws]) => {
    const x = X(li);
    return `<div class="row" tabindex="0" data-w="${ws[0]}" role="button"><div class="w">${esc(x.v)}</div><div class="nums">${L(`כאן ${ws.length}`, `here ${ws.length}`)} · ${counts(x)}</div>
      <div class="meta">${esc(x.g)} · ${L('ראשון: ', 'first: ')}${refOfWord(ws[0])} ${tags(li)}</div></div>`;
  }).join('') || `<div class="sect">${L('לא נמצא בתורה. נסה בתוך מילה, או פחות אותיות.', 'Not found in the Torah. Try "inside a word", or fewer letters.')}</div>`;
  bindRows();
  if (openFirst) { const first = list.querySelector('.row[data-w]'); if (first) first.click(); }
}
$('sform').addEventListener('submit', ev => { ev.preventDefault(); const q = $('q').value.trim(); if (q) runSearch(q, true); });

// ---------- start ----------
applyLang();
fillSefer();
const startP = D.P.findIndex(p => p[0] === 'Chayei Sara');
selectParsha(startP);
// open on הגמיאיני as the worked example when it is in the list
const ex = (D.E[startP]||[]).findIndex(e => e.r === 'הגמאיני');
if (ex >= 0) { const row = $('list').querySelector(`.row[data-e="${ex}"]`); if (row) row.click(); }
})();
