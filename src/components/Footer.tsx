import React from 'react';
import { Github, Twitter, MessageCircle, MessagesSquare, Mail, Globe } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold">Sekura (SKU)</h3>
            <p className="mt-4 text-gray-400">Building the future of secure digital transactions.</p>
            <div className="mt-6 flex space-x-4">
              <a href="https://twitter.com/sekuratoken" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="https://t.me/sekuratoken" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">
                <MessageCircle className="h-6 w-6" />
              </a>
              <a href="https://discord.gg/sekura" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">
                <MessagesSquare className="h-6 w-6" />
              </a>
              <a href="https://github.com/sekuratoken" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">
                <Github className="h-6 w-6" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li><a href="/#about" className="text-gray-400 hover:text-teal-500">About</a></li>
              <li><a href="/#mission-vision" className="text-gray-400 hover:text-teal-500">Mission</a></li>
              <li><a href="/#tokenomics" className="text-gray-400 hover:text-teal-500">Tokenomics</a></li>
              <li><a href="/#roadmap" className="text-gray-400 hover:text-teal-500">Roadmap</a></li>
              <li><a href="/#how-to-buy" className="text-gray-400 hover:text-teal-500">How to Buy</a></li>
              <li><Link to="/whitepaper" className="text-gray-400 hover:text-teal-500">Whitepaper</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Legal</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/privacy-policy" className="text-gray-400 hover:text-teal-500">Privacy Policy</Link></li>
              <li><Link to="/terms-of-service" className="text-gray-400 hover:text-teal-500">Terms of Service</Link></li>
              <li><Link to="/disclaimer" className="text-gray-400 hover:text-teal-500">Disclaimer</Link></li>
              <li><a href="https://etherscan.io/token/0x33296Ecd13d422E071aA15F879759adf72dFC958" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-teal-500">Contract</a></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="flex items-center text-gray-400">
                <Mail className="h-5 w-5 mr-2" />
                <a href="mailto:contact@sekura.io" className="hover:text-teal-500">contact@sekura.io</a>
              </li>
              <li className="flex items-center text-gray-400">
                <Globe className="h-5 w-5 mr-2" />
                <a href="https://sekura.io" className="hover:text-teal-500">www.sekura.io</a>
              </li>
            </ul>
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Support Hours:</h4>
              <p className="text-gray-400 text-sm">24/7 via Discord & Telegram</p>
              <p className="text-gray-400 text-sm">Email response within 24 hours</p>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-800">
          <p className="text-center text-gray-400">
            © {new Date().getFullYear()} Sekura. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}