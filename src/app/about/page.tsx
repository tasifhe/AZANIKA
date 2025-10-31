'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Award, Users, Sparkles, TrendingUp, Package, Shield } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Quality',
      description: 'We carefully curate every product to ensure it meets our high standards.'
    },
    {
      icon: Award,
      title: 'Excellence in Service',
      description: 'Your satisfaction is our priority. We provide exceptional customer service.'
    },
    {
      icon: Users,
      title: 'Community First',
      description: 'We build lasting relationships with customers and support local artisans.'
    },
    {
      icon: Sparkles,
      title: 'Authentic Beauty',
      description: 'Every piece tells a story. We celebrate authentic beauty and elegance.'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-blush-50">
      <Header />
      
      <main>
        <section className="relative py-16 md:py-24 overflow-hidden">
          <div className="absolute inset-0 premium-gradient opacity-10"></div>
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center max-w-4xl mx-auto">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Welcome to <span className="gradient-text">AZANIKA</span>
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 leading-relaxed mb-8">
                Where timeless elegance meets contemporary style.
              </p>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="relative h-[400px] md:h-[500px] rounded-3xl overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800"
                  alt="Our Story"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="space-y-6">
                <h2 className="text-3xl md:text-4xl font-bold text-neutral-900">
                  A Journey of Passion
                </h2>
                <p className="text-neutral-600 text-lg">
                  Founded in 2023, AZANIKA was born from a simple belief: every woman deserves 
                  access to beautiful, high-quality accessories.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 bg-gradient-blush-dream">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="bg-white rounded-2xl p-8 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full premium-gradient mb-4">
                      <IconComponent className="text-white" size={28} />
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-3">{value.title}</h3>
                    <p className="text-neutral-600">{value.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-16 relative overflow-hidden">
          <div className="absolute inset-0 premium-gradient"></div>
          <div className="relative max-w-4xl mx-auto px-4 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Find Your Perfect Piece?
            </h2>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/products" className="btn-hover bg-white text-blush-600 px-8 py-4 rounded-xl font-semibold">
                Shop Now
              </Link>
              <Link href="/contact" className="btn-hover bg-white/10 border-2 border-white text-white px-8 py-4 rounded-xl font-semibold">
                Get in Touch
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
