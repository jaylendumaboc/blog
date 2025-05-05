import { useState, useEffect } from 'react'

const BlogImageGallery = ({ content }) => {
  const [images, setImages] = useState([])

  useEffect(() => {
    if (!content) return

    // Regular expression to find all img tags
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g
    const foundImages = []
    let match

    // Find all image tags in the content
    while ((match = imgRegex.exec(content)) !== null) {
      const fullTag = match[0]
      const src = match[1]
      
      // Extract alt text if available
      const altMatch = fullTag.match(/alt="([^"]+)"/)
      const alt = altMatch ? altMatch[1] : ''
      
      // Skip first image as it's likely the cover image
      if (foundImages.length > 0 || !src.includes('unsplash.com')) {
        foundImages.push({
          src,
          alt,
          caption: alt
        })
      }
    }

    setImages(foundImages)
  }, [content])

  // If no images or only one image (likely the cover), don't render the gallery
  if (images.length <= 1) {
    return null
  }

  return (
    <div className="my-8">
      <h3 className="text-xl font-bold text-gray-900 mb-4">Photo Gallery</h3>
      <div className="image-gallery">
        {images.map((image, index) => (
          <a 
            key={index}
            href={image.src}
            target="_blank"
            rel="noopener noreferrer"
            className="block overflow-hidden rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
          >
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-48 object-cover transition-transform duration-500 hover:scale-105"
            />
            {image.caption && (
              <div className="p-2 bg-gray-50 text-gray-700 text-sm">
                {image.caption}
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  )
}

export default BlogImageGallery