'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { ordersApi } from '@/lib/api';
import { Users, Mail, Calendar, ShoppingBag, Search } from 'lucide-react';

interface Customer {
  email: string;
  totalOrders: number;
  totalSpent: number;
  lastOrder: string;
}

const AdminCustomersPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState<Customer[]>([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchCustomers();
  }, [router]);

  const fetchCustomers = async () => {
    setLoading(true);
    const response = await ordersApi.getAll();
    
    if (response.success && response.data) {
      const orders = Array.isArray(response.data) ? response.data : [];
      
      // Group orders by customer email
      const customerMap = new Map<string, Customer>();
      
      orders.forEach((order: any) => {
        const email = order.user_email || 'guest@example.com';
        const existing = customerMap.get(email);
        
        if (existing) {
          existing.totalOrders += 1;
          existing.totalSpent += parseFloat(order.total_amount || 0);
          if (new Date(order.created_at) > new Date(existing.lastOrder)) {
            existing.lastOrder = order.created_at;
          }
        } else {
          customerMap.set(email, {
            email,
            totalOrders: 1,
            totalSpent: parseFloat(order.total_amount || 0),
            lastOrder: order.created_at
          });
        }
      });
      
      setCustomers(Array.from(customerMap.values()));
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const filteredCustomers = customers.filter(c =>
    c.email.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Customers</h1>
          <p className="text-neutral-600">View and manage your customer base</p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Total Customers</p>
                <p className="text-2xl font-bold text-neutral-900">{customers.length}</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-lg">
                <Users className="text-blue-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Total Orders</p>
                <p className="text-2xl font-bold text-neutral-900">
                  {customers.reduce((sum, c) => sum + c.totalOrders, 0)}
                </p>
              </div>
              <div className="bg-green-100 p-3 rounded-lg">
                <ShoppingBag className="text-green-600" size={24} />
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600 mb-1">Total Revenue</p>
                <p className="text-2xl font-bold text-neutral-900">
                  ৳{customers.reduce((sum, c) => sum + c.totalSpent, 0).toFixed(2)}
                </p>
              </div>
              <div className="bg-purple-100 p-3 rounded-lg">
                <Mail className="text-purple-600" size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search customers by email..."
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
            <Search className="absolute left-3 top-3.5 text-neutral-400" size={20} />
          </div>
        </div>

        {/* Customers Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Customer</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Total Orders</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Total Spent</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Last Order</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((customer, index) => (
                <tr key={index} className="border-t border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-primary-100 rounded-full flex items-center justify-center">
                        <span className="text-primary-600 font-semibold">
                          {customer.email.charAt(0).toUpperCase()}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{customer.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-600">{customer.totalOrders} orders</td>
                  <td className="py-4 px-6 text-sm font-medium text-neutral-900">
                    ৳{customer.totalSpent.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-600">
                    {new Date(customer.lastOrder).toLocaleDateString()}
                  </td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      customer.totalOrders > 3
                        ? 'bg-green-100 text-green-700'
                        : 'bg-blue-100 text-blue-700'
                    }`}>
                      {customer.totalOrders > 3 ? 'VIP' : 'Active'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {filteredCustomers.length === 0 && (
            <div className="text-center py-12">
              <Users className="mx-auto text-neutral-300 mb-4" size={48} />
              <p className="text-neutral-500">No customers found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminCustomersPage;
