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
    <div className={`group relative bg-white rounded-xl md:rounded-2xl shadow-md overflow-hidden hover:shadow-2xl transition-all duration-300 ${className}`}>
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute top-2 md:top-3 left-2 md:left-3 bg-gradient-to-r from-red-500 to-pink-500 text-white px-2 md:px-3 py-0.5 md:py-1 text-[10px] md:text-xs font-bold rounded-full z-10 shadow-lg">
          -{discountPercent}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 md:top-3 right-2 md:right-3 p-1.5 md:p-2.5 bg-white/90 backdrop-blur-sm rounded-full opacity-0 group-hover:opacity-100 transition-all z-10 hover:scale-110 shadow-lg"
      >
        <Heart 
          size={16} 
          className={`${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'} md:w-[18px] md:h-[18px]`}
        />
      </button>

      <Link href={`/product/${product.id}`}>
        {/* Image Container */}
        <div 
          className="relative h-48 md:h-72 overflow-hidden bg-gradient-to-br from-neutral-50 to-neutral-100"
          onMouseEnter={() => product.images && product.images.length > 1 && setCurrentImageIndex(1)}
          onMouseLeave={() => setCurrentImageIndex(0)}
        >
          <Image
            src={productImage}
            alt={product.name}
            fill
            className="object-cover transition-all duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
          />
          
          {/* Overlay gradient on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Quick Add to Cart Button - Desktop only */}
          <button
            onClick={handleAddToCart}
            className="hidden md:flex absolute bottom-4 left-4 right-4 premium-gradient text-white py-3 px-4 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 items-center justify-center space-x-2 shadow-xl font-semibold transform group-hover:translate-y-0 translate-y-2"
          >
            <ShoppingCart size={18} />
            <span>Add to Cart</span>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-2 md:p-4">
          <h3 className="font-medium text-neutral-900 mb-1 line-clamp-2 group-hover:text-primary-700 transition-colors text-xs md:text-base">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-1 md:mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={12}
                  className={`${
                    star <= (product.rating || 0)
                      ? 'text-amber-500 fill-current'
                      : 'text-gray-300'
                  } md:w-[14px] md:h-[14px]`}
                />
              ))}
            </div>
            <span className="text-[10px] md:text-xs text-neutral-500">({product.reviewCount || 0})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-1 md:space-x-2 mb-2">
            <span className="text-sm md:text-lg font-bold text-primary-700">
              ৳{typeof product.price === 'number' ? product.price.toFixed(0) : product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs md:text-sm text-neutral-500 line-through">
                ৳{product.originalPrice.toFixed(0)}
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
          <div className="mt-2">
            {inStock ? (
              <span className="text-xs text-green-600 font-medium">In Stock</span>
            ) : (
              <span className="text-xs text-red-600 font-medium">Out of Stock</span>
            )}
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ProductCard;
