import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Upload, CheckCircle2 } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Button } from '../../components/common/Button';
import { Input } from '../../components/common/Input';
import { useAuth } from '../../context/AuthContext';
import { complaintApi, CATEGORIES } from '../../api/apiClient';

export default function ReportIssue() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [newComplaintId, setNewComplaintId] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [formData, setFormData] = useState({ title: '', category: '', location: '', description: '' });

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
      if (!formData.title.trim()) {
    setError('Please enter a complaint title.');
    return;
  }

  if (!formData.category) {
    setError('Please select a complaint category.');
    return;
  }

  if (!formData.location.trim()) {
    setError('Please enter the complaint location.');
    return;
  }

  if (!formData.description.trim()) {
    setError('Please enter a description of the complaint.');
    return;
  }
    setLoading(true);
    setError('');
    try {
  const complaintData = {
  userId: user.userId,
  title: formData.title,
  description: formData.description,
  location: formData.location,
  category: formData.category,
  };
const formDataToSend = new FormData();
formDataToSend.append(
  'complaint',
  new Blob([JSON.stringify(complaintData)], {
    type: 'application/json',
  })
);

  if (selectedImage) {
  formDataToSend.append('image', selectedImage);
  }
  const result = await complaintApi.create(formDataToSend);
      setNewComplaintId(result?.complaintId);
      setSuccess(true);
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <DashboardLayout>
        <div className="max-w-2xl mx-auto mt-10">
          <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-10 text-center">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={40} className="text-green-600" /></div>
            <h2 className="text-2xl font-bold text-slate-900 mb-2">Complaint Submitted Successfully</h2>
            <p className="text-slate-600 mb-2">Your issue has been reported and sent to the campus desk for review.</p>
            {newComplaintId && <p className="text-sm text-slate-500 mb-6">Complaint ID: <strong>CR-{newComplaintId}</strong></p>}
            <div className="flex gap-4 justify-center">
              <Button variant="outline" onClick={() => navigate('/dashboard')}>Back to Dashboard</Button>
              <Button onClick={() => navigate('/complaints')}>Track Complaint</Button>
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
        {error && <div className="bg-red-50 text-red-600 p-4 rounded-lg text-sm font-medium mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 md:p-8 space-y-6">
          <Input label={<>Complaint Title <span className="text-red-500">*</span></>}name="title"placeholder="e.g., Broken projector, Water leakage"value={formData.title}onChange={handleChange}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1.5">Category <span className="text-red-500">*</span></label>
                <select name="category" className="flex h-10 w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm" value={formData.category} onChange={handleChange} >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <Input label={<>Location <span className="text-red-500">*</span></>}name="location"placeholder="e.g., Block A - Room 204"value={formData.location}onChange={handleChange}/>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-medium text-slate-700">Description <span className="text-red-500">*</span></label>
                <span className="text-xs text-slate-400">{formData.description.length}/500</span>
              </div>
              <textarea name="description" rows={5} className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm resize-none" placeholder="Please describe the issue in detail..." value={formData.description} onChange={handleChange} maxLength={500}  />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1.5">Evidence / Photos (Optional)</label>
              <div className="border-2 border-dashed border-slate-300 rounded-xl p-8 text-center hover:bg-slate-50 transition-colors cursor-pointer">
  <label className="cursor-pointer">
    <div className="mx-auto w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center mb-3 text-slate-500">
      <Upload size={24} />
    </div>

    <p className="text-sm font-medium text-slate-900">
      Click to upload an image
    </p>

    <p className="text-xs text-slate-500 mt-1">
      JPG, PNG or JPEG
    </p>

    <input
      type="file"
      accept="image/png,image/jpeg,image/jpg"
      className="hidden"
      onChange={(e) => setSelectedImage(e.target.files[0])}
    />
  </label>

  {selectedImage && (
    <p className="text-sm text-green-600 mt-3 font-medium">
      Selected: {selectedImage.name}
    </p>
  )}
            </div>
            </div>
          </div>
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Complaint'}</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
