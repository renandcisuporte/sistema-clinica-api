import { ClinicInput, ClinicOutput } from '@/domain/entities/clinic'
import { ClinicRepository } from '@/domain/inferfaces/repositories/clinic-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'
import { codeClinicId } from '@/shared/utils'

type Output = { data: ClinicOutput }

export class CreateClinicUseCase implements UseCase<ClinicInput, Output> {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(input: ClinicInput) {
    const code = codeClinicId()
    const { clinicId, ...rest } = input

    const result = await this.repository.create({ clinicId: code, ...rest })

    return { data: { ...result } }
  }
}
