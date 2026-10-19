/* Kosher Kretchma: Chabad centers (from the Chabad.org center directory), with a map and the services a traveler needs. */
(function () {
  "use strict";
  /* List follows the map: zoomed in (level 7+), show only what is inside the map view, nearest the center first. */
  window.KK_VIEW = window.KK_VIEW || function (map, arr, here) {
    if (!map || here || map.getZoom() < 7) return arr;
    const b = map.getBounds(), c = map.getCenter(), R = 3958.8, t = x => x * Math.PI / 180;
    const dist = (la, lo) => { const h = Math.sin(t(la - c.lat) / 2) ** 2 + Math.cos(t(c.lat)) * Math.cos(t(la)) * Math.sin(t(lo - c.lng) / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
    return arr.filter(x => x.lat != null && b.contains([x.lat, x.lng])).map(x => [dist(x.lat, x.lng), x]).sort((a, z) => a[0] - z[0]).map(x => x[1]);
  };
  window.KK_VIEWNOTE = (list, all) => list === all ? "" : ` <b>${list.length.toLocaleString()} in this map area</b>, nearest the middle of the map first. Move or zoom out the map to see others.`;
  /* "You are here": one dot that moves in place as the device moves; the map follows until the user drags it. */
  window.KK_YOU = window.KK_YOU || function (map, ll, acc) {
    if (!map.getPane("you")) { map.createPane("you").style.zIndex = 650; }
    const st = map._kkYou || (map._kkYou = { follow: true });
    const r = Math.min(Math.max(acc || 0, 30), 3000);
    st.ll = ll;
    if (st.dot) { st.dot.setLatLng(ll); st.ring.setLatLng(ll).setRadius(r); }
    else {
      st.ring = L.circle(ll, { radius: r, pane: "you", color: "#b5532a", weight: 1, fillColor: "#b5532a", fillOpacity: .12, interactive: false }).addTo(map);
      st.dot = L.marker(ll, { pane: "you", interactive: false, keyboard: false,
        icon: L.divIcon({ className: "kk-you", html: '<span class="pulse"></span><span class="dot"></span><span class="lbl">You are here</span>', iconSize: [22, 22], iconAnchor: [11, 11] }) }).addTo(map);
      map.on("dragstart", () => { st.follow = false; });
      const C = L.Control.extend({ options: { position: "topleft" }, onAdd() {
        const b = L.DomUtil.create("button", "kk-you-btn"); b.type = "button"; b.title = "Back to my location"; b.setAttribute("aria-label", "Back to my location");
        b.innerHTML = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><circle cx="12" cy="12" r="4" fill="currentColor"/><circle cx="12" cy="12" r="8" fill="none" stroke="currentColor" stroke-width="2"/><path d="M12 1v4M12 19v4M1 12h4M19 12h4" stroke="currentColor" stroke-width="2"/></svg>';
        L.DomEvent.disableClickPropagation(b); b.onclick = () => { st.follow = true; map.setView(st.ll, Math.max(map.getZoom(), 14)); }; return b; } });
      new C().addTo(map);
      return;
    }
    if (st.follow) map.panTo(ll, { animate: true });
  };
  /* Watch the device position. onFirst runs once; onMove runs when it has moved more than about a quarter mile since the list was last sorted. */
  window.KK_WATCH = window.KK_WATCH || function (btn, getMap, onFirst, onMove) {
    if (!navigator.geolocation) return false;
    if (btn._watch != null) { const m = getMap(); if (m && m._kkYou) { m._kkYou.follow = true; m.setView(m._kkYou.ll, Math.max(m.getZoom(), 14)); } return true; }
    btn.textContent = "Finding you...";
    let first = true, sorted = null;
    const far = (a, b) => Math.abs(a[0] - b[0]) > 0.004 || Math.abs(a[1] - b[1]) > 0.005;
    btn._watch = navigator.geolocation.watchPosition(p => {
      const ll = [p.coords.latitude, p.coords.longitude];
      if (first) { first = false; sorted = ll; btn.textContent = "Near me (on)"; onFirst(ll, p.coords.accuracy); return; }
      const m = getMap(); if (m) window.KK_YOU(m, ll, p.coords.accuracy);
      if (far(ll, sorted)) { sorted = ll; onMove(ll); }
    }, () => { if (first) { navigator.geolocation.clearWatch(btn._watch); btn._watch = null; btn.textContent = "Near me"; } },
      { enableHighAccuracy: true, maximumAge: 5000, timeout: 20000 });
    return true;
  };
  const $ = id => document.getElementById(id);
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const norm = s => String(s || "").toLowerCase().replace(/[^a-z0-9]+/g, "");
  const href = u => /^https?:/.test(u) ? u : "https://" + u;
  const NOTE = "Chabad centers are listed from the Chabad.org directory. A Chabad House is not a kosher certification listing; call ahead about meals and kashrus. This is for assistance only.";
  const FEAT = { hosp: "Shabbat/Holiday Hospitality", store: "Kosher Store", meals: "Kosher Meal Plan", guest: "Guest Accomodations", kosher: "Kitchen Koshering" };
  let C = [], META = null, filtered = [], list = [], quiet = false, shown = 0, map = null, layer = null, ready = false, current = null, here = null;
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
      ${c.kg && c.kg.length ? `<div class="rail-sec"><div class="label">Kosher guide on their site</div>${c.kg.map(k => `<div class="small" style="margin-top:4px"><a href="${esc(k.href)}" target="_blank" rel="noopener">${esc(k.text || "Kosher page")}</a></div>`).join("")}</div>` : ""}
      ${svc.length ? `<div class="rail-sec"><div class="label">Offers</div><div style="display:flex;gap:4px;flex-wrap:wrap;margin-top:4px">${svc.map(x => `<span class="chip${highlight.has(x) ? " hl" : ""}">${esc(x === "Guest Accomodations" ? "Guest accommodations" : x)}</span>`).join("")}</div></div>` : ""}
      <div class="rail-sec"><p class="small muted" style="margin:0">${NOTE}</p></div>`;
  }
  function initMap() {
    if (map || !window.L || !$("cmap")) return;
    map = L.map("cmap", { scrollWheelZoom: false }).setView([42, -95], 4);
    map.on("moveend", () => { if (quiet) { quiet = false; return; } if (!here && C.length) { shown = 0; render(false); } });
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
      const food = $("cfood") ? $("cfood").checked : true;
      const FOOD = [FEAT.hosp, FEAT.store, FEAT.meals];
      filtered = C.filter(c => (!food || (c.kg && c.kg.length) || FOOD.some(x => (c.s || []).includes(x))) && (!st || c.st === st) && (!ty || c.t === ty) && need.every(n => (c.s || []).includes(n)) &&
        (!q || norm([c.n, c.ci, c.st, c.z, c.ad].join(" ")).includes(q)));
      if (here) { filtered.forEach(c => c._d = c.lat != null ? miles(here, [c.lat, c.lng]) : 1e9); filtered.sort((a, b) => a._d - b._d); }
      drawMap(true);
    }
    list = window.KK_VIEW(map, filtered, here);
    const slice = list.slice(0, shown + PAGE); shown = slice.length;
    $("ccount").innerHTML = `${filtered.length.toLocaleString()} of ${C.length.toLocaleString()} Chabad centers shown.${window.KK_VIEWNOTE(list, filtered)}${$("cfood") && $("cfood").checked ? " Showing centers that offer meals, a kosher store or a kosher guide." : ""}`;
    $("crows").innerHTML = slice.map((c, i) => `<button class="row" data-i="${i}"><div><div class="nm">${esc(c.n)}</div><div class="ad">${esc([c.ci, c.st, c.co === "Canada" ? "Canada" : ""].filter(Boolean).join(", "))}${here && c._d < 1e9 ? ` · ${c._d < 10 ? c._d.toFixed(1) : Math.round(c._d)} mi` : ""}</div></div>
      <div class="ag">${esc(c.t || "")}</div>
      <div class="tags">${c.kg && c.kg.length ? `<span class="chip hl">Kosher guide</span>` : ""}${(c.s || []).filter(x => Object.values(FEAT).includes(x)).map(x => `<span class="chip hl">${esc(x === "Guest Accomodations" ? "Guest accommodations" : x)}</span>`).join("")}</div></button>`).join("") || `<div class="panel small">No Chabad centers match these choices.</div>`;
    $("cmore").hidden = shown >= list.length;
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
  document.addEventListener("change", e => { if (e.target.classList && (e.target.classList.contains("cfeat") || e.target.id === "cfood")) render(true); });
  if ($("cmore")) $("cmore").onclick = () => render(false);
  if ($("crows")) $("crows").addEventListener("click", e => {
    const b = e.target.closest(".row"); if (!b) return;
    document.querySelectorAll("#crows .row").forEach(r => r.setAttribute("aria-current", r === b ? "true" : "false"));
    const c = list[+b.dataset.i]; showCenter(c);
    if (c.lat != null && map) { quiet = true; setTimeout(() => { quiet = false; }, 900); } if (c.lat != null && map) map.setView([c.lat, c.lng], Math.max(map.getZoom(), 14));
    if (window.matchMedia("(max-width: 900px)").matches) rail().scrollIntoView({ behavior: "smooth", block: "start" });
  });
  if ($("cnear")) $("cnear").onclick = () => {
    window.KK_WATCH($("cnear"), () => map,
      (ll, acc) => { here = ll; initMap(); if (map) { map.setView(here, 12); window.KK_YOU(map, here, acc); } render(true); },
      ll => { here = ll; render(true); });
  };
  window.KK_CHABAD = { show() { railPrompt(); load().then(() => setTimeout(() => { if (map) { map.invalidateSize(); drawMap(!current); } }, 60)); } };
})();
