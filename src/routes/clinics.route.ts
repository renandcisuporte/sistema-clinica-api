import { validated } from '@/middleware/validated'
import {
  createClinicSchema,
  deleteOrFirstClinicSchema,
  updateClinicSchema
} from '@/schemas/clinics.schema'
import {
  createClinicsController,
  deleteClinicsController,
  findAllClinicsController,
  findFirstClinicsController,
  updateClinicsController
} from '@/use-cases/clinics'
import { Router } from 'express'

export const clinicsRouter = Router()

clinicsRouter
  .get('/', (req, rep) => findAllClinicsController.handle(req, rep))
  .get('/:id', validated(deleteOrFirstClinicSchema), (req, rep) =>
    findFirstClinicsController.handle(req, rep)
  )
  .post('/', validated(createClinicSchema), (req, rep) =>
    createClinicsController.handle(req, rep)
  )
  .put('/:id', validated(updateClinicSchema), (req, rep) =>
    updateClinicsController.handle(req, rep)
  )
  .delete('/:id', validated(deleteOrFirstClinicSchema), (req, rep) =>
    deleteClinicsController.handle(req, rep)
  )
