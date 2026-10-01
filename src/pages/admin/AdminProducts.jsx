import React, { useState, useEffect } from 'react';
import {
  Package,
  Plus,
  Edit2,
  Trash2,
  Search,
  CheckCircle,
  X,
  AlertCircle,
  ExternalLink,
} from 'lucide-react';
import API from '../../services/api';
import { Loader } from '../../components/Loader';

const AdminProducts = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Form state
  const initialForm = {
    name: '',
    slug: '',
    category: '',
    brand: 'ADHHESI PRO',
    shortDescription: '',
    description: '',
    imagesText: '',
    specifications: [
      { key: 'Viscosity', value: '[Client Input Required]' },
      { key: 'Tensile Shear Strength', value: '[Client Input Required]' },
    ],
    featuresText: '',
    applicationsText: '',
    isFeatured: false,
    status: 'active',
  };

  const [form, setForm] = useState(initialForm);

  const fetchProductsAndCategories = async () => {
    setLoading(true);
    try {
      const [prodRes, catRes] = await Promise.all([
        API.get('/products?limit=100&status='),
        API.get('/categories'),
      ]);
      setProducts(prodRes.data?.data || []);
      setCategories(catRes.data?.data || []);
    } catch (err) {
      console.error('Failed to load products', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProductsAndCategories();
  }, []);

  const openAddModal = () => {
    setEditingId(null);
    setForm({
      ...initialForm,
      category: categories[0]?.name || 'Epoxy & Structural Adhesives',
    });
    setError('');
    setShowModal(true);
  };

  const openEditModal = (p) => {
    setEditingId(p._id);
    setForm({
      name: p.name,
      slug: p.slug,
      category: p.category,
      brand: p.brand || 'ADHHESI PRO',
      shortDescription: p.shortDescription,
      description: p.description,
      imagesText: (p.images || []).join('\n'),
      specifications:
        p.specifications && p.specifications.length > 0
          ? p.specifications
          : [{ key: 'Property', value: 'Standard Value' }],
      featuresText: (p.features || []).join('\n'),
      applicationsText: (p.applications || []).join('\n'),
      isFeatured: p.isFeatured || false,
      status: p.status || 'active',
    });
    setError('');
    setShowModal(true);
  };

  const handleSpecChange = (index, field, value) => {
    const updated = [...form.specifications];
    updated[index][field] = value;
    setForm({ ...form, specifications: updated });
  };

  const addSpecRow = () => {
    setForm({
      ...form,
      specifications: [...form.specifications, { key: '', value: '' }],
    });
  };

  const removeSpecRow = (index) => {
    const updated = form.specifications.filter((_, idx) => idx !== index);
    setForm({ ...form, specifications: updated });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name.trim() || !form.category || !form.shortDescription.trim()) {
      setError('Please fill all required fields (Name, Category, Short Description).');
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      category: form.category,
      brand: form.brand.trim() || 'ADHHESI PRO',
      shortDescription: form.shortDescription.trim(),
      description: form.description.trim() || form.shortDescription.trim(),
      images: form.imagesText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      specifications: form.specifications.filter((s) => s.key.trim() && s.value.trim()),
      features: form.featuresText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      applications: form.applicationsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      isFeatured: form.isFeatured,
      status: form.status,
    };

    try {
      if (editingId) {
        await API.put(`/products/${editingId}`, payload);
        setSuccess('Product successfully updated!');
      } else {
        await API.post('/products', payload);
        setSuccess('Product successfully created!');
      }
      setShowModal(false);
      fetchProductsAndCategories();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to permanently delete "${name}"?`)) {
      try {
        await API.delete(`/products/${id}`);
        setSuccess('Product deleted.');
        fetchProductsAndCategories();
      } catch (err) {
        setError(err.response?.data?.message || 'Delete failed.');
      }
    }
  };

  const filtered = products.filter(
    (p) =>
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.category.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-brand-navy flex items-center gap-2">
            <Package className="w-5 h-5 text-brand-yellow" />
            <span>Products Management</span>
          </h1>
          <p className="text-xs text-brand-gray mt-0.5">
            Add, update, or remove industrial adhesives, epoxies, and technical specifications.
          </p>
        </div>

        <button onClick={openAddModal} className="btn-primary text-xs py-2.5 px-4 self-start sm:self-auto">
          <Plus className="w-4 h-4" />
          <span>Add New Product</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess('')} className="text-green-600 hover:text-green-800">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Filter / Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between gap-4">
        <div className="relative w-full max-w-sm">
          <input
            type="text"
            placeholder="Search by name or category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-9 pr-4 py-2 text-xs bg-slate-50 border border-slate-200 rounded-md focus:bg-white focus:outline-none focus:ring-2 focus:ring-brand-navy"
          />
          <Search className="w-3.5 h-3.5 text-gray-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs text-brand-gray whitespace-nowrap">
          Total Products: <strong className="text-brand-navy">{filtered.length}</strong>
        </span>
      </div>

      {/* Table */}
      {loading ? (
        <Loader text="Loading products table..." />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase tracking-wider font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Product Name</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Brand</th>
                  <th className="py-3 px-4">Specs Count</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((p) => (
                  <tr key={p._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-brand-navy">
                      <div className="flex items-center gap-2">
                        {p.isFeatured && (
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-yellow" title="Featured Product"></span>
                        )}
                        <span>{p.name}</span>
                      </div>
                      <div className="text-[11px] text-gray-400 font-normal">slug: /{p.slug}</div>
                    </td>
                    <td className="py-3 px-4 text-brand-gray">{p.category}</td>
                    <td className="py-3 px-4 text-brand-gray">{p.brand}</td>
                    <td className="py-3 px-4 text-brand-gray">
                      {p.specifications?.length || 0} items
                    </td>
                    <td className="py-3 px-4">
                      <span
                        className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          p.status === 'active'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-700'
                        }`}
                      >
                        {p.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2">
                      <a
                        href={`/products/${p.slug}`}
                        target="_blank"
                        rel="noreferrer"
                        title="View Public Page"
                        className="inline-block p-1.5 text-gray-400 hover:text-brand-navy"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                      <button
                        onClick={() => openEditModal(p)}
                        title="Edit Product"
                        className="p-1.5 text-blue-600 hover:bg-blue-50 rounded"
                      >
                        <Edit2 className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => handleDelete(p._id, p.name)}
                        title="Delete Product"
                        className="p-1.5 text-red-600 hover:bg-red-50 rounded"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Product Edit/Create Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white rounded-xl shadow-2xl max-w-3xl w-full my-8 border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <h2 className="text-sm font-bold text-brand-navy">
                {editingId ? 'Edit Product Catalogue Item' : 'Add New Product Formulation'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-brand-navy">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4 overflow-y-auto flex-1">
              {error && (
                <div className="p-3 bg-red-50 text-red-700 text-xs rounded border border-red-200">
                  {error}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Product Name *</label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-brand-navy focus:outline-none"
                    placeholder="e.g. Adhhesi Pro Bond EP-900"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Slug (leave empty to auto-generate)
                  </label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-brand-navy focus:outline-none"
                    placeholder="e.g. adhhesi-pro-bond-ep-900"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-brand-navy focus:outline-none"
                  >
                    {categories.map((c) => (
                      <option key={c._id} value={c.name}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Brand Portfolio</label>
                  <input
                    type="text"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-brand-navy focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Status</label>
                  <select
                    value={form.status}
                    onChange={(e) => setForm({ ...form, status: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-brand-navy focus:outline-none"
                  >
                    <option value="active">Active</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Short Description *</label>
                <textarea
                  rows="2"
                  required
                  value={form.shortDescription}
                  onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-brand-navy focus:outline-none"
                  placeholder="Summary for product card preview..."
                ></textarea>
              </div>

              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Full Technical Overview</label>
                <textarea
                  rows="3"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-brand-navy focus:outline-none"
                  placeholder="In-depth chemical formulation context..."
                ></textarea>
              </div>

              {/* Dynamic Specifications Editor */}
              <div className="pt-2 border-t border-slate-200">
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-brand-navy">
                    Dynamic Technical Specifications (MongoDB Key-Value Pairs)
                  </label>
                  <button
                    type="button"
                    onClick={addSpecRow}
                    className="text-xs font-bold text-blue-600 hover:underline flex items-center gap-1"
                  >
                    <Plus className="w-3 h-3" />
                    <span>Add Parameter</span>
                  </button>
                </div>

                <div className="space-y-2">
                  {form.specifications.map((spec, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Property Name (e.g. Viscosity)"
                        value={spec.key}
                        onChange={(e) => handleSpecChange(idx, 'key', e.target.value)}
                        className="w-1/3 px-3 py-1.5 text-xs border border-slate-300 rounded"
                      />
                      <input
                        type="text"
                        placeholder="Standard Value (e.g. 1500 cP)"
                        value={spec.value}
                        onChange={(e) => handleSpecChange(idx, 'value', e.target.value)}
                        className="w-2/3 px-3 py-1.5 text-xs border border-slate-300 rounded"
                      />
                      <button
                        type="button"
                        onClick={() => removeSpecRow(idx)}
                        className="text-red-500 hover:text-red-700 p-1"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Features & Applications */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2 border-t border-slate-200">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Features (one per line)
                  </label>
                  <textarea
                    rows="3"
                    value={form.featuresText}
                    onChange={(e) => setForm({ ...form, featuresText: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                    placeholder="High tensile shear strength&#10;Zero shrinkage&#10;Moisture resistant"
                  ></textarea>
                </div>

                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">
                    Applications (one per line)
                  </label>
                  <textarea
                    rows="3"
                    value={form.applicationsText}
                    onChange={(e) => setForm({ ...form, applicationsText: e.target.value })}
                    className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                    placeholder="Structural steel bonding&#10;Granite facade cladding&#10;Machine vibration mounts"
                  ></textarea>
                </div>
              </div>

              {/* Images */}
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">
                  Image URLs (one URL per line)
                </label>
                <textarea
                  rows="2"
                  value={form.imagesText}
                  onChange={(e) => setForm({ ...form, imagesText: e.target.value })}
                  className="w-full px-3 py-2 text-xs border border-slate-300 rounded"
                  placeholder="https://..."
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-2">
                <input
                  type="checkbox"
                  id="isFeatured"
                  checked={form.isFeatured}
                  onChange={(e) => setForm({ ...form, isFeatured: e.target.checked })}
                  className="rounded text-brand-navy focus:ring-brand-navy"
                />
                <label htmlFor="isFeatured" className="text-xs font-semibold text-brand-navy">
                  Highlight as Featured Product on Homepage
                </label>
              </div>

              <div className="pt-4 border-t border-slate-200 flex items-center justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-gray-600 hover:bg-slate-100 rounded"
                >
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-2 px-5 font-bold">
                  <span>{editingId ? 'Save Changes' : 'Create Product'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminProducts;
