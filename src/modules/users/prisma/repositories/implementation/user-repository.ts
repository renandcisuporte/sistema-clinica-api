import { UserRepository } from '@/modules/users/prisma/repositories/user-repository'
import { PrismaClient } from '@prisma/client'
import { UserInput, UserOutput } from '../../modules/users/prisma/entities/user'

export class UserRepositoryImpl implements UserRepository {
  constructor(private readonly db: PrismaClient) {}

  async findByEmail(email: string): Promise<UserOutput | null> {
    const result = await this.db.user.findUnique({
      where: { email, deletedAt: null }
    })

    if (!result) return null
    const { deletedAt, password, ...userRest } = result
    return userRest
  }

  async findById(id: string): Promise<UserOutput | null> {
    const result = await this.db.user.findUnique({
      where: { id, deletedAt: null }
    })
    if (!result) return null
    const { deletedAt, password, ...userRest } = result
    return userRest
  }

  async resetPassword(email: string, password: string): Promise<void> {
    await this.db.user.update({
      where: { email },
      data: { password }
    })
  }

  async create(input: UserInput): Promise<UserOutput> {
    const result = await this.db.user.create({
      data: { ...input }
    })

    const { deletedAt, password, ...userRest } = result
    return { ...userRest }
  }

  async update(id: string, input: UserInput): Promise<UserOutput> {
    const result = await this.db.user.update({
      where: { id, deletedAt: null },
      data: { ...input }
    })

    const { deletedAt, password, ...userRest } = result
    return { ...userRest }
  }

  async delete(id: string): Promise<void> {
    await this.db.user.update({
      where: { id, deletedAt: null },
      data: { deletedAt: new Date() }
    })
  }
}
