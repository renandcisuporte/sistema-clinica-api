import { FirstRepositoryInterface } from '@/common/interfaces/repository.interface'
import { PrismaClient } from '@prisma/client'

export class AuthRepository implements FirstRepositoryInterface {
  constructor(protected readonly repository: PrismaClient) {}

  async first(email: string) {
    const result = await this.repository.user.findFirst({
      where: {
        email,
        deletedAt: null
      }
    })
    if (!result) return null

    const {
      id,
      code,
      passwordVerify,
      refreshToken,
      token,
      deletedAt,
      ...rest
    } = result

    return {
      ...rest,
      id: code
    }
  }
}
