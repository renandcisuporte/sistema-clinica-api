import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class FindFirstClinicsUseCase {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(id: string) {
    const result = await this.repository.first(id)
    return {
      data: result
    }
  }
}
