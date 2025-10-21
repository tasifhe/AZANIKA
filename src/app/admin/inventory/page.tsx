'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { productsApi } from '@/lib/api';
import { 
  Search, 
  AlertTriangle,
  Edit,
  Trash2,
  Plus,
  Package,
  TrendingUp,
  TrendingDown,
  X
} from 'lucide-react';

interface Product {
  id: number;
  sku: string;
  name: string;
  category: string;
  stock: number;
  price: string;
  description: string;
  image_url?: string;
}

const InventoryPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image_url: '',
    sku: ''
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    fetchProducts();
  }, [router]);

  const fetchProducts = async () => {
    setLoading(true);
    const response = await productsApi.getAll();
    if (response.success && response.data) {
      setProducts(Array.isArray(response.data) ? response.data : []);
    }
    setLoading(false);
  };

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const getStockStatus = (product: Product) => {
    const stock = product.stock || 0;
    if (stock === 0) return 'critical';
    if (stock <= 5) return 'low';
    return 'normal';
  };

  const handleSaveProduct = async () => {
    try {
      if (editingProduct) {
        await productsApi.update(String(editingProduct.id), formData);
      } else {
        await productsApi.create(formData);
      }
      fetchProducts();
      setShowAddModal(false);
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', category: '', image_url: '', stock: '', sku: '' });
    } catch (error) {
      console.error('Error saving product:', error);
      alert('Failed to save product');
    }
  };

  const handleEditProduct = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description || '',
      price: String(product.price),
      category: product.category,
      image_url: product.image_url || '',
      stock: String(product.stock || 0),
      sku: product.sku || ''
    });
    setShowAddModal(true);
  };

  const handleDeleteProduct = async (id: number) => {
    if (confirm('Are you sure you want to delete this product?')) {
      try {
        await productsApi.delete(String(id));
        fetchProducts();
      } catch (error) {
        console.error('Error deleting product:', error);
        alert('Failed to delete product');
      }
    }
  };

  const getStockColor = (status: string) => {
    switch (status) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'low': return 'bg-yellow-100 text-yellow-800';
      case 'normal': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredInventory = products.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const criticalStock = products.filter(item => getStockStatus(item) === 'critical').length;
  const lowStock = products.filter(item => getStockStatus(item) === 'low').length;
  const totalValue = products.reduce((sum, item) => sum + ((item.stock || 0) * Number(item.price)), 0);

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
                <p className="text-2xl font-bold text-neutral-900">{products.length}</p>
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
                <p className="text-2xl font-bold text-green-900">৳{totalValue.toFixed(2)}</p>
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
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Product ID</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Product Name</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Category</th>
                  <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Current Stock</th>
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
                      <td className="py-4 px-6 font-medium text-neutral-900">#{item.id}</td>
                      <td className="py-4 px-6">
                        <p className="font-medium text-neutral-900">{item.name}</p>
                      </td>
                      <td className="py-4 px-6 text-neutral-600">{item.category}</td>
                      <td className="py-4 px-6">
                        <p className="font-bold text-neutral-900">{item.stock || 0}</p>
                      </td>
                      <td className="py-4 px-6">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStockColor(status)}`}>
                          {status === 'critical' ? 'Out of Stock' : status === 'low' ? 'Low Stock' : 'In Stock'}
                        </span>
                      </td>
                      <td className="py-4 px-6 font-medium text-neutral-900">৳{item.price}</td>
                      <td className="py-4 px-6">
                        <div className="flex items-center space-x-2">
                          <button 
                            onClick={() => handleEditProduct(item)}
                            className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                          >
                            <Edit size={16} />
                          </button>
                          <button 
                            onClick={() => handleDeleteProduct(item.id)}
                            className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
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

        {/* Add/Edit Product Modal */}
        {showAddModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold text-neutral-900">
                  {editingProduct ? 'Edit Product' : 'Add New Product'}
                </h2>
                <button
                  onClick={() => {
                    setShowAddModal(false);
                    setEditingProduct(null);
                    setFormData({ name: '', description: '', price: '', category: '', image_url: '', stock: '', sku: '' });
                  }}
                  className="text-neutral-400 hover:text-neutral-600"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="Enter product name"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Description
                  </label>
                  <textarea
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    rows={3}
                    placeholder="Enter product description"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Price ($)
                    </label>
                    <input
                      type="text"
                      value={formData.price}
                      onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="0.00"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">
                      Stock Quantity
                    </label>
                    <input
                      type="text"
                      value={formData.stock}
                      onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                      placeholder="0"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Category
                  </label>
                  <input
                    type="text"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="e.g., Jewelry, Bags, Accessories"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Image URL
                  </label>
                  <input
                    type="text"
                    value={formData.image_url}
                    onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                    className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
                    placeholder="https://example.com/image.jpg"
                  />
                </div>

                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingProduct(null);
                      setFormData({ name: '', description: '', price: '', category: '', image_url: '', stock: '', sku: '' });
                    }}
                    className="px-6 py-2 border border-neutral-300 text-neutral-700 rounded-lg hover:bg-neutral-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveProduct}
                    className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
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

export default InventoryPage;
