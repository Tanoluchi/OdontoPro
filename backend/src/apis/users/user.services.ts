import { UserDAO } from './user.dao.js';

export const createUser = async (email: string, password: string) => {
    return await UserDAO.createUser({ email, password, role_id: 2 });
}

export const getUserById = async (userId: any) => {
    const user = await UserDAO.getUserById(userId);
    if (!user) throw new Error('User not found');

    return user;
}
