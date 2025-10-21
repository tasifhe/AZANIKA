'use client';

import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Heart, Award, Users, Truck, ArrowRight } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AboutPage = () => {
  const values = [
    {
      icon: Heart,
      title: 'Passion for Fashion',
      description: 'We believe every woman deserves to feel confident and beautiful. Our carefully curated accessories are designed to enhance your natural elegance.'
    },
    {
      icon: Award,
      title: 'Premium Quality',
      description: 'We source only the finest materials and work with skilled artisans to create accessories that stand the test of time.'
    },
    {
      icon: Users,
      title: 'Customer First',
      description: 'Your satisfaction is our priority. We provide exceptional service and support to ensure you love every purchase.'
    },
    {
      icon: Truck,
      title: 'Sustainable Practices',
      description: 'We are committed to ethical sourcing and sustainable business practices that respect both people and the planet.'
    }
  ];

  const team = [
    {
      name: 'Sarah Johnson',
      role: 'Founder & Creative Director',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300&q=80',
      bio: 'With over 15 years in fashion, Sarah founded AZANIKA to bring accessible luxury to every woman.'
    },
    {
      name: 'Michael Chen',
      role: 'Head of Design',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
      bio: 'Michael brings his expertise in jewelry design and passion for craftsmanship to every AZANIKA piece.'
    },
    {
      name: 'Emma Rodriguez',
      role: 'Customer Experience Manager',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
      bio: 'Emma ensures every customer receives the personalized attention they deserve throughout their journey.'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main>
        {/* Hero Section */}
        <section className="gradient-bg py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 mb-6">
                  Our <span className="gradient-text">Story</span>
                </h1>
                <p className="text-xl text-neutral-600 mb-8 leading-relaxed">
                  AZANIKA was born from a simple belief: every woman deserves to feel confident, 
                  elegant, and uniquely herself. We create premium fashion accessories that celebrate 
                  your individual style while maintaining the highest standards of quality and craftsmanship.
                </p>
                <Link
                  href="/products"
                  className="premium-gradient text-white px-8 py-3 rounded-lg font-medium inline-flex items-center elegant-shadow btn-hover"
                >
                  Shop Our Collection
                  <ArrowRight className="ml-2" size={20} />
                </Link>
              </div>
              <div className="relative">
                <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                  <Image
                    src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=600&q=80"
                    alt="AZANIKA Story"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Our Mission
              </h2>
              <p className="text-xl text-neutral-600 max-w-3xl mx-auto">
                To empower women worldwide by providing them with exquisite, high-quality fashion 
                accessories that enhance their confidence and celebrate their unique beauty.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => {
                const IconComponent = value.icon;
                return (
                  <div key={index} className="text-center p-6 rounded-xl bg-cream-50 card-hover">
                    <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4 elegant-shadow">
                      <IconComponent className="w-8 h-8 text-primary-600" />
                    </div>
                    <h3 className="text-lg font-semibold text-neutral-900 mb-3">
                      {value.title}
                    </h3>
                    <p className="text-neutral-600 text-sm leading-relaxed">
                      {value.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Story Timeline */}
        <section className="py-20 bg-cream-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Our Journey
              </h2>
              <p className="text-xl text-neutral-600">
                From a small startup to a growing fashion brand
              </p>
            </div>

            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-300 hidden md:block"></div>
              
              <div className="space-y-12">
                <div className="relative flex items-start">
                  <div className="hidden md:flex w-16 h-16 bg-primary-600 rounded-full items-center justify-center text-white font-bold mr-8">
                    2020
                  </div>
                  <div className="md:flex-1">
                    <div className="md:hidden w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                      2020
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">The Beginning</h3>
                    <p className="text-neutral-600">
                      AZANIKA was founded with a vision to make luxury fashion accessories 
                      accessible to every woman. We started with a small collection of handpicked jewelry pieces.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="hidden md:flex w-16 h-16 bg-primary-600 rounded-full items-center justify-center text-white font-bold mr-8">
                    2021
                  </div>
                  <div className="md:flex-1">
                    <div className="md:hidden w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                      2021
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Expansion</h3>
                    <p className="text-neutral-600">
                      We expanded our product line to include handbags, scarves, and sunglasses, 
                      establishing partnerships with artisans worldwide to maintain our quality standards.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="hidden md:flex w-16 h-16 bg-primary-600 rounded-full items-center justify-center text-white font-bold mr-8">
                    2022
                  </div>
                  <div className="md:flex-1">
                    <div className="md:hidden w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                      2022
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Recognition</h3>
                    <p className="text-neutral-600">
                      AZANIKA received recognition for excellence in design and customer service, 
                      winning the 'Emerging Brand of the Year' award from Fashion Accessories Council.
                    </p>
                  </div>
                </div>

                <div className="relative flex items-start">
                  <div className="hidden md:flex w-16 h-16 bg-primary-600 rounded-full items-center justify-center text-white font-bold mr-8">
                    2023
                  </div>
                  <div className="md:flex-1">
                    <div className="md:hidden w-16 h-16 bg-primary-600 rounded-full flex items-center justify-center text-white font-bold mb-4">
                      2023
                    </div>
                    <h3 className="text-xl font-bold text-neutral-900 mb-2">Global Reach</h3>
                    <p className="text-neutral-600">
                      We launched international shipping, bringing AZANIKA's elegant accessories 
                      to fashion-conscious women across the globe while maintaining our commitment to sustainability.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-neutral-600">
                The passionate people behind AZANIKA
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <div key={index} className="text-center card-hover">
                  <div className="relative w-48 h-48 mx-auto mb-6 rounded-full overflow-hidden">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-900 mb-2">{member.name}</h3>
                  <p className="text-primary-600 font-medium mb-4">{member.role}</p>
                  <p className="text-neutral-600 text-sm">{member.bio}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 premium-gradient">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
              Join the AZANIKA Family
            </h2>
            <p className="text-xl text-cream-100 mb-8 max-w-2xl mx-auto">
              Discover our latest collections and be the first to know about new arrivals, 
              exclusive offers, and style tips.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/products"
                className="bg-white text-primary-600 px-8 py-3 rounded-lg font-medium hover:bg-cream-50 transition-colors elegant-shadow"
              >
                Shop Collection
              </Link>
              <Link
                href="/contact"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-medium hover:bg-white hover:text-primary-600 transition-colors"
              >
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