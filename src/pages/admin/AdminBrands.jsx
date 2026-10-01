import React, { useState, useEffect } from 'react';
import { Award, Plus, Edit2, Trash2, X, CheckCircle } from 'lucide-react';
import API from '../../services/api';
import { Loader } from '../../components/Loader';

const AdminBrands = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({ name: '', slug: '', logo: '', description: '', website: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchBrands = async () => {
    setLoading(true);
    try {
      const res = await API.get('/brands');
      setBrands(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({ name: '', slug: '', logo: '', description: '', website: '' });
    setError('');
    setShowModal(true);
  };

  const openEdit = (b) => {
    setEditingId(b._id);
    setForm({
      name: b.name,
      slug: b.slug,
      logo: b.logo || '',
      description: b.description || '',
      website: b.website || '',
    });
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name.trim()) {
      setError('Brand name is required.');
      return;
    }

    try {
      if (editingId) {
        await API.put(`/brands/${editingId}`, form);
        setSuccess('Brand updated successfully.');
      } else {
        await API.post('/brands', form);
        setSuccess('Brand created successfully.');
      }
      setShowModal(false);
      fetchBrands();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete brand "${name}"?`)) {
      try {
        await API.delete(`/brands/${id}`);
        setSuccess('Brand deleted.');
        fetchBrands();
      } catch (err) {
        setError(err.response?.data?.message || 'Delete failed.');
      }
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-brand-navy flex items-center gap-2">
            <Award className="w-5 h-5 text-brand-yellow" />
            <span>Brand Portfolios</span>
          </h1>
          <p className="text-xs text-brand-gray mt-0.5">
            Manage ADHHESI PRO sub-brands and authorized manufacturer partnerships.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          <span>New Brand</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-md flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {loading ? (
        <Loader text="Loading brands..." />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Brand Name</th>
                <th className="py-3 px-4">Slug</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4">Website</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {brands.map((b) => (
                <tr key={b._id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-brand-navy">{b.name}</td>
                  <td className="py-3 px-4 text-gray-500">/{b.slug}</td>
                  <td className="py-3 px-4 text-brand-gray max-w-sm truncate">{b.description}</td>
                  <td className="py-3 px-4 text-brand-navy">{b.website || '—'}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => openEdit(b)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(b._id, b.name)} className="p-1 text-red-600 hover:bg-red-50 rounded">
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-lg w-full border border-slate-200 p-6 space-y-4">
            <div className="flex items-center justify-between border-b pb-3">
              <h2 className="text-sm font-bold text-brand-navy">
                {editingId ? 'Edit Brand' : 'Create Brand'}
              </h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            {error && <div className="p-2 bg-red-50 text-red-700 text-xs rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Slug (optional)</label>
                <input
                  type="text"
                  value={form.slug}
                  onChange={(e) => setForm({ ...form, slug: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Description</label>
                <textarea
                  rows="2"
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Logo URL</label>
                  <input
                    type="text"
                    value={form.logo}
                    onChange={(e) => setForm({ ...form, logo: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Website URL</label>
                  <input
                    type="text"
                    value={form.website}
                    onChange={(e) => setForm({ ...form, website: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded"
                  />
                </div>
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-1.5 px-4 font-bold">
                  Save
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminBrands;
