import {
  ServiceInput,
  ServiceOutput
} from '@/modules/services/prisma/entities/service'

export interface ServicesRepository {
  count(...args: any): Promise<number>
  all(...args: any): Promise<ServiceOutput[]>
  first(id: string): Promise<ServiceOutput | null>
  create(input: ServiceInput): Promise<ServiceOutput>
  update(id: string, input: ServiceInput): Promise<ServiceOutput>
  delete(id: string): Promise<void>
}
