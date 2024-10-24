import { ClinicRepository } from '@/domain/inferfaces/repositories/clinic-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Output = void

export class DeleteClinicUseCase implements UseCase<string, Output> {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(id: string) {
    await this.repository.delete(id)
  }
}
