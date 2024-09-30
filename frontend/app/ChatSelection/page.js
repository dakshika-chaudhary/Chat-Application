// pages/chatSelection.js
'use client';
import { useRouter } from 'next/navigation';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function ChatSelectionPage() {
    const router = useRouter();

    // Handle redirection based on chat type
    const handleChatSelection = (chatType) => {
        if (chatType === 'personal') {
            router.push('/chat');  // Redirect to your existing personal chat page
        } else if (chatType === 'group') {
            router.push('/Group-chat');  // Redirect to group chat page
        }
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto mt-10 max-w-screen-md bg-gray-800 rounded-lg p-6 shadow-lg text-center">
                <h1 className="text-3xl font-bold mb-6 text-white">Choose Your Chat Mode</h1>
                <div className="flex justify-center space-x-4">
                    <button 
                        className="bg-blue-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => handleChatSelection('personal')}
                    >
                        Personal Chat
                    </button>
                    <button 
                        className="bg-green-500 text-white px-4 py-2 rounded-lg"
                        onClick={() => handleChatSelection('group')}
                    >
                        Group Chat
                    </button>
                </div>
            </div>
            <Footer />
        </div>
    );
}
