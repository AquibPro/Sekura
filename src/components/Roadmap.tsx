import React from 'react';

export default function Roadmap() {
  return (
    <section id="roadmap" className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Roadmap
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Our journey to revolutionize digital finance
          </p>
        </div>

        <div className="relative">
          {/* Timeline line */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-teal-200"></div>

          <div className="space-y-12">
            {[
              {
                phase: "Phase 1 - Launch",
                title: "Initial Setup & Liquidity",
                items: [
                  "Smart Contract Development & Audit ✓",
                  "Initial Liquidity Pool Setup",
                  "DEX Listing & Price Discovery",
                  "Community Building Initiatives"
                ]
              },
              {
                phase: "Phase 2",
                title: "Exchange Expansion",
                items: [
                  "CEX Listings",
                  "Market Making Partnerships",
                  "Trading Volume Growth",
                  "Marketing Campaign Launch"
                ]
              },
              {
                phase: "Phase 3",
                title: "Ecosystem Development",
                items: [
                  "Payment Gateway Integration",
                  "Governance Implementation",
                  "Strategic Partnerships",
                  "Community DAO Formation"
                ]
              },
              {
                phase: "Phase 4",
                title: "Market Expansion",
                items: [
                  "Major Exchange Listings",
                  "Cross-chain Integration",
                  "DeFi Protocol Partnerships",
                  "Global Marketing Expansion"
                ]
              }
            ].map((phase, index) => (
              <div key={index} className={`flex ${index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center`}>
                <div className={`w-full md:w-5/12 ${index % 2 === 0 ? 'md:pr-8' : 'md:pl-8'}`}>
                  <div className="bg-white p-6 rounded-lg shadow-lg transform transition-all duration-300 hover:scale-105">
                    <div className="flex items-center justify-between mb-4">
                      <span className="px-3 py-1 text-sm font-semibold text-teal-600 bg-teal-100 rounded-full">
                        {phase.phase}
                      </span>
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">{phase.title}</h3>
                    <ul className="space-y-3">
                      {phase.items.map((item, i) => (
                        <li key={i} className="flex items-start">
                          <span className="h-6 w-6 flex-shrink-0 flex items-center justify-center rounded-full bg-teal-500 text-white text-sm">
                            {item.includes('✓') ? '✓' : (i + 1)}
                          </span>
                          <span className="ml-3 text-gray-600">{item.replace(' ✓', '')}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                <div className="hidden md:block w-2/12 flex items-center justify-center">
                  <div className="w-8 h-8 bg-teal-500 rounded-full border-4 border-white shadow"></div>
                </div>
                <div className="hidden md:block w-5/12"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}