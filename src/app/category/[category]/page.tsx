'use client';

import React from 'react';
import { useParams, redirect } from 'next/navigation';
import { mockCategories } from '@/lib/data';

const CategoryPage = () => {
  const params = useParams();
  const categorySlug = params.category as string;
  
  const category = mockCategories.find(c => c.slug === categorySlug);
  
  if (!category) {
    redirect('/products');
  }

  // Redirect to products page with category filter
  redirect(`/products?category=${categorySlug}`);
};

export default CategoryPage;