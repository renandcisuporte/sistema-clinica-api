import { ClinicRepository } from '@/modules/clinics/prisma/repositories/clinic-repository'

export class AverageServiceClinicUseCase {
  constructor(private readonly repository: ClinicRepository) {}

  async execute(id: string, time: string): Promise<Output> {
    const result = await this.repository.averageService(id, time)
    return { data: result }
  }
}

type Output = { data: string }
export interface AverageServiceClinicUseCaseInterface {
  execute(id: string, time: string): Promise<Output>
}
