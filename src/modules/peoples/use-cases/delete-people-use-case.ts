import { PeopleRepository } from '@/modules/peoples/prisma/repositories/people-repository'

export class DeletePeopleUseCase implements DeletePeopleUseCaseInterface {
  constructor(protected readonly repository: PeopleRepository) {}

  async execute(id: string) {
    await this.repository.delete(id)
  }
}

export interface DeletePeopleUseCaseInterface {
  execute(id: string): Promise<void>
}
