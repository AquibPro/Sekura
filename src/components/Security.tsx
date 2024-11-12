import React from 'react';
import { Shield, Lock, FileCheck, UserCheck, Copy, ExternalLink } from 'lucide-react';

export default function Security() {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  return (
    <section id="security" className="py-20 bg-white">
      {/* Previous security content remains the same */}

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
                    className="p-1.5 text-teal-600 hover:text-teal-700 transition-colors"
                    title="Copy Address"
                  >
                    <Copy className="h-5 w-5" />
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
    </section>
  );
}