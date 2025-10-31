"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Load environment variables FIRST (before any other imports that use them)
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const products_1 = __importDefault(require("./routes/products"));
const orders_1 = __importDefault(require("./routes/orders"));
const cors_1 = __importDefault(require("cors"));
const errorHandler_1 = require("./middleware/errorHandler");
const supabase_1 = __importDefault(require("./config/supabase"));
const app = (0, express_1.default)();
// Middleware
const allowedOrigins = [
    'http://localhost:3000',
    'http://localhost:3001',
    process.env.CORS_ORIGIN || '',
    process.env.FRONTEND_URL || ''
].filter(origin => origin !== '');
app.use((0, cors_1.default)({
    origin: process.env.NODE_ENV === 'production'
        ? allowedOrigins
        : '*', // Allow all origins in development
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
// Health check route
app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK', message: 'Server is running' });
});
// Routes
app.use('/api/auth', auth_1.default);
app.use('/api/products', products_1.default);
app.use('/api/orders', orders_1.default);
// Error handling middleware (must be last)
app.use(errorHandler_1.notFoundHandler);
app.use(errorHandler_1.errorHandler);
// Test database connection
const testDBConnection = async () => {
    try {
        const result = await supabase_1.default.query('SELECT NOW()');
        console.log('✅ Supabase PostgreSQL connected successfully at:', result.rows[0].now);
    }
    catch (error) {
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
// Graceful shutdown handlers
const gracefulShutdown = async (signal) => {
    console.log(`${signal} received, shutting down gracefully...`);
    server.close(async () => {
        try {
            await supabase_1.default.end();
            console.log('✅ Database connections closed');
            console.log('✅ Server shut down successfully');
            process.exit(0);
        }
        catch (error) {
            console.error('❌ Error during shutdown:', error);
            process.exit(1);
        }
    });
    // Force shutdown after 30 seconds
    setTimeout(() => {
        console.error('⚠️ Forced shutdown after timeout');
        process.exit(1);
    }, 30000);
};
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));
// Handle uncaught errors
process.on('uncaughtException', (error) => {
    console.error('❌ Uncaught Exception:', error);
    gracefulShutdown('UNCAUGHT_EXCEPTION');
});
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ Unhandled Rejection at:', promise, 'reason:', reason);
    gracefulShutdown('UNHANDLED_REJECTION');
});
exports.default = app;
