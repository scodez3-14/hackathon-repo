import express from 'express';
import { authenticateJWT } from '../middleware/auth.js';
import { updateProfile, getProfile } from '../controllers/profileController.js';
import { registerUser, loginUser, verifyEmailOtp } from '../controllers/userController.js';
// Email verification route
router.post('/verify-email', verifyEmailOtp);
import { registerAuthority, loginAuthority } from '../controllers/authorityController.js';

const router = express.Router();

// Profile routes (require login)
router.get('/profile', authenticateJWT, getProfile);
router.put('/profile', authenticateJWT, updateProfile);

// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Authority routes
router.post('/authority/register', registerAuthority);
router.post('/authority-login', loginAuthority);

export default router;
