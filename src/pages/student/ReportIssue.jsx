import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, X, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { useComplaints } from '../../context/ComplaintContext';

export default function ReportIssue() {
  const { user } = useAuth();
  const { addComplaint } = useComplaints();
  const navigate = useNavigate();
  
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [newId, setNewId] = useState('');
  
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    location: '',
    priority: 'Medium',
    description: '',
  });

  const categories = [
    'Infrastructure', 'Electrical', 'Internet / Wi-Fi', 'Hostel', 
    'Classroom', 'Library', 'Cleanliness', 'Transport', 'Other'
  ];

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // Simulate network delay
    setTimeout(() => {
      addComplaint({
        ...formData,
        studentId: user.id,
        status: 'Submitted',
        department: 'Pending Assignment', // Admin will assign this later
      });
      setLoading(false);
      setSuccess(true);
      setNewId('CR-' + Math.floor(1000 + Math.random() * 9000));
    }, 1500);
  };

  if (success) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={40} className="text-green-600" />
            </div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Complaint Submitted Successfully</h2>
            <p className="text-slate-600 mb-6">
              Your issue has been reported and sent to the campus desk for review.
            </p>
            <div className="bg-slate-50 rounded-lg p-4 mb-8 inline-block">
              <p className="text-sm text-slate-500 mb-1">Your Complaint ID</p>
              <p className="text-xl font-bold text-slate-900 tracking-wider">{newId}</p>
            </div>
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>
                Back to Dashboard
              </Button>
              <Button onClick={() => navigate('/complaints')}>
                Track Complaint
              </Button>
            </div>
          </div>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <div className="max-w-3xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Report an Issue</h1>
          <p className="text-slate-500 mt-1">Provide details about the problem to help us resolve it faster.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
            
            <Input
              label="Complaint Title"
              name="title"
              placeholder="e.g., Broken projector, Water leakage"
              value={formData.title}
              onChange={handleChange}
              required
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                <select
                  name="category"
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm"
                  value={formData.category}
                  onChange={handleChange}
                  required
                >
                  <option value="">Select Category</option>
                  {categories.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Priority</label>
                <select
                  name="priority"
                  className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm"
                  value={formData.priority}
                  onChange={handleChange}
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                  <option value="Urgent">Urgent</option>
                </select>
              </div>
            </div>

            <Input
              label="Location"
              name="location"
              placeholder="e.g., Block A - Room 204"
              value={formData.location}
              onChange={handleChange}
              required
            />

            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Description <span className="text-red-500">*</span></label>
                <span className="text-xs text-slate-400">{formData.description.length}/500</span>
              </div>
              <textarea
                name="description"
                rows={5}
                className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm resize-none"
                placeholder="Please describe the issue in detail..."
                value={formData.description}
                onChange={handleChange}
                maxLength={500}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Evidence / Photos (Optional)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
                <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-500">
                  <Upload size={24} />
                </div>
                <p className="text-sm font-medium text-slate-900">Click to upload or drag and drop</p>
                <p className="text-xs text-slate-500 mt-1">SVG, PNG, JPG or GIF (max. 5MB)</p>
              </div>
            </div>

          </div>
          
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Submitting...' : 'Submit Complaint'}
            </Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
