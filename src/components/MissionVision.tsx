import React from 'react';
import { Target, Eye, Shield } from 'lucide-react';

export default function MissionVision() {
  return (
    <section id="mission-vision" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Mission & Vision
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Building the future of secure digital finance
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mx-auto">
              <Target className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-center text-gray-900">Mission</h3>
            <p className="mt-4 text-gray-600 text-center">
              To provide a secure, transparent, and accessible digital asset platform that empowers users worldwide through innovative blockchain technology.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mx-auto">
              <Eye className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-center text-gray-900">Vision</h3>
            <p className="mt-4 text-gray-600 text-center">
              To become the leading platform for secure digital transactions, setting new standards in cryptocurrency security and usability.
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8 transform transition-all duration-300 hover:scale-105 hover:shadow-xl">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-xl font-bold text-center text-gray-900">Values</h3>
            <p className="mt-4 text-gray-600 text-center">
              Security, transparency, innovation, and community-driven development form the cornerstone of our project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}