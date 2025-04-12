const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors());

// In-memory database for feedback storage
let feedbackDatabase = {};

// API to submit feedback
app.post('/submit_feedback', (req, res) => {
    const { sessionId, tutorFeedback, learnerFeedback, rating, additionalComments } = req.body;

    // Validate input
    if (!sessionId || !tutorFeedback || !learnerFeedback || !rating) {
        return res.status(400).json({ message: 'All required fields must be filled!' });
    }

    // Store feedback in the database
    feedbackDatabase[sessionId] = {
        sessionId,
        tutorFeedback,
        learnerFeedback,
        rating,
        additionalComments: additionalComments || '',
    };

    res.status(200).json({ message: 'Feedback submitted successfully!' });
});

// API to fetch feedback
app.get('/feedback/:sessionId', (req, res) => {
    const { sessionId } = req.params;

    // Check if feedback exists for the given session ID
    if (!feedbackDatabase[sessionId]) {
        return res.status(404).json({ message: 'Feedback not found for the given session ID.' });
    }

    // Return the feedback
    res.status(200).json(feedbackDatabase[sessionId]);
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
