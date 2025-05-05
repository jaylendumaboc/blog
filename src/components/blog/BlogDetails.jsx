import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { formatDate } from '../../utils/dateFormatter'
import Button from '../ui/Button'
import Gallery from '../ui/Gallery'
import TableOfContents from '../ui/TableOfContents'

const BlogDetails = ({ blog }) => {
  const { title, coverImage, author, publishedDate, updatedDate, readTime, category, content, tags } = blog
  const [processedContent, setProcessedContent] = useState('')
  const [galleryImages, setGalleryImages] = useState([])

  // Process content to extract gallery images
  useEffect(() => {
    if (!content) return

    // Parse the content for image tags
    const extractedImages = []
    let imgTags = []
    let contentWithoutGalleryImages = content

    // Match for img tags
    const imgRegex = /<img[^>]+src="([^"]+)"[^>]*>/g
    let imgMatch
    
    // Extract all image tags from content
    while ((imgMatch = imgRegex.exec(content)) !== null) {
      const fullImgTag = imgMatch[0]
      const imgSrc = imgMatch[1]
      const imgAlt = fullImgTag.match(/alt="([^"]+)"/) ? fullImgTag.match(/alt="([^"]+)"/)[1] : ''
      
      imgTags.push({
        fullTag: fullImgTag,
        src: imgSrc,
        alt: imgAlt
      })
    }

    // Process all images except the cover image
    if (imgTags.length > 0) {
      // Skip the first image if it's the cover image
      const startIndex = imgTags[0].src === coverImage ? 1 : 0
      const galleryImgTags = imgTags.slice(startIndex)
      
      // Create gallery images
      galleryImgTags.forEach(img => {
        extractedImages.push({
          src: img.src,
          alt: img.alt,
          caption: img.alt
        })
        
        // Remove the image tag from the content
        contentWithoutGalleryImages = contentWithoutGalleryImages.replace(img.fullTag, '')
      })
      
      // Set the gallery images
      setGalleryImages(extractedImages)
    }
    
    // Insert gallery placeholder if we have gallery images
    if (extractedImages.length > 0) {
      // Find a good spot to insert the gallery - after a paragraph
      const galleryPlaceholder = '<!--INSERT_GALLERY_HERE-->'
      let hasInsertedGallery = false
      
      // Try to insert gallery after the 2nd or 3rd paragraph
      const paragraphs = contentWithoutGalleryImages.split('</p>')
      if (paragraphs.length > 3) {
        const insertPoint = 2 // Insert after the 2nd paragraph
        paragraphs[insertPoint] += galleryPlaceholder
        contentWithoutGalleryImages = paragraphs.join('</p>')
        hasInsertedGallery = true
      }
      
      // If we couldn't insert after a paragraph, just append to the end
      if (!hasInsertedGallery) {
        contentWithoutGalleryImages += galleryPlaceholder
      }
    }
    
    // Enhance accessibility by adding heading IDs and roles
    let enhancedContent = contentWithoutGalleryImages
      // Add role="img" and better alt text to images
      .replace(/<img([^>]*)alt="([^"]*)"([^>]*)>/g, '<img$1alt="$2"$3 role="img">')
      // Ensure all images have alt text
      .replace(/<img([^>]*)(?!alt=)([^>]*)>/g, '<img$1 alt="Blog image"$2 role="img">')
      // Add role="presentation" to decorative elements
      .replace(/<hr([^>]*)>/g, '<hr$1 role="presentation">')
    
    setProcessedContent(enhancedContent)
  }, [content, coverImage])

  // Function to render content with gallery
  const renderContent = () => {
    if (!processedContent) return null
    
    // Split the content at the gallery placeholder
    const parts = processedContent.split('<!--INSERT_GALLERY_HERE-->')
    
    if (parts.length === 1 || galleryImages.length === 0) {
      // No gallery to insert, just render the content
      return (
        <>
          <TableOfContents content={processedContent} />
          <div className="article-content">
            <div dangerouslySetInnerHTML={{ __html: processedContent }} />
          </div>
        </>
      )
    }
    
    // Render content with gallery inserted at the placeholder point
    return (
      <>
        <TableOfContents content={processedContent} />
        <div className="article-content">
          <div dangerouslySetInnerHTML={{ __html: parts[0] }} />
          {galleryImages.length > 0 && (
            <div className="my-12">
              <Gallery images={galleryImages} title="Image Gallery" />
            </div>
          )}
          <div dangerouslySetInnerHTML={{ __html: parts[1] }} />
        </div>
      </>
    )
  }
  
  // Estimate reading time based on word count
  const getReadTimeLabel = (minutes) => {
    if (minutes < 1) return 'Quick read'
    if (minutes === 1) return '1 minute read'
    return `${minutes} minute read`
  }
  
  return (
    <article className="max-w-3xl mx-auto mb-16">
      {/* Header */}
      <header className="mb-8">
        <div className="mb-3">
          <Link
            to={`/blog?category=${category}`}
            className="inline-block px-3 py-1 text-sm font-medium bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition-colors"
          >
            {category}
          </Link>
        </div>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{title}</h1>
        <div className="flex flex-wrap items-center text-gray-600 mb-6">
          <div className="flex items-center mr-6 mb-2">
            <img 
              src={author.avatar} 
              alt={author.name} 
              className="w-10 h-10 rounded-full mr-3"
            />
            <span className="font-medium text-gray-100">{author.name}</span>
          </div>
          <div className="flex items-center flex-wrap">
            <time dateTime={new Date(publishedDate).toISOString()} className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {formatDate(publishedDate)}
            </time>
            
            <span className="mx-2">•</span>
            
            <span className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {getReadTimeLabel(readTime)}
            </span>
            
            {updatedDate && (
              <>
                <span className="mx-2">•</span>
                <span className="flex items-center text-gray-500 text-sm">
                  Updated: {formatDate(updatedDate)}
                </span>
              </>
            )}
          </div>
        </div>
      </header>
      
      {/* Cover Image */}
      <div className="mb-8 rounded-lg overflow-hidden shadow-lg" aria-hidden="false">
        <img 
          src={coverImage} 
          alt={`Cover image for article: ${title}`} 
          className="w-full h-auto max-h-[500px] object-cover"
        />
      </div>
      
      {/* Content */}
      <div className="prose prose-lg max-w-none">
        {typeof content === 'string' ? (
          renderContent()
        ) : (
          content
        )}
      </div>
      
      {/* Tags */}
      {tags && tags.length > 0 && (
        <div className="mt-10 pt-6 border-t border-gray-200">
          <h2 className="text-lg font-semibold mb-3">Related Topics</h2>
          <div className="flex flex-wrap gap-2">
            {tags.map(tag => (
              <Link 
                key={tag} 
                to={`/blog?tag=${tag}`}
                className="inline-block px-3 py-1 text-sm bg-gray-100 text-gray-700 rounded-full hover:bg-blue-100 hover:text-blue-700 transition-colors"
              >
                #{tag}
              </Link>
            ))}
          </div>
        </div>
      )}
      
      {/* Author Bio */}
      <div className="mt-10 p-6 bg-blue-50 rounded-lg shadow-sm">
        <div className="flex flex-col md:flex-row gap-6">
          <img 
            src={author.avatar} 
            alt={author.name} 
            className="w-20 h-20 rounded-full object-cover border-4 border-white shadow-md"
          />
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-2">About the Author</h2>
            <h3 className="text-lg font-semibold text-gray-800 mb-2">{author.name}</h3>
            <p className="text-gray-700 mb-3">{author.bio}</p>
            {author.social && Object.entries(author.social).length > 0 && (
              <div className="flex space-x-4">
                {Object.entries(author.social).map(([platform, url]) => (
                  <a 
                    key={platform}
                    href={url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 hover:text-blue-800 flex items-center"
                    aria-label={`${author.name}'s ${platform}`}
                  >
                    <span className="capitalize">{platform}</span>
                  </a>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Related Posts Placeholder - We would populate this with actual related posts */}
      <div className="mt-10 pt-6 border-t border-gray-200">
        <h2 className="text-2xl font-bold mb-6">You might also like</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Placeholder for related posts */}
          <p className="text-gray-500 italic">Related posts would appear here based on tags and categories</p>
        </div>
      </div>
      
      {/* Navigation */}
      <div className="mt-10 pt-6 border-t border-gray-200 flex justify-between">
        <Button 
          as="link" 
          to="/blog" 
          variant="outline"
          aria-label="Back to all blog posts"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Blog
        </Button>
        <Button 
          as="link" 
          to="/" 
          variant="primary"
          aria-label="Go to homepage"
        >
          Home
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
          </svg>
        </Button>
      </div>
    </article>
  )
}

export default BlogDetails