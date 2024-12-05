"use client";
import { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Image from 'next/image';

import 'bootstrap/dist/css/bootstrap.min.css';

export default function Register(){
    const [ username,setUsername ]= useState('');
    const [ password,setPassword ] =useState('');

const handleSubmit = async(e)=>{
     e.preventDefault();

     console.log('Sending request with:', { username, password });

     if (password.length < 6) {
        console.error('Password must be at least 6 characters long');
        return;
      }
     const response =await fetch('http://localhost:5000/api/register',{
        method:'POST',
        headers:{
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({username,password}),
     });

     if(response.ok){
        console.log('Registered successfully')
     }
     else{
        console.error('Registration failed');
     }
};
return(
    <div>

   <Header/>
    <div className ="container text-center mt-3">
        <Head>
            <title>Register</title>
        </Head>
        
        <div className='  mt-48 max-w-screen-lg flex justify-between mb-12'>
            <div className='w-full'>
        <h1 className="mb-4 text-white">Register</h1>
        <form onSubmit={handleSubmit}>
            <input 
            type="text"
            value={username}
            onChange={(e)=>{setUsername(e.target.value)}}
            placeholder="Username"
            required
            className="form-control mb-3"/>

            <input 
            type="password"
            value={password}
            onChange={(e)=>{setPassword(e.target.value)}}
            placeholder="password"
            required
            className="form-control mb-3"/>
            <button type="submit" className="btn btn-primary"><Link href="/ChatSelection" className="mt-3 text-white">click here</Link></button>
        </form>
       
        <p className="mt-3 text-white">Already have an account?   <Link href="/login">Login here for personal</Link></p>
        <p className="mt-3 text-white">Already have an account? <Link href="/GroupLogin">Login here for Group</Link></p>
    </div>
    <div className=""> 
            <Image 
          src= "/register2.jpg"// Use the imported image
          alt="Register Illustration" 
          width={700} 
          height={400} 
          className="rounded-s-3xl rounded-e-3xl xl ml-32 -mt-32 " 
        />
        </div>
        </div>
    </div>
    <Footer/>
    </div>    
    
)

}