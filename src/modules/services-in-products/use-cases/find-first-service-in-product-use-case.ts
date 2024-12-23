import { ServiceInProductOutput } from '@/modules/services-in-products/prisma/entities/service-in-product'
import { ServiceInProductsRepository } from '@/modules/services-in-products/prisma/repositories/service-in-product-repository'

type Output = {
  data: ServiceInProductOutput | null
}

export class FindFirstServiceInProductUseCase
  implements FindFirstServiceInProductUseCaseInterface
{
  constructor(protected readonly repository: ServiceInProductsRepository) {}

  async execute(id: string): Promise<Output> {
    const result = await this.repository.first(id)
    return {
      data: result
    }
  }
}

export interface FindFirstServiceInProductUseCaseInterface {
  execute(id: string): Promise<Output>
}
