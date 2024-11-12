import React from 'react';
import { Coins } from 'lucide-react';

export default function Hero() {
  return (
    <div className="pt-20 bg-gradient-to-b from-teal-500 to-teal-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
        <div className="text-center">
          <div className="flex justify-center mb-8">
            <Coins className="h-20 w-20 text-white" />
          </div>
          <h1 className="text-4xl tracking-tight font-extrabold text-white sm:text-5xl md:text-6xl">
            <span className="block">Welcome to Sekura</span>
            <span className="block text-teal-200">The Future of Secure Digital Assets</span>
          </h1>
          <p className="mt-3 max-w-md mx-auto text-base text-teal-100 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
            Join the revolution with SKU token - An ERC20 token built on Ethereum blockchain.
            Burnable and mintable for enhanced tokenomics.
          </p>
          <div className="mt-10 flex justify-center gap-4">
            <a href="#buy" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-teal-700 bg-white hover:bg-teal-50 md:py-4 md:text-lg md:px-10">
              Buy Sekura
            </a>
            <a href="/whitepaper" className="px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-800 md:py-4 md:text-lg md:px-10">
              Whitepaper
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}