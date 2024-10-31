import {
  PeopleInput,
  PeopleOutput
} from '@/modules/peoples/prisma/entities/people'
import { PeopleRepository } from '@/modules/peoples/prisma/repositories/people-repository'

type Input = { id: string; input: PeopleInput }
type Output = { data: PeopleOutput }

export class UpdatePeopleUseCase implements UpdatePeopleUseCaseInterface {
  constructor(protected readonly repository: PeopleRepository) {}

  async execute(data: Input) {
    const { id, input } = data
    const result = await this.repository.update(id, input)

    return { data: { ...result } }
  }
}

export interface UpdatePeopleUseCaseInterface {
  execute(input: Input): Promise<Output>
}
