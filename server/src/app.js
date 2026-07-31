import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';

import authRoutes from './routes/auth.routes.js';
import { notFound, errorHandler } from './middlewares/error.middleware.js';

const app = express();

// Security headers
app.use(helmet());

// CORS - must allow credentials and match exact frontend origin for cookies to work
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);

// Body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parsing - required for protect middleware to read req.cookies
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.status(200).json({ success: true, message: 'Server is healthy' });
});

// 404 handler - must come after all valid routes
app.use(notFound);

// Centralized error handler - must be the LAST middleware
app.use(errorHandler);

export default app;