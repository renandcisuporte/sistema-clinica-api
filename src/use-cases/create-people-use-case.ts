import { PeopleInput, PeopleOutput } from '@/domain/entities/people'
import { PeopleRepository } from '@/domain/inferfaces/repositories/people-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Output = { data: PeopleOutput }

export class CreatePeopleUseCase implements UseCase<PeopleInput, Output> {
  constructor(protected readonly repository: PeopleRepository) {}

  async execute(input: PeopleInput) {
    const result = await this.repository.create(input)
    return { data: { ...result } }
  }
}
