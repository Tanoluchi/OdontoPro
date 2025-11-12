import { Router } from "express";
import type { Request, Response, NextFunction } from 'express';

const router = Router();

// API routes
router.get('/', (req: Request, res: Response) => {
  res.json({ message: 'OdontoPro API is running' });
});

// Health check endpoint
router.get('/health', (req: Request, res: Response) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// 404 handler
router.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
router.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

export default router;