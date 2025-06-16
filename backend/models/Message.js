
// const mongoose = require('mongoose');

import mongoose from 'mongoose';
const MessageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    group: String, // For group messages, this can be the group name or ID
    text: String,
    file: String,
    timestamp: Date,
    date: String, // Storing the chat date in "YYYY-MM-DD" format
     type: String,
  });

const Message = mongoose.model('Message', MessageSchema);

export default Message;