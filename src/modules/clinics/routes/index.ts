import prisma from '@/db/prisma'
import { ClinicsRepository } from '../repositories/prisma/clinics-prisma'
import { FindAllClinicsUseCase } from '../use-cases/find-all-clinics.use-case'
import { FindAllClinicsController } from '../use-cases/find-all-clinics.controller'
import { FindFirstClinicsUseCase } from '../use-cases/find-first-clinics.use-case'
import { FindFirstClinicsController } from '../use-cases/find-firts-clinics.controller'
import { Router } from 'express'

const router = Router()

const clinicsRepository = new ClinicsRepository(prisma)

const findAllClinicsUseCase = new FindAllClinicsUseCase(clinicsRepository)
const findAllClinicsController = new FindAllClinicsController(
  findAllClinicsUseCase
)

const findFirstClinicsUseCase = new FindFirstClinicsUseCase(clinicsRepository)
const findFirstClinicsController = new FindFirstClinicsController(
  findFirstClinicsUseCase
)

router
  .get('/', (request, response) =>
    findAllClinicsController.handle(request, response)
  )
  .get('/:code', (request, response) =>
    findFirstClinicsController.handle(request, response)
  )

export { router as routerClinics }
