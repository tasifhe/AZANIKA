"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const pg_1 = require("pg");
const pool = new pg_1.Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    },
    // Force IPv4 and improve connection stability
    options: '-c search_path=public'
});
// Test connection
pool.on('connect', () => {
    console.log('✅ Connected to Supabase PostgreSQL database');
});
pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client:', err.message);
    process.exit(-1);
});
exports.default = pool;
