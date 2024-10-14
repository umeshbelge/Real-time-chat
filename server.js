const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

app.use(express.static('public')); // Serve static files from the 'public' folder

io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Broadcast when a user connects
  socket.broadcast.emit('message', 'A new user has joined the chat');
  
  // Listen for chat messages
  socket.on('chatMessage', (msg) => {
    io.emit('message', msg); // Broadcast the message to all users
  });

  // Broadcast when a user disconnects
  socket.on('disconnect', () => {
    io.emit('message', 'A user has left the chat');
  });
});

server.listen(3000, () => {
  console.log('Server running on port 3000');
});
