import {
  ClinicInput,
  ClinicOutput
} from '@/modules/clinics/prisma/entities/clinic'
import { ClinicRepository } from '@/modules/clinics/prisma/repositories/clinic-repository'
import { codeClinicId } from '@/shared/utils'

type Output = { data: ClinicOutput }

export class CreateClinicUseCase implements CreateClinicUseCaseInterface {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(input: ClinicInput) {
    const code = codeClinicId()
    const { clinicId, ...rest } = input

    const result = await this.repository.create({ clinicId: code, ...rest })

    return { data: { ...result } }
  }
}

export interface CreateClinicUseCaseInterface {
  execute(input: ClinicInput): Promise<Output>
}
