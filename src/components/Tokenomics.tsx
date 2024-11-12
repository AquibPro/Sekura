import React from 'react';
import { PieChart, Wallet, Users, Building, LineChart } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function Tokenomics() {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="tokenomics" className="py-20 bg-white">
      {/* Previous tokenomics content remains the same until the metrics section */}

      <div ref={ref} className="mt-16">
        <div className="max-w-3xl mx-auto bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-8 text-white">
          <div className="grid grid-cols-4 gap-4 text-center">
            <div>
              <p className="text-2xl font-bold">$1,000+</p>
              <p className="mt-1 text-sm">Funds Raised</p>
              <div className="mt-4 bg-teal-400/30 rounded-full h-2">
                <div 
                  className="bg-white rounded-full h-2 transition-all duration-1000 ease-out"
                  style={{ width: inView ? '25%' : '0%' }}
                ></div>
              </div>
            </div>
            <div>
              <p className="text-2xl font-bold">100B</p>
              <p className="mt-1 text-sm">Total Supply</p>
            </div>
            <div>
              <p className="text-2xl font-bold">SKU</p>
              <p className="mt-1 text-sm">Token Ticker</p>
            </div>
            <div>
              <p className="text-2xl font-bold">ERC20</p>
              <p className="mt-1 text-sm">Token Standard</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}