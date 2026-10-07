(function () {
  const D = window.PIYUT_DATA;
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
  const state = { sec: 'all', st: 'all', order: 'cal', active: null, fullSrc: null, expanded: new Set() };
  try { const s = JSON.parse(localStorage.getItem('piyut-r') || '{}'); Object.assign(state, { sec: s.sec || 'all', st: s.st || 'all', order: s.order || 'cal' }); } catch (e) {}
  const save = () => { try { localStorage.setItem('piyut-r', JSON.stringify({ sec: state.sec, st: state.st, order: state.order })); } catch (e) {} };

  const found = (e) => e.lit.length > 0;
  const slotName = (id) => (D.slots.find((x) => x.id === id) || {}).he || id;
  // how we know where it is said, in a few plain words
  const HOW = { text: 'נמצא במחזור', rishon: 'כך כתב', editor: 'בהערת המהדיר', context: 'מתוך דבריו', other: '', user: 'טרם אומת' };
  const marksToBold = (h) => h.replace(/<mark>/g, '<b>').replace(/<\/mark>/g, '</b>');

  // the Rishon's words around the first quoted line, so a closed entry shows the citation itself
  function excerpt(html) {
    const t = html.replace(/<(?!\/?mark>)[^>]+>/g, '');
    const a = t.indexOf('<mark>');
    if (a < 0) return t.length > 260 ? t.slice(0, 260).replace(/\s\S*$/, '') + ' …' : t;
    const b = t.indexOf('</mark>', a) + 7;
    let s = Math.max(0, a - 140), en = Math.min(t.length, b + 120);
    if (s > 0) { const sp = t.indexOf(' ', s); s = sp > -1 && sp < a ? sp + 1 : s; }
    if (en < t.length) { const sp = t.lastIndexOf(' ', en); en = sp > b ? sp : en; }
    let out = t.slice(s, en);
    const o = (out.match(/<mark>/g) || []).length, c = (out.match(/<\/mark>/g) || []).length;
    if (o > c) out += '</mark>';
    if (c > o) out = '<mark>' + out;
    return (s > 0 ? '… ' : '') + out + (en < t.length ? ' …' : '');
  }

  function whereLine(e, slot) {
    if (slot) {
      const w = e.when.find((x) => x[0] === slot);
      if (!w || !w[1]) return 'לא צוין היכן נאמר';
      const also = e.when.length > 1 ? `; ונזכר גם ב${e.when.filter((x) => x[0] !== slot).map((x) => esc(slotName(x[0]))).join(', ')}` : '';
      return `נאמר: <span class="where">${esc(w[2])}</span>${HOW[w[1]] ? ' (' + HOW[w[1]] + ')' : ''}${also}`;
    }
    if (!e.said) return 'לא צוין היכן נאמר';
    const [k, a, b] = e.said;
    if (k === 'other') return `נאמר: <span class="where">${esc(b)}</span>`;
    const how = { text: 'נמצא במחזור', rishon: 'כך כתב', editor: 'בהערת המהדיר', user: 'טרם אומת' }[k];
    return `נאמר: <span class="where">${esc(a)}</span>${how ? ' (' + how + ')' : ''}`;
  }

  function entry(e, slot) {
    const open = state.expanded.has(e.id);
    const lines = e.kind === 'content' ? '' : e.quotes.map((q) => `<div class="pline">${esc(q)}</div>`).join('');
    return `<article class="entry${state.active === e.id ? ' active' : ''}" tabindex="0" data-id="${e.id}">
      <div class="entry-line"><span class="ref">${esc(e.label)}</span>${e.paytan ? `<span class="paytan">${esc(e.paytan)}</span>` : ''}</div>
      ${lines}
      <p class="rishon">${marksToBold(open ? e.rishonHtml : excerpt(e.rishonHtml))}</p>
      <div class="foot-line">${whereLine(e, slot)}${found(e) ? '' : ' · נוסח הפיוט לא נמצא'} · <button type="button" class="more" data-more="${e.id}">${open ? 'בקצרה' : 'כל הדיבור'}</button></div>
    </article>`;
  }

  function opt(attr, val, label, on) {
    return `<button type="button" class="opt" id="${attr}-${val}" data-${attr}="${val}" aria-pressed="${on}">${esc(label)}</button>`;
  }
  const dot = '<span class="dot">·</span>';

  function renderOpts() {
    $('#secOpts').innerHTML = [{ id: 'all', he: 'כל הספרים' }].concat(D.sections).map((s) => opt('sec', s.id, s.he, state.sec === s.id)).join(dot);
    document.querySelectorAll('[data-ord]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.ord === state.order)));
    document.querySelectorAll('[data-st]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.st === state.st)));
  }

  function visible() {
    return D.entries.filter((e) => (state.sec === 'all' || e.sec === state.sec) &&
      (state.st === 'all' || (state.st === 'has') === found(e)));
  }

  function section(id, title, items, slot) {
    return `<section class="seder" id="${id}"><div class="seder-head"><h2>${esc(title)}</h2></div><hr class="seder-rule">
      ${items.map((e) => entry(e, slot)).join('')}</section>`;
  }

  function renderList() {
    const vis = visible();
    let out = '';
    if (state.order === 'cal') {
      const groups = D.slots.map((sl) => ({ sl, items: vis.filter((e) => e.when.some((w) => w[0] === sl.id)) })).filter((g) => g.items.length);
      if (groups.length) {
        out = `<nav class="jump" aria-label="מעבר לזמן בשנה">${groups.map((g) => `<button type="button" class="opt" data-jump="${g.sl.id}">${esc(g.sl.he)}</button>`).join(dot)}</nav>`
          + groups.map((g) => section('slot-' + g.sl.id, g.sl.he, g.items, g.sl.id)).join('');
      }
    } else {
      out = D.sections.map((s) => { const items = vis.filter((e) => e.sec === s.id); return items.length ? section('sec-' + s.id, s.he, items) : ''; }).join('');
    }
    $('#sections').innerHTML = out || '<p class="empty" style="text-align:center;color:var(--ink-soft)">אין מובאות כאלה.</p>';
  }

  function renderRail() {
    const e = D.entries.find((x) => x.id === state.active);
    if (!e) { $('#rail').innerHTML = '<p class="empty">בחר מובאה, והפיוט יופיע כאן.</p>'; return; }
    const cite = `<div class="cite">הובא ב${esc(e.label)} · <a href="${esc(e.url)}" target="_blank" rel="noopener">בספריא</a></div>`;
    if (!found(e)) {
      $('#rail').innerHTML = `<div class="rule-top"></div><h3>${esc(e.label)}</h3>
        <div class="absent">נוסח הפיוט לא נמצא בספריא. השורה כפי שהביא:${e.quotes.map((q) => `<span class="q">${esc(q)}</span>`).join('')}</div>
        <div class="cite">${whereLine(e)}</div>
        <div class="cite"><a href="${esc(e.url)}" target="_blank" rel="noopener">לדברי הראשון בספריא</a></div>`;
      return;
    }
    const bySrc = {};
    e.lit.forEach((l) => { (bySrc[l.src] = bySrc[l.src] || []).push(l); });
    const pages = Object.keys(bySrc).map((k) => {
      const S = D.lit[k], hits = bySrc[k];
      const hitMap = {}; hits.forEach((h) => { hitMap[h.seg] = h.segHtml; });
      const a = Math.min(...hits.map((h) => h.a)), b = Math.max(...hits.map((h) => h.b));
      const head = hits.map((h) => h.head).find((x) => x !== null && x !== undefined);
      const full = state.fullSrc === k + e.id;
      const notes = hits.filter((h) => h.note).map((h) => `<p class="note">${esc(h.note)}</p>`).join('');
      const para = (sg, i) => sg ? `<p class="${hitMap[i] ? 'hit' : ''}" ${hitMap[i] ? 'data-hit="1"' : ''}>${hitMap[i] || sg}</p>` : '';
      const lo = full ? Math.max(0, a - 20) : a, hi = full ? Math.min(S.segs.length - 1, b + 20) : b;
      const body = S.segs.slice(lo, hi + 1).map((sg, j) => para(sg, lo + j));
      const headHtml = !full && head !== undefined ? `<p class="head">${S.segs[head]}</p>` : '';
      return `<div class="rule-top"></div><h3>${esc(S.he)}</h3><div class="sub">${esc(S.nusach)} · <a href="${esc(S.url)}" target="_blank" rel="noopener">בספריא</a></div>
        ${notes}<div class="piyut">${headHtml}${body.join('')}</div>
        <button type="button" class="toggle" data-full="${k}">${full ? 'הפיוט בלבד' : 'עוד מן הסביבה במחזור'}</button>`;
    }).join('');
    $('#rail').innerHTML = pages + cite;
    const first = $('#rail [data-hit]');
    if (first) { const r = $('#rail'); r.scrollTop = Math.max(0, first.offsetTop - r.offsetTop - 140); }
  }

  function renderFoot() {
    $('#foot').innerHTML = `<hr class="rule">
      <p>לשון הראשונים והפיוטים מועתקת מספריא: הש״ס בדפוס וילנא, רש״י על התורה במהדורת רוזנבוים וזילברמן, והמחזורים כמצוין ליד כל פיוט.</p>
      <p>היכן נאמר כל פיוט: לפי המחזור שבו נמצא, לפי דברי הראשון עצמו, או לפי הערות המהדיר בספריא, כמצוין ליד כל מובאה. וראה המפתח לערך ״פייט״ בספר סדר הדורות. הרשימה עדיין אינה שלמה.</p>`;
  }

  document.addEventListener('click', (ev) => {
    const t = (s) => ev.target.closest(s);
    let b;
    if ((b = t('[data-sec]'))) { state.sec = b.dataset.sec; save(); renderOpts(); renderList(); return; }
    if ((b = t('[data-ord]'))) { state.order = b.dataset.ord; save(); renderOpts(); renderList(); return; }
    if ((b = t('[data-st]'))) { state.st = b.dataset.st; save(); renderOpts(); renderList(); return; }
    if ((b = t('[data-jump]'))) { const s = document.getElementById('slot-' + b.dataset.jump); if (s) s.scrollIntoView({ behavior: 'smooth', block: 'start' }); return; }
    if ((b = t('[data-full]'))) { const key = b.dataset.full + state.active; state.fullSrc = state.fullSrc === key ? null : key; renderRail(); return; }
    if ((b = t('[data-more]'))) { const id = b.dataset.more; state.expanded.has(id) ? state.expanded.delete(id) : state.expanded.add(id); renderList(); return; }
    if ((b = t('.entry'))) select(b.dataset.id);
  });
  document.addEventListener('keydown', (ev) => {
    if ((ev.key === 'Enter' || ev.key === ' ') && ev.target.classList && ev.target.classList.contains('entry')) { ev.preventDefault(); select(ev.target.dataset.id); }
  });
  function select(id) {
    state.active = id; state.fullSrc = null; renderList(); renderRail();
    if (window.matchMedia('(max-width:920px)').matches) $('#rail').scrollIntoView({ behavior: 'smooth', block: 'start' });
    const c = document.querySelector(`.entry[data-id="${id}"]`); if (c) c.focus({ preventScroll: true });
  }

  const h = location.hash.replace('#', '');
  state.active = (D.entries.find((e) => e.id === h) || D.entries.find(found)).id;
  renderOpts(); renderList(); renderRail(); renderFoot();
})();
