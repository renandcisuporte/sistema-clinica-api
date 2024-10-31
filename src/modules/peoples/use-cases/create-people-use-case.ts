import {
  PeopleInput,
  PeopleOutput
} from '@/modules/peoples/prisma/entities/people'
import { PeopleRepository } from '@/modules/peoples/prisma/repositories/people-repository'

type Output = { data: PeopleOutput }

export class CreatePeopleUseCase implements CreatePeopleUseCaseInterface {
  constructor(protected readonly repository: PeopleRepository) {}

  async execute(input: PeopleInput) {
    const result = await this.repository.create(input)
    return { data: { ...result } }
  }
}

export interface CreatePeopleUseCaseInterface {
  execute(input: PeopleInput): Promise<Output>
}
