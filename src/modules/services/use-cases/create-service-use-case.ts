import {
  ServiceInput,
  ServiceOutput
} from '@/modules/services/prisma/entities/service'
import { ServicesRepository } from '@/modules/services/prisma/repositories/service-repository'

export class CreateServiceUseCase implements CreateServiceUseCaseInterface {
  constructor(protected readonly repository: ServicesRepository) {}

  async execute(input: ServiceInput): Promise<{ data: ServiceOutput }> {
    const result = await this.repository.create(input)

    return { data: result }
  }
}

export interface CreateServiceUseCaseInterface {
  execute(input: ServiceInput): Promise<{ data: ServiceOutput }>
}
