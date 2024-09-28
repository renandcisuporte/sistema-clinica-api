import { RepositoryAbstract } from '@/common/abstracts/repository.abstract'
import { FirstRepositoryInterface } from '@/common/interfaces/repository.interface'
import { PrismaClient } from '@prisma/client'

export class AuthRepository
  extends RepositoryAbstract<PrismaClient>
  implements FirstRepositoryInterface
{
  async first(email: string) {
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
