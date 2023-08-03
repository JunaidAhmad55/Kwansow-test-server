import { Router } from 'express';
import { getUser } from '../controllers/userController';
import { authenticateUser } from '../middleware/authMiddleware';

const router = Router();

router.get('/user', authenticateUser, getUser);

export default router;
