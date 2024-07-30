// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';
import { getAnalytics } from "firebase/analytics";
import { getAuth, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAAW5H9BdgkI0dwUAwR8e1CT06GrLwVYCE",
  authDomain: "camera-kingdom.firebaseapp.com",
  projectId: "camera-kingdom",
  storageBucket: "camera-kingdom.appspot.com",
  messagingSenderId: "465351718254",
  appId: "1:465351718254:web:d5c7d2b699079f99de3d7f",
  measurementId: "G-RRMF5JSYYL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const googleProvider = new GoogleAuthProvider();

export { auth, storage, analytics, db, googleProvider };
