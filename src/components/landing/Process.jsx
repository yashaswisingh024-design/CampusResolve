import React from 'react';
import { motion } from 'framer-motion';
import { Send, Search, Wrench, CheckCircle2 } from 'lucide-react';

const steps = [
  {
    number: '01',
    title: 'Report',
    description: 'Submit your campus issue with details, location, and category through our simple form.',
    icon: Send,
    color: 'bg-[#222B33]',
  },
  {
    number: '02',
    title: 'Review',
    description: 'Campus administrators review and prioritize your complaint, routing it to the right department.',
    icon: Search,
    color: 'bg-[#E7B5A3]',
  },
  {
    number: '03',
    title: 'In Progress',
    description: 'The assigned team works on resolving the issue. Track real-time updates on your dashboard.',
    icon: Wrench,
    color: 'bg-[#EBCFB7]',
  },
  {
    number: '04',
    title: 'Resolved',
    description: 'Issue fixed! Rate the resolution and help us maintain campus service quality.',
    icon: CheckCircle2,
    color: 'bg-[#2F858E]',
  },
];

export default function Process() {
  return (
    <section id="process" className="py-24 lg:py-32 bg-white relative overflow-hidden">
      {/* Decorative Blob */}
      <div className="absolute top-0 right-0 w-[40rem] h-[40rem] bg-[#F7EFE5] rounded-full blur-[100px] opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/2" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 lg:mb-24"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#EBCFB7]/30 text-[#222B33] text-sm font-bold mb-6">How it works</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222B33] tracking-tight mb-6">
            From report to resolution
          </h2>
          <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium leading-relaxed">
            A transparent, four-step process that keeps you informed every step of the way.
          </p>
        </motion.div>

        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-24 left-[10%] right-[10%] h-1 bg-slate-100 rounded-full">
            <motion.div
              className="h-full bg-gradient-to-r from-[#222B33] via-[#E7B5A3] to-[#2F858E] rounded-full"
              initial={{ width: '0%' }}
              whileInView={{ width: '100%' }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: 'easeOut', delay: 0.5 }}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
            {steps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.15, duration: 0.5 }}
                  className="relative text-center lg:text-left group"
                >
                  <div className="flex flex-col items-center lg:items-start relative">
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className={`relative z-10 ${step.color} shadow-2xl shadow-black/10 w-20 h-20 rounded-3xl flex items-center justify-center mb-8 transition-transform duration-300`}
                    >
                      <Icon size={32} className={idx === 0 ? 'text-white' : idx === 3 ? 'text-white' : 'text-[#222B33]'} />
                    </motion.div>
                    
                    <span className="absolute -top-6 -right-6 lg:right-auto lg:-top-10 lg:left-10 text-8xl font-black text-slate-50/80 -z-10 group-hover:scale-110 transition-transform duration-500">
                      {step.number}
                    </span>
                    
                    <h3 className="text-2xl font-bold text-[#222B33] mb-4">{step.title}</h3>
                    <p className="text-slate-600 font-medium leading-relaxed">{step.description}</p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
