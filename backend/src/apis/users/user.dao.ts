import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export class UserDAO {
    static async createUser(userData: any) {
        return await prisma.user.create({
            data: userData
        })
    }
}