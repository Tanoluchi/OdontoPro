import { createUser } from './user.controller.js';

import { Router } from 'express';

const router = Router();

// User routes
router.post('/', createUser);

export default router;