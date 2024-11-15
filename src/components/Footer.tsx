import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  Twitter, 
  MessageCircle, 
  MessagesSquare, 
  Mail, 
  Globe, 
  Instagram,
  Linkedin,
  Clock,
  AlertCircle
} from 'lucide-react';

export default function Footer() {
  const location = useLocation();
  const navigate = useNavigate();

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, sectionId: string) => {
    e.preventDefault();
    if (location.pathname !== '/') {
      navigate('/', { state: { scrollTo: sectionId } });
    } else {
      const section = document.getElementById(sectionId);
      section?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Sekura (SKU)</h3>
            <p className="mt-4 text-gray-400">Building the future of secure digital transactions.</p>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com/sekurachain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://t.me/sekurachain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">
                <MessageCircle className="h-6 w-6" />
              </a>
              <a href="https://discord.gg/w95N9bpk" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">
                <MessagesSquare className="h-6 w-6" />
              </a>
              <a href="https://instagram.com/sekurachain" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://www.linkedin.com/in/sekurachain/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">
                <Linkedin className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="#about" onClick={(e) => scrollToSection(e, 'about')} className="text-gray-400 hover:text-teal-500">About</a></li>
              <li><a href="#mission-vision" onClick={(e) => scrollToSection(e, 'mission-vision')} className="text-gray-400 hover:text-teal-500">Mission</a></li>
              <li><a href="#tokenomics" onClick={(e) => scrollToSection(e, 'tokenomics')} className="text-gray-400 hover:text-teal-500">Tokenomics</a></li>
              <li><a href="#roadmap" onClick={(e) => scrollToSection(e, 'roadmap')} className="text-gray-400 hover:text-teal-500">Roadmap</a></li>
              <li><a href="#how-to-buy" onClick={(e) => scrollToSection(e, 'how-to-buy')} className="text-gray-400 hover:text-teal-500">How to Buy</a></li>
              <li><a href="#contribute" onClick={(e) => scrollToSection(e, 'contribute')} className="text-gray-400 hover:text-teal-500">Contribute to Sekura</a></li>
              <li><a href="#news" onClick={(e) => scrollToSection(e, 'news')} className="text-gray-400 hover:text-teal-500">News & Insights</a></li>
              <li><a href="#market" onClick={(e) => scrollToSection(e, 'market')} className="text-gray-400 hover:text-teal-500">Cryptocurrency Market</a></li>
              <li><a href="#calculator" onClick={(e) => scrollToSection(e, 'calculator')} className="text-gray-400 hover:text-teal-500">Cryptocurrency Calculator</a></li>
              <li><a href="#faq" onClick={(e) => scrollToSection(e, 'faq')} className="text-gray-400 hover:text-teal-500">FAQ</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/whitepaper" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">Whitepaper</Link></li>
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-teal-500">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-teal-500">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-gray-400 hover:text-teal-500">Disclaimer</Link></li>
              <li><a href="https://etherscan.io/token/0x33296Ecd13d422E071aA15F879759adf72dFC958" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">Contract</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-3">
              <li className="flex items-center text-gray-400">
                <div className="flex-shrink-0 w-8">
                  <Mail className="h-7 w-7" />
                </div>
                <a href="mailto:support@sekurachain.com" className="hover:text-teal-500 ml-2">support@sekurachain.com</a>
              </li>
              <li className="flex items-center text-gray-400">
                <div className="flex-shrink-0 w-8">
                  <Globe className="h-7 w-7" />
                </div>
                <a href="https://sekurachain.com" className="hover:text-teal-500 ml-2">www.sekurachain.com</a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Support Hours:</h4>
              <div className="flex items-center text-gray-400 mb-3">
                <div className="flex-shrink-0 w-8">
                  <Clock className="h-7 w-7" />
                </div>
                <p className="ml-2">Email response within 72 hours</p>
              </div>
              <div className="flex items-center text-gray-400">
                <div className="flex-shrink-0 w-8">
                  <AlertCircle className="h-7 w-7" />
                </div>
                <p className="ml-2">Responses may take longer during high demand</p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Sekura Chain. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}