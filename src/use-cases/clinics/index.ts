import prisma from '@/database/prisma'
import { ClinicsRepository } from '@/repositories/implements/clinics.repository'
import { CreateClinicsController } from './create-clinic/create-clinics.controller'
import { CreateClinicsUseCase } from './create-clinic/create-clinics.use-case'
import { DeleteClinicsController } from './delete-clinic/delete-clinics.controller'
import { DeleteClinicsUseCase } from './delete-clinic/delete-clinics.use-case'
import { FindAllClinicsController } from './find-all-clinic/find-all-clinics.controller'
import { FindAllClinicsUseCase } from './find-all-clinic/find-all-clinics.use-case'
import { FindFirstClinicsController } from './find-first-clinic/find-first-clinics.controller'
import { FindFirstClinicsUseCase } from './find-first-clinic/find-first-clinics.use-case'
import { UpdateClinicsController } from './update-clinic/update-clinics.controller'
import { UpdateClinicsUseCase } from './update-clinic/update-clinics.use-case'

const clinicsRepository = new ClinicsRepository(prisma)

// all clinics
const findAllClinicsController = new FindAllClinicsController(
  new FindAllClinicsUseCase(clinicsRepository)
)

// first clinics
const findFirstClinicsController = new FindFirstClinicsController(
  new FindFirstClinicsUseCase(clinicsRepository)
)

// create clinics
const createClinicsController = new CreateClinicsController(
  new CreateClinicsUseCase(clinicsRepository)
)

// update clinics
const updateClinicsController = new UpdateClinicsController(
  new UpdateClinicsUseCase(clinicsRepository)
)

// delte clinics
const deleteClinicsController = new DeleteClinicsController(
  new DeleteClinicsUseCase(clinicsRepository)
)

export {
  createClinicsController,
  deleteClinicsController,
  findAllClinicsController,
  findFirstClinicsController,
  updateClinicsController
}
