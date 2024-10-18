import { WorkTimesRepositoryInterface } from '@/repositories/work-times.inteface'

export class UpdateWorkTimesRecommendedUseCase {
  constructor(protected readonly repository: WorkTimesRepositoryInterface) {}

  async execute(clinicId: string, input: any) {
    await this.repository.delete(clinicId)

    for (const key in input) {
      for (const item in input[key]) {
        const { week, times, open } = input[key][item]

        await this.repository.create({
          clinicId,
          week,
          open: open !== undefined,
          times: JSON.stringify(times)
        })
      }
    }

    return {
      data: {
        message: 'OK'
      }
    }
  }
}
