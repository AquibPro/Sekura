import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const faqs = [
    {
      question: "What is Sekura (SKU)?",
      answer: "Sekura is a revolutionary cryptocurrency focused on security and transparency in digital finance. With a total supply of 100 billion tokens, SKU aims to provide a secure and efficient platform for digital transactions."
    },
    {
      question: "How can I buy Sekura tokens?",
      answer: "You can purchase Sekura tokens through supported cryptocurrency exchanges by first buying BNB or ETH, then swapping for SKU tokens. Check our 'How to Buy' section for detailed instructions."
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
    }
  ];

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
          {faqs.map((faq, index) => (
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
        </div>
      </div>
    </section>
  );
}