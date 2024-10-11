import { ClinicInterface } from '@/entities/clinics'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class FindFirstClinicsUseCase {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(args: any): Promise<{ data: ClinicInterface | null }> {
    const { id, userId } = args
    const result = await this.repository.first({ id, userId })
    return {
      data: result
    }
  }
}
