import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShieldCheck,
  Award,
  Layers,
  Sparkles,
  Users,
  Compass,
  CheckCircle2,
  FileText,
  Clock,
  Briefcase,
  ChevronRight,
  Truck,
  Droplets,
  Flame,
  Package,
} from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import ProductCard from '../components/ProductCard';
import BrandCard from '../components/BrandCard';
import SegmentCard from '../components/SegmentCard';
import LeadershipCard from '../components/LeadershipCard';
import AchievementCard from '../components/AchievementCard';
import { Loader } from '../components/Loader';
import API from '../services/api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);
  const [segments, setSegments] = useState([]);
  const [leadership, setLeadership] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [company, setCompany] = useState(null);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        const [prodRes, catRes, brandRes, segRes, leadRes, achRes, compRes] =
          await Promise.all([
            API.get('/products?limit=8'),
            API.get('/categories'),
            API.get('/brands'),
            API.get('/business-segments'),
            API.get('/leadership'),
            API.get('/achievements'),
            API.get('/company'),
          ]);

        setProducts(prodRes.data?.data || []);
        setCategories(catRes.data?.data || []);
        setBrands(brandRes.data?.data || []);
        setSegments(segRes.data?.data || []);
        setLeadership(leadRes.data?.data || []);
        setAchievements(achRes.data?.data || []);
        setCompany(compRes.data?.data || null);
      } catch (err) {
        console.error('Error loading home data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchHomeData();
  }, []);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter(
          (p) => p.category?.toLowerCase() === activeCategory.toLowerCase()
        );

  const focusAreas = [
    {
      icon: ShieldCheck,
      title: '100% Genuine Fevicol Guarantee',
      desc: 'Direct sourcing of authentic, factory-sealed Fevicol batches with verifiable shelf life and consistent solids content.',
    },
    {
      icon: Droplets,
      title: 'D3 Waterproof & Marine Protection',
      desc: 'Supplying Fevicol Marine with 48 hours boiling water resistance to safeguard modular kitchens and bathroom vanities.',
    },
    {
      icon: Flame,
      title: 'Up to 170°C Heat Resistance',
      desc: 'High-thermal endurance contact bonding with Fevicol HeatX, eliminating clamp delays on curved vertical laminations.',
    },
    {
      icon: Truck,
      title: 'Direct Contractor Site Logistics',
      desc: 'Rapid wholesale delivery straight to your woodworking workshop or construction site, minimizing downtime.',
    },
    {
      icon: Package,
      title: 'Complete Pack Size Range',
      desc: 'Available in all commercial configurations from 500g and 1kg handy packs to 20kg pails, 50kg drums, and 200kg bulk containers.',
    },
    {
      icon: Briefcase,
      title: 'Competitive Wholesale Pricing',
      desc: 'Dedicated volume rate schedules, GST invoicing, and institutional supply contracts for builders and interior contractors.',
    },
  ];

  return (
    <>
      <SEO
        title="Genuine Fevicol Adhesives Supplier & Showcase | Har Joint Mein Pro Strength"
        description="ADHHESI PRO is your trusted source for genuine Fevicol adhesives: Fevicol SH, Fevicol Marine, Fevicol HeatX, Fevicol Probond, and Fevicol Hi-Per."
      />

      {/* 1. HERO SECTION */}
      <section className="relative bg-brand-navy text-white overflow-hidden">
        {/* Subtle decorative grid background */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage:
              'radial-gradient(rgba(244, 177, 26, 0.4) 1px, transparent 1px)',
            backgroundSize: '32px 32px',
          }}
        ></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-8 py-20 lg:py-28 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 border border-brand-yellow/40 px-3.5 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-brand-yellow">
                <ShieldCheck className="w-4 h-4 text-brand-yellow" />
                <span>GENUINE FEVICOL ADHESIVE SOLUTIONS & COMMERCIAL SUPPLY</span>
              </div>

              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-[1.1]">
                HAR JOINT MEIN{' '}
                <span className="text-brand-yellow underline decoration-brand-yellow decoration-4 underline-offset-8">
                  PRO STRENGTH
                </span>
              </h1>

              <p className="text-base sm:text-lg text-gray-200 leading-relaxed max-w-2xl">
                ADHHESI PRO is the dedicated destination for genuine <strong>FEVICOL</strong> adhesives.
                From legendary <strong>Fevicol SH</strong> wood bonding to waterproof <strong>Fevicol Marine</strong>,
                170°C heat-resistant <strong>Fevicol HeatX</strong>, and specialty <strong>Fevicol Probond</strong> for PVC/Acrylic,
                we supply contractors, furniture manufacturers, and master carpenters with authentic products at wholesale rates.
              </p>

              {/* CTAs */}
              <div className="flex flex-wrap items-center gap-4 pt-4">
                <Link to="/products" className="btn-accent text-sm font-bold px-6 py-3.5">
                  <span>Explore Fevicol Catalogue</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/enquiry"
                  className="bg-white/10 hover:bg-white text-white hover:text-brand-navy border border-white/30 font-semibold text-sm px-6 py-3.5 rounded-md transition-all duration-150 inline-flex items-center gap-2"
                >
                  <span>Request Wholesale Quote</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Fevicol Badges */}
              <div className="pt-6 border-t border-white/15 grid grid-cols-3 gap-4 text-xs">
                <div>
                  <p className="font-extrabold text-brand-yellow text-lg">100% GENUINE</p>
                  <p className="text-gray-300">Fresh Factory Batches</p>
                </div>
                <div>
                  <p className="font-extrabold text-brand-yellow text-lg">PRO STRENGTH</p>
                  <p className="text-gray-300">Unbeatable Joint Bond</p>
                </div>
                <div>
                  <p className="font-extrabold text-brand-yellow text-lg">BULK SUPPLY</p>
                  <p className="text-gray-300">Pails & 200kg Drums</p>
                </div>
              </div>
            </div>

            {/* Right Graphic */}
            <div className="lg:col-span-5">
              <div className="relative rounded-lg overflow-hidden border-2 border-white/20 shadow-2xl bg-brand-navy-dark">
                <img
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=1000&q=80"
                  alt="Precision Woodworking with Fevicol Adhesives"
                  className="w-full h-80 sm:h-96 object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-navy via-transparent to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-md border-l-4 border-brand-yellow text-brand-navy shadow-lg">
                  <p className="text-xs uppercase tracking-wider font-extrabold text-brand-navy">
                    The Ultimate Woodworking Bond
                  </p>
                  <p className="text-xs text-brand-gray mt-0.5">
                    Engineered to prevent laminate delamination, bubbling, and edge-popping across all wood, plywood, and PVC substrates.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. ABOUT / COMPANY INTRODUCTION */}
      <section className="py-20 bg-brand-light border-b border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Image */}
            <div className="lg:col-span-5 order-2 lg:order-1">
              <div className="relative rounded-lg overflow-hidden border border-brand-border shadow-corporate">
                <img
                  src="https://images.unsplash.com/photo-1504917599217-d4dc5ebe6122?auto=format&fit=crop&w=900&q=80"
                  alt="ADHHESI PRO Fevicol Warehouse & Logistics"
                  className="w-full h-80 sm:h-[400px] object-cover"
                />
                <div className="absolute top-4 left-4 bg-brand-navy text-white px-3.5 py-1.5 rounded text-xs font-bold shadow-md">
                  Guaranteed Authentic Formulations
                </div>
              </div>
            </div>

            {/* Intro Content */}
            <div className="lg:col-span-7 order-1 lg:order-2 space-y-6">
              <SectionHeading
                badge="ABOUT ADHHESI PRO"
                title="Supplying Fevicol Quality for Unbreakable Joints"
                subtitle="We connect interior contractors, modular furniture factories, and architects with the full spectrum of genuine Fevicol solutions."
                align="left"
                className="mb-6"
              />

              <p className="text-base text-brand-gray leading-relaxed">
                {company?.aboutShort ||
                  'ADHHESI PRO is your trusted source for genuine Fevicol adhesives and industrial wood bonding solutions. We supply contractors, interior designers, modular furniture manufacturers, and craftsmen with authentic, fresh-batch Fevicol products engineered for unbeatable joint strength.'}
              </p>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-4 border-y border-brand-border">
                <div className="text-center p-3 bg-white rounded border border-brand-border">
                  <p className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                    {company?.stats?.yearsExperience || 'XX+'}
                  </p>
                  <p className="text-xs text-brand-gray font-semibold mt-1">
                    Years of Supply Trust
                  </p>
                </div>
                <div className="text-center p-3 bg-white rounded border border-brand-border">
                  <p className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                    {company?.stats?.productsCount || 'XX+'}
                  </p>
                  <p className="text-xs text-brand-gray font-semibold mt-1">
                    Fevicol Formulations
                  </p>
                </div>
                <div className="text-center p-3 bg-white rounded border border-brand-border">
                  <p className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                    {company?.stats?.segmentsCount || 'XX+'}
                  </p>
                  <p className="text-xs text-brand-gray font-semibold mt-1">
                    Industry Verticals
                  </p>
                </div>
                <div className="text-center p-3 bg-white rounded border border-brand-border">
                  <p className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                    {company?.stats?.brandsCount || 'XX+'}
                  </p>
                  <p className="text-xs text-brand-gray font-semibold mt-1">
                    Product Portfolios
                  </p>
                </div>
              </div>

              <div>
                <Link to="/about" className="btn-primary text-sm">
                  <span>Know More About Our Fevicol Supply</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. KEY FOCUS AREAS */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="WHY SOURCE FEVICOL FROM US"
            title="The ADHHESI PRO Supply Advantage"
            subtitle="Ensuring every joint delivers pro strength through genuine products, complete pack availability, and prompt site dispatch."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {focusAreas.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div
                  key={idx}
                  className="corporate-card p-6 bg-white border border-brand-border rounded-lg group hover:border-brand-yellow transition-all"
                >
                  <div className="w-12 h-12 rounded-lg bg-brand-light border border-brand-border flex items-center justify-center text-brand-navy group-hover:bg-brand-navy group-hover:text-brand-yellow transition-colors mb-4 shadow-sm">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-lg font-bold text-brand-navy mb-2">{item.title}</h3>
                  <p className="text-sm text-brand-gray leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* 4. PRODUCTS & SERVICES */}
      <section className="py-20 bg-brand-light border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <SectionHeading
                badge="AUTHENTIC FEVICOL RANGE"
                title="Featured Fevicol Formulations"
                subtitle="From classic Fevicol SH to waterproof Marine, heat-resistant HeatX, and acrylic-ready Probond."
                align="left"
                className="mb-0"
              />
            </div>
            <Link to="/products" className="btn-secondary text-xs sm:text-sm self-start md:self-auto">
              <span>View Complete Catalogue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar">
            <button
              type="button"
              onClick={() => setActiveCategory('All')}
              className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                activeCategory === 'All'
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white text-brand-gray border border-brand-border hover:border-brand-navy hover:text-brand-navy'
              }`}
            >
              All Fevicol Products
            </button>
            {categories.map((cat) => (
              <button
                key={cat._id}
                type="button"
                onClick={() => setActiveCategory(cat.name)}
                className={`px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap ${
                  activeCategory === cat.name
                    ? 'bg-brand-navy text-white shadow-sm'
                    : 'bg-white text-brand-gray border border-brand-border hover:border-brand-navy hover:text-brand-navy'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Product Grid */}
          {loading ? (
            <Loader text="Loading Fevicol product catalogue..." />
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12 bg-white rounded-lg border border-brand-border">
              <p className="text-brand-gray font-semibold">No products found in this category.</p>
            </div>
          )}

          <div className="text-center mt-12">
            <Link to="/products" className="btn-primary text-sm px-8 py-3">
              <span>Explore All Fevicol Products & Pack Sizes ({products.length})</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 5. BRANDS SHOWCASE */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="BRAND SHOWCASE"
            title="Fevicol & Specialized Lines"
            subtitle="Explore the iconic Fevicol portfolio manufactured by Pidilite Industries."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {brands.map((brand) => (
              <BrandCard key={brand._id} brand={brand} />
            ))}
          </div>
        </div>
      </section>

      {/* 6. BUSINESS SEGMENTS */}
      <section className="py-20 bg-brand-light border-y border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="WHO WE SUPPLY"
            title="Industries & Craft Sectors We Power"
            subtitle="From commercial modular kitchen factories and interior contractors to bespoke joinery workshops."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {segments.slice(0, 6).map((segment) => (
              <SegmentCard key={segment._id} segment={segment} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/business-segments" className="btn-secondary text-sm">
              <span>View All Business Sectors</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 7. VISION & MISSION */}
      <section className="py-20 bg-brand-navy text-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            <div className="bg-white/5 border border-white/10 rounded-lg p-8 sm:p-10 relative">
              <div className="w-10 h-10 rounded bg-brand-yellow text-brand-navy flex items-center justify-center font-bold text-sm mb-4 shadow">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Vision</h3>
              <div className="h-1 w-10 bg-brand-yellow rounded-full mb-4"></div>
              <p className="text-gray-200 text-base leading-relaxed">
                {company?.vision ||
                  'To be the most dependable, trusted, and efficient supply partner for genuine Fevicol adhesives, setting the benchmark for joint integrity, contractor satisfaction, and on-time site logistics.'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/10 rounded-lg p-8 sm:p-10 relative">
              <div className="w-10 h-10 rounded bg-brand-yellow text-brand-navy flex items-center justify-center font-bold text-sm mb-4 shadow">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Our Mission</h3>
              <div className="h-1 w-10 bg-brand-yellow rounded-full mb-4"></div>
              <p className="text-gray-200 text-base leading-relaxed">
                {company?.mission ||
                  'To empower craftsmen, commercial furniture manufacturers, and interior contractors with authentic Fevicol formulations, competitive commercial pricing, and expert substrate guidance to ensure every joint lasts for generations.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 8. ACHIEVEMENTS */}
      <section className="py-20 bg-white border-b border-brand-border">
        <div className="max-w-5xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="GROWTH TIMELINE"
            title="Distribution Milestones & Scale"
            subtitle="Tracing our trajectory in delivering authentic Fevicol solutions to commercial builders and contractors nationwide."
            align="center"
          />

          <div className="mt-8">
            {achievements.map((item, idx) => (
              <AchievementCard
                key={item._id}
                achievement={item}
                isLast={idx === achievements.length - 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 9. LEADERSHIP PREVIEW */}
      <section className="py-20 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="MANAGEMENT & LOGISTICS"
            title="Leadership Driven by Supply Integrity"
            subtitle="Meet the executive team committed to prompt dispatch, contractor support, and verified Fevicol authenticity."
            align="center"
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {leadership.map((leader) => (
              <LeadershipCard key={leader._id} leader={leader} />
            ))}
          </div>

          <div className="text-center mt-10">
            <Link to="/leadership" className="btn-secondary text-sm">
              <span>Read Full Executive Bios</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 10. CALL TO ACTION */}
      <section className="py-16 bg-brand-navy border-t-2 border-brand-yellow text-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-brand-yellow/20 text-brand-yellow border border-brand-yellow/30">
            <span>DIRECT CONTRACTOR WHOLESALE DESK</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight">
            Looking for Bulk Fevicol Supply for Your Project?
          </h2>

          <p className="text-base sm:text-lg text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Get instant wholesale quotes for Fevicol SH, Marine, HeatX, and Probond in 10kg, 20kg,
            50kg pails, and 200kg drums with scheduled site delivery.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link to="/enquiry" className="btn-accent text-sm font-bold px-8 py-3.5">
              <span>Request Wholesale Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              to="/contact"
              className="bg-transparent hover:bg-white/10 text-white border border-white/30 font-semibold text-sm px-8 py-3.5 rounded-md transition-colors"
            >
              <span>Contact Contractor Desk</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
