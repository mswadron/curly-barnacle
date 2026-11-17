/* Sages of the Mishnah (limudlab). Renders window.TANNAIM_DATA from tannaim-data.js.
   Four views: generations, chains, work a mishnah, index. The profile sits in the rail
   (a sheet on phones). State lives in the URL hash so any view can be linked. */
(function () {
  'use strict';
  const D = window.TANNAIM_DATA;
  const $ = (s, r) => (r || document).querySelector(s);
  const esc = (s) => String(s == null ? '' : s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const HL = ['', 'א', 'ב', 'ג', 'ד', 'ה', 'ו', 'ז', 'ח', 'ט', 'י', 'יא', 'יב', 'יג', 'יד', 'טו', 'טז', 'יז', 'יח', 'יט', 'כ', 'כא', 'כב', 'כג', 'כד', 'כה', 'כו', 'כז', 'כח', 'כט', 'ל'];
  const KINDS = ['dispute', 'testimony', 'story', 'saying', 'ruling'];
  const GEN_ORDER = ['Z1', 'Z2', 'Z3', 'Z4', 'Z5', 'T1', 'T2', 'T3', 'T4', 'T5', 'T6', 'TA'];

  /* ---------- indexes ---------- */
  const P = {}; D.people.forEach((p) => { P[p.id] = p; });
  const TR = {}; D.meta.tractates.forEach((t) => { TR[t.key] = t; });
  const BYREF = {};
  D.people.forEach((p) => (p.mishnayos || []).forEach((m) => { (BYREF[m.ref] = BYREF[m.ref] || []).push({ id: p.id, m }); }));
  const parseRef = (ref) => { const m = /^Mishnah (\S+) (\d+):(\d+)$/.exec(ref); return m ? { t: m[1], c: +m[2], m: +m[3] } : null; };
  const mkRef = (t, c, m) => 'Mishnah ' + t + ' ' + c + ':' + m;

  /* ---------- state ---------- */
  const S = { lang: 'he', view: 'gen', chain: 'kab', sel: null, ref: null, sort: 'mentions', q: '', mapk: 'all' };
  try { const l = localStorage.getItem('tannaim-lang'); if (l === 'en' || l === 'he') S.lang = l; } catch (e) { /* storage off */ }
  function readHash() {
    const h = new URLSearchParams(location.hash.replace(/^#/, ''));
    if (['gen', 'chain', 'work', 'map', 'list'].includes(h.get('v'))) S.view = h.get('v');
    if (['all', 'buried', 'born', 'died', 'active'].includes(h.get('k'))) S.mapk = h.get('k');
    if (['kab', 'nes', 'ego'].includes(h.get('c'))) S.chain = h.get('c');
    if (h.get('s') && P[h.get('s')]) S.sel = h.get('s');
    if (h.get('m') && parseRef(h.get('m'))) S.ref = h.get('m');
  }
  function writeHash() {
    const h = new URLSearchParams();
    h.set('v', S.view);
    if (S.view === 'chain') h.set('c', S.chain);
    if (S.sel) h.set('s', S.sel);
    if (S.view === 'work' && S.ref) h.set('m', S.ref);
    if (S.view === 'map' && S.mapk !== 'all') h.set('k', S.mapk);
    const s = '#' + h.toString();
    if (location.hash !== s) history.replaceState(null, '', s);
  }

  /* ---------- words ---------- */
  const W = {
    title: ['חכמי המשנה', 'The Sages of the Mishnah'],
    sub: ['מי היה כל אחד, באיזה דור, ממי למד ומי למד ממנו, והיכן הוא מדבר במשנה', 'Who each sage was, his generation, whom he learned from and who learned from him, and where he speaks in the Mishnah'],
    v_gen: ['דורות', 'Generations'], v_chain: ['שלשלאות', 'Chains'], v_work: ['לימוד משנה', 'Work a Mishnah'], v_list: ['רשימה', 'Index'], v_map: ['מפה', 'Map'],
    years: ['שנים ומקומות', 'Years and places'], period: ['תקופת דורו', 'His generation'], born: ['נולד', 'Born'], died: ['נפטר', 'Died'], floruit: ['פעל', 'Active'],
    p_born: ['מקום לידה', 'Born in'], p_died: ['מקום פטירה', 'Died in'], p_buried: ['מקום קבורה', 'Buried in'], p_active: ['מקום פעילות', 'Taught in'], p_lived: ['מקום מגורים', 'Lived in'],
    from_name: ['לפי שמו במשנה', 'From his name in the Mishnah'], no_years: ['לא נמצאו שנים או מקומות במקורות שנבדקו.', 'No years or places found in the sources checked.'],
    col_y: ['תקופה', 'Period'], k_all: ['הכל', 'All'], k_buried: ['קבורה', 'Burial'], k_born: ['לידה', 'Birth'], k_died: ['פטירה', 'Death'], k_active: ['פעילות', 'Teaching'],
    map_intro: ['מקומות לפי ויקינתונים: לידה, פטירה, קבורה (לרוב לפי המסורת) ומקום פעילות. לחצו על נקודה כדי לראות את החכמים שבה.', 'Places from Wikidata: birth, death, burial (mostly the traditional sites) and where they taught. Tap a point to see its sages.'],
    map_fail: ['המפה לא נטענה. אפשר לראות את המקומות בכרטיס של כל חכם.', 'The map could not load. Each sage\'s card still lists his places.'],
    c_kab: ['שלשלת הקבלה', 'Chain of receiving'], c_nes: ['בית הנשיאים', 'The Nesiim'], c_ego: ['רבותיו ותלמידיו', 'Teachers and students'],
    search: ['חיפוש חכם...', 'Find a sage...'],
    mentions: ['אזכורים', 'mentions'], mishnayos: ['משניות', 'mishnayos'], disputes: ['מחלוקות', 'disputes'],
    gen: ['דור', 'Generation'], unplaced: ['חכמים שלא שובצו בדור', 'Not yet placed in a generation'],
    unplaced_note: ['ספריא אינה מונה אותם, ועדיין לא נוסף להם מקור אחר.', 'Sefaria does not list them, and no other source has been added yet.'],
    voices: ['בתי מדרש וקולות כלליים', 'Schools and unnamed voices'],
    pick: ['בחרו חכם כדי לראות את פרטיו.', 'Choose a sage to see his details.'],
    in_mishnah: ['במשנה', 'In the Mishnah'], summary: ['סיכום מתוך ספריא', "Sefaria's summary"],
    summary_note: ['מובא כפי שכתבה ספריא; לא נבדק מול המקורות.', 'Quoted as Sefaria wrote it; not checked against the sources.'],
    teachers: ['רבותיו', 'Teachers'], students: ['תלמידיו', 'Students'], family: ['משפחה', 'Family'], colleagues: ['נחלק עם', 'Disputes most with'],
    list_m: ['המשניות שבהן הוא נזכר', 'Mishnayos that name him'], ident: ['זיהוי', 'Identification'],
    links_out: ['קישורים', 'Links'], none: ['אין', 'None'],
    def_ident: ['זיהוי ברירת מחדל', 'default identification'],
    work_pick: ['בחרו משנה', 'Choose a mishnah'], prev: ['הקודמת', 'Previous'], next: ['הבאה', 'Next'],
    speakers: ['החכמים במשנה זו', 'The sages in this mishnah'], none_here: ['לא נזכר חכם בשמו במשנה זו.', 'No sage is named in this mishnah.'],
    loading: ['טוען את המשנה...', 'Loading the mishnah...'], load_fail: ['לא ניתן לטעון את המשנה כעת.', 'The mishnah could not be loaded right now.'],
    open_sef: ['פתח בספריא', 'Open on Sefaria'],
    torah_sbp: ['מה הגמרא מוסיפה במשנה זו', 'What the Gemara adds to this mishnah'],
    order_q: ['סדרו אותם מן הקדום אל המאוחר', 'Put them in order, earliest first'],
    check: ['בדיקה', 'Check'], reset: ['מחדש', 'Again'], right: ['נכון.', 'Right.'], wrong: ['לא בדיוק. הנה הסדר:', 'Not quite. Here is the order:'],
    same_gen: ['בני דור אחד', 'same generation'],
    taught: ['רבו של', 'teacher of'], father: ['אביו של', 'father of'],
    earlier_by: ['קדם ל', 'came before'], gens: ['דורות', 'generations'], gen1: ['דור אחד', 'one generation'],
    col_name: ['חכם', 'Sage'], col_gen: ['דור', 'Gen.'], col_m: ['אזכורים', 'Mentions'], col_n: ['משניות', 'Mishnayos'], col_k: ['לפי סוג', 'By kind'], col_d: ['מחלוקות', 'Disputes'], col_t: ['מסכת עיקרית', 'Main tractate'],
    kab_intro: ['כך מונה המשנה במסכת אבות את מסירת התורה, דור אחר דור. כל שלב מובא בלשון המשנה.', 'This is how Avos counts the handing down of the Torah, generation by generation. Each step is given in the words of the Mishnah.'],
    nes_intro: ['הנשיאים מבית הלל, אב ובן. ליד כל אחד מובא המקור שאומר זאת.', 'The Nesiim of the house of Hillel, father and son. Beside each one is the source that says so.'],
    ego_intro: ['לחצו על כל שם כדי לעבור אליו ולראות את רבותיו ותלמידיו.', 'Tap any name to move to him and see his own teachers and students.'],
    choose_first: ['בחרו חכם מן הרשימה או מן החיפוש.', 'Choose a sage from the index or the search.'],
    jewishenc: ['האנציקלופדיה היהודית', 'Jewish Encyclopedia'],
    nasi: ['נשיא', 'Nasi'], two_people: ['שני חכמים בשם זה', 'two sages of this name'],
    src_s: ['ספריא', 'Sefaria'], src_w: ['ויקינתונים', 'Wikidata'], src_mb: ['MishnaBase', 'MishnaBase']
  };
  const t = (k) => (W[k] ? W[k][S.lang === 'he' ? 0 : 1] : k);
  const L = (o) => (o ? (S.lang === 'he' ? (o.he || o.en) : (o.en || o.he)) : '');

  /* ---------- people helpers ---------- */
  const heName = (p) => (p.name && (p.name.he_display || p.name.he)) || p.id;
  const nm = (p) => (S.lang === 'he' ? heName(p) : p.id);
  const other = (p) => (S.lang === 'he' ? p.id : heName(p));
  const mentions = (p) => (p.text_counts ? p.text_counts.mentions : 0) || (p.dispute_counts ? p.dispute_counts.arguments : 0) || 0;
  function genCodes(p) {
    const s = p.sefaria;
    if (!s) return [];
    if (s.two) return s.two.map((r) => r.gen).filter(Boolean);
    return (s.gen || '').split('/').filter(Boolean);
  }
  function genLabel(code) {
    if (!code) return '';
    const n = +code.slice(1);
    if (S.lang === 'he') {
      if (code[0] === 'Z') return 'זוג ' + HL[n];
      if (code === 'TA') return 'בין תנאים לאמוראים';
      return 'דור ' + HL[n];
    }
    if (code[0] === 'Z') return 'Zugos ' + n;
    if (code === 'TA') return 'Tannaim to Amoraim';
    return 'Gen. ' + n;
  }
  const genIdx = (p) => { const g = genCodes(p); if (!g.length || (p.sefaria && p.sefaria.two)) return -1; return GEN_ORDER.indexOf(g[0]); };
  function kindBar(p) {
    const k = (p.text_counts && p.text_counts.by_kind) || {};
    const tot = KINDS.reduce((a, x) => a + (k[x] || 0), 0);
    if (!tot) return '<div class="kbar"></div>';
    return '<div class="kbar">' + KINDS.map((x) => k[x] ? `<i class="k-${x}" style="width:${(100 * k[x] / tot).toFixed(1)}%"></i>` : '').join('') + '</div>';
  }
  const kindName = (k) => L(D.meta.kinds[k]);
  const RULE_HE = {
    'Father of Rebbe, grandson of the Shimon in Avos 1:17': 'אביו של רבי, נכדו של שמעון שבאבות א:יז',
    'Default: Rabban Gamliel of Yavneh; not checked mishnah by mishnah': 'ברירת מחדל: רבן גמליאל דיבנה; לא נבדק משנה משנה',
    'The Mishnah itself says HaZaken': 'המשנה עצמה אומרת "הזקן"',
    'Plain name in Avos 2:9-14 refers to the five students listed in Avos 2:8': 'השם הסתמי באבות ב:ט-יד הוא מחמשת התלמידים שנמנו באבות ב:ח',
    'Default: Rabban Shimon ben Gamliel of Usha, father of Rebbe; not checked mishnah by mishnah': 'ברירת מחדל: רבן שמעון בן גמליאל אביו של רבי; לא נבדק משנה משנה',
    'Grandson of Hillel': 'בן בנו של הלל',
    '"Rabbi Yishmael his son" follows the father named just before it': '"רבי ישמעאל בנו" נאמר אחרי האב שנזכר לפניו',
    'Only "רבי דוסא" appears here; counted as R\' Dosa ben Harkinas. Sefaria also lists a later Rabbi Dosa (T6).': 'כתוב כאן רק "רבי דוסא"; נמנה כרבי דוסא בן הרכינס. ספריא מונה גם רבי דוסא מאוחר (T6).',
    'Same Shimon as Avos 1:17': 'הוא שמעון שבאבות א:יז',
    'Son of Rabban Gamliel HaZaken of Avos 1:16': 'בנו של רבן גמליאל הזקן שבאבות א:טז'
  };
  const SRC_HE = { 'Mishnah text': 'לשון המשנה', 'Tosafos Yom Tov on Avos 1:16': 'תוספות יום טוב אבות א:טז', 'Tosafos Yom Tov on Avos 1:18': 'תוספות יום טוב אבות א:יח', 'Tosafos Yom Tov on Kerisos 1:7': 'תוספות יום טוב כריתות א:ז', 'Mishnah Avos 2:8': 'אבות ב:ח', 'Mishnah Avos 4:4 and 4:6': 'אבות ד:ד ו-ד:ו', 'Mishnah Avos 1:17; Tosafos Yom Tov on Avos 1:18': 'אבות א:יז; תוספות יום טוב אבות א:יח' };
  const GEM = (n) => {
    const parts = []; let x = n;
    [[400, 'ת'], [300, 'ש'], [200, 'ר'], [100, 'ק']].forEach(([v, c]) => { while (x >= v) { parts.push(c); x -= v; } });
    if (x === 15) parts.push('ט', 'ו'); else if (x === 16) parts.push('ט', 'ז');
    else { [[90, 'צ'], [80, 'פ'], [70, 'ע'], [60, 'ס'], [50, 'נ'], [40, 'מ'], [30, 'ל'], [20, 'כ'], [10, 'י']].forEach(([v, c]) => { if (x >= v) { parts.push(c); x -= v; } }); if (x) parts.push('אבגדהוזחט'[x - 1]); }
    if (parts.length === 1) return parts[0] + '׳';
    return parts.slice(0, -1).join('') + '״' + parts[parts.length - 1];
  };
  const am = (ce) => (ce > 0 ? ce + 3760 : 3761 + ce);
  const amTxt = (ce) => { const a = am(ce); return S.lang === 'he' ? 'ה'.slice(0, 0) + GEM(Math.floor(a / 1000)).replace(/[׳״]/g, '') + '׳' + GEM(a % 1000) : 'AM ' + a; };
  const ceTxt = (y) => (S.lang === 'he' ? (y < 0 ? -y + ' לפנה״ס' : y + ' לסה״נ') : (y < 0 ? -y + ' BCE' : y + ' CE'));
  function lifeTxt(e) {
    const y = e.y;
    if (e.prec <= 7) {
      const c = Math.ceil(Math.abs(y) / 100) || 1;
      return S.lang === 'he' ? 'המאה ה־' + c + (y < 0 ? ' לפנה״ס' : ' לסה״נ') : c + (c === 1 ? 'st' : c === 2 ? 'nd' : c === 3 ? 'rd' : 'th') + ' century' + (y < 0 ? ' BCE' : ' CE');
    }
    const approx = e.prec === 8 ? (S.lang === 'he' ? 'בערך ' : 'c. ') : '';
    return approx + ceTxt(y) + ` <span class="am">(${amTxt(y)})</span>`;
  }
  const spanTxt = (a, b) => (S.lang === 'he' ? `${a}–${b} לסה״נ <span class="am">(${amTxt(a)}–${amTxt(b)})</span>` : `${a}–${b} CE <span class="am">(${amTxt(a)}–${amTxt(b)})</span>`);
  const SEF2JE = { T1: 1, T2: 1, T3: 2, T4: 3, T5: 4, T6: 5, TA: 6 };
  const JE_YEARS = { 1: [10, 80], 2: [80, 120], 3: [120, 140], 4: [140, 165], 5: [165, 200], 6: [200, 220] };
  const ruleTxt = (r) => (S.lang === 'he' && RULE_HE[r]) || r;
  const srcTxt = (r) => (S.lang === 'he' && SRC_HE[r]) || r;
  function matches(p, q) {
    if (!q) return true;
    q = q.trim().toLowerCase();
    const hay = [p.id, heName(p)].concat(p.name.he_forms || []);
    if (p.sefaria && p.sefaria.title) hay.push(p.sefaria.title.en, p.sefaria.title.he);
    return hay.some((h) => h && String(h).toLowerCase().includes(q));
  }

  /* ---------- shell ---------- */
  function shell() {
    document.documentElement.lang = S.lang;
    $('#title').textContent = t('title');
    $('#subtitle').textContent = t('sub');
    $('#subtitle').className = S.lang === 'he' ? 'he' : 'en';
    $('#intro').innerHTML = S.lang === 'he'
      ? '<p>כל חכם שנזכר בשמו במשנה, עם מספר הפעמים שהוא נזכר ובאיזה אופן: במחלוקת, בעדות, במעשה, במאמר או בהלכה. הדורות, הרבנים והתלמידים לקוחים מספריא ומוויקינתונים, והמקור מצוין ליד כל פרט.</p>'
      : '<p class="en">Every sage named in the Mishnah, with how often he is named and in what way: in a dispute, a testimony, a story, a saying or a ruling. Generations, teachers and students come from Sefaria and Wikidata, and each detail names its source.</p>';
    document.querySelectorAll('.lang button').forEach((b) => b.classList.toggle('on', b.dataset.lang === S.lang));
    const vs = ['gen', 'chain', 'work', 'map', 'list'];
    $('#views').innerHTML = vs.map((v) => `<button data-v="${v}" class="${S.view === v ? 'on' : ''}">${t('v_' + v)}</button>`).join('');
    $('#q').placeholder = t('search'); $('#q').dir = S.lang === 'he' ? 'rtl' : 'ltr';
    $('#foot').innerHTML = footer();
  }
  function footer() {
    const m = D.meta;
    const src = m.sources.map((s) => `<a href="${esc(s.url)}" target="_blank" rel="noopener">${esc(s.title)}</a>`).join(' · ');
    const gaps = m.gaps.map((g) => `<li>${esc(g)}</li>`).join('');
    const body = S.lang === 'he'
      ? `<p>הספירה: כל שם של חכם שבמשנה לפי נוסח תורת אמת 357. "מחלוקת" היא משנה ש-MishnaBase מונה בה את החכם בתוך מחלוקת (או במשנה הסמוכה, בגלל הבדלי מספור). בשאר המשניות הסוג נקבע לפי לשון המשנה: עדות (העיד, שמעתי, מקובלני), מעשה (מעשה, פעם אחת, אמרו עליו, משמת), מאמר (אבות, היה אומר), ואחרת הלכה או אזכור. המיון נעשה לפי מילים ולא נבדק משנה משנה.</p>
         <p>זיהוי: שם סתמי מזוהה כמקובל (רבי יהודה בר אלעאי, רבי יוסי בן חלפתא, רבי שמעון בר יוחאי, רבי אליעזר בן הורקנוס, רבי יהושע בן חנניה, רבי אלעזר בן שמוע). כשהמשנה או מפרש אומרים שזה אחר, המשנה מסומנת והמקור מצוין.</p>
         <p>הדורות לפי ספריא: דור החורבן הוא T1 ורבי הוא T6. האנציקלופדיה היהודית מונה דור אחד פחות (רבן יוחנן בן זכאי הוא דור א שלה), ולכן המספר שלה מוצג בנפרד בכל כרטיס.</p>
         <p>שנים: תקופת כל דור לפי טבלת האנציקלופדיה היהודית (א 10–80, ב 80–120, ג 120–140, ד 140–165, ה 165–200, ו 200–220 לסה״נ). חכם שהאנציקלופדיה אינה ממקמת, דורו בספריא הותאם למספר שלה (T1 ו־T2 = א, T3 = ב, T4 = ג, T5 = ד, T6 = ה, TA = ו; נבדק על חכמים ששתיהן ממקמות). שנות לידה ופטירה הן של ויקינתונים, כפי שהן שם, עם מידת הדיוק; אלו הערכות של היסטוריונים ולא תאריכים מן המקורות.</p>
         <p>השנה העברית היא השנה הלועזית בתוספת 3760 (3761 לפני הספירה), ושנה לועזית חלה על שתי שנים עבריות. זהו החשבון לפי התיארוך הלועזי; לפי סדר עולם החורבן בשנת ג׳תתכ״ח ולא ג׳תת״ל, ולכן השנים המסורתיות לתקופה זו מוקדמות בכשנתיים.</p>
         <p>מקומות לידה, פטירה, קבורה ופעילות לפי ויקינתונים; מקומות הקבורה הם לרוב לפי המסורת. רשומות שמציינות רק מדינה מודרנית, פרובינקיה רומית או את האימפריה הושמטו; אזורים (גליל, יהודה, בבל) מופיעים בכרטיס ולא במפה.</p>`
      : `<p class="en">${esc(m.kind_method)}</p><p class="en">${esc(m.years.periods)}</p><p class="en">${esc(m.years.life)}</p><p class="en">${esc(m.years.jewish_year)}</p><p class="en">${esc(m.years.places)}</p><p class="en">${esc(m.identification)}</p><p class="en">${esc(m.gen_scheme.note)}</p>`;
    return `<p><b>${S.lang === 'he' ? 'מקורות' : 'Sources'}:</b> ${src}</p>${body}
      <details><summary>${S.lang === 'he' ? 'מה עוד חסר' : 'What is still missing'}</summary><ul class="en">${gaps}</ul></details>`;
  }

  /* ---------- view: generations ---------- */
  function viewGen() {
    const bands = {}; const unplaced = []; const voices = []; const pre = [];
    D.people.forEach((p) => {
      if (p.kind === 'collective' || p.kind === 'school') { voices.push(p); return; }
      if (p.pre_zugot) { pre.push(p); return; }
      const g = genCodes(p);
      if (!g.length || (p.sefaria && p.sefaria.two)) { unplaced.push(p); return; }
      (bands[g[0]] = bands[g[0]] || []).push(p);
    });
    const card = (p) => {
      const big = mentions(p) >= 100 ? ' big' : '';
      const dim = S.q && !matches(p, S.q) ? ' dim' : '';
      const on = S.sel === p.id ? ' on' : '';
      const g = genCodes(p);
      const gtxt = g.length > 1 ? `<span class="g">${esc(g.join('/'))}</span>` : '';
      return `<button class="sage${big}${dim}${on}${p.kind !== 'person' ? ' voice' : ''}" data-s="${esc(p.id)}">
        <span class="sn ${S.lang === 'he' ? 'he' : 'en'}">${esc(nm(p))}${p.nasi ? `<span class="tag-nasi">${t('nasi')}</span>` : ''}</span>
        <span class="se">${esc(other(p))} ${gtxt}</span>
        <span class="sm"><span>${mentions(p)}</span>${kindBar(p)}</span></button>`;
    };
    const sorter = (a, b) => mentions(b) - mentions(a);
    let html = `<div class="kinds">${KINDS.map((k) => `<span><i class="k-${k}"></i>${esc(kindName(k))}</span>`).join('')}<span class="note">${S.lang === 'he' ? 'המספר: אזכורים במשנה' : 'Number: mentions in the Mishnah'}</span></div>`;
    let lastEra = '';
    if (pre.length) {
      pre.sort((x, y) => x.pre_zugot.localeCompare(y.pre_zugot, 'en', { numeric: true }));
      html += `<section class="band"><div class="band-head"><h2>${S.lang === 'he' ? 'לפני הזוגות' : 'Before the Zugos'}</h2><span class="bc">${S.lang === 'he' ? 'לפי סדר אבות א:ב-ג' : 'in the order of Avos 1:2-3'}</span></div><div class="band-body">${pre.map(card).join('')}</div></section>`;
    }
    const zug = GEN_ORDER.filter((c) => c[0] === 'Z' && bands[c]);
    if (zug.length) {
      html += `<h2 style="font-family:var(--he-title);font-weight:400;color:var(--teal-deep);font-size:22px;margin:14px 0 8px">${S.lang === 'he' ? 'הזוגות' : 'The Zugos'}</h2><section class="band"><div class="band-body" style="gap:10px 14px">` +
        zug.map((c) => `<div style="display:flex;flex-direction:column;gap:5px"><span class="note" style="font-weight:700">${esc(genLabel(c))} <span class="bn" style="font-family:var(--en)">${c}</span></span><div style="display:flex;gap:6px;flex-wrap:wrap">${bands[c].sort(sorter).map(card).join('')}</div></div>`).join('') + '</div></section>';
    }
    GEN_ORDER.filter((c) => c[0] !== 'Z').forEach((code) => {
      const list = (bands[code] || []).sort(sorter);
      if (!list.length) return;
      const era = code === 'TA' ? '' : (S.lang === 'he' ? 'התנאים' : 'The Tannaim');
      if (era && era !== lastEra) { html += `<h2 class="perek-like" style="font-family:var(--he-title);font-weight:400;color:var(--teal-deep);font-size:22px;margin:14px 0 8px">${era}</h2>`; lastEra = era; }
      const jy = JE_YEARS[SEF2JE[code]];
      html += `<section class="band"><div class="band-head"><h2>${esc(genLabel(code))}</h2><span class="bn">${esc(code)}</span>${jy ? `<span class="by">${spanTxt(jy[0], jy[1])}</span>` : ''}<span class="bc">${list.length} ${S.lang === 'he' ? 'חכמים' : 'sages'}</span></div><div class="band-body">${list.map(card).join('')}</div></section>`;
    });
    if (unplaced.length) html += `<section class="band"><div class="band-head"><h2>${t('unplaced')}</h2><span class="bc">${unplaced.length}</span></div><div class="band-body" style="padding-bottom:4px">${unplaced.sort(sorter).map(card).join('')}</div><p class="note" style="padding:0 14px 10px;margin:0">${t('unplaced_note')}</p></section>`;
    if (voices.length) html += `<section class="band"><div class="band-head"><h2>${t('voices')}</h2></div><div class="band-body">${voices.sort(sorter).map(card).join('')}</div></section>`;
    return html;
  }

  /* ---------- view: chains ---------- */
  function pill(id, extra, noGen) {
    const p = P[id];
    if (!p) return `<span class="pill off">${esc(id)}</span>`;
    const g = noGen ? [] : genCodes(p);
    return `<button class="pill" data-s="${esc(p.id)}">${esc(nm(p))}${g.length ? ` <span class="g">${esc(g.join('/'))}</span>` : ''}${extra || ''}</button>`;
  }
  function offPill(o) {
    const label = S.lang === 'he' ? (o.he || o.en) : (o.en || o.he);
    if (o.slug) return `<a class="pill off" href="https://www.sefaria.org/topics/${encodeURIComponent(o.slug)}" target="_blank" rel="noopener">${esc(label)}</a>`;
    return `<span class="pill off">${esc(label)}</span>`;
  }
  const sefLink = (ref, label) => `<a class="ref" href="https://www.sefaria.org/${encodeURIComponent(ref.replace(/^Mishnah Pirkei_Avot/, 'Pirkei_Avot').replace(/ /g, '_'))}" target="_blank" rel="noopener">${esc(label || refLabel(ref))}</a>`;
  function viewChain() {
    const sub = ['kab', 'nes', 'ego'].map((c) => `<button data-c="${c}" class="${S.chain === c ? 'on' : ''}">${t('c_' + c)}</button>`).join('');
    let html = `<nav class="seg sm" id="chainnav" style="margin-bottom:12px">${sub}</nav>`;
    if (S.chain === 'kab') {
      html += `<div class="panel"><p class="note" style="margin:0 0 10px">${t('kab_intro')}</p><div class="chain">`;
      D.chains.kabbalah.forEach((s, i) => {
        const who = s.who.map((w) => (w.id ? pill(w.id) : `<span class="pill off">${esc(w.he)}</span>`)).join('');
        html += `<div class="link${i === D.chains.kabbalah.length - 1 ? ' end' : ''}"><div class="who">${who}</div><div class="src he">${esc(s.text)}</div><div>${sefLink(s.ref)}</div></div>`;
      });
      html += '</div></div>';
    } else if (S.chain === 'nes') {
      html += `<div class="panel"><p class="note" style="margin:0 0 10px">${t('nes_intro')}</p><div class="chain">`;
      D.chains.nesiim.forEach((s, i) => {
        const who = s.id ? pill(s.id) : `<span class="pill off">${esc(S.lang === 'he' ? s.he : s.en)}</span>`;
        const src = s.src.map((x) => `<div class="src he" style="font-size:16px">${esc(x.text)}</div><div><a class="ref" href="https://www.sefaria.org/${encodeURIComponent(x.ref.replace(/^Mishnah Pirkei_Avot/, 'Pirkei_Avot').replace(/ /g, '_'))}" target="_blank" rel="noopener">${esc(x.label)}</a></div>`).join('');
        html += `<div class="link${i === D.chains.nesiim.length - 1 ? ' end' : ''}"><div class="who">${who}</div>${src}</div>`;
      });
      html += '</div></div>';
    } else {
      html += egoView();
    }
    return html;
  }
  function relations(p) {
    const out = { teachers: [], students: [], family: [], colleagues: [] };
    const seen = { teachers: {}, students: {}, family: {} };
    const norm = (h) => String(h || '').replace(/[\u0591-\u05C7]/g, '').replace(/\s*\(.*?\)\s*/g, ' ').trim();
    const add = (bucket, o, src, rel) => {
      const keys = [o.id && 'i:' + o.id, o.slug && 's:' + o.slug, o.he && 'h:' + norm(o.he), o.en && 'e:' + o.en.toLowerCase()].filter(Boolean);
      if (!keys.length || o.id === p.id) return;
      const ex = keys.map((k) => seen[bucket][k]).find(Boolean);
      if (ex) { if (!ex.src.includes(src)) ex.src.push(src); if (!ex.id && o.id) ex.id = o.id; keys.forEach((k) => { seen[bucket][k] = ex; }); return; }
      const e = Object.assign({}, o, { src: [src], rel });
      keys.forEach((k) => { seen[bucket][k] = e; }); out[bucket].push(e);
    };
    const sefs = p.sefaria ? (p.sefaria.two ? p.sefaria.two : [p.sefaria]) : [];
    sefs.forEach((s) => {
      const l = (s && s.links) || {};
      (l.teachers || []).forEach((o) => add('teachers', o, 'S'));
      (l.students || []).forEach((o) => add('students', o, 'S'));
      [['parents', 'father'], ['children', 'child'], ['ancestors', 'ancestor'], ['descendants', 'descendant'], ['siblings', 'sibling'], ['spouse', 'spouse'], ['parents_in_law', 'in-law'], ['children_in_law', 'in-law']].forEach(([k, rel]) => (l[k] || []).forEach((o) => add('family', o, 'S', rel)));
    });
    const w = p.wikidata;
    if (w) {
      (w.teachers || []).forEach((o) => add('teachers', o, 'W'));
      (w.students || []).forEach((o) => add('students', o, 'W'));
      (w.father || []).forEach((o) => add('family', o, 'W', 'father'));
    }
    (p.disputes_most_with || []).forEach(([id, n]) => { if (P[id] && P[id].kind === 'person') out.colleagues.push({ id, n }); });
    return out;
  }
  const REL_HE = { father: 'אב', child: 'בן', ancestor: 'אב קדמון', descendant: 'צאצא', sibling: 'אח', spouse: 'אשה', 'in-law': 'חותן או חתן' };
  const REL_EN = { father: 'father', child: 'son', ancestor: 'ancestor', descendant: 'descendant', sibling: 'brother', spouse: 'wife', 'in-law': 'in-law' };
  function relPill(o, showRel) {
    const srcs = `<span class="g">${o.src.join('')}</span>`;
    const rel = showRel && o.rel ? `<span class="g">${esc((S.lang === 'he' ? REL_HE : REL_EN)[o.rel] || o.rel)}</span>` : '';
    if (o.id && P[o.id]) return pill(o.id, rel + srcs);
    return offPill(o).replace(/<\/(a|span)>$/, `${rel}${srcs}</$1>`);
  }
  function egoView() {
    const p = P[S.sel] || P['Rabbi Akiva'];
    if (!S.sel) S.sel = p.id;
    const r = relations(p);
    const row = (lbl, list, showRel) => list.length ? `<div class="ego-lbl">${lbl}</div><div class="ego-row">${list.map((o) => relPill(o, showRel)).join('')}</div>` : '';
    const fam = r.family;
    const up = fam.filter((o) => ['father', 'ancestor', 'in-law'].includes(o.rel));
    const down = fam.filter((o) => ['child', 'descendant'].includes(o.rel));
    const side = fam.filter((o) => ['sibling', 'spouse'].includes(o.rel));
    const g = genCodes(p);
    return `<div class="panel"><p class="note" style="margin:0 0 10px">${t('ego_intro')}</p><div class="ego">
      ${row(t('family'), up, true)}
      ${row(t('teachers'), r.teachers)}
      ${(up.length || r.teachers.length) ? '<div class="ego-arrow">↓</div>' : ''}
      <div class="ego-mid"><b class="he">${esc(heName(p))}</b><span>${esc(p.id)}${g.length ? ' · ' + esc(g.join('/')) : ''}</span></div>
      ${side.length ? `<div class="ego-row">${side.map((o) => relPill(o, true)).join('')}</div>` : ''}
      ${r.colleagues.length ? `<div class="ego-lbl">${t('colleagues')}</div><div class="ego-row">${r.colleagues.map((c) => pill(c.id, `<span class="g">${c.n}</span>`)).join('')}</div>` : ''}
      ${(r.students.length || down.length) ? '<div class="ego-arrow">↓</div>' : ''}
      ${row(t('students'), r.students)}
      ${row(t('family'), down, true)}
      <div class="ego-src">${S.lang === 'he' ? 'S = ספריא · W = ויקינתונים · המספר ליד "נחלק עם": מחלוקות לפי MishnaBase' : 'S = Sefaria · W = Wikidata · number beside "disputes most with": shared disputes in MishnaBase'}</div>
    </div></div>`;
  }

  /* ---------- view: work a mishnah ---------- */
  const TCACHE = {};
  const refLabel = (ref) => {
    const r = parseRef(ref); if (!r) return ref;
    const tr = TR[r.t];
    return S.lang === 'he' ? (tr ? tr.he : r.t) + ' ' + HL[r.c] + ':' + HL[r.m] : 'Mishnah ' + (tr ? tr.en : r.t) + ' ' + r.c + ':' + r.m;
  };
  function stepRef(ref, d) {
    const r = parseRef(ref); const tr = TR[r.t]; if (!tr) return null;
    let { c, m } = r; m += d;
    if (m < 1) { c -= 1; if (c < 1) return null; m = tr.chapters[c - 1]; }
    else if (m > tr.chapters[c - 1]) { c += 1; m = 1; if (c > tr.chapters.length) return null; }
    return mkRef(r.t, c, m);
  }
  function viewWork() {
    if (!S.ref) {
      const p = P[S.sel];
      S.ref = (p && p.mishnayos && p.mishnayos[0] && p.mishnayos[0].ref) || 'Mishnah Beitzah 1:1';
    }
    const r = parseRef(S.ref); const tr = TR[r.t];
    const sederGroups = {};
    D.meta.tractates.forEach((x) => (sederGroups[x.seder] = sederGroups[x.seder] || []).push(x));
    const tSel = Object.keys(sederGroups).map((sd) => `<optgroup label="${esc(sd)}">${sederGroups[sd].map((x) => `<option value="${x.key}"${x.key === r.t ? ' selected' : ''}>${esc(S.lang === 'he' ? x.he : x.en)}</option>`).join('')}</optgroup>`).join('');
    const cSel = tr.chapters.map((n, i) => `<option value="${i + 1}"${i + 1 === r.c ? ' selected' : ''}>${S.lang === 'he' ? 'פרק ' + HL[i + 1] : 'Perek ' + (i + 1)}</option>`).join('');
    const mSel = Array.from({ length: tr.chapters[r.c - 1] }, (_, i) => `<option value="${i + 1}"${i + 1 === r.m ? ' selected' : ''}>${S.lang === 'he' ? 'משנה ' + HL[i + 1] : 'Mishnah ' + (i + 1)}</option>`).join('');
    const prev = stepRef(S.ref, -1), next = stepRef(S.ref, 1);
    const here = (BYREF[S.ref] || []).filter((x) => P[x.id]);
    const sbp = r.t === 'Beitzah' ? 'beitza.html' : r.t === 'Shabbat' ? 'shabbos.html' : null;
    let html = `<div class="panel"><span class="eyebrow">${t('work_pick')}</span>
      <div class="picker" id="picker">
        <select id="pt" aria-label="tractate">${tSel}</select>
        <select id="pc" aria-label="perek">${cSel}</select>
        <select id="pm" aria-label="mishnah">${mSel}</select>
        <button class="nav" data-go="${esc(prev || '')}"${prev ? '' : ' disabled'}>${t('prev')}</button>
        <button class="nav" data-go="${esc(next || '')}"${next ? '' : ' disabled'}>${t('next')}</button>
      </div>
      <h2 style="margin-top:12px">${esc(refLabel(S.ref))}</h2>
      <div class="mtext he" id="mtext"><span class="note">${t('loading')}</span></div>
      <div class="mref">${S.lang === 'he' ? 'משנה, תורת אמת 357, מתוך ספריא' : 'Mishnah, Torat Emet 357, from Sefaria'} · ${sefLink(S.ref, t('open_sef'))}</div>
      ${sbp ? `<p style="margin:10px 0 0"><a class="xlink" href="${sbp}#m${r.c}-${r.m}">${t('torah_sbp')} ←</a></p>` : ''}
    </div>`;
    html += `<div class="panel"><h2>${t('speakers')}</h2>`;
    if (!here.length) html += `<p class="note">${t('none_here')}</p>`;
    else {
      html += '<div class="speakers">' + here.map(({ id, m }) => {
        const p = P[id]; const g = genCodes(p);
        const idn = m.identified ? `<span class="note">${esc(ruleTxt(m.identified.rule))}${m.identified.source ? ' (' + esc(srcTxt(m.identified.source)) + ')' : ''}</span>` : '';
        return `<div class="sp">${pill(id, '', true)}<span class="kchip k-${m.kind}">${esc(kindName(m.kind))}</span>${idn}</div>`;
      }).join('') + '</div>';
      const ids = here.map((x) => x.id); const qz = quiz(ids); const rl = relLines(ids);
      html += qz + (rl ? (qz ? `<details class="mt" style="margin-top:10px"${QZ && QZ.res !== null ? ' open' : ''}><summary><span>${S.lang === 'he' ? 'הסדר לפי הדורות (אחרי שתנסו)' : 'The order by generation (after you try)'}</span></summary><div style="padding:6px 10px">${rl}</div></details>` : rl) : '');
    }
    html += '</div>';
    setTimeout(() => loadText(S.ref), 0);
    return html;
  }
  function ruler(ids) {
    const pts = ids.map((id) => ({ id, i: genIdx(P[id]) })).filter((x) => x.i >= 0 && P[x.id].kind === 'person');
    if (pts.length < 1) return '';
    let lo = Math.min(...pts.map((x) => x.i)), hi = Math.max(...pts.map((x) => x.i));
    lo = Math.max(0, lo - 1); hi = Math.min(GEN_ORDER.length - 1, hi + 1);
    const span = Math.max(1, hi - lo);
    const pos = (i) => (100 * (i - lo) / span);
    let ticks = '';
    for (let i = lo; i <= hi; i++) ticks += `<span class="tick" style="right:${pos(i)}%"></span><span class="tl" style="right:${pos(i)}%">${GEN_ORDER[i]}</span>`;
    const stack = {};
    const dots = pts.map((x) => { const k = x.i; stack[k] = (stack[k] || 0) + 1; return `<span class="dot" data-s="${esc(x.id)}" style="right:${pos(x.i)}%;top:${-9 - (stack[k] - 1) * 0}px"><i></i><span style="margin-top:${(stack[k] - 1) * 16}px">${esc(nm(P[x.id]))}</span></span>`; }).join('');
    const h = 56 + (Math.max(...Object.values(stack)) - 1) * 16;
    return `<div class="ruler" style="height:${h}px;margin-top:22px">${ticks}${dots}</div>`;
  }
  function relLines(ids) {
    const people = ids.map((id) => P[id]).filter((p) => p && p.kind === 'person');
    const lines = [];
    for (let a = 0; a < people.length; a++) for (let b = 0; b < people.length; b++) {
      if (a === b) continue;
      const A = people[a], B = people[b];
      const ra = relations(A);
      if (ra.students.some((o) => o.id === B.id)) lines.push(`<div class="rel"><b>${esc(nm(A))}</b> ${t('taught')} <b>${esc(nm(B))}</b> <small>(${ra.students.find((o) => o.id === B.id).src.join('')})</small></div>`);
      else if (ra.family.some((o) => o.id === B.id && o.rel === 'child')) lines.push(`<div class="rel"><b>${esc(nm(A))}</b> ${t('father')} <b>${esc(nm(B))}</b></div>`);
    }
    const placed = people.filter((p) => genIdx(p) >= 0);
    const groups = {};
    placed.forEach((p) => { (groups[genIdx(p)] = groups[genIdx(p)] || []).push(p); });
    const order = Object.keys(groups).map(Number).sort((x, y) => x - y);
    const lineup = order.length > 1 || placed.length > 1 ? `<div class="lineup">${order.map((i) => `<div class="lu"><span class="chip">${esc(genLabel(GEN_ORDER[i]))} <span class="s" dir="ltr">${GEN_ORDER[i]}</span></span><div class="pills">${groups[i].map((p) => pill(p.id)).join('')}</div></div>`).join('<div class="lu-arrow">↓</div>')}</div>` : '';
    const unplaced = people.filter((p) => genIdx(p) < 0);
    const un = unplaced.length ? `<p class="note">${S.lang === 'he' ? 'בלי דור: ' : 'No generation: '}${unplaced.map((p) => esc(nm(p))).join(', ')}</p>` : '';
    const head = lineup ? `<h3>${S.lang === 'he' ? 'לפי הדורות' : 'By generation'}</h3>${lineup}${un}` : '';
    return head + (lines.length ? `<h3>${S.lang === 'he' ? 'רב ותלמיד, אב ובן' : 'Teacher and student, father and son'}</h3>${lines.join('')}` : '');
  }
  let QZ = null;
  function quiz(ids) {
    const ppl = [...new Set(ids)].filter((id) => genIdx(P[id]) >= 0 && P[id].kind === 'person');
    const distinct = new Set(ppl.map((id) => genIdx(P[id])));
    if (ppl.length < 2 || distinct.size < 2) return '';
    if (!QZ || QZ.ref !== S.ref) {
      const pool = ppl.slice().sort(() => Math.random() - 0.5);
      QZ = { ref: S.ref, pool, ans: [], res: null };
    }
    const chips = (arr, where) => arr.map((id) => `<button class="pill" data-q="${where}" data-id="${esc(id)}">${esc(nm(P[id]))}</button>`).join('');
    const res = QZ.res === null ? '' : QZ.res ? `<div class="res ok">${t('right')}</div>` : `<div class="res no">${t('wrong')} ${ppl.slice().sort((a, b) => genIdx(P[a]) - genIdx(P[b])).map((id) => esc(nm(P[id])) + ' (' + genCodes(P[id]).join('/') + ')').join(S.lang === 'he' ? ' ← ' : ' → ')}</div>`;
    return `<div class="quiz"><h3>${t('order_q')}</h3><div class="pool">${chips(QZ.pool, 'pool')}</div><div class="ans">${chips(QZ.ans, 'ans')}</div>
      <button class="btn fill" id="qcheck"${QZ.pool.length ? ' disabled' : ''}>${t('check')}</button> <button class="btn" id="qreset">${t('reset')}</button>${res}</div>`;
  }
  async function loadText(ref) {
    const box = $('#mtext'); if (!box) return;
    const r = parseRef(ref); const tr = TR[r.t];
    const url = 'https://www.sefaria.org/api/v3/texts/' + encodeURIComponent(tr.sefaria + '.' + r.c + '.' + r.m) + '?version=' + encodeURIComponent('hebrew|Torat Emet 357');
    try {
      let txt = TCACHE[ref];
      if (!txt) {
        const res = await fetch(url); if (!res.ok) throw new Error(res.status);
        const j = await res.json();
        const v = (j.versions || [])[0];
        txt = v ? (Array.isArray(v.text) ? v.text.flat(Infinity).join(' ') : v.text) : '';
        if (!txt) throw new Error('empty');
        TCACHE[ref] = txt;
      }
      if (S.ref !== ref || !$('#mtext')) return;
      $('#mtext').innerHTML = markNames(txt.replace(/<[^>]+>/g, ''), ref);
    } catch (e) {
      if ($('#mtext')) $('#mtext').innerHTML = `<span class="note">${t('load_fail')}</span> ${sefLink(ref, t('open_sef'))}`;
    }
  }
  /* Find each sage's name in the pointed text by matching the unpointed letters. */
  function markNames(txt, ref) {
    const plain = []; const map = [];
    for (let i = 0; i < txt.length; i++) {
      const ch = txt[i];
      if (/[֑-ׇ]/.test(ch) && ch !== '־') continue;
      plain.push(ch === '־' ? ' ' : ch); map.push(i);
    }
    const ps = plain.join('');
    const here = BYREF[ref] || [];
    const forms = [];
    here.forEach(({ id }) => {
      const p = P[id]; if (!p) return;
      (p.name.he_forms || [p.name.he]).forEach((f) => forms.push({ f, id }));
      if (id === 'Rabban Shimon ben Gamliel HaZaken') forms.push({ f: 'שמעון בנו', id });
    });
    forms.sort((a, b) => b.f.length - a.f.length);
    const used = new Array(ps.length).fill(false); const spans = [];
    forms.forEach(({ f, id }) => {
      const re = new RegExp('(^|[\\s,.:;(])(?:ו|ש|ל|מ|כ|ד|וש|ומ|מש)?(' + f.replace(/\s+/g, '\\s+') + ')(?=[\\s,.:;)]|$)', 'g');
      let m;
      while ((m = re.exec(ps))) {
        const s = m.index + m[0].length - m[2].length, e = s + m[2].length;
        let free = true; for (let k = s; k < e; k++) if (used[k]) { free = false; break; }
        if (!free) continue;
        for (let k = s; k < e; k++) used[k] = true;
        spans.push({ s, e, id });
      }
    });
    spans.sort((a, b) => a.s - b.s);
    let out = ''; let pos = 0;
    spans.forEach(({ s, e, id }) => {
      const os = map[s], oe = e < map.length ? map[e - 1] + 1 : txt.length;
      let end = oe; while (end < txt.length && /[֑-ׇ]/.test(txt[end]) && txt[end] !== '־') end++;
      out += esc(txt.slice(pos, os)) + `<button class="nm${S.sel === id ? ' on' : ''}" data-s="${esc(id)}">${esc(txt.slice(os, end))}</button>`;
      pos = end;
    });
    return out + esc(txt.slice(pos));
  }

  /* ---------- view: index ---------- */
  function viewList() {
    const rows = D.people.filter((p) => matches(p, S.q));
    const key = {
      name: (p) => heName(p), gen: (p) => { const i = genIdx(p); return i < 0 ? 99 : i; },
      mentions: (p) => -mentions(p), mishnayos: (p) => -((p.text_counts || {}).mishnayos || 0), disputes: (p) => -((p.dispute_counts || {}).arguments || 0)
    }[S.sort] || ((p) => -mentions(p));
    rows.sort((a, b) => { const x = key(a), y = key(b); return x < y ? -1 : x > y ? 1 : mentions(b) - mentions(a); });
    const th = (k, lbl, cls) => `<th data-sort="${k}" class="${S.sort === k ? 'on' : ''} ${cls || ''}">${lbl}</th>`;
    const body = rows.map((p) => {
      const tc = p.text_counts || {}; const top = (tc.top_tractates || [])[0];
      return `<tr data-s="${esc(p.id)}"><td><span class="${S.lang === 'he' ? 'he' : 'en'}">${esc(nm(p))}</span><span class="se">${esc(other(p))}</span></td>
        <td class="num">${esc(genCodes(p).join('/') || '·')}</td><td class="num hide-sm" style="white-space:nowrap">${p.period ? p.period.from + '–' + p.period.to : '·'}</td><td class="num">${mentions(p)}</td><td class="num hide-sm">${tc.mishnayos || '·'}</td>
        <td class="bar">${kindBar(p)}</td><td class="num hide-sm">${(p.dispute_counts || {}).arguments || '·'}</td>
        <td class="hide-sm">${top ? esc(S.lang === 'he' ? TR[top[0]].he : TR[top[0]].en) + ' <span class="note">' + top[1] + '</span>' : ''}</td></tr>`;
    }).join('');
    return `<div class="kinds">${KINDS.map((k) => `<span><i class="k-${k}"></i>${esc(kindName(k))}</span>`).join('')}</div>
      <table class="idx"><thead><tr>${th('name', t('col_name'))}${th('gen', t('col_gen'))}<th class="hide-sm">${t('col_y')}</th>${th('mentions', t('col_m'))}${th('mishnayos', t('col_n'), 'hide-sm')}<th>${t('col_k')}</th>${th('disputes', t('col_d'), 'hide-sm')}<th class="hide-sm">${t('col_t')}</th></tr></thead><tbody>${body}</tbody></table>`;
  }

  /* ---------- rail: the profile ---------- */
  function rail() {
    const box = $('#rail');
    const p = P[S.sel];
    if (!p) { box.innerHTML = `<div class="rail-empty ${S.lang === 'he' ? 'he' : 'en'}">${t('pick')}</div>`; return; }
    const g = genCodes(p);
    const chips = [];
    if (p.sefaria && p.sefaria.two) chips.push(`<span class="chip warn">${t('two_people')}: ${esc(p.sefaria.two.map((x) => x.gen).join(' / '))}</span>`);
    else if (g.length) chips.push(`<span class="chip">${esc(g.map(genLabel).join(' / '))} <span class="s">${esc(g.join('/'))} · ${t('src_s')}</span></span>`);
    if (p.generation) chips.push(`<span class="chip grey">${S.lang === 'he' ? 'דור ' + HL[p.generation.value] : 'Gen. ' + p.generation.value} <span class="s">${t('jewishenc')}</span></span>`);
    if (p.nasi) chips.push(`<span class="chip">${t('nasi')}</span>`);
    if (p.kind === 'school') chips.push(`<span class="chip grey">${S.lang === 'he' ? 'בית מדרש' : 'school'}</span>`);
    if (p.kind === 'collective') chips.push(`<span class="chip grey">${S.lang === 'he' ? 'קול כללי' : 'unnamed voice'}</span>`);
    let html = `<div class="rail-head"><button class="close" id="close" aria-label="close">×</button><h2 class="he">${esc(heName(p))}</h2><div class="en-name">${esc(p.id)}</div><div class="chips">${chips.join('')}</div></div>`;
    html += yearsBlock(p);
    // the Mishnah numbers
    const tc = p.text_counts; const dc = p.dispute_counts;
    html += `<div class="rs"><span class="eyebrow">${t('in_mishnah')}</span>`;
    if (tc) {
      html += `<div class="stat"><div><b>${tc.mentions}</b><span>${t('mentions')}</span></div><div><b>${tc.mishnayos}</b><span>${t('mishnayos')}</span></div>${dc ? `<div><b>${dc.arguments}</b><span>${t('disputes')} (MishnaBase)</span></div>` : ''}</div>`;
      const mx = Math.max(1, ...KINDS.map((k) => tc.by_kind[k] || 0));
      html += KINDS.filter((k) => tc.by_kind[k]).map((k) => `<div class="krow"><span>${esc(kindName(k))}</span><span class="kb k-${k}" style="width:${(100 * tc.by_kind[k] / mx).toFixed(0)}%"></span><span class="kn">${tc.by_kind[k]}</span></div>`).join('');
    } else if (dc) {
      html += `<div class="stat"><div><b>${dc.arguments}</b><span>${t('disputes')} (MishnaBase)</span></div></div><p class="note">${S.lang === 'he' ? 'אין שם בטקסט; המספר הוא מן MishnaBase בלבד.' : 'No name in the text; the number is from MishnaBase only.'}</p>`;
    }
    html += '</div>';
    // Sefaria summary
    const sum = p.sefaria && !p.sefaria.two ? p.sefaria.desc : null;
    if (sum && (sum.he || sum.en)) {
      const txt = S.lang === 'he' ? (sum.he || sum.en) : (sum.en || sum.he);
      html += `<div class="rs"><span class="eyebrow">${t('summary')}</span><p class="bio ${S.lang === 'he' && sum.he ? 'he' : 'en'}">${esc(txt)}</p><div class="srcline">${t('summary_note')} <a href="https://www.sefaria.org/topics/${encodeURIComponent(p.sefaria.slug)}" target="_blank" rel="noopener">sefaria.org/topics/${esc(p.sefaria.slug)}</a></div></div>`;
    } else if (p.sefaria && p.sefaria.two) {
      html += `<div class="rs"><span class="eyebrow">${t('summary')}</span>${p.sefaria.two.map((r) => `<p class="bio ${S.lang === 'he' ? 'he' : 'en'}"><b>${esc(L(r.title))} (${esc(r.gen)})</b> ${esc(r.desc ? L(r.desc) : '')}</p>`).join('')}<div class="gapnote">${esc(p.sefaria.note)}</div></div>`;
    }
    // teachers, students, family
    const r = relations(p);
    const block = (lbl, list, showRel) => list.length ? `<div style="margin-bottom:8px"><div class="note" style="font-weight:700;margin-bottom:4px">${lbl}</div><div class="pills">${list.map((o) => relPill(o, showRel)).join('')}</div></div>` : '';
    const relHtml = block(t('teachers'), r.teachers) + block(t('students'), r.students) + block(t('family'), r.family, true) +
      (r.colleagues.length ? block(t('colleagues'), r.colleagues.map((c) => ({ id: c.id, src: [String(c.n)] }))) : '');
    if (relHtml) html += `<div class="rs"><span class="eyebrow">${S.lang === 'he' ? 'שלשלת' : 'Chain'} <a href="#" data-ego="1">${S.lang === 'he' ? 'פתח בתרשים ←' : 'open as a chart →'}</a></span>${relHtml}<div class="srcline">S = ${t('src_s')} · W = ${t('src_w')}</div></div>`;
    // identification notes
    const ids = {};
    (p.mishnayos || []).forEach((m) => { if (m.identified) { const k = m.identified.rule; (ids[k] = ids[k] || { src: m.identified.source, def: m.identified.default, refs: [] }).refs.push(m.ref); } });
    const idk = Object.keys(ids);
    if (idk.length || p.note) {
      html += `<div class="rs"><span class="eyebrow">${t('ident')}</span>${p.note ? `<p class="note" style="margin:0 0 6px">${esc(p.note)}</p>` : ''}${idk.map((k) => `<div class="ident">${ids[k].def ? `<span class="chip warn">${t('def_ident')}</span> ` : ''}${esc(ruleTxt(k))}${ids[k].src ? ` <b>(${esc(srcTxt(ids[k].src))})</b>` : ''} · ${ids[k].refs.length}</div>`).join('')}</div>`;
    }
    // mishnayos list by tractate
    if (p.mishnayos && p.mishnayos.length) {
      const by = {};
      p.mishnayos.forEach((m) => { const x = parseRef(m.ref); if (x) (by[x.t] = by[x.t] || []).push({ m, x }); });
      const order = D.meta.tractates.map((x) => x.key).filter((k) => by[k]);
      const biggest = order.slice().sort((a, b) => by[b].length - by[a].length)[0];
      html += `<div class="rs"><span class="eyebrow">${t('list_m')}</span><div class="mlist">` + order.map((k) => {
        const items = by[k].sort((a, b) => a.x.c - b.x.c || a.x.m - b.x.m).map(({ m, x }) => `<button class="mi${m.identified && m.identified.default ? ' def' : ''}" data-m="${esc(m.ref)}" title="${esc(kindName(m.kind))}"><i class="k-${m.kind}"></i>${S.lang === 'he' ? HL[x.c] + ':' + HL[x.m] : x.c + ':' + x.m}</button>`).join('');
        const sb = k === 'Beitzah' ? 'beitza.html' : k === 'Shabbat' ? 'shabbos.html' : null;
        return `<details class="mt"${k === biggest ? ' open' : ''}><summary><span>${esc(S.lang === 'he' ? TR[k].he : TR[k].en)}</span><span class="c">${by[k].length}</span></summary><div class="items">${items}</div>${sb ? `<div style="padding:0 9px 8px"><a class="note" href="${sb}">${S.lang === 'he' ? 'משנה כתורה שבעל פה ←' : 'The Mishnah as Torah She-Ba’al Peh →'}</a></div>` : ''}</details>`;
      }).join('') + '</div></div>';
    }
    // links out
    const out = [];
    if (p.sefaria && p.sefaria.slug) out.push(`<a href="https://www.sefaria.org/topics/${encodeURIComponent(p.sefaria.slug)}" target="_blank" rel="noopener">Sefaria</a>`);
    if (p.wikidata && p.wikidata.wikipedia_he) out.push(`<a href="${esc(p.wikidata.wikipedia_he)}" target="_blank" rel="noopener">ויקיפדיה</a>`);
    if (p.wikidata && p.wikidata.wikipedia_en) out.push(`<a href="${esc(p.wikidata.wikipedia_en)}" target="_blank" rel="noopener">Wikipedia</a>`);
    if (p.wikidata && p.wikidata.id) out.push(`<a href="https://www.wikidata.org/wiki/${esc(p.wikidata.id)}" target="_blank" rel="noopener">Wikidata</a>`);
    if (out.length) html += `<div class="rs"><span class="eyebrow">${t('links_out')}</span><div class="outl">${out.join('')}</div></div>`;
    box.innerHTML = html;
  }

  function yearsBlock(p) {
    if (p.kind !== 'person') return '';
    const rows = [];
    if (p.period) {
      const src = p.period.via === 'je'
        ? (S.lang === 'he' ? 'האנציקלופדיה היהודית, דור ' + p.period.je_gen : 'Jewish Encyclopedia, gen. ' + p.period.je_gen)
        : (S.lang === 'he' ? 'דור ' + genCodes(p)[0] + ' בספריא = דור ' + p.period.je_gen + ' באנציקלופדיה היהודית' : 'Sefaria ' + genCodes(p)[0] + ' = Jewish Encyclopedia gen. ' + p.period.je_gen);
      rows.push(`<div class="yr"><span class="yl">${t('period')}</span><span>${spanTxt(p.period.from, p.period.to)}<span class="ys">${esc(src)}</span></span></div>`);
    }
    if (p.life) ['born', 'died', 'floruit'].forEach((k) => { if (p.life[k] && p.life[k].length) rows.push(`<div class="yr"><span class="yl">${t(k)}</span><span>${p.life[k].map(lifeTxt).join(S.lang === 'he' ? ' או ' : ' or ')}<span class="ys">${esc(p.life.src)}</span></span></div>`); });
    const pl = {};
    (p.places || []).forEach((e) => { (pl[e.kind] = pl[e.kind] || []).push(e); });
    ['born', 'active', 'lived', 'died', 'buried'].forEach((k) => {
      if (!pl[k]) return;
      rows.push(`<div class="yr"><span class="yl">${t('p_' + k)}</span><span>${pl[k].map((e) => { const g = D.places[e.qid]; const label = esc(S.lang === 'he' ? (e.he || e.en) : (e.en || e.he)); return g && !g.region ? `<button class="plc" data-place="${esc(e.qid)}">${label}</button>` : label; }).join(', ')}<span class="ys">Wikidata</span></span></div>`);
    });
    const origin = /איש ([^ ]+(?: [^ ]+)?)$/.exec((p.name.he_display || p.name.he || '').replace(/ בן .*? איש /, ' איש '));
    if (origin) rows.push(`<div class="yr"><span class="yl">${t('from_name')}</span><span class="he">${esc('איש ' + origin[1])}</span></div>`);
    if (!rows.length) return `<div class="rs"><span class="eyebrow">${t('years')}</span><p class="note" style="margin:0">${t('no_years')}</p></div>`;
    return `<div class="rs"><span class="eyebrow">${t('years')}</span>${rows.join('')}</div>`;
  }

  /* ---------- view: map ---------- */
  let LMAP = null, LLAYER = null, LOADING = null;
  function loadLeaflet() {
    if (window.L && window.L.map) return Promise.resolve();
    if (LOADING) return LOADING;
    LOADING = new Promise((res, rej) => {
      const css = document.createElement('link'); css.rel = 'stylesheet'; css.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css'; document.head.appendChild(css);
      const js = document.createElement('script'); js.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js'; js.onload = res; js.onerror = rej; document.head.appendChild(js);
    });
    return LOADING;
  }
  function placeIndex() {
    const idx = {};
    D.people.forEach((p) => (p.places || []).forEach((e) => {
      const g = D.places[e.qid]; if (!g || g.region) return;
      if (S.mapk !== 'all' && e.kind !== S.mapk && !(S.mapk === 'active' && e.kind === 'lived')) return;
      const x = (idx[e.qid] = idx[e.qid] || { g, kinds: {} });
      (x.kinds[e.kind] = x.kinds[e.kind] || []).push(p.id);
    }));
    return idx;
  }
  function viewMap() {
    const seg = ['all', 'buried', 'born', 'died', 'active'].map((k) => `<button data-mk="${k}" class="${S.mapk === k ? 'on' : ''}">${t('k_' + k)}</button>`).join('');
    setTimeout(drawMap, 0);
    return `<nav class="seg sm" id="mapnav" style="margin-bottom:10px">${seg}</nav><div class="panel" style="padding:10px"><p class="note" style="margin:0 0 8px">${t('map_intro')}</p><div id="map"></div><div id="placebox"></div></div>`;
  }
  function placeHtml(qid) {
    const idx = placeIndex(); const x = idx[qid]; if (!x) return '';
    const g = x.g;
    const order = ['buried', 'born', 'active', 'lived', 'died'];
    return `<h3 style="margin-top:4px">${esc(S.lang === 'he' ? (g.he || g.en) : (g.en || g.he))}</h3>` + order.filter((k) => x.kinds[k]).map((k) => `<div style="margin:4px 0"><span class="note" style="font-weight:700">${t('p_' + k)}</span><div class="pills" style="margin-top:3px">${[...new Set(x.kinds[k])].map((id) => pill(id)).join('')}</div></div>`).join('');
  }
  async function drawMap() {
    const box = $('#map'); if (!box) return;
    try { await loadLeaflet(); } catch (e) { box.innerHTML = `<p class="note">${t('map_fail')}</p>`; box.style.height = 'auto'; return; }
    if (!$('#map')) return;
    if (LMAP) { LMAP.remove(); LMAP = null; }
    LMAP = window.L.map(box, { scrollWheelZoom: false }).setView([32.3, 35.1], 8);
    window.L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 15, attribution: '&copy; OpenStreetMap' }).addTo(LMAP);
    const idx = placeIndex(); const pts = [];
    Object.keys(idx).forEach((q) => {
      const x = idx[q]; const n = new Set([].concat(...Object.values(x.kinds))).size;
      const m = window.L.circleMarker([x.g.lat, x.g.lon], { radius: 6 + Math.min(10, n * 1.5), color: '#0a4f4c', weight: 2, fillColor: x.kinds.buried ? '#0e6e6a' : '#2f5d8a', fillOpacity: 0.75 }).addTo(LMAP);
      m.bindTooltip(`${esc(S.lang === 'he' ? (x.g.he || x.g.en) : (x.g.en || x.g.he))} · ${n}`, { direction: 'top' });
      m.on('click', () => { $('#placebox').innerHTML = placeHtml(q); $('#placebox').scrollIntoView({ block: 'nearest', behavior: 'smooth' }); });
      pts.push([x.g.lat, x.g.lon]);
    });
    const near = pts.filter(([a, b]) => b > 33 && b < 37 && a > 29 && a < 34.5);
    if (near.length > 1) LMAP.fitBounds(near, { padding: [20, 20] });
  }

  /* ---------- render + events ---------- */
  function render() {
    shell();
    const v = $('#view');
    if (S.view !== 'map' && LMAP) { LMAP.remove(); LMAP = null; }
    v.innerHTML = S.view === 'gen' ? viewGen() : S.view === 'chain' ? viewChain() : S.view === 'work' ? viewWork() : S.view === 'map' ? viewMap() : viewList();
    rail();
    writeHash();
  }
  const isPhone = () => window.matchMedia('(max-width:900px)').matches;
  function openSheet(on) {
    $('#rail').classList.toggle('open', on);
    $('#scrim').hidden = !on;
  }
  function select(id, opts) {
    if (!P[id]) return;
    S.sel = id;
    if (opts && opts.view) S.view = opts.view;
    render();
    if (isPhone()) openSheet(true); else $('#rail').scrollTop = 0;
  }
  function goRef(ref) {
    if (!ref || !parseRef(ref)) return;
    S.ref = ref; S.view = 'work'; QZ = null;
    openSheet(false); render(); window.scrollTo({ top: 0 });
  }
  document.addEventListener('click', (e) => {
    const lb = e.target.closest('.lang button');
    if (lb) { S.lang = lb.dataset.lang; try { localStorage.setItem('tannaim-lang', S.lang); } catch (x) { /* storage off */ } render(); return; }
    const vb = e.target.closest('#views button');
    if (vb) { S.view = vb.dataset.v; render(); return; }
    const mk = e.target.closest('#mapnav button');
    if (mk) { S.mapk = mk.dataset.mk; render(); return; }
    const pb = e.target.closest('[data-place]');
    if (pb) { S.view = 'map'; openSheet(false); render(); setTimeout(() => { const g = D.places[pb.dataset.place]; if (LMAP && g) LMAP.setView([g.lat, g.lon], 11); const b = $('#placebox'); if (b) b.innerHTML = placeHtml(pb.dataset.place); }, 400); window.scrollTo({ top: 0 }); return; }
    const cb = e.target.closest('#chainnav button');
    if (cb) { S.chain = cb.dataset.c; render(); return; }
    if (e.target.closest('#close') || e.target.closest('#scrim')) { openSheet(false); return; }
    const eg = e.target.closest('[data-ego]');
    if (eg) { e.preventDefault(); S.view = 'chain'; S.chain = 'ego'; openSheet(false); render(); window.scrollTo({ top: 0 }); return; }
    const qb = e.target.closest('[data-q]');
    if (qb && QZ) {
      const id = qb.dataset.id;
      if (qb.dataset.q === 'pool') { QZ.pool = QZ.pool.filter((x) => x !== id); QZ.ans.push(id); }
      else { QZ.ans = QZ.ans.filter((x) => x !== id); QZ.pool.push(id); }
      QZ.res = null; render(); return;
    }
    if (e.target.closest('#qreset')) { QZ = null; render(); return; }
    if (e.target.closest('#qcheck') && QZ) {
      let ok = true;
      for (let i = 1; i < QZ.ans.length; i++) if (genIdx(P[QZ.ans[i - 1]]) > genIdx(P[QZ.ans[i]])) ok = false;
      QZ.res = ok; render(); return;
    }
    const gb = e.target.closest('[data-go]');
    if (gb && gb.dataset.go) { goRef(gb.dataset.go); return; }
    const mb = e.target.closest('[data-m]');
    if (mb) { goRef(mb.dataset.m); return; }
    const sr = e.target.closest('#results [data-s]');
    if (sr) { $('#results').hidden = true; S.q = ''; $('#q').value = ''; $('#qx').hidden = true; select(sr.dataset.s, S.view === 'chain' ? { view: 'chain' } : null); return; }
    const sb = e.target.closest('[data-s]');
    if (sb) { select(sb.dataset.s); return; }
    const th = e.target.closest('th[data-sort]');
    if (th) { S.sort = th.dataset.sort; render(); return; }
    if (!e.target.closest('#searchbox')) $('#results').hidden = true;
  });
  document.addEventListener('change', (e) => {
    const r = S.ref ? parseRef(S.ref) : null; if (!r) return;
    if (e.target.id === 'pt') goRef(mkRef(e.target.value, 1, 1));
    else if (e.target.id === 'pc') goRef(mkRef(r.t, +e.target.value, 1));
    else if (e.target.id === 'pm') goRef(mkRef(r.t, r.c, +e.target.value));
  });
  function showResults() {
    const q = S.q.trim(); const box = $('#results');
    if (!q) { box.hidden = true; return; }
    const hits = D.people.filter((p) => matches(p, q)).sort((a, b) => mentions(b) - mentions(a)).slice(0, 12);
    if (!hits.length) { box.hidden = true; return; }
    box.innerHTML = hits.map((p) => `<button data-s="${esc(p.id)}"><span class="he">${esc(heName(p))}</span><span class="sr-en">${esc(p.id)}</span></button>`).join('');
    const r = $('#searchbox').getBoundingClientRect();
    box.style.top = (r.bottom + window.scrollY + 4) + 'px';
    box.style.right = (document.documentElement.clientWidth - r.right) + 'px';
    box.style.width = Math.max(240, r.width) + 'px';
    box.hidden = false;
  }
  let qt = null;
  $('#q').addEventListener('input', (e) => {
    S.q = e.target.value; $('#qx').hidden = !S.q;
    showResults();
    clearTimeout(qt); qt = setTimeout(() => { if (S.view === 'gen' || S.view === 'list') { const keep = document.activeElement === $('#q'); const pos = $('#q').selectionStart; $('#view').innerHTML = S.view === 'gen' ? viewGen() : viewList(); if (keep) { $('#q').focus(); try { $('#q').setSelectionRange(pos, pos); } catch (x) { /* ignore */ } } } }, 180);
  });
  $('#q').addEventListener('keydown', (e) => {
    if (e.key === 'Enter') { const f = $('#results [data-s]'); if (f) f.click(); }
    if (e.key === 'Escape') { $('#results').hidden = true; }
  });
  $('#qx').addEventListener('click', () => { S.q = ''; $('#q').value = ''; $('#qx').hidden = true; $('#results').hidden = true; render(); });
  window.addEventListener('hashchange', () => { readHash(); render(); });

  readHash();
  render();
  if (S.sel && isPhone() && location.hash.includes('s=')) openSheet(false);
})();
