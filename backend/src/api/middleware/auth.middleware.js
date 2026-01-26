// Auth Middleware
// Verifies JWT tokens and attaches user to request

import { verifyToken, extractTokenFromHeader } from '../../infrastructure/auth/jwt.js';

// Authenticate JWT token
export const authenticateToken = (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = extractTokenFromHeader(authHeader);

    if (!token) {
        return res.status(401).json({
            error: 'Authentication required',
        });
    }

    const result = verifyToken(token);

    if (!result.valid) {
        return res.status(403).json({
            error: result.error,
        });
    }

    // Attach user info to request
    req.userId = result.payload.userId;
    req.userEmail = result.payload.email;

    next();
};