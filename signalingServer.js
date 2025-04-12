const WebSocket = require('ws');

const PORT = 3000;
const server = new WebSocket.Server({ port: PORT });
console.log(`Signaling server running on ws://localhost:${PORT}`);

const rooms = {};

server.on('connection', (socket) => {
  console.log('New connection established.');

  socket.on('message', (message) => {
    const data = JSON.parse(message);
    console.log('Received message:', data);

    const { type, roomId } = data;

    if (type === 'join') {
      if (!rooms[roomId]) rooms[roomId] = [];
      rooms[roomId].push(socket);
      console.log(`User joined room: ${roomId}`);
    } else if (['offer', 'answer', 'candidate'].includes(type)) {
      if (rooms[roomId]) {
        rooms[roomId].forEach((client) => {
          if (client !== socket) {
            client.send(JSON.stringify(data));
          }
        });
      }
    }
  });

  socket.on('close', () => {
    console.log('Connection closed.');
    for (const roomId in rooms) {
      rooms[roomId] = rooms[roomId].filter((client) => client !== socket);
    }
  });
});
