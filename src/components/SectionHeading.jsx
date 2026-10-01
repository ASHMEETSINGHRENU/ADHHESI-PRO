import React from 'react';

const SectionHeading = ({
  badge,
  title,
  subtitle,
  align = 'center',
  light = false,
  className = '',
}) => {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'} ${className}`}>
      {badge && (
        <div
          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-3 ${
            light
              ? 'bg-white/10 text-brand-yellow border border-brand-yellow/30'
              : 'bg-brand-navy/5 text-brand-navy border border-brand-navy/15'
          }`}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow"></span>
          {badge}
        </div>
      )}

      <h2
        className={`text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight ${
          light ? 'text-white' : 'text-brand-navy'
        }`}
      >
        {title}
      </h2>

      {/* Subtle brand accent line */}
      <div
        className={`h-1 w-12 bg-brand-yellow rounded-full my-3 ${
          isCenter ? 'mx-auto' : ''
        }`}
      ></div>

      {subtitle && (
        <p className={`text-base sm:text-lg leading-relaxed ${light ? 'text-gray-200' : 'text-brand-gray'}`}>
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default SectionHeading;
