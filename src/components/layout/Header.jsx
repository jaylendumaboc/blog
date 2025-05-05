import { useState, useEffect } from 'react';
import { Link, NavLink } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll events
  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  // Close mobile menu when clicking outside or resizing to desktop
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (isMenuOpen && !event.target.closest('header')) {
        setIsMenuOpen(false);
      }
    };

    const handleResize = () => {
      if (window.innerWidth >= 768) { // Tailwind's md breakpoint
        setIsMenuOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    window.addEventListener('resize', handleResize);
    
    return () => {
      document.removeEventListener('click', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isMenuOpen]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-white shadow-md py-3' 
          : 'bg-gradient-to-r from-indigo-900 to-indigo-800 py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link 
          to="/" 
          className="flex items-center" 
          aria-label="Jaylen's Blog Homepage"
          onClick={() => setIsMenuOpen(false)}
        >
          <span className={`text-2xl font-bold font-sans ${scrolled ? 'text-indigo-900' : 'text-white'}`}>
            Jaylen<span className="text-amber-500">Blog</span>
          </span>
        </Link>

        {/* Desktop Navigation - Hidden on mobile */}
        <nav className="hidden md:flex space-x-4 lg:space-x-8">
          <NavLink 
            to="/"
            className={({ isActive }) => 
              `font-sans font-medium transition-colors px-2 py-1 rounded-md ${
                scrolled
                  ? (isActive ? 'text-amber-600 bg-amber-50' : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-100')
                  : (isActive ? 'text-amber-300 bg-indigo-950' : 'text-white hover:text-amber-200 hover:bg-indigo-950/50')
              }`
            }
          >
            Home
          </NavLink>
          <NavLink 
            to="/blog"
            className={({ isActive }) => 
              `font-sans font-medium transition-colors px-2 py-1 rounded-md ${
                scrolled
                  ? (isActive ? 'text-amber-600 bg-amber-50' : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-100')
                  : (isActive ? 'text-amber-300 bg-indigo-950' : 'text-white hover:text-amber-200 hover:bg-indigo-950/50')
              }`
            }
          >
            Blog
          </NavLink>
          <NavLink 
            to="/about"
            className={({ isActive }) => 
              `font-sans font-medium transition-colors px-2 py-1 rounded-md ${
                scrolled
                  ? (isActive ? 'text-amber-600 bg-amber-50' : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-100')
                  : (isActive ? 'text-amber-300 bg-indigo-950' : 'text-white hover:text-amber-200 hover:bg-indigo-950/50')
              }`
            }
          >
            About
          </NavLink>
          <NavLink 
            to="/contact"
            className={({ isActive }) => 
              `font-sans font-medium transition-colors px-2 py-1 rounded-md ${
                scrolled
                  ? (isActive ? 'text-amber-600 bg-amber-50' : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-100')
                  : (isActive ? 'text-amber-300 bg-indigo-950' : 'text-white hover:text-amber-200 hover:bg-indigo-950/50')
              }`
            }
          >
            Contact
          </NavLink>
        </nav>

        {/* Mobile Menu Button - Hidden on desktop */}
        <button 
          className="md:hidden focus:outline-none p-2 rounded-md text-white hover:bg-white/10 transition-colors"
          onClick={toggleMenu}
          aria-label="Toggle Menu"
          aria-expanded={isMenuOpen}
        >
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor" 
            className="h-6 w-6"
          >
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Menu - Hidden on desktop */}
      <div className={`md:hidden ${isMenuOpen ? 'block' : 'hidden'} bg-white shadow-lg absolute top-full left-0 right-0 py-4 animate-fadeIn transition-all duration-300`}>
        <div className="px-4 sm:px-6 flex flex-col space-y-2">
          <NavLink 
            to="/"
            className={({ isActive }) => 
              `font-sans font-medium py-2 px-4 rounded-md transition-colors ${
                isActive ? 'text-amber-600 bg-amber-50' : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink 
            to="/blog"
            className={({ isActive }) => 
              `font-sans font-medium py-2 px-4 rounded-md transition-colors ${
                isActive ? 'text-amber-600 bg-amber-50' : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Blog
          </NavLink>
          <NavLink 
            to="/about"
            className={({ isActive }) => 
              `font-sans font-medium py-2 px-4 rounded-md transition-colors ${
                isActive ? 'text-amber-600 bg-amber-50' : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink 
            to="/contact"
            className={({ isActive }) => 
              `font-sans font-medium py-2 px-4 rounded-md transition-colors ${
                isActive ? 'text-amber-600 bg-amber-50' : 'text-gray-700 hover:text-indigo-700 hover:bg-gray-100'
              }`
            }
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </NavLink>
        </div>
      </div>
    </header>
  );
};

export default Header;