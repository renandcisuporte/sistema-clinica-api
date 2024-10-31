import { FindFirstChartUseCaseIterface } from '@/modules/chart/use-cases/find-first-chart-use-case'
import { Request, Response } from 'express'

export class ChartController {
  constructor(private readonly chartUseCase: FindFirstChartUseCaseIterface) {}

  async handle(req: Request, res: Response) {
    const { clinicId } = req
    const result = await this.chartUseCase.execute(clinicId)
    return res.status(200).json(result)
  }
}
