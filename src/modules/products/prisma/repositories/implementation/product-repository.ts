import {
  ProductInput,
  ProductOutput
} from '@/modules/products/prisma/entities/product'
import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'
import { PrismaClient } from '@prisma/client'

export class ProductRepositoryImp implements ProductsRepository {
  constructor(protected readonly db: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.db.product.update({
      where: { deletedAt: null, id },
      data: { deletedAt: new Date() }
    })
  }

  async update(id: string, input: ProductInput): Promise<ProductOutput> {
    const result = await this.db.product.update({
      where: { id, deletedAt: null },
      data: {
        ...input
      }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async create(input: ProductInput): Promise<ProductOutput> {
    const result = await this.db.product.create({
      data: { ...input }
    })

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async first(id: string): Promise<ProductOutput | null> {
    const result = await this.db.product.findUnique({
      where: { id, deletedAt: null }
    })

    if (!result) return null

    const { deletedAt, ...rest } = result
    return { ...rest }
  }

  async count(args: Record<string, any>): Promise<number> {
    const { product, active, clinicId } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (product) conditions.push({ product: { contains: product } })
    if (active) where.active = Boolean(active === 'true' ? true : false)

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return this.db.product.count({
      where: { ...where }
    })
  }

  async all(args: Record<string, any>): Promise<ProductOutput[]> {
    const { name, clinicId, limit = 15, page = 1 } = args

    const where: Record<string, any> = { clinicId, deletedAt: null }
    const conditions: Record<string, any> = []

    if (name) conditions.push({ name: { contains: name } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await this.db.product.findMany({
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit)
    })

    return result.map(({ deletedAt, ...rest }) => ({ ...rest }))
  }
}
