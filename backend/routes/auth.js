

import express from 'express';
import multer from 'multer';
import User from '../models/user.js';
import Message from '../models/Message.js';

const router = express.Router();


// Configure multer for file uploads--multer is basically a package
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Unique file name
    },
});
const upload = multer({ storage });


router.post('/register', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ msg: 'Please enter all credentials' });
    }

    if (password.length < 6) {
        console.log("increase the length of password")
        return res.status(400).json({ msg: 'Password must be at least 6 characters long' });
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




//login
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
        res.status(200).json({ 
            msg: 'Login successful',
            userId: user._id,
        });
    } catch (error) {
        console.log("Error during login:", error);
        res.status(500).json({ msg: "Server error while login" });
    }
});

// Store chat messages with optional file upload
router.post('/messages', upload.single('file'), async (req, res) => {
    try {
         const { username, receiver, group, text, type } = req.body;
         
         if (!username || !text || !type) {
      return res.status(400).json({ message: 'Missing required fields: username, text, or type' });
    }

     const file = req.file ? req.file.filename : null;
   
        const timestamp = new Date();
        const currentDate = new Date().toISOString().split('T')[0];

        const newMessage = new Message({
            sender:username,
           receiver: type === 'personal' ? receiver : null,
           group: type === 'group' ? group : null,
            text,
            file,
            
            timestamp,
            date : currentDate,
            type

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


//Fetch History of personal chat
router.get('/history/personal',async(req,res)=>{
    const {user1,user2,date}=req.query;

    if(!user1||!user2||!date){
        return res.status(400).json({msg:"Missing required querry parameters"});
    }

    try{
        const messages=await Message.find({
            type:'personal',
            date:date,
            $or:[
                { sender: user1, receiver: user2 },
                { sender: user2, receiver: user1 },
            ]
        }).sort({ timestamp: 1 });
        res.json(messages);
    }
    catch(error){
        console.error("Error fetching personal chat history:", error);
        res.status(500).json({ message: 'Error fetching personal chat history', error });
    }
})

//Fetching group chat history
router.get('/history/group',async(req,res)=>{
    const {group,date} = req.query;

     if (!group || !date) {
    return res.status(400).json({ msg: "Missing required query params" });
  }

  try{
       const messages=await Message.find({
        type:'group',
        group: group,
        date:date
       }).sort({timestamp:1});

        res.json(messages);
  }
  catch(err){
    console.error("Error fetching group chat history:",err);
    res.status(500).json({ msg: "Server error" });
  }

})



router.post("/chat/ai",async(req,res)=>{
    const {message} = req.body;

    if(!message){
        return res.status(400).json({ error: "Message is required" });
    }

    try{
       const response = await model.call(message);
       res.json(reply = response);
    }
    catch(error){
        console.error("AI Chat Error:", error);
        res.status(500).json({ error: "AI chat failed" }); 
    }
})



export default router;

