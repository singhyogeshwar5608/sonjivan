import express from 'express';
import { db } from '../config/firebase.js';
import { collection, getDocs, addDoc, doc, updateDoc, deleteDoc, getDoc, query, where, orderBy as firestoreOrderBy } from 'firebase/firestore';

const router = express.Router();

// Get all products (public)
router.get('/', async (req, res) => {
  try {
    const { category: categoryFilter, minPrice, maxPrice, search, sort } = req.query;
    const productsRef = collection(db, 'products');
    
    // Build query
    let q;
    if (categoryFilter) {
      q = query(productsRef, where('status', '==', 'active'), where('category', '==', categoryFilter));
    } else {
      q = query(productsRef, where('status', '==', 'active'));
    }

    const snapshot = await getDocs(q);
    let products = [];

    snapshot.forEach(docSnap => {
      products.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    // Filter by price range
    if (minPrice) {
      products = products.filter(p => p.discountedPrice >= Number(minPrice));
    }
    if (maxPrice) {
      products = products.filter(p => p.discountedPrice <= Number(maxPrice));
    }

    // Search by name or description
    if (search) {
      const searchLower = search.toLowerCase();
      products = products.filter(p => 
        p.name.toLowerCase().includes(searchLower) || 
        p.description.toLowerCase().includes(searchLower)
      );
    }

    // Sort products
    if (sort === 'price-asc') {
      products.sort((a, b) => a.discountedPrice - b.discountedPrice);
    } else if (sort === 'price-desc') {
      products.sort((a, b) => b.discountedPrice - a.discountedPrice);
    } else if (sort === 'name') {
      products.sort((a, b) => a.name.localeCompare(b.name));
    } else {
      // Default: sort by creation date (newest first)
      products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single product (public)
router.get('/:id', async (req, res) => {
  try {
    const productRef = doc(db, 'products', req.params.id);
    const productDoc = await getDoc(productRef);
    
    if (!productDoc.exists()) {
      return res.status(404).json({ error: 'Product not found' });
    }

    res.json({
      id: productDoc.id,
      ...productDoc.data()
    });
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Add new product (temporarily bypassed auth for development)
router.post('/', async (req, res) => {
  try {
    const { name, description, category, originalPrice, discountedPrice, image } = req.body;

    // Validate required fields
    if (!name || !description || !category || !originalPrice || !discountedPrice || !image) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    const productData = {
      name,
      description,
      category,
      originalPrice: Number(originalPrice),
      discountedPrice: Number(discountedPrice),
      image,
      discount: Math.round(((originalPrice - discountedPrice) / originalPrice) * 100),
      status: 'active',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    const productsRef = collection(db, 'products');
    const docRef = await addDoc(productsRef, productData);

    res.status(201).json({
      id: docRef.id,
      ...productData
    });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Update product (temporarily bypassed auth for development)
router.put('/:id', async (req, res) => {
  try {
    const { name, description, category, originalPrice, discountedPrice, image, status } = req.body;

    const updateData = {
      updatedAt: new Date().toISOString()
    };

    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (category) updateData.category = category;
    if (originalPrice) updateData.originalPrice = Number(originalPrice);
    if (discountedPrice) updateData.discountedPrice = Number(discountedPrice);
    if (image) updateData.image = image;
    if (status) updateData.status = status;

    // Recalculate discount if prices are updated
    if (originalPrice && discountedPrice) {
      updateData.discount = Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
    }

    const productRef = doc(db, 'products', req.params.id);
    await updateDoc(productRef, updateData);

    const updatedDoc = await getDoc(productRef);

    res.json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Delete product (temporarily bypassed auth for development)
router.delete('/:id', async (req, res) => {
  try {
    const productRef = doc(db, 'products', req.params.id);
    await deleteDoc(productRef);
    res.json({ message: 'Product deleted successfully' });
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all products for admin (includes inactive, temporarily bypassed auth)
router.get('/admin/all', async (req, res) => {
  try {
    const productsRef = collection(db, 'products');
    const snapshot = await getDocs(productsRef);
    const products = [];

    snapshot.forEach(docSnap => {
      products.push({
        id: docSnap.id,
        ...docSnap.data()
      });
    });

    // Sort by creation date (newest first)
    products.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(products);
  } catch (error) {
    console.error('Error fetching admin products:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
