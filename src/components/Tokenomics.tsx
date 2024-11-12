import React, { useState, useEffect } from 'react';
import { CircleDollarSign, Coins, BarChart3, Wallet, Tag } from 'lucide-react';
import { useInView } from 'react-intersection-observer';

export default function Tokenomics() {
  const [fundsRaised, setFundsRaised] = useState(0);
  const { ref, inView } = useInView({
    threshold: 0.1,
    triggerOnce: true,
    initialInView: false
  });

  useEffect(() => {
    let animationFrame: number;
    let startTime: number;
    const duration = 3000; // 3 seconds
    const targetValue = 1000;

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setFundsRaised(Math.floor(targetValue * percentage));

      if (progress < duration) {
        animationFrame = requestAnimationFrame(animate);
      }
    };

    if (inView) {
      animationFrame = requestAnimationFrame(animate);
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
    };
  }, [inView]);

  return (
    <section id="tokenomics" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Tokenomics
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Understanding Sekura's token distribution and utility
          </p>
        </div>

        <div className="mt-16" ref={ref}>
          <div className="max-w-7xl mx-auto bg-gradient-to-r from-teal-500 to-teal-600 rounded-lg p-8 text-white">
            <div className="grid grid-cols-5 gap-8 text-center">
              <div className="flex flex-col items-center">
                <CircleDollarSign className="h-8 w-8 mb-2" />
                <p className="text-2xl font-bold">${fundsRaised.toLocaleString()}+</p>
                <p className="mt-1 text-sm">Funds Raised</p>
              </div>
              <div className="flex flex-col items-center">
                <Coins className="h-8 w-8 mb-2" />
                <p className="text-2xl font-bold">100B</p>
                <p className="mt-1 text-sm">Total Supply</p>
              </div>
              <div className="flex flex-col items-center">
                <BarChart3 className="h-8 w-8 mb-2" />
                <p className="text-2xl font-bold">1B</p>
                <p className="mt-1 text-sm">Circulating Supply</p>
              </div>
              <div className="flex flex-col items-center">
                <Tag className="h-8 w-8 mb-2" />
                <p className="text-2xl font-bold">SKU</p>
                <p className="mt-1 text-sm">Token Ticker</p>
              </div>
              <div className="flex flex-col items-center">
                <Wallet className="h-8 w-8 mb-2" />
                <p className="text-2xl font-bold">ERC20</p>
                <p className="mt-1 text-sm">Token Standard</p>
              </div>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-4">
            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Public Sale</h3>
                <p className="mt-2 text-3xl font-bold text-teal-600">40%</p>
                <p className="mt-2 text-sm text-gray-500">Available for public distribution</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Liquidity Pool</h3>
                <p className="mt-2 text-3xl font-bold text-teal-600">30%</p>
                <p className="mt-2 text-sm text-gray-500">Reserved for market liquidity</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Development</h3>
                <p className="mt-2 text-3xl font-bold text-teal-600">20%</p>
                <p className="mt-2 text-sm text-gray-500">Future development & ecosystem</p>
              </div>
            </div>

            <div className="bg-white rounded-lg p-6 shadow-lg">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900">Team & Advisory</h3>
                <p className="mt-2 text-3xl font-bold text-teal-600">10%</p>
                <p className="mt-2 text-sm text-gray-500">Team allocation & advisors</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}