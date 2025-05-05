import { Link } from 'react-router-dom'

const Button = ({ 
  children, 
  variant = 'primary', 
  size = 'medium', 
  as = 'button', 
  to, 
  href, 
  className = '',
  ...props 
}) => {
  // Base styles using only Tailwind
  const baseStyles = 'inline-flex items-center justify-center rounded-lg font-sans font-medium transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2'
  
  // Variant styles using only Tailwind
  const variantStyles = {
    primary: 'bg-indigo-900 text-white hover:bg-indigo-800 focus:ring-indigo-600 shadow-sm',
    secondary: 'bg-amber-500 text-white hover:bg-amber-600 focus:ring-amber-400 shadow-sm',
    outline: 'border border-indigo-900 text-indigo-900 hover:bg-indigo-50 focus:ring-indigo-600',
    ghost: 'text-indigo-900 hover:bg-indigo-50 focus:ring-indigo-600',
    white: 'bg-white text-indigo-900 hover:bg-gray-100 focus:ring-indigo-600 shadow-sm',
  }
  
  // Size styles using only Tailwind
  const sizeStyles = {
    small: 'py-1 px-3 text-sm',
    medium: 'py-2 px-4 text-base',
    large: 'py-3 px-6 text-lg',
  }
  
  // Combined styles
  const combinedStyles = `${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`
  
  // Render based on 'as' prop
  if (as === 'link' && to) {
    return (
      <Link to={to} className={combinedStyles} {...props}>
        {children}
      </Link>
    )
  }
  
  if (as === 'a' && href) {
    return (
      <a href={href} className={combinedStyles} {...props}>
        {children}
      </a>
    )
  }
  
  return (
    <button type="button" className={combinedStyles} {...props}>
      {children}
    </button>
  )
}

export default Button