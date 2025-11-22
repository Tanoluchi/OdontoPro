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

//santi updateuserbyid:

// Update user 
import { Request, Response } from "express";
import { updateUserService } from "../services/user.service";

export const updateUser = async (req: Request, res: Response) => {
  try {
    const userId = req.params.id;
    const updatedUser = await updateUserService(userId, req.body);

    if (!updatedUser) {
      return res.status(404).json({ message: "Usuario no encontrado" });
    }

    return res.json({
      message: "Usuario actualizado correctamente",
      user: updatedUser
    });

  } catch (error) {
    return res.status(500).json({
      message: "Error al actualizar el usuario"
    });
  }
};


// Delete user
export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ message: "ID inválido" });
        }

        const deleted = await UserService.deleteUser(id);

        if (!deleted) {
            return res.status(404).json({ message: "Usuario no encontrado" });
        }

        return res.status(200).json({
            message: "Usuario eliminado correctamente",
            deleted
        });

    } catch (error) {
        console.error("Error en deleteUser:", error);
        return res.status(500).json({ message: "Error interno del servidor" });
    }
};