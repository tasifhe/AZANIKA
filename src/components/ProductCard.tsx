'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: any;
  className?: string;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, className = '' }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
    <div className={`group relative bg-white rounded-xl md:rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden border border-neutral-100 ${className}`}>
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute top-3 md:top-4 left-3 md:left-4 bg-gradient-to-r from-blush-500 to-blush-400 text-white px-3 md:px-4 py-1 md:py-1.5 text-xs md:text-sm font-bold rounded-lg z-10 shadow-lg">
          -{discountPercent}% OFF
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-3 md:top-4 right-3 md:right-4 p-2 md:p-2.5 bg-white/95 backdrop-blur-sm rounded-full opacity-0 md:opacity-0 md:group-hover:opacity-100 transition-all z-10 hover:scale-110 shadow-md active:scale-95"
        aria-label="Add to wishlist"
      >
        <Heart 
          size={18} 
          className={`${isWishlisted ? 'text-blush-500 fill-current' : 'text-gray-600'} md:w-5 md:h-5`}
        />
      </button>

      <Link href={`/product/${product.id}`}>
        {/* Image Container */}
        <div 
          className="relative h-52 sm:h-56 md:h-72 lg:h-80 overflow-hidden bg-gradient-to-br from-blush-50 to-cream-50"
          onMouseEnter={() => product.images && product.images.length > 1 && setCurrentImageIndex(1)}
          onMouseLeave={() => setCurrentImageIndex(0)}
        >
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            priority={false}
          />
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Quick Add to Cart Button - Desktop only */}
          <button
            onClick={handleAddToCart}
            className="hidden md:flex absolute bottom-4 left-4 right-4 premium-gradient text-white py-3 px-4 rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center space-x-2 shadow-lg font-semibold transform group-hover:translate-y-0 translate-y-2 hover:shadow-xl active:scale-95"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
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
    </div>
  );
};

export default ProductCard;
