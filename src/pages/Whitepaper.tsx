import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function Whitepaper() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Sekura Whitepaper</h1>
        
        <div className="prose prose-lg">
          <h2>Abstract</h2>
          <p>Sekura (SKU) is an ERC20 token built on the Ethereum blockchain, designed to revolutionize digital asset security and accessibility. With burnable and mintable capabilities, Sekura implements advanced tokenomics for long-term sustainability.</p>

          <h2>Introduction</h2>
          <p>The rise of decentralized finance and digital assets has created demand for secure, accessible tokens with flexible utility. Sekura aims to address security, liquidity, and governance challenges in the cryptocurrency ecosystem, ensuring a resilient, community-focused token.</p>

          <h2>Market Analysis</h2>
          <p>The cryptocurrency market is evolving rapidly, with increased interest in secure, sustainable digital assets. The need for tokens that prioritize both community involvement and robust security measures is more significant than ever, especially in light of recent vulnerabilities in traditional assets.</p>

          <h2>Problem Statement</h2>
          <p>Existing tokens often lack mechanisms to ensure long-term value retention and community engagement. Additionally, many assets face security vulnerabilities, making them less attractive to new investors. Sekura addresses these issues by incorporating automated mechanisms for burn and mint and implementing advanced governance and security features.</p>

          <h2>Solution Overview</h2>
          <p>Sekura’s advanced ERC20-based token is designed to maintain long-term value and adaptability. With a focus on transparency, security, and sustainability, Sekura integrates automated burns to reduce supply, multi-signature wallets for governance, and community-driven decision-making.</p>

          <h2>Technical Specifications</h2>
          <ul>
            <li>Token Standard: ERC20</li>
            <li>Blockchain: Ethereum</li>
            <li>Total Supply: 100 Billion SKU</li>
            <li>Features: Burnable, Mintable</li>
            <li>Smart Contract Audited by: CertiK</li>
          </ul>

          <h2>Tokenomics and Utility</h2>
          <ul>
            <li>Public Sale: 40%</li>
            <li>Liquidity Pool: 30%</li>
            <li>Development: 20%</li>
            <li>Team & Advisory: 10%</li>
          </ul>
          <p>The Sekura token (SKU) facilitates secure transactions within the ecosystem, rewards holders, and enables participation in governance. Through staking and holding, users gain voting rights, which empowers them to influence project direction.</p>

          <h2>Use Cases</h2>
          <ul>
            <li><strong>Staking Rewards:</strong> Users can stake SKU tokens to earn rewards while securing the network.</li>
            <li><strong>Governance:</strong> Token holders participate in protocol governance through voting mechanisms.</li>
            <li><strong>DeFi Integration:</strong> Sekura tokens can be used across various DeFi platforms for trading, lending, and borrowing.</li>
            <li><strong>Marketplace Access:</strong> Exclusive access to digital assets and platforms using SKU as a transaction currency.</li>
          </ul>

          <h2>Technology</h2>
          <p>Sekura utilizes advanced smart contract features including:</p>
          <ul>
            <li>Automated burning mechanism</li>
            <li>Controlled minting process</li>
            <li>Multi-signature security</li>
            <li>Flash loan attack prevention</li>
          </ul>

          <h2>Security Measures</h2>
          <ul>
            <li>Smart contract audits</li>
            <li>Multi-signature wallets</li>
            <li>Time-locked contracts</li>
            <li>Regular security assessments</li>
          </ul>

          <h2>Governance</h2>
          <p>Token holders can participate in governance decisions through:</p>
          <ul>
            <li>Proposal submission</li>
            <li>Voting rights</li>
            <li>Community feedback</li>
          </ul>

          <h2>Roadmap</h2>
          <p>Sekura’s development will proceed across several phases:</p>
          <ul>
            <li><strong>Phase 1 - Launch:</strong> Token launch, listing on major exchanges, initial staking features.</li>
            <li><strong>Phase 2 - DeFi Integration:</strong> Incorporate Sekura into major DeFi platforms, providing staking and yield farming.</li>
            <li><strong>Phase 3 - Cross-Chain Capabilities:</strong> Expand Sekura’s reach through integration with multiple blockchain networks.</li>
            <li><strong>Phase 4 - Enterprise Solutions:</strong> Build partnerships with enterprise solutions requiring secure digital assets.</li>
            <li><strong>Phase 5 - Metaverse Expansion:</strong> Introduce Sekura as a primary transaction token in digital and metaverse environments.</li>
          </ul>

          <h2>Future Development</h2>
          <p>Detailed roadmap available in the project timeline section, including:</p>
          <ul>
            <li>DeFi integration</li>
            <li>Cross-chain capabilities</li>
            <li>Enterprise solutions</li>
            <li>Metaverse expansion</li>
          </ul>

          <h2>Conclusion</h2>
          <p>Sekura aims to create a secure, resilient, and community-driven digital asset. By focusing on sustainable tokenomics, strong governance, and future-focused development, Sekura positions itself as a valuable token within the growing decentralized financial ecosystem.</p>
        </div>

        <div className="mt-12 text-center">
          <Link
            to="/"
            onClick={handleBackHome}
            className="inline-flex items-center px-6 py-3 border border-transparent rounded-md shadow-sm text-base font-medium text-white bg-teal-600 hover:bg-teal-700"
          >
            <Home className="h-5 w-5 mr-2" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
