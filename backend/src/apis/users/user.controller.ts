import * as userService from './user.services.js'
import type { CreateUserDto } from './user.dto.js';
import type {Request, Response} from 'express';

export const createUser = async (req: Request, res: Response) => {
  try {
    const userData: CreateUserDto = req.body
    const user = await userService.createUser(userData)
    res.status(201).json(user)
  } catch (err: any) {
    res.status(400).json({
        message: 'Error creating user',
        error: err.message 
    })
  }
}