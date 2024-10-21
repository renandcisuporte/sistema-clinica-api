import { AppError } from '@/common/app.error'
import { ClinicOutput } from '@/entities/clinics'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class FindFirstClinicsUseCase {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(args: any): Promise<{ data: ClinicOutput | null }> {
    const { id, clinicId } = args
    if (id !== clinicId) throw new AppError('Clinica inválida.')

    const result = await this.repository.first({ id })
    return {
      data: result
    }
  }
}
