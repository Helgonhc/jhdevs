import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Niches from './components/Niches';
import Services from './components/Services';
import Portfolio from './components/Portfolio';
import Testimonials from './components/Testimonials';
import Contact from './components/Contact';
import Footer from './components/Footer';

import TechBar from './components/TechBar';
import Process from './components/Process';
import FAQ from './components/FAQ';
import Stats from './components/Stats';
import BudgetCalculator from './components/BudgetCalculator';
import BlogExpress from './components/BlogExpress';
import BackToTop from './components/BackToTop';
import Preloader from './components/Preloader';
import EliteCursor from './components/EliteCursor';
import AmbientGlow from './components/AmbientGlow';
import SocialProof from './components/SocialProof';
import BeforeAfter from './components/BeforeAfter';
import MagneticWrapper from './components/MagneticWrapper';
import SoundController from './components/SoundController';
import CustomContextMenu from './components/CustomContextMenu';
import DevMode from './components/DevMode';
import AdminDemo from './components/AdminDemo';
import LiveDemoViewer from './components/LiveDemoViewer';
import ConciergeAI from './components/ConciergeAI';
import WarpTransition from './components/WarpTransition';
import MagicGenerator from './components/MagicGenerator';
import VoiceControl from './components/VoiceControl';
import { TreasureHuntProvider } from './components/TreasureHunt';
import HiddenCoin from './components/HiddenCoin';
import { User } from 'lucide-react';

function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <TreasureHuntProvider>
      <Preloader />
      <EliteCursor />
      <AmbientGlow />
      <SoundController />
      <CustomContextMenu />
      <DevMode />
      <ConciergeAI />
      <WarpTransition />
      <VoiceControl />
      <SocialProof />

      {/* Floating Client Area Button */}
      <div className="fixed top-24 right-6 z-40 hidden md:block">
        <MagneticWrapper strength={0.2}>
          <button
            onClick={() => setAdminOpen(true)}
            className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-white/10 transition-colors"
          >
            <User size={14} className="text-primary" />
            Área do Cliente
          </button>
        </MagneticWrapper>
      </div>

      <LiveDemoViewer
        isOpen={adminOpen}
        onClose={() => setAdminOpen(false)}
        component={AdminDemo}
      />

      <main className="min-h-screen relative">
        {/* Coin 1: Hidden in Hero Area */}
        <HiddenCoin className="top-32 left-10" />

        <Navbar />
        <Hero />
        <TechBar />
        <Stats />
        <MagicGenerator />
        <Niches />
        <Services />
        <BeforeAfter />
        <BudgetCalculator />
        <Process />

        {/* Coin 2: Hidden near Process */}
        <div className="relative">
          <HiddenCoin className="top-0 right-20" />
        </div>

        <Portfolio />
        <BlogExpress />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />

        {/* Coin 3: Hidden in Footer Area */}
        <HiddenCoin className="bottom-10 left-10" />

        <BackToTop />
      </main>
    </TreasureHuntProvider>
  );
}

export default App;
