import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line } from 'recharts';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { adminApi } from '../../api/apiClient';

export default function Analytics() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    adminApi.getComplaints()
      .then(data => setComplaints(data))
      .catch(err => setError(err.message || 'Unable to load analytics.'))
      .finally(() => setLoading(false));
  }, []);

  const categoriesMap = {};
  complaints.forEach(c => { const cat = c.category || 'Other'; categoriesMap[cat] = (categoriesMap[cat] || 0) + 1; });
  const categoryData = Object.keys(categoriesMap).map(key => ({ name: key, count: categoriesMap[key] }));

  const STATUS_COLORS = { 'SUBMITTED': '#a8aaa1', 'UNDER REVIEW': '#d49a63', 'IN PROGRESS': '#2F858E', 'RESOLVED': '#6d9875' };
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
      <div className="mb-8"><p className="text-[10px] uppercase tracking-[.2em] font-bold text-[#2F858E] mb-2">Patterns & progress</p><h1 className="text-3xl font-extrabold text-[#222B33] tracking-tight">Analytics overview</h1><p className="text-[#718084] mt-2">A campus-wide read on incoming issues and resolution pace.</p></div>
      {loading ? <div className="grid gap-6 lg:grid-cols-2"><div className="surface h-96 animate-pulse bg-[#f3ece2]" /><div className="surface h-80 animate-pulse bg-[#f3ece2]" /><div className="surface h-80 animate-pulse bg-[#f3ece2]" /></div> : error ? <div role="alert" className="surface p-10 text-center text-[#9d5c4d]">{error}<button onClick={() => window.location.reload()} className="block mx-auto mt-3 text-sm font-bold text-[#2F858E]">Try again</button></div> : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div className="surface p-5 sm:p-6 lg:col-span-2">
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#b87954]">Weekly pulse</p><h2 className="text-xl font-bold text-[#222B33] mt-1 mb-6">Complaint volume & resolution trend</h2>
            <div className="h-80 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={trendData} margin={{ top: 5, right: 24, left: 8, bottom: 5 }}><CartesianGrid strokeDasharray="3 5" vertical={false} stroke="#eee5d9" /><XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill:'#718084',fontSize:12}} /><YAxis axisLine={false} tickLine={false} tick={{fill:'#718084',fontSize:12}} /><Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e8dfd3', background: '#fffdfa', boxShadow: '0 8px 24px rgba(67,57,43,.08)' }} /><Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', color:'#53636a' }} /><Line type="monotone" dataKey="new" name="New complaints" stroke="#d49a63" strokeWidth={3} dot={{r:4,fill:'#d49a63',strokeWidth:0}} activeDot={{r:6}} /><Line type="monotone" dataKey="resolved" name="Resolved" stroke="#2F858E" strokeWidth={3} dot={{r:4,fill:'#2F858E',strokeWidth:0}} activeDot={{r:6}} /></LineChart></ResponsiveContainer></div>
          </div>
          <div className="surface p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#b87954]">Where it happens</p><h2 className="text-xl font-bold text-[#222B33] mt-1 mb-6">Issues by category</h2>
            <div className="h-72 w-full">{categoryData.length > 0 ? <ResponsiveContainer width="100%" height="100%"><BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 20, left: 40, bottom: 5 }}><CartesianGrid strokeDasharray="3 5" horizontal={false} stroke="#eee5d9" /><XAxis type="number" axisLine={false} tickLine={false} tick={{fill:'#718084',fontSize:12}} /><YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill:'#53636a',fontSize:11}} width={125} /><Tooltip cursor={{fill:'#f8f3ec'}} contentStyle={{ borderRadius: '12px', border: '1px solid #e8dfd3', background: '#fffdfa' }} /><Bar dataKey="count" fill="#2F858E" radius={[0,6,6,0]} barSize={22} /></BarChart></ResponsiveContainer> : <div className="flex h-full items-center justify-center text-[#97a1a0] text-sm">No category data available</div>}</div>
          </div>
          <div className="surface p-5 sm:p-6">
            <p className="text-[10px] font-bold uppercase tracking-[.17em] text-[#2F858E]">Current workload</p><h2 className="text-xl font-bold text-[#222B33] mt-1 mb-6">Status distribution</h2>
            <div className="h-72 w-full flex items-center justify-center relative">{statusData.length > 0 ? <><ResponsiveContainer width="100%" height="100%"><PieChart><Pie data={statusData} cx="50%" cy="50%" innerRadius={78} outerRadius={105} paddingAngle={3} dataKey="value">{statusData.map((entry, index) => <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#a8aaa1'} />)}</Pie><Tooltip contentStyle={{ borderRadius: '12px', border: '1px solid #e8dfd3', background: '#fffdfa' }} itemStyle={{ color: '#222B33', fontWeight: '600' }} /><Legend iconType="circle" /></PieChart></ResponsiveContainer><div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-8"><span className="text-3xl font-extrabold text-[#222B33]">{complaints.length}</span><span className="text-xs text-[#718084] font-semibold">total issues</span></div></> : <div className="text-[#97a1a0] text-sm">No status data available</div>}</div>
          </div>
        </div>
      )}
    </DashboardLayout>
  );
}
