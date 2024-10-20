import { DeleteUseCaseInterface } from '@/common/use-case.interface'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class DeleteClinicsUseCase implements DeleteUseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(args: any): Promise<void> {
    const { id, userId } = args
    await this.repository.delete({ id, userId })
    return
  }
}
