import React from 'react';
import { Code, Shield, Cpu, GitBranch } from 'lucide-react';

export default function TechnicalStructure() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Technical Structure
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Deep dive into Sekura's technical foundation
          </p>
        </div>

        <div className="mt-16 grid grid-cols-1 gap-8 lg:grid-cols-2">
          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Shield className="h-6 w-6 text-teal-500 mr-2" />
              Consensus Mechanism
            </h3>
            <p className="text-gray-600 mb-4">
              Sekura utilizes Proof-of-Stake (PoS) consensus mechanism, offering:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Energy-efficient validation</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Reduced environmental impact</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Enhanced security through stake-based validation</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Code className="h-6 w-6 text-teal-500 mr-2" />
              Smart Contracts
            </h3>
            <p className="text-gray-600 mb-4">
              Built on Ethereum using advanced smart contract features:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>ERC20 standard compliance</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Burnable and mintable token mechanisms</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Automated liquidity management</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Cpu className="h-6 w-6 text-teal-500 mr-2" />
              Network Architecture
            </h3>
            <p className="text-gray-600 mb-4">
              Designed for scalability and performance:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Layer 2 scaling solutions</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Cross-chain compatibility</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>High throughput capacity</span>
              </li>
            </ul>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-8">
            <h3 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <GitBranch className="h-6 w-6 text-teal-500 mr-2" />
              Development Framework
            </h3>
            <p className="text-gray-600 mb-4">
              Built with industry-leading tools and practices:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Solidity smart contracts</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Hardhat development environment</span>
              </li>
              <li className="flex items-start">
                <span className="h-6 w-6 flex items-center justify-center rounded-full bg-teal-100 text-teal-500 text-sm mr-2">✓</span>
                <span>Comprehensive testing framework</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}