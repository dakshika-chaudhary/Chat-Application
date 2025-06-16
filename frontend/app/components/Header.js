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
        <h1 className=" text-4xl sm:text-3xl font-semibold">Chit-Chatter</h1>
        </div>

         <div className="flex flex-wrap justify-end gap-2 mt-3 sm:mt-0">
          <Link href="/chat-ai" className="btn text-white border px-4 py-2 h-10">Ask AI</Link>
          <Link href="/" className="btn btn-primary px-4 py-2 h-10">Home</Link>
          <Link href="/login" className="btn btn-primary px-4 py-2 h-10">Login for Personal</Link>
          <Link href="/GroupLogin" className="btn btn-primary px-4 py-2 h-10">Login for Group</Link>
        </div>
        </div>
      </header>
    );
  }