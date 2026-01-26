// JWT Utility
// Handles JWT token generation and verification

import jwt from 'jsonwebtoken';
import { config } from '../config/index.js';

// Generate JWT token for user
export const generateToken = (userId, email) => {
    const payload = {
        userId,
        email,
    };

    return jwt.sign(payload, config.auth.jwtSecret, {
        expiresIn: config.auth.jwtExpiresIn, // 7 days
    });
};

// Verify JWT token
export const verifyToken = (token) => {
    try {
        const decoded = jwt.verify(token, config.auth.jwtSecret);
        return { valid: true, payload: decoded };
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            return { valid: false, error: 'Token expired' };
        }
        if (error.name === 'JsonWebTokenError') {
            return { valid: false, error: 'Invalid token' };
        }
        return { valid: false, error: 'Token verification failed' };
    }
};

// Extract token from Authorization header
export const extractTokenFromHeader = (authHeader) => {
    if (!authHeader) {
        return null;
    }

    // Expected format: "Bearer <token>"
    const parts = authHeader.split(' ');
    
    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return null;
    }

    return parts[1];
};