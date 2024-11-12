import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Home } from 'lucide-react';

export default function PrivacyPolicy() {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const handleBackHome = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="pt-20 pb-16 min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
        
        <div className="prose prose-lg">
          <p>Last updated: March 14, 2024</p>

          <h2>1. Information We Collect</h2>
          <p>We collect information that you provide directly to us, as well as information collected automatically, including:</p>
          <ul>
            <li>Account Information: When you create an account, we collect details such as your name, email address, and wallet address.</li>
            <li>Transaction Data: Information related to transactions you perform, including amounts, transaction ID, and timestamps.</li>
            <li>Communications: Records of interactions with our support team or other communications with Sekura.</li>
            <li>Usage Data: Automatically collected information on your interactions with the platform, including IP address, browser type, and access times.</li>
            <li>Device Information: Data from your device, such as operating system and unique device identifiers.</li>
            <li>Cookies and Tracking Technologies: Information from cookies and similar technologies to improve user experience and analyze website traffic.</li>
          </ul>

          <h2>2. How We Use Your Information</h2>
          <p>Your information helps us provide, maintain, and improve our services, and is used in the following ways:</p>
          <ul>
            <li>To process and verify your transactions securely.</li>
            <li>To provide customer support and respond to inquiries.</li>
            <li>To enhance our platform functionality and optimize user experience.</li>
            <li>To communicate updates, marketing, and promotional content, which you may opt-out of at any time.</li>
            <li>To comply with legal and regulatory requirements and prevent fraud.</li>
            <li>To conduct internal audits, data analysis, and research to improve Sekura's security and performance.</li>
          </ul>

          <h2>3. Information Sharing and Disclosure</h2>
          <p>We do not share your personal information with third parties except under the following circumstances:</p>
          <ul>
            <li><strong>Service Providers:</strong> Third-party providers who assist us with platform operations, such as hosting, analytics, and payment processing, and are obligated to protect your data.</li>
            <li><strong>Legal Compliance:</strong> Disclosure of information if required by law, court order, or government request.</li>
            <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, or sale of assets, your information may be transferred as part of the transaction.</li>
            <li><strong>Protection of Rights:</strong> To protect the rights, property, or safety of Sekura, our users, or others, including preventing illegal activity.</li>
          </ul>

          <h2>4. Information Security</h2>
          <p>We take your privacy and security seriously, implementing appropriate technical and organizational measures to protect against unauthorized access, loss, or misuse of your information. Measures include:</p>
          <ul>
            <li>Data encryption and secure storage practices.</li>
            <li>Access controls to restrict access to sensitive data.</li>
            <li>Regular monitoring and updates to our security practices.</li>
            <li>Periodic third-party security audits to ensure compliance and security best practices.</li>
          </ul>

          <h2>5. Your Rights</h2>
          <p>Depending on your location, you may have certain rights regarding your personal information, including:</p>
          <ul>
            <li>Right to access, correct, or delete your personal information.</li>
            <li>Right to restrict or object to certain processing of your data.</li>
            <li>Right to data portability, where applicable.</li>
            <li>Right to withdraw consent for data processing, if previously given.</li>
            <li>Right to opt-out of marketing communications by following the unsubscribe link in emails or contacting us directly.</li>
          </ul>

          <h2>6. Retention of Data</h2>
          <p>We retain your information only for as long as necessary to fulfill the purposes outlined in this Privacy Policy, comply with legal obligations, resolve disputes, and enforce our agreements. Retention periods vary depending on the type of data and purpose of collection.</p>

          <h2>7. Cookies and Tracking Technologies</h2>
          <p>We use cookies and similar tracking technologies to enhance user experience, analyze trends, and administer the site. You can adjust your browser settings to refuse cookies, but this may affect your ability to use certain features of the platform.</p>

          <h2>8. Cross-Border Data Transfers</h2>
          <p>Your personal information may be transferred to, stored, and processed in countries outside of your residence. By using Sekura, you consent to such transfers, with the understanding that we ensure data protection consistent with applicable laws.</p>

          <h2>9. Third-Party Links</h2>
          <p>Our platform may contain links to third-party websites or services that are not operated by Sekura. We are not responsible for the privacy practices of these third-party sites, and we recommend reviewing their privacy policies before providing any personal information.</p>

          <h2>10. Changes to this Privacy Policy</h2>
          <p>We may update this Privacy Policy periodically to reflect changes in our practices, technology, or legal requirements. We will notify you of any material changes by posting the new policy on our website or by sending a notification. Your continued use of Sekura after changes indicates acceptance of the updated policy.</p>

          <h2>11. Contact Us</h2>
          <p>If you have any questions about this Privacy Policy or wish to exercise your data rights, please contact us at:</p>
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