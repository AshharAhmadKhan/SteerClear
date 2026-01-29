// Roadmap Controller
// Handles roadmap generation and retrieval

import { RoadmapRepository } from '../../data/repositories/roadmap.repository.js';
import { RoadmapGenerator } from '../../domain/roadmap/generator.js';

const roadmapRepository = new RoadmapRepository();

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

        // Transform subject allocation from ARRAY to OBJECT
        const subjectAllocation = {};
        if (Array.isArray(generatedData.subjectAllocation)) {
            generatedData.subjectAllocation.forEach(subject => {
                subjectAllocation[subject.name] = subject.allocatedHours;
            });
        }

        // Transform phases from monthlyPlan
        const phases = [];
        if (Array.isArray(generatedData.monthlyPlan)) {
            const phaseNames = new Set();
            generatedData.monthlyPlan.forEach(month => {
                if (month.phase && !phaseNames.has(month.phase)) {
                    phaseNames.add(month.phase);
                    phases.push({
                        name: month.phase,
                        duration_days: Math.floor(generatedData.timeData.daysAvailable / phaseNames.size)
                    });
                }
            });
        }

        // Merge roadmap + generated plan into single object
        res.status(200).json({
            roadmap: {
                ...roadmap.toJSON(),
                phases: phases,
                subject_allocation: subjectAllocation,
                total_hours: Math.floor(generatedData.timeData.effectiveHours) || 0,
                total_days: generatedData.timeData.daysAvailable || 0,
                coverage_percent: generatedData.coverage.percentage || 0,
            }
        });
    } catch (error) {
        console.error('Get roadmap error:', error);
        res.status(500).json({
            error: 'Failed to fetch roadmap',
        });
    }
};

// Generate new roadmap
export const generateRoadmap = async (req, res) => {
    try {
        const userId = req.userId;
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

        // Transform subject allocation from ARRAY to OBJECT
        const subjectAllocation = {};
        if (Array.isArray(generatedData.subjectAllocation)) {
            generatedData.subjectAllocation.forEach(subject => {
                subjectAllocation[subject.name] = subject.allocatedHours;
            });
        }

        // Transform phases from monthlyPlan
        const phases = [];
        if (Array.isArray(generatedData.monthlyPlan)) {
            const phaseNames = new Set();
            generatedData.monthlyPlan.forEach(month => {
                if (month.phase && !phaseNames.has(month.phase)) {
                    phaseNames.add(month.phase);
                    phases.push({
                        name: month.phase,
                        duration_days: Math.floor(generatedData.timeData.daysAvailable / phaseNames.size)
                    });
                }
            });
        }

        // Save roadmap to database
        const roadmap = await roadmapRepository.create(
            userId,
            'UPSC_CSE_PRELIMS',
            target_date,
            daily_hours,
            level
        );

        // Return roadmap + generated plan (MERGED)
        res.status(201).json({
            message: 'Roadmap generated successfully',
            roadmap: {
                ...roadmap.toJSON(),
                phases: phases,
                subject_allocation: subjectAllocation,
                total_hours: Math.floor(generatedData.timeData.effectiveHours) || 0,
                total_days: generatedData.timeData.daysAvailable || 0,
                coverage_percent: generatedData.coverage.percentage || 0,
            }
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