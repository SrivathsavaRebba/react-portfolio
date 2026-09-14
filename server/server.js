import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import http from 'http'; // Native Node module for stronger server binding
import { projects } from './data/projects.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001; // Updated to fallback to 5001

const submissions = [];

app.use(cors()); 
app.use(express.json()); 

app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

app.get('/api/projects', (req, res) => {
    //delay of 2 seconds
    setTimeout(() => {
        res.status(200).json(projects);
    }, 2000);
});

app.get('/api/projects/:id', (req, res) => {
  const project = projects.find(p => p.id === req.params.id);
  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }
  res.status(200).json(project);
});

app.post('/api/contact', (req, res) => {
  const { name, email, message } = req.body;
  
  if (!name || !name.trim()) return res.status(400).json({ error: 'Name is required' });
  if (!email || !email.trim()) return res.status(400).json({ error: 'Email is required' });
  if (!/\S+@\S+\.\S+/.test(email)) return res.status(400).json({ error: 'Invalid email format' });
  if (!message || !message.trim()) return res.status(400).json({ error: 'Message is required' });

  const newSubmission = { id: Date.now(), name, email, message };
  submissions.push(newSubmission);
  
  res.status(201).json({ message: 'Submission saved successfully', data: newSubmission });
});

app.get('/api/contact', (req, res) => {
  res.status(200).json(submissions);
});

app.use((req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

app.use((err, req, res, next) => {
  console.error('Server Error:', err.stack);
  res.status(500).json({ error: 'An internal server error occurred' });
});

// Create a native HTTP server wrapper
const server = http.createServer(app);

// Boot up the server
server.listen(PORT, () => {
  console.log(`Server is locked in and running on http://localhost:${PORT}`);
});

// Explicitly catch and log any silent crashes
server.on('error', (err) => {
  console.error('CRITICAL SERVER ERROR:', err);
});