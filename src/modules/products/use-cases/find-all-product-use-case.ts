import { ProductOutput } from '@/modules/products/prisma/entities/product'
import { ProductsRepository } from '@/modules/products/prisma/repositories/product-repository'

export interface FindAllProductUseCaseInterface {
  execute(args: any): Promise<Output>
}

export class FindAllProductUseCase implements FindAllProductUseCaseInterface {
  constructor(protected readonly repository: ProductsRepository) {}

  async execute(args: any): Promise<Output> {
    const { clinicId, name = '', nameAsc, limit, page } = args

    const common = {
      clinicId,
      name,
      nameAsc,
      limit,
      page
    }

    const [total, data] = await Promise.all([
      this.repository.count({ clinicId, name }),
      this.repository.all(common)
    ])

    return {
      total,
      data
    }
  }
}

type Output = {
  total: number
  data: ProductOutput[]
}
