/* Kosher Finder (limudlab): check a hechsher against the cRc list and the user's own lists; certified places to eat.
   Scan: the photo goes to /api/hechsher-scan (Cloudflare Pages Function, Claude reads the symbol).
   If that is not available (no key set, or the github.io mirror), the page compares the photo with the
   logo images on the device and offers the closest-looking logos to confirm. */
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
  const CRC = window.KF_CRC;
  const AG = CRC.agencies;
  const OTH = (CRC.others || []).map(a => ({ ...a, other: true }));
  const byId = Object.fromEntries([...AG, ...OTH].map(a => [a.id, a]));
  const norm = s => String(s || "").toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9֐-׿]+/g, "");
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const $ = id => document.getElementById(id);
  const rail = $("rail");
  const LS_KEY = "kf-lists-v1";
  let builtinLists = [];      // from kosher-lists.json (lists added to the site)
  let myLists = [];           // pasted on this device
  let current = { kind: null, id: null, text: null, desc: null };

  const ICON = { meat: "i-meat", dairy: "i-cup", pareve: "i-leaf", fish: "i-fish" };
  const TYPE_ICON = { bakery: "i-bread", cafe: "i-cup", grocery: "i-store", butcher: "i-store", caterer: "i-cake", pizza: "i-plate", restaurant: "i-plate", takeout: "i-plate" };
  const svg = (id, cls) => `<svg class="${cls || "ico"}" aria-hidden="true"><use href="#${id}"/></svg>`;
  function toast(msg) { const t = $("toast"); t.textContent = msg; t.hidden = false; clearTimeout(toast._t); toast._t = setTimeout(() => t.hidden = true, 2200); }
  // Lists a hechsher can be checked against. The cRc list is built in; others come from kosher-lists.json or are pasted on this device.
  const DISCLAIMER = "This is for assistance only. Statuses change, so please double-check the lists and the supervision.";
  const CRC_LIST = { id: "crc", name: "cRc recommended agencies", crc: true, entries: AG };
  const allLists = () => [CRC_LIST, ...builtinLists.map((l, i) => ({ ...l, id: l.id || "site" + i })), ...myLists];
  const CK_KEY = "kf-checked-v1";
  let checked = new Set(["crc"]);
  try { const v = JSON.parse(localStorage.getItem(CK_KEY) || "null"); if (Array.isArray(v)) checked = new Set(v); } catch {}
  const checkedLists = () => allLists().filter(L => checked.has(L.id));
  const agencyOnList = (L, a) => L.crc ? !!(a && byId[a.id] && !a.other) : !!(a && inList(L, a));
  const agencyOnChecked = a => checkedLists().some(L => agencyOnList(L, a));

  /* ---------- matching ---------- */
  const keysFor = a => [a.name, a.short, ...(a.aliases || [])].filter(Boolean).map(norm);
  let extrasById = {};
  function universe() {
    extrasById = {};
    const out = AG.filter(agencyOnChecked);
    for (const L of checkedLists()) {
      if (L.crc) continue;
      L.entries.forEach((e, i) => {
        if (AG.some(a => inList({ entries: [e] }, a))) return;
        const id = "x-" + L.id + "-" + i;
        const x = { id, name: e.name, short: null, aliases: e.aliases || [], region: "", country: "", extra: true, listName: L.name };
        extrasById[id] = x; out.push(x);
      });
    }
    return out;
  }
  function searchAgencies(q) {
    const n = norm(q), U = universe();
    if (!n) return [...U].sort((x, y) => (x.short || x.name).localeCompare(y.short || y.name));
    const scored = [];
    for (const a of U) {
      const ks = keysFor(a);
      let s = 0;
      if (ks.some(k => k === n)) s = 3;
      else if (ks.some(k => k.startsWith(n))) s = 2;
      else if (n.length >= 4 && (ks.some(k => k.includes(n)) || norm((a.region || "") + " " + (a.country || "")).includes(n))) s = 1;
      else if (n.length < 4 && String(a.name).toLowerCase().split(/[^a-z0-9]+/).some(w => w.startsWith(n))) s = 1;
      if (s) scored.push([s, a]);
    }
    return scored.sort((x, y) => y[0] - x[0]).map(x => x[1]);
  }
  function inList(list, agency, freeText) {
    const keys = agency ? keysFor(agency) : [];
    if (freeText) keys.push(norm(freeText));
    return list.entries.find(e => [e.name, ...(e.aliases || [])].map(norm).some(k => k && keys.includes(k)));
  }

  /* ---------- result panel ---------- */
  function statusRows(agency, freeText) {
    const lists = checkedLists();
    if (!lists.length) return `<div class="status"><div class="st no"><b>No list chosen</b>Tick at least one list under "Approved by".</div></div>`;
    let h = "";
    for (const L of lists) {
      if (L.crc) {
        h += agency && !agency.other
          ? `<div class="st yes"><b>On the cRc recommended list</b>${agency.note ? esc(agency.note) : "Recommended by the cRc."}</div>`
          : `<div class="st no"><b>Not on the cRc recommended list</b>The cRc notes that an agency not on its list is not necessarily substandard; ask your rav.</div>`;
        continue;
      }
      const hit = inList(L, agency, freeText);
      h += hit ? `<div class="st yes"><b>On ${esc(L.name)}</b>Listed as ${esc(hit.name)}</div>`
               : `<div class="st no"><b>Not on ${esc(L.name)}</b>No entry on this list matches.</div>`;
    }
    return `<div class="status">${h}</div>`;
  }
  const logoImg = a => a && a.logo ? `<img src="${esc(a.logo)}" alt="${esc(a.name)} symbol" loading="lazy">` : "";
  const href = u => /^https?:/.test(u) ? u : "https://" + u;
  function showAgency(id) {
    const a = byId[id]; if (!a) return;
    current = { kind: "agency", id };
    const n = placesByAgency[id] || 0;
    rail.innerHTML = `
      <div class="rail-sec"><div class="label">Hechsher</div>
        <div class="verdict"><div class="lg">${logoImg(a)}</div><div><h3>${esc(a.name)}</h3><div class="small muted">${esc([a.region, a.country].filter(Boolean).join(", "))}</div></div></div>
        ${statusRows(a)}
      </div>
      <div class="rail-sec"><div class="label">The agency</div><dl class="kv">
        ${a.address ? `<dt>Address</dt><dd>${esc(a.address)}</dd>` : ""}
        ${a.rabbi ? `<dt>Rav</dt><dd>${esc(a.rabbi)}</dd>` : ""}
        ${a.phone ? `<dt>Phone</dt><dd>${esc(a.phone)}</dd>` : ""}
        ${a.website ? `<dt>Website</dt><dd><a href="${esc(href(a.website))}" target="_blank" rel="noopener">${esc(a.website.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a></dd>` : ""}
      </dl></div>
      ${n ? `<div class="rail-sec"><div class="label">${svg("i-plate")} Places to eat</div><p class="small" style="margin:4px 0 10px">${n.toLocaleString()} places under this hechsher.</p><button class="btn ghost" id="seeplaces">Show them</button></div>` : ""}`;
    const sp = $("seeplaces"); if (sp) sp.onclick = () => { ["q", "fstate", "ftype", "fcat"].forEach(x => { $(x).value = ""; }); { const f = $("fagency"); if (![...f.options].some(o => o.value === id)) f.add(new Option(id, id)); f.value = id; } go("eat"); renderRows(true); };
  }
  function showUnmatched(text, desc) {
    current = { kind: "free", text, desc };
    rail.innerHTML = `<div class="rail-sec"><div class="label">Hechsher</div>
      <div class="verdict"><div><h3>${esc(text || "Symbol not recognized")}</h3>${desc ? `<div class="small muted">${esc(desc)}</div>` : ""}</div></div>
      ${statusRows(null, text)}
      <p class="small muted" style="margin-top:10px">If the symbol is in the list on this page, choose it there to check that agency directly.</p></div>`;
  }
  function railEmpty() {
    current = { kind: null };
    rail.innerHTML = `<div class="rail-sec"><div class="label">Result</div><p class="small" style="margin:4px 0 0">Scan a symbol, or choose it from the list. The answer shows here: whether the agency is on each list you tick.</p></div>
      <div class="rail-sec"><div class="label">Checking against</div><p class="small" style="margin:4px 0 0">${checkedLists().map(l => esc(l.name) + " (" + l.entries.length + ")").join("<br>") || "No list chosen"}</p></div>`;
  }
  const reveal = () => { if (window.matchMedia("(max-width: 900px)").matches) rail.scrollIntoView({ behavior: "smooth", block: "start" }); };
  function refreshRail() {
    if (current.kind === "agency") showAgency(current.id);
    else if (current.kind === "free") showUnmatched(current.text, current.desc);
    else railEmpty();
  }

  /* ---------- check view ---------- */
  $("crcdate").textContent = CRC.fetched;
  // Dropdown of the cRc agencies, each with its logo; typing filters it.
  const box = $("agq"), listEl = $("aglist");
  let opts = [], active = -1;
  function openList(show) { listEl.hidden = !show; box.setAttribute("aria-expanded", show ? "true" : "false"); }
  function renderLogos() {
    const q = box.value.trim();
    opts = searchAgencies(q);
    active = opts.length ? 0 : -1;
    listEl.innerHTML = opts.map((a, i) => `<li role="option" id="opt-${a.id}" data-id="${a.id}" aria-selected="${i === active}"><span class="lg">${logoImg(a)}</span><span class="tx"><b>${esc(a.short || a.name)}</b>${a.short ? `<span>${esc(a.name)}</span>` : ""}<span class="loc">${esc(a.extra ? "On " + a.listName : [a.region, a.country].filter(Boolean).join(", "))}</span></span></li>`).join("")
      || `<li class="none">No agency on the lists you ticked matches “${esc(q)}”. <button class="btn ghost" id="checkfree" type="button">Check “${esc(q)}” against my lists</button></li>`;
    const cf = $("checkfree"); if (cf) cf.onclick = e => { e.stopPropagation(); openList(false); showUnmatched(q); reveal(); };
    $("agcount").textContent = `${opts.length} ${opts.length === 1 ? "agency" : "agencies"} on the lists you ticked`;
  }
  function pick(id) {
    const x = extrasById[id]; if (x) { box.value = x.name; openList(false); showUnmatched(x.name, "On " + x.listName); reveal(); return; }
    const a = byId[id]; if (!a) return; box.value = a.short || a.name; openList(false); showAgency(id); reveal(); }
  function setActive(i) {
    if (!opts.length) return;
    active = (i + opts.length) % opts.length;
    listEl.querySelectorAll("li[role=option]").forEach((li, k) => li.setAttribute("aria-selected", k === active));
    const li = listEl.children[active]; if (li) { li.scrollIntoView({ block: "nearest" }); box.setAttribute("aria-activedescendant", li.id); }
  }
  box.addEventListener("focus", () => { renderLogos(); openList(true); });
  box.addEventListener("click", () => { if (listEl.hidden) { renderLogos(); openList(true); } });
  box.addEventListener("input", () => { renderLogos(); openList(true); });
  box.addEventListener("keydown", e => {
    if (e.key === "ArrowDown") { e.preventDefault(); if (listEl.hidden) { renderLogos(); openList(true); } else setActive(active + 1); }
    else if (e.key === "ArrowUp") { e.preventDefault(); setActive(active - 1); }
    else if (e.key === "Enter") { e.preventDefault(); if (opts[active]) pick(opts[active].id); }
    else if (e.key === "Escape") openList(false);
  });
  listEl.addEventListener("mousedown", e => e.preventDefault());
  listEl.addEventListener("click", e => { const li = e.target.closest("li[data-id]"); if (li) pick(li.dataset.id); });
  document.addEventListener("click", e => { if (!e.target.closest(".combo")) openList(false); });

  /* ---------- scan ---------- */
  function loadImage(src) { return new Promise((res, rej) => { const i = new Image(); i.onload = () => res(i); i.onerror = rej; i.src = src; }); }
  async function shrink(file, max) {
    const img = await loadImage(URL.createObjectURL(file));
    const k = Math.min(1, max / Math.max(img.naturalWidth, img.naturalHeight));
    const c = document.createElement("canvas"); c.width = Math.round(img.naturalWidth * k); c.height = Math.round(img.naturalHeight * k);
    c.getContext("2d").drawImage(img, 0, 0, c.width, c.height);
    return c;
  }
  // Shape signature: grayscale, Otsu threshold, crop to the ink, scale to 24x24.
  const N = 24;
  function signature(canvas, centerCrop) {
    let { width: w, height: h } = canvas, sx = 0, sy = 0;
    if (centerCrop) { const s = Math.min(w, h) * 0.8; sx = (w - s) / 2; sy = (h - s) / 2; w = h = s; }
    const c = document.createElement("canvas"); c.width = c.height = 96;
    const g = c.getContext("2d", { willReadFrequently: true });
    g.fillStyle = "#fff"; g.fillRect(0, 0, 96, 96);
    const k = 96 / Math.max(w, h);
    g.drawImage(canvas, sx, sy, w, h, (96 - w * k) / 2, (96 - h * k) / 2, w * k, h * k);
    const d = g.getImageData(0, 0, 96, 96).data, gray = new Float32Array(96 * 96), hist = new Array(256).fill(0);
    for (let i = 0; i < gray.length; i++) { const v = 0.299 * d[i * 4] + 0.587 * d[i * 4 + 1] + 0.114 * d[i * 4 + 2]; gray[i] = v; hist[v | 0]++; }
    let sum = 0, sumB = 0, wB = 0, best = 0, th = 128; for (let i = 0; i < 256; i++) sum += i * hist[i];
    for (let i = 0; i < 256; i++) { wB += hist[i]; if (!wB) continue; const wF = gray.length - wB; if (!wF) break; sumB += i * hist[i]; const mB = sumB / wB, mF = (sum - sumB) / wF, v = wB * wF * (mB - mF) ** 2; if (v > best) { best = v; th = i; } }
    let ink = Array.from(gray, v => v <= th ? 1 : 0);
    if (ink.reduce((a, b) => a + b, 0) > ink.length * 0.5) ink = ink.map(v => 1 - v);
    let x0 = 96, y0 = 96, x1 = -1, y1 = -1;
    for (let y = 0; y < 96; y++) for (let x = 0; x < 96; x++) if (ink[y * 96 + x]) { if (x < x0) x0 = x; if (x > x1) x1 = x; if (y < y0) y0 = y; if (y > y1) y1 = y; }
    if (x1 < 0) return null;
    const bw = x1 - x0 + 1, bh = y1 - y0 + 1, s = Math.max(bw, bh), ox = x0 - (s - bw) / 2, oy = y0 - (s - bh) / 2;
    const v = new Float32Array(N * N);
    for (let y = 0; y < 96; y++) for (let x = 0; x < 96; x++) if (ink[y * 96 + x]) { const gx = Math.min(N - 1, ((x - ox) / s * N) | 0), gy = Math.min(N - 1, ((y - oy) / s * N) | 0); if (gx >= 0 && gy >= 0) v[gy * N + gx]++; }
    let m = 0; for (const t of v) m += t; m /= v.length; let nn = 0;
    for (let i = 0; i < v.length; i++) { v[i] -= m; nn += v[i] * v[i]; }
    nn = Math.sqrt(nn) || 1; for (let i = 0; i < v.length; i++) v[i] /= nn;
    return v;
  }
  let logoSigs = null;
  async function getLogoSigs() {
    if (logoSigs) return logoSigs;
    const out = [];
    for (const a of AG) {
      if (!a.logo) continue;
      try { const img = await loadImage(a.logo); const c = document.createElement("canvas"); c.width = img.naturalWidth; c.height = img.naturalHeight; c.getContext("2d").drawImage(img, 0, 0); const s = signature(c, false); if (s) out.push([a.id, s]); } catch {}
    }
    return (logoSigs = out);
  }
  async function closestLogos(canvas) {
    const sig = signature(canvas, true); if (!sig) return [];
    const sigs = await getLogoSigs();
    return sigs.map(([id, s]) => { let d = 0; for (let i = 0; i < s.length; i++) d += s[i] * sig[i]; return [id, d]; }).sort((a, b) => b[1] - a[1]).slice(0, 6);
  }
  async function askServer(canvas) {
    const blob = await new Promise(r => canvas.toBlob(r, "image/jpeg", 0.85));
    const b64 = await new Promise(r => { const fr = new FileReader(); fr.onload = () => r(String(fr.result).split(",")[1]); fr.readAsDataURL(blob); });
    const ctl = new AbortController(); const t = setTimeout(() => ctl.abort(), 45000);
    try {
      const r = await fetch("/api/hechsher-scan", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ image: b64 }), signal: ctl.signal });
      if (!r.ok) return null;
      const j = await r.json(); return Array.isArray(j.symbols) ? j.symbols : null;
    } catch { return null; } finally { clearTimeout(t); }
  }
  function renderCands(items, onPick) {
    $("cands").innerHTML = items.map((it, i) => `<button class="cand" data-i="${i}">${it.a ? logoImg(it.a) : ""}<div><div style="font-weight:600">${esc(it.title)}</div><div class="small muted">${esc(it.sub || "")}</div></div></button>`).join("");
    $("cands").onclick = ev => { const b = ev.target.closest(".cand"); if (b) { onPick(items[+b.dataset.i]); reveal(); } };
  }
  $("cam").addEventListener("change", async e => {
    const f = e.target.files[0]; if (!f) return;
    $("shot").innerHTML = `<img alt="Your photo" src="${URL.createObjectURL(f)}">`;
    $("cands").innerHTML = ""; $("scan-msg").textContent = "Reading the symbol...";
    try {
      const canvas = await shrink(f, 1200);
      const syms = await askServer(canvas);
      if (syms) {
        if (!syms.length) { $("scan-msg").textContent = "No kosher symbol found in that photo. Try again closer and in good light, or type the letters below."; return; }
        const items = syms.map(s => ({ a: byId[s.match_id], s, title: byId[s.match_id] ? byId[s.match_id].name : (s.name || "Symbol not recognized"), sub: [s.seen, s.confidence && s.confidence + " confidence"].filter(Boolean).join(" · ") }));
        const pick = it => it.a ? showAgency(it.a.id) : showUnmatched(it.s.name, it.s.seen);
        $("scan-msg").textContent = syms.length > 1 ? `Found ${syms.length} symbols. Tap one to see its result.` : "Found the symbol.";
        if (syms[0].confidence === "low") $("scan-msg").textContent += " Not sure of this one: compare it with the logos below.";
        renderCands(items, pick); pick(items[0]);
      } else {
        const top = await closestLogos(canvas);
        if (!top.length) { $("scan-msg").textContent = "Could not make out a symbol. Try again closer, or type the letters below."; return; }
        $("scan-msg").textContent = "These logos look closest to your photo. Tap the one that matches the package.";
        renderCands(top.map(([id]) => ({ a: byId[id], title: byId[id].short || byId[id].name, sub: [byId[id].region, byId[id].country].filter(Boolean).join(", ") })), it => showAgency(it.a.id));
      }
    } catch { $("scan-msg").textContent = "The photo could not be read. Try another photo, or type the letters below."; }
    finally { e.target.value = ""; }
  });

  /* ---------- places to eat ---------- */
  let PLACES = [], META = null, shown = 0, filtered = [], placesByAgency = {}, pendingAgency = null;
  const PAGE = 150;
  function catChip(k) { if (!k) return ""; const key = k.split(/[ &]/)[0]; return `<span class="chip ${esc(key)}">${ICON[key] ? svg(ICON[key]) : ""}${esc(k)}</span>`; }
  let map = null, cluster = null, here = null, list = [], quiet = false, viewOn = false;
  function initMap() {
    if (map || !window.L || !$("map")) return;
    map = L.map("map", { scrollWheelZoom: false }).setView([39.5, -98.35], 4);
    L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
      maxZoom: 19,
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);
    cluster = L.markerClusterGroup ? L.markerClusterGroup({ showCoverageOnHover: false, maxClusterRadius: 45 }) : L.layerGroup();
    map.addLayer(cluster);
    map.on("moveend", () => { if (quiet) { quiet = false; return; } viewOn = true; if (!here && PLACES.length) { shown = 0; renderRows(false); } });
  }
  const pinIcon = () => L.divIcon({ className: "kk-pin", html: '<span></span>', iconSize: [22, 22], iconAnchor: [11, 21] });
  function drawMap(fit) {
    initMap(); if (!map) return;
    cluster.clearLayers();
    const pts = filtered.filter(p => p.lat != null);
    pts.forEach(p => {
      const m = L.marker([p.lat, p.lng], { icon: pinIcon(), title: p.n });
      m.bindTooltip(esc(p.n), { direction: "top", offset: [0, -18] });
      m.on("click", () => { showPlace(p); setTimeout(reveal, 0); });
      cluster.addLayer(m);
    });
    $("mapnote").textContent = `${pts.length.toLocaleString()} of ${filtered.length.toLocaleString()} on the map. The rest have no street address on the agency's list.`;
    if (fit && pts.length && !here) (quiet = true, setTimeout(() => { quiet = false; }, 900), map).fitBounds(L.latLngBounds(pts.map(p => [p.lat, p.lng])), { padding: [24, 24], maxZoom: 14 });
  }
  const miles = (a, b) => { const R = 3958.8, t = x => x * Math.PI / 180, dLa = t(b[0] - a[0]), dLo = t(b[1] - a[1]); const h = Math.sin(dLa / 2) ** 2 + Math.cos(t(a[0])) * Math.cos(t(b[0])) * Math.sin(dLo / 2) ** 2; return 2 * R * Math.asin(Math.sqrt(h)); };
  if ($("nearme")) $("nearme").onclick = () => {
    const ok = window.KK_WATCH($("nearme"), () => map,
      (ll, acc) => { here = ll; initMap(); if (map) { map.setView(here, 14); window.KK_YOU(map, here, acc); } renderRows(true); },
      ll => { here = ll; renderRows(true); });
    if (!ok) toast("This browser does not share location");
  };
  function renderRows(reset) {
    if (reset) {
      viewOn = false;
      shown = 0;
      const q = norm($("q").value), st = $("fstate").value, ag = $("fagency").value, cat = $("fcat").value, ty = $("ftype").value;
      const useLists = checkedLists().length > 0;
      /* match every filter except the one named in skip, so each dropdown can list only the choices that exist */
      const ok = (p, skip) => (!useLists || agencyOnChecked(byId[p.a])) && (skip === "st" || !st || p.st === st) && (skip === "ag" || !ag || p.a === ag) &&
        (skip === "cat" || !cat || (p.k || "").includes(cat)) && (skip === "ty" || !ty || p.t === ty) &&
        (!q || norm([p.n, p.ci, p.st, p.z, p.ad, p.kw, (p.c || []).join(" ")].join(" ")).includes(q));
      filtered = PLACES.filter(p => ok(p));
      const facet = (id, key, label, sortBy) => {
        const sel = $(id), cur = sel.value, n = {};
        PLACES.forEach(p => { if (p[key] && ok(p, id === "fstate" ? "st" : id === "fagency" ? "ag" : "ty")) n[p[key]] = (n[p[key]] || 0) + 1; });
        if (cur && !n[cur]) n[cur] = 0;
        const keys = Object.keys(n).sort(sortBy);
        sel.innerHTML = `<option value="">All (${keys.length})</option>` + keys.map(k => `<option value="${esc(k)}">${esc(label(k))} (${n[k]})</option>`).join("");
        sel.value = cur;
      };
      const agName = id => byId[id] ? (byId[id].short || byId[id].name) : id;
      facet("fstate", "st", k => k, (x, y) => x.localeCompare(y));
      facet("fagency", "a", agName, (x, y) => agName(x).localeCompare(agName(y)));
      facet("ftype", "t", k => k, (x, y) => x.localeCompare(y));
    }
    if (reset && here) { filtered.forEach(p => p._d = p.lat != null ? miles(here, [p.lat, p.lng]) : 1e9); filtered.sort((x, y) => x._d - y._d); }
    if (reset) drawMap(true);
    list = window.KK_VIEW(viewOn ? map : null, filtered, here);
    const slice = list.slice(0, shown + PAGE); shown = slice.length;
    const hidden = checkedLists().length ? PLACES.filter(p => !agencyOnChecked(byId[p.a])).length : 0;
    $("eatcount").innerHTML = `${filtered.length.toLocaleString()} of ${PLACES.length.toLocaleString()} places shown.` + window.KK_VIEWNOTE(list, filtered) + (hidden ? ` ${hidden.toLocaleString()} more are under agencies not on the lists you ticked. <button class="linkbtn" type="button" id="showall">Show them too</button>` : "");
    const sa = $("showall"); if (sa) sa.onclick = () => { checked.clear(); try { localStorage.setItem(CK_KEY, "[]"); } catch {} renderPicks(); renderRows(true); };
    $("rows").innerHTML = slice.map((p, i) => {
      const a = byId[p.a];
      return `<button class="row" data-i="${i}"><div><div class="nm"><span class="ic">${svg(TYPE_ICON[p.t] || "i-plate")}</span> ${esc(p.n)}</div><div class="ad">${esc([p.ad, p.ci, p.st].filter(Boolean).join(", "))}${here && p._d < 1e9 ? ` · ${p._d < 10 ? p._d.toFixed(1) : Math.round(p._d)} mi` : ""}</div></div>
        <div class="ag">${esc(a ? (a.short || a.name) : p.an || "")}</div>
        <div class="tags">${catChip(p.k)}${p.cy ? `<span class="chip cy">Cholov Yisroel</span>` : ""}${p.t ? `<span class="chip">${esc(p.t)}</span>` : ""}${(p.c || []).slice(0, 3).map(c => `<span class="chip">${esc(c)}</span>`).join("")}</div></button>`;
    }).join("") || `<div class="panel small">No places match these choices.</div>`;
    $("more").hidden = shown >= list.length;
  }
  $("more").onclick = () => renderRows(false);
  ["q", "fstate", "fagency", "fcat", "ftype"].forEach(id => $(id).addEventListener(id === "q" ? "input" : "change", () => renderRows(true)));
  let currentPlace = null;
  function showPlace(p) {
    currentPlace = p;
    const a = byId[p.a];
    const addr = [p.ad, p.ci, p.st, p.z].filter(Boolean).join(", ");
    rail.innerHTML = `<div class="rail-sec"><div class="label">${svg(TYPE_ICON[p.t] || "i-plate")} ${esc(p.t || "Place")}</div>
        <h3 style="font-weight:600;font-size:20px;margin:2px 0 6px">${esc(p.n)}</h3>
        <div style="display:flex;gap:4px;flex-wrap:wrap">${catChip(p.k)}${p.cy ? `<span class="chip cy">Cholov Yisroel</span>` : ""}${p.py ? `<span class="chip">Pas Yisroel</span>` : ""}${(p.c || []).map(c => `<span class="chip">${esc(c)}</span>`).join("")}</div>
        <dl class="kv">
          ${addr ? `<dt>${svg("i-pin")}</dt><dd>${esc(addr)}<br><a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(p.n + ", " + addr)}" target="_blank" rel="noopener">Open in Maps</a></dd>` : ""}
          ${p.ph ? `<dt>Phone</dt><dd><a href="tel:${esc(p.ph.replace(/[^0-9+]/g, ""))}">${esc(p.ph)}</a></dd>` : ""}
          ${p.w ? `<dt>Website</dt><dd><a href="${esc(href(p.w))}" target="_blank" rel="noopener">${esc(p.w.replace(/^https?:\/\//, "").replace(/\/$/, ""))}</a></dd>` : ""}
          ${p.no ? `<dt>Notes</dt><dd>${esc(p.no)}</dd>` : ""}
        </dl></div>
      <div class="rail-sec"><div class="label">Hechsher</div>
        <div class="verdict" style="margin-top:4px"><div class="lg">${logoImg(a)}</div><div><h3 style="font-size:16px">${esc(a ? a.name : p.an)}</h3><div class="small">${p.src ? `<a href="${esc(p.src)}" target="_blank" rel="noopener">The agency's listing</a> · ` : ""}copied ${esc(META?.fetched || "")}</div></div></div>
        ${statusRows(a)}
        <p class="small muted" style="margin-top:8px">${DISCLAIMER} Check the certificate on site.</p></div>`;
  }
  $("rows").addEventListener("click", e => {
    const b = e.target.closest(".row"); if (!b) return;
    document.querySelectorAll(".row").forEach(r => r.setAttribute("aria-current", r === b ? "true" : "false"));
    const p = list[+b.dataset.i];
    showPlace(p); if (p.lat != null && map) { quiet = true; setTimeout(() => { quiet = false; }, 900); map.setView([p.lat, p.lng], Math.max(map.getZoom(), 15)); }
    setTimeout(reveal, 0);
  });
  async function loadPlaces() {
    try {
      const d = await (await fetch("kosher-places.json?v=202610182202")).json();
      PLACES = d.places; META = d.meta;
      const np = $("n-pl"); if (np) np.textContent = PLACES.length.toLocaleString();
      const na = $("n-ag"); if (na) na.textContent = AG.length;
      placesByAgency = PLACES.reduce((m, p) => (m[p.a] = (m[p.a] || 0) + 1, m), {});
      const opts = (arr, lab) => `<option value="">All</option>` + arr.map(([v, t]) => `<option value="${esc(v)}">${esc(t)}</option>`).join("");
      $("fstate").innerHTML = opts([...new Set(PLACES.map(p => p.st).filter(Boolean))].sort().map(s => [s, s]));
      $("fagency").innerHTML = opts(Object.keys(placesByAgency).filter(id => byId[id]).sort((x, y) => (byId[x].short || byId[x].name).localeCompare(byId[y].short || byId[y].name)).map(id => [id, `${byId[id].short || byId[id].name} (${placesByAgency[id]})`]));
      $("ftype").innerHTML = opts([...new Set(PLACES.map(p => p.t).filter(Boolean))].sort().map(s => [s, s]));
      {
        const by = new Map();
        META.sources.forEach(x => { const k = x.short; const o = by.get(k) || { short: x.short, count: 0, url: x.url }; o.count += x.count; if (/^https?:/.test(x.url || "")) o.url = x.url; by.set(k, o); });
        const all = [...by.values()].sort((a, b) => b.count - a.count);
        const web = all.filter(x => /^https?:/.test(x.url || "")), paper = all.filter(x => !/^https?:/.test(x.url || ""));
        const li = x => `<li><span>${/^https?:/.test(x.url || "") ? `<a href="${esc(x.url)}" target="_blank" rel="noopener">${esc(x.short)}</a>` : esc(x.short)}</span><b>${x.count}</b></li>`;
        $("eatnote").innerHTML = `Copied from each agency's own list on ${esc(META.fetched)}. Each place links to the list it came from.
          <details class="srcs"><summary>Where these come from (${all.length} lists)</summary>
          <h4>Agency websites</h4><ul>${web.map(li).join("")}</ul>
          ${paper.length ? `<h4>Printed lists and the NY State kosher registry</h4><ul>${paper.map(li).join("")}</ul>` : ""}</details>`;
      }
      if (pendingAgency) { { const f = $("fagency"); if (![...f.options].some(o => o.value === pendingAgency)) f.add(new Option(pendingAgency, pendingAgency)); f.value = pendingAgency; } pendingAgency = null; }
      renderRows(true); if (curView === "check") refreshRail(); else if (curView === "eat") placeRail();
      if (curView === "eat") setCrumb();
    } catch { $("rows").innerHTML = `<div class="panel small">The list of places did not load. Reload the page to try again.</div>`; }
  }

  /* ---------- list picker (tick one or more lists) ---------- */
  function renderPicks() {
    const html = `<span class="lp-label">Approved by</span>` + allLists().map(L => `<label class="lpc"><input type="checkbox" data-l="${esc(L.id)}" ${checked.has(L.id) ? "checked" : ""}> ${esc(L.name)} <span class="n">${L.entries.length}</span></label>`).join("");
    document.querySelectorAll(".listpick:not(.cpick)").forEach(el => el.innerHTML = html + `<span class="lp-note">${DISCLAIMER}</span>`);
  }
  document.addEventListener("change", e => {
    const cb = e.target.closest(".listpick input[type=checkbox]"); if (!cb) return;
    cb.checked ? checked.add(cb.dataset.l) : checked.delete(cb.dataset.l);
    try { localStorage.setItem(CK_KEY, JSON.stringify([...checked])); } catch {}
    renderPicks(); renderLogos(); refreshRail(); if (PLACES.length) renderRows(true);
  });

  /* ---------- lists ---------- */
  function renderLists() {
    $("listrows").innerHTML = `<tr><td><b>cRc recommended agencies</b><div class="small muted">Built in</div></td><td>${AG.length}</td><td><a href="${esc(CRC.source)}" target="_blank" rel="noopener">crckosher.org</a>, ${esc(CRC.fetched)}</td><td></td></tr>` +
      builtinLists.map(l => `<tr><td><b>${esc(l.name)}</b><div class="small muted">On the site</div></td><td>${l.entries.length}</td><td>${l.source ? `<a href="${esc(l.source)}" target="_blank" rel="noopener">${esc(l.source.replace(/^https?:\/\//, "").slice(0, 40))}</a>` : ""}${l.fetched ? ", " + esc(l.fetched) : ""}</td><td></td></tr>`).join("") +
      myLists.map((l, i) => `<tr><td><b>${esc(l.name)}</b><div class="small muted">On this device</div></td><td>${l.entries.length}</td><td>${l.source ? `<a href="${esc(l.source)}" target="_blank" rel="noopener">${esc(l.source.replace(/^https?:\/\//, "").slice(0, 40))}</a>` : `<span class="muted">none</span>`}</td><td><button class="btn ghost" data-del="${i}">Remove</button></td></tr>`).join("");
  }
  function saveMine() { try { localStorage.setItem(LS_KEY, JSON.stringify(myLists)); return true; } catch { return false; } }
  $("listrows").addEventListener("click", e => {
    const b = e.target.closest("[data-del]"); if (!b) return;
    if (b.dataset.confirm !== "1") { b.dataset.confirm = "1"; b.textContent = "Tap again to remove"; return; }
    myLists.splice(+b.dataset.del, 1); saveMine(); renderLists(); renderPicks(); refreshRail(); toast("List removed");
  });
  const parseList = text => text.split(/\r?\n/).map(l => l.trim()).filter(Boolean).map(l => { const [n, al] = l.split("|"); return { name: n.trim(), aliases: (al || "").split(",").map(s => s.trim()).filter(Boolean) }; });
  $("lsave").onclick = () => {
    const name = $("lname").value.trim(), entries = parseList($("lbody").value);
    if (!name) { $("lmsg").textContent = "Give the list a name."; return; }
    if (!entries.length) { $("lmsg").textContent = "Paste at least one agency."; return; }
    const id = "my" + Date.now(); myLists.push({ id, name, source: $("lsrc").value.trim(), entries }); checked.add(id);
    try { localStorage.setItem(CK_KEY, JSON.stringify([...checked])); } catch {}
    if (!saveMine()) $("lmsg").textContent = "This browser will not keep the list after you close the page.";
    else $("lmsg").textContent = "";
    $("lname").value = $("lsrc").value = $("lbody").value = "";
    renderLists(); renderPicks(); refreshRail(); toast("List saved");
  };
  try { myLists = JSON.parse(localStorage.getItem(LS_KEY) || "[]"); } catch { myLists = []; }
  myLists.forEach((l, i) => { if (!l.id) l.id = "my" + i; });
  fetch("kosher-lists.json?v=202610182202").then(r => r.ok ? r.json() : { lists: [] }).then(d => { builtinLists = d.lists || []; renderLists(); renderPicks(); refreshRail(); }).catch(() => {});

  /* ---------- views ---------- */
  let curView = "check";
  function setCrumb() {}
  function placeRail() {
    if (currentPlace) return showPlace(currentPlace);
    rail.innerHTML = `<div class="rail-sec"><div class="label">Place</div><p class="small" style="margin:4px 0 0">Choose a place on the map or in the list to see its address, its hechsher, and whether that hechsher is approved by the lists you ticked.</p></div><div class="rail-sec"><p class="small muted" style="margin:0">${DISCLAIMER}</p></div>`;
  }
  function go(v) {
    curView = v;
    if (v === "eat") { placeRail(); setTimeout(() => { if (map) { map.invalidateSize(); drawMap(true); } }, 60); } else if (v === "check") refreshRail();
    else if (v === "lists") rail.innerHTML = `<div class="rail-sec"><div class="label">Lists</div><p class="small" style="margin:4px 0 0">A list is the set of hechsherim you rely on. The cRc list is built in; add your own here. Tick lists on Check a hechsher and Places to eat to filter by them.</p></div><div class="rail-sec"><p class="small muted" style="margin:0">This is for assistance only. Statuses change, so please double-check the lists and the supervision.</p></div>`;
    ["check", "eat", "chabad", "lists"].forEach(x => { if ($("view-" + x)) { $("view-" + x).hidden = x !== v; $("nav-" + x).setAttribute("aria-pressed", x === v); } });
    if (v === "chabad" && window.KK_CHABAD) window.KK_CHABAD.show();
    try { localStorage.setItem("kf-view", v); } catch {}
  }
  document.querySelector(".tabs").addEventListener("click", e => { const b = e.target.closest("button"); if (b) go(b.dataset.view); });

  renderPicks(); renderLogos(); renderLists(); railEmpty(); loadPlaces();
  let start = "check"; try { start = localStorage.getItem("kf-view") || "check"; } catch {}
  if (["#check", "#eat", "#chabad", "#lists"].includes(location.hash)) start = location.hash.slice(1);
  const deep = location.hash.slice(1);
  if (byId[deep]) { start = "check"; box.value = byId[deep].short || byId[deep].name; showAgency(deep); }
  if (deep.startsWith("eat-") && byId[deep.slice(4)]) { start = "eat"; pendingAgency = deep.slice(4); }
  if (deep && history.replaceState) history.replaceState(null, "", location.pathname);
  go(start);
})();
