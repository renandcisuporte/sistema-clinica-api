import {
  ProductInput,
  ProductOutput
} from '@/modules/products/prisma/entities/product'
import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'

export interface CreateProductUseCaseInterface {
  execute(input: ProductInput): Promise<{ data: ProductOutput }>
}

export class CreateProductUseCase implements CreateProductUseCaseInterface {
  constructor(protected readonly repository: ProductsRepository) {}

  async execute(input: ProductInput): Promise<{ data: ProductOutput }> {
    const { price, ...rest } = input

    const result = await this.repository.create({
      // @ts-ignore
      price: parseFloat(`${price}`.replace(/\D/, '') / 100),
      ...rest
    })

    return { data: result }
  }
}
