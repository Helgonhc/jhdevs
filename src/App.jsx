import React from 'react';
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

function App() {
  return (
    <>
      <Preloader />
      <EliteCursor />
      <AmbientGlow />
      <SoundController />
      <CustomContextMenu />
      <SocialProof />
      <main className="min-h-screen">
        <Navbar />
        <Hero />
        <TechBar />
        <Stats />
        <Niches />
        <Services />
        <BeforeAfter />
        <BudgetCalculator />
        <Process />
        <Portfolio />
        <BlogExpress />
        <Testimonials />
        <FAQ />
        <Contact />
        <Footer />
        <BackToTop />
      </main>
    </>
  );
}

export default App;
