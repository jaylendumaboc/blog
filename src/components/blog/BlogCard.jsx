import { Link } from 'react-router-dom'
import { formatDate, getRelativeTimeString } from '../../utils/dateFormatter'

const BlogCard = ({ blog }) => {
  const { slug, title, excerpt, coverImage, author, publishedDate, category, readTime, tags } = blog

  // Format date and time
  const formattedDate = formatDate(publishedDate)
  const relativeTime = getRelativeTimeString(publishedDate)
  const isRecent = relativeTime.includes('day') || relativeTime.includes('hour') || relativeTime.includes('minute') || relativeTime.includes('just now')

  return (
    <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 h-full flex flex-col relative group">
      <Link 
        to={`/blog/${slug}`} 
        className="block overflow-hidden"
        aria-hidden="true"
        tabIndex="-1"
      >
        <img 
          src={coverImage} 
          alt="" // Decorative image
          className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </Link>
      
      <div className="p-6 flex-grow flex flex-col">
        <div className="mb-3 flex items-center justify-between">
          <Link
            to={`/blog?category=${category}`}
            className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full hover:bg-indigo-200 transition-colors"
          >
            {category}
          </Link>
          
          {isRecent && (
            <span className="inline-block px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
              New
            </span>
          )}
        </div>
        
        <Link to={`/blog/${slug}`} className="group block mb-3">
          <h2 className="text-xl font-bold text-gray-900 group-hover:text-indigo-700 transition-colors">
            {title}
          </h2>
        </Link>
        
        <p className="text-gray-600 mb-4 flex-grow line-clamp-3">
          {excerpt}
        </p>
        
        <div className="mt-auto">
          {tags && tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-4">
              {tags.slice(0, 3).map(tag => (
                <Link 
                  key={tag} 
                  to={`/blog?tag=${tag}`}
                  className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full hover:bg-gray-200 transition-colors"
                >
                  #{tag}
                </Link>
              ))}
              {tags.length > 3 && (
                <span className="inline-block px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded-full">
                  +{tags.length - 3} more
                </span>
              )}
            </div>
          )}
          
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div className="flex items-center">
              <img 
                src={author.avatar} 
                alt={author.name} 
                className="w-8 h-8 rounded-full mr-3 object-cover"
              />
              <div className="text-sm">
                <span className="font-medium text-gray-800 block">{author.name}</span>
                <time 
                  dateTime={new Date(publishedDate).toISOString()} 
                  className="text-gray-500"
                  title={formattedDate}
                >
                  {relativeTime}
                </time>
              </div>
            </div>
            
            <div className="text-sm text-gray-500 flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {readTime} min read
            </div>
          </div>
        </div>
      </div>
      
      {/* Full card is clickable for better UX but hidden from screen readers to avoid duplicate links */}
      <Link
        to={`/blog/${slug}`}
        className="absolute inset-0 z-10"
        aria-label={`Read article: ${title}`}
        aria-hidden={false}
      >
        <span className="sr-only">Read article: {title}</span>
      </Link>
    </div>
  )
}

export default BlogCard