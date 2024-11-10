const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Serve static files from the "public" directory
app.use(express.static('public'));

// Handle WebSocket connections
io.on('connection', (socket) => {
  console.log('a user connected');
  
  // Listen for messages
  socket.on('chatMessage', (msg) => {
    io.emit('chatMessage', msg);  // Broadcast the message to all clients
  });
  
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

// Define the port and start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
