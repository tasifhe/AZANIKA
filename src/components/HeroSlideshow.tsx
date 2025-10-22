'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';

interface Slide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  cta: string;
  ctaLink: string;
  bgGradient: string;
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Elegant Jewelry Collection',
    subtitle: 'Shine Bright',
    description: 'Discover our exclusive collection of handcrafted jewelry pieces that add sparkle to every moment',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=80',
    cta: 'Shop Jewelry',
    ctaLink: '/category/Jewelry',
    bgGradient: 'from-blush-50 to-cream-50'
  },
  {
    id: 2,
    title: 'Premium Handbags',
    subtitle: 'Luxury Redefined',
    description: 'Elevate your style with our curated selection of premium leather handbags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&q=80',
    cta: 'Shop Bags',
    ctaLink: '/category/Bags',
    bgGradient: 'from-blush-100 to-blush-50'
  },
  {
    id: 3,
    title: 'Stylish Accessories',
    subtitle: 'Complete Your Look',
    description: 'Find the perfect accessories to complement your unique style and personality',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=800&q=80',
    cta: 'Shop Accessories',
    ctaLink: '/category/Accessories',
    bgGradient: 'from-cream-100 to-blush-50'
  },
  {
    id: 4,
    title: 'New Arrivals',
    subtitle: 'Latest Trends',
    description: 'Be the first to discover our newest additions and stay ahead of fashion trends',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&q=80',
    cta: 'Shop New',
    ctaLink: '/products?sort=newest',
    bgGradient: 'from-blush-50 to-cream-100'
  }
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlaying]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
    setIsAutoPlaying(false);
  };

  const slide = slides[currentSlide];

  return (
    <div className="relative h-[450px] md:h-[600px] overflow-hidden">
      {/* Background gradient */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.bgGradient} transition-all duration-1000`}></div>

      {/* Logo at the top */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
        <img
          src="https://iili.io/KU7rz92.png"
          alt="AZANIKA M"
          className="mx-auto mb-4 h-16 w-auto drop-shadow-lg"
        />
      </div>

      {/* Content */}
      <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-8 items-center h-full py-8 md:py-12">
          {/* Text Content */}
          <div className="text-center lg:text-left space-y-4 md:space-y-6 z-10">
            <div className="space-y-1 md:space-y-2">
              <p className="text-blush-600 font-bold text-sm md:text-lg tracking-wide uppercase animate-fade-in">
                {slide.subtitle}
              </p>
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-neutral-900 leading-tight animate-slide-up">
                {slide.title}
              </h1>
            </div>
            <p className="text-sm md:text-lg lg:text-xl text-neutral-600 max-w-lg mx-auto lg:mx-0 animate-fade-in-delay">
              {slide.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 md:gap-4 justify-center lg:justify-start animate-fade-in-delay-2">
              <Link 
                href={slide.ctaLink}
                className="premium-gradient text-white px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg inline-flex items-center justify-center elegant-shadow hover:shadow-xl transition-all transform hover:scale-105"
              >
                {slide.cta}
                <ArrowRight className="ml-2" size={18} />
              </Link>
              <Link 
                href="/products"
                className="luxury-border border-2 text-blush-600 px-6 md:px-8 py-3 md:py-4 rounded-lg font-semibold text-base md:text-lg inline-flex items-center justify-center hover:bg-blush-50 transition-all"
              >
                View All
              </Link>
            </div>
          </div>

          {/* Image */}
          <div className="relative h-64 md:h-80 lg:h-96 animate-float">
            <div className="relative h-full w-full rounded-2xl md:rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority
              />
            </div>
            {/* Decorative elements */}
            <div className="absolute -top-4 -right-4 w-20 h-20 md:w-24 md:h-24 bg-primary-300 rounded-full blur-3xl opacity-50"></div>
            <div className="absolute -bottom-4 -left-4 w-24 h-24 md:w-32 md:h-32 bg-primary-400 rounded-full blur-3xl opacity-40"></div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-2 md:left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} className="text-neutral-800 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 md:right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white p-2 md:p-3 rounded-full shadow-lg transition-all z-20 hover:scale-110"
        aria-label="Next slide"
      >
        <ChevronRight size={20} className="text-neutral-800 md:w-6 md:h-6" />
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-4 md:bottom-8 left-1/2 -translate-x-1/2 flex space-x-2 md:space-x-3 z-20">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all ${
              currentSlide === index
                ? 'bg-primary-700 w-6 md:w-8 h-2 md:h-3'
                : 'bg-white/60 hover:bg-white/80 w-2 md:w-3 h-2 md:h-3'
            } rounded-full`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlideshow;
