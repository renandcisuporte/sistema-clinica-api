import { CreateUseCaseInterface } from '@/common/use-case.interface'
import { ClinicInterface } from '@/entities/clinics'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class CreateClinicsUseCase implements CreateUseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(input: ClinicInterface): Promise<{ data: ClinicInterface }> {
    const result = await this.repository.create(input)
    return { data: { ...result } }
  }
}
