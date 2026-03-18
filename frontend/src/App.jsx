import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { LanguageProvider } from './context/LanguageContext';
import Header from './components/Header';
import Footer from './components/Footer';
import ProtectedRoute from './components/ProtectedRoute';
import ScrollToTop from './components/ScrollToTop';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import Gallery from './pages/Gallery';
import Services from './pages/Services';
import Categories from './pages/Categories';
import RefundPolicy from './pages/RefundPolicy';
import PrivacyPolicy from './pages/PrivacyPolicy';
import ComingSoon from './pages/ComingSoon';

// Admin Pages
import AdminLogin from './pages/admin/Login';
import AdminDashboard from './pages/admin/Dashboard';
import GalleryManagement from './pages/admin/GalleryManagement';
import InquiriesManagement from './pages/admin/InquiriesManagement';
import ProductsManagement from './pages/admin/ProductsManagement';
import CategoryManagement from './pages/admin/CategoryManagement';
import UpcomingProductsManagement from './pages/admin/UpcomingProductsManagement';
import AdminLayout from './pages/admin/AdminLayout';
// import AuthDebug from './components/AuthDebug';
// import './utils/adminLogin'; // Import for console access

function App() {
  const isAdminRoute = window.location.pathname.startsWith('/admin');
  
  return (
    <Router>
      <AuthProvider>
        <LanguageProvider>
          <div className="flex flex-col min-h-screen">
            <ScrollToTop />
            {!isAdminRoute && <Header />}
            <main className="flex-grow">
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/products" element={<Services />} />
                <Route path="/categories" element={<Categories />} />
                <Route path="/coming-soon" element={<ComingSoon />} />
                <Route path="/refund-policy" element={<RefundPolicy />} />
                <Route path="/privacy-policy" element={<PrivacyPolicy />} />

                {/* Admin Routes */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute adminOnly>
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="dashboard" element={<AdminDashboard />} />
                  <Route path="products" element={<ProductsManagement />} />
                  <Route path="categories" element={<CategoryManagement />} />
                  <Route path="gallery" element={<GalleryManagement />} />
                  <Route path="inquiries" element={<InquiriesManagement />} />
                  <Route path="upcoming-products" element={<UpcomingProductsManagement />} />
                </Route>
              </Routes>
            </main>
            {!isAdminRoute && <Footer />}
          </div>
        </LanguageProvider>
      </AuthProvider>
    </Router>
  );
}

export default App;
