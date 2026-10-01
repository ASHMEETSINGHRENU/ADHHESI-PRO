import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import {
  FileSpreadsheet,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Send,
  HelpCircle,
  ArrowRight,
  Package,
} from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import API from '../services/api';

const Enquiry = () => {
  const [searchParams] = useSearchParams();
  const prefilledProduct = searchParams.get('product') || '';

  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    product: prefilledProduct || '',
    quantity: '',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  useEffect(() => {
    if (prefilledProduct) {
      setFormData((prev) => ({ ...prev, product: prefilledProduct }));
    }
  }, [prefilledProduct]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setSuccessData(null);

    // Validation
    if (!formData.name.trim()) {
      setErrorMessage('Full name is required.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('A valid email address is required.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Contact phone number is required.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMessage('Please provide a message or requirements description of at least 5 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await API.post('/enquiries', {
        name: formData.name,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        product: formData.product || 'General Fevicol Inquiry',
        quantity: formData.quantity || 'Standard Commercial Order',
        message: formData.message,
      });

      if (res.data?.success) {
        setSuccessData(res.data);
        setFormData({
          name: '',
          companyName: '',
          email: '',
          phone: '',
          product: '',
          quantity: '',
          message: '',
        });
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          'Unable to submit your quote request right now. Please try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Request Wholesale Fevicol Quote | Bulk Commercial Supply"
        description="Submit commercial quotation and wholesale bulk requirements for genuine Fevicol adhesives: Fevicol SH, Marine, HeatX, and Probond in pails and drums."
      />

      <Breadcrumbs items={[{ label: 'Request a Quote / Enquiry' }]} />

      <section className="bg-brand-navy text-white py-14 sm:py-18 border-b-2 border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-brand-yellow border border-brand-yellow/30">
              <FileSpreadsheet className="w-4 h-4" />
              COMMERCIAL & WHOLESALE QUOTES
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Request a Wholesale Fevicol Quote
            </h1>
            <p className="text-base text-gray-200">
              Submit your project specifications or commercial quantity requirements. Our supply team
              provides competitive contractor rates, fresh factory batch guarantees, and on-site delivery schedules.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-brand-light">
        <div className="max-w-4xl mx-auto px-4 sm:px-8">
          <div className="bg-white p-8 sm:p-12 rounded-xl border border-brand-border shadow-corporate">
            {successData ? (
              <div className="text-center py-8 space-y-4">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h2 className="text-2xl font-bold text-brand-navy">Quotation Request Logged!</h2>
                <p className="text-sm text-brand-gray max-w-lg mx-auto leading-relaxed">
                  {successData.message ||
                    'Thank you. Your quotation request has been routed to our commercial sales desk. We will contact you shortly with wholesale pricing and delivery schedules.'}
                </p>
                <div className="pt-4 flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setSuccessData(null)}
                    className="btn-secondary text-xs"
                  >
                    Submit Another Quote Request
                  </button>
                  <Link to="/products" className="btn-primary text-xs">
                    Browse Fevicol Range
                  </Link>
                </div>
              </div>
            ) : (
              <>
                <div className="mb-8 pb-4 border-b border-brand-border">
                  <h2 className="text-2xl font-bold text-brand-navy">Fevicol Commercial Requisition Form</h2>
                  <p className="text-xs text-brand-gray mt-1">
                    Fill in your organization details and required Fevicol formulations below.
                  </p>
                </div>

                {errorMessage && (
                  <div className="p-4 mb-6 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="e.g. Ramesh Chandra"
                        className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                        Company / Contractor Firm
                      </label>
                      <input
                        type="text"
                        name="companyName"
                        value={formData.companyName}
                        onChange={handleChange}
                        placeholder="e.g. Royal Woodcraft & Interiors"
                        className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="procurement@company.com"
                        className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+91 98765 43210"
                        className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                        Fevicol Product
                      </label>
                      <input
                        type="text"
                        name="product"
                        value={formData.product}
                        onChange={handleChange}
                        placeholder="e.g. Fevicol Marine / Fevicol HeatX / Fevicol SH"
                        className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                        Pack Sizes & Quantities Needed
                      </label>
                      <input
                        type="text"
                        name="quantity"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="e.g. 20 pails of 50kg / 10 drums of 200kg"
                        className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Delivery Destination & Project Details *
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please mention delivery site location, monthly recurring demand, substrate details (e.g. PVC, laminate, solid wood), and GST invoicing requirements..."
                      className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy resize-y"
                    ></textarea>
                  </div>

                  <div className="pt-4 border-t border-brand-border">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-accent w-full py-3.5 text-sm font-bold flex items-center justify-center gap-2 shadow-md"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-brand-navy border-t-transparent rounded-full animate-spin"></div>
                          <span>Submitting Quotation Request...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Wholesale Request</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                    <p className="text-center text-[11px] text-gray-400 mt-3">
                      All products supplied are 100% genuine factory-sealed Fevicol formulations.
                    </p>
                  </div>
                </form>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Enquiry;
