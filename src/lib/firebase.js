import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase only on the client to avoid running the client SDK
// during Next.js server-side builds (which can cause invalid-api-key errors).
/** @type {import('firebase/app').FirebaseApp | undefined} */
let app;
/** @type {import('firebase/auth').Auth | undefined} */
let auth;
/** @type {import('firebase/firestore').Firestore | undefined} */
let db;

// Initialize the Firebase app for both server and client environments.
// Keep `auth` client-only because server-side auth (browser flows) isn't applicable.
try {
  app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  if (typeof window !== "undefined") {
    auth = getAuth(app);
  }
} catch (e) {
  // In case initialization fails in some environments, leave values undefined and
  // let callers handle the absence of `db`/`auth` appropriately.
  console.warn('Firebase initialization skipped or failed:', e);
}

export { auth, db, app };
