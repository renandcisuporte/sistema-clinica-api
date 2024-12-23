import { ServiceInProductsRepository } from '@/modules/services-in-products/prisma/repositories/service-in-product-repository'

export interface FindAllServiceInProductUseCaseInterface {
  execute(args: any): Promise<Output>
}

export class FindAllServiceInProductUseCase
  implements FindAllServiceInProductUseCaseInterface
{
  constructor(protected readonly repository: ServiceInProductsRepository) {}

  async execute(args: any): Promise<Output> {
    const { clinicId, serviceId } = args
    const result = await this.repository.allService(clinicId, serviceId)

    if (!result) return { data: [] }
    return { data: result }
  }
}

type Output = {
  data: any[]
}
