import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Sun, Moon } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import Button from '../common/Button';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const location = useLocation();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  // Track scroll position for header styling
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu when location changes
  useEffect(() => {
    closeMenu();
  }, [location]);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white dark:bg-gray-800 shadow-md py-2' 
          : 'bg-transparent py-4'
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <span className="text-2xl font-bold text-blue-600 dark:text-blue-400">Content.AI</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/about" className="nav-link">About</Link>
            {isAuthenticated ? (
              <>
                <Link to="/generate" className="nav-link">Generate</Link>
                <Link to="/history" className="nav-link">History</Link>
                <Link to="/profile" className="nav-link">Profile</Link>
                <Button onClick={logout} variant="subtle">Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="subtle">Login</Button>
                </Link>
                <Link to="/register">
                  <Button variant="primary">Sign Up</Button>
                </Link>
              </>
            )}
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
          </nav>

          {/* Mobile Navigation Toggle */}
          <div className="flex items-center md:hidden gap-4">
            <button 
              onClick={toggleTheme} 
              className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
            </button>
            <button 
              onClick={toggleMenu}
              className="p-2 text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-800 shadow-lg h-screen">
          <nav className="container mx-auto px-4 py-6 flex flex-col space-y-4">
            <Link to="/" className="nav-link mobile">Home</Link>
            <Link to="/about" className="nav-link mobile">About</Link>
            {isAuthenticated ? (
              <>
                <Link to="/generate" className="nav-link mobile">Generate</Link>
                <Link to="/history" className="nav-link mobile">History</Link>
                <Link to="/profile" className="nav-link mobile">Profile</Link>
                <Button onClick={logout} variant="subtle" fullWidth>Logout</Button>
              </>
            ) : (
              <>
                <Link to="/login" className="w-full">
                  <Button variant="subtle" fullWidth>Login</Button>
                </Link>
                <Link to="/register" className="w-full">
                  <Button variant="primary" fullWidth>Sign Up</Button>
                </Link>
              </>
            )}
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;