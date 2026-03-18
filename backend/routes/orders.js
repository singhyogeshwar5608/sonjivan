import express from 'express';
import { db, collection, addDoc, getDocs, doc, getDoc, updateDoc, deleteDoc, query, where } from '../config/firebase.js';
import { verifyToken, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// Create new order (public)
router.post('/', async (req, res) => {
  try {
    console.log('📦 Received order request:', JSON.stringify(req.body, null, 2));
    
    const { 
      customerName, 
      email, 
      phone, 
      address, 
      city, 
      state, 
      pincode, 
      items, 
      totalAmount,
      paymentMethod 
    } = req.body;

    // Validate essential fields only
    if (!customerName || !phone || !address || !items || !totalAmount) {
      console.log('❌ Validation failed - missing essential fields');
      return res.status(400).json({ error: 'Customer name, phone, address, items, and total amount are required' });
    }

    const orderData = {
      customerName,
      email: email || `${phone}@temp.com`,
      phone,
      address,
      city: city || 'Home Collection',
      state: state || 'Various',
      pincode: pincode || '000000',
      items,
      totalAmount: Number(totalAmount),
      paymentMethod: paymentMethod || 'COD',
      status: 'pending',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      bookingDetails: req.body.bookingDetails || {}
    };

    console.log('💾 Saving order to database...');
    const docRef = await addDoc(collection(db, 'orders'), orderData);
    console.log('✅ Order saved successfully with ID:', docRef.id);

    res.status(201).json({
      id: docRef.id,
      ...orderData,
      message: 'Order placed successfully'
    });
  } catch (error) {
    console.error('❌ Error creating order:', error);
    res.status(500).json({ error: error.message });
  }
});

// Get all orders (public for standalone admin panel)
router.get('/', async (req, res) => {
  try {
    const { status, startDate, endDate } = req.query;
    let ordersQuery = collection(db, 'orders');

    // Filter by status
    if (status) {
      ordersQuery = query(ordersQuery, where('status', '==', status));
    }

    const snapshot = await getDocs(ordersQuery);
    let orders = [];

    snapshot.forEach(docSnapshot => {
      orders.push({
        id: docSnapshot.id,
        ...docSnapshot.data()
      });
    });

    // Filter by date range
    if (startDate) {
      orders = orders.filter(o => new Date(o.createdAt) >= new Date(startDate));
    }
    if (endDate) {
      orders = orders.filter(o => new Date(o.createdAt) <= new Date(endDate));
    }

    // Sort by creation date (newest first)
    orders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get single order (admin only)
router.get('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const docRef = doc(db, 'orders', req.params.id);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) {
      return res.status(404).json({ error: 'Order not found' });
    }

    res.json({
      id: docSnap.id,
      ...docSnap.data()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update order status (public for standalone admin panel)
router.put('/:id', async (req, res) => {
  try {
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Status is required' });
    }

    const updateData = {
      status,
      updatedAt: new Date().toISOString()
    };

    const docRef = doc(db, 'orders', req.params.id);
    await updateDoc(docRef, updateData);

    const updatedDoc = await getDoc(docRef);

    res.json({
      id: updatedDoc.id,
      ...updatedDoc.data()
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete order (admin only)
router.delete('/:id', verifyToken, isAdmin, async (req, res) => {
  try {
    const docRef = doc(db, 'orders', req.params.id);
    await deleteDoc(docRef);
    res.json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get order statistics (admin only)
router.get('/stats/dashboard', verifyToken, isAdmin, async (req, res) => {
  try {
    const ordersCollection = collection(db, 'orders');
    const snapshot = await getDocs(ordersCollection);
    const orders = [];

    snapshot.forEach(docSnapshot => {
      orders.push(docSnapshot.data());
    });

    const stats = {
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === 'pending').length,
      completedOrders: orders.filter(o => o.status === 'completed').length,
      cancelledOrders: orders.filter(o => o.status === 'cancelled').length,
      totalRevenue: orders
        .filter(o => o.status === 'completed')
        .reduce((sum, o) => sum + o.totalAmount, 0)
    };

    res.json(stats);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
