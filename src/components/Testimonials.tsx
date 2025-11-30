'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';

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
    <section 
      className="py-16 md:py-20 bg-white relative overflow-hidden"
      onMouseEnter={() => setIsAutoPlaying(false)}
      onMouseLeave={() => setIsAutoPlaying(true)}
    >
      <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'0.4\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <div className="inline-flex items-center space-x-2 bg-gold-50 text-gold-700 px-4 py-2 rounded-full mb-4 shadow-md">
            <Star size={18} className="fill-current" />
            <span className="font-semibold">Customer Reviews</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-neutral-900 mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
          <p className="text-lg text-neutral-600 max-w-2xl mx-auto">
            Join thousands of happy customers who love AZANIKA accessories
          </p>
        </div>

        <div className="relative max-w-4xl mx-auto">
          {/* Main Testimonial Card */}
          <div className="bg-gradient-to-br from-cream-50 to-gold-50 rounded-3xl p-8 md:p-12 shadow-2xl border border-gold-100 relative">
            {/* Quote Icon */}
            <div className="absolute top-6 right-6 text-gold-200">
              <Quote size={64} className="opacity-50" />
            </div>

            <div className="relative z-10">
              {/* Customer Info */}
              <div className="flex flex-col md:flex-row items-center md:items-start space-y-4 md:space-y-0 md:space-x-6 mb-6">
                <div className="relative w-20 h-20 rounded-full overflow-hidden border-4 border-white shadow-lg flex-shrink-0">
                  <Image
                    src={current.image}
                    alt={current.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="text-center md:text-left">
                  <h3 className="text-xl font-bold text-neutral-900">{current.name}</h3>
                  <p className="text-neutral-600 mb-2">{current.location}</p>
                  <div className="flex items-center space-x-1 justify-center md:justify-start">
                    {[...Array(current.rating)].map((_, i) => (
                      <Star key={i} size={18} className="fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                </div>
              </div>

              {/* Review Text */}
              <p className="text-lg text-neutral-700 leading-relaxed mb-4 italic">
                "{current.review}"
              </p>

              {/* Product Badge */}
              <div className="inline-flex items-center bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium text-gold-700 shadow-md">
                Purchased: {current.product}
              </div>
            </div>
          </div>

          {/* Navigation Arrows */}
          <button
            onClick={prevTestimonial}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gold-600 hover:bg-gold-50 transition-all duration-300 hover:scale-110"
            aria-label="Previous testimonial"
          >
            <ChevronLeft size={24} />
          </button>
          <button
            onClick={nextTestimonial}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 bg-white rounded-full shadow-lg flex items-center justify-center text-gold-600 hover:bg-gold-50 transition-all duration-300 hover:scale-110"
            aria-label="Next testimonial"
          >
            <ChevronRight size={24} />
          </button>

          {/* Dots Indicator */}
          <div className="flex items-center justify-center space-x-2 mt-8">
            {testimonials.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`transition-all duration-300 rounded-full ${
                  index === currentIndex
                    ? 'w-8 h-3 premium-gradient'
                    : 'w-3 h-3 bg-gold-200 hover:bg-gold-300'
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Stats Bar */}
        <div className="grid grid-cols-3 gap-6 max-w-3xl mx-auto mt-12 pt-12 border-t border-gold-100">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">10,000+</div>
            <div className="text-sm md:text-base text-neutral-600">Happy Customers</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">4.9/5</div>
            <div className="text-sm md:text-base text-neutral-600">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold gradient-text mb-2">98%</div>
            <div className="text-sm md:text-base text-neutral-600">Satisfaction Rate</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
