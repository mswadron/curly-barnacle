/* Kosher Kretchma: every agency on the cRc list, with its symbol and a short snapshot. */
(function () {
  "use strict";
  const CRC = window.KF_CRC, AG = CRC.agencies;
  const CHECK = document.body.dataset.check || "kosher.html";
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => String(s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "");
  const $ = id => document.getElementById(id);
  const href = u => /^https?:/.test(u) ? u : "https://" + u;
  let counts = {};

  $("symcountry").innerHTML += [...new Set(AG.map(a => a.country))].map(c => `<option>${esc(c)}</option>`).join("");
  $("crcdate").textContent = CRC.fetched;

  function card(a) {
    const n = counts[a.id] || 0;
    return `<article class="sym" id="${a.id}">
      <div class="sym-top"><div class="lg">${a.logo ? `<img src="${esc(a.logo)}" alt="${esc(a.name)} symbol" loading="lazy">` : ""}</div>
        <div class="sym-name"><h2>${esc(a.short || a.name)}</h2>${a.short ? `<div class="full">${esc(a.name)}</div>` : ""}<div class="loc">${esc([a.region, a.country].filter(Boolean).join(", "))}</div></div></div>
      <dl class="kv">
        ${a.rabbi ? `<dt>Rav</dt><dd>${esc(a.rabbi)}</dd>` : ""}
        ${a.address ? `<dt>Address</dt><dd>${esc(a.address)}</dd>` : ""}
        ${a.phone ? `<dt>Phone</dt><dd>${esc(a.phone)}</dd>` : ""}
        ${a.website ? `<dt>Website</dt><dd><a href="${esc(href(a.website))}" target="_blank" rel="noopener">${esc(a.website.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a></dd>` : ""}
        ${a.aliases?.length ? `<dt>Also called</dt><dd>${esc(a.aliases.join(", "))}</dd>` : ""}
      </dl>
      ${a.note ? `<p class="cnote">cRc note: ${esc(a.note)}</p>` : ""}
      <div class="sym-foot">${n ? `<a class="btn ghost" href="${esc(CHECK)}#eat-${a.id}">See its ${n.toLocaleString()} ${n === 1 ? "place" : "places"} to eat</a>` : `<span class="pl">No places to eat listed yet</span>`}</div>
    </article>`;
  }
  function render() {
    const q = norm($("symq").value), c = $("symcountry").value;
    const list = AG.filter(a => (!c || a.country === c) && (!q || norm([a.name, a.short, ...(a.aliases || []), a.region, a.country].join(" ")).includes(q)));
    $("symcount").textContent = `${list.length} of ${AG.length} agencies`;
    $("syms").innerHTML = list.map(card).join("") || `<p class="muted">No agency on the cRc list matches.</p>`;
  }
  $("symq").addEventListener("input", render);
  $("symcountry").addEventListener("change", render);
  render();
  fetch("kosher-places.json?v=202610182219").then(r => r.json()).then(d => {
    counts = d.places.reduce((m, p) => (m[p.a] = (m[p.a] || 0) + 1, m), {});
    render();
    if (location.hash) { const el = document.getElementById(location.hash.slice(1)); if (el) el.scrollIntoView(); }
  }).catch(() => {});
})();
