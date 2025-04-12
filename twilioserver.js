const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const twilio = require('twilio');
const { v4: uuidv4 } = require('uuid');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const apiKey = process.env.TWILIO_API_KEY;
const apiSecret = process.env.TWILIO_API_SECRET;

const client = twilio(accountSid, authToken);
const AccessToken = twilio.jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

app.get('/', (req, res) => {
  res.send('Virtual Peer Tutoring Platform Backend is running!');
});

app.post('/create-room', async (req, res) => {
  const { roomName } = req.body;

  try {
    const room = await client.video.v1.rooms.create({
      uniqueName: roomName,
      type: 'group',
      recordParticipantsOnConnect: true,
    });

    res.status(200).json({ roomSid: room.sid, roomName: room.uniqueName });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.post('/token', (req, res) => {
  const { room } = req.body;
  const identity = `user_${uuidv4().substring(0, 6)}`;

  const token = new AccessToken(accountSid, apiKey, apiSecret, {
    identity,
  });

  const videoGrant = new VideoGrant({ room });
  token.addGrant(videoGrant);

  res.send({ token: token.toJwt(), identity });
});

app.get('/recordings', async (req, res) => {
  try {
    const recordings = await client.video.recordings.list({ limit: 10 });
    res.status(200).json(recordings);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.get('/download-recording/:sid', async (req, res) => {
  const { sid } = req.params;

  try {
    const recording = await client.video.recordings(sid).fetch();
    const mediaLocation = await recording.media().fetch();

    res.redirect(mediaLocation.redirectTo);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
