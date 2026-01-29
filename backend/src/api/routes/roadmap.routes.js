// Roadmap Routes
// Defines roadmap endpoints
import express from 'express';
import { generateRoadmap, getCurrentRoadmap, deleteRoadmap } from '../controllers/roadmap.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';

const router = express.Router();

// All roadmap routes require authentication (removed premium check for MVP)
router.post('/generate', authenticateToken, generateRoadmap);
router.get('/current', authenticateToken, getCurrentRoadmap);
router.delete('/current', authenticateToken, deleteRoadmap);

export default router;