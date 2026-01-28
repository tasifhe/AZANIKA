'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, ArrowLeft, Truck, Shield, RefreshCw, Package } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ReviewSection from '@/components/ReviewSection';
import ProductImageGallery from '@/components/ProductImageGallery';
import StickyAddToCart from '@/components/StickyAddToCart';
import { WishlistButton } from '@/components/Wishlist';
import { productsApi } from '@/lib/api';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  originalPrice?: number;
  category: string;
  image_url?: string;
  images?: string[];
  stock?: number;
  rating?: number;
  reviewCount?: number;
  sku?: string;
  colors?: string[];
  sizes?: string[];
}

const ProductDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const addToCartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (params.id) {
      fetchProduct();
      fetchRelatedProducts();
    }
  }, [params.id]);

  const fetchProduct = async () => {
    try {
      const response: any = await productsApi.getById(params.id as string);
      if (response.success && response.data) {
        setProduct(response.data);
      }
    } catch (error) {
      // Handle error silently in production
      // TODO: Implement proper error logging service
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const response: any = await productsApi.getAll();
      if (response.success && response.data) {
        const filtered = response.data
          .filter((p: Product) => p.id.toString() !== params.id)
          .slice(0, 4);
        setRelatedProducts(filtered);
      }
    } catch (error) {
      // Handle error silently in production
      // TODO: Implement proper error logging service
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 mx-auto"></div>
          <p className="mt-4 text-neutral-600">Loading product...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <h1 className="text-3xl font-bold text-neutral-900 mb-4">Product Not Found</h1>
          <p className="text-neutral-600 mb-8">The product you're looking for doesn't exist.</p>
          <Link 
            href="/products"
            className="premium-gradient text-white px-6 py-3 rounded-lg font-medium inline-flex items-center"
          >
            <ArrowLeft className="mr-2" size={20} />
            Back to Products
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    addToCart(product as any, quantity, selectedColor, selectedSize);
  };

  const productImages = product.images && product.images.length > 0 
    ? product.images 
    : product.image_url 
      ? [product.image_url]
      : ['https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&q=85'];
  
  const inStock = (product.stock || 0) > 0;

  const productColors = product.colors || [];
  const productSizes = product.sizes || [];

  // Scroll to size/color section
  const scrollToOptions = () => {
    document.getElementById('product-options')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-pearl-600 mb-8">
          <Link href="/" className="hover:text-brand-600 transition-colors">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-brand-600 transition-colors">Products</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-brand-600 transition-colors capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-pearl-900 font-medium">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 mb-16">
          {/* Product Images - New Gallery Component */}
          <ProductImageGallery 
            images={productImages} 
            productName={product.name} 
          />

          {/* Product Info */}
          <div className="space-y-6">
            {/* Category Badge */}
            <span className="inline-block text-xs font-semibold text-brand-600 uppercase tracking-wider bg-brand-50 px-3 py-1 rounded-full">
              {product.category}
            </span>

            <div>
              <h1 className="text-3xl md:text-4xl font-display font-bold text-pearl-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-3 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={
                        star <= (product.rating || 0)
                          ? 'text-brand-500 fill-current'
                          : 'text-pearl-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-pearl-600">
                  {product.rating || 0} ({product.reviewCount || 0} reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-center gap-3 mb-6" ref={addToCartRef}>
                <span className="text-3xl font-bold text-brand-600">
                  ৳{typeof product.price === 'number' ? product.price.toLocaleString() : product.price}
                </span>
                {product.originalPrice && (
                  <>
                    <span className="text-lg text-pearl-400 line-through">
                      ৳{product.originalPrice.toLocaleString()}
                    </span>
                    <span className="text-sm font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {Math.round((1 - product.price / product.originalPrice) * 100)}% OFF
                    </span>
                  </>
                )}
              </div>

              {/* Description */}
              <div 
                className="text-pearl-600 mb-6 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: product.description || 'Elegant fashion accessory crafted with attention to detail. Perfect for any occasion.' 
                }}
              />

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold ${
                  inStock 
                    ? 'bg-green-50 text-green-700 border border-green-200' 
                    : 'bg-red-50 text-red-700 border border-red-200'
                }`}>
                  <span className={`w-2 h-2 rounded-full ${inStock ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                  {inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* SKU */}
              {product.sku && (
                <div className="mb-6">
                  <span className="text-sm text-pearl-500">SKU: <span className="font-mono">{product.sku}</span></span>
                </div>
              )}

              {/* Product Options Container */}
              <div id="product-options" className="space-y-6 py-6 border-y border-pearl-200">
                {/* Color Selection */}
                {productColors.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-pearl-900 mb-3">Select Color</h3>
                    <div className="flex flex-wrap gap-2">
                      {productColors.map((color: string) => (
                        <button
                          key={color}
                          onClick={() => setSelectedColor(color)}
                          className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                            selectedColor === color
                              ? 'border-brand-500 bg-brand-50 text-brand-700'
                              : 'border-pearl-200 hover:border-brand-300 text-pearl-700'
                          }`}
                        >
                          {color}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Size Selection */}
                {productSizes.length > 0 && (
                  <div>
                    <h3 className="font-semibold text-pearl-900 mb-3">Select Size</h3>
                    <div className="flex flex-wrap gap-2">
                      {productSizes.map((size: string) => (
                        <button
                          key={size}
                          onClick={() => setSelectedSize(size)}
                          className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                            selectedSize === size
                              ? 'border-brand-500 bg-brand-50 text-brand-700'
                              : 'border-pearl-200 hover:border-brand-300 text-pearl-700'
                          }`}
                        >
                          {size}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Quantity */}
                <div>
                  <h3 className="font-semibold text-pearl-900 mb-3">Quantity</h3>
                  <div className="flex items-center">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="w-12 h-12 rounded-l-lg border-2 border-pearl-200 flex items-center justify-center hover:bg-pearl-50 transition-colors text-lg font-semibold"
                    >
                      -
                    </button>
                    <span className="w-16 h-12 border-y-2 border-pearl-200 text-center font-semibold flex items-center justify-center">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="w-12 h-12 rounded-r-lg border-2 border-pearl-200 flex items-center justify-center hover:bg-pearl-50 transition-colors text-lg font-semibold"
                    >
                      +
                    </button>
                  </div>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex gap-4 py-6">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex-1 py-4 px-6 rounded-xl font-semibold inline-flex items-center justify-center gap-3 transition-all duration-300 ${
                    inStock
                      ? 'bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white shadow-lg hover:shadow-xl hover:-translate-y-0.5'
                      : 'bg-pearl-200 text-pearl-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <WishlistButton
                  product={product as any}
                  className="p-4 rounded-xl border-2 border-pearl-200 hover:border-blush-400 hover:bg-blush-50 transition-all"
                />
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-t border-pearl-200">
                <div className="flex items-center gap-3 p-4 bg-pearl-50 rounded-xl">
                  <div className="p-2 bg-brand-100 rounded-lg">
                    <Truck className="text-brand-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-pearl-900 text-sm">Free Shipping</p>
                    <p className="text-xs text-pearl-500">Orders over ৳5,000</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-pearl-50 rounded-xl">
                  <div className="p-2 bg-brand-100 rounded-lg">
                    <Shield className="text-brand-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-pearl-900 text-sm">Secure Payment</p>
                    <p className="text-xs text-pearl-500">SSL Encryption</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-4 bg-pearl-50 rounded-xl">
                  <div className="p-2 bg-brand-100 rounded-lg">
                    <Package className="text-brand-600" size={20} />
                  </div>
                  <div>
                    <p className="font-semibold text-pearl-900 text-sm">Easy Returns</p>
                    <p className="text-xs text-pearl-500">7-day policy</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="border-t border-pearl-200 pt-12">
          <ReviewSection productId={product.id} />
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 border-t border-pearl-200">
            <div className="text-center mb-12">
              <div className="flex items-center justify-center gap-4 mb-4">
                <span className="w-16 h-[2px] bg-gradient-to-r from-transparent to-brand-400" />
                <span className="text-brand-500 text-sm font-semibold tracking-[0.3em] uppercase">More to Love</span>
                <span className="w-16 h-[2px] bg-gradient-to-l from-transparent to-brand-400" />
              </div>
              <h2 className="text-3xl font-display font-bold text-pearl-900 mb-4">
                Related Products
              </h2>
              <p className="text-pearl-600 text-lg">
                You might also like these items
              </p>
            </div>

            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      {/* Sticky Add to Cart Bar */}
      <StickyAddToCart
        product={{
          id: product.id.toString(),
          name: product.name,
          price: product.price,
          originalPrice: product.originalPrice,
          image_url: product.image_url,
          images: product.images,
          stock: product.stock,
        }}
        triggerRef={addToCartRef as React.RefObject<HTMLElement>}
        selectedSize={selectedSize}
        selectedColor={selectedColor}
        onSizeClick={scrollToOptions}
        onColorClick={scrollToOptions}
      />

      <Footer />
    </div>
  );
};

export default ProductDetailPage;