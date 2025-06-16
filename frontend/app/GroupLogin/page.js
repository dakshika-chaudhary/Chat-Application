"use client";
import { useState } from "react";
import Link from 'next/link';
import Header from "../components/Header";
import Footer from "../components/Footer";
import Head from 'next/head';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

import 'bootstrap/dist/css/bootstrap.min.css'; // For styling

export default function Login() {
    const [username, setUsername] = useState(''); // State for username
    const [password, setPassword] = useState(''); // State for password
  
    const router = useRouter(); // To redirect the user after login

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload on form submit

        // Make POST request to backend API for login
        const response = await fetch('http://localhost:5000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        });

        // Check response from server
        if (response.ok) {
            // Save the username and chat partner in localStorage for use in chat
            localStorage.setItem('username', username);
            console.log("Login successful");

            router.push('/selectGroup');
            // Redirect to chat page
            // router.push('/Group-chat');
        } else {
            console.log("Login failed");
            // Redirect to register page if login fails
            router.push('/register');
        }
    };

    return (
        <div>
        <Header/>
        <div className="container  text-center text-white mt-5">
            <Head><title>Login</title></Head>
            {/* Use min-h-screen or add padding for the background div */}
            <div className='  mt-48 max-w-screen-lg flex justify-between mb-12'>
                <div className="w-full ">
                    <h1 className="mb-4">Login</h1>

                    <form onSubmit={handleSubmit}>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Username"
                            required
                            className="form-control mb-3"
                        />
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Password"
                            required
                            className="form-control mb-3"
                        />
                       
                        <button type="submit" className="btn btn-primary">
                            Login
                        </button>
                    </form>

                    <p className="text-white mt-3">Don't have an account? <Link href="/register">Register here</Link></p>
             
                </div>
                <div className="mb-4">
       
             </div>
            <div className=""> 
            <Image 
          src= "/register2.jpg"// Use the imported image
          alt="Register Illustration" 
          width={700} 
          height={400} 
          className="rounded-s-3xl rounded-e-3xl ml-44 -mt-32" 
        />
        </div>
      </div>
        </div>
        <Footer/>
        </div>
    );
}