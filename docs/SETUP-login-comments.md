# Setup — Google login & private feedback (Firebase)

The site's "Leave a note" panel and Google sign-in run on **Firebase**. All the
code is already in `site-chrome.js`; it stays dormant until you add one file:
`firebase-config.js`. This is the one part only you can do — it lives in your
Google account. Takes about 10 minutes, all free tier.

## What you'll end up with
- A **Sign in with Google** button on every page.
- A note box that only works once signed in.
- Every note lands in a **Firestore** collection called `feedback`, which you
  read and moderate in the Firebase console. Readers never see each other's notes.

---

## 1. Create the Firebase project
1. Go to <https://console.firebase.google.com> and sign in with your Google account.
2. Click **Add project** → name it (e.g. `torah-interactive`) → continue. You can
   turn Google Analytics off. Click **Create project**.

## 2. Register the web app + copy the config
1. On the project overview, click the **`</>`** (web) icon.
2. Give it a nickname (e.g. `site`), **don't** check "Firebase Hosting", click **Register app**.
3. Firebase shows a `firebaseConfig = { … }` object. Keep this tab open — you need those values next.

## 3. Add firebase-config.js to the repo
1. In the repo root, copy `firebase-config.example.js` to a new file named
   **`firebase-config.js`**.
2. Paste your six values (apiKey, authDomain, projectId, storageBucket,
   messagingSenderId, appId) in place of the `PASTE_…` placeholders.
3. Commit and push. (These values are **not** secrets — Firebase web config is
   public by design. The security rule in step 6 is what protects the data.)

## 4. Turn on Google sign-in
1. Console → **Build → Authentication → Get started**.
2. **Sign-in method** tab → **Google** → toggle **Enable** → pick a support email → **Save**.

## 5. Create the Firestore database
1. Console → **Build → Firestore Database → Create database**.
2. Choose **Production mode** → pick a location → **Enable**.

## 6. Set the security rule (important — this is what keeps notes private)
Console → **Firestore → Rules**, replace everything with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /feedback/{doc} {
      // any signed-in user may leave a note, tagged with their own uid
      allow create: if request.auth != null
        && request.resource.data.uid == request.auth.uid;
      // nobody can read/edit/delete from the site — you read them in the console
      allow read, update, delete: if false;
    }
  }
}
```

Click **Publish**.

## 7. Authorize your domain
Console → **Authentication → Settings → Authorized domains** → **Add domain** →
add your GitHub Pages domain (e.g. `mordy.github.io`). `localhost` is already there
for local testing.

---

## Reading the feedback
Console → **Firestore Database → Data → `feedback`**. Each note is one document
with the text, which app/page it came from, and the sender's name, email, and uid.
You can delete a document to dismiss it. To export or get notified, later options
include a scheduled export or a Cloud Function — ask when you want that.

## Turning it off
Delete or rename `firebase-config.js`. The site keeps working; the panel just
shows "Sign-in isn't connected yet."

## Notes on scope
- Login is **required to comment** and is **additive** — it never gates the Torah
  content itself, only saves/attaches your note.
- This same project is what future per-user features (saved zmanim location, private
  he'aros/notes, bookmarks) will build on — no second setup needed.
