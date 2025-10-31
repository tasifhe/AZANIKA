import { Product, Category } from '@/types';

// Mock product data for AZANIKA Fashion Accessories
export const mockProducts: Product[] = [
  {
    id: '1',
    name: 'Elegant Pearl Statement Necklace',
    description: 'A stunning multi-layered pearl necklace that adds sophistication to any outfit. Perfect for both casual and formal occasions.',
    price: 89.99,
    originalPrice: 129.99,
    images: [
      'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=500&q=80',
      'https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=500&q=80'
    ],
    category: 'jewelry',
    subcategory: 'necklaces',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 124,
    colors: ['White', 'Cream', 'Rose Gold'],
    tags: ['elegant', 'pearl', 'statement', 'formal']
  },
  {
    id: '2',
    name: 'Vintage Leather Crossbody Bag',
    description: 'Handcrafted genuine leather crossbody bag with vintage-inspired details. Perfect size for everyday essentials.',
    price: 149.99,
    originalPrice: 199.99,
    images: [
      'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=500&q=80',
      'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500&q=80'
    ],
    category: 'bags',
    subcategory: 'crossbody',
    inStock: true,
    featured: true,
    rating: 4.9,
    reviewCount: 89,
    colors: ['Brown', 'Black', 'Tan'],
    tags: ['vintage', 'leather', 'crossbody', 'everyday']
  },
  {
    id: '3',
    name: 'Delicate Gold Chain Bracelet',
    description: 'Minimalist 18k gold-plated chain bracelet. Adjustable length, perfect for layering or wearing alone.',
    price: 39.99,
    originalPrice: 59.99,
    images: [
      'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&q=80',
      'https://images.unsplash.com/photo-1573408301185-9146fe634ad0?w=500&q=80'
    ],
    category: 'jewelry',
    subcategory: 'bracelets',
    inStock: true,
    featured: false,
    rating: 4.7,
    reviewCount: 67,
    colors: ['Gold', 'Silver', 'Rose Gold'],
    tags: ['minimalist', 'gold', 'delicate', 'layering']
  },
  {
    id: '4',
    name: 'Silk Paisley Print Scarf',
    description: 'Luxurious 100% silk scarf with intricate paisley print. Versatile accessory that can be worn multiple ways.',
    price: 79.99,
    images: [
      'https://images.unsplash.com/photo-1582142306909-195724d33d70?w=500&q=80',
      'https://images.unsplash.com/photo-1594736797933-d0d3536cf561?w=500&q=80'
    ],
    category: 'scarves',
    inStock: true,
    featured: true,
    rating: 4.6,
    reviewCount: 45,
    colors: ['Navy', 'Burgundy', 'Emerald'],
    tags: ['silk', 'paisley', 'luxury', 'versatile']
  },
  {
    id: '5',
    name: 'Crystal Stud Earrings Set',
    description: 'Set of 3 pairs of crystal stud earrings in different sizes. Hypoallergenic and perfect for sensitive ears.',
    price: 29.99,
    originalPrice: 49.99,
    images: [
      'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&q=80',
      'https://images.unsplash.com/photo-1564421256276-8212dff75709?w=500&q=80'
    ],
    category: 'jewelry',
    subcategory: 'earrings',
    inStock: true,
    featured: false,
    rating: 4.5,
    reviewCount: 156,
    colors: ['Clear', 'Pink', 'Blue'],
    tags: ['crystal', 'stud', 'hypoallergenic', 'set']
  },
  {
    id: '6',
    name: 'Designer Sunglasses',
    description: 'Premium UV protection sunglasses with polarized lenses. Stylish cat-eye frame design.',
    price: 119.99,
    images: [
      'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=500&q=80',
      'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=500&q=80'
    ],
    category: 'sunglasses',
    inStock: true,
    featured: true,
    rating: 4.8,
    reviewCount: 78,
    colors: ['Black', 'Tortoiseshell', 'Rose Gold'],
    tags: ['designer', 'UV protection', 'polarized', 'cat-eye']
  }
];

export const mockCategories: Category[] = [
  {
    id: '1',
    name: 'Jewelry',
    slug: 'jewelry',
    image: 'https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=300&q=80',
    description: 'Elegant jewelry pieces to complement your style',
    productCount: 45,
    subcategories: [
      { id: '1a', name: 'Necklaces', slug: 'necklaces', categoryId: '1' },
      { id: '1b', name: 'Earrings', slug: 'earrings', categoryId: '1' },
      { id: '1c', name: 'Bracelets', slug: 'bracelets', categoryId: '1' },
      { id: '1d', name: 'Rings', slug: 'rings', categoryId: '1' }
    ]
  },
  {
    id: '2',
    name: 'Handbags',
    slug: 'bags',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=300&q=80',
    description: 'Premium handbags for every occasion',
    productCount: 32,
    subcategories: [
      { id: '2a', name: 'Crossbody', slug: 'crossbody', categoryId: '2' },
      { id: '2b', name: 'Tote Bags', slug: 'tote', categoryId: '2' },
      { id: '2c', name: 'Evening Bags', slug: 'evening', categoryId: '2' },
      { id: '2d', name: 'Backpacks', slug: 'backpacks', categoryId: '2' }
    ]
  },
  {
    id: '3',
    name: 'Scarves',
    slug: 'scarves',
    image: 'https://images.unsplash.com/photo-1582142306909-195724d33d70?w=300&q=80',
    description: 'Luxurious scarves and wraps',
    productCount: 28,
  },
  {
    id: '4',
    name: 'Sunglasses',
    slug: 'sunglasses',
    image: 'https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=300&q=80',
    description: 'Stylish eyewear with UV protection',
    productCount: 19,
  }
];

// Helper functions
export const getFeaturedProducts = () => mockProducts.filter(p => p.featured);
export const getProductsByCategory = (categorySlug: string) => 
  mockProducts.filter(p => p.category === categorySlug);
export const getProductById = (id: string) => 
  mockProducts.find(p => p.id === id);
export const searchProducts = (query: string) => 
  mockProducts.filter(p => 
    p.name.toLowerCase().includes(query.toLowerCase()) ||
    p.description.toLowerCase().includes(query.toLowerCase()) ||
    p.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
  );
