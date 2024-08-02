// src/firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';

// Firebase yapılandırma objesi
const firebaseConfig = {
    apiKey: "AIzaSyD6k0l1PYMD3xnfNSA7oWHBYxoEAH0VGXY",
    authDomain: "eza-otoyikamatik.firebaseapp.com",
    databaseURL: "https://eza-otoyikamatik-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "eza-otoyikamatik",
    storageBucket: "eza-otoyikamatik.appspot.com",
    messagingSenderId: "16035167996",
    appId: "1:16035167996:web:00c182df729da36f976179",
    measurementId: "G-B9EK10GE30"
  };
// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth, Firestore ve Realtime Database servislerini al
const auth = getAuth(app);
const firestore = getFirestore(app);
const database = getDatabase(app);

export { auth, firestore, database };
