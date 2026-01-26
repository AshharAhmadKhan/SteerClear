// Auth Controller
// Handles user registration and login

import { UserRepository } from '../../data/repositories/user.repository.js';
import { hashPassword, comparePassword, validatePasswordStrength } from '../../infrastructure/auth/password.js';
import { generateToken } from '../../infrastructure/auth/jwt.js';
import { config } from '../../infrastructure/config/index.js';

const userRepository = new UserRepository();

// Register new user
export const register = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
            });
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({
                error: 'Invalid email format',
            });
        }

        // Validate password strength
        const passwordValidation = validatePasswordStrength(password);
        if (!passwordValidation.valid) {
            return res.status(400).json({
                error: 'Weak password',
                details: passwordValidation.errors,
            });
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Create user
        const user = await userRepository.create(
            email.toLowerCase(),
            passwordHash,
            config.trial.durationDays
        );

        // Generate JWT token
        const token = generateToken(user.id, user.email);

        // Return user data (no password hash)
        res.status(201).json({
            message: 'User registered successfully',
            user: user.toJSON(),
            token,
        });
    } catch (error) {
        console.error('Registration error:', error);

        if (error.message === 'Email already exists') {
            return res.status(409).json({
                error: 'Email already exists',
            });
        }

        res.status(500).json({
            error: 'Registration failed',
        });
    }
};
// Login existing user
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        // Validate input
        if (!email || !password) {
            return res.status(400).json({
                error: 'Email and password are required',
            });
        }

        // Find user by email
        const user = await userRepository.findByEmail(email.toLowerCase());

        if (!user) {
            return res.status(401).json({
                error: 'Invalid email or password',
            });
        }

        // Verify password
        const isPasswordValid = await comparePassword(password, user.password_hash);

        if (!isPasswordValid) {
            return res.status(401).json({
                error: 'Invalid email or password',
            });
        }

        // Generate JWT token
        const token = generateToken(user.id, user.email);

        // Return user data
        res.status(200).json({
            message: 'Login successful',
            user: user.toJSON(),
            token,
        });
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            error: 'Login failed',
        });
    }
};

// Get current user (requires authentication)
export const getCurrentUser = async (req, res) => {
    try {
        // User ID comes from auth middleware (we'll create this next)
        const userId = req.userId;

        const user = await userRepository.findById(userId);

        if (!user) {
            return res.status(404).json({
                error: 'User not found',
            });
        }

        res.status(200).json({
            user: user.toJSON(),
        });
    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({
            error: 'Failed to fetch user',
        });
    }
};