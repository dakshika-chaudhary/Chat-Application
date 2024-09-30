// 'use client'
// import { useEffect, useState, useRef } from 'react';
// import io from 'socket.io-client';
// import { useRouter } from 'next/navigation';
// import Link from 'next/link';
// import Image from 'next/image'; 
// import Header from '../components/Header';
// import Footer from '../components/Footer';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import {  faImage, faVideo, faMusic } from '@fortawesome/free-solid-svg-icons';




// export default function GroupChatPage() {
//     const [messages, setMessages] = useState([]);
//     const [input, setInput] = useState('');
//     const [username, setUsername] = useState('');
//     const [file, setFile] = useState(null);
//     const socketRef = useRef(null);
//     const router = useRouter();


//   useEffect(()=>{
//     const socket = io('http://localhost:5000');
//     socketRef.current = socket; 
//     socketRef.current.on('groupMessage', (message) => {
//       setMessages((prevMessages) => [...prevMessages, message]);
//   });

//   const fetchMessages = async () => {
//     const response = await fetch('http://localhost:5000/api/messages');
//     const data = await response.json();
//      setMessages(data);
//   }

//   fetchMessages();

//   return () => {
//       socketRef.current.disconnect(); // Clean up on unmount
//   };
// }, []);

// const sendMessage = () => {
//  if(input || file){
//   const messageData={
//     sender:username,
//     text:input,
//     file:file ? URL.createObjectURL(file):null,
//     timestamp: new Date().toISOString(),
//   };
 
//     socketRef.current.emit('groupMessage',messageData);
//     setMessages((prevMessages)=>[...prevMessages,messageData])
//     setInput('');
//     setFile(null);
//   }
// };


// const handleFileChange = (e) =>{
//     setFile(e.target.files[0]);//to get the first selected file
// };

// const handleFileClick = (type) =>{
//     document.getElementById(`file-input-${type}`).click();
// }

// return(
//     <div>
//         <Header/>
//         <div className="container mx-auto mt-5 max-w-screen-xl bg-gray-800 rounded-lg p-6 shadow-lg overflow-y-auto ">
//         <div className='flex justify-center'>
//        <Image 
//           src="/chit-chatter.webp"// Path to the logo
//           alt="Chit Chatter Logo" 
//           width={100} // Set the desired width
//           height={50} // Set the desired height
//           className="mb-4 text-white rounded-s-full rounded-e-full" // Optional styling class
//         />
//         </div>
//         <h1 className="text-3xl font-bold mb-3 text-center text-white -mt-3">Chatting with</h1>

//         <div className='text-center flex justify-between'>
//     <Link href="/login" className="btn btn-secondary text-right mb-3">Back to Login</Link>
//      <Link href="/ChatHistory" className="btn btn-secondary h-10">View Chat History</Link>
//      </div>

//      <div className="flex items-center space-x-2">
//         <input
//           value={input}
//           onChange={(e) => setInput(e.target.value)}
//           placeholder="Enter your message"
//           className="border text-black border-gray-300 p-2 flex-grow rounded-lg"
//         />
//                  <input 
//           type="file" 
//           id="file-input-image" 
//           onChange={handleFileChange} 
//           accept="image/*" 
//           style={{ display: 'none' }} 
//         />
//          <input 
//           type="file" 
//           id="file-input-video" 
//            onChange={handleFileChange} 
//           accept="video/*" 
//           style={{ display: 'none' }} 
//         />
//          <input 
//            type="file" 
//           id="file-input-audio" 
//            onChange={handleFileChange} 
//           accept="audio/*" 
//           style={{ display: 'none' }} 
//         />
//     <FontAwesomeIcon 
//           icon={faImage} 
//            onClick={() => handleFileClick('image')} 
//           className="cursor-pointer text-white text-xl" 
//         />
//     <FontAwesomeIcon 
//           icon={faVideo} 
//            onClick={() => handleFileClick('video')} 
//           className="cursor-pointer text-white text-xl" 
//         />
//       <FontAwesomeIcon 
//           icon={faMusic} 
//            onClick={() => handleFileClick('audio')} 
//           className="cursor-pointer text-white text-xl" 
//         />
        
         
     

