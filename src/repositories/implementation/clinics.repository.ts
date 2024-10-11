import { ClinicInterface } from '@/entities/clinics'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'
import { PrismaClient } from '@prisma/client'

export class ClinicsRepository implements ClinicsRepositoryInterface {
  constructor(protected readonly db: PrismaClient) {}

  async delete(args: any): Promise<void> {
    const { id, userId } = args
    await this.db.clinic.update({
      where: { deletedAt: null, id, userId },
      data: { deletedAt: new Date() }
    })
  }

  async update(id: string, input: ClinicInterface): Promise<ClinicInterface> {
    const { createdAt, updatedAt, userId, ...restInput } = input
    const res = await this.db.clinic.update({
      where: { id, userId, deletedAt: null },
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async create(input: ClinicInterface): Promise<ClinicInterface> {
    const { id, createdAt, updatedAt, ...restInput } = input
    const res = await this.db.clinic.create({
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async first(args: any): Promise<ClinicInterface | null> {
    const { id, userId } = args
    console.log({ id, userId })
    const res = await this.db.clinic.findUnique({
      where: {
        id,
        userId,
        deletedAt: null
      }
    })
    if (!res) return null
    const { deletedAt, ...rest } = res
    return { ...rest }
  }

  async all(args: any): Promise<{ data: ClinicInterface[]; total: number }> {
    const where: any = {}
    const conditions: any = []

    const { userId, title, fantasy, cnpj, limit = 15, page = 1 } = args

    if (title) conditions.push({ title: { contains: title } })
    if (fantasy) conditions.push({ fantasy: { contains: fantasy } })
    if (cnpj) conditions.push({ cnpj: { contains: cnpj } })
    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const [total, data] = await this.db.$transaction([
      this.db.clinic.count({
        where: { deletedAt: null, userId, ...where }
      }),
      this.db.clinic.findMany({
        where: { deletedAt: null, userId, ...where },
        skip: Number((page - 1) * limit),
        take: Number(limit)
      })
    ])

    return {
      data: data.map((item) => {
        const { deletedAt, ...rest } = item
        return { ...rest }
      }),
      total
    }
  }
}
