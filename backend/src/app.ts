import express from 'express';
import type { Express, Request, Response, NextFunction } from 'express';
import { PrismaClient } from '@prisma/client';
import indexRouter from "./routes/index.js";

// Initialize Prisma Client
export const prisma = new PrismaClient();

// Create Express app
const app: Express = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// CORS middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  return next();
});

// Use the main router
app.use("/api", indexRouter);

export default app;
