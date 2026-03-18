import { useState, useEffect } from 'react';
import { Mail, Phone, Calendar, Eye, Trash2, CheckCircle, Clock } from 'lucide-react';
import { collection, getDocs, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import Loading from '../../components/Loading';

const InquiriesManagement = () => {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchInquiries();
    
    // Auto-refresh every 30 seconds
    const interval = setInterval(() => {
      console.log('Auto-refreshing inquiries...');
      fetchInquiries();
    }, 30000);
    
    return () => clearInterval(interval);
  }, []);

  const fetchInquiries = async () => {
    setLoading(true);
    try {
      console.log('Starting to fetch inquiries...');
      const inquiriesRef = collection(db, 'inquiries');
      
      // Fetch without orderBy to avoid index issues
      console.log('Fetching from Firebase...');
      const querySnapshot = await getDocs(inquiriesRef);
      
      console.log('Query snapshot received, docs count:', querySnapshot.docs.length);
      
      const inquiriesData = querySnapshot.docs.map(doc => {
        const data = doc.data();
        console.log('Processing doc:', doc.id, data);
        return {
          id: doc.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          service: data.service || '',
          message: data.message || '',
          status: data.status || 'new',
          read: data.read || false,
          createdAt: data.createdAt?.toDate() || new Date()
        };
      });
      
      // Sort by date manually
      inquiriesData.sort((a, b) => b.createdAt - a.createdAt);
      
      console.log('Fetched inquiries:', inquiriesData.length);
      setInquiries(inquiriesData);
    } catch (error) {
      console.error('Error fetching inquiries:', error);
      console.error('Error details:', error.message, error.code);
      alert(`Error loading inquiries: ${error.message}`);
      setInquiries([]);
    } finally {
      setLoading(false);
    }
  };

  const handleViewInquiry = async (inquiry) => {
    setSelectedInquiry(inquiry);
    setShowModal(true);
    
    // Mark as read
    if (!inquiry.read) {
      try {
        const inquiryRef = doc(db, 'inquiries', inquiry.id);
        await updateDoc(inquiryRef, { read: true });
        
        setInquiries(inquiries.map(inq => 
          inq.id === inquiry.id ? { ...inq, read: true } : inq
        ));
      } catch (error) {
        console.error('Error marking inquiry as read:', error);
      }
    }
  };

  const handleDeleteInquiry = async (id) => {
    if (!window.confirm('Are you sure you want to delete this inquiry?')) return;
    
    try {
      await deleteDoc(doc(db, 'inquiries', id));
      setInquiries(inquiries.filter(inq => inq.id !== id));
      alert('Inquiry deleted successfully!');
    } catch (error) {
      console.error('Error deleting inquiry:', error);
      alert('Failed to delete inquiry');
    }
  };

  const handleStatusChange = async (id, newStatus) => {
    try {
      const inquiryRef = doc(db, 'inquiries', id);
      await updateDoc(inquiryRef, { status: newStatus });
      
      setInquiries(inquiries.map(inq => 
        inq.id === id ? { ...inq, status: newStatus } : inq
      ));
      
      alert('Status updated successfully!');
    } catch (error) {
      console.error('Error updating status:', error);
      alert('Failed to update status');
    }
  };

  const getStatusBadge = (status) => {
    const badges = {
      new: 'bg-blue-100 text-blue-800',
      contacted: 'bg-yellow-100 text-yellow-800',
      completed: 'bg-green-100 text-green-800',
      cancelled: 'bg-red-100 text-red-800'
    };
    return badges[status] || badges.new;
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-IN', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Customer Inquiries</h1>
          <p className="text-sm text-gray-600 mt-1">
            Total: {inquiries.length} | Unread: {inquiries.filter(i => !i.read).length}
          </p>
        </div>
      </div>

      {/* Desktop Table View */}
      <div className="hidden md:block bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Customer
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {inquiries.length === 0 ? (
              <tr>
                <td colSpan="5" className="px-6 py-4 text-center text-gray-500">
                  No inquiries yet
                </td>
              </tr>
            ) : (
              inquiries.map((inquiry) => (
                <tr key={inquiry.id} className={!inquiry.read ? 'bg-blue-50' : ''}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="text-sm font-medium text-gray-900 flex items-center gap-2">
                        {inquiry.name}
                        {!inquiry.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                      </div>
                      <div className="text-sm text-gray-500">{inquiry.phone}</div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{inquiry.service}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">{formatDate(inquiry.createdAt)}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <select
                      value={inquiry.status}
                      onChange={(e) => handleStatusChange(inquiry.id, e.target.value)}
                      className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(inquiry.status)}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="completed">Completed</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleViewInquiry(inquiry)}
                      className="text-blue-600 hover:text-blue-900 mr-3"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => handleDeleteInquiry(inquiry.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Card View */}
      <div className="md:hidden space-y-4">
        {inquiries.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500">
            No inquiries yet
          </div>
        ) : (
          inquiries.map((inquiry) => (
            <div key={inquiry.id} className={`bg-white rounded-lg shadow p-4 ${!inquiry.read ? 'border-l-4 border-blue-600' : ''}`}>
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-semibold text-gray-900 flex items-center gap-2">
                    {inquiry.name}
                    {!inquiry.read && <span className="w-2 h-2 bg-blue-600 rounded-full"></span>}
                  </h3>
                  <p className="text-sm text-gray-600">{inquiry.service}</p>
                </div>
                <span className={`text-xs px-2 py-1 rounded-full ${getStatusBadge(inquiry.status)}`}>
                  {inquiry.status}
                </span>
              </div>
              
              <div className="space-y-2 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>{inquiry.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>{inquiry.email}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(inquiry.createdAt)}</span>
                </div>
              </div>
              
              <div className="flex gap-2">
                <button
                  onClick={() => handleViewInquiry(inquiry)}
                  className="flex-1 bg-blue-600 text-white px-3 py-2 rounded-lg text-sm flex items-center justify-center gap-2"
                >
                  <Eye className="w-4 h-4" />
                  View
                </button>
                <button
                  onClick={() => handleDeleteInquiry(inquiry.id)}
                  className="bg-red-600 text-white px-3 py-2 rounded-lg text-sm"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* View Inquiry Modal */}
      {showModal && selectedInquiry && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <h2 className="text-2xl font-bold text-gray-900">Inquiry Details</h2>
                <button
                  onClick={() => setShowModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <span className="text-2xl">&times;</span>
                </button>
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Name</label>
                    <p className="text-gray-900">{selectedInquiry.name}</p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Service</label>
                    <p className="text-gray-900">{selectedInquiry.service}</p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Phone</label>
                    <p className="text-gray-900">
                      <a href={`tel:${selectedInquiry.phone}`} className="text-blue-600 hover:underline">
                        {selectedInquiry.phone}
                      </a>
                    </p>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-600">Email</label>
                    <p className="text-gray-900">
                      <a href={`mailto:${selectedInquiry.email}`} className="text-blue-600 hover:underline">
                        {selectedInquiry.email}
                      </a>
                    </p>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Date</label>
                  <p className="text-gray-900">{formatDate(selectedInquiry.createdAt)}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600">Message</label>
                  <p className="text-gray-900 bg-gray-50 p-4 rounded-lg">{selectedInquiry.message}</p>
                </div>

                <div>
                  <label className="text-sm font-semibold text-gray-600 block mb-2">Status</label>
                  <select
                    value={selectedInquiry.status}
                    onChange={(e) => {
                      handleStatusChange(selectedInquiry.id, e.target.value);
                      setSelectedInquiry({...selectedInquiry, status: e.target.value});
                    }}
                    className="input-field"
                  >
                    <option value="new">New</option>
                    <option value="contacted">Contacted</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
              </div>

              <div className="mt-6 flex gap-3">
                <a
                  href={`https://wa.me/${selectedInquiry.phone.replace(/[^0-9]/g, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-green-600 text-white px-4 py-2 rounded-lg text-center hover:bg-green-700"
                >
                  WhatsApp
                </a>
                <a
                  href={`tel:${selectedInquiry.phone}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg text-center hover:bg-blue-700"
                >
                  Call
                </a>
                <button
                  onClick={() => setShowModal(false)}
                  className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InquiriesManagement;
