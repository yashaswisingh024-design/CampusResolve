import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Plus, List, Clock, CheckCircle2, ChevronRight, AlertTriangle } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';
import { Badge } from '../../components/common/Badge';

export default function StudentDashboard() {
  const { user } = useAuth();
  const { complaints } = useComplaints();

  const userComplaints = complaints.filter(c => c.studentId === user.id);
  const activeComplaints = userComplaints.filter(c => c.status !== 'Resolved');
  const recentComplaints = userComplaints.slice(0, 3);

  const stats = [
    { label: 'Total Reported', value: userComplaints.length, icon: List, color: 'text-slate-600', bg: 'bg-slate-100' },
    { label: 'In Progress', value: userComplaints.filter(c => c.status === 'In Progress').length, icon: Clock, color: 'text-blue-600', bg: 'bg-blue-100' },
    { label: 'Resolved', value: userComplaints.filter(c => c.status === 'Resolved').length, icon: CheckCircle2, color: 'text-green-600', bg: 'bg-green-100' },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Good morning, {user?.name.split(' ')[0]}.</h1>
          <p className="text-slate-500 mt-1">Here's what's happening with your campus issues.</p>
        </div>
        <Link to="/report" className="shrink-0">
          <button className="flex items-center gap-2 bg-primary-accent text-white px-4 py-2.5 rounded-lg font-medium hover:bg-blue-700 transition-colors shadow-sm w-full sm:w-auto justify-center">
            <Plus size={18} />
            Report New Issue
          </button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
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

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Complaints */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-slate-900">Recent Complaints</h2>
            <Link to="/complaints" className="text-sm font-medium text-primary-accent hover:text-blue-700 flex items-center">
              View all <ChevronRight size={16} />
            </Link>
          </div>

          {recentComplaints.length > 0 ? (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
              <div className="divide-y divide-slate-100">
                {recentComplaints.map(complaint => (
                  <Link key={complaint.id} to={`/complaints/${complaint.id}`} className="block hover:bg-slate-50 transition-colors p-4 sm:p-5">
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-400">{complaint.id}</span>
                        <Badge variant={
                          complaint.status === 'Resolved' ? 'success' : 
                          complaint.status === 'In Progress' ? 'primary' : 'default'
                        }>
                          {complaint.status}
                        </Badge>
                        {complaint.priority === 'Urgent' && (
                          <Badge variant="danger" className="flex items-center gap-1"><AlertTriangle size={12}/> Urgent</Badge>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{new Date(complaint.date).toLocaleDateString()}</span>
                    </div>
                    <h3 className="font-semibold text-slate-900 mb-1">{complaint.title}</h3>
                    <p className="text-sm text-slate-500 truncate">{complaint.category} • {complaint.location}</p>
                  </Link>
                ))}
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-8 text-center">
              <div className="mx-auto h-12 w-12 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <CheckCircle2 className="text-slate-300" size={24} />
              </div>
              <h3 className="font-semibold text-slate-900 mb-1">No complaints yet</h3>
              <p className="text-sm text-slate-500 mb-4">You haven't reported any issues.</p>
              <Link to="/report">
                <button className="text-sm font-medium text-primary-accent hover:text-blue-700">
                  Report your first issue
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Quick Info / Timeline */}
        <div className="space-y-4">
          <h2 className="text-lg font-bold text-slate-900 mb-4">Active Updates</h2>
          
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
            {activeComplaints.length > 0 ? (
              <div className="space-y-6">
                {activeComplaints.map(complaint => (
                  <div key={complaint.id} className="relative pl-4 border-l-2 border-slate-100">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary-accent border-2 border-white"></div>
                    <p className="text-sm font-semibold text-slate-900">{complaint.title}</p>
                    <p className="text-xs text-slate-500 mt-1">{complaint.status} • {complaint.department}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-sm text-slate-500 text-center py-4">No active updates.</p>
            )}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
