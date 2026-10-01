import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
  Truck,
} from 'lucide-react';
import SEO from '../components/SEO';
import SectionHeading from '../components/SectionHeading';
import Breadcrumbs from '../components/Breadcrumbs';
import API from '../services/api';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    companyName: '',
    email: '',
    phone: '',
    subject: 'Wholesale Fevicol Supply',
    message: '',
  });

  const [loading, setLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrorMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage(null);
    setStatusMessage(null);

    if (!formData.name.trim()) {
      setErrorMessage('Please enter your full name.');
      return;
    }
    if (!formData.email.trim() || !formData.email.includes('@')) {
      setErrorMessage('Please provide a valid email address.');
      return;
    }
    if (!formData.phone.trim()) {
      setErrorMessage('Please provide a contact phone number.');
      return;
    }
    if (!formData.message.trim() || formData.message.trim().length < 5) {
      setErrorMessage('Please provide a message with at least 5 characters.');
      return;
    }

    setLoading(true);

    try {
      const res = await API.post('/enquiries', {
        name: formData.name,
        companyName: formData.companyName,
        email: formData.email,
        phone: formData.phone,
        product: formData.subject,
        quantity: 'Contact Form Inquiry',
        message: formData.message,
      });

      if (res.data?.success) {
        setStatusMessage(
          res.data.message ||
            'Thank you! Your message has been received. Our sales desk will contact you shortly.'
        );
        setFormData({
          name: '',
          companyName: '',
          email: '',
          phone: '',
          subject: 'Wholesale Fevicol Supply',
          message: '',
        });
      }
    } catch (err) {
      setErrorMessage(
        err.response?.data?.message ||
          'Failed to transmit your message. Please check connection and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Contact Us | Genuine Fevicol Contractor Desk"
        description="Get in touch with ADHHESI PRO corporate office and contractor sales desk for genuine Fevicol wholesale orders and technical advice."
      />

      <Breadcrumbs items={[{ label: 'Contact Us' }]} />

      <section className="bg-brand-navy text-white py-14 sm:py-18 border-b-2 border-brand-yellow">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-white/10 text-brand-yellow border border-brand-yellow/30">
              <Mail className="w-4 h-4" />
              GET IN TOUCH
            </span>
            <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight">
              Contact Contractor Sales Desk
            </h1>
            <p className="text-base text-gray-200">
              Inquire regarding bulk commercial rates, scheduled project deliveries, contractor rebate schemes, or technical formulation queries.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Contact Details & Info */}
            <div className="lg:col-span-5 space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-brand-navy mb-3">
                  Direct Inquiries & Distribution Hub
                </h2>
                <p className="text-sm text-brand-gray leading-relaxed">
                  Our team assists furniture manufacturers, carpenters, and interior designers in selecting the right Fevicol product and scheduling warehouse dispatches.
                </p>
              </div>

              <div className="space-y-5">
                <div className="flex items-start gap-4 p-4 rounded-lg bg-brand-light border border-brand-border">
                  <div className="w-10 h-10 rounded-md bg-brand-navy text-brand-yellow flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-navy">Warehouse & Office Address</h3>
                    <p className="text-xs text-brand-gray mt-1 leading-relaxed">
                      [Corporate Office & Distribution Hub – Client Content Required]
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-brand-light border border-brand-border">
                  <div className="w-10 h-10 rounded-md bg-brand-navy text-brand-yellow flex items-center justify-center flex-shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-navy">Email Desk</h3>
                    <p className="text-xs text-brand-gray mt-1">
                      <a href="mailto:contact@adhhesipro.com" className="hover:text-brand-navy underline">
                        contact@adhhesipro.com
                      </a>
                    </p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Average response time: &lt; 24 hours</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-brand-light border border-brand-border">
                  <div className="w-10 h-10 rounded-md bg-brand-navy text-brand-yellow flex items-center justify-center flex-shrink-0">
                    <Clock className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-navy">Operating Hours</h3>
                    <p className="text-xs text-brand-gray mt-1">Monday - Saturday: 9:00 AM - 6:30 PM (IST)</p>
                    <p className="text-[11px] text-gray-400 mt-0.5">Closed on National Holidays</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-lg bg-brand-light border border-brand-border">
                  <div className="w-10 h-10 rounded-md bg-brand-navy text-brand-yellow flex items-center justify-center flex-shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-brand-navy">Contractor Sales Helpline</h3>
                    <p className="text-xs text-brand-gray mt-1">
                      [Contractor Sales Helpline – Client Content Required]
                    </p>
                  </div>
                </div>
              </div>

              {/* Map Placeholder */}
              <div className="rounded-lg overflow-hidden border border-brand-border h-48 bg-brand-light flex items-center justify-center text-center p-4">
                <div>
                  <MapPin className="w-8 h-8 text-brand-yellow mx-auto mb-2" />
                  <p className="text-xs font-bold text-brand-navy">Warehouse Geolocation</p>
                  <p className="text-[11px] text-brand-gray">[Google Maps Coordinates – Client Input Required]</p>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-7">
              <div className="bg-white p-8 sm:p-10 rounded-xl border border-brand-border shadow-corporate">
                <h2 className="text-2xl font-bold text-brand-navy mb-2">Send Us a Direct Message</h2>
                <p className="text-xs text-brand-gray mb-6">
                  Please fill out the form below. Required fields are marked with an asterisk (*).
                </p>

                {statusMessage && (
                  <div className="p-4 mb-6 rounded-md bg-green-50 border border-green-200 text-green-800 text-sm flex items-start gap-2.5">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span>{statusMessage}</span>
                  </div>
                )}

                {errorMessage && (
                  <div className="p-4 mb-6 rounded-md bg-red-50 border border-red-200 text-red-800 text-sm flex items-start gap-2.5">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        placeholder="e.g. Rahul Sharma"
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
                        placeholder="e.g. Apex Modular Kitchens"
                        className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
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
                        placeholder="you@company.com"
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

                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Subject / Interest Area
                    </label>
                    <select
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                    >
                      <option value="Wholesale Fevicol Supply">Wholesale Fevicol Supply</option>
                      <option value="Contractor Bulk Volume Scheme">Contractor Bulk Volume Scheme</option>
                      <option value="Fevicol Technical & Substrate Guidance">Fevicol Technical & Substrate Guidance</option>
                      <option value="Dealership / Retail Stockist Enquiry">Dealership / Retail Stockist Enquiry</option>
                      <option value="Scheduled Site Delivery Logistics">Scheduled Site Delivery Logistics</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1.5">
                      Message / Specifications *
                    </label>
                    <textarea
                      name="message"
                      rows="5"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Please describe your project, required Fevicol formulations, pack sizes, delivery location, or monthly demand..."
                      className="w-full px-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy resize-y"
                    ></textarea>
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={loading}
                      className="btn-primary w-full py-3 text-sm font-bold flex items-center justify-center gap-2"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Transmitting Message...</span>
                        </>
                      ) : (
                        <>
                          <span>Transmit Message</span>
                          <Send className="w-4 h-4" />
                        </>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
