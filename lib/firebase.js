
import { initializeApp, getApps } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
// Add compat imports for RecaptchaVerifier support
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';


console.log('ENV FIREBASE:', {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
});

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyD-SZQP7VFhXNCA1nH6A9RdKcvPLDyUWqY",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "quickfynd.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "quickfynd",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "quickfynd.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "861878384152",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:861878384152:web:77f8a284f5e0493895756d",
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID || "G-03M3YYEZFE"
};


console.log('FIREBASE CONFIG:', firebaseConfig);
const missingVars = Object.entries(firebaseConfig).filter(([k, v]) => !v).map(([k]) => k);
if (missingVars.length) {
  console.error('Missing Firebase env variables:', missingVars);
}

let app, auth;
if (!missingVars.length) {
  app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);
  auth = getAuth(app);
  // Initialize compat app and attach to window for RecaptchaVerifier
  if (typeof window !== 'undefined') {
    if (!firebase.apps.length) {
      firebase.initializeApp(firebaseConfig);
    }
    window.firebase = firebase;
  }
} else {
  app = undefined;
  auth = undefined;
}
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
