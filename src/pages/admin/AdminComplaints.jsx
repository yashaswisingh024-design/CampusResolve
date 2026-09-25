import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Settings2, Download, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';

export default function AdminComplaints() {
  const [searchParams] = useSearchParams();
  
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Filters state
  const [statusFilter, setStatusFilter] = useState('All');
  const [priorityFilter, setPriorityFilter] = useState('All');
  const [categoryFilter, setCategoryFilter] = useState('All');
  
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editPriority, setEditPriority] = useState('');
  const [saving, setSaving] = useState(false);
  const [saveError, setSaveError] = useState('');

  const fetchComplaints = async () => {
    setLoading(true);
    try {
      let query = [];
      if (statusFilter !== 'All') query.push(`status=${encodeURIComponent(statusFilter)}`);
      if (priorityFilter !== 'All') query.push(`priority=${encodeURIComponent(priorityFilter)}`);
      if (categoryFilter !== 'All') query.push(`category=${encodeURIComponent(categoryFilter)}`);
      
      const queryString = query.length > 0 ? `?${query.join('&')}` : '';
      const res = await fetch(`http://localhost:8080/api/admin/complaints${queryString}`);
      if (!res.ok) throw new Error('Failed to fetch complaints');
      const data = await res.json();
      setComplaints(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplaints();
  }, [statusFilter, priorityFilter, categoryFilter]);

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setEditStatus(complaint.status?.replace('_', ' '));
    setEditPriority(complaint.priority || 'MEDIUM');
    setSaveError('');
    setIsModalOpen(true);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!selectedComplaint) return;
    
    setSaving(true);
    setSaveError('');

    try {
      // If priority changed
      if (editPriority && editPriority !== selectedComplaint.priority) {
        const pRes = await fetch(`http://localhost:8080/api/admin/complaints/${selectedComplaint.id}/priority?priority=${encodeURIComponent(editPriority.toUpperCase())}`, {
          method: 'PUT'
        });
        if (!pRes.ok) throw new Error('Failed to update priority');
      }

      // If status changed
      if (editStatus && editStatus !== selectedComplaint.status?.replace('_', ' ')) {
        const statusValue = editStatus.toUpperCase().replace(' ', '_'); // e.g. "IN PROGRESS" -> "IN_PROGRESS" if backend needs it, or URL encode "IN PROGRESS"
        const sRes = await fetch(`http://localhost:8080/api/admin/complaints/${selectedComplaint.id}/status?status=${encodeURIComponent(editStatus.toUpperCase())}`, {
          method: 'PUT'
        });
        if (!sRes.ok) throw new Error('Failed to update status');
      }

      setIsModalOpen(false);
      fetchComplaints(); // Refresh data
    } catch (err) {
      setSaveError(err.message);
    } finally {
      setSaving(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === 'RESOLVED') return 'success';
    if (s === 'IN_PROGRESS' || s === 'IN PROGRESS') return 'primary';
    if (s === 'ASSIGNED') return 'warning';
    return 'default';
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Complaint Management</h1>
          <p className="text-slate-500 mt-1">Review, assign, and update student issues.</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row gap-4">
          <div className="flex flex-wrap sm:flex-nowrap gap-2 w-full">
            <select
              className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER REVIEW">Under Review</option>
              <option value="IN PROGRESS">In Progress</option>
              <option value="RESOLVED">Resolved</option>
            </select>
            <select
              className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
            >
              <option value="All">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
            </select>
            <select
              className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="All">All Categories</option>
              <option value="Infrastructure">Infrastructure</option>
              <option value="Electrical">Electrical</option>
              <option value="Internet / Wi-Fi">Internet / Wi-Fi</option>
              <option value="Hostel">Hostel</option>
              <option value="Classroom">Classroom</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          {loading ? (
             <div className="p-8 text-center text-slate-500">Loading complaints...</div>
          ) : error ? (
            <div className="p-8 text-center text-red-500">{error}</div>
          ) : (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                  <th className="p-4 font-medium">Issue</th>
                  <th className="p-4 font-medium">Category / Location</th>
                  <th className="p-4 font-medium">Status</th>
                  <th className="p-4 font-medium text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {complaints.length > 0 ? (
                  complaints.map(complaint => (
                    <tr key={complaint.id} className="hover:bg-slate-50 transition-colors">
                      <td className="p-4">
                        <div className="font-semibold text-slate-900 mb-0.5 flex items-center gap-2">
                          {complaint.id}
                          {complaint.priority?.toUpperCase() === 'HIGH' && <AlertTriangle size={14} className="text-red-500" />}
                        </div>
                        <div className="text-sm font-medium text-slate-700 truncate max-w-xs">{complaint.title}</div>
                      </td>
                      <td className="p-4">
                        <div className="text-sm font-medium text-slate-900">{complaint.category}</div>
                        <div className="text-xs text-slate-500">{complaint.location}</div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusBadge(complaint.status)}>
                          {complaint.status?.replace('_', ' ')}
                        </Badge>
                      </td>
                      <td className="p-4 text-right">
                        <button 
                          onClick={() => openModal(complaint)}
                          className="p-2 text-primary-accent hover:bg-blue-50 rounded-lg transition-colors inline-flex items-center gap-1 text-sm font-medium"
                        >
                          <Settings2 size={16} /> Manage
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="p-8 text-center text-slate-500">
                      No complaints found for the selected filters.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Admin Manage Modal */}
      {isModalOpen && selectedComplaint && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full shadow-2xl relative my-auto">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center sticky top-0 bg-white rounded-t-2xl z-10">
              <div>
                <h2 className="text-xl font-bold text-slate-900">Manage Complaint</h2>
                <p className="text-sm text-slate-500">ID: {selectedComplaint.id}</p>
              </div>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-full transition-colors"
              >
                ✕
              </button>
            </div>
            
            <div className="p-6">
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-200 mb-6 space-y-3">
                <p className="font-semibold text-slate-900">{selectedComplaint.title}</p>
                <p className="text-sm text-slate-700">{selectedComplaint.description}</p>
                <div className="flex flex-wrap gap-4 pt-2 text-xs font-medium text-slate-500">
                  <span>Location: {selectedComplaint.location}</span>
                  <span>Category: {selectedComplaint.category}</span>
                </div>
              </div>

              {saveError && (
                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm mb-4">
                  {saveError}
                </div>
              )}

              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Update Status</label>
                    <select
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value="SUBMITTED">Submitted</option>
                      <option value="UNDER REVIEW">Under Review</option>
                      <option value="IN PROGRESS">In Progress</option>
                      <option value="RESOLVED">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Update Priority</label>
                    <select
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm"
                      value={editPriority}
                      onChange={(e) => setEditPriority(e.target.value)}
                    >
                      <option value="LOW">Low</option>
                      <option value="MEDIUM">Medium</option>
                      <option value="HIGH">High</option>
                    </select>
                  </div>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit" disabled={saving}>
                    {saving ? 'Saving...' : 'Save Changes'}
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
