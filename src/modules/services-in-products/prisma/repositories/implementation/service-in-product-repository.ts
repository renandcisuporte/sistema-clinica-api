import {
  ServiceInProductInput,
  ServiceInProductOutput
} from '@/modules/services-in-products/prisma/entities/service-in-product'
import { ServiceInProductsRepository } from '@/modules/services-in-products/prisma/repositories/service-in-product-repository'
import { PrismaClient } from '@prisma/client'

export class ServiceInProductRepositoryImp
  implements ServiceInProductsRepository
{
  constructor(protected readonly db: PrismaClient) {}

  async delete(id: string): Promise<void> {
    await this.db.serviceInProduct.delete({
      where: { id }
    })
  }

  async update(
    id: string,
    input: ServiceInProductInput
  ): Promise<ServiceInProductOutput> {
    const result = await this.db.serviceInProduct.update({
      where: { id },
      data: {
        ...input
      }
    })

    const { rentalPrice, ...rest } = result
    return { ...rest, rentalPrice: rentalPrice.toString() } as unknown as any
  }

  async upsave(input: ServiceInProductInput): Promise<void> {
    const { clinicId, productId, serviceId } = input

    await this.db.serviceInProduct.deleteMany({
      where: { clinicId, productId, serviceId }
    })

    await this.db.serviceInProduct.create({
      data: { ...input }
    })
  }

  async create(input: ServiceInProductInput): Promise<ServiceInProductOutput> {
    const result = await this.db.serviceInProduct.create({
      data: { ...input }
    })

    return {
      ...result,
      rentalPrice: result.rentalPrice.toString()
    } as unknown as any
  }

  async allService(clinicId: string, serviceId: string): Promise<any[] | null> {
    const result = await this.db.serviceInProduct.findMany({
      where: { serviceId, clinicId },
      include: {
        product: true,
        service: true
      }
    })

    if (!result) return null

    return result.map(({ product, service, rentalPrice, ...rest }) => ({
      serviceName: service?.name,
      productName: product?.name,
      productPrice: product?.price.toFixed(2),
      productQuantity: product?.quantity,
      rentalPrice: rentalPrice.toFixed(2),
      ...rest
    }))
  }

  async first(id: string): Promise<ServiceInProductOutput | null> {
    const result = await this.db.serviceInProduct.findUnique({
      where: { id }
    })

    if (!result) return null

    const { rentalPrice, ...rest } = result
    return { ...rest, rentalPrice: rentalPrice.toString() } as unknown as any
  }

  async count(args: Record<string, any>): Promise<number> {
    const { clinicId, serviceId } = args

    const where: Record<string, any> = { clinicId, serviceId }
    const conditions: Record<string, any> = []

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    return this.db.serviceInProduct.count({
      where: { ...where }
    })
  }

  async all(args: Record<string, any>): Promise<any[]> {
    const { name, clinicId, limit = 15, page = 1 } = args

    const where: Record<string, any> = { clinicId }
    const conditions: Record<string, any> = []

    if (name) conditions.push({ name: { contains: name } })

    if (conditions.length > 0) Object.assign(where, { OR: conditions })

    const result = await this.db.serviceInProduct.findMany({
      include: {
        product: true,
        service: true
      },
      where: { ...where },
      skip: Number((page - 1) * limit),
      take: Number(limit)
    })

    return result.map(({ product, service, ...rest }) => ({
      serviceName: service?.name,
      productName: product?.name,
      productPrice: product?.price.toString(),
      productQuantity: product?.quantity,
      ...rest
    }))
  }
}
