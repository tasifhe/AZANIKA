'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { dashboardApi } from '@/lib/api';
import { 
  DollarSign, 
  ShoppingBag, 
  Package, 
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle
} from 'lucide-react';

interface DashboardStats {
  revenue: number;
  orders: number;
  products: number;
  lowStock: any[];
  recentOrders: any[];
}

const AdminDashboard = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if admin is logged in
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }

    // Fetch dashboard data
    fetchDashboardData();
  }, [router]);

  const fetchDashboardData = async () => {
    setLoading(true);
    const response = await dashboardApi.getStats();
    
    if (response.success && response.data) {
      setStats(response.data as DashboardStats);
    } else {
      setError(response.error || 'Failed to load dashboard data');
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen bg-neutral-50">
        <AdminSidebar onLogout={handleLogout} />
        <div className="ml-64 flex-1 p-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
            <button 
              onClick={fetchDashboardData}
              className="mt-2 text-red-600 hover:text-red-700 font-medium"
            >
              Retry
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (!stats) {
    return null;
  }

  const statsCards = [
    {
      name: 'Total Revenue',
      value: `৳${stats.revenue.toFixed(2)}`,
      change: '+12.5%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Orders',
      value: stats.orders.toString(),
      change: '+8.2%',
      trend: 'up',
      icon: ShoppingBag,
      color: 'bg-blue-500'
    },
    {
      name: 'Products',
      value: stats.products.toString(),
      change: '+3',
      trend: 'up',
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      name: 'Low Stock',
      value: stats.lowStock.length.toString(),
      change: 'Alert',
      trend: 'down',
      icon: AlertTriangle,
      color: 'bg-orange-500'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'bg-green-100 text-green-800';
      case 'Processing': return 'bg-blue-100 text-blue-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      case 'Shipped': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Dashboard</h1>
          <p className="text-neutral-600">Welcome back! Here's what's happening with your store.</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsCards.map((stat) => {
            const Icon = stat.icon;
            const TrendIcon = stat.trend === 'up' ? TrendingUp : TrendingDown;
            
            return (
              <div key={stat.name} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${stat.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    <TrendIcon size={16} />
                    <span>{stat.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">{stat.value}</h3>
                <p className="text-sm text-neutral-600">{stat.name}</p>
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Recent Orders */}
          <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-neutral-900">Recent Orders</h2>
              <a href="/admin/orders" className="text-primary-600 hover:text-primary-700 text-sm font-medium">
                View All →
              </a>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-neutral-200">
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Order ID</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Customer</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Amount</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Status</th>
                    <th className="text-left py-3 px-4 text-sm font-semibold text-neutral-700">Date</th>
                  </tr>
                </thead>
                <tbody>
                  {stats.recentOrders.map((order: any) => (
                    <tr key={order.id} className="border-b border-neutral-100 hover:bg-neutral-50">
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900">#{order.id}</td>
                      <td className="py-3 px-4 text-sm text-neutral-600">{order.user_email || 'Guest'}</td>
                      <td className="py-3 px-4 text-sm font-medium text-neutral-900">৳{order.total_amount}</td>
                      <td className="py-3 px-4">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-neutral-600">{new Date(order.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Low Stock Alert */}
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center space-x-2 mb-6">
              <AlertTriangle className="text-orange-500" size={20} />
              <h2 className="text-xl font-bold text-neutral-900">Low Stock Alert</h2>
            </div>
            <div className="space-y-4">
              {stats.lowStock.map((product: any) => (
                <div key={product.id} className="border-b border-neutral-100 pb-4 last:border-0 last:pb-0">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-medium text-neutral-900 text-sm">{product.name}</h3>
                    <span className="bg-red-100 text-red-700 px-2 py-1 rounded text-xs font-bold">
                      {product.stock} left
                    </span>
                  </div>
                  <p className="text-xs text-neutral-500">SKU: {product.sku}</p>
                </div>
              ))}
              <a href="/admin/inventory" className="block text-center text-primary-600 hover:text-primary-700 text-sm font-medium mt-4">
                Manage Inventory →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
