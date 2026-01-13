// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAilLe9MOjYNcdjXBlleI2fz8EC-rkCWDc",
  authDomain: "digital-islam-e873d.firebaseapp.com",
  projectId: "digital-islam-e873d",
  storageBucket: "digital-islam-e873d.firebasestorage.app",
  messagingSenderId: "320777596514",
  appId: "1:320777596514:web:8e9bb0c9bbf00810a6ab3b",
  measurementId: "G-811625XV9Q"
};

import { getAuth, GoogleAuthProvider } from "firebase/auth";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();


export { app, analytics, auth, googleProvider };
