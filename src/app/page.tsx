'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Shield, RefreshCw, Award, Sparkles, TrendingUp, ShoppingBag, Gem, Package, HeartHandshake } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import HeroSlideshow from '@/components/HeroSlideshow';
import PromoPopup from '@/components/PromoPopup';
import Testimonials from '@/components/Testimonials';
import { productsApi } from '@/lib/api';
import { DatabaseProduct } from '@/types';

// Map DatabaseProduct to display format
interface DisplayProduct {
  id: string;
  name: string;
  price: number;
  image_url: string;
  images?: string[];
  category: string;
  rating?: number;
  featured?: boolean;
}

const HomePage = () => {
  const [featuredProducts, setFeaturedProducts] = useState<DisplayProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.getAll();
      if (response.success && response.data) {
        const products: DisplayProduct[] = response.data.map((p: DatabaseProduct) => ({
          id: String(p.id),
          name: p.name,
          price: p.price,
          image_url: p.image_url || (p.images && p.images[0]) || '',
          images: p.images,
          category: p.category,
          rating: p.rating,
          featured: p.featured
        }));
        const featured = products.filter(p => p.featured).slice(0, 8);
        setFeaturedProducts(featured.length > 0 ? featured : products.slice(0, 8));
      }
    } catch (error) {
      // Handle silently
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: 'Jewelry',
      subtitle: 'Timeless Elegance',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&q=85',
      link: '/category/Jewelry',
      icon: Gem
    },
    {
      name: 'Handbags',
      subtitle: 'Luxury Collection',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&q=85',
      link: '/category/Bags',
      icon: ShoppingBag
    },
    {
      name: 'Accessories',
      subtitle: 'Style Essentials',
      image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600&q=85',
      link: '/category/Accessories',
      icon: Sparkles
    }
  ];

  const features = [
    {
      icon: Truck,
      title: 'Free Shipping',
      description: 'On orders over ৳5,000',
    },
    {
      icon: Shield,
      title: 'Secure Payment',
      description: '100% protected checkout',
    },
    {
      icon: RefreshCw,
      title: 'Easy Returns',
      description: '7-day return policy',
    },
    {
      icon: HeartHandshake,
      title: 'Premium Quality',
      description: 'Handpicked selection',
    },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Promotional Popup */}
      <PromoPopup />
      
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Features Bar - Elegant Strip */}
      <section className="bg-pearl-900 py-6 md:py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="flex items-center gap-4 group"
              >
                <div className="w-12 h-12 rounded-full bg-brand-500/20 flex items-center justify-center group-hover:bg-brand-500/30 transition-colors">
                  <feature.icon className="text-brand-400" size={22} />
                </div>
                <div>
                  <h3 className="font-semibold text-white text-sm">{feature.title}</h3>
                  <p className="text-pearl-400 text-xs">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* New Arrivals Banner */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white to-pearl-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-brand-50 via-white to-brand-50 border border-brand-100">
            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-200/30 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-300/20 rounded-full blur-2xl translate-y-1/2 -translate-x-1/2" />
            
            <div className="relative p-10 md:p-16 text-center">
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white text-xs font-bold px-5 py-2 rounded-full mb-6 shadow-lg">
                <Sparkles size={14} />
                NEW ARRIVALS
              </span>
              <h2 className="text-3xl md:text-5xl font-display font-bold text-pearl-900 mb-4">
                Latest Collection
              </h2>
              <p className="text-lg text-pearl-600 mb-8 max-w-xl mx-auto">
                Discover our newest additions to elevate your style
              </p>
              <Link
                href="/products?sort=newest"
                className="inline-flex items-center gap-3 bg-pearl-900 hover:bg-pearl-800 text-white px-10 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              >
                Shop Now
                <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section - Premium Grid */}
      <section className="py-16 md:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="flex items-center justify-center gap-4 mb-4">
              <span className="w-16 h-[2px] bg-gradient-to-r from-transparent to-brand-400" />
              <span className="text-brand-500 text-sm font-semibold tracking-[0.3em] uppercase">Explore</span>
              <span className="w-16 h-[2px] bg-gradient-to-l from-transparent to-brand-400" />
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-pearl-900 mb-4">
              Shop by Category
            </h2>
            <p className="text-pearl-600 text-lg max-w-2xl mx-auto">
              Discover our curated collections of premium fashion accessories
            </p>
          </div>

          {/* Category Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.link}
                className="group relative block overflow-hidden rounded-2xl aspect-[4/5] shadow-lg hover:shadow-2xl transition-all duration-500"
              >
                {/* Image */}
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                
                {/* Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80 group-hover:opacity-90 transition-opacity" />
                
                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-8">
                  <div className="transform transition-transform duration-500 group-hover:translate-y-0 translate-y-2">
                    <p className="text-brand-400 text-sm font-medium tracking-wider uppercase mb-2">
                      {category.subtitle}
                    </p>
                    <h3 className="text-2xl md:text-3xl font-display font-bold text-white mb-4">
                      {category.name}
                    </h3>
                    <div className="flex items-center gap-2 text-white font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <span>Explore Collection</span>
                      <ArrowRight size={18} className="group-hover:translate-x-2 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Decorative Corner */}
                <div className="absolute top-6 right-6 w-12 h-12 border-2 border-white/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 group-hover:scale-100 scale-75">
                  <category.icon size={20} className="text-white" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-24 bg-pearl-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          {/* Section Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 bg-pearl-900 text-white text-xs font-bold px-5 py-2 rounded-full mb-6">
              <TrendingUp size={14} />
              TRENDING NOW
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-pearl-900 mb-4">
              Featured Products
            </h2>
            <p className="text-pearl-600 text-lg max-w-2xl mx-auto">
              Discover our handpicked selection of premium fashion accessories
            </p>
          </div>

          {/* Products Grid */}
          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl h-96 animate-pulse shadow-soft" />
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-12">
              {featuredProducts.slice(0, 8).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          {/* View All Button */}
          <div className="text-center">
            <Link
              href="/products"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-10 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-brand-500/20 transform hover:-translate-y-0.5"
            >
              View All Products
              <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      <Footer />
    </div>
  );
};

export default HomePage;
