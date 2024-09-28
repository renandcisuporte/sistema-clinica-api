import prisma from '@/database/prisma'
import { validate } from '@/middleware/validations'
import { FindAllClinicController } from '@/modules/clinics/controllers/find-all-clinic.controller'
import { FindFirstClinicController } from '@/modules/clinics/controllers/find-first-clinic.controller'
import { UpdateClinicController } from '@/modules/clinics/controllers/update-clinic.controller'
import { ClinicRepository } from '@/modules/clinics/repositories/prisma/clinic-repository.prisma'
import { schemaClinic } from '@/modules/clinics/schemas'
import { FindAllClinicUseCase } from '@/modules/clinics/use-cases/find-all-clinic.use-case'
import { FindFirstClinicUseCase } from '@/modules/clinics/use-cases/find-first-clinic.use-case'
import { UpdateClinicUseCase } from '@/modules/clinics/use-cases/update-clinic.use-case'
import { Router } from 'express'

const router = Router()

const clinicRepository = new ClinicRepository(prisma)

const findAll = new FindAllClinicController(
  new FindAllClinicUseCase(clinicRepository)
)

const findFirst = new FindFirstClinicController(
  new FindFirstClinicUseCase(clinicRepository)
)

const update = new UpdateClinicController(
  new UpdateClinicUseCase(clinicRepository)
)

router
  .get('/', (req, rep) => findAll.handle(req, rep))
  .get('/:id', validate(schemaClinic), (req, rep) => findFirst.handle(req, rep))
  .put('/:id', validate(schemaClinic), (req, rep) => update.handle(req, rep))

export { router as routerClinic }
