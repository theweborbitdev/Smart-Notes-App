# Assessment Answers

## 1. How to run

Install Node.js 18 or newer and npm. Create `server/.env` with a MongoDB connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Run the backend from the repo root:

```bash
cd server
npm install
npm run dev
```

Run the frontend in a second terminal from the repo root:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`. The backend runs at `http://localhost:5000`.

## 2. Stack choice

I chose the MERN stack because this task needs a simple persistent CRUD web app. React + Vite keeps the frontend fast and easy to review. Express keeps the API small and readable. MongoDB with Mongoose fits the notes data model well and provides schema validation while keeping setup straightforward with MongoDB Atlas.

A worse choice for this assessment would have been a heavier framework stack with authentication, server-side rendering, queues, or a complex state library. That would add setup time and review noise without improving the core requirement: create items, persist them, restart the app, and see the data again.

The feature beyond CRUD is instant, case-insensitive title search. It is useful because a notes app becomes harder to use as the list grows, and search gives the user a quick way to find older notes without adding unnecessary complexity.

## 3. One real edge case

The app handles invalid MongoDB IDs on update and delete requests. In `server/controllers/noteController.js` around line 43, the controller checks `mongoose.Types.ObjectId.isValid(id)` before calling Mongoose.

Without this check, a request such as `PUT /notes/abc` or `DELETE /notes/abc` could trigger a Mongoose cast error. The user would get an inconsistent server error instead of a clear `400 Bad Request` JSON response, and malformed requests would be harder to debug safely.

## 4. AI usage

I used OpenAI Codex for scaffolding and implementation assistance. I asked it to generate a small MERN assessment project with a React + Vite frontend, Express backend, Mongoose model, CRUD routes, validation, README, ANSWERS file, and commit history.

Codex produced the first project structure, backend controller layout, React components, CSS, and documentation drafts. I manually improved the generated output by tightening backend request validation, adding centralized malformed JSON handling, keeping frontend state local instead of adding Redux, and adjusting the MongoDB environment loading so the backend reads `server/.env` reliably.

I also used Codex while running the project locally to diagnose the MongoDB connection problem. The original SRV connection string failed due to a DNS SRV lookup issue on this machine, so I switched the local `.env` to the equivalent non-SRV Atlas shard connection string. The real secret remains outside Git.

## 5. Honest gap

The biggest gap is missing automated tests. With another day, I would add backend integration tests for `GET`, `POST`, `PUT`, and `DELETE /notes`, including validation failures for empty titles and invalid IDs. I would also add frontend tests for create, edit, delete, loading, error, and search behavior.

The UI is clean enough for an assessment, but it could be improved with better confirmation feedback after saves, a delete confirmation for destructive actions, and a more polished empty state.

