# iMessanger – Real-Time Chat Application

iMessanger is a real-time messaging application built using the MERN stack. It enables users to communicate through real-time messaging, share images, and see online user status.

🌐 **Live Demo:** https://imessanger-xtml.onrender.com

📂 **GitHub Repository:** https://github.com/SachindasVK/iMessanger

## ✨ Features

- 🔐 Authentication and user management using Clerk
- 💬 Real-time messaging with Socket.IO
- 🟢 Online user presence
- 👤 User profiles
- 🖼️ Image sharing and uploads using ImageKit
- ⚡ Global state management using Zustand
- 🔔 Toast notifications
- 📱 Responsive user interface

## 🛠️ Tech Stack

### Frontend
- React 19
- Vite
- JavaScript 
- React Router
- Zustand 
- Axios
- Tailwind 
- HeroUI
- Lucide React
- React Hot Toast

### Backend
- Node.js
- Express.js 5
- MongoDB
- Mongoose
- Socket.IO
- Multer

### Authentication & Media
- Clerk Authentication
- ImageKit

### Deployment & Tools
- Docker
- Render
- Git & GitHub

## 📁 Project Structure

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
│   │   └── app.js
│   ├── package.json
│   └── ...
│
├── Dockerfile
├── .gitignore
└── README.md
```

## 🚀 Getting Started

### Prerequisites

- Node.js
- npm
- MongoDB database
- Clerk account
- ImageKit account

### 1. Clone the repository

```bash
git clone https://github.com/SachindasVK/iMessanger.git
cd iMessanger
```

### 2. Install frontend dependencies

```bash
cd client
npm install
```

### 3. Install backend dependencies

Open another terminal:

```bash
cd server
npm install
```

### 4. Environment Configuration

Create `.env` files in the client and server directories.

Configure the required environment variables for:

**Client**
- Clerk publishable key
- Backend API URL

**Server**
- MongoDB connection string
- Clerk secret key
- ImageKit private key
- Frontend URL
- Other required service credentials

Refer to the application source code for the exact environment variable names.

Never commit `.env` files or expose private credentials.

### 5. Run the application

**Start the backend:**

```bash
cd server
npm run dev
```

**Start the frontend:**

```bash
cd client
npm run dev
```

## 📦 Available Scripts

### Client

| Command | Description |
|---|---|
| `npm run dev` | Start Vite development server |
| `npm run build` | Create production build |
| `npm run preview` | Preview production build |
| `npm run lint` | Run ESLint |

### Server

| Command | Description |
|---|---|
| `npm run dev` | Start backend with Nodemon |
| `npm run build` | Copy source files into dist |
| `npm start` | Start backend |

## 🌍 Live Deployment

The application is deployed using Render and Docker.

**Live Application:** https://imessanger-xtml.onrender.com

## 👨‍💻 Author

**Sachin**

GitHub: [SachindasVK](https://github.com/SachindasVK)

---

⭐ If you find this project interesting, consider giving the repository a star!