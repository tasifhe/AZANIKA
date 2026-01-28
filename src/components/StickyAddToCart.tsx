'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { ShoppingCart, Heart, Minus, Plus, Check, ChevronUp } from 'lucide-react';
import { useCart } from '@/lib/cart-context';
import { useWishlist, WishlistButton } from '@/components/Wishlist';

interface Product {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  image_url?: string;
  images?: string[];
  stock?: number;
  category?: string;
}

interface StickyAddToCartProps {
  product: Product;
  triggerRef: React.RefObject<HTMLElement>;
  selectedSize?: string;
  selectedColor?: string;
  onSizeClick?: () => void;
  onColorClick?: () => void;
}

const StickyAddToCart: React.FC<StickyAddToCartProps> = ({
  product,
  triggerRef,
  selectedSize,
  selectedColor,
  onSizeClick,
  onColorClick,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();
  
  const inStock = (product.stock || 0) > 0;
  const image = product.image_url || (product.images && product.images[0]) || '';
  const discountPercent = product.originalPrice 
    ? Math.round((1 - product.price / product.originalPrice) * 100) 
    : 0;

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when the trigger element is NOT in view
        setIsVisible(!entry.isIntersecting);
      },
      {
        threshold: 0,
        rootMargin: '-100px 0px 0px 0px', // Account for sticky header
      }
    );

    if (triggerRef.current) {
      observer.observe(triggerRef.current);
    }

    return () => observer.disconnect();
  }, [triggerRef]);

  const handleAddToCart = async () => {
    if (!inStock || isAdding) return;

    setIsAdding(true);
    
    // Simulate adding to cart
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart({
      id: product.id,
      name: product.name,
      price: product.price,
      images: [image],
      quantity: quantity,
      size: selectedSize,
      color: selectedColor,
    } as any);

    setIsAdding(false);
    setJustAdded(true);
    
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <>
      {/* Desktop Sticky Bar */}
      <div className="hidden md:block fixed bottom-0 left-0 right-0 z-50 transform transition-transform duration-300 animate-slide-up">
        <div className="bg-white/95 backdrop-blur-lg border-t border-pearl-200 shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
          <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
            <div className="flex items-center justify-between gap-6">
              {/* Product Info */}
              <div className="flex items-center gap-4 min-w-0">
                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-pearl-100 flex-shrink-0 shadow-sm">
                  {image && (
                    <Image
                      src={image}
                      alt={product.name}
                      fill
                      className="object-cover"
                      sizes="64px"
                    />
                  )}
                </div>
                <div className="min-w-0">
                  <h3 className="font-display font-semibold text-pearl-900 truncate">
                    {product.name}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-lg font-bold text-brand-600">
                      ৳{product.price.toLocaleString()}
                    </span>
                    {product.originalPrice && (
                      <>
                        <span className="text-sm text-pearl-400 line-through">
                          ৳{product.originalPrice.toLocaleString()}
                        </span>
                        <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                          -{discountPercent}%
                        </span>
                      </>
                    )}
                  </div>
                </div>
              </div>

              {/* Options */}
              <div className="flex items-center gap-4">
                {/* Size selector */}
                {selectedSize && onSizeClick && (
                  <button
                    onClick={onSizeClick}
                    className="px-4 py-2 border border-pearl-200 rounded-lg text-sm font-medium text-pearl-700 hover:border-brand-400 hover:text-brand-600 transition-colors"
                  >
                    Size: <span className="font-semibold">{selectedSize}</span>
                  </button>
                )}

                {/* Color indicator */}
                {selectedColor && onColorClick && (
                  <button
                    onClick={onColorClick}
                    className="flex items-center gap-2 px-4 py-2 border border-pearl-200 rounded-lg text-sm font-medium text-pearl-700 hover:border-brand-400 hover:text-brand-600 transition-colors"
                  >
                    Color: <span className="font-semibold">{selectedColor}</span>
                  </button>
                )}

                {/* Quantity */}
                <div className="flex items-center border border-pearl-200 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-2 hover:bg-pearl-50 transition-colors rounded-l-lg"
                    aria-label="Decrease quantity"
                  >
                    <Minus size={16} className="text-pearl-600" />
                  </button>
                  <span className="px-4 font-semibold text-pearl-900 min-w-[3rem] text-center">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-2 hover:bg-pearl-50 transition-colors rounded-r-lg"
                    aria-label="Increase quantity"
                  >
                    <Plus size={16} className="text-pearl-600" />
                  </button>
                </div>

                {/* Wishlist */}
                <WishlistButton
                  product={product as any}
                  className="p-3 border border-pearl-200 rounded-lg hover:border-blush-400 hover:bg-blush-50 transition-all"
                />

                {/* Add to Cart */}
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock || isAdding}
                  className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 shadow-lg hover:shadow-xl ${
                    justAdded
                      ? 'bg-green-500 text-white'
                      : inStock
                      ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white'
                      : 'bg-pearl-200 text-pearl-500 cursor-not-allowed'
                  }`}
                >
                  {justAdded ? (
                    <>
                      <Check size={18} />
                      Added!
                    </>
                  ) : isAdding ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      Adding...
                    </>
                  ) : (
                    <>
                      <ShoppingCart size={18} />
                      Add to Cart
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50 animate-slide-up">
        <div className="bg-white/95 backdrop-blur-lg border-t border-pearl-200 shadow-[0_-4px_30px_rgba(0,0,0,0.1)]">
          {/* Quick info row */}
          <div className="flex items-center justify-between px-4 py-2 border-b border-pearl-100">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-lg overflow-hidden bg-pearl-100 flex-shrink-0">
                {image && (
                  <Image
                    src={image}
                    alt={product.name}
                    fill
                    className="object-cover"
                    sizes="40px"
                  />
                )}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-medium text-pearl-900 truncate max-w-[150px]">
                  {product.name}
                </p>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold text-brand-600">
                    ৳{product.price.toLocaleString()}
                  </span>
                  {discountPercent > 0 && (
                    <span className="text-xs font-bold text-green-600">
                      -{discountPercent}%
                    </span>
                  )}
                </div>
              </div>
            </div>

            {/* Scroll to top */}
            <button
              onClick={scrollToTop}
              className="p-2 text-pearl-500 hover:text-brand-600 transition-colors"
              aria-label="Scroll to top"
            >
              <ChevronUp size={20} />
            </button>
          </div>

          {/* Action row */}
          <div className="flex items-center gap-3 p-4">
            {/* Quantity - compact */}
            <div className="flex items-center border border-pearl-200 rounded-lg">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="p-2 hover:bg-pearl-50 transition-colors"
                aria-label="Decrease quantity"
              >
                <Minus size={16} />
              </button>
              <span className="px-3 font-semibold min-w-[2rem] text-center">{quantity}</span>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="p-2 hover:bg-pearl-50 transition-colors"
                aria-label="Increase quantity"
              >
                <Plus size={16} />
              </button>
            </div>

            {/* Wishlist */}
            <WishlistButton
              product={product as any}
              className="p-3 border border-pearl-200 rounded-lg hover:border-blush-400"
            />

            {/* Add to Cart - full width */}
            <button
              onClick={handleAddToCart}
              disabled={!inStock || isAdding}
              className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-lg font-semibold transition-all duration-300 ${
                justAdded
                  ? 'bg-green-500 text-white'
                  : inStock
                  ? 'bg-gradient-to-r from-brand-500 to-brand-600 text-white shadow-lg'
                  : 'bg-pearl-200 text-pearl-500 cursor-not-allowed'
              }`}
            >
              {justAdded ? (
                <>
                  <Check size={18} />
                  Added!
                </>
              ) : isAdding ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <ShoppingCart size={18} />
                  Add to Cart
                </>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Spacer to prevent content from being hidden behind sticky bar */}
      <div className="h-[140px] md:h-[88px]" />
    </>
  );
};

export default StickyAddToCart;
