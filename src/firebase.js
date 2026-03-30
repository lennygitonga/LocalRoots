import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAtdx959R6a2tjvpYgR7RmJuZ24WJ5MkBo",
  authDomain: "local-roots-987e7.firebaseapp.com",
  projectId: "local-roots-987e7",
  storageBucket: "local-roots-987e7.firebasestorage.app",
  messagingSenderId: "1026853616084",
  appId: "1:1026853616084:web:a4080c382471e7e2aa3e41"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();