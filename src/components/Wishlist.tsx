'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Heart } from 'lucide-react';

interface WishlistItem {
  id: string;
  name: string;
  price: number;
  image_url: string;
}

interface WishlistContextType {
  wishlist: WishlistItem[];
  addToWishlist: (item: WishlistItem) => void;
  removeFromWishlist: (id: string) => void;
  isInWishlist: (id: string) => boolean;
  wishlistCount: number;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem('azanika_wishlist');
    if (saved) {
      try {
        setWishlist(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load wishlist:', error);
      }
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    if (wishlist.length > 0) {
      localStorage.setItem('azanika_wishlist', JSON.stringify(wishlist));
    } else {
      localStorage.removeItem('azanika_wishlist');
    }
  }, [wishlist]);

  const addToWishlist = (item: WishlistItem) => {
    setWishlist((prev) => {
      if (prev.some((i) => i.id === item.id)) {
        return prev;
      }
      return [...prev, item];
    });
  };

  const removeFromWishlist = (id: string) => {
    setWishlist((prev) => prev.filter((item) => item.id !== id));
  };

  const isInWishlist = (id: string) => {
    return wishlist.some((item) => item.id === id);
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        wishlistCount: wishlist.length,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
};

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error('useWishlist must be used within WishlistProvider');
  }
  return context;
};

// Wishlist Button Component
interface WishlistButtonProps {
  product: {
    id: string;
    name: string;
    price: number;
    image_url: string;
  };
  className?: string;
  showLabel?: boolean;
}

export const WishlistButton: React.FC<WishlistButtonProps> = ({ 
  product, 
  className = '',
  showLabel = false 
}) => {
  const { isInWishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [isAnimating, setIsAnimating] = useState(false);
  const inWishlist = isInWishlist(product.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    setIsAnimating(true);
    setTimeout(() => setIsAnimating(false), 300);

    if (inWishlist) {
      removeFromWishlist(product.id);
    } else {
      addToWishlist(product);
    }
  };

  return (
    <button
      onClick={handleToggle}
      className={`group relative flex items-center gap-2 transition-all duration-300 ${className}`}
      aria-label={inWishlist ? 'Remove from wishlist' : 'Add to wishlist'}
    >
      <span className={`relative ${isAnimating ? 'animate-scale-up' : ''}`}>
        <Heart
          size={20}
          className={`transition-all duration-300 ${
            inWishlist
              ? 'text-blush-500 fill-current scale-110'
              : 'text-pearl-400 hover:text-blush-400 group-hover:scale-110'
          }`}
        />
        {isAnimating && inWishlist && (
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="absolute w-full h-full bg-blush-500 rounded-full animate-ping opacity-75" />
          </span>
        )}
      </span>
      {showLabel && (
        <span className="text-sm font-medium text-pearl-700 group-hover:text-brand-600 transition-colors">
          {inWishlist ? 'Saved' : 'Save'}
        </span>
      )}
    </button>
  );
};
