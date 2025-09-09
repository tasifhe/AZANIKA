'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Shield, RefreshCw, Award } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { getFeaturedProducts, mockCategories } from '@/lib/data';

const HomePage = () => {
  const featuredProducts = getFeaturedProducts();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative gradient-bg overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Hero Content */}
            <div className="text-center lg:text-left">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-neutral-900 mb-6">
                Elevate Your
                <span className="gradient-text block">Style</span>
              </h1>
              <p className="text-xl text-neutral-600 mb-8 max-w-lg">
                Discover premium women's fashion accessories that complement your unique style. 
                From elegant jewelry to luxurious handbags.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link 
                  href="/category/jewelry" 
                  className="btn-hover premium-gradient text-white px-8 py-3 rounded-lg font-medium text-lg inline-flex items-center justify-center elegant-shadow"
                >
                  Shop Now
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link 
                  href="/about" 
                  className="btn-hover luxury-border border-2 text-primary-600 px-8 py-3 rounded-lg font-medium text-lg inline-flex items-center justify-center hover:bg-cream-50 transition-all"
                >
                  Learn More
                </Link>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative animate-float">
              <div className="relative h-96 w-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=80"
                  alt="AZANIKA Fashion Accessories"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 elegant-shadow">
                <Truck className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Free Shipping</h3>
              <p className="text-neutral-600 text-sm">Free shipping on orders over $100</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 elegant-shadow">
                <Shield className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Secure Payment</h3>
              <p className="text-neutral-600 text-sm">Your payment information is safe</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 elegant-shadow">
                <RefreshCw className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Easy Returns</h3>
              <p className="text-neutral-600 text-sm">30-day return policy</p>
            </div>
            
            <div className="text-center">
              <div className="bg-primary-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 elegant-shadow">
                <Award className="text-primary-600" size={24} />
              </div>
              <h3 className="font-semibold text-neutral-900 mb-2">Premium Quality</h3>
              <p className="text-neutral-600 text-sm">Carefully selected materials</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Explore our curated collection of premium accessories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {mockCategories.map((category) => (
              <Link
                key={category.id}
                href={`/category/${category.slug}`}
                className="group block"
              >
                <div className="relative h-64 rounded-2xl overflow-hidden card-hover">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />
                  <div className="absolute bottom-0 left-0 right-0 p-6">
                    <h3 className="text-white text-xl font-bold mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm mb-3">
                      {category.description}
                    </p>
                    <span className="text-white text-sm font-medium flex items-center">
                      {category.productCount} items
                      <ArrowRight className="ml-1" size={16} />
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-20 bg-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
              Featured Products
            </h2>
            <p className="text-xl text-neutral-600 max-w-2xl mx-auto">
              Handpicked favorites from our latest collection
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center">
            <Link
              href="/products"
              className="btn-hover premium-gradient text-white px-8 py-3 rounded-lg font-medium text-lg inline-flex items-center elegant-shadow"
            >
              View All Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 premium-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Stay in Style
          </h2>
          <p className="text-xl text-cream-100 mb-8 max-w-2xl mx-auto">
            Subscribe to our newsletter for exclusive offers, style tips, and new arrivals.
          </p>
          
          <div className="max-w-md mx-auto flex elegant-shadow">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 focus:ring-cream-300"
            />
            <button className="bg-white text-primary-600 px-6 py-3 rounded-r-lg font-medium hover:bg-cream-50 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
