import {
  RealeseInput,
  RealeseOutput
} from '@/modules/realeses/prisma/entities/realese'
import { RealeseRepository } from '@/modules/realeses/prisma/repositories/realese-repository'
import { PrismaClient } from '@prisma/client'

export class RealeseRepositoryImp implements RealeseRepository {
  constructor(protected readonly db: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.db.realese.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(id: string, input: RealeseInput): Promise<RealeseOutput> {
    const result = await this.db.realese.update({
      where: { id, deletedAt: null },
      data: {
        ...input
      }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async create(input: RealeseInput): Promise<RealeseOutput> {
    const result = await this.db.realese.create({
      data: { ...input }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async upsave(input: RealeseInput): Promise<void> {
    const { clinicId, expenseId, date } = input

    await this.db.realese.deleteMany({ where: { clinicId, expenseId, date } })

    await this.db.realese.create({
      data: { ...input }
    })
  }

  async first(id: string): Promise<RealeseOutput | null> {
    const result = await this.db.realese.findUnique({
      where: { id, deletedAt: null }
    })

    if (!result) return null

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async count(args: Record<string, any>): Promise<number> {
    const { description, active, type, clinicId } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (description) conditions.push({ description: { contains: description } })
    if (active) where.active = Boolean(active === 'true' ? true : false)
    if (type) where.type = type

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return this.db.realese.count({
      where: { ...where }
    })
  }

  async all(args: Record<string, any>): Promise<RealeseOutput[]> {
    const { description, active, type, clinicId, limit = 15, page = 1 } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (description) conditions.push({ description: { contains: description } })
    if (active) where.active = Boolean(active === 'true' ? true : false)
    if (type) where.type = type

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await this.db.realese.findMany({
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit)
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }
}
