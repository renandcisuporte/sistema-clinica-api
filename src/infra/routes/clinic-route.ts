import prisma from '@/database/prisma'
import { ClinicRepositoryImp } from '@/domain/repositories/clinic-repository'
import { AverageServiceClinicUseCase } from '@/use-cases/average-service-clinic-use-case'
import { CreateClinicUseCase } from '@/use-cases/create-clinic-use-case'
import { DeleteClinicUseCase } from '@/use-cases/delete-clinic-use-case'
import { FindAllClinicUseCase } from '@/use-cases/find-all-clinic-use-case'
import { FindFirstClinicUseCase } from '@/use-cases/find-first-clinic-use-case'
import { UpdateClinicUseCase } from '@/use-cases/update-clinic-use-case'
import { Router } from 'express'
import { ClinicController } from '../http/controllers/clinic-controller'
import { validated } from '../http/middleware/validated'
import {
  createClinicSchema,
  idSchema,
  updateClinicSchema
} from '../http/schemas/validations/clinic-schema'

export const clinicRouter = Router()

const clinicRepository = new ClinicRepositoryImp(prisma)
const createClinicUseCase = new CreateClinicUseCase(clinicRepository)
const updateClinicUseCase = new UpdateClinicUseCase(clinicRepository)
const deleteClinicUseCase = new DeleteClinicUseCase(clinicRepository)
const findAllClinicUseCase = new FindAllClinicUseCase(clinicRepository)
const findFirstClinicUseCase = new FindFirstClinicUseCase(clinicRepository)
const averageUseCase = new AverageServiceClinicUseCase(clinicRepository)

const clinicController = new ClinicController(
  findAllClinicUseCase,
  findFirstClinicUseCase,
  createClinicUseCase,
  updateClinicUseCase,
  deleteClinicUseCase,
  averageUseCase
)

clinicRouter.get('/', async (req, res) => await clinicController.all(req, res))

clinicRouter.get(
  '/:id',
  validated(idSchema),
  async (req, res) => await clinicController.findFirst(req, res)
)

clinicRouter.post(
  '/',
  validated(createClinicSchema),
  async (req, res) => await clinicController.create(req, res)
)

clinicRouter.put(
  '/:id',
  validated(updateClinicSchema),
  async (req, res) => await clinicController.update(req, res)
)

clinicRouter.put(
  '/:id/average-service',
  async (req, res) => await clinicController.averageUseCase(req, res)
)

clinicRouter.delete(
  '/:id',
  validated(idSchema),
  async (req, res) => await clinicController.delete(req, res)
)
