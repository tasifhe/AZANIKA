import dotenv from 'dotenv';

// Load environment variables FIRST (before any other imports that use them)
dotenv.config();

import express from 'express';
import authRoutes from './routes/auth';
import productRoutes from './routes/products';
import orderRoutes from './routes/orders';
import cors from 'cors';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import pool from './config/supabase';

const app = express();

// Middleware
const allowedOrigins: string[] = [
  'http://localhost:3000',
  'http://localhost:3001',
  process.env.CORS_ORIGIN || '',
  process.env.FRONTEND_URL || ''
].filter(origin => origin !== '');

app.use(cors({
  origin: process.env.NODE_ENV === 'production' 
    ? allowedOrigins 
    : '*', // Allow all origins in development
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Error handling middleware (must be last)
app.use(notFoundHandler);
app.use(errorHandler);

// Test database connection
const testDBConnection = async () => {
  try {
    const result = await pool.query('SELECT NOW()');
    console.log('✅ Supabase PostgreSQL connected successfully at:', result.rows[0].now);
  } catch (error) {
    console.error('❌ Database connection error:', error);
    process.exit(1);
  }
};

// Start server
const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`🚀 Server is running on port ${PORT}`);
  testDBConnection();
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully');
  server.close(async () => {
    await pool.end();
    console.log('Server closed');
    process.exit(0);
  });
});

export default app;