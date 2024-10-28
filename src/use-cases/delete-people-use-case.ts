import { PeopleRepository } from '@/domain/inferfaces/repositories/people-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

export class DeletePeopleUseCase implements UseCase<string, void> {
  constructor(protected readonly repository: PeopleRepository) {}

  async execute(id: string) {
    await this.repository.delete(id)
  }
}
