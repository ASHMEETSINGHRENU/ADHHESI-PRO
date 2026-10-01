import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ShieldCheck,
  Tag,
  CheckCircle2,
  ArrowRight,
  FileText,
  Mail,
  Phone,
  Layers,
  Award,
  ChevronLeft,
} from 'lucide-react';
import SEO from '../components/SEO';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { Loader, EmptyState } from '../components/Loader';
import API from '../services/api';

const ProductDetail = () => {
  const { slug } = useParams();
  const [product, setProduct] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  useEffect(() => {
    const fetchProduct = async () => {
      setLoading(true);
      try {
        const res = await API.get(`/products/slug/${slug}`);
        setProduct(res.data?.data || null);
        setRelated(res.data?.related || []);
        setActiveImageIndex(0);
      } catch (err) {
        console.error('Failed to load product', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [slug]);

  if (loading) {
    return (
      <div className="py-24">
        <Loader text="Loading technical product specifications..." />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20">
        <EmptyState
          title="Product Not Found"
          description="The requested product could not be located in the ADHHESI PRO catalogue. It may have been archived or renamed."
          action={
            <Link to="/products" className="btn-primary text-xs">
              Return to Products Catalogue
            </Link>
          }
        />
      </div>
    );
  }

  const defaultImg =
    'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&w=1000&q=80';
  const images = product.images && product.images.length > 0 ? product.images : [defaultImg];

  return (
    <>
      <SEO
        title={`${product.name} | Technical Data & Specifications`}
        description={product.shortDescription}
      />

      <Breadcrumbs
        items={[
          { label: 'Products & Services', path: '/products' },
          { label: product.category, path: `/products?category=${encodeURIComponent(product.category)}` },
          { label: product.name },
        ]}
      />

      {/* Main Product Overview */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Left: Product Images */}
            <div className="lg:col-span-5 space-y-4">
              <div className="rounded-lg overflow-hidden border border-brand-border bg-brand-light p-4 flex items-center justify-center min-h-[380px] shadow-sm">
                <img
                  src={images[activeImageIndex]}
                  alt={product.name}
                  className="max-h-[400px] w-full object-contain"
                />
              </div>

              {/* Thumbnails */}
              {images.length > 1 && (
                <div className="flex items-center gap-3 overflow-x-auto pb-2">
                  {images.map((img, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`w-20 h-20 rounded-md border p-1 bg-brand-light overflow-hidden transition-all ${
                        activeImageIndex === idx
                          ? 'border-brand-navy ring-2 ring-brand-yellow'
                          : 'border-brand-border opacity-70 hover:opacity-100'
                      }`}
                    >
                      <img
                        src={img}
                        alt={`${product.name} preview ${idx + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </button>
                  ))}
                </div>
              )}

              {/* Quick Spec Highlights */}
              <div className="bg-brand-light border border-brand-border rounded-lg p-4 space-y-2 text-xs">
                <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                  <span className="text-brand-gray">Brand Line:</span>
                  <span className="font-bold text-brand-navy">{product.brand || 'Adhhesi Pro'}</span>
                </div>
                <div className="flex items-center justify-between pb-2 border-b border-brand-border">
                  <span className="text-brand-gray">Category:</span>
                  <span className="font-bold text-brand-navy">{product.category}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-brand-gray">Quality Rating:</span>
                  <span className="font-bold text-brand-yellow bg-brand-navy px-2 py-0.5 rounded text-[11px]">
                    PRO STRENGTH CERTIFIED
                  </span>
                </div>
              </div>
            </div>

            {/* Right: Technical Information */}
            <div className="lg:col-span-7 space-y-6">
              <div>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-light text-brand-navy border border-brand-border mb-3">
                  <Tag className="w-3.5 h-3.5 text-brand-yellow" />
                  <span>{product.category}</span>
                </div>

                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-brand-navy leading-tight">
                  {product.name}
                </h1>
                <p className="text-brand-yellow font-bold text-xs uppercase tracking-wider mt-1">
                  TAGLINE: HAR JOINT MEIN PRO STRENGTH
                </p>
              </div>

              {/* Short Description */}
              <p className="text-base text-brand-gray leading-relaxed font-normal">
                {product.shortDescription}
              </p>

              {/* CTA Requisition Box */}
              <div className="p-5 bg-brand-light border border-brand-border rounded-lg flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <p className="text-xs uppercase font-extrabold text-brand-navy">
                    Need Bulk Pricing or Technical Data Sheet?
                  </p>
                  <p className="text-xs text-brand-gray">
                    Get custom lot estimates and chemical safety sheets.
                  </p>
                </div>
                <Link
                  to={`/enquiry?product=${encodeURIComponent(product.name)}`}
                  className="btn-accent text-sm font-bold w-full sm:w-auto px-6 py-2.5 whitespace-nowrap shadow-sm"
                >
                  <span>Enquire For This Product</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Long Description */}
              <div className="pt-2 space-y-2">
                <h2 className="text-lg font-bold text-brand-navy">Product Overview</h2>
                <p className="text-sm text-brand-gray leading-relaxed">{product.description}</p>
              </div>

              {/* Key Features */}
              {product.features && product.features.length > 0 && (
                <div className="pt-2 space-y-3">
                  <h2 className="text-lg font-bold text-brand-navy">Key Performance Features</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                    {product.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2 text-sm text-brand-gray">
                        <CheckCircle2 className="w-4 h-4 text-brand-yellow flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Applications */}
              {product.applications && product.applications.length > 0 && (
                <div className="pt-2 space-y-3">
                  <h2 className="text-lg font-bold text-brand-navy">Industrial Applications</h2>
                  <ul className="list-disc list-inside space-y-1.5 text-sm text-brand-gray">
                    {product.applications.map((app, idx) => (
                      <li key={idx} className="leading-relaxed">
                        <span className="text-brand-navy font-semibold">{app}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </div>

          {/* DYNAMIC TECHNICAL SPECIFICATIONS TABLE (From MongoDB) */}
          <div className="mt-16 pt-10 border-t border-brand-border">
            <div className="max-w-4xl">
              <h2 className="text-2xl font-bold text-brand-navy mb-2 flex items-center gap-2">
                <FileText className="w-6 h-6 text-brand-yellow" />
                <span>Technical Specifications</span>
              </h2>
              <p className="text-sm text-brand-gray mb-6">
                All physical and chemical parameters tested under standard laboratory conditions (23°C ± 2°C / 50% RH).
              </p>

              {product.specifications && product.specifications.length > 0 ? (
                <div className="border border-brand-border rounded-lg overflow-hidden shadow-sm">
                  <table className="w-full text-left text-sm border-collapse">
                    <thead className="bg-brand-navy text-white text-xs uppercase tracking-wider">
                      <tr>
                        <th className="py-3.5 px-5 font-bold w-1/3">Parameter / Property</th>
                        <th className="py-3.5 px-5 font-bold">Standard Value / Tolerance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-brand-border bg-white">
                      {product.specifications.map((spec, idx) => (
                        <tr
                          key={idx}
                          className={idx % 2 === 0 ? 'bg-white' : 'bg-brand-light/60'}
                        >
                          <td className="py-3.5 px-5 font-semibold text-brand-navy text-xs sm:text-sm">
                            {spec.key}
                          </td>
                          <td className="py-3.5 px-5 text-brand-gray text-xs sm:text-sm font-medium">
                            {spec.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <p className="text-xs text-brand-gray italic">
                  [Technical specifications awaiting laboratory validation – Client Content Required]
                </p>
              )}
            </div>
          </div>

          {/* Related Products */}
          {related && related.length > 0 && (
            <div className="mt-16 pt-10 border-t border-brand-border">
              <h2 className="text-2xl font-bold text-brand-navy mb-6">
                Related Fevicol Formulations
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {related.map((rel) => (
                  <ProductCard key={rel._id} product={rel} />
                ))}
              </div>
            </div>
          )}

          {/* Back to Products */}
          <div className="mt-12 text-center">
            <Link to="/products" className="btn-secondary text-xs">
              <ChevronLeft className="w-4 h-4" />
              <span>Back to Complete Products Catalogue</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductDetail;
