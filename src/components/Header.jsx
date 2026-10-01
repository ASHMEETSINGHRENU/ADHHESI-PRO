import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

const Header = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Fevicol Products', path: '/products' },
    { name: 'Brands', path: '/brands' },
    { name: 'Business Segments', path: '/business-segments' },
    { name: 'Leadership', path: '/leadership' },
    { name: 'Achievements', path: '/achievements' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm transition-all duration-200">
      {/* Top Corporate Strip */}
      <div className="bg-brand-navy text-white text-xs border-b border-brand-navy-light/40 py-1.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-2">
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center gap-1.5 text-brand-yellow font-semibold tracking-wider uppercase text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5" />
              HAR JOINT MEIN PRO STRENGTH
            </span>
            <span className="hidden md:inline text-white/30">|</span>
            <span className="hidden md:inline text-gray-300">
              Genuine Fevicol Adhesive Solutions & Commercial Bulk Supply
            </span>
          </div>
          <div className="flex items-center gap-5 text-gray-200">
            <a
              href="mailto:contact@adhhesipro.com"
              className="inline-flex items-center gap-1.5 hover:text-brand-yellow transition-colors"
            >
              <Mail className="w-3.5 h-3.5 text-brand-yellow" />
              <span>contact@adhhesipro.com</span>
            </a>
            <span className="text-white/30 hidden xs:inline">|</span>
            <Link
              to="/admin/login"
              className="text-white/60 hover:text-brand-yellow transition-colors text-[11px] underline underline-offset-2"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div
        className={`bg-white transition-all duration-200 border-b border-brand-border ${
          scrolled ? 'py-2.5 shadow-md' : 'py-3.5'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex items-center justify-between">
          {/* Logo Section */}
          <Link
            to="/"
            className="flex items-center gap-3 group focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-navy rounded"
            aria-label="ADHHESI PRO Home"
          >
            <div className="h-12 sm:h-14 w-auto flex items-center justify-center p-0.5 bg-white">
              <img
                src={logoImg}
                alt="ADHHESI PRO - Har Joint Mein Pro Strength"
                className="h-full w-auto object-contain max-w-[170px] sm:max-w-[210px]"
                loading="eager"
              />
            </div>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden xl:flex items-center gap-1 2xl:gap-2"
            aria-label="Main Navigation"
          >
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `px-3 py-2 text-sm font-semibold tracking-normal transition-all duration-150 rounded-md relative ${
                    isActive
                      ? 'text-brand-navy font-bold after:absolute after:bottom-0 after:left-3 after:right-3 after:h-0.5 after:bg-brand-yellow'
                      : 'text-brand-gray hover:text-brand-navy hover:bg-brand-light'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Action CTA & Mobile Trigger */}
          <div className="flex items-center gap-3">
            <Link
              to="/enquiry"
              className="hidden sm:inline-flex items-center gap-2 bg-brand-yellow hover:bg-[#e09f12] text-brand-navy font-bold text-sm px-5 py-2.5 rounded-md shadow-sm transition-all duration-150 hover:shadow-md hover:-translate-y-0.5"
            >
              <span>Get Wholesale Quote</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            {/* Mobile Hamburger Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="xl:hidden p-2.5 rounded-md text-brand-navy hover:bg-brand-light focus:outline-none focus:ring-2 focus:ring-brand-navy"
              aria-expanded={mobileMenuOpen}
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-brand-navy" />
              ) : (
                <Menu className="w-6 h-6 text-brand-navy" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-b border-brand-border shadow-xl animate-fadeIn">
          <div className="px-5 pt-3 pb-6 space-y-1">
            {navLinks.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  `block px-3 py-2.5 rounded-md text-base font-semibold transition-colors ${
                    isActive
                      ? 'bg-brand-navy text-white font-bold'
                      : 'text-brand-gray hover:text-brand-navy hover:bg-brand-light'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
            <div className="pt-4 border-t border-brand-border mt-3 space-y-2">
              <Link
                to="/enquiry"
                className="w-full flex items-center justify-center gap-2 bg-brand-yellow text-brand-navy font-bold py-3 rounded-md shadow-sm hover:bg-[#e09f12] transition-colors"
              >
                <span>Request Fevicol Quotation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
              <div className="pt-2 flex items-center justify-between text-xs text-brand-gray px-2">
                <span>contact@adhhesipro.com</span>
                <Link to="/admin/login" className="text-brand-navy font-semibold underline">
                  Admin Login
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
