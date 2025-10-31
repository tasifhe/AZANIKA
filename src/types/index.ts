export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  subcategory?: string;
  inStock: boolean;
  featured: boolean;
  rating: number;
  reviewCount: number;
  colors?: string[];
  sizes?: string[];
  tags: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedColor?: string;
  selectedSize?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  productCount: number;
  subcategories?: Subcategory[];
}

export interface Subcategory {
  id: string;
  name: string;
  slug: string;
  categoryId: string;
}

export interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  createdAt: string;
  helpful: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  createdAt: string;
  shippingAddress: Address;
  paymentMethod: string;
}

export interface Address {
  street: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

// API Response Types
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface ApiError {
  error: string;
  message?: string;
  statusCode?: number;
}

// Database Product Interface (matches backend)
export interface DatabaseProduct {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  images?: string[];
  stock?: number;
  rating?: number;
  sku?: string;
  colors?: string[];
  sizes?: string[];
  featured?: boolean;
  created_at?: string;
  updated_at?: string;
}

// Dashboard Stats Interface
export interface DashboardStats {
  revenue: number;
  orders: number;
  products: number;
  lowStock: DatabaseProduct[];
  recentOrders: Order[];
}

// Authentication Interfaces
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  name: string;
  email: string;
  phone?: string;
  password: string;
  confirmPassword: string;
}

export interface AuthResponse {
  success: boolean;
  token?: string;
  user?: User;
  error?: string;
}
