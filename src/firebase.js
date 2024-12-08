// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';

// Firebase configuration from Firebase Console
const firebaseConfig = {
    apiKey: "AIzaSyD27uKEKu0wq6pfKYSbjO81-WAe4PdQIAw",
    authDomain: "sav-login.firebaseapp.com",
    projectId: "sav-login",
    storageBucket: "sav-login.firebasestorage.app",
    messagingSenderId: "129120698375",
    appId: "1:129120698375:web:14335aa8b672bf8fe46aa2"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
