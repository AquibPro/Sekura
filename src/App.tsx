import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Tokenomics from './components/Tokenomics';
import Roadmap from './components/Roadmap';
import Security from './components/Security';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ContributePage from './pages/ContributePage';
import Whitepaper from './pages/Whitepaper';
import PrivacyPolicy from './pages/PrivacyPolicy';
import TermsOfService from './pages/TermsOfService';
import Disclaimer from './pages/Disclaimer';
import MissionVision from './components/MissionVision';
import ValueProposition from './components/ValueProposition';
import InvestmentPotential from './components/InvestmentPotential';
import TechnicalStructure from './components/TechnicalStructure';
import HowToBuy from './components/HowToBuy';
import ContributeSection from './components/ContributeSection';
import NewsAndBlogs from './components/NewsAndBlogs';
import CryptoMarket from './components/CryptoMarket';
import CoinDetails from './pages/CoinDetails';

function ScrollToTop() {
  const location = useLocation();
  const { state } = location as { state: { scrollTo?: string } | null };

  useEffect(() => {
    if (state?.scrollTo) {
      if (state.scrollTo === 'top') {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else {
        setTimeout(() => {
          const element = document.getElementById(state.scrollTo!);
          element?.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, state]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        <ScrollToTop />
        <Navbar />
        <Routes>
          <Route path="/" element={
            <>
              <Hero />
              <About />
              <MissionVision />
              <ValueProposition />
              <Tokenomics />
              <InvestmentPotential />
              <TechnicalStructure />
              <Roadmap />
              <HowToBuy />
              <Security />
              <ContributeSection />
              <NewsAndBlogs />
              <CryptoMarket />
              <FAQ />
            </>
          } />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
          <Route path="/coin/:id" element={<CoinDetails />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;