import { ProductOutput } from '@/modules/products/prisma/entities/product'
import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'

type Output = {
  data: ProductOutput | null
}

export class FindFirstProductUseCase
  implements FindFirstProductUseCaseInterface
{
  constructor(protected readonly repository: ProductsRepository) {}

  async execute(id: string): Promise<Output> {
    const result = await this.repository.first(id)
    return {
      data: result
    }
  }
}

export interface FindFirstProductUseCaseInterface {
  execute(id: string): Promise<Output>
}
