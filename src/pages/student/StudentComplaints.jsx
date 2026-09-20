import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Search, Filter, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';
import { Badge } from '../../components/common/Badge';
import { Input } from '../../components/common/Input';

export default function StudentComplaints() {
  const { user } = useAuth();
  const { complaints } = useComplaints();
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const userComplaints = complaints.filter(c => c.studentId === user.id);
  
  const filteredComplaints = userComplaints.filter(c => {
    const matchesSearch = c.title.toLowerCase().includes(search.toLowerCase()) || 
                          c.id.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === 'All' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">My Complaints</h1>
        <p className="text-slate-500 mt-1">Track and manage all the issues you have reported.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden mb-6">
        <div className="p-4 border-b border-slate-200 flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input
              type="text"
              placeholder="Search by ID or title..."
              className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-accent text-sm"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <select
              className="border border-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-primary-accent bg-white"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="All">All Statuses</option>
              <option value="Submitted">Submitted</option>
              <option value="Assigned">Assigned</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50 border-b border-slate-200 text-slate-500 text-xs uppercase tracking-wider">
                <th className="p-4 font-medium">ID</th>
                <th className="p-4 font-medium">Title & Category</th>
                <th className="p-4 font-medium hidden md:table-cell">Date</th>
                <th className="p-4 font-medium">Status</th>
                <th className="p-4 font-medium hidden sm:table-cell">Department</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredComplaints.length > 0 ? (
                filteredComplaints.map(complaint => (
                  <tr key={complaint.id} className="hover:bg-slate-50 transition-colors group">
                    <td className="p-4">
                      <Link to={`/complaints/${complaint.id}`} className="text-primary-accent font-medium hover:underline">
                        {complaint.id}
                      </Link>
                    </td>
                    <td className="p-4">
                      <div className="font-medium text-slate-900">{complaint.title}</div>
                      <div className="text-xs text-slate-500 flex items-center gap-2 mt-1">
                        {complaint.category}
                        {complaint.priority === 'Urgent' && (
                          <span className="text-red-500 flex items-center gap-0.5"><AlertTriangle size={10}/> Urgent</span>
                        )}
                      </div>
                    </td>
                    <td className="p-4 text-sm text-slate-600 hidden md:table-cell">
                      {new Date(complaint.date).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <Badge variant={
                        complaint.status === 'Resolved' ? 'success' : 
                        complaint.status === 'In Progress' ? 'primary' : 'default'
                      }>
                        {complaint.status}
                      </Badge>
                    </td>
                    <td className="p-4 text-sm text-slate-600 hidden sm:table-cell">
                      {complaint.department}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-8 text-center text-slate-500">
                    No complaints found matching your criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
