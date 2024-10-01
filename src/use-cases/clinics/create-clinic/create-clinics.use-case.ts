import { CreateUseCaseInterface } from '@/common/use-case.interface'
import { ClinicsRepositoryInterface } from '@/repositories/clinics.interface'

export class CreateClinicsUseCase implements CreateUseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(input: any): Promise<any> {
    const res = await this.repository.create(input)
    console.log('res', res)
    return { data: { ...res } }
  }
}
