const socket = io();

const sendMessageButton = document.getElementById('send-message');
const messageInput = document.getElementById('message');
const chatBox = document.getElementById('chat-box');
const usernameDisplay = document.getElementById('username-display');
const darkModeButton = document.getElementById('dark-mode');
const lightModeButton = document.getElementById('light-mode');
let username = '';

// Ask for name once and display it above the chat
const askName = () => {
  const name = prompt("Please enter your name:");
  if (name) {
    username = name;
    usernameDisplay.textContent = `Hello, ${username}!`;
  }
};

// Ask for name once when the page loads
askName();

sendMessageButton.addEventListener('click', () => {
  const message = messageInput.value.trim();
  if (message !== '') {
    socket.emit('chatMessage', { username, message });
    messageInput.value = '';
  }
});

socket.on('chatMessage', (msg) => {
  const chatMessageElement = document.createElement('div');
  chatMessageElement.textContent = `${msg.username}: ${msg.message}`;
  chatBox.appendChild(chatMessageElement);
  chatBox.scrollTop = chatBox.scrollHeight;
});

// Dark mode and light mode
darkModeButton.addEventListener('click', () => {
  document.body.classList.remove('light-mode');
  document.body.classList.add('dark-mode');
});

lightModeButton.addEventListener('click', () => {
  document.body.classList.remove('dark-mode');
  document.body.classList.add('light-mode');
});
