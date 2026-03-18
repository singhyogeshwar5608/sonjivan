// Direct Cloudinary upload utilities with automatic WebP conversion and compression
// Son Jivan Grocery Store Cloudinary Configuration
const CLOUDINARY_CLOUD_NAME = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME || 'dtnuwjtt3';
const CLOUDINARY_UPLOAD_PRESET = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET || 'son_jivan_preset';

/**
 * Compress image before upload for better performance
 * @param {File} file - The image file to compress
 * @param {number} maxWidth - Maximum width (default: 1920)
 * @param {number} quality - Quality 0-1 (default: 0.8)
 * @returns {Promise<File>} - Compressed image file
 */
export const compressImage = async (file, maxWidth = 1920, quality = 0.8) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target.result;
      
      img.onload = () => {
        const canvas = document.createElement('canvas');
        let width = img.width;
        let height = img.height;
        
        // Resize if image is too large
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        canvas.width = width;
        canvas.height = height;
        
        const ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        
        // Convert to blob with compression
        canvas.toBlob(
          (blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, {
                type: 'image/jpeg',
                lastModified: Date.now(),
              });
              console.log(`Image compressed: ${(file.size / 1024).toFixed(2)}KB -> ${(blob.size / 1024).toFixed(2)}KB`);
              resolve(compressedFile);
            } else {
              reject(new Error('Failed to compress image'));
            }
          },
          'image/jpeg',
          quality
        );
      };
      
      img.onerror = () => reject(new Error('Failed to load image'));
    };
    
    reader.onerror = () => reject(new Error('Failed to read file'));
  });
};

/**
 * Get optimized Cloudinary URL with WebP format and transformations
 * @param {string} url - Original Cloudinary URL
 * @param {object} options - Transformation options
 * @returns {string} - Optimized URL with WebP format
 */
export const getOptimizedImageUrl = (url, options = {}) => {
  if (!url || !url.includes('cloudinary.com')) return url;
  
  const {
    width = 'auto',
    quality = 'auto',
    format = 'webp',
    crop = 'scale'
  } = options;
  
  // Insert transformations before /upload/
  const transformations = `w_${width},q_${quality},f_${format},c_${crop}`;
  return url.replace('/upload/', `/upload/${transformations}/`);
};

/**
 * Upload image directly to Cloudinary with progress tracking
 * @param {File} file - The image file to upload
 * @param {Function} onProgress - Progress callback function
 * @returns {Promise<string>} - The uploaded image URL
 */
export const uploadToCloudinaryWithProgress = async (file, onProgress, compress = true) => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Compress image before upload if enabled
  let fileToUpload = file;
  if (compress && file.type.startsWith('image/')) {
    try {
      console.log('Compressing image before upload...');
      fileToUpload = await compressImage(file);
    } catch (error) {
      console.warn('Image compression failed, uploading original:', error);
      fileToUpload = file;
    }
  }

  const formData = new FormData();
  formData.append('file', fileToUpload);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'son-jivan-grocery');
  formData.append('api_key', '637725233499797');
  // Note: Format/quality configured in Cloudinary preset (unsigned upload)

  try {
    console.log('Uploading with progress to:', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
    console.log('Using preset:', CLOUDINARY_UPLOAD_PRESET);
    console.log('Upload folder: son-jivan-grocery');
    console.log('Cloud name:', CLOUDINARY_CLOUD_NAME);
    
    const xhr = new XMLHttpRequest();
    
    return new Promise((resolve, reject) => {
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable && onProgress) {
          const progress = Math.round((event.loaded * 100) / event.total);
          onProgress(progress);
        }
      });

      xhr.addEventListener('load', () => {
        console.log('XHR Response status:', xhr.status);
        console.log('XHR Response text:', xhr.responseText);
        
        if (xhr.status === 200) {
          try {
            const response = JSON.parse(xhr.responseText);
            console.log('Upload successful:', response.secure_url);
            resolve(response.secure_url);
          } catch (parseError) {
            console.error('Failed to parse response:', parseError);
            reject(new Error('Invalid response from Cloudinary'));
          }
        } else {
          console.error('Upload failed with status:', xhr.status, xhr.responseText);
          reject(new Error(`Upload failed with status: ${xhr.status} - ${xhr.responseText}`));
        }
      });

      xhr.addEventListener('error', (event) => {
        console.error('Network error during upload:', event);
        reject(new Error('Network error during upload. Check your internet connection.'));
      });

      xhr.addEventListener('abort', () => {
        console.error('Upload aborted');
        reject(new Error('Upload was aborted'));
      });

      xhr.open('POST', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
      xhr.send(formData);
    });
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    throw new Error(`Failed to upload image to Cloudinary: ${error.message}`);
  }
};

/**
 * Upload image directly to Cloudinary (without progress tracking)
 * @param {File} file - The image file to upload
 * @returns {Promise<string>} - The uploaded image URL
 */
export const uploadToCloudinary = async (file, compress = true) => {
  if (!file) {
    throw new Error('No file provided');
  }

  // Compress image before upload if enabled
  let fileToUpload = file;
  if (compress && file.type.startsWith('image/')) {
    try {
      console.log('Compressing image before upload...');
      fileToUpload = await compressImage(file);
    } catch (error) {
      console.warn('Image compression failed, uploading original:', error);
      fileToUpload = file;
    }
  }

  const formData = new FormData();
  formData.append('file', fileToUpload);
  formData.append('upload_preset', CLOUDINARY_UPLOAD_PRESET);
  formData.append('folder', 'son-jivan-grocery');
  formData.append('api_key', '637725233499797');
  // Note: Format/quality configured in Cloudinary preset (unsigned upload)

  try {
    console.log('Uploading to:', `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`);
    console.log('Using preset:', CLOUDINARY_UPLOAD_PRESET);
    console.log('Upload folder: son-jivan-grocery');
    console.log('Cloud name:', CLOUDINARY_CLOUD_NAME);
    
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
        mode: 'cors',
      }
    );

    console.log('Response status:', response.status);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Upload error response:', errorText);
      let errorMessage = `Upload failed with status: ${response.status}`;
      try {
        const errorData = JSON.parse(errorText);
        errorMessage = errorData.error?.message || errorMessage;
      } catch (e) {
        errorMessage = errorText || errorMessage;
      }
      throw new Error(errorMessage);
    }

    const data = await response.json();
    console.log('Upload successful:', data.secure_url);
    return data.secure_url;
  } catch (error) {
    console.error('Cloudinary upload error:', error);
    if (error.message.includes('preset')) {
      throw new Error('Upload preset not found. Please create "son_jivan_preset" in Cloudinary dashboard with unsigned mode enabled.');
    }
    throw new Error(`Failed to upload image: ${error.message}`);
  }
};
