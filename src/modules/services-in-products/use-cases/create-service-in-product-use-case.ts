import { ServiceInProductInput } from '@/modules/services-in-products/prisma/entities/service-in-product'
import { ServiceInProductsRepository } from '@/modules/services-in-products/prisma/repositories/service-in-product-repository'
import { priceFormated } from '@/shared/utils'

export interface CreateServiceInProductUseCaseInterface {
  execute(
    input: ServiceInProductInput[],
    clinicId: string
  ): Promise<{ data: string }>
}

export class CreateServiceInProductUseCase
  implements CreateServiceInProductUseCaseInterface
{
  constructor(protected readonly repository: ServiceInProductsRepository) {}

  async execute(
    input: ServiceInProductInput[],
    clinicId: string
  ): Promise<{ data: string }> {
    for (const rows in input) {
      const { serviceId, productId, rental, rentalPrice } = input[rows]

      if (productId) {
        await this.repository.upsave({
          clinicId,
          serviceId,
          productId,
          rental: +rental,
          rentalPrice: priceFormated(`${rentalPrice}`)
        })
      }
    }

    return { data: 'ok' }
  }
}
