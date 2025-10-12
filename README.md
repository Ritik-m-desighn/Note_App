Notes App

A full-stack, secure, and responsive Notes App built with Next.js, React, Node.js, Express, and MongoDB. This app allows users to register, log in, and manage their notes with a beautiful UI/UX and real-time feedback.

Features

User Authentication: Secure login and signup with JWT and bcrypt password hashing.

CRUD Notes: Create, Read, Update, and Delete notes seamlessly.

Beautiful UI/UX: Modern and responsive design with smooth animations.

Notifications: React Toastify notifications for success/error messages.

API Communication: Axios used for frontend-backend communication.

Secure: JWT tokens and hashed passwords ensure user data safety.

Deployment: Frontend deployed on Netlify, backend deployed on Render.

Tech Stack

Frontend: Next.js, React, Tailwind CSS, React Toastify, Axios

Backend: Node.js, Express.js, MongoDB, Mongoose, JWT, Bcrypt

Deployment: Netlify (frontend), Render (backend)

Installation

Clone the repository

git clone <your-repo-link>
cd notes-app


Install dependencies

# Frontend
cd client
npm install

# Backend
cd ../server
npm install


Environment Variables

Create a .env file in the server folder with:

MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>


Run locally

# Backend
cd server
npm run dev

# Frontend
cd ../client
npm run dev

Usage

Signup or login with your credentials.

Create, edit, and delete notes.

Receive instant notifications for actions.
