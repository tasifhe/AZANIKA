import { NextResponse } from 'next/server';

export async function GET() {
  return NextResponse.json({
    status: 'OK',
    message: 'AZANIKA API is running',
    timestamp: new Date().toISOString(),
    endpoints: {
      products: '/api/products',
      orders: '/api/orders',
      auth: {
        login: '/api/auth/login',
        register: '/api/auth/register'
      }
    }
  });
}
