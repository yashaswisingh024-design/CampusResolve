import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { ArrowLeft, CheckCircle2, Clock, MapPin, ShieldCheck, Wrench, FileText, Star } from 'lucide-react';
import { DashboardLayout } from '../../components/layout/DashboardLayout';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { useAuth } from '../../context/AuthContext';

export default function ComplaintDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [complaint, setComplaint] = useState(null);
  const [feedback, setFeedback] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  // Feedback form state
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submittingFeedback, setSubmittingFeedback] = useState(false);
  const [feedbackError, setFeedbackError] = useState('');

  useEffect(() => {
    const fetchComplaintAndFeedback = async () => {
      try {
        const res = await fetch(`http://localhost:8080/api/complaints/${id}`);
        if (!res.ok) throw new Error('Complaint not found');
        const data = await res.json();
        setComplaint(data);

        // Fetch feedback if it might exist (often if resolved)
        try {
          const fbRes = await fetch(`http://localhost:8080/api/feedback/${id}`);
          if (fbRes.ok) {
            const fbData = await fbRes.json();
            // If the backend returns a non-empty object or array, handle it
            if (fbData && fbData.rating) {
              setFeedback(fbData);
            }
          }
        } catch (e) {
          // Ignore feedback fetch errors (it might just not exist)
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchComplaintAndFeedback();
  }, [id]);

  const submitFeedback = async (e) => {
    e.preventDefault();
    setSubmittingFeedback(true);
    setFeedbackError('');

    try {
      const res = await fetch('http://localhost:8080/api/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          complaintId: parseInt(id),
          userId: user.userId,
          rating,
          comment
        }),
      });

      if (!res.ok) throw new Error('Failed to submit feedback');
      const data = await res.json();
      setFeedback(data); // Assume the returned data is the feedback object
    } catch (err) {
      setFeedbackError(err.message);
    } finally {
      setSubmittingFeedback(false);
    }
  };

  const getStatusBadge = (status) => {
    const s = status?.toUpperCase();
    if (s === 'RESOLVED') return 'success';
    if (s === 'IN_PROGRESS' || s === 'IN PROGRESS') return 'primary';
    if (s === 'ASSIGNED') return 'warning';
    return 'default';
  };

  if (loading) {
    return (
      <DashboardLayout>
        <div className="text-center py-20 text-slate-500">Loading details...</div>
      </DashboardLayout>
    );
  }

  if (error || !complaint) {
    return (
      <DashboardLayout>
        <div className="text-center py-20">
          <h2 className="text-2xl font-bold text-slate-900">{error || 'Complaint not found'}</h2>
          <button onClick={() => navigate('/complaints')} className="mt-4 text-primary-accent hover:underline">
            Back to Complaints
          </button>
        </div>
      </DashboardLayout>
    );
  }

  const isResolved = complaint.status?.toUpperCase() === 'RESOLVED';

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
            <Badge variant={getStatusBadge(complaint.status)}>
              {complaint.status?.replace('_', ' ')}
            </Badge>
          </div>
          <p className="text-slate-500 text-sm mt-1">Complaint ID: {complaint.id}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Details</h2>
            
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 mb-6">
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Category</p>
                <p className="font-semibold text-slate-900">{complaint.category}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Priority</p>
                <p className="font-semibold text-slate-900">{complaint.priority || 'Normal'}</p>
              </div>
              <div>
                <p className="text-xs font-medium text-slate-500 mb-1 uppercase tracking-wider">Location</p>
                <p className="font-semibold text-slate-900">{complaint.location}</p>
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-slate-500 mb-2 uppercase tracking-wider">Description</p>
              <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 text-slate-700 text-sm leading-relaxed whitespace-pre-wrap">
                {complaint.description}
              </div>
            </div>
          </div>

          {/* Feedback Section (only show if user is the author, or if we want to show existing feedback) */}
          {isResolved && (
            <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-slate-900 mb-4 border-b border-slate-100 pb-2">Resolution Feedback</h2>
              
              {feedback ? (
                <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                  <div className="flex items-center gap-1 mb-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} size={18} className={star <= feedback.rating ? "fill-amber-400 text-amber-400" : "text-slate-300"} />
                    ))}
                  </div>
                  <p className="text-slate-700 text-sm">{feedback.comment}</p>
                </div>
              ) : user?.role !== 'ADMIN' ? (
                <form onSubmit={submitFeedback} className="space-y-4">
                  <p className="text-sm text-slate-600">Please let us know how we did resolving your issue.</p>
                  
                  {feedbackError && <div className="text-red-500 text-sm">{feedbackError}</div>}
                  
                  <div className="flex items-center gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button 
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        className="focus:outline-none"
                      >
                        <Star size={24} className={star <= rating ? "fill-amber-400 text-amber-400 hover:scale-110 transition-transform" : "text-slate-300 hover:scale-110 transition-transform"} />
                      </button>
                    ))}
                  </div>
                  
                  <textarea
                    rows={3}
                    className="flex w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-primary-accent shadow-sm resize-none"
                    placeholder="Leave a comment (optional)..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />
                  
                  <Button type="submit" disabled={submittingFeedback}>
                    {submittingFeedback ? 'Submitting...' : 'Submit Feedback'}
                  </Button>
                </form>
              ) : (
                <p className="text-sm text-slate-500">No feedback submitted yet.</p>
              )}
            </div>
          )}

        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-6">
            <h2 className="text-lg font-bold text-slate-900 mb-6">Status</h2>
            
            <div className="bg-slate-50 rounded-lg p-4 border border-slate-100 flex flex-col items-center text-center">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-3">
                <ShieldCheck className="text-primary-accent" size={24} />
              </div>
              <p className="font-semibold text-slate-900">{complaint.status?.replace('_', ' ')}</p>
              <p className="text-sm text-slate-500 mt-1">This is the latest status from the backend.</p>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
