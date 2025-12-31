import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';

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
import ConciergeAI from './components/ConciergeAI';
import WarpTransition from './components/WarpTransition';
import VoiceControl from './components/VoiceControl';
import { TreasureHuntProvider } from './components/TreasureHunt';

// Pages
import Home from './pages/Home';
import ServicesPage from './pages/Services';
import PortfolioPage from './pages/Portfolio';
import ContactPage from './pages/Contact';
import Login from './pages/Login';
import ClientDashboard from './pages/ClientDashboard';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

const AppContent = () => {
  const { pathname } = useLocation();

  // Define paths that should NOT have the main site layout
  const isAdminPath = pathname.startsWith('/admin') || pathname === '/login' || pathname === '/dashboard';

  return (
    <TreasureHuntProvider>
      <ScrollToTop />

      {/* Site-wide interactive elements (Hidden on Admin/Login) */}
      {!isAdminPath && (
        <>
          <Preloader />
          <EliteCursor />
          <AmbientGlow />
          <SoundController />
          <CustomContextMenu />
          <DevMode />
          <ConciergeAI />
          <WarpTransition />
          <VoiceControl />
          <Navbar />
        </>
      )}

      {/* Main Content Area */}
      <main className={!isAdminPath ? "min-h-screen relative" : ""}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/servicos" element={<ServicesPage />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/contato" element={<ContactPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/admin-login" element={<AdminLogin />} />
          <Route path="/dashboard" element={<ClientDashboard />} />
          <Route path="/admin-portal" element={<AdminDashboard />} />
        </Routes>
      </main>

      {/* Footer (Hidden on Admin/Login) */}
      {!isAdminPath && <Footer />}
      {!isAdminPath && <BackToTop />}
    </TreasureHuntProvider>
  );
};

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
