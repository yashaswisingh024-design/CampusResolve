import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Users, FileText, CheckCircle2, AlertTriangle, ChevronRight, BarChart3, TrendingUp } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useComplaints } from '../../context/ComplaintContext';
import { departments } from '../../data/mockUsers';

export default function AdminDashboard() {
  const { complaints } = useComplaints();

  const total = complaints.length;
  const inProgress = complaints.filter(c => c.status === 'In Progress').length;
  const resolved = complaints.filter(c => c.status === 'Resolved').length;
  const urgent = complaints.filter(c => c.priority === 'Urgent').length;

  const stats = [
    { label: 'Total Complaints', value: total, icon: FileText, color: 'text-slate-600', bg: 'bg-slate-100' },
    { label: 'In Progress', value: inProgress, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Resolved', value: resolved, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
    { label: 'Urgent', value: urgent, icon: AlertTriangle, color: 'text-red-600', bg: 'bg-red-100' },
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
                <p className="text-2xl font-bold text-slate-900">{stat.value}</p>
                <p className="text-sm font-medium text-slate-500">{stat.label}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Department Workload (Mock Chart) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Department Workload</h2>
            <Link to="/admin/departments" className="text-sm font-medium text-primary-accent hover:text-blue-700">
              View all
            </Link>
          </div>
          <div className="space-y-4">
            {departments.slice(0, 5).map(dept => {
              const count = complaints.filter(c => c.department === dept).length;
              const max = Math.max(...departments.map(d => complaints.filter(c => c.department === d).length), 1);
              const percentage = (count / max) * 100;
              return (
                <div key={dept}>
                  <div className="flex justify-between text-sm mb-1">
                    <span className="font-medium text-slate-700">{dept}</span>
                    <span className="text-slate-500">{count} active</span>
                  </div>
                  <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-primary-accent rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Needs Attention */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-bold text-slate-900">Needs Attention</h2>
            <Link to="/admin/complaints" className="text-sm font-medium text-primary-accent hover:text-blue-700">
              View all
            </Link>
          </div>
          <div className="divide-y divide-slate-100">
            {complaints.filter(c => c.priority === 'Urgent' || c.status === 'Submitted').slice(0, 4).map(complaint => (
              <div key={complaint.id} className="py-3 flex items-start gap-3">
                <div className={`mt-0.5 h-2 w-2 rounded-full ${complaint.priority === 'Urgent' ? 'bg-red-500 animate-pulse' : 'bg-amber-500'}`}></div>
                <div>
                  <Link to={`/admin/complaints?id=${complaint.id}`} className="text-sm font-semibold text-slate-900 hover:text-primary-accent block mb-0.5">
                    {complaint.title}
                  </Link>
                  <p className="text-xs text-slate-500">{complaint.id} • {complaint.department}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
