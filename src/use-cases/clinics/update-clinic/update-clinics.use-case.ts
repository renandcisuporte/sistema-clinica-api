import { UpdateUseCaseInterface } from '@/common/use-case.interface'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class UpdateClinicsUseCase implements UpdateUseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(id: string, input: any): Promise<any> {
    const res = await this.repository.update(id, input)
    return { data: { ...res } }
  }
}
