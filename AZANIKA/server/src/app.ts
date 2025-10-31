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
  // Add any potential Vercel preview deployments
  /^https:\/\/azanika.*\.vercel\.app$/,
  process.env.CLIENT_URL
].filter((origin): origin is string | RegExp => Boolean(origin));

console.log('Allowed CORS origins:', allowedOrigins);

// More permissive CORS for production debugging
const corsOptions = {
  origin: (origin: string | undefined, callback: (err: Error | null, allow?: boolean) => void) => {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) {
      return callback(null, true);
    }

    // Check if origin matches any allowed origins
    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return allowedOrigin === origin;
      } else if (allowedOrigin instanceof RegExp) {
        return allowedOrigin.test(origin);
      }
      return false;
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      console.log(`CORS blocked origin: ${origin}`);
      callback(new Error('Not allowed by CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS', 'PATCH'],
  allowedHeaders: [
    'Content-Type',
    'Authorization',
    'Origin',
    'X-Requested-With',
    'Accept',
    'Access-Control-Request-Method',
    'Access-Control-Request-Headers',
    'Cache-Control',
    'Pragma'
  ],
  exposedHeaders: ['Access-Control-Allow-Origin'],
  optionsSuccessStatus: 200,
  preflightContinue: false
};

app.use(cors(corsOptions));

// Manual OPTIONS handler for additional CORS support
app.options('*', (req, res) => {
  const origin = req.headers.origin;
  console.log(`OPTIONS request from origin: ${origin}`);
  
  // Allow the requesting origin if it's in our allowed list
  if (origin && (
    origin === 'https://azanika.vercel.app' ||
    origin.match(/^https:\/\/azanika.*\.vercel\.app$/) ||
    origin.includes('localhost')
  )) {
    res.header('Access-Control-Allow-Origin', origin);
  } else {
    res.header('Access-Control-Allow-Origin', 'https://azanika.vercel.app');
  }
  
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Origin, X-Requested-With, Accept, Cache-Control, Pragma');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Max-Age', '86400'); // Cache preflight for 24 hours
  res.status(200).end();
});

// Request logging middleware
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path} - Origin: ${req.headers.origin || 'none'}`);
  next();
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