const express = require('express');
const bodyParser = require('body-parser');
const Pusher = require('pusher');

const app = express();
app.use(bodyParser.json());

// Pusher configuration
const pusher = new Pusher({
  appId: '1931709',
  key: '11e6d9af8054c700c82f',
  secret: 'a51f4758ef39203bb37b',
  cluster: 'ap2',
  useTLS: true,
});

// Endpoint to handle sending messages
app.post('/send-message', (req, res) => {
  const { message } = req.body;

  // Trigger a Pusher event
  pusher.trigger('my-channel', 'my-event', {
    message: message,
  });

  res.status(200).send('Message sent');
});

// Start the server
app.listen(8000, () => {
  console.log('Server is running on http://localhost:8000');
});