import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Search, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';
import { complaintApi, formatStatus, getStatusColor, STATUSES } from '../../api/apiClient';

export default function StudentComplaints() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  useEffect(() => {
    if (!user?.userId) return;
    complaintApi.getMyComplaints(user.userId)
      .then(data => setComplaints(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false));
  }, [user]);

  const filteredComplaints = complaints.filter(c => {
    const matchesSearch = c.title?.toLowerCase().includes(search.toLowerCase()) || c.complaintId?.toString().includes(search);
    const matchesStatus = statusFilter === 'All' || c.status?.toUpperCase() === statusFilter.toUpperCase();
    return matchesSearch && matchesStatus;
  });

  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[.2em] font-bold text-[#2F858E] mb-2">Your activity</p>
        <h1 className="text-3xl font-extrabold text-[#222B33] tracking-tight">My complaints</h1>
        <p className="text-[#718084] mt-2">Every report, with its current status and what comes next.</p>
      </div>
      <div className="surface overflow-hidden mb-6">
        <div className="p-4 sm:p-5 border-b border-[#e8dfd3] flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
            <input type="text" aria-label="Search complaints" placeholder="Search by ID or title..." className="w-full pl-10 pr-4 py-2.5 border bg-[#fffdfa] focus:outline-none focus:ring-2 text-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <select aria-label="Filter by status" className="border px-3 py-2.5 text-sm focus:outline-none focus:ring-2 bg-[#fffdfa]" value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
            <option value="All">All Statuses</option>
            {STATUSES.map(s => <option key={s} value={s}>{formatStatus(s)}</option>)}
          </select>
        </div>
        <div className="overflow-x-auto">
          {loading ? <div className="p-6 space-y-3">{[1,2,3].map(i => <div key={i} className="h-14 animate-pulse rounded-lg bg-[#f4eee6]" />)}</div>
          : error ? <div role="alert" className="p-8 text-center text-[#9d5c4d]">{error}<button onClick={() => window.location.reload()} className="block mx-auto mt-3 text-sm font-bold text-[#2F858E]">Try again</button></div>
          : <table className="w-full text-left border-collapse">
            <thead><tr className="border-b border-[#e8dfd3] text-xs uppercase">
              <th className="p-4 font-medium">ID</th><th className="p-4 font-medium">Title & Category</th><th className="p-4 font-medium">Status</th>
            </tr></thead>
              <tbody className="divide-y divide-[#f0e9df]">
              {filteredComplaints.length > 0 ? filteredComplaints.map(c => (
                <tr key={c.complaintId} className="hover:bg-[#fbf7f1] transition-colors">
                  <td className="p-4"><Link to={`/complaints/${c.complaintId}`} className="text-[#2F858E] font-bold hover:underline">CR-{c.complaintId}</Link></td>
                  <td className="p-4"><div className="font-semibold text-[#222B33]">{c.title}</div><div className="text-xs text-[#718084] flex items-center gap-2 mt-1">{c.category}{c.priority?.toUpperCase() === 'HIGH' && <span className="text-[#a95042] flex items-center gap-0.5"><AlertTriangle size={10} /> High priority</span>}</div></td>
                  <td className="p-4"><Badge variant={getStatusColor(c.status)}>{formatStatus(c.status)}</Badge></td>
                </tr>
                )) : <tr><td colSpan="3" className="p-10 text-center text-[#718084]">No complaints match these filters. Try a different search.</td></tr>}
            </tbody>
          </table>}
        </div>
      </div>
    </DashboardLayout>
  );
}
