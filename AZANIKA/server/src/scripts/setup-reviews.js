require('dotenv').config();
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});

async function createReviewsTable() {
  try {
    console.log('📝 Creating reviews table...');
    
    // Read the SQL file
    const sqlPath = path.join(__dirname, 'create-reviews-table.sql');
    const sql = fs.readFileSync(sqlPath, 'utf8');
    
    // Execute the SQL
    await pool.query(sql);
    
    console.log('✅ Reviews table created successfully!');
    console.log('✅ Triggers and indexes created!');
    console.log('✅ Sample reviews inserted!');
    
    await pool.end();
    process.exit(0);
  } catch (error) {
    console.error('❌ Error creating reviews table:', error);
    await pool.end();
    process.exit(1);
  }
}

createReviewsTable();
