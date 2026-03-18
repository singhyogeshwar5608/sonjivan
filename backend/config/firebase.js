import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where } from 'firebase/firestore';
import dotenv from 'dotenv';

dotenv.config();

// Firebase Web SDK Configuration - Using environment variables
const firebaseConfig = {
  apiKey: process.env.FIREBASE_API_KEY,
  authDomain: process.env.FIREBASE_AUTH_DOMAIN,
  projectId: process.env.FIREBASE_PROJECT_ID,
  storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// Admin configuration
const adminConfig = {
  uid: process.env.ADMIN_UID || 'admin',
  email: process.env.ADMIN_EMAIL || 'admin@edpl.com'
};

export { db, auth, app, adminConfig, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where };
