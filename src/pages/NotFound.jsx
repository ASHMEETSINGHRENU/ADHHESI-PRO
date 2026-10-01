import React from 'react';
import { Link } from 'react-router-dom';
import { ShieldAlert, Home, ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';

const NotFound = () => {
  return (
    <>
      <SEO title="Page Not Found (404)" />
      <div className="min-h-[60vh] flex items-center justify-center px-4 py-20 bg-brand-light">
        <div className="max-w-md w-full text-center bg-white p-8 sm:p-10 rounded-xl border border-brand-border shadow-corporate">
          <div className="w-16 h-16 rounded-full bg-brand-light border-2 border-brand-yellow flex items-center justify-center mx-auto mb-4 text-brand-navy shadow-sm">
            <ShieldAlert className="w-8 h-8 text-brand-yellow" />
          </div>
          <h1 className="text-4xl font-extrabold text-brand-navy mb-2">404</h1>
          <h2 className="text-lg font-bold text-brand-navy mb-3">Resource Not Found</h2>
          <p className="text-xs sm:text-sm text-brand-gray mb-6 leading-relaxed">
            The page or document you are trying to view has been moved, archived, or is unavailable.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link to="/" className="btn-primary text-xs w-full sm:w-auto">
              <Home className="w-4 h-4" />
              <span>Back to Home</span>
            </Link>
            <Link to="/products" className="btn-secondary text-xs w-full sm:w-auto">
              <span>View Products</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default NotFound;
