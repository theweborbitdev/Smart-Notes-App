# Smart Notes App

Smart Notes App is a small MERN stack assessment project for creating, viewing, editing, deleting, and searching notes. It uses a React + Vite frontend, an Express API, and MongoDB Atlas through Mongoose so notes persist between app restarts.

## Features

- Create notes with a required title and optional content
- View all notes ordered by newest first
- Edit existing notes
- Delete notes
- Search notes by title with instant, case-insensitive filtering
- Backend validation for empty titles and invalid MongoDB IDs
- Centralized JSON error handling
- Responsive single-page interface with loading and error states

## Tech Stack

**Frontend**

- React
- Vite
- Axios
- Plain CSS

**Backend**

- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- dotenv
- CORS

## Project Structure

```text
project-root/
├── client/
├── server/
│   ├── controllers/
│   ├── models/
│   └── routes/
├── README.md
└── ANSWERS.md
```

## Prerequisites

- Node.js 18 or newer
- npm
- MongoDB Atlas connection string

## Environment Setup

Create a `.env` file inside `server/`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

An example file is provided at `server/.env.example`.

## Installation

From the project root, install backend dependencies:

```bash
cd server
npm install
```

Install frontend dependencies:

```bash
cd ../client
npm install
```

## Run Commands

Start the backend API on port `5000`:

```bash
cd server
npm run dev
```

Start the frontend on port `5173`:

```bash
cd client
npm run dev
```

Open the app in the browser:

```text
http://localhost:5173
```

The frontend expects the API at `http://localhost:5000` by default. To override it, create `client/.env`:

```env
VITE_API_URL=http://localhost:5000
```

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| GET | `/notes` | Get all notes |
| POST | `/notes` | Create a note |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

## Screenshots

Add screenshots here after running the project locally.

## Suggested Git Commit History

```bash
git add . && git commit -m "initialize project structure"
git add server && git commit -m "initialize backend setup"
git add server/models server/controllers server/routes && git commit -m "add note CRUD API"
git add server && git commit -m "add validation and error handling"
git add client && git commit -m "initialize React Vite frontend"
git add client/src && git commit -m "build note CRUD interface"
git add client/src && git commit -m "add instant title search"
git add README.md ANSWERS.md && git commit -m "document setup and assessment answers"
```

