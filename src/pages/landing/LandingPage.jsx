import React from 'react';
import { Navbar } from '../../components/layout/Navbar';
import { Hero } from '../../components/landing/Hero';
import { Features } from '../../components/landing/Features';
import { Process } from '../../components/landing/Process';
import { TrackerDemo } from '../../components/landing/TrackerDemo';
import { Stats } from '../../components/landing/Stats';
import { Footer } from '../../components/layout/Footer';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <Hero />
        <Stats />
        <Features />
        <Process />
        <TrackerDemo />
      </main>
      <Footer />
    </div>
  );
}
