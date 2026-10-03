import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, MapPin, Clock, CheckCircle2, AlertTriangle, Zap } from 'lucide-react';

const FloatingCard = ({ children, className, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ delay, duration: 0.6, ease: 'easeOut' }}
    className={className}
  >
    <motion.div
      animate={{ y: [0, -8, 0] }}
      transition={{ duration: 3 + delay, repeat: Infinity, ease: 'easeInOut' }}
    >
      {children}
    </motion.div>
  </motion.div>
);

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#2F858E]">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#E7B5A3]/20 rounded-full blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] right-[-5%] w-[600px] h-[600px] bg-[#EBCFB7]/30 rounded-full blur-[120px] animate-pulse-slow" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 right-1/4 w-[400px] h-[400px] bg-[#F7EFE5]/10 rounded-full blur-[80px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16 lg:pt-32 lg:pb-24">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left - Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-sm font-medium mb-8">
                <Zap size={14} className="fill-[#F7EFE5]" />
                Campus Issue Resolution Platform
              </div>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-[80px] font-bold text-white leading-[1.05] tracking-tight mb-6"
            >
              Your campus.<br />
              Your voice.<br />
              Real resolution.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-lg sm:text-xl text-[#F7EFE5]/90 max-w-lg mb-10 leading-relaxed font-medium"
            >
              One trusted place to report problems, follow progress, and stay connected with the people solving them.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Link
                to="/register"
                className="group flex items-center justify-center gap-2 bg-[#EBCFB7] text-[#222B33] px-8 py-4 rounded-full text-base font-bold shadow-xl shadow-black/10 hover:shadow-2xl hover:bg-[#F7EFE5] hover:-translate-y-1 transition-all duration-300"
              >
                Report an Issue
                <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="group flex items-center justify-center gap-2 bg-transparent border-2 border-white/30 text-white px-8 py-4 rounded-full text-base font-bold hover:bg-white/10 hover:border-white/50 transition-all backdrop-blur-sm"
              >
                Track Complaint
              </Link>
            </motion.div>
          </div>

          {/* Right - Animated Complaint Ecosystem */}
          <div className="hidden lg:block relative">
            <div className="relative w-full h-[580px]">
              {/* Main complaint card */}
              <FloatingCard className="absolute top-12 left-4 z-30" delay={0.5}>
                <div className="bg-white rounded-3xl p-6 w-80 shadow-2xl border border-slate-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="h-2.5 w-2.5 rounded-full bg-[#E7B5A3] animate-pulse" />
                    <span className="text-xs font-bold text-[#E7B5A3] uppercase tracking-wider">Live Tracking</span>
                  </div>
                  <h3 className="text-[#222B33] font-bold text-lg mb-1 leading-tight">Broken classroom projector</h3>
                  <p className="text-slate-500 text-sm mb-5 font-medium">Block A • Room 204</p>
                  
                  <div className="flex items-center gap-3">
                    <div className="flex-1 h-2 bg-slate-100 rounded-full overflow-hidden">
                      <motion.div
                         className="h-full bg-[#2F858E] rounded-full"
                         initial={{ width: '0%' }}
                         animate={{ width: '65%' }}
                         transition={{ duration: 2, delay: 1.5, ease: 'easeOut' }}
                      />
                    </div>
                    <span className="text-xs font-bold text-[#2F858E]">65%</span>
                  </div>
                  
                  <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between">
                    <span className="inline-flex items-center px-2.5 py-1 rounded-lg bg-[#EBCFB7]/30 text-[#D88A5F] text-[10px] font-bold uppercase">IN PROGRESS</span>
                    <span className="text-slate-400 text-[11px] font-bold">CR-2841</span>
                  </div>
                </div>
              </FloatingCard>

              {/* Status chip */}
              <FloatingCard className="absolute top-4 right-8 z-20" delay={0.8}>
                <div className="bg-white rounded-2xl px-5 py-3.5 flex items-center gap-3 shadow-xl border border-slate-100">
                  <div className="bg-green-100 p-1.5 rounded-full"><CheckCircle2 size={16} className="text-green-600" /></div>
                  <span className="text-[#222B33] text-sm font-bold">3 Resolved Today</span>
                </div>
              </FloatingCard>

              {/* Location pin */}
              <FloatingCard className="absolute top-52 right-0 z-20" delay={1.1}>
                <div className="bg-[#222B33] rounded-2xl px-5 py-4 flex items-center gap-3 shadow-2xl">
                  <div className="bg-[#E7B5A3]/20 p-2 rounded-xl"><MapPin size={18} className="text-[#E7B5A3]" /></div>
                  <div>
                    <p className="text-white text-sm font-bold">Science Block</p>
                    <p className="text-slate-400 text-xs">2 active reports</p>
                  </div>
                </div>
              </FloatingCard>

              {/* Priority alert */}
              <FloatingCard className="absolute bottom-28 -left-6 z-40" delay={1.4}>
                <div className="bg-white rounded-2xl px-5 py-3 flex items-center gap-3 shadow-xl border border-slate-100">
                  <AlertTriangle size={18} className="text-red-500" />
                  <span className="text-[#222B33] text-sm font-bold">High Priority</span>
                </div>
              </FloatingCard>

              {/* Timeline card */}
              <FloatingCard className="absolute bottom-10 right-12 z-30" delay={1.0}>
                <div className="bg-white rounded-3xl p-5 w-64 shadow-2xl border border-slate-100">
                  <p className="text-[#222B33] text-sm font-bold mb-4">Resolution Timeline</p>
                  {['Submitted', 'Reviewed', 'In Progress', 'Resolved'].map((step, i) => (
                    <div key={step} className="flex items-center gap-3 mb-3 last:mb-0">
                      <div className={`h-4 w-4 rounded-full border-2 flex items-center justify-center ${
                        i < 3 ? 'border-[#2F858E] bg-[#2F858E]/10' : 'border-slate-200 bg-transparent'
                      }`}>
                        {i < 3 && <div className="h-1.5 w-1.5 rounded-full bg-[#2F858E]" />}
                      </div>
                      <span className={`text-[13px] font-bold ${i < 3 ? 'text-[#222B33]' : 'text-slate-400'}`}>{step}</span>
                    </div>
                  ))}
                </div>
              </FloatingCard>
              
              {/* Decorative graphic/blob in background */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
                className="absolute inset-0 z-10 opacity-30 flex items-center justify-center pointer-events-none"
              >
                 <svg width="400" height="400" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                   <path fill="#F7EFE5" d="M42.7,-74.6C56.6,-67.9,70.1,-58.5,81.1,-46C92.1,-33.5,100.5,-16.8,100.6,0.1C100.7,16.9,92.5,33.9,81.3,46.7C70,59.5,55.8,68.3,41,74.9C26.1,81.6,10.6,86.2,-4.5,86.5C-19.6,86.8,-39.2,82.8,-53.4,72.9C-67.6,63,-76.3,47.1,-82.7,30.3C-89,13.5,-93,-4.2,-87.3,-18.8C-81.6,-33.4,-66.2,-44.9,-51.7,-51.9C-37.1,-58.9,-23.5,-61.4,-9.4,-65.4C4.7,-69.5,18.8,-75,28.8,-81.3L42.7,-74.6Z" transform="translate(100 100)" />
                 </svg>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Wave divider at bottom */}
      <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.3,192.5,107.5,237.5,98.17,281.31,77,321.39,56.44Z" fill="#F7EFE5"></path>
        </svg>
      </div>
    </section>
  );
}
