import { PeopleOutput } from '@/domain/entities/people'
import { PeopleRepository } from '@/domain/inferfaces/repositories/people-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Input = Record<string, string | string[] | number | undefined>

type Output = { data: PeopleOutput[]; total: number; page: number }

export class FindAllPeopleUseCase implements UseCase<Input, Output> {
  constructor(protected readonly repository: PeopleRepository) {}

  async execute(input: Input): Promise<Output> {
    const {
      clinicId,
      full_name = '',
      document = '',
      limit = 15,
      page = 1
    } = input

    const [total, data] = await Promise.all([
      this.repository.count({ clinicId, full_name, document }),
      this.repository.findAll({ clinicId, full_name, document, limit, page })
    ])

    return {
      total,
      page: Number(page),
      data
    }
  }
}
