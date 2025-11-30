'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Shield, RefreshCw, Award, Sparkles, TrendingUp, ShoppingBag, Gem } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import HeroSlideshow from '@/components/HeroSlideshow';
import PromoPopup from '@/components/PromoPopup';
import Testimonials from '@/components/Testimonials';
import { AnimatedContent, FadeIn, ScaleIn, StaggerContainer, StaggerItem } from '@/components/animations/AnimatedContent';
import { AnimatedGrid } from '@/components/animations/AnimatedList';
import { Parallax } from '@/components/animations/ScrollAnimations';
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
        // Map DatabaseProduct to DisplayProduct
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
        // Get featured products or first 6 products
        const featured = products.filter(p => p.featured).slice(0, 6);
        setFeaturedProducts(featured.length > 0 ? featured : products.slice(0, 6));
      }
    } catch (error) {
      // Handle error silently in production
      // TODO: Implement proper error logging service
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
      link: '/category/Jewelry',
      icon: Gem
    },
    {
      name: 'Handbags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
      link: '/category/Bags',
      icon: ShoppingBag
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
      link: '/category/Accessories',
      icon: Sparkles
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Promotional Popup */}
      <PromoPopup />
      
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* New Arrivals Banner - Mobile Optimized */}
      <section className="py-12 md:py-16 bg-gradient-to-r from-cream-50 via-gold-50 to-cream-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-white rounded-3xl md:rounded-[2rem] overflow-hidden shadow-xl premium-shadow-lg">
            <div className="absolute inset-0 bg-gradient-to-br from-gold-100/50 via-transparent to-cream-100/50"></div>
            <div className="relative p-10 md:p-16 text-center">
              <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-gold-500 to-copper-500 text-white px-5 md:px-6 py-2 md:py-2.5 rounded-full mb-4 md:mb-5 text-sm md:text-base font-bold shadow-lg animate-pulse">
                <Sparkles size={18} />
                <span className="tracking-wider">LATEST TRENDS</span>
              </div>
              <h2 className="text-3xl md:text-5xl lg:text-6xl font-black text-neutral-900 mb-3 md:mb-5 tracking-tight">
                New Arrivals
              </h2>
              <p className="text-base md:text-lg text-neutral-600 mb-6 md:mb-8 max-w-3xl mx-auto leading-relaxed">
                Be the first to discover our newest additions and stay ahead of fashion trends
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link
                  href="/products?sort=newest"
                  className="premium-gradient text-white px-8 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg inline-flex items-center justify-center shadow-xl hover:shadow-2xl transition-all hover:scale-105"
                >
                  Shop Now
                  <ArrowRight className="ml-2" size={20} />
                </Link>
                <Link
                  href="/products"
                  className="bg-white border-2 border-gold-200 text-gold-600 px-8 md:px-10 py-3.5 md:py-4 rounded-xl md:rounded-2xl font-bold text-base md:text-lg inline-flex items-center justify-center hover:bg-gold-50 transition-all"
                >
                  View All
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Animations */}
      <section className="py-16 md:py-24 bg-gradient-to-b from-white via-cream-50/30 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedGrid className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-10" staggerDelay={0.15}>
            <div className="text-center group p-6 md:p-8 bg-white rounded-2xl premium-shadow hover:premium-shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-br from-gold-100 to-cream-50 w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Truck className="text-gold-600" size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2 text-sm md:text-lg">Free Shipping</h3>
              <p className="text-neutral-600 text-xs md:text-base leading-relaxed">Orders over ৳2,000</p>
            </div>
            
            <div className="text-center group p-6 md:p-8 bg-white rounded-2xl premium-shadow hover:premium-shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-br from-copper-200 to-gold-100 w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Shield className="text-copper-700" size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2 text-sm md:text-lg">Secure Payment</h3>
              <p className="text-neutral-600 text-xs md:text-base leading-relaxed">SSL encryption</p>
            </div>
            
            <div className="text-center group p-6 md:p-8 bg-white rounded-2xl premium-shadow hover:premium-shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-br from-gold-100 to-cream-50 w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <RefreshCw className="text-gold-600" size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2 text-sm md:text-lg">Easy Returns</h3>
              <p className="text-neutral-600 text-xs md:text-base leading-relaxed">7-day returns</p>
            </div>
            
            <div className="text-center group p-6 md:p-8 bg-white rounded-2xl premium-shadow hover:premium-shadow-lg transition-all duration-300">
              <div className="bg-gradient-to-br from-copper-200 to-gold-100 w-16 h-16 md:w-24 md:h-24 rounded-2xl flex items-center justify-center mx-auto mb-4 md:mb-5 shadow-md group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                <Award className="text-copper-700" size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 mb-2 text-sm md:text-lg">Premium Quality</h3>
              <p className="text-neutral-600 text-xs md:text-base leading-relaxed">Luxury items</p>
            </div>
          </AnimatedGrid>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-16 md:py-28 gradient-warm-elegance">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent direction="up" className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center space-x-2 bg-white/80 backdrop-blur-sm text-gold-700 px-5 md:px-6 py-2 md:py-2.5 rounded-full mb-4 md:mb-5 shadow-sm">
              <Sparkles size={20} className="animate-spin-slow" />
              <span className="font-bold text-sm md:text-base tracking-wider">Shop by Category</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-black text-neutral-900 mb-4 md:mb-6 px-4 tracking-tight">
              Discover Your Style
            </h2>
            <p className="text-sm md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">
              Explore our curated collection of premium accessories
            </p>
          </AnimatedContent>

          <AnimatedGrid className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.link}
                className="group relative"
              >
                <div className="relative h-64 md:h-96 rounded-3xl overflow-hidden premium-shadow-lg hover:shadow-2xl transition-all duration-500">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110 group-hover:rotate-2"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-br from-gold-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                    <div className="mb-2 md:mb-3 text-white transform group-hover:scale-110 transition-transform">
                      <category.icon className="w-8 h-8 md:w-14 md:h-14" />
                    </div>
                    <h3 className="text-white text-lg md:text-2xl font-bold mb-1 md:mb-2 transform group-hover:translate-x-2 transition-transform duration-300">
                      {category.name}
                    </h3>
                    <div className="flex items-center text-white/90 group-hover:text-white transform group-hover:translate-x-2 transition-all duration-300">
                      <span className="text-xs md:text-sm font-medium">Explore Collection</span>
                      <ArrowRight className="ml-1 md:ml-2 transform group-hover:translate-x-2 transition-transform" size={14} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </AnimatedGrid>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-16 md:py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedContent direction="up" className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center space-x-2 bg-gold-50 text-gold-700 px-5 md:px-6 py-2 md:py-2.5 rounded-full mb-3 md:mb-5 shadow-md">
              <TrendingUp size={20} />
              <span className="font-bold text-sm md:text-base tracking-wider">Trending Now</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-6xl font-black text-neutral-900 mb-4 md:mb-6 px-4 tracking-tight">
              Featured Products
            </h2>
            <p className="text-sm md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">
              Discover our handpicked favorites - curated just for you
            </p>
          </AnimatedContent>

          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 mb-6 md:mb-12">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white/60 backdrop-blur rounded-2xl h-72 md:h-96 animate-pulse shimmer"></div>
              ))}
            </div>
          ) : (
            <AnimatedGrid className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-6 mb-6 md:mb-12" staggerDelay={0.1}>
              {featuredProducts.slice(0, 6).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatedGrid>
          )}

          <FadeIn className="text-center space-y-3 md:space-y-4" delay={0.3}>
            <Link
              href="/products"
              className="btn-hover premium-gradient text-white px-6 md:px-10 py-2.5 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-lg inline-flex items-center elegant-shadow hover:shadow-xl transition-all pulse-ring mx-1 md:mx-2"
            >
              Shop All Products
              <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link
              href="/products?sort=newest"
              className="btn-hover bg-white text-gold-600 border-2 border-gold-200 px-6 md:px-10 py-2.5 md:py-4 rounded-lg md:rounded-xl font-semibold text-sm md:text-lg inline-flex items-center hover:bg-gold-50 transition-all mx-1 md:mx-2"
            >
              View New Arrivals
              <Sparkles className="ml-2" size={18} />
            </Link>
          </FadeIn>
        </div>
      </section>

      {/* Testimonials Section */}
      <Testimonials />

      {/* Newsletter Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 premium-gradient"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <Parallax offset={30} className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScaleIn className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl glass-effect">
            <div className="mb-6">
              <div className="inline-block bg-white/20 rounded-full p-3 md:p-4 mb-3 md:mb-4 bounce-gentle">
                <Star className="text-white" size={24} />
              </div>
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-white mb-3 md:mb-4">
                Join Our Exclusive Club
              </h2>
              <p className="text-sm md:text-xl text-white/90 mb-6 md:mb-8 max-w-2xl mx-auto">
                Subscribe to get special offers, style inspiration, and early access to new collections
              </p>
            </div>
            
            <NewsletterSignup />
          </ScaleIn>
        </Parallax>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
