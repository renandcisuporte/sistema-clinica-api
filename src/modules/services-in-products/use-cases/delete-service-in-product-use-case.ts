import { ServiceInProductsRepository } from '@/modules/services-in-products/prisma/repositories/service-in-product-repository'

export class DeleteServiceInProductUseCase
  implements DeleteServiceInProductUseCaseInterface
{
  constructor(protected readonly repository: ServiceInProductsRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export interface DeleteServiceInProductUseCaseInterface {
  execute(id: string): Promise<void>
}
