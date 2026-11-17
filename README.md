# iMessanger – Real-Time Chat Application

A modern real-time messaging application built using the MERN stack. iMessanger allows users to communicate through a responsive interface with real-time messaging and online presence.

**Live Demo:** https://imessanger-xtml.onrender.com

**GitHub Repository:** https://github.com/SachindasVK/iMessanger

---

## Features

- 🔐 User authentication with Clerk
- 💬 Real-time messaging using Socket.IO
- 🟢 Online user status
- 👤 User profiles
- 🖼️ Image sharing and uploads using ImageKit
- ⚡ Responsive React interface
- 🗄️ MongoDB database integration

## Tech Stack

**Frontend**
- React.js
- Vite
- JavaScript
- Tailwind CSS
- HeroUI

**Backend**
- Node.js
- Express.js
- Socket.IO

**Database & Services**
- MongoDB
- Clerk Authentication
- ImageKit

**Deployment**
- Render
- Docker

## Project Structure

```text
iMessanger/
│
├── client/
│   ├── public/
│   ├── src/
│   ├── package.json
│   └── vite.config.js
│
├── server/
│   ├── src/
│   ├── package.json
│   └── ...
│
├── Dockerfile
├── .gitignore
└── README.md
```

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/SachindasVK/iMessanger.git
```

### 2. Navigate to the project

```bash
cd iMessanger
```

### 3. Install frontend dependencies

```bash
cd client
npm install
```

### 4. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 5. Configure environment variables

Create the required `.env` files in the client and server directories.

Configure your MongoDB connection, Clerk credentials, ImageKit credentials, and frontend/backend URLs according to the environment variables used in the source code.

Never commit your private API keys or secrets.

### 6. Run the application

Start the backend and frontend using the development scripts defined in their respective `package.json` files.

Frontend:

```bash
npm run dev
```

Backend:

```bash
npm run dev
```

## Deployment

The application is deployed on Render.

🌐 **Live Application:** https://imessanger-xtml.onrender.com

## Author

**Sachin**

- GitHub: https://github.com/SachindasVK

---

⭐ If you find this project interesting, feel free to explore the repository and give it a star!