import React, { useState, useEffect } from 'react';
import { Users, Plus, Edit2, Trash2, X, CheckCircle } from 'lucide-react';
import API from '../../services/api';
import { Loader } from '../../components/Loader';

const AdminLeadership = () => {
  const [leadership, setLeadership] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [form, setForm] = useState({
    name: '',
    designation: '',
    bio: '',
    photo: '',
    message: '',
    order: 0,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const fetchLeadership = async () => {
    setLoading(true);
    try {
      const res = await API.get('/leadership');
      setLeadership(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLeadership();
  }, []);

  const openAdd = () => {
    setEditingId(null);
    setForm({
      name: '',
      designation: '',
      bio: '',
      photo: '',
      message: '',
      order: leadership.length + 1,
    });
    setError('');
    setShowModal(true);
  };

  const openEdit = (l) => {
    setEditingId(l._id);
    setForm({
      name: l.name,
      designation: l.designation,
      bio: l.bio,
      photo: l.photo || '',
      message: l.message || '',
      order: l.order || 0,
    });
    setError('');
    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name.trim() || !form.designation.trim() || !form.bio.trim()) {
      setError('Name, Designation, and Bio are required.');
      return;
    }

    try {
      if (editingId) {
        await API.put(`/leadership/${editingId}`, form);
        setSuccess('Leadership profile updated.');
      } else {
        await API.post('/leadership', form);
        setSuccess('Leadership profile created.');
      }
      setShowModal(false);
      fetchLeadership();
    } catch (err) {
      setError(err.response?.data?.message || 'Operation failed.');
    }
  };

  const handleDelete = async (id, name) => {
    if (window.confirm(`Delete profile for "${name}"?`)) {
      try {
        await API.delete(`/leadership/${id}`);
        setSuccess('Profile deleted.');
        fetchLeadership();
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
            <Users className="w-5 h-5 text-brand-yellow" />
            <span>Leadership & Governance Management</span>
          </h1>
          <p className="text-xs text-brand-gray mt-0.5">
            Update founder bios, directors, and executive leadership statements.
          </p>
        </div>
        <button onClick={openAdd} className="btn-primary text-xs py-2 px-4">
          <Plus className="w-4 h-4" />
          <span>New Profile</span>
        </button>
      </div>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-md flex items-center justify-between">
          <span>{success}</span>
          <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {loading ? (
        <Loader text="Loading profiles..." />
      ) : (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
              <tr>
                <th className="py-3 px-4">Order</th>
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Designation</th>
                <th className="py-3 px-4">Bio Summary</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {leadership.map((l) => (
                <tr key={l._id} className="hover:bg-slate-50">
                  <td className="py-3 px-4 font-bold text-brand-navy">{l.order}</td>
                  <td className="py-3 px-4 font-bold text-brand-navy">{l.name}</td>
                  <td className="py-3 px-4 text-brand-gray">{l.designation}</td>
                  <td className="py-3 px-4 text-brand-gray max-w-sm truncate">{l.bio}</td>
                  <td className="py-3 px-4 text-right space-x-2">
                    <button onClick={() => openEdit(l)} className="p-1 text-blue-600 hover:bg-blue-50 rounded">
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button onClick={() => handleDelete(l._id, l.name)} className="p-1 text-red-600 hover:bg-red-50 rounded">
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
                {editingId ? 'Edit Profile' : 'Add Profile'}
              </h2>
              <button onClick={() => setShowModal(false)}><X className="w-5 h-5 text-gray-400" /></button>
            </div>
            {error && <div className="p-2 bg-red-50 text-red-700 text-xs rounded">{error}</div>}
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
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
                  <label className="block text-xs font-bold text-brand-navy mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded"
                  />
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Biography *</label>
                <textarea
                  rows="3"
                  required
                  value={form.bio}
                  onChange={(e) => setForm({ ...form, bio: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded"
                ></textarea>
              </div>
              <div>
                <label className="block text-xs font-bold text-brand-navy mb-1">Executive Message</label>
                <textarea
                  rows="2"
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full px-3 py-2 text-xs border rounded"
                ></textarea>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Display Order</label>
                  <input
                    type="number"
                    value={form.order}
                    onChange={(e) => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
                    className="w-full px-3 py-2 text-xs border rounded"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-brand-navy mb-1">Photo URL</label>
                  <input
                    type="text"
                    value={form.photo}
                    onChange={(e) => setForm({ ...form, photo: e.target.value })}
                    className="w-full px-3 py-2 text-xs border rounded"
                  />
                </div>
              </div>
              <div className="pt-3 border-t flex justify-end gap-2">
                <button type="button" onClick={() => setShowModal(false)} className="px-3 py-1.5 text-xs">
                  Cancel
                </button>
                <button type="submit" className="btn-primary text-xs py-1.5 px-4 font-bold">
                  Save Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminLeadership;
