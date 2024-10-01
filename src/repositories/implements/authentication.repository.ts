import { AuthenticationInterface } from '@/entities/authentication'
import { AuthenticationRepositoryInterface } from '@/repositories/authentication.interface'
import { PrismaClient } from '@prisma/client'

export class AuthenticationRepository
  implements AuthenticationRepositoryInterface
{
  constructor(protected readonly db: PrismaClient) {}

  async first(email: string): Promise<AuthenticationInterface | null> {
    const result = await this.db.user.findFirst({
      where: {
        email: email,
        deletedAt: null
      }
    })
    if (!result) return null

    const { id, fullName, password } = result

    return {
      id,
      email: result.email,
      fullName,
      password
    }
  }
}
