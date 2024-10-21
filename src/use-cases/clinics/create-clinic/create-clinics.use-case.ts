import { CreateUseCaseInterface } from '@/common/use-case.interface'
import { ClinicInput, ClinicOutput } from '@/entities/clinics'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class CreateClinicsUseCase implements CreateUseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(input: ClinicInput): Promise<{ data: ClinicOutput }> {
    const result = await this.repository.create(input)
    return { data: { ...result } }
  }
}
