const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3001;

// Middleware
app.use(cors());
app.use(bodyParser.json());

// In-memory database
let subjects = [];

// API Routes

// POST - Add a new subject
app.post('/api/subjects', (req, res) => {
    const newSubject = req.body;
    newSubject.id = subjects.length + 1; // Assign a unique ID
    subjects.push(newSubject);
    res.status(201).json({ message: 'Subject created successfully', data: newSubject });
});

// GET - Retrieve all subjects
app.get('/api/subjects', (req, res) => {
    res.json(subjects);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
