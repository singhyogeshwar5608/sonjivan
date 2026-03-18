import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Clock, Package, Star, ChevronRight } from 'lucide-react';
import Loading from '../components/Loading';

const ComingSoon = () => {
  const [upcomingProducts, setUpcomingProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];
  const navigate = useNavigate();

  useEffect(() => {
    fetchUpcomingProducts();
  }, []);

  const fetchUpcomingProducts = async () => {
    try {
      const upcomingRef = collection(db, 'upcomingProducts');
      const querySnapshot = await getDocs(upcomingRef);
      const upcomingData = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setUpcomingProducts(upcomingData);
    } catch (error) {
      console.error('Error fetching upcoming products:', error);
    } finally {
      setLoading(false);
    }
  };

  const comingSoonProducts = upcomingProducts.filter(
    (product) => product.status === 'comingSoon'
  );

  if (loading) {
    return <Loading />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-[#0f172a] via-[#111827] to-[#030712] text-white">
        <div className="container-custom py-16">
          <button
            onClick={() => navigate('/')}
            className="flex items-center gap-2 text-slate-300 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            {t.backToHome || 'Back to Home'}
          </button>
          
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20">
                <Clock className="w-12 h-12 text-white" />
              </div>
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent">
              {t.comingSoonSectionTitle || 'Coming Soon Products'}
            </h1>
            <p className="text-xl text-slate-200 mb-8 leading-relaxed">
              {t.comingSoonSectionSubtitle || 'Exciting products launching soon'}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="flex items-center gap-2 bg-white/10 backdrop-blur-lg px-4 py-2 rounded-full border border-white/20">
                <Package className="w-5 h-5" />
                <span className="font-medium">{comingSoonProducts.length} {t.products || 'Products'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      <div className="container-custom py-16">
        {comingSoonProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {comingSoonProducts.map((product) => (
              <div
                key={product.id}
                className="group bg-white rounded-3xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden border border-slate-100"
              >
                <div className="relative h-64 overflow-hidden">
                  {product.image ? (
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center">
                      <Package className="w-16 h-16 text-white" />
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-white/95 backdrop-blur-sm text-slate-900 text-sm font-semibold px-4 py-2 rounded-full shadow-lg border border-slate-200">
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4" />
                      {t.comingSoon || 'Coming Soon'}
                    </div>
                  </div>
                </div>

                <div className="p-8">
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-2xl font-bold text-slate-900 group-hover:text-primary transition-colors">
                      {product.name}
                    </h3>
                    <div className="flex items-center gap-1 bg-yellow-50 text-yellow-600 px-2 py-1 rounded-lg">
                      <Star className="w-4 h-4 fill-current" />
                      <span className="text-sm font-medium">New</span>
                    </div>
                  </div>
                  
                  <p className="text-slate-600 mb-6 leading-relaxed line-clamp-3">
                    {product.description || t.comingSoonSectionSubtitle || 'Exciting products launching soon'}
                  </p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-slate-500">
                      <Clock className="w-4 h-4" />
                      <span className="text-sm">{t.launchingSoon || 'Launching Soon'}</span>
                    </div>
                    <button
                      onClick={() => navigate('/products')}
                      className="flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-6 py-3 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                    >
                      {t.viewDetails || 'View Details'}
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <div className="max-w-md mx-auto">
              <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Clock className="w-10 h-10 text-slate-400" />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-4">
                {t.noUpcomingProducts || 'No Upcoming Products'}
              </h3>
              <p className="text-slate-600 mb-8">
                {t.comingSoonEmpty || 'No upcoming products at the moment. Please check back soon.'}
              </p>
              <button
                onClick={() => navigate('/products')}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-primary to-blue-600 text-white px-8 py-4 rounded-full font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
              >
                {t.viewAvailableProducts || 'View Available Products'}
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Newsletter Section */}
      <div className="bg-gradient-to-r from-primary to-blue-600 text-white py-16">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            {t.stayUpdated || 'Stay Updated'}
          </h2>
          <p className="text-xl mb-8 opacity-90">
            {t.getNotified || 'Get notified when new products launch'}
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder={t.enterEmail || 'Enter your email'}
              className="flex-1 px-6 py-4 rounded-full text-slate-900 placeholder-slate-500 focus:outline-none focus:ring-4 focus:ring-white/30"
            />
            <button className="bg-white text-primary px-8 py-4 rounded-full font-semibold hover:bg-slate-100 transition-colors">
              {t.subscribe || 'Subscribe'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ComingSoon;
