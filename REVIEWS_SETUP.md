# Reviews Feature Setup Guide

## Overview
This guide explains how to set up the reviews and rating system for the AZANIKA e-commerce platform.

## Features
- ⭐ 5-star rating system
- 📝 Written reviews with comments
- 👍 Helpful review marking
- 📊 Automatic product rating calculation
- 🎨 Beautiful, responsive UI
- 🔄 Real-time updates

## Database Setup

### 1. Run the Migration Script

From the `AZANIKA/server` directory, run:

```bash
npm run setup-reviews
```

This will:
- Create the `reviews` table
- Add indexes for performance
- Create triggers to auto-update product ratings
- Insert sample reviews for testing

### 2. Verify the Setup

Connect to your Supabase database and verify:

```sql
-- Check reviews table
SELECT * FROM reviews;

-- Check product ratings
SELECT id, name, rating FROM products;
```

## API Endpoints

### Get Reviews for a Product
```
GET /api/reviews/product/:productId
```

Response:
```json
{
  "success": true,
  "data": {
    "reviews": [...],
    "averageRating": 4.5,
    "reviewCount": 10
  }
}
```

### Create a Review
```
POST /api/reviews
```

Body:
```json
{
  "product_id": 1,
  "user_name": "John Doe",
  "user_email": "john@example.com",
  "rating": 5,
  "comment": "Great product!"
}
```

### Mark Review as Helpful
```
POST /api/reviews/:reviewId/helpful
```

## Frontend Integration

The reviews are automatically displayed on product detail pages via the `ReviewSection` component.

### Component Usage

```tsx
import ReviewSection from '@/components/ReviewSection';

<ReviewSection productId={product.id} />
```

### Features
- Display all reviews with ratings
- Average rating calculation
- Review submission form with validation
- Star rating input (hover effect)
- Helpful button with count
- Responsive design for mobile/desktop
- Loading states
- Toast notifications

## Testing

1. **View existing reviews**: Navigate to any product page
2. **Submit a review**: Click "Write a Review" button
3. **Mark helpful**: Click the thumbs up button on any review
4. **Check rating**: Product rating updates automatically

## Database Schema

### Reviews Table
```sql
- id: SERIAL PRIMARY KEY
- product_id: INTEGER (foreign key to products)
- user_id: INTEGER (foreign key to users, nullable)
- rating: INTEGER (1-5)
- comment: TEXT
- helpful_count: INTEGER
- created_at: TIMESTAMP
- updated_at: TIMESTAMP
```

### Automatic Features
- Product rating auto-updates when reviews change
- Timestamps auto-update on modification
- Indexes for fast queries

## Styling
The component uses:
- Tailwind CSS for styling
- Framer Motion for animations
- Custom blush/cream color scheme matching the site theme
- Fully responsive design

## Future Enhancements
- Review images
- Review verification (verified purchase)
- Review replies
- Sort and filter reviews
- Review moderation (admin panel)
- User review history

## Troubleshooting

### Reviews not showing?
1. Check if the database migration ran successfully
2. Verify API endpoint is accessible
3. Check browser console for errors
4. Ensure CORS is configured properly

### Rating not updating?
1. Check database triggers are created
2. Verify the `update_product_rating()` function exists
3. Check server logs for errors

### Can't submit review?
1. Verify all required fields are filled
2. Check network tab for API errors
3. Ensure email format is valid
4. Check server is running
