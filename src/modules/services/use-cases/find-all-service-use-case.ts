import { ServiceInProductsRepository } from '@/modules/services-in-products/prisma/repositories/service-in-product-repository'
import { ServiceOutput } from '@/modules/services/prisma/entities/service'
import { ServicesRepository } from '@/modules/services/prisma/repositories/service-repository'

export interface FindAllServiceUseCaseInterface {
  execute(args: any): Promise<Output>
}

export class FindAllServiceUseCase implements FindAllServiceUseCaseInterface {
  constructor(
    protected readonly repository: ServicesRepository,
    protected readonly serviceInProduct: ServiceInProductsRepository
  ) {}

  async execute(args: any): Promise<Output> {
    const { clinicId, name = '', limit, page } = args

    const common = {
      clinicId,
      name,
      limit,
      page
    }

    const [total, data] = await Promise.all([
      this.repository.count({ clinicId, name }),
      this.repository.all(common)
    ])

    const dataOutup: Temp[] = []
    for (const item of data) {
      const total = await this.serviceInProduct.count({
        clinicId: item.clinicId,
        serviceId: item.id
      })
      dataOutup.push({
        ...item,
        total: total
      })
    }

    return {
      total,
      data: dataOutup
    }
  }
}

type Temp = ServiceOutput & { total: number }

type Output = {
  total: number
  data: Temp[]
}
