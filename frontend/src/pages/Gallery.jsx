import { useState, useEffect } from 'react';
import { X, ZoomIn } from 'lucide-react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const Gallery = () => {
  const { language } = useLanguage();
  const t = translations[language];
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      console.log('Fetching gallery images from Firebase...');
      const galleryRef = collection(db, 'gallery');
      const querySnapshot = await getDocs(galleryRef);
      const allImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      // Filter only public images
      const publicImages = allImages.filter(img => img.status === 'public');
      console.log('Fetched gallery images:', publicImages);
      setImages(publicImages);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      setImages([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-16">
        <div className="container-custom text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-primary mx-auto"></div>
          <p className="mt-4 text-gray-600">{t.loading}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="section-title">{t.galleryTitle}</h1>
          <p className="section-subtitle max-w-2xl mx-auto">
            {t.galleryDescription}
          </p>
        </div>

        {/* Gallery Grid - Responsive */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {images.map((image) => (
              <div
                key={image.id}
                className="group relative overflow-hidden rounded-lg shadow-md hover:shadow-2xl transition-all duration-300 cursor-pointer aspect-square"
                onClick={() => setSelectedImage(image)}
              >
                {/* Image */}
                <img
                  src={image.url}
                  alt={image.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  loading="lazy"
                />
                
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                    <h3 className="font-semibold text-lg mb-1">{image.title}</h3>
                    {image.description && (
                      <p className="text-sm text-gray-200 line-clamp-2">{image.description}</p>
                    )}
                  </div>
                  
                  {/* Zoom Icon */}
                  <div className="absolute top-4 right-4">
                    <div className="bg-white/90 p-2 rounded-full">
                      <ZoomIn className="w-5 h-5 text-gray-800" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <div className="text-6xl mb-4">📸</div>
            <h3 className="text-2xl font-semibold text-gray-600 mb-2">{t.galleryTitle}</h3>
            <p className="text-gray-500">{t.galleryDescription}</p>
          </div>
        )}

        {/* Lightbox Modal */}
        {selectedImage && (
          <div
            className="fixed inset-0 bg-black bg-opacity-95 z-50 flex items-center justify-center p-4"
            onClick={() => setSelectedImage(null)}
          >
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            >
              <X className="w-8 h-8 md:w-10 md:h-10" />
            </button>

            <div className="max-w-6xl w-full" onClick={(e) => e.stopPropagation()}>
              {/* Image */}
              <div className="mb-4">
                <img
                  src={selectedImage.url}
                  alt={selectedImage.title}
                  className="w-full h-auto max-h-[70vh] md:max-h-[80vh] object-contain mx-auto rounded-lg"
                />
              </div>

              {/* Image Info */}
              <div className="text-center text-white px-4">
                <h2 className="text-2xl md:text-3xl font-bold mb-2">{selectedImage.title}</h2>
                {selectedImage.description && (
                  <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto">
                    {selectedImage.description}
                  </p>
                )}
              </div>

              {/* Navigation Hint */}
              <div className="text-center mt-6">
                <p className="text-gray-400 text-sm">Click outside to close</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Gallery;
