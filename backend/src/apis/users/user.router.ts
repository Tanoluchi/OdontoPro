import { createUser, getUserById } from './user.controller.js';

import { Router } from 'express';

const router = Router();

// User routes
router.post('/', createUser);
router.get('/:id', getUserById);

export default router;