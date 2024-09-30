"use client";

import { useEffect, useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Link from 'next/link';
import Head from 'next/head';
import Image from 'next/image'; 
import Logo from './logo/chit-chatter.webp';
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  

  return (
    <div>
      <Header/>
    <div className="container text-center -mt-10 text-white rounded  max-h-screen">
      <Head>
        <title>Chat Application</title>
        <meta name="description" content="Welcome to the Chat Application" />
      </Head>

      <div className='mt-4 '>
      <div className="flex justify-center items-center "> 
      <Image 
          src={Logo} // Path to the logo
          alt="Chit Chatter Logo" 
          width={500} // Set the desired width
          height={200} // Set the desired height
          className="mb-4 text-white rounded-s-full rounded-e-full" // Optional styling class
        />
        </div>
      <h1 className="mb-2">Welcome to the Chit-Chatter</h1>
      <p className="lead">Connect with your friends and start chatting!</p>
     
      <Link href="/register" className="btn btn-primary mr-3 mt-2 mb-2">Go to Register</Link>
      <Link href="/login" className="btn btn-primary ml-3 mt-2 mb-2">Go to Login</Link>
    </div>
    </div>
    <Footer/>
    </div>
    
  );
}
