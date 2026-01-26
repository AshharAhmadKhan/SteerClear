// Roadmap Routes
// Defines roadmap endpoints

import express from 'express';
import { generateRoadmap, getCurrentRoadmap, deleteRoadmap } from '../controllers/roadmap.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { requirePremiumAccess } from '../middleware/trial.middleware.js';

const router = express.Router();

// All roadmap routes require authentication + premium access
router.post('/generate', authenticateToken, requirePremiumAccess, generateRoadmap);
router.get('/current', authenticateToken, requirePremiumAccess, getCurrentRoadmap);
router.delete('/current', authenticateToken, requirePremiumAccess, deleteRoadmap);

export default router;