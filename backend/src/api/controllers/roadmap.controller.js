// Roadmap Controller
// Handles roadmap generation and retrieval

import { RoadmapRepository } from '../../data/repositories/roadmap.repository.js';
import { RoadmapGenerator } from '../../domain/roadmap/generator.js';

const roadmapRepository = new RoadmapRepository();

// Generate new roadmap
export const generateRoadmap = async (req, res) => {
    try {
        const userId = req.userId; // From auth middleware
        const { target_date, daily_hours, level } = req.body;

        // Validate input
        if (!target_date || !daily_hours || !level) {
            return res.status(400).json({
                error: 'target_date, daily_hours, and level are required',
            });
        }

        // Validate level
        if (!['beginner', 'intermediate', 'advanced'].includes(level)) {
            return res.status(400).json({
                error: 'level must be beginner, intermediate, or advanced',
            });
        }

        // Validate daily hours
        if (daily_hours < 1 || daily_hours > 10) {
            return res.status(400).json({
                error: 'daily_hours must be between 1 and 10',
            });
        }

        // Validate target date is in future
        const targetDate = new Date(target_date);
        if (targetDate <= new Date()) {
            return res.status(400).json({
                error: 'target_date must be in the future',
            });
        }

        // Check if user already has a roadmap
        const existingRoadmap = await roadmapRepository.findByUserId(userId);
        if (existingRoadmap) {
            return res.status(409).json({
                error: 'Roadmap already exists',
                message: 'Delete your existing roadmap before generating a new one',
                roadmap_id: existingRoadmap.id,
            });
        }

        // Generate roadmap using algorithm
        const generator = new RoadmapGenerator(target_date, daily_hours, level);
        const generatedData = generator.generate();

        // Save roadmap to database
        const roadmap = await roadmapRepository.create(
            userId,
            'UPSC_CSE_PRELIMS',
            target_date,
            daily_hours,
            level
        );

        // Return roadmap + generated plan
        res.status(201).json({
            message: 'Roadmap generated successfully',
            roadmap: roadmap.toJSON(),
            plan: {
                coverage: generatedData.coverage,
                timeData: generatedData.timeData,
                monthlyPlan: generatedData.monthlyPlan,
                subjectAllocation: generatedData.subjectAllocation,
            },
        });
    } catch (error) {
        console.error('Roadmap generation error:', error);

        if (error.message.includes('Target date must be in the future')) {
            return res.status(400).json({
                error: error.message,
            });
        }

        res.status(500).json({
            error: 'Failed to generate roadmap',
        });
    }
};

// Get current user's roadmap
export const getCurrentRoadmap = async (req, res) => {
    try {
        const userId = req.userId;

        const roadmap = await roadmapRepository.findByUserId(userId);

        if (!roadmap) {
            return res.status(404).json({
                error: 'Roadmap not found',
                message: 'Generate a roadmap first',
            });
        }

        // Regenerate plan from roadmap data
        const generator = new RoadmapGenerator(
            roadmap.target_date,
            roadmap.daily_hours,
            roadmap.level
        );
        const generatedData = generator.generate();

        res.status(200).json({
            roadmap: roadmap.toJSON(),
            plan: {
                coverage: generatedData.coverage,
                timeData: generatedData.timeData,
                monthlyPlan: generatedData.monthlyPlan,
                subjectAllocation: generatedData.subjectAllocation,
            },
        });
    } catch (error) {
        console.error('Get roadmap error:', error);
        res.status(500).json({
            error: 'Failed to fetch roadmap',
        });
    }
};

// Delete roadmap
export const deleteRoadmap = async (req, res) => {
    try {
        const userId = req.userId;

        const roadmap = await roadmapRepository.findByUserId(userId);

        if (!roadmap) {
            return res.status(404).json({
                error: 'Roadmap not found',
            });
        }

        await roadmapRepository.delete(roadmap.id);

        res.status(200).json({
            message: 'Roadmap deleted successfully',
        });
    } catch (error) {
        console.error('Delete roadmap error:', error);
        res.status(500).json({
            error: 'Failed to delete roadmap',
        });
    }
};