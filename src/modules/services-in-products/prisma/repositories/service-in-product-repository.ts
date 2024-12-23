import {
  ServiceInProductInput,
  ServiceInProductOutput
} from '@/modules/services-in-products/prisma/entities/service-in-product'

export interface ServiceInProductsRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<ServiceInProductOutput[]>
  allService(clinicId: string, serviceId: string): Promise<any[] | null>
  first(id: string): Promise<ServiceInProductOutput | null>
  upsave(input: ServiceInProductInput): Promise<void>
  create(input: ServiceInProductInput): Promise<ServiceInProductOutput>
  update(
    id: string,
    input: ServiceInProductInput
  ): Promise<ServiceInProductOutput>
  delete(id: string): Promise<void>
}
