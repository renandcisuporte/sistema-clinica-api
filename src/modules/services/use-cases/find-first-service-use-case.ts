import { ServiceOutput } from '@/modules/services/prisma/entities/service'
import { ServicesRepository } from '@/modules/services/prisma/repositories/service-repository'

type Output = {
  data: ServiceOutput | null
}

export class FindFirstServiceUseCase
  implements FindFirstServiceUseCaseInterface
{
  constructor(protected readonly repository: ServicesRepository) {}

  async execute(id: string): Promise<Output> {
    const result = await this.repository.first(id)
    return {
      data: result
    }
  }
}

export interface FindFirstServiceUseCaseInterface {
  execute(id: string): Promise<Output>
}
