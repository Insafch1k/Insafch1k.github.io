import { Router } from 'express';
import { checkAuth, getAllUsers, login, logout, registration } from '../controllers/userController.js';
import upload from '../middleware/upload.js';
import { authenticateToken } from '../middleware/authMiddleware.js';

const router = Router();

router.get('/users', getAllUsers);
router.post('/users/registration', upload.single('avatar'), registration);
router.post('/login', login);
router.get('/login', authenticateToken, checkAuth);
router.delete('/logout', logout);

export default router;

