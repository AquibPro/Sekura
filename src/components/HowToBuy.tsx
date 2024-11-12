import React from 'react';
import { Hourglass, Coins, Users, ArrowRight, Rocket } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HowToBuy() {
  return (
    <section id="how-to-buy" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            How to Buy Sekura
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Join the future of secure digital finance
          </p>
        </div>

        <div className="mt-16">
          <div className="relative">
            {/* Background Image */}
            <div 
              className="absolute inset-0 z-0 opacity-10 rounded-3xl"
              style={{
                backgroundImage: 'url("https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2832&auto=format&fit=crop")',
                backgroundSize: 'cover',
                backgroundPosition: 'center'
              }}
            />

            <div className="relative z-10 bg-white/90 backdrop-blur-sm rounded-3xl p-8 shadow-xl">
              <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-teal-100 rounded-full mb-4">
                  <Hourglass className="h-8 w-8 text-teal-600" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">
                  Coming Soon!
                </h3>
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  We are currently in the liquidity raising phase. Sekura will be available for trading very soon on major decentralized exchanges.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-teal-500 rounded-full mb-4 mx-auto">
                    <Coins className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    Initial Liquidity
                  </h4>
                  <p className="text-gray-600 text-center">
                    Building a strong foundation with secure liquidity pools
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-teal-500 rounded-full mb-4 mx-auto">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    Community Growth
                  </h4>
                  <p className="text-gray-600 text-center">
                    Expanding our community of early supporters
                  </p>
                </div>

                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-center justify-center w-12 h-12 bg-teal-500 rounded-full mb-4 mx-auto">
                    <Rocket className="h-6 w-6 text-white" />
                  </div>
                  <h4 className="text-lg font-semibold text-gray-900 text-center mb-2">
                    Launch Preparation
                  </h4>
                  <p className="text-gray-600 text-center">
                    Final steps before public trading begins
                  </p>
                </div>
              </div>

              <div className="text-center">
                <p className="text-lg text-gray-800 mb-6">
                  Want to accelerate our launch? Join our early supporters!
                </p>
                <Link
                  to="/contribute"
                  className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Contribute Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}