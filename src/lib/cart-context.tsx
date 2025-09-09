'use client';

import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { CartItem, Product } from '@/types';
import toast from 'react-hot-toast';

interface CartState {
  items: CartItem[];
  total: number;
  itemCount: number;
}

interface CartContextType extends CartState {
  addToCart: (product: Product, quantity?: number, selectedColor?: string, selectedSize?: string) => void;
  removeFromCart: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

type CartAction = 
  | { type: 'ADD_TO_CART'; payload: CartItem }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { productId: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'LOAD_CART'; payload: CartItem[] };

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_TO_CART': {
      const existingItemIndex = state.items.findIndex(
        item => item.product.id === action.payload.product.id &&
                item.selectedColor === action.payload.selectedColor &&
                item.selectedSize === action.payload.selectedSize
      );

      let newItems: CartItem[];
      
      if (existingItemIndex >= 0) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + action.payload.quantity }
            : item
        );
      } else {
        newItems = [...state.items, action.payload];
      }

      const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'REMOVE_FROM_CART': {
      const newItems = state.items.filter(item => item.product.id !== action.payload);
      const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'UPDATE_QUANTITY': {
      const newItems = state.items.map(item =>
        item.product.id === action.payload.productId
          ? { ...item, quantity: action.payload.quantity }
          : item
      ).filter(item => item.quantity > 0);

      const total = newItems.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = newItems.reduce((sum, item) => sum + item.quantity, 0);

      return { items: newItems, total, itemCount };
    }

    case 'CLEAR_CART':
      return { items: [], total: 0, itemCount: 0 };

    case 'LOAD_CART': {
      const total = action.payload.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
      const itemCount = action.payload.reduce((sum, item) => sum + item.quantity, 0);
      
      return { items: action.payload, total, itemCount };
    }

    default:
      return state;
  }
};

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, {
    items: [],
    total: 0,
    itemCount: 0
  });

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('azanika-cart');
    if (savedCart) {
      try {
        const cartItems = JSON.parse(savedCart);
        dispatch({ type: 'LOAD_CART', payload: cartItems });
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      }
    }
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('azanika-cart', JSON.stringify(state.items));
  }, [state.items]);

  const addToCart = (product: Product, quantity = 1, selectedColor?: string, selectedSize?: string) => {
    const cartItem: CartItem = {
      product,
      quantity,
      selectedColor,
      selectedSize
    };
    
    dispatch({ type: 'ADD_TO_CART', payload: cartItem });
    toast.success(`${product.name} added to cart!`);
  };

  const removeFromCart = (productId: string) => {
    dispatch({ type: 'REMOVE_FROM_CART', payload: productId });
    toast.success('Item removed from cart');
  };

  const updateQuantity = (productId: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { productId, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
    toast.success('Cart cleared');
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
