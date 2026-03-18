import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { User, Settings, LogOut, Package, History, UserCircle } from 'lucide-react';
import RecentOrders from '../components/RecentOrders';

const Profile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate('/login', { state: { from: '/profile' } });
    }
  }, [currentUser, navigate]);

  if (!currentUser) {
    return null; // Will redirect in useEffect
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="w-full md:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="p-6 text-center border-b">
                <div className="w-20 h-20 mx-auto rounded-full bg-gray-100 flex items-center justify-center mb-4">
                  <UserCircle className="w-12 h-12 text-gray-400" />
                </div>
                <h2 className="text-xl font-semibold">
                  {currentUser.name || 'User'}
                </h2>
                <p className="text-gray-600 text-sm">{currentUser.email}</p>
              </div>
              
              <nav className="p-4">
                <ul className="space-y-1">
                  <li>
                    <button className="w-full text-left px-4 py-3 rounded-lg bg-primary/5 text-primary font-medium flex items-center gap-3">
                      <User className="w-5 h-5" />
                      My Profile
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-3">
                      <Package className="w-5 h-5" />
                      My Orders
                    </button>
                  </li>
                  <li>
                    <button className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-50 text-gray-700 flex items-center gap-3">
                      <Settings className="w-5 h-5" />
                      Account Settings
                    </button>
                  </li>
                  <li className="border-t border-gray-100 my-2"></li>
                  <li>
                    <button className="w-full text-left px-4 py-3 rounded-lg text-red-600 hover:bg-red-50 flex items-center gap-3">
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </li>
                </ul>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-lg shadow p-6 mb-6">
              <h1 className="text-2xl font-bold text-gray-800 mb-6">My Dashboard</h1>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                <div className="bg-blue-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Total Orders</p>
                      <p className="text-2xl font-bold mt-1">0</p>
                    </div>
                    <div className="p-3 bg-blue-100 rounded-full">
                      <Package className="w-6 h-6 text-blue-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-green-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Completed</p>
                      <p className="text-2xl font-bold mt-1">0</p>
                    </div>
                    <div className="p-3 bg-green-100 rounded-full">
                      <History className="w-6 h-6 text-green-600" />
                    </div>
                  </div>
                </div>

                <div className="bg-purple-50 p-6 rounded-lg">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Pending</p>
                      <p className="text-2xl font-bold mt-1">0</p>
                    </div>
                    <div className="p-3 bg-purple-100 rounded-full">
                      <Package className="w-6 h-6 text-purple-600" />
                    </div>
                  </div>
                </div>
              </div>

              <h2 className="text-xl font-semibold text-gray-800 mb-4">Recent Orders</h2>
              <RecentOrders limit={5} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
