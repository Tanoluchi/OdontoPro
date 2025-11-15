import { PrismaClient } from '@prisma/client'
import { hashPassword } from '../src/apis/auth/auth.helpers.js'

const prisma = new PrismaClient()

async function main() {
  // Crear rol si no existe
  let adminRole = await prisma.role.findFirst({
    where: { name: 'admin' }
  })

  let userRole = await prisma.role.findFirst({
    where: { name: 'user' }
  })

  if (!adminRole) {
    adminRole = await prisma.role.create({
      data: {
        name: 'admin'
      }
    })
  }

   if (!userRole) {
    userRole = await prisma.role.create({
      data: {
        name: 'user'
      }
    })
  }

  // Crear usuario si no existe
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      password: hashPassword('securepassword'),
      rol_id: adminRole.id
    }
  })

  console.log('Seed data created:', { adminRole, user })
}

main()
  .then(() => prisma.$disconnect())
  .catch(e => {
    console.error(e)
    prisma.$disconnect()
    process.exit(1)
  })
