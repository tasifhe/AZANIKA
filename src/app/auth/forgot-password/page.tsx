'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Mail, ArrowLeft, CheckCircle, ShoppingBag } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Here you would typically call your password reset API
    // TODO: Implement actual password reset logic
    
    setIsLoading(false);
    setIsSuccess(true);
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-blush-50">
        <Header />
        
        <div className="max-w-md mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <div className="bg-white rounded-3xl shadow-2xl p-10 text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-6">
              <CheckCircle className="text-green-600" size={40} />
            </div>
            
            <h2 className="text-2xl font-bold text-neutral-900 mb-3">
              Check Your Email
            </h2>
            
            <p className="text-neutral-600 mb-6">
              We've sent password reset instructions to <span className="font-semibold text-neutral-900">{email}</span>
            </p>
            
            <div className="bg-blush-50 border border-blush-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-neutral-700">
                <strong>Didn't receive the email?</strong> Check your spam folder or try again with a different email address.
              </p>
            </div>
            
            <div className="space-y-3">
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setEmail('');
                }}
                className="w-full bg-neutral-100 text-neutral-700 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition-colors"
              >
                Try Another Email
              </button>
              
              <Link
                href="/auth/login"
                className="block w-full text-blush-600 py-3 rounded-lg font-semibold hover:bg-blush-50 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    );
  }

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
                <span className="gradient-text">AZANIKA</span>
              </h1>
              <p className="text-lg text-neutral-600 max-w-md mx-auto">
                Don't worry! It happens to the best of us. Enter your email and we'll send you instructions to reset your password.
              </p>
              
              <div className="mt-8 space-y-4">
                <div className="flex items-start space-x-3 text-left bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blush-600 font-bold">1</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Enter Your Email</h3>
                    <p className="text-sm text-neutral-600">Provide the email associated with your account</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 text-left bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blush-600 font-bold">2</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Check Your Inbox</h3>
                    <p className="text-sm text-neutral-600">We'll send you a reset link via email</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-3 text-left bg-white/80 backdrop-blur-sm p-4 rounded-xl shadow-sm">
                  <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center flex-shrink-0 mt-1">
                    <span className="text-blush-600 font-bold">3</span>
                  </div>
                  <div>
                    <h3 className="font-semibold text-neutral-900">Reset Password</h3>
                    <p className="text-sm text-neutral-600">Follow the link to create a new password</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Side - Reset Form */}
          <div className="w-full max-w-md mx-auto">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              {/* Back Button */}
              <Link
                href="/auth/login"
                className="inline-flex items-center text-neutral-600 hover:text-blush-600 mb-6 transition-colors"
              >
                <ArrowLeft size={20} className="mr-2" />
                Back to Login
              </Link>

              <div className="mb-8">
                <h2 className="text-3xl font-bold text-neutral-900 mb-2">Forgot Password?</h2>
                <p className="text-neutral-600">No worries, we'll send you reset instructions.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 border border-neutral-300 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 transition-all"
                      placeholder="you@example.com"
                      required
                    />
                  </div>
                  <p className="mt-2 text-xs text-neutral-500">
                    We'll send a password reset link to this email
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full premium-gradient text-white py-3 rounded-lg font-semibold text-base shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isLoading ? 'Sending...' : 'Send Reset Link'}
                </button>
              </form>

              {/* Additional Info */}
              <div className="mt-6 p-4 bg-blush-50 rounded-lg">
                <p className="text-sm text-neutral-700">
                  <strong>Need help?</strong> Contact our support team at{' '}
                  <a href="mailto:support@azanika.com" className="text-blush-600 hover:text-blush-700 font-medium">
                    support@azanika.com
                  </a>
                </p>
              </div>

              {/* Sign Up Link */}
              <p className="mt-6 text-center text-sm text-neutral-600">
                Don't have an account?{' '}
                <Link href="/auth/signup" className="text-blush-600 hover:text-blush-700 font-semibold">
                  Sign up
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

export default ForgotPasswordPage;
