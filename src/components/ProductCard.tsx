'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react';
import { motion } from 'framer-motion';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: any;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const { addToCart } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsWishlisted(!isWishlisted);
  };

  // Support both API format (image_url) and mock format (images array)
  const productImage = product.image_url || (product.images && product.images[0]) || '/placeholder.jpg';
  const inStock = product.stock > 0 || product.inStock;
  
  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <motion.div 
      className={`group relative bg-white rounded-lg md:rounded-xl lg:rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-neutral-100 ${className}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -8 }}
    >
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <motion.div 
          className="absolute top-2 md:top-3 lg:top-4 left-2 md:left-3 lg:left-4 bg-gradient-to-r from-gold-500 to-gold-400 text-white px-2 py-1 md:px-3 md:py-1 lg:px-4 lg:py-1.5 text-[10px] md:text-xs lg:text-sm font-bold rounded-md md:rounded-lg z-10 shadow-lg"
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          -{discountPercent}%
        </motion.div>
      )}

      {/* Action Buttons - Desktop Only */}
      <div className="hidden md:flex absolute top-3 lg:top-4 right-3 lg:right-4 z-10 flex-col gap-2">
        <motion.button
          onClick={handleWishlist}
          className="p-2 lg:p-2.5 glass-effect rounded-full hover:scale-110 shadow-md active:scale-95"
          aria-label="Add to wishlist"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Heart 
            size={18} 
            className={`${isWishlisted ? 'text-gold-500 fill-current' : 'text-gray-600'} lg:w-5 lg:h-5 transition-colors`}
          />
        </motion.button>
        
        <motion.button
          className="p-2 lg:p-2.5 glass-effect rounded-full hover:scale-110 shadow-md active:scale-95"
          aria-label="Quick view"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <Eye size={18} className="text-gray-600 lg:w-5 lg:h-5" />
        </motion.button>
      </div>

      <Link href={`/product/${product.id}`}>
        {/* Image Container */}
        <div 
          className="relative h-40 sm:h-48 md:h-56 lg:h-72 xl:h-80 overflow-hidden bg-gradient-to-br from-cream-50 to-gold-50"
        >
          <motion.div
            animate={{ scale: isHovered ? 1.08 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="w-full h-full"
          >
            <Image
              src={productImage}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              priority={false}
            />
          </motion.div>
          
          {/* Overlay gradient on hover */}
          <motion.div 
            className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            animate={{ opacity: isHovered ? 1 : 0 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Quick Add to Cart Button - Desktop only */}
          <motion.button
            onClick={handleAddToCart}
            className="hidden md:flex absolute bottom-3 lg:bottom-4 left-3 lg:left-4 right-3 lg:right-4 premium-gradient text-white py-2.5 lg:py-3 px-4 rounded-lg items-center justify-center space-x-2 shadow-lg font-semibold hover:shadow-xl active:scale-95 smooth-transition text-sm lg:text-base"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingCart size={16} className="lg:w-[18px] lg:h-[18px]" />
            <span>Add to Cart</span>
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-2.5 sm:p-3 md:p-4 lg:p-5">
          <h3 className="font-semibold text-neutral-900 mb-1.5 md:mb-2 line-clamp-2 group-hover:text-gold-600 transition-colors text-xs sm:text-sm md:text-base leading-snug min-h-[2.5rem] sm:min-h-[2.8rem]">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 md:space-x-1.5 mb-1.5 md:mb-2 lg:mb-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  className={`${
                    star <= (product.rating || 0)
                      ? 'text-amber-400 fill-current'
                      : 'text-gray-300'
                  } sm:w-3 sm:h-3 md:w-[14px] md:h-[14px] lg:w-4 lg:h-4`}
                />
              ))}
            </div>
            <span className="text-[10px] sm:text-xs md:text-sm text-neutral-500 font-medium">({product.reviewCount || 0})</span>
          </div>

          {/* Price */}
          <div className="flex items-baseline space-x-1.5 md:space-x-2 mb-2 md:mb-3">
            <span className="text-base sm:text-lg md:text-xl lg:text-2xl font-bold text-copper-600">
              ৳{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs sm:text-sm md:text-base text-neutral-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Colors - Now visible on all screens */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1 mb-2">
              <span className="text-[10px] md:text-xs text-gray-500">Colors:</span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color: string, index: number) => (
                  <div
                    key={index}
                    className="w-2.5 h-2.5 md:w-3 md:h-3 rounded-full border border-gray-300"
                    style={{ 
                      backgroundColor: color.toLowerCase() === 'white' ? '#ffffff' :
                                     color.toLowerCase() === 'black' ? '#000000' :
                                     color.toLowerCase() === 'gold' ? '#ffd700' :
                                     color.toLowerCase() === 'silver' ? '#c0c0c0' :
                                     color.toLowerCase() === 'rose gold' ? '#e8b4a0' :
                                     color.toLowerCase() === 'brown' ? '#8b4513' :
                                     color.toLowerCase() === 'tan' ? '#d2b48c' :
                                     color.toLowerCase() === 'navy' ? '#000080' :
                                     color.toLowerCase() === 'burgundy' ? '#800020' :
                                     color.toLowerCase() === 'emerald' ? '#50c878' :
                                     '#e5e7eb'
                    }}
                  />
                ))}
                {product.colors.length > 3 && (
                  <span className="text-[10px] md:text-xs text-gray-400">+{product.colors.length - 3}</span>
                )}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center justify-between mt-2 md:mt-3 pt-2 md:pt-3 border-t border-neutral-100">
            <div>
              {inStock ? (
                <span className="text-[10px] sm:text-xs md:text-sm text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-emerald-500 rounded-full"></span>
                  <span className="hidden sm:inline">In Stock</span>
                  <span className="sm:hidden">Stock</span>
                </span>
              ) : (
                <span className="text-[10px] sm:text-xs md:text-sm text-red-600 font-semibold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 md:w-2 md:h-2 bg-red-500 rounded-full"></span>
                  <span className="hidden sm:inline">Out of Stock</span>
                  <span className="sm:hidden">Out</span>
                </span>
              )}
            </div>
            
            {/* Mobile Add to Cart */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock}
              className="md:hidden p-1.5 sm:p-2 premium-gradient text-white rounded-lg shadow-md active:scale-95 transition-transform disabled:opacity-50 disabled:cursor-not-allowed"
              aria-label="Add to cart"
            >
              <ShoppingCart size={14} className="sm:w-4 sm:h-4" />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
