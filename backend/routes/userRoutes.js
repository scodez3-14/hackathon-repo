
import express from 'express';

import { registerUser, loginUser } from '../controllers/userController.js';
import { registerAuthority, loginAuthority } from '../controllers/authorityController.js';

const router = express.Router();


// User routes
router.post('/register', registerUser);
router.post('/login', loginUser);

// Authority routes
router.post('/authority/register', registerAuthority);
router.post('/authority-login', loginAuthority);

export default router;
