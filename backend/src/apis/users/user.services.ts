import {UserDAO} from './user.dao.js';
import type { CreateUserDto } from './user.dto.js';

export const createUser = async (userData: CreateUserDto) => {
    return await UserDAO.createUser(userData);
}

export const getUserById = async (userId: any) => {
    const user = await UserDAO.getUserById(userId);
    if (!user) throw new Error('User not found');

    return user;
}
