const socket = io();

// Elements
const chatBox = document.getElementById('chat-box');
const messageInput = document.getElementById('message-input');
const sendButton = document.getElementById('send-button');

// Send message when the button is clicked
sendButton.addEventListener('click', () => {
  const message = messageInput.value;
  if (message.trim()) {
    socket.emit('chatMessage', message);
    messageInput.value = ''; // Clear the input
  }
});

// Receive and display messages
socket.on('message', (message) => {
  const div = document.createElement('div');
  div.textContent = message;
  chatBox.appendChild(div);
  chatBox.scrollTop = chatBox.scrollHeight; // Scroll to the bottom
});
