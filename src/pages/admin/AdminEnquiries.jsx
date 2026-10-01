import React, { useState, useEffect } from 'react';
import {
  Inbox,
  Filter,
  CheckCircle,
  Clock,
  Trash2,
  X,
  FileText,
  Mail,
  Phone,
  Building,
} from 'lucide-react';
import API from '../../services/api';
import { Loader } from '../../components/Loader';

const AdminEnquiries = () => {
  const [enquiries, setEnquiries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedEnquiry, setSelectedEnquiry] = useState(null);
  const [notes, setNotes] = useState('');
  const [success, setSuccess] = useState('');

  const fetchEnquiries = async () => {
    setLoading(true);
    try {
      const params = {};
      if (statusFilter !== 'All') {
        params.status = statusFilter;
      }
      const res = await API.get('/enquiries', { params });
      setEnquiries(res.data?.data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEnquiries();
  }, [statusFilter]);

  const handleStatusChange = async (id, newStatus) => {
    try {
      await API.put(`/enquiries/${id}`, { status: newStatus });
      setSuccess(`Status updated to "${newStatus}".`);
      fetchEnquiries();
      if (selectedEnquiry && selectedEnquiry._id === id) {
        setSelectedEnquiry({ ...selectedEnquiry, status: newStatus });
      }
    } catch (err) {
      alert('Failed to update status.');
    }
  };

  const handleSaveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      await API.put(`/enquiries/${selectedEnquiry._id}`, { notes });
      setSuccess('Internal notes saved.');
      fetchEnquiries();
      setSelectedEnquiry({ ...selectedEnquiry, notes });
    } catch (err) {
      alert('Failed to save notes.');
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to permanently delete this enquiry?')) {
      try {
        await API.delete(`/enquiries/${id}`);
        setSuccess('Enquiry removed.');
        if (selectedEnquiry?._id === id) {
          setSelectedEnquiry(null);
        }
        fetchEnquiries();
      } catch (err) {
        alert('Delete failed.');
      }
    }
  };

  const openDetail = (enq) => {
    setSelectedEnquiry(enq);
    setNotes(enq.notes || '');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 rounded-xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl font-bold text-brand-navy flex items-center gap-2">
            <Inbox className="w-5 h-5 text-brand-yellow" />
            <span>Customer Enquiries & Quotation Leads</span>
          </h1>
          <p className="text-xs text-brand-gray mt-0.5">
            Track, qualify, and respond to incoming technical bids and product quote requests.
          </p>
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
          {['All', 'New', 'Contacted', 'In Progress', 'Closed'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-md text-xs font-bold transition-colors whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-brand-navy text-white'
                  : 'bg-slate-100 text-brand-gray hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
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

      {loading ? (
        <Loader text="Loading customer enquiries..." />
      ) : enquiries.length > 0 ? (
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-700 uppercase font-semibold border-b border-slate-200">
                <tr>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Company</th>
                  <th className="py-3 px-4">Product / Quantity</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {enquiries.map((enq) => (
                  <tr key={enq._id} className="hover:bg-slate-50 transition-colors">
                    <td className="py-3 px-4 font-semibold text-brand-navy">
                      <div>{enq.name}</div>
                      <div className="text-[11px] text-gray-500 font-normal">{enq.email}</div>
                      <div className="text-[11px] text-gray-500 font-normal">{enq.phone}</div>
                    </td>
                    <td className="py-3 px-4 text-brand-gray font-medium">
                      {enq.companyName || '—'}
                    </td>
                    <td className="py-3 px-4 text-brand-gray">
                      <div className="font-semibold text-brand-navy">{enq.product}</div>
                      <div className="text-[11px] text-gray-500">{enq.quantity}</div>
                    </td>
                    <td className="py-3 px-4 text-gray-400 whitespace-nowrap">
                      {new Date(enq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 px-4">
                      <select
                        value={enq.status}
                        onChange={(e) => handleStatusChange(enq._id, e.target.value)}
                        className={`text-[11px] font-bold px-2 py-1 rounded border focus:outline-none ${
                          enq.status === 'New'
                            ? 'bg-amber-50 text-amber-800 border-amber-300'
                            : enq.status === 'Contacted'
                            ? 'bg-blue-50 text-blue-800 border-blue-300'
                            : enq.status === 'In Progress'
                            ? 'bg-purple-50 text-purple-800 border-purple-300'
                            : 'bg-emerald-50 text-emerald-800 border-emerald-300'
                        }`}
                      >
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="In Progress">In Progress</option>
                        <option value="Closed">Closed</option>
                      </select>
                    </td>
                    <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                      <button
                        onClick={() => openDetail(enq)}
                        className="btn-secondary text-[11px] py-1 px-2.5"
                      >
                        View Full
                      </button>
                      <button
                        onClick={() => handleDelete(enq._id)}
                        className="p-1 text-red-500 hover:bg-red-50 rounded"
                        title="Delete Enquiry"
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
      ) : (
        <div className="bg-white p-12 rounded-xl border border-slate-200 text-center">
          <p className="text-brand-gray text-xs">No enquiries match the current filter.</p>
        </div>
      )}

      {/* Detail Modal */}
      {selectedEnquiry && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-4 px-6 border-b border-slate-200 flex items-center justify-between bg-slate-50">
              <div>
                <h2 className="text-sm font-bold text-brand-navy">Enquiry Details</h2>
                <p className="text-[11px] text-gray-500">
                  Received on {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => setSelectedEnquiry(null)}
                className="text-gray-400 hover:text-brand-navy"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 space-y-4 overflow-y-auto flex-1 text-xs">
              <div className="grid grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-slate-200">
                <div>
                  <span className="text-gray-400 block font-medium">Contact Person:</span>
                  <span className="font-bold text-brand-navy text-sm">{selectedEnquiry.name}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Company / Firm:</span>
                  <span className="font-bold text-brand-navy text-sm">
                    {selectedEnquiry.companyName || 'Not Provided'}
                  </span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Email Address:</span>
                  <a
                    href={`mailto:${selectedEnquiry.email}`}
                    className="font-bold text-blue-600 underline"
                  >
                    {selectedEnquiry.email}
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Phone Number:</span>
                  <a
                    href={`tel:${selectedEnquiry.phone}`}
                    className="font-bold text-brand-navy"
                  >
                    {selectedEnquiry.phone}
                  </a>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Product / Subject:</span>
                  <span className="font-bold text-brand-navy">{selectedEnquiry.product}</span>
                </div>
                <div>
                  <span className="text-gray-400 block font-medium">Estimated Quantity:</span>
                  <span className="font-bold text-brand-navy">{selectedEnquiry.quantity}</span>
                </div>
              </div>

              <div>
                <span className="text-gray-500 block font-bold mb-1">
                  Customer Message / Requirements:
                </span>
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-200 text-brand-gray whitespace-pre-wrap leading-relaxed">
                  {selectedEnquiry.message}
                </div>
              </div>

              <div className="pt-2">
                <label className="block text-xs font-bold text-brand-navy mb-1">
                  Internal Engineering & Follow-Up Notes (Admin Only)
                </label>
                <textarea
                  rows="3"
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="Record call logs, sample dispatch tracking, quotation numbers..."
                  className="w-full p-2.5 text-xs border border-slate-300 rounded focus:ring-2 focus:ring-brand-navy focus:outline-none"
                ></textarea>
                <div className="flex justify-end mt-2">
                  <button onClick={handleSaveNotes} className="btn-primary text-xs py-1.5 px-3">
                    Save Internal Notes
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4 border-t bg-slate-50 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-brand-navy">Update Status:</span>
                <select
                  value={selectedEnquiry.status}
                  onChange={(e) => handleStatusChange(selectedEnquiry._id, e.target.value)}
                  className="text-xs font-bold px-2 py-1 rounded border"
                >
                  <option value="New">New</option>
                  <option value="Contacted">Contacted</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => setSelectedEnquiry(null)}
                className="btn-secondary text-xs py-1.5 px-4"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEnquiries;
