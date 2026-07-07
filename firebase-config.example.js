/*
 * firebase-config.example.js
 *
 * Copy this file to  firebase-config.js  (same folder, the repo root) and paste
 * in the config from your Firebase project. site-chrome.js looks for
 * firebase-config.js automatically; until it exists, login/comments stay off
 * and the rest of the site works normally.
 *
 * These values are NOT secrets — Firebase web config is meant to be public.
 * What actually protects your data is the Firestore security rule in
 * docs/SETUP-login-comments.md. Do not skip that step.
 */
window.TORAH_FIREBASE_CONFIG = {
  apiKey: "PASTE_API_KEY",
  authDomain: "PASTE_PROJECT_ID.firebaseapp.com",
  projectId: "PASTE_PROJECT_ID",
  storageBucket: "PASTE_PROJECT_ID.appspot.com",
  messagingSenderId: "PASTE_SENDER_ID",
  appId: "PASTE_APP_ID"
};
