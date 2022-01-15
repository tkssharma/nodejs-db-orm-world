import { Router } from 'express';
import {
  register,
  login,
  refreshToken,
  logout,
} from '../controllers/authController'

const router = Router();
router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);

export default router;