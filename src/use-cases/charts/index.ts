import prisma from '@/database/prisma'
import { ChartRepository } from '@/repositories/implementation/chart.repository'
import { ChartController } from './chart/chart.controller'
import { ChartUseCase } from './chart/chart.use-case'

const chartRepository = new ChartRepository(prisma)
const chartController = new ChartController(new ChartUseCase(chartRepository))

export { chartController }
