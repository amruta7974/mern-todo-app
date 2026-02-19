# MERN Todo App

A full-stack Todo application built with:
- **Backend:** Node.js, Express, MongoDB (Mongoose), JWT authentication, Zod validation
- **Frontend:** React, Vite, React Router, Tailwind CSS, Axios, react-hot-toast

Users can sign up, log in, and manage their own todos. Each todo is linked to the authenticated user.

---

## Features

- User signup and login
- JWT authentication with HTTP-only cookies
- Protected routes
- Create, update, delete todos
- Per-user todo storage
- Form validation using Zod

---

## Project Structure

- `backend/` – Express + MongoDB API
  - `index.js` – App entry, MongoDB connection, CORS, routes
  - `controller/` – Request handlers for users and todos
  - `model/` – Mongoose models (`User`, `Todo`)
  - `routes/` – Route definitions (`/user`, `/todo`)
  - `middleware/authorize.js` – JWT-based auth middleware
  - `jwt/token.js` – JWT generation and cookie handling
  - `.env` – Environment variables (not committed)
- `frontend/` – React client (Vite)
  - `src/App.jsx` – Main routing
  - `src/components/Home.jsx` – Todo list UI
  - `src/components/Login.jsx` – Login form
  - `src/components/Signup.jsx` – Signup form
  - Other Vite/Tailwind/ESLint config files

---

## Prerequisites

- Node.js (LTS) and npm
- MongoDB instance (local or cloud)

---

## Backend Setup (`backend/`)

1. Install dependencies:

   ```bash
   cd backend
   npm install
   ```

2. Create a `.env` file inside `backend/` with at least:

   ```env
   MONGODB_URI=<your_mongodb_connection_string>
   JWT_SECRET_KEY=<any_strong_secret_key>
   FRONTEND_URL=http://localhost:5173
   PORT=4001
   ```

   Notes:
   - `PORT` is set to `4001` so it matches the URLs used by the React frontend.
   - `FRONTEND_URL` must match the URL where the Vite dev server runs.

3. Start the backend server:

   ```bash
   npm start
   ```

   This runs `nodemon index.js` and starts the API at `http://localhost:4001`.

---

## Frontend Setup (`frontend/`)

1. Install dependencies:

   ```bash
   cd frontend
   npm install
   ```

2. Start the React dev server:

   ```bash
   npm run dev
   ```

3. Open the URL printed by Vite in the terminal (usually `http://localhost:5173`).

The frontend expects the backend to be available at `http://localhost:4001` with cookies enabled.

---

## How Authentication Works

- Users can **sign up** and **log in** from the React UI.
- On successful signup/login, the backend:
  - Creates or verifies the user in MongoDB.
  - Generates a JWT and:
    - Saves it to a `jwt` **HTTP-only cookie**.
    - Returns it in the JSON response (frontend also stores it in `localStorage`).
- Protected todo routes use the auth middleware, which:
  - Reads the `jwt` cookie.
  - Verifies it with `JWT_SECRET_KEY`.
  - Loads the user from MongoDB and attaches it to `req.user`.

Logout clears the `jwt` cookie and removes the token from `localStorage` on the client.

---

## API Overview

Base URL (with the configuration above):

- Backend: `http://localhost:4001`

### Auth Routes (`/user`)

- `POST /user/signup`
  - Body: `{ "username": string, "email": string, "password": string }`
  - Validates data with Zod, hashes password, creates user, returns JWT and user data.

- `POST /user/login`
  - Body: `{ "email": string, "password": string }`
  - Verifies credentials, returns JWT and user data, sets `jwt` cookie.

- `GET /user/logout`
  - Clears the `jwt` cookie and logs out the user.

### Todo Routes (`/todo`) – Protected

These routes require a valid `jwt` cookie (user must be logged in).

- `POST /todo/create`
  - Body: `{ "text": string, "completed": boolean }`
  - Creates a todo associated with the authenticated user.

- `GET /todo/fetch`
  - Returns all todos belonging to the authenticated user.

- `PUT /todo/update/:id`
  - Body: any fields to update (commonly toggling `completed`).
  - Updates the todo with the given id.

- `DELETE /todo/delete/:id`
  - Deletes the todo with the given id.

---

## Frontend Behavior

- `/` – Home (Todo list)
  - Protected route: redirects to `/login` if no JWT token is in `localStorage`.
  - Shows todos, lets the user:
    - Create todos
    - Toggle completed status
    - Delete todos
    - See remaining todo count
    - Logout
- `/login` – Login page
- `/signup` – Signup page
- Any other path – 404 page

All API calls are made with Axios and `withCredentials: true` so cookies are sent with requests.

---

## Available Scripts

### Backend

From the `backend/` directory:

- `npm start` – Start the server with nodemon.

### Frontend

From the `frontend/` directory:

- `npm run dev` – Start the Vite dev server.
- `npm run build` – Build for production.
- `npm run preview` – Preview the built app.
- `npm run lint` – Run ESLint.

---

## Screenshots

screenshots/signup.png
screenshots/login.png
screenshots/dashboard.png


## Notes

- Make sure MongoDB is running and the `MONGODB_URI` is valid.
- Keep your `.env` file private and never commit it to version control.
- If you change backend ports or URLs, update `.env` and/or frontend API URLs accordingly.

---

## Author

Built by Amruta Gaikwad
