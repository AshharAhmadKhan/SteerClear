// Trial Middleware
// Enforces trial expiry and premium access checks

import { UserRepository } from '../../data/repositories/user.repository.js';

const userRepository = new UserRepository();

// Check if user has premium access (trial not expired or has premium subscription)
export const requirePremiumAccess = async (req, res, next) => {
    try {
        // userId comes from authenticateToken middleware (must run before this)
        const userId = req.userId;

        if (!userId) {
            return res.status(401).json({
                error: 'Authentication required',
            });
        }

        // Fetch user from database
        const user = await userRepository.findById(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        // Check if trial expired
        if (user.isTrialExpired()) {
            return res.status(403).json({
                error: 'Trial expired',
                message: 'Your trial has expired. Upgrade to premium to continue.',
                upgradeRequired: true,
                trial_end_date: user.trial_end_date,
            });
        }

        // Check if user has premium access
        if (!user.hasPremiumAccess() && user.subscription_tier === 'expired') {
            return res.status(403).json({
                error: 'Access denied',
                message: 'Premium subscription required',
                upgradeRequired: true,
            });
        }

        // User has valid access - attach user object to request
        req.user = user;
        
        next();
    } catch (error) {
        console.error('Trial middleware error:', error);
        res.status(500).json({
            error: 'Failed to verify access',
        });
    }
};

// Optional: Middleware to mark expired trials (can be used in a cron job)
export const markExpiredTrials = async () => {
    try {
        const expiredUsers = await userRepository.findExpiredTrials();
        
        for (const user of expiredUsers) {
            await userRepository.expireTrial(user.id);
            console.log(`Marked trial as expired for user: ${user.email}`);
        }
        
        return expiredUsers.length;
    } catch (error) {
        console.error('Error marking expired trials:', error);
        throw error;
    }
};