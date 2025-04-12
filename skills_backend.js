const express = require('express');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Mock database
let skillLevels = [];

// Route to fetch all skill levels
app.get('/skill_levels', (req, res) => {
    res.json(skillLevels);
});

// Route to submit skill level information
app.post('/submit_skilllevel_info', (req, res) => {
    const {
        proficiency_level,
        description,
        associated_subjects,
        minimum_score,
        maximum_score,
        resource_library,
        students,
        tutor_profiles,
        session_history,
        matching_algorithms,
        tutoring_sessions
    } = req.body;

    // Add the new skill level to the "database"
    const newSkillLevel = {
        proficiency_level,
        description,
        associated_subjects,
        minimum_score,
        maximum_score,
        resource_library,
        students,
        tutor_profiles,
        session_history,
        matching_algorithms,
        tutoring_sessions
    };

    skillLevels.push(newSkillLevel);

    res.status(201).json({ message: 'Skill level information added successfully!' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
