import { auth } from '../config/firebase.js';

// Middleware to verify Firebase authentication token
export const verifyToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization?.split('Bearer ')[1];
    
    if (!token) {
      return res.status(401).json({ error: 'No token provided' });
    }

    const decodedToken = await auth.verifyIdToken(token);
    req.user = decodedToken;
    next();
  } catch (error) {
    return res.status(401).json({ error: 'Invalid or expired token' });
  }
};

// Middleware to check if user is admin
export const isAdmin = async (req, res, next) => {
  try {
    const user = await auth.getUser(req.user.uid);
    
    if (user.customClaims?.admin) {
      next();
    } else {
      return res.status(403).json({ error: 'Access denied. Admin only.' });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};
