import React from 'react';
import { Link } from 'react-router-dom';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ArrowRight,
  ShieldCheck,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';
import logoImg from '../assets/logo.jpg';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const productCategories = [
    { name: 'Carpentry & Woodworking Adhesives', slug: 'carpentry-woodworking-adhesives' },
    { name: 'Waterproof & Marine-Grade Adhesives', slug: 'waterproof-marine-grade-adhesives' },
    { name: 'Heat-Resistant Contact Adhesives', slug: 'heat-resistant-contact-adhesives' },
    { name: 'PVC & Acrylic Specialty Adhesives', slug: 'pvc-acrylic-specialty-adhesives' },
    { name: 'Fast-Grab & Spray Contact Adhesives', slug: 'fast-grab-spray-adhesives' },
  ];

  const quickLinks = [
    { name: 'Home', path: '/' },
    { name: 'About Us', path: '/about' },
    { name: 'Fevicol Catalogue', path: '/products' },
    { name: 'Brands Directory', path: '/brands' },
    { name: 'Business Segments', path: '/business-segments' },
    { name: 'Leadership & Team', path: '/leadership' },
    { name: 'Company Achievements', path: '/achievements' },
    { name: 'Contact & Support', path: '/contact' },
    { name: 'Request Wholesale Quote', path: '/enquiry' },
  ];

  return (
    <footer className="bg-brand-navy text-white pt-16 pb-8 border-t-4 border-brand-yellow">
      <div className="max-w-7xl mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 pb-12 border-b border-white/10">
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-4">
            <div className="bg-white p-2.5 rounded-md inline-block shadow-md">
              <img
                src={logoImg}
                alt="ADHHESI PRO"
                className="h-12 w-auto object-contain max-w-[200px]"
              />
            </div>
            <p className="text-brand-yellow font-bold text-sm tracking-wider uppercase flex items-center gap-1.5 pt-1">
              <ShieldCheck className="w-4 h-4 text-brand-yellow" />
              HAR JOINT MEIN PRO STRENGTH
            </p>
            <p className="text-gray-300 text-sm leading-relaxed pr-4">
              ADHHESI PRO is a dedicated commercial supplier and showcase platform for genuine FEVICOL
              adhesives. Supplying contractors, modular furniture factories, and craftsmen with
              authentic, fresh-batch wood bonding and sealing solutions.
            </p>
            <div className="pt-2">
              <Link
                to="/enquiry"
                className="inline-flex items-center gap-2 bg-brand-yellow text-brand-navy font-bold text-xs uppercase tracking-wider px-4 py-2 rounded shadow hover:bg-[#e09f12] transition-colors"
              >
                <span>Request Wholesale Fevicol Quote</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-base font-bold mb-4 tracking-wide relative inline-block after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-yellow">
              Quick Links
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {quickLinks.slice(0, 6).map((item) => (
                <li key={item.path}>
                  <Link
                    to={item.path}
                    className="hover:text-brand-yellow transition-colors inline-flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-brand-yellow/80" />
                    <span>{item.name}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Product Categories Column */}
          <div className="lg:col-span-3">
            <h3 className="text-white text-base font-bold mb-4 tracking-wide relative inline-block after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-yellow">
              Fevicol Range
            </h3>
            <ul className="space-y-2 text-sm text-gray-300">
              {productCategories.map((cat) => (
                <li key={cat.slug}>
                  <Link
                    to={`/products?category=${encodeURIComponent(cat.name)}`}
                    className="hover:text-brand-yellow transition-colors inline-flex items-center gap-1.5"
                  >
                    <ChevronRight className="w-3.5 h-3.5 text-brand-yellow/80" />
                    <span>{cat.name}</span>
                  </Link>
                </li>
              ))}
              <li className="pt-1">
                <Link
                  to="/products"
                  className="text-xs text-brand-yellow font-bold hover:underline inline-flex items-center gap-1"
                >
                  <span>View All Fevicol Products</span>
                  <ExternalLink className="w-3 h-3" />
                </Link>
              </li>
            </ul>
          </div>

          {/* Corporate Contact Column */}
          <div className="lg:col-span-3 space-y-3.5">
            <h3 className="text-white text-base font-bold mb-4 tracking-wide relative inline-block after:absolute after:bottom-[-6px] after:left-0 after:w-8 after:h-0.5 after:bg-brand-yellow">
              Supply Desk
            </h3>
            <div className="flex items-start gap-3 text-sm text-gray-300">
              <MapPin className="w-5 h-5 text-brand-yellow flex-shrink-0 mt-0.5" />
              <span>[Corporate Office & Distribution Hub – Client Content Required]</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Mail className="w-4 h-4 text-brand-yellow flex-shrink-0" />
              <a href="mailto:contact@adhhesipro.com" className="hover:text-brand-yellow transition-colors">
                contact@adhhesipro.com
              </a>
            </div>
            <div className="flex items-start gap-3 text-sm text-gray-300">
              <Clock className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
              <span>Mon - Sat: 9:00 AM - 6:30 PM (IST)</span>
            </div>
            <div className="flex items-center gap-3 text-sm text-gray-300">
              <Phone className="w-4 h-4 text-brand-yellow flex-shrink-0" />
              <span>[Contractor Sales Helpline – Client Content Required]</span>
            </div>
          </div>
        </div>

        {/* Bottom Strip */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-400">
          <p>© {currentYear} ADHHESI PRO. Genuine Fevicol Adhesive Solutions. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/contact" className="hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/contact" className="hover:text-white transition-colors">
              Terms & Conditions
            </Link>
            <span className="text-white/20">|</span>
            <Link to="/admin/login" className="hover:text-brand-yellow transition-colors font-medium">
              Admin Access
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
