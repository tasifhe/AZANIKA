'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { 
  Search, 
  AlertTriangle,
  Edit,
  Trash2,
  Plus,
  Package,
  TrendingUp,
  TrendingDown
} from 'lucide-react';

interface InventoryItem {
  id: string;
  sku: string;
  name: string;
  category: string;
  currentStock: number;
  minStock: number;
  maxStock: number;
  price: number;
  lastRestocked: string;
}

const InventoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

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

  // Mock inventory data
  const inventory: InventoryItem[] = [
    {
      id: '1',
      sku: 'PRD-001',
      name: 'Elegant Pearl Statement Necklace',
      category: 'Jewelry',
      currentStock: 3,
      minStock: 5,
      maxStock: 50,
      price: 89.99,
      lastRestocked: '2025-10-15'
    },
    {
      id: '2',
      sku: 'PRD-002',
      name: 'Vintage Leather Crossbody Bag',
      category: 'Bags',
      currentStock: 15,
      minStock: 10,
      maxStock: 40,
      price: 149.99,
      lastRestocked: '2025-10-18'
    },
    {
      id: '3',
      sku: 'PRD-003',
      name: 'Delicate Gold Chain Bracelet',
      category: 'Jewelry',
      currentStock: 2,
      minStock: 8,
      maxStock: 60,
      price: 39.99,
      lastRestocked: '2025-10-10'
    },
    {
      id: '4',
      sku: 'PRD-004',
      name: 'Designer Sunglasses',
      category: 'Sunglasses',
      currentStock: 25,
      minStock: 15,
      maxStock: 50,
      price: 129.99,
      lastRestocked: '2025-10-20'
    },
    {
      id: '5',
      sku: 'PRD-005',
      name: 'Silk Scarf Collection',
      category: 'Scarves',
      currentStock: 8,
      minStock: 10,
      maxStock: 30,
      price: 69.99,
      lastRestocked: '2025-10-17'
    }
  ];

  const getStockStatus = (item: InventoryItem) => {
    if (item.currentStock <= item.minStock) return 'critical';
    if (item.currentStock <= item.minStock * 1.5) return 'low';
    return 'normal';
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInventory = inventory.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const criticalStock = inventory.filter(item => getStockStatus(item) === 'critical').length;
  const lowStock = inventory.filter(item => getStockStatus(item) === 'low').length;
  const totalValue = inventory.reduce((sum, item) => sum + (item.currentStock * item.price), 0);

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
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-2">Inventory Management</h1>
              <p className="text-neutral-600">Track and manage your product stock levels</p>
            </div>
            <button
              onClick={() => setShowAddModal(true)}
              className="flex items-center space-x-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
            >
              <Plus size={20} />
              <span>Add Product</span>
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-neutral-600">Total Products</p>
                <p className="text-2xl font-bold text-neutral-900">{inventory.length}</p>
              </div>
              <Package className="text-neutral-400" size={32} />
            </div>
          </div>
          <div className="bg-red-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-red-600">Critical Stock</p>
                <p className="text-2xl font-bold text-red-900">{criticalStock}</p>
              </div>
              <AlertTriangle className="text-red-500" size={32} />
            </div>
          </div>
          <div className="bg-yellow-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-yellow-600">Low Stock</p>
                <p className="text-2xl font-bold text-yellow-900">{lowStock}</p>
              </div>
              <TrendingDown className="text-yellow-500" size={32} />
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-green-600">Total Value</p>
                <p className="text-2xl font-bold text-green-900">${totalValue.toFixed(2)}</p>
              </div>
              <TrendingUp className="text-green-500" size={32} />
            </div>
          </div>
        </div>

        {/* Search */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" size={20} />
            <input
              type="text"
              placeholder="Search by product name, SKU, or category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>
        </div>

        {/* Inventory Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-neutral-50">
                <tr>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">SKU</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Product Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Category</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Current Stock</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Min/Max</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Status</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Price</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => {
                  const status = getStockStatus(item);
                  return (
                    <tr key={item.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                      <td className="py-4 px-6 font-medium text-neutral-900">{item.sku}</td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-neutral-900">{item.name}</p>
                        <p className="text-xs text-neutral-500">Last restocked: {item.lastRestocked}</p>
                      </td>
                      <td className="py-4 px-6 text-neutral-600">{item.category}</td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-neutral-900">{item.currentStock}</p>
                      </td>
                      <td className="py-4 px-6 text-sm text-neutral-600">
                        {item.minStock} / {item.maxStock}
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStockColor(status)}`}>
                          {status === 'critical' ? 'Critical' : status === 'low' ? 'Low Stock' : 'Normal'}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-neutral-900">${item.price}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                            <Edit size={16} />
                          </button>
                          <button className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                            <Trash2 size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {filteredInventory.length === 0 && (
            <div className="text-center py-12">
              <Package className="mx-auto text-neutral-400 mb-4" size={48} />
              <p className="text-neutral-600">No products found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default InventoryPage;
