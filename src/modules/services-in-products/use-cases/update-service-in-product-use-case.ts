import {
  ServiceInProductInput,
  ServiceInProductOutput
} from '@/modules/services-in-products/prisma/entities/service-in-product'
import { ServiceInProductsRepository } from '@/modules/services-in-products/prisma/repositories/service-in-product-repository'

export class UpdateServiceInProductUseCase
  implements UpdateServiceInProductUseCaseInterface
{
  constructor(protected readonly repository: ServiceInProductsRepository) {}

  async execute(
    id: string,
    input: ServiceInProductInput
  ): Promise<{ data: ServiceInProductOutput }> {
    const result = await this.repository.update(id, input)

    return { data: result }
  }
}

export interface UpdateServiceInProductUseCaseInterface {
  execute(
    id: string,
    input: ServiceInProductInput
  ): Promise<{ data: ServiceInProductOutput }>
}
