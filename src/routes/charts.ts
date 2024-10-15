import { findChartWorkTimesController } from '@/use-cases/work-times'
import { Router } from 'express'

export const chartsRouter = Router()

chartsRouter.get('/charts', (req, rep) =>
  findChartWorkTimesController.handle(req, rep)
)
