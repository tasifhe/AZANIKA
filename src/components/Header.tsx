'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { ShoppingCart, Search, Menu, X, User, Heart } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { itemCount } = useCart();

  const navigation = [
    { name: 'Home', href: '/' },
    { name: 'Jewelry', href: '/category/jewelry' },
    { name: 'Handbags', href: '/category/bags' },
    { name: 'Scarves', href: '/category/scarves' },
    { name: 'Sunglasses', href: '/category/sunglasses' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Banner */}
      <div className="premium-gradient text-white text-center py-2 text-sm">
        <p>Free shipping on orders over $100 | Use code: AZANIKA10 for 10% off</p>
      </div>

      {/* Main Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 hover:text-primary-600 p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold gradient-text">AZANIKA</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side icons */}
          <div className="flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => setIsSearchOpen(!isSearchOpen)}
              className="text-neutral-700 hover:text-primary-600 p-2 transition-colors"
            >
              <Search size={20} />
            </button>

            {/* Wishlist */}
            <button className="text-neutral-700 hover:text-primary-600 p-2 transition-colors">
              <Heart size={20} />
            </button>

            {/* User Account */}
            <button className="text-neutral-700 hover:text-primary-600 p-2 transition-colors">
              <User size={20} />
            </button>

            {/* Shopping Cart */}
            <Link href="/cart" className="relative text-neutral-700 hover:text-primary-600 p-2 transition-colors">
              <ShoppingCart size={20} />
              {itemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center">
                  {itemCount}
                </span>
              )}
            </Link>
          </div>
        </div>

        {/* Search Bar */}
        {isSearchOpen && (
          <div className="pb-4">
            <div className="relative max-w-md mx-auto">
              <input
                type="text"
                placeholder="Search products..."
                className="w-full pl-4 pr-10 py-2 border border-gray-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              />
              <button className="absolute right-3 top-2.5 text-gray-400">
                <Search size={16} />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
