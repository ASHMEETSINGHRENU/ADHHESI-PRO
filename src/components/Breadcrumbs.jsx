import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

const Breadcrumbs = ({ items = [] }) => {
  return (
    <nav aria-label="Breadcrumb" className="py-3 px-4 sm:px-8 bg-brand-light border-b border-brand-border text-xs">
      <div className="max-w-7xl mx-auto flex items-center flex-wrap gap-1.5 text-brand-gray">
        <Link
          to="/"
          className="flex items-center gap-1 hover:text-brand-navy transition-colors font-medium"
        >
          <Home className="w-3.5 h-3.5 text-brand-navy" />
          <span>Home</span>
        </Link>

        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <React.Fragment key={idx}>
              <ChevronRight className="w-3 h-3 text-brand-gray/60" />
              {isLast || !item.path ? (
                <span className="font-bold text-brand-navy truncate max-w-xs" aria-current="page">
                  {item.label}
                </span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-brand-navy transition-colors font-medium"
                >
                  {item.label}
                </Link>
              )}
            </React.Fragment>
          );
        })}
      </div>
    </nav>
  );
};

export default Breadcrumbs;
