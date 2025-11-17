'use client';

import React, { useState, useEffect } from 'react';
import { Star, ThumbsUp, User } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { reviewsApi } from '@/lib/api';
import { Review } from '@/types';
import toast from 'react-hot-toast';

interface ReviewSectionProps {
  productId: string | number;
}

const ReviewSection: React.FC<ReviewSectionProps> = ({ productId }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [averageRating, setAverageRating] = useState(0);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [showReviewForm, setShowReviewForm] = useState(false);
  
  // Review form state
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    fetchReviews();
  }, [productId]);

  const fetchReviews = async () => {
    try {
      const response = await reviewsApi.getByProductId(productId.toString());
      if (response.success && response.data) {
        setReviews(response.data.reviews || []);
        setAverageRating(response.data.averageRating || 0);
        setReviewCount(response.data.reviewCount || 0);
      }
    } catch (error) {
      console.error('Error fetching reviews:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!userName.trim()) {
      toast.error('Please enter your name');
      return;
    }
    
    if (!userEmail.trim() || !userEmail.includes('@')) {
      toast.error('Please enter a valid email');
      return;
    }
    
    if (rating === 0) {
      toast.error('Please select a rating');
      return;
    }

    setSubmitting(true);
    try {
      const response = await reviewsApi.create({
        product_id: productId,
        user_name: userName,
        user_email: userEmail,
        rating,
        comment: comment.trim()
      });

      if (response.success) {
        toast.success('Review submitted successfully!');
        setShowReviewForm(false);
        // Reset form
        setUserName('');
        setUserEmail('');
        setRating(0);
        setComment('');
        // Refresh reviews
        fetchReviews();
      } else {
        toast.error(response.error || 'Failed to submit review');
      }
    } catch (error) {
      toast.error('Failed to submit review');
    } finally {
      setSubmitting(false);
    }
  };

  const handleMarkHelpful = async (reviewId: string) => {
    try {
      const response = await reviewsApi.markHelpful(reviewId);
      if (response.success) {
        // Update the review in state
        setReviews(reviews.map(r => 
          r.id === reviewId 
            ? { ...r, helpful: (r.helpful || 0) + 1 }
            : r
        ));
        toast.success('Thank you for your feedback!');
      }
    } catch (error) {
      toast.error('Failed to mark review as helpful');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="py-8 text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blush-600 mx-auto"></div>
      </div>
    );
  }

  return (
    <div className="py-8 md:py-12">
      {/* Rating Summary */}
      <div className="mb-8 md:mb-12 p-6 md:p-8 bg-gradient-to-br from-blush-50 to-cream-50 rounded-2xl border border-blush-100">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
          <div className="text-center md:text-left">
            <h2 className="text-2xl md:text-3xl font-bold text-neutral-900 mb-3">
              Customer Reviews
            </h2>
            <div className="flex items-center justify-center md:justify-start gap-3">
              <div className="flex">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={24}
                    className={
                      star <= Math.round(averageRating)
                        ? 'text-amber-400 fill-current'
                        : 'text-gray-300'
                    }
                  />
                ))}
              </div>
              <div className="text-lg font-semibold text-neutral-700">
                {averageRating.toFixed(1)} out of 5
              </div>
            </div>
            <p className="text-sm text-neutral-600 mt-2">
              Based on {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'}
            </p>
          </div>
          
          <button
            onClick={() => setShowReviewForm(!showReviewForm)}
            className="premium-gradient text-white px-6 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95"
          >
            {showReviewForm ? 'Cancel' : 'Write a Review'}
          </button>
        </div>
      </div>

      {/* Review Form */}
      <AnimatePresence>
        {showReviewForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 overflow-hidden"
          >
            <form onSubmit={handleSubmitReview} className="bg-white p-6 md:p-8 rounded-2xl border border-blush-100 shadow-sm">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">Write Your Review</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    value={userName}
                    onChange={(e) => setUserName(e.target.value)}
                    className="w-full px-4 py-2.5 border border-blush-200 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500"
                    placeholder="Enter your name"
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-neutral-700 mb-2">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    value={userEmail}
                    onChange={(e) => setUserEmail(e.target.value)}
                    className="w-full px-4 py-2.5 border border-blush-200 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Your Rating *
                </label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      onMouseEnter={() => setHoverRating(star)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="transition-transform hover:scale-110"
                    >
                      <Star
                        size={32}
                        className={
                          star <= (hoverRating || rating)
                            ? 'text-amber-400 fill-current'
                            : 'text-gray-300'
                        }
                      />
                    </button>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <label className="block text-sm font-medium text-neutral-700 mb-2">
                  Your Review
                </label>
                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  rows={4}
                  className="w-full px-4 py-2.5 border border-blush-200 rounded-lg focus:ring-2 focus:ring-blush-500 focus:border-blush-500 resize-none"
                  placeholder="Share your experience with this product..."
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="premium-gradient text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {submitting ? 'Submitting...' : 'Submit Review'}
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Reviews List */}
      <div className="space-y-4 md:space-y-6">
        {reviews.length === 0 ? (
          <div className="text-center py-12 bg-neutral-50 rounded-xl">
            <p className="text-neutral-600 text-lg">No reviews yet. Be the first to review this product!</p>
          </div>
        ) : (
          reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white p-6 md:p-8 rounded-xl border border-neutral-100 hover:shadow-md transition-shadow"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-gradient-to-br from-blush-400 to-blush-600 flex items-center justify-center text-white font-semibold flex-shrink-0">
                  {review.userAvatar ? (
                    <img src={review.userAvatar} alt={review.userName} className="w-full h-full rounded-full object-cover" />
                  ) : (
                    <User size={20} />
                  )}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 mb-2">
                    <div>
                      <h4 className="font-semibold text-neutral-900">{review.userName}</h4>
                      <p className="text-sm text-neutral-500">{formatDate(review.createdAt)}</p>
                    </div>
                    
                    <div className="flex gap-1">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star
                          key={star}
                          size={16}
                          className={
                            star <= review.rating
                              ? 'text-amber-400 fill-current'
                              : 'text-gray-300'
                          }
                        />
                      ))}
                    </div>
                  </div>
                  
                  {review.comment && (
                    <p className="text-neutral-700 mb-4 leading-relaxed">{review.comment}</p>
                  )}
                  
                  <button
                    onClick={() => handleMarkHelpful(review.id)}
                    className="text-sm text-neutral-600 hover:text-blush-600 transition-colors flex items-center gap-2"
                  >
                    <ThumbsUp size={16} />
                    <span>Helpful ({review.helpful || 0})</span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
};

export default ReviewSection;
