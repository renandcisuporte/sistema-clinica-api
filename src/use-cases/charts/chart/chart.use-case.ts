import { ChartsInterface } from '@/entities/charts'
import { ChartRepositoryInterface } from '@/repositories/char.interface'

export class ChartUseCase {
  constructor(protected readonly repository: ChartRepositoryInterface) {}

  async execute(userId: string): Promise<{ data: ChartsInterface[] }> {
    const workTimesAll = await this.repository.chart(userId)

    return {
      data: workTimesAll
    }
  }
}
