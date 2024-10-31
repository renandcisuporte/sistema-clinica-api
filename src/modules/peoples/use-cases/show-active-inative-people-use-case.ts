import { PeopleRepository } from '@/modules/peoples/prisma/repositories/people-repository'

type Output = { data: { active: number; inative: number } }

export class ShowActiveInativePeopleUseCase {
  constructor(private readonly repository: PeopleRepository) {}

  async execute(clinicId: string): Promise<Output> {
    const [active, inative] = await Promise.all([
      this.repository.count({ clinicId, type: 'specialist' }),
      this.repository.count({ clinicId, active: 'user' })
    ])

    return { data: { active, inative } }
  }
}

export interface ShowActiveInativePeopleUseCaseInterface {
  execute(clinicId: string): Promise<Output>
}
