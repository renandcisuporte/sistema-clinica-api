import { RepositoryAbstract } from '@/common/abstracts/repository.abstract'
import {
  AllRepositoryInterface,
  CreateRepositoryInterface,
  DeleteRepositoryInterface,
  FirstRepositoryInterface,
  UpdateRepositoryInterface
} from '@/common/interfaces/repository.interface'
import { CreateUser } from '@/modules/users/dtos/create.inteface'
import { User } from '@/modules/users/dtos/user.interface'
import { UserMapper } from '@/modules/users/mappers'
import { PrismaClient } from '@prisma/client'

export class UserRepository
  extends RepositoryAbstract<PrismaClient>
  implements
    DeleteRepositoryInterface,
    CreateRepositoryInterface,
    UpdateRepositoryInterface,
    FirstRepositoryInterface,
    AllRepositoryInterface
{
  async delete(id: string): Promise<void> {
    const user = await this.repository.user.findFirst({
      where: {
        code: id,
        deletedAt: null
      }
    })

    if (!user) return

    await this.repository.user.update({
      where: { id: user.id },
      data: { deletedAt: new Date() }
    })
  }

  async create(input: CreateUser): Promise<User> {
    const user = await this.repository.user
      .create({ data: { ...input, refreshToken: '', token: '' } })
      .then((user: any) => new UserMapper(user).map())

    return user
  }

  async update(id: string, input: CreateUser): Promise<User | null> {
    const user = await this.repository.user.findFirst({
      where: {
        code: id,
        deletedAt: null
      }
    })

    if (!user) return null

    const userUpdated = await this.repository.user.update({
      where: { id: user.id },
      data: { ...input }
    })

    return new UserMapper(userUpdated).map()
  }

  async first(code: string): Promise<User | null> {
    return await this.repository.user
      .findFirst({ where: { code, deletedAt: null } })
      .then((user: any) => new UserMapper(user).map())
  }

  async all(): Promise<User[]> {
    return (
      await this.repository.user.findMany({ where: { deletedAt: null } })
    ).map((item: any) => new UserMapper(item).map())
  }
}
