import { validate } from '@/middleware/validations'
import {
  createClinicSchema,
  deleteOrFirstClinicSchema,
  updateClinicSchema
} from '@/schemas/clinics.schema'
import {
  createClinicsController,
  findAllClinicsController,
  findFirstClinicsController,
  updateClinicsController
} from '@/use-cases/clinics'
import { Router } from 'express'

export const clinicsRouter = Router()

clinicsRouter
  .get('/', (req, rep) => findAllClinicsController.handle(req, rep))
  .get('/:id', validate(deleteOrFirstClinicSchema), (req, rep) =>
    findFirstClinicsController.handle(req, rep)
  )
  .post('/', validate(createClinicSchema), (req, rep) =>
    createClinicsController.handle(req, rep)
  )
  .put('/:id', validate(updateClinicSchema), (req, rep) =>
    updateClinicsController.handle(req, rep)
  )
  .delete('/:id', validate(deleteOrFirstClinicSchema), (req, rep) =>
    updateClinicsController.handle(req, rep)
  )
