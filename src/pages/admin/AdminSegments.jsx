import React, { useState, useEffect } from 'react';
import { Briefcase, Plus, Edit2, Trash2, X, CheckCircle } from 'lucide-react';
import API from '../../services/api';
import { Loader } from '../../components/Loader';

const AdminSegments = () => {
  const [segments, setSegments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    slug: '',
    icon: 'Building2',
    description: '',
    applicationsText: '',
    image: '',
    order: 0,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchSegments = async () => {
    setLoading(true);
    try {
      const res = await API.get('/business-segments');
      setSegments(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSegments();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      slug: '',
      icon: 'Building2',
      description: '',
      applicationsText: '',
      image: '',
      order: segments.length + 1,
    });
    setError('');
    setShowModal(true);
  };

  const openEdit = (seg) => {
    setEditingId(seg._id);
    setForm({
      name: seg.name,
      slug: seg.slug,
      icon: seg.icon || 'Building2',
      description: seg.description || '',
      applicationsText: (seg.applications || []).join('\n'),
      image: seg.image || '',
      order: seg.order || 0,
    });
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name.trim() || !form.description.trim()) {
      setError('Segment name and description are required.');
      return;
    }

    const payload = {
      name: form.name.trim(),
      slug: form.slug.trim(),
      icon: form.icon,
      description: form.description.trim(),
      applications: form.applicationsText
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      image: form.image.trim(),
      order: form.order,
    };

    try {
      if (editingId) {
        await API.put(`/business-segments/${editingId}`, payload);
        setSuccess('Business segment updated successfully.');
      } else {
        await API.post('/business-segments', payload);
        setSuccess('Business segment created successfully.');
      }
      setShowModal(false);
      fetchSegments();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete business segment "${name}"?`)) {
      try {
        await API.delete(`/business-segments/${id}`);
        setSuccess('Segment deleted.');
        fetchSegments();
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
            <Briefcase className="w-5 h-5 text-brand-yellow" />
            <span>Business Segments</span>
          </h1>
          <p className="text-xs text-brand-gray mt-0.5">
            Configure target manufacturing verticals and industrial use cases.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          <span>New Segment</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-md flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {loading ? (
        <Loader text="Loading segments..." />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Segment Name</th>
                <th className="py-3 px-4">Icon</th>
                <th className="py-3 px-4">Applications</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {segments.map((s) => (
                <tr key={s._id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-brand-navy">{s.order}</td>
                  <td className="py-3 px-4 font-bold text-brand-navy">{s.name}</td>
                  <td className="py-3 px-4 text-brand-navy">{s.icon}</td>
                  <td className="py-3 px-4 text-brand-gray">{s.applications?.length || 0} items</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => openEdit(s)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(s._id, s.name)} className="p-1 text-red-600 hover:bg-red-50 rounded">
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
                {editingId ? 'Edit Business Segment' : 'Create Business Segment'}
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
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Slug</label>
                  <input
                    type="text"
                    value={form.slug}
                    onChange={(e) => setForm({ ...form, slug: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Icon Key</label>
                  <select
                    value={form.icon}
                    onChange={(e) => setForm({ ...form, icon: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded"
                  >
                    <option value="Building2">Building2 (Construction)</option>
                    <option value="Hammer">Hammer (Woodworking)</option>
                    <option value="Truck">Truck (Automotive)</option>
                    <option value="Package">Package (Packaging)</option>
                    <option value="Wrench">Wrench (Heavy Industry)</option>
                    <option value="Cpu">Cpu (Electronics)</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Description *</label>
                <textarea
                  rows="2"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded"
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
                  className="w-full px-3 py-2 text-xs border rounded"
                  placeholder="Precast joint sealing&#10;Curtain wall anchoring"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Image URL</label>
                  <input
                    type="text"
                    value={form.image}
                    onChange={(e) => setForm({ ...form, image: e.target.value })}
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

export default AdminSegments;
