// UPSC CSE Prelims Syllabus Data
// Simplified for MVP - focuses on core subjects

export const UPSC_SYLLABUS = {
    exam_type: 'UPSC_CSE_PRELIMS',
    total_benchmark_hours: 1000, // Industry standard for beginner
    
    subjects: [
        {
            name: 'History',
            weightage: 15, // % of exam
            topics: [
                { name: 'Ancient History', hours: 40 },
                { name: 'Medieval History', hours: 35 },
                { name: 'Modern History', hours: 60 },
                { name: 'Art & Culture', hours: 30 },
            ],
        },
        {
            name: 'Geography',
            weightage: 15,
            topics: [
                { name: 'Physical Geography', hours: 40 },
                { name: 'Indian Geography', hours: 45 },
                { name: 'World Geography', hours: 25 },
                { name: 'Environment & Ecology', hours: 40 },
            ],
        },
        {
            name: 'Polity',
            weightage: 20,
            topics: [
                { name: 'Constitution Basics', hours: 35 },
                { name: 'Union & States', hours: 30 },
                { name: 'Fundamental Rights', hours: 25 },
                { name: 'Governance', hours: 35 },
            ],
        },
        {
            name: 'Economy',
            weightage: 15,
            topics: [
                { name: 'Basic Economics', hours: 30 },
                { name: 'Indian Economy', hours: 45 },
                { name: 'Budget & Planning', hours: 25 },
                { name: 'Current Economic Issues', hours: 25 },
            ],
        },
        {
            name: 'Science & Technology',
            weightage: 10,
            topics: [
                { name: 'General Science', hours: 25 },
                { name: 'Technology & Innovation', hours: 20 },
                { name: 'Space & Defense', hours: 20 },
            ],
        },
        {
            name: 'Current Affairs',
            weightage: 15,
            topics: [
                { name: 'National Affairs', hours: 30 },
                { name: 'International Relations', hours: 30 },
                { name: 'Awards & Events', hours: 15 },
            ],
        },
        {
            name: 'CSAT (Paper 2)',
            weightage: 10,
            topics: [
                { name: 'Comprehension', hours: 20 },
                { name: 'Logical Reasoning', hours: 25 },
                { name: 'Quantitative Aptitude', hours: 30 },
                { name: 'Decision Making', hours: 15 },
            ],
        },
    ],
};