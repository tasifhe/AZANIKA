'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, Lock, Eye, EyeOff, User, Phone, ArrowRight, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      alert('Passwords do not match!');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically call your authentication API
    console.log('Signup attempt:', formData);
    
    setIsLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-blush-50">
      <Header />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Branding */}
          <div className="hidden lg:block">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full premium-gradient mb-4">
                <ShoppingBag className="text-white" size={40} />
              </div>
              <h1 className="text-4xl font-bold text-neutral-900 mb-4">
                Join <span className="gradient-text">AZANIKA</span>
              </h1>
              <p className="text-lg text-neutral-600 max-w-md mx-auto">
                Create an account to unlock exclusive benefits, save your favorite items, and enjoy seamless shopping.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-center space-x-3 text-left bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0">
                    <ShoppingBag className="text-blush-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Exclusive Deals</h3>
                    <p className="text-sm text-neutral-600">Get special member discounts</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-3 text-left bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0">
                    <User className="text-blush-600" size={20} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Wishlist & Favorites</h3>
                    <p className="text-sm text-neutral-600">Save items for later</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Signup Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Create Account</h2>
                <p className="text-neutral-600">Sign up to get started</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="text-neutral-400" size={20} />
                    </div>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 transition-all"
                      placeholder="John Doe"
                      required
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Mail className="text-neutral-400" size={20} />
                    </div>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Phone className="text-neutral-400" size={20} />
                    </div>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 transition-all"
                      placeholder="+880 1712-345678"
                      required
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label htmlFor="password" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="text-neutral-400" size={20} />
                    </div>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      id="password"
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 transition-all"
                      placeholder="Create a password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Confirm Password Field */}
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-semibold text-neutral-700 mb-2">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Lock className="text-neutral-400" size={20} />
                    </div>
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full pl-10 pr-12 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 transition-all"
                      placeholder="Confirm your password"
                      required
                      minLength={6}
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-neutral-400 hover:text-neutral-600"
                    >
                      {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                </div>

                {/* Terms & Conditions */}
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 mt-1 text-blush-600 border-neutral-300 rounded focus:ring-blush-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-neutral-600">
                    I agree to the{' '}
                    <Link href="/terms" className="text-blush-600 hover:text-blush-700 font-medium">
                      Terms & Conditions
                    </Link>
                    {' '}and{' '}
                    <Link href="/privacy" className="text-blush-600 hover:text-blush-700 font-medium">
                      Privacy Policy
                    </Link>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full premium-gradient text-white py-3 rounded-lg font-semibold text-base flex items-center justify-center shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <span>Creating account...</span>
                  ) : (
                    <>
                      Create Account
                      <ArrowRight className="ml-2" size={20} />
                    </>
                  )}
                </button>
              </form>

              {/* Sign In Link */}
              <p className="mt-6 text-center text-sm text-neutral-600">
                Already have an account?{' '}
                <Link href="/auth/login" className="text-blush-600 hover:text-blush-700 font-semibold">
                  Sign in
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default SignupPage;
