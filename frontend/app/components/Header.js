import Image from "next/image";
import Link from "next/link";

export default function Header() {
    return (
        <header>
            <div className=" bg-gray-900 flex justify-between">
      <div className="bg-gray-900 flex text-white p-3 text-center ">
        
        <Image 
          src="/chit-chatter.webp"// Path to the logo
          alt="Chit Chatter Logo" 
          width={80} // Set the desired width
          height={50} // Set the desired height
          className="mb-4 text-white rounded-s-full rounded-e-full mr-4" // Optional styling class
        />
        <h1 className=" text-4xl font-semibold">Chit-Chatter</h1>
        </div>
        <div className="bg-gray-900">
        <Link href="/" className="btn btn-primary -ml-10 mr-4 mt-4 mb-2">Home</Link>
        {/* <Link href="/register" className="btn btn-primary mr-2 mt-4 mb-2 h-10 ">Go to Register</Link> */}
        <Link href="/login" className="btn btn-primary ml-2 mt-4 mb-2 h-10 mr-3"> Login for personal</Link>
        <Link href="/GroupLogin" className="btn btn-primary ml-2 mt-4 mb-2 h-10 mr-3">Login for Group</Link>
        </div>
        </div>
       
      </header>
    );
  }