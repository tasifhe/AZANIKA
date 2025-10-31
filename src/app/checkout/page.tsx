'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowLeft, Lock, CreditCard, Truck } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useCart } from '@/lib/cart-context';
import { useRouter } from 'next/navigation';

interface CheckoutForm {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  cardName: string;
}

const CheckoutPage = () => {
  const { items, total, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CheckoutForm>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    phone: '',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardName: ''
  });

  const shipping = total > 100 ? 0 : 15;
  const tax = total * 0.08; // 8% tax
  const grandTotal = total + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    // Simulate payment processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Clear cart and redirect to success page
    clearCart();
    router.push('/order-success');
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <h1 className="text-3xl font-bold text-neutral-900 mb-4">Your Cart is Empty</h1>
            <p className="text-neutral-600 mb-8">
              Please add some items to your cart before checkout.
            </p>
            <Link
              href="/products"
              className="premium-gradient text-white px-8 py-3 rounded-lg font-medium inline-flex items-center"
            >
              <ArrowLeft className="mr-2" size={20} />
              Continue Shopping
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <Link href="/" className="hover:text-blush-600">Home</Link>
          <span>/</span>
          <Link href="/cart" className="hover:text-blush-600">Cart</Link>
          <span>/</span>
          <span className="text-neutral-900">Checkout</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="bg-white rounded-lg p-8 shadow-sm">
            <h1 className="text-2xl font-bold text-neutral-900 mb-8">Checkout</h1>

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Contact Information */}
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4">Contact Information</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      First Name *
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Last Name *
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                </div>
              </section>

              {/* Shipping Address */}
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                  <Truck className="mr-2" size={20} />
                  Shipping Address
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Address *
                    </label>
                    <input
                      type="text"
                      name="address"
                      required
                      value={formData.address}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      City *
                    </label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      State *
                    </label>
                    <input
                      type="text"
                      name="state"
                      required
                      value={formData.state}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      ZIP Code *
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      required
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                </div>
              </section>

              {/* Payment Information */}
              <section>
                <h2 className="text-lg font-semibold text-neutral-900 mb-4 flex items-center">
                  <CreditCard className="mr-2" size={20} />
                  Payment Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Cardholder Name *
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      required
                      value={formData.cardName}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-neutral-700 mb-1">
                      Card Number *
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      required
                      placeholder="1234 5678 9012 3456"
                      value={formData.cardNumber}
                      onChange={handleInputChange}
                      className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        Expiry Date *
                      </label>
                      <input
                        type="text"
                        name="expiryDate"
                        required
                        placeholder="MM/YY"
                        value={formData.expiryDate}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-neutral-700 mb-1">
                        CVV *
                      </label>
                      <input
                        type="text"
                        name="cvv"
                        required
                        placeholder="123"
                        value={formData.cvv}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 border border-neutral-300 rounded-lg focus:ring-blush-500 focus:border-blush-500"
                      />
                    </div>
                  </div>
                </div>
              </section>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full premium-gradient text-white py-3 px-6 rounded-lg font-medium elegant-shadow btn-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {loading ? (
                  <div className="animate-spin rounded-full h-6 w-6 border-2 border-white border-t-transparent" />
                ) : (
                  <>
                    <Lock className="mr-2" size={20} />
                    Complete Order - ${grandTotal.toFixed(2)}
                  </>
                )}
              </button>

              <p className="text-xs text-neutral-600 text-center">
                Your payment information is encrypted and secure.
              </p>
            </form>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg p-8 shadow-sm h-fit">
            <h2 className="text-xl font-bold text-neutral-900 mb-6">Order Summary</h2>

            {/* Items */}
            <div className="space-y-4 mb-6">
              {items.map((item) => (
                <div key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`} 
                     className="flex space-x-3">
                  <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-neutral-100 flex-shrink-0">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-neutral-900 truncate">
                      {item.product.name}
                    </h3>
                    <div className="text-xs text-neutral-600 space-y-1">
                      {item.selectedColor && <p>Color: {item.selectedColor}</p>}
                      {item.selectedSize && <p>Size: {item.selectedSize}</p>}
                      <p>Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-neutral-900">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>

            {/* Price Breakdown */}
            <div className="space-y-3 border-t pt-4">
              <div className="flex justify-between">
                <span className="text-neutral-600">Subtotal</span>
                <span className="font-medium">${total.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Shipping</span>
                <span className="font-medium">
                  {shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-neutral-600">Tax</span>
                <span className="font-medium">${tax.toFixed(2)}</span>
              </div>
              <hr className="border-neutral-300" />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>${grandTotal.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Back to Cart */}
        <div className="mt-8">
          <Link
            href="/cart"
            className="text-blush-600 hover:text-blush-700 font-medium inline-flex items-center"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Cart
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default CheckoutPage;
