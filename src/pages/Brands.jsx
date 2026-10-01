import React, { useState, useEffect } from 'react';
import { Award, ShieldCheck, ArrowRight } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import BrandCard from '../components/BrandCard';
import { Loader } from '../components/Loader';
import API from '../services/api';

const Brands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBrands = async () => {
      try {
        const res = await API.get('/brands');
        setBrands(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load brands', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBrands();
  }, []);

  return (
    <>
      <SEO
        title="Brands Directory | Authorized Product Lines"
        description="Explore the ADHHESI PRO brand lines and certified manufacturing partner product portfolios."
      />

      <Breadcrumbs items={[{ label: 'Brands' }]} />

      <section className="bg-brand-navy text-white py-14 sm:py-18 border-b-2 border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-brand-yellow border border-brand-yellow/30">
              <Award className="w-4 h-4" />
              AUTHORIZED BRANDS
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Brand Directory
            </h1>
            <p className="text-base text-gray-200">
              Discover dedicated adhesive and sealing formulations categorized under our master
              brand ADHHESI PRO and affiliated industrial solutions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {loading ? (
            <Loader text="Loading brands directory..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brands.map((brand) => (
                <BrandCard key={brand._id} brand={brand} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Brands;
