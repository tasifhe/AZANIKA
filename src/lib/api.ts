// API configuration and utilities
import { ApiResponse, DatabaseProduct, Order, DashboardStats, LoginCredentials, SignupData, AuthResponse } from '@/types';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'https://azanika-backend.onrender.com/api';

// Helper function for API calls
async function apiCall<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  try {
    const token = localStorage.getItem('adminToken');
    const headers: HeadersInit = {
      'Content-Type': 'application/json',
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    };

    const response = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: data.error || data.message || 'Something went wrong',
      };
    }

    return {
      success: true,
      data,
    };
  } catch (error: any) {
    return {
      success: false,
      error: error.message || 'Network error',
    };
  }
}

// Products API
export const productsApi = {
  getAll: (): Promise<ApiResponse<DatabaseProduct[]>> => apiCall('/products'),
  getById: (id: string): Promise<ApiResponse<DatabaseProduct>> => apiCall(`/products/${id}`),
  create: (productData: Partial<DatabaseProduct>): Promise<ApiResponse<DatabaseProduct>> =>
    apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
  update: (id: string, productData: Partial<DatabaseProduct>): Promise<ApiResponse<DatabaseProduct>> =>
    apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),
  delete: (id: string): Promise<ApiResponse<void>> =>
    apiCall(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Orders API
export const ordersApi = {
  getAll: (): Promise<ApiResponse<Order[]>> => apiCall('/orders'),
  getById: (id: string): Promise<ApiResponse<Order>> => apiCall(`/orders/${id}`),
  create: (orderData: Partial<Order>): Promise<ApiResponse<Order>> =>
    apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  updateStatus: (id: string, status: Order['status']): Promise<ApiResponse<Order>> =>
    apiCall(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// Auth API
export const authApi = {
  login: (credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    }),
  register: (userData: SignupData): Promise<ApiResponse<AuthResponse>> =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    }),
  forgotPassword: (email: string): Promise<ApiResponse<{ message: string }>> =>
    apiCall('/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    }),
};

// Dashboard stats
export const dashboardApi = {
  getStats: async (): Promise<ApiResponse<DashboardStats>> => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productsApi.getAll(),
        ordersApi.getAll(),
      ]);

      const products = Array.isArray(productsRes.data) ? productsRes.data : [];
      const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];

      // Calculate stats
      const totalRevenue = orders.reduce(
        (sum: number, order: Order) => sum + (order.total || 0),
        0
      );
      const totalOrders = orders.length;
      const totalProducts = products.length;

      // Low stock products
      const lowStockProducts = products.filter((p: DatabaseProduct) => (p.stock || 0) < 10);

      return {
        success: true,
        data: {
          revenue: totalRevenue,
          orders: totalOrders,
          products: totalProducts,
          lowStock: lowStockProducts,
          recentOrders: orders.slice(0, 5),
        },
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.message,
      };
    }
  },
};

export { API_URL };
