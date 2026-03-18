import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Search } from 'lucide-react';
import logo from '../assets/images/logo/sanjivni1.png';
import LanguageToggle from './LanguageToggle';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';
  const { language } = useLanguage();
  const t = translations[language];

  useEffect(() => {
    setIsVisible(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to products page with search query
      navigate(`/products?search=${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsMenuOpen(false);
    }
  };

  const navLinks = [
    { id: 1, name: t.home, to: '/' },
    { id: 2, name: t.about, to: '/about' },
    { id: 3, name: t.products || 'Products', to: '/products' },
    { id: 4, name: t.categories || 'Categories', to: '/categories' },
    { id: 5, name: t.gallery, to: '/gallery' },
    { id: 6, name: t.contact, to: '/contact' }
  ];

  // Header classes based on scroll state and page
  const headerClasses = isHomePage
    ? isScrolled
      ? 'fixed top-0 left-0 right-0 z-50 bg-white backdrop-blur-md shadow-2xl border-b border-accent/30 transition-all duration-700'
      : 'absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-white/90 via-white/70 to-transparent backdrop-blur-md border-b border-accent/20 transition-all duration-700'
    : 'sticky top-0 z-50 bg-white shadow-2xl border-b border-accent/30';

  return (
    <header
      className={`${headerClasses} transform ${isVisible ? 'translate-y-0' : '-translate-y-full'}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <img src={logo} alt="JB Aluminum Industries" className="h-[60px] md:h-[70px] w-auto transition-transform duration-300 hover:scale-105" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.id}
                to={link.to}
                className="text-textDark hover:text-accent relative group py-2 text-sm font-medium transition-colors duration-300"
              >
                {link.name}
                <span className="absolute bottom-0 left-0 w-full h-0.5 bg-accent transform scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />
              </Link>
            ))}
          </nav>

          {/* Search Bar & Language Toggle - Desktop */}
          <div className="hidden lg:flex items-center gap-4">
            <form onSubmit={handleSearch} className="relative group">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-full text-textDark placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300 transform focus:scale-105 w-48 focus:w-64"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-accent transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <LanguageToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-inset focus:ring-accent"
              aria-label="Toggle menu"
            >
              <div className="relative w-6 h-6">
                <span
                  className={`absolute w-6 h-0.5 bg-textDark transform transition-all duration-300 ${isMenuOpen ? 'rotate-45 translate-y-0' : '-translate-y-2'}`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-textDark transform transition-all duration-300 ${isMenuOpen ? 'opacity-0' : 'opacity-100'}`}
                />
                <span
                  className={`absolute w-6 h-0.5 bg-textDark transform transition-all duration-300 ${isMenuOpen ? '-rotate-45 translate-y-0' : 'translate-y-2'}`}
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`lg:hidden transition-all duration-300 ease-in-out ${isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'} overflow-hidden`}
      >
        <div className="px-4 pt-2 pb-3 space-y-1 bg-white/95 backdrop-blur-lg border-t border-gray-200">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              to={link.to}
              onClick={() => setIsMenuOpen(false)}
              className="block px-3 py-2 text-base font-medium text-textDark hover:text-accent hover:bg-gray-50 rounded-md transition-all duration-200"
            >
              {link.name}
            </Link>
          ))}
          <div className="pt-4 space-y-3">
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder="Search services..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-300 rounded-full text-textDark placeholder-gray-500 focus:ring-2 focus:ring-accent focus:border-accent transition-all duration-300"
              />
              <button type="submit" className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-accent transition-colors">
                <Search className="w-4 h-4" />
              </button>
            </form>
            <div className="flex justify-center">
              <LanguageToggle />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
