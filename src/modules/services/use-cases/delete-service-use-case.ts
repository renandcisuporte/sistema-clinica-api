import { ServicesRepository } from '@/modules/services/prisma/repositories/service-repository'

export class DeleteServiceUseCase implements DeleteServiceUseCaseInterface {
  constructor(protected readonly repository: ServicesRepository) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
  }
}

export interface DeleteServiceUseCaseInterface {
  execute(id: string): Promise<void>
}
