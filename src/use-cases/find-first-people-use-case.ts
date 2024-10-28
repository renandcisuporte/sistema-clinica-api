import { PeopleOutput } from '@/domain/entities/people'
import { PeopleRepository } from '@/domain/inferfaces/repositories/people-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Input = string
type Output = { data: PeopleOutput | null }

export class FindFirstPeopleUseCase implements UseCase<Input, Output> {
  constructor(protected readonly repository: PeopleRepository) {}

  async execute(id: Input): Promise<Output> {
    const result = await this.repository.findFirst(id)

    return {
      data: result
    }
  }
}
