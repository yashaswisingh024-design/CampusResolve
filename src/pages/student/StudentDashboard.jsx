import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, List, Clock, CheckCircle2, ChevronRight, AlertTriangle, ArrowUpRight } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { Badge } from '../../components/common/Badge';
import { complaintApi, formatStatus, getStatusColor } from '../../api/apiClient';

export default function StudentDashboard() {
  const { user } = useAuth();
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!user?.userId) return;
    complaintApi.getMyComplaints(user.userId)
      .then(data => setComplaints(data))
      .catch(err => setError(err.message || 'Unable to load your complaints.'))
      .finally(() => setLoading(false));
  }, [user]);

  const activeComplaints = complaints.filter(c => c.status?.toUpperCase() !== 'RESOLVED');
  const recentComplaints = complaints.slice(0, 3);

  const stats = [
    { label: 'Total reported', value: complaints.length, icon: List, color: 'text-[#2F858E]', bg: 'bg-[#e3f0ed]' },
    { label: 'In progress', value: complaints.filter(c => c.status === 'IN PROGRESS' || c.status === 'UNDER REVIEW').length, icon: Clock, color: 'text-[#b87954]', bg: 'bg-[#f6e8dc]' },
    { label: 'Resolved', value: complaints.filter(c => c.status === 'RESOLVED').length, icon: CheckCircle2, color: 'text-[#517b63]', bg: 'bg-[#e7f0e6]' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-end justify-between gap-5">
        <div>
          <p className="text-[11px] uppercase tracking-[.2em] text-[#2F858E] font-bold mb-2">Student workspace</p>
          <h1 className="text-3xl sm:text-[2.35rem] font-extrabold text-[#222B33] leading-tight">Good to see you, {user?.name?.split(' ')[0] || 'Student'}.</h1>
          <p className="text-[#718084] mt-2">A clear view of the issues you’ve brought forward.</p>
        </div>
        <Link to="/report" className="group shrink-0 inline-flex items-center justify-center gap-2 rounded-full bg-[#2F858E] text-white px-5 py-3 font-semibold shadow-md shadow-[#2F858E]/15 hover:bg-[#256f77] hover:-translate-y-0.5 transition-all">
            <Plus size={18} /> Report an issue <ArrowUpRight size={16} className="text-[#EBCFB7] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-9">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.08 }} className="surface p-5 sm:p-6 flex items-center gap-4">
              <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}><Icon size={22} /></div>
              <div>
                <p className="text-[1.7rem] font-extrabold text-[#222B33] leading-none">{loading ? '—' : stat.value}</p>
                <p className="text-xs font-semibold text-[#718084] mt-2">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between px-1">
            <div><p className="text-[10px] uppercase tracking-[.18em] font-bold text-[#b87954]">Your reports</p><h2 className="text-xl font-bold text-[#222B33] mt-1">Recent complaints</h2></div>
            <Link to="/complaints" className="text-sm font-semibold text-[#2F858E] hover:text-[#205e65] flex items-center">View all <ChevronRight size={16} /></Link>
          </div>
          {loading ? (
            <div className="surface p-5 space-y-4" aria-label="Loading complaints">{[1,2,3].map(item => <div key={item} className="animate-pulse h-[68px] rounded-xl bg-[#f4eee6]" />)}</div>
          ) : error ? (
            <div className="surface p-7 text-center"><p className="text-sm text-[#9d5c4d]">{error}</p><button onClick={() => window.location.reload()} className="mt-3 text-sm font-bold text-[#2F858E]">Try again</button></div>
          ) : recentComplaints.length > 0 ? (
            <div className="surface overflow-hidden">
              <div className="divide-y divide-[#f0e9df]">
                {recentComplaints.map(complaint => (
                  <Link key={complaint.complaintId} to={`/complaints/${complaint.complaintId}`} className="block hover:bg-[#fbf7f1] transition-colors p-4 sm:p-5">
                    <div className="flex justify-between items-start gap-3 mb-2">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="text-[11px] font-bold text-[#97a1a0] tracking-wide">CR-{complaint.complaintId}</span>
                        <Badge variant={getStatusColor(complaint.status)}>{formatStatus(complaint.status)}</Badge>
                        {complaint.priority?.toUpperCase() === 'HIGH' && <Badge variant="danger" className="flex items-center gap-1"><AlertTriangle size={12} /> High</Badge>}
                      </div>
                    </div>
                    <h3 className="font-bold text-[#222B33] mb-1">{complaint.title}</h3>
                    <p className="text-sm text-[#718084] truncate">{complaint.category} · {complaint.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="surface p-9 text-center">
              <div className="mx-auto h-12 w-12 bg-[#e3f0ed] rounded-2xl flex items-center justify-center mb-4"><CheckCircle2 className="text-[#2F858E]" size={23} /></div>
              <h3 className="font-bold text-[#222B33] mb-1">Your first report starts here</h3>
              <p className="text-sm text-[#718084] mb-4">Bring a campus issue to the right people.</p>
              <Link to="/report" className="text-sm font-bold text-[#2F858E] hover:underline">Report an issue</Link>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div className="px-1"><p className="text-[10px] uppercase tracking-[.18em] font-bold text-[#2F858E]">Follow through</p><h2 className="text-xl font-bold text-[#222B33] mt-1 mb-4">Active updates</h2></div>
          <div className="surface p-5">
            {loading ? (
              <div className="animate-pulse h-24 rounded-xl bg-[#f4eee6]" />
            ) : activeComplaints.length > 0 ? (
              <div className="space-y-6">
                {activeComplaints.slice(0, 5).map(complaint => (
                  <div key={complaint.complaintId} className="relative pl-5 border-l-2 border-[#d6e8e4] pb-1">
                    <div className="absolute -left-[7px] top-1 h-3 w-3 rounded-full bg-[#2F858E] ring-4 ring-[#e3f0ed]" />
                    <p className="text-sm font-bold text-[#222B33]">{complaint.title}</p>
                    <p className="text-xs text-[#718084] mt-1">{formatStatus(complaint.status)} · CR-{complaint.complaintId}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-[#718084] text-center py-5">Nothing needs a follow-up right now.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
