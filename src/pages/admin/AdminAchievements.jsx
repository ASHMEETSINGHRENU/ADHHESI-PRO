import React, { useState, useEffect } from 'react';
import { Trophy, Plus, Edit2, Trash2, X, CheckCircle } from 'lucide-react';
import API from '../../services/api';
import { Loader } from '../../components/Loader';

const AdminAchievements = () => {
  const [achievements, setAchievements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    year: '',
    title: '',
    description: '',
    badge: '',
    order: 0,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchAchievements = async () => {
    setLoading(true);
    try {
      const res = await API.get('/achievements');
      setAchievements(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAchievements();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      year: new Date().getFullYear().toString(),
      title: '',
      description: '',
      badge: '',
      order: achievements.length + 1,
    });
    setError('');
    setShowModal(true);
  };

  const openEdit = (a) => {
    setEditingId(a._id);
    setForm({
      year: a.year,
      title: a.title,
      description: a.description,
      badge: a.badge || '',
      order: a.order || 0,
    });
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.year.trim() || !form.title.trim() || !form.description.trim()) {
      setError('Year, Title, and Description are required.');
      return;
    }

    try {
      if (editingId) {
        await API.put(`/achievements/${editingId}`, form);
        setSuccess('Milestone updated.');
      } else {
        await API.post('/achievements', form);
        setSuccess('Milestone created.');
      }
      setShowModal(false);
      fetchAchievements();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    }
  };

  const handleDelete = async (id, title) => {
    if (window.confirm(`Delete milestone "${title}"?`)) {
      try {
        await API.delete(`/achievements/${id}`);
        setSuccess('Milestone deleted.');
        fetchAchievements();
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
            <Trophy className="w-5 h-5 text-brand-yellow" />
            <span>Achievements & Timeline Management</span>
          </h1>
          <p className="text-xs text-brand-gray mt-0.5">
            Log corporate milestones, plant capacity commissioning, and certifications.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          <span>New Milestone</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-md flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {loading ? (
        <Loader text="Loading milestones..." />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Year</th>
                <th className="py-3 px-4">Title</th>
                <th className="py-3 px-4">Badge</th>
                <th className="py-3 px-4">Description</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {achievements.map((a) => (
                <tr key={a._id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-brand-navy">{a.year}</td>
                  <td className="py-3 px-4 font-bold text-brand-navy">{a.title}</td>
                  <td className="py-3 px-4 text-brand-gray">{a.badge || '—'}</td>
                  <td className="py-3 px-4 text-brand-gray max-w-sm truncate">{a.description}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => openEdit(a)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(a._id, a.title)} className="p-1 text-red-600 hover:bg-red-50 rounded">
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
                {editingId ? 'Edit Milestone' : 'Add Milestone'}
              </h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            {error && <div className="p-2 bg-red-50 text-red-700 text-xs rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Year *</label>
                  <input
                    type="text"
                    required
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Badge (optional)</label>
                  <input
                    type="text"
                    value={form.badge}
                    onChange={(e) => setForm({ ...form, badge: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded"
                    placeholder="e.g. Quality Standard"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Milestone Title *</label>
                <input
                  type="text"
                  required
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Description *</label>
                <textarea
                  rows="3"
                  required
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded"
                ></textarea>
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-1.5 px-4 font-bold">
                  Save Milestone
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminAchievements;
