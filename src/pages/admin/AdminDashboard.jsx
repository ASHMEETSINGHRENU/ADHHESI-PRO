import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Package,
  Layers,
  Award,
  Briefcase,
  Inbox,
  ArrowRight,
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
} from 'lucide-react';
import API from '../../services/api';
import { Loader } from '../../components/Loader';

const AdminDashboard = () => {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    brands: 0,
    segments: 0,
    enquiries: 0,
    newEnquiries: 0,
  });

  const [recentEnquiries, setRecentEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const [prodRes, catRes, brandRes, segRes, enqRes] = await Promise.all([
          API.get('/products?limit=1'),
          API.get('/categories'),
          API.get('/brands'),
          API.get('/business-segments'),
          API.get('/enquiries?limit=5'),
        ]);

        const totalEnquiries = enqRes.data?.total || 0;
        const enqList = enqRes.data?.data || [];
        const newCount = enqList.filter((e) => e.status === 'New').length;

        setStats({
          products: prodRes.data?.total || 0,
          categories: catRes.data?.count || 0,
          brands: brandRes.data?.count || 0,
          segments: segRes.data?.count || 0,
          enquiries: totalEnquiries,
          newEnquiries: newCount,
        });

        setRecentEnquiries(enqList);
      } catch (err) {
        console.error('Failed to load dashboard metrics', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) {
    return <Loader text="Loading control metrics..." />;
  }

  const statCards = [
    {
      title: 'Total Products',
      count: stats.products,
      link: '/admin/products',
      icon: Package,
      color: 'text-blue-600',
      bg: 'bg-blue-50',
    },
    {
      title: 'Categories',
      count: stats.categories,
      link: '/admin/categories',
      icon: Layers,
      color: 'text-indigo-600',
      bg: 'bg-indigo-50',
    },
    {
      title: 'Brand Portfolios',
      count: stats.brands,
      link: '/admin/brands',
      icon: Award,
      color: 'text-amber-600',
      bg: 'bg-amber-50',
    },
    {
      title: 'Business Segments',
      count: stats.segments,
      link: '/admin/segments',
      icon: Briefcase,
      color: 'text-emerald-600',
      bg: 'bg-emerald-50',
    },
    {
      title: 'Total Enquiries',
      count: stats.enquiries,
      link: '/admin/enquiries',
      icon: Inbox,
      color: 'text-brand-navy',
      bg: 'bg-slate-100',
      badge: `${stats.newEnquiries} New`,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-brand-navy">ADHHESI PRO CMS Overview</h1>
          <p className="text-xs text-brand-gray mt-1">
            Manage catalogue specifications, inbound customer enquiries, and corporate data.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            to="/admin/products"
            className="btn-primary text-xs py-2 px-4 whitespace-nowrap"
          >
            <span>Manage Products</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
          <Link
            to="/admin/enquiries"
            className="btn-accent text-xs py-2 px-4 whitespace-nowrap"
          >
            <span>View Enquiries</span>
          </Link>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card, idx) => {
          const Icon = card.icon;
          return (
            <Link
              key={idx}
              to={card.link}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm hover:border-brand-yellow transition-all flex flex-col justify-between group"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-brand-gray">{card.title}</span>
                <div className={`p-2 rounded-lg ${card.bg} ${card.color}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>
              <div className="flex items-baseline justify-between">
                <span className="text-2xl font-extrabold text-brand-navy">{card.count}</span>
                {card.badge && (
                  <span className="text-[10px] font-bold bg-brand-yellow text-brand-navy px-2 py-0.5 rounded-full">
                    {card.badge}
                  </span>
                )}
              </div>
            </Link>
          );
        })}
      </div>

      {/* Recent Inbound Enquiries Preview */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-brand-navy">Recent Inbound Quote Enquiries</h2>
            <p className="text-xs text-brand-gray mt-0.5">
              Quotes logged directly from website visitors and potential distributors.
            </p>
          </div>
          <Link
            to="/admin/enquiries"
            className="text-xs font-bold text-brand-navy hover:text-brand-yellow-hover flex items-center gap-1"
          >
            <span>View All ({stats.enquiries})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {recentEnquiries.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Contact Person</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Product Needed</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {recentEnquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-brand-navy">
                      <div>{enq.name}</div>
                      <div className="text-[11px] text-gray-400 font-normal">{enq.email}</div>
                    </td>
                    <td className="py-3 px-4 text-brand-gray font-medium">
                      {enq.companyName || '—'}
                    </td>
                    <td className="py-3 px-4 text-brand-gray max-w-xs truncate">
                      {enq.product}
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`inline-block px-2 py-0.5 rounded-full font-bold text-[10px] ${
                          enq.status === 'New'
                            ? 'bg-amber-100 text-amber-800 border border-amber-300'
                            : enq.status === 'Contacted'
                            ? 'bg-blue-100 text-blue-800'
                            : enq.status === 'In Progress'
                            ? 'bg-purple-100 text-purple-800'
                            : 'bg-emerald-100 text-emerald-800'
                        }`}
                      >
                        {enq.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right">
                      <Link
                        to="/admin/enquiries"
                        className="text-xs font-bold text-brand-navy hover:underline"
                      >
                        Details
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="p-8 text-center text-xs text-brand-gray">
            No customer enquiries recorded yet.
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
