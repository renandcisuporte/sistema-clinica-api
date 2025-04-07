import {
  ServiceInput,
  ServiceOutput
} from '@/modules/services/prisma/entities/service'
import { ServicesRepository } from '@/modules/services/prisma/repositories/service-repository'
import { PrismaClient } from '@prisma/client'

export class ServiceRepositoryImp implements ServicesRepository {
  constructor(protected readonly db: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.db.service.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(id: string, input: ServiceInput): Promise<ServiceOutput> {
    const result = await this.db.service.update({
      where: { id, deletedAt: null },
      data: {
        ...input
      }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async create(input: ServiceInput): Promise<ServiceOutput> {
    const result = await this.db.service.create({
      data: { ...input }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async first(id: string): Promise<ServiceOutput | null> {
    const result = await this.db.service.findUnique({
      where: { id, deletedAt: null }
    })

    if (!result) return null

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async count(args: Record<string, any>): Promise<number> {
    const { service, active, clinicId } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (service) conditions.push({ service: { contains: service } })
    if (active) where.active = Boolean(active === 'true' ? true : false)

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return this.db.service.count({
      where: { ...where }
    })
  }

  async all(args: Record<string, any>): Promise<ServiceOutput[]> {
    const { name, clinicId, limit = 15, page = 1 } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (name) conditions.push({ name: { contains: name } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await this.db.service.findMany({
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit),
      orderBy: { name: 'asc' }
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }
}
