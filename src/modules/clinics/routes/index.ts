import prisma from '@/database/prisma'
import { validate } from '@/middleware/validations'
import { FindAllClinicController } from '@/modules/clinics/controllers/find-all-clinic.controller'
import { FindFirstClinicController } from '@/modules/clinics/controllers/find-first-clinic.controller'
import { ClinicRepository } from '@/modules/clinics/repositories/prisma/clinic-prisma'
import { schemaClinic } from '@/modules/clinics/schemas'
import { FindAllClinicUseCase } from '@/modules/clinics/use-cases/find-all-clinic.use-case'
import { FindFirstClinicUseCase } from '@/modules/clinics/use-cases/find-first-clinic.use-case'
import { Router } from 'express'
import { UpdateClinicController } from '../controllers/update-clinic.controller'
import { UpdateClinicUseCase } from '../use-cases/update-clinic.use-case'

const router = Router()

const repository = new ClinicRepository(prisma)
const findAll = new FindAllClinicController(
  new FindAllClinicUseCase(repository)
)
const findFirst = new FindFirstClinicController(
  new FindFirstClinicUseCase(repository)
)

const update = new UpdateClinicController(new UpdateClinicUseCase(repository))

router
  .get('/', (req, rep) => findAll.handle(req, rep))
  .get('/:id', validate(schemaClinic), (req, rep) => findFirst.handle(req, rep))
  .put('/:id', validate(schemaClinic), (req, rep) => update.handle(req, rep))

export { router as routerClinic }
