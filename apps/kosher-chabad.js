/* Kosher Kretchma: Chabad centers (from the Chabad.org center directory), with a map and the services a traveler needs. */
(function () {
  "use strict";
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  const href = u => /^https?:/.test(u) ? u : "https://" + u;
  const NOTE = "Chabad centers are listed from the Chabad.org directory. A Chabad House is not a kosher certification listing; call ahead about meals and kashrus. This is for assistance only.";
  const FEAT = { hosp: "Shabbat/Holiday Hospitality", store: "Kosher Store", meals: "Kosher Meal Plan", guest: "Guest Accomodations", kosher: "Kitchen Koshering" };
  let C = [], META = null, filtered = [], shown = 0, map = null, layer = null, ready = false, current = null, here = null;
  const PAGE = 150, rail = () => $("rail");

  function railPrompt() {
    if (current) return showCenter(current);
    rail().innerHTML = `<div class="rail-sec"><div class="label">Chabad</div><p class="small" style="margin:4px 0 0">Choose a Chabad center on the map or in the list to see its address, phone, website and what it offers.</p></div><div class="rail-sec"><p class="small muted" style="margin:0">${NOTE}</p></div>`;
  }
  function showCenter(c) {
    current = c;
    const addr = [c.ad, c.ci, c.st, c.z, c.co].filter(Boolean).join(", ");
    const highlight = new Set(Object.values(FEAT));
    const svc = (c.s || []).slice().sort((a, b) => (highlight.has(b) - highlight.has(a)));
    rail().innerHTML = `<div class="rail-sec"><div class="label">${esc(c.t || "Chabad center")}</div>
        <h3 style="font-weight:600;font-size:20px;margin:2px 0 6px">${esc(c.n)}</h3>
        <dl class="kv">
          ${addr ? `<dt>Address</dt><dd>${esc(addr)}${c.ap ? `<br><span class="small muted">Map position is approximate.</span>` : ""}<br><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(c.n + ", " + addr)}" target="_blank" rel="noopener">Open in Maps</a></dd>` : ""}
          ${c.ph ? `<dt>Phone</dt><dd><a href="tel:${esc(c.ph.replace(/[^0-9+]/g, ""))}">${esc(c.ph)}</a></dd>` : ""}
          ${c.w ? `<dt>Website</dt><dd><a href="${esc(href(c.w))}" target="_blank" rel="noopener">${esc(c.w.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a></dd>` : ""}
        </dl></div>
      ${svc.length ? `<div class="rail-sec"><div class="label">Offers</div><div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px">${svc.map(x => `<span class="chip${highlight.has(x) ? " hl" : ""}">${esc(x === "Guest Accomodations" ? "Guest accommodations" : x)}</span>`).join("")}</div></div>` : ""}
      <div class="rail-sec"><p class="small muted" style="margin:0">${NOTE}</p></div>`;
  }
  function initMap() {
    if (map || !window.L || !$("cmap")) return;
    map = L.map("cmap", { scrollWheelZoom: false }).setView([42, -95], 4);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom: 19, attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' }).addTo(map);
    layer = L.markerClusterGroup ? L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 45 }) : L.layerGroup();
    map.addLayer(layer);
  }
  const icon = () => L.divIcon({ className: "kk-pin cb", html: "<span></span>", iconSize: [22, 22], iconAnchor: [11, 21] });
  function drawMap(fit) {
    initMap(); if (!map) return;
    layer.clearLayers();
    const pts = filtered.filter(c => c.lat != null);
    pts.forEach(c => { const m = L.marker([c.lat, c.lng], { icon: icon(), title: c.n }); m.bindTooltip(esc(c.n), { direction: "top", offset: [0, -18] }); m.on("click", () => showCenter(c)); layer.addLayer(m); });
    if (fit && pts.length && !here) map.fitBounds(L.latLngBounds(pts.map(c => [c.lat, c.lng])), { padding: [24, 24], maxZoom: 13 });
  }
  const miles = (a, b) => { const R = 3958.8, t = x => x * Math.PI / 180, dLa = t(b[0] - a[0]), dLo = t(b[1] - a[1]); const h = Math.sin(dLa / 2) ** 2 + Math.cos(t(a[0])) * Math.cos(t(b[0])) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
  function render(reset) {
    if (reset) {
      shown = 0;
      const q = norm($("cq").value), st = $("cstate").value, ty = $("ctype").value;
      const need = [...document.querySelectorAll(".cfeat:checked")].map(x => FEAT[x.value]);
      filtered = C.filter(c => (!st || c.st === st) && (!ty || c.t === ty) && need.every(n => (c.s || []).includes(n)) &&
        (!q || norm([c.n, c.ci, c.st, c.z, c.ad].join(" ")).includes(q)));
      if (here) { filtered.forEach(c => c._d = c.lat != null ? miles(here, [c.lat, c.lng]) : 1e9); filtered.sort((a, b) => a._d - b._d); }
      drawMap(true);
    }
    const slice = filtered.slice(0, shown + PAGE); shown = slice.length;
    $("ccount").textContent = `${filtered.length.toLocaleString()} of ${C.length.toLocaleString()} Chabad centers shown.`;
    $("crows").innerHTML = slice.map((c, i) => `<button class="row" data-i="${i}"><div><div class="nm">${esc(c.n)}</div><div class="ad">${esc([c.ci, c.st, c.co === "Canada" ? "Canada" : ""].filter(Boolean).join(", "))}${here && c._d < 1e9 ? ` · ${c._d < 10 ? c._d.toFixed(1) : Math.round(c._d)} mi` : ""}</div></div>
      <div class="ag">${esc(c.t || "")}</div>
      <div class="tags">${(c.s || []).filter(x => Object.values(FEAT).includes(x)).map(x => `<span class="chip hl">${esc(x === "Guest Accomodations" ? "Guest accommodations" : x)}</span>`).join("")}</div></button>`).join("") || `<div class="panel small">No Chabad centers match these choices.</div>`;
    $("cmore").hidden = shown >= filtered.length;
  }
  async function load() {
    if (ready) return; ready = true;
    try {
      const v = (document.querySelector('script[src*="kosher-chabad.js"]')?.src.split("v=")[1]) || "";
      const d = await (await fetch("kosher-chabad.json?v=" + v)).json();
      C = d.centers; META = d.meta;
      const opts = arr => `<option value="">All</option>` + arr.map(x => `<option>${esc(x)}</option>`).join("");
      $("cstate").innerHTML = opts([...new Set(C.map(c => c.st).filter(Boolean))].sort());
      $("ctype").innerHTML = opts([...new Set(C.map(c => c.t).filter(Boolean))].sort());
      $("cnote").innerHTML = `${esc(NOTE)} Source: <a href="https://www.chabad.org/centers/" target="_blank" rel="noopener">Chabad.org center directory</a>, copied ${esc(META.fetched)}.`;
      render(true);
    } catch { $("crows").innerHTML = `<div class="panel small">The Chabad list did not load. Reload the page to try again.</div>`; }
  }
  ["cq", "cstate", "ctype"].forEach(id => $(id) && $(id).addEventListener(id === "cq" ? "input" : "change", () => render(true)));
  document.addEventListener("change", e => { if (e.target.classList && e.target.classList.contains("cfeat")) render(true); });
  if ($("cmore")) $("cmore").onclick = () => render(false);
  if ($("crows")) $("crows").addEventListener("click", e => {
    const b = e.target.closest(".row"); if (!b) return;
    document.querySelectorAll("#crows .row").forEach(r => r.setAttribute("aria-current", r === b ? "true" : "false"));
    const c = filtered[+b.dataset.i]; showCenter(c);
    if (c.lat != null && map) map.setView([c.lat, c.lng], Math.max(map.getZoom(), 14));
    if (window.matchMedia("(max-width: 900px)").matches) rail().scrollIntoView({ behavior: "smooth", block: "start" });
  });
  if ($("cnear")) $("cnear").onclick = () => {
    if (!navigator.geolocation) return;
    $("cnear").textContent = "Finding you...";
    navigator.geolocation.getCurrentPosition(p => {
      here = [p.coords.latitude, p.coords.longitude]; $("cnear").textContent = "Near me (on)";
      initMap(); if (map) { map.setView(here, 11); L.circleMarker(here, { radius: 7, color: "#fff", weight: 2, fillColor: "#2f5d8a", fillOpacity: 1 }).addTo(map); }
      render(true);
    }, () => { $("cnear").textContent = "Near me"; }, { timeout: 15000 });
  };
  window.KK_CHABAD = { show() { railPrompt(); load().then(() => setTimeout(() => { if (map) { map.invalidateSize(); drawMap(!current); } }, 60)); } };
})();
