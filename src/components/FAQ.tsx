import React, { useState } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(0);
  const questionsPerPage = 5;

  const faqs = [
    {
      question: "What is Sekura (SKU)?",
      answer: "Sekura is a revolutionary cryptocurrency focused on security and transparency in digital finance. With a total supply of 100 billion tokens, SKU aims to provide a secure and efficient platform for digital transactions."
    },
    {
      question: "How can I buy Sekura tokens?",
      answer: "Currently, Sekura is in the liquidity raising phase. Once completed, you'll be able to purchase tokens through supported cryptocurrency exchanges. Check our 'How to Buy' section for detailed instructions."
    },
    {
      question: "What makes Sekura unique?",
      answer: "Sekura stands out with its focus on security, compliance, and innovative technology. We implement advanced encryption, regular audits, and maintain full regulatory compliance while building a strong community."
    },
    {
      question: "Is Sekura secure?",
      answer: "Yes, Sekura prioritizes security through multiple layers of protection, including smart contract audits, multi-signature wallets, and regular security assessments by leading firms in the industry."
    },
    {
      question: "What are the tokenomics of Sekura?",
      answer: "Sekura has a total supply of 100 billion tokens, distributed across public sale (40%), liquidity pool (30%), development (20%), and team & advisory (10%). This distribution ensures long-term sustainability and growth."
    },
    {
      question: "What wallets support Sekura tokens?",
      answer: "Sekura tokens are compatible with any ERC20-supported wallet including MetaMask, Trust Wallet, Coinbase Wallet, Ledger, and other major cryptocurrency wallets that support Ethereum-based tokens."
    },
    {
      question: "Is Sekura listed on major exchanges?",
      answer: "Currently, Sekura is in the liquidity raising phase. Once completed, we plan to list on major decentralized exchanges (DEXs) first, followed by centralized exchanges (CEXs) as part of our expansion strategy."
    },
    {
      question: "What are the risks associated with investing in Sekura?",
      answer: "Like all cryptocurrencies, investing in Sekura carries risks including market volatility, regulatory changes, and technical risks. We recommend thoroughly reviewing our whitepaper and risk disclosure before investing."
    },
    {
      question: "How does Sekura plan to expand in the future?",
      answer: "Our expansion strategy includes DEX listings, CEX partnerships, cross-chain integration, DeFi protocol development, and global marketing initiatives. Check our roadmap section for detailed milestones."
    },
    {
      question: "How can I contact Sekura's support team?",
      answer: "You can reach our support team via email at support@sekurachain.com. We aim to respond within 3 business days, though response times may vary during high-demand periods."
    },
    {
      question: "How does Sekura contribute to DeFi (Decentralized Finance)?",
      answer: "Sekura enhances DeFi through secure smart contracts, cross-chain compatibility, and innovative tokenomics. We're developing DeFi protocols for staking, lending, and yield farming to create a comprehensive ecosystem."
    },
    {
      question: "Can I use Sekura tokens for purchases or payments?",
      answer: "Once listed, Sekura tokens can be used for various purposes including payments on supported platforms, DeFi activities, and participation in the Sekura ecosystem. We're actively working on expanding merchant adoption and payment integrations."
    },
    {
      question: "How can I track my Sekura transactions?",
      answer: "All Sekura transactions can be tracked on the Ethereum blockchain using block explorers like Etherscan. Simply enter your wallet address or transaction hash to view detailed transaction history and token movements."
    },
    {
      question: "Do I need any special software or wallet to hold Sekura?",
      answer: "No special software is required. You only need an ERC20-compatible wallet like MetaMask, Trust Wallet, or any other Ethereum wallet. Make sure to always use official wallet sources and follow security best practices."
    }
  ];

  const totalPages = Math.ceil(faqs.length / questionsPerPage);
  const displayedFaqs = faqs.slice(
    currentPage * questionsPerPage,
    (currentPage + 1) * questionsPerPage
  );

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(prev => prev + 1);
      setOpenIndex(null);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(prev => prev - 1);
      setOpenIndex(null);
    }
  };

  const goToPage = (pageIndex: number) => {
    setCurrentPage(pageIndex);
    setOpenIndex(null);
  };

  return (
    <section id="faq" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
            Everything you need to know about Sekura
          </p>
        </div>

        <div className="mt-12 max-w-3xl mx-auto">
          {displayedFaqs.map((faq, index) => (
            <div key={index} className="mb-4">
              <button
                className="w-full px-6 py-4 text-left bg-teal-50 hover:bg-teal-100 rounded-lg focus:outline-none transition-all duration-200"
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <div className="flex justify-between items-center">
                  <span className="font-medium text-gray-900">{faq.question}</span>
                  {openIndex === index ? (
                    <ChevronUp className="h-5 w-5 text-teal-500" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-teal-500" />
                  )}
                </div>
                <div
                  className={`mt-2 text-gray-600 transition-all duration-200 overflow-hidden ${
                    openIndex === index ? 'max-h-48' : 'max-h-0'
                  }`}
                >
                  {faq.answer}
                </div>
              </button>
            </div>
          ))}

          <div className="mt-8 flex items-center justify-center space-x-4">
            <button
              onClick={prevPage}
              disabled={currentPage === 0}
              className={`p-2 rounded-full ${
                currentPage === 0
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-teal-600 hover:bg-teal-100'
              }`}
            >
              <ChevronLeft className="h-6 w-6" />
            </button>

            <div className="flex space-x-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToPage(index)}
                  className={`w-2.5 h-2.5 rounded-full transition-all duration-200 ${
                    currentPage === index ? 'bg-teal-600' : 'bg-teal-200 hover:bg-teal-300'
                  }`}
                />
              ))}
            </div>

            <button
              onClick={nextPage}
              disabled={currentPage === totalPages - 1}
              className={`p-2 rounded-full ${
                currentPage === totalPages - 1
                  ? 'text-gray-400 cursor-not-allowed'
                  : 'text-teal-600 hover:bg-teal-100'
              }`}
            >
              <ChevronRight className="h-6 w-6" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}