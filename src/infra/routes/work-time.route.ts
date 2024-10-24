import prisma from '@/database/prisma'
import { ClinicRepositoryImp } from '@/domain/repositories/clinic-repository'
import { WorkTimeRepositoryImp } from '@/domain/repositories/work-time-repository'
import { FindFirstClinicWorkTimeUseCase } from '@/use-cases/find-first-clinic-work-use-case'
import { UpdateWorkTimeRecommendedUseCase } from '@/use-cases/update-work-time-recommended-use-case'
import { UpdateWorkTimeServiceUseCase } from '@/use-cases/update-work-time-service-use-case'
import { UpdateWorkTimeUseCase } from '@/use-cases/update-work-time-use-case'
import { Router } from 'express'
import { WorkTimeController } from '../http/controllers/work-time-controller'
import { validated } from '../http/middleware/validated'
import { createWokTimeSchema } from '../http/schemas/validations/work-time-schema'

export const workTimeRouter = Router()

const clinic = new ClinicRepositoryImp(prisma)
const workTime = new WorkTimeRepositoryImp(prisma)
const findFirstClinicWorkTimeUseCase = new FindFirstClinicWorkTimeUseCase(
  clinic,
  workTime
)
const updateWorkTimeUseCase = new UpdateWorkTimeUseCase(workTime)
const updateWorkTimeRecommendedUseCase = new UpdateWorkTimeRecommendedUseCase(
  workTime
)

const updateWorkTimeServiceUseCase = new UpdateWorkTimeServiceUseCase(workTime)

const workTimeController = new WorkTimeController(
  findFirstClinicWorkTimeUseCase,
  updateWorkTimeUseCase,
  updateWorkTimeRecommendedUseCase,
  updateWorkTimeServiceUseCase
)

workTimeRouter.get('/:id/works', async (req, res) =>
  workTimeController.workTime(req, res)
)

workTimeRouter.put(
  '/:id/works',
  validated(createWokTimeSchema),
  async (req, res) => await workTimeController.updateWorkTime(req, res)
)

workTimeRouter.put(
  '/:id/works-recommended',
  validated(createWokTimeSchema),
  async (req, res) =>
    await workTimeController.updateWorkTimeRecommended(req, res)
)

workTimeRouter.put(
  '/:id/works-service',
  validated(createWokTimeSchema),
  async (req, res) => await workTimeController.updateWorkTimeService(req, res)
)
