import prisma from '@/database/prisma'
import { ChartRepositoryImp } from '@/domain/repositories/chart-repository'
import { FindFirstChartUseCase } from '@/use-cases/find-first-chart-use-case'
import { Router } from 'express'
import { ChartController } from '../http/controllers/chart-controller'

export const chartRouter = Router()

const chartRepository = new ChartRepositoryImp(prisma)
const findFirstChartUseCase = new FindFirstChartUseCase(chartRepository)

const chartController = new ChartController(findFirstChartUseCase)

chartRouter.get(
  '/charts',
  async (req, res) => await chartController.handle(req, res)
)
