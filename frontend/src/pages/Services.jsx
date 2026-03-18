import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import Loading from '../components/Loading';
import { 
  Wrench, 
  Heart, 
  Scan, 
  Hammer, 
  Home as HomeIcon, 
  Clock, 
  Shield, 
  Award, 
  CheckCircle, 
  Phone,
  Calendar,
  Users,
  Settings,
  Package,
  FileText,
  Truck,
  Star,
  Filter
} from 'lucide-react';

const Services = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  // Fetch products from Firebase
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log('Fetching products from Firebase...');
        console.log('Database instance:', db);
        
        const productsRef = collection(db, 'products');
        console.log('Products collection reference:', productsRef);
        
        const querySnapshot = await getDocs(productsRef);
        console.log('Query snapshot size:', querySnapshot.size);
        console.log('Query snapshot empty:', querySnapshot.empty);
        
        if (querySnapshot.empty) {
          console.warn('No products found in Firebase. Collection might be empty.');
          setProducts([]);
          setLoading(false);
          return;
        }
        
        const fetchedProducts = querySnapshot.docs
          .map(doc => {
            const data = doc.data();
            console.log('Product document:', doc.id, data);
            return {
              id: doc.id,
              ...data
            };
          })
          .filter(product => product.inStock !== false);
        
        console.log('Fetched products after filter:', fetchedProducts);
        
        // Map Firebase products to component format
        const mappedProducts = fetchedProducts.map((product, index) => {
          const colors = [
            'from-red-400 to-red-600',
            'from-green-400 to-green-600',
            'from-blue-400 to-blue-600',
            'from-purple-400 to-purple-600',
            'from-yellow-400 to-yellow-600',
            'from-indigo-400 to-indigo-600'
          ];
          const icons = [Package, Hammer, Heart, Scan, Wrench, Shield];
          
          return {
            id: product.id,
            title: product.name || product.title || 'Unnamed Product',
            icon: icons[index % icons.length],
            description: product.description || 'No description available',
            color: colors[index % colors.length],
            features: product.features || [],
            price: product.price ? `₹${product.price}` : 'Contact for Price',
            category: product.category || 'all',
            image: product.image || product.imageUrl || '',
            unit: product.unit || 'kg',
            weight: product.weight || product.quantity || '1'
          };
        });
        
        console.log('Mapped products for display:', mappedProducts);
        setProducts(mappedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        console.error('Error details:', error.message);
        console.error('Error code:', error.code);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on selected filter
  const filteredProducts = filter === 'all' 
    ? products 
    : products.filter(product => product.category === filter);

  const stats = [
    { icon: Users, number: '5000+', label: t.happyCustomers },
    { icon: Package, number: '500+', label: t.productsAvailable },
    { icon: Truck, number: '100%', label: t.freshDelivery },
    { icon: Shield, number: '100%', label: t.qualityAssured }
  ];

  const whyChooseUs = [
    {
      icon: Shield,
      title: t.premiumQualityTitle,
      description: t.premiumQualityText
    },
    {
      icon: Award,
      title: t.bestPricesTitle,
      description: t.bestPricesText
    },
    {
      icon: Truck,
      title: t.fastDeliveryTitle,
      description: t.fastDeliveryText
    },
    {
      icon: Clock,
      title: t.alwaysFreshTitle,
      description: t.alwaysFreshText
    },
    {
      icon: CheckCircle,
      title: t.wideSelectionTitle,
      description: t.wideSelectionText
    },
    {
      icon: Phone,
      title: t.support247Title,
      description: t.support247Text
    }
  ];

  // No need for currentService anymore - showing all services in grid

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-blue-700 text-white py-20">
        <div className="container-custom">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              {t.ourProducts}
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto">
              {t.productsSubtitle}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                to="/contact" 
                className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                {t.orderNow}
              </Link>
              <Link 
                to="/categories" 
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
              >
                {t.browseCategories}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 bg-white shadow-sm sticky top-16 z-40">
        <div className="container-custom">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-primary" />
              <span className="font-semibold text-gray-700">{t.filterProducts}</span>
            </div>
            <div className="flex flex-wrap gap-2 sm:gap-3">
              <button
                onClick={() => setFilter('all')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all transform hover:scale-105 ${
                  filter === 'all'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.allProducts} ({products.length})
              </button>
              <button
                onClick={() => setFilter('new')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all transform hover:scale-105 ${
                  filter === 'new'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.newArrivals} ({products.filter(s => s.category === 'new').length})
              </button>
              <button
                onClick={() => setFilter('old')}
                className={`px-4 sm:px-6 py-2 sm:py-3 rounded-full font-semibold text-sm sm:text-base transition-all transform hover:scale-105 ${
                  filter === 'old'
                    ? 'bg-primary text-white shadow-lg'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {t.bestSellers} ({products.filter(s => s.category === 'old').length})
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {filter === 'all' ? t.allProducts : filter === 'new' ? t.newArrivals : t.bestSellers}
            </h2>
            <p className="text-lg text-gray-600">
              {t.showingProducts} {filteredProducts.length} {filteredProducts.length !== 1 ? t.productsCount : t.product}
            </p>
          </div>

          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredProducts.map((service) => {
                const IconComponent = service.icon;
                return (
                  <div
                    key={service.id}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden transform hover:-translate-y-2"
                  >
                    {/* Service Image */}
                    {service.image && (
                      <div className="relative w-full aspect-square overflow-hidden">
                        <img
                          src={service.image}
                          alt={service.title}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent">
                          <div className="absolute bottom-0 left-0 right-0 p-4">
                            <div className="flex items-center justify-between">
                              <div className={`bg-gradient-to-br ${service.color} w-12 h-12 rounded-full flex items-center justify-center shadow-lg`}>
                                <IconComponent className="w-6 h-6 text-white" />
                              </div>
                              <span className="bg-white/90 backdrop-blur-sm text-gray-900 text-xs font-semibold px-3 py-1.5 rounded-full shadow-md">
                                {service.category === 'new' ? t.newBadge : t.classicBadge}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Service Content */}
                    <div className="p-6">
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{service.title}</h3>
                      <p className="text-gray-600 mb-4 leading-relaxed">{service.description}</p>
                      
                      {/* Price */}
                      <div className="mb-4 pb-4 border-b border-gray-200">
                        <span className="text-2xl font-bold text-primary">{service.price}</span>
                      </div>

                      {/* Features */}
                      <div className="mb-6">
                        <h4 className="font-semibold text-gray-900 mb-3 flex items-center gap-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          {t.keyFeatures}
                        </h4>
                        <ul className="space-y-2">
                          {service.features.slice(0, 4).map((feature, index) => (
                            <li key={index} className="flex items-start gap-2 text-sm text-gray-600">
                              <span className="text-primary mt-1">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Action Buttons */}
                      <div className="flex flex-col sm:flex-row gap-3">
                        <Link
                          to="/contact"
                          className="flex-1 bg-primary hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold text-center transition-all transform hover:scale-105 shadow-md text-sm"
                        >
                          {t.orderNow}
                        </Link>
                        <Link
                          to="/categories"
                          className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 px-4 py-3 rounded-lg font-semibold text-center transition-all transform hover:scale-105 text-sm"
                        >
                          {t.viewCategory}
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">{t.noProductsFound}</p>
            </div>
          )}
        </div>
      </section>

      {/* Statistics Section */}
      <section className="py-16 bg-gradient-to-r from-blue-50 to-indigo-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.whyShopWithUs}
            </h2>
            <p className="text-xl text-gray-600">
              {t.trustedByThousandsDesc}
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-primary/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-2">{stat.number}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.whyChooseGrocery}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {t.trustedPartnerDesc}
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {whyChooseUs.map((item, index) => (
              <div key={index} className="group bg-white p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
                <div className="bg-gradient-to-br from-primary to-blue-600 w-12 h-12 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3">{item.title}</h3>
                <p className="text-gray-600 leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-primary to-blue-700 text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.readyToOrderGroceries}
          </h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            {t.bestQualityProductsDesc}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact" 
              className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {t.orderNow}
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-primary px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105"
            >
              {t.contactUs}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Services;
