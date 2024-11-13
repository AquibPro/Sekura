import React from 'react';
import { Copy, Check } from 'lucide-react';

interface ContributeDetailsProps {
  isCopied: { eth: boolean; btc: boolean };
  onCopy: (text: string, type: 'eth' | 'btc') => void;
}

export default function ContributeDetails({ isCopied, onCopy }: ContributeDetailsProps) {
  return (
    <div className="mb-8 space-y-6">
      <div>
        <h3 className="text-lg font-semibold mb-4">Wallet Address</h3>
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <code className="text-sm break-all">0x3425d4CF30f844e5070d9DDD2ea5bfef553C2488</code>
          <button
            onClick={() => onCopy('0x3425d4CF30f844e5070d9DDD2ea5bfef553C2488', 'eth')}
            className="ml-2 p-2 text-teal-600 hover:text-teal-700 transition-all duration-500"
            title="Copy Address"
          >
            {isCopied.eth ? (
              <Check className="h-5 w-5 transform transition-all duration-500" />
            ) : (
              <Copy className="h-5 w-5 transform transition-all duration-500" />
            )}
          </button>
        </div>
      </div>

      <div className="mt-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Supported Tokens:</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-sm text-gray-600">
          <li className="flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            Ethereum (ETH)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            USDT (ERC20 & BEP20)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            USDC (ERC20 & BEP20)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            TRON (ERC20)
          </li>
          <li className="flex items-center">
            <span className="w-2 h-2 bg-teal-500 rounded-full mr-2"></span>
            BNB
          </li>
        </ul>
      </div>

      <div>
        <h3 className="text-lg font-semibold mb-4">Bitcoin Address</h3>
        <div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg">
          <code className="text-sm break-all">bc1qpl6vdh9awp6pxhmg4zyghnm5q727r20fay22aa</code>
          <button
            onClick={() => onCopy('bc1qpl6vdh9awp6pxhmg4zyghnm5q727r20fay22aa', 'btc')}
            className="ml-2 p-2 text-teal-600 hover:text-teal-700 transition-all duration-500"
            title="Copy Address"
          >
            {isCopied.btc ? (
              <Check className="h-5 w-5 transform transition-all duration-500" />
            ) : (
              <Copy className="h-5 w-5 transform transition-all duration-500" />
            )}
          </button>
        </div>
      </div>
    </div>
  );
}