import { useState, useEffect } from 'react'

const ReadingProgressBar = () => {
  const [readingProgress, setReadingProgress] = useState(0)

  useEffect(() => {
    const scrollListener = () => {
      // Calculate how far down the page the user has scrolled
      const windowHeight = window.innerHeight
      const documentHeight = document.documentElement.scrollHeight - windowHeight
      const scrollTop = window.scrollY
      
      // Calculate percentage of scroll
      const scrollPercentage = (scrollTop / documentHeight) * 100
      
      // Update state
      setReadingProgress(scrollPercentage)
    }
    
    // Add scroll event listener
    window.addEventListener('scroll', scrollListener)
    
    // Clean up event listener on component unmount
    return () => window.removeEventListener('scroll', scrollListener)
  }, [])

  return (
    <div 
      className="fixed top-0 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 z-50" 
      aria-hidden="true"
    >
      <div 
        className="h-full bg-indigo-600 dark:bg-indigo-500 transition-all duration-300 ease-out" 
        style={{ width: `${readingProgress}%` }}
      />
    </div>
  )
}

export default ReadingProgressBar