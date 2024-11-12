import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function TermsOfService() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Terms of Service</h1>
        
        <div className="prose prose-lg">
          <p>Last updated: March 14, 2024</p>

          <h2>1. Acceptance of Terms</h2>
          <p>By accessing and using the Sekura platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree to these terms, please discontinue use of the platform immediately.</p>

          <h2>2. Description of Service</h2>
          <p>Sekura provides a cryptocurrency token (SKU) built on the Ethereum blockchain. The token is burnable and mintable, following ERC20 standards. Sekura may introduce new features, updates, or enhancements to the platform, which are subject to these Terms of Service.</p>

          <h2>3. User Responsibilities</h2>
          <p>As a user of Sekura, you agree to the following responsibilities:</p>
          <ul>
            <li>Maintain the security of your wallet and private keys.</li>
            <li>Ensure that all information provided is accurate, current, and complete.</li>
            <li>Refrain from using Sekura services for any illegal activities, including but not limited to fraud, money laundering, or terrorist financing.</li>
            <li>Comply with all applicable laws and regulations in your jurisdiction.</li>
            <li>Do not engage in market manipulation, including wash trading, front-running, or other manipulative trading practices.</li>
            <li>Notify Sekura of any unauthorized use or breach of security.</li>
          </ul>

          <h2>4. Account Security</h2>
          <p>You are responsible for maintaining the confidentiality of your account information and ensuring the security of your wallet. Sekura is not liable for any loss or damage resulting from your failure to protect your credentials and wallet access.</p>

          <h2>5. Risks</h2>
          <p>Cryptocurrency investments involve significant risks. Users should carefully consider their financial situation and risk tolerance before participating. Market volatility, regulatory changes, and technological risks are inherent to cryptocurrency. By using Sekura, you acknowledge these risks and agree to assume full responsibility for your actions.</p>

          <h2>6. Intellectual Property</h2>
          <p>All intellectual property rights, including but not limited to trademarks, logos, and content on the Sekura platform, are the property of Sekura and protected by applicable intellectual property laws. Unauthorized use of Sekura's intellectual property is strictly prohibited.</p>

          <h2>7. Limitation of Liability</h2>
          <p>To the fullest extent permitted by law, Sekura shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or assets, resulting from your use or inability to use the service. Sekura's total liability in connection with these Terms shall not exceed the amount paid by you, if any, for accessing Sekura services.</p>

          <h2>8. Indemnification</h2>
          <p>You agree to indemnify, defend, and hold harmless Sekura, its affiliates, and their respective directors, officers, employees, and agents from any claims, damages, losses, liabilities, and expenses arising from or related to your use of the Sekura platform, breach of these Terms, or violation of any rights of a third party.</p>

          <h2>9. Privacy Policy</h2>
          <p>Sekura is committed to protecting your privacy. By using the platform, you consent to our data collection, storage, and processing practices as outlined in our <Link to="/privacy-policy">Privacy Policy</Link>.</p>

          <h2>10. Termination of Access</h2>
          <p>Sekura reserves the right to suspend or terminate your access to the platform at any time, for any reason, including but not limited to violation of these Terms, fraudulent activity, or unlawful behavior. Upon termination, you must discontinue all use of the platform, and Sekura may delete any data associated with your account.</p>

          <h2>11. Modifications to the Terms</h2>
          <p>Sekura reserves the right to modify or update these Terms of Service at any time. We will notify users of significant changes through updates on the platform or via email. Continued use of Sekura after modifications constitute acceptance of the new terms.</p>

          <h2>12. Dispute Resolution</h2>
          <p>Any disputes arising from these Terms of Service shall be governed by the laws of the jurisdiction where Sekura is headquartered. Users agree to resolve disputes through binding arbitration, waiving the right to trial by jury or to participate in a class-action lawsuit.</p>

          <h2>13. Governing Law</h2>
          <p>These Terms of Service and any disputes arising from them shall be governed by and construed in accordance with the laws of the jurisdiction in which Sekura operates. By using the platform, you agree to submit to the exclusive jurisdiction of the courts in this jurisdiction.</p>

          <h2>14. Contact</h2>
          <p>If you have any questions or concerns regarding these Terms of Service, please contact us at:</p>
          <p>Email: support@sekurachain.com</p>
          <p>Address: Maharashtra, India</p>
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