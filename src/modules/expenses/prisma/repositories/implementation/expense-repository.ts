import {
  ExpenseInput,
  ExpenseOutput
} from '@/modules/expenses/prisma/entities/expense'
import { ExpenseRepository } from '@/modules/expenses/prisma/repositories/expense-repository'
import { PrismaClient } from '@prisma/client'

export class ExpenseRepositoryImp implements ExpenseRepository {
  constructor(protected readonly db: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.db.expense.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(id: string, input: ExpenseInput): Promise<ExpenseOutput> {
    const result = await this.db.expense.update({
      where: { id, deletedAt: null },
      data: {
        ...input
      }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async create(input: ExpenseInput): Promise<ExpenseOutput> {
    const result = await this.db.expense.create({
      data: { ...input }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async activeInative(id: string): Promise<void> {
    const result = await this.db.expense.findUnique({
      where: { id, deletedAt: null },
      select: { active: true }
    })

    await this.db.expense.update({
      where: { id },
      data: { active: !result?.active }
    })
  }

  async activeInativeTypes(id: string): Promise<void> {
    const result = await this.db.expense.findUnique({
      where: { id, deletedAt: null },
      select: { type: true }
    })

    await this.db.expense.update({
      where: { id },
      data: { type: `${result?.type === 'fixed' ? 'variable' : 'fixed'}` }
    })
  }

  async first(id: string): Promise<ExpenseOutput | null> {
    const result = await this.db.expense.findUnique({
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

    return this.db.expense.count({
      where: { ...where }
    })
  }

  async all(args: Record<string, any>): Promise<ExpenseOutput[]> {
    const { description, active, type, clinicId, limit = 15, page = 1 } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (description) conditions.push({ description: { contains: description } })
    if (active) where.active = Boolean(active === 'true' ? true : false)
    if (type) where.type = type

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await this.db.expense.findMany({
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit)
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }
}
