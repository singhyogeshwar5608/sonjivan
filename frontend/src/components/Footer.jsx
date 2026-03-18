import React from 'react';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { translations } from '../translations/translations';
import logo from '../assets/images/logo/sanjivni1.png';

const Footer = () => {
  const { language } = useLanguage();
  const t = translations[language];
  
  // Scroll to top when navigating
  const handleNavigation = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-white text-textDark">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info with Logo */}
          <div className="lg:col-span-1">
            <Link to="/" onClick={handleNavigation} className="inline-block mb-4">
              <img src={logo} alt="JB Aluminum Industries" className="h-16 w-auto" />
            </Link>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              Trusted neighborhood grocry store in Delhi delivering fresh staples, pulses, spices, and packaged foods. We focus on clean storage, fair pricing, and dependable service for every household.
            </p>
            <p className="text-gray-600 text-sm">
              <span className="font-semibold text-textDark">Quality.</span> <span className="font-semibold text-textDark">Durability.</span> <span className="font-semibold text-textDark">Excellence.</span>
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-textDark">{t.quickLinks}</h4>
            <ul className="space-y-2">
              <li>
                <Link 
                  to="/" 
                  onClick={handleNavigation}
                  className="text-gray-600 hover:text-accent transition-colors cursor-pointer block text-sm"
                >
                  {t.home}
                </Link>
              </li>
              <li>
                <Link 
                  to="/about" 
                  onClick={handleNavigation}
                  className="text-gray-600 hover:text-accent transition-colors cursor-pointer block text-sm"
                >
                  {t.about}
                </Link>
              </li>
              <li>
                <Link 
                  to="/products" 
                  onClick={handleNavigation}
                  className="text-gray-600 hover:text-accent transition-colors cursor-pointer block text-sm"
                >
                  {t.services}
                </Link>
              </li>
              <li>
                <Link 
                  to="/gallery" 
                  onClick={handleNavigation}
                  className="text-gray-600 hover:text-accent transition-colors cursor-pointer block text-sm"
                >
                  {t.gallery}
                </Link>
              </li>
              <li>
                <Link 
                  to="/contact" 
                  onClick={handleNavigation}
                  className="text-gray-600 hover:text-accent transition-colors cursor-pointer block text-sm"
                >
                  {t.contact}
                </Link>
              </li>
              <li>
                <Link 
                  to="/admin/dashboard" 
                  onClick={handleNavigation}
                  className="text-gray-600 hover:text-accent transition-colors cursor-pointer block text-sm"
                >
                  Admin Panel
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-textDark">{t.contactUs}</h4>
            <div className="space-y-4">
              {/* Main Office */}
              <div>
                <h5 className="text-sm font-semibold text-accent mb-2">Son Jivan Grocery Store:</h5>
                <div className="space-y-2">
                  <div className="flex items-start">
                    <MapPin className="w-4 h-4 text-accent flex-shrink-0 mt-1 mr-2" />
                    <span className="text-gray-600 text-xs">
                      Property No. G 454 GF New Delhi Kh No 1567, Ph-6, Aya Nagar G Block, Delhi-110047
                    </span>
                  </div>
                  <div className="flex items-center">
                    <Phone className="w-4 h-4 text-accent flex-shrink-0 mr-2" />
                    <div className="text-gray-600 text-xs">
                      <a href="tel:+919461494614" className="hover:text-accent transition-colors">+91-94614-94614</a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Email */}
              <div className="flex items-center">
                <Mail className="w-4 h-4 text-accent flex-shrink-0 mr-2" />
                <a 
                  href="mailto:info@sonjivan.com" 
                  className="text-gray-600 hover:text-accent transition-colors text-xs"
                >
                  info@sonjivan.com
                </a>
              </div>
            </div>
          </div>

          {/* Office Hours */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-textDark">{t.workingHours}</h4>
            <div className="flex items-start space-x-3 mb-3">
              <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-700 font-medium">{t.mondaySaturday}</p>
                <p className="text-sm text-gray-500">9:00 AM - 7:00 PM</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <Clock className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
              <div>
                <p className="text-sm text-gray-700 font-medium">{t.sunday}</p>
                <p className="text-sm text-gray-500">{t.closed}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <p className="text-center text-sm text-gray-600">
              © {new Date().getFullYear()} Son Jivan Grocery Store. All rights reserved. Designed by{' '}
              <a
                href="https://www.larawansdigital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-accent hover:text-primary transition-colors font-semibold"
              >
                Larawans Digital
              </a>
              .
            </p>
            <div className="flex space-x-4 text-sm">
              <Link 
                to="/privacy-policy" 
                onClick={handleNavigation}
                className="text-gray-600 hover:text-accent transition-colors"
              >
                Privacy Policy
              </Link>
              <span className="text-gray-400">|</span>
              <Link 
                to="/refund-policy" 
                onClick={handleNavigation}
                className="text-gray-600 hover:text-accent transition-colors"
              >
                Refund Policy
              </Link>
            </div>
          </div>
          <div className="text-center mt-3 pt-3 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Crafted with care by{' '}
              <a
                href="https://www.larawansdigital.com/"
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent hover:text-primary transition-colors"
              >
                Larawans Digital
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;