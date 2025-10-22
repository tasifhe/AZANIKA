'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Star, Truck, Shield, RefreshCw, Award, Sparkles, TrendingUp } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import NewsletterSignup from '@/components/NewsletterSignup';
import HeroSlideshow from '@/components/HeroSlideshow';
import { productsApi } from '@/lib/api';

interface Product {
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
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.getAll();
      if (response.success && response.data) {
        const products = response.data as Product[];
        // Get featured products or first 4 products
        const featured = products.filter(p => p.featured).slice(0, 4);
        setFeaturedProducts(featured.length > 0 ? featured : products.slice(0, 4));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const categories = [
    {
      name: 'Jewelry',
      image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&q=80',
      link: '/category/Jewelry',
      icon: '💎'
    },
    {
      name: 'Handbags',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80',
      link: '/category/Bags',
      icon: '👜'
    },
    {
      name: 'Accessories',
      image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&q=80',
      link: '/category/Accessories',
      icon: '✨'
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Slideshow */}
      <HeroSlideshow />

      {/* Features Section */}
      <section className="py-12 md:py-16 bg-gradient-to-b from-white to-blush-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8">
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blush-100 to-blush-50 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 duration-300">
                <Truck className="text-blush-600" size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 mb-1 md:mb-2 text-sm md:text-lg">Free Shipping</h3>
              <p className="text-neutral-600 text-xs md:text-sm">Orders over ৳5,000</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blush-200 to-blush-100 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 duration-300">
                <Shield className="text-blush-700" size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 mb-1 md:mb-2 text-sm md:text-lg">Secure Payment</h3>
              <p className="text-neutral-600 text-xs md:text-sm">SSL encryption</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blush-100 to-blush-50 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 duration-300">
                <RefreshCw className="text-blush-600" size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 mb-1 md:mb-2 text-sm md:text-lg">Easy Returns</h3>
              <p className="text-neutral-600 text-xs md:text-sm">7-day returns</p>
            </div>
            
            <div className="text-center group">
              <div className="bg-gradient-to-br from-blush-200 to-blush-100 w-16 h-16 md:w-20 md:h-20 rounded-2xl flex items-center justify-center mx-auto mb-3 md:mb-4 shadow-lg group-hover:shadow-xl transition-all group-hover:scale-110 duration-300">
                <Award className="text-blush-700" size={24} />
              </div>
              <h3 className="font-bold text-neutral-900 mb-1 md:mb-2 text-sm md:text-lg">Premium Quality</h3>
              <p className="text-neutral-600 text-xs md:text-sm">Luxury items</p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-12 md:py-20 bg-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center space-x-2 bg-blush-100 text-blush-700 px-3 md:px-4 py-2 rounded-full mb-3 md:mb-4">
              <Sparkles size={18} />
              <span className="font-semibold text-sm md:text-base">Shop by Category</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 md:mb-4 px-4">
              Discover Your Style
            </h2>
            <p className="text-base md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">
              Explore our curated collection of premium accessories
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            {categories.map((category) => (
              <Link
                key={category.name}
                href={category.link}
                className="group relative"
              >
                <div className="relative h-64 md:h-80 rounded-2xl md:rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                  <div className="absolute inset-0 bg-primary-700/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8">
                    <div className="text-3xl md:text-5xl mb-2 md:mb-3">{category.icon}</div>
                    <h3 className="text-white text-xl md:text-2xl font-bold mb-1 md:mb-2 transform group-hover:translate-x-2 transition-transform">
                      {category.name}
                    </h3>
                    <div className="flex items-center text-white/90 group-hover:text-white">
                      <span className="text-xs md:text-sm font-medium">Explore Collection</span>
                      <ArrowRight className="ml-2 transform group-hover:translate-x-2 transition-transform" size={16} />
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-8 md:mb-12">
            <div className="inline-flex items-center space-x-2 bg-blush-100 text-blush-700 px-3 md:px-4 py-2 rounded-full mb-3 md:mb-4">
              <TrendingUp size={18} />
              <span className="font-semibold text-sm md:text-base">Trending Now</span>
            </div>
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-neutral-900 mb-3 md:mb-4 px-4">
              Featured Products
            </h2>
            <p className="text-base md:text-xl text-neutral-600 max-w-2xl mx-auto px-4">
              Handpicked favorites from our latest collection
            </p>
          </div>

          {loading ? (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="bg-neutral-100 rounded-2xl h-72 md:h-96 animate-pulse"></div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 mb-8 md:mb-12">
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}

          <div className="text-center">
            <Link
              href="/products"
              className="btn-hover premium-gradient text-white px-8 py-4 rounded-lg font-semibold text-lg inline-flex items-center elegant-shadow hover:shadow-xl transition-all"
            >
              View All Products
              <ArrowRight className="ml-2" size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-12 md:py-20 relative overflow-hidden">
        <div className="absolute inset-0 premium-gradient"></div>
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.4"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-2xl md:rounded-3xl p-6 md:p-12 shadow-2xl">
            <div className="mb-6">
              <div className="inline-block bg-white/20 rounded-full p-3 md:p-4 mb-3 md:mb-4">
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
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default HomePage;
