'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Heart, ShoppingCart, Star } from 'lucide-react';
import { Product } from '@/types';
import { useCart } from '@/lib/cart-context';

interface ProductCardProps {
  product: Product;
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

  const discountPercent = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <div className={`group relative bg-white rounded-lg shadow-md overflow-hidden card-hover ${className}`}>
      {/* Discount Badge */}
      {discountPercent > 0 && (
        <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 text-xs font-bold rounded z-10">
          -{discountPercent}%
        </div>
      )}

      {/* Wishlist Button */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 p-2 bg-white/80 rounded-full opacity-0 group-hover:opacity-100 transition-opacity z-10"
      >
        <Heart 
          size={16} 
          className={`${isWishlisted ? 'text-red-500 fill-current' : 'text-gray-600'}`}
        />
      </button>

      <Link href={`/product/${product.id}`}>
        {/* Image Container */}
        <div 
          className="relative h-64 overflow-hidden bg-gray-100"
          onMouseEnter={() => product.images.length > 1 && setCurrentImageIndex(1)}
          onMouseLeave={() => setCurrentImageIndex(0)}
        >
          <Image
            src={product.images[currentImageIndex] || product.images[0]}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Quick Add to Cart Button */}
          <button
            onClick={handleAddToCart}
            className="absolute bottom-2 left-2 right-2 premium-gradient text-white py-2 px-4 rounded opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-2 elegant-shadow"
          >
            <ShoppingCart size={16} />
            <span className="text-sm font-medium">Quick Add</span>
          </button>
        </div>

        {/* Product Info */}
        <div className="p-4">
          <h3 className="font-medium text-neutral-900 mb-1 line-clamp-2 group-hover:text-primary-600 transition-colors">
            {product.name}
          </h3>
          
          {/* Rating */}
          <div className="flex items-center space-x-1 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={14}
                  className={
                    star <= product.rating
                      ? 'text-yellow-400 fill-current'
                      : 'text-gray-300'
                  }
                />
              ))}
            </div>
            <span className="text-xs text-neutral-500">({product.reviewCount})</span>
          </div>

          {/* Price */}
          <div className="flex items-center space-x-2 mb-2">
            <span className="text-lg font-bold text-neutral-900">
              ${product.price.toFixed(2)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-neutral-500 line-through">
                ${product.originalPrice.toFixed(2)}
              </span>
            )}
          </div>

          {/* Colors */}
          {product.colors && product.colors.length > 0 && (
            <div className="flex items-center space-x-1">
              <span className="text-xs text-gray-500">Colors:</span>
              <div className="flex space-x-1">
                {product.colors.slice(0, 3).map((color, index) => (
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
            {product.inStock ? (
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
