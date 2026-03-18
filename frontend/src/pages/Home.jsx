import { useState, useEffect, useRef, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import {
  CheckCircle,
  Award,
  Clock,
  Users,
  MapPin,
  Phone,
  Building,
  Home as HomeIcon,
  Shield,
  Wrench,
  HeartHandshake,
  FileText,
  Calendar,
  Truck,
  ChevronLeft,
  ChevronRight,
  Star
} from 'lucide-react';
import Loading from '../components/Loading';
import FreshnessTrustSection from '../components/FreshnessTrustSection';
import CategoriesSection from '../components/CategoriesSection';
import banner1 from '../assets/images/banner/sonjivan banner6.jpeg';
import banner3 from '../assets/images/banner/sonjivan banner3.png';
import heroVideo1 from '../assets/video/video1.mp4';
import heroVideo3 from '../assets/video/video5.mp4';
import heroVideo4 from '../assets/video/video4.mp4';

const LocationCard = ({ title, address, phone1, phone2, icon }) => {
  const IconComponent = icon;
  const [showContactModal, setShowContactModal] = useState(false);
  const { language } = useLanguage();
  const t = translations[language];

  // Company WhatsApp number
  const companyWhatsApp = "919992880001"; // +91-9992880001 without + and -

  const handleGetDirections = () => {
    const message = encodeURIComponent(
      `Hi! I'd like to visit Son Jivan grocry Store.\n\nAddress: ${address}\n\nCould you guide me with directions and available products?`
    );
    window.open(`https://wa.me/${companyWhatsApp}?text=${message}`, '_blank');
  };

  const handleCallUs = (phoneNumber) => {
    window.open(`tel:${phoneNumber.replace(/[- ]/g, '')}`, '_blank');
  };

  const handleWhatsAppUs = (phoneNumber) => {
    const message = encodeURIComponent(
      `Hi! I'm interested in your grocry products and services. Please help me with more information.`
    );
    window.open(`https://wa.me/${phoneNumber.replace(/[-+ ]/g, '')}?text=${message}`, '_blank');
  };

  return (
    <>
      <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-100 overflow-hidden h-full">
        {/* Card Header */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-6 border-b border-gray-100">
          <div className="flex items-center gap-3">
            <div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-shadow">
              <IconComponent className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-bold text-gray-900 leading-tight">{title}</h3>
              <div className="flex items-center gap-2 mt-1">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-xs text-gray-500">Available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Card Body */}
        <div className="p-4 sm:p-6 space-y-4">
          {/* Address */}
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg mt-0.5">
              <MapPin className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm text-gray-600 leading-relaxed font-normal">
                {address}
              </p>
            </div>
          </div>

          {/* Phone Numbers */}
          {phone1 && (
            <div className="flex items-start gap-3">
              <div className="bg-green-100 p-2 rounded-lg mt-0.5">
                <Phone className="w-4 h-4 text-green-600" />
              </div>
              <div className="flex-1">
                <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                  <a
                    href={`tel:${phone1.replace(/[- ]/g, '')}`}
                    className="text-sm font-semibold text-gray-900 hover:text-primary transition-colors"
                  >
                    {phone1}
                  </a>
                  {phone2 && (
                    <>
                      <span className="hidden sm:inline text-gray-400">|</span>
                      <a
                        href={`tel:${phone2.replace(/[- ]/g, '')}`}
                        className="text-sm font-semibold text-gray-900 hover:text-primary transition-colors"
                      >
                        {phone2}
                      </a>
                    </>
                  )}
                </div>
                <p className="text-xs text-gray-500 mt-1">{t.callForInfo}</p>
              </div>
            </div>
          )}

          {/* Action Button */}
          <div className="pt-2 border-t border-gray-100">
            <button
              onClick={() => setShowContactModal(true)}
              className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-2.5 rounded-xl font-semibold transition-all flex items-center justify-center gap-2"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              {t.getDirections}
            </button>
          </div>
        </div>

        {/* Hover Effect Footer */}
        <div className="bg-gradient-to-r from-primary/5 to-blue-50 px-4 sm:px-6 py-3 opacity-0 group-hover:opacity-100 transition-opacity">
          <p className="text-xs text-gray-500 text-center">{t.clickForDirections}</p>
        </div>
      </div>

      {/* Contact Modal */}
      {showContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Contact {title}</h3>
              <button
                onClick={() => setShowContactModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Location Info */}
              <div className="bg-gray-50 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">{title}</p>
                    <p className="text-xs text-gray-600">{address}</p>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900">How would you like to contact us?</p>

                {/* WhatsApp Button */}
                <button
                  onClick={() => handleWhatsAppUs(companyWhatsApp)}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </button>

                {/* Call Buttons */}
                {phone1 && (
                  <button
                    onClick={() => handleCallUs(phone1)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-3"
                  >
                    <Phone className="w-5 h-5" />
                    Call {phone1}
                  </button>
                )}

                {phone2 && (
                  <button
                    onClick={() => handleCallUs(phone2)}
                    className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-3"
                  >
                    <Phone className="w-5 h-5" />
                    Call {phone2}
                  </button>
                )}

                {/* Get Directions Button */}
                <button
                  onClick={handleGetDirections}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
                  </svg>
                  Get Directions on WhatsApp
                </button>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  We'll respond quickly to help you with directions and appointments
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Home = () => {
  const [videoReady, setVideoReady] = useState(false);
  const [loading, setLoading] = useState(true);
  const certScrollRef = useRef(null);
  const [showMainContactModal, setShowMainContactModal] = useState(false);
  const [services, setServices] = useState([]);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [galleryImages, setGalleryImages] = useState([]);
  const [upcomingProducts, setUpcomingProducts] = useState([]);

  // Company WhatsApp number
  const companyWhatsApp = "919992880001"; // +91-9992880001

  const handleMainContact = () => {
    const message = encodeURIComponent(
      "Hi! I'm interested in your grocry products. Could you share more information and help with my order?"
    );
    window.open(`https://wa.me/${companyWhatsApp}?text=${message}`, '_blank');
  };

  const handleMainCall = () => {
    window.open(`tel:9992880001`, '_blank');
  };

  const locations = [
    {
      title: "Son Jivan grocry Store Head Office",
      address: "Property No. G 454 GF New Delhi Kh No 1567, Ph-6, Aya Nagar G Block, Delhi-110047",
      phone1: "+91-94614-94614",
      phone2: null,
      icon: Building
    }
  ];

  const testimonials = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      location: 'Sirsa, Haryana',
      rating: 5,
      review: 'Son Jivan grocry always provides fresh and quality products. Flour, rice, and all daily essentials are available in one place. The service is also very good.',
      image: null
    },
    {
      id: 2,
      name: 'Priya Sharma',
      location: 'Hisar, Haryana',
      rating: 5,
      review: 'Excellent quality grocry is available here. All products are clean and properly packaged. Prices are also reasonable.',
      image: null
    },
    {
      id: 3,
      name: 'Amit Singh',
      location: 'Fatehabad',
      rating: 4,
      review: 'The grocry quality here is quite good and the staff is very helpful. All essential items are available on time. I would definitely recommend it.',
      image: null
    },
    {
      id: 4,
      name: 'Sunita Devi',
      location: 'Sirsa',
      rating: 5,
      review: 'All daily household items are easily available here. The quality of oil, ghee, and spices is very good. Prices are also fair.',
      image: null
    },
    {
      id: 5,
      name: 'Vikram Choudhary',
      location: 'Rania, Haryana',
      rating: 4,
      review: 'Son Jivan grocry is trustworthy. Products are always fresh and packaging is clean. I am a regular customer.',
      image: null
    },
    {
      id: 6,
      name: 'Neha Gupta',
      location: 'Ellenabad',
      rating: 5,
      review: 'A very good grocry store in the area. Good range of products and satisfactory service. Shopping experience was excellent.',
      image: null
    },
    {
      id: 7,
      name: 'Suresh Yadav',
      location: 'Sirsa',
      rating: 4,
      review: 'Son Jivan grocry Store always has fresh and good quality products. Prices are also reasonable and staff is very polite.',
      image: null
    },
    {
      id: 8,
      name: 'Kavita Rani',
      location: 'Dabwali',
      rating: 5,
      review: 'This is the most reliable shop for daily household needs. The quality of spices and ghee is excellent.',
      image: null
    },
    {
      id: 9,
      name: 'Deepak Malik',
      location: 'Sirsa',
      rating: 4,
      review: 'The grains and pulses here are very clean and pure. I have been shopping here for a long time, never had any complaints.',
      image: null
    },
    {
      id: 10,
      name: 'अंजलि गोयल',
      location: 'Kalanwali',
      rating: 5,
      review: 'Everything at Son Jivan grocry is properly packaged and in good condition. It also saves time.',
      image: null
    },
    {
      id: 11,
      name: 'दीपक जैन',
      location: 'Sirsa',
      rating: 4,
      review: 'The quality of oil, rice, and other grocry is excellent. The store is clean and service is also good.',
      image: null
    },
    {
      id: 12,
      name: 'कमला देवी',
      location: 'Baragudha',
      rating: 5,
      review: 'I like shopping here because everything is trustworthy. Safe and good products are available for the family.',
      image: null
    }
  ];

  const scrollCertifications = (direction) => {
    if (!certScrollRef.current) return;
    const scrollAmount = 280; // Card width (256px) + gap (16px) + padding
    certScrollRef.current.scrollBy({
      left: direction === 'right' ? scrollAmount : -scrollAmount,
      behavior: 'smooth'
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const productsRef = collection(db, 'products');
        const querySnapshot = await getDocs(productsRef);
        const productsData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Fetched products:', productsData);
        const activeProducts = productsData.filter(product => product.isActive !== false);
        console.log('Active products:', activeProducts);
        setProducts(activeProducts.slice(0, 8));
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    const fetchCategories = async () => {
      try {
        const categoriesRef = collection(db, 'categories');
        const querySnapshot = await getDocs(categoriesRef);
        const categoriesData = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        console.log('Fetched categories:', categoriesData);
        const activeCategories = categoriesData.filter(cat => cat.isActive !== false);
        setCategories(activeCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    const fetchGalleryImages = async () => {
      try {
        console.log('Fetching gallery images from Firebase...');
        const galleryRef = collection(db, 'gallery');
        const querySnapshot = await getDocs(galleryRef);
        const allImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const publicImages = allImages.filter(img => img.status === 'public');
        console.log('Fetched gallery images:', publicImages);
        setGalleryImages(publicImages);
      } catch (error) {
        console.error('Error fetching gallery images:', error);
      }
    };

    const upcomingRef = collection(db, 'upcomingProducts');
    const unsubscribeUpcoming = onSnapshot(
      upcomingRef,
      (snapshot) => {
        const upcomingData = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setUpcomingProducts(upcomingData);
      },
      (error) => console.error('Error fetching upcoming products:', error)
    );

    fetchProducts();
    fetchCategories();
    fetchGalleryImages();
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => {
      clearTimeout(timer);
      unsubscribeUpcoming();
    };
  }, []);

  const { language } = useLanguage();
  const t = translations[language];
  const displayedGalleryImages = galleryImages.slice(0, 4);
  const featuredProducts = products.slice(0, 4);
  const comingSoonProducts = upcomingProducts.filter(
    (product) => product.status === 'comingSoon'
  );

  const marqueeProducts = comingSoonProducts.length > 0
    ? [...comingSoonProducts, ...comingSoonProducts]
    : [];
  const [isPaused, setIsPaused] = useState(false);
  const marqueeDuration = Math.max(comingSoonProducts.length * 6, 20);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loading />
    </div>
  );

  return (
    <div className="min-h-screen">
      <div className="relative w-full bg-white pt-20 md:pt-24">
        <div className="relative w-full h-[70vh] md:h-[90vh] overflow-hidden">
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${videoReady ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            loop
            muted
            playsInline
            onCanPlayThrough={() => setVideoReady(true)}
          >
            <source src={heroVideo1} type="video/mp4" />
            Your browser does not support the video tag.
          </video>

          <div className="absolute inset-0 z-20 bg-gradient-to-b from-black/20 via-black/20 to-black/20 pointer-events-none" />

          <div className="absolute inset-0 z-30 flex flex-col items-center justify-center text-center text-white px-4 md:px-8 pointer-events-none">
            <p className="hero-subtitle-pill text-[0.55rem] md:text-[0.65rem] lg:text-sm mb-6 hero-animate hero-animate-delay-0">
              {t.heroSubtitle}
            </p>
            <h1
              className="hero-heading text-3xl md:text-5xl lg:text-6xl font-black leading-tight max-w-4xl mb-6 tracking-tight hero-animate hero-animate-delay-1"
              data-text={t.heroTitle}
            >
              {t.heroTitle}
            </h1>
            <p className="hero-description-glow text-base md:text-lg lg:text-xl max-w-3xl hero-animate hero-animate-delay-2">
              {t.heroDescription}
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 pointer-events-auto hero-animate hero-animate-delay-3">
              <Link
                to="/products"
                className="bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-base md:text-lg transition-all shadow-lg hover:shadow-xl"
              >
                {t.shopNow}
              </Link>
              <Link
                to="/contact"
                className="bg-white/10 backdrop-blur border border-white/30 text-white px-8 py-3 rounded-full font-semibold text-base md:text-lg transition-all hover:bg-white/20"
              >
                {t.contactUs}
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* Freshness You Can Trust Section */}
      <FreshnessTrustSection />

      <section className="py-20 relative overflow-hidden">
        <div className="animated-gradient-bg">
          <div className="wave" />
          <div className="wave" />
          <div className="wave" />
        </div>
        <div className="container-custom relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-textLight mb-6 font-serif">
              {t.whyChooseTitle}
            </h2>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
              {t.whyChooseSubtitle}
            </p>
          </div>

          <div className="mb-16 bg-cardBg rounded-2xl shadow-luxury-lg overflow-hidden border border-accent/20">
            <div className="grid lg:grid-cols-2 gap-0">
              <div className="p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
                {/* Title Section */}
                <div className="flex flex-col sm:flex-row sm:items-center mb-4 sm:mb-6">
                  <div className="bg-primary/10 p-3 rounded-full mb-3 sm:mb-0 sm:mr-4 w-fit">
                    <HomeIcon className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white leading-tight font-serif">
                    {t.freshQualityTitle}
                  </h3>
                </div>

                {/* Description */}
                <p className="text-base sm:text-lg text-white mb-6 leading-relaxed">
                  {t.freshQualityDesc}
                </p>

                {/* Features List */}
                <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8">
                  <div className="flex items-start sm:items-center bg-accent/10 border border-accent/20 p-3 rounded-lg">
                    <Shield className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-white font-medium">
                      {t.freshHandpicked}
                    </span>
                  </div>
                  <div className="flex items-start sm:items-center bg-accent/10 border border-accent/20 p-3 rounded-lg">
                    <Calendar className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-white font-medium">
                      {t.hygienicPackaging}
                    </span>
                  </div>
                  <div className="flex items-start sm:items-center bg-accent/10 border border-accent/20 p-3 rounded-lg">
                    <Truck className="w-5 h-5 text-accent mr-3 flex-shrink-0 mt-0.5 sm:mt-0" />
                    <span className="text-sm sm:text-base text-white font-medium">
                      {t.wideRange}
                    </span>
                  </div>
                </div>

                {/* CTA Button */}
                <Link
                  to="/products"
                  className="inline-flex items-center justify-center bg-primary hover:bg-blue-700 text-white px-6 sm:px-8 py-3 sm:py-4 rounded-full font-semibold text-base sm:text-lg transition-all transform hover:scale-105 shadow-lg w-full sm:w-fit"
                >
                  <Calendar className="w-5 h-5 mr-2" />
                  View Products
                </Link>
              </div>

              {/* Image Section */}
              <div className="relative h-64 sm:h-80 lg:h-auto overflow-hidden">
                <video
                  className="w-full h-full object-cover"
                  autoPlay
                  loop
                  muted
                  playsInline
                  poster={banner3}
                >
                  <source src={heroVideo3} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-transparent pointer-events-none"></div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-green-400 to-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Wrench className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t.freshPremiumTitle}</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                {t.freshPremiumDesc}
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-green-600 font-semibold">
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {t.qualityChecked}
                </span>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-blue-400 to-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Award className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t.trustedSourcingTitle}</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                {t.trustedSourcingDesc}
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-blue-600 font-semibold">
                  <Shield className="w-4 h-4 mr-1" />
                  {t.verifiedSuppliers}
                </span>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-purple-400 to-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Clock className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t.timelyAvailabilityTitle}</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                {t.timelyAvailabilityDesc}
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-purple-600 font-semibold">
                  <FileText className="w-4 h-4 mr-1" />
                  {t.alwaysInStock}
                </span>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-orange-400 to-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t.hygienicHandlingTitle}</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                {t.hygienicHandlingDesc}
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-orange-600 font-semibold">
                  <HeartHandshake className="w-4 h-4 mr-1" />
                  {t.cleanSafePackaging}
                </span>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-teal-400 to-teal-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <CheckCircle className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t.affordablePricingTitle}</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                {t.affordablePricingDesc}
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-teal-600 font-semibold">
                  <Award className="w-4 h-4 mr-1" />
                  {t.bestValue}
                </span>
              </div>
            </div>

            <div className="group bg-white p-8 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="bg-gradient-to-br from-red-400 to-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform">
                <MapPin className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-4 text-center">{t.servingCommunityTitle}</h3>
              <p className="text-gray-600 text-center leading-relaxed mb-4">
                {t.servingCommunityDesc}
              </p>
              <div className="text-center">
                <span className="inline-flex items-center text-red-600 font-semibold">
                  <Building className="w-4 h-4 mr-1" />
                  {t.servingYourArea}
                </span>
              </div>
            </div>
          </div>

          <div className="text-center mt-16">
            <div className="bg-white p-8 rounded-2xl shadow-xl max-w-2xl mx-auto">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                {t.readyForGroceries}
              </h3>
              <p className="text-gray-600 mb-6">
                {t.readyForGroceriesDesc}
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  to="/products"
                  className="bg-primary hover:bg-blue-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  {t.viewProducts}
                </Link>
                <Link
                  to="/contact"
                  className="bg-gray-100 hover:bg-gray-200 text-gray-800 px-8 py-4 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  {t.contactUs}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Animated Cards Section */}
      <section className="py-20 bg-[#1d1e22] min-h-screen flex items-center justify-center">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6 font-serif">
              {t.featuredCategoriesTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
              {t.featuredCategoriesSubtitle}
            </p>
          </div>

          <div className="flex justify-center items-center flex-wrap gap-12 py-10">
            {/* Card 1 - Doors & Windows */}
            <div className="relative w-80 h-[400px] flex justify-center items-center transition-all duration-500 group">
              {/* Skewed background */}
              <div className="absolute top-0 left-12 w-1/2 h-full bg-gradient-to-br from-[#ffbc00] to-[#ff0058] rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-5 group-hover:w-[calc(100%-90px)] blur-[30px]"></div>
              <div className="absolute top-0 left-12 w-1/2 h-full bg-gradient-to-br from-[#ffbc00] to-[#ff0058] rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-5 group-hover:w-[calc(100%-90px)]"></div>

              {/* Floating decorative elements */}
              <span className="block absolute top-0 left-0 right-0 bottom-0 z-50 pointer-events-none">
                <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-white/10 backdrop-blur-[10px] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-top-9 group-hover:left-9 group-hover:w-[85px] group-hover:h-[85px] animate-float"></span>
                <span className="absolute bottom-0 right-0 w-full h-full rounded-lg bg-white/10 backdrop-blur-[10px] opacity-0 transition-all duration-500 shadow-[0_5px_15px_rgba(0,0,0,0.05)] group-hover:opacity-100 group-hover:-bottom-9 group-hover:right-24 group-hover:w-[85px] group-hover:h-[85px] animate-float-delayed"></span>
              </span>

              {/* Content */}
              <div className="relative -left-5 p-8 bg-white/5 shadow-[0_5px_15px_rgba(0,0,0,0.1)] rounded-lg transition-all duration-500 z-10 text-white group-hover:-left-16">
                <h2 className="text-3xl text-white mb-3 font-bold">{t.cookingOilsTitle}</h2>
                <p className="text-base mb-3 leading-relaxed">{t.cookingOilsDesc}</p>
                <Link to="/products" className="inline-block text-base text-[#111] bg-white py-2.5 px-4 rounded font-medium mt-2 no-underline hover:bg-gray-100 transition-colors">
                  {t.viewProducts}
                </Link>
              </div>
            </div>

            {/* Card 2 - Partitions */}
            <div className="relative w-80 h-[400px] flex justify-center items-center transition-all duration-500 group">
              {/* Skewed background */}
              <div className="absolute top-0 left-12 w-1/2 h-full bg-gradient-to-br from-[#03a9f4] to-[#ff0058] rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-5 group-hover:w-[calc(100%-90px)] blur-[30px]"></div>
              <div className="absolute top-0 left-12 w-1/2 h-full bg-gradient-to-br from-[#03a9f4] to-[#ff0058] rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-5 group-hover:w-[calc(100%-90px)]"></div>

              {/* Floating decorative elements */}
              <span className="block absolute top-0 left-0 right-0 bottom-0 z-50 pointer-events-none">
                <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-white/10 backdrop-blur-[10px] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-top-9 group-hover:left-9 group-hover:w-[85px] group-hover:h-[85px] animate-float"></span>
                <span className="absolute bottom-0 right-0 w-full h-full rounded-lg bg-white/10 backdrop-blur-[10px] opacity-0 transition-all duration-500 shadow-[0_5px_15px_rgba(0,0,0,0.05)] group-hover:opacity-100 group-hover:-bottom-9 group-hover:right-24 group-hover:w-[85px] group-hover:h-[85px] animate-float-delayed"></span>
              </span>

              {/* Content */}
              <div className="relative -left-5 p-8 bg-white/5 shadow-[0_5px_15px_rgba(0,0,0,0.1)] rounded-lg transition-all duration-500 z-10 text-white group-hover:-left-16">
                <h2 className="text-3xl text-white mb-3 font-bold">{t.spicesTitle}</h2>
                <p className="text-base mb-3 leading-relaxed">{t.spicesDesc}</p>
                <Link to="/products" className="inline-block text-base text-[#111] bg-white py-2.5 px-4 rounded font-medium mt-2 no-underline hover:bg-gray-100 transition-colors">
                  {t.viewProducts}
                </Link>
              </div>
            </div>

            {/* Card 3 - Custom Solutions */}
            <div className="relative w-80 h-[400px] flex justify-center items-center transition-all duration-500 group">
              {/* Skewed background */}
              <div className="absolute top-0 left-12 w-1/2 h-full bg-gradient-to-br from-[#4dff03] to-[#00d0ff] rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-5 group-hover:w-[calc(100%-90px)] blur-[30px]"></div>
              <div className="absolute top-0 left-12 w-1/2 h-full bg-gradient-to-br from-[#4dff03] to-[#00d0ff] rounded-lg transform skew-x-[15deg] transition-all duration-500 group-hover:skew-x-0 group-hover:left-5 group-hover:w-[calc(100%-90px)]"></div>

              {/* Floating decorative elements */}
              <span className="block absolute top-0 left-0 right-0 bottom-0 z-50 pointer-events-none">
                <span className="absolute top-0 left-0 w-full h-full rounded-lg bg-white/10 backdrop-blur-[10px] opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:-top-9 group-hover:left-9 group-hover:w-[85px] group-hover:h-[85px] animate-float"></span>
                <span className="absolute bottom-0 right-0 w-full h-full rounded-lg bg-white/10 backdrop-blur-[10px] opacity-0 transition-all duration-500 shadow-[0_5px_15px_rgba(0,0,0,0.05)] group-hover:opacity-100 group-hover:-bottom-9 group-hover:right-24 group-hover:w-[85px] group-hover:h-[85px] animate-float-delayed"></span>
              </span>

              {/* Content */}
              <div className="relative -left-5 p-8 bg-white/5 shadow-[0_5px_15px_rgba(0,0,0,0.1)] rounded-lg transition-all duration-500 z-10 text-white group-hover:-left-16">
                <h2 className="text-3xl text-white mb-3 font-bold">{t.snacksTitle}</h2>
                <p className="text-base mb-3 leading-relaxed">{t.snacksDesc}</p>
                <Link to="/contact" className="inline-block text-base text-[#111] bg-white py-2.5 px-4 rounded font-medium mt-2 no-underline hover:bg-gray-100 transition-colors">
                  {t.shopNowBtn}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-16 bg-gradient-to-br from-[#0f172a] via-[#111827] to-[#030712] overflow-hidden">
        <video
          className="absolute inset-0 w-full h-full object-cover "
          autoPlay
          loop
          muted
          playsInline
        >
          <source src={heroVideo4} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/60 " />
        <div className="container-custom relative z-10">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {t.comingSoonSectionTitle}
            </h2>
            <p className="text-lg text-slate-200 max-w-3xl mx-auto">
              {t.comingSoonSectionSubtitle}
            </p>
          </div>

          <div className="relative">
            {comingSoonProducts.length > 0 ? (
              <div
                className="coming-soon-marquee pb-4"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <div
                  className="coming-soon-track"
                  style={{
                    animationDuration: `${marqueeDuration}s`,
                    animationPlayState: isPaused ? 'paused' : 'running'
                  }}
                >
                  {marqueeProducts.map((product, index) => (
                    <div
                      key={`${product.id}-${index}`}
                      className="min-w-[280px] max-w-xs snap-start bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
                      onClick={() => window.location.href = '/coming-soon'}
                    >
                      <div className="relative h-48 rounded-t-2xl overflow-hidden">
                        {product.image ? (
                          <img
                            src={product.image}
                            alt={product.name}
                            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white text-lg font-semibold">
                            {product.name?.charAt(0) || 'S'}
                          </div>
                        )}
                        <div className="absolute top-4 left-4 bg-white/90 text-slate-900 text-xs font-semibold px-3 py-1 rounded-full shadow">
                          {t.comingSoonSectionTitle}
                        </div>
                      </div>

                      <div className="p-6 text-white">
                        <h3 className="text-xl font-bold mb-3">{product.name}</h3>
                        <p className="text-sm text-slate-200 mb-6 line-clamp-3">
                          {product.description || t.comingSoonSectionSubtitle}
                        </p>
                        <Link
                          to="/coming-soon"
                          className="inline-flex items-center gap-2 text-sm font-semibold text-slate-900 bg-white px-4 py-2 rounded-full hover:bg-slate-100 transition-colors"
                          onClick={(e) => e.stopPropagation()}
                        >
                          {t.comingSoonCtaLabel}
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={2}
                            stroke="currentColor"
                            className="w-4 h-4"
                          >
                            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10 p-8 max-w-md mx-auto">
                  <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth={2}
                      stroke="currentColor"
                      className="w-8 h-8 text-white"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    Coming Soon New Products
                  </h3>
                  <p className="text-slate-200">
                    {t.comingSoonEmpty}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 bg-[#101829]">
        <div className="container-custom">
          <h2 className="section-title text-center text-white">{t.premiumRangeTitle}</h2>
          <p className="section-subtitle text-center text-slate-200">
            {t.premiumRangeSubtitle}
          </p>
          <div className="max-w-6xl mx-auto mt-10">
            {featuredProducts.length > 0 ? (
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
                {featuredProducts.map((product) => (
                  <Link
                    key={product.id}
                    to="/products"
                    aria-label={`View ${product.name} in products`}
                    className="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-transform duration-300 hover:-translate-y-1 overflow-hidden border border-white/60"
                  >
                    {product.image ? (
                      <div className="relative aspect-square overflow-hidden">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                        <div className="absolute bottom-0 left-0 right-0 p-4">
                          <h3 className="text-base sm:text-lg font-bold text-white text-center leading-snug">
                            {product.name}
                          </h3>
                          {product.price && (
                            <p className="text-sm text-white text-center font-semibold mt-1">
                              ₹{product.price}
                            </p>
                          )}
                        </div>
                      </div>
                    ) : (
                      <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-blue-500 to-purple-600 p-6">
                        <div className="text-center text-white">
                          <Shield className="w-12 h-12 mx-auto mb-2" />
                          <h3 className="text-base font-semibold">{product.name}</h3>
                          {product.price && (
                            <p className="text-sm font-medium mt-1">₹{product.price}</p>
                          )}
                        </div>
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-slate-200">{t.loadingProducts}</p>
              </div>
            )}

            <div className="text-center mt-12">
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-8 py-3 rounded-full font-semibold text-white bg-blue-900 hover:bg-blue-700 transition-transform duration-300 hover:scale-105 shadow-lg w-full sm:w-auto"
              >
                {t.viewAllProducts}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-bgLight">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src={banner1}
                alt="JB Aluminum Industries Workshop"
                className="rounded-lg shadow-lg w-full h-auto"
                loading="lazy"
                decoding="async"
              />
            </div>
            <div className="text-center md:text-left">
              <h2 className="section-title mb-4">{t.aboutTitle}</h2>
              <p className="text-gray-700 mb-5">
                {t.aboutDescription1}
              </p>
              <p className="text-gray-700 mb-6">
                {t.aboutDescription2}
              </p>
              <div className="flex justify-center md:justify-start">
                <Link to="/about" className="btn-primary">
                  {t.learnMore}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 sm:py-24 bg-gradient-to-br from-[#1a1b1e] via-[#2d2e35] to-[#1e3a5f]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Professional Header */}
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-primary/10 rounded-full text-white font-semibold mb-4">
              <MapPin className="w-4 h-4 mr-2" />
              {t.findStore}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4">
              {t.ourLocation.split(' ')[0]} <span className="text-white">{t.ourLocation.split(' ').slice(1).join(' ')}</span>
            </h2>
            <p className="text-slate-50 max-w-2xl mx-auto text-sm sm:text-base px-4">
              {t.locationDescription}
            </p>
          </div>

          {/* Location Stats */}
          <div className="flex justify-center items-center gap-6 sm:gap-8 mb-8 sm:mb-12">
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-white">{locations.length}</div>
              <div className="text-xs sm:text-sm text-gray-400">{t.totalCenters}</div>
            </div>
            <div className="w-px h-8 sm:h-12 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-green-400">1</div>
              <div className="text-xs sm:text-sm text-gray-400">{t.cityServed}</div>
            </div>
            <div className="w-px h-8 sm:h-12 bg-gray-600"></div>
            <div className="text-center">
              <div className="text-2xl sm:text-3xl font-bold text-blue-400">24/7</div>
              <div className="text-xs sm:text-sm text-gray-400">{t.customerSupport}</div>
            </div>
          </div>

          {/* Locations + CTA Layout */}
          <div className="mt-12 sm:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-stretch">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 sm:gap-6">
              {locations.map((location, index) => (
                <LocationCard
                  key={index}
                  title="Son Jivan grocry Store Head Office"
                  address={location.address}
                  phone1={location.phone1}
                  phone2={location.phone2}
                  icon={location.icon}
                />
              ))}
            </div>

            <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-lg border border-gray-100 flex flex-col justify-between text-center">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4">
                  {t.cantFindStore}
                </h3>
                <p className="text-gray-600 mb-6 text-sm sm:text-base">
                  {t.cantFindStoreDesc}
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <button
                  onClick={() => setShowMainContactModal(true)}
                  className="bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  {t.getDirections}
                </button>
                <button
                  onClick={() => setShowMainContactModal(true)}
                  className="bg-white hover:bg-gray-50 text-primary border-2 border-primary px-6 sm:px-8 py-3 rounded-xl font-semibold transition-all"
                >
                  {t.callForOrders}
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-50">
        <div className="container-custom">
          <div className="text-center mb-8 sm:mb-16">
            <div className="inline-flex items-center px-4 py-2 bg-accent/10 rounded-full text-accent font-semibold mb-4">
              <Star className="w-4 h-4 mr-2" />
              {t.clientTestimonials}
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.customerReviews} <span className="text-primary">{t.customerTrust}</span>
            </h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.testimonialsDescription}
            </p>
          </div>

          <div className="relative overflow-hidden rounded-2xl bg-white p-4 sm:p-8 shadow-xl">
            {/* Mobile: Horizontal Scroll */}
            <div className="md:hidden relative">
              <div ref={certScrollRef} className="overflow-x-auto scrollbar-hide -mx-4 px-4">
                <div className="flex gap-3 sm:gap-4 pb-4">
                  {testimonials.map((testimonial) => (
                    <div
                      key={testimonial.id}
                      className="group bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex-shrink-0 w-72 sm:w-80 border border-gray-100"
                    >
                      <div className="flex items-center mb-4">
                        <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full overflow-hidden bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-lg mr-3 flex-shrink-0">
                          {testimonial.image ? (
                            <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                          ) : (
                            testimonial.name.charAt(0)
                          )}
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm sm:text-base font-bold text-gray-900">{testimonial.name}</h3>
                          <p className="text-xs text-gray-600">{testimonial.location}</p>
                          <div className="flex items-center mt-1">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`w-3 h-3 sm:w-4 sm:h-4 ${i < testimonial.rating
                                  ? 'text-yellow-400 fill-yellow-400'
                                  : 'text-gray-300'
                                  }`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                      <p className="text-xs sm:text-sm text-gray-700 leading-relaxed italic">
                        "{testimonial.review}"
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Scroll Navigation Icons */}
              <button
                onClick={() => scrollCertifications('right')}
                className="absolute right-1 sm:right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-md transition-all hover:scale-110 z-10"
                aria-label="Scroll right"
              >
                <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </button>
              <button
                onClick={() => scrollCertifications('left')}
                className="absolute left-1 sm:left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-1.5 sm:p-2 shadow-md transition-all hover:scale-110 z-10"
                aria-label="Scroll left"
              >
                <ChevronLeft className="w-3 h-3 sm:w-4 sm:h-4 text-gray-600" />
              </button>
            </div>

            {/* Desktop: Grid Layout */}
            <div className="hidden md:grid grid-cols-3 gap-4 sm:gap-6 justify-items-center">
              {testimonials.slice(0, 6).map((testimonial) => (
                <div
                  key={testimonial.id}
                  className="group bg-gradient-to-br from-white to-gray-50 p-4 sm:p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 w-full border border-gray-100"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full overflow-hidden bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center text-white font-bold text-xl mr-4 flex-shrink-0">
                      {testimonial.image ? (
                        <img src={testimonial.image} alt={testimonial.name} className="w-full h-full object-cover" />
                      ) : (
                        testimonial.name.charAt(0)
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-base sm:text-lg font-bold text-gray-900">{testimonial.name}</h3>
                      <p className="text-xs sm:text-sm text-gray-600">{testimonial.location}</p>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`w-4 h-4 ${i < testimonial.rating
                              ? 'text-yellow-400 fill-yellow-400'
                              : 'text-gray-300'
                              }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 leading-relaxed italic">
                    "{testimonial.review}"
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center items-center mt-6 sm:mt-8 space-y-4 sm:space-y-0 sm:space-x-8">
            <div className="flex items-center justify-center sm:justify-start space-x-3 w-full sm:w-auto">
              <div className="flex-shrink-0">
                <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-green-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 text-sm sm:text-base">{t.firstChoice}</p>
                <p className="text-xs sm:text-sm text-gray-600">{t.internationalStandards}</p>
              </div>
            </div>
            <div className="flex items-center justify-center sm:justify-start space-x-3 w-full sm:w-auto">
              <div className="flex-shrink-0">
                <CheckCircle className="w-6 h-6 sm:w-8 sm:h-8 text-blue-600" />
              </div>
              <div className="text-left">
                <p className="font-bold text-gray-900 text-sm sm:text-base">{t.trustedByThousands}</p>
                <p className="text-xs sm:text-sm text-gray-600">{t.yearsExperience}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Section - Firebase Data */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {t.galleryTitle || 'Our Gallery'}
            </h2>
            <div className="w-16 h-1 bg-primary mx-auto mb-4"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t.gallerySubtitle || 'Explore our collection of quality products and services'}
            </p>
          </div>

          {displayedGalleryImages.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                {t.noGalleryImages || 'No gallery images available at the moment.'}
              </p>
            </div>
          ) : (
            <div className="max-w-5xl mx-auto">
              <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 sm:gap-6">
                {displayedGalleryImages.map((image) => (
                  <Link
                    to="/gallery"
                    key={image.id}
                    aria-label={`Open gallery to view ${image.title || 'image'}`}
                    className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square bg-gray-200"
                  >
                    <img
                      src={image.url}
                      alt={image.title || 'Gallery image'}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        {image.title && (
                          <h3 className="font-bold text-base sm:text-lg mb-1">{image.title}</h3>
                        )}
                        {image.description && (
                          <p className="text-xs sm:text-sm text-gray-200 line-clamp-2">
                            {image.description}
                          </p>
                        )}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {displayedGalleryImages.length > 0 && (
            <div className="text-center mt-12">
              <Link
                to="/gallery"
                className="inline-flex items-center bg-primary hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold text-lg transition-all transform hover:scale-105 shadow-lg"
              >
                {t.viewFullGallery || 'View Full Gallery'}
                <ChevronRight className="w-5 h-5 ml-2" />
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 bg-primary text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t.lookingForQuality}
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            {t.getFreshProducts}
          </p>
          <Link to="/products" className="btn-secondary">
            {t.viewProducts}
          </Link>
        </div>
      </section>

      {/* Main Contact Modal */}
      {showMainContactModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-900">Contact Son Jivan grocry Store</h3>
              <button
                onClick={() => setShowMainContactModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors p-2"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="space-y-4">
              {/* Company Info */}
              <div className="bg-gradient-to-r from-primary/10 to-blue-10 p-4 rounded-xl">
                <div className="flex items-start gap-3">
                  <div className="bg-white p-2 rounded-lg">
                    <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-900 mb-1">Son Jivan grocry Store</p>
                    <p className="text-xs text-gray-600">Property No. G 454 GF New Delhi Kh No 1567, Ph-6, Aya Nagar G Block, Delhi-110047</p>
                  </div>
                </div>
              </div>

              {/* Contact Options */}
              <div className="space-y-3">
                <p className="text-sm font-semibold text-gray-900">How can we help you today?</p>

                {/* WhatsApp Button */}
                <button
                  onClick={handleMainContact}
                  className="w-full bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.149-.67.149-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414-.074-.123-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
                  </svg>
                  WhatsApp Us
                </button>

                {/* Call Button */}
                <button
                  onClick={handleMainCall}
                  className="w-full bg-blue-500 hover:bg-blue-600 text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-3"
                >
                  <Phone className="w-5 h-5" />
                  Call +91-94614-94614
                </button>

                {/* Products Button */}
                <Link
                  to="/products"
                  onClick={() => setShowMainContactModal(false)}
                  className="w-full bg-gradient-to-r from-primary to-blue-600 hover:from-blue-700 hover:to-blue-800 text-white px-4 py-3 rounded-xl font-semibold transition-all flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                  </svg>
                  View Our Products
                </Link>
              </div>

              <div className="text-center pt-4 border-t border-gray-200">
                <p className="text-xs text-gray-500">
                  Available 24/7 for emergencies and appointments
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
