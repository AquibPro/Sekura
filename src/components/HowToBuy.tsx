import React from 'react';
import { Wallet, ArrowRight, CreditCard, RefreshCw } from 'lucide-react';

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How to Buy Sekura
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Follow these simple steps to purchase SKU tokens
          </p>
        </div>

        <div className="mt-16">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            {[
              {
                icon: <Wallet className="h-8 w-8" />,
                title: "Create Wallet",
                description: "Set up a MetaMask or any ERC20-compatible wallet"
              },
              {
                icon: <CreditCard className="h-8 w-8" />,
                title: "Add ETH",
                description: "Purchase ETH from your preferred exchange"
              },
              {
                icon: <RefreshCw className="h-8 w-8" />,
                title: "Connect Wallet",
                description: "Connect your wallet to Uniswap"
              },
              {
                icon: <ArrowRight className="h-8 w-8" />,
                title: "Swap for SKU",
                description: "Exchange ETH for Sekura tokens"
              }
            ].map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-lg p-6 h-full shadow-lg">
                  <div className="w-12 h-12 flex items-center justify-center bg-teal-500 rounded-full text-white">
                    {step.icon}
                  </div>
                  <h3 className="mt-4 text-xl font-medium text-gray-900">
                    {step.title}
                  </h3>
                  <p className="mt-2 text-gray-500">
                    {step.description}
                  </p>
                </div>
                {index < 3 && (
                  <div className="hidden md:block absolute top-1/2 -right-4 transform translate-x-1/2">
                    <ArrowRight className="h-6 w-6 text-teal-500" />
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="mt-12 text-center">
            <a
              href="https://app.uniswap.org/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
            >
              Buy Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}