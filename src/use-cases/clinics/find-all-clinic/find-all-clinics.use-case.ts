import { ClinicInterface } from '@/entities/clinics'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class FindAllClinicsUseCase {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(...args: any): Promise<{ data: ClinicInterface[] }> {
    const result = await this.repository.all()
    return {
      data: result
    }
  }
}
