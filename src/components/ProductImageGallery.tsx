'use client';

import React, { useState, useRef, useCallback } from 'react';
import Image from 'next/image';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, X, Expand } from 'lucide-react';
import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ProductImageGalleryProps {
  images: string[];
  productName: string;
}

const ProductImageGallery: React.FC<ProductImageGalleryProps> = ({ images, productName }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isZoomed, setIsZoomed] = useState(false);
  const [zoomPosition, setZoomPosition] = useState({ x: 50, y: 50 });
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const imageContainerRef = useRef<HTMLDivElement>(null);

  // Ensure we have at least one image
  const galleryImages = images && images.length > 0 
    ? images 
    : ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85'];

  const goToImage = useCallback((index: number) => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setIsZoomed(false);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning]);

  const nextImage = useCallback(() => {
    goToImage((currentIndex + 1) % galleryImages.length);
  }, [currentIndex, galleryImages.length, goToImage]);

  const prevImage = useCallback(() => {
    goToImage((currentIndex - 1 + galleryImages.length) % galleryImages.length);
  }, [currentIndex, galleryImages.length, goToImage]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return;
    
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x, y });
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!isZoomed || !imageContainerRef.current) return;
    
    const touch = e.touches[0];
    const rect = imageContainerRef.current.getBoundingClientRect();
    const x = ((touch.clientX - rect.left) / rect.width) * 100;
    const y = ((touch.clientY - rect.top) / rect.height) * 100;
    
    setZoomPosition({ x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) });
  };

  const toggleZoom = () => {
    setIsZoomed(!isZoomed);
    if (!isZoomed) {
      setZoomPosition({ x: 50, y: 50 });
    }
  };

  // Keyboard navigation
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isLightboxOpen) {
        if (e.key === 'ArrowLeft') prevImage();
        if (e.key === 'ArrowRight') nextImage();
        if (e.key === 'Escape') setIsLightboxOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isLightboxOpen, nextImage, prevImage]);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group">
        <div
          ref={imageContainerRef}
          className={`relative aspect-square bg-pearl-100 rounded-2xl overflow-hidden shadow-elegant ${
            isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'
          }`}
          onClick={toggleZoom}
          onMouseMove={handleMouseMove}
          onTouchMove={handleTouchMove}
          onMouseLeave={() => isZoomed && setIsZoomed(false)}
        >
          {/* Image with zoom effect */}
          <div
            className={`relative w-full h-full transition-transform duration-300 ${
              isZoomed ? 'scale-[2.5]' : 'scale-100'
            }`}
            style={isZoomed ? {
              transformOrigin: `${zoomPosition.x}% ${zoomPosition.y}%`
            } : undefined}
          >
            {galleryImages.map((image, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-opacity duration-300 ${
                  index === currentIndex ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <Image
                  src={image}
                  alt={`${productName} - Image ${index + 1}`}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Zoom indicator */}
          <div className={`absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-2 flex items-center gap-2 shadow-lg transition-opacity duration-300 ${
            isZoomed ? 'opacity-0' : 'opacity-0 group-hover:opacity-100'
          }`}>
            <ZoomIn size={16} className="text-pearl-700" />
            <span className="text-sm font-medium text-pearl-700">Click to zoom</span>
          </div>

          {/* Fullscreen button */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLightboxOpen(true);
            }}
            className="absolute top-4 right-4 p-2.5 bg-white/90 backdrop-blur-sm rounded-lg shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
            aria-label="View fullscreen"
          >
            <Expand size={18} className="text-pearl-700" />
          </button>

          {/* Navigation arrows */}
          {galleryImages.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                aria-label="Previous image"
              >
                <ChevronLeft size={20} className="text-pearl-700" />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-2.5 bg-white/90 backdrop-blur-sm rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-white hover:scale-110"
                aria-label="Next image"
              >
                <ChevronRight size={20} className="text-pearl-700" />
              </button>
            </>
          )}

          {/* Image counter */}
          {galleryImages.length > 1 && (
            <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-lg">
              <span className="text-sm font-semibold text-pearl-900">
                {currentIndex + 1}
              </span>
              <span className="text-sm text-pearl-500"> / {galleryImages.length}</span>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails */}
      {galleryImages.length > 1 && (
        <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-thin">
          {galleryImages.map((image, index) => (
            <button
              key={index}
              onClick={() => goToImage(index)}
              className={`relative flex-shrink-0 w-20 h-20 md:w-24 md:h-24 rounded-xl overflow-hidden transition-all duration-300 ${
                index === currentIndex
                  ? 'ring-2 ring-brand-500 ring-offset-2 scale-105'
                  : 'opacity-60 hover:opacity-100 hover:ring-2 hover:ring-pearl-300'
              }`}
              aria-label={`View image ${index + 1}`}
            >
              <Image
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                fill
                className="object-cover"
                sizes="96px"
              />
              {/* Active indicator */}
              {index === currentIndex && (
                <div className="absolute inset-0 bg-brand-500/10" />
              )}
            </button>
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      <Transition appear show={isLightboxOpen} as={Fragment}>
        <Dialog as="div" className="relative z-[100]" onClose={() => setIsLightboxOpen(false)}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black/95" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-hidden">
            <div className="flex min-h-full items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="relative w-full max-w-5xl">
                  {/* Close button */}
                  <button
                    onClick={() => setIsLightboxOpen(false)}
                    className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors z-10"
                    aria-label="Close lightbox"
                  >
                    <X size={28} />
                  </button>

                  {/* Main lightbox image */}
                  <div className="relative aspect-square md:aspect-[4/3] rounded-lg overflow-hidden">
                    {galleryImages.map((image, index) => (
                      <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-500 ${
                          index === currentIndex ? 'opacity-100' : 'opacity-0'
                        }`}
                      >
                        <Image
                          src={image}
                          alt={`${productName} - Image ${index + 1}`}
                          fill
                          className="object-contain"
                          sizes="100vw"
                          priority
                        />
                      </div>
                    ))}
                  </div>

                  {/* Lightbox navigation */}
                  {galleryImages.length > 1 && (
                    <>
                      <button
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
                        aria-label="Previous image"
                      >
                        <ChevronLeft size={28} className="text-white" />
                      </button>
                      <button
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 bg-white/10 backdrop-blur-sm rounded-full hover:bg-white/20 transition-all"
                        aria-label="Next image"
                      >
                        <ChevronRight size={28} className="text-white" />
                      </button>
                    </>
                  )}

                  {/* Lightbox thumbnails */}
                  {galleryImages.length > 1 && (
                    <div className="flex justify-center gap-2 mt-4">
                      {galleryImages.map((image, index) => (
                        <button
                          key={index}
                          onClick={() => goToImage(index)}
                          className={`relative w-16 h-16 rounded-lg overflow-hidden transition-all ${
                            index === currentIndex
                              ? 'ring-2 ring-brand-500 ring-offset-2 ring-offset-black'
                              : 'opacity-50 hover:opacity-100'
                          }`}
                          aria-label={`View image ${index + 1}`}
                        >
                          <Image
                            src={image}
                            alt={`Thumbnail ${index + 1}`}
                            fill
                            className="object-cover"
                            sizes="64px"
                          />
                        </button>
                      ))}
                    </div>
                  )}

                  {/* Image counter */}
                  <div className="text-center mt-4 text-white/80">
                    <span className="font-semibold text-white">{currentIndex + 1}</span>
                    <span> / {galleryImages.length}</span>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </div>
  );
};

export default ProductImageGallery;
