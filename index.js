// server.js
const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chat-msu6cyd7z-rahul-rajs-projects-949722d8.vercel.app", 
    methods: ["GET", "POST"],
    credentials: true // Allow credentials if needed
  }
});

app.get('/', (req, res) => {
  res.send('Socket.IO server is running');
});

// Listen for socket connections
io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for messages from the client
  socket.on('message', (message) => {
    console.log('Message received:', message);
    // Broadcast the message to all connected clients
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('User  disconnected');
  });
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});