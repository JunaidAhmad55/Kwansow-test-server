import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import { json } from 'body-parser';
import { handleError } from './utils/errorHandler';

const app = express();
const port = 5000;

app.use(json());

// Remove the duplicate call to mongoose.connect() here
mongoose.connect('mongodb+srv://test:058tIGINmyRwTl8v@cluster0.eq8bhpf.mongodb.net/', {});

const db = mongoose.connection;

db.once('open', () => {
  console.log('Connected to MongoDB database');
});

db.on('error', (err) => {
  console.error('MongoDB connection error:', err);
});

// Load routes
import authRoutes from './routes/authRoutes';
import userRoutes from './routes/userRoutes';
import taskRoutes from './routes/taskRoutes';

// ... (other code)

// Load routes
app.use(authRoutes);
app.use(userRoutes);
app.use(taskRoutes);

// Simple / route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to the API!' });
});

// Error handling middleware
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  handleError(res, 500, 'Internal server error');
});

// Start the server
app.listen(port, () => {
  console.log(`Server is listening on http://localhost:${port}`);
});