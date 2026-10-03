import React from 'react';
import Navbar from '../../components/layout/Navbar';
import Hero from '../../components/landing/Hero';
import Features from '../../components/landing/Features';
import Process from '../../components/landing/Process';
import Stats from '../../components/landing/Stats';
import TrackerDemo from '../../components/landing/TrackerDemo';
import Footer from '../../components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <Process />
      <Stats />
      <TrackerDemo />
      <Footer />
    </div>
  );
}
