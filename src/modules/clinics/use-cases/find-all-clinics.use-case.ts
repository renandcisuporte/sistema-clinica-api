import { UseCaseInterface } from '@/common/interfaces/use-case.interface'
import { Clinic } from '@prisma/client'
import { ClinicsRepositoryInterface } from '../repositories/clinics-interface.repository'

export interface UseCaseCommon {
  data: Clinic[]
}

export class FindAllClinicsUseCase implements UseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute(params: undefined): Promise<UseCaseCommon> {
    const result = await this.repository.findAll(params)
    return { data: result }
  }
}
