import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Briefcase,
  Building2,
  Hammer,
  Truck,
  Package,
  Wrench,
  Cpu,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
} from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import SegmentCard from '../components/SegmentCard';
import { Loader } from '../components/Loader';
import API from '../services/api';

const BusinessSegments = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSegments = async () => {
      try {
        const res = await API.get('/business-segments');
        setSegments(res.data?.data || []);
      } catch (err) {
        console.error('Failed to load segments', err);
      } finally {
        setLoading(false);
      }
    };
    fetchSegments();
  }, []);

  return (
    <>
      <SEO
        title="Business Segments & Industries Served | Fevicol Applications"
        description="Discover the manufacturing, interior fit-out, modular kitchen, PVC/acrylic paneling, and woodworking sectors powered by genuine Fevicol adhesives."
      />

      <Breadcrumbs items={[{ label: 'Business Segments' }]} />

      <section className="bg-brand-navy text-white py-14 sm:py-18 border-b-2 border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-brand-yellow border border-brand-yellow/30">
              <Briefcase className="w-4 h-4" />
              INDUSTRIES & CONTRACTORS
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Business Segments Powered by Fevicol
            </h1>
            <p className="text-base text-gray-200 leading-relaxed">
              Supplying tailored Fevicol adhesive solutions for modular furniture, high-pressure laminates,
              waterproof marine joinery, and commercial interior fit-outs.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          {loading ? (
            <Loader text="Loading business segments..." />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {segments.map((seg) => (
                <SegmentCard key={seg._id} segment={seg} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Segment Technical Support CTA */}
      <section className="py-16 bg-white border-t border-brand-border">
        <div className="max-w-4xl mx-auto px-4 sm:px-8 text-center space-y-4">
          <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy">
            Executing a High-Volume Commercial Woodworking or Interior Project?
          </h2>
          <p className="text-sm sm:text-base text-brand-gray">
            Our contractor team coordinates scheduled batch deliveries, bulk pail and drum pricing, and on-site adhesive application guidance.
          </p>
          <div className="pt-2">
            <Link to="/enquiry" className="btn-primary text-sm">
              <span>Request Wholesale Contractor Pricing</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};

export default BusinessSegments;
