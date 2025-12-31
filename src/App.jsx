import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { User } from 'lucide-react';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import Preloader from './components/Preloader';
import EliteCursor from './components/EliteCursor';
import AmbientGlow from './components/AmbientGlow';
import SoundController from './components/SoundController';
import CustomContextMenu from './components/CustomContextMenu';
import DevMode from './components/DevMode';
import AdminDemo from './components/AdminDemo';
import LiveDemoViewer from './components/LiveDemoViewer';
import ConciergeAI from './components/ConciergeAI';
import WarpTransition from './components/WarpTransition';
import VoiceControl from './components/VoiceControl';
import MagneticWrapper from './components/MagneticWrapper';
import { TreasureHuntProvider } from './components/TreasureHunt';

// Pages
import Home from './pages/Home';
import ServicesPage from './pages/Services';
import PortfolioPage from './pages/Portfolio';
import ContactPage from './pages/Contact';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

function App() {
  const [adminOpen, setAdminOpen] = useState(false);

  return (
    <Router>
      <TreasureHuntProvider>
        <ScrollToTop />
        <Preloader />
        <EliteCursor />
        <AmbientGlow />
        <SoundController />
        <CustomContextMenu />
        <DevMode />
        <ConciergeAI />
        <WarpTransition />
        <VoiceControl />

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

        <Navbar />

        <main className="min-h-screen relative">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/servicos" element={<ServicesPage />} />
            <Route path="/portfolio" element={<PortfolioPage />} />
            <Route path="/contato" element={<ContactPage />} />
          </Routes>

          <Footer />
          <BackToTop />
        </main>
      </TreasureHuntProvider>
    </Router>
  );
}

export default App;
