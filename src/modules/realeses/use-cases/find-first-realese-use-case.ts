import { RealeseOutput } from '@/modules/realeses/prisma/entities/realese'
import { RealeseRepository } from '@/modules/realeses/prisma/repositories/realese-repository'

type Output = {
  data: RealeseOutput | null
}

export class FindFirstRealeseUseCase
  implements FindFirstRealeseUseCaseInterface
{
  constructor(protected readonly repository: RealeseRepository) {}

  async execute(id: string): Promise<Output> {
    const result = await this.repository.first(id)
    return {
      data: result
    }
  }
}

export interface FindFirstRealeseUseCaseInterface {
  execute(id: string): Promise<Output>
}
