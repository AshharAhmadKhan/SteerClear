// Password Utility
// Handles password hashing and verification using bcrypt

import bcrypt from 'bcrypt';
import { config } from '../config/index.js';

// Hash a plain text password
export const hashPassword = async (plainPassword) => {
    const saltRounds = config.auth.bcryptSaltRounds; // 10
    return await bcrypt.hash(plainPassword, saltRounds);
};

// Compare plain password with hashed password
export const comparePassword = async (plainPassword, hashedPassword) => {
    return await bcrypt.compare(plainPassword, hashedPassword);
};

// Validate password strength (basic rules)
export const validatePasswordStrength = (password) => {
    const errors = [];

    if (password.length < 8) {
        errors.push('Password must be at least 8 characters long');
    }

    if (!/[A-Z]/.test(password)) {
        errors.push('Password must contain at least one uppercase letter');
    }

    if (!/[a-z]/.test(password)) {
        errors.push('Password must contain at least one lowercase letter');
    }

    if (!/[0-9]/.test(password)) {
        errors.push('Password must contain at least one number');
    }

    return {
        valid: errors.length === 0,
        errors,
    };
};