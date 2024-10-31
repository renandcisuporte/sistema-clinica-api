import { ClinicOutput } from '@/modules/clinics/prisma/entities/clinic'
import { ClinicRepository } from '@/modules/clinics/prisma/repositories/clinic-repository'

type Input = string
type Output = { data: ClinicOutput | null }

export class FindFirstClinicUseCase implements FindFirstClinicUseCaseInterface {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(id: Input): Promise<Output> {
    const result = await this.repository.findFirst(id)

    return {
      data: result
    }
  }
}

export interface FindFirstClinicUseCaseInterface {
  execute(id: Input): Promise<Output>
}
