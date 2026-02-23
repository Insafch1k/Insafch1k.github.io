import { Router } from 'express';
import { getAllReviews } from '../controllers/reviewController.js';

const router = Router();

router.get('/reviews', getAllReviews);

export default router;

