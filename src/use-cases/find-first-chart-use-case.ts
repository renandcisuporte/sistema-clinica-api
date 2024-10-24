import { Chart } from '@/domain/entities/chart'
import { ChartRepository } from '@/domain/inferfaces/repositories/chart-repository'
import { UseCase } from '@/domain/inferfaces/use-cases/use-case'

type Output = { data: Chart[] }
export class FindFirstChartUseCase implements UseCase<string, Output> {
  constructor(protected readonly repository: ChartRepository) {}

  async execute(clinicId: string) {
    const workTimesAll = await this.repository.chart(clinicId)

    return {
      data: workTimesAll
    }
  }
}
