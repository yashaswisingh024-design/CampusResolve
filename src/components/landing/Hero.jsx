import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2, Clock, ShieldCheck, MapPin } from 'lucide-react';
import { Button } from '../common/Button';

export const Hero = () => {
  return (
    <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
      {/* Background decorations */}
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-5xl h-full -z-10 opacity-40">
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary-accent/30 rounded-full blur-[120px] animate-pulse-slow"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-sm font-semibold mb-6">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
              </span>
              A better campus starts with being heard
            </div>
            
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 tracking-tight leading-[1.1] mb-6">
              Campus issues, <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-accent to-blue-400">resolved with clarity.</span>
            </h1>
            
            <p className="text-lg text-slate-600 mb-8 leading-relaxed max-w-xl">
              CampusResolve gives students one trusted place to report problems, follow progress, and stay connected with the people solving them.
            </p>
            
            <div className="flex flex-wrap items-center gap-4 mb-10">
              <Link to="/register">
                <Button size="lg" className="h-14 px-8 text-base shadow-lg shadow-primary-accent/25">
                  REPORT AN ISSUE <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="lg" className="h-14 px-8 text-base border-slate-300">
                  TRACK COMPLAINT
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-wrap items-center gap-6 text-sm font-medium text-slate-500">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-5 w-5 text-green-500" />
                Simple reporting
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-blue-500" />
                Real-time status
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-5 w-5 text-amber-500" />
                Accountable teams
              </div>
            </div>
          </motion.div>

          {/* Right Product Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative lg:h-[600px] flex items-center justify-center lg:justify-end"
          >
            {/* The main dashboard mockup */}
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden z-10 animate-float">
              {/* Header */}
              <div className="bg-slate-900 px-6 py-4 flex items-center justify-between">
                <div>
                  <span className="text-xs font-medium text-slate-400">COMPLAINT PROGRESS</span>
                  <h3 className="text-white font-semibold mt-1">Broken classroom projector</h3>
                </div>
                <div className="bg-primary-accent/20 text-blue-400 border border-blue-500/30 px-3 py-1 rounded-full text-xs font-semibold">
                  IN PROGRESS
                </div>
              </div>
              
              {/* Body */}
              <div className="p-6">
                <div className="flex justify-between items-start mb-6 text-sm">
                  <div>
                    <p className="text-slate-500 mb-1">Complaint ID</p>
                    <p className="font-semibold text-slate-900">CR-2841</p>
                  </div>
                  <div className="text-right">
                    <p className="text-slate-500 mb-1">Updated</p>
                    <p className="font-semibold text-slate-900">2 hours ago</p>
                  </div>
                </div>

                {/* Timeline */}
                <div className="relative border-l-2 border-slate-100 ml-3 space-y-6 pb-2">
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                    <p className="text-sm font-semibold text-slate-900">Complaint submitted</p>
                    <p className="text-xs text-slate-500 mt-1">Today, 08:30 AM</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                    <p className="text-sm font-semibold text-slate-900">Reviewed by campus desk</p>
                    <p className="text-xs text-slate-500 mt-1">Today, 09:15 AM</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-green-500 border-2 border-white"></div>
                    <p className="text-sm font-semibold text-slate-900">Assigned to IT Services</p>
                    <p className="text-xs text-slate-500 mt-1">Today, 09:30 AM</p>
                  </div>
                  <div className="relative pl-6">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-primary-accent border-2 border-white animate-pulse"></div>
                    <p className="text-sm font-semibold text-primary-accent">Technician visit scheduled</p>
                    <p className="text-xs text-slate-500 mt-1">Today, 02:30 PM</p>
                  </div>
                  <div className="relative pl-6 opacity-50">
                    <div className="absolute -left-[9px] top-1 h-4 w-4 rounded-full bg-slate-200 border-2 border-white"></div>
                    <p className="text-sm font-semibold text-slate-500">Issue resolved</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Elements */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
              className="absolute top-10 -right-6 lg:-right-12 bg-white p-4 rounded-xl shadow-xl border border-slate-100 z-20 flex items-center gap-3 animate-float"
              style={{ animationDelay: '1s' }}
            >
              <div className="h-10 w-10 rounded-full bg-green-100 flex items-center justify-center text-green-600">
                <CheckCircle2 size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Assigned to IT</p>
                <p className="text-xs text-slate-500">CR-2841 updated</p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.5 }}
              className="absolute bottom-20 -left-6 lg:-left-12 bg-white p-4 rounded-xl shadow-xl border border-slate-100 z-20 flex items-center gap-3 animate-float"
              style={{ animationDelay: '2s' }}
            >
              <div className="h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                <MapPin size={20} />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-900">Block A — Room 204</p>
                <p className="text-xs text-slate-500">Technician dispatched</p>
              </div>
            </motion.div>

          </motion.div>

        </div>
      </div>
    </section>
  );
};
