"use client"
import { useState,useEffect,useRef } from "react"
import axios from "axios"
import Header from "../components/Header"
import Footer from "../components/Footer"
import Link from "next/link"
import Image from "next/image"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faImage, faVideo, faMusic } from "@fortawesome/free-solid-svg-icons";
import { io } from "socket.io-client";
import { useRouter } from "next/navigation";

export default function AIChatPage(){
    const [messages,setMessages] = useState([]);
    const [input,setInput] = useState("");
    const [file, setFile] = useState(null);
    const socketRef = useRef(null);
    const router = useRouter();

    useEffect(()=>{
        socketRef.current = io("http://localhost:3000");
        return ()=>{
            if(socketRef.current){
                socketRef.current.disconnect();
                console.log("Socket disconnected");
            }
        }
    },[]);

    const sendMessage = async()=>{
        if (!input.trim()) return;

        const userMessage = {role:'user',text:input};

        setMessages((prevMessages)=>[...prevMessages,userMessage]);

        try{
            const response = await axios.post("http://localhost:3000/api/chat/ai", {
            message : input
            });
            const botMessage = { role: "bot", text: response.data.reply };
            setMessages((prevMessages) => [...prevMessages, botMessage]);
        }
        catch (error) {
            console.error("AI Chat Error:", error);
          } 
          setInput("");
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // Get the first selected file
      };

      return (
        <div>
          <Header />
    
          <div className="container mx-auto mt-5 max-w-screen-xl bg-gray-800 rounded-lg p-6 shadow-lg overflow-y-auto">
            <div className="flex justify-center">
              <Image
                src="/chit-chatter.webp"
                alt="Chit Chatter Logo"
                width={100}
                height={50}
                className="mb-4 text-white rounded-s-full rounded-e-full"
              />
            </div>
    
            <div className="text-center flex justify-between">
              <Link href="/login" className="btn btn-secondary text-right mb-3">
                Back to Login
              </Link>
              <Link href="/ChatHistory" className="btn btn-secondary h-10">
                View Chat History
              </Link>
            </div>
    
            <div className="mb-4 overflow-y-auto h-96">
              <ul className="space-y-2">
                {messages.map((msg, index) => (
                  <li
                    key={index}
                    className={`flex ${
                      msg.role === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`${
                        msg.role === "user" ? "bg-blue-500" : "bg-gray-400"
                      } p-3 rounded-lg max-w-xs shadow`}
                    >
                      <span className="font-serif mr-2">
                        {msg.role === "user" ? "You" : "AI"}:
                      </span>
                      <div className="font-extrabold italic">{msg.text}</div>
                      <span className="font-extralight block text-xs">
                        {new Date().toLocaleTimeString()}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
    
            <div className="flex items-center space-x-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask AI"
                className="border text-black border-gray-300 p-2 flex-grow rounded-lg"
              />
    
              {/* File Inputs (Hidden) */}
              <input
                type="file"
                id="file-input-image"
                onChange={handleFileChange}
                accept="image/*"
                style={{ display: "none" }}
              />
              <input
                type="file"
                id="file-input-video"
                onChange={handleFileChange}
                accept="video/*"
                style={{ display: "none" }}
              />
              <input
                type="file"
                id="file-input-audio"
                onChange={handleFileChange}
                accept="audio/*"
                style={{ display: "none" }}
              />
    
              {/* File Upload Icons */}
              <FontAwesomeIcon
                icon={faImage}
                onClick={() => handleFileClick("image")}
                className="cursor-pointer text-white text-xl"
              />
              <FontAwesomeIcon
                icon={faVideo}
                onClick={() => handleFileClick("video")}
                className="cursor-pointer text-white text-xl"
              />
              <FontAwesomeIcon
                icon={faMusic}
                onClick={() => handleFileClick("audio")}
                className="cursor-pointer text-white text-xl"
              />
    
              <button
                onClick={sendMessage}
                className="bg-green-500 text-white px-4 py-2 rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
    
          <Footer />
        </div>
      );
}
