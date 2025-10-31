'use client';

import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';

interface NewsletterSignupProps {
  className?: string;
  theme?: 'light' | 'dark';
}

const NewsletterSignup: React.FC<NewsletterSignupProps> = ({ className = '', theme = 'dark' }) => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!email) {
      setError('Please enter your email address');
      return;
    }

    if (!isValidEmail(email)) {
      setError('Please enter a valid email address');
      return;
    }

    setIsSubmitting(true);

    try {
      // Simulate API call - replace with actual newsletter service
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setIsSubmitted(true);
      setEmail('');
      
      // Reset after 5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
      }, 5000);
    } catch (error) {
      setError('Something went wrong. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
    return emailRegex.test(email);
  };

  if (isSubmitted) {
    return (
      <div className={`flex items-center justify-center space-x-3 ${className}`}>
        <CheckCircle className={`w-6 h-6 ${theme === 'dark' ? 'text-white' : 'text-green-600'}`} />
        <span className={`font-medium ${theme === 'dark' ? 'text-white' : 'text-green-600'}`}>
          Thank you for subscribing! Check your inbox for confirmation.
        </span>
      </div>
    );
  }

  return (
    <div className={className}>
      <form onSubmit={handleSubmit} className="w-full">
        <div className="flex elegant-shadow">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email address"
            className={`flex-1 px-4 py-3 rounded-l-lg border-0 focus:ring-2 ${
              theme === 'dark' 
                ? 'focus:ring-cream-300 text-neutral-900' 
                : 'focus:ring-primary-500 text-neutral-900'
            } ${error ? 'ring-2 ring-red-400' : ''}`}
            disabled={isSubmitting}
          />
          <button
            type="submit"
            disabled={isSubmitting || !email.trim()}
            className={`px-6 py-3 rounded-r-lg font-medium transition-colors flex items-center space-x-2 ${
              theme === 'dark'
                ? 'bg-white text-primary-600 hover:bg-cream-50'
                : 'bg-primary-600 text-white hover:bg-primary-700'
            } disabled:opacity-50 disabled:cursor-not-allowed`}
          >
            {isSubmitting ? (
              <div className="animate-spin rounded-full h-4 w-4 border-2 border-current border-t-transparent" />
            ) : (
              <>
                <Send size={16} />
                <span>Subscribe</span>
              </>
            )}
          </button>
        </div>
        
        {error && (
          <p className={`text-sm mt-2 ${theme === 'dark' ? 'text-red-200' : 'text-red-600'}`}>
            {error}
          </p>
        )}
        
        <p className={`text-xs mt-3 ${theme === 'dark' ? 'text-cream-200' : 'text-neutral-600'}`}>
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
};

export default NewsletterSignup;