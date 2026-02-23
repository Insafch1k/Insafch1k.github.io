import { Review } from '../models/review.js';

export const getAllReviews = async (req, res) => {
  try {
    const reviews = await Review.findAll();
    res.status(200).json(reviews);
  } catch (error) {
    console.error('Failed to get reviews:', error);
    res.status(500).json({ message: 'Failed to get reviews' });
  }
};

