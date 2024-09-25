import prisma from '@/database/prisma'
import { Router } from 'express'
import { ClinicsRepository } from '../repositories/prisma/clinics-prisma'
import { FindAllClinicsController } from '../use-cases/find-all-clinics.controller'
import { FindAllClinicsUseCase } from '../use-cases/find-all-clinics.use-case'
import { FindFirstClinicsUseCase } from '../use-cases/find-first-clinics.use-case'
import { FindFirstClinicsController } from '../use-cases/find-firts-clinics.controller'

const routerClinics = Router()

const clinicsRepository = new ClinicsRepository(prisma)
const findAllClinicsController = new FindAllClinicsController(
  new FindAllClinicsUseCase(clinicsRepository)
)

const findFirstClinicsController = new FindFirstClinicsController(
  new FindFirstClinicsUseCase(clinicsRepository)
)

routerClinics
  .get('/', (req, rep) => findAllClinicsController.handle(req, rep))
  .get('/:code', (req, rep) => findFirstClinicsController.handle(req, rep))

export { routerClinics }
