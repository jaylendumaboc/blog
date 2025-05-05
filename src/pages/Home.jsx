import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import blogs from '../data/blogs'
import Button from '../components/ui/Button'
import BlogCard from '../components/blog/BlogCard'

const Home = () => {
  const [featuredBlog, setFeaturedBlog] = useState(null)
  const [recentBlogs, setRecentBlogs] = useState([])
  const [popularCategories, setPopularCategories] = useState([])
  
  useEffect(() => {
    // Sort blogs by date (newest first)
    const sortedBlogs = [...blogs].sort((a, b) => 
      new Date(b.publishedDate) - new Date(a.publishedDate)
    )
    
    // Set the most recent blog as featured
    setFeaturedBlog(sortedBlogs[0])
    
    // Set the next 3 recent blogs
    setRecentBlogs(sortedBlogs.slice(1, 4))
    
    // Calculate popular categories
    const categories = blogs.map(blog => blog.category)
    const categoryCounts = {}
    
    categories.forEach(category => {
      categoryCounts[category] = (categoryCounts[category] || 0) + 1
    })
    
    // Get unique categories sorted by count (descending)
    const sortedCategories = Object.keys(categoryCounts)
      .map(category => ({ 
        name: category, 
        count: categoryCounts[category]
      }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 4) // Get top 4 categories
    
    setPopularCategories(sortedCategories)
  }, [])
  
  if (!featuredBlog) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-indigo-900"></div>
        </div>
      </div>
    )
  }
  
  return (
    <>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-900 to-indigo-800 text-white py-20 md:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Welcome to Jaylen's Blog
            </h1>
            <p className="text-xl text-indigo-200 mb-8">
              Explore insightful articles on technology, design, lifestyle, and more. 
              Join me on a journey of discovery and inspiration.
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Button 
                as="link" 
                to="/blog" 
                variant="secondary" 
                size="large"
                className="shadow-lg"
              >
                Explore All Posts
              </Button>
              <Button 
                as="link" 
                to="/contact" 
                variant="white" 
                size="large"
                className="shadow-lg"
              >
                Get in Touch
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Featured Post */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 inline-block relative">
              Featured Post
              <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform -translate-y-2"></span>
            </h2>
          </div>
          
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="h-64 md:h-auto">
                <img 
                  src={featuredBlog.coverImage} 
                  alt={featuredBlog.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-8 flex flex-col justify-center">
                <div className="mb-4">
                  <span className="inline-block px-3 py-1 text-xs font-medium bg-indigo-100 text-indigo-800 rounded-full">
                    {featuredBlog.category}
                  </span>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4 hover:text-indigo-700 transition-colors">
                  <Link to={`/blog/${featuredBlog.slug}`}>
                    {featuredBlog.title}
                  </Link>
                </h3>
                <p className="text-gray-600 mb-6">
                  {featuredBlog.excerpt}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <img 
                      src={featuredBlog.author.avatar} 
                      alt={featuredBlog.author.name} 
                      className="w-10 h-10 rounded-full mr-3 object-cover"
                    />
                    <span className="text-gray-700 font-medium">{featuredBlog.author.name}</span>
                  </div>
                  <Button 
                    as="link" 
                    to={`/blog/${featuredBlog.slug}`} 
                    variant="outline"
                  >
                    Read More
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Recent Posts */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 inline-block relative">
              Recent Posts
              <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform -translate-y-2"></span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {recentBlogs.map((blog, index) => (
              <div key={blog.slug} className="transform transition-transform duration-500 hover:-translate-y-1">
                <BlogCard blog={blog} />
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Button as="link" to="/blog">
              View All Posts
            </Button>
          </div>
        </div>
      </section>
      
      {/* Categories Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 inline-block relative">
              Explore Categories
              <span className="absolute bottom-0 left-0 w-full h-1 bg-amber-500 transform -translate-y-2"></span>
            </h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
              Discover content across various topics and find what interests you most
            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularCategories.map((category, index) => (
              <Link
                key={category.name}
                to={`/blog?category=${category.name}`}
                className="bg-white rounded-lg shadow p-6 text-center transition-all duration-300 hover:shadow-lg hover:-translate-y-1 transform"
              >
                <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  {getCategoryIcon(category.name)}
                </div>
                <h3 className="text-lg font-bold text-gray-900 mb-2 capitalize">
                  {category.name}
                </h3>
                <p className="text-gray-600 text-sm">
                  {category.count} {category.count === 1 ? 'post' : 'posts'}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      
      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-r from-indigo-900 to-indigo-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-indigo-200 mb-8">
              Subscribe to my newsletter to receive the latest updates, articles, and insights straight to your inbox.
            </p>
            <div className="max-w-md mx-auto">
              <form className="flex flex-col sm:flex-row gap-2">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="flex-grow px-4 py-3 rounded-lg sm:rounded-r-none sm:rounded-l-lg mb-2 sm:mb-0 focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
                <button 
                  type="submit" 
                  className="bg-amber-500 text-white px-6 py-3 rounded-lg sm:rounded-l-none sm:rounded-r-lg hover:bg-amber-600 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-amber-500 focus:ring-offset-2 focus:ring-offset-indigo-900"
                >
                  Subscribe
                </button>
              </form>
              <p className="mt-4 text-sm text-indigo-300">
                No spam, ever. I respect your privacy and you can unsubscribe at any time.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Get in Touch
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              Have questions, suggestions, or want to collaborate? I'd love to hear from you!
            </p>
            <Button as="link" to="/contact" variant="primary" size="large">
              Contact Me
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}

// Helper function to get category icon based on category name
const getCategoryIcon = (category) => {
  switch(category.toLowerCase()) {
    case 'technology':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      )
    case 'development':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    case 'design':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
        </svg>
      )
    case 'lifestyle':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    case 'health':
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      )
    default:
      return (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-indigo-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
        </svg>
      )
  }
}

export default Home