import { ClinicRepositoryImp } from '@/modules/clinics/prisma/repositories/implementation/clinic-repository'
import { FindFirstClinicWorkTimeUseCase } from '@/modules/clinics/use-cases/find-first-clinic-work-use-case'
import { WorkTimeController } from '@/modules/work-times/controllers/work-time-controller'
import { WorkTimeRepositoryImp } from '@/modules/work-times/prisma/repositories/implementation/work-time-repository'
import { UpdateWorkTimeRecommendedUseCase } from '@/modules/work-times/use-cases/update-work-time-recommended-use-case'
import { UpdateWorkTimeServiceUseCase } from '@/modules/work-times/use-cases/update-work-time-service-use-case'
import { UpdateWorkTimeUseCase } from '@/modules/work-times/use-cases/update-work-time-use-case'
import { validated } from '@/shared/http/middlewares/validated'
import { createWokTimeSchema } from '@/shared/http/routes/schemas/validations/work-time-schema'
import prisma from '@/shared/prisma'
import { Router } from 'express'

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
