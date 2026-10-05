import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { adminApi } from '../../api/apiClient';

export default function Analytics() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminApi.getComplaints()
      .then(data => setComplaints(data))
      .catch(err => console.error('Failed to fetch complaints for analytics', err))
      .finally(() => setLoading(false));
  }, []);

  const categoriesMap = {};
  complaints.forEach(c => { const cat = c.category || 'Other'; categoriesMap[cat] = (categoriesMap[cat] || 0) + 1; });
  const categoryData = Object.keys(categoriesMap).map(key => ({ name: key, count: categoriesMap[key] }));

  const STATUS_COLORS = { 'SUBMITTED': '#94a3b8', 'UNDER REVIEW': '#60a5fa', 'IN PROGRESS': '#3b82f6', 'RESOLVED': '#22c55e' };
  const statusMap = {};
  complaints.forEach(c => { const s = c.status || 'UNKNOWN'; statusMap[s] = (statusMap[s] || 0) + 1; });
  const statusData = Object.keys(statusMap).map(key => ({ name: key, value: statusMap[key] }));

  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const trendMap = { 'Mon': { new: 0, resolved: 0 }, 'Tue': { new: 0, resolved: 0 }, 'Wed': { new: 0, resolved: 0 }, 'Thu': { new: 0, resolved: 0 }, 'Fri': { new: 0, resolved: 0 }, 'Sat': { new: 0, resolved: 0 }, 'Sun': { new: 0, resolved: 0 } };
  
  complaints.forEach(c => {
    if (c.createdAt) {
      const date = new Date(c.createdAt);
      const dayName = days[date.getDay()];
      trendMap[dayName].new++;
      if (c.status === 'RESOLVED') {
        trendMap[dayName].resolved++;
      }
    }
  });
  const trendData = Object.keys(trendMap).map(key => ({ name: key, ...trendMap[key] }));

  return (
    <DashboardLayout>
      <div className="mb-8"><h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics Overview</h1><p className="text-slate-500 mt-1">Data-driven insights on campus operations.</p></div>
      {loading ? <div className="p-8 text-center text-slate-500">Loading analytics...</div> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Complaint Volume & Resolution Trend</h2>
            <div className="h-80 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#64748b'}} /><YAxis axisLine={false} tickLine={false} tick={{fill:'#64748b'}} /><Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} /><Line type="monotone" dataKey="new" name="New Complaints" stroke="#f59e0b" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} /><Line type="monotone" dataKey="resolved" name="Resolved" stroke="#22c55e" strokeWidth={3} dot={{r:4}} activeDot={{r:6}} /></LineChart></ResponsiveContainer></div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Issues by Category</h2>
            <div className="h-72 w-full">{categoryData.length > 0 ? <ResponsiveContainer width="100%" height="100%"><BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}><CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" /><XAxis type="number" axisLine={false} tickLine={false} tick={{fill:'#64748b'}} /><YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill:'#64748b'}} width={120} /><Tooltip cursor={{fill:'#f8fafc'}} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} /><Bar dataKey="count" fill="#2563eb" radius={[0,4,4,0]} barSize={24} /></BarChart></ResponsiveContainer> : <div className="flex h-full items-center justify-center text-slate-400 text-sm">No data available</div>}</div>
          </div>
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Current Status Distribution</h2>
            <div className="h-72 w-full flex items-center justify-center relative">{statusData.length > 0 ? <><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} cx="50%" cy="50%" innerRadius={80} outerRadius={110} paddingAngle={2} dataKey="value">{statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#94a3b8'} />)}</Pie><Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} itemStyle={{ color: '#0f172a', fontWeight: '500' }} /><Legend iconType="circle" /></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-8"><span className="text-3xl font-bold text-slate-900">{complaints.length}</span><span className="text-sm text-slate-500 font-medium">Total Issues</span></div></> : <div className="text-slate-400 text-sm">No data available</div>}</div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
