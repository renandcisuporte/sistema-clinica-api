import { PrismaClient } from '@prisma/client'
import * as bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  const salt = bcrypt.genSaltSync(10)
  const password = bcrypt.hashSync('dci@6913', salt)

  const dci = await prisma.user.upsert({
    where: { email: 'dci@dcisuporte.com.br' },
    update: {},
    create: {
      email: 'dci@dcisuporte.com.br',
      fullName: 'dci suporte',
      password,
      refreshToken: '',
      token: '',
      clinic: {
        create: {
          fantasy: 'fantasy',
          cnpj: '66.686.847/0001-80',
          ie: '00000000',
          title: 'Titulo Fantasy',
          address: 'Amaral Lyra',
          number: '1155',
          complement: 'Sala 15',
          city: 'Itápolis',
          state: 'SP'
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
