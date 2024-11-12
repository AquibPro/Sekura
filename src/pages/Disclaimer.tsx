import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function Disclaimer() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Disclaimer</h1>
        
        <div className="prose prose-lg">
          <h2>1. Investment Risks</h2>
          <p>Cryptocurrency investments involve substantial risk and are not suitable for every investor. The value of cryptocurrencies can be highly volatile, subject to market dynamics, regulatory changes, technological advancements, and market sentiment. Prices can fluctuate rapidly, and investors should be prepared for the possibility of losing their entire investment. You should carefully assess your risk tolerance and investment goals before participating in any cryptocurrency-related activity.</p>
          <p>Cryptocurrency markets can be manipulated, and while they offer potential rewards, the risk of loss is equally significant. Past performance of tokens or cryptocurrencies is not necessarily indicative of future results.</p>

          <h2>2. No Financial, Investment, or Legal Advice</h2>
          <p>The information provided on this website is for general informational purposes only. It should not be construed as financial, investment, legal, or tax advice. No part of the website should be taken as a recommendation or endorsement to buy, sell, or hold any cryptocurrency, nor should it be considered as advice for making any investment decisions.</p>
          <p>If you require financial, investment, legal, or tax advice, you should consult with a qualified professional who can provide you with advice tailored to your individual circumstances.</p>

          <h2>3. Forward-Looking Statements</h2>
          <p>This website may contain forward-looking statements regarding the future performance of Sekura (SKU) or related technology, products, or services. These statements are based on current expectations and projections about future events, but they involve risks and uncertainties that could cause actual results to differ materially from those expressed or implied. These forward-looking statements may include but are not limited to:</p>
          <ul>
            <li>Projections of future market trends</li>
            <li>Statements regarding the development of Sekura and related products</li>
            <li>Expectations about adoption and use of the Sekura token</li>
            <li>Plans for integration into the DeFi ecosystem and broader blockchain space</li>
          </ul>
          <p>Actual results may differ significantly from the information contained in these forward-looking statements due to factors such as market conditions, technological changes, regulatory changes, or other unforeseen events.</p>

          <h2>4. Technical Risks</h2>
          <p>Blockchain technology and smart contracts are innovative but still relatively new technologies. They may contain bugs, vulnerabilities, or weaknesses that could be exploited by malicious actors. Sekura does not guarantee that its smart contracts or the underlying blockchain infrastructure will be free from errors, bugs, or security vulnerabilities. As with any new technology, there are inherent risks related to their adoption and use. Users should ensure they fully understand the risks associated with blockchain technology and smart contracts before engaging with the platform.</p>
          <p>Users should also be aware of potential risks from cyberattacks, including hacking, phishing, and other security breaches that could compromise user data or assets. Users are advised to take all necessary precautions to protect their private keys, wallets, and accounts.</p>

          <h2>5. Regulatory Compliance</h2>
          <p>Cryptocurrency is subject to varying degrees of regulation across different jurisdictions. Users are solely responsible for ensuring their compliance with all applicable laws and regulations regarding cryptocurrency transactions in their local jurisdiction. Sekura does not guarantee that its platform or token complies with the laws of all countries and jurisdictions, and it is the responsibility of the user to understand and comply with their local regulations. It is highly recommended that users seek legal counsel to understand their obligations and the risks associated with cryptocurrency investments in their jurisdiction.</p>

          <h2>6. No Guarantees</h2>
          <p>Sekura makes no guarantees regarding the future value of the Sekura (SKU) token, its trading volume, or its listing on exchanges. While Sekura aims to create a sustainable and valuable product, it cannot guarantee any specific outcomes, including:</p>
          <ul>
            <li>Future token value or price appreciation</li>
            <li>Trading volume or liquidity in any market</li>
            <li>Exchange listings or availability on trading platforms</li>
            <li>Project development timelines, including technical or strategic milestones</li>
          </ul>
          <p>Any forward-looking statements made by Sekura, whether on the website or through other communications, are subject to change and should not be relied upon as assurances of future success.</p>

          <h2>7. Volatility and Market Fluctuations</h2>
          <p>The cryptocurrency market is known for its high volatility. As a result, the value of Sekura (SKU) tokens and other cryptocurrencies may fluctuate wildly within short periods. External factors such as government regulations, global economic conditions, investor sentiment, and technological advancements can all contribute to market fluctuations. Users should be prepared for the possibility of significant losses, and only invest what they are willing to lose.</p>

          <h2>8. Security Risks</h2>
          <p>While Sekura takes measures to secure its platform, users must understand that no system is completely secure. There are inherent risks associated with the use of digital currencies, including but not limited to:</p>
          <ul>
            <li>Theft or loss of private keys</li>
            <li>Phishing attacks and other scams</li>
            <li>Failures in smart contract code</li>
            <li>Loss of access to wallets due to user error or device failure</li>
          </ul>
          <p>Users should always exercise caution and use best practices for securing their private keys and other sensitive information, including enabling two-factor authentication and using hardware wallets for additional security.</p>

          <h2>9. No Liability for Loss</h2>
          <p>Sekura and its affiliates, officers, directors, employees, or agents will not be held liable for any loss or damage arising from your use of the platform or participation in the Sekura ecosystem. This includes, but is not limited to, losses from:</p>
          <ul>
            <li>Market volatility</li>
            <li>Security breaches</li>
            <li>Failure of the platform or smart contracts</li>
            <li>Regulatory actions</li>
            <li>Third-party service provider failures</li>
          </ul>
          <p>Users assume full responsibility for their participation in the Sekura ecosystem and the risks associated with cryptocurrency investments.</p>

          <h2>10. Changes to the Disclaimer</h2>
          <p>Sekura reserves the right to modify or update this Disclaimer at any time. All changes will be posted on this page, and the "Last updated" date will be revised accordingly. Users are encouraged to periodically review the Disclaimer for any updates or changes that may affect their use of the platform.</p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions or concerns about this Disclaimer, or if you need further clarification on any of the points mentioned, please feel free to reach out to us:</p>
          <p>Email: support@sekura.io</p>
          <p>Address: Sekura Inc., 123 Blockchain Blvd, Crypto City, CC 10101</p>
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
