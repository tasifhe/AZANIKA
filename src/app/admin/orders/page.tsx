'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { 
  Search, 
  Filter, 
  Eye, 
  Package,
  Truck,
  CheckCircle,
  Clock,
  Download
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
  };
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod: string;
}

const OrdersPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
    } else {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  // Mock orders data - replace with API call
  const orders: Order[] = [
    {
      id: '1',
      orderNumber: 'ORD-001',
      customer: { name: 'Sarah Johnson', email: 'sarah@example.com' },
      items: 3,
      total: 289.97,
      status: 'delivered',
      date: '2025-10-21',
      paymentMethod: 'Credit Card'
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customer: { name: 'Mike Smith', email: 'mike@example.com' },
      items: 2,
      total: 149.99,
      status: 'processing',
      date: '2025-10-21',
      paymentMethod: 'PayPal'
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customer: { name: 'Emma Wilson', email: 'emma@example.com' },
      items: 1,
      total: 39.99,
      status: 'pending',
      date: '2025-10-20',
      paymentMethod: 'Credit Card'
    },
    {
      id: '4',
      orderNumber: 'ORD-004',
      customer: { name: 'John Doe', email: 'john@example.com' },
      items: 4,
      total: 399.96,
      status: 'shipped',
      date: '2025-10-20',
      paymentMethod: 'Credit Card'
    },
    {
      id: '5',
      orderNumber: 'ORD-005',
      customer: { name: 'Lisa Brown', email: 'lisa@example.com' },
      items: 2,
      total: 169.98,
      status: 'processing',
      date: '2025-10-19',
      paymentMethod: 'Debit Card'
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'processing': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'shipped': return 'bg-purple-100 text-purple-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'delivered': return <CheckCircle size={16} />;
      case 'processing': return <Package size={16} />;
      case 'pending': return <Clock size={16} />;
      case 'shipped': return <Truck size={16} />;
      default: return <Clock size={16} />;
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: Order['status']) => {
    // TODO: Implement API call to update order status
    console.log(`Updating order ${orderId} to status: ${newStatus}`);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || order.status === filterStatus;
    return matchesSearch && matchesFilter;
  });

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="ml-64 flex-1 p-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Orders Management</h1>
          <p className="text-neutral-600">Manage and track all customer orders</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <p className="text-sm text-neutral-600">Total Orders</p>
            <p className="text-2xl font-bold text-neutral-900">{orders.length}</p>
          </div>
          <div className="bg-blue-50 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-blue-600">Processing</p>
            <p className="text-2xl font-bold text-blue-900">{orders.filter(o => o.status === 'processing').length}</p>
          </div>
          <div className="bg-purple-50 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-purple-600">Shipped</p>
            <p className="text-2xl font-bold text-purple-900">{orders.filter(o => o.status === 'shipped').length}</p>
          </div>
          <div className="bg-green-50 rounded-lg p-4 shadow-sm">
            <p className="text-sm text-green-600">Delivered</p>
            <p className="text-2xl font-bold text-green-900">{orders.filter(o => o.status === 'delivered').length}</p>
          </div>
        </div>

        {/* Filters and Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
              <input
                type="text"
                placeholder="Search orders..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <Filter className="text-neutral-600" size={20} />
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border border-neutral-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
              <button className="flex items-center space-x-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                <Download size={20} />
                <span>Export</span>
              </button>
            </div>
          </div>
        </div>

        {/* Orders Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Order</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Customer</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Items</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Total</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Date</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredOrders.map((order) => (
                  <tr key={order.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-neutral-900">{order.orderNumber}</p>
                        <p className="text-xs text-neutral-500">{order.paymentMethod}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6">
                      <div>
                        <p className="font-medium text-neutral-900">{order.customer.name}</p>
                        <p className="text-xs text-neutral-500">{order.customer.email}</p>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-neutral-900">{order.items}</td>
                    <td className="py-4 px-6 font-medium text-neutral-900">${order.total.toFixed(2)}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center space-x-2">
                        <select
                          value={order.status}
                          onChange={(e) => updateOrderStatus(order.id, e.target.value as Order['status'])}
                          className={`px-3 py-1 rounded-full text-xs font-medium border-0 focus:ring-2 focus:ring-primary-500 ${getStatusColor(order.status)}`}
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                          <option value="cancelled">Cancelled</option>
                        </select>
                      </div>
                    </td>
                    <td className="py-4 px-6 text-sm text-neutral-600">{order.date}</td>
                    <td className="py-4 px-6">
                      <button
                        onClick={() => setSelectedOrder(order)}
                        className="text-primary-600 hover:text-primary-700 font-medium text-sm flex items-center space-x-1"
                      >
                        <Eye size={16} />
                        <span>View</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredOrders.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto text-neutral-400 mb-4" size={48} />
              <p className="text-neutral-600">No orders found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrdersPage;
