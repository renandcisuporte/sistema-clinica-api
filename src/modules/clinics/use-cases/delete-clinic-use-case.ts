import { ClinicRepository } from '@/modules/clinics/prisma/repositories/clinic-repository'

type Output = void

export class DeleteClinicUseCase implements DeleteClinicUseCaseInterface {
  constructor(protected readonly repository: ClinicRepository) {}

  async execute(id: string) {
    await this.repository.delete(id)
  }
}

export interface DeleteClinicUseCaseInterface {
  execute(id: string): Promise<Output>
}
