// API Configuration for different environments
const config = {
  development: {
    API_BASE_URL: 'http://localhost:5000/api'
  },
  production: {
    API_BASE_URL: '/api' // Will use same domain in production
  }
};

const environment = import.meta.env.MODE || 'development';
export const API_BASE_URL = config[environment].API_BASE_URL;

// API endpoints
export const API_ENDPOINTS = {
  // Auth
  AUTH_VERIFY: `${API_BASE_URL}/auth/verify`,
  AUTH_SET_ADMIN: `${API_BASE_URL}/auth/set-admin`,
  
  // Products
  PRODUCTS: `${API_BASE_URL}/products`,
  
  // Categories
  CATEGORIES: `${API_BASE_URL}/categories`,
  
  // Orders
  ORDERS: `${API_BASE_URL}/orders`,
  
  // Gallery
  GALLERY: `${API_BASE_URL}/gallery`,
  
  // Upload
  UPLOAD: `${API_BASE_URL}/upload`,
  
  // Health check
  HEALTH: `${API_BASE_URL}/health`
};

export default API_BASE_URL;
