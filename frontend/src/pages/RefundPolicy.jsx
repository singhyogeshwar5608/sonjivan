import React from 'react';
import { FileText, RefreshCw, Clock, AlertCircle, CheckCircle, Phone, Mail } from 'lucide-react';

const RefundPolicy = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-center mb-4">
            <RefreshCw className="w-12 h-12 mr-4" />
            <h1 className="text-4xl md:text-5xl font-bold">Refund Policy</h1>
          </div>
          <p className="text-center text-blue-100 text-lg max-w-2xl mx-auto">
            JB Aluminum Industries - Transparent and Fair Refund Guidelines
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          
          {/* Introduction */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <FileText className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-4">Introduction</h2>
                <p className="text-gray-600 leading-relaxed">
                  At JB Aluminum Industries, we are committed to providing high-quality aluminum products and services to our customers. 
                  This Refund Policy outlines the terms and conditions under which refunds may be issued for our products 
                  and services. We strive to ensure customer satisfaction while maintaining the quality of our work.
                </p>
                <p className="text-gray-600 leading-relaxed mt-3">
                  <strong>Last Updated:</strong> December 2024
                </p>
              </div>
            </div>
          </div>

          {/* Product and Service Refunds */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Product and Service Refunds</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">1. Order Cancellation Before Production</h3>
                <p className="text-gray-600">
                  If you cancel your order before production/fabrication begins, you are eligible for a full refund (100%) 
                  of the amount paid. The refund will be processed within 5-7 business days.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">2. Order Cancellation After Production Starts</h3>
                <p className="text-gray-600">
                  Once production/fabrication has begun on custom orders, no refund will be issued as materials have been 
                  allocated and work has commenced. However, you can modify the order with additional charges if applicable.
                </p>
              </div>

              <div className="border-l-4 border-green-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">3. Defective Products or Installation Errors</h3>
                <p className="text-gray-600">
                  In the event of defective products or installation errors on our part, we will offer a free 
                  replacement or a full refund at your discretion. Our quality assurance team investigates all such cases thoroughly.
                </p>
              </div>

              <div className="border-l-4 border-purple-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">4. Duplicate Payments</h3>
                <p className="text-gray-600">
                  If you have been charged multiple times for the same test due to a payment gateway error, the duplicate 
                  amount will be refunded in full within 7-10 business days after verification.
                </p>
              </div>
            </div>
          </div>

          {/* Health Packages Refunds */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <CheckCircle className="w-6 h-6 text-green-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Service Package Refunds</h2>
            </div>
            
            <div className="space-y-4">
              <div className="border-l-4 border-blue-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">1. Package Cancellation</h3>
                <p className="text-gray-600">
                  Service packages can be cancelled before work begins for a full refund. Partial refunds are not 
                  available for individual services within a package.
                </p>
              </div>

              <div className="border-l-4 border-yellow-500 pl-4 py-2">
                <h3 className="font-semibold text-gray-800 mb-2">2. Partial Package Completion</h3>
                <p className="text-gray-600">
                  If some work in a package has been completed and you wish to cancel remaining services, no refund will 
                  be issued for the completed portion. The remaining work can be rescheduled within 30 days.
                </p>
              </div>
            </div>
          </div>

          {/* Home Collection Service */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <Clock className="w-6 h-6 text-orange-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Installation and Delivery Charges</h2>
            </div>
            
            <div className="space-y-3 text-gray-600">
              <p>
                Installation and delivery charges are non-refundable if our team has visited your location, 
                regardless of whether installation was completed or not.
              </p>
              <p>
                If you cancel the installation service at least 24 hours before the scheduled time, the service 
                charge will be refunded in full.
              </p>
            </div>
          </div>

          {/* Non-Refundable Items */}
          <div className="bg-red-50 rounded-lg shadow-md p-8 mb-8 border-l-4 border-red-500">
            <div className="flex items-start mb-4">
              <AlertCircle className="w-6 h-6 text-red-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Non-Refundable Items</h2>
            </div>
            
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Consultation fees for custom design and measurements</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Delivery charges for completed orders</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Processing fees or convenience charges</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Custom fabricated products already manufactured</span>
              </li>
              <li className="flex items-start">
                <span className="text-red-500 mr-2">•</span>
                <span>Promotional or discounted package prices (special terms apply)</span>
              </li>
            </ul>
          </div>

          {/* Refund Process */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <div className="flex items-start mb-4">
              <RefreshCw className="w-6 h-6 text-blue-600 mr-3 mt-1" />
              <h2 className="text-2xl font-bold text-gray-800">Refund Process</h2>
            </div>
            
            <div className="space-y-4">
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Step 1: Request Submission</h3>
                <p className="text-gray-600">
                  Submit your refund request via email at <strong>rajpalbika80591@gmail.com</strong> or call us at 
                  <strong> +91-9992880001</strong>. Include your order ID, payment details, and reason for refund.
                </p>
              </div>

              <div className="bg-green-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Step 2: Verification</h3>
                <p className="text-gray-600">
                  Our team will verify your request and eligibility within 2-3 business days. You will receive a 
                  confirmation email once your request is approved.
                </p>
              </div>

              <div className="bg-purple-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Step 3: Refund Processing</h3>
                <p className="text-gray-600">
                  Approved refunds will be processed within 5-7 business days. The amount will be credited to the 
                  original payment method used during booking.
                </p>
              </div>

              <div className="bg-yellow-50 p-4 rounded-lg">
                <h3 className="font-semibold text-gray-800 mb-2">Step 4: Bank Processing Time</h3>
                <p className="text-gray-600">
                  Please allow an additional 3-5 business days for your bank to process the refund and reflect it 
                  in your account statement.
                </p>
              </div>
            </div>
          </div>

          {/* Special Circumstances */}
          <div className="bg-white rounded-lg shadow-md p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Special Circumstances</h2>
            
            <div className="space-y-3 text-gray-600">
              <p>
                <strong>Emergency Situations:</strong> In case of emergencies preventing installation or delivery, 
                please contact us immediately. We will work with you to reschedule or process a refund on a case-by-case basis.
              </p>
              <p>
                <strong>Service Unavailability:</strong> If we are unable to provide the ordered product or service due to 
                material shortage, equipment failure, or unavailability of resources, a full refund will be issued automatically.
              </p>
              <p>
                <strong>Force Majeure:</strong> In events beyond our control (natural disasters, pandemics, government 
                restrictions), refund policies may be modified. Customers will be notified of any changes.
              </p>
            </div>
          </div>

          {/* Contact Information */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg shadow-md p-8">
            <h2 className="text-2xl font-bold mb-6 text-center">Need Help with Refunds?</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start">
                <Phone className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Call Us</h3>
                  <p className="text-blue-100">+91-9992880001</p>
                  <p className="text-sm text-blue-200">Mon-Sat: 8:00 AM - 8:00 PM</p>
                </div>
              </div>

              <div className="flex items-start">
                <Mail className="w-6 h-6 mr-3 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold mb-1">Email Us</h3>
                  <p className="text-blue-100">rajpalbika80591@gmail.com</p>
                  <p className="text-sm text-blue-200">Response within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-blue-500 text-center">
              <p className="text-blue-100">
                JB Aluminum Industries, Sirsa, Haryana, India
              </p>
            </div>
          </div>

          {/* Policy Updates */}
          <div className="bg-gray-50 rounded-lg shadow-md p-6 mt-8">
            <p className="text-gray-600 text-sm text-center">
              <strong>Note:</strong> JB Aluminum Industries reserves the right to modify this refund policy at any time. 
              Any changes will be updated on this page with the revision date. Continued use of our services after 
              changes constitutes acceptance of the modified policy.
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};

export default RefundPolicy;
