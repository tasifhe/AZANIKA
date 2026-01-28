'use client';

import React, { useState, useEffect, useCallback } from 'react';
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
}

const slides: Slide[] = [
  {
    id: 1,
    title: 'Elegant Jewelry',
    subtitle: 'SHINE BRIGHT',
    description: 'Discover our exclusive collection of handcrafted jewelry pieces that add sparkle to every moment',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&q=85',
    cta: 'Shop Jewelry',
    ctaLink: '/category/Jewelry',
  },
  {
    id: 2,
    title: 'Premium Handbags',
    subtitle: 'LUXURY REDEFINED',
    description: 'Elevate your style with our curated selection of premium leather handbags',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1200&q=85',
    cta: 'Shop Bags',
    ctaLink: '/category/Bags',
  },
  {
    id: 3,
    title: 'Stylish Accessories',
    subtitle: 'COMPLETE YOUR LOOK',
    description: 'Find the perfect accessories to complement your unique style and personality',
    image: 'https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=1200&q=85',
    cta: 'Shop Accessories',
    ctaLink: '/category/Accessories',
  },
  {
    id: 4,
    title: 'New Arrivals',
    subtitle: 'LATEST TRENDS',
    description: 'Be the first to discover our newest additions and stay ahead of fashion trends',
    image: 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1200&q=85',
    cta: 'Shop New',
    ctaLink: '/products?sort=newest',
  }
];

const HeroSlideshow = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentSlide(index);
    setTimeout(() => setIsTransitioning(false), 700);
  }, [isTransitioning]);

  useEffect(() => {
    if (!isAutoPlaying) return;
    
    const interval = setInterval(() => {
      goToSlide((currentSlide + 1) % slides.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [isAutoPlaying, currentSlide, goToSlide]);

  const nextSlide = () => {
    goToSlide((currentSlide + 1) % slides.length);
    setIsAutoPlaying(false);
  };

  const prevSlide = () => {
    goToSlide((currentSlide - 1 + slides.length) % slides.length);
    setIsAutoPlaying(false);
  };

  const handleGoToSlide = (index: number) => {
    goToSlide(index);
    setIsAutoPlaying(false);
  };

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden bg-pearl-900">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-out ${
            index === currentSlide 
              ? 'opacity-100 scale-100' 
              : 'opacity-0 scale-105'
          }`}
        >
          {/* Background Image */}
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="100vw"
          />
          
          {/* Gradient Overlay - Luxury dark overlay with brand accent */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />
          
          {/* Decorative Brand Accent Line */}
          <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1.5 h-32 bg-gradient-to-b from-brand-400 via-brand-500 to-brand-600 hidden lg:block" />
        </div>
      ))}

      {/* Content Container */}
      <div className="relative h-full max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        <div className="flex items-center h-full">
          <div className="max-w-2xl">
            {slides.map((slide, index) => (
              <div
                key={slide.id}
                className={`transition-all duration-700 ${
                  index === currentSlide
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-8 absolute'
                }`}
              >
                {/* Subtitle with brand accent */}
                <div className="flex items-center gap-3 mb-4">
                  <span className="w-12 h-[2px] bg-gradient-to-r from-brand-400 to-brand-500" />
                  <p className="text-brand-400 text-sm md:text-base font-semibold tracking-[0.3em] uppercase">
                    {slide.subtitle}
                  </p>
                </div>
                
                {/* Main Title */}
                <h1 className="text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-white mb-6 leading-[1.1]">
                  {slide.title}
                </h1>
                
                {/* Description */}
                <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed max-w-xl font-light">
                  {slide.description}
                </p>
                
                {/* CTA Button */}
                <Link
                  href={slide.ctaLink}
                  className="group inline-flex items-center gap-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white px-8 py-4 rounded-lg font-semibold text-sm uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-brand-500/20 transform hover:-translate-y-0.5"
                >
                  {slide.cta}
                  <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Navigation Arrows - Refined styling */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-brand-400/50 rounded-full flex items-center justify-center transition-all duration-300 group z-10"
        aria-label="Previous slide"
      >
        <ChevronLeft className="text-white group-hover:text-brand-400 transition-colors" size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white/10 hover:bg-white/20 backdrop-blur-sm border border-white/20 hover:border-brand-400/50 rounded-full flex items-center justify-center transition-all duration-300 group z-10"
        aria-label="Next slide"
      >
        <ChevronRight className="text-white group-hover:text-brand-400 transition-colors" size={24} />
      </button>

      {/* Slide Indicators - Premium pill style */}
      <div className="absolute bottom-8 md:bottom-12 left-1/2 -translate-x-1/2 flex items-center gap-3 z-10">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => handleGoToSlide(index)}
            className={`relative transition-all duration-500 rounded-full ${
              index === currentSlide 
                ? 'w-10 h-2.5 bg-gradient-to-r from-brand-400 to-brand-500' 
                : 'w-2.5 h-2.5 bg-white/40 hover:bg-white/60'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Slide Counter */}
      <div className="absolute bottom-8 md:bottom-12 right-8 md:right-12 hidden md:flex items-center gap-2 text-white/60 text-sm font-medium z-10">
        <span className="text-white font-bold text-lg">{String(currentSlide + 1).padStart(2, '0')}</span>
        <span className="w-8 h-[1px] bg-white/30" />
        <span>{String(slides.length).padStart(2, '0')}</span>
      </div>
    </section>
  );
};

export default HeroSlideshow;
