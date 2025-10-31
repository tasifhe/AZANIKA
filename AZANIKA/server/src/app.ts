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
const allowedOrigins = [
  'http://localhost:3000',
  'http://localhost:3001',
  'https://azanika.vercel.app',
  'https://azanika-frontend.vercel.app',
  process.env.CLIENT_URL
].filter((origin): origin is string => Boolean(origin));

console.log('Allowed CORS origins:', allowedOrigins);

app.use(cors({
  origin: allowedOrigins,
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers'
  ],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  optionsSuccessStatus: 200,
  preflightContinue: false
}));

// Manual OPTIONS handler for additional CORS support
app.options('*', (req, res) => {
  res.header('Access-Control-Allow-Origin', req.headers.origin || '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.status(200).end();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check route
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
});

// CORS test route
app.get('/cors-test', (req, res) => {
  res.status(200).json({ 
    message: 'CORS is working!', 
    origin: req.headers.origin,
    timestamp: new Date().toISOString()
  });
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
const PORT = parseInt(process.env.PORT || '5000', 10);
// For production deployment, bind to 0.0.0.0. For local development, use localhost
const HOST = process.env.NODE_ENV === 'production' || process.env.PORT ? '0.0.0.0' : 'localhost';

const server = app.listen(PORT, HOST, () => {
  console.log(`🚀 Server is running on http://${HOST}:${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV || 'development'}`);
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