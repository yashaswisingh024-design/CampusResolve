import React from 'react';
import { Building, Users, Clock, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { departments } from '../../data/mockUsers';
import { useComplaints } from '../../context/ComplaintContext';

export default function AdminDepartments() {
  const { complaints } = useComplaints();

  return (
    <DashboardLayout>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Departments</h1>
        <p className="text-slate-500 mt-1">Overview of department workloads and resolution metrics.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {departments.map((dept, index) => {
          const deptComplaints = complaints.filter(c => c.department === dept);
          const open = deptComplaints.filter(c => ['Submitted', 'Reviewed'].includes(c.status)).length;
          const inProgress = deptComplaints.filter(c => ['Assigned', 'In Progress'].includes(c.status)).length;
          const resolved = deptComplaints.filter(c => c.status === 'Resolved').length;
          
          return (
            <div key={dept} className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden group flex flex-col">
              <div className="p-6 border-b border-slate-100 flex-grow">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-10 w-10 rounded-lg bg-blue-50 text-primary-accent flex items-center justify-center group-hover:bg-primary-accent group-hover:text-white transition-colors">
                    <Building size={20} />
                  </div>
                  <h2 className="text-lg font-bold text-slate-900">{dept}</h2>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-center mb-4">
                  <div className="bg-slate-50 rounded-lg p-2">
                    <p className="text-xl font-bold text-slate-900">{open}</p>
                    <p className="text-xs font-medium text-slate-500 uppercase">Open</p>
                  </div>
                  <div className="bg-blue-50 rounded-lg p-2">
                    <p className="text-xl font-bold text-blue-700">{inProgress}</p>
                    <p className="text-xs font-medium text-blue-600 uppercase">In Prog</p>
                  </div>
                  <div className="bg-green-50 rounded-lg p-2">
                    <p className="text-xl font-bold text-green-700">{resolved}</p>
                    <p className="text-xs font-medium text-green-600 uppercase">Resolved</p>
                  </div>
                </div>
              </div>
              <div className="bg-slate-50 px-6 py-4 flex justify-between items-center text-sm">
                <div className="flex items-center gap-1.5 text-slate-500 font-medium">
                  <Clock size={16} />
                  Avg. time: {2 + (index % 3)} days
                </div>
                <button className="text-primary-accent font-medium hover:text-blue-700">
                  View staff
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </DashboardLayout>
  );
}
