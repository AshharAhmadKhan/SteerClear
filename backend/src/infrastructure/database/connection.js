// Database Connection Module
// Handles PostgreSQL connection via pg library

import pg from 'pg';
import { config } from 'dotenv';

// Load environment variables from .env file
config({ path: '.env' });

const { Pool } = pg;

// Create connection pool
const pool = new Pool({
    host: 'ep-proud-credit-a1elcr6u-pooler.ap-southeast-1.aws.neon.tech',
    port: 5432,
    database: 'neondb',
    user: 'neondb_owner',
    password: 'npg_GH3DtvE6yRuJ',
    ssl: {
        rejectUnauthorized: false
    },
    max: 10,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

// Test connection on startup
pool.on('connect', () => {
    console.log('✓ Database connected');
});

pool.on('error', (err) => {
    console.error('✗ Unexpected database error:', err);
    process.exit(-1);
});

// Export query function
export const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

// Export pool for transactions
export const getClient = async () => {
    const client = await pool.connect();
    const query = client.query.bind(client);
    const release = client.release.bind(client);
    
    // Patch release to log
    client.release = () => {
        console.log('Client released');
        release();
    };
    
    return { query, release };
};

export default pool;