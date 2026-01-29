// Application Configuration
// Centralizes all environment variables

import dotenv from 'dotenv';

dotenv.config();

export const config = {
    server: {
        port: process.env.PORT || 3000,
        nodeEnv: process.env.NODE_ENV || 'development',
    },
    
    database: {
        url: process.env.DATABASE_URL,
    },
    
    auth: {
        jwtSecret: process.env.JWT_SECRET,
        jwtExpiresIn: '7d', // JWT valid for 7 days
        bcryptSaltRounds: 10,
    },
    
    trial: {
        durationDays: parseInt(process.env.TRIAL_DURATION_DAYS) || 5,
    },
};

// Validate required environment variables
const requiredEnvVars = ['DATABASE_URL', 'JWT_SECRET'];

requiredEnvVars.forEach((varName) => {
    if (!process.env[varName]) {
        console.error(`✗ Missing required environment variable: ${varName}`);
        process.exit(1);
    }
});

console.log('✓ Configuration loaded');