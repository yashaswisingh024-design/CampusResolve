import React, { useState, useEffect } from 'react';
import { Settings2, AlertTriangle, X, Star } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { adminApi, feedbackApi, CATEGORIES, STATUSES, PRIORITIES, formatStatus, getStatusColor } from '../../api/apiClient';
export default function AdminComplaints() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [feedback, setFeedback] = useState(null);
  const [feedbackLoading, setFeedbackLoading] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [saveSuccess, setSaveSuccess] = useState('');
  

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      const data = await adminApi.getComplaints({
        status: statusFilter || undefined,
        priority: priorityFilter || undefined,
        category: categoryFilter || undefined,
      });
      setComplaints(data);
      setError('');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { fetchComplaints(); }, [statusFilter, priorityFilter, categoryFilter]);
  const openModal = async (complaint) => {
  setSelectedComplaint(complaint);
  setEditStatus(complaint.status || '');
  setEditPriority(complaint.priority || 'MEDIUM');
  setSaveError('');
  setSaveSuccess('');
  setFeedback(null);
  setFeedbackLoading(true);
  setIsModalOpen(true);

  try {
    const data = await feedbackApi.getByComplaintId(complaint.complaintId);
    setFeedback(data);
  } catch (err) {
    setFeedback(null);
  } finally {
    setFeedbackLoading(false);
  }
};

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    setSaving(true);
    setSaveError('');
    setSaveSuccess('');
    try {
      if (editPriority && editPriority !== selectedComplaint.priority) {
        await adminApi.updatePriority(selectedComplaint.complaintId, editPriority);
      }
      if (editStatus && editStatus !== selectedComplaint.status) {
        await adminApi.updateStatus(selectedComplaint.complaintId, editStatus);
      }
      setSaveSuccess('Changes saved successfully!');
      setTimeout(() => { setIsModalOpen(false); fetchComplaints(); }, 1000);
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-8"><p className="text-[10px] uppercase tracking-[.2em] font-bold text-[#2F858E] mb-2">Operations queue</p><h1 className="text-3xl font-extrabold text-[#222B33] tracking-tight">Complaint management</h1><p className="text-[#718084] mt-2">Review each report and make its next action clear.</p></div>
      <div className="surface overflow-hidden mb-6">
        <div className="p-4 sm:p-5 border-b border-[#e8dfd3] flex flex-col lg:flex-row gap-4">
          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full">
            <select aria-label="Filter complaints by status" className="w-full sm:w-auto border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-[#fffdfa]" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{formatStatus(s)}</option>)}
            </select>
            <select aria-label="Filter complaints by priority" className="w-full sm:w-auto border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-[#fffdfa]" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="">All Priorities</option>
              {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0) + p.slice(1).toLowerCase()}</option>)}
            </select>
            <select aria-label="Filter complaints by category" className="w-full sm:w-auto border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-[#fffdfa]" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? <div className="p-6 space-y-3">{[1,2,3,4].map(i => <div key={i} className="h-14 animate-pulse rounded-lg bg-[#f4eee6]" />)}</div>
          : error ? <div role="alert" className="p-8 text-center text-[#9d5c4d]">{error}<button onClick={fetchComplaints} className="block mx-auto mt-3 font-bold text-[#2F858E]">Try again</button></div>
          : <table className="w-full text-left border-collapse">
            <thead><tr className="border-b border-[#e8dfd3] text-xs uppercase tracking-wider">
              <th className="p-4 font-bold">Issue</th><th className="p-4 font-bold">Category / Location</th><th className="p-4 font-bold">Status / Priority</th><th className="p-4 font-bold text-right">Next action</th>
            </tr></thead>
            <tbody className="divide-y divide-[#f0e9df]">
              {complaints.length > 0 ? complaints.map(c => (
                <tr key={c.complaintId} className="hover:bg-[#fbf7f1] transition-colors">
                  <td className="p-4"><div className="font-bold text-[#2F858E] mb-0.5 flex items-center gap-2 text-xs">CR-{c.complaintId}{c.priority?.toUpperCase() === 'HIGH' && <AlertTriangle size={14} className="text-[#a95042]" />}</div><div className="text-sm font-semibold text-[#222B33] truncate max-w-xs">{c.title}</div></td>
                  <td className="p-4"><div className="text-sm font-medium text-[#53636a]">{c.category}</div><div className="text-xs text-[#97a1a0] mt-1">{c.location}</div></td>
                  <td className="p-4"><div className="flex flex-col items-start gap-1.5"><Badge variant={getStatusColor(c.status)}>{formatStatus(c.status)}</Badge><span className="text-[10px] uppercase tracking-wider font-bold text-[#718084]">{c.priority || 'Pending'} priority</span></div></td>
                  <td className="p-4 text-right"><button onClick={() => openModal(c)} className="p-2.5 text-[#2F858E] hover:bg-[#e3f0ed] rounded-xl transition-colors inline-flex items-center gap-1 text-sm font-semibold"><Settings2 size={16} /> {c.status?.toUpperCase() === 'RESOLVED' ? 'View' : 'Manage'}</button></td>
                </tr>
                )) : <tr><td colSpan="4" className="p-10 text-center text-[#718084]">No complaints found for these filters.</td></tr>}
            </tbody>
          </table>}
        </div>
      </div>

      {isModalOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div role="dialog" aria-modal="true" aria-labelledby="complaint-modal-title" className="bg-[#fffdfa] rounded-2xl max-w-2xl w-full shadow-2xl relative my-auto border border-[#e8dfd3]">
            <div className="p-5 sm:p-6 border-b border-[#eee5d9] flex justify-between items-center">
              <div><p className="text-[10px] font-bold uppercase tracking-[.18em] text-[#2F858E]">Complaint CR-{selectedComplaint.complaintId}</p><h2 id="complaint-modal-title" className="text-xl font-extrabold text-[#222B33] mt-1">
  {selectedComplaint.status?.toUpperCase() === 'RESOLVED'? 'View Complaint': 'Manage Complaint'}</h2><p className="text-sm text-slate-500">ID: CR-{selectedComplaint.complaintId}</p></div>
              <button aria-label="Close complaint details" onClick={() => setIsModalOpen(false)} className="p-2 text-[#718084] hover:text-[#222B33] hover:bg-[#f2ece4] rounded-full transition-colors"><X size={20} /></button>
            </div>
            <div className="p-6">
              <div className="bg-[#f8f3ec] rounded-xl p-4 border border-[#eee5d9] mb-6 space-y-3">
  <p className="font-bold text-[#222B33]">{selectedComplaint.title}</p>

  <p className="text-sm text-slate-700">
    {selectedComplaint.description}
  </p>

  <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-500">
    <span>Location: {selectedComplaint.location}</span>
    <span>Category: {selectedComplaint.category}</span>
  </div>

  {selectedComplaint.image && (
    <div className="pt-3">
      <p className="text-sm font-medium text-slate-700 mb-2">
        Evidence / Photo
      </p>

      <img
        src={`http://localhost:8080/api/complaints/images/${selectedComplaint.image}`}
        alt="Complaint evidence"
    className="max-w-full max-h-80 rounded-lg border border-[#e8dfd3] object-contain"
      />
    </div>
  )}
              </div>
              <div className="bg-white rounded-xl border border-[#e8dfd3] p-4 mb-6">
  <h3 className="font-bold text-[#222B33] mb-3">
    Resolution Feedback
  </h3>

  {feedbackLoading ? (
    <p className="text-sm text-slate-500">Loading feedback...</p>
  ) : feedback ? (
    <>
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star key={star} size={18} className={star <= feedback.rating ? 'fill-[#d69a55] text-[#d69a55]' : 'text-[#d8d0c5]'} />
        ))}
      </div>

      <p className="text-sm text-[#53636a]">
        {feedback.comment || 'No comment provided.'}
      </p>
    </>
  ) : (
    <p className="text-sm text-slate-500">
      No feedback submitted yet.
    </p>
  )}
</div>

{saveError && (
  <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
    {saveError}
  </div>
)}

{saveSuccess && (
  <div className="bg-green-50 text-green-600 p-3 rounded-lg text-sm mb-4">
    {saveSuccess}
  </div>
)}

<form onSubmit={handleUpdate} className="space-y-5">

  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        Update Status
      </label>

       <select
         className="flex h-11 w-full border bg-[#fffdfa] px-3 py-2 text-sm text-[#222B33] focus:outline-none focus:ring-2 shadow-sm"
        value={editStatus}
        onChange={(e) => setEditStatus(e.target.value)}
        disabled={selectedComplaint.status?.toUpperCase() === 'RESOLVED'}
      >
        {STATUSES.map(s => (
          <option key={s} value={s}>
            {formatStatus(s)}
          </option>
        ))}
      </select>
    </div>

    <div>
      <label className="block text-sm font-medium text-slate-700 mb-1.5">
        Update Priority
      </label>

       <select
         className="flex h-11 w-full border bg-[#fffdfa] px-3 py-2 text-sm text-[#222B33] focus:outline-none focus:ring-2 shadow-sm"
        value={editPriority}
        onChange={(e) => setEditPriority(e.target.value)}
        disabled={selectedComplaint.status?.toUpperCase() === 'RESOLVED'}
      >
        {PRIORITIES.map(p => (
          <option key={p} value={p}>
            {p.charAt(0) + p.slice(1).toLowerCase()}
          </option>
        ))}
      </select>
    </div>

  </div>
  <div className="pt-4 flex justify-end gap-3">
  <Button
    type="button"
    variant="ghost"
    onClick={() => setIsModalOpen(false)}
  >
    Close
  </Button>

  {selectedComplaint.status?.toUpperCase() !== 'RESOLVED' && (
    <Button type="submit" disabled={saving}>
      {saving ? 'Saving...' : 'Save Changes'}
    </Button>
  )}
</div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
