/*
 * firebase-config.js — live config for the torah-interactive Firebase project.
 * site-chrome.js loads this automatically to switch on Google login + feedback.
 * These values are NOT secrets (Firebase web config is public by design);
 * the Firestore security rule is what protects the data. See
 * docs/SETUP-login-comments.md.
 */
window.TORAH_FIREBASE_CONFIG = {
  apiKey: "AIzaSyAqNjIGBDIFBKY4CJzzEeV7-9JKoHFqyvY",
  authDomain: "torah-interactive.firebaseapp.com",
  projectId: "torah-interactive",
  storageBucket: "torah-interactive.firebasestorage.app",
  messagingSenderId: "54134767110",
  appId: "1:54134767110:web:967c7983027c3f70760d87",
  measurementId: "G-PT3CMJ8KMX"
};
