import prisma from '@/database/prisma'
import { ClinicRepositoryImp } from '@/domain/repositories/clinic-repository'
import { WorkTimeRepositoryImp } from '@/domain/repositories/work-time-repository'
import { FindFirstClinicWorkTimeUseCase } from '@/use-cases/find-first-clinic-work-use-case'
import { UpdateWorkTimeRecommendedUseCase } from '@/use-cases/update-work-time-recommended-use-case'
import { UpdateWorkTimeServiceUseCase } from '@/use-cases/update-work-time-service-use-case'
import { UpdateWorkTimeUseCase } from '@/use-cases/update-work-time-use-case'
import { Router } from 'express'
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

workTimeRouter.get('/:id/works', async (req, res) => {
  const { id } = req.params
  const result = await findFirstClinicWorkTimeUseCase.execute(id)
  return res.status(200).json(result)
})

workTimeRouter.put(
  '/:id/works',
  validated(createWokTimeSchema),
  async (req, res) => {
    const { id } = req.params
    const { body } = req
    const result = await updateWorkTimeUseCase.execute({
      clinicId: id,
      input: body
    })
    return res.status(200).json(result)
  }
)

workTimeRouter.put(
  '/:id/works-recommended',
  validated(createWokTimeSchema),
  async (req, res) => {
    const { id } = req.params
    const { body } = req
    const result = await updateWorkTimeRecommendedUseCase.execute({
      clinicId: id,
      input: body
    })
    return res.status(200).json(result)
  }
)

workTimeRouter.put(
  '/:id/works-service',
  validated(createWokTimeSchema),
  async (req, res) => {
    const { id } = req.params
    const { body } = req
    const result = await updateWorkTimeServiceUseCase.execute({
      clinicId: id,
      input: body
    })
    return res.status(200).json(result)
  }
)
