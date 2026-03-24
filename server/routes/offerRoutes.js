import { Router } from 'express';
import upload from '../middleware/upload.js';
import { createOffer, getAllOffers, getFullOffer, getFavoriteOffers, toggleFavorite } from '../controllers/offerController.js';
import { authenticateToken } from '../middleware/authMiddleware.js';
import { optionalAuthenticate } from '../middleware/optionalAuthMiddleware.js';

const router = new Router();

router.get('/offers', optionalAuthenticate, getAllOffers);
router.post('/offers', upload.fields([
    { name: 'previewImage', maxCount: 1 },
    { name: 'photos', maxCount: 6 }
]), createOffer);
router.get('/offers/:id', optionalAuthenticate, getFullOffer);
router.get('/favorite', authenticateToken, getFavoriteOffers);
router.post('/favorite/:offerId/:status', authenticateToken, toggleFavorite);

export default router;  
