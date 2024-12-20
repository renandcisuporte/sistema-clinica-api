import {
  ProductInput,
  ProductOutput
} from '@/modules/products/prisma/entities/product'
import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'

export class UpdateProductUseCase implements UpdateProductUseCaseInterface {
  constructor(protected readonly repository: ProductsRepository) {}

  async execute(
    id: string,
    input: ProductInput
  ): Promise<{ data: ProductOutput }> {
    const { price, ...rest } = input
    const result = await this.repository.update(id, {
      // @ts-ignore
      price: parseFloat(`${price}`.replace(/\D/, '') / 100),
      ...rest
    })

    return { data: result }
  }
}

export interface UpdateProductUseCaseInterface {
  execute(id: string, input: ProductInput): Promise<{ data: ProductOutput }>
}
