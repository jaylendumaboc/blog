import { useState } from 'react'

const Gallery = ({ images, title = 'Photo Gallery' }) => {
  const [selectedImage, setSelectedImage] = useState(null)

  // If no images, don't render the gallery
  if (!images || images.length === 0) {
    return null
  }

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(image)}
            className="group block overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <div className="relative aspect-square overflow-hidden">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                loading="lazy"
              />
            </div>
            {image.caption && (
              <div className="p-3 bg-gray-50 text-gray-700 text-sm">
                {image.caption}
              </div>
            )}
          </button>
        ))}
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center p-4 z-50"
          onClick={() => setSelectedImage(null)}
        >
          <div className="max-w-4xl w-full bg-white rounded-lg overflow-hidden shadow-2xl">
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="w-full h-auto max-h-[80vh] object-contain"
            />
            {selectedImage.caption && (
              <div className="p-4 bg-white text-gray-700">
                {selectedImage.caption}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery