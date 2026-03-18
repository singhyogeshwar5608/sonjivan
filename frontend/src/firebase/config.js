import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAZcUeqESnh9f9b7v1_Z4eenE-PSQkrH00",
  authDomain: "sonjivan-27dff.firebaseapp.com",
  projectId: "sonjivan-27dff",
  storageBucket: "sonjivan-27dff.firebasestorage.app",
  messagingSenderId: "151360594494",
  appId: "1:151360594494:web:c7a443d0136414a2f5276f",
  measurementId: "G-GYLE2825ZZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);



// # Firebase Configuration
// VITE_FIREBASE_API_KEY=AIzaSyAZcUeqESnh9f9b7v1_Z4eenE-PSQkrH00
// VITE_FIREBASE_AUTH_DOMAIN=sonjivan-27dff.firebaseapp.com
// VITE_FIREBASE_PROJECT_ID=sonjivan-27dff
// VITE_FIREBASE_STORAGE_BUCKET=sonjivan-27dff.firebasestorage.app
// VITE_FIREBASE_MESSAGING_SENDER_ID=151360594494
// VITE_FIREBASE_APP_ID=1:151360594494:web:c7a443d0136414a2f5276f
