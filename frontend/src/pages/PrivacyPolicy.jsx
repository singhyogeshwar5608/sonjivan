import React from 'react';
import { Shield, Lock, Eye, Database, UserCheck, FileText, AlertCircle, Phone, Mail, Globe } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-green-600 to-green-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <Shield className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Privacy Policy</h1>
          </div>
          <p className="text-center text-green-100 text-lg max-w-2xl mx-auto">
            Your Privacy is Our Priority - JB Aluminum Industries
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <FileText className="w-6 h-6 text-green-600 mr-3 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  At JB Aluminum Industries, we are committed to protecting your privacy and ensuring the security of your 
                  personal information. This Privacy Policy explains how we collect, use, disclose, and 
                  safeguard your information when you use our services, visit our website, or interact with us.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  By using our services, you agree to the collection and use of information in accordance with this policy.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  <strong>Effective Date:</strong> December 2024<br />
                  <strong>Last Updated:</strong> December 2024
                </p>
              </div>
            </div>
          </div>

          {/* Information We Collect */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <Database className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Information We Collect</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">1. Personal Information</h3>
                <p className="text-gray-600 mb-2">We collect the following personal information:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Full name, age, and gender</li>
                  <li>Contact details (phone number, email address, residential address)</li>
                  <li>Date of birth and identification documents (if required)</li>
                  <li>Emergency contact information</li>
                </ul>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">2. Service Information</h3>
                <p className="text-gray-600 mb-2">For providing aluminum products and services, we collect:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Product requirements and specifications</li>
                  <li>Installation location and measurements</li>
                  <li>Service requests and project details</li>
                  <li>Custom design preferences</li>
                  <li>Delivery and installation schedules</li>
                </ul>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">3. Payment Information</h3>
                <p className="text-gray-600 mb-2">When you make a payment, we collect:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>Payment method details (credit/debit card, UPI, net banking)</li>
                  <li>Billing address and transaction history</li>
                  <li>Invoice and receipt information</li>
                </ul>
                <p className="text-sm text-gray-500 mt-2">
                  Note: We do not store complete credit/debit card details. Payment processing is handled by secure 
                  third-party payment gateways.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">4. Technical Information</h3>
                <p className="text-gray-600 mb-2">We automatically collect certain technical data:</p>
                <ul className="list-disc list-inside text-gray-600 space-y-1 ml-4">
                  <li>IP address and browser type</li>
                  <li>Device information (operating system, device model)</li>
                  <li>Website usage data (pages visited, time spent, clicks)</li>
                  <li>Cookies and similar tracking technologies</li>
                  <li>Location data (if you enable location services)</li>
                </ul>
              </div>
            </div>
          </div>

          {/* How We Use Your Information */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <Eye className="w-6 h-6 text-indigo-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">How We Use Your Information</h2>
            </div>
            
            <div className="space-y-3 text-gray-600">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Service Delivery</h3>
                <p>To provide aluminum products, installation services, custom fabrication, and project consultations.</p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Communication</h3>
                <p>To send quotations, installation schedules, product updates, promotional offers, and important service notifications.</p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Payment Processing</h3>
                <p>To process payments, issue invoices, handle refunds, and maintain transaction records.</p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Quality Improvement</h3>
                <p>To analyze service usage, improve our processes, enhance user experience, and develop new products and services.</p>
              </div>

              <div className="bg-red-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Legal Compliance</h3>
                <p>To comply with legal obligations, respond to lawful requests from authorities, and protect our legal rights.</p>
              </div>

              <div className="bg-indigo-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Research & Analytics</h3>
                <p>To conduct market research and service improvement analysis (with your consent).</p>
              </div>
            </div>
          </div>

          {/* Data Sharing and Disclosure */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <Globe className="w-6 h-6 text-orange-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Data Sharing and Disclosure</h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              We do not sell, rent, or trade your personal information. However, we may share your data in the following circumstances:
            </p>

            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">Installation Partners</h3>
                <p className="text-gray-600">
                  With our installation partners and contractors to ensure quality service delivery.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">Service Providers</h3>
                <p className="text-gray-600">
                  With trusted third-party service providers (payment gateways, delivery services, IT support) who assist 
                  in delivering our products and services. They are bound by confidentiality agreements.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">Legal Requirements</h3>
                <p className="text-gray-600">
                  When required by law, court order, or government regulations, or to protect our rights and safety.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">Business Transfers</h3>
                <p className="text-gray-600">
                  In the event of a merger, acquisition, or sale of assets, your information may be transferred to the 
                  new entity (you will be notified).
                </p>
              </div>

              <div className="border-l-4 border-red-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">With Your Consent</h3>
                <p className="text-gray-600">
                  We may share your information with other parties when you explicitly provide consent.
                </p>
              </div>
            </div>
          </div>

          {/* Data Security */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <Lock className="w-6 h-6 text-red-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Data Security</h2>
            </div>
            
            <p className="text-gray-600 mb-4">
              We implement industry-standard security measures to protect your information:
            </p>

            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🔒 Encryption</h3>
                <p className="text-gray-600 text-sm">
                  All sensitive data is encrypted during transmission and storage using SSL/TLS protocols.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🛡️ Access Control</h3>
                <p className="text-gray-600 text-sm">
                  Strict access controls ensure only authorized personnel can access your personal data.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🔐 Secure Servers</h3>
                <p className="text-gray-600 text-sm">
                  Our servers are hosted in secure data centers with 24/7 monitoring and firewall protection.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">📋 Regular Audits</h3>
                <p className="text-gray-600 text-sm">
                  We conduct regular security audits and vulnerability assessments to maintain data integrity.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">👥 Staff Training</h3>
                <p className="text-gray-600 text-sm">
                  All employees undergo privacy and security training to handle customer data responsibly.
                </p>
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">🔄 Backup Systems</h3>
                <p className="text-gray-600 text-sm">
                  Regular data backups ensure your information is protected against loss or corruption.
                </p>
              </div>
            </div>

            <div className="mt-4 bg-yellow-50 border-l-4 border-yellow-500 p-4">
              <p className="text-gray-700 text-sm">
                <strong>Important:</strong> While we implement robust security measures, no method of transmission over 
                the internet is 100% secure. We cannot guarantee absolute security but continuously work to protect your data.
              </p>
            </div>
          </div>

          {/* Your Rights */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <UserCheck className="w-6 h-6 text-green-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Your Privacy Rights</h2>
            </div>
            
            <p className="text-gray-600 mb-4">You have the following rights regarding your personal information:</p>

            <div className="space-y-3">
              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Right to Access</h3>
                  <p className="text-gray-600 text-sm">
                    You can request a copy of your personal information we hold.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Right to Correction</h3>
                  <p className="text-gray-600 text-sm">
                    You can request correction of inaccurate or incomplete information.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Right to Deletion</h3>
                  <p className="text-gray-600 text-sm">
                    You can request deletion of your data (subject to legal retention requirements).
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Right to Restrict Processing</h3>
                  <p className="text-gray-600 text-sm">
                    You can request limitation on how we use your information.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Right to Data Portability</h3>
                  <p className="text-gray-600 text-sm">
                    You can request your data in a structured, commonly used format.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Right to Withdraw Consent</h3>
                  <p className="text-gray-600 text-sm">
                    You can withdraw consent for marketing communications at any time.
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                <span className="text-green-600 font-bold mr-3">✓</span>
                <div>
                  <h3 className="font-semibold text-gray-800">Right to Object</h3>
                  <p className="text-gray-600 text-sm">
                    You can object to processing of your data for certain purposes.
                  </p>
                </div>
              </div>
            </div>

            <div className="mt-4 bg-blue-50 p-4 rounded-lg">
              <p className="text-gray-700 text-sm">
                To exercise any of these rights, please contact us at <strong>rajpalbika80591@gmail.com</strong> or 
                call <strong>+91-9992880001</strong>. We will respond to your request within 30 days.
              </p>
            </div>
          </div>

          {/* Cookies and Tracking */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Cookies and Tracking Technologies</h2>
            
            <p className="text-gray-600 mb-4">
              We use cookies and similar technologies to enhance your experience on our website:
            </p>

            <div className="space-y-3">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">Essential Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Required for website functionality, login sessions, and security features.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">Analytics Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Help us understand how visitors use our website to improve user experience.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-1">Marketing Cookies</h3>
                <p className="text-gray-600 text-sm">
                  Used to deliver relevant advertisements and track campaign effectiveness.
                </p>
              </div>
            </div>

            <p className="text-gray-600 text-sm mt-4">
              You can manage cookie preferences through your browser settings. Note that disabling cookies may affect 
              website functionality.
            </p>
          </div>

          {/* Data Retention */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Data Retention</h2>
            
            <p className="text-gray-600 mb-4">
              We retain your information for the following periods:
            </p>

            <div className="space-y-2 text-gray-600">
              <p>
                <strong>Service Records:</strong> Retained for a minimum of 5 years for warranty and service purposes.
              </p>
              <p>
                <strong>Payment Information:</strong> Retained for 7 years for accounting and tax purposes.
              </p>
              <p>
                <strong>Marketing Data:</strong> Retained until you withdraw consent or request deletion.
              </p>
              <p>
                <strong>Website Analytics:</strong> Anonymized data retained for 2 years for statistical analysis.
              </p>
            </div>
          </div>

          {/* Children's Privacy */}
          <div className="bg-yellow-50 rounded-lg shadow-md p-8 mb-8 border-l-4 border-yellow-500">
            <div className="flex items-start mb-4">
              <AlertCircle className="w-6 h-6 text-yellow-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Children's Privacy</h2>
            </div>
            
            <p className="text-gray-700">
              Our services are not directed to individuals under 18 years of age. For minors, we collect information 
              only with parental or guardian consent. Parents/guardians have the right to access, modify, or delete 
              their child's information by contacting us.
            </p>
          </div>

          {/* Third-Party Links */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Third-Party Links</h2>
            
            <p className="text-gray-600">
              Our website may contain links to third-party websites or services. We are not responsible for the privacy 
              practices of these external sites. We encourage you to review their privacy policies before providing any 
              personal information.
            </p>
          </div>

          {/* Changes to Privacy Policy */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Changes to This Privacy Policy</h2>
            
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. 
              We will notify you of significant changes via email or a prominent notice on our website. The "Last Updated" 
              date at the top of this policy indicates when it was last revised.
            </p>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-green-600 to-green-800 text-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Contact Us</h2>
            
            <p className="text-center text-green-100 mb-6">
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, 
              please contact us:
            </p>

            <div className="grid md:grid-cols-3 gap-6">
              <div className="flex flex-col items-center text-center">
                <Phone className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">Phone</h3>
                <p className="text-green-100">+91-9992880001</p>
                <p className="text-sm text-green-200">Mon-Sat: 8 AM - 8 PM</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Mail className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">Email</h3>
                <p className="text-green-100">rajpalbika80591@gmail.com</p>
              </div>

              <div className="flex flex-col items-center text-center">
                <Globe className="w-8 h-8 mb-3" />
                <h3 className="font-semibold mb-1">Address</h3>
                <p className="text-green-100">JB Aluminum Industries</p>
                <p className="text-green-100">Sirsa, Haryana, India</p>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-green-500 text-center">
              <p className="text-green-100 text-sm">
                <strong>Data Protection Officer:</strong> privacy@jbaluminum.com
              </p>
            </div>
          </div>

          {/* Consent */}
          <div className="bg-green-50 rounded-lg shadow-md p-6 mt-8 border-l-4 border-green-500">
            <p className="text-gray-700 text-center">
              <strong>By using JB Aluminum Industries services, you acknowledge that you have read, understood, and agree 
              to this Privacy Policy.</strong>
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
