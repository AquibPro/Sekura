import React from 'react';
import { CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ThankYou() {
  const handleReturnHome = () => {
    // Smooth scroll to top before navigating
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 transform animate-[slideIn_0.5s_ease-out]">
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 mb-6">
            <CheckCircle className="w-16 h-16 text-green-500 animate-[checkmark_0.8s_ease-in-out]" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your contribution details have been submitted successfully. We'll review and get back to you soon.
          </p>
          <Link
            to="/"
            onClick={handleReturnHome}
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-teal-600 hover:bg-teal-700"
          >
            Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}