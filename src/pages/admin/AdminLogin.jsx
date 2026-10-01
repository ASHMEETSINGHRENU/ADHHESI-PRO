import React, { useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Lock, Mail, AlertCircle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import logoImg from '../../assets/logo.jpg';
import SEO from '../../components/SEO';

const AdminLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const { login } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || '/admin';

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email || !password) {
      setError('Please provide email and password.');
      return;
    }

    setLoading(true);
    const res = await login(email, password);
    setLoading(false);

    if (res.success) {
      navigate(from, { replace: true });
    } else {
      setError(res.message || 'Invalid administrator credentials.');
    }
  };

  return (
    <>
      <SEO title="Admin Login | ADHHESI PRO Control Center" />

      <div className="min-h-screen bg-brand-light flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md text-center">
          {/* Logo container */}
          <div className="bg-white p-4 rounded-xl shadow-corporate border border-brand-border inline-block mb-4">
            <img
              src={logoImg}
              alt="ADHHESI PRO"
              className="h-14 w-auto object-contain mx-auto"
            />
          </div>

          <h2 className="text-2xl font-extrabold text-brand-navy">
            ADHHESI PRO CMS Portal
          </h2>
          <p className="mt-1 text-xs font-semibold text-brand-yellow uppercase tracking-wider">
            HAR JOINT MEIN PRO STRENGTH
          </p>
        </div>

        <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-md">
          <div className="bg-white py-8 px-6 shadow-corporate sm:rounded-xl sm:px-10 border border-brand-border">
            {error && (
              <div className="mb-4 p-3 rounded-md bg-red-50 border border-red-200 text-red-700 text-xs flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                  Admin Email
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="admin@adhhesipro.com"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                  />
                  <Mail className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy uppercase tracking-wider mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••••••"
                    className="w-full pl-9 pr-3.5 py-2.5 text-sm bg-brand-light border border-brand-border rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy text-brand-navy"
                  />
                  <Lock className="w-4 h-4 text-gray-400 absolute left-3 top-3" />
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  disabled={loading}
                  className="btn-primary w-full py-2.5 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2"
                >
                  {loading ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Sign In to Dashboard</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </>
                  )}
                </button>
              </div>

              {/* Seed Helper info for testing */}
              <div className="mt-4 p-3 bg-brand-light rounded border border-brand-border text-[11px] text-brand-gray space-y-1">
                <p className="font-bold text-brand-navy">Default Seed Credentials:</p>
                <p>Email: <code className="bg-white px-1 py-0.5 rounded border border-brand-border">admin@adhhesipro.com</code></p>
                <p>Password: <code className="bg-white px-1 py-0.5 rounded border border-brand-border">Admin@123456</code></p>
              </div>
            </form>

            <div className="mt-6 text-center pt-4 border-t border-brand-border">
              <Link to="/" className="text-xs text-brand-navy hover:underline font-semibold">
                ← Return to Public Website
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminLogin;
