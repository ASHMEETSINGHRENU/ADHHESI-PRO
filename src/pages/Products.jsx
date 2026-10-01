import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Search, Filter, Layers, X, ArrowRight, Tag, ShieldCheck } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import ProductCard from '../components/ProductCard';
import { Loader, EmptyState } from '../components/Loader';
import API from '../services/api';

const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('category') || 'All';
  const initialSearch = searchParams.get('search') || '';

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    const cat = searchParams.get('category') || 'All';
    const s = searchParams.get('search') || '';
    setSelectedCategory(cat);
    setSearchQuery(s);
  }, [searchParams]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await API.get('/categories');
        setCategories(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load categories', err);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const params = {};
        if (selectedCategory && selectedCategory !== 'All') {
          params.category = selectedCategory;
        }
        if (searchQuery.trim()) {
          params.search = searchQuery.trim();
        }

        const res = await API.get('/products', { params });
        setProducts(res.data?.data || []);
        setTotalCount(res.data?.total || 0);
      } catch (err) {
        console.error('Failed to fetch products', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedCategory, searchQuery]);

  const handleCategorySelect = (categoryName) => {
    setSelectedCategory(categoryName);
    const params = new URLSearchParams(searchParams);
    if (categoryName === 'All') {
      params.delete('category');
    } else {
      params.set('category', categoryName);
    }
    setSearchParams(params);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    if (searchQuery.trim()) {
      params.set('search', searchQuery.trim());
    } else {
      params.delete('search');
    }
    setSearchParams(params);
  };

  const handleClearFilters = () => {
    setSelectedCategory('All');
    setSearchQuery('');
    setSearchParams({});
  };

  return (
    <>
      <SEO
        title="Fevicol Products Catalogue | Genuine Woodworking Adhesives"
        description="Comprehensive catalogue of authentic Fevicol adhesives: Fevicol SH, Fevicol Marine, Fevicol HeatX, Fevicol Probond, Fevicol Hi-Per, and Fevicol Ezee Spray."
      />

      <Breadcrumbs items={[{ label: 'Fevicol Products' }]} />

      {/* Header Banner */}
      <section className="bg-brand-navy text-white py-12 sm:py-16 border-b-2 border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-brand-yellow border border-brand-yellow/30">
              <ShieldCheck className="w-4 h-4" />
              AUTHENTIC FEVICOL SOLUTIONS
            </span>
            <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
              Genuine Fevicol Adhesive Catalogue
            </h1>
            <p className="text-sm sm:text-base text-gray-200">
              The benchmark in joint strength—explore synthetic resin adhesives, boiling waterproof glues, and heat-resistant contact adhesives.
            </p>
          </div>
        </div>
      </section>

      {/* Catalogue Main Section */}
      <section className="py-12 bg-brand-light min-h-[600px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {/* Top Search & Filter Bar */}
          <div className="bg-white p-4 sm:p-5 rounded-lg border border-brand-border shadow-sm mb-8 flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Search Input */}
            <form onSubmit={handleSearchSubmit} className="w-full md:w-96 relative">
              <input
                type="text"
                placeholder="Search by Fevicol product (e.g. Marine, HeatX, SH)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy placeholder:text-gray-400"
              />
              <Search className="w-4 h-4 text-brand-gray absolute left-3.5 top-3" />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => {
                    setSearchQuery('');
                    const p = new URLSearchParams(searchParams);
                    p.delete('search');
                    setSearchParams(p);
                  }}
                  className="absolute right-3 top-3 text-gray-400 hover:text-brand-navy"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </form>

            {/* Results counter and active tags */}
            <div className="flex items-center gap-3 text-xs sm:text-sm text-brand-gray w-full md:w-auto justify-between md:justify-end">
              <span>
                Showing <strong className="text-brand-navy">{products.length}</strong> of{' '}
                <strong className="text-brand-navy">{totalCount}</strong> Fevicol formulations
              </span>
              {(selectedCategory !== 'All' || searchQuery) && (
                <button
                  type="button"
                  onClick={handleClearFilters}
                  className="text-xs font-bold text-red-600 hover:underline inline-flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Reset Filters</span>
                </button>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Sidebar Categories */}
            <aside className="lg:col-span-3 space-y-6">
              <div className="bg-white p-5 rounded-lg border border-brand-border shadow-sm">
                <h2 className="text-base font-bold text-brand-navy mb-4 pb-2 border-b border-brand-border flex items-center gap-2">
                  <Filter className="w-4 h-4 text-brand-yellow" />
                  <span>Fevicol Categories</span>
                </h2>
                <ul className="space-y-1.5 text-sm">
                  <li>
                    <button
                      type="button"
                      onClick={() => handleCategorySelect('All')}
                      className={`w-full text-left px-3 py-2 rounded-md font-medium text-xs sm:text-sm transition-colors flex items-center justify-between ${
                        selectedCategory === 'All'
                          ? 'bg-brand-navy text-white font-bold'
                          : 'text-brand-gray hover:bg-brand-light hover:text-brand-navy'
                      }`}
                    >
                      <span>All Products</span>
                    </button>
                  </li>
                  {categories.map((cat) => {
                    const isSelected =
                      selectedCategory.toLowerCase() === cat.name.toLowerCase();
                    return (
                      <li key={cat._id}>
                        <button
                          type="button"
                          onClick={() => handleCategorySelect(cat.name)}
                          className={`w-full text-left px-3 py-2 rounded-md font-medium text-xs sm:text-sm transition-colors flex items-center justify-between ${
                            isSelected
                              ? 'bg-brand-navy text-white font-bold'
                              : 'text-brand-gray hover:bg-brand-light hover:text-brand-navy'
                          }`}
                        >
                          <span className="line-clamp-1">{cat.name}</span>
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>

              {/* Wholesale Inquiry Box */}
              <div className="bg-brand-navy text-white p-5 rounded-lg border border-brand-navy shadow-sm space-y-3">
                <h3 className="font-bold text-sm text-white">Commercial Wholesale Supply</h3>
                <p className="text-xs text-gray-300 leading-relaxed">
                  We supply 10kg, 20kg, 50kg pails and 200kg drums with verified fresh batch dates and scheduled site logistics.
                </p>
                <Link
                  to="/enquiry"
                  className="btn-accent text-xs font-bold w-full py-2 flex justify-center mt-2"
                >
                  <span>Request Bulk Price Schedule</span>
                </Link>
              </div>
            </aside>

            {/* Products Grid */}
            <main className="lg:col-span-9">
              {loading ? (
                <Loader text="Loading Fevicol products..." />
              ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {products.map((product) => (
                    <ProductCard key={product._id} product={product} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="No Products Found"
                  description="We could not find any Fevicol formulations matching your selected category or query."
                  action={
                    <button
                      type="button"
                      onClick={handleClearFilters}
                      className="btn-primary text-xs"
                    >
                      Reset All Filters
                    </button>
                  }
                />
              )}
            </main>
          </div>
        </div>
      </section>
    </>
  );
};

export default Products;
