import { UseCaseInterface } from '@/common/interfaces/use-case.interface'
import { Clinic } from '@prisma/client'
import { ClinicsRepositoryInterface } from '../repositories/clinics-interface.repository'

export interface UseCaseCommon {
  data: Clinic | null
}

export class FindFirstClinicsUseCase implements UseCaseInterface {
  constructor(protected readonly repository: ClinicsRepositoryInterface) {}

  async execute({ ...args }): Promise<UseCaseCommon> {
    const result = await this.repository.findFirst(args.code)
    return { data: result }
  }
}
