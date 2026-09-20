import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Shield, Menu, X } from 'lucide-react';
import { Button } from '../common/Button';
import { cn } from '../../utils/cn';

export const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled ? "bg-white/80 backdrop-blur-md border-b border-slate-200 shadow-sm py-3" : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="bg-primary-accent rounded-lg p-2 text-white shadow-sm group-hover:shadow-md transition-shadow">
              <Shield size={22} className="stroke-[2.5]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-slate-900">
              Campus<span className="text-primary-accent">Resolve</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-sm font-medium text-slate-600 hover:text-primary-accent transition-colors">Features</a>
            <a href="#how-it-works" className="text-sm font-medium text-slate-600 hover:text-primary-accent transition-colors">How it works</a>
            <a href="#impact" className="text-sm font-medium text-slate-600 hover:text-primary-accent transition-colors">Impact</a>
          </nav>

          <div className="hidden md:flex items-center gap-4">
            <Link to="/login">
              <Button variant="ghost" size="sm" className="font-semibold">Sign in</Button>
            </Link>
            <Link to="/register">
              <Button size="sm" className="font-semibold shadow-primary-accent/25 shadow-lg">Get started</Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white border-b border-slate-200 shadow-lg px-4 py-6 flex flex-col gap-4">
          <a href="#features" className="text-base font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>Features</a>
          <a href="#how-it-works" className="text-base font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>How it works</a>
          <a href="#impact" className="text-base font-medium text-slate-800" onClick={() => setMobileMenuOpen(false)}>Impact</a>
          <hr className="border-slate-100 my-2" />
          <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
            <Button variant="outline" className="w-full">Sign in</Button>
          </Link>
          <Link to="/register" onClick={() => setMobileMenuOpen(false)}>
            <Button className="w-full">Get started</Button>
          </Link>
        </div>
      )}
    </header>
  );
};
