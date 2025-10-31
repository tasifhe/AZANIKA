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
  Download,
  X,
  MapPin,
  CreditCard,
  Calendar
} from 'lucide-react';

interface Order {
  id: string;
  orderNumber: string;
  customer: {
    name: string;
    email: string;
    phone?: string;
  };
  items: number;
  total: number;
  status: 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';
  date: string;
  paymentMethod: string;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
  };
  orderItems?: Array<{
    id: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
  }>;
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
      customer: { 
        name: 'Sarah Johnson', 
        email: 'sarah@example.com',
        phone: '+880 1712-345678'
      },
      items: 3,
      total: 289.97,
      status: 'delivered',
      date: '2025-10-21',
      paymentMethod: 'Credit Card',
      shippingAddress: {
        street: '123 Main Street, Apt 4B',
        city: 'Dhaka',
        state: 'Dhaka',
        zipCode: '1000',
        country: 'Bangladesh'
      },
      orderItems: [
        { id: '1', name: 'Gold Plated Necklace', price: 99.99, quantity: 1, image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=100&q=80' },
        { id: '2', name: 'Silver Bracelet', price: 79.99, quantity: 1, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&q=80' },
        { id: '3', name: 'Pearl Earrings', price: 109.99, quantity: 1, image: 'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=100&q=80' }
      ]
    },
    {
      id: '2',
      orderNumber: 'ORD-002',
      customer: { 
        name: 'Mike Smith', 
        email: 'mike@example.com',
        phone: '+880 1812-345678'
      },
      items: 2,
      total: 149.99,
      status: 'processing',
      date: '2025-10-21',
      paymentMethod: 'PayPal',
      shippingAddress: {
        street: '456 Park Avenue',
        city: 'Chittagong',
        state: 'Chittagong',
        zipCode: '4000',
        country: 'Bangladesh'
      },
      orderItems: [
        { id: '4', name: 'Leather Handbag', price: 129.99, quantity: 1, image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=100&q=80' },
        { id: '5', name: 'Silk Scarf', price: 19.99, quantity: 1, image: 'https://images.unsplash.com/photo-1601924994987-69e26d50dc26?w=100&q=80' }
      ]
    },
    {
      id: '3',
      orderNumber: 'ORD-003',
      customer: { 
        name: 'Emma Wilson', 
        email: 'emma@example.com',
        phone: '+880 1912-345678'
      },
      items: 1,
      total: 39.99,
      status: 'pending',
      date: '2025-10-20',
      paymentMethod: 'Credit Card',
      shippingAddress: {
        street: '789 Ocean Drive',
        city: 'Sylhet',
        state: 'Sylhet',
        zipCode: '3100',
        country: 'Bangladesh'
      },
      orderItems: [
        { id: '6', name: 'Designer Sunglasses', price: 39.99, quantity: 1, image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=100&q=80' }
      ]
    },
    {
      id: '4',
      orderNumber: 'ORD-004',
      customer: { 
        name: 'John Doe', 
        email: 'john@example.com',
        phone: '+880 1612-345678'
      },
      items: 4,
      total: 399.96,
      status: 'shipped',
      date: '2025-10-20',
      paymentMethod: 'Credit Card',
      shippingAddress: {
        street: '321 Beach Road',
        city: 'Cox\'s Bazar',
        state: 'Chittagong',
        zipCode: '4700',
        country: 'Bangladesh'
      },
      orderItems: [
        { id: '7', name: 'Rose Gold Watch', price: 199.99, quantity: 1, image: 'https://images.unsplash.com/photo-1524592094714-0f0654e20314?w=100&q=80' },
        { id: '8', name: 'Diamond Ring', price: 149.99, quantity: 1, image: 'https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=100&q=80' },
        { id: '9', name: 'Gold Bracelet', price: 49.99, quantity: 2, image: 'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=100&q=80' }
      ]
    },
    {
      id: '5',
      orderNumber: 'ORD-005',
      customer: { 
        name: 'Lisa Brown', 
        email: 'lisa@example.com',
        phone: '+880 1512-345678'
      },
      items: 2,
      total: 169.98,
      status: 'processing',
      date: '2025-10-19',
      paymentMethod: 'Debit Card',
      shippingAddress: {
        street: '555 Garden Street',
        city: 'Rajshahi',
        state: 'Rajshahi',
        zipCode: '6000',
        country: 'Bangladesh'
      },
      orderItems: [
        { id: '10', name: 'Crossbody Bag', price: 89.99, quantity: 1, image: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&q=80' },
        { id: '11', name: 'Wallet', price: 79.99, quantity: 1, image: 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=100&q=80' }
      ]
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

        {/* Order Detail Modal */}
        {selectedOrder && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
              {/* Modal Header */}
              <div className="sticky top-0 bg-white border-b border-neutral-200 px-6 py-4 flex items-center justify-between z-10">
                <div>
                  <h2 className="text-2xl font-bold text-neutral-900">Order Details</h2>
                  <p className="text-sm text-neutral-600 mt-1">{selectedOrder.orderNumber}</p>
                </div>
                <button
                  onClick={() => setSelectedOrder(null)}
                  className="p-2 hover:bg-neutral-100 rounded-lg transition-colors"
                  aria-label="Close modal"
                >
                  <X size={24} className="text-neutral-600" />
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Order Status & Date */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <div className="flex items-center space-x-2 mb-2">
                      <Calendar size={18} className="text-neutral-600" />
                      <p className="text-sm font-medium text-neutral-700">Order Date</p>
                    </div>
                    <p className="text-lg font-semibold text-neutral-900">{selectedOrder.date}</p>
                  </div>
                  <div className="bg-neutral-50 rounded-lg p-4">
                    <p className="text-sm font-medium text-neutral-700 mb-2">Order Status</p>
                    <div className="flex items-center space-x-2">
                      <span className={`px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-2 ${getStatusColor(selectedOrder.status)}`}>
                        {getStatusIcon(selectedOrder.status)}
                        <span className="capitalize">{selectedOrder.status}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Customer Information */}
                <div className="border border-neutral-200 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Customer Information</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Name</p>
                      <p className="font-medium text-neutral-900">{selectedOrder.customer.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Email</p>
                      <p className="font-medium text-neutral-900">{selectedOrder.customer.email}</p>
                    </div>
                    {selectedOrder.customer.phone && (
                      <div>
                        <p className="text-sm text-neutral-600 mb-1">Phone</p>
                        <p className="font-medium text-neutral-900">{selectedOrder.customer.phone}</p>
                      </div>
                    )}
                    <div>
                      <p className="text-sm text-neutral-600 mb-1">Payment Method</p>
                      <div className="flex items-center space-x-2">
                        <CreditCard size={16} className="text-neutral-600" />
                        <p className="font-medium text-neutral-900">{selectedOrder.paymentMethod}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Shipping Address */}
                {selectedOrder.shippingAddress && (
                  <div className="border border-neutral-200 rounded-lg p-5">
                    <div className="flex items-center space-x-2 mb-3">
                      <MapPin size={20} className="text-neutral-600" />
                      <h3 className="text-lg font-semibold text-neutral-900">Shipping Address</h3>
                    </div>
                    <div className="text-neutral-700 space-y-1">
                      <p>{selectedOrder.shippingAddress.street}</p>
                      <p>{selectedOrder.shippingAddress.city}, {selectedOrder.shippingAddress.state} {selectedOrder.shippingAddress.zipCode}</p>
                      <p>{selectedOrder.shippingAddress.country}</p>
                    </div>
                  </div>
                )}

                {/* Order Items */}
                <div className="border border-neutral-200 rounded-lg p-5">
                  <h3 className="text-lg font-semibold text-neutral-900 mb-4">Order Items</h3>
                  <div className="space-y-3">
                    {selectedOrder.orderItems && selectedOrder.orderItems.length > 0 ? (
                      selectedOrder.orderItems.map((item) => (
                        <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-neutral-100 last:border-0">
                          {item.image && (
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-lg"
                            />
                          )}
                          <div className="flex-1">
                            <p className="font-medium text-neutral-900">{item.name}</p>
                            <p className="text-sm text-neutral-600">Quantity: {item.quantity}</p>
                          </div>
                          <div className="text-right">
                            <p className="font-semibold text-neutral-900">৳{item.price.toFixed(2)}</p>
                            {item.quantity > 1 && (
                              <p className="text-xs text-neutral-600">৳{(item.price * item.quantity).toFixed(2)} total</p>
                            )}
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-neutral-600 text-center py-4">No item details available</p>
                    )}
                  </div>

                  {/* Order Summary */}
                  <div className="mt-6 pt-4 border-t border-neutral-200">
                    <div className="space-y-2">
                      <div className="flex justify-between text-neutral-700">
                        <span>Subtotal ({selectedOrder.items} items)</span>
                        <span>৳{selectedOrder.total.toFixed(2)}</span>
                      </div>
                      <div className="flex justify-between text-neutral-700">
                        <span>Shipping</span>
                        <span className="text-green-600 font-medium">Free</span>
                      </div>
                      <div className="flex justify-between text-lg font-bold text-neutral-900 pt-2 border-t border-neutral-200">
                        <span>Total</span>
                        <span>৳{selectedOrder.total.toFixed(2)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <select
                    value={selectedOrder.status}
                    onChange={(e) => {
                      updateOrderStatus(selectedOrder.id, e.target.value as Order['status']);
                      setSelectedOrder({...selectedOrder, status: e.target.value as Order['status']});
                    }}
                    className="flex-1 px-4 py-3 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
                  >
                    <option value="pending">Pending</option>
                    <option value="processing">Processing</option>
                    <option value="shipped">Shipped</option>
                    <option value="delivered">Delivered</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                  <button className="px-6 py-3 bg-primary-600 text-white rounded-lg font-medium hover:bg-primary-700 transition-colors flex items-center justify-center space-x-2">
                    <Download size={20} />
                    <span>Download Invoice</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrdersPage;
