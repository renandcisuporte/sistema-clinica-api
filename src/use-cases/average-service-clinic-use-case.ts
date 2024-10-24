import { ClinicRepository } from '@/domain/inferfaces/repositories/clinic-repository'

export class AverageServiceClinicUseCase {
  constructor(private readonly repository: ClinicRepository) {}

  async execute(id: string, time: string): Promise<{ data: string }> {
    const result = await this.repository.averageService(id, time)
    return { data: result }
  }
}
