import { useState, useEffect } from 'react';
import { Upload, Image as ImageIcon, Trash2, Link as LinkIcon, X, Eye } from 'lucide-react';
import { uploadToCloudinaryWithProgress } from '../../utils/cloudinary';
import { collection, getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const GalleryManagement = () => {
  const [images, setImages] = useState([]);
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'url'
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadProgressList, setUploadProgressList] = useState([]);
  const [previewUrl, setPreviewUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      console.log('Fetching gallery images from Firebase...');
      const galleryRef = collection(db, 'gallery');
      const querySnapshot = await getDocs(galleryRef);
      const galleryImages = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log('Gallery images loaded:', galleryImages);
      setImages(galleryImages);
    } catch (error) {
      console.error('Error fetching gallery images:', error);
      // Fallback to localStorage if Firebase fails
      const adminImages = localStorage.getItem('admin_gallery_images');
      if (adminImages) {
        setImages(JSON.parse(adminImages));
      } else {
        setImages([]);
      }
    }
  };

  const handleFileSelect = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    // Validate all files
    const validFiles = [];
    const errors = [];

    files.forEach(file => {
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        errors.push(`${file.name}: File size must be less than 5MB`);
        return;
      }

      // Validate file type
      if (!file.type.startsWith('image/')) {
        errors.push(`${file.name}: Not an image file`);
        return;
      }

      validFiles.push(file);
    });

    if (errors.length > 0) {
      alert('Some files were rejected:\n' + errors.join('\n'));
    }

    if (validFiles.length === 0) return;

    // Set selected files and create previews
    setSelectedFiles(validFiles);
    setUploadProgressList(validFiles.map(() => 0));

    // Create preview for first file
    if (validFiles.length > 0) {
      setSelectedFile(validFiles[0]);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
      };
      reader.readAsDataURL(validFiles[0]);
    }
  };

  const handleFileUpload = async () => {
    const filesToUpload = selectedFiles.length > 0 ? selectedFiles : (selectedFile ? [selectedFile] : []);
    
    if (filesToUpload.length === 0) {
      alert('Please select at least one file first');
      return;
    }

    setUploading(true);
    const progressList = filesToUpload.map(() => 0);
    setUploadProgressList(progressList);

    try {
      console.log(`Starting upload of ${filesToUpload.length} image(s)...`);
      
      const uploadedImages = [];
      
      // Upload each file sequentially
      for (let i = 0; i < filesToUpload.length; i++) {
        const file = filesToUpload[i];
        console.log(`Uploading file ${i + 1}/${filesToUpload.length}:`, file.name);
        
        try {
          // Upload to Cloudinary with progress tracking
          const cloudinaryUrl = await uploadToCloudinaryWithProgress(file, (progress) => {
            const newProgressList = [...uploadProgressList];
            newProgressList[i] = progress;
            setUploadProgressList(newProgressList);
            
            // Update overall progress
            const totalProgress = Math.round(
              newProgressList.reduce((sum, p) => sum + p, 0) / filesToUpload.length
            );
            setUploadProgress(totalProgress);
          });
          
          console.log(`File ${i + 1} uploaded:`, cloudinaryUrl);
          
          // Save to Firebase gallery collection
          const galleryData = {
            url: cloudinaryUrl,
            title: imageTitle || file.name.replace(/\.[^/.]+$/, ''),
            description: imageDescription,
            type: 'upload',
            status: 'public',
            createdAt: new Date().toISOString()
          };

          const galleryRef = collection(db, 'gallery');
          const docRef = await addDoc(galleryRef, galleryData);
          
          uploadedImages.push({
            id: docRef.id,
            ...galleryData
          });
        } catch (fileError) {
          console.error(`Failed to upload ${file.name}:`, fileError);
          alert(`Failed to upload ${file.name}: ${fileError.message}`);
        }
      }
      
      if (uploadedImages.length > 0) {
        // Add to local state
        const updatedImages = [...uploadedImages, ...images];
        setImages(updatedImages);
        
        // Also save to localStorage as backup
        localStorage.setItem('admin_gallery_images', JSON.stringify(updatedImages));
        
        console.log(`✅ ${uploadedImages.length} image(s) uploaded successfully!`);
        alert(`${uploadedImages.length} image(s) uploaded successfully!`);
        
        resetForm();
      }
    } catch (error) {
      console.error('❌ Error uploading images:', error);
      alert(`Upload failed: ${error.message || 'Please check console for details'}`);
    } finally {
      setUploading(false);
      setUploadProgress(0);
      setUploadProgressList([]);
    }
  };


  const handleUrlSubmit = async () => {
    if (!imageUrl) {
      console.error('Please enter an image URL');
      return;
    }

    try {
      const galleryData = {
        url: imageUrl,
        title: imageTitle || 'Untitled',
        description: imageDescription,
        type: 'url',
        status: 'public' // Make images public by default
      };

      // Save to Firebase
      const galleryRef = collection(db, 'gallery');
      const docRef = await addDoc(galleryRef, galleryData);
      const newImageId = docRef.id;
      
      // Add to local state
      const newImage = {
        id: newImageId,
        ...galleryData
      };
      const updatedImages = [newImage, ...images];
      setImages(updatedImages);
      
      // Also save to localStorage as backup
      localStorage.setItem('admin_gallery_images', JSON.stringify(updatedImages));
      
      resetForm();
      console.log('Image URL added successfully!');
    } catch (error) {
      console.error('Error adding image:', error);
      console.error('Failed to add image');
    }
  };

  const handlePublishToPublic = async (id) => {
    if (window.confirm('Are you sure you want to publish this image to the public gallery?')) {
      const imageToPublish = images.find(img => img.id === id);
      if (imageToPublish) {
        // Get current public gallery images
        const publicImages = JSON.parse(localStorage.getItem('gallery_images') || '[]');
        
        // Add this image to public gallery
        const publicImage = {
          ...imageToPublish,
          status: 'public',
          publishedAt: new Date().toISOString()
        };
        
        const updatedPublicImages = [publicImage, ...publicImages];
        localStorage.setItem('gallery_images', JSON.stringify(updatedPublicImages));
        
        // Update the image status in admin gallery
        const updatedAdminImages = images.map(img => 
          img.id === id ? { ...img, status: 'public', publishedAt: new Date().toISOString() } : img
        );
        setImages(updatedAdminImages);
        localStorage.setItem('admin_gallery_images', JSON.stringify(updatedAdminImages));
        
        console.log('Image published to public gallery successfully!');
      }
    }
  };

  const handleUnpublishFromPublic = async (id) => {
    if (window.confirm('Are you sure you want to remove this image from the public gallery?')) {
      // Remove from public gallery
      const publicImages = JSON.parse(localStorage.getItem('gallery_images') || '[]');
      const updatedPublicImages = publicImages.filter(img => img.id !== id);
      localStorage.setItem('gallery_images', JSON.stringify(updatedPublicImages));
      
      // Update status in admin gallery
      const updatedAdminImages = images.map(img => 
        img.id === id ? { ...img, status: 'private' } : img
      );
      setImages(updatedAdminImages);
      localStorage.setItem('admin_gallery_images', JSON.stringify(updatedAdminImages));
      
      console.log('Image removed from public gallery successfully!');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this image?')) {
      try {
        // Delete from Firebase
        await deleteDoc(doc(db, 'gallery', id));
        
        // Delete from local state
        const updatedImages = images.filter(img => img.id !== id);
        setImages(updatedImages);
        
        // Update localStorage backup
        localStorage.setItem('admin_gallery_images', JSON.stringify(updatedImages));
        
        console.log('Image deleted successfully from Firebase and local state');
      } catch (error) {
        console.error('Error deleting image:', error);
        console.error('Failed to delete image:', error.message);
      }
    }
  };

  const resetForm = () => {
    setImageUrl('');
    setImageTitle('');
    setImageDescription('');
    setShowUploadModal(false);
    setUploadMethod('file');
    setSelectedFile(null);
    setSelectedFiles([]);
    setPreviewUrl('');
    setUploadProgress(0);
    setUploadProgressList([]);
  };

  return (
    <div className="py-4 sm:py-6 lg:py-8">
      <div className="px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6 sm:mb-8">
          <div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">Gallery Management</h1>
            <p className="mt-2 text-sm sm:text-base text-gray-600">Manage your image gallery</p>
          </div>
          <button
            onClick={() => setShowUploadModal(true)}
            className="bg-primary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            <Upload className="w-4 h-4 sm:w-5 sm:h-5" />
            Add Image
          </button>
        </div>

        {/* Upload Modal */}
        {showUploadModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
              <div className="p-4 sm:p-6">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Add Image to Gallery</h2>
                  <button onClick={resetForm} className="text-gray-500 hover:text-gray-700 p-1">
                    <X className="w-5 h-5 sm:w-6 sm:h-6" />
                  </button>
                </div>

                {/* Upload Method Tabs */}
                <div className="flex gap-2 sm:gap-4 mb-6 border-b overflow-x-auto">
                  <button
                    onClick={() => setUploadMethod('file')}
                    className={`pb-3 px-3 sm:px-4 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
                      uploadMethod === 'file'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <Upload className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                    Upload File
                  </button>
                  <button
                    onClick={() => setUploadMethod('url')}
                    className={`pb-3 px-3 sm:px-4 font-semibold transition-colors whitespace-nowrap text-sm sm:text-base ${
                      uploadMethod === 'url'
                        ? 'border-b-2 border-primary text-primary'
                        : 'text-gray-500 hover:text-gray-700'
                    }`}
                  >
                    <LinkIcon className="w-4 h-4 sm:w-5 sm:h-5 inline mr-2" />
                    Image URL
                  </button>
                </div>

                {/* Common Fields */}
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium mb-2">Image Title</label>
                    <input
                      type="text"
                      value={imageTitle}
                      onChange={(e) => setImageTitle(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                      placeholder="Enter image title"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Description (Optional)</label>
                    <textarea
                      value={imageDescription}
                      onChange={(e) => setImageDescription(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                      rows="2"
                      placeholder="Enter image description"
                    />
                  </div>
                </div>

                {/* Upload Method Content */}
                {uploadMethod === 'file' ? (
                  <div className="space-y-4">
                    {!selectedFile ? (
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 sm:p-8 text-center bg-gray-50">
                        <input
                          type="file"
                          id="file-upload-gallery"
                          className="hidden"
                          accept="image/*"
                          multiple
                          onChange={handleFileSelect}
                        />
                        <Upload className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400 mb-4 mx-auto" />
                        <h3 className="text-lg sm:text-xl font-semibold mb-2">Upload Images</h3>
                        <p className="text-sm sm:text-base text-gray-600 mb-4">
                          Select multiple images to upload at once
                        </p>
                        <button
                          type="button"
                          className="bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-base shadow-md hover:shadow-lg"
                          onClick={() => document.getElementById('file-upload-gallery').click()}
                        >
                          Choose File
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {/* Preview */}
                        <div className="border-2 border-gray-300 rounded-lg p-4 bg-gray-50">
                          <p className="text-sm font-medium mb-2">Selected Images: {selectedFiles.length > 0 ? selectedFiles.length : 1}</p>
                          {selectedFiles.length > 0 ? (
                            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 mb-3">
                              {selectedFiles.slice(0, 6).map((file, idx) => (
                                <div key={idx} className="relative">
                                  <img
                                    src={URL.createObjectURL(file)}
                                    alt={`Preview ${idx + 1}`}
                                    className="w-full h-24 object-cover rounded"
                                  />
                                  <p className="text-xs text-gray-600 truncate mt-1">{file.name}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <>
                              <img
                                src={previewUrl}
                                alt="Preview"
                                className="max-h-48 mx-auto rounded mb-3"
                              />
                              <p className="text-sm text-gray-600">{selectedFile.name}</p>
                              <p className="text-xs text-gray-500">{(selectedFile.size / 1024).toFixed(2)} KB</p>
                            </>
                          )}
                          {selectedFiles.length > 6 && (
                            <p className="text-xs text-gray-500 text-center mt-2">+{selectedFiles.length - 6} more files</p>
                          )}
                        </div>

                        {/* Upload Progress */}
                        {uploading && (
                          <div className="space-y-2">
                            <p className="text-sm font-medium text-center">
                              Uploading {selectedFiles.length > 0 ? selectedFiles.length : 1} image(s)... {uploadProgress}%
                            </p>
                            <div className="w-full bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-primary h-2 rounded-full transition-all duration-300" 
                                style={{ width: `${uploadProgress}%` }}
                              ></div>
                            </div>
                            {selectedFiles.length > 1 && uploadProgressList.length > 0 && (
                              <div className="text-xs text-gray-600 space-y-1 max-h-32 overflow-y-auto">
                                {selectedFiles.map((file, idx) => (
                                  <div key={idx} className="flex justify-between items-center">
                                    <span className="truncate flex-1">{file.name}</span>
                                    <span className="ml-2 font-medium">{uploadProgressList[idx] || 0}%</span>
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        )}

                        {/* Action Buttons */}
                        <div className="flex gap-3">
                          <button
                            type="button"
                            className="flex-1 bg-primary text-white px-6 py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-base shadow-md hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={handleFileUpload}
                            disabled={uploading}
                          >
                            {uploading ? 'Uploading...' : 'Submit & Upload'}
                          </button>
                          <button
                            type="button"
                            className="px-6 py-3 border-2 border-gray-300 rounded-md font-semibold hover:bg-gray-100 transition-colors text-base disabled:opacity-50 disabled:cursor-not-allowed"
                            onClick={() => {
                              setSelectedFile(null);
                              setSelectedFiles([]);
                              setPreviewUrl('');
                            }}
                            disabled={uploading}
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium mb-2">Image URL *</label>
                      <input
                        type="url"
                        value={imageUrl}
                        onChange={(e) => setImageUrl(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent text-sm sm:text-base"
                        placeholder="https://example.com/image.jpg"
                      />
                      <p className="text-xs sm:text-sm text-gray-500 mt-1">
                        Enter a direct link to an image (from Unsplash, your server, etc.)
                      </p>
                    </div>

                    {imageUrl && (
                      <div className="border rounded-lg p-4">
                        <p className="text-sm font-medium mb-2">Preview:</p>
                        <img
                          src={imageUrl}
                          alt="Preview"
                          className="max-h-32 sm:max-h-48 mx-auto rounded"
                          onError={(e) => {
                            e.target.src = 'https://via.placeholder.com/400x300?text=Invalid+URL';
                          }}
                        />
                      </div>
                    )}

                    <button
                      onClick={handleUrlSubmit}
                      className="bg-primary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors w-full text-sm sm:text-base"
                      disabled={!imageUrl}
                    >
                      Add to Gallery
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Gallery Grid */}
        {images.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6">
            {images.map((image) => (
              <div key={image.id} className="bg-white rounded-lg shadow-sm border p-3 sm:p-4 group hover:shadow-lg transition-shadow">
                <div className="aspect-square bg-gray-100 rounded-lg mb-3 overflow-hidden relative">
                  <img
                    src={image.url}
                    alt={image.title}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center">
                    <button
                      onClick={() => setPreviewImage(image)}
                      className="opacity-0 group-hover:opacity-100 bg-white text-gray-800 px-3 py-2 rounded-lg transition-opacity text-sm"
                    >
                      <Eye className="w-4 h-4 inline mr-2" />
                      Preview
                    </button>
                  </div>
                </div>
                
                <h3 className="font-semibold truncate mb-1 text-sm sm:text-base">{image.title}</h3>
                {image.description && (
                  <p className="text-xs sm:text-sm text-gray-600 line-clamp-2 mb-2">{image.description}</p>
                )}
                
                <div className="flex items-center justify-between text-xs text-gray-500 mb-3">
                  <span>{new Date(image.uploadedAt).toLocaleDateString()}</span>
                  <div className="flex gap-2">
                    <span className="px-2 py-1 bg-gray-100 rounded text-xs">
                      {image.type === 'upload' ? '📤 Uploaded' : '🔗 URL'}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      image.status === 'public' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {image.status === 'public' ? '🌐 Public' : '🔒 Private'}
                    </span>
                  </div>
                </div>

                <div className="space-y-2">
                  {image.status === 'private' ? (
                    <button
                      onClick={() => handlePublishToPublic(image.id)}
                      className="w-full bg-green-500 text-white px-3 py-2 rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      🌐 Publish to Public
                    </button>
                  ) : (
                    <button
                      onClick={() => handleUnpublishFromPublic(image.id)}
                      className="w-full bg-yellow-500 text-white px-3 py-2 rounded-lg hover:bg-yellow-600 transition-colors flex items-center justify-center gap-2 text-sm"
                    >
                      🔒 Make Private
                    </button>
                  )}
                  
                  <button
                    onClick={() => handleDelete(image.id)}
                    className="w-full bg-red-500 text-white px-3 py-2 rounded-lg hover:bg-red-600 transition-colors flex items-center justify-center gap-2 text-sm"
                  >
                    <Trash2 className="w-4 h-4" />
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <ImageIcon className="w-16 h-16 sm:w-20 sm:h-20 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl sm:text-2xl font-semibold text-gray-600 mb-2">No images in gallery</h3>
            <p className="text-sm sm:text-base text-gray-500 mb-6">Start building your gallery by adding images</p>
            <button 
              onClick={() => setShowUploadModal(true)} 
              className="bg-primary text-white px-4 py-2 sm:px-6 sm:py-3 rounded-md font-semibold hover:bg-blue-700 transition-colors text-sm sm:text-base"
            >
              Add First Image
            </button>
          </div>
        )}

        {/* Preview Modal */}
        {previewImage && (
          <div 
            className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4"
            onClick={() => setPreviewImage(null)}
          >
            <div className="max-w-4xl w-full">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-white text-lg sm:text-2xl font-bold truncate mr-4">{previewImage.title}</h3>
                <button
                  onClick={() => setPreviewImage(null)}
                  className="text-white hover:text-gray-300 flex-shrink-0"
                >
                  <X className="w-6 h-6 sm:w-8 sm:h-8" />
                </button>
              </div>
              <img
                src={previewImage.url}
                alt={previewImage.title}
                className="w-full h-auto max-h-[70vh] sm:max-h-[80vh] object-contain rounded-lg"
              />
              {previewImage.description && (
                <p className="text-white mt-4 text-center text-sm sm:text-base">{previewImage.description}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GalleryManagement;
