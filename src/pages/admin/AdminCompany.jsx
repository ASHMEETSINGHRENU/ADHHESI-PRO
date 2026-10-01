import React, { useState, useEffect } from 'react';
import { Building, Save, CheckCircle, X } from 'lucide-react';
import API from '../../services/api';
import { Loader } from '../../components/Loader';

const AdminCompany = () => {
  const [form, setForm] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCompany = async () => {
      try {
        const res = await API.get('/company');
        setForm(res.data?.data || {});
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchCompany();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setSaving(true);

    try {
      const res = await API.put('/company', form);
      setForm(res.data?.data);
      setSuccess('Company configuration updated successfully.');
    } catch (err) {
      setError(err.response?.data?.message || 'Update failed.');
    } finally {
      setSaving(false);
    }
  };

  if (loading || !form) {
    return <Loader text="Loading company settings..." />;
  }

  return (
    <div className="space-y-6 max-w-4xl">
      <div className="flex items-center justify-between bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-brand-navy flex items-center gap-2">
            <Building className="w-5 h-5 text-brand-yellow" />
            <span>Company Profile & Editable Statistics</span>
          </h1>
          <p className="text-xs text-brand-gray mt-0.5">
            Configure global brand metadata, vision, mission, and live placeholder counters.
          </p>
        </div>
      </div>

      {success && (
        <div className="p-3 bg-green-50 border border-green-200 text-green-800 text-xs rounded-md flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-600" />
            <span>{success}</span>
          </div>
          <button onClick={() => setSuccess('')}><X className="w-4 h-4" /></button>
        </div>
      )}

      {error && (
        <div className="p-3 bg-red-50 border border-red-200 text-red-800 text-xs rounded-md">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 rounded-xl border border-slate-200 shadow-sm space-y-6 text-xs">
        {/* Brand identity */}
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-brand-navy border-b pb-2">
            Brand Identity
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">Company Name</label>
              <input
                type="text"
                value={form.name || ''}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">Official Tagline</label>
              <input
                type="text"
                value={form.tagline || ''}
                onChange={(e) => setForm({ ...form, tagline: e.target.value })}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-navy mb-1">
              Short Description (Homepage intro)
            </label>
            <textarea
              rows="2"
              value={form.aboutShort || ''}
              onChange={(e) => setForm({ ...form, aboutShort: e.target.value })}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>

          <div>
            <label className="block text-xs font-bold text-brand-navy mb-1">
              Full Overview (About Us story)
            </label>
            <textarea
              rows="4"
              value={form.aboutFull || ''}
              onChange={(e) => setForm({ ...form, aboutFull: e.target.value })}
              className="w-full p-2 border rounded"
            ></textarea>
          </div>
        </div>

        {/* Editable Stats ("XX+" placeholders) */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-brand-navy border-b pb-2">
            Key Statistics (Replace with actual numbers once provided by client)
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div>
              <label className="block text-[11px] font-bold text-brand-navy mb-1">
                Years Experience
              </label>
              <input
                type="text"
                value={form.stats?.yearsExperience || 'XX+'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, yearsExperience: e.target.value },
                  })
                }
                className="w-full p-2 border rounded font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-navy mb-1">
                Products Count
              </label>
              <input
                type="text"
                value={form.stats?.productsCount || 'XX+'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, productsCount: e.target.value },
                  })
                }
                className="w-full p-2 border rounded font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-navy mb-1">
                Segments Count
              </label>
              <input
                type="text"
                value={form.stats?.segmentsCount || 'XX+'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, segmentsCount: e.target.value },
                  })
                }
                className="w-full p-2 border rounded font-bold"
              />
            </div>
            <div>
              <label className="block text-[11px] font-bold text-brand-navy mb-1">
                Brands Count
              </label>
              <input
                type="text"
                value={form.stats?.brandsCount || 'XX+'}
                onChange={(e) =>
                  setForm({
                    ...form,
                    stats: { ...form.stats, brandsCount: e.target.value },
                  })
                }
                className="w-full p-2 border rounded font-bold"
              />
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-brand-navy border-b pb-2">Vision & Mission</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">Vision</label>
              <textarea
                rows="3"
                value={form.vision || ''}
                onChange={(e) => setForm({ ...form, vision: e.target.value })}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">Mission</label>
              <textarea
                rows="3"
                value={form.mission || ''}
                onChange={(e) => setForm({ ...form, mission: e.target.value })}
                className="w-full p-2 border rounded"
              ></textarea>
            </div>
          </div>
        </div>

        {/* Contact Info */}
        <div className="space-y-4 pt-2">
          <h2 className="text-sm font-bold text-brand-navy border-b pb-2">
            Contact & Operations
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">
                Corporate Address
              </label>
              <input
                type="text"
                value={form.contact?.address || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, address: e.target.value },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">Contact Email</label>
              <input
                type="email"
                value={form.contact?.email || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, email: e.target.value },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">Phone Helpline</label>
              <input
                type="text"
                value={form.contact?.phone || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, phone: e.target.value },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-brand-navy mb-1">Working Hours</label>
              <input
                type="text"
                value={form.contact?.workingHours || ''}
                onChange={(e) =>
                  setForm({
                    ...form,
                    contact: { ...form.contact, workingHours: e.target.value },
                  })
                }
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t flex justify-end">
          <button
            type="submit"
            disabled={saving}
            className="btn-primary text-xs py-2.5 px-6 font-bold flex items-center gap-2"
          >
            {saving ? (
              <span>Saving Changes...</span>
            ) : (
              <>
                <Save className="w-4 h-4" />
                <span>Save All Settings</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminCompany;
