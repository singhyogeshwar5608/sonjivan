import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { Loader2, ExternalLink } from 'lucide-react';
import { format } from 'date-fns';

const RecentOrders = ({ limit = 5 }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const { currentUser, getAuthToken } = useAuth();

  useEffect(() => {
    const fetchRecentOrders = async () => {
      if (!currentUser) return;
      
      try {
        const token = await getAuthToken();
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/orders/recent?limit=${limit}`, 
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setOrders(response.data);
      } catch (error) {
        console.error('Backend not available, loading recent orders from localStorage:', error);
        
        // Load from localStorage
        const localOrders = localStorage.getItem('orders_data');
        if (localOrders) {
          const allOrders = JSON.parse(localOrders);
          // Sort by date and take the most recent ones
          const recentOrders = allOrders
            .sort((a, b) => new Date(b.orderDate || b.createdAt) - new Date(a.orderDate || a.createdAt))
            .slice(0, limit)
            .map(order => ({
              ...order,
              orderNumber: order.id,
              createdAt: order.orderDate || order.createdAt
            }));
          setOrders(recentOrders);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchRecentOrders();
  }, [currentUser, getAuthToken, limit]);

  if (!currentUser) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <p className="text-gray-600">Please sign in to view your recent orders.</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow p-6 flex items-center justify-center h-40">
        <Loader2 className="animate-spin h-8 w-8 text-primary" />
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-lg font-semibold mb-4">Recent Orders</h3>
        <p className="text-gray-600">You haven't placed any orders yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="p-6 border-b">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-semibold">Recent Orders</h3>
          <Link 
            to="/orders" 
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            View All <ExternalLink className="w-4 h-4" />
          </Link>
        </div>
      </div>
      <div className="divide-y">
        {orders.map((order) => (
          <div key={order.id} className="p-4 hover:bg-gray-50 transition-colors">
            <div className="flex justify-between items-start">
              <div>
                <p className="font-medium">Order #{order.orderNumber}</p>
                <p className="text-sm text-gray-500">
                  {format(new Date(order.createdAt), 'MMM d, yyyy')}
                </p>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                order.status === 'completed' ? 'bg-green-100 text-green-800' :
                order.status === 'processing' ? 'bg-blue-100 text-blue-800' :
                order.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                'bg-yellow-100 text-yellow-800'
              }`}>
                {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
              </span>
            </div>
            <div className="mt-2 text-sm text-gray-600">
              {order.items.length} item{order.items.length > 1 ? 's' : ''} • ${order.totalAmount.toFixed(2)}
            </div>
            <div className="mt-2">
              <Link 
                to={`/orders/${order.id}`}
                className="text-sm text-primary hover:underline inline-flex items-center gap-1"
              >
                View Details <ExternalLink className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentOrders;
