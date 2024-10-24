import { ClinicInput, ClinicOutput } from '@/domain/entities/clinic'
import { ClinicRepository } from '@/domain/inferfaces/repositories/clinic-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Input = { id: string; input: ClinicInput }
type Output = { data: ClinicOutput }

export class UpdateClinicUseCase implements UseCase<Input, Output> {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(data: Input) {
    const { id, input } = data
    const result = await this.repository.update(id, input)

    return { data: { ...result } }
  }
}
