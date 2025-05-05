import { useState, useEffect } from 'react'

const TableOfContents = ({ content }) => {
  const [headings, setHeadings] = useState([])

  useEffect(() => {
    if (!content) return

    // Regular expressions to find h2, h3, and h4 headings in HTML content
    const h2Regex = /<h2[^>]*>(.*?)<\/h2>/g
    const h3Regex = /<h3[^>]*>(.*?)<\/h3>/g
    const h4Regex = /<h4[^>]*>(.*?)<\/h4>/g
    
    const extractedHeadings = []
    
    // Function to sanitize heading text and create ID
    const sanitizeHeading = (text) => {
      // Remove any HTML tags
      const cleanText = text.replace(/<\/?[^>]+(>|$)/g, "")
      // Create ID from text (lowercase, spaces to dashes)
      const id = cleanText.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]+/g, '')
      return { text: cleanText, id }
    }
    
    // Extract h2 headings
    let match
    let index = 0
    
    while ((match = h2Regex.exec(content)) !== null) {
      const { text, id } = sanitizeHeading(match[1])
      extractedHeadings.push({
        text,
        id,
        level: 2,
        index: index++
      })
    }
    
    // Extract h3 headings
    while ((match = h3Regex.exec(content)) !== null) {
      const { text, id } = sanitizeHeading(match[1])
      extractedHeadings.push({
        text,
        id,
        level: 3,
        index: index++
      })
    }
    
    // Extract h4 headings
    while ((match = h4Regex.exec(content)) !== null) {
      const { text, id } = sanitizeHeading(match[1])
      extractedHeadings.push({
        text,
        id,
        level: 4,
        index: index++
      })
    }
    
    // Sort headings by their position in the document
    extractedHeadings.sort((a, b) => a.index - b.index)
    
    setHeadings(extractedHeadings)
    
    // Add IDs to the headings in the DOM for scrolling
    setTimeout(() => {
      const article = document.querySelector('.prose')
      if (!article) return
      
      // Add IDs to h2, h3, and h4 elements if they don't have them
      const addIdsToHeadings = (selector, level) => {
        const elements = article.querySelectorAll(selector)
        elements.forEach((el, i) => {
          const headingObj = extractedHeadings.find(h => 
            h.level === level && h.text === el.textContent.trim()
          )
          
          if (headingObj) {
            el.id = headingObj.id
          }
        })
      }
      
      addIdsToHeadings('h2', 2)
      addIdsToHeadings('h3', 3)
      addIdsToHeadings('h4', 4)
    }, 100)
    
  }, [content])

  // If no headings, don't render
  if (headings.length < 2) {
    return null
  }

  return (
    <nav className="table-of-contents no-print" aria-labelledby="toc-heading">
      <h4 id="toc-heading">Table of Contents</h4>
      <ul>
        {headings.map((heading, index) => (
          <li key={index} className={`toc-h${heading.level}`}>
            <a 
              href={`#${heading.id}`}
              onClick={(e) => {
                e.preventDefault()
                document.getElementById(heading.id).scrollIntoView({
                  behavior: 'smooth'
                })
              }}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default TableOfContents