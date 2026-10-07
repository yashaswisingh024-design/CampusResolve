import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ShieldCheck, Star } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';
import { complaintApi, feedbackApi, formatStatus, getStatusColor } from '../../api/apiClient';

export default function ComplaintDetails() {
  const { complaintId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [complaint, setComplaint] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await complaintApi.getById(complaintId);
        setComplaint(data);
        try {
          const fb = await feedbackApi.getByComplaintId(complaintId);
          if (fb && fb.rating) setFeedback(fb);
        } catch {}
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [complaintId]);

  const submitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    setFeedbackError('');
    try {
      const data = await feedbackApi.submit({ complaintId: parseInt(complaintId), userId: user.userId, rating, comment });
      setFeedback(data);
    } catch (err) {
      setFeedbackError(err.message);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  if (loading) return <DashboardLayout><div className="space-y-4 max-w-4xl"><div className="h-8 w-1/2 animate-pulse rounded-lg bg-[#e9e0d5]" /><div className="h-56 animate-pulse rounded-2xl bg-[#eee7dc]" /></div></DashboardLayout>;
  if (error || !complaint) return <DashboardLayout><div role="alert" className="surface text-center py-16"><h2 className="text-2xl font-bold text-[#222B33]">{error || 'Complaint not found'}</h2><button onClick={() => navigate('/complaints')} className="mt-4 text-[#2F858E] font-semibold hover:underline">Back to complaints</button></div></DashboardLayout>;

  const isResolved = complaint.status?.toUpperCase() === 'RESOLVED';

  return (
    <DashboardLayout>
      <div className="mb-7 flex items-start gap-4">
        <button aria-label="Back to complaints" onClick={() => navigate('/complaints')} className="mt-1 p-2.5 bg-[#fffdfa] rounded-xl border border-[#e8dfd3] text-[#53636a] hover:text-[#2F858E] transition-colors"><ArrowLeft size={19} /></button>
        <div>
          <div className="flex flex-wrap items-center gap-3"><h1 className="text-2xl sm:text-3xl font-extrabold text-[#222B33] tracking-tight">{complaint.title}</h1><Badge variant={getStatusColor(complaint.status)}>{formatStatus(complaint.status)}</Badge></div>
          <p className="text-[#718084] text-sm mt-2">Complaint ID <span className="font-semibold text-[#53636a]">CR-{complaint.complaintId}</span></p>
        </div>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="surface p-5 sm:p-7">
            <h2 className="text-xl font-bold text-[#222B33] mb-5 border-b border-[#f0e9df] pb-3">Issue details</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
              <div><p className="text-[10px] font-bold text-[#97a1a0] mb-1 uppercase tracking-[.14em]">Category</p><p className="font-semibold text-[#222B33]">{complaint.category}</p></div>
              <div><p className="text-[10px] font-bold text-[#97a1a0] mb-1 uppercase tracking-[.14em]">Priority</p><p className="font-semibold text-[#222B33]">{complaint.priority || 'Pending'}</p></div>
              <div><p className="text-[10px] font-bold text-[#97a1a0] mb-1 uppercase tracking-[.14em]">Location</p><p className="font-semibold text-[#222B33]">{complaint.location}</p></div>
            </div>
            <div><p className="text-[10px] font-bold text-[#97a1a0] mb-2 uppercase tracking-[.14em]">Description</p><div className="bg-[#f8f3ec] rounded-xl p-4 border border-[#eee5d9] text-[#53636a] text-sm leading-relaxed whitespace-pre-wrap">{complaint.description}</div></div>
            {complaint.image && (
  <div className="mt-6">
    <p className="text-[10px] font-bold text-[#97a1a0] mb-2 uppercase tracking-[.14em]">
      Attached image
    </p>

    <img
      src={`${import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080'}/api/complaints/images/${encodeURIComponent(complaint.image)}`}
      alt="Complaint attachment"
      className="w-full max-h-96 object-contain rounded-xl border border-[#eee5d9] bg-[#f8f3ec]"
    />
  </div>
)}
          </div>
          {isResolved && (
            <div className="surface p-5 sm:p-7">
              <h2 className="text-xl font-bold text-[#222B33] mb-4 border-b border-[#f0e9df] pb-3">Resolution feedback</h2>
              {feedback ? (
                <div className="bg-[#edf4eb] border border-[#dce9d9] rounded-xl p-4">
                  <div className="flex items-center gap-1 mb-2">{[1,2,3,4,5].map(s => <Star key={s} size={18} className={s <= feedback.rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300'} />)}</div>
                  <p className="text-[#53636a] text-sm">{feedback.comment}</p>
                </div>
              ) : user?.role !== 'ADMIN' ? (
                <form onSubmit={submitFeedback} className="space-y-4">
                  <p className="text-sm text-[#718084]">How did we do resolving this issue?</p>
                  {feedbackError && <div role="alert" className="text-[#9d4f42] text-sm">{feedbackError}</div>}
                  <div className="flex items-center gap-2">{[1,2,3,4,5].map(s => <button key={s} type="button" onClick={() => setRating(s)} className="focus:outline-none"><Star size={24} className={s <= rating ? 'fill-amber-400 text-amber-400 hover:scale-110 transition-transform' : 'text-slate-300 hover:scale-110 transition-transform'} /></button>)}</div>
                  <textarea rows={3} className="flex w-full border bg-[#fffdfa] px-3 py-2 text-sm text-[#222B33] focus:outline-none focus:ring-2 shadow-sm resize-y" placeholder="Leave a comment (optional)..." value={comment} onChange={(e) => setComment(e.target.value)} />
                  <Button type="submit" disabled={submittingFeedback}>{submittingFeedback ? 'Submitting...' : 'Submit Feedback'}</Button>
                </form>
              ) : <p className="text-sm text-slate-500">No feedback submitted yet.</p>}
            </div>
          )}
        </div>
        <div className="space-y-6">
          <div className="surface p-5 sm:p-6">
            <p className="text-[10px] uppercase tracking-[.18em] font-bold text-[#b87954]">Next action</p>
            <h2 className="text-xl font-bold text-[#222B33] mt-1 mb-5">Status</h2>
            <div className="bg-[#e8f2ef] rounded-xl p-5 border border-[#d5e6e1] flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-2xl bg-white flex items-center justify-center mb-3"><ShieldCheck className="text-[#2F858E]" size={23} /></div>
              <p className="font-bold text-[#222B33]">{formatStatus(complaint.status)}</p>
              <p className="text-sm text-[#53636a] mt-1">{isResolved ? 'Share feedback on the resolution.' : 'The campus team is working through your report.'}</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
