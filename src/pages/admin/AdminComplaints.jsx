import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Search, Filter, Settings2, Download, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useComplaints } from '../../context/ComplaintContext';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { departments } from '../../data/mockUsers';
import { mockUsers } from '../../data/mockUsers';

export default function AdminComplaints() {
  const { complaints, updateComplaintStatus } = useComplaints();
  const [searchParams] = useSearchParams();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [deptFilter, setDeptFilter] = useState('All');
  
  const [selectedComplaint, setSelectedComplaint] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editStatus, setEditStatus] = useState('');
  const [editDept, setEditDept] = useState('');
  const [editNote, setEditNote] = useState('');

  // Auto-open modal if ID is in URL
  useEffect(() => {
    const id = searchParams.get('id');
    if (id) {
      const comp = complaints.find(c => c.id === id);
      if (comp) openModal(comp);
    }
  }, [searchParams, complaints]);

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    const matchesDept = deptFilter === 'All' || c.department === deptFilter;
    return matchesSearch && matchesStatus && matchesDept;
  });

  const openModal = (complaint) => {
    setSelectedComplaint(complaint);
    setEditStatus(complaint.status);
    setEditDept(complaint.department);
    setEditNote('');
    setIsModalOpen(true);
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    if (selectedComplaint) {
      updateComplaintStatus(selectedComplaint.id, editStatus, editDept, editNote);
      setIsModalOpen(false);
    }
  };

  const getUserName = (id) => {
    const u = mockUsers.find(user => user.id === id);
    return u ? u.name : 'Unknown Student';
  };

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Complaint Management</h1>
          <p className="text-slate-500 mt-1">Review, assign, and update student issues.</p>
        </div>
        <Button variant="outline" className="shrink-0 flex items-center gap-2">
          <Download size={16} />
          Export CSV
        </Button>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col lg:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by ID, title, or student..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-wrap sm:flex-nowrap gap-2">
            <select
              className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Reviewed">Reviewed</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
            <select
              className="w-full sm:w-auto border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
              value={deptFilter}
              onChange={(e) => setDeptFilter(e.target.value)}
            >
              <option value="All">All Departments</option>
              {departments.map(d => <option key={d} value={d}>{d}</option>)}
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">Issue</th>
                <th className="p-4 font-medium hidden sm:table-cell">Student</th>
                <th className="p-4 font-medium hidden lg:table-cell">Department</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map(complaint => (
                  <tr key={complaint.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4">
                      <div className="font-semibold text-slate-900 mb-0.5 flex items-center gap-2">
                        {complaint.id}
                        {complaint.priority === 'Urgent' && <AlertTriangle size={14} className="text-red-500" />}
                      </div>
                      <div className="text-sm font-medium text-slate-700 truncate max-w-xs">{complaint.title}</div>
                      <div className="text-xs text-slate-500 mt-1">{new Date(complaint.date).toLocaleDateString()}</div>
                    </td>
                    <td className="p-4 hidden sm:table-cell">
                      <div className="text-sm font-medium text-slate-900">{getUserName(complaint.studentId)}</div>
                    </td>
                    <td className="p-4 hidden lg:table-cell">
                      <span className="text-sm text-slate-600 bg-slate-100 px-2 py-1 rounded-md">{complaint.department}</span>
                    </td>
                    <td className="p-4">
                      <Badge variant={
                        complaint.status === 'Resolved' ? 'success' : 
                        complaint.status === 'In Progress' ? 'primary' : 
                        complaint.status === 'Assigned' ? 'warning' : 'default'
                      }>
                        {complaint.status}
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
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No complaints found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
                  <span className={selectedComplaint.priority === 'Urgent' ? 'text-red-500' : ''}>
                    Priority: {selectedComplaint.priority}
                  </span>
                </div>
              </div>

              <form onSubmit={handleUpdate} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Update Status</label>
                    <select
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm"
                      value={editStatus}
                      onChange={(e) => setEditStatus(e.target.value)}
                    >
                      <option value="Submitted">Submitted</option>
                      <option value="Reviewed">Reviewed</option>
                      <option value="Assigned">Assigned</option>
                      <option value="In Progress">In Progress</option>
                      <option value="Resolved">Resolved</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-slate-700 mb-1.5">Assign Department</label>
                    <select
                      className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm"
                      value={editDept}
                      onChange={(e) => setEditDept(e.target.value)}
                    >
                      <option value="Pending Assignment">Pending Assignment</option>
                      {departments.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1.5">Internal Note / Update Message</label>
                  <textarea
                    rows={3}
                    className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm resize-none"
                    placeholder="E.g., Technician dispatched, Parts ordered..."
                    value={editNote}
                    onChange={(e) => setEditNote(e.target.value)}
                  />
                  <p className="text-xs text-slate-500 mt-1">This update will be visible to the student.</p>
                </div>

                <div className="pt-4 flex justify-end gap-3">
                  <Button type="button" variant="ghost" onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </Button>
                  <Button type="submit">
                    Save Changes
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
