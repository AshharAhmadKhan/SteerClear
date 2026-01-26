// Auth Routes
// Defines authentication endpoints

import express from 'express';
import { register, login, getCurrentUser } from '../controllers/auth.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// Public routes (no authentication required)
router.post('/register', register);
router.post('/login', login);

// Protected routes (authentication required)
router.get('/me', authenticateToken, getCurrentUser);

export default router;