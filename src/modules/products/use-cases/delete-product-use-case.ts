import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'

export class DeleteProductUseCase implements DeleteProductUseCaseInterface {
  constructor(protected readonly repository: ProductsRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export interface DeleteProductUseCaseInterface {
  execute(id: string): Promise<void>
}
