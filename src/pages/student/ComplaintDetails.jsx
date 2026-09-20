import React from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, MapPin, ShieldCheck, Wrench, FileText } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { useComplaints } from '../../context/ComplaintContext';
import { Badge } from '../../components/common/Badge';

export default function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { complaints } = useComplaints();
  
  const complaint = complaints.find(c => c.id === id);

  if (!complaint) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900">Complaint not found</h2>
          <button onClick={() => navigate('/complaints')} className="mt-4 text-primary-accent hover:underline">
            Back to Complaints
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const getTimelineIcon = (status) => {
    switch(status) {
      case 'Submitted': return <CheckCircle2 className="text-slate-500" size={20} />;
      case 'Reviewed': return <ShieldCheck className="text-blue-500" size={20} />;
      case 'Assigned': return <MapPin className="text-amber-500" size={20} />;
      case 'In Progress': return <Wrench className="text-primary-accent" size={20} />;
      case 'Resolved': return <CheckCircle2 className="text-green-500" size={20} />;
      default: return <Clock className="text-slate-400" size={20} />;
    }
  };

  return (
    <DashboardLayout>
      <div className="mb-6 flex items-center gap-4">
        <button 
          onClick={() => navigate('/complaints')}
          className="p-2 bg-white rounded-full border border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-50 transition-colors"
        >
          <ArrowLeft size={20} />
        </button>
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-slate-900 tracking-tight">{complaint.title}</h1>
            <Badge variant={
              complaint.status === 'Resolved' ? 'success' : 
              complaint.status === 'In Progress' ? 'primary' : 'default'
            }>
              {complaint.status}
            </Badge>
          </div>
          <p className="text-slate-500 text-sm mt-1">Complaint ID: {complaint.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Details</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mb-6">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Category</p>
                <p className="font-semibold text-slate-900">{complaint.category}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Priority</p>
                <p className="font-semibold text-slate-900">{complaint.priority}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Location</p>
                <p className="font-semibold text-slate-900">{complaint.location}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Department</p>
                <p className="font-semibold text-slate-900">{complaint.department}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Description</p>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {complaint.description}
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Evidence</h2>
            <div className="flex items-center justify-center p-8 border-2 border-dashed border-slate-200 rounded-xl bg-slate-50">
              <div className="text-center">
                <FileText className="mx-auto text-slate-400 mb-2" size={32} />
                <p className="text-sm text-slate-500">No files uploaded.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Tracking Timeline</h2>
            
            <div className="relative border-l-2 border-slate-100 ml-3 space-y-8">
              {complaint.timeline.map((item, idx) => {
                const isLast = idx === complaint.timeline.length - 1;
                return (
                  <div key={idx} className="relative pl-6">
                    <div className="absolute -left-[11px] top-0 h-5 w-5 bg-white border-2 border-slate-200 rounded-full flex items-center justify-center shadow-sm">
                      <div className={`h-2.5 w-2.5 rounded-full ${isLast ? 'bg-primary-accent animate-pulse' : 'bg-slate-300'}`}></div>
                    </div>
                    
                    <div className="bg-slate-50 rounded-lg p-3 border border-slate-100 -mt-2">
                      <div className="flex justify-between items-start mb-1">
                        <p className={`font-semibold text-sm ${isLast ? 'text-primary-accent' : 'text-slate-700'}`}>
                          {item.status}
                        </p>
                        <p className="text-xs text-slate-500">{new Date(item.date).toLocaleString([], {hour: '2-digit', minute:'2-digit', month: 'short', day: 'numeric'})}</p>
                      </div>
                      <p className="text-sm text-slate-600">{item.note}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
