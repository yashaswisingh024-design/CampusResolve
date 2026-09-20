import React from 'react';
import { Shield } from 'lucide-react';
import { Link } from 'react-router-dom';

export const Footer = () => {
  return (
    <footer className="bg-slate-900 py-12 text-slate-400 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2.5">
            <div className="bg-primary-accent rounded-lg p-2 text-white shadow-sm">
              <Shield size={20} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-white">
              Campus<span className="text-primary-accent">Resolve</span>
            </span>
          </div>
          <div className="flex gap-8 text-sm">
            <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-slate-800 text-sm text-center md:text-left flex flex-col md:flex-row justify-between">
          <p>&copy; {new Date().getFullYear()} CampusResolve. All rights reserved.</p>
          <p className="mt-2 md:mt-0">Made for a better campus experience.</p>
        </div>
      </div>
    </footer>
  );
};
