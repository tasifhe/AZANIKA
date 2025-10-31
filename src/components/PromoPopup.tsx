'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { X, Sparkles, Tag, Clock, Gift, ArrowRight, Star } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const PromoPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [email, setEmail] = useState('');
  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 48,
    seconds: 15
  });

  useEffect(() => {
    // Check if popup has been shown in this session
    const popupShown = sessionStorage.getItem('promoPopupShown');
    
    if (!popupShown) {
      // Show popup after 2 seconds
      const timer = setTimeout(() => {
        setIsOpen(true);
        sessionStorage.setItem('promoPopupShown', 'true');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  useEffect(() => {
    // Countdown timer
    const interval = setInterval(() => {
      setTimeLeft(prev => {
        let { days, hours, minutes, seconds } = prev;
        
        seconds--;
        if (seconds < 0) {
          seconds = 59;
          minutes--;
        }
        if (minutes < 0) {
          minutes = 59;
          hours--;
        }
        if (hours < 0) {
          hours = 23;
          days--;
        }
        if (days < 0) {
          days = 0;
          hours = 0;
          minutes = 0;
          seconds = 0;
        }

        return { days, hours, minutes, seconds };
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // TODO: Send to newsletter API
    console.log('Newsletter signup:', { email });
    
    // Show success message
    alert('🎉 Success! Check your email for your exclusive 10% discount code!');
    setIsOpen(false);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
            className="fixed inset-0 bg-gradient-to-br from-black/70 via-blush-900/30 to-black/70 backdrop-blur-sm z-[100]"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 0.5, rotateY: -90 }}
            transition={{ type: "spring", duration: 0.7, bounce: 0.3 }}
            className="fixed inset-0 flex items-center justify-center z-[101] p-4"
          >
            <div className="relative max-w-2xl w-full">
              {/* Close Button */}
              <motion.button
                onClick={handleClose}
                whileHover={{ rotate: 90, scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="absolute -top-3 -right-3 z-20 p-3 bg-white rounded-full shadow-2xl text-neutral-800 hover:bg-blush-50 transition-colors"
                aria-label="Close popup"
              >
                <X size={24} />
              </motion.button>

              {/* Main Card */}
              <div className="bg-gradient-to-br from-white via-blush-50/50 to-cream-100 rounded-3xl shadow-2xl overflow-hidden border-4 border-white">
                {/* Top Decorative Strip */}
                <div className="h-2 bg-gradient-to-r from-blush-500 via-blush-400 to-orange-500"></div>
                
                <div className="relative p-8 md:p-10">
                  {/* Floating Sparkles */}
                  <motion.div
                    animate={{ 
                      y: [0, -10, 0],
                      rotate: [0, 10, 0]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                    className="absolute top-8 right-8"
                  >
                    <Sparkles className="text-blush-400" size={40} />
                  </motion.div>
                  
                  <motion.div
                    animate={{ 
                      y: [0, -15, 0],
                      rotate: [0, -10, 0]
                    }}
                    transition={{ duration: 4, repeat: Infinity, delay: 0.5 }}
                    className="absolute bottom-12 left-8"
                  >
                    <Star className="text-orange-400 fill-orange-400" size={32} />
                  </motion.div>

                  {/* Header Section */}
                  <div className="text-center mb-6">
                    <motion.div
                      initial={{ y: -20, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-blush-500 to-orange-500 text-white px-5 py-2 rounded-full mb-4 shadow-lg"
                    >
                      <Gift size={20} />
                      <span className="font-bold text-sm tracking-wider">EXCLUSIVE OFFER</span>
                    </motion.div>
                    
                    <motion.h2
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      transition={{ delay: 0.3, type: "spring" }}
                      className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blush-600 via-blush-500 to-orange-500 mb-3"
                    >
                      Welcome Gift!
                    </motion.h2>
                    
                    <motion.p
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-xl text-neutral-700 font-medium"
                    >
                      Get <span className="text-3xl font-black text-blush-600">10% OFF</span> your first order
                    </motion.p>
                  </div>

                  {/* Promo Code Display */}
                  <motion.div
                    initial={{ rotateX: 90, opacity: 0 }}
                    animate={{ rotateX: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="mb-6"
                  >
                    <div className="bg-white rounded-2xl p-6 shadow-xl border-2 border-dashed border-blush-300">
                      <div className="flex items-center justify-center gap-3 mb-3">
                        <Tag className="text-blush-500" size={24} />
                        <p className="text-sm font-semibold text-neutral-600 uppercase tracking-wide">Your Promo Code</p>
                      </div>
                      <div className="bg-gradient-to-r from-blush-600 to-orange-500 text-white py-4 px-6 rounded-xl text-center">
                        <p className="text-3xl md:text-4xl font-black tracking-widest">AZN10</p>
                      </div>
                      <p className="text-xs text-center text-neutral-500 mt-3 italic">
                        Apply at checkout to unlock your discount
                      </p>
                    </div>
                  </motion.div>

                  {/* Countdown Timer */}
                  <motion.div
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="mb-6"
                  >
                    <div className="flex items-center justify-center gap-2 mb-3">
                      <Clock className="text-orange-500" size={20} />
                      <p className="text-sm font-bold text-neutral-700 uppercase">Hurry! Offer Ends In:</p>
                    </div>
                    
                    <div className="grid grid-cols-4 gap-2 md:gap-4 max-w-md mx-auto">
                      {[
                        { value: timeLeft.days, label: 'Days' },
                        { value: timeLeft.hours, label: 'Hours' },
                        { value: timeLeft.minutes, label: 'Mins' },
                        { value: timeLeft.seconds, label: 'Secs' }
                      ].map((item, index) => (
                        <motion.div
                          key={item.label}
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.7 + index * 0.1, type: "spring" }}
                          className="bg-gradient-to-br from-blush-500 to-orange-500 rounded-xl p-3 text-center shadow-lg"
                        >
                          <div className="text-2xl md:text-3xl font-black text-white">
                            {String(item.value).padStart(2, '0')}
                          </div>
                          <div className="text-[10px] md:text-xs font-bold text-white/90 uppercase tracking-wide mt-1">
                            {item.label}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>

                  {/* Email Form */}
                  <motion.form
                    onSubmit={handleSubmit}
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="mb-4"
                  >
                    <div className="flex flex-col sm:flex-row gap-3">
                      <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email address"
                        required
                        className="flex-1 px-5 py-4 border-2 border-blush-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blush-500 focus:border-transparent text-base font-medium placeholder:text-neutral-400"
                      />
                      <motion.button
                        type="submit"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="bg-gradient-to-r from-blush-600 to-orange-500 hover:from-blush-700 hover:to-orange-600 text-white font-bold py-4 px-8 rounded-xl shadow-lg hover:shadow-xl transition-all flex items-center justify-center gap-2 whitespace-nowrap"
                      >
                        <span>Claim Offer</span>
                        <ArrowRight size={20} />
                      </motion.button>
                    </div>
                  </motion.form>

                  {/* Benefits List */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.9 }}
                    className="flex flex-wrap items-center justify-center gap-4 mb-4 text-xs text-neutral-600"
                  >
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Free Shipping</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Exclusive Deals</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                      <span>Early Access</span>
                    </div>
                  </motion.div>

                  {/* Dismiss Link */}
                  <motion.button
                    onClick={handleClose}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1 }}
                    className="w-full text-center text-sm text-neutral-500 hover:text-neutral-700 font-medium transition-colors"
                  >
                    No thanks, I'll pay full price
                  </motion.button>
                </div>

                {/* Bottom Decorative Strip */}
                <div className="h-2 bg-gradient-to-r from-orange-500 via-blush-400 to-blush-500"></div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PromoPopup;
