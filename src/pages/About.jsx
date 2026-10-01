import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck,
  Award,
  Compass,
  CheckCircle2,
  ArrowRight,
  Target,
  HeartHandshake,
  Layers,
  Truck,
  Droplets,
  Flame,
} from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import LeadershipCard from '../components/LeadershipCard';
import AchievementCard from '../components/AchievementCard';
import { Loader } from '../components/Loader';
import API from '../services/api';

const About = () => {
  const [company, setCompany] = useState(null);
  const [leadership, setLeadership] = useState([]);
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const [compRes, leadRes, achRes] = await Promise.all([
          API.get('/company'),
          API.get('/leadership'),
          API.get('/achievements'),
        ]);
        setCompany(compRes.data?.data || null);
        setLeadership(leadRes.data?.data || []);
        setAchievements(achRes.data?.data || []);
      } catch (err) {
        console.error('Error loading about data:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchAboutData();
  }, []);

  const coreValues = [
    {
      icon: ShieldCheck,
      title: '100% Genuine Authenticity',
      desc: 'Supplying strictly verified factory-fresh Fevicol formulations with guaranteed shelf life and active adhesive polymer solids.',
    },
    {
      icon: Truck,
      title: 'Direct-to-Site Logistics',
      desc: 'Scheduled warehouse dispatch directly to job sites, modular furniture factories, and interior construction projects.',
    },
    {
      icon: Target,
      title: 'Technical Substrate Guidance',
      desc: 'Expert advisory helping craftsmen choose the right Fevicol formulation (Marine vs HeatX vs Probond) for every substrate.',
    },
    {
      icon: HeartHandshake,
      title: 'Contractor Volume Support',
      desc: 'Transparent wholesale commercial pricing, GST billing, and dedicated relationship management for high-volume builders.',
    },
  ];

  return (
    <>
      <SEO
        title="About Us | Dedicated Fevicol Supply & Showcase Platform"
        description="Learn about ADHHESI PRO - your premier supply partner for authentic Fevicol adhesives, wholesale contractor delivery, and technical guidance."
      />

      <Breadcrumbs items={[{ label: 'About Us' }]} />

      {/* Hero Banner */}
      <section className="bg-brand-navy text-white py-16 sm:py-20 border-b-2 border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-brand-yellow border border-brand-yellow/30">
              <ShieldCheck className="w-4 h-4" />
              ABOUT ADHHESI PRO
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Supplying Fevicol Quality for Every Woodworking Joint
            </h1>
            <p className="text-base sm:text-lg text-gray-200 leading-relaxed">
              We connect interior contractors, commercial furniture manufacturers, and master
              craftsmen with genuine Fevicol adhesives to guarantee pro-grade bonding strength.
            </p>
          </div>
        </div>
      </section>

      {/* Company Story / Intro */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <SectionHeading
                badge="OUR COMMITMENT"
                title="The Benchmark in Adhesive Supply & Showcase"
                align="left"
                className="mb-4"
              />
              <p className="text-base text-brand-gray leading-relaxed">
                {company?.aboutFull ||
                  'ADHHESI PRO is a premier commercial distributor and supplier of genuine Fevicol adhesives. Built upon our core promise—"Har Joint Mein Pro Strength"—we supply the complete portfolio of Pidilite Fevicol solutions, including Fevicol SH, Fevicol Marine, Fevicol HeatX, Fevicol Probond, and Fevicol Hi-Per. We provide verified authentic fresh batches, direct contractor site logistics, volume wholesale discounts, and dedicated technical guidance.'}
              </p>
              <p className="text-base text-brand-gray leading-relaxed">
                Whether pressing large veneer sheets in a factory cold press, securing moisture-proof
                kitchen shutters with <strong>Fevicol Marine</strong>, or adhering curved vertical laminations
                with heat-resistant <strong>Fevicol HeatX</strong>, our mission is to ensure every joint delivers
                enduring strength.
              </p>

              {/* Stats Strip */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 border-t border-brand-border">
                <div>
                  <p className="text-2xl font-extrabold text-brand-navy">
                    {company?.stats?.yearsExperience || 'XX+'}
                  </p>
                  <p className="text-xs text-brand-gray">Years Experience</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-navy">
                    {company?.stats?.productsCount || 'XX+'}
                  </p>
                  <p className="text-xs text-brand-gray">Fevicol Formulations</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-navy">
                    {company?.stats?.segmentsCount || 'XX+'}
                  </p>
                  <p className="text-xs text-brand-gray">Contractor Sectors</p>
                </div>
                <div>
                  <p className="text-2xl font-extrabold text-brand-navy">
                    {company?.stats?.brandsCount || 'XX+'}
                  </p>
                  <p className="text-xs text-brand-gray">Brand Solutions</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6">
              <div className="rounded-lg overflow-hidden border border-brand-border shadow-corporate bg-brand-light">
                <img
                  src="https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=900&q=80"
                  alt="Precision Joinery with Genuine Fevicol Adhesives"
                  className="w-full h-80 sm:h-96 object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Banner */}
      <section className="py-20 bg-brand-navy text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="DIRECTION & PURPOSE"
            title="Vision & Mission"
            subtitle="Guiding our commitment to genuine product supply and contractor satisfaction."
            align="center"
            light={true}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-10">
            <div className="bg-white/5 border border-white/15 rounded-lg p-8">
              <div className="w-10 h-10 rounded bg-brand-yellow text-brand-navy flex items-center justify-center font-bold mb-4">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Our Vision</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {company?.vision ||
                  'To be the most dependable, trusted, and efficient supply partner for genuine Fevicol adhesives, setting the benchmark for joint integrity, contractor satisfaction, and on-time site logistics.'}
              </p>
            </div>

            <div className="bg-white/5 border border-white/15 rounded-lg p-8">
              <div className="w-10 h-10 rounded bg-brand-yellow text-brand-navy flex items-center justify-center font-bold mb-4">
                <Target className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">Our Mission</h3>
              <p className="text-gray-200 text-sm leading-relaxed">
                {company?.mission ||
                  'To empower craftsmen, commercial furniture manufacturers, and interior contractors with authentic Fevicol formulations, competitive commercial pricing, and expert substrate guidance to ensure every joint lasts for generations.'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="OUR CORE PILLARS"
            title="Values That Drive Our Supply Network"
            subtitle="The standards that govern our warehouse inventory, packaging integrity, and customer partnerships."
            align="center"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {coreValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div
                  key={idx}
                  className="corporate-card p-6 bg-white border border-brand-border rounded-lg text-center group hover:border-brand-yellow transition-all"
                >
                  <div className="w-12 h-12 rounded-full bg-brand-light border border-brand-border flex items-center justify-center mx-auto mb-4 text-brand-navy group-hover:bg-brand-navy group-hover:text-brand-yellow transition-colors">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-bold text-brand-navy mb-2">{val.title}</h3>
                  <p className="text-xs text-brand-gray leading-relaxed">{val.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Leadership Preview */}
      <section className="py-20 bg-brand-light border-t border-brand-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <SectionHeading
              badge="EXECUTIVE GOVERNANCE"
              title="Leadership Team"
              subtitle="Guided by industry professionals committed to product performance."
              align="left"
              className="mb-0"
            />
            <Link to="/leadership" className="btn-secondary text-xs sm:text-sm self-start md:self-auto">
              <span>View Full Leadership</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {leadership.map((leader) => (
              <LeadershipCard key={leader._id} leader={leader} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-brand-navy text-white text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white">
            Source Genuine Fevicol Adhesives For Your Next Project
          </h2>
          <p className="text-sm sm:text-base text-gray-300">
            Request commercial wholesale price lists, scheduled delivery contracts, or substrate adhesive advisory.
          </p>
          <div className="pt-2">
            <Link to="/enquiry" className="btn-accent text-sm font-bold px-8 py-3">
              <span>Request Wholesale Quotation</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
