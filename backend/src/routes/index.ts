import { Router } from "express";
import type { Request, Response, NextFunction } from 'express';

import * as userRouter from '../apis/users/user.router.js';

const router = Router();

// API routes
router.get('/', (_req: Request, res: Response) => {
  res.json({ message: 'OdontoPro API is running' });
});

// User
router.use('/users', userRouter.default);

// Health check endpoint
router.get('/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
router.use((_req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
router.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default router;