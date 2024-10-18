import {
  findFirstWorkTimesController,
  updateWorkTimesController
} from '@/use-cases/work-times'
import {
  findFirstWorkTimesRecommendedController,
  updateWorkTimesRecommendedController
} from '@/use-cases/work-times-recommended'
import { Router } from 'express'

export const workTimesRouter = Router()

workTimesRouter
  .get('/:id/works', (req, rep) =>
    findFirstWorkTimesController.handle(req, rep)
  )
  .put('/:id/works', (req, rep) => updateWorkTimesController.handle(req, rep))
  .get('/:id/works-recommended', (req, rep) =>
    findFirstWorkTimesRecommendedController.handle(req, rep)
  )
  .put('/:id/works-recommended', (req, rep) =>
    updateWorkTimesRecommendedController.handle(req, rep)
  )
