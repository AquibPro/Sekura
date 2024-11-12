import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
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
              <FAQ />
            </>
          } />
          <Route path="/contribute" element={<ContributePage />} />
          <Route path="/whitepaper" element={<Whitepaper />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/disclaimer" element={<Disclaimer />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;