import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Award, ExternalLink, ChevronLeft, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { Loader, EmptyState } from '../components/Loader';
import logoImg from '../assets/logo.jpg';
import API from '../services/api';

const BrandDetail = () => {
  const { slug } = useParams();
  const [brand, setBrand] = useState(null);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrandDetail = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/brands/slug/${slug}`);
        setBrand(res.data?.data || null);
        setProducts(res.data?.products || []);
      } catch (err) {
        console.error('Failed to load brand detail', err);
        setBrand(null);
      } finally {
        setLoading(false);
      }
    };
    fetchBrandDetail();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24">
        <Loader text="Loading brand information..." />
      </div>
    );
  }

  if (!brand) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <EmptyState
          title="Brand Profile Not Found"
          description="The brand directory does not contain this entry."
          action={
            <Link to="/brands" className="btn-primary text-xs">
              Return to Brands Directory
            </Link>
          }
        />
      </div>
    );
  }

  const isMaster = brand.slug === 'adhhesi-pro';

  return (
    <>
      <SEO
        title={`${brand.name} | Brand Portfolio & Products`}
        description={brand.description}
      />

      <Breadcrumbs
        items={[{ label: 'Brands', path: '/brands' }, { label: brand.name }]}
      />

      <section className="bg-brand-navy text-white py-14 sm:py-16 border-b-2 border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="w-40 h-28 bg-white rounded-lg p-3 flex items-center justify-center flex-shrink-0 shadow-lg border-2 border-brand-yellow">
              {isMaster ? (
                <img
                  src={logoImg}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : brand.logo ? (
                <img
                  src={brand.logo}
                  alt={brand.name}
                  className="max-h-full max-w-full object-contain"
                />
              ) : (
                <Award className="w-12 h-12 text-brand-navy" />
              )}
            </div>

            <div className="space-y-3 text-center md:text-left">
              <h1 className="text-3xl sm:text-4xl font-extrabold text-white">{brand.name}</h1>
              <p className="text-sm sm:text-base text-gray-200 max-w-2xl leading-relaxed">
                {brand.description}
              </p>
              {brand.website && brand.website !== '#' && (
                <a
                  href={brand.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs text-brand-yellow font-bold hover:underline"
                >
                  <span>Visit Brand Website</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              )}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-light min-h-[450px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <h2 className="text-2xl font-bold text-brand-navy mb-8">
            Products Associated with {brand.name} ({products.length})
          </h2>

          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((p) => (
                <ProductCard key={p._id} product={p} />
              ))}
            </div>
          ) : (
            <div className="bg-white p-8 rounded-lg border border-brand-border text-center">
              <p className="text-brand-gray text-sm">
                No active products currently linked to this brand portfolio.
              </p>
              <Link to="/products" className="btn-secondary text-xs mt-4">
                View All Products
              </Link>
            </div>
          )}

          <div className="mt-12 text-center">
            <Link to="/brands" className="btn-secondary text-xs">
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Brands Directory</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BrandDetail;
