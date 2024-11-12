import React from 'react';
import { Building, Users, Lock, Zap } from 'lucide-react';

export default function ValueProposition() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Value Proposition & Use Cases
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Real-world applications and benefits of Sekura
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Enterprise Solutions</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-500"><Building className="h-6 w-6" /></span>
                <span className="ml-3">Secure payment processing for businesses</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-500"><Lock className="h-6 w-6" /></span>
                <span className="ml-3">Smart contract automation for supply chains</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-500"><Users className="h-6 w-6" /></span>
                <span className="ml-3">Cross-border transaction solutions</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Individual Benefits</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-500"><Zap className="h-6 w-6" /></span>
                <span className="ml-3">Fast and secure peer-to-peer transactions</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-500"><Lock className="h-6 w-6" /></span>
                <span className="ml-3">Enhanced privacy and security features</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 text-teal-500"><Users className="h-6 w-6" /></span>
                <span className="ml-3">Access to DeFi ecosystem and rewards</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}