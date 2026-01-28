'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, User, Heart, ChevronDown, Gem, ShoppingBag, Sparkles, Glasses, Watch, Package } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useWishlist } from '@/components/Wishlist';
import { searchProducts } from '@/lib/data';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount } = useCart();
  const { wishlistCount } = useWishlist();
  const router = useRouter();
  const searchRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (searchQuery.trim()) {
      const results = searchProducts(searchQuery).slice(0, 5);
      setSearchResults(results);
      setShowResults(true);
    } else {
      setSearchResults([]);
      setShowResults(false);
    }
  }, [searchQuery]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/products?search=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setShowResults(false);
      setSearchQuery('');
    }
  };

  const handleProductClick = (productId: string) => {
    router.push(`/product/${productId}`);
    setIsSearchOpen(false);
    setShowResults(false);
    setSearchQuery('');
  };

  const navigation = [
    { name: 'Home', href: '/' },
    { 
      name: 'Shop',
      dropdown: [
        { name: 'All Products', href: '/products' },
        { name: 'New Arrivals', href: '/products?sort=newest' },
        { name: 'Best Sellers', href: '/products?sort=popular' },
        { name: 'Sale', href: '/products?sale=true' },
      ]
    },
    { 
      name: 'Categories',
      dropdown: [
        { name: 'Jewelry', href: '/category/Jewelry', icon: Gem },
        { name: 'Handbags', href: '/category/Bags', icon: ShoppingBag },
        { name: 'Accessories', href: '/category/Accessories', icon: Sparkles },
        { name: 'Scarves', href: '/category/scarves', icon: Heart },
        { name: 'Sunglasses', href: '/category/sunglasses', icon: Glasses },
        { name: 'Watches', href: '/category/watches', icon: Watch },
      ]
    },
    { name: 'Collections', href: '/products?featured=true' },
    { name: 'About', href: '/about' },
    { name: 'Contact', href: '/contact' },
    { name: 'FAQ', href: '/faq' },
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50 border-b border-pearl-100">
      {/* Top Banner */}
      <div className="bg-pearl-900 text-white text-center py-2.5 text-xs md:text-sm font-medium tracking-wide">
        <p className="flex items-center justify-center gap-2">
          <Package size={14} />
          <span>Free Shipping on Orders Over ৳5,000 | Luxury Gift Wrapping Available</span>
        </p>
      </div>

      {/* Main Header */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group">
              <div className="relative h-14 w-36 md:h-16 md:w-44">
                <Image
                  src="https://iili.io/fiQnCaS.png"
                  alt="AZANIKA"
                  fill
                  className="object-contain"
                  priority
                  unoptimized
                />
              </div>
            </Link>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center" ref={dropdownRef}>
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        className="flex items-center gap-1.5 text-pearl-700 hover:text-brand-600 font-semibold transition-all duration-200 py-2 text-sm uppercase tracking-wider"
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={16} className={`transition-transform duration-200 ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.name && (
                        <div 
                          className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-pearl-100 min-w-[220px] py-3 z-50 animate-slide-down"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {item.dropdown.map((subItem: any) => {
                            const IconComponent = subItem.icon;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center space-x-3 px-5 py-2.5 text-pearl-700 hover:bg-gradient-to-r hover:from-brand-50 hover:to-transparent hover:text-brand-600 smooth-transition group rounded-lg mx-2"
                              >
                                {IconComponent && (
                                  <IconComponent className="w-5 h-5 group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 ease-out" />
                                )}
                                <span className="text-[14px] group-hover:translate-x-1 transition-transform duration-300">{subItem.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href || '/'}
                      className="text-pearl-700 hover:text-brand-600 font-semibold smooth-transition py-2 text-[15px] uppercase tracking-wide"
                    >
                      {item.name}
                    </Link>
                  )}
                </div>
              ))}
            </nav>

            {/* Right side icons */}
            <div className="flex items-center space-x-2">
              {/* Search */}
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className="text-pearl-700 hover:text-brand-600 p-3 transition-all duration-200 rounded-xl hover:bg-brand-50 relative group"
                title="Search"
              >
                <Search size={20} />
                <span className="absolute inset-0 rounded-xl bg-brand-100 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-20 transition-all duration-200 -z-10"></span>
              </button>

              {/* Wishlist */}
              <Link 
                href="/wishlist" 
                className="hidden sm:block text-pearl-700 hover:text-blush-500 p-3 transition-all duration-200 rounded-xl hover:bg-blush-50 relative group" 
                title="Wishlist"
              >
                <Heart size={20} />
                {wishlistCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-blush-500 to-blush-600 text-white rounded-full text-xs min-w-[18px] h-[18px] flex items-center justify-center font-bold shadow-md group-hover:scale-110 transition-transform">
                    {wishlistCount > 99 ? '99+' : wishlistCount}
                  </span>
                )}
                <span className="absolute inset-0 rounded-xl bg-blush-100 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-20 transition-all duration-200 -z-10"></span>
              </Link>

              {/* User Account - Desktop only */}
              <Link 
                href="/auth/login" 
                className="hidden sm:block text-pearl-700 hover:text-brand-600 p-3 transition-all duration-200 rounded-xl hover:bg-brand-50 relative group" 
                title="Account"
              >
                <User size={20} />
                <span className="absolute inset-0 rounded-xl bg-brand-100 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-20 transition-all duration-200 -z-10"></span>
              </Link>

              {/* Shopping Cart */}
              <Link href="/cart" className="relative text-pearl-700 hover:text-brand-600 p-3 transition-all duration-200 rounded-xl hover:bg-brand-50 group" title="Cart">
                <ShoppingCart size={20} />
                {itemCount > 0 && (
                  <span className="absolute -top-1 -right-1 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-full text-xs min-w-[20px] h-5 px-1.5 flex items-center justify-center font-bold shadow-lg group-hover:scale-110 transition-transform animate-pulse">
                    {itemCount > 99 ? '99+' : itemCount}
                  </span>
                )}
                <span className="absolute inset-0 rounded-xl bg-brand-100 scale-0 group-hover:scale-100 opacity-0 group-hover:opacity-20 transition-all duration-200 -z-10"></span>
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-pearl-700 hover:text-brand-600 p-2.5 smooth-transition rounded-lg hover:bg-brand-50"
              >
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {isSearchOpen && (
          <div className="pb-4" ref={searchRef}>
            <div className="relative max-w-md mx-auto">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-4 pr-10 py-2 border border-pearl-300 rounded-lg focus:ring-brand-500 focus:border-brand-500"
                  autoFocus
                />
                <button type="submit" className="absolute right-3 top-2.5 text-pearl-400 hover:text-brand-600">
                  <Search size={16} />
                </button>
              </form>
              
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-pearl-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-pearl-50 text-left"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-pearl-100 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-pearl-900 truncate">{product.name}</h3>
                        <p className="text-sm text-pearl-600">৳{product.price.toLocaleString()}</p>
                      </div>
                    </button>
                  ))}
                  {searchQuery && (
                    <Link
                      href={`/products?search=${encodeURIComponent(searchQuery)}`}
                      onClick={() => {
                        setIsSearchOpen(false);
                        setShowResults(false);
                        setSearchQuery('');
                      }}
                      className="block w-full p-3 text-center text-brand-600 hover:bg-brand-50 border-t border-pearl-200 font-medium"
                    >
                      View all results for "{searchQuery}"
                    </Link>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navigation.map((item) => (
              <div key={item.name}>
                {item.dropdown ? (
                  <div className="py-1">
                    <div className="px-3 py-2 text-sm font-semibold text-pearl-900 uppercase tracking-wide">{item.name}</div>
                    {item.dropdown.map((subItem: any) => {
                      const IconComponent = subItem.icon;
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center px-6 py-2 text-pearl-700 hover:text-brand-600 hover:bg-brand-50"
                          onClick={() => setIsMenuOpen(false)}
                        >
                          {IconComponent && <IconComponent className="w-5 h-5 mr-2" />}
                          <span>{subItem.name}</span>
                        </Link>
                      );
                    })}
                  </div>
                ) : (
                  <Link
                    href={item.href || '/'}
                    className="block px-3 py-2 text-pearl-700 hover:text-brand-600 hover:bg-brand-50 font-semibold uppercase tracking-wide smooth-transition rounded-lg"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
