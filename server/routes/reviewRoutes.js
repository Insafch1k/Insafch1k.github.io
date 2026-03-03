import { Router } from 'express';
import { addReview, getAllReviews, getReviewsByOfferId } from '../controllers/reviewController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/reviews', getAllReviews);
router.get('/reviews/:offerId', getReviewsByOfferId);
router.post('/reviews/:offerId', authenticateToken, addReview);

export default router;

