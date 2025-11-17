import express from 'express';
import pool from '../config/supabase';

const router = express.Router();

// Get reviews for a product
router.get('/product/:productId', async (req, res) => {
  try {
    const { productId } = req.params;
    
    const result = await pool.query(
      `SELECT 
        r.id,
        r.product_id,
        r.user_id,
        r.rating,
        r.comment,
        r.created_at,
        r.helpful_count,
        u.name as user_name,
        u.email as user_email
       FROM reviews r
       LEFT JOIN users u ON r.user_id = u.id
       WHERE r.product_id = $1
       ORDER BY r.created_at DESC`,
      [productId]
    );

    // Calculate average rating
    const avgResult = await pool.query(
      'SELECT AVG(rating) as average_rating, COUNT(*) as review_count FROM reviews WHERE product_id = $1',
      [productId]
    );

    res.json({
      success: true,
      data: {
        reviews: result.rows,
        averageRating: parseFloat(avgResult.rows[0].average_rating) || 0,
        reviewCount: parseInt(avgResult.rows[0].review_count) || 0
      }
    });
  } catch (error: any) {
    console.error('Error fetching reviews:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch reviews',
      message: error.message
    });
  }
});

// Create a new review
router.post('/', async (req, res) => {
  try {
    const { product_id, user_id, user_name, user_email, rating, comment } = req.body;

    // Validate input
    if (!product_id || !rating || rating < 1 || rating > 5) {
      return res.status(400).json({
        success: false,
        error: 'Invalid input. Product ID and rating (1-5) are required.'
      });
    }

    // Create or get user (optional - can be guest review)
    let userId = user_id || null;
    if (!userId && (user_name || user_email)) {
      try {
        const userResult = await pool.query(
          'INSERT INTO users (name, email) VALUES ($1, $2) ON CONFLICT (email) DO UPDATE SET name = $1 RETURNING id',
          [user_name || 'Anonymous', user_email || `guest${Date.now()}@azanika.com`]
        );
        userId = userResult.rows[0].id;
      } catch (error) {
        // If user creation fails, continue with null user_id (anonymous review)
        userId = null;
      }
    }

    // Insert review
    const result = await pool.query(
      `INSERT INTO reviews (product_id, user_id, rating, comment, helpful_count)
       VALUES ($1, $2, $3, $4, 0)
       RETURNING *`,
      [product_id, userId, rating, comment || '']
    );

    // Update product rating
    const avgResult = await pool.query(
      'SELECT AVG(rating) as avg_rating FROM reviews WHERE product_id = $1',
      [product_id]
    );

    await pool.query(
      'UPDATE products SET rating = $1 WHERE id = $2',
      [parseFloat(avgResult.rows[0].avg_rating), product_id]
    );

    res.status(201).json({
      success: true,
      data: result.rows[0],
      message: 'Review submitted successfully'
    });
  } catch (error: any) {
    console.error('Error creating review:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create review',
      message: error.message
    });
  }
});

// Mark review as helpful
router.post('/:reviewId/helpful', async (req, res) => {
  try {
    const { reviewId } = req.params;

    const result = await pool.query(
      'UPDATE reviews SET helpful_count = helpful_count + 1 WHERE id = $1 RETURNING *',
      [reviewId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Review not found'
      });
    }

    res.json({
      success: true,
      data: result.rows[0]
    });
  } catch (error: any) {
    console.error('Error marking review as helpful:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to update review',
      message: error.message
    });
  }
});

export default router;
