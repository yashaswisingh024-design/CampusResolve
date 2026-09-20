import React from 'react';
import { motion } from 'framer-motion';
import { Send, Clock, UserCheck, LayoutDashboard } from 'lucide-react';
import { cn } from '../../utils/cn';

export const Features = () => {
  return (
    <section id="features" className="py-24 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight mb-4">
            Everything needed to move an issue forward.
          </h2>
          <p className="text-lg text-slate-600">
            From the first report to the final resolution, CampusResolve keeps everyone informed.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 auto-rows-[minmax(300px,auto)]">
          
          {/* Feature 1 (Large, spans 2 columns on tablet/desktop) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="md:col-span-2 bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10 relative overflow-hidden group hover:border-primary-accent/30 transition-colors"
          >
            <div className="relative z-10 max-w-sm">
              <div className="h-12 w-12 rounded-xl bg-blue-100 text-primary-accent flex items-center justify-center mb-6">
                <Send size={24} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900 mb-3">Report in seconds</h3>
              <p className="text-slate-600">Submit a campus issue with location, category, description, priority, and evidence. Get it to the right people immediately.</p>
            </div>
            {/* Visual element */}
            <div className="absolute right-0 bottom-0 md:-right-10 md:-bottom-10 w-full max-w-sm translate-y-20 md:translate-y-0 opacity-50 md:opacity-100 transition-transform group-hover:-translate-y-2">
              <div className="bg-white rounded-tl-2xl p-6 border-t border-l border-slate-200 shadow-xl">
                <div className="space-y-4">
                  <div className="h-4 bg-slate-100 rounded w-1/3"></div>
                  <div className="h-10 bg-slate-50 border border-slate-200 rounded w-full"></div>
                  <div className="flex gap-4">
                    <div className="h-10 bg-slate-50 border border-slate-200 rounded w-1/2"></div>
                    <div className="h-10 bg-slate-50 border border-slate-200 rounded w-1/2"></div>
                  </div>
                  <div className="h-24 bg-slate-50 border border-slate-200 rounded w-full"></div>
                  <div className="h-10 bg-primary-accent rounded w-full mt-2"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 2 (Normal) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10 relative overflow-hidden group hover:border-primary-accent/30 transition-colors"
          >
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl bg-green-100 text-green-600 flex items-center justify-center mb-6">
                <Clock size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Track every update</h3>
              <p className="text-slate-600">Follow your complaint from submission to resolution.</p>
            </div>
            {/* Visual element */}
            <div className="mt-8 relative z-10">
              <div className="space-y-4 border-l-2 border-slate-200 ml-2 pl-4">
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-green-500 border-2 border-slate-50"></div>
                  <div className="h-3 bg-slate-200 rounded w-24"></div>
                </div>
                <div className="relative">
                  <div className="absolute -left-[21px] top-1 h-3 w-3 rounded-full bg-primary-accent border-2 border-slate-50"></div>
                  <div className="h-3 bg-slate-200 rounded w-32"></div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Feature 3 (Normal) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="bg-slate-50 rounded-3xl border border-slate-200 p-8 sm:p-10 relative overflow-hidden group hover:border-primary-accent/30 transition-colors"
          >
            <div className="relative z-10">
              <div className="h-12 w-12 rounded-xl bg-amber-100 text-amber-600 flex items-center justify-center mb-6">
                <UserCheck size={24} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Connect with the right team</h3>
              <p className="text-slate-600">Complaints reach the appropriate campus department automatically.</p>
            </div>
          </motion.div>

          {/* Feature 4 (Large) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="md:col-span-2 bg-slate-900 rounded-3xl border border-slate-800 p-8 sm:p-10 relative overflow-hidden group"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary-accent/10 to-transparent"></div>
            <div className="relative z-10 md:w-1/2">
              <div className="h-12 w-12 rounded-xl bg-slate-800 text-primary-accent flex items-center justify-center mb-6">
                <LayoutDashboard size={24} />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">Resolve with accountability</h3>
              <p className="text-slate-400">Authorities can monitor, assign, update, and resolve complaints across the entire campus infrastructure from one unified dashboard.</p>
            </div>
            
            {/* Dashboard Visual */}
            <div className="absolute right-0 bottom-0 md:-right-4 md:-bottom-4 w-full md:w-[55%] translate-y-20 md:translate-y-0 opacity-50 md:opacity-100 transition-transform group-hover:-translate-y-2">
              <div className="bg-slate-800 rounded-tl-xl p-4 border-t border-l border-slate-700 shadow-2xl">
                <div className="flex gap-2 mb-4">
                  <div className="h-2 w-2 rounded-full bg-red-400"></div>
                  <div className="h-2 w-2 rounded-full bg-amber-400"></div>
                  <div className="h-2 w-2 rounded-full bg-green-400"></div>
                </div>
                <div className="space-y-3">
                  <div className="flex gap-3">
                    <div className="h-16 w-1/3 bg-slate-700 rounded-lg"></div>
                    <div className="h-16 w-1/3 bg-slate-700 rounded-lg"></div>
                    <div className="h-16 w-1/3 bg-slate-700 rounded-lg"></div>
                  </div>
                  <div className="h-24 w-full bg-slate-700 rounded-lg"></div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};
