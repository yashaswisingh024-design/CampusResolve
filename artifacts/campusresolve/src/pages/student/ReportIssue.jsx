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
          <div className="surface p-8 sm:p-10 text-center">
            <div className="w-20 h-20 bg-[#e3f0ed] rounded-[1.6rem] flex items-center justify-center mx-auto mb-6"><CheckCircle2 size={38} className="text-[#2F858E]" /></div>
            <p className="text-[10px] uppercase tracking-[.2em] font-bold text-[#2F858E] mb-2">Report received</p>
            <h2 className="text-2xl font-extrabold text-[#222B33] mb-2">Your voice is in the right place.</h2>
            <p className="text-[#718084] mb-2">The campus team can now review your issue and begin the next step.</p>
            {newComplaintId && <p className="text-sm text-[#718084] mb-6">Complaint ID: <strong className="text-[#222B33]">CR-{newComplaintId}</strong></p>}
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
          <p className="text-[10px] uppercase tracking-[.2em] font-bold text-[#2F858E] mb-2">Make it actionable</p>
          <h1 className="text-3xl font-extrabold text-[#222B33] tracking-tight">Report an issue</h1>
          <p className="text-[#718084] mt-2">Share what happened, where it happened, and what would help.</p>
        </div>
        {error && <div role="alert" className="bg-[#f8e9e4] text-[#9d4f42] p-4 rounded-xl text-sm font-semibold mb-6">{error}</div>}
        <form onSubmit={handleSubmit} className="surface overflow-hidden">
          <div className="p-5 sm:p-8 space-y-7">
          <Input label={<>Complaint Title <span className="text-red-500">*</span></>}name="title"placeholder="e.g., Broken projector, Water leakage"value={formData.title}onChange={handleChange}/>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-[#53636a] mb-2">Category <span className="text-[#b85d4a]">*</span></label>
                <select name="category" className="flex h-11 w-full border bg-[#fffdfa] px-3 py-2 text-sm text-[#222B33] focus:outline-none focus:ring-2 shadow-sm" value={formData.category} onChange={handleChange} >
                  <option value="">Select Category</option>
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <Input label={<>Location <span className="text-red-500">*</span></>}name="location"placeholder="e.g., Block A - Room 204"value={formData.location}onChange={handleChange}/>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1.5">
                <label className="block text-sm font-semibold text-[#53636a]">Description <span className="text-[#b85d4a]">*</span></label>
                <span className="text-xs text-[#97a1a0]">{formData.description.length}/500</span>
              </div>
              <textarea name="description" rows={5} className="flex w-full border bg-[#fffdfa] px-4 py-3 text-sm text-[#222B33] focus:outline-none focus:ring-2 shadow-sm resize-y" placeholder="Please describe the issue in detail..." value={formData.description} onChange={handleChange} maxLength={500}  />
            </div>
            <div>
              <label className="block text-sm font-semibold text-[#53636a] mb-2">Evidence / photos <span className="text-[#97a1a0] font-normal">(optional)</span></label>
              <div className="border-2 border-dashed border-[#d6ccbe] rounded-2xl p-7 text-center hover:bg-[#f9f4ed] transition-colors cursor-pointer">
  <label className="cursor-pointer">
    <div className="mx-auto w-12 h-12 bg-[#e3f0ed] rounded-2xl flex items-center justify-center mb-3 text-[#2F858E]">
      <Upload size={24} />
    </div>

    <p className="text-sm font-semibold text-[#222B33]">
      Click to upload an image
    </p>

    <p className="text-xs text-[#718084] mt-1">
      JPG, PNG or JPEG
    </p>

    <input
      type="file"
      accept="image/png,image/jpeg,image/jpg"
      className="sr-only"
      aria-label="Upload evidence image"
      onChange={(e) => setSelectedImage(e.target.files[0])}
    />
  </label>

  {selectedImage && (
    <p className="text-sm text-[#2F858E] mt-3 font-semibold">
      Selected: {selectedImage.name}
    </p>
  )}
            </div>
            </div>
          </div>
          <div className="bg-[#f7f1e9] px-5 sm:px-8 py-4 border-t border-[#e8dfd3] flex items-center justify-end gap-3">
            <Button type="button" variant="ghost" onClick={() => navigate('/dashboard')}>Cancel</Button>
            <Button type="submit" disabled={loading}>{loading ? 'Submitting...' : 'Submit Complaint'}</Button>
          </div>
        </form>
      </div>
    </DashboardLayout>
  );
}
