"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notFoundHandler = exports.errorHandler = void 0;
const errorHandler = (err, req, res, next) => {
    const statusCode = err.statusCode || err.status || 500;
    const message = err.message || 'Internal Server Error';
    // Log error for debugging (in production, use proper logging service)
    if (process.env.NODE_ENV === 'development') {
        console.error('Error:', {
            message,
            stack: err.stack,
            path: req.path,
            method: req.method
        });
    }
    res.status(statusCode).json({
        success: false,
        message,
        ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    });
};
exports.errorHandler = errorHandler;
const notFoundHandler = (req, res) => {
    res.status(404).json({
        success: false,
        message: `Route ${req.originalUrl} not found`
    });
};
exports.notFoundHandler = notFoundHandler;
