import { ClinicOutput } from '@/domain/entities/clinic'
import { ClinicRepository } from '@/domain/inferfaces/repositories/clinic-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Input = string

type Output = { data: ClinicOutput | null }

export class FindFirstClinicUseCase implements UseCase<Input, Output> {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(id: Input): Promise<Output> {
    const result = await this.repository.findFirst(id)

    return {
      data: result
    }
  }
}
