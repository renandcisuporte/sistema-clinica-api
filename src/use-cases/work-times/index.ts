import prisma from '@/database/prisma'
import { WrokTimesRepository } from '@/repositories/implementation/wokr-times.repository'
import { CreateWorkTimesController } from './create-work-times/create-work-times.controller'
import { CreateWorkTimesUseCase } from './create-work-times/create-work-times.use-case'

const workTimesRepository = new WrokTimesRepository(prisma)

const createWorkTimesController = new CreateWorkTimesController(
  new CreateWorkTimesUseCase(workTimesRepository)
)

export { createWorkTimesController }
