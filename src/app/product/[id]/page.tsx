'use client';

import React, { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { Star, Heart, ShoppingCart, ArrowLeft, Truck, Shield, RefreshCw } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import ProductCard from '@/components/ProductCard';
import ReviewSection from '@/components/ReviewSection';
import { productsApi } from '@/lib/api';
import { useCart } from '@/lib/cart-context';

interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  category: string;
  image_url?: string;
  images?: string[];
  stock?: number;
  rating?: number;
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
      : ['/placeholder.jpg'];
  
  const productImage = productImages[selectedImageIndex];
  const inStock = (product.stock || 0) > 0;

  const productColors = product.colors || [];
  const productSizes = product.sizes || [];

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumb */}
        <nav className="flex items-center space-x-2 text-sm text-neutral-600 mb-8">
          <Link href="/" className="hover:text-primary-600">Home</Link>
          <span>/</span>
          <Link href="/products" className="hover:text-primary-600">Products</Link>
          <span>/</span>
          <Link href={`/category/${product.category}`} className="hover:text-primary-600 capitalize">
            {product.category}
          </Link>
          <span>/</span>
          <span className="text-neutral-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          {/* Product Images */}
          <div className="space-y-4">
            {/* Main Image */}
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-gray-100">
              <Image
                src={productImage}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
            </div>
            
            {/* Image Thumbnails */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-4">
                {productImages.map((img: string, index: number) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImageIndex(index)}
                    className={`relative aspect-square rounded-lg overflow-hidden border-2 transition-all ${
                      selectedImageIndex === index ? 'border-primary-600 ring-2 ring-primary-200' : 'border-transparent hover:border-neutral-300'
                    }`}
                  >
                    <Image
                      src={img}
                      alt={`${product.name} ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold text-neutral-900 mb-4">{product.name}</h1>
              
              {/* Rating */}
              <div className="flex items-center space-x-2 mb-4">
                <div className="flex">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={20}
                      className={
                        star <= (product.rating || 0)
                          ? 'text-yellow-400 fill-current'
                          : 'text-gray-300'
                      }
                    />
                  ))}
                </div>
                <span className="text-neutral-600">({product.rating || 0} rating)</span>
              </div>

              {/* Price */}
              <div className="flex items-center space-x-4 mb-6">
                <span className="text-3xl font-bold text-neutral-900">
                  ৳{typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
                </span>
              </div>

              {/* Description */}
              <div 
                className="text-neutral-600 mb-6 leading-relaxed prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ 
                  __html: product.description || 'No description available.' 
                }}
              />

              {/* Stock Status */}
              <div className="mb-6">
                <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                  inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {inStock ? `In Stock (${product.stock} available)` : 'Out of Stock'}
                </span>
              </div>

              {/* SKU */}
              {product.sku && (
                <div className="mb-6">
                  <span className="text-sm text-neutral-600">SKU: {product.sku}</span>
                </div>
              )}

              {/* Color Selection */}
              {productColors.length > 0 && (
                <div className="mb-6">
                  <h3 className="font-medium text-neutral-900 mb-3">Select Color</h3>
                  <div className="flex flex-wrap gap-2">
                    {productColors.map((color: string) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                          selectedColor === color
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-neutral-300 hover:border-primary-300 text-neutral-700'
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
                <div className="mb-6">
                  <h3 className="font-medium text-neutral-900 mb-3">Select Size</h3>
                  <div className="flex flex-wrap gap-2">
                    {productSizes.map((size: string) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border-2 rounded-lg font-medium transition-all ${
                          selectedSize === size
                            ? 'border-primary-600 bg-primary-50 text-primary-700'
                            : 'border-neutral-300 hover:border-primary-300 text-neutral-700'
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity */}
              <div className="mb-8">
                <h3 className="font-medium text-neutral-900 mb-3">Quantity</h3>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center hover:border-primary-300"
                  >
                    -
                  </button>
                  <span className="w-16 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="w-10 h-10 rounded-lg border border-neutral-300 flex items-center justify-center hover:border-primary-300"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Add to Cart & Wishlist */}
              <div className="flex space-x-4 mb-8">
                <button
                  onClick={handleAddToCart}
                  disabled={!inStock}
                  className={`flex-1 py-3 px-6 rounded-lg font-medium inline-flex items-center justify-center space-x-2 ${
                    inStock
                      ? 'premium-gradient text-white elegant-shadow btn-hover'
                      : 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <ShoppingCart size={20} />
                  <span>{inStock ? 'Add to Cart' : 'Out of Stock'}</span>
                </button>
                <button
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  className={`p-3 rounded-lg border transition-colors ${
                    isWishlisted
                      ? 'border-red-300 bg-red-50 text-red-600'
                      : 'border-neutral-300 hover:border-primary-300'
                  }`}
                >
                  <Heart size={20} className={isWishlisted ? 'fill-current' : ''} />
                </button>
              </div>

              {/* Features */}
              <div className="border-t pt-8 space-y-4">
                <div className="flex items-center space-x-3">
                  <Truck className="text-primary-600" size={20} />
                  <span className="text-neutral-700">Free shipping on orders over ৳5,000</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Shield className="text-primary-600" size={20} />
                  <span className="text-neutral-700">Secure payment with SSL encryption</span>
                </div>
                <div className="flex items-center space-x-3">
                  <RefreshCw className="text-primary-600" size={20} />
                  <span className="text-neutral-700">7-day easy return & exchange</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Reviews Section */}
        <section className="border-t pt-8 md:pt-12">
          <ReviewSection productId={product.id} />
        </section>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <section className="py-16 border-t">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-neutral-900 mb-4">
                Related Products
              </h2>
              <p className="text-xl text-neutral-600">
                You might also like these items
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} product={relatedProduct} />
              ))}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ProductDetailPage;