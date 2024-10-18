import { chartController } from '@/use-cases/charts/'
import { Router } from 'express'

export const chartsRouter = Router()

chartsRouter.get('/charts', (req, rep) => chartController.handle(req, rep))
