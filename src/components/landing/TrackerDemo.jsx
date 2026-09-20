import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, Clock, Wrench, ShieldCheck, MapPin } from 'lucide-react';

export const TrackerDemo = () => {
  const [activeTab, setActiveTab] = useState('timeline');

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Know what's happening.<br/>Every step of the way.
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            No more wondering if your complaint was seen. Real-time updates directly from the team working on it.
          </p>
        </div>

        <div className="max-w-4xl mx-auto bg-slate-50 rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
          <div className="bg-slate-900 p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div>
              <p className="text-slate-400 text-sm font-medium mb-1">COMPLAINT ID: CR-2841</p>
              <h3 className="text-xl font-bold text-white">Broken classroom projector</h3>
            </div>
            <div className="flex gap-3">
              <span className="bg-blue-900/50 text-blue-300 border border-blue-700/50 px-3 py-1 rounded-full text-xs font-semibold">
                High Priority
              </span>
              <span className="bg-primary-accent text-white px-3 py-1 rounded-full text-xs font-semibold">
                In Progress
              </span>
            </div>
          </div>

          <div className="flex border-b border-slate-200 px-6">
            <button 
              className={`py-4 px-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'overview' ? 'border-primary-accent text-primary-accent' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('overview')}
            >
              Overview
            </button>
            <button 
              className={`py-4 px-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'timeline' ? 'border-primary-accent text-primary-accent' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('timeline')}
            >
              Timeline
            </button>
            <button 
              className={`py-4 px-4 font-medium text-sm transition-colors border-b-2 ${activeTab === 'updates' ? 'border-primary-accent text-primary-accent' : 'border-transparent text-slate-500 hover:text-slate-700'}`}
              onClick={() => setActiveTab('updates')}
            >
              Updates
            </button>
          </div>

          <div className="p-6 md:p-8 min-h-[300px]">
            <AnimatePresence mode="wait">
              {activeTab === 'timeline' && (
                <motion.div
                  key="timeline"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="max-w-2xl mx-auto relative border-l-2 border-slate-200 ml-4 md:ml-8 space-y-8"
                >
                  <div className="relative pl-8">
                    <div className="absolute -left-[25px] top-0 h-12 w-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400">
                      <CheckCircle2 size={24} className="text-green-500" />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-slate-900">Submitted</p>
                      <p className="text-sm text-slate-500">Today, 08:30 AM</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute -left-[25px] top-0 h-12 w-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400">
                      <ShieldCheck size={24} className="text-green-500" />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-slate-900">Reviewed</p>
                      <p className="text-sm text-slate-500">Today, 09:15 AM</p>
                      <p className="text-sm text-slate-700 mt-1 bg-white p-3 rounded-lg border border-slate-200 mt-2 shadow-sm">Verified by Campus Support Desk. Forwarded to technical team.</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute -left-[25px] top-0 h-12 w-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-400">
                      <MapPin size={24} className="text-green-500" />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-slate-900">Assigned</p>
                      <p className="text-sm text-slate-500">Today, 09:30 AM</p>
                      <p className="text-sm text-slate-700 mt-1 font-medium">Assigned team: IT Services</p>
                    </div>
                  </div>
                  
                  <div className="relative pl-8">
                    <div className="absolute -left-[25px] top-0 h-12 w-12 rounded-full bg-primary-accent border-4 border-blue-100 flex items-center justify-center text-white shadow-lg animate-pulse-slow">
                      <Wrench size={20} />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-primary-accent">In Progress</p>
                      <p className="text-sm text-slate-500">Today, 10:00 AM</p>
                      <div className="mt-3 bg-blue-50 p-4 rounded-xl border border-blue-100 relative">
                        <div className="absolute -left-2 top-4 w-4 h-4 bg-blue-50 rotate-45 border-l border-b border-blue-100"></div>
                        <p className="text-sm text-blue-900 font-medium">Latest Update from IT Services:</p>
                        <p className="text-sm text-blue-800 mt-1">Technician visit scheduled for today at 2:30 PM to inspect the projector bulb.</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="relative pl-8 opacity-40">
                    <div className="absolute -left-[25px] top-0 h-12 w-12 rounded-full bg-white border-2 border-slate-200 flex items-center justify-center text-slate-300">
                      <CheckCircle2 size={24} />
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-slate-400">Resolved</p>
                      <p className="text-sm text-slate-400">Pending</p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'overview' && (
                <motion.div
                  key="overview"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="grid md:grid-cols-2 gap-8"
                >
                  <div className="space-y-6">
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Category</p>
                      <p className="font-semibold text-slate-900">Infrastructure / IT</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Location</p>
                      <p className="font-semibold text-slate-900">Block A — Room 204</p>
                    </div>
                    <div>
                      <p className="text-sm text-slate-500 font-medium mb-1">Description</p>
                      <p className="text-slate-700 bg-white p-4 rounded-lg border border-slate-200">
                        The projector in room 204 is not turning on. It is showing a red blinking light. We have a presentation scheduled for the afternoon.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
              
              {activeTab === 'updates' && (
                <motion.div
                  key="updates"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-4"
                >
                  <div className="bg-white p-4 rounded-lg border border-slate-200 flex gap-4 items-start">
                    <div className="bg-primary-soft p-2 rounded-full text-primary-accent"><Clock size={20}/></div>
                    <div>
                      <p className="font-medium text-slate-900">Technician dispatched</p>
                      <p className="text-sm text-slate-600 mt-1">IT Services has scheduled a technician for 2:30 PM today.</p>
                      <p className="text-xs text-slate-400 mt-2">Today, 10:00 AM</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};
