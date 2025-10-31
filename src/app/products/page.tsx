'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Filter, Search, Grid, List, SlidersHorizontal, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import { AnimatedContent } from '@/components/animations/AnimatedContent';
import { AnimatedGrid } from '@/components/animations/AnimatedList';
import { productsApi } from '@/lib/api';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  stock?: number;
  rating?: number;
  tags?: string[];
}

const ProductsContent = () => {
  const searchParams = useSearchParams();
  const categoryFilter = searchParams?.get('category') || '';
  const searchFromUrl = searchParams?.get('search') || '';
  
  const [searchQuery, setSearchQuery] = useState(searchFromUrl);
  const [selectedCategory, setSelectedCategory] = useState(categoryFilter);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 50000]);
  const [sortBy, setSortBy] = useState('featured');
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await productsApi.getAll();
      if (response.success && response.data) {
        setProducts(response.data as Product[]);
      }
    } catch (error) {
      // Handle error silently in production
      // TODO: Implement proper error logging service
    } finally {
      setLoading(false);
    }
  };

  // Get unique categories from products
  const categories = Array.from(new Set(products.map(p => p.category)));

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           (product.description || '').toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      const inStock = (product.stock || 0) > 0;
      
      return matchesSearch && matchesCategory && matchesPrice && inStock;
    });

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => b.id - a.id);
        break;
      case 'featured':
      default:
        // Keep original order or sort by ID descending
        filtered.sort((a, b) => b.id - a.id);
        break;
    }

    return filtered;
  }, [products, searchQuery, selectedCategory, priceRange, sortBy]);

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setPriceRange([0, 500]);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-blush-50/20 to-white pattern-gradient-bg">
      <Header />
      
      <main className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 py-4 md:py-8">
        {/* Page Header */}
        <AnimatedContent direction="up" className="mb-4 md:mb-8">
          <nav className="flex items-center space-x-2 text-xs sm:text-sm text-neutral-600 mb-3 md:mb-4 overflow-x-auto">
            <Link href="/" className="hover:text-blush-600 smooth-transition whitespace-nowrap">Home</Link>
            <span>/</span>
            <span className="text-neutral-900 whitespace-nowrap">Products</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-neutral-900 capitalize whitespace-nowrap">{selectedCategory}</span>
              </>
            )}
          </nav>
          
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-neutral-900 bg-gradient-to-r from-blush-600 to-blush-400 bg-clip-text text-transparent">
            {selectedCategory 
              ? `${selectedCategory} Collection`
              : 'All Products'
            }
          </h1>
          <p className="text-neutral-600 mt-1 md:mt-2 text-sm md:text-lg">
            {filteredAndSortedProducts.length} product{filteredAndSortedProducts.length !== 1 ? 's' : ''} found
          </p>
        </AnimatedContent>

        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Mobile Filter Modal/Drawer */}
          <AnimatePresence>
            {showFilters && (
              <>
                {/* Backdrop for mobile */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  onClick={() => setShowFilters(false)}
                  className="fixed inset-0 bg-black/50 z-40 lg:hidden"
                />
                
                {/* Filter Panel */}
                <motion.aside 
                  initial={{ opacity: 0, x: -300 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -300 }}
                  transition={{ type: "spring", damping: 25, stiffness: 300 }}
                  className="fixed inset-y-0 left-0 w-[85%] max-w-sm bg-white z-50 lg:relative lg:w-64 lg:inset-auto overflow-y-auto"
                >
                  <div className="sticky top-0 bg-white border-b border-blush-100 p-4 lg:hidden flex items-center justify-between z-10">
                    <h2 className="text-lg font-bold text-neutral-900">Filters</h2>
                    <button
                      onClick={() => setShowFilters(false)}
                      className="p-2 hover:bg-blush-50 rounded-lg transition-colors"
                      aria-label="Close filters"
                    >
                      <X size={20} />
                    </button>
                  </div>

                  <div className="p-4 lg:p-0">
                    <div className="bg-white lg:rounded-2xl lg:p-6 lg:shadow-lg lg:border lg:border-blush-100">
                      <div className="hidden lg:flex items-center justify-between mb-4">
                        <h3 className="font-semibold text-neutral-900 flex items-center gap-2">
                          <Filter size={18} className="text-blush-600" />
                          Filters
                        </h3>
                        <button
                          onClick={clearFilters}
                          className="text-sm text-blush-600 hover:text-blush-700 smooth-transition font-medium"
                        >
                          Clear All
                        </button>
                      </div>

                      {/* Search */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-neutral-700 mb-2">
                          Search Products
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Search..."
                            className="w-full pl-10 pr-4 py-2.5 border border-blush-200 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 smooth-transition text-sm"
                          />
                          <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                        </div>
                      </div>

                      {/* Categories */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Category
                        </label>
                        <div className="space-y-1.5">
                          <button
                            onClick={() => setSelectedCategory('')}
                            className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm smooth-transition ${
                              !selectedCategory 
                                ? 'bg-gradient-to-r from-blush-100 to-blush-50 text-blush-700 font-semibold shadow-sm' 
                                : 'text-neutral-700 hover:bg-blush-50'
                            }`}
                          >
                            All Categories
                          </button>
                          {categories.map((category) => (
                            <button
                              key={category}
                              onClick={() => setSelectedCategory(category)}
                              className={`block w-full text-left px-3 py-2.5 rounded-lg text-sm smooth-transition ${
                                selectedCategory === category
                                  ? 'bg-gradient-to-r from-blush-100 to-blush-50 text-blush-700 font-semibold shadow-sm'
                                  : 'text-neutral-700 hover:bg-blush-50'
                              }`}
                            >
                              {category}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Price Range */}
                      <div className="mb-5">
                        <label className="block text-sm font-medium text-neutral-700 mb-3">
                          Price Range
                        </label>
                        <div className="space-y-3">
                          <input
                            type="range"
                            min="0"
                            max="50000"
                            step="500"
                            value={priceRange[1]}
                            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                            className="w-full accent-blush-500 h-2"
                          />
                          <div className="flex justify-between text-sm font-medium text-neutral-600">
                            <span>৳{priceRange[0].toLocaleString()}</span>
                            <span>৳{priceRange[1].toLocaleString()}</span>
                          </div>
                        </div>
                      </div>

                      {/* Mobile Apply Button */}
                      <div className="lg:hidden sticky bottom-0 pt-4 border-t border-blush-100 flex gap-2">
                        <button
                          onClick={clearFilters}
                          className="flex-1 border-2 border-blush-200 text-blush-600 font-semibold px-4 py-3 rounded-lg transition-all duration-300 hover:bg-blush-50 active:scale-95"
                        >
                          Clear
                        </button>
                        <button
                          onClick={() => setShowFilters(false)}
                          className="flex-1 premium-gradient text-white font-semibold px-4 py-3 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 active:scale-95"
                        >
                          Apply Filters
                        </button>
                      </div>
                    </div>
                  </div>
                </motion.aside>
              </>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1 min-w-0">
            {/* Toolbar */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 mb-4 md:mb-6 p-3 md:p-4 bg-white rounded-xl shadow-sm border border-blush-100"
            >
              <div className="flex items-center justify-between sm:justify-start gap-3 sm:gap-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="flex items-center space-x-2 text-neutral-700 hover:text-blush-600 smooth-transition px-4 py-2 bg-blush-50 rounded-lg font-medium text-sm"
                >
                  <SlidersHorizontal size={18} />
                  <span>Filters</span>
                  {(selectedCategory || searchQuery || priceRange[1] !== 50000) && (
                    <span className="ml-1 bg-blush-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {[selectedCategory, searchQuery, priceRange[1] !== 50000].filter(Boolean).length}
                    </span>
                  )}
                </button>
                
                <div className="flex items-center space-x-1 bg-blush-50 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg smooth-transition ${viewMode === 'grid' ? 'bg-white text-blush-600 shadow-sm' : 'text-neutral-600 hover:text-blush-600'}`}
                    aria-label="Grid view"
                  >
                    <Grid size={18} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg smooth-transition ${viewMode === 'list' ? 'bg-white text-blush-600 shadow-sm' : 'text-neutral-600 hover:text-blush-600'}`}
                    aria-label="List view"
                  >
                    <List size={18} />
                  </button>
                </div>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-3 md:px-4 py-2 md:py-2.5 border border-blush-200 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 smooth-transition bg-white font-medium text-sm w-full sm:w-auto"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </motion.div>

            {/* Active Filters - Mobile */}
            {(selectedCategory || searchQuery || priceRange[1] !== 50000) && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex flex-wrap gap-2 mb-4 lg:hidden"
              >
                {selectedCategory && (
                  <button
                    onClick={() => setSelectedCategory('')}
                    className="flex items-center gap-1.5 bg-blush-100 text-blush-700 px-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    <span>{selectedCategory}</span>
                    <X size={14} />
                  </button>
                )}
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="flex items-center gap-1.5 bg-blush-100 text-blush-700 px-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    <span>Search: {searchQuery.slice(0, 15)}{searchQuery.length > 15 ? '...' : ''}</span>
                    <X size={14} />
                  </button>
                )}
                {priceRange[1] !== 50000 && (
                  <button
                    onClick={() => setPriceRange([0, 50000])}
                    className="flex items-center gap-1.5 bg-blush-100 text-blush-700 px-3 py-1.5 rounded-full text-xs font-medium"
                  >
                    <span>Up to ৳{priceRange[1].toLocaleString()}</span>
                    <X size={14} />
                  </button>
                )}
                <button
                  onClick={clearFilters}
                  className="text-blush-600 text-xs font-semibold underline px-2"
                >
                  Clear all
                </button>
              </motion.div>
            )}

            {/* Products */}
            {loading ? (
              <div className="flex justify-center items-center py-20">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blush-500"></div>
              </div>
            ) : filteredAndSortedProducts.length > 0 ? (
              <AnimatedGrid 
                className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 md:gap-6'
                    : 'space-y-4'
                }
                staggerDelay={0.08}
              >
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === 'list' ? 'sm:flex sm:space-x-4' : ''}
                  />
                ))}
              </AnimatedGrid>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-12 md:py-16 px-4"
              >
                <div className="w-20 h-20 md:w-24 md:h-24 mx-auto mb-4 bg-gradient-to-br from-blush-100 to-blush-50 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 md:w-10 md:h-10 text-blush-400" />
                </div>
                <h3 className="text-base md:text-lg font-medium text-neutral-900 mb-2">No products found</h3>
                <p className="text-sm md:text-base text-neutral-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="premium-gradient text-white px-5 py-2.5 md:px-6 md:py-3 rounded-xl font-semibold shadow-md hover:shadow-lg smooth-transition text-sm md:text-base"
                >
                  Clear Filters
                </button>
              </motion.div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

const ProductsPage = () => {
  return (
    <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
      <ProductsContent />
    </Suspense>
  );
};

export default ProductsPage;