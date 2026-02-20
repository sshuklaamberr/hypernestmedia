import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore"; // ✅ Added this import

const firebaseConfig = {
  apiKey: "AIzaSyC-eyyEYziOO-TmlNyvRxSHvUBdHv-tbFI",
  authDomain: "hypernestmedia.firebaseapp.com",
  projectId: "hypernestmedia",
  storageBucket: "hypernestmedia.firebasestorage.app",
  messagingSenderId: "758162269433",
  appId: "1:758162269433:web:487ffc65eb36df408bae28",
};

const app = initializeApp(firebaseConfig);

// 🔐 Auth
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 🔥 Firestore Database
export const db = getFirestore(app); // ✅ Added this export to fix the error

import { getStorage } from "firebase/storage"; // ✅ Add this

// ... after your app initialization
export const storage = getStorage(app); // ✅ Add this export