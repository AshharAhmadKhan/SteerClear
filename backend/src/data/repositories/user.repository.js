// User Repository
// Handles all database operations for users

import { query } from '../../infrastructure/database/connection.js';
import { User } from '../models/user.model.js';

export class UserRepository {
    // Create a new user
    async create(email, passwordHash, trialDurationDays = 5) {
        const trialEndDate = new Date();
        trialEndDate.setDate(trialEndDate.getDate() + trialDurationDays);

        const sql = `
            INSERT INTO users (email, password_hash, subscription_tier, trial_end_date)
            VALUES ($1, $2, $3, $4)
            RETURNING *
        `;

        try {
            const result = await query(sql, [
                email,
                passwordHash,
                'trial',
                trialEndDate,
            ]);
            return new User(result.rows[0]);
        } catch (error) {
            // Handle unique constraint violation (duplicate email)
            if (error.code === '23505') {
                throw new Error('Email already exists');
            }
            throw error;
        }
    }

    // Find user by email
    async findByEmail(email) {
        const sql = 'SELECT * FROM users WHERE email = $1';
        const result = await query(sql, [email]);
        
        if (result.rows.length === 0) {
            return null;
        }
        
        return new User(result.rows[0]);
    }

    // Find user by ID
    async findById(userId) {
        const sql = 'SELECT * FROM users WHERE id = $1';
        const result = await query(sql, [userId]);
        
        if (result.rows.length === 0) {
            return null;
        }
        
        return new User(result.rows[0]);
    }
    // Update user subscription to premium
    async updateToPremium(userId, durationMonths) {
        const premiumEndDate = new Date();
        premiumEndDate.setMonth(premiumEndDate.getMonth() + durationMonths);

        const sql = `
            UPDATE users 
            SET subscription_tier = $1, trial_end_date = $2, updated_at = NOW()
            WHERE id = $3
            RETURNING *
        `;

        const result = await query(sql, ['premium', premiumEndDate, userId]);
        
        if (result.rows.length === 0) {
            throw new Error('User not found');
        }
        
        return new User(result.rows[0]);
    }

    // Mark trial as expired
    async expireTrial(userId) {
        const sql = `
            UPDATE users 
            SET subscription_tier = $1, updated_at = NOW()
            WHERE id = $2
            RETURNING *
        `;

        const result = await query(sql, ['expired', userId]);
        return result.rows.length > 0 ? new User(result.rows[0]) : null;
    }

    // Get all users with expired trials (for cleanup jobs)
    async findExpiredTrials() {
        const sql = `
            SELECT * FROM users 
            WHERE subscription_tier = 'trial' 
            AND trial_end_date < NOW()
        `;

        const result = await query(sql);
        return result.rows.map(row => new User(row));
    }
}