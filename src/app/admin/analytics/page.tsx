'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { dashboardApi } from '@/lib/api';
import { TrendingUp, DollarSign, ShoppingCart, Package, Users, ArrowUp, ArrowDown, AlertTriangle } from 'lucide-react';

const AdminAnalyticsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<any>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchAnalytics();
  }, [router]);

  const fetchAnalytics = async () => {
    setLoading(true);
    const response = await dashboardApi.getStats();
    if (response.success && response.data) {
      setStats(response.data);
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

  if (!stats) {
    return (
      <div className="flex min-h-screen bg-neutral-50">
        <AdminSidebar onLogout={handleLogout} />
        <div className="ml-64 flex-1 p-8">
          <p className="text-neutral-600">Failed to load analytics data</p>
        </div>
      </div>
    );
  }

  const metrics = [
    {
      name: 'Total Revenue',
      value: `৳${stats.revenue.toFixed(2)}`,
      change: '+15.3%',
      trend: 'up',
      icon: DollarSign,
      color: 'bg-green-500'
    },
    {
      name: 'Total Orders',
      value: stats.orders.toString(),
      change: '+23.1%',
      trend: 'up',
      icon: ShoppingCart,
      color: 'bg-blue-500'
    },
    {
      name: 'Products Sold',
      value: stats.orders.toString(),
      change: '+18.2%',
      trend: 'up',
      icon: Package,
      color: 'bg-purple-500'
    },
    {
      name: 'Avg Order Value',
      value: `৳${stats.orders > 0 ? (stats.revenue / stats.orders).toFixed(2) : '0.00'}`,
      change: '+5.4%',
      trend: 'up',
      icon: TrendingUp,
      color: 'bg-orange-500'
    }
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Analytics</h1>
          <p className="text-neutral-600">Track your store performance and insights</p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.name} className="bg-white rounded-xl shadow-sm p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className={`${metric.color} p-3 rounded-lg`}>
                    <Icon className="text-white" size={24} />
                  </div>
                  <div className={`flex items-center space-x-1 text-sm ${
                    metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {metric.trend === 'up' ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                    <span>{metric.change}</span>
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-neutral-900 mb-1">{metric.value}</h3>
                <p className="text-sm text-neutral-600">{metric.name}</p>
              </div>
            );
          })}
        </div>

        {/* Sales Overview */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Sales Overview</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-neutral-600">Completed Orders</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.recentOrders.filter((o: any) => o.status === 'completed').length}
                  </p>
                </div>
                <div className="text-green-600">
                  <ShoppingCart size={32} />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                <div>
                  <p className="text-sm text-neutral-600">Pending Orders</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {stats.recentOrders.filter((o: any) => o.status === 'pending').length}
                  </p>
                </div>
                <div className="text-blue-600">
                  <Package size={32} />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-orange-50 rounded-lg">
                <div>
                  <p className="text-sm text-neutral-600">Processing Orders</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {stats.recentOrders.filter((o: any) => o.status === 'processing').length}
                  </p>
                </div>
                <div className="text-orange-600">
                  <TrendingUp size={32} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <h2 className="text-xl font-bold text-neutral-900 mb-4">Product Performance</h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                <div>
                  <p className="text-sm text-neutral-600">Total Products</p>
                  <p className="text-2xl font-bold text-purple-600">{stats.products}</p>
                </div>
                <div className="text-purple-600">
                  <Package size={32} />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                <div>
                  <p className="text-sm text-neutral-600">Low Stock Items</p>
                  <p className="text-2xl font-bold text-red-600">{stats.lowStock.length}</p>
                </div>
                <div className="text-red-600">
                  <AlertTriangle size={32} />
                </div>
              </div>
              <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                <div>
                  <p className="text-sm text-neutral-600">In Stock</p>
                  <p className="text-2xl font-bold text-green-600">
                    {stats.products - stats.lowStock.length}
                  </p>
                </div>
                <div className="text-green-600">
                  <Package size={32} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Top Products */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-neutral-900 mb-4">Stock Status</h2>
          <div className="space-y-3">
            {stats.lowStock.slice(0, 5).map((product: any, index: number) => (
              <div key={index} className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">{product.name}</p>
                  <p className="text-sm text-neutral-500">SKU: {product.sku}</p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-red-600">{product.stock} units</p>
                  <p className="text-xs text-neutral-500">Low Stock</p>
                </div>
              </div>
            ))}
            {stats.lowStock.length === 0 && (
              <p className="text-center text-neutral-500 py-8">All products are well stocked!</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalyticsPage;
