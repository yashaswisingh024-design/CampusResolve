import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';

export default function StudentComplaints() {
  const { user } = useAuth();
  
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/complaints/my?userId=${user.userId}`);
        if (!res.ok) throw new Error('Failed to fetch complaints');
        const data = await res.json();
        setComplaints(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (user?.userId) {
      fetchComplaints();
    }
  }, [user]);

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.title?.toLowerCase().includes(search.toLowerCase()) || 
                          c.id?.toString().includes(search.toLowerCase());
    // Assume backend returns uppercase statuses with underscores (e.g. IN_PROGRESS) 
    // We will loosely match against our dropdown values
    const cStatus = c.status?.replace('_', ' ')?.toUpperCase();
    const fStatus = statusFilter.toUpperCase();
    const matchesStatus = statusFilter === 'All' || cStatus === fStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === 'RESOLVED') return 'success';
    if (s === 'IN_PROGRESS' || s === 'IN PROGRESS') return 'primary';
    if (s === 'ASSIGNED') return 'warning';
    return 'default';
  };

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
              <option value="Under Review">Under Review</option>
              <option value="In Progress">In Progress</option>
              <option value="Resolved">Resolved</option>
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
                  <th className="p-4 font-medium">ID</th>
                  <th className="p-4 font-medium">Title & Category</th>
                  <th className="p-4 font-medium">Status</th>
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
                          {complaint.priority?.toUpperCase() === 'HIGH' && (
                            <span className="text-red-500 flex items-center gap-0.5"><AlertTriangle size={10}/> High Priority</span>
                          )}
                        </div>
                      </td>
                      <td className="p-4">
                        <Badge variant={getStatusBadge(complaint.status)}>
                          {complaint.status?.replace('_', ' ')}
                        </Badge>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="3" className="p-8 text-center text-slate-500">
                      No complaints found matching your criteria.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
}
