import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc
} from 'firebase/firestore';
import {
  Plus,
  Edit2,
  Trash2,
  ArrowLeft,
  Upload,
  Loader2,
  Star
} from 'lucide-react';
import { db } from '../../config/firebase';
import { uploadToCloudinary } from '../../utils/cloudinary';
import Loading from '../../components/Loading';

const STATUS_OPTIONS = [
  { value: 'comingSoon', label: 'Coming Soon' },
  { value: 'active', label: 'Active' },
  { value: 'closed', label: 'Closed' }
];

const UpcomingProductsManagement = () => {
  const navigate = useNavigate();
  const [upcomingProducts, setUpcomingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    imageFile: null,
    status: 'comingSoon'
  });

  useEffect(() => {
    fetchUpcomingProducts();
  }, []);

  const fetchUpcomingProducts = async () => {
    setLoading(true);
    try {
      const upcomingRef = collection(db, 'upcomingProducts');
      const querySnapshot = await getDocs(upcomingRef);
      const items = querySnapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data()
      }));
      setUpcomingProducts(items);
    } catch (error) {
      console.error('Error fetching upcoming products:', error);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setEditingProduct(null);
    setFormData({
      name: '',
      description: '',
      image: '',
      imageFile: null,
      status: 'comingSoon'
    });
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name || '',
        description: product.description || '',
        image: product.image || '',
        imageFile: null,
        status: product.status || 'comingSoon'
      });
    } else {
      resetForm();
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    resetForm();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prev) => ({ ...prev, imageFile: file }));
    }
  };

  const handleDelete = async (productId) => {
    const confirmDelete = window.confirm('Delete this upcoming product?');
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, 'upcomingProducts', productId));
      setUpcomingProducts((prev) => prev.filter((item) => item.id !== productId));
      alert('Product removed successfully.');
    } catch (error) {
      console.error('Error deleting upcoming product:', error);
      alert('Failed to delete product. Please try again.');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      let imageUrl = formData.image;
      if (formData.imageFile) {
        imageUrl = await uploadToCloudinary(formData.imageFile, true);
      }

      if (!imageUrl) {
        alert('Please upload an image for the product.');
        setUploading(false);
        return;
      }

      if (formData.status === 'active') {
        const productData = {
          name: formData.name,
          description: formData.description,
          image: imageUrl,
          price: 0,
          status: 'active',
          createdAt: new Date(),
          isActive: true
        };

        await addDoc(collection(db, 'products'), productData);

        if (editingProduct) {
          await deleteDoc(doc(db, 'upcomingProducts', editingProduct.id));
          setUpcomingProducts((prev) =>
            prev.filter((item) => item.id !== editingProduct.id)
          );
        }

        alert('Product moved to active products.');
      } else {
        const payload = {
          name: formData.name,
          description: formData.description,
          image: imageUrl,
          status: formData.status,
          updatedAt: new Date(),
          createdAt: editingProduct?.createdAt || new Date()
        };

        if (editingProduct) {
          await updateDoc(doc(db, 'upcomingProducts', editingProduct.id), payload);
          setUpcomingProducts((prev) =>
            prev.map((item) =>
              item.id === editingProduct.id ? { ...item, ...payload } : item
            )
          );
          alert('Upcoming product updated.');
        } else {
          const docRef = await addDoc(collection(db, 'upcomingProducts'), payload);
          setUpcomingProducts((prev) => [...prev, { id: docRef.id, ...payload }]);
          alert('Upcoming product added.');
        }
      }

      closeModal();
    } catch (error) {
      console.error('Error saving upcoming product:', error);
      alert('Failed to save product. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => navigate('/admin/dashboard')}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-gray-100 hover:bg-gray-200 text-gray-700 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Dashboard
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              Upcoming Products Management
            </h1>
            <p className="text-sm text-gray-500">
              Manage products launching soon or mark them active/closed.
            </p>
          </div>
        </div>
        <button
          onClick={() => openModal()}
          className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg shadow"
        >
          <Plus className="w-4 h-4" />
          Add Upcoming Product
        </button>
      </div>

      {upcomingProducts.length === 0 ? (
        <div className="bg-white rounded-2xl shadow p-8 text-center border border-dashed border-gray-200">
          <p className="text-gray-600">
            No upcoming products yet. Click &quot;Add Upcoming Product&quot; to create
            one.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {upcomingProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow border border-gray-100 flex flex-col"
            >
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-48 object-cover rounded-t-2xl"
                />
              ) : (
                <div className="w-full h-48 bg-gray-100 rounded-t-2xl flex items-center justify-center text-gray-400">
                  <Star className="w-10 h-10" />
                </div>
              )}

              <div className="p-5 flex-1 flex flex-col">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
                    {product.name}
                  </h3>
                  <span
                    className={`text-xs font-semibold px-2 py-1 rounded-full ${
                      product.status === 'comingSoon'
                        ? 'bg-yellow-100 text-yellow-700'
                        : product.status === 'closed'
                        ? 'bg-gray-200 text-gray-600'
                        : 'bg-green-100 text-green-700'
                    }`}
                  >
                    {product.status === 'comingSoon'
                      ? 'Coming Soon'
                      : product.status === 'closed'
                      ? 'Closed'
                      : 'Active'}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-3 flex-1">
                  {product.description || 'No description provided.'}
                </p>

                <div className="mt-5 flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-gray-200 text-gray-700 hover:bg-gray-50 transition-colors text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 inline-flex items-center justify-center gap-2 px-3 py-2 rounded-lg border border-red-200 text-red-600 hover:bg-red-50 transition-colors text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 px-4">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900">
                {editingProduct ? 'Edit Upcoming Product' : 'Add Upcoming Product'}
              </h2>
              <button
                onClick={closeModal}
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="e.g., Organic Cold Pressed Oil"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description
                </label>
                <textarea
                  rows="4"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  placeholder="Short teaser about this product..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Product Image *
                </label>
                <div className="flex flex-col gap-3">
                  {formData.image && !formData.imageFile && (
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-40 object-cover rounded-xl border border-gray-200"
                    />
                  )}
                  <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl p-6 cursor-pointer hover:border-blue-400 transition-colors">
                    <Upload className="w-6 h-6 text-gray-500 mb-2" />
                    <span className="text-sm text-gray-600">
                      Click to upload (JPG/PNG)
                    </span>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageChange} />
                  </label>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Status *
                </label>
                <select
                  value={formData.status}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, status: e.target.value }))
                  }
                  className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                >
                  {STATUS_OPTIONS.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
                <p className="mt-2 text-xs text-gray-500">
                  Selecting &quot;Active&quot; immediately publishes this product to the main
                  Products collection.
                </p>
              </div>

              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-100">
                <button
                  type="button"
                  onClick={closeModal}
                  className="px-4 py-2 rounded-lg border border-gray-300 text-gray-700 hover:bg-gray-50"
                  disabled={uploading}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 inline-flex items-center gap-2 disabled:opacity-70"
                  disabled={uploading}
                >
                  {uploading && <Loader2 className="w-4 h-4 animate-spin" />}
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default UpcomingProductsManagement;
