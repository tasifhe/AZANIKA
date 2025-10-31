'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';
import Link from 'next/link';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    // Update state so the next render will show the fallback UI
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log error to error reporting service in production
    this.setState({ error, errorInfo });
    
    // In development, log to console
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  render() {
    if (this.state.hasError) {
      // Render custom fallback UI if provided
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="min-h-screen bg-gradient-to-br from-cream-50 via-white to-blush-50 flex items-center justify-center px-4">
          <div className="max-w-md w-full text-center">
            <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-10">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-6">
                <AlertTriangle className="text-red-600" size={40} />
              </div>
              
              <h1 className="text-2xl font-bold text-neutral-900 mb-4">
                Oops! Something went wrong
              </h1>
              
              <p className="text-neutral-600 mb-6">
                We encountered an unexpected error. This has been reported to our team.
              </p>
              
              <div className="space-y-3">
                <button
                  onClick={this.handleRetry}
                  className="w-full premium-gradient text-white py-3 rounded-lg font-semibold text-base inline-flex items-center justify-center shadow-lg hover:shadow-xl transition-all"
                >
                  <RefreshCw className="mr-2 w-5 h-5" />
                  Try Again
                </button>
                
                <Link
                  href="/"
                  className="w-full bg-neutral-100 text-neutral-700 py-3 rounded-lg font-semibold hover:bg-neutral-200 transition-colors inline-flex items-center justify-center"
                >
                  <Home className="mr-2 w-5 h-5" />
                  Go Home
                </Link>
              </div>
              
              {process.env.NODE_ENV === 'development' && this.state.error && (
                <details className="mt-6 text-left">
                  <summary className="cursor-pointer text-sm text-neutral-500 hover:text-neutral-700">
                    Error Details (Development Only)
                  </summary>
                  <div className="mt-2 p-3 bg-red-50 rounded-lg text-xs text-red-800 font-mono overflow-auto">
                    <div className="mb-2">
                      <strong>Error:</strong> {this.state.error.message}
                    </div>
                    <div className="mb-2">
                      <strong>Stack:</strong>
                      <pre className="whitespace-pre-wrap">{this.state.error.stack}</pre>
                    </div>
                    {this.state.errorInfo && (
                      <div>
                        <strong>Component Stack:</strong>
                        <pre className="whitespace-pre-wrap">{this.state.errorInfo.componentStack}</pre>
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;