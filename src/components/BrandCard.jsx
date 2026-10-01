import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ExternalLink, Award } from 'lucide-react';
import logoImg from '../assets/logo.jpg';

const BrandCard = ({ brand }) => {
  const isMasterBrand = brand.slug === 'adhhesi-pro';

  return (
    <div className="corporate-card bg-white border border-brand-border rounded-lg p-6 flex flex-col justify-between h-full group hover:border-brand-yellow transition-all duration-200">
      <div>
        {/* Brand Logo / Emblem Container */}
        <div className="h-24 w-full bg-brand-light rounded-md flex items-center justify-center p-3 mb-5 border border-brand-border group-hover:bg-white transition-colors">
          {isMasterBrand ? (
            <img
              src={logoImg}
              alt={brand.name}
              className="max-h-full max-w-[180px] object-contain"
            />
          ) : brand.logo ? (
            <img
              src={brand.logo}
              alt={brand.name}
              className="max-h-full max-w-[180px] object-contain"
            />
          ) : (
            <div className="flex items-center gap-2 text-brand-navy font-bold text-sm tracking-wide text-center px-2">
              <Award className="w-5 h-5 text-brand-yellow flex-shrink-0" />
              <span>{brand.name}</span>
            </div>
          )}
        </div>

        {/* Brand Name & Info */}
        <h3 className="text-xl font-bold text-brand-navy mb-2 group-hover:text-brand-navy-light transition-colors">
          {brand.name}
        </h3>
        <p className="text-sm text-brand-gray line-clamp-3 leading-relaxed mb-4">
          {brand.description}
        </p>
      </div>

      {/* Action footer */}
      <div className="pt-4 border-t border-brand-border flex items-center justify-between text-xs font-bold">
        <Link
          to={`/brands/${brand.slug}`}
          className="text-brand-navy hover:text-brand-yellow-hover inline-flex items-center gap-1.5 transition-colors"
        >
          <span>Explore Product Line</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
        </Link>
        {brand.website && brand.website !== '#' && (
          <a
            href={brand.website}
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-brand-navy transition-colors"
            title="External Brand Portal"
          >
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        )}
      </div>
    </div>
  );
};

export default BrandCard;
