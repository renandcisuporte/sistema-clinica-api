import { DeleteUseCaseInterface } from '@/common/use-case.interface'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class DeleteClinicsUseCase implements DeleteUseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(id: string): Promise<void> {
    await this.repository.delete(id)
    return
  }
}
