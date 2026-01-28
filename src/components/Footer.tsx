'use client';

import React from 'react';
import Link from 'next/link';
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Gem, Sparkles } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-pearl-900 text-white">
      {/* Newsletter Section */}
      <div className="border-b border-pearl-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <h3 className="text-2xl font-display font-bold text-white mb-2">Stay in the Loop</h3>
              <p className="text-pearl-400">Subscribe for exclusive offers and new arrivals</p>
            </div>
            <form className="flex w-full max-w-md gap-3">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-5 py-3 bg-pearl-800 border border-pearl-700 rounded-lg text-white placeholder-pearl-500 focus:outline-none focus:border-brand-500 transition-colors"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white font-semibold rounded-lg transition-all duration-300 shadow-lg hover:shadow-xl whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-6">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <Gem className="text-brand-500" size={28} />
              </div>
              <span className="text-2xl font-display font-bold text-white">AZANIKA</span>
            </Link>
            <p className="text-pearl-400 leading-relaxed">
              Elevating women's style with premium fashion accessories. Discover timeless elegance for every occasion.
            </p>
            <div className="flex space-x-3">
              <Link 
                href="https://www.facebook.com/AzanikaFashion" 
                className="w-10 h-10 bg-pearl-800 hover:bg-brand-500 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Facebook size={18} className="text-pearl-400 group-hover:text-white" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 bg-pearl-800 hover:bg-brand-500 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Instagram size={18} className="text-pearl-400 group-hover:text-white" />
              </Link>
              <Link 
                href="#" 
                className="w-10 h-10 bg-pearl-800 hover:bg-brand-500 rounded-full flex items-center justify-center transition-all duration-300 group"
              >
                <Twitter size={18} className="text-pearl-400 group-hover:text-white" />
              </Link>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { name: 'About Us', href: '/about' },
                { name: 'Contact', href: '/contact' },
                { name: 'Size Guide', href: '/size-guide' },
                { name: 'Shipping Info', href: '/shipping' },
                { name: 'Returns', href: '/returns' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-pearl-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-brand-500 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-white">Categories</h4>
            <ul className="space-y-3">
              {[
                { name: 'Jewelry', href: '/category/Jewelry' },
                { name: 'Handbags', href: '/category/Bags' },
                { name: 'Accessories', href: '/category/Accessories' },
                { name: 'Scarves', href: '/category/scarves' },
                { name: 'Sunglasses', href: '/category/sunglasses' },
              ].map((link) => (
                <li key={link.name}>
                  <Link 
                    href={link.href} 
                    className="text-pearl-400 hover:text-brand-400 transition-colors flex items-center gap-2 group"
                  >
                    <span className="w-0 group-hover:w-2 h-[2px] bg-brand-500 transition-all duration-300"></span>
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-display font-semibold text-white">Contact Us</h4>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center">
                  <Mail size={16} className="text-brand-400" />
                </div>
                <span className="text-pearl-400">contact@azanika.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center">
                  <Phone size={16} className="text-brand-400" />
                </div>
                <span className="text-pearl-400">+880 1234-567890</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 bg-brand-500/20 rounded-full flex items-center justify-center">
                  <MapPin size={16} className="text-brand-400" />
                </div>
                <span className="text-pearl-400">Dhaka, Bangladesh</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-pearl-800 mt-16 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-pearl-500 text-sm">
              © 2025 AZANIKA. All rights reserved.
            </p>
            <div className="flex items-center gap-6 text-sm">
              <Link href="/privacy" className="text-pearl-500 hover:text-brand-400 transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-pearl-500 hover:text-brand-400 transition-colors">
                Terms of Service
              </Link>
              <Link href="/cookies" className="text-pearl-500 hover:text-brand-400 transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
