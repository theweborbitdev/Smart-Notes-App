# Smart Notes App

Smart Notes App is a persistent mini-app built with the MERN stack. Users can create, view, update, delete, and search notes. Notes are stored in MongoDB, so they remain available after stopping and restarting the app.

## Features

- Create notes with a required title and optional content
- View saved notes, newest first
- Edit existing notes
- Delete notes
- Search notes by title instantly
- Case-insensitive search
- Persistent MongoDB storage
- Backend validation for empty titles and invalid MongoDB IDs
- Centralized JSON error responses
- Responsive React UI with loading and error states

## Stack

- React + Vite
- Axios
- Node.js
- Express.js
- MongoDB Atlas
- Mongoose
- Plain CSS

## Project Structure

```text
project-root/
+-- client/
|   +-- src/
+-- server/
|   +-- config/
|   +-- controllers/
|   +-- middleware/
|   +-- models/
|   +-- routes/
+-- README.md
+-- ANSWERS.md
```

## Requirements

- Node.js 18 or newer
- npm
- MongoDB Atlas connection string

## Environment Setup

Create `server/.env`:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Use `server/.env.example` as the template. Do not commit real credentials.

## Run On A Fresh Machine

From the repo root:

```bash
cd server
npm install
npm run dev
```

Open a second terminal from the repo root:

```bash
cd client
npm install
npm run dev
```

Open:

```text
http://localhost:5173
```

Backend API:

```text
http://localhost:5000
```

## API Routes

| Method | Route | Description |
| --- | --- | --- |
| GET | `/notes` | Get all notes |
| POST | `/notes` | Create a note |
| PUT | `/notes/:id` | Update a note |
| DELETE | `/notes/:id` | Delete a note |

## Persistence Check

Create a note in the UI, stop both servers, start them again, and refresh the browser. The note should still be visible because it is stored in MongoDB.

## Commit History

This repository includes incremental commits showing progress. To view them:

```bash
git log --oneline --reverse
```
