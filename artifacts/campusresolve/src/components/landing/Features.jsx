import React from 'react';
import { motion } from 'framer-motion';
import { Send, Eye, Users, ShieldCheck, MapPin, MessageSquare } from 'lucide-react';

const features = [
  {
    icon: Send,
    title: 'Report in Seconds',
    description: 'Submit campus issues instantly with our streamlined form. Add location, category, and evidence.',
    color: 'text-[#E7B5A3]',
    bg: 'bg-[#222B33]',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-1',
    lightText: true,
  },
  {
    icon: Eye,
    title: 'Track Every Update',
    description: 'Real-time status tracking from submission to resolution.',
    color: 'text-[#2F858E]',
    bg: 'bg-[#F7EFE5]',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-2',
  },
  {
    icon: Users,
    title: 'Right Team, Right Time',
    description: 'Issues automatically routed to the correct department.',
    color: 'text-[#2F858E]',
    bg: 'bg-white',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
  },
  {
    icon: ShieldCheck,
    title: 'Accountable Resolution',
    description: 'Every step is tracked and transparent. Nothing gets lost.',
    color: 'text-[#E7B5A3]',
    bg: 'bg-white',
    colSpan: 'lg:col-span-1',
    rowSpan: 'lg:row-span-1',
  },
  {
    icon: MapPin,
    title: 'Location-Aware',
    description: 'Pin your issue to a specific location for a faster response.',
    color: 'text-[#2F858E]',
    bg: 'bg-[#EBCFB7]',
    colSpan: 'lg:col-span-2',
    rowSpan: 'lg:row-span-1',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function Features() {
  return (
    <section id="features" className="py-24 lg:py-32 bg-[#F7EFE5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="max-w-2xl mb-16 lg:mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#EBCFB7] text-[#222B33] text-sm font-bold mb-6">Features</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222B33] tracking-tight mb-6 leading-tight">
            Everything you need to <span className="text-[#2F858E]">resolve</span> campus issues
          </h2>
          <p className="text-lg text-slate-600 font-medium leading-relaxed">
            A complete platform designed for students and administrators to work together toward a better campus.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-min">
          {features.map((feature, idx) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={feature.title}
                custom={idx}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: '-50px' }}
                variants={cardVariants}
                whileHover={{ scale: 1.02, rotate: 0.5, transition: { duration: 0.2 } }}
                className={`group relative rounded-[2rem] p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 cursor-default overflow-hidden ${feature.bg} ${feature.colSpan} ${feature.rowSpan}`}
              >
                <div className={`mb-6 p-4 inline-block rounded-2xl ${feature.lightText ? 'bg-white/10' : 'bg-black/5'}`}>
                  <Icon size={28} className={feature.color} />
                </div>
                <h3 className={`text-2xl font-bold mb-3 ${feature.lightText ? 'text-white' : 'text-[#222B33]'}`}>{feature.title}</h3>
                <p className={`text-lg font-medium leading-relaxed ${feature.lightText ? 'text-slate-300' : 'text-slate-600'}`}>{feature.description}</p>
                
                {/* Decorative blob */}
                <div className={`absolute -bottom-8 -right-8 w-32 h-32 rounded-full blur-2xl opacity-20 transition-transform duration-500 group-hover:scale-150 ${feature.lightText ? 'bg-white' : 'bg-[#E7B5A3]'}`} />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
