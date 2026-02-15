import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

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