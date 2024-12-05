
'use client'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ChatHistory() {
  const [chatHistory, setChatHistory] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const router = useRouter();

  const fetchChatHistory = async (date) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/chat-history/${date}`);
      console.log("Fetched chat history:", response.data);
      setChatHistory(response.data);
    } catch (error) {
      console.error("Error fetching chat history:", error);
    }
  };

  const handleDateChange = (e) => {
    const date = e.target.value;
    setSelectedDate(date);
    if (date) {
      fetchChatHistory(date);
    }
  };

  return (
    <div>
      <Header />
      <div className="container bg-gray-800 mx-auto mt-3 max-w-screen-lg rounded-lg p-6 shadow-lg h-screen flex flex-col">
        <div className="flex justify-center">
          <Image 
            src="/chit-chatter.webp" // Path to the logo
            alt="Chit Chatter Logo" 
            width={100} // Set the desired width
            height={50} // Set the desired height
            className="mb-4 text-white rounded-s-full rounded-e-full" // Optional styling class
          />
        </div>
        <h1 className="text-4xl font-bold mb-2 -mt-3 text-center text-white">Chat History</h1>

        <div className="flex justify-between mb-4">
          <input 
            type="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="border border-gray-300 text-black p-2 rounded-lg"
          />
          <div className=""> 
          <Link href="/chat" className="btn btn-secondary text-black bg-white font-bold py-2 px-4 rounded-lg ">
            New Personal Chat
          </Link>
          
          </div>
        </div>

        {/* Scrollable chat container */}
        <div className="flex-grow overflow-y-auto">
          {chatHistory.length > 0 ? (
            <ul className="space-y-2">
              {chatHistory.map((msg, index) => (
                <li key={index} className="bg-gray-700 p-3 rounded-lg shadow">
                  <span className="font-serif mr-2 text-white">{msg.sender}:</span>
                  <div className="font-extrabold italic text-white">{msg.text}</div>
                  {msg.file && (
                    <div>
                      <a href={msg.file} target="_blank" rel="noopener noreferrer" className="text-blue-500">View File</a>
                    </div>
                  )}
                  <span className="font-extralight block text-xs text-gray-400">
                    {new Date(msg.timestamp).toLocaleTimeString()}
                  </span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-white">No chat history available for the selected date.</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}
