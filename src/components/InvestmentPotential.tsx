import React from 'react';
import { TrendingUp, Award, Users, BarChart } from 'lucide-react';

export default function InvestmentPotential() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Growth & Investment Potential
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Key metrics and growth indicators
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div className="bg-teal-50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <TrendingUp className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Market Growth</h3>
            <p className="mt-2 text-gray-600">Steady growth trajectory in the crypto market</p>
          </div>

          <div className="bg-teal-50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Users className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">User Base</h3>
            <p className="mt-2 text-gray-600">Growing community of active token holders</p>
          </div>

          <div className="bg-teal-50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <Award className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Recognition</h3>
            <p className="mt-2 text-gray-600">Increasing visibility in the crypto space</p>
          </div>

          <div className="bg-teal-50 rounded-lg p-6 transform transition-all duration-300 hover:scale-105 hover:shadow-lg">
            <BarChart className="h-8 w-8 text-teal-600 mb-4" />
            <h3 className="text-lg font-semibold text-gray-900">Trading Volume</h3>
            <p className="mt-2 text-gray-600">Consistent daily trading activity</p>
          </div>
        </div>

        <div className="mt-12 bg-teal-600 rounded-lg p-8 text-white transform transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
          <h3 className="text-2xl font-bold mb-4">Why Invest in Sekura?</h3>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-teal-200">✓</span>
              <span className="ml-3">Strong technical foundation with Proof-of-Stake consensus</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-teal-200">✓</span>
              <span className="ml-3">Regular token burns to maintain value</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-teal-200">✓</span>
              <span className="ml-3">Transparent development roadmap</span>
            </li>
            <li className="flex items-start">
              <span className="flex-shrink-0 h-6 w-6 text-teal-200">✓</span>
              <span className="ml-3">Active community governance</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}