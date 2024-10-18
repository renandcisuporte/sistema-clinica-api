import prisma from '@/database/prisma'
import { ClinicsRepository } from '@/repositories/implementation/clinics.repository'
import { WorkTimesRepository } from '@/repositories/implementation/work-times.repository'

import { ChartRepository } from '@/repositories/implementation/chart.repository'
import { WorkTimesRecommendedRepository } from '@/repositories/implementation/work-times-recommended.repository'
import { UpdateWorkTimesController } from '@/use-cases/work-times/update-work-times/update-work-times.controller'
import { UpdateWorkTimesUseCase } from '@/use-cases/work-times/update-work-times/update-work-times.use-case'
import { FindFirstWorkTimesController } from './find-first-work-times/find-first-work-times.controller'
import { FindFirstWorkTimesUseCase } from './find-first-work-times/find-first-work-times.use-case'

const clinicsRepository = new ClinicsRepository(prisma)
const workTimesRepository = new WorkTimesRepository(prisma)
const chartRepository = new ChartRepository(prisma)
const workTimesRecommendedRepository = new WorkTimesRecommendedRepository(
  prisma
)

const updateWorkTimesController = new UpdateWorkTimesController(
  new UpdateWorkTimesUseCase(workTimesRepository)
)

const findFirstWorkTimesController = new FindFirstWorkTimesController(
  new FindFirstWorkTimesUseCase(
    clinicsRepository,
    workTimesRepository,
    workTimesRecommendedRepository
  )
)

export { findFirstWorkTimesController, updateWorkTimesController }
