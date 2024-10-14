import { WorkTimesRepositoryInterface } from '@/repositories/work-times.inteface'

export class CreateWorkTimesUseCase {
  constructor(protected readonly repository: WorkTimesRepositoryInterface) {}

  async execute(input: any) {
    const { checked, clinicId, id, time, week } = input
    return await this.repository.create({ checked, clinicId, id, time, week })
  }
}
