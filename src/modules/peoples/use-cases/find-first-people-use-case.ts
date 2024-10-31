import { PeopleOutput } from '@/modules/peoples/prisma/entities/people'
import { PeopleRepository } from '@/modules/peoples/prisma/repositories/people-repository'

type Input = string
type Output = { data: PeopleOutput | null }

export class FindFirstPeopleUseCase implements FindFirstPeopleUseCaseInterface {
  constructor(protected readonly repository: PeopleRepository) {}

  async execute(id: Input): Promise<Output> {
    const result = await this.repository.findFirst(id)

    return {
      data: result
    }
  }
}

export interface FindFirstPeopleUseCaseInterface {
  execute(id: Input): Promise<Output>
}
