'use client';

import React from 'react';
import Link from 'next/link';
import { CheckCircle, Package, Mail, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const OrderSuccessPage = () => {
  const orderNumber = `AZ${Date.now().toString().slice(-6)}`;
  
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center">
          {/* Success Icon */}
          <div className="w-20 h-20 mx-auto mb-6 bg-green-100 rounded-full flex items-center justify-center">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          
          {/* Success Message */}
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">
            Order Placed Successfully!
          </h1>
          <p className="text-xl text-neutral-600 mb-8">
            Thank you for your order. We'll send you a confirmation email shortly.
          </p>
          
          {/* Order Details */}
          <div className="bg-cream-50 rounded-lg p-8 mb-8 max-w-md mx-auto">
            <h2 className="text-lg font-semibold text-neutral-900 mb-4">Order Details</h2>
            <div className="space-y-3 text-left">
              <div className="flex justify-between">
                <span className="text-neutral-600">Order Number:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Order Date:</span>
                <span className="font-medium">{new Date().toLocaleDateString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Estimated Delivery:</span>
                <span className="font-medium">
                  {new Date(Date.now() + 5 * 24 * 60 * 60 * 1000).toLocaleDateString()}
                </span>
              </div>
            </div>
          </div>
          
          {/* Next Steps */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <Mail className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Confirmation Email</h3>
              <p className="text-sm text-neutral-600">
                You'll receive an order confirmation email within minutes.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <Package className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Order Processing</h3>
              <p className="text-sm text-neutral-600">
                Your order is being prepared for shipment.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-12 h-12 mx-auto mb-4 bg-primary-100 rounded-full flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-primary-600" />
              </div>
              <h3 className="font-medium text-neutral-900 mb-2">Delivery</h3>
              <p className="text-sm text-neutral-600">
                Your order will arrive within 3-5 business days.
              </p>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/products"
              className="premium-gradient text-white px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center elegant-shadow"
            >
              Continue Shopping
              <ArrowRight className="ml-2" size={20} />
            </Link>
            <Link
              href="/contact"
              className="luxury-border border-2 text-primary-600 px-8 py-3 rounded-lg font-medium inline-flex items-center justify-center hover:bg-cream-50 transition-all"
            >
              Contact Support
            </Link>
          </div>
          
          {/* Additional Info */}
          <div className="mt-12 p-6 bg-neutral-50 rounded-lg">
            <h3 className="font-medium text-neutral-900 mb-2">Need Help?</h3>
            <p className="text-sm text-neutral-600 mb-4">
              If you have any questions about your order, please don't hesitate to contact us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center text-sm">
              <span>📧 info@azanika.com</span>
              <span>📞 +1 (555) 123-4567</span>
              <span>💬 Live Chat Available</span>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default OrderSuccessPage;