'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import RichTextEditor from '@/components/RichTextEditor';
import { productsApi } from '@/lib/api';
import { Plus, Edit, Trash2, Search, Package } from 'lucide-react';

interface Product {
  id: number;
  name: string;
  description: string;
  price: string;
  stock: number;
  category: string;
  image_url?: string;
  images?: string[];
  colors?: string[];
  sizes?: string[];
  sku: string;
}

const AdminProductsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    image_url: '',
    images: '',
    colors: '',
    sizes: '',
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

  const handleAddProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Format the data for API
    const productData = {
      ...formData,
      images: formData.images ? formData.images.split(',').map(s => s.trim()).filter(Boolean) : [],
      colors: formData.colors ? formData.colors.split(',').map(s => s.trim()).filter(Boolean) : [],
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()).filter(Boolean) : [],
    };
    
    const response = await productsApi.create(productData);
    if (response.success) {
      alert('Product added successfully!');
      setShowAddModal(false);
      setFormData({ name: '', description: '', price: '', stock: '', category: '', image_url: '', images: '', colors: '', sizes: '', sku: '' });
      fetchProducts();
    } else {
      alert(`Error: ${response.error}`);
    }
  };

  const handleEditProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct) return;
    
    // Format the data for API
    const productData = {
      ...formData,
      images: formData.images ? formData.images.split(',').map(s => s.trim()).filter(Boolean) : [],
      colors: formData.colors ? formData.colors.split(',').map(s => s.trim()).filter(Boolean) : [],
      sizes: formData.sizes ? formData.sizes.split(',').map(s => s.trim()).filter(Boolean) : [],
    };
    
    const response = await productsApi.update(editingProduct.id.toString(), productData);
    if (response.success) {
      alert('Product updated successfully!');
      setEditingProduct(null);
      setFormData({ name: '', description: '', price: '', stock: '', category: '', image_url: '', images: '', colors: '', sizes: '', sku: '' });
      fetchProducts();
    } else {
      alert(`Error: ${response.error}`);
    }
  };

  const handleDeleteProduct = async (id: number) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    
    const response = await productsApi.delete(id.toString());
    if (response.success) {
      alert('Product deleted successfully!');
      fetchProducts();
    } else {
      alert(`Error: ${response.error}`);
    }
  };

  const startEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price,
      stock: product.stock.toString(),
      category: product.category,
      image_url: product.image_url || '',
      images: Array.isArray(product.images) ? product.images.join(', ') : '',
      colors: Array.isArray(product.colors) ? product.colors.join(', ') : '',
      sizes: Array.isArray(product.sizes) ? product.sizes.join(', ') : '',
      sku: product.sku
    });
  };

  const filteredProducts = products.filter(p => 
    p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.sku.toLowerCase().includes(searchQuery.toLowerCase()) ||
    p.category.toLowerCase().includes(searchQuery.toLowerCase())
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
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-neutral-900 mb-2">Products</h1>
            <p className="text-neutral-600">Manage your product catalog</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="premium-gradient text-white px-6 py-3 rounded-lg font-medium flex items-center space-x-2 hover:opacity-90"
          >
            <Plus size={20} />
            <span>Add Product</span>
          </button>
        </div>

        {/* Search */}
        <div className="mb-6">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
            />
            <Search className="absolute left-3 top-3.5 text-neutral-400" size={20} />
          </div>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <table className="w-full">
            <thead className="bg-neutral-50">
              <tr>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Product</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">SKU</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Category</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Price</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Stock</th>
                <th className="text-left py-4 px-6 text-sm font-semibold text-neutral-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((product) => (
                <tr key={product.id} className="border-t border-neutral-100 hover:bg-neutral-50">
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-neutral-200 rounded-lg flex items-center justify-center">
                        <Package className="text-neutral-500" size={20} />
                      </div>
                      <div>
                        <p className="font-medium text-neutral-900">{product.name}</p>
                        <p className="text-sm text-neutral-500">
                          {product.description.replace(/<[^>]*>/g, '').substring(0, 50)}...
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-sm text-neutral-600">{product.sku}</td>
                  <td className="py-4 px-6">
                    <span className="px-2 py-1 bg-primary-100 text-primary-700 rounded-full text-xs font-medium">
                      {product.category}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-sm font-medium text-neutral-900">৳{product.price}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      product.stock < 10 ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                    }`}>
                      {product.stock} units
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => startEdit(product)}
                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg"
                      >
                        <Edit size={18} />
                      </button>
                      <button
                        onClick={() => handleDeleteProduct(product.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Add/Edit Modal */}
        {(showAddModal || editingProduct) && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6">
                {editingProduct ? 'Edit Product' : 'Add New Product'}
              </h2>
              <form onSubmit={editingProduct ? handleEditProduct : handleAddProduct}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Product Name</label>
                    <input
                      type="text"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Description</label>
                    <RichTextEditor
                      value={formData.description}
                      onChange={(value) => setFormData({ ...formData, description: value })}
                      placeholder="Enter product description with formatting..."
                    />
                    <p className="text-xs text-neutral-500 mt-2">
                      Use the toolbar above to format your description. Bold, italic, lists, and more are supported.
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Price</label>
                      <input
                        type="number"
                        step="0.01"
                        value={formData.price}
                        onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Stock</label>
                      <input
                        type="number"
                        value={formData.stock}
                        onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Category</label>
                      <input
                        type="text"
                        value={formData.category}
                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">SKU</label>
                      <input
                        type="text"
                        value={formData.sku}
                        onChange={(e) => setFormData({ ...formData, sku: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        required
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Main Image URL</label>
                    <input
                      type="url"
                      value={formData.image_url}
                      onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Additional Images (comma-separated URLs)</label>
                    <textarea
                      value={formData.images}
                      onChange={(e) => setFormData({ ...formData, images: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                      placeholder="https://example.com/img1.jpg, https://example.com/img2.jpg"
                      rows={2}
                    />
                    <p className="text-xs text-neutral-500 mt-1">Separate multiple image URLs with commas</p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Colors (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.colors}
                        onChange={(e) => setFormData({ ...formData, colors: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        placeholder="Red, Blue, Black"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-2">Sizes (comma-separated)</label>
                      <input
                        type="text"
                        value={formData.sizes}
                        onChange={(e) => setFormData({ ...formData, sizes: e.target.value })}
                        className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                        placeholder="S, M, L, XL"
                      />
                    </div>
                  </div>
                </div>
                <div className="mt-6 flex space-x-4">
                  <button
                    type="submit"
                    className="flex-1 premium-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90"
                  >
                    {editingProduct ? 'Update Product' : 'Add Product'}
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setShowAddModal(false);
                      setEditingProduct(null);
                      setFormData({ name: '', description: '', price: '', stock: '', category: '', image_url: '', images: '', colors: '', sizes: '', sku: '' });
                    }}
                    className="flex-1 bg-neutral-200 text-neutral-700 px-6 py-3 rounded-lg font-medium hover:bg-neutral-300"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminProductsPage;
