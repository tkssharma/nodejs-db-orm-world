import { Router } from 'express';
import {
  deleteAccount,
  login,
  logout,
  refreshToken,
  register,
} from '../controllers/authController';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.post('/refresh-token', refreshToken);
router.post('/logout', logout);
router.delete('/delete-account', deleteAccount);

export default router;
