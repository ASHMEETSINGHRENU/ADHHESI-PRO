import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Layers, Tag } from 'lucide-react';

const ProductCard = ({ product }) => {
  const defaultImage =
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=800&q=80';
  const imgUrl = product.images && product.images.length > 0 ? product.images[0] : defaultImage;

  return (
    <div className="corporate-card flex flex-col h-full overflow-hidden group border border-brand-border bg-white rounded-lg">
      {/* Product Image Area */}
      <div className="relative h-52 sm:h-56 w-full bg-brand-light overflow-hidden flex items-center justify-center p-3 border-b border-brand-border">
        <img
          src={imgUrl}
          alt={product.name}
          className="h-full w-full object-cover object-center group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
        />
        {product.isFeatured && (
          <span className="absolute top-3 left-3 bg-brand-navy text-brand-yellow font-bold text-[11px] uppercase tracking-wider px-2.5 py-1 rounded shadow-sm">
            Featured
          </span>
        )}
        <span className="absolute bottom-3 right-3 bg-white/90 backdrop-blur-sm text-brand-navy text-xs font-semibold px-2 py-0.5 rounded border border-brand-border">
          {product.brand || 'Adhhesi Pro'}
        </span>
      </div>

      {/* Content Area */}
      <div className="p-5 flex-1 flex flex-col justify-between">
        <div>
          {/* Category Tag */}
          <div className="flex items-center gap-1.5 text-xs font-semibold text-brand-navy-light uppercase tracking-wider mb-2">
            <Tag className="w-3.5 h-3.5 text-brand-yellow" />
            <span>{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 className="text-lg font-bold text-brand-navy group-hover:text-brand-navy-light line-clamp-2 transition-colors mb-2">
            <Link to={`/products/${product.slug}`}>{product.name}</Link>
          </h3>

          {/* Short Description */}
          <p className="text-sm text-brand-gray line-clamp-3 mb-4 leading-relaxed">
            {product.shortDescription}
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 border-t border-brand-border flex items-center justify-between gap-2 mt-auto">
          <Link
            to={`/products/${product.slug}`}
            className="text-xs font-bold text-brand-navy hover:text-brand-yellow-hover flex items-center gap-1 group-hover:translate-x-1 transition-all"
          >
            <span>View Specifications</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>

          <Link
            to={`/enquiry?product=${encodeURIComponent(product.name)}`}
            className="text-xs font-semibold text-brand-navy bg-brand-light hover:bg-brand-yellow px-2.5 py-1.5 rounded transition-colors"
          >
            Enquire
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
