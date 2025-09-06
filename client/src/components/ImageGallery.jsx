import React from 'react';

const ImageGallery = ({ images, loading }) => {
  return (
    <div className="mt-8">
      <h3 className="text-2xl font-semibold mb-4 text-center">Your Gallery</h3>
      {loading ? (
        <p className="text-center text-gray-500">Loading gallery...</p>
      ) : images.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {images.map((image) => (
            <div key={image._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img src={image.imageUrl} alt={image.prompt} className="w-full h-auto object-cover" />
              <div className="p-4">
                <p className="text-sm text-gray-600">{image.prompt}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No images in your gallery yet. Generate one!</p>
      )}
    </div>
  );
};

export default ImageGallery;