import { Pool } from 'pg';

export function getPool() {
  if (!process.env.DATABASE_URL) {
    throw new Error('DATABASE_URL environment variable is not set');
  }
  
  return new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
      rejectUnauthorized: false,
    },
    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 10000,
  });
}

export async function queryDatabase<T = any>(
  queryText: string,
  values?: any[]
): Promise<T[]> {
  const pool = getPool();
  
  try {
    const result = await pool.query(queryText, values);
    return result.rows;
  } finally {
    await pool.end();
  }
}
