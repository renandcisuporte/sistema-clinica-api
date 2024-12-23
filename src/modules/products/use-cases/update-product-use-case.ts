import {
  ProductInput,
  ProductOutput
} from '@/modules/products/prisma/entities/product'
import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'
import { priceFormated } from '@/shared/utils'

export class UpdateProductUseCase implements UpdateProductUseCaseInterface {
  constructor(protected readonly repository: ProductsRepository) {}

  async execute(
    id: string,
    input: ProductInput
  ): Promise<{ data: ProductOutput }> {
    const { price, ...rest } = input
    const result = await this.repository.update(id, {
      price: priceFormated(`${price}`),
      ...rest
    })

    return { data: result }
  }
}

export interface UpdateProductUseCaseInterface {
  execute(id: string, input: ProductInput): Promise<{ data: ProductOutput }>
}
