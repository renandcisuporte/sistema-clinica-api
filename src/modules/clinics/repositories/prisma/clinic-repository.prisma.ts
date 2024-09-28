import { RepositoryAbstract } from '@/common/abstracts/repository.abstract'
import {
  AllRepositoryInterface,
  CreateRepositoryInterface,
  FirstRepositoryInterface,
  UpdateRepositoryInterface
} from '@/common/interfaces/repository.interface'
import { Clinic, Prisma, PrismaClient } from '@prisma/client'

export class ClinicRepository
  extends RepositoryAbstract<PrismaClient>
  implements
    CreateRepositoryInterface,
    UpdateRepositoryInterface,
    FirstRepositoryInterface,
    AllRepositoryInterface
{
  async create(input: Prisma.ClinicCreateInput): Promise<Clinic> {
    return await this.repository.clinic.create({
      data: { ...input }
    })
  }

  async update(
    id: string,
    input: Prisma.ClinicUpdateInput
  ): Promise<Clinic | null> {
    const result = await this.repository.clinic.findFirst({
      where: { code: id, deletedAt: null }
    })
    if (!result) return null

    return await this.repository.clinic.update({
      where: { id: result.id },
      data: { ...input }
    })
  }

  async first(id: string) {
    return await this.repository.clinic.findFirst({
      where: { code: id, deletedAt: null }
    })
  }

  async all() {
    return await this.repository.clinic.findMany()
  }
}
