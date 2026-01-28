'use client';

import React, { useState, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { X, ShoppingCart, Star, Minus, Plus, Truck, Shield, Package, ChevronLeft, ChevronRight, Check } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useCart } from '@/lib/cart-context';
import { WishlistButton } from './Wishlist';

interface QuickViewProps {
  product: any;
  isOpen: boolean;
  onClose: () => void;
}

const QuickView: React.FC<QuickViewProps> = ({ product, isOpen, onClose }) => {
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [currentImage, setCurrentImage] = useState(0);
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const { addToCart } = useCart();

  if (!product) return null;

  const productImage = product.image_url || (product.images && product.images[0]) || '/placeholder.jpg';
  const images = product.images || [productImage];
  const inStock = product.stock > 0 || product.inStock;

  const handleAddToCart = async () => {
    if (!inStock || isAdding) return;
    
    setIsAdding(true);
    await new Promise(resolve => setTimeout(resolve, 300));
    
    addToCart({
      ...product,
      quantity,
      selectedSize,
      selectedColor,
    });
    
    setIsAdding(false);
    setJustAdded(true);
    
    setTimeout(() => {
      setJustAdded(false);
      onClose();
    }, 1200);
  };

  const discountPercent = product.originalPrice
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  const nextImage = () => setCurrentImage((prev) => (prev + 1) % images.length);
  const prevImage = () => setCurrentImage((prev) => (prev - 1 + images.length) % images.length);

  // Mock sizes and colors - in production these would come from the API
  const sizes = ['XS', 'S', 'M', 'L', 'XL'];
  const colors = [
    { name: 'Rose Gold', hex: '#d4a574' },
    { name: 'Champagne', hex: '#f2d4a8' },
    { name: 'Blush', hex: '#ea6280' },
    { name: 'Pearl', hex: '#f5f5f4' },
  ];

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={onClose}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black/50 backdrop-blur-sm" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-end md:items-center justify-center md:p-4">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-full md:translate-y-0 md:scale-95"
              enterTo="opacity-100 translate-y-0 md:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 md:scale-100"
              leaveTo="opacity-0 translate-y-full md:translate-y-0 md:scale-95"
            >
              <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-t-3xl md:rounded-2xl bg-white shadow-2xl transition-all max-h-[95vh] md:max-h-[90vh] flex flex-col">
                {/* Header - Mobile optimized */}
                <div className="sticky top-0 z-20 bg-white border-b border-pearl-100 px-4 py-3 md:py-4 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Mobile drag indicator */}
                    <div className="md:hidden w-10 h-1 bg-pearl-300 rounded-full absolute left-1/2 -translate-x-1/2 top-1.5" />
                    <Dialog.Title className="font-display font-bold text-lg md:text-xl text-pearl-900 truncate max-w-[200px] md:max-w-none">
                      Quick View
                    </Dialog.Title>
                  </div>
                  <button
                    onClick={onClose}
                    className="p-2 rounded-full hover:bg-pearl-100 transition-colors"
                    aria-label="Close"
                  >
                    <X size={22} className="text-pearl-600" />
                  </button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto overscroll-contain">
                  <div className="grid md:grid-cols-2 gap-4 md:gap-6 p-4 md:p-6">
                    {/* Left: Images - Mobile optimized */}
                    <div className="space-y-3">
                      {/* Main Image with Navigation */}
                      <div className="relative aspect-square rounded-xl md:rounded-2xl overflow-hidden bg-pearl-50 group">
                        <Image
                          src={images[currentImage]}
                          alt={product.name}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, 50vw"
                          priority
                        />
                        
                        {/* Discount Badge */}
                        {discountPercent > 0 && (
                          <div className="absolute top-3 left-3 bg-gradient-to-r from-blush-500 to-blush-600 text-white text-xs font-bold px-2.5 py-1 rounded-full shadow-md">
                            -{discountPercent}%
                          </div>
                        )}

                        {/* Image Navigation Arrows */}
                        {images.length > 1 && (
                          <>
                            <button
                              onClick={prevImage}
                              className="absolute left-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity"
                              aria-label="Previous image"
                            >
                              <ChevronLeft size={18} className="text-pearl-700" />
                            </button>
                            <button
                              onClick={nextImage}
                              className="absolute right-2 top-1/2 -translate-y-1/2 p-2 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 md:opacity-100 transition-opacity"
                              aria-label="Next image"
                            >
                              <ChevronRight size={18} className="text-pearl-700" />
                            </button>
                          </>
                        )}

                        {/* Image Counter - Mobile friendly */}
                        {images.length > 1 && (
                          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-pearl-700 shadow-md">
                            {currentImage + 1} / {images.length}
                          </div>
                        )}
                      </div>

                      {/* Thumbnails - Horizontal scroll on mobile */}
                      {images.length > 1 && (
                        <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                          {images.map((img: string, idx: number) => (
                            <button
                              key={idx}
                              onClick={() => setCurrentImage(idx)}
                              className={`relative w-16 h-16 md:w-18 md:h-18 flex-shrink-0 rounded-lg overflow-hidden border-2 transition-all ${
                                currentImage === idx
                                  ? 'border-brand-500 ring-1 ring-brand-300'
                                  : 'border-pearl-200 hover:border-brand-300'
                              }`}
                            >
                              <Image
                                src={img}
                                alt={`${product.name} ${idx + 1}`}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </button>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Right: Product Details - Mobile optimized */}
                    <div className="space-y-4 md:space-y-5">
                      {/* Title & Category */}
                      <div>
                        <span className="text-xs font-semibold text-brand-600 uppercase tracking-wider">
                          {product.category}
                        </span>
                        <h2 className="text-xl md:text-2xl font-display font-bold text-pearl-900 mt-1 leading-tight">
                          {product.name}
                        </h2>
                        
                        {/* Rating - compact */}
                        <div className="flex items-center gap-2 mt-2">
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
                          <span className="text-xs text-pearl-500">
                            ({product.reviewCount || 0} reviews)
                          </span>
                        </div>
                      </div>

                      {/* Price - Prominent */}
                      <div className="flex items-baseline gap-2 flex-wrap">
                        <span className="text-2xl md:text-3xl font-bold text-brand-600">
                          ৳{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                        </span>
                        {product.originalPrice && (
                          <>
                            <span className="text-base text-pearl-400 line-through">
                              ৳{product.originalPrice.toLocaleString()}
                            </span>
                            <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                              Save {discountPercent}%
                            </span>
                          </>
                        )}
                      </div>

                      {/* Description - Shorter on mobile */}
                      <p className="text-sm md:text-base text-pearl-600 leading-relaxed line-clamp-2 md:line-clamp-3">
                        {product.description || 'Elegant fashion accessory crafted with attention to detail. Perfect for any occasion.'}
                      </p>

                      {/* Size Selection - Horizontal scroll on mobile */}
                      {product.category !== 'Jewelry' && (
                        <div>
                          <label className="block text-sm font-semibold text-pearl-800 mb-2">
                            Size
                          </label>
                          <div className="flex gap-2 overflow-x-auto pb-1 scrollbar-hide">
                            {sizes.map((size) => (
                              <button
                                key={size}
                                onClick={() => setSelectedSize(size)}
                                className={`px-4 py-2 min-w-[44px] border-2 rounded-lg font-medium text-sm transition-all flex-shrink-0 ${
                                  selectedSize === size
                                    ? 'border-brand-500 bg-brand-50 text-brand-700'
                                    : 'border-pearl-200 hover:border-brand-300 text-pearl-700'
                                }`}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Color Selection - Compact */}
                      <div>
                        <label className="block text-sm font-semibold text-pearl-800 mb-2">
                          Color {selectedColor && <span className="font-normal text-pearl-500">— {selectedColor}</span>}
                        </label>
                        <div className="flex gap-2">
                          {colors.map((color) => (
                            <button
                              key={color.name}
                              onClick={() => setSelectedColor(color.name)}
                              className={`relative w-9 h-9 md:w-10 md:h-10 rounded-full border-2 transition-all ${
                                selectedColor === color.name
                                  ? 'border-brand-500 scale-110 ring-2 ring-brand-200'
                                  : 'border-pearl-300 hover:border-brand-300 hover:scale-105'
                              }`}
                              title={color.name}
                            >
                              <span
                                className="absolute inset-1 rounded-full"
                                style={{ backgroundColor: color.hex }}
                              />
                              {selectedColor === color.name && (
                                <Check size={14} className="absolute inset-0 m-auto text-white drop-shadow-sm" />
                              )}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity & Stock - Inline on mobile */}
                      <div className="flex items-center justify-between gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-pearl-800 mb-2">
                            Quantity
                          </label>
                          <div className="flex items-center border-2 border-pearl-200 rounded-lg">
                            <button
                              onClick={() => setQuantity(Math.max(1, quantity - 1))}
                              className="p-2.5 hover:bg-pearl-50 transition-colors"
                              aria-label="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span className="px-4 md:px-5 font-semibold text-pearl-900 min-w-[2.5rem] text-center">
                              {quantity}
                            </span>
                            <button
                              onClick={() => setQuantity(quantity + 1)}
                              className="p-2.5 hover:bg-pearl-50 transition-colors"
                              aria-label="Increase quantity"
                            >
                              <Plus size={16} />
                            </button>
                          </div>
                        </div>
                        
                        {inStock ? (
                          <span className="text-sm text-green-600 font-medium flex items-center gap-1.5 mt-6">
                            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                            In Stock
                          </span>
                        ) : (
                          <span className="text-sm text-pearl-500 font-medium mt-6">
                            Out of Stock
                          </span>
                        )}
                      </div>

                      {/* Features - Compact row */}
                      <div className="flex items-center justify-between gap-2 py-3 border-y border-pearl-100">
                        <div className="flex items-center gap-1.5 text-pearl-600">
                          <Truck size={16} className="text-brand-500" />
                          <span className="text-xs">Free Shipping</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-pearl-600">
                          <Shield size={16} className="text-brand-500" />
                          <span className="text-xs">Secure</span>
                        </div>
                        <div className="flex items-center gap-1.5 text-pearl-600">
                          <Package size={16} className="text-brand-500" />
                          <span className="text-xs">Easy Returns</span>
                        </div>
                      </div>

                      {/* View Full Details - Link */}
                      <Link
                        href={`/product/${product.id}`}
                        onClick={onClose}
                        className="block text-center text-sm text-brand-600 font-medium hover:text-brand-700 transition-colors py-1"
                      >
                        View Full Product Details →
                      </Link>
                    </div>
                  </div>
                </div>

                {/* Sticky Bottom Actions - Mobile optimized */}
                <div className="sticky bottom-0 bg-white border-t border-pearl-200 p-4 md:p-5 shadow-[0_-4px_20px_rgba(0,0,0,0.08)]">
                  <div className="flex gap-3">
                    <WishlistButton
                      product={product}
                      className="p-3.5 border-2 border-pearl-200 rounded-xl hover:border-blush-400 hover:bg-blush-50 transition-all"
                    />
                    <button
                      onClick={handleAddToCart}
                      disabled={!inStock || isAdding}
                      className={`flex-1 py-3.5 md:py-4 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all duration-300 ${
                        justAdded
                          ? 'bg-green-500 text-white'
                          : inStock
                          ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-lg hover:shadow-xl active:scale-[0.98]'
                          : 'bg-pearl-200 text-pearl-500 cursor-not-allowed'
                      }`}
                    >
                      {justAdded ? (
                        <>
                          <Check size={20} />
                          <span>Added to Cart!</span>
                        </>
                      ) : isAdding ? (
                        <>
                          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          <span>Adding...</span>
                        </>
                      ) : (
                        <>
                          <ShoppingCart size={20} />
                          <span>Add to Cart — ৳{(product.price * quantity).toLocaleString()}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default QuickView;
