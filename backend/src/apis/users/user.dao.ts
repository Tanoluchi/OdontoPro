import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserDAO {
    static async createUser(userData: any) {
        return await prisma.user.create({
            data: userData
        });
    };

    static async getUserById(userId: any) {
        try{
            const user = await prisma.user.findUnique({
                where: { id: userId },
            });

            if (!user) return null
            console.log('Fetched user:', user);
            return user;
        }
        catch (error) {
            console.error('Error fetching user by ID:', error);
            return null;
        }
        finally {
            await prisma.$disconnect();
        }
    };
}