import { PrismaClient } from '@prisma/client'
import { randomUUID } from 'crypto'
import { hashPass } from '../src/utils'

const prisma = new PrismaClient()

async function main() {
  const password = hashPass('dci@6913')
  const dci = await prisma.user.upsert({
    where: { email: 'dci@dcisuporte.com.br' },
    update: {},
    create: {
      code: randomUUID(),
      email: 'dci@dcisuporte.com.br',
      fullName: 'dci suporte',
      password,
      refreshToken: '',
      token: '',
      clinic: {
        create: {
          cnpj: '66.686.847/0001-80',
          ie: '00000000',
          title: 'Titulo Fantasy',
          address: {
            address: 'Amaral Lyra',
            number: '1155',
            complement: 'Sala 15',
            city: 'Itápolis',
            state: 'SP'
          },
          code: randomUUID(),
          fantasy: 'fantasy'
        }
      }
    }
  })

  console.log({ dci })
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
