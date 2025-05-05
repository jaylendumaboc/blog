import { useEffect } from 'react'
import { useLocation } from 'react-router-dom' 
import Header from './Header'
import Footer from './Footer'

const Layout = ({ children }) => {
  const location = useLocation()

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="flex flex-col min-h-screen">
      {/* Skip to content link for accessibility */}
      <a 
        href="#main-content" 
        className="absolute left-0 p-3 -translate-y-full focus:translate-y-0 bg-indigo-900 text-white z-50 transition-transform"
      >
        Skip to content
      </a>

      <Header />
      
      <main id="main-content" className="flex-grow pt-24">
        {children}
      </main>
      
      <Footer />
      
      {/* Back to Top Button */}
      <BackToTopButton />
    </div>
  )
}

// Back to Top Button component
const BackToTopButton = () => {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }

  return (
    <button
      onClick={scrollToTop}
      aria-label="Back to top"
      className="fixed bottom-8 right-8 bg-indigo-900 text-white rounded-full p-3 shadow-lg hover:bg-indigo-800 transition-colors duration-300 z-30 group opacity-90 hover:opacity-100"
    >
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6 transform transition-transform duration-300 group-hover:-translate-y-1" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke="currentColor"
        aria-hidden="true"
      >
        <path 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          strokeWidth={2} 
          d="M5 10l7-7m0 0l7 7m-7-7v18" 
        />
      </svg>
    </button>
  )
}

export default Layout