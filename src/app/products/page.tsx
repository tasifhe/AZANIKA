'use client';

import React, { useState, useMemo, Suspense, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Filter, Search, Grid, List, SlidersHorizontal } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
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
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-4">
            <Link href="/" className="hover:text-primary-600">Home</Link>
            <span>/</span>
            <span className="text-neutral-900">Products</span>
            {selectedCategory && (
              <>
                <span>/</span>
                <span className="text-neutral-900 capitalize">{selectedCategory}</span>
              </>
            )}
          </nav>
          
          <h1 className="text-3xl font-bold text-neutral-900">
            {selectedCategory 
              ? `${selectedCategory} Collection`
              : 'All Products'
            }
          </h1>
          <p className="text-neutral-600 mt-2">
            {filteredAndSortedProducts.length} products found
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <aside className={`lg:w-64 space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-cream-50 rounded-lg p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-neutral-900">Filters</h3>
                <button
                  onClick={clearFilters}
                  className="text-sm text-primary-600 hover:text-primary-700"
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
                    className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                  />
                  <Search className="absolute left-3 top-2.5 h-4 w-4 text-neutral-400" />
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
                    className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                      !selectedCategory 
                        ? 'bg-primary-100 text-primary-700 font-medium' 
                        : 'text-neutral-700 hover:bg-neutral-100'
                    }`}
                  >
                    All Categories
                  </button>
                  {categories.map((category) => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`block w-full text-left px-3 py-2 rounded-md text-sm ${
                        selectedCategory === category
                          ? 'bg-primary-100 text-primary-700 font-medium'
                          : 'text-neutral-700 hover:bg-neutral-100'
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
                    className="w-full"
                  />
                  <div className="flex justify-between text-sm text-neutral-600">
                    <span>৳{priceRange[0]}</span>
                    <span>৳{priceRange[1]}</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 p-4 bg-cream-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden flex items-center space-x-2 text-neutral-700"
                >
                  <SlidersHorizontal size={20} />
                  <span>Filters</span>
                </button>
                
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setViewMode('grid')}
                    className={`p-2 rounded ${viewMode === 'grid' ? 'bg-primary-100 text-primary-600' : 'text-neutral-600'}`}
                  >
                    <Grid size={20} />
                  </button>
                  <button
                    onClick={() => setViewMode('list')}
                    className={`p-2 rounded ${viewMode === 'list' ? 'bg-primary-100 text-primary-600' : 'text-neutral-600'}`}
                  >
                    <List size={20} />
                  </button>
                </div>
              </div>

              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
              >
                <option value="featured">Featured</option>
                <option value="newest">Newest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Highest Rated</option>
              </select>
            </div>

            {/* Products */}
            {filteredAndSortedProducts.length > 0 ? (
              <div className={
                viewMode === 'grid' 
                  ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                  : 'space-y-6'
              }>
                {filteredAndSortedProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product}
                    className={viewMode === 'list' ? 'flex space-x-4' : ''}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="w-24 h-24 mx-auto mb-4 bg-neutral-100 rounded-full flex items-center justify-center">
                  <Search className="w-8 h-8 text-neutral-400" />
                </div>
                <h3 className="text-lg font-medium text-neutral-900 mb-2">No products found</h3>
                <p className="text-neutral-600 mb-4">
                  Try adjusting your search or filter criteria
                </p>
                <button
                  onClick={clearFilters}
                  className="premium-gradient text-white px-6 py-2 rounded-lg font-medium"
                >
                  Clear Filters
                </button>
              </div>
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