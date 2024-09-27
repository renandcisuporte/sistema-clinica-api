import { Clinic, Prisma } from '@prisma/client'
import { ClinicAbstractRepository } from '../clinic.abstract.repository'

export class ClinicRepository extends ClinicAbstractRepository {
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

  async findFirst(id: string) {
    return await this.repository.clinic.findFirst({
      where: { code: id, deletedAt: null }
    })
  }

  async findAll() {
    return await this.repository.clinic.findMany()
  }
}
