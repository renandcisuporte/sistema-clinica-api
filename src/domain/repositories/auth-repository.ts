import { AuthOutput, AuthUser } from '@/domain/entities/auth'
import { AuthRepository } from '@/domain/inferfaces/repositories/auth-repository'
import { PrismaClient } from '@prisma/client'

export class AuthRepositoryImp implements AuthRepository {
  constructor(protected readonly db: PrismaClient) {}

  async findById(userId: string): Promise<AuthUser | null> {
    const result = await this.db.user.findFirst({
      where: { id: userId, deletedAt: null }
    })

    if (!result) return null

    const { password, createdAt, deletedAt, updatedAt, ...rest } = result
    return { ...rest }
  }

  async findByEmail(email: string): Promise<AuthOutput | null> {
    const result = await this.db.user.findFirst({
      where: {
        email: email,
        deletedAt: null
      }
    })

    if (!result) return null

    const { createdAt, updatedAt, deletedAt, ...rest } = result
    return { ...rest }
  }
}
