import { PeopleRepository } from '@/domain/inferfaces/repositories/people-repository'

export class ShowActiveInativePeopleUseCase {
  constructor(private readonly repository: PeopleRepository) {}

  async execute(clinicId: string): Promise<unknown> {
    const [active, inative] = await Promise.all([
      this.repository.count({ clinicId, type: 'specialist' }),
      this.repository.count({ clinicId, active: 'user' })
    ])

    return { data: { active, inative } }
  }
}
