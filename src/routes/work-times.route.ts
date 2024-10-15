import {
  findFirstWorkTimesController,
  updateWorkTimesController
} from '@/use-cases/work-times'
import { Router } from 'express'

export const workTimesRouter = Router()

workTimesRouter
  .get('/:id/works', (req, rep) =>
    findFirstWorkTimesController.handle(req, rep)
  )
  .put('/:id/works', (req, rep) => updateWorkTimesController.handle(req, rep))
