import { AppError } from '@/common/app.error'
import { DeleteUseCaseInterface } from '@/common/use-case.interface'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class DeleteClinicsUseCase implements DeleteUseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(args: any): Promise<void> {
    const { id, clinicId } = args
    if (id !== clinicId) throw new AppError('Clinica inválida.')

    await this.repository.delete({ id })
    return
  }
}
