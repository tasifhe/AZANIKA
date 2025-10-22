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
      className={`group relative bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-2xl transition-all duration-500 overflow-hidden border border-neutral-100 ${className}`}
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
          className="absolute top-3 md:top-4 left-3 md:left-4 bg-gradient-to-r from-blush-500 to-blush-400 text-white px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-bold rounded-lg z-10 shadow-lg"
          initial={{ scale: 0, rotate: -12 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
        >
          -{discountPercent}% OFF
        </motion.div>
      )}

      {/* Action Buttons */}
      <div className="absolute top-3 md:top-4 right-3 md:right-4 z-10 flex flex-col gap-2">
        <motion.button
          onClick={handleWishlist}
          className="p-2 md:p-2.5 glass-effect rounded-full hover:scale-110 shadow-md active:scale-95"
          aria-label="Add to wishlist"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Heart 
            size={18} 
            className={`${isWishlisted ? 'text-blush-500 fill-current' : 'text-gray-600'} md:w-5 md:h-5 transition-colors`}
          />
        </motion.button>
        
        <motion.button
          className="p-2 md:p-2.5 glass-effect rounded-full hover:scale-110 shadow-md active:scale-95"
          aria-label="Quick view"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, x: 0 }}
          transition={{ duration: 0.2, delay: 0.05 }}
        >
          <Eye size={18} className="text-gray-600 md:w-5 md:h-5" />
        </motion.button>
      </div>

      <Link href={`/product/${product.id}`}>
        {/* Image Container */}
        <div 
          className="relative h-52 sm:h-56 md:h-72 lg:h-80 overflow-hidden bg-gradient-to-br from-blush-50 to-cream-50"
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
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
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
            className="hidden md:flex absolute bottom-4 left-4 right-4 premium-gradient text-white py-3 px-4 rounded-lg items-center justify-center space-x-2 shadow-lg font-semibold hover:shadow-xl active:scale-95 smooth-transition"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
            transition={{ duration: 0.3 }}
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </motion.button>
        </div>

        {/* Product Info */}
        <div className="p-3 md:p-5">
          <h3 className="font-semibold text-neutral-900 mb-2 line-clamp-2 group-hover:text-blush-600 transition-colors text-sm md:text-base leading-snug">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1.5 mb-2 md:mb-3">
            <div className="flex gap-0.5">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={`${
                    star <= (product.rating || 0)
                      ? 'text-amber-400 fill-current'
                      : 'text-gray-300'
                  } md:w-4 md:h-4`}
                />
              ))}
            </div>
            <span className="text-xs md:text-sm text-neutral-500 font-medium">({product.reviewCount || 0})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-3">
            <span className="text-lg md:text-xl font-bold text-blush-600">
              ৳{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm md:text-base text-neutral-400 line-through">
                ৳{product.originalPrice.toLocaleString()}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">Colors:</span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color: string, index: number) => (
                  <div
                    key={index}
                    className="w-3 h-3 rounded-full border border-gray-300"
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
                  <span className="text-xs text-gray-400">+{product.colors.length - 3}</span>
                )}
              </div>
            </div>
          )}

          {/* Stock Status */}
          <div className="flex items-center justify-between mt-3 pt-3 border-t border-neutral-100">
            <div>
              {inStock ? (
                <span className="text-xs md:text-sm text-emerald-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
                  In Stock
                </span>
              ) : (
                <span className="text-xs md:text-sm text-red-600 font-semibold flex items-center gap-1">
                  <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                  Out of Stock
                </span>
              )}
            </div>
            
            {/* Mobile Add to Cart */}
            <button
              onClick={handleAddToCart}
              className="md:hidden p-2 premium-gradient text-white rounded-lg shadow-md active:scale-95 transition-transform"
              aria-label="Add to cart"
            >
              <ShoppingCart size={16} />
            </button>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductCard;
