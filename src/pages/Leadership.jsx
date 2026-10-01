import React, { useState, useEffect } from 'react';
import { Users, ShieldCheck, Quote, Mail } from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import LeadershipCard from '../components/LeadershipCard';
import { Loader } from '../components/Loader';
import API from '../services/api';

const Leadership = () => {
  const [leadership, setLeadership] = useState([]);
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLeadership = async () => {
      try {
        const [leadRes, compRes] = await Promise.all([
          API.get('/leadership'),
          API.get('/company'),
        ]);
        setLeadership(leadRes.data?.data || []);
        setCompany(compRes.data?.data || null);
      } catch (err) {
        console.error('Failed to load leadership data', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeadership();
  }, []);

  const founder = leadership.find((l) => l.order === 1) || leadership[0];
  const executiveTeam = leadership.filter((l) => l._id !== founder?._id);

  return (
    <>
      <SEO
        title="Leadership & Governance | Executive Team"
        description="Meet the leadership guiding ADHHESI PRO towards technological innovation, operational consistency, and industrial customer commitment."
      />

      <Breadcrumbs items={[{ label: 'Leadership' }]} />

      <section className="bg-brand-navy text-white py-14 sm:py-18 border-b-2 border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-brand-yellow border border-brand-yellow/30">
              <Users className="w-4 h-4" />
              EXECUTIVE MANAGEMENT
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Leadership & Governance
            </h1>
            <p className="text-base text-gray-200">
              The visionary professionals directing chemical research, industrial operations, and customer partnerships at ADHHESI PRO.
            </p>
          </div>
        </div>
      </section>

      {/* Founder Spotlight Section */}
      {founder && (
        <section className="py-16 bg-white border-b border-brand-border">
          <div className="max-w-7xl mx-auto px-4 sm:px-8">
            <div className="bg-brand-light border border-brand-border rounded-xl p-8 sm:p-12 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
                <div className="lg:col-span-4">
                  <div className="rounded-lg overflow-hidden border-2 border-brand-border shadow-md">
                    <img
                      src={
                        founder.photo ||
                        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80'
                      }
                      alt={founder.name}
                      className="w-full h-80 sm:h-96 object-cover object-top"
                    />
                  </div>
                </div>

                <div className="lg:col-span-8 space-y-4">
                  <span className="text-xs font-bold text-brand-yellow uppercase tracking-widest bg-brand-navy px-3 py-1 rounded">
                    Founder's Perspective
                  </span>
                  <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
                    {founder.name}
                  </h2>
                  <p className="text-sm font-semibold text-brand-navy-light">
                    {founder.designation}
                  </p>
                  <p className="text-base text-brand-gray leading-relaxed">{founder.bio}</p>

                  {founder.message && (
                    <div className="bg-white p-5 rounded-lg border-l-4 border-brand-yellow shadow-sm mt-4">
                      <div className="flex items-start gap-3">
                        <Quote className="w-6 h-6 text-brand-yellow flex-shrink-0" />
                        <p className="text-sm text-brand-navy-dark italic leading-relaxed">
                          "{founder.message}"
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Executive Directors Grid */}
      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <SectionHeading
            badge="OPERATIONAL DIRECTORS"
            title="Executive Management Team"
            subtitle="Committed to maintaining stringent laboratory benchmarks and uninterrupted supply chain delivery."
            align="center"
          />

          {loading ? (
            <Loader text="Loading leadership profiles..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {executiveTeam.map((leader) => (
                <LeadershipCard key={leader._id} leader={leader} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Leadership;
