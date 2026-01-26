// Roadmap Generator
// Core algorithm for creating personalized UPSC study plans

import { UPSC_SYLLABUS } from './data/upsc-syllabus.js';

export class RoadmapGenerator {
    constructor(targetDate, dailyHours, level) {
        this.targetDate = new Date(targetDate);
        this.dailyHours = dailyHours;
        this.level = level; // 'beginner' | 'intermediate' | 'advanced'
        this.today = new Date();
    }

    // Main generation method
    generate() {
        // Step 1: Calculate time available
        const timeData = this.calculateTimeAvailable();
        
        // Step 2: Allocate hours to subjects
        const subjectAllocation = this.allocateHoursToSubjects(timeData);
        
        // Step 3: Distribute across months
        const monthlyPlan = this.distributeAcrossMonths(subjectAllocation, timeData);
        
        // Step 4: Calculate coverage percentage
        const coverage = this.calculateCoverage(timeData.totalHours);
        
        return {
            timeData,
            subjectAllocation,
            monthlyPlan,
            coverage,
            metadata: {
                generated_at: new Date(),
                exam_type: 'UPSC_CSE_PRELIMS',
                level: this.level,
            },
        };
    }

    // Calculate total days and hours available
    calculateTimeAvailable() {
        const daysAvailable = Math.floor(
            (this.targetDate - this.today) / (1000 * 60 * 60 * 24)
        );
        
        if (daysAvailable <= 0) {
            throw new Error('Target date must be in the future');
        }
        
        const totalHours = daysAvailable * this.dailyHours;
        
        // Apply level adjustment
        const levelMultipliers = {
            beginner: 0.75,    // Beginners need 33% more time
            intermediate: 1.0,
            advanced: 1.2,     // Advanced can cover 20% more
        };
        
        const effectiveHours = totalHours * levelMultipliers[this.level];
        
        return {
            daysAvailable,
            totalHours,
            effectiveHours,
            dailyHours: this.dailyHours,
        };
    }
    // Allocate hours to subjects based on weightage
    allocateHoursToSubjects(timeData) {
        const { effectiveHours } = timeData;
        const buffer = 0.9; // Keep 10% buffer for flexibility
        const usableHours = effectiveHours * buffer;
        
        const allocation = UPSC_SYLLABUS.subjects.map(subject => {
            const allocatedHours = Math.floor(
                (subject.weightage / 100) * usableHours
            );
            
            return {
                name: subject.name,
                weightage: subject.weightage,
                allocatedHours,
                topics: subject.topics.map(topic => ({
                    name: topic.name,
                    hours: Math.floor(
                        (topic.hours / this.sumTopicHours(subject.topics)) * allocatedHours
                    ),
                })),
            };
        });
        
        return allocation;
    }

    // Helper: Sum topic hours
    sumTopicHours(topics) {
        return topics.reduce((sum, topic) => sum + topic.hours, 0);
    }

    // Distribute subjects across months
    distributeAcrossMonths(subjectAllocation, timeData) {
        const { daysAvailable } = timeData;
        const monthsAvailable = Math.ceil(daysAvailable / 30);
        
        const monthlyPlan = [];
        let currentDate = new Date(this.today);
        
        // Phase distribution (simplified for MVP)
        const phases = this.definePhases(monthsAvailable);
        
        for (let month = 0; month < monthsAvailable; month++) {
            const monthName = currentDate.toLocaleString('default', { 
                month: 'long', 
                year: 'numeric' 
            });
            
            const phase = this.getPhase(month, monthsAvailable, phases);
            const subjects = this.getSubjectsForPhase(phase, subjectAllocation, month, monthsAvailable);
            
            monthlyPlan.push({
                month: month + 1,
                monthName,
                phase: phase.name,
                subjects,
            });
            
            // Move to next month
            currentDate.setMonth(currentDate.getMonth() + 1);
        }
        
        return monthlyPlan;
    }

    // Define learning phases
    definePhases(totalMonths) {
        if (totalMonths <= 3) {
            return [
                { name: 'Intensive', percentage: 80 },
                { name: 'Revision', percentage: 20 },
            ];
        } else if (totalMonths <= 6) {
            return [
                { name: 'Foundation', percentage: 40 },
                { name: 'Building', percentage: 40 },
                { name: 'Revision', percentage: 20 },
            ];
        } else {
            return [
                { name: 'Foundation', percentage: 30 },
                { name: 'Building', percentage: 30 },
                { name: 'Mastery', percentage: 25 },
                { name: 'Revision', percentage: 15 },
            ];
        }
    }

    // Get phase for current month
    getPhase(monthIndex, totalMonths, phases) {
        let cumulativePercentage = 0;
        const currentPercentage = ((monthIndex + 1) / totalMonths) * 100;
        
        for (const phase of phases) {
            cumulativePercentage += phase.percentage;
            if (currentPercentage <= cumulativePercentage) {
                return phase;
            }
        }
        
        return phases[phases.length - 1]; // Return last phase if overflow
    }

    // Get subjects to cover in this phase
    getSubjectsForPhase(phase, subjectAllocation, monthIndex, totalMonths) {
        const subjectsPerMonth = Math.ceil(subjectAllocation.length / totalMonths);
        const startIndex = monthIndex * subjectsPerMonth;
        
        // Distribute subjects cyclically
        return subjectAllocation
            .slice(startIndex, startIndex + subjectsPerMonth)
            .map(subject => ({
                name: subject.name,
                hoursAllocated: Math.floor(subject.allocatedHours / totalMonths),
                topics: subject.topics.slice(0, 2), // First 2 topics per month (simplified)
            }));
    }

    // Calculate syllabus coverage percentage
    calculateCoverage(effectiveHours) {
        const benchmark = UPSC_SYLLABUS.total_benchmark_hours;
        const coverage = Math.min(100, Math.floor((effectiveHours / benchmark) * 100));
        
        return {
            percentage: coverage,
            status: coverage >= 90 ? 'Excellent' : coverage >= 70 ? 'Good' : 'Needs More Time',
        };
    }
}