import { ClinicOutput } from '@/modules/clinics/prisma/entities/clinic'
import { ClinicRepository } from '@/modules/clinics/prisma/repositories/clinic-repository'

type Input = Record<string, string | string[] | number | undefined>
type Output = { data: ClinicOutput[]; total: number }

export class FindAllClinicUseCase implements FindAllClinicUseCaseInterface {
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

export interface FindAllClinicUseCaseInterface {
  execute(input: Input): Promise<Output>
}
