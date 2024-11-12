import React, { useState } from 'react';
import { Shield, Lock, FileCheck, UserCheck, Copy, ExternalLink, Check } from 'lucide-react';

export default function Security() {
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <section id="security" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Security & Transparency
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Built with security at its core
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mx-auto">
              <Shield className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">Secure Infrastructure</h3>
            <p className="mt-2 text-gray-600 text-center">
              Multi-layer security protocols and regular audits ensure maximum protection
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mx-auto">
              <Lock className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">Smart Contract Security</h3>
            <p className="mt-2 text-gray-600 text-center">
              Thoroughly audited smart contracts with built-in safety mechanisms
            </p>
          </div>

          <div className="bg-white rounded-lg p-6 shadow-lg">
            <div className="flex items-center justify-center h-12 w-12 rounded-md bg-teal-500 text-white mx-auto">
              <UserCheck className="h-6 w-6" />
            </div>
            <h3 className="mt-6 text-lg font-medium text-gray-900 text-center">Community Trust</h3>
            <p className="mt-2 text-gray-600 text-center">
              Transparent operations and regular community updates
            </p>
          </div>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-semibold mb-4">Contract Transparency</h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600 mb-2">Token Contract Address:</p>
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg">
                  <code className="text-sm text-gray-800 flex-1 break-all">
                    0x33296Ecd13d422E071aA15F879759adf72dFC958
                  </code>
                  <div className="flex items-center space-x-2 flex-shrink-0">
                    <a 
                      href="https://etherscan.io/token/0x33296Ecd13d422E071aA15F879759adf72dFC958"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-teal-600 hover:text-teal-700 transition-colors"
                      title="View on Etherscan"
                    >
                      <ExternalLink className="h-5 w-5" />
                    </a>
                    <button
                      onClick={() => copyToClipboard('0x33296Ecd13d422E071aA15F879759adf72dFC958')}
                      className="p-1.5 text-teal-600 hover:text-teal-700 transition-all duration-500"
                      title="Copy Address"
                    >
                      {isCopied ? (
                        <Check className="h-5 w-5 transform transition-all duration-500" />
                      ) : (
                        <Copy className="h-5 w-5 transform transition-all duration-500" />
                      )}
                    </button>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600">
                View the verified contract source code and transactions on Etherscan
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}