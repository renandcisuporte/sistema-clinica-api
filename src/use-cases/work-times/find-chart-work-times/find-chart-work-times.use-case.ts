import { ChartsInterface } from '@/entities/charts'
import { WorkTimesRepositoryInterface } from '@/repositories/work-times.inteface'

export class FindChartWorkTimesUseCase {
  constructor(protected readonly repository: WorkTimesRepositoryInterface) {}

  async execute(userId: string): Promise<{ data: ChartsInterface[] }> {
    const workTimesAll = await this.repository.chart(userId)

    return {
      data: workTimesAll
    }
  }
}
