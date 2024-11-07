import {
  RealeseInput,
  RealeseOutput
} from '@/modules/realeses/prisma/entities/realese'
import { RealeseRepository } from '@/modules/realeses/prisma/repositories/realese-repository'

export class UpdateRealeseUseCase implements UpdateRealeseUseCaseInterface {
  constructor(protected readonly repository: RealeseRepository) {}

  async execute(
    id: string,
    input: RealeseInput
  ): Promise<{ data: RealeseOutput }> {
    const result = await this.repository.update(id, input)

    return { data: result }
  }
}

export interface UpdateRealeseUseCaseInterface {
  execute(id: string, input: RealeseInput): Promise<{ data: RealeseOutput }>
}
