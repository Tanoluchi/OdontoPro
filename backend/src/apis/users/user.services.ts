import {UserDAO} from './user.dao.js';
import type { CreateUserDto } from './user.dto.js';

export const createUser = async (userData: CreateUserDto) => {
    return await UserDAO.createUser(userData);
}