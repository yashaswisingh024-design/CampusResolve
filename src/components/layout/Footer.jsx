import React from 'react';
import { Link } from 'react-router-dom';
import { Shield } from 'lucide-react';

export default function Footer() {
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#222B33] text-slate-400 py-20 relative overflow-hidden">
      {/* Decorative Blur */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2F858E]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#E7B5A3]/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8 mb-16">
          <div className="md:col-span-2">
            <Link to="/" className="flex items-center gap-2.5 mb-6">
              <div className="bg-white/10 rounded-xl p-2 text-white shadow-lg backdrop-blur-sm">
                <Shield size={24} className="stroke-[2.5]" />
              </div>
              <span className="font-bold text-2xl tracking-tight">
                <span className="text-white">Campus</span>
                <span className="text-[#EBCFB7]">Resolve</span>
              </span>
            </Link>
            <p className="text-base text-slate-400 leading-relaxed max-w-sm font-medium">
              A modern platform for reporting, tracking, and resolving campus issues. Built for students and administrators.
            </p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Navigate</h4>
            <ul className="space-y-4">
              <li><button onClick={() => scrollToSection('features')} className="text-base font-medium text-slate-400 hover:text-[#EBCFB7] transition-colors">Features</button></li>
              <li><button onClick={() => scrollToSection('process')} className="text-base font-medium text-slate-400 hover:text-[#EBCFB7] transition-colors">How it works</button></li>
              <li><button onClick={() => scrollToSection('impact')} className="text-base font-medium text-slate-400 hover:text-[#EBCFB7] transition-colors">Impact</button></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-6 text-sm uppercase tracking-wider">Account</h4>
            <ul className="space-y-4">
              <li><Link to="/login" className="text-base font-medium text-slate-400 hover:text-[#EBCFB7] transition-colors">Sign in</Link></li>
              <li><Link to="/register" className="text-base font-medium text-slate-400 hover:text-[#EBCFB7] transition-colors">Get started</Link></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700/50 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm font-medium">&copy; {new Date().getFullYear()} CampusResolve. Built for better campuses.</p>
        </div>
      </div>
    </footer>
  );
}
