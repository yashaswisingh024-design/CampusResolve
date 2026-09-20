import React from 'react';
import { motion } from 'framer-motion';

export const Stats = () => {
  return (
    <section className="py-12 bg-slate-900 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="p-6"
          >
            <p className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">8,200+</p>
            <p className="text-slate-400 font-medium">Students connected</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="p-6"
          >
            <p className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">94%</p>
            <p className="text-slate-400 font-medium">Acknowledged within 24 hours</p>
          </motion.div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="p-6"
          >
            <p className="text-4xl lg:text-5xl font-extrabold text-white mb-2 tracking-tight">2.4 days</p>
            <p className="text-slate-400 font-medium">Average resolution time</p>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
