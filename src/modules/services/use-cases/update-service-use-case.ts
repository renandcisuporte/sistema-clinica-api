import {
  ServiceInput,
  ServiceOutput
} from '@/modules/services/prisma/entities/service'
import { ServicesRepository } from '@/modules/services/prisma/repositories/service-repository'

export class UpdateServiceUseCase implements UpdateServiceUseCaseInterface {
  constructor(protected readonly repository: ServicesRepository) {}

  async execute(
    id: string,
    input: ServiceInput
  ): Promise<{ data: ServiceOutput }> {
    const result = await this.repository.update(id, input)

    return { data: result }
  }
}

export interface UpdateServiceUseCaseInterface {
  execute(id: string, input: ServiceInput): Promise<{ data: ServiceOutput }>
}
