/**
 * Format a date string or Date object into a readable format
 * @param {string|Date} date - The date to format
 * @param {Object} options - Formatting options
 * @returns {string} - Formatted date string
 */
export const formatDate = (date, options = {}) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  
  // Default options
  const defaultOptions = {
    format: 'medium', // 'short', 'medium', 'long'
    includeTime: false,
  }
  
  // Merge options
  const mergedOptions = { ...defaultOptions, ...options }
  
  // Format based on format type
  if (mergedOptions.format === 'short') {
    // MM/DD/YYYY
    return `${dateObj.getMonth() + 1}/${dateObj.getDate()}/${dateObj.getFullYear()}`
  }
  
  if (mergedOptions.format === 'long') {
    // Month DD, YYYY
    const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(dateObj)
    return `${month} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
  }
  
  // Medium format (default)
  // MMM DD, YYYY
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(dateObj)
  let formattedDate = `${month} ${dateObj.getDate()}, ${dateObj.getFullYear()}`
  
  // Add time if requested
  if (mergedOptions.includeTime) {
    const hours = dateObj.getHours()
    const minutes = dateObj.getMinutes().toString().padStart(2, '0')
    const ampm = hours >= 12 ? 'PM' : 'AM'
    const formattedHours = hours % 12 || 12
    
    formattedDate += ` at ${formattedHours}:${minutes} ${ampm}`
  }
  
  return formattedDate
}

/**
 * Get relative time string (e.g., "2 days ago")
 * @param {string|Date} date - The date to compare
 * @returns {string} - Relative time string
 */
export const getRelativeTimeString = (date) => {
  const dateObj = typeof date === 'string' ? new Date(date) : date
  const now = new Date()
  
  const diffInMs = now - dateObj
  const diffInSecs = Math.floor(diffInMs / 1000)
  const diffInMins = Math.floor(diffInSecs / 60)
  const diffInHours = Math.floor(diffInMins / 60)
  const diffInDays = Math.floor(diffInHours / 24)
  
  if (diffInSecs < 60) {
    return 'just now'
  }
  
  if (diffInMins < 60) {
    return `${diffInMins} ${diffInMins === 1 ? 'minute' : 'minutes'} ago`
  }
  
  if (diffInHours < 24) {
    return `${diffInHours} ${diffInHours === 1 ? 'hour' : 'hours'} ago`
  }
  
  if (diffInDays < 7) {
    return `${diffInDays} ${diffInDays === 1 ? 'day' : 'days'} ago`
  }
  
  // After a week, return the formatted date
  return formatDate(dateObj)
}