import prisma from '@/database/prisma'
import { ClinicsRepository } from '@/repositories/implementation/clinics.repository'

import { WorkTimesRecommendedRepository } from '@/repositories/implementation/work-times-recommended.repository'
import { FindFirstWorkTimesRecommendController } from './find-first-work-times-recommended/find-first-work-times-recommended.controller'
import { FindFirstWorkTimesRecommendedUseCase } from './find-first-work-times-recommended/find-first-work-times-recommended.use-case'
import { UpdateWorkTimesRecommendedController } from './update-work-times-recommended/update-work-times-recommended.controller'
import { UpdateWorkTimesRecommendedUseCase } from './update-work-times-recommended/update-work-times-recommended.use-case'

const clinicsRepository = new ClinicsRepository(prisma)
const workTimesRecommendedRepository = new WorkTimesRecommendedRepository(
  prisma
)

const updateWorkTimesRecommendedController =
  new UpdateWorkTimesRecommendedController(
    new UpdateWorkTimesRecommendedUseCase(workTimesRecommendedRepository)
  )

const findFirstWorkTimesRecommendedController =
  new FindFirstWorkTimesRecommendController(
    new FindFirstWorkTimesRecommendedUseCase(
      clinicsRepository,
      workTimesRecommendedRepository
    )
  )

export {
  findFirstWorkTimesRecommendedController,
  updateWorkTimesRecommendedController
}
