
import express from "express";
import dotenv from "dotenv";
import http from "http";
import mongoose from "mongoose";
import { Server } from "socket.io";
import cors from "cors";
import { OpenAI } from "@langchain/openai";

import authRoutes from "./routes/auth.js"; // Use ES module import
import Message from "./models/Message.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(cors());
app.use(express.json()); 
app.use("/api", authRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

const users = {};

const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
})

// SOCKET.IO connection
io.on('connection', (socket) => {
  console.log('New user connected', socket.id);

  socket.on('register', (username) => {
    users[username] = socket.id;
    console.log(`User registered: ${username}, ID: ${socket.id}`);
  });

  socket.on('privateMessage', ({ sender, receiver, text,file,type, timestamp }) => {
    
    const message = new Message({
      sender,
      receiver,
      text,
      file,
         type,
      timestamp:new Date(),
      //new Date().toISOString().split('T')[0]: Returns the current date as a YYYY-MM-DD string.
      date: new Date().toISOString().split('T')[0],
     
    });
    message.save()
    .then(()=>{
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

socket.on('sendGroupMessage', ({ sender, text,group, file, timestamp }) => {
  const message = new Message({
    sender,
    text,
    file,
    group,
    timestamp,
    date: new Date().toISOString().split('T')[0], // Format date
    type: 'group', // Indicating this is a group message
  });

  message.save()
  .then(() => {
      // Send to users in the same group only
      io.to(group).emit('groupMessage', { sender, text, file, timestamp, group });
      console.log(`Group message in '${group}' from ${sender}: ${text}`);
    })
    .catch((error) => {
      console.error('Error saving group message:', error);
    });
});

//make it as well to join a particular group
 socket.on('joinGroup', (groupName) => {
    socket.join(groupName); 
    console.log(`User joined group: ${groupName}`);
  });

socket.on("aiMessage",async({sender,text})=>{
  try{
    const response = await model.call(text);

    const aiReplay = new Message({
      sender: "AI_Bot",
      receiver:sender,
      text:response,
      timestamp:new Date(),
      date:new Date().toISOString().split('T')[0]
    });

    await aiReplay.save().then(()=>{
      const receiverSocketId = users[sender];
      if (receiverSocketId) {
        io.to(receiverSocketId).emit('message', { sender: "AI_Bot", text: response });
        console.log(`AI replied to ${sender}: ${response}`);
      } else {
        console.log(`User ${receiver} is not connected.`);
      }
    });
  }
  catch(error){
    console.log("AI Chat Error:", error);
  }
})



  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
