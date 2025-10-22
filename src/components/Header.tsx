'use client';

import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { ShoppingCart, Search, Menu, X, User, Heart, ChevronDown, Gem, ShoppingBag, Sparkles, Glasses, Watch } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { searchProducts } from '@/lib/data';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const { itemCount } = useCart();
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
  ];

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      {/* Top Banner */}
      <div className="premium-gradient text-white text-center py-2 text-sm">
        <p className="flex items-center justify-center space-x-2">
          <Sparkles size={16} className="inline" />
          <span>Free Shipping on Orders Over ৳5,000 | New Arrivals Every Week!</span>
          <ShoppingBag size={16} className="inline" />
        </p>
      </div>

      {/* Main Header */}
      <div className="border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <div className="flex-shrink-0">
              <Link href="/" className="flex items-center space-x-3">
                <div className="relative w-10 h-10">
                  <Image
                    src="https://iili.io/KU7rz92.png"
                    alt="AZANIKA M"
                    fill
                    className="object-contain"
                    priority
                  />
                </div>
                <span className="text-2xl font-bold gradient-text tracking-wide">AZANIKA</span>
              </Link>
            </div>

            {/* Desktop Navigation - Centered */}
            <nav className="hidden lg:flex items-center space-x-8 flex-1 justify-center" ref={dropdownRef}>
              {navigation.map((item) => (
                <div key={item.name} className="relative">
                  {item.dropdown ? (
                    <div className="relative">
                      <button
                        onClick={() => setActiveDropdown(activeDropdown === item.name ? null : item.name)}
                        onMouseEnter={() => setActiveDropdown(item.name)}
                        className="flex items-center space-x-1 text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 py-2 text-[15px] uppercase tracking-wide"
                      >
                        <span>{item.name}</span>
                        <ChevronDown size={16} className={`transition-transform ${activeDropdown === item.name ? 'rotate-180' : ''}`} />
                      </button>
                      {activeDropdown === item.name && (
                        <div 
                          className="absolute top-full left-0 mt-2 bg-white border border-neutral-200 rounded-xl shadow-2xl min-w-[220px] py-3 z-50 animate-fade-in"
                          onMouseLeave={() => setActiveDropdown(null)}
                        >
                          {item.dropdown.map((subItem: any) => {
                            const IconComponent = subItem.icon;
                            return (
                              <Link
                                key={subItem.name}
                                href={subItem.href}
                                onClick={() => setActiveDropdown(null)}
                                className="flex items-center space-x-3 px-5 py-2.5 text-neutral-700 hover:bg-blush-50 hover:text-blush-600 transition-colors group"
                              >
                                {IconComponent && <IconComponent className="w-5 h-5 icon-float" />}
                                <span className="text-[14px]">{subItem.name}</span>
                              </Link>
                            );
                          })}
                        </div>
                      )}
                    </div>
                  ) : (
                    <Link
                      href={item.href || '/'}
                      className="text-neutral-700 hover:text-primary-600 font-medium transition-colors duration-200 text-[15px] uppercase tracking-wide"
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
                className="text-neutral-700 hover:text-primary-600 p-2.5 transition-colors rounded-lg hover:bg-neutral-100"
                title="Search"
              >
                <Search size={22} />
              </button>

              {/* Wishlist - Desktop only */}
              <button className="hidden sm:block text-neutral-700 hover:text-primary-600 p-2.5 transition-colors rounded-lg hover:bg-neutral-100" title="Wishlist">
                <Heart size={22} />
              </button>

              {/* User Account - Desktop only */}
              <button className="hidden sm:block text-neutral-700 hover:text-primary-600 p-2.5 transition-colors rounded-lg hover:bg-neutral-100" title="Account">
                <User size={22} />
              </button>

              {/* Shopping Cart */}
              <Link href="/cart" className="relative text-neutral-700 hover:text-primary-600 p-2.5 transition-colors rounded-lg hover:bg-neutral-100" title="Cart">
                <ShoppingCart size={22} />
                {itemCount > 0 && (
                  <span className="absolute top-1 right-1 bg-primary-600 text-white rounded-full text-xs w-5 h-5 flex items-center justify-center font-semibold">
                    {itemCount}
                  </span>
                )}
              </Link>

              {/* Mobile menu button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden text-neutral-700 hover:text-primary-600 p-2.5 transition-colors rounded-lg hover:bg-neutral-100"
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
                  className="w-full pl-4 pr-10 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  autoFocus
                />
                <button type="submit" className="absolute right-3 top-2.5 text-neutral-400 hover:text-primary-600">
                  <Search size={16} />
                </button>
              </form>
              
              {/* Search Results Dropdown */}
              {showResults && searchResults.length > 0 && (
                <div className="absolute top-full left-0 right-0 bg-white border border-neutral-200 rounded-lg shadow-lg mt-1 z-50 max-h-96 overflow-y-auto">
                  {searchResults.map((product) => (
                    <button
                      key={product.id}
                      onClick={() => handleProductClick(product.id)}
                      className="w-full flex items-center space-x-3 p-3 hover:bg-neutral-50 text-left"
                    >
                      <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                        <Image
                          src={product.images[0]}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-neutral-900 truncate">{product.name}</h3>
                        <p className="text-sm text-neutral-600">${product.price.toFixed(2)}</p>
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
                      className="block w-full p-3 text-center text-primary-600 hover:bg-primary-50 border-t border-neutral-200 font-medium"
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
                    <div className="px-3 py-2 text-sm font-semibold text-neutral-900 uppercase tracking-wide">{item.name}</div>
                    {item.dropdown.map((subItem: any) => {
                      const IconComponent = subItem.icon;
                      return (
                        <Link
                          key={subItem.name}
                          href={subItem.href}
                          className="flex items-center px-6 py-2 text-gray-700 hover:text-blush-600 hover:bg-blush-50"
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
                    className="block px-3 py-2 text-gray-700 hover:text-primary-600 font-medium uppercase tracking-wide"
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
