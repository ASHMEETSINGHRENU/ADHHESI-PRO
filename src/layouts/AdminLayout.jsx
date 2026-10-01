import React from 'react';
import { Outlet, Navigate, Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Package,
  Layers,
  Award,
  Briefcase,
  Users,
  Trophy,
  Inbox,
  Building,
  LogOut,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import logoImg from '../assets/logo.jpg';

const AdminLayout = () => {
  const { admin, loading, logout } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-brand-light">
        <div className="w-8 h-8 border-3 border-brand-navy border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!admin) {
    return <Navigate to="/admin/login" state={{ from: location }} replace />;
  }

  const menuItems = [
    { name: 'Dashboard', path: '/admin', icon: LayoutDashboard },
    { name: 'Inbound Enquiries', path: '/admin/enquiries', icon: Inbox },
    { name: 'Products Catalogue', path: '/admin/products', icon: Package },
    { name: 'Categories', path: '/admin/categories', icon: Layers },
    { name: 'Brands', path: '/admin/brands', icon: Award },
    { name: 'Business Segments', path: '/admin/segments', icon: Briefcase },
    { name: 'Leadership Team', path: '/admin/leadership', icon: Users },
    { name: 'Achievements', path: '/admin/achievements', icon: Trophy },
    { name: 'Company & Stats', path: '/admin/company', icon: Building },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-brand-navy text-white flex-shrink-0 flex flex-col border-r border-brand-navy-light shadow-xl">
        {/* Brand header */}
        <div className="p-4 border-b border-white/10 bg-white">
          <Link to="/admin" className="block">
            <img
              src={logoImg}
              alt="ADHHESI PRO Admin"
              className="h-10 w-auto object-contain mx-auto"
            />
          </Link>
          <p className="text-[10px] text-center font-bold text-brand-navy uppercase tracking-wider mt-1">
            MANAGEMENT CONTROL PORTAL
          </p>
        </div>

        {/* Navigation Menu */}
        <nav className="p-3 space-y-1 flex-1 overflow-y-auto">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive =
              item.path === '/admin'
                ? location.pathname === '/admin'
                : location.pathname.startsWith(item.path);

            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-md text-xs font-semibold transition-colors ${
                  isActive
                    ? 'bg-brand-yellow text-brand-navy font-bold shadow-sm'
                    : 'text-gray-300 hover:bg-white/10 hover:text-white'
                }`}
              >
                <Icon className="w-4 h-4 flex-shrink-0" />
                <span>{item.name}</span>
              </Link>
            );
          })}
        </nav>

        {/* Quick Public Site Link & User Box */}
        <div className="p-3 border-t border-white/10 bg-brand-navy-dark space-y-2">
          <Link
            to="/"
            target="_blank"
            className="flex items-center justify-between text-xs text-brand-yellow hover:underline px-2 py-1"
          >
            <span className="flex items-center gap-1.5 font-medium">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Live Website</span>
            </span>
          </Link>

          <div className="pt-2 border-t border-white/10 flex items-center justify-between px-2">
            <div>
              <p className="text-xs font-bold text-white leading-tight">{admin.username}</p>
              <p className="text-[10px] text-gray-400 capitalize">{admin.role}</p>
            </div>
            <button
              onClick={logout}
              title="Logout"
              className="text-gray-400 hover:text-red-400 p-1.5 rounded transition-colors"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 px-6 py-3.5 flex items-center justify-between shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-brand-navy bg-brand-light px-2.5 py-1 rounded border border-brand-border">
              ADHHESI PRO CMS
            </span>
            <span className="text-xs text-gray-400">| Secure Environment</span>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="text-brand-gray hidden sm:inline">
              Logged in as <strong className="text-brand-navy">{admin.email}</strong>
            </span>
            <button
              onClick={logout}
              className="px-3 py-1 bg-slate-100 hover:bg-red-50 hover:text-red-700 text-brand-gray rounded border border-slate-200 font-semibold transition-colors flex items-center gap-1"
            >
              <LogOut className="w-3 h-3" />
              <span>Logout</span>
            </button>
          </div>
        </header>

        {/* Admin Page Body */}
        <main className="p-6 flex-1 bg-slate-50">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
