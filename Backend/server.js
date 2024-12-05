const express = require('express');
const http = require('http');
const app = express();
const mongoose = require('mongoose');

const authRoutes = require('./routes/auth'); // Import your auth routes
const { Server } = require('socket.io');
const multer = require('multer'); // Import multer for file upload
require('dotenv').config();
const cors = require('cors');
app.use(cors()); 

const Message = require('./models/Message');
const server = http.createServer(app);
const users = {}; // Store users with their socket IDs

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", 
    methods: ["GET", "POST"],
    credentials: true
  }
});

app.use(express.json()); // For parsing JSON bodies
app.use('/api', authRoutes); // Use '/api' as the base URL for authentication routes

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));

// SOCKET.IO connection
io.on('connection', (socket) => {
  console.log('New user connected', socket.id);

  socket.on('register', (username) => {
    users[username] = socket.id;
    console.log(`User registered: ${username}, ID: ${socket.id}`);
  });

  socket.on('privateMessage', ({ sender, receiver, text,file, timestamp }) => {
    
    const message = new Message({
      sender,
      receiver,
      text,
      file,
      timestamp:new Date(),
      //new Date().toISOString().split('T')[0]: Returns the current date as a YYYY-MM-DD string.
      date: new Date().toISOString().split('T')[0] 
    });
    message.save().then(()=>{
      const receiverSocketId = users[receiver];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('message', { sender, text, timestamp });
        console.log(`Message from ${sender} to ${receiver}: ${text}`);
      } else {
        console.log(`User ${receiver} is not connected.`);
      }
    });
   
  });

  //For GROUP MESSAGES
  socket.on('groupMessage',({sender,text,file,timestamp}) => {
    const message= new Message({
      sender,
      text,
      file,
      timestamp:new Date(),
      date:new Date().toISOString().split('T')[0]
    });
    // Save the message in the database
    message.save().then(()=>{
io.emit('message',{sender,text,file,timestamp});
console.log(`Group message from ${sender} : ${text}`)

    })
    .catch((error) => {
      console.error('Error saving group message:', error);
  });
  })

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
