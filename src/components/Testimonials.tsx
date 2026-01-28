'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rating: number;
  review: string;
  product: string;
  location: string;
}

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'Fatima Rahman',
      image: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200',
      rating: 5,
      review: 'Absolutely love my pearl necklace from AZANIKA! The quality is exceptional and it arrived beautifully packaged. Perfect for special occasions and everyday elegance.',
      product: 'Pearl Necklace',
      location: 'Dhaka, Bangladesh'
    },
    {
      id: 2,
      name: 'Aisha Khan',
      image: 'https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?w=200',
      rating: 5,
      review: 'The leather handbag I ordered exceeded my expectations! Beautiful craftsmanship, spacious, and the color is exactly as shown. AZANIKA is my go-to for accessories now!',
      product: 'Leather Handbag',
      location: 'Chittagong, Bangladesh'
    },
    {
      id: 3,
      name: 'Nusrat Ahmed',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200',
      rating: 5,
      review: 'Fast shipping and excellent customer service! I had questions about sizing and the team was so helpful. My silk scarf is gorgeous - soft, vibrant colors, and perfect quality.',
      product: 'Silk Scarf',
      location: 'Sylhet, Bangladesh'
    },
    {
      id: 4,
      name: 'Mehreen Hossain',
      image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200',
      rating: 5,
      review: "I have ordered from AZANIKA three times now and every experience has been flawless. Authentic products, beautiful packaging, and the prices are very reasonable. Highly recommend!",
      product: 'Gold Earrings',
      location: 'Dhaka, Bangladesh'
    },
    {
      id: 5,
      name: 'Sabrina Islam',
      image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200',
      rating: 5,
      review: 'The sunglasses are stylish and great quality! They came with a protective case and cleaning cloth. COD was super convenient. Will definitely order again!',
      product: 'Designer Sunglasses',
      location: 'Rajshahi, Bangladesh'
    }
  ];

  const nextTestimonial = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prevTestimonial = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  useEffect(() => {
    if (!isAutoPlaying) return;

    const interval = setInterval(() => {
      nextTestimonial();
    }, 5000); // Auto-advance every 5 seconds

    return () => clearInterval(interval);
  }, [currentIndex, isAutoPlaying]);

  const current = testimonials[currentIndex];

  return (
    <section className="py-16 md:py-24 bg-pearl-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 md:mb-16">
          <div className="flex items-center justify-center gap-4 mb-4">
            <span className="w-16 h-[2px] bg-gradient-to-r from-transparent to-brand-400" />
            <span className="text-brand-500 text-sm font-semibold tracking-[0.3em] uppercase">Testimonials</span>
            <span className="w-16 h-[2px] bg-gradient-to-l from-transparent to-brand-400" />
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-pearl-900 mb-4">
            What Our Customers Say
          </h2>
          <p className="text-pearl-600 text-lg max-w-xl mx-auto">
            Real experiences from our valued customers across Bangladesh
          </p>
        </div>

        <div className="relative max-w-3xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-white rounded-2xl p-6 md:p-10 shadow-elegant border border-pearl-100">
            <div className="relative">
              {/* Customer Info */}
              <div className="flex items-center space-x-4 mb-6">
                <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-brand-200 flex-shrink-0 shadow-md">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-lg font-display font-bold text-pearl-900">{current.name}</h3>
                  <p className="text-sm text-pearl-600">{current.location}</p>
                  <div className="flex items-center space-x-1 mt-1">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} size={16} className="fill-brand-500 text-brand-500" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-pearl-700 mb-4 text-lg leading-relaxed italic">
                "{current.review}"
              </p>

              {/* Product Badge */}
              <div className="text-sm text-pearl-600">
                Purchased: <span className="font-semibold text-brand-600">{current.product}</span>
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg border border-pearl-100 flex items-center justify-center text-pearl-700 hover:bg-brand-50 hover:text-brand-600 transition-all"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-12 w-12 h-12 bg-white rounded-full shadow-lg border border-pearl-100 flex items-center justify-center text-pearl-700 hover:bg-brand-50 hover:text-brand-600 transition-all"
            aria-label="Next testimonial"
          >
            <ChevronRight size={20} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-3 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-2.5 bg-gradient-to-r from-brand-500 to-brand-600'
                    : 'w-2.5 h-2.5 bg-pearl-300 hover:bg-pearl-400'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