//       <button onClick={sendMessage} className="bg-green-500 text-white px-4 py-2 rounded-lg">
//           Send
//         </button>
//         </div>
//             </div>

//         <Footer/>
//     </div>
// );
// }

'use client'
import { useEffect, useState, useRef } from 'react';
import io from 'socket.io-client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image'; 
import Header from '../components/Header';
import Footer from '../components/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faVideo, faMusic } from '@fortawesome/free-solid-svg-icons';

export default function GroupChatPage() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    const [username, setUsername] = useState('');
    const [file, setFile] = useState(null);
    const socketRef = useRef(null);
    const router = useRouter();

    useEffect(() => {
        const socket = io('http://localhost:5000');
        socketRef.current = socket; 
        socketRef.current.on('groupMessage', (message) => {
            setMessages((prevMessages) => [...prevMessages, message]);
        });

        const fetchMessages = async () => {
            const response = await fetch('http://localhost:5000/api/messages');
            const data = await response.json();
            setMessages(data);
        };

        fetchMessages();

        return () => {
            socketRef.current.disconnect(); // Clean up on unmount
        };
    }, []);

    const sendMessage = () => {
        if(input || file) {
            const messageData = {
                sender: username,
                text: input,
                file: file ? URL.createObjectURL(file) : null,
                timestamp: new Date().toLocaleString(), // Use local string for date and time
            };

            socketRef.current.emit('groupMessage', messageData);
            setMessages((prevMessages) => [...prevMessages, messageData]);
            setInput('');
            setFile(null);
        }
    };

    const handleFileChange = (e) => {
        setFile(e.target.files[0]); // to get the first selected file
    };

    const handleFileClick = (type) => {
        document.getElementById(`file-input-${type}`).click();
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto mt-5 max-w-screen-xl bg-gray-800 rounded-lg p-6 shadow-lg overflow-y-auto">
                <div className='flex justify-center'>
                    <Image 
                        src="/chit-chatter.webp" // Path to the logo
                        alt="Chit Chatter Logo" 
                        width={100} // Set the desired width
                        height={50} // Set the desired height
                        className="mb-4 text-white rounded-s-full rounded-e-full"
                    />
                </div>
                <h1 className="text-3xl font-bold mb-3 text-center text-white -mt-3">Chatting in Group</h1>

                <div className='text-center flex justify-between'>
                    <Link href="/login" className="btn btn-secondary text-right mb-3">Back to Login</Link>
                    <Link href="/ChatHistory" className="btn btn-secondary h-10">View Chat History</Link>
                </div>

                <div className="mt-4">
    {messages.length > 0 ? (
        <div className="space-y-4">
            {messages.map((message, index) => (
                <div key={index} className="bg-gray-700 text-white p-3 rounded-lg shadow-md">
                    <p className="font-semibold">{message.sender}:</p>
                    <p>{message.text}</p>
                    {message.file && (
                        <div className="mt-2">
                            {message.file.endsWith(".jpg") || message.file.endsWith(".png") ? (
                                <img src={message.file} alt="Sent file" className="max-w-xs" />
                            ) : message.file.endsWith(".mp4") || message.file.endsWith(".mov") ? (
                                <video controls className="max-w-xs">
                                    <source src={message.file} type="video/mp4" />
                                    Your browser does not support the video tag.
                                </video>
                            ) : message.file.endsWith(".mp3") ? (
                                <audio controls>
                                    <source src={message.file} type="audio/mpeg" />
                                    Your browser does not support the audio tag.
                                </audio>
                            ) : null}
                        </div>
                    )}
                    <p className="text-xs text-gray-400">{message.timestamp}</p>
                </div>
            ))}
        </div>
    ) : (
        <p className="text-white">No messages yet.</p>
    )}
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
            <Footer />
        </div>
    );
}
