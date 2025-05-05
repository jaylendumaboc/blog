const Card = ({ 
    children, 
    className = '', 
    elevation = 'medium',
    isHoverable = false,
    ...props 
  }) => {
    const elevationStyles = {
      none: '',
      low: 'shadow-sm',
      medium: 'shadow-md',
      high: 'shadow-lg',
    }
  
    const hoverStyles = isHoverable 
      ? 'transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:ring-2 hover:ring-indigo-500/20' 
      : ''
  
    return (
      <div 
        className={`bg-white dark:bg-gray-800 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700 ${elevationStyles[elevation]} ${hoverStyles} ${className}`}
        {...props}
      >
        {children}
      </div>
    )
  }
  
  export default Card