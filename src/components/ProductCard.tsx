'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star, Eye, Sparkles } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { WishlistButton } from './Wishlist';
import QuickView from './QuickView';

interface ProductCardProps {
  product: any;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [showQuickView, setShowQuickView] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  // Support both API format (image_url) and mock format (images array)
  const productImage = product.image_url || (product.images && product.images[0]) || '/placeholder.jpg';
  const inStock = product.stock > 0 || product.inStock;
  
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const isNew = product.isNew || product.featured;
  const isExclusive = product.isExclusive || false;

  return (
    <>
      <div 
        className={`group relative bg-white rounded-2xl shadow-soft hover:shadow-xl transition-all duration-500 overflow-hidden border border-pearl-100 hover:border-brand-200 ${className}`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Badges */}
        <div className="absolute top-3 left-3 z-10 flex flex-col gap-2">
          {discountPercent > 0 && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-blush-500 to-blush-600 text-white shadow-sm">
              -{discountPercent}% OFF
            </div>
          )}
          {isNew && (
            <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-sm">
              <Sparkles size={12} />
              NEW
            </div>
          )}
          {isExclusive && (
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-gold-500 to-gold-600 text-pearl-900 shadow-sm">
              EXCLUSIVE
            </div>
          )}
        </div>

        {/* Wishlist Button */}
        <div className="absolute top-3 right-3 z-10">
          <WishlistButton
            product={product}
            className="p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-sm hover:shadow-md hover:bg-white transition-all"
          />
        </div>

        <Link href={`/product/${product.id}`}>
          {/* Image Container */}
          <div className="relative h-56 md:h-72 lg:h-80 overflow-hidden bg-pearl-50">
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
            
            {/* Overlay on hover */}
            <div className={`absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
            
            {/* Quick Actions - Shows on hover for desktop */}
            <div className="absolute bottom-4 left-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 translate-y-4 group-hover:translate-y-0 transition-all duration-300">
              <button
                onClick={handleAddToCart}
                disabled={!inStock}
                className="flex-1 bg-white hover:bg-brand-500 text-pearl-900 hover:text-white py-3 px-4 rounded-xl flex items-center justify-center gap-2 font-semibold text-sm shadow-lg transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ShoppingCart size={16} />
                <span className="hidden sm:inline">Add to Cart</span>
              </button>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  setShowQuickView(true);
                }}
                className="bg-white hover:bg-brand-50 text-pearl-900 py-3 px-4 rounded-xl flex items-center justify-center shadow-lg transition-all duration-300"
                aria-label="Quick view"
              >
                <Eye size={18} />
              </button>
            </div>
          </div>

          {/* Product Info */}
          <div className="p-4 md:p-5">
            {/* Category */}
            <p className="text-xs font-semibold text-brand-600 uppercase tracking-wider mb-1">
              {product.category}
            </p>
            
            <h3 className="font-display font-semibold text-pearl-900 mb-2 line-clamp-2 text-base md:text-lg min-h-[3rem] group-hover:text-brand-700 transition-colors">
              {product.name}
            </h3>
            
            {/* Rating */}
            <div className="flex items-center gap-2 mb-3">
              <div className="flex gap-0.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={14}
                    className={`${
                      star <= (product.rating || 0)
                        ? 'text-brand-500 fill-current'
                        : 'text-pearl-300'
                    }`}
                  />
                ))}
              </div>
              <span className="text-xs text-pearl-500">({product.reviewCount || 0})</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-xl md:text-2xl font-bold text-brand-600 font-display">
                ৳{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-pearl-400 line-through">
                  ৳{product.originalPrice.toLocaleString()}
                </span>
              )}
            </div>

            {/* Stock Status & Mobile CTA */}
            <div className="flex items-center justify-between pt-3 border-t border-pearl-100">
              {inStock ? (
                <span className="text-xs text-green-600 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                  In Stock
                </span>
              ) : (
                <span className="text-xs text-pearl-400 font-semibold flex items-center gap-1.5">
                  <span className="w-2 h-2 bg-pearl-300 rounded-full"></span>
                  Out of Stock
                </span>
              )}
              
              {/* Mobile Add to Cart */}
              <div className="md:hidden flex gap-2">
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setShowQuickView(true);
                  }}
                  className="p-2 bg-brand-50 text-brand-700 rounded-lg shadow-sm transition-all hover:bg-brand-100"
                  aria-label="Quick view"
                >
                  <Eye size={16} />
                </button>
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className="p-2 bg-gradient-to-r from-brand-500 to-brand-600 text-white rounded-lg shadow-md transition-all hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={16} />
                </button>
              </div>
            </div>
          </div>
        </Link>

        {/* Shimmer effect on hover */}
        <div className="absolute inset-0 shimmer-effect opacity-0 group-hover:opacity-20 pointer-events-none" />
      </div>

      {/* Quick View Modal */}
      <QuickView
        product={product}
        isOpen={showQuickView}
        onClose={() => setShowQuickView(false)}
      />
    </>
  );
};

export default ProductCard;
