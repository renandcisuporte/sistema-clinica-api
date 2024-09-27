import { RepositoryAbstract } from '@/common/abstracts/repository.abstract'
import { Auth } from '@/modules/auth/dtos/auth.interface'
import { AuthRepositoryInterface } from '@/modules/auth/repositories/auth-abstract.repository'
import { PrismaClient } from '@prisma/client'

export class AuthRepository
  extends RepositoryAbstract<PrismaClient>
  implements AuthRepositoryInterface<Auth>
{
  async auth(email: string) {
    const result = await this.repository.user.findFirst({
      where: {
        email,
        deletedAt: null
      }
    })

    if (!result) return null
    return result
  }
}
