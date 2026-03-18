/* eslint-env node */
import express from 'express';
import { db, adminConfig } from '../config/firebase.js';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const router = express.Router();

// Set admin claim for a user (for initial setup)
router.post('/set-admin', async (req, res) => {
  try {
    const { email, secretKey } = req.body;

    // Use a secret key to protect this endpoint
    if (secretKey !== process.env.ADMIN_SECRET_KEY) {
      return res.status(403).json({ error: 'Invalid secret key' });
    }

    // For simplified setup, use the admin UID from config
    const user = { uid: adminConfig.uid, email: email };
    // Store admin status in Firestore
    const adminDocRef = doc(db, 'admins', user.uid);
    await setDoc(adminDocRef, {
      email: email,
      isAdmin: true,
      createdAt: new Date().toISOString()
    });
    
    res.json({ 
      message: 'Admin privileges set successfully',
      email: email,
      uid: user.uid
    });
  } catch (error) {
    console.error('Error setting admin privileges:', error);
    res.status(500).json({ error: 'Failed to set admin privileges' });
  }
});

// Verify token and get user info
router.post('/verify', async (req, res) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];

    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    // For simplified setup, check if user UID matches admin UID
    const uid = token; // In simplified setup, we'll pass UID directly
    
    // Check if user is admin by comparing UID
    const isAdmin = uid === adminConfig.uid;
    
    // Also check Firestore for admin status
    const adminDocRef = doc(db, 'admins', uid);
    const adminDoc = await getDoc(adminDocRef);
    const isAdminInDb = adminDoc.exists() && adminDoc.data().isAdmin === true;
    
    res.json({ 
      uid: uid,
      email: adminConfig.email,
      isAdmin: isAdmin || isAdminInDb
    });
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(401).json({ error: 'Invalid token' });
  }
});

export default router;
