import { useState, useEffect } from 'react';
import { Plus, Edit2, Trash2, X, Package } from 'lucide-react';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';
import { uploadToCloudinary } from '../../utils/cloudinary';
import Loading from '../../components/Loading';

const ProductsManagement = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    description: '',
    price: '',
    mrp: '',
    unit: 'kg',
    weight: '',
    stock: '',
    image: '',
    imageFile: null,
    inStock: true,
    featured: false,
    discount: 0
  });

  const categories = [
    'Grains & Pulses',
    'Oils & Ghee',
    'Spices & Masala',
    'Rice & Atta',
    'Dry Fruits',
    'Snacks',
    'Beverages',
    'Dairy Products',
    'Bakery',
    'Personal Care',
    'Household',
    'Other'
  ];

  const units = ['kg', 'gm', 'ltr', 'ml', 'pcs', 'pack'];

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const productsRef = collection(db, 'products');
      const querySnapshot = await getDocs(productsRef);
      const productsData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setProducts(productsData);
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
    }
    setLoading(false);
  };

  const openModal = (product = null) => {
    if (product) {
      setEditingProduct(product);
      setFormData({
        name: product.name,
        category: product.category,
        brand: product.brand || '',
        description: product.description,
        price: product.price,
        mrp: product.mrp || product.price,
        unit: product.unit || 'kg',
        weight: product.weight || '',
        stock: product.stock || '',
        image: product.image,
        imageFile: null,
        inStock: product.inStock !== false,
        featured: product.featured || false,
        discount: product.discount || 0
      });
    } else {
      setEditingProduct(null);
      setFormData({
        name: '',
        category: '',
        brand: '',
        description: '',
        price: '',
        mrp: '',
        unit: 'kg',
        weight: '',
        stock: '',
        image: '',
        imageFile: null,
        inStock: true,
        featured: false,
        discount: 0
      });
    }
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUploading(true);

    try {
      const productData = {
        name: formData.name,
        category: formData.category,
        brand: formData.brand,
        description: formData.description,
        price: parseFloat(formData.price),
        mrp: parseFloat(formData.mrp || formData.price),
        unit: formData.unit,
        weight: formData.weight,
        stock: parseInt(formData.stock) || 0,
        image: formData.image,
        inStock: formData.inStock,
        featured: formData.featured,
        discount: parseFloat(formData.discount) || 0,
        updatedAt: new Date()
      };

      if (formData.imageFile) {
        try {
          console.log('Uploading product image to Cloudinary...');
          const imageUrl = await uploadToCloudinary(formData.imageFile, true);
          console.log('Product image uploaded successfully:', imageUrl);
          productData.image = imageUrl;
        } catch (uploadError) {
          console.error('Image upload failed:', uploadError);
          alert('Failed to upload image: ' + uploadError.message);
          setUploading(false);
          return;
        }
      }

      if (editingProduct) {
        const productRef = doc(db, 'products', editingProduct.id);
        await updateDoc(productRef, productData);
        setProducts(products.map(p => 
          p.id === editingProduct.id ? { ...p, ...productData } : p
        ));
        alert('Product updated successfully!');
      } else {
        productData.createdAt = new Date();
        const docRef = await addDoc(collection(db, 'products'), productData);
        setProducts([...products, { id: docRef.id, ...productData }]);
        alert('Product created successfully!');
      }

      setShowModal(false);
      setFormData({
        name: '',
        category: '',
        brand: '',
        description: '',
        price: '',
        mrp: '',
        unit: 'kg',
        weight: '',
        stock: '',
        image: '',
        imageFile: null,
        inStock: true,
        featured: false,
        discount: 0
      });
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product: ' + error.message);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;

    try {
      await deleteDoc(doc(db, 'products', id));
      setProducts(products.filter(p => p.id !== id));
      alert('Product deleted successfully!');
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, imageFile: file });
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-800">Products Management</h1>
        <button
          onClick={() => openModal()}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700"
        >
          <Plus className="w-5 h-5" />
          Add Product
        </button>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {products.length === 0 ? (
          <div className="col-span-full bg-white rounded-lg shadow p-8 text-center text-gray-500">
            No products found. Add your first product!
          </div>
        ) : (
          products.map((product) => (
            <div key={product.id} className="bg-white rounded-lg shadow hover:shadow-lg transition-shadow">
              {product.image ? (
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-40 object-cover rounded-t-lg"
                />
              ) : (
                <div className="w-full h-40 bg-gray-200 rounded-t-lg flex items-center justify-center">
                  <Package className="w-12 h-12 text-gray-400" />
                </div>
              )}
              <div className="p-3">
                <div className="flex items-start justify-between mb-2">
                  <div className="flex-1">
                    <h3 className="text-sm font-bold text-gray-900 line-clamp-1">{product.name}</h3>
                    {product.brand && (
                      <p className="text-xs text-gray-500">{product.brand}</p>
                    )}
                  </div>
                  {product.featured && (
                    <span className="text-xs bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded">
                      Featured
                    </span>
                  )}
                </div>
                
                <p className="text-xs text-gray-600 mb-2 line-clamp-1">{product.category}</p>
                
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                  {product.mrp > product.price && (
                    <span className="text-xs text-gray-400 line-through">₹{product.mrp}</span>
                  )}
                  {product.discount > 0 && (
                    <span className="text-xs bg-red-100 text-red-600 px-1 rounded">
                      {product.discount}% OFF
                    </span>
                  )}
                </div>

                <div className="flex items-center justify-between text-xs mb-3">
                  <span className="text-gray-600">{product.weight} {product.unit}</span>
                  <span className={`px-2 py-0.5 rounded-full ${
                    product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                  }`}>
                    {product.inStock ? `Stock: ${product.stock}` : 'Out of Stock'}
                  </span>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => openModal(product)}
                    className="flex-1 text-blue-600 hover:bg-blue-50 py-1 rounded text-xs font-medium"
                  >
                    <Edit2 className="w-4 h-4 inline mr-1" />
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex-1 text-red-600 hover:bg-red-50 py-1 rounded text-xs font-medium"
                  >
                    <Trash2 className="w-4 h-4 inline mr-1" />
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-3xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                  <X className="w-6 h-6" />
                </button>
              </div>

              <form onSubmit={handleSubmit}>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Product Name *</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      required
                      className="input-field"
                      placeholder="e.g., Tata Salt"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Category *</label>
                    <select
                      value={formData.category}
                      onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                      required
                      className="input-field"
                    >
                      <option value="">Select Category</option>
                      {categories.map(cat => (
                        <option key={cat} value={cat}>{cat}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Brand</label>
                    <input
                      type="text"
                      value={formData.brand}
                      onChange={(e) => setFormData({ ...formData, brand: e.target.value })}
                      className="input-field"
                      placeholder="e.g., Tata, Amul"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Price (₹) *</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      required
                      className="input-field"
                      placeholder="Selling Price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">MRP (₹)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.mrp}
                      onChange={(e) => setFormData({ ...formData, mrp: e.target.value })}
                      className="input-field"
                      placeholder="Maximum Retail Price"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Weight/Quantity *</label>
                    <input
                      type="text"
                      value={formData.weight}
                      onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                      required
                      className="input-field"
                      placeholder="e.g., 1, 500, 2.5"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Unit *</label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      required
                      className="input-field"
                    >
                      {units.map(unit => (
                        <option key={unit} value={unit}>{unit}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Stock Quantity *</label>
                    <input
                      type="number"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      required
                      className="input-field"
                      placeholder="Available quantity"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2">Discount (%)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.discount}
                      onChange={(e) => setFormData({ ...formData, discount: e.target.value })}
                      className="input-field"
                      placeholder="0"
                      min="0"
                      max="100"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Description *</label>
                    <textarea
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      rows="3"
                      className="input-field"
                      placeholder="Product description"
                    />
                  </div>

                  <div className="md:col-span-2">
                    <label className="block text-sm font-semibold mb-2">Product Image</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="input-field"
                    />
                    {formData.image && !formData.imageFile && (
                      <img src={formData.image} alt="Current" className="mt-2 h-32 object-cover rounded" />
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.inStock}
                        onChange={(e) => setFormData({ ...formData, inStock: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label className="text-sm font-semibold">In Stock</label>
                    </div>

                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        checked={formData.featured}
                        onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                        className="w-4 h-4"
                      />
                      <label className="text-sm font-semibold">Featured Product</label>
                    </div>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  <button
                    type="submit"
                    disabled={uploading}
                    className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 disabled:bg-gray-400"
                  >
                    {uploading ? 'Saving...' : editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowModal(false)}
                    className="flex-1 bg-gray-200 text-gray-800 px-4 py-2 rounded-lg hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductsManagement;
