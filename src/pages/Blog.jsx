import { useState, useEffect } from 'react'
import { useSearchParams } from 'react-router-dom'
import blogs from '../data/blogs'
import BlogList from '../components/blog/BlogList'
import Button from '../components/ui/Button'

const Blog = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  const initialCategory = searchParams.get('category') || 'all'
  const initialTag = searchParams.get('tag')
  
  const [filteredBlogs, setFilteredBlogs] = useState(blogs)
  const [searchTerm, setSearchTerm] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [isSearching, setIsSearching] = useState(false)
  const [sortOption, setSortOption] = useState('newest')
  
  // Get all unique tags from blogs for tag cloud
  const allTags = [...new Set(blogs.flatMap(blog => blog.tags || []))]
  
  // Filter blogs based on URL parameters (tag & category)
  useEffect(() => {
    let results = [...blogs]
    
    // Apply tag filter
    if (initialTag) {
      results = results.filter(blog => 
        blog.tags && blog.tags.includes(initialTag)
      )
    }
    
    // Apply category filter if not 'all'
    if (initialCategory && initialCategory !== 'all') {
      results = results.filter(blog => blog.category === initialCategory)
    }
    
    // Apply sort
    results = sortBlogs(results, sortOption)
    
    setFilteredBlogs(results)
  }, [initialTag, initialCategory, sortOption])
  
  // Sort blogs based on selected option
  const sortBlogs = (blogsToSort, option) => {
    const sorted = [...blogsToSort]
    
    switch(option) {
      case 'newest':
        return sorted.sort((a, b) => new Date(b.publishedDate) - new Date(a.publishedDate))
      case 'oldest':
        return sorted.sort((a, b) => new Date(a.publishedDate) - new Date(b.publishedDate))
      case 'a-z':
        return sorted.sort((a, b) => a.title.localeCompare(b.title))
      case 'z-a':
        return sorted.sort((a, b) => b.title.localeCompare(a.title))
      default:
        return sorted
    }
  }
  
  // Handle search
  const handleSearch = (e) => {
    e.preventDefault()
    setIsSearching(true)
    
    if (!searchTerm.trim()) {
      setSearchResults([])
      setIsSearching(false)
      return
    }
    
    const searchTermLower = searchTerm.toLowerCase()
    
    const results = blogs.filter(blog => {
      const searchContent = `${blog.title} ${blog.excerpt} ${blog.category} ${blog.tags?.join(' ') || ''}`.toLowerCase()
      return searchContent.includes(searchTermLower)
    })
    
    setSearchResults(sortBlogs(results, sortOption))
  }
  
  // Reset search
  const resetSearch = () => {
    setSearchTerm('')
    setSearchResults([])
    setIsSearching(false)
  }
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortOption(e.target.value)
  }
  
  // Function to clear filters
  const clearFilters = () => {
    setSearchParams({})
  }
  
  // Function to set category filter
  const setCategory = (category) => {
    const params = new URLSearchParams(searchParams)
    if (category === 'all') {
      params.delete('category')
    } else {
      params.set('category', category)
    }
    setSearchParams(params)
  }
  
  // The blogs to display (either search results or filtered blogs)
  const displayedBlogs = isSearching ? searchResults : filteredBlogs
  
  return (
    <div className="blog-container py-12">
      {/* Header */}
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4 mx-auto">Jaylen's Blog</h1>
        
        {initialTag ? (
          <div className="mb-4 text-center">
            <span className="text-lg text-gray-600">
              Showing posts tagged with: <span className="font-medium text-blue-600">#{initialTag}</span>
            </span>
          </div>
        ) : initialCategory && initialCategory !== 'all' ? (
          <div className="mb-4 text-center">
            <span className="text-lg text-gray-600">
              Browsing category: <span className="font-medium text-blue-600 capitalize">{initialCategory}</span>
            </span>
          </div>
        ) : (
          <p className="text-xl text-gray-600 max-w-2xl mx-auto text-center">
            Explore my collection of articles covering various topics from technology and design to health and lifestyle.
          </p>
        )}
      </header>
      
      {/* Search and Filters Panel */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
          {/* Search */}
          <div className="md:flex-1">
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <input
                  type="text"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  placeholder="Search posts..."
                  className="w-full px-4 py-2 pl-10 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  aria-label="Search blog posts"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>
              <Button
                type="submit"
                variant="primary"
                className="whitespace-nowrap"
              >
                Search
              </Button>
            </form>
          </div>
          
          {/* Sort Option */}
          <div className="flex items-center">
            <label htmlFor="sort-select" className="mr-2 text-gray-700 whitespace-nowrap">
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortOption}
              onChange={handleSortChange}
              className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            >
              <option value="newest">Newest</option>
              <option value="oldest">Oldest</option>
              <option value="a-z">A-Z</option>
              <option value="z-a">Z-A</option>
            </select>
          </div>
        </div>
        
        {/* Active Filters */}
        <div className="flex flex-wrap items-center gap-2">
          {(initialCategory !== 'all' && initialCategory) || initialTag ? (
            <>
              <span className="text-sm text-gray-600">Active filters:</span>
              
              {initialCategory && initialCategory !== 'all' && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Category: {initialCategory}
                  <button 
                    onClick={() => setCategory('all')} 
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    aria-label={`Remove category filter: ${initialCategory}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              {initialTag && (
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                  Tag: {initialTag}
                  <button 
                    onClick={clearFilters} 
                    className="ml-1 text-blue-600 hover:text-blue-800"
                    aria-label={`Remove tag filter: ${initialTag}`}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </span>
              )}
              
              <Button 
                onClick={clearFilters} 
                variant="outline"
                size="small"
                className="ml-auto"
              >
                Clear All Filters
              </Button>
            </>
          ) : isSearching ? (
            <>
              <span className="text-sm text-gray-600">
                {searchResults.length} {searchResults.length === 1 ? 'result' : 'results'} for "{searchTerm}"
              </span>
              <Button 
                onClick={resetSearch} 
                variant="outline"
                size="small"
                className="ml-auto"
              >
                Clear Search
              </Button>
            </>
          ) : null}
        </div>
      </div>
      
      {/* Tag Cloud */}
      {!initialTag && (
        <div className="mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">Popular Tags</h2>
          <div className="flex flex-wrap gap-2">
            {allTags.map(tag => (
              <a 
                key={tag}
                href={`/blog?tag=${tag}`}
                className={`inline-block px-3 py-1 rounded-full text-sm font-medium 
                  ${initialTag === tag 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-blue-100 hover:text-blue-700 transition-colors'
                  }`}
              >
                #{tag}
              </a>
            ))}
          </div>
        </div>
      )}
      
      {/* Blog List */}
      <BlogList 
        blogs={displayedBlogs} 
        initialCategory={initialCategory} 
      />
      
      {/* Empty State */}
      {displayedBlogs.length === 0 && (
        <div className="text-center py-12 bg-gray-50 rounded-lg">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-16 w-16 text-gray-400 mx-auto mb-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={1.5} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
          <h3 className="text-xl font-medium text-gray-700 mb-2">No posts found</h3>
          <p className="text-gray-500 mb-6">
            {isSearching 
              ? `No posts match your search for "${searchTerm}".` 
              : initialTag 
                ? `No posts were found with the tag "#${initialTag}".`
                : `No posts were found in the "${initialCategory}" category.`
            }
          </p>
          <Button onClick={isSearching ? resetSearch : clearFilters}>
            {isSearching ? 'Clear Search' : 'View All Posts'}
          </Button>
        </div>
      )}
    </div>
  )
}

export default Blog