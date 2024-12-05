'use client'
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; 
import Header from '../components/Header';
import Footer from '../components/Footer';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {  faImage, faVideo, faMusic } from '@fortawesome/free-solid-svg-icons';

export default function ChatPage() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [username, setUsername] = useState('');
  const [chatPartner, setChatPartner] = useState('');
  const [file, setFile] = useState(null);
  const socketRef = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const storedUsername = localStorage.getItem('username');
    const storedPartnerName = localStorage.getItem('chatPartner');
    
    if (storedUsername && storedPartnerName) {
      setUsername(storedUsername);
      setChatPartner(storedPartnerName);
    } else {
      console.log('No username found, redirected to login first');
      router.push('/login');
    }

    const socket = io('http://localhost:5000');
    socketRef.current = socket;

    socket.emit('register', storedUsername);

    socket.on('connect', () => {
      console.log("Socket Connected to Server");
    });

    socket.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      console.log(`Received message:`, message);
    });

    return () => {
      socket.disconnect();
      console.log('Socket disconnected');
    };
  }, [router]);

  const sendMessage = () => {
    if(input || file){
    const messageData = {
      sender: username,
      receiver: chatPartner,
      text: input,
      file:file?URL.createObjectURL(file):null,
      timestamp: new Date().toISOString()// Get date in YYYY-MM-DD format
      
    };

    socketRef.current.emit('privateMessage', messageData);
    setMessages((prevMessages) => [...prevMessages, messageData]);
    setInput('');
    setFile(null);
  }
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]); //to get the first selected file
  };

  const handleFileClick = (type) => {
    document.getElementById(`file-input-${type}`).click();
  };

  return (
    <div>
<Header/>
    
    <div className="container mx-auto mt-5 max-w-screen-xl bg-gray-800 rounded-lg p-6 shadow-lg overflow-y-auto ">
      <div className='flex justify-center'>
       <Image 
          src="/chit-chatter.webp"// Path to the logo
          alt="Chit Chatter Logo" 
          width={100} // Set the desired width
          height={50} // Set the desired height
          className="mb-4 text-white rounded-s-full rounded-e-full" // Optional styling class
        />
        </div>
      <h1 className="text-3xl font-bold mb-3 text-center text-white -mt-3">
        {username} Chatting with {chatPartner || "Unknown"}
      </h1>
      
      <div className='text-center flex justify-between'>
    <Link href="/login" className="btn btn-secondary text-right mb-3">Back to Login</Link>


  <Link href="/ChatHistory" className="btn btn-secondary h-10">View Chat History</Link>

</div>
                
      <div className="mb-4 overflow-y-auto h-96">
        <ul className="space-y-2">
          {messages.map((msg, index) => (
            <li key={index} className={`flex ${msg.sender === username ? 'justify-end' : 'justify-start'}`}>
              <div className={`${msg.sender === username ? 'bg-blue-500' : 'bg-gray-400'} p-3 rounded-lg max-w-xs shadow`}>
                <span className="font-serif mr-2">{msg.sender}:</span>
                <div className="font-extrabold italic">{msg.text}</div>
                {msg.file && (
                  <div>
                    <a href={msg.file} target="_blank" rel="noopener noreferrer" className="text-blue-500">View File</a>
                  </div>
                )}
                <span className="font-extralight block text-xs">{new Date(msg.timestamp).toLocaleTimeString()}</span>
                
              </div>
            </li>
          ))}
        </ul>
      </div>

      <div className="flex items-center space-x-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter your message"
          className="border text-black border-gray-300 p-2 flex-grow rounded-lg"
        />
                 <input 
          type="file" 
          id="file-input-image" 
          onChange={handleFileChange} 
          accept="image/*" 
          style={{ display: 'none' }} 
        />
         <input 
          type="file" 
          id="file-input-video" 
          onChange={handleFileChange} 
          accept="video/*" 
          style={{ display: 'none' }} 
        />
         <input 
          type="file" 
          id="file-input-audio" 
          onChange={handleFileChange} 
          accept="audio/*" 
          style={{ display: 'none' }} 
        />
    <FontAwesomeIcon 
          icon={faImage} 
          onClick={() => handleFileClick('image')} 
          className="cursor-pointer text-white text-xl" 
        />
    <FontAwesomeIcon 
          icon={faVideo} 
          onClick={() => handleFileClick('video')} 
          className="cursor-pointer text-white text-xl" 
        />
      <FontAwesomeIcon 
          icon={faMusic} 
          onClick={() => handleFileClick('audio')} 
          className="cursor-pointer text-white text-xl" 
        />
        <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-lg">
          Send
        </button>
      </div>
    </div>
    <Footer/>
    </div>
  );
}
