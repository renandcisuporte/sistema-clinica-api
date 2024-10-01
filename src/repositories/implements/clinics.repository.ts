import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'
import { Prisma, PrismaClient } from '@prisma/client'

export class ClinicsRepository implements ClinicsRepositoryInterface {
  constructor(protected readonly db: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.db.clinic.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(id: string, input: Prisma.ClinicUpdateInput): Promise<any> {
    const { createdAt, updatedAt, ...restInput } = input
    const res = await this.db.clinic.update({
      where: { id, deletedAt: null },
      data: { ...restInput }
    })
    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async create(input: Prisma.ClinicCreateInput): Promise<any> {
    const { createdAt, updatedAt, ...restInput } = input
    const res = await this.db.clinic.create({
      data: { ...restInput }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async all(...args: any): Promise<any[]> {
    const res = await this.db.clinic.findMany({ where: { deletedAt: null } })
    return res.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }

  async first(id: string): Promise<any | null> {
    const res = await this.db.clinic.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })
    if (!res) return null
    const { deletedAt, ...rest } = res
    return { ...rest }
  }
}
