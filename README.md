# Chit-Chatter

![Screenshot (55)](https://github.com/user-attachments/assets/59e1965d-a7e2-4dd4-a4c8-93c7c4899a70)

Chit-Chatter is a modern chat application designed for seamless and instant communication between users. Built with Next.js, Tailwind CSS, Node.js, and Socket.IO, Chit-Chatter offers real-time messaging features with both individual and group chat capabilities.

## Features

- **Real-Time Messaging**: Powered by Socket.IO for instant message updates.
- **User Authentication**: Secure login and registration functionality.
- **Individual and Group Chat**: Chat privately or join group conversations.
- **Daily Chats**: Each new day starts with a fresh chat, while previous chats are saved and accessible.
- **Themed Interface**: Greenish theme with night-like animation for an engaging user experience.

## Project Structure

- **Frontend**: `frontend/my-app` (Next.js and Tailwind CSS)
- **Backend**: `server` (Node.js, Express, MongoDB)
- **Common API**: A single API for user authentication across individual and group chat functionality.

## Screenshots

*(Add screenshots of your app here to showcase the UI)*

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (version 14.x or later recommended)
- [MongoDB](https://www.mongodb.com/) Atlas account and database URI

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/chit-chatter.git
   cd chit-chatt
2. # Frontend setup
cd frontend/my-app
npm install

3. # Backend setup
cd ../../server
npm install

4.Create environment variable files:
MONGODB_URI=your_mongodb_uri
JWT_SECRET=your_jwt_secret_key

5.Start the application:
npm run dev

# Start backend
cd server
npm run dev

# Start frontend
cd ../frontend/my-app
npm run dev

Usage
Register or log in to access chat features.
Start an individual or group chat with other users.
View past chats and start fresh conversations daily.


Technologies Used
Frontend: Next.js, Tailwind CSS
Backend: Node.js, Express, MongoDB
Real-Time Communication: Socket.IO
Authentication: JSON Web Tokens (JWT)
Contributing


![Screenshot (49)](https://github.com/user-attachments/assets/b789d8fd-6259-4b9b-a557-cb648490808d)
![Screenshot (53)](https://github.com/user-attachments/assets/feafcea8-ec37-440b-961c-3b3a6f5cfe5b)
