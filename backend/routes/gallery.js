import express from 'express';
import { db } from '../config/firebase.js';
import { collection, addDoc, getDocs, deleteDoc, doc, query, orderBy } from 'firebase/firestore';

const router = express.Router();

// Get all gallery images
router.get('/', async (req, res) => {
  try {
    const galleryRef = collection(db, 'gallery');
    const q = query(galleryRef, orderBy('uploadedAt', 'desc'));
    const snapshot = await getDocs(q);
    
    const images = [];
    snapshot.forEach((doc) => {
      images.push({
        id: doc.id,
        ...doc.data()
      });
    });
    
    res.json(images);
  } catch (error) {
    console.error('Error fetching gallery:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add image to gallery
router.post('/', async (req, res) => {
  try {
    const { url, title, description, type } = req.body;
    
    if (!url) {
      return res.status(400).json({ error: 'Image URL is required' });
    }
    
    const galleryRef = collection(db, 'gallery');
    const docRef = await addDoc(galleryRef, {
      url,
      title: title || 'Untitled',
      description: description || '',
      type: type || 'url',
      uploadedAt: new Date().toISOString()
    });
    
    res.json({
      id: docRef.id,
      url,
      title,
      description,
      type,
      uploadedAt: new Date().toISOString()
    });
  } catch (error) {
    console.error('Error adding to gallery:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete image from gallery
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await deleteDoc(doc(db, 'gallery', id));
    res.json({ message: 'Image deleted successfully' });
  } catch (error) {
    console.error('Error deleting from gallery:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
