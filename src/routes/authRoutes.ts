import { Router } from 'express';
import { register, login } from '../controllers/authController';
import { registrationValidator, loginValidator } from '../validators/authValidators';

const router = Router();

router.post('/register', registrationValidator, register);
router.post('/login', loginValidator, login);

export default router;
