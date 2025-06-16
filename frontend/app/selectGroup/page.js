"use client";
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';


export default function SelectGroup() {

    const [group,setGroup] = useState('');
    const [username,setUsername] = useState('');
    const router = useRouter();

    useEffect(()=>{
        const storedUsername = localStorage.getItem('username');
       if(!storedUsername){
        router.push('/login');
       }
       else{
        setUsername(storedUsername);
       }

    },[router]);

    const handleJoin=()=>{
        if(group.trim()){
            localStorage.setItem('groupName',group.trim());
            router.push('/Group-chat');
        }
        else{
            alert('Please enter a group name.');
        }
    };

    return(
        <div>
            <Header/>
      <div className="container mx-auto mt-20 max-w-md bg-gray-800 text-white p-6 rounded-lg shadow">
      <h1 className="text-3xl font-bold mb-4 text-center">Join or Create Group</h1>
       <input
          type="text"
          value={group}
          onChange={(e) => setGroup(e.target.value)}
          placeholder="Enter group name"
          className="w-full p-2 rounded text-black mb-4"
        />
        <button onClick={handleJoin} className="bg-blue-500 w-full py-2 rounded text-white font-semibold">Enter Group Chat</button>
      
      </div>

            <Footer/>
        </div>
    )
}