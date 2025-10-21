'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import AdminSidebar from '@/components/AdminSidebar';
import { Settings, Store, User, Lock, Bell, Palette, Mail } from 'lucide-react';

const AdminSettingsPage = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);
  
  const [storeSettings, setStoreSettings] = useState({
    storeName: 'AZANIKA',
    storeEmail: 'contact@azanika.com',
    storePhone: '+1 (555) 123-4567',
    storeAddress: '123 Fashion Street, NY 10001',
    currency: 'USD',
    taxRate: '8.5'
  });

  const [profileSettings, setProfileSettings] = useState({
    name: 'Admin User',
    email: 'admin@azanika.com',
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notificationSettings, setNotificationSettings] = useState({
    orderNotifications: true,
    lowStockAlerts: true,
    customerMessages: false,
    marketingEmails: false
  });

  useEffect(() => {
    const token = localStorage.getItem('adminToken');
    if (!token) {
      router.push('/admin/login');
      return;
    }
    
    // Load settings from localStorage
    const savedStoreSettings = localStorage.getItem('storeSettings');
    if (savedStoreSettings) {
      setStoreSettings(JSON.parse(savedStoreSettings));
    }
    
    const savedNotifications = localStorage.getItem('notificationSettings');
    if (savedNotifications) {
      setNotificationSettings(JSON.parse(savedNotifications));
    }
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
    router.push('/admin/login');
  };

  const handleSaveStore = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    // Save to localStorage (in production, this would be an API call)
    localStorage.setItem('storeSettings', JSON.stringify(storeSettings));
    
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (profileSettings.newPassword && profileSettings.newPassword !== profileSettings.confirmPassword) {
      alert('New passwords do not match!');
      return;
    }
    
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      alert('Profile updated successfully!');
      setProfileSettings({
        ...profileSettings,
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
      });
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  const handleSaveNotifications = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    localStorage.setItem('notificationSettings', JSON.stringify(notificationSettings));
    
    setTimeout(() => {
      setLoading(false);
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    }, 500);
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <AdminSidebar onLogout={handleLogout} />
      
      <div className="ml-64 flex-1 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-neutral-900 mb-2">Settings</h1>
          <p className="text-neutral-600">Manage your store configuration and preferences</p>
        </div>

        {saved && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-800 px-4 py-3 rounded-lg">
            ✓ Settings saved successfully!
          </div>
        )}

        {/* Store Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <Store className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-neutral-900">Store Information</h2>
          </div>
          <form onSubmit={handleSaveStore}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Store Name</label>
                <input
                  type="text"
                  value={storeSettings.storeName}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeName: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Store Email</label>
                <input
                  type="email"
                  value={storeSettings.storeEmail}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeEmail: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Phone Number</label>
                <input
                  type="tel"
                  value={storeSettings.storePhone}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storePhone: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Currency</label>
                <select
                  value={storeSettings.currency}
                  onChange={(e) => setStoreSettings({ ...storeSettings, currency: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="USD">USD - US Dollar</option>
                  <option value="EUR">EUR - Euro</option>
                  <option value="GBP">GBP - British Pound</option>
                  <option value="INR">INR - Indian Rupee</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-neutral-700 mb-2">Store Address</label>
                <input
                  type="text"
                  value={storeSettings.storeAddress}
                  onChange={(e) => setStoreSettings({ ...storeSettings, storeAddress: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Tax Rate (%)</label>
                <input
                  type="number"
                  step="0.1"
                  value={storeSettings.taxRate}
                  onChange={(e) => setStoreSettings({ ...storeSettings, taxRate: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 premium-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Store Settings'}
            </button>
          </form>
        </div>

        {/* Profile Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex items-center space-x-3 mb-6">
            <User className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-neutral-900">Profile Settings</h2>
          </div>
          <form onSubmit={handleSaveProfile}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Name</label>
                <input
                  type="text"
                  value={profileSettings.name}
                  onChange={(e) => setProfileSettings({ ...profileSettings, name: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-neutral-700 mb-2">Email</label>
                <input
                  type="email"
                  value={profileSettings.email}
                  onChange={(e) => setProfileSettings({ ...profileSettings, email: e.target.value })}
                  className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                />
              </div>
              <div className="md:col-span-2 border-t border-neutral-200 pt-4 mt-4">
                <h3 className="text-sm font-semibold text-neutral-900 mb-4">Change Password</h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Current Password</label>
                    <input
                      type="password"
                      value={profileSettings.currentPassword}
                      onChange={(e) => setProfileSettings({ ...profileSettings, currentPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">New Password</label>
                    <input
                      type="password"
                      value={profileSettings.newPassword}
                      onChange={(e) => setProfileSettings({ ...profileSettings, newPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-2">Confirm New Password</label>
                    <input
                      type="password"
                      value={profileSettings.confirmPassword}
                      onChange={(e) => setProfileSettings({ ...profileSettings, confirmPassword: e.target.value })}
                      className="w-full px-4 py-2 border border-neutral-300 rounded-lg focus:ring-primary-500 focus:border-primary-500"
                    />
                  </div>
                </div>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 premium-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Profile Settings'}
            </button>
          </form>
        </div>

        {/* Notification Settings */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="flex items-center space-x-3 mb-6">
            <Bell className="text-primary-600" size={24} />
            <h2 className="text-xl font-bold text-neutral-900">Notification Preferences</h2>
          </div>
          <form onSubmit={handleSaveNotifications}>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">Order Notifications</p>
                  <p className="text-sm text-neutral-500">Receive notifications for new orders</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.orderNotifications}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, orderNotifications: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">Low Stock Alerts</p>
                  <p className="text-sm text-neutral-500">Get alerted when products are running low</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.lowStockAlerts}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, lowStockAlerts: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">Customer Messages</p>
                  <p className="text-sm text-neutral-500">Notifications for customer inquiries</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.customerMessages}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, customerMessages: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-neutral-50 rounded-lg">
                <div>
                  <p className="font-medium text-neutral-900">Marketing Emails</p>
                  <p className="text-sm text-neutral-500">Updates and marketing communications</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input
                    type="checkbox"
                    checked={notificationSettings.marketingEmails}
                    onChange={(e) => setNotificationSettings({ ...notificationSettings, marketingEmails: e.target.checked })}
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-neutral-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-neutral-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-primary-600"></div>
                </label>
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="mt-6 premium-gradient text-white px-6 py-3 rounded-lg font-medium hover:opacity-90 disabled:opacity-50"
            >
              {loading ? 'Saving...' : 'Save Notification Settings'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminSettingsPage;
