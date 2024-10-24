import prisma from '@/database/prisma'
import { ChartRepositoryImp } from '@/domain/repositories/chart-repository'
import { FindFirstChartUseCase } from '@/use-cases/find-first-chart-use-case'
import { Router } from 'express'

export const chartRouter = Router()

const chartRepository = new ChartRepositoryImp(prisma)
const findFirstChartUseCase = new FindFirstChartUseCase(chartRepository)

chartRouter.get('/charts', async (req, res) => {
  const { clinicId } = req
  const result = await findFirstChartUseCase.execute(clinicId)
  return res.status(200).json(result)
})
