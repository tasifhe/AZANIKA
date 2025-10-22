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
      console.error('Error fetching products:', error);
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
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <AnimatedContent direction="up" className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-4">
            <Link href="/" className="hover:text-blush-600 smooth-transition">Home</Link>
            <span>/</span>
            <span className="text-neutral-900">Products</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-neutral-900 capitalize">{selectedCategory}</span>
              </>
            )}
          </nav>
          
          <h1 className="text-3xl md:text-4xl font-bold text-neutral-900 bg-gradient-to-r from-blush-600 to-blush-400 bg-clip-text text-transparent">
            {selectedCategory 
              ? `${selectedCategory} Collection`
              : 'All Products'
            }
          </h1>
          <p className="text-neutral-600 mt-2 text-lg">
            {filteredAndSortedProducts.length} products found
          </p>
        </AnimatedContent>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <AnimatePresence>
            {(showFilters || !showFilters) && (
              <motion.aside 
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}
              >
                <div className="bg-white rounded-2xl p-6 shadow-lg border border-blush-100">
                  <div className="flex items-center justify-between mb-4">
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
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Search Products
                    </label>
                    <div className="relative">
                      <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search..."
                        className="w-full pl-10 pr-4 py-2.5 border border-blush-200 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 smooth-transition"
                      />
                      <Search className="absolute left-3 top-3 h-4 w-4 text-neutral-400" />
                    </div>
                  </div>

                  {/* Categories */}
                  <div className="mb-6">
                    <label className="block text-sm font-medium text-neutral-700 mb-3">
                      Category
                    </label>
                    <div className="space-y-2">
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
                  <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-3">
                  Price Range
                </label>
                <div className="space-y-3">
                  <input
                    type="range"
                    min="0"
                    max="50000"
                    value={priceRange[1]}
                    onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                    className="w-full accent-blush-500"
                  />
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>৳{priceRange[0]}</span>
                    <span>৳{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
              </motion.aside>
            )}
          </AnimatePresence>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-white rounded-xl shadow-sm border border-blush-100"
            >
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 text-neutral-700 hover:text-blush-600 smooth-transition"
                >
                  <SlidersHorizontal size={20} />
                  <span>Filters</span>
                </button>
                
                <div className="flex items-center space-x-2 bg-blush-50 p-1 rounded-lg">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded-lg smooth-transition ${viewMode === 'grid' ? 'bg-white text-blush-600 shadow-sm' : 'text-neutral-600 hover:text-blush-600'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded-lg smooth-transition ${viewMode === 'list' ? 'bg-white text-blush-600 shadow-sm' : 'text-neutral-600 hover:text-blush-600'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2.5 border border-blush-200 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 smooth-transition bg-white font-medium"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </motion.div>

            {/* Products */}
            {filteredAndSortedProducts.length > 0 ? (
              <AnimatedGrid 
                className={
                  viewMode === 'grid' 
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'space-y-6'
                }
                staggerDelay={0.08}
              >
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === 'list' ? 'flex space-x-4' : ''}
                  />
                ))}
              </AnimatedGrid>
            ) : (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center py-16"
              >
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-blush-100 to-blush-50 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-blush-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No products found</h3>
                <p className="text-neutral-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="premium-gradient text-white px-6 py-3 rounded-xl font-semibold shadow-md hover:shadow-lg smooth-transition"
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