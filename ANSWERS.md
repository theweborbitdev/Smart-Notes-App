# Assessment Answers

## 1. How to run

Create `server/.env` with a MongoDB Atlas connection string:

```env
MONGO_URI=your_mongodb_connection_string
PORT=5000
```

Then install and run the backend:

```bash
cd server
npm install
npm run dev
```

In a second terminal, install and run the frontend:

```bash
cd client
npm install
npm run dev
```

Open `http://localhost:5173`. The API runs on `http://localhost:5000`.

## 2. Stack choice

I used the requested MERN stack because it keeps the assessment focused and easy to review. React + Vite gives a fast, simple frontend setup. Express provides a lightweight REST API without unnecessary framework overhead. MongoDB with Mongoose is a good fit for this notes model because the schema is small, document-shaped, and easy to validate.

The meaningful improvement beyond CRUD is instant, case-insensitive title search. It improves usability without adding backend complexity, and the frontend updates the visible list as the user types.

## 3. One real edge case

One real edge case is an invalid MongoDB ID being passed to `PUT /notes/:id` or `DELETE /notes/:id`. This is handled in `server/controllers/noteController.js` around line 43 by checking `mongoose.Types.ObjectId.isValid(id)` before querying MongoDB.

Without that handling, malformed IDs such as `abc` could trigger Mongoose cast errors and return inconsistent server errors instead of a clear `400 Bad Request` JSON response. It also helps prevent server crashes on malformed requests.

## 4. AI usage

AI assisted with scaffolding the project structure, initial file organization, and drafting the README and assessment answers. I manually improved the generated output by tightening the backend error handling, adding explicit invalid-ID validation, keeping the frontend state management simple, and making the search feature instant on the client without adding unnecessary libraries.

## 5. Honest gap

The main gap is missing automated tests. If I continued the project, I would add backend integration tests for the note API and frontend component tests for create, edit, delete, and search flows. I would also improve the UI with small details like confirmation feedback, keyboard shortcuts, and richer empty states.
