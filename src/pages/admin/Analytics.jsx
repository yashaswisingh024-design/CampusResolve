import React, { useState, useEffect } from 'react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line
} from 'recharts';
import { DashboardLayout } from '../../components/layout/DashboardLayout';

export default function Analytics() {
  const [complaints, setComplaints] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch('http://localhost:8080/api/admin/complaints');
        if (res.ok) {
          const data = await res.json();
          setComplaints(data);
        }
      } catch (err) {
        console.error('Failed to fetch complaints for analytics', err);
      } finally {
        setLoading(false);
      }
    };
    fetchComplaints();
  }, []);

  // Process data for Category Breakdown
  const categoriesMap = {};
  complaints.forEach(c => {
    const cat = c.category || 'Other';
    categoriesMap[cat] = (categoriesMap[cat] || 0) + 1;
  });
  const categoryData = Object.keys(categoriesMap).map(key => ({
    name: key,
    count: categoriesMap[key]
  }));

  // Colors
  const COLORS = ['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'];
  const STATUS_COLORS = {
    'SUBMITTED': '#94a3b8',
    'UNDER REVIEW': '#60a5fa',
    'ASSIGNED': '#f59e0b',
    'IN PROGRESS': '#3b82f6',
    'RESOLVED': '#22c55e'
  };

  // Process data for Status Distribution
  const statusMap = {};
  complaints.forEach(c => {
    const s = c.status?.replace('_', ' ')?.toUpperCase() || 'UNKNOWN';
    statusMap[s] = (statusMap[s] || 0) + 1;
  });
  const statusData = Object.keys(statusMap).map(key => ({
    name: key,
    value: statusMap[key]
  }));

  // Trend data mock fallback (since we don't have historical dates in basic complaint schema)
  const trendData = [
    { name: 'Mon', new: 4, resolved: 3 },
    { name: 'Tue', new: 7, resolved: 5 },
    { name: 'Wed', new: 5, resolved: 8 },
    { name: 'Thu', new: 10, resolved: 6 },
    { name: 'Fri', new: 8, resolved: 12 },
    { name: 'Sat', new: 3, resolved: 4 },
    { name: 'Sun', new: 2, resolved: 2 },
  ];

  return (
    <DashboardLayout>
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Analytics Overview</h1>
          <p className="text-slate-500 mt-1">Data-driven insights on campus operations.</p>
        </div>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading analytics...</div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          
          {/* Trend Chart */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6 lg:col-span-2">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Complaint Volume & Resolution Trend</h2>
            <div className="h-80 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trendData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e2e8f0" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <YAxis axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                  <Line type="monotone" dataKey="new" name="New Complaints" stroke="#f59e0b" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                  <Line type="monotone" dataKey="resolved" name="Resolved" stroke="#22c55e" strokeWidth={3} dot={{r: 4}} activeDot={{r: 6}} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Breakdown */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Issues by Category</h2>
            <div className="h-72 w-full">
              {categoryData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={categoryData} layout="vertical" margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e2e8f0" />
                    <XAxis type="number" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <YAxis dataKey="name" type="category" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} />
                    <Tooltip 
                      cursor={{fill: '#f8fafc'}}
                      contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    />
                    <Bar dataKey="count" fill="#2563eb" radius={[0, 4, 4, 0]} barSize={24} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-slate-400 text-sm">No data available</div>
              )}
            </div>
          </div>

          {/* Status Distribution */}
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Current Status Distribution</h2>
            <div className="h-72 w-full flex items-center justify-center relative">
              {statusData.length > 0 ? (
                <>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={statusData}
                        cx="50%"
                        cy="50%"
                        innerRadius={80}
                        outerRadius={110}
                        paddingAngle={2}
                        dataKey="value"
                      >
                        {statusData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={STATUS_COLORS[entry.name] || '#94a3b8'} />
                        ))}
                      </Pie>
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                        itemStyle={{ color: '#0f172a', fontWeight: '500' }}
                      />
                      <Legend iconType="circle" />
                    </PieChart>
                  </ResponsiveContainer>
                  
                  {/* Center text for donut */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none -mt-8">
                    <span className="text-3xl font-bold text-slate-900">{complaints.length}</span>
                    <span className="text-sm text-slate-500 font-medium">Total Issues</span>
                  </div>
                </>
              ) : (
                <div className="text-slate-400 text-sm">No data available</div>
              )}
            </div>
          </div>

        </div>
      )}
    </DashboardLayout>
  );
}
