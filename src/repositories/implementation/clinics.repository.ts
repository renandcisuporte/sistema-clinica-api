import { ClinicInput, ClinicOutput } from '@/entities/clinics'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'
import { PrismaClient } from '@prisma/client'

export class ClinicsRepository implements ClinicsRepositoryInterface {
  constructor(protected readonly db: PrismaClient) {}

  async delete(args: any): Promise<void> {
    const { id, userId } = args
    await this.db.clinic.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(_id: string, input: ClinicInput): Promise<ClinicOutput> {
    const { clinicId, ...restInput } = input

    const result = await this.db.clinic.update({
      where: { id: _id, deletedAt: null },
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async create(input: ClinicInput): Promise<ClinicOutput> {
    const { ...restInput } = input
    const result = await this.db.clinic.create({
      data: {
        ...restInput
      }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async findClinicCode(code: string): Promise<string | null> {
    const response = await this.db.clinic.findFirst({
      where: {
        clinicId: code,
        deletedAt: null
      },
      include: {
        userAdmin: {
          select: {
            user: true
          }
        }
      }
    })

    if (!response) return null

    const { id } = response
    return id
  }

  async first(args: any): Promise<ClinicOutput | null> {
    const { id } = args

    const response = await this.db.clinic.findUnique({
      where: {
        id,
        deletedAt: null
      },
      include: {
        userAdmin: {
          select: {
            user: true
          }
        }
      }
    })

    if (!response) return null

    const { deletedAt, userAdmin, ...rest } = response
    return { ...rest }
  }

  async all(args: any): Promise<{ data: ClinicOutput[]; total: number }> {
    const where: any = {}
    const conditions: any = []

    const { title, fantasy, cnpj, clinicId, limit = 15, page = 1 } = args

    if (title || fantasy) {
      conditions.push({ title: { contains: title, caseInsensitive: false } })
      conditions.push({
        fantasy: { contains: title, caseInsensitive: false }
      })
    }

    if (cnpj) conditions.push({ cnpj: { contains: cnpj } })
    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const [total, data] = await this.db.$transaction([
      this.db.clinic.count({
        where: { deletedAt: null, id: clinicId, ...where }
      }),
      this.db.clinic.findMany({
        where: { deletedAt: null, id: clinicId, ...where },
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
