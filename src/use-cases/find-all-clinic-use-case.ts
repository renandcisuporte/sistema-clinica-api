import { ClinicOutput } from '@/domain/entities/clinic'
import { ClinicRepository } from '@/domain/inferfaces/repositories/clinic-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Input = Record<string, string | string[] | number | undefined>

type Output = { data: ClinicOutput[]; total: number }

export class FindAllClinicUseCase implements UseCase<Input, Output> {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(input: Input): Promise<Output> {
    const { userId, clinicId, admin, title, fantasy, cnpj, limit, page } = input
    const { total, data } = await this.repository.findAll({
      userId,
      clinicId,
      admin,
      title,
      fantasy,
      cnpj,
      limit,
      page
    })

    return {
      total,
      data
    }
  }
}
