// API configuration and utilities
const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

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
  getAll: () => apiCall('/products'),
  getById: (id: string) => apiCall(`/products/${id}`),
  create: (productData: any) =>
    apiCall('/products', {
      method: 'POST',
      body: JSON.stringify(productData),
    }),
  update: (id: string, productData: any) =>
    apiCall(`/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    }),
  delete: (id: string) =>
    apiCall(`/products/${id}`, {
      method: 'DELETE',
    }),
};

// Orders API
export const ordersApi = {
  getAll: () => apiCall('/orders'),
  getById: (id: string) => apiCall(`/orders/${id}`),
  create: (orderData: any) =>
    apiCall('/orders', {
      method: 'POST',
      body: JSON.stringify(orderData),
    }),
  updateStatus: (id: string, status: string) =>
    apiCall(`/orders/${id}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    }),
};

// Auth API
export const authApi = {
  login: (email: string, password: string) =>
    apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    }),
  register: (email: string, password: string, name: string) =>
    apiCall('/auth/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name }),
    }),
};

// Dashboard stats
export const dashboardApi = {
  getStats: async () => {
    try {
      const [productsRes, ordersRes] = await Promise.all([
        productsApi.getAll(),
        ordersApi.getAll(),
      ]);

      const products = Array.isArray(productsRes.data) ? productsRes.data : [];
      const orders = Array.isArray(ordersRes.data) ? ordersRes.data : [];

      // Calculate stats
      const totalRevenue = orders.reduce(
        (sum: number, order: any) => sum + parseFloat(order.total_amount || 0),
        0
      );
      const totalOrders = orders.length;
      const totalProducts = products.length;

      // Low stock products
      const lowStockProducts = products.filter((p: any) => p.stock < 10);

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
