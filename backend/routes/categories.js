import express from 'express';
import { db } from '../config/firebase.js';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, query, orderBy } from 'firebase/firestore';

const router = express.Router();

// Get all categories (public)
router.get('/', async (req, res) => {
  try {
    const categoriesRef = collection(db, 'categories');
    const q = query(categoriesRef, orderBy('name', 'asc'));
    const snapshot = await getDocs(q);
    const categories = [];

    snapshot.forEach(doc => {
      categories.push({
        id: doc.id,
        ...doc.data()
      });
    });

    res.json(categories);
  } catch (error) {
    console.error('Error fetching categories:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add new category (temporarily bypassed auth for development)
router.post('/', async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    if (!name) {
      return res.status(400).json({ error: 'Category name is required' });
    }

    const categoryData = {
      name,
      description: description || '',
      icon: icon || '',
      productCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const categoriesRef = collection(db, 'categories');
    const docRef = await addDoc(categoriesRef, categoryData);

    res.status(201).json({
      id: docRef.id,
      ...categoryData
    });
  } catch (error) {
    console.error('Error adding category:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update category (temporarily bypassed auth for development)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, icon } = req.body;

    const updateData = {
      updatedAt: new Date().toISOString()
    };

    if (name) updateData.name = name;
    if (description !== undefined) updateData.description = description;
    if (icon !== undefined) updateData.icon = icon;

    const categoryRef = doc(db, 'categories', req.params.id);
    await updateDoc(categoryRef, updateData);

    const updatedDoc = await getDoc(categoryRef);

    res.json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });
  } catch (error) {
    console.error('Error updating category:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete category (temporarily bypassed auth for development)
router.delete('/:id', async (req, res) => {
  try {
    const categoryRef = doc(db, 'categories', req.params.id);
    await deleteDoc(categoryRef);
    res.json({ message: 'Category deleted successfully' });
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
