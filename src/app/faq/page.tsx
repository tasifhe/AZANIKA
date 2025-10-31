'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, Package, CreditCard, RefreshCw, Ruler, Truck, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { AnimatedContent, FadeIn } from '@/components/animations/AnimatedContent';

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle },
    { id: 'shipping', name: 'Shipping & Delivery', icon: Truck },
    { id: 'payment', name: 'Payment Options', icon: CreditCard },
    { id: 'returns', name: 'Returns & Refunds', icon: RefreshCw },
    { id: 'products', name: 'Products & Sizing', icon: Ruler },
    { id: 'orders', name: 'Orders & Tracking', icon: Package },
  ];

  const faqs: FAQItem[] = [
    {
      category: 'shipping',
      question: 'What are your shipping options?',
      answer: 'We offer standard shipping (3-5 business days) for ৳50 and express shipping (1-2 business days) for ৳150. Free standard shipping on orders over ৳5,000 within Bangladesh. We deliver to all major cities including Dhaka, Chittagong, Sylhet, and more.'
    },
    {
      category: 'shipping',
      question: 'Do you ship internationally?',
      answer: 'Currently, we only ship within Bangladesh. International shipping will be available soon! Subscribe to our newsletter to be notified when we expand our delivery services.'
    },
    {
      category: 'shipping',
      question: 'How can I track my order?',
      answer: 'Once your order ships, you\'ll receive a tracking number via email and SMS. You can also track your order from your account dashboard by logging in and viewing "My Orders".'
    },
    {
      category: 'payment',
      question: 'What payment methods do you accept?',
      answer: 'We accept bKash, Nagad, Rocket, credit/debit cards (Visa, Mastercard, American Express), and Cash on Delivery (COD) for orders within Dhaka. All payments are processed securely through our payment gateway.'
    },
    {
      category: 'payment',
      question: 'Is Cash on Delivery (COD) available?',
      answer: 'Yes! COD is available for orders within Dhaka city. A small COD fee of ৳50 applies. Simply select "Cash on Delivery" at checkout and pay when your order arrives.'
    },
    {
      category: 'payment',
      question: 'Is my payment information secure?',
      answer: 'Absolutely! We use industry-standard SSL encryption to protect your payment information. We never store your full credit card details. All transactions are processed through PCI-DSS compliant payment gateways.'
    },
    {
      category: 'returns',
      question: 'What is your return policy?',
      answer: 'We offer a 7-day return policy for unused items in original packaging with tags attached. Items must be in sellable condition. Custom or personalized items cannot be returned unless defective.'
    },
    {
      category: 'returns',
      question: 'How do I initiate a return?',
      answer: 'Contact our customer service at support@azanika.com or WhatsApp +880 1712-345678 within 7 days of receiving your order. We\'ll provide you with return instructions and a return shipping label.'
    },
    {
      category: 'returns',
      question: 'How long does it take to process a refund?',
      answer: 'Refunds are processed within 5-7 business days after we receive and inspect your returned item. The refund will be credited to your original payment method. Bank transfers may take an additional 3-5 business days.'
    },
    {
      category: 'products',
      question: 'How do I choose the right size?',
      answer: 'Each product page includes a detailed size guide. For jewelry, we provide measurements in centimeters. For handbags and accessories, dimensions are listed. If you\'re unsure, contact us and we\'ll help you choose the perfect fit!'
    },
    {
      category: 'products',
      question: 'Are your products authentic?',
      answer: 'Yes! All AZANIKA products are 100% authentic. We work directly with verified suppliers and artisans. Each product comes with a certificate of authenticity and quality assurance.'
    },
    {
      category: 'products',
      question: 'Do you offer gift wrapping?',
      answer: 'Yes! We offer complimentary gift wrapping for all orders. Simply select "Add gift wrapping" at checkout and include a personalized message. Perfect for birthdays, anniversaries, or special occasions!'
    },
    {
      category: 'orders',
      question: 'Can I modify my order after placing it?',
      answer: 'Orders can be modified within 2 hours of placement. Contact us immediately at +880 1712-345678 or support@azanika.com. Once the order is processed, modifications cannot be made.'
    },
    {
      category: 'orders',
      question: 'What if I receive a damaged item?',
      answer: 'We\'re sorry to hear that! Contact us within 48 hours with photos of the damaged item. We\'ll arrange for a replacement or full refund immediately. Your satisfaction is our priority.'
    },
    {
      category: 'orders',
      question: 'Do you offer bulk or wholesale orders?',
      answer: 'Yes! We offer special pricing for bulk orders (10+ items) and wholesale opportunities for retailers. Contact our sales team at sales@azanika.com for custom quotes and partnership opportunities.'
    }
  ];

  const filteredFAQs = activeCategory === 'all' 
    ? faqs 
    : faqs.filter(faq => faq.category === activeCategory);

  const toggleFAQ = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-blush-50">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 premium-gradient opacity-10"></div>
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent direction="up">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-blush-700 px-4 py-2 rounded-full mb-6 shadow-md">
              <HelpCircle size={18} />
              <span className="font-semibold">Frequently Asked Questions</span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
              How Can We <span className="gradient-text">Help You?</span>
            </h1>
            <p className="text-lg md:text-xl text-neutral-600 max-w-3xl mx-auto">
              Find answers to common questions about shipping, payments, returns, and more. 
              Can't find what you're looking for? Contact us anytime!
            </p>
          </AnimatedContent>
        </div>
      </section>

      {/* Category Filter */}
      <section className="py-8 bg-white border-y border-blush-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`flex items-center space-x-2 px-4 py-2 rounded-full font-medium transition-all duration-300 ${
                    activeCategory === category.id
                      ? 'premium-gradient text-white shadow-lg'
                      : 'bg-blush-50 text-neutral-700 hover:bg-blush-100'
                  }`}
                >
                  <IconComponent size={18} />
                  <span className="text-sm">{category.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="py-16 md:py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-4">
            {filteredFAQs.map((faq, index) => (
              <FadeIn key={index} delay={index * 0.05}>
                <div className="bg-white rounded-xl border border-blush-100 overflow-hidden hover:shadow-lg transition-all duration-300">
                  <button
                    onClick={() => toggleFAQ(index)}
                    className="w-full flex items-center justify-between p-6 text-left hover:bg-blush-50/50 transition-colors"
                  >
                    <span className="text-lg font-semibold text-neutral-900 pr-4">
                      {faq.question}
                    </span>
                    <ChevronDown
                      className={`flex-shrink-0 text-blush-600 transition-transform duration-300 ${
                        activeIndex === index ? 'rotate-180' : ''
                      }`}
                      size={24}
                    />
                  </button>
                  {activeIndex === index && (
                    <div className="px-6 pb-6 text-neutral-600 leading-relaxed animate-fade-in-down">
                      {faq.answer}
                    </div>
                  )}
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* Still Have Questions */}
      <section className="py-16 bg-gradient-blush-dream">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedContent direction="up">
            <Shield className="w-16 h-16 mx-auto text-blush-600 mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Still Have Questions?
            </h2>
            <p className="text-lg text-neutral-600 mb-8 max-w-2xl mx-auto">
              Our customer support team is here to help! Reach out via WhatsApp, email, or phone, 
              and we'll get back to you within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/8801712345678"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hover bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                <Package className="mr-2" size={20} />
                WhatsApp Us
              </a>
              <a
                href="/contact"
                className="btn-hover premium-gradient text-white px-8 py-4 rounded-xl font-semibold text-lg inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
              >
                <HelpCircle className="mr-2" size={20} />
                Contact Support
              </a>
            </div>
          </AnimatedContent>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default FAQPage;
