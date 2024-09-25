import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'

const prisma = new PrismaClient()

async function main() {
  const renan = await prisma.user.upsert({
    where: { email: 'renan@prisma.io' },
    update: {},
    create: {
      code: randomUUID(),
      email: 'renan@prisma.io',
      fullName: 'renan',
      password: '123',
      refreshToken: '',
      token: '',
      clinics: {
        create: {
          code: randomUUID(),
          fantasy: 'fantasy'
        }
      }
    }
  })

  console.log({ renan })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
