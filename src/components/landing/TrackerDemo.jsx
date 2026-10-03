import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, Star, Quote } from 'lucide-react';

const testimonials = [
  {
    name: 'Priya Sharma',
    role: 'B.Tech CSE, 3rd Year',
    text: 'Reported a broken projector in my lecture hall, and it was fixed within 24 hours. The tracking feature kept me updated throughout.',
    rating: 5,
    initials: 'PS',
    bg: 'bg-[#F7EFE5]',
    color: 'text-[#2F858E]',
  },
  {
    name: 'Rahul Mehta',
    role: 'M.Sc Physics, 1st Year',
    text: 'The hostel water heater issue I reported was resolved the same day. CampusResolve actually works!',
    rating: 5,
    initials: 'RM',
    bg: 'bg-[#2F858E]',
    color: 'text-white',
    lightText: true,
  },
  {
    name: 'Ananya Gupta',
    role: 'BBA, 2nd Year',
    text: 'Finally a platform where our complaints are taken seriously. Love the transparency of the status updates.',
    rating: 5,
    initials: 'AG',
    bg: 'bg-[#EBCFB7]',
    color: 'text-[#222B33]',
  },
];

export default function TrackerDemo() {
  return (
    <>
      {/* Testimonials */}
      <section className="py-24 lg:py-32 bg-white relative overflow-hidden">
        <div className="absolute left-0 top-0 w-64 h-64 bg-[#E7B5A3]/20 rounded-full blur-[80px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-16 lg:mb-24"
          >
            <span className="inline-block px-4 py-1.5 rounded-full bg-[#E7B5A3]/20 text-[#222B33] text-sm font-bold mb-6">Student Stories</span>
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-[#222B33] tracking-tight mb-6">
              Voices from our <span className="text-[#E7B5A3]">campus</span>
            </h2>
            <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
              Hear from students who've used CampusResolve to make their campus experience better.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {testimonials.map((t, idx) => (
              <motion.div
                key={t.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.15, duration: 0.5 }}
                whileHover={{ y: -8, rotate: idx === 1 ? -1 : 1 }}
                className={`${t.bg} rounded-[2rem] p-8 lg:p-10 shadow-lg hover:shadow-2xl transition-all duration-300 relative overflow-hidden group`}
              >
                <Quote size={40} className={`absolute top-8 right-8 ${t.lightText ? 'text-white/20' : 'text-black/5'} group-hover:scale-110 transition-transform duration-300`} />
                <div className="flex items-center gap-1.5 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={18} className={i < t.rating ? (t.lightText ? 'fill-white text-white' : 'fill-[#222B33] text-[#222B33]') : 'text-black/10'} />
                  ))}
                </div>
                <p className={`${t.lightText ? 'text-white' : 'text-[#222B33]'} text-lg font-medium mb-8 leading-relaxed relative z-10`}>"{t.text}"</p>
                <div className="flex items-center gap-4">
                  <div className={`w-12 h-12 rounded-full ${t.lightText ? 'bg-white text-[#2F858E]' : 'bg-[#222B33] text-white'} flex items-center justify-center text-sm font-bold shadow-md`}>
                    {t.initials}
                  </div>
                  <div>
                    <p className={`font-bold ${t.lightText ? 'text-white' : 'text-[#222B33]'}`}>{t.name}</p>
                    <p className={`${t.lightText ? 'text-white/80' : 'text-[#222B33]/60'} text-xs font-bold`}>{t.role}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-24 lg:py-32 bg-[#2F858E] relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#EBCFB7]/20 rounded-full blur-[100px] translate-x-1/3 -translate-y-1/3" />
           <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#E7B5A3]/20 rounded-full blur-[100px] -translate-x-1/3 translate-y-1/3" />
        </div>
        
        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-[#222B33] rounded-[3rem] p-12 lg:p-20 shadow-2xl overflow-hidden relative"
          >
            {/* Inner decorative blob */}
            <div className="absolute -top-24 -right-24 w-64 h-64 bg-[#E7B5A3]/20 rounded-full blur-3xl pointer-events-none" />
            
            <h2 className="text-4xl sm:text-5xl lg:text-[4rem] font-bold text-white tracking-tight mb-8 leading-[1.1] relative z-10">
              See an issue?<br />
              <span className="text-[#E7B5A3]">Make it visible.</span><br />
              Get it resolved.
            </h2>
            <p className="text-xl text-slate-300 mb-12 max-w-2xl mx-auto font-medium relative z-10">
              Join the students and administrators working together for a better campus experience.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center relative z-10">
              <Link
                to="/register"
                className="group flex items-center justify-center gap-2 bg-[#EBCFB7] text-[#222B33] px-10 py-5 rounded-full text-lg font-bold shadow-xl hover:shadow-2xl hover:bg-white hover:-translate-y-1 transition-all duration-300"
              >
                Report an Issue
                <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                to="/login"
                className="flex items-center justify-center gap-2 bg-transparent border-2 border-white/20 text-white px-10 py-5 rounded-full text-lg font-bold hover:bg-white/10 hover:border-white/40 transition-all backdrop-blur-sm"
              >
                Track a Complaint
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
