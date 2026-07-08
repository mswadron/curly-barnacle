/*
 * site-chrome.js — shared UI layer for Torah Interactive
 * Injects, on every page that includes this one file:
 *   1. a "Beta" chip (top-right) with an expandable note
 *   2. a home button (bottom-left) back to the library  [skipped on the index]
 *   3. a "Leave a note" trigger (bottom-right) that opens a login + feedback panel
 *
 * Login + comments run on Firebase, but only if a firebase-config.js is present
 * (it defines window.TORAH_FIREBASE_CONFIG). Until then the panel degrades
 * gracefully: it still opens, and explains that sign-in isn't connected yet.
 *
 * Add to any page with:   <script defer src="../site-chrome.js"></script>
 * (root pages use src="site-chrome.js")
 */
(function () {
  "use strict";
  if (window.__torahChromeLoaded) return;
  window.__torahChromeLoaded = true;

  var onApp = location.pathname.indexOf("/apps/") !== -1;
  var ROOT = onApp ? "../" : "";
  var _p = location.pathname;
  // Home button is hidden only on the library index itself; every other page
  // (apps, support, etc.) gets a button back to the library.
  var IS_HOME = /(^|\/)index\.html$/.test(_p) || _p.charAt(_p.length - 1) === "/";

  var M = "#5a1421", MDEEP = "#3d0d18", INK = "#16110f", MUTE = "#6e6663";
  var DISP = "'Bricolage Grotesque',system-ui,sans-serif";
  var HE = "'Frank Ruhl Libre',serif";

  document.addEventListener("DOMContentLoaded", init);
  if (document.readyState !== "loading") init();

  var started = false;
  function init() {
    if (started) return; started = true;
    injectFonts();
    injectStyles();
    removeLegacyHome();
    buildChip();
    if (!IS_HOME) buildHome();
    buildFeedback();
    connectFirebase();
  }

  function injectFonts() {
    if (document.getElementById("tc-fonts")) return;
    var l = document.createElement("link");
    l.id = "tc-fonts";
    l.rel = "stylesheet";
    l.href = "https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Frank+Ruhl+Libre:wght@500;700&family=Crimson+Pro:ital,wght@0,400;0,600;1,400&display=swap";
    document.head.appendChild(l);
  }

  function injectStyles() {
    var css = [
      ".tc-btn{position:fixed;z-index:9000;width:46px;height:46px;border-radius:50%;display:flex;align-items:center;justify-content:center;cursor:pointer;text-decoration:none;box-shadow:0 3px 12px rgba(61,13,24,.30);transition:transform .15s ease,background .15s ease;-webkit-tap-highlight-color:transparent}",
      ".tc-btn:hover{transform:scale(1.07)}",
      ".tc-home{left:14px;bottom:14px;background:" + M + "}",
      ".tc-home:hover{background:" + MDEEP + "}",
      ".tc-fab{right:14px;bottom:14px;background:#fff;border:1.5px solid " + M + "}",
      ".tc-fab:hover{background:#fbf7f6}",
      ".tc-label{position:fixed;z-index:9000;bottom:22px;background:#fff;border:1px solid #e6e6e6;padding:6px 11px;font-family:" + DISP + ";font-weight:600;font-size:11px;color:" + MDEEP + ";white-space:nowrap;opacity:0;pointer-events:none;transition:opacity .15s ease}",
      ".tc-home-label{left:70px}.tc-fab-label{right:70px}",
      ".tc-chip{position:fixed;top:12px;right:12px;z-index:9001;display:inline-flex;align-items:center;gap:6px;font-family:" + DISP + ";font-weight:700;font-size:10px;letter-spacing:.18em;text-transform:uppercase;color:" + M + ";border:1px solid " + M + ";border-radius:2px;padding:6px 10px;background:rgba(255,255,255,.85);backdrop-filter:blur(3px);cursor:pointer}",
      ".tc-dot{width:5px;height:5px;border-radius:50%;background:" + M + "}",
      ".tc-note{position:fixed;top:46px;right:12px;z-index:9001;width:270px;background:#fff;border:1px solid #e6e6e6;border-left:3px solid " + M + ";padding:12px 14px;display:none;box-shadow:0 6px 22px rgba(61,13,24,.13)}",
      ".tc-note.open{display:block}",
      ".tc-note .k{font-family:" + DISP + ";font-weight:700;font-size:9px;letter-spacing:.15em;text-transform:uppercase;color:" + M + ";margin-bottom:5px}",
      ".tc-note .b{font-family:'Crimson Pro',Georgia,serif;font-size:14.5px;line-height:1.5;color:" + INK + "}",
      ".tc-he{font-family:" + HE + ";font-weight:700}",
      ".tc-ov{position:fixed;inset:0;z-index:9200;background:rgba(42,8,16,.34);display:none}",
      ".tc-ov.open{display:block}",
      ".tc-panel{position:fixed;z-index:9201;right:14px;bottom:70px;width:300px;max-width:calc(100vw - 28px);background:#fff;border:1px solid #e6e6e6;box-shadow:0 10px 30px rgba(61,13,24,.22);display:none}",
      ".tc-panel.open{display:block}",
      ".tc-ph{display:flex;justify-content:space-between;align-items:center;padding:12px 14px;border-bottom:1px solid #e6e6e6}",
      ".tc-ph .t{font-family:" + DISP + ";font-weight:700;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:" + MDEEP + "}",
      ".tc-x{border:none;background:none;color:" + MUTE + ";font-size:18px;line-height:1;cursor:pointer;padding:0 2px}",
      ".tc-pb{padding:14px}",
      ".tc-msg{font-family:'Crimson Pro',Georgia,serif;font-size:14px;line-height:1.5;color:" + MUTE + ";margin:0 0 12px}",
      ".tc-google{width:100%;display:flex;align-items:center;justify-content:center;gap:9px;background:#fff;border:1px solid #cfc7c7;border-radius:3px;padding:9px 12px;font-family:" + DISP + ";font-weight:600;font-size:13px;color:#3c4043;cursor:pointer}",
      ".tc-google:hover{background:#f7f4f4}",
      ".tc-ta{width:100%;border:1px solid #e6e6e6;border-radius:3px;height:82px;padding:10px 12px;font-family:'Crimson Pro',Georgia,serif;font-size:14px;color:" + INK + ";resize:vertical;box-sizing:border-box}",
      ".tc-ta:disabled{background:#faf7f7;color:#b7adad}",
      ".tc-send{width:100%;margin-top:10px;border:none;border-radius:3px;padding:9px;font-family:" + DISP + ";font-weight:700;font-size:11px;letter-spacing:.14em;text-transform:uppercase;color:#fff;background:" + M + ";cursor:pointer}",
      ".tc-send:disabled{background:#d8caca;cursor:not-allowed}",
      ".tc-who{display:flex;align-items:center;justify-content:space-between;gap:8px;margin-bottom:10px;font-family:'Crimson Pro',Georgia,serif;font-size:13px;color:" + INK + "}",
      ".tc-who a{color:" + M + ";font-family:" + DISP + ";font-size:11px;cursor:pointer;text-decoration:underline}",
      ".tc-ok{font-family:'Crimson Pro',Georgia,serif;font-size:14px;color:" + INK + ";text-align:center;padding:6px 0}",
      "@media(max-width:560px){.tc-label{display:none}}"
    ].join("");
    var s = document.createElement("style");
    s.id = "tc-styles";
    s.textContent = css;
    document.head.appendChild(s);
  }

  function removeLegacyHome() {
    var old = document.getElementById("lib-home");
    if (old && old.parentNode) old.parentNode.removeChild(old);
  }

  function el(tag, attrs, html) {
    var e = document.createElement(tag);
    if (attrs) for (var k in attrs) e.setAttribute(k, attrs[k]);
    if (html != null) e.innerHTML = html;
    return e;
  }

  /* 1. Beta chip -------------------------------------------------- */
  function buildChip() {
    var chip = el("button", { "class": "tc-chip", "aria-expanded": "false", "aria-label": "About this beta" },
      '<span class="tc-dot"></span>Beta');
    var note = el("div", { "class": "tc-note", role: "note" },
      '<div class="k">In development</div>' +
      '<div class="b">An evolving atlas of Torah &mdash; still in beta. Every source links to its place in the <span class="tc-he">&#1502;&#1464;&#1511;&#1493;&#1465;&#1512;</span>; always learn it there.</div>');
    chip.addEventListener("click", function () {
      var open = note.classList.toggle("open");
      chip.setAttribute("aria-expanded", open ? "true" : "false");
    });
    document.addEventListener("click", function (e) {
      if (!note.contains(e.target) && e.target !== chip && !chip.contains(e.target)) {
        note.classList.remove("open"); chip.setAttribute("aria-expanded", "false");
      }
    });
    document.body.appendChild(chip);
    document.body.appendChild(note);
  }

  /* 2. Home button ------------------------------------------------ */
  function buildHome() {
    var a = el("a", {
      "class": "tc-btn tc-home", href: ROOT + "index.html",
      "aria-label": "All apps", title: "כל האפליקציות · All apps"
    }, '<svg width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11l9-8 9 8"/><path d="M5 10v10h13V10"/><path d="M10 20v-6h4v6"/></svg>');
    var lbl = el("span", { "class": "tc-label tc-home-label" },
      '<span class="tc-he">כל האפליקציות</span> · All apps');
    a.addEventListener("mouseenter", function () { lbl.style.opacity = "1"; });
    a.addEventListener("mouseleave", function () { lbl.style.opacity = "0"; });
    document.body.appendChild(a);
    document.body.appendChild(lbl);
  }

  /* 3. Feedback panel (login + comment) --------------------------- */
  var els = {};
  function buildFeedback() {
    var fab = el("button", { "class": "tc-btn tc-fab", "aria-label": "Leave a note" },
      '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="' + M + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H8l-4 4V6a2 2 0 0 1 2-2h13a2 2 0 0 1 2 2z"/></svg>');
    var lbl = el("span", { "class": "tc-label tc-fab-label" }, "Leave a note");
    fab.addEventListener("mouseenter", function () { lbl.style.opacity = "1"; });
    fab.addEventListener("mouseleave", function () { lbl.style.opacity = "0"; });

    var ov = el("div", { "class": "tc-ov" });
    var panel = el("div", { "class": "tc-panel", role: "dialog", "aria-label": "Leave a note" });
    panel.innerHTML =
      '<div class="tc-ph"><span class="t">Leave a note</span><button class="tc-x" aria-label="Close">&times;</button></div>' +
      '<div class="tc-pb">' +
        '<div class="tc-signedout">' +
          '<p class="tc-msg">Sign in to send feedback &mdash; it goes straight to the team, privately.</p>' +
          '<button class="tc-google">' +
            '<svg width="16" height="16" viewBox="0 0 48 48"><path fill="#4285F4" d="M45.1 24.5c0-1.6-.1-3.1-.4-4.5H24v8.5h11.8c-.5 2.7-2 5-4.4 6.6v5.5h7.1c4.1-3.8 6.6-9.4 6.6-16.1z"/><path fill="#34A853" d="M24 46c5.9 0 10.9-2 14.5-5.4l-7.1-5.5c-2 1.3-4.5 2.1-7.4 2.1-5.7 0-10.5-3.8-12.2-9H4.5v5.7C8.1 41.1 15.4 46 24 46z"/><path fill="#FBBC05" d="M11.8 28.2c-.4-1.3-.7-2.7-.7-4.2s.2-2.9.7-4.2v-5.7H4.5C3 17 2 20.4 2 24s1 7 2.5 9.9l7.3-5.7z"/><path fill="#EA4335" d="M24 10.8c3.2 0 6.1 1.1 8.4 3.3l6.3-6.3C34.9 4.1 29.9 2 24 2 15.4 2 8.1 6.9 4.5 14.1l7.3 5.7c1.7-5.2 6.5-9 12.2-9z"/></svg>' +
            'Sign in with Google</button>' +
        '</div>' +
        '<div class="tc-signedin" style="display:none">' +
          '<div class="tc-who"><span class="tc-name"></span><a class="tc-signout">Sign out</a></div>' +
          '<textarea class="tc-ta" placeholder="Your note…"></textarea>' +
          '<button class="tc-send">Send</button>' +
        '</div>' +
        '<div class="tc-done" style="display:none"><p class="tc-ok">Thank you — your note was sent.</p></div>' +
      '</div>';

    document.body.appendChild(fab);
    document.body.appendChild(lbl);
    document.body.appendChild(ov);
    document.body.appendChild(panel);

    els = {
      fab: fab, ov: ov, panel: panel,
      signedout: panel.querySelector(".tc-signedout"),
      signedin: panel.querySelector(".tc-signedin"),
      done: panel.querySelector(".tc-done"),
      google: panel.querySelector(".tc-google"),
      name: panel.querySelector(".tc-name"),
      signout: panel.querySelector(".tc-signout"),
      ta: panel.querySelector(".tc-ta"),
      send: panel.querySelector(".tc-send"),
      msg: panel.querySelector(".tc-msg")
    };

    function open() { ov.classList.add("open"); panel.classList.add("open"); }
    function close() { ov.classList.remove("open"); panel.classList.remove("open"); }
    fab.addEventListener("click", open);
    ov.addEventListener("click", close);
    panel.querySelector(".tc-x").addEventListener("click", close);
    els.close = close;

    els.google.addEventListener("click", onSignIn);
    els.signout.addEventListener("click", onSignOut);
    els.send.addEventListener("click", onSend);
  }

  /* Firebase wiring (optional) ------------------------------------ */
  var fb = { ready: false, auth: null, db: null, user: null };

  function connectFirebase() {
    // Try to load an optional config file at the repo root.
    var cfg = document.createElement("script");
    cfg.src = ROOT + "firebase-config.js";
    cfg.onload = function () {
      if (window.TORAH_FIREBASE_CONFIG) loadSdk();
      else disconnected();
    };
    cfg.onerror = disconnected;
    document.head.appendChild(cfg);
  }

  function disconnected() {
    if (!els.msg) return;
    els.google.addEventListener("click", function (e) {
      e.stopImmediatePropagation();
      els.msg.textContent = "Sign-in isn’t connected yet. (Add firebase-config.js to switch it on.)";
    }, true);
  }

  function loadSdk() {
    var base = "https://www.gstatic.com/firebasejs/10.12.2/";
    var files = ["firebase-app-compat.js", "firebase-auth-compat.js", "firebase-firestore-compat.js"];
    (function next(i) {
      if (i >= files.length) return initFb();
      var s = document.createElement("script");
      s.src = base + files[i];
      s.onload = function () { next(i + 1); };
      s.onerror = disconnected;
      document.head.appendChild(s);
    })(0);
  }

  function initFb() {
    try {
      window.firebase.initializeApp(window.TORAH_FIREBASE_CONFIG);
      fb.auth = window.firebase.auth();
      fb.db = window.firebase.firestore();
      fb.ready = true;
      fb.auth.onAuthStateChanged(function (u) {
        fb.user = u;
        renderAuth();
        syncZmanimDown(u);
      });
      window.addEventListener("zm-prefs-changed", syncZmanimUp);
    } catch (e) { disconnected(); }
  }

  function renderAuth() {
    if (!els.panel) return;
    els.done.style.display = "none";
    if (fb.user) {
      els.signedout.style.display = "none";
      els.signedin.style.display = "block";
      els.name.textContent = fb.user.displayName || fb.user.email || "Signed in";
    } else {
      els.signedout.style.display = "block";
      els.signedin.style.display = "none";
    }
  }

  function onSignIn() {
    if (!fb.ready) return;
    var provider = new window.firebase.auth.GoogleAuthProvider();
    fb.auth.signInWithPopup(provider)["catch"](function (e) {
      els.msg.textContent = "Sign-in didn’t complete. Please try again.";
    });
  }

  function onSignOut() { if (fb.ready) fb.auth.signOut(); }

  function onSend() {
    if (!fb.ready || !fb.user) return;
    var text = (els.ta.value || "").trim();
    if (!text) { els.ta.focus(); return; }
    els.send.disabled = true;
    fb.db.collection("feedback").add({
      text: text,
      app: document.title || "",
      path: location.pathname + location.hash,
      uid: fb.user.uid,
      email: fb.user.email || "",
      name: fb.user.displayName || "",
      userAgent: navigator.userAgent,
      createdAt: window.firebase.firestore.FieldValue.serverTimestamp()
    }).then(function () {
      els.ta.value = "";
      els.signedin.style.display = "none";
      els.done.style.display = "block";
      setTimeout(function () { els.send.disabled = false; els.close && els.close(); renderAuth(); }, 1600);
    })["catch"](function () {
      els.send.disabled = false;
      els.ta.value = els.ta.value + "";
      alert("Could not send just now — please try again.");
    });
  }

  /* Cross-device sync of zmanim defaults (location + preferred shitos) --- */
  var ZKEYS = ["zm_locId", "zm_custom", "zm_concept", "zm_filter", "zm_prefShita"];
  function syncZmanimDown(user) {
    if (!fb.ready || !user) return;
    fb.db.collection("users").doc(user.uid).get().then(function (snap) {
      if (!snap.exists) return;
      var data = snap.data() || {};
      var z = data.zmanim;
      if (!z) return;
      var changed = false;
      ZKEYS.forEach(function (k) {
        if (z[k] != null) { try { localStorage.setItem(k, z[k]); changed = true; } catch (e) {} }
      });
      if (changed) window.dispatchEvent(new CustomEvent("zm-cloud-prefs"));
    })["catch"](function () {});
  }
  var zUpTimer = null;
  function syncZmanimUp() {
    if (!fb.ready || !fb.user) return;
    clearTimeout(zUpTimer);
    zUpTimer = setTimeout(function () {
      var z = {};
      ZKEYS.forEach(function (k) { try { var v = localStorage.getItem(k); if (v != null) z[k] = v; } catch (e) {} });
      fb.db.collection("users").doc(fb.user.uid).set({ zmanim: z }, { merge: true })["catch"](function () {});
    }, 600);
  }
})();
