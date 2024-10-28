import { PeopleInput, PeopleOutput } from '@/domain/entities/people'
import { PeopleRepository } from '@/domain/inferfaces/repositories/people-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Input = { id: string; input: PeopleInput }
type Output = { data: PeopleOutput }

export class UpdatePeopleUseCase implements UseCase<Input, Output> {
  constructor(protected readonly repository: PeopleRepository) {}

  async execute(data: Input) {
    const { id, input } = data
    const result = await this.repository.update(id, input)

    return { data: { ...result } }
  }
}
