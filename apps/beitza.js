(function () {
  const D = window.BEITZA_DATA;
  let lang = 'he';
  let filter = null;
  let perek = 0;
  const HL = ['','א','ב','ג','ד','ה','ו','ז','ח','ט','י'];
  const numLabel = (id) => { const [c, i] = id.split('-'); return lang === 'he' ? HL[+c] + ':' + HL[+i] : c + ':' + i; };
  const $ = (s) => document.querySelector(s);
  const esc = (s) => String(s).replace(/[&<>]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[c]));

  function tagChip(n, small) {
    const t = D.tags[n];
    const label = lang === 'he' ? t.he : t.en;
    return `<span class="tag t${n}${small ? ' sm' : ''}" title="${esc(lang === 'he' ? t.desc.he : t.desc.en)}"><b>${n}</b>${esc(label)}</span>`;
  }

  function renderLegend() {
    const el = $('#legend');
    el.innerHTML = Object.keys(D.tags).map((k) => {
      const n = +k, t = D.tags[n];
      const count = scope().reduce((a, m) => a + m.moves.filter((mv) => mv.tags.includes(n)).length, 0);
      return `<button class="legend-item${filter === n ? ' on' : ''}" data-tag="${n}">
        ${tagChip(n)}
        <span class="ldesc">${esc(lang === 'he' ? t.desc.he : t.desc.en)}</span>
        <span class="lcount">${count}</span>
      </button>`;
    }).join('');
    el.querySelectorAll('.legend-item').forEach((b) => b.onclick = () => {
      const n = +b.dataset.tag;
      filter = filter === n ? null : n;
      render();
    });
    $('#clear').hidden = filter === null;
  }

  function moveHTML(mv) {
    const dim = filter !== null && !mv.tags.includes(filter);
    return `<div class="move${dim ? ' dim' : ''}">
      <div class="move-head">${mv.tags.map((n) => tagChip(n, true)).join('')}
        <span class="who">${esc(mv.who)}</span>
        <a class="daf" href="${mv.link}" target="_blank" rel="noopener">${esc(mv.daf)}</a></div>
      <p class="quote he">${esc(mv.q)}</p>
    </div>`;
  }

  function cardHTML(m) {
    const tagsHere = [...new Set(m.moves.flatMap((mv) => mv.tags))].sort((a, b) => a - b);
    const gap = m.gap ? `<div class="gap">
        <span class="eyebrow">${lang === 'he' ? 'מה שהגמרא מוסיפה' : 'What the Gemara adds'}<i class="ed">${lang === 'he' ? 'ניסוח העורך' : 'editor summary'}</i></span>
        <p class="${lang === 'he' ? 'he' : 'en'}">${esc(lang === 'he' ? m.gap.he : m.gap.en)}</p>
        ${lang === 'en' ? `<p class="he sub">${esc(m.gap.he)}</p>` : ''}
      </div>` : '';
    const moves = m.pending
      ? `<div class="pending">${lang === 'he' ? 'הגמרא על משנה זו טרם נשלפה ונבדקה. לא נכתב כאן דבר שאינו מן המקור.' : 'The Gemara on this Mishnah has not been pulled and checked yet. Nothing is written here that is not from the source.'}</div>`
      : m.moves.map(moveHTML).join('');
    const hal = m.halacha ? `<div class="halacha"><span class="eyebrow">${lang === 'he' ? 'הלכה' : 'Halacha'}</span>
        <span class="who">${esc(m.halacha.who)}</span> <a class="daf" href="${m.halacha.link}" target="_blank" rel="noopener">${esc(m.halacha.daf)}</a>
        <p class="quote he">${esc(m.halacha.q)}</p></div>` : '';
    return `<article class="card${m.pending ? ' is-pending' : ''}" id="m${m.id}">
      <header class="card-head">
        <div class="num">${numLabel(m.id)}</div>
        <div class="names"><h2 class="he">${esc(m.name.he)}</h2>${lang === 'en' ? `<div class="en-name">${esc(m.name.en)}</div>` : ''}</div>
        <div class="count">${m.pending ? '' : `<b>${tagsHere.length}</b><span>${lang === 'he' ? 'סוגים' : 'types'}</span>`}</div>
      </header>
      <div class="mishnah"><span class="eyebrow">${lang === 'he' ? 'משנה' : 'Mishnah'} · <a href="${m.link}" target="_blank" rel="noopener">${esc(m.ref)}</a></span>
        <p class="he mtext">${esc(m.text)}</p></div>
      ${gap}
      <div class="moves"><span class="eyebrow">${lang === 'he' ? 'הגמרא' : 'The Gemara'}</span>${moves}</div>
      ${hal}
      <div class="simen"><span class="eyebrow">${lang === 'he' ? 'סימן' : 'Mnemonic'}</span><span class="blank">${lang === 'he' ? 'יתווסף' : 'to come'}</span></div>
    </article>`;
  }

  function scope() { return perek ? D.mishnayos.filter((m) => m.perek === perek) : D.mishnayos; }

  function renderNav() {
    const btn = (n, label) => `<button data-p="${n}" class="${perek === n ? 'on' : ''}">${label}</button>`;
    $('#pereknav').innerHTML = btn(0, lang === 'he' ? 'כל המסכת' : 'All') +
      D.perakim.map((p) => btn(p.n, lang === 'he' ? `${HL[p.n]} · ${p.he}` : `${p.n} · ${p.en}`)).join('');
    $('#pereknav').querySelectorAll('button').forEach((b) => b.onclick = () => { perek = +b.dataset.p; render(); window.scrollTo({ top: 0 }); });
  }

  function render() {
    document.documentElement.lang = lang;
    $('#title').textContent = D.title.he;
    $('#masechta').textContent = D.title.sub + (lang === 'en' ? ' · ' + D.title.suben : '');
    $('#subtitle').textContent = lang === 'en' ? D.title.en : '';
    $('#intro').innerHTML = `<p class="${lang}">${esc(D.intro[lang])}</p>`;
    $('#intro').dir = lang === 'he' ? 'rtl' : 'ltr';
    $('#legend-title').textContent = lang === 'he' ? 'דרכי הלימוד: עשרה סוגים' + (perek ? ' · פרק ' + HL[perek] : '') : 'Ten kinds of teaching' + (perek ? ' · Perek ' + perek : '');
    $('#legend-hint').textContent = lang === 'he' ? 'לחץ על סוג כדי להדגיש אותו בכל המשניות' : 'Tap a type to highlight it across every Mishnah';
    $('#clear').textContent = lang === 'he' ? 'הצג הכל' : 'Show all';
    renderLegend();
    renderNav();
    const list = filter === null ? scope() : scope().filter((m) => m.moves.some((mv) => mv.tags.includes(filter)));
    let html = '', last = 0;
    for (const m of list) {
      if (m.perek !== last) {
        const p = D.perakim[m.perek - 1];
        html += `<h2 class="perek-head"><span class="pl">${lang === 'he' ? 'פרק ' + HL[p.n] : 'Perek ' + p.n}</span> <span class="he">${esc(p.he)}</span>${lang === 'en' ? ` <span class="pen">${esc(p.en)}</span>` : ''}</h2>`;
        last = m.perek;
      }
      html += cardHTML(m);
    }
    $('#cards').innerHTML = html || `<p class="empty">${lang === 'he' ? 'אין משניות מסוג זה בפרק זה.' : 'No Mishnayos of this type in this perek.'}</p>`;
    document.querySelectorAll('.lang button').forEach((b) => b.classList.toggle('on', b.dataset.lang === lang));
  }

  document.querySelectorAll('.lang button').forEach((b) => b.onclick = () => { lang = b.dataset.lang; render(); });
  $('#clear').onclick = () => { filter = null; render(); };
  render();
})();
