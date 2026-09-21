import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, FileText, CheckCircle2, AlertTriangle, ChevronRight, BarChart3, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

export default function AdminDashboard() {
  const [data, setData] = useState({
    total: 0,
    submitted: 0,
    underReview: 0,
    inProgress: 0,
    resolved: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDashboardStats = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/admin/dashboard/full');
        if (res.ok) {
          const stats = await res.json();
          setData(stats);
        }
      } catch (err) {
        console.error('Failed to fetch admin dashboard stats', err);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardStats();
  }, []);

  const stats = [
    { label: 'Total Complaints', value: data.total, icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100' },
    { label: 'In Progress', value: data.inProgress, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Resolved', value: data.resolved, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Under Review', value: data.underReview, icon: AlertTriangle, color: 'text-amber-600', bg: 'bg-amber-100' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Campus Operations</h1>
        <p className="text-slate-500 mt-1">Monitor, assign and resolve campus issues efficiently.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-sm flex items-center gap-4"
            >
              <div className={`h-12 w-12 rounded-full ${stat.bg} ${stat.color} flex items-center justify-center`}>
                <Icon size={24} />
              </div>
              <div>
                <p className="text-2xl font-bold text-slate-900">{loading ? '-' : stat.value}</p>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Needs Attention */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:col-span-2">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Needs Attention</h2>
            <Link to="/admin/complaints" className="text-sm font-medium text-primary-accent hover:text-blue-700">
              Go to full complaint management
            </Link>
          </div>
          <p className="text-slate-600 text-sm">
            You currently have <strong>{data.submitted}</strong> newly submitted complaints waiting for review, and <strong>{data.underReview}</strong> complaints under review.
          </p>
          <div className="mt-4">
            <Link to="/admin/complaints?status=SUBMITTED">
              <button className="bg-primary-accent text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors">
                Review New Complaints
              </button>
            </Link>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
