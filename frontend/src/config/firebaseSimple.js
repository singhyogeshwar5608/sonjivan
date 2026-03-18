// Simplified Firebase Configuration
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBGjv809MBvJlH6VRfPVwZ-YbvTQTxPibI",
  authDomain: "jbaluminiumindustries.firebaseapp.com",
  projectId: "jbaluminiumindustries",
  storageBucket: "jbaluminiumindustries.firebasestorage.app",
  messagingSenderId: "1021667419418",
  appId: "1:1021667419418:web:5e2dd5e8653966c305b8a3",
  measurementId: "G-TQEYGYBJ71"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
