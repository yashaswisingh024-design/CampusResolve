import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Shield, Menu, X, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    setMobileOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const navLinks = [
    { label: 'Features', id: 'features' },
    { label: 'How it works', id: 'process' },
    { label: 'Impact', id: 'impact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? 'bg-white/90 backdrop-blur-lg shadow-sm border-b border-slate-200/50 py-3' : 'bg-transparent py-5'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className={`rounded-xl p-2 transition-colors ${scrolled ? 'bg-[#2F858E] text-white shadow-md' : 'bg-white/20 backdrop-blur-md text-white shadow-lg'}`}>
              <Shield size={24} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-2xl tracking-tight">
              <span className={scrolled ? 'text-[#222B33]' : 'text-white'}>Campus</span>
              <span className={scrolled ? 'text-[#2F858E]' : 'text-[#EBCFB7]'}>Resolve</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden lg:flex items-center gap-2">
            {navLinks.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollToSection(link.id)}
                className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                  scrolled ? 'text-slate-600 hover:text-[#2F858E] hover:bg-[#2F858E]/10' : 'text-white/80 hover:text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Desktop Auth */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              to="/login"
              className={`px-4 py-2 rounded-full text-sm font-bold transition-all ${
                scrolled ? 'text-[#222B33] hover:text-[#2F858E]' : 'text-white hover:text-[#EBCFB7]'
              }`}
            >
              Sign in
            </Link>
            <Link
              to="/register"
              className={`group flex items-center gap-2 px-6 py-2.5 rounded-full text-sm font-bold shadow-lg transition-all duration-300 ${
                scrolled ? 'bg-[#222B33] text-white hover:bg-[#2F858E] hover:-translate-y-0.5' : 'bg-[#EBCFB7] text-[#222B33] hover:bg-white hover:-translate-y-0.5'
              }`}
            >
              Get Started
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

          {/* Mobile Toggle */}
          <button
            className="lg:hidden p-2 rounded-lg"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen
              ? <X size={28} className={scrolled ? 'text-[#222B33]' : 'text-white'} />
              : <Menu size={28} className={scrolled ? 'text-[#222B33]' : 'text-white'} />
            }
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-b border-slate-200 shadow-xl overflow-hidden absolute top-full left-0 right-0"
          >
            <div className="px-6 py-8 space-y-2">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollToSection(link.id)}
                  className="block w-full text-left px-4 py-4 rounded-2xl text-[#222B33] font-bold text-lg hover:bg-slate-50 transition-colors"
                >
                  {link.label}
                </button>
              ))}
              <div className="pt-6 mt-6 border-t border-slate-100 space-y-3">
                <Link to="/login" className="block w-full text-center px-4 py-4 rounded-2xl text-[#222B33] font-bold text-lg hover:bg-slate-50 transition-colors" onClick={() => setMobileOpen(false)}>
                  Sign in
                </Link>
                <Link to="/register" className="block w-full text-center px-4 py-4 rounded-2xl bg-[#222B33] text-white font-bold text-lg shadow-lg" onClick={() => setMobileOpen(false)}>
                  Get Started
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
