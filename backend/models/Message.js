const mongoose = require('mongoose');

const MessageSchema = new mongoose.Schema({
    sender: String,
    receiver: String,
    text: String,
    file: String,
    timestamp: Date,
    date: String, // Storing the chat date in "YYYY-MM-DD" format
  });

module.exports = mongoose.model('Message', MessageSchema);