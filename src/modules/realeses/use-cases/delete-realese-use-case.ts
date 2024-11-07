import { RealeseRepository } from '@/modules/realeses/prisma/repositories/realese-repository'

export class DeleteRealeseUseCase implements DeleteRealeseUseCaseInterface {
  constructor(protected readonly repository: RealeseRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export interface DeleteRealeseUseCaseInterface {
  execute(id: string): Promise<void>
}
