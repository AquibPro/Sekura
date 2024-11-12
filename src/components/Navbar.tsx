import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    const section = document.getElementById(sectionId);
    section?.scrollIntoView({ behavior: 'smooth' });
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center space-x-3">
            <img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEi_2kkCFZ-eIjABcSfu94wiu-gSoz4QJynk_iJCfoNSV2nJCwS1KK6YcOOTDzGkz8YxJ-2e7Tmkj6nDLgTaR4in4sF5wxQhET7ahMk8Ox_-pS8wgW_ikj8DuV0eAbza3ZhRAdJZ0Ybld3uLjl0tHeWPiRjPtaV75GPNkG95MHJZ7EqnTAj4AxcW4Lf31k74/s499/sekura.png" alt="Sekura Logo" className="h-10 w-10 rounded-full" />
            <Link to="/" className="text-2xl font-bold" style={{ color: 'rgb(39, 180, 208)' }}>Sekura</Link>
          </div>

          {/* Desktop menu */}
          <div className="hidden md:flex items-center space-x-6">
            <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-600 hover:text-teal-500">About</a>
            <a href="#mission-vision" onClick={(e) => scrollToSection(e, 'mission-vision')} className="text-gray-600 hover:text-teal-500">Mission</a>
            <a href="#tokenomics" onClick={(e) => scrollToSection(e, 'tokenomics')} className="text-gray-600 hover:text-teal-500">Tokenomics</a>
            <a href="#roadmap" onClick={(e) => scrollToSection(e, 'roadmap')} className="text-gray-600 hover:text-teal-500">Roadmap</a>
            <a href="#how-to-buy" onClick={(e) => scrollToSection(e, 'how-to-buy')} className="text-gray-600 hover:text-teal-500">How to Buy</a>
            <Link to="/whitepaper" target="_blank" rel="noopener noreferrer" className="text-gray-600 hover:text-teal-500">Whitepaper</Link>
            <Link to="/contribute" className="bg-teal-500 text-white px-4 py-2 rounded-lg hover:bg-teal-600">
              Contribute
            </Link>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-gray-600 hover:text-teal-500 focus:outline-none"
            >
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
              <a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="block px-3 py-2 text-gray-600 hover:text-teal-500">About</a>
              <a href="#mission-vision" onClick={(e) => scrollToSection(e, 'mission-vision')} className="block px-3 py-2 text-gray-600 hover:text-teal-500">Mission</a>
              <a href="#tokenomics" onClick={(e) => scrollToSection(e, 'tokenomics')} className="block px-3 py-2 text-gray-600 hover:text-teal-500">Tokenomics</a>
              <a href="#roadmap" onClick={(e) => scrollToSection(e, 'roadmap')} className="block px-3 py-2 text-gray-600 hover:text-teal-500">Roadmap</a>
              <a href="#how-to-buy" onClick={(e) => scrollToSection(e, 'how-to-buy')} className="block px-3 py-2 text-gray-600 hover:text-teal-500">How to Buy</a>
              <Link to="/whitepaper" target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-gray-600 hover:text-teal-500">Whitepaper</Link>
              <Link to="/contribute" className="block px-3 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600">
                Contribute
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}