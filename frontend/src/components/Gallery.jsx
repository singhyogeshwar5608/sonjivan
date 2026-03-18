import { useState, useCallback, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

export const Gallery = () => {
  const [galleryImages, setGalleryImages] = useState([]);
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const { language } = useLanguage();
  const t = translations[language];

  // Fetch gallery images with better error handling
  const fetchGalleryImages = useCallback(async () => {
    try {
      console.log('Fetching gallery images from Firebase...');
      const galleryRef = collection(db, 'gallery');
      const querySnapshot = await getDocs(galleryRef);
      const allImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Filter only public images
      const publicImages = allImages.filter(img => img.status === 'public');
      setGalleryImages(publicImages);
      // Save to localStorage as cache
      localStorage.setItem('gallery_images', JSON.stringify(publicImages));
    } catch (error) {
      console.warn('Using cached gallery images:', error.message);
      // Fallback to local storage if API fails
      try {
        const localImages = localStorage.getItem('gallery_images');
        if (localImages) {
          setGalleryImages(JSON.parse(localImages));
        } else {
          // If no local images, show default public gallery images
          const defaultPublicImages = [
            {
              id: 'public1',
              url: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop',
              title: 'Modern Laboratory Equipment',
              description: 'Modern aluminum fabrication workshop',
              status: 'public'
            },
            {
              id: 'public2',
              url: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=400&h=400&fit=crop',
              title: 'Blood Testing Facility',
              description: 'Advanced blood analysis laboratory',
              status: 'public'
            },
            {
              id: 'public3',
              url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=400&h=400&fit=crop',
              title: 'Medical Research Lab',
              description: 'Research and development facility',
              status: 'public'
            }
          ];
          setGalleryImages(defaultPublicImages);
          // Save default images to public gallery
          localStorage.setItem('gallery_images', JSON.stringify(defaultPublicImages));
        }
      } catch (e) {
        console.error('Error parsing local gallery data:', e);
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchGalleryImages();
  }, [fetchGalleryImages]);

  // Open lightbox with selected image
  const openLightbox = (index) => {
    setSelectedImageIndex(index);
    setLightboxOpen(true);
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = '15px';
  };

  // Close lightbox
  const closeLightbox = () => {
    setLightboxOpen(false);
    document.body.style.overflow = 'unset';
    document.body.style.paddingRight = '0';
  };

  // Navigate between images in lightbox
  const navigateLightbox = useCallback((direction) => {
    setSelectedImageIndex(prev => {
      const newIndex = prev + direction;
      if (newIndex < 0) return galleryImages.length - 1;
      if (newIndex >= galleryImages.length) return 0;
      return newIndex;
    });
  }, [galleryImages.length]);

  // Handle keyboard navigation in lightbox
  useEffect(() => {
    if (!lightboxOpen) return;

    const handleKeyDown = (e) => {
      switch(e.key) {
        case 'Escape':
          closeLightbox();
          break;
        case 'ArrowLeft':
          navigateLightbox(-1);
          break;
        case 'ArrowRight':
          navigateLightbox(1);
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [lightboxOpen, selectedImageIndex, galleryImages.length, navigateLightbox]);

  if (loading) {
    return (
      <section className="py-12 bg-gray-50">
        <div className="container-custom">
          <div className="text-center">
            <div className="animate-pulse h-8 bg-gray-200 rounded w-48 mx-auto mb-4"></div>
            <div className="h-1 bg-gray-200 rounded w-16 mx-auto mb-8"></div>
          </div>
          <div className="flex space-x-4 overflow-hidden">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="flex-shrink-0 w-64 h-48 bg-gray-200 rounded-lg"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container-custom">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">{t.galleryTitle}</h2>
          <div className="w-16 h-1 bg-primary mx-auto"></div>
        </div>
        
        <div className="relative group">
          {/* Mobile: Horizontal Scroll */}
          <div className="md:hidden overflow-x-auto scrollbar-hide -mx-4 px-4">
            <div className="flex gap-4 pb-4">
              {galleryImages.map((image, index) => (
                <div 
                  key={image.id || index}
                  className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square flex-shrink-0 w-80"
                  onClick={() => openLightbox(index)}
                >
                  <img
                    src={image.url}
                    alt={image.title || 'Gallery image'}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="font-semibold text-lg mb-1">{image.title || 'Gallery Image'}</h3>
                    </div>
                    <div className="absolute top-4 right-4">
                      <div className="bg-white/90 p-2 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-800">
                          <circle cx="11" cy="11" r="8"></circle>
                          <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                          <line x1="11" x2="11" y1="8" y2="14"></line>
                          <line x1="8" x2="14" y1="11" y2="11"></line>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Desktop: Grid Layout */}
          <div className="hidden md:grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
            {galleryImages.map((image, index) => (
              <div 
                key={image.id || index}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square"
                onClick={() => openLightbox(index)}
              >
                <img
                  src={image.url}
                  alt={image.title || 'Gallery image'}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{image.title || 'Gallery Image'}</h3>
                  </div>
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 p-2 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-gray-800">
                        <circle cx="11" cy="11" r="8"></circle>
                        <line x1="21" x2="16.65" y1="21" y2="16.65"></line>
                        <line x1="11" x2="11" y1="8" y2="14"></line>
                        <line x1="8" x2="14" y1="11" y2="11"></line>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Lightbox */}
      {lightboxOpen && galleryImages.length > 0 && (
        <div 
          className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4"
          onClick={(e) => e.target === e.currentTarget && closeLightbox()}
        >
          {/* Close Button */}
          <button 
            onClick={closeLightbox}
            className="absolute top-6 right-6 text-white hover:text-gray-300 focus:outline-none z-10"
            aria-label="Close lightbox"
          >
            <X className="w-8 h-8" />
          </button>
          
          {/* Navigation Arrows */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(-1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 z-10 transition-all"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button
            onClick={(e) => {
              e.stopPropagation();
              navigateLightbox(1);
            }}
            className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white rounded-full p-3 z-10 transition-all"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
          
          {/* Main Image */}
          <div className="relative max-w-6xl w-full h-full flex flex-col">
            <div className="flex-1 flex items-center justify-center p-2">
              <img 
                src={galleryImages[selectedImageIndex]?.url} 
                alt={galleryImages[selectedImageIndex]?.title || 'Gallery image'}
                className="max-h-[85vh] max-w-full object-contain"
                draggable="false"
              />
            </div>
            
            {/* Image Info */}
            {(galleryImages[selectedImageIndex]?.title || galleryImages[selectedImageIndex]?.description) && (
              <div className="text-white text-center p-4 bg-black/50 rounded-b-lg">
                {galleryImages[selectedImageIndex]?.title && (
                  <h3 className="text-xl font-semibold mb-1">
                    {galleryImages[selectedImageIndex].title}
                  </h3>
                )}
                {galleryImages[selectedImageIndex]?.description && (
                  <p className="text-gray-300 text-sm">
                    {galleryImages[selectedImageIndex].description}
                  </p>
                )}
                <div className="text-xs text-gray-400 mt-2">
                  {selectedImageIndex + 1} of {galleryImages.length}
                </div>
              </div>
            )}
            
            {/* Thumbnail Strip */}
            {galleryImages.length > 1 && (
              <div className="flex justify-center mt-4 space-x-2 overflow-x-auto py-2">
                {galleryImages.map((img, idx) => (
                  <button
                    key={img.id || idx}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedImageIndex(idx);
                    }}
                    className={`flex-shrink-0 w-16 h-16 rounded overflow-hidden border-2 transition-all ${
                      selectedImageIndex === idx 
                        ? 'border-primary scale-110' 
                        : 'border-transparent hover:border-white/50'
                    }`}
                    aria-label={`View image ${idx + 1}`}
                  >
                    <img
                      src={img.url}
                      alt=""
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;
