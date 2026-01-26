// Roadmap Repository
// Handles database operations for roadmaps

import { query } from '../../infrastructure/database/connection.js';
import { Roadmap } from '../models/roadmap.model.js';

export class RoadmapRepository {
    // Create a new roadmap
    async create(userId, examType, targetDate, dailyHours, level) {
        const sql = `
            INSERT INTO roadmaps (user_id, exam_type, target_date, daily_hours, level)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING *
        `;

        try {
            const result = await query(sql, [
                userId,
                examType,
                targetDate,
                dailyHours,
                level,
            ]);
            return new Roadmap(result.rows[0]);
        } catch (error) {
            // Handle unique constraint (one roadmap per user)
            if (error.code === '23505') {
                throw new Error('User already has a roadmap. Delete the existing one first.');
            }
            throw error;
        }
    }

    // Find roadmap by user ID
    async findByUserId(userId) {
        const sql = 'SELECT * FROM roadmaps WHERE user_id = $1';
        const result = await query(sql, [userId]);
        
        if (result.rows.length === 0) {
            return null;
        }
        
        return new Roadmap(result.rows[0]);
    }

    // Find roadmap by ID
    async findById(roadmapId) {
        const sql = 'SELECT * FROM roadmaps WHERE id = $1';
        const result = await query(sql, [roadmapId]);
        
        if (result.rows.length === 0) {
            return null;
        }
        
        return new Roadmap(result.rows[0]);
    }

    // Delete roadmap
    async delete(roadmapId) {
        const sql = 'DELETE FROM roadmaps WHERE id = $1 RETURNING *';
        const result = await query(sql, [roadmapId]);
        return result.rows.length > 0;
    }

    // Update roadmap (if user wants to regenerate)
    async update(roadmapId, targetDate, dailyHours, level) {
        const sql = `
            UPDATE roadmaps 
            SET target_date = $1, daily_hours = $2, level = $3, generated_at = NOW()
            WHERE id = $4
            RETURNING *
        `;

        const result = await query(sql, [targetDate, dailyHours, level, roadmapId]);
        
        if (result.rows.length === 0) {
            throw new Error('Roadmap not found');
        }
        
        return new Roadmap(result.rows[0]);
    }
}