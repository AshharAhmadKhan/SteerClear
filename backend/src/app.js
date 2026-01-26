// Express Application Setup
// Main entry point for the API server

import express from 'express';
import cors from 'cors';
import { config } from './infrastructure/config/index.js';
import authRoutes from './api/routes/auth.routes.js';
import roadmapRoutes from './api/routes/roadmap.routes.js';
import { authenticateToken } from './api/middleware/auth.middleware.js';
import { requirePremiumAccess } from './api/middleware/trial.middleware.js';

const app = express();

// ============================================
// MIDDLEWARE
// ============================================

// Enable CORS (allow frontend to make requests)
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    credentials: true,
}));

// Parse JSON request bodies
app.use(express.json());

// Parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Request logging (simple)
app.use((req, res, next) => {
    console.log(`${req.method} ${req.path}`);
    next();
});

// ============================================
// ROUTES
// ============================================

// Health check
app.get('/health', (req, res) => {
    res.status(200).json({
        status: 'ok',
        timestamp: new Date().toISOString(),
        environment: config.server.nodeEnv,
    });
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/roadmap', roadmapRoutes);

// Test premium route (requires authentication + valid trial)
app.get('/api/premium/test', authenticateToken, requirePremiumAccess, (req, res) => {
    res.status(200).json({
        message: 'Premium access granted',
        user: req.user.toJSON(),
    });
});

// 404 handler (MUST BE LAST ROUTE)
app.use((req, res) => {
    res.status(404).json({
        error: 'Route not found',
        path: req.path,
    });
});

// ============================================
// ERROR HANDLER
// ============================================

app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    
    res.status(err.status || 500).json({
        error: err.message || 'Internal server error',
        ...(config.server.nodeEnv === 'development' && { stack: err.stack }),
    });
});

// ============================================
// START SERVER
// ============================================

const PORT = config.server.port;

app.listen(PORT, () => {
    console.log('=================================');
    console.log('🚀 SteerClear Backend Started');
    console.log('=================================');
    console.log(`Environment: ${config.server.nodeEnv}`);
    console.log(`Port: ${PORT}`);
    console.log(`Health: http://localhost:${PORT}/health`);
    console.log('=================================');
});

export default app;