import React from 'react';
import { motion } from 'framer-motion';

export const Process = () => {
  const steps = [
    { num: '01', title: 'REPORT', desc: 'Tell us what happened.' },
    { num: '02', title: 'REVIEW', desc: 'The campus desk reviews the issue.' },
    { num: '03', title: 'ASSIGN', desc: 'The right department takes over.' },
    { num: '04', title: 'RESOLVE', desc: 'Follow progress until completion.' },
  ];

  return (
    <section id="how-it-works" className="py-24 bg-slate-50 border-y border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-20">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 tracking-tight">
            From report to resolution.
          </h2>
        </div>

        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden md:block absolute top-12 left-0 w-full h-[2px] bg-slate-200 z-0">
            <motion.div 
              className="h-full bg-primary-accent"
              initial={{ width: 0 }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-4 relative z-10">
            {steps.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex flex-col items-center text-center"
              >
                <div className="w-24 h-24 bg-white rounded-full border-4 border-slate-50 shadow-lg flex items-center justify-center mb-6 relative group">
                  <div className="absolute inset-0 rounded-full border-2 border-primary-accent opacity-0 group-hover:opacity-100 scale-110 group-hover:scale-100 transition-all duration-300"></div>
                  <span className="text-2xl font-bold text-slate-900 group-hover:text-primary-accent transition-colors">{step.num}</span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-2 tracking-wide">{step.title}</h3>
                <p className="text-slate-600 text-sm max-w-[200px]">{step.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
