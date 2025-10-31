// Extend Express Request type to include user property
import { Request } from 'express';

declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email: string;
        role?: string;
      } | any;
    }
  }
}

export {};
