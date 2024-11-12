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
                phase: "Phase 1",
                title: "Foundation",
                items: [
                  "Token Launch",
                  "Initial Exchange Listings",
                  "Community Building",
                  "Security Audit"
                ]
              },
              {
                phase: "Phase 2",
                title: "Growth",
                items: [
                  "Exchange Expansion",
                  "Strategic Partnerships",
                  "Staking Platform",
                  "Mobile Wallet Development"
                ]
              },
              {
                phase: "Phase 3",
                title: "Expansion",
                items: [
                  "DeFi Integration",
                  "Cross-chain Development",
                  "Governance Implementation",
                  "Marketing Expansion"
                ]
              },
              {
                phase: "Phase 4",
                title: "Evolution",
                items: [
                  "Enterprise Solutions",
                  "NFT Integration",
                  "Metaverse Development",
                  "Ecosystem Growth"
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
                            ✓
                          </span>
                          <span className="ml-3 text-gray-600">{item}</span>
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