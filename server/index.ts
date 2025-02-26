import express from 'express';
import { PostgresStorage } from './storage';

const app = express();
const port = Number(process.env.PORT || 5000);

// Initialize storage
const storage = new PostgresStorage();

// Middleware
app.use(express.json());

// Routes
app.get('/api/users', async (req, res) => {
  try {
    const users = await storage.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const newUser = await storage.createUser(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: 'Failed to create user' });
  }
});

// Start server
app.listen(port, '0.0.0.0', () => {
  console.log(`Server running on port ${port}`);
});