# React Portfolio - Assignment 3

This project extends my React portfolio from Assignment 2 by adding a Node.js/Express backend. Project data is now loaded through an API, and the contact form sends submissions to the backend.

## Tech Used

React, Vite, React Router, Node.js, Express, CORS and dotenv.

## Project Structure

```text
react-portfolio/
├── src/                 # React frontend
├── server/              # Express backend
│   ├── data/projects.js
│   ├── server.js
│   ├── .env.example
│   └── package.json
├── public/
├── package.json
└── README.md
```
## Video Walkthrough

A 2-3 minute demonstration of the frontend and backend integration—covering dynamic data fetching, deep linking, server-side form validation, and graceful error handling—can be viewed here:


## Running the Project

The frontend and backend need to be run separately.

### Backend

```bash
cd server
npm install
npm start
```

Create a `.env` file inside `server`:

```env
PORT=5001
```

The backend runs on `http://localhost:5001`.

### Frontend

From the main project folder:

```bash
npm install
npm run dev
```

The frontend normally runs on `http://localhost:5173`.

### Port Note

I initially tried using port `5000` for the backend on my Mac, but I ran into a port conflict, so I changed it to `5001`. The frontend API requests also use port `5001`.

## API Endpoints

### 1. GET `/`

Checks whether the backend is running.

```bash
curl http://localhost:5001/
```

Response:

```json
{
  "status": "ok"
}
```

### 2. GET `/api/projects`

Returns all projects stored on the backend.

```bash
curl http://localhost:5001/api/projects
```

Each project contains the fields used by the frontend: `id`, `title`, `description`, `techStack`, `image` and `link`.

Example:

```json
[
  {
    "id": "1",
    "title": "Lost and Found Android App",
    "description": "Designed the frontend interface and user experience layout for a campus-themed mobile application.",
    "techStack": ["Android Studio", "Java", "XML", "MongoDB", "Spring Boot"],
    "image": "/assets/isolated-lost-found-label-with-briefcase-phone-wallet-question-mark-symbolizing-missing_626431-2508.jpeg",
    "link": "https://github.com/SrivathsavaRebba/lost-found"
  }
]
```

There are currently three projects. The endpoint also has a small delay so the loading state on the Projects page can be observed.

### 3. GET `/api/projects/:id`

Returns one project using its ID.

```bash
curl http://localhost:5001/api/projects/1
```

A valid ID returns the project with status `200`. An invalid ID returns:

```json
{
  "error": "Project not found"
}
```

with status `404`.

### 4. POST `/api/contact`

Accepts contact form submissions and validates them on the server.

Example:

```bash
curl -X POST http://localhost:5001/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Srivathsava",
    "email": "Srivathsava@example.com",
    "message": "Hello!"
  }'
```

Successful response:

```json
{
  "message": "Submission saved successfully",
  "data": {
    "id": 1789378398353,
    "name": "Srivathsava",
    "email": "Srivathsava@example.com",
    "message": "Hello!"
  }
}
```

Status: `201 Created`

The server checks that `name`, `email` and `message` are present and also checks the email format. Invalid data returns `400 Bad Request`.

Example:

```json
{
  "error": "Invalid email format"
}
```

### 5. GET `/api/contact`

Returns all contact submissions stored so far.

```bash
curl http://localhost:5001/api/contact
```

This endpoint is intentionally open and does not use authentication, as required for assignment verification.

Contact submissions are stored in an **in-memory array**, so they are cleared when the backend is restarted.

### 6. Undefined Routes

Undefined routes return a JSON `404` response.

```bash
curl http://localhost:5001/api/doesnotexist
```

Response:

```json
{
  "error": "Endpoint not found"
}
```

A global Express error handler is also used so server errors return JSON instead of HTML or stack traces.

## Frontend Integration

The React frontend uses `fetch()` and `useEffect()` to communicate with the backend.

- **Projects page:** gets project data from `GET /api/projects` and shows a loading state while fetching.
- **Project detail page:** gets the project ID using `useParams()` and fetches it from `GET /api/projects/:id`.
- **Contact page:** sends form data using `POST /api/contact` and shows the success/error response.
- If the backend is stopped, the Projects page shows an error message instead of remaining blank.
- A non-existent project ID displays a project-not-found message.

## CORS and Environment

CORS is enabled so the React development server on port `5173` can communicate with the Express server on port `5001`.

`dotenv` is used for environment configuration. The `.env` file should not be committed; `.env.example` is provided as a reference.

## Data Storage

Project data is stored in:

```text
server/data/projects.js
```

Contact submissions use an in-memory array. 

## AI Assistance Disclosure

I used an AI coding assistant during development for help with debugging and some implementation issues. I also used it to write a CSS child-combinator selector to fix a link visibility and contrast issue in the application's dark mode. I tested the changes locally after implementing them. 