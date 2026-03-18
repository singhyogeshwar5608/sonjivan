import { createContext, useContext, useState, useEffect } from 'react';
import { signInWithEmailAndPassword, signOut, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebase';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Listen to Firebase auth state changes
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Check user role from Firestore
          const userDocRef = doc(db, 'users', user.uid);
          const userDoc = await getDoc(userDocRef);
          
          if (userDoc.exists()) {
            const userData = userDoc.data();
            console.log('User data:', userData);
            
            // Check if user is admin
            if (userData.role === 'admin') {
              setCurrentUser(user);
              setIsAdmin(true);
              console.log('Admin user logged in:', user.email);
            } else {
              console.log('User is not admin, role:', userData.role);
              setCurrentUser(null);
              setIsAdmin(false);
            }
          } else {
            console.log('User document not found in Firestore');
            setCurrentUser(null);
            setIsAdmin(false);
          }
        } catch (error) {
          console.error('Error checking user role:', error);
          setCurrentUser(null);
          setIsAdmin(false);
        }
      } else {
        setCurrentUser(null);
        setIsAdmin(false);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      // Sign in with Firebase Authentication
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      
      // Check user role from Firestore
      const userDocRef = doc(db, 'users', user.uid);
      const userDoc = await getDoc(userDocRef);
      
      if (userDoc.exists()) {
        const userData = userDoc.data();
        
        // Check if user is admin
        if (userData.role === 'admin') {
          setCurrentUser(user);
          setIsAdmin(true);
          console.log('Admin login successful:', user.email);
          return user;
        } else {
          // Not an admin, sign out
          await signOut(auth);
          throw new Error('Access denied. Admin privileges required.');
        }
      } else {
        // User document not found
        await signOut(auth);
        throw new Error('User data not found.');
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const signup = async () => {
    // Disable signup for now
    return Promise.reject(new Error('Signup not available'));
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setIsAdmin(false);
      setCurrentUser(null);
      console.log('User logged out successfully');
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  };

  const getAuthToken = async () => {
    if (currentUser) {
      try {
        const token = await currentUser.getIdToken();
        return token;
      } catch (error) {
        console.error('Error getting auth token:', error);
        return null;
      }
    }
    return null;
  };

  const value = {
    currentUser,
    isAdmin,
    login,
    signup,
    logout,
    getAuthToken,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
