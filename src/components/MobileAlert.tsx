import React from 'react';
import { Monitor, Smartphone, X } from 'lucide-react';

interface MobileAlertProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileAlert({ isOpen, onClose }: MobileAlertProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6 animate-[slideIn_0.3s_ease-out]">
        <div className="flex justify-between items-start mb-4">
          <div className="flex items-center">
            <Smartphone className="h-6 w-6 text-teal-600 mr-2" />
            <h3 className="text-lg font-semibold text-gray-900">Mobile Device Detected</h3>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex justify-center mb-4">
          <Monitor className="h-16 w-16 text-teal-600" />
        </div>

        <p className="text-gray-600 mb-6 text-center">
          For the best experience viewing our platform, we recommend using a desktop or laptop computer. While you can continue on mobile, some features may be optimized for larger screens.
        </p>

        <button
          onClick={onClose}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-lg hover:bg-teal-700 transition-colors"
        >
          Continue to Site
        </button>
      </div>
    </div>
  );
}