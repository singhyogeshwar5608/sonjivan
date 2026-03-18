import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Package, Image, Mail, Users } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Loading from '../../components/Loading';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalServices: 0,
    totalInquiries: 0,
    totalGalleryImages: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const servicesRef = collection(db, 'services');
        const inquiriesRef = collection(db, 'inquiries');
        const galleryRef = collection(db, 'gallery');

        const [servicesSnap, inquiriesSnap, gallerySnap] = await Promise.all([
          getDocs(servicesRef),
          getDocs(inquiriesRef),
          getDocs(galleryRef)
        ]);

        setStats({
          totalServices: servicesSnap.size,
          totalInquiries: inquiriesSnap.size,
          totalGalleryImages: gallerySnap.size
        });
      } catch (error) {
        console.error('Error fetching dashboard stats:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="mt-2 text-sm sm:text-base text-gray-600">Welcome to JB Aluminum Industries Admin Panel</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6 mb-8">
          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Total Services</p>
                <p className="text-3xl font-bold text-primary">{stats.totalServices}</p>
              </div>
              <Package className="w-12 h-12 text-primary/20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Customer Inquiries</p>
                <p className="text-3xl font-bold text-green-600">{stats.totalInquiries}</p>
              </div>
              <Mail className="w-12 h-12 text-green-600/20" />
            </div>
          </div>

          <div className="bg-white rounded-lg shadow-sm border p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">Gallery Images</p>
                <p className="text-3xl font-bold text-blue-600">{stats.totalGalleryImages}</p>
              </div>
              <Image className="w-12 h-12 text-blue-600/20" />
            </div>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">Quick Actions</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link to="/admin/services" className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 block">
              <div className="flex items-center mb-3">
                <Package className="w-8 h-8 text-white mr-3" />
                <h3 className="text-xl font-semibold text-white">Services</h3>
              </div>
              <p className="text-blue-100">Manage aluminum services - add, edit, delete with images</p>
            </Link>

            <Link to="/admin/gallery" className="bg-gradient-to-br from-purple-500 to-purple-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 block">
              <div className="flex items-center mb-3">
                <Image className="w-8 h-8 text-white mr-3" />
                <h3 className="text-xl font-semibold text-white">Gallery</h3>
              </div>
              <p className="text-purple-100">Upload and manage project images for website gallery</p>
            </Link>

            <Link to="/admin/inquiries" className="bg-gradient-to-br from-green-500 to-green-600 rounded-lg shadow-lg p-6 hover:shadow-xl transition-all transform hover:-translate-y-1 block">
              <div className="flex items-center mb-3">
                <Mail className="w-8 h-8 text-white mr-3" />
                <h3 className="text-xl font-semibold text-white">Inquiries</h3>
              </div>
              <p className="text-green-100">View and respond to customer inquiries from website</p>
            </Link>
          </div>
        </div>

        {/* Info Section */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <h3 className="text-xl font-bold text-gray-900 mb-3">📋 Getting Started</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Services:</strong> Add your aluminum services with images, features, and benefits</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Gallery:</strong> Upload project photos to showcase your work</span>
            </li>
            <li className="flex items-start">
              <span className="text-blue-600 mr-2">•</span>
              <span><strong>Inquiries:</strong> Check and respond to customer inquiries</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
