import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaShieldAlt, FaRegHandshake, FaFileAlt } from 'react-icons/fa';

const PrivacyPolicy: React.FC = () => {
  return (
    <div>
      <Navbar />

      {/* Banner Section */}
      <header className="bg-dark text-white text-center py-5">
        <div className="container">
          <h1 className="display-4" style={{ fontWeight: '500' }}>Privacy Policy</h1>
          <p className="lead">Your privacy is important to us. Please read our privacy policy carefully</p>
        </div>
      </header>

      {/* Main Content */}
      <div className="container my-5 px-5"> {/* Padding applied to the entire section */}
        <div className="row justify-content-center">
          <div className="col-md-8">
            <h2 className="mb-4" style={{ fontSize: '2.5rem' }}>
              <FaFileAlt className="me-2" style={{ fontSize: '2.5rem' }} />
              Privacy Policy
            </h2>
            <p className="text-start text-primary">Last Updated: 07 December 2024</p>

            <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
              At Acehive, we value your privacy. This privacy policy outlines how we collect, use, and protect your personal data. We collect data from students to provide relevant educational resources and materials through our platform. All data collected is sourced from publicly available resources or submitted voluntarily by users.
            </p>

            <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
              <em style={{ fontStyle: 'italic', color: 'red' }}>
                We do NOT claim ownership of any resources or data provided
              </em> by third parties. The materials shared through our platform, including notes, study materials, and previous exam papers, are obtained from publicly available sources and are intended for educational purposes only. By using this platform, you acknowledge that you are using materials that are made available for your academic benefit and do not infringe upon any intellectual property rights.
            </p>

            <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
              We do not collect or use your personal data to enhance user experience, personalize content, or improve platform functionality. However, if you choose to leave feedback, please note that your email address and feedback may be made publicly available on the website. This information will only be displayed with your consent, and you can request removal at any time. We are committed to protecting your privacy and ensuring that your experience on Acehive remains seamless and beneficial.
            </p>

            <hr className="my-4" />

            <h3 className="mb-3"><FaShieldAlt className="me-2" /> Data Collection</h3>
            <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
              We do not collect any personal information beyond what is voluntarily provided by users during registration or use of the platform. No sensitive information, such as payment details, is collected. We respect your privacy and only store the information necessary for delivering the platform's functionality.
            </p>

            <hr className="my-4" />

            <h3 className="mb-3"><FaRegHandshake className="me-2" /> Third-Party Access</h3>
            <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
              We do not sell, trade, or rent your personal information to third parties. However, we may share non-personal data or aggregate information with third parties to improve our platform’s performance or for analytical purposes. In such cases, your personal data remains confidential and is not shared with external entities without your explicit consent.
            </p>

            <hr className="my-4" />

            <h3 className="mb-3"><FaShieldAlt className="me-2" /> Data Security</h3>
            <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
              We implement robust security measures to protect your data from unauthorized access, alteration, or destruction. We use encryption, firewalls, and secure data storage practices to safeguard your information. However, please note that no method of data transmission over the internet is 100% secure, and we cannot guarantee absolute security.
            </p>

            <hr className="my-4" />

            <h3 className="mb-3"><FaRegHandshake className="me-2" /> Consent and Changes</h3>
            <p style={{ textAlign: 'justify', lineHeight: '1.6' }}>
              By using Acehive, you consent to our privacy policy. We reserve the right to update or modify this privacy policy at any time, and any changes will be reflected on this page. We encourage you to review this policy regularly to stay informed about how we protect your personal data.
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
