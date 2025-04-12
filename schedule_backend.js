const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

let schedules = [];

app.post('/submit_schedule', (req, res) => {
    const { scheduleID, studentName, availableFrom, availableTo, timezone, recurring, availabilitySlots } = req.body;

    if (!scheduleID || !studentName || !availableFrom || !availableTo || !timezone) {
        return res.status(400).json({ message: 'Please fill in all required fields.' });
    }

    const newSchedule = {
        scheduleID,
        studentName,
        availableFrom,
        availableTo,
        timezone,
        recurring: recurring || 'No',
        availabilitySlots: availabilitySlots || 'N/A',
    };

    schedules.push(newSchedule);

    return res.status(201).json({ message: 'Schedule submitted successfully!', schedule: newSchedule });
});

app.get('/get_schedules', (req, res) => {
    return res.status(200).json({ schedules });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
