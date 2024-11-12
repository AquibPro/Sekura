import React from 'react';
import { Shield, Lock, Zap } from 'lucide-react';

export default function About() {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            About Sekura
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Revolutionizing digital assets with unparalleled security and innovation
          </p>
        </div>

        <div className="mt-20 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100">
              <Shield className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Advanced Security</h3>
            <p className="mt-2 text-center text-gray-500">
              State-of-the-art encryption and security protocols protecting your assets
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100">
              <Lock className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Privacy First</h3>
            <p className="mt-2 text-center text-gray-500">
              Enhanced privacy features ensuring your transactions remain confidential
            </p>
          </div>

          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center h-16 w-16 rounded-full bg-teal-100">
              <Zap className="h-8 w-8 text-teal-600" />
            </div>
            <h3 className="mt-6 text-xl font-medium text-gray-900">Fast Transactions</h3>
            <p className="mt-2 text-center text-gray-500">
              Lightning-fast transaction speeds with minimal fees
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}