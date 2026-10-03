import React, { useState, useEffect } from 'react';
import { Settings2, AlertTriangle } from 'lucide-react';
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
      <div className="mb-8"><h1 className="text-2xl font-bold text-slate-900 tracking-tight">Complaint Management</h1><p className="text-slate-500 mt-1">Review, assign, and update student issues.</p></div>
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row gap-4">
          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full">
            <select className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value="">All Statuses</option>
              {STATUSES.map(s => <option key={s} value={s}>{formatStatus(s)}</option>)}
            </select>
            <select className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white" value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value="">All Priorities</option>
              {PRIORITIES.map(p => <option key={p} value={p}>{p.charAt(0) + p.slice(1).toLowerCase()}</option>)}
            </select>
            <select className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white" value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)}>
              <option value="">All Categories</option>
              {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
        </div>
        <div className="overflow-x-auto">
          {loading ? <div className="p-8 text-center text-slate-500">Loading complaints...</div>
          : error ? <div className="p-8 text-center text-red-500">{error}</div>
          : <table className="w-full text-left border-collapse">
            <thead><tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
              <th className="p-4 font-medium">Issue</th><th className="p-4 font-medium">Category / Location</th><th className="p-4 font-medium">Status</th><th className="p-4 font-medium text-right">Actions</th>
            </tr></thead>
            <tbody className="divide-y divide-slate-100">
              {complaints.length > 0 ? complaints.map(c => (
                <tr key={c.complaintId} className="hover:bg-slate-50 transition-colors">
                  <td className="p-4"><div className="font-semibold text-slate-900 mb-0.5 flex items-center gap-2">CR-{c.complaintId}{c.priority?.toUpperCase() === 'HIGH' && <AlertTriangle size={14} className="text-red-500" />}</div><div className="text-sm font-medium text-slate-700 truncate max-w-xs">{c.title}</div></td>
                  <td className="p-4"><div className="text-sm font-medium text-slate-900">{c.category}</div><div className="text-xs text-slate-500">{c.location}</div></td>
                  <td className="p-4"><Badge variant={getStatusColor(c.status)}>{formatStatus(c.status)}</Badge></td>
                  <td className="p-4 text-right"><button onClick={() => openModal(c)} className="p-2 text-primary-accent hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1 text-sm font-medium"><Settings2 size={16} /> {c.status?.toUpperCase() === 'RESOLVED' ? 'View' : 'Manage'}</button></td>
                </tr>
              )) : <tr><td colSpan="4" className="p-8 text-center text-slate-500">No complaints found.</td></tr>}
            </tbody>
          </table>}
        </div>
      </div>

      {isModalOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative my-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center">
              <div><h2 className="text-xl font-bold text-slate-900">
  {selectedComplaint.status?.toUpperCase() === 'RESOLVED'? 'View Complaint': 'Manage Complaint'}</h2><p className="text-sm text-slate-500">ID: CR-{selectedComplaint.complaintId}</p></div>
              <button onClick={() => setIsModalOpen(false)} className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors">✕</button>
            </div>
            <div className="p-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 space-y-3">
  <p className="font-semibold text-slate-900">{selectedComplaint.title}</p>

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
        className="max-w-full max-h-80 rounded-lg border border-slate-200 object-contain"
      />
    </div>
  )}
              </div>
              <div className="bg-white rounded-xl border border-slate-200 p-4 mb-6">
  <h3 className="font-semibold text-slate-900 mb-3">
    Resolution Feedback
  </h3>

  {feedbackLoading ? (
    <p className="text-sm text-slate-500">Loading feedback...</p>
  ) : feedback ? (
    <>
      <div className="flex items-center gap-1 mb-2">
        {[1, 2, 3, 4, 5].map((star) => (
          <span
            key={star}
            className={
              star <= feedback.rating
                ? 'text-yellow-400 text-lg'
                : 'text-slate-300 text-lg'
            }
          >
            ★
          </span>
        ))}
      </div>

      <p className="text-sm text-slate-700">
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
        className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm"
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
        className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm"
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
