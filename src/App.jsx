import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Public Pages
import Home from './pages/Home';
import About from './pages/About';
import Products from './pages/Products';
import ProductDetail from './pages/ProductDetail';
import Brands from './pages/Brands';
import BrandDetail from './pages/BrandDetail';
import BusinessSegments from './pages/BusinessSegments';
import Leadership from './pages/Leadership';
import Achievements from './pages/Achievements';
import Contact from './pages/Contact';
import Enquiry from './pages/Enquiry';
import NotFound from './pages/NotFound';

// Admin Pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCategories from './pages/admin/AdminCategories';
import AdminBrands from './pages/admin/AdminBrands';
import AdminSegments from './pages/admin/AdminSegments';
import AdminLeadership from './pages/admin/AdminLeadership';
import AdminAchievements from './pages/admin/AdminAchievements';
import AdminEnquiries from './pages/admin/AdminEnquiries';
import AdminCompany from './pages/admin/AdminCompany';

function App() {
  return (
    <Routes>
      {/* Public Pages */}
      <Route path="/" element={<PublicLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="products" element={<Products />} />
        <Route path="products/:slug" element={<ProductDetail />} />
        <Route path="brands" element={<Brands />} />
        <Route path="brands/:slug" element={<BrandDetail />} />
        <Route path="business-segments" element={<BusinessSegments />} />
        <Route path="leadership" element={<Leadership />} />
        <Route path="achievements" element={<Achievements />} />
        <Route path="contact" element={<Contact />} />
        <Route path="enquiry" element={<Enquiry />} />
        <Route path="*" element={<NotFound />} />
      </Route>

      {/* Admin Authentication */}
      <Route path="/admin/login" element={<AdminLogin />} />

      {/* Protected Admin Management Portal */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<AdminDashboard />} />
        <Route path="products" element={<AdminProducts />} />
        <Route path="categories" element={<AdminCategories />} />
        <Route path="brands" element={<AdminBrands />} />
        <Route path="segments" element={<AdminSegments />} />
        <Route path="leadership" element={<AdminLeadership />} />
        <Route path="achievements" element={<AdminAchievements />} />
        <Route path="enquiries" element={<AdminEnquiries />} />
        <Route path="company" element={<AdminCompany />} />
      </Route>
    </Routes>
  );
}

export default App;
