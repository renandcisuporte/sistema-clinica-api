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
    const { type, clinicId } = args

    const where = Object.assign({}, { clinicId, deletedAt: null })

    if (type) Object.assign(where, { AND: { expense: { active: true, type } } })

    return this.db.realese.count({
      where: {
        ...where
      }
    })
  }

  async all(args: Record<string, any>): Promise<RealeseOutput[]> {
    const { type, clinicId } = args

    const where = Object.assign({}, { clinicId, deletedAt: null })

    if (type) Object.assign(where, { AND: { expense: { active: true, type } } })

    const result = await this.db.realese.findMany({
      include: {
        expense: {
          select: {
            description: true
          }
        }
      },
      orderBy: {
        expense: {
          description: 'asc'
        }
      },
      where: {
        ...where
      }
    })

    return result.map(({ deletedAt, createdAt, id, updatedAt, ...rest }) => ({
      ...rest
    }))
  }
}
