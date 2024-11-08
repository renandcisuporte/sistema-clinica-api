import { RealeseController } from '@/modules/realeses/controllers/realese-controller'
import { RealeseRepositoryImp } from '@/modules/realeses/prisma/repositories/implementation/realese-repository'
import { CreateRealeseUseCase } from '@/modules/realeses/use-cases/create-realese-use-case'
import { DeleteRealeseUseCase } from '@/modules/realeses/use-cases/delete-realese-use-case'
import { FindAllRealeseUseCase } from '@/modules/realeses/use-cases/find-all-realese-use-case'
import { FindFirstRealeseUseCase } from '@/modules/realeses/use-cases/find-first-realese-use-case'
import { UpdateRealeseUseCase } from '@/modules/realeses/use-cases/update-realese-use-case'
import { validated } from '@/shared/http/middlewares/validated'
import {
  paramsRealeseSchema,
  updateRealeseSchema
} from '@/shared/http/routes/schemas/validations/realese-schema'
import prisma from '@/shared/prisma'
import { Router } from 'express'

export const realeseRouter = Router()

const realeseRepository = new RealeseRepositoryImp(prisma)
const findAllRealeseUseCase = new FindAllRealeseUseCase(realeseRepository)
const findFirstRealeseUseCase = new FindFirstRealeseUseCase(realeseRepository)
const createRealeseUseCase = new CreateRealeseUseCase(realeseRepository)
const updateRealeseUseCase = new UpdateRealeseUseCase(realeseRepository)
const deleteRealeseUseCase = new DeleteRealeseUseCase(realeseRepository)

const realeseController = new RealeseController(
  findAllRealeseUseCase,
  findFirstRealeseUseCase,
  createRealeseUseCase,
  updateRealeseUseCase,
  deleteRealeseUseCase
)

realeseRouter.get(
  '/:type?',
  async (req, res) => await realeseController.findAll(req, res)
)

realeseRouter.get(
  '/:id',
  validated(paramsRealeseSchema),
  async (req, res) => await realeseController.findFirst(req, res)
)

realeseRouter.post(
  '/',
  // validated(createRealeseSchema),
  async (req, res) => await realeseController.create(req, res)
)

realeseRouter.put(
  '/:id',
  validated(updateRealeseSchema),
  async (req, res) => await realeseController.update(req, res)
)

realeseRouter.delete(
  '/:id',
  validated(paramsRealeseSchema),
  async (req, res) => await realeseController.delete(req, res)
)
