import * as userService from './user.services.js'
import type { Request, Response } from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body
    if (!email || !password) throw new Error('Email and password are required')
  
    const user = await userService.createUser(email, password)
    res.status(201).json(user)
  } catch (err: any) {
    res.status(400).json({
        message: 'Error creating user',
        error: err.message 
    })
  }
};

export const getUserById = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    if (!userId) throw new Error('User ID is required');

    const user = await userService.getUserById(parseInt(userId));

    res.status(200).json(user)
  } catch (err: any) {
    res.status(400).json({
        message: 'Error fetching users',
        error: err.message 
    })
  }
};

// Update user
export const updateUser = async (req: Request, res: Response) => {};

// Delete user
export const deleteUser = async (req: Request, res: Response) => {};
