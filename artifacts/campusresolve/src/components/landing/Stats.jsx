import React, { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function AnimatedCounter({ target, suffix = '', duration = 2000 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const end = parseFloat(target);
    const increment = end / (duration / 16);
    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(start);
      }
    }, 16);
    return () => clearInterval(timer);
  }, [inView, target, duration]);

  // Handle floats specifically for '2.4'
  const displayCount = count % 1 === 0 && target % 1 !== 0 
    ? count.toFixed(1) 
    : count.toFixed(target % 1 === 0 ? 0 : 1);

  return <span ref={ref}>{displayCount}{suffix}</span>;
}

const stats = [
  { value: 2500, suffix: '+', label: 'Issues Reported', description: 'Campus problems identified by students' },
  { value: 2100, suffix: '+', label: 'Issues Resolved', description: 'Successfully fixed and verified' },
  { value: 2.4, suffix: 'h', label: 'Avg Response', description: 'From report to first admin action' },
  { value: 98, suffix: '%', label: 'Satisfaction', description: 'Students happy with resolution' },
];

export default function Stats() {
  return (
    <section id="impact" className="py-24 lg:py-32 bg-[#222B33] relative overflow-hidden">
      {/* Background elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-[#2F858E]/20 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-[#E7B5A3]/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <span className="inline-block px-4 py-1.5 rounded-full bg-[#EBCFB7] text-[#222B33] text-sm font-bold mb-6">Our Impact</span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
            Making campuses better,<br />
            <span className="text-[#E7B5A3]">one fix at a time</span>
          </h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto font-medium">
            Illustrative metrics showing what CampusResolve can achieve for your campus community.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1, duration: 0.5, type: 'spring' }}
              className="group relative text-center p-8 lg:p-10 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 hover:border-white/20 transition-all duration-300"
            >
              <p className="text-4xl sm:text-5xl lg:text-6xl font-black text-white mb-4 tracking-tight group-hover:scale-110 transition-transform duration-300 origin-center text-[#EBCFB7]">
                <AnimatedCounter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-white text-lg font-bold mb-2">{stat.label}</p>
              <p className="text-slate-400 text-sm font-medium">{stat.description}</p>
              
              {/* Subtle hover glow */}
              <div className="absolute inset-0 bg-gradient-to-t from-white/5 to-transparent opacity-0 group-hover:opacity-100 rounded-[2rem] transition-opacity duration-300 pointer-events-none" />
            </motion.div>
          ))}
        </div>
      </div>
      
      {/* Wave divider at top */}
      <div className="absolute top-0 left-0 right-0 w-full overflow-hidden leading-none rotate-180">
        <svg className="relative block w-full h-[60px] md:h-[100px]" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 120" preserveAspectRatio="none">
          <path d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V120H0V95.8C59.71,118.08,130.83,120.3,192.5,107.5,237.5,98.17,281.31,77,321.39,56.44Z" fill="#F7EFE5"></path>
        </svg>
      </div>
    </section>
  );
}
