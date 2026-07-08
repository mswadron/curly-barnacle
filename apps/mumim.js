/* mumim.js — renderer. Vanilla JS, no build step. */
(function(){
'use strict';
const D = window.MUMIM_DATA;
const esc = s => String(s==null?'':s).replace(/[&<>"]/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));
const sef = (url, label) => `<a class="sef" href="${esc(url)}" target="_blank" rel="noopener">${esc(label)} ↗</a>`;

function introHtml(){
  return `<div class="provbox">
    <span class="heb">${esc(D.intro.he)}</span>
    <span class="pref">${sef(D.intro.url, D.intro.ref)}</span>
    <div class="pen">${esc(D.intro.en)}</div>
  </div>`;
}

function klalHtml(k){
  const srcs = k.sources.map(s => `
    <div class="pasukbox" style="margin:8px 0 0;">
      <span class="heb">${esc(s.he)}</span>
      <div class="ref">${sef(s.url, s.label)}</div>
    </div>`).join('');
  return `<div class="klal">
    <div class="klal-he">${esc(k.he)}</div>
    <div class="klal-en">${esc(k.en)}</div>
    <div class="src">${srcs}</div>
    <div class="note">${esc(k.note || '')}</div>
  </div>`;
}

function termCard(t){
  const rashi = t.rashi ? `
    <div class="box-label gold">רש״י — as written</div>
    <div class="rashi"><span class="heb">${esc(t.rashi.he)}</span></div>` : '';
  const refs = [
    sef(t.pasukUrl, t.pasukRef),
    t.rashi ? sef(t.rashi.url, t.rashi.ref) : '',
    t.bavli ? sef(t.bavli.url, t.bavli.label) : ''
  ].filter(Boolean).join('');
  return `<div class="card" data-id="${esc(t.id)}">
    <div class="card-head">
      <span><span class="nm-he">${esc(t.he)}</span> <span class="nm-tr">${esc(t.translit)}</span></span>
      <span class="nm-en">${esc(t.en)} <span class="chev">+</span></span>
    </div>
    <div class="detail" style="display:none">
      ${rashi}
      <div class="note">${esc(t.note)}</div>
      <div class="refrow">${refs}</div>
    </div>
  </div>`;
}

function sectionHtml(s){
  const pesukim = s.pesukim.map(p => `
    <div class="pasukbox">
      <span class="heb">${esc(p.he)}</span>
      <div class="ref">${sef(p.url, p.ref)}</div>
    </div>`).join('');
  return `<div class="sec-head"><span class="sec-he">${esc(s.he)}</span><span class="sec-en">${esc(s.en)}</span></div>
    <div class="sec-lead">${esc(s.lead)}</div>
    ${pesukim}
    ${s.terms.map(termCard).join('')}`;
}

function render(){
  const app = document.getElementById('app');
  app.innerHTML = introHtml() + D.klalim.map(klalHtml).join('') + D.sections.map(sectionHtml).join('');
  app.querySelectorAll('.card-head').forEach(h => h.addEventListener('click', () => {
    const card = h.parentElement;
    const det = card.querySelector('.detail');
    const open = det.style.display !== 'none';
    det.style.display = open ? 'none' : 'block';
    card.classList.toggle('open', !open);
    h.querySelector('.chev').textContent = open ? '+' : '−';
  }));
}
render();
})();
