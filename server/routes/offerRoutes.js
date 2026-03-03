import { Router } from 'express';
import {
  getAllOffers,
  createOffer,
  getFullOffer,
  getFavoriteOffers,
  toggleFavorite,
} from '../controllers/offerController.js';
import upload from '../middleware/upload.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/offers', getAllOffers);
router.get('/offers/favorite', getFavoriteOffers);
router.get('/offers/:id', getFullOffer);
router.post('/offers/favorite/:offerId/:status', authenticateToken, toggleFavorite);

router.post(
  '/offers',
  upload.fields([
    { name: 'previewImage', maxCount: 1 },
    { name: 'photos', maxCount: 6 },
  ]),
  createOffer,
);

export default router;

