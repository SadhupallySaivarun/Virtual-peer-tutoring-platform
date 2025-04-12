const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database for tutoring sessions
let tutoringSessions = [];

// POST - Add a new tutoring session
app.post('/api/tutoring-sessions', (req, res) => {
    const newSession = req.body;
    newSession.id = tutoringSessions.length + 1; // Assign a unique ID
    tutoringSessions.push(newSession);
    res.status(201).json({ message: 'Tutoring session created successfully', data: newSession });
});

// GET - Retrieve all tutoring sessions
app.get('/api/tutoring-sessions', (req, res) => {
    res.json(tutoringSessions);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
