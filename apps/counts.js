/* counts.js — render logic for the Pekudim app
 * Vanilla JS. Five views (timeline / tribes / levites / method / growth).
 * Language toggle actually swaps content, not just CSS.
 */
(function(){
'use strict';

const D = window.COUNTS_DATA;

/* ============================================================
   STATE
   ============================================================ */
const state = {
  view: 'timeline',
  langs: { he: true, se: true, en: true },
  selected: 'descent',
  tribeSort: 'order'  // 'order' | 'delta'
};

/* ============================================================
   UTILS
   ============================================================ */
const $ = (sel, root) => (root||document).querySelector(sel);
const $$ = (sel, root) => Array.from((root||document).querySelectorAll(sel));
const fmt = n => n == null ? '' : n.toLocaleString('en-US');
const findEvent = id => D.events.find(e => e.id === id);
const escapeHtml = s => String(s||'').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));

/* ============================================================
   SEFARIA LINKING
   sefariaUrl: convert a human-readable ref to a Sefaria URL.
   linkRef:    return HTML anchor wrapping the ref text.
   ============================================================ */
function sefariaUrl(ref, commentator){
  if(!ref) return null;
  let r = String(ref).trim();
  if(!r || r === '—') return null;
  if(commentator) r = commentator + ' on ' + r;
  // Normalize en/em dashes to hyphens for ranges
  r = r.replace(/[–—]/g, '-');
  // Hebrew-transliterated book names → Sefaria's English titles (longer first)
  const books = [
    ['Divrei Hayamim II', 'II Chronicles'],
    ['Divrei Hayamim I',  'I Chronicles'],
    ['Shir HaShirim',     'Song of Songs'],
    ['Shmuel II',         'II Samuel'],
    ['Shmuel I',          'I Samuel'],
    ['Melachim II',       'II Kings'],
    ['Melachim I',        'I Kings'],
    ['Nechemiah',         'Nehemiah'],
    ['Yeshayahu',         'Isaiah'],
    ['Yirmiyahu',         'Jeremiah'],
    ['Yechezkel',         'Ezekiel'],
    ['Tehillim',          'Psalms'],
    ['Mishlei',           'Proverbs'],
    ['Eichah',            'Lamentations'],
    ['Koheles',           'Ecclesiastes'],
    ['Yehoshua',          'Joshua'],
    ['Shoftim',           'Judges'],
    ['Bereishis',         'Genesis'],
    ['Shemos',            'Exodus'],
    ['Vayikra',           'Leviticus'],
    ['Bamidbar',          'Numbers'],
    ['Devarim',           'Deuteronomy'],
    ['Hoshea',            'Hosea'],
    ['Bekhoros',          'Bekhorot']
  ];
  for(const [he, en] of books) r = r.split(he).join(en);
  // Require at least one digit to be a real verse/daf ref
  if(!/\d/.test(r)) return null;
  // ":" → "."
  r = r.replace(/:/g, '.');
  // First space immediately before a digit → "." (book/chapter boundary)
  r = r.replace(/ (?=\d)/, '.');
  // Remaining spaces → "_"
  r = r.replace(/ /g, '_');
  return 'https://www.sefaria.org/' + encodeURI(r);
}

function linkRef(ref, commentator){
  const url = sefariaUrl(ref, commentator);
  if(!url) return ref || '';
  return `<a href="${url}" target="_blank" rel="noopener" class="sef-link">${ref}</a>`;
}

/* Wrap a list of refs in clickable anchors and join with " · " */
function linkRefList(refs, commentator){
  if(!refs || !refs.length) return '';
  return refs.map(r => linkRef(r, commentator)).join(' · ');
}

/* Render a trilingual stack. Order: HE (block), SE (italic), EN. Skipped if toggled off. */
function tri(obj, opts){
  if(!obj) return '';
  opts = opts || {};
  const parts = [];
  if(state.langs.he && obj.he) parts.push(`<div class="${opts.heClass||'he-text'}" dir="rtl">${obj.he}</div>`);
  if(state.langs.se && obj.se) parts.push(`<div class="trans">${obj.se}</div>`);
  if(state.langs.en && obj.en) parts.push(`<div>${obj.en}</div>`);
  return parts.join('');
}

/* Inline trilingual — for places where we want them sitting side by side */
function triInline(obj){
  if(!obj) return '';
  const parts = [];
  if(state.langs.he && obj.he) parts.push(`<span class="he">${obj.he}</span>`);
  if(state.langs.en && obj.en) parts.push(`<span>${obj.en}</span>`);
  return parts.join(' ');
}

/* ============================================================
   HEADER CONTROLS
   ============================================================ */
function renderViewNav(){
  const views = [
    { id:'timeline', label:'Timeline' },
    { id:'purpose',  label:'Purpose' },
    { id:'method',   label:'Method' },
    { id:'tribes',   label:'Tribes' },
    { id:'levites',  label:'Levites' },
    { id:'excluded', label:'Excluded' },
    { id:'growth',   label:'Growth' },
    { id:'tanach',   label:'Tanach' },
    { id:'halacha',  label:'Halacha' }
  ];
  const html = views.map(v => `
    <button data-view="${v.id}" class="${state.view===v.id?'active':''}">${v.label}</button>
  `).join('');
  const nav = $('#viewnav');
  nav.innerHTML = html;
  $$('#viewnav button').forEach(b => b.addEventListener('click', () => {
    state.view = b.dataset.view;
    renderAll();
  }));
}

function renderLangGroup(){
  const langs = [
    { id:'he', label:'He', forced:true },
    { id:'se', label:'Se' },
    { id:'en', label:'En' }
  ];
  const html = langs.map(l => `
    <button data-lang="${l.id}" class="${state.langs[l.id]?'active':''}">${l.label}</button>
  `).join('');
  $('#langgroup').innerHTML = html;
  $$('#langgroup button').forEach(b => b.addEventListener('click', () => {
    const id = b.dataset.lang;
    // Hebrew is always on (per design system)
    if(id === 'he'){ state.langs.he = true; renderAll(); return; }
    state.langs[id] = !state.langs[id];
    // Don't let user turn off all non-hebrew (would be confusing) — but they can
    renderAll();
  }));
}

/* ============================================================
   TIMELINE VIEW
   ============================================================ */
function renderTimeline(){
  const events = D.events;
  const rows = events.map(ev => {
    const cat = D.categories[ev.category] || {};
    const isSelected = state.selected === ev.id;
    const isNarrative = ev.narrative;

    // Time block (left rail)
    const timeBlock = `
      <div class="tl-time">
        <div class="tl-time-yr">${timelineYear(ev)}</div>
        <div class="tl-time-label">${timelineLabel(ev)}</div>
        ${state.langs.he ? `<div class="tl-time-he">${timelineHe(ev)}</div>` : ''}
      </div>`;

    // Big number
    const bigNum = isNarrative
      ? `<div class="tl-bignum">~${fmt(ev.total)}</div><div class="tl-bignum-sub">narrative figure</div>`
      : `<div class="tl-bignum">${fmt(ev.total)}</div>${ev.totalNote ? `<div class="tl-bignum-sub">${ev.totalNote}</div>` : `<div class="tl-bignum-sub">counted</div>`}`;

    // Top row: ordinal + category, big number
    const ordHe = ['','א׳','ב׳','ג׳','ד׳','ה׳','ו׳','ז׳','ח׳','ט׳','י׳'][ev.ord] || ev.ord;
    const top = `
      <div class="tl-card-top">
        <div>
          <div style="margin-bottom:8px">
            <span class="cat-chip" data-cat="${ev.category}">${cat.en || ev.category}</span>
            <span class="tl-ord">#${ev.ord}</span>
            ${state.langs.he ? `<span class="tl-ord-he">${ordHe}</span>` : ''}
          </div>
          ${state.langs.he ? `<div class="tl-name-he">${ev.label.he}</div>` : ''}
          ${state.langs.en ? `<div class="tl-name-en">${ev.label.en}</div>` : ''}
          ${state.langs.se ? `<div class="tl-name-trans">${ev.label.se}</div>` : ''}
        </div>
        <div>${bigNum}</div>
      </div>`;

    // Meta grid (Age / Gender / Method / Purpose)
    const meta = `
      <div class="tl-meta">
        ${metaCell('Age', ev.age)}
        ${metaCell('Gender', ev.gender)}
        ${metaCell('Method', ev.method)}
        ${metaCell('Purpose', ev.purpose)}
      </div>`;

    return `
      <div class="tl-row">
        ${timeBlock}
        <div class="tl-card ${isNarrative?'narrative':''} ${isSelected?'active':''}"
             data-cat="${ev.category}" data-id="${ev.id}">
          ${top}
          ${meta}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="section-hdr">
      <div>
        <div class="section-eyebrow">Eight counts · chronological</div>
        <div class="section-title">Timeline ${state.langs.he ? '<span class="he">סֵדֶר זְמַנִּים</span>' : ''}</div>
      </div>
      <div class="section-meta">
        <div class="section-stat">Span · <strong>210 + 40 years</strong></div>
        <div class="section-stat">Final · <strong>${fmt(601730)}</strong> + Levi <strong>${fmt(23000)}</strong></div>
      </div>
    </div>
    <div class="tl-rail">${rows}</div>
    <div class="foot-note">Verses verified against Sefaria · Bereishis 46, Shemos 1/12/30/38, Bamidbar 1/3/4/26</div>
  `;
}

function timelineYear(ev){
  const map = {
    descent:    '−210',
    exodus:     '0',
    shekalim:   '1',
    bamidbar1:  '2',
    levi_chodesh: '2',
    bechorot:   '2',
    levi_avodah:'2',
    bamidbar26: '40'
  };
  return map[ev.id] || '';
}
function timelineLabel(ev){
  const map = {
    descent:    'Yrs before Exodus',
    exodus:     '15 Nissan',
    shekalim:   'Yr 1 · Tishrei?',
    bamidbar1:  '1 Iyyar Yr 2',
    levi_chodesh:'Iyyar Yr 2',
    bechorot:   'Iyyar Yr 2',
    levi_avodah:'Iyyar Yr 2',
    bamidbar26: 'Arvot Moav'
  };
  return map[ev.id] || '';
}
function timelineHe(ev){
  const map = {
    descent:    'יְרִידָה',
    exodus:     'יְצִיאָה',
    shekalim:   'מַחֲצִית הַשֶּׁקֶל',
    bamidbar1:  'בְּמִדְבַּר א׳',
    levi_chodesh:'לְוִיִּם — חֹדֶשׁ',
    bechorot:   'בְּכוֹרוֹת',
    levi_avodah:'לְוִיִּם — עֲבוֹדָה',
    bamidbar26: 'עַרְבוֹת מוֹאָב'
  };
  return map[ev.id] || '';
}

function metaCell(label, obj){
  return `
    <div class="tl-meta-cell">
      <div class="tl-meta-label">${label}</div>
      <div class="tl-meta-val">${tri(obj)}</div>
    </div>`;
}

/* ============================================================
   TRIBES VIEW
   ============================================================ */
function renderTribes(){
  const tribes = (state.tribeSort === 'delta')
    ? D.tribes.slice().sort((a,b) => (b.moav-b.sinai) - (a.moav-a.sinai))
    : D.tribes.slice();

  const rows = tribes.map(t => {
    const delta = t.moav - t.sinai;
    const pct = ((delta / t.sinai) * 100);
    const dir = delta > 0 ? 'up' : (delta < 0 ? 'down' : 'flat');
    const sign = delta > 0 ? '+' : '';
    const barMax = 80000;
    const wSinai = Math.min(100, (t.sinai/barMax)*100);
    const wMoav  = Math.min(100, (t.moav/barMax)*100);
    return `
      <tr class="tg-row ${state.selected===('tribe-'+t.id)?'active':''}" data-id="tribe-${t.id}">
        <td>
          <span class="tg-tribe">
            ${state.langs.he ? `<span class="tg-tribe-he">${t.label.he}</span>` : ''}
            ${state.langs.en ? `<span class="tg-tribe-en">${t.label.en}${state.langs.se ? ` · <em>${t.label.se}</em>`:''}</span>` : (state.langs.se ? `<span class="tg-tribe-en"><em>${t.label.se}</em></span>` : '')}
          </span>
        </td>
        <td>
          <div style="display:flex;align-items:center;gap:12px">
            <span class="tg-num">${fmt(t.sinai)}</span>
            <div class="tg-bar-wrap"><div class="tg-bar" style="width:${wSinai}%"></div></div>
          </div>
        </td>
        <td>
          <div style="display:flex;align-items:center;gap:12px">
            <span class="tg-num">${fmt(t.moav)}</span>
            <div class="tg-bar-wrap"><div class="tg-bar ${dir}" style="width:${wMoav}%"></div></div>
          </div>
        </td>
        <td>
          <span class="tg-delta ${dir}">${sign}${fmt(delta)}</span>
          <span class="tg-pct">${sign}${pct.toFixed(1)}%</span>
        </td>
      </tr>
    `;
  }).join('');

  const totalDelta = D.tribeTotals.moav - D.tribeTotals.sinai;
  const totalPct = ((totalDelta / D.tribeTotals.sinai) * 100).toFixed(2);
  const tdSign = totalDelta > 0 ? '+' : '';
  const tdDir = totalDelta > 0 ? 'up' : (totalDelta < 0 ? 'down' : 'flat');

  const leviDelta = D.leviteTotals.moav - D.leviteTotals.sinai;

  const notes = D.tribalNotes.map(n => {
    const cls = n.id === 'shimon-collapse' ? 'drop' : (n.id === 'menashe-gain' ? 'gain' : 'invert');
    const t = D.tribes.find(x => x.id === n.tribeId);
    const delta = t.moav - t.sinai;
    const pct = ((delta/t.sinai)*100).toFixed(1);
    const sign = delta > 0 ? '+' : '';
    return `
      <div class="tg-note-cell ${cls}">
        <div class="tg-note-hd">
          ${state.langs.en ? n.label.en : ''}
          ${state.langs.he ? `<span class="he">${n.label.he}</span>` : ''}
        </div>
        <div class="tg-note-stat">${sign}${fmt(delta)} (${sign}${pct}%)</div>
        <div class="tg-note-body">${n.en}</div>
      </div>
    `;
  }).join('');

  return `
    <div class="section-hdr">
      <div>
        <div class="section-eyebrow">Tribal census · Sinai vs Plains of Moav</div>
        <div class="section-title">Tribes ${state.langs.he ? '<span class="he">שְׁבָטִים</span>' : ''}</div>
      </div>
      <div class="section-meta">
        <div class="seg">
          <button data-sort="order" class="${state.tribeSort==='order'?'active':''}">Order</button>
          <button data-sort="delta" class="${state.tribeSort==='delta'?'active':''}">Delta</button>
        </div>
        <div class="section-stat">Net · <strong>${tdSign}${fmt(totalDelta)}</strong> (${tdSign}${totalPct}%)</div>
      </div>
    </div>
    <table class="tg-table">
      <thead>
        <tr>
          <th>Tribe</th>
          <th>Bamidbar 1 · 1 Iyyar Yr 2</th>
          <th>Bamidbar 26 · Yr 40</th>
          <th>Delta</th>
        </tr>
      </thead>
      <tbody>${rows}</tbody>
      <tfoot>
        <tr class="tg-foot">
          <td><span class="tg-tribe-en">Total · ${state.langs.he ? `<span class="he">סָךְ הַשְּׁבָטִים</span>`:''}</span></td>
          <td><span class="tg-num">${fmt(D.tribeTotals.sinai)}</span></td>
          <td><span class="tg-num">${fmt(D.tribeTotals.moav)}</span></td>
          <td><span class="tg-delta ${tdDir}">${tdSign}${fmt(totalDelta)}</span></td>
        </tr>
        <tr class="tg-levi">
          <td><span class="tg-tribe-en">Levi · counted separately (1 mo+) ${state.langs.he ? `<span class="he">לֵוִי בְּפָנֵי עַצְמוֹ</span>`:''}</span></td>
          <td><span class="tg-num">${fmt(D.leviteTotals.sinai)}</span></td>
          <td><span class="tg-num">${fmt(D.leviteTotals.moav)}</span></td>
          <td><span class="tg-delta up">+${fmt(leviDelta)}</span></td>
        </tr>
      </tfoot>
    </table>
    <div class="tg-note">${notes}</div>
    <div class="foot-note">Bamidbar 1:20–46 · Bamidbar 26:5–62</div>
  `;
}

/* ============================================================
   LEVITES VIEW
   ============================================================ */
function renderLevites(){
  const lc = findEvent('levi_chodesh');
  const la = findEvent('levi_avodah');
  const bc = findEvent('bechorot');

  function bdCard(ev, opts){
    opts = opts || {};
    const breakdown = ev.breakdown || [];
    const sum = breakdown.reduce((a,b) => a+b.value, 0);
    const sumNote = ev.totalNote ? ` <span style="font-weight:400;font-size:11px;letter-spacing:0;text-transform:none;color:var(--mute)">(${ev.totalNote})</span>` : '';
    return `
      <div class="lv-card" data-cat="${ev.category}" data-id="${ev.id}">
        <div class="lv-eyebrow">${opts.eyebrow}</div>
        ${state.langs.he ? `<div class="lv-title-he">${ev.label.he}</div>` : ''}
        ${state.langs.en ? `<div class="lv-title-en">${ev.label.en}</div>` : ''}
        ${state.langs.se ? `<div class="lv-title-trans">${ev.label.se}</div>` : ''}
        <div class="lv-big">${fmt(ev.total)}</div>
        <div class="lv-big-sub">${opts.bigsub}</div>
        ${breakdown.length ? `
          <div class="lv-divider"></div>
          ${breakdown.map(b => `
            <div class="lv-bd-row">
              <div class="lv-bd-name">
                ${state.langs.he ? `<span class="he">${b.label.he}</span>` : ''}
                ${state.langs.en ? b.label.en : ''}
              </div>
              <div style="text-align:right">
                <div class="lv-bd-num">${fmt(b.value)}</div>
                <div class="lv-bd-ref">${linkRef(b.ref)}</div>
              </div>
            </div>
          `).join('')}
          <div class="lv-sum">
            <div class="lv-sum-label">Sum of families</div>
            <div class="lv-sum-num">${fmt(sum)}${sumNote}</div>
          </div>
        ` : ''}
        ${opts.gapQ ? `
          <div class="lv-gap">
            <div class="lv-gap-q">${opts.gapQ}</div>
            <div class="lv-gap-a">${opts.gapA}</div>
          </div>
        ` : ''}
      </div>
    `;
  }

  // Math equation: 22,273 − 22,000 = 273 × 5 = 1,365 shekels
  const math = `
    <div class="lv-math">
      <div class="lv-math-hd">
        Redemption arithmetic
        ${state.langs.he ? '<span class="he">חֶשְׁבּוֹן הַפִּדְיוֹן</span>' : ''}
      </div>
      <div class="lv-math-eq">
        <div class="lv-eq-term">
          <div class="lv-eq-num">22,273</div>
          <div class="lv-eq-lbl">Firstborn · ${linkRef('Bamidbar 3:43')}</div>
        </div>
        <div class="lv-eq-op">−</div>
        <div class="lv-eq-term">
          <div class="lv-eq-num">22,000</div>
          <div class="lv-eq-lbl">Levites · ${linkRef('Bamidbar 3:39')}</div>
        </div>
        <div class="lv-eq-op">=</div>
        <div class="lv-eq-term result">
          <div class="lv-eq-num">273</div>
          <div class="lv-eq-lbl">Surplus firstborn</div>
        </div>
        <div class="lv-eq-op">×</div>
        <div class="lv-eq-term">
          <div class="lv-eq-num">5</div>
          <div class="lv-eq-lbl">Shekels each · ${linkRef('Bamidbar 3:47')}</div>
        </div>
        <div class="lv-eq-op">=</div>
        <div class="lv-eq-term result">
          <div class="lv-eq-num">1,365</div>
          <div class="lv-eq-lbl">Shekels to Aharon · ${linkRef('Bamidbar 3:50')}</div>
        </div>
      </div>
    </div>
  `;

  return `
    <div class="section-hdr">
      <div>
        <div class="section-eyebrow">Levite counts · why they are tracked apart</div>
        <div class="section-title">Levites ${state.langs.he ? '<span class="he">פְּקוּדֵי הַלְוִיִּם</span>' : ''}</div>
      </div>
      <div class="section-meta">
        <div class="section-stat">Age criteria · <strong>1 month</strong> · <strong>30–50</strong></div>
        <div class="section-stat">Excluded from <strong>military census</strong></div>
      </div>
    </div>
    <div class="lv">
      ${bdCard(lc, {
        eyebrow:'#5 · Census · 1 month and up',
        bigsub:'Levites — stated total (Bamidbar 3:39)',
        gapQ:'The 300 gap',
        gapA:'Family sum is 22,300 but the verse states 22,000. Rashi: the missing 300 are firstborn Levites — and a firstborn cannot redeem another firstborn, so they redeem themselves and don\'t count toward the redemption pool.'
      })}
      ${bdCard(bc, {
        eyebrow:'#6 · Counting Israelite firstborn',
        bigsub:'Firstborn of all Israel (1 month+)'
      })}
      ${bdCard(la, {
        eyebrow:'#7 · Census · workable years',
        bigsub:'Levites fit for active service (30–50)'
      })}
    </div>
    ${math}
    <div class="foot-note">Bamidbar 3:14–51 · Bamidbar 4:34–49</div>
  `;
}

/* ============================================================
   METHODOLOGY VIEW
   ============================================================ */
function renderMethod(){
  const cards = D.methods.map(m => {
    const eventChips = m.events.map(eid => {
      const ev = findEvent(eid);
      return `<span class="mth-event-chip">${ev ? ev.label.en : eid}</span>`;
    }).join('');
    return `
      <div class="mth-card" data-method="${m.id}">
        <div class="mth-eyebrow">${m.id === 'shekel' ? 'Indirect headcount' :
                                    m.id === 'narrative' ? 'Not a halachic mifkad' :
                                    m.id === 'roster' ? 'Personal roster' :
                                    m.id === 'family' ? 'By family unit' :
                                    'Direct census'}</div>
        ${state.langs.he ? `<div class="mth-name-he">${m.label.he}</div>` : ''}
        ${state.langs.en ? `<div class="mth-name-en">${m.label.en}</div>` : ''}
        ${state.langs.se ? `<div class="mth-name-trans">${m.label.se}</div>` : ''}
        <div class="mth-row">
          <div class="mth-row-lbl">What is counted</div>
          <div class="mth-row-body">${m.what.en}</div>
        </div>
        <div class="mth-row">
          <div class="mth-row-lbl">How</div>
          <div class="mth-row-body">${m.counts.en}</div>
        </div>
        <div class="mth-row">
          <div class="mth-row-lbl">Excludes</div>
          <div class="mth-row-body">${m.excludes.en}</div>
        </div>
        <div class="mth-events">${eventChips}</div>
      </div>
    `;
  }).join('');

  const disp = D.shemosBamidbarMachloket;
  const dispHtml = `
    <div class="mth-disp">
      <div class="mth-disp-hd">Machloket Rishonim ${state.langs.he ? '<span class="he">מַחֲלוֹקֶת רִאשׁוֹנִים</span>' : ''}</div>
      <div class="mth-disp-q">${disp.question.en}</div>
      ${disp.positions.map(p => `
        <div class="mth-pos">
          <div>
            <div class="mth-pos-who">${p.who}</div>
            <div class="mth-pos-who-ref">${linkRef(p.ref)}</div>
          </div>
          <div class="mth-pos-body">${p.position.en}</div>
        </div>
      `).join('')}
    </div>
  `;

  return `
    <div class="section-hdr">
      <div>
        <div class="section-eyebrow">How each count was performed</div>
        <div class="section-title">Method ${state.langs.he ? '<span class="he">דֶּרֶךְ הַסְּפִירָה</span>' : ''}</div>
      </div>
      <div class="section-meta">
        <div class="section-stat">Five distinct methods · one halachic principle</div>
      </div>
    </div>
    <div class="mth">${cards}</div>
    ${dispHtml}
    <div class="foot-note">Shemos 30:11–16 · Bamidbar 1:1–3 · Ramban Shemos 30:12 · Rashi Shemos 38:26</div>
  `;
}

/* ============================================================
   GROWTH VIEW
   ============================================================ */
function renderGrowth(){
  // Place nodes on a logarithmic x-axis weighted by year for visual rhythm
  // We'll do a "rebased" position: descent = 0%, then jump to ~30% for exodus, 50%/55%/60% for next three, 100% for moav
  const nodes = D.growth;
  const positions = [
    { id:'descent',    x:2 },
    { id:'exodus',     x:30 },
    { id:'shekalim',   x:42 },
    { id:'bamidbar1',  x:54 },
    { id:'bamidbar26', x:96 }
  ];

  const nodeHtml = nodes.map(n => {
    const p = positions.find(p => p.id === n.id);
    if(!p) return '';
    return `
      <div class="gr-node" style="left:${p.x}%;bottom:0">
        <div class="gr-node-num">${fmt(n.value)}</div>
        <div class="gr-node-name">${n.label.en}${state.langs.he ? ` <span class="gr-node-he">${n.label.he}</span>` : ''}</div>
        <div class="gr-node-tick"></div>
        <div class="gr-node-pt"></div>
      </div>
    `;
  }).join('');

  const multipliers = [
    {
      lbl:'70 → 600,000',
      num:'×8,571',
      body:'The single household of Yaakov becomes a nation of adult men only ~210 years later. The midrashic gloss on "vayishretzu vayirbu" (Shemos 1:7) describes six births at a time per pregnancy.'
    },
    {
      lbl:'Yr 1 → Yr 2',
      num:'0% change',
      body:'Both Shemos 38:26 and Bamidbar 1:46 record 603,550. Whether this reflects one census or two near-simultaneous ones is the classical Ramban-vs-Rashi machloket.'
    },
    {
      lbl:'Yr 2 → Yr 40',
      num:'−1,820',
      body:'The total drops from 603,550 to 601,730 across 38 years — the generation of the spies dying out, replaced by a new one. Shimon collapses, Menashe surges, the rest shift moderately.'
    }
  ];

  return `
    <div class="section-hdr">
      <div>
        <div class="section-eyebrow">Population arc · ~250 years</div>
        <div class="section-title">Growth ${state.langs.he ? '<span class="he">צְמִיחַת הָאֻמָּה</span>' : ''}</div>
      </div>
      <div class="section-meta">
        <div class="section-stat">From <strong>${fmt(70)}</strong> to <strong>${fmt(601730)}</strong></div>
      </div>
    </div>
    <div class="gr-line">
      <div class="gr-axis">
        ${nodeHtml}
        <div class="gr-axis-lbl">Descent — Yaakov's household</div>
        <div class="gr-axis-lbl right">Plains of Moav — entry generation</div>
      </div>
    </div>
    <div class="gr-context">
      <div class="gr-ctx">
        <div class="gr-ctx-eyebrow">The 210-year gap</div>
        <div class="gr-ctx-big">${fmt(70)} → ${fmt(600000)}</div>
        <div class="gr-ctx-sub">Implied per-generation multiplier ≈ 16×</div>
        <div class="gr-ctx-body">Counting only adult males at exit, the implied growth rate over the Egyptian sojourn is roughly an order of magnitude beyond natural birthrates. Rashi on Shemos 1:7 reads "vayishretzu" as women bearing six children at once — a literal answer to the demographic question.</div>
      </div>
      <div class="gr-ctx">
        <div class="gr-ctx-eyebrow">The 38-year correction</div>
        <div class="gr-ctx-big">−${fmt(1820)}</div>
        <div class="gr-ctx-sub">Net change Yr 2 → Yr 40</div>
        <div class="gr-ctx-body">Strikingly, after one full generation dies in the wilderness and is replaced by another, the total only changes by about 0.3%. The internal redistribution (Shimon −62.6%, Menashe +63.7%) is far more dramatic than the net.</div>
      </div>
    </div>
    <div class="gr-mult">
      ${multipliers.map(m => `
        <div class="gr-mult-cell">
          <div class="gr-mult-lbl">${m.lbl}</div>
          <div class="gr-mult-num">${m.num}</div>
          <div class="gr-mult-body">${m.body}</div>
        </div>
      `).join('')}
    </div>
    <div class="foot-note">Shemos 1:7 · Shemos 12:37 · Bamidbar 1:46 · Bamidbar 26:51</div>
  `;
}

/* ============================================================
   RAIL
   ============================================================ */
function renderRail(){
  if(state.view === 'tribes' && state.selected && state.selected.startsWith('tribe-')){
    return renderRailTribe(state.selected.replace('tribe-',''));
  }
  // Otherwise show the selected event
  let ev = findEvent(state.selected);
  if(!ev) ev = findEvent('descent');
  return renderRailEvent(ev);
}

function renderRailEvent(ev){
  const cat = D.categories[ev.category] || {};
  const refs = (ev.refs || []);
  const pasuk = ev.pasuk;
  const comments = ev.commentary || [];

  const commentHtml = comments.map(c => `
    <div class="comment-block">
      <div class="comment-who">${c.source}</div>
      <div class="comment-ref">${linkRef(c.ref, ['Rashi','Ramban','Ibn Ezra','Sforno','Rashbam'].includes(c.source) ? c.source : null)}</div>
      ${state.langs.he && c.he ? `<div class="comment-he">${c.he}</div>` : ''}
      ${state.langs.en && c.en ? `<div class="comment-en">${c.en}</div>` : ''}
    </div>
  `).join('');

  return `
    <div class="rail-hdr">
      <div class="rail-hdr-eyebrow"><span class="cat-chip" data-cat="${ev.category}">${cat.en}</span></div>
      <div class="rail-hdr-title">
        ${state.langs.he ? `<span class="he">${ev.label.he}</span>` : ''}
        <div>${ev.label.en}</div>
      </div>
    </div>

    <div class="rail-section">
      <div class="rail-eyebrow">Counted</div>
      <div style="display:flex;align-items:baseline;gap:14px">
        <div style="font-family:var(--display);font-weight:800;font-size:32px;color:var(--maroon-ink);font-variant-numeric:tabular-nums;letter-spacing:-0.01em">${ev.totalLabel || fmt(ev.total)}</div>
      </div>
      ${ev.totalNote ? `<div style="font-family:var(--display);font-size:10px;letter-spacing:0.14em;text-transform:uppercase;color:var(--mute);margin-top:4px">${ev.totalNote}</div>`:''}
      ${ev.leviteSubtotal ? `<div style="margin-top:8px;font-size:13px;color:var(--ink)">+ <span style="font-family:var(--display);font-weight:700;font-variant-numeric:tabular-nums">${fmt(ev.leviteSubtotal)}</span> Levi (1 mo+)</div>`:''}
    </div>

    <div class="rail-section">
      <div class="rail-eyebrow">Parameters</div>
      <div class="rail-row"><div class="rail-row-lbl">Time</div><div class="rail-row-val">${tri(ev.timing)}</div></div>
      <div class="rail-row"><div class="rail-row-lbl">Age</div><div class="rail-row-val">${tri(ev.age)}</div></div>
      <div class="rail-row"><div class="rail-row-lbl">Gender</div><div class="rail-row-val">${tri(ev.gender)}</div></div>
      <div class="rail-row"><div class="rail-row-lbl">Method</div><div class="rail-row-val">${tri(ev.method)}</div></div>
      <div class="rail-row"><div class="rail-row-lbl">Purpose</div><div class="rail-row-val">${tri(ev.purpose)}</div></div>
    </div>

    ${pasuk ? `
      <div class="rail-section">
        <div class="rail-eyebrow">Pasuk</div>
        <div class="pasuk-card">
          ${state.langs.he ? `<div class="pasuk-he">${pasuk.he}</div>` : ''}
          ${state.langs.se ? `<div class="pasuk-trans">${pasuk.se}</div>` : ''}
          ${state.langs.en ? `<div class="pasuk-en">${pasuk.en}</div>` : ''}
          <div class="pasuk-ref">${linkRef(pasuk.ref)}</div>
        </div>
      </div>
    `: ''}

    ${comments.length ? `
      <div class="rail-section">
        <div class="rail-eyebrow">Commentary</div>
        ${commentHtml}
      </div>
    `: ''}

    <div class="rail-section">
      <div class="rail-eyebrow">Sources</div>
      <div style="font-family:var(--display);font-size:11px;letter-spacing:0.06em;color:var(--maroon);text-transform:uppercase">${linkRefList(refs)}</div>
    </div>
  `;
}

function renderRailTribe(id){
  const t = D.tribes.find(x => x.id === id);
  if(!t) return renderRailEvent(findEvent('bamidbar1'));
  const delta = t.moav - t.sinai;
  const pct = ((delta/t.sinai)*100).toFixed(1);
  const sign = delta > 0 ? '+' : '';
  const dir = delta > 0 ? 'up' : (delta < 0 ? 'down' : 'flat');

  const note = D.tribalNotes.find(n => n.tribeId === id);

  return `
    <div class="rail-hdr">
      <div class="rail-hdr-eyebrow"><span class="cat-chip" data-cat="mifkad">Tribe</span></div>
      <div class="rail-hdr-title">
        ${state.langs.he ? `<span class="he">${t.label.he}</span>` : ''}
        <div>${t.label.en}</div>
      </div>
    </div>

    <div class="rail-section">
      <div class="rail-eyebrow">Sinai · 1 Iyyar Yr 2</div>
      <div style="font-family:var(--display);font-weight:800;font-size:28px;color:var(--maroon-ink);font-variant-numeric:tabular-nums;letter-spacing:-0.01em">${fmt(t.sinai)}</div>
    </div>

    <div class="rail-section">
      <div class="rail-eyebrow">Plains of Moav · Yr 40</div>
      <div style="font-family:var(--display);font-weight:800;font-size:28px;color:var(--maroon-ink);font-variant-numeric:tabular-nums;letter-spacing:-0.01em">${fmt(t.moav)}</div>
    </div>

    <div class="rail-section">
      <div class="rail-eyebrow">Delta</div>
      <div style="display:flex;align-items:baseline;gap:10px;font-family:var(--display);font-variant-numeric:tabular-nums">
        <span class="tg-delta ${dir}" style="font-size:24px">${sign}${fmt(delta)}</span>
        <span class="tg-pct" style="font-size:14px">${sign}${pct}%</span>
      </div>
    </div>

    ${note ? `
      <div class="rail-section">
        <div class="rail-eyebrow">${note.label.en}</div>
        ${state.langs.he ? `<div style="font-family:var(--hebrew);font-weight:700;direction:rtl;font-size:16px;margin-bottom:6px;color:var(--maroon-ink)">${note.label.he}</div>` : ''}
        <div style="font-size:14px;line-height:1.55;color:var(--ink)">${note.en}</div>
      </div>
    ` : `
      <div class="rail-section">
        <div class="rail-eyebrow">Note</div>
        <div style="font-size:14px;line-height:1.55;color:var(--mute);font-style:italic">No specific midrashic note attached to this tribe's shift between the two counts.</div>
      </div>
    `}
  `;
}

/* ============================================================
   PURPOSE MATRIX VIEW
   ============================================================ */
function renderPurpose(){
  const purposes = D.purposes;
  const matrix = D.purposeMatrix;
  const events = D.events;

  // Header row: empty cell + N purpose columns
  const headerCols = purposes.map(p => `
    <th>
      ${state.langs.he ? `<span class="he">${p.label.he}</span>` : ''}
      ${p.label.en}
    </th>
  `).join('');

  // Rows: 8 events
  const rows = events.map(ev => {
    const myPurposes = matrix[ev.id] || [];
    const cells = purposes.map(p => {
      const hit = myPurposes.includes(p.id);
      const dotClass = hit && p.id === 'chibah' ? 'pm-dot minor' : 'pm-dot';
      return `<td class="pm-cell">${hit ? `<span class="${dotClass}"></span>` : `<span class="pm-cell-empty">·</span>`}</td>`;
    }).join('');
    const sel = state.selected === ev.id ? 'active' : '';
    return `
      <tr class="pm-row ${sel}" data-id="${ev.id}">
        <td class="pm-event">
          ${state.langs.he ? `<span class="pm-event-he">${ev.label.he}</span>` : ''}
          <span class="pm-event-en">#${ev.ord} · ${ev.label.en}</span>
        </td>
        ${cells}
      </tr>
    `;
  }).join('');

  // Purpose definitions grid
  const defs = purposes.map(p => `
    <div class="pm-def">
      <div class="pm-def-lbl">${p.label.en}</div>
      ${state.langs.he ? `<div class="pm-def-he">${p.label.he}</div>` : ''}
      <div class="pm-def-src">${linkRef(p.source, p.commentator)}</div>
    </div>
  `).join('');

  return `
    <div class="section-hdr">
      <div>
        <div class="section-eyebrow">Why each count happens</div>
        <div class="section-title">Purpose ${state.langs.he ? '<span class="he">תַּכְלִית</span>' : ''}</div>
      </div>
      <div class="section-meta">
        <div class="section-stat">Eight counts · eleven purposes</div>
      </div>
    </div>
    <div class="pm">
      <table class="pm-table">
        <thead>
          <tr>
            <th class="row-hd">Count ${state.langs.he ? '<span class="he">מִפְקָד</span>':''}</th>
            ${headerCols}
          </tr>
        </thead>
        <tbody>${rows}</tbody>
      </table>
    </div>
    <div class="pm-legend">
      <div class="pm-legend-item"><span class="pm-dot"></span> Primary purpose stated in text</div>
      <div class="pm-legend-item"><span class="pm-dot minor"></span> Chibah / love-marker (Rashi's meta-purpose, applies to most)</div>
    </div>
    <div class="pm-defs">${defs}</div>
    <div class="foot-note">Sources verifiable on Sefaria · click any reference</div>
  `;
}

/* ============================================================
   EXCLUDED VIEW
   ============================================================ */
function renderExcluded(){
  const exclusions = D.exclusions;
  const cards = exclusions.map(ex => {
    const exceptionsHtml = ex.exceptions ? `
      <div class="ex-exceptions">
        <div class="ex-exceptions-hd">Named exceptions</div>
        ${ex.exceptions.map(e => `
          <div class="ex-exc-item">
            <div class="ex-exc-name">${e.name}</div>
            <div>${linkRef(e.ref)}</div>
          </div>
        `).join('')}
      </div>
    ` : '';
    return `
      <div class="ex-card" data-id="excl-${ex.id}">
        <div class="ex-hd">
          <div>
            ${state.langs.he ? `<div class="ex-name-he">${ex.label.he}</div>` : ''}
            <div class="ex-name-en">${ex.label.en}</div>
          </div>
          <div class="ex-src">${linkRef(ex.source)}</div>
        </div>
        <div class="ex-row">
          <div class="ex-row-lbl">Where excluded</div>
          <div class="ex-row-body">${ex.where.en}</div>
        </div>
        <div class="ex-row">
          <div class="ex-row-lbl">Why</div>
          <div class="ex-row-body">${ex.why.en}</div>
        </div>
        ${exceptionsHtml}
      </div>
    `;
  }).join('');

  return `
    <div class="section-hdr">
      <div>
        <div class="section-eyebrow">The negative space of the counts</div>
        <div class="section-title">Excluded ${state.langs.he ? '<span class="he">מִי שֶׁאֵינוֹ נִמְנֶה</span>' : ''}</div>
      </div>
      <div class="section-meta">
        <div class="section-stat">Five categories of structural absence</div>
      </div>
    </div>
    <div class="ex">${cards}</div>
    <div class="foot-note">${linkRef('Bamidbar 1:2')} · ${linkRef('Bamidbar 1:47-49')} · ${linkRef('Bamidbar 26:64-65')} · ${linkRef('Shemos 12:38')}</div>
  `;
}

/* ============================================================
   TANACH VIEW
   ============================================================ */
function renderTanach(){
  const counts = D.tanachCounts;
  const cards = counts.map(c => {
    const totalDisplay = c.kind === 'silence'
      ? `<div class="tn-total-silence">no count</div>`
      : `<div class="tn-total">${fmt(c.total)}</div>`;
    const eyebrow = c.kind === 'silence' ? 'Silence · land basis carried forward' :
                    c.kind === 'pre-war' ? 'Pre-war muster' :
                    c.kind === 'catastrophe' ? 'Catastrophic · plague follows' :
                    c.kind === 'labor' ? 'Labor census' :
                    c.kind === 'return' ? 'Restoration · post-Exile' : '';
    return `
      <div class="tn-card" data-kind="${c.kind}" data-id="tanach-${c.id}">
        <div class="tn-left">
          <div class="tn-eyebrow">${eyebrow}</div>
          ${state.langs.he ? `<div class="tn-name-he">${c.label.he}</div>` : ''}
          <div class="tn-name-en">${c.label.en}</div>
          ${totalDisplay}
          ${c.breakdown ? `<div class="tn-breakdown">${c.breakdown.en}</div>` : ''}
        </div>
        <div class="tn-right">
          <div class="tn-summary">${c.summary.en}</div>
          <div class="tn-detail">${c.detail.en}</div>
          <div class="tn-sources">${linkRefList(c.sources)}</div>
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="section-hdr">
      <div>
        <div class="section-eyebrow">Counts beyond Chumash</div>
        <div class="section-title">Tanach ${state.langs.he ? '<span class="he">תָּנָ"ךְ</span>' : ''}</div>
      </div>
      <div class="section-meta">
        <div class="section-stat">From Yehoshua's silence to the return from Bavel</div>
      </div>
    </div>
    <div class="tn">${cards}</div>
    <div class="foot-note">${linkRef('Bamidbar 26:53-54')} · ${linkRef('Shmuel I 11:8')} · ${linkRef('Shmuel I 15:4')} · ${linkRef('Shmuel II 24:9')} · ${linkRef('Divrei Hayamim I 21:5')} · ${linkRef('Melachim I 5:27-30')} · ${linkRef('Ezra 2:64')} · ${linkRef('Yoma 22b')}</div>
  `;
}

/* ============================================================
   HALACHA VIEW
   ============================================================ */
function renderHalacha(){
  // Render one source line: link + optional note. Handles en-dash vs hyphen mismatch.
  const srcRow = item => {
    if(!item) return '';
    const link = linkRef(item.ref);
    // Prefer explicit note field; otherwise derive from display by stripping ref text.
    let note = item.note || '';
    if(!note && item.display){
      const norm = s => String(s).replace(/[–—]/g, '-');
      const nDisplay = norm(item.display), nRef = norm(item.ref);
      if(nDisplay !== nRef){
        note = nDisplay.replace(nRef, '').replace(/^[—·\-\s]+/, '').trim();
      }
    }
    return `<div class="hl-row">${link}${note ? ' — ' + note : ''}</div>`;
  };

  const items = D.halacha;
  const cards = items.map(h => {
    const rabbinicHtml = (h.rabbinic||[]).map(srcRow).join('') || '<div class="hl-row" style="color:var(--mute)">—</div>';
    return `
      <div class="hl-card" data-id="hl-${h.id}">
        <div class="hl-hd">
          <div>
            ${state.langs.he ? `<div class="hl-name-he">${h.label.he}</div>` : ''}
            <div class="hl-name-en">${h.label.en}</div>
          </div>
        </div>
        <div class="hl-summary">${h.summary.en}</div>
        <div class="hl-grid">
          <div class="hl-col">
            <div class="hl-row-lbl">Torah source</div>
            ${srcRow(h.torahSource)}
            ${h.rambam ? `
              <div class="hl-row-lbl" style="margin-top:10px">Codified by Rambam</div>
              ${srcRow(h.rambam)}
            ` : ''}
          </div>
          <div class="hl-col">
            <div class="hl-row-lbl">Rabbinic source</div>
            ${rabbinicHtml}
          </div>
        </div>
        <div class="hl-detail">${h.detail.en}</div>
        <div class="hl-today">
          <div class="hl-today-lbl">Today</div>
          ${h.today.en}
        </div>
      </div>
    `;
  }).join('');

  return `
    <div class="section-hdr">
      <div>
        <div class="section-eyebrow">What each count became</div>
        <div class="section-title">Halacha ${state.langs.he ? '<span class="he">הֲלָכָה</span>' : ''}</div>
      </div>
      <div class="section-meta">
        <div class="section-stat">Four lines from Chumash to operative law</div>
      </div>
    </div>
    <div class="hl">${cards}</div>
    <div class="foot-note">${linkRef('Shemos 30:11-16')} · ${linkRef('Bamidbar 18:15-16')} · ${linkRef('Yoma 22b')} · ${linkRef('Mishnah Shekalim 1:1')} · ${linkRef('Bekhoros 8a')}</div>
  `;
}

/* ============================================================
   ORCHESTRATION
   ============================================================ */
function renderAll(){
  renderViewNav();
  renderLangGroup();

  const main = $('#main');
  if(state.view === 'timeline') main.innerHTML = renderTimeline();
  else if(state.view === 'purpose') main.innerHTML = renderPurpose();
  else if(state.view === 'method') main.innerHTML = renderMethod();
  else if(state.view === 'tribes') main.innerHTML = renderTribes();
  else if(state.view === 'levites') main.innerHTML = renderLevites();
  else if(state.view === 'excluded') main.innerHTML = renderExcluded();
  else if(state.view === 'growth') main.innerHTML = renderGrowth();
  else if(state.view === 'tanach') main.innerHTML = renderTanach();
  else if(state.view === 'halacha') main.innerHTML = renderHalacha();

  $('#rail').innerHTML = renderRail();
  attachMainHandlers();
}

function attachMainHandlers(){
  // Timeline cards
  $$('.tl-card').forEach(c => c.addEventListener('click', () => {
    state.selected = c.dataset.id;
    renderAll();
  }));
  // Tribal rows
  $$('.tg-row').forEach(r => r.addEventListener('click', () => {
    state.selected = r.dataset.id;
    renderAll();
  }));
  // Tribe sort buttons
  $$('.seg button[data-sort]').forEach(b => b.addEventListener('click', () => {
    state.tribeSort = b.dataset.sort;
    renderAll();
  }));
  // Levite cards
  $$('.lv-card').forEach(c => c.addEventListener('click', () => {
    state.selected = c.dataset.id;
    renderAll();
  }));
  // Purpose-matrix rows → select that event
  $$('.pm-row').forEach(r => r.addEventListener('click', () => {
    state.selected = r.dataset.id;
    renderAll();
  }));
}

/* INIT */
document.addEventListener('DOMContentLoaded', renderAll);

})();
