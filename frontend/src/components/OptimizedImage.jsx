import { useState } from 'react';
import { getOptimizedImageUrl } from '../utils/cloudinary';

/**
 * Optimized Image Component with automatic WebP conversion
 * Automatically converts Cloudinary images to WebP format for better performance
 */
const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width = 'auto',
  quality = 'auto',
  loading = 'lazy',
  ...props 
}) => {
  const [imgError, setImgError] = useState(false);
  
  // Get optimized URL with WebP format
  const optimizedSrc = src && src.includes('cloudinary.com') 
    ? getOptimizedImageUrl(src, { width, quality, format: 'webp' })
    : src;
  
  // Fallback to original if WebP fails
  const handleError = () => {
    if (!imgError) {
      setImgError(true);
    }
  };
  
  return (
    <img
      src={imgError ? src : optimizedSrc}
      alt={alt}
      className={className}
      loading={loading}
      decoding="async"
      onError={handleError}
      {...props}
    />
  );
};

export default OptimizedImage;
