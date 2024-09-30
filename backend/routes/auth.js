
const express = require('express');
const router = express.Router();
const multer = require('multer');
const User = require('../models/user.js');
const Message = require('../models/Message.js');

// Configure multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
});
const upload = multer({ storage });

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).json({ msg: "Please enter all credentials to login" });
    }

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Username' });
        }

        if (user.password != password) {
            return res.status(400).json({ msg: 'Invalid Password' });
        }
        res.status(200).json({ msg: 'Login successful' });
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ msg: "Server error while login" });
    }
});

router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all credentials' });
    }

    try {
        // User Already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        // New user
        const newUser = new User({ username, password });
        await newUser.save();

        res.status(201).json({ msg: 'New user registered successfully' });
    } catch (error) {
        console.log("Error during registration:", error);
        res.status(500).json({ msg: "Can't register, server error" });
    }
});

// Store chat messages with optional file upload
router.post('/messages', upload.single('file'), async (req, res) => {
    try {
        const { username, text } = req.body;
        const file = req.file ? req.file.filename : null;
        const fileType = req.file ? req.file.mimetype.split('/')[0] : null;
        const timestamp = new Date().toLocaleTimeString();

        const newMessage = new Message({
            username,
            text,
            file,
            fileType,
            timestamp,
        });

        await newMessage.save();
        res.status(201).json(newMessage);
    } catch (error) {
        console.error("Error saving message:", error);
        res.status(500).json({ message: 'Error saving message', error });
    }
});

// GET route to fetch messages
router.get('/messages', async (req, res) => {
    try {
        const messages = await Message.find(); // Fetch messages from DB
        res.json(messages); // Respond with JSON
    } catch (error) {
        console.error("Error fetching messages:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

// Serve uploaded files
router.use('/uploads', express.static('uploads'));


//Fetch the chat-history according to date
router.get('/chat-history/:chatDate',async(req,res)=>{
    try{
        const {chatDate} = req.params;
        const messages =await Message.find({date:chatDate});
        res.json(messages);

    }
    catch(error){
        res.status(500).json({ message: 'Error fetching chat history', error });
    }
})

module.exports = router;
