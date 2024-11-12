import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ContributeSection() {
  return (
    <section id="contribute" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Contribute to Sekura
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Join us in revolutionizing digital finance. Your contribution helps strengthen our liquidity pool and accelerates Sekura's growth. Early supporters receive exclusive benefits and priority access to new features.
          </p>
          <div className="mt-8">
            <Link
              to="/contribute"
              className="inline-flex items-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700 md:py-4 md:text-lg md:px-10"
            >
              Contribute Now
              <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}