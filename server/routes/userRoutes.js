import { Router } from 'express';
import { getAllUsers, registration } from '../controllers/userController.js';
import upload from '../middleware/upload.js';

const router = Router();

router.get('/users', getAllUsers);
router.post('/users/registration', upload.single('avatar'), registration);

export default router;

