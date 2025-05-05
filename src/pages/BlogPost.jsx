import { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import blogs from '../data/blogs'
import BlogDetails from '../components/blog/BlogDetails'

const BlogPost = () => {
  const { slug } = useParams()
  const navigate = useNavigate()
  const [blog, setBlog] = useState(null)
  const [loading, setLoading] = useState(true)
  
  useEffect(() => {
    // Find the blog post by slug
    const foundBlog = blogs.find(blog => blog.slug === slug)
    
    if (foundBlog) {
      setBlog(foundBlog)
      // Set the page title
      document.title = `${foundBlog.title} | ElegantBlog`
    } else {
      // If blog not found, redirect to blog listing
      navigate('/blog', { replace: true })
    }
    
    setLoading(false)
  }, [slug, navigate])
  
  if (loading) {
    return (
      <div className="blog-container py-16 text-center">
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-600 border-r-transparent"></div>
        <p className="mt-4 text-gray-600">Loading post...</p>
      </div>
    )
  }
  
  if (!blog) {
    return null
  }
  
  return (
    <div className="blog-container py-12">
      <BlogDetails blog={blog} />
    </div>
  )
}

export default BlogPost