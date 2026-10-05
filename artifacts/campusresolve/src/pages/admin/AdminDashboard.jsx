import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FileText, CheckCircle2, AlertTriangle, TrendingUp, ArrowRight } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { adminApi } from '../../api/apiClient';

export default function AdminDashboard() {
  const [data, setData] = useState({ total: 0, submitted: 0, underReview: 0, inProgress: 0, resolved: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.getDashboard()
      .then(stats => setData(stats))
      .catch(err => setError(err.message || 'Unable to load operations overview.'))
      .finally(() => setLoading(false));
  }, []);

  const stats = [
    { label: 'Total complaints', value: data.total, icon: FileText, color: 'text-[#2F858E]', bg: 'bg-[#e3f0ed]' },
    { label: 'In progress', value: data.inProgress, icon: TrendingUp, color: 'text-[#b87954]', bg: 'bg-[#f6e8dc]' },
    { label: 'Resolved', value: data.resolved, icon: CheckCircle2, color: 'text-[#517b63]', bg: 'bg-[#e7f0e6]' },
    { label: 'Under review', value: data.underReview, icon: AlertTriangle, color: 'text-[#a67939]', bg: 'bg-[#f7efd9]' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <p className="text-[10px] uppercase tracking-[.2em] font-bold text-[#2F858E] mb-2">Administrator workspace</p>
        <h1 className="text-3xl sm:text-[2.35rem] font-extrabold text-[#222B33] tracking-tight">Campus operations</h1>
        <p className="text-[#718084] mt-2">See what needs attention, then move each report forward.</p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => { const Icon = stat.icon; return (
          <motion.div key={idx} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: idx * 0.07 }} className="surface p-5 flex items-center gap-4">
            <div className={`h-12 w-12 rounded-2xl ${stat.bg} ${stat.color} flex items-center justify-center`}><Icon size={22} /></div>
            <div><p className="text-[1.7rem] font-extrabold text-[#222B33] leading-none">{loading ? '—' : stat.value}</p><p className="text-xs font-semibold text-[#718084] mt-2">{stat.label}</p></div>
          </motion.div>
        ); })}
      </div>
      {error ? <div role="alert" className="surface p-7 text-[#9d5c4d]">{error}<button onClick={() => window.location.reload()} className="ml-3 font-bold underline">Try again</button></div> : (
      <div className="surface p-6 sm:p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 h-48 w-48 rounded-full bg-[#e3f0ed] -translate-y-1/2 translate-x-1/3" />
        <div className="relative">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div><p className="text-[10px] uppercase tracking-[.18em] font-bold text-[#b87954]">Queue health</p><h2 className="text-xl font-bold text-[#222B33] mt-1">Needs attention</h2></div>
            <Link to="/admin/complaints" className="text-sm font-semibold text-[#2F858E] hover:text-[#205e65] flex items-center">Full complaint queue <ArrowRight size={16} className="ml-1" /></Link>
          </div>
          {loading ? <div className="h-14 animate-pulse rounded-xl bg-[#f4eee6]" /> : (
            <div className="grid sm:grid-cols-2 gap-3">
              <div className="rounded-xl bg-[#f8f3ec] p-4"><p className="text-3xl font-extrabold text-[#222B33]">{data.submitted}</p><p className="text-sm text-[#718084] mt-1">New reports awaiting review</p></div>
              <div className="rounded-xl bg-[#f8f3ec] p-4"><p className="text-3xl font-extrabold text-[#222B33]">{data.underReview}</p><p className="text-sm text-[#718084] mt-1">Reports under review</p></div>
            </div>
          )}
          <div className="mt-5"><Link to="/admin/complaints" className="inline-flex items-center gap-2 bg-[#2F858E] text-white px-5 py-3 rounded-full text-sm font-semibold hover:bg-[#256f77] transition-colors">Review complaints <ArrowRight size={16} /></Link></div>
        </div>
      </div>
      )}
    </DashboardLayout>
  );
}
