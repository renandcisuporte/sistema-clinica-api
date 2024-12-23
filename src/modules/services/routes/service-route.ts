import { ServiceInProductRepositoryImp } from '@/modules/services-in-products/prisma/repositories/implementation/service-in-product-repository'
import { ServiceController } from '@/modules/services/controllers/service-controller'
import { ServiceRepositoryImp } from '@/modules/services/prisma/repositories/implementation/service-repository'
import { CreateServiceUseCase } from '@/modules/services/use-cases/create-service-use-case'
import { DeleteServiceUseCase } from '@/modules/services/use-cases/delete-service-use-case'
import { FindAllServiceUseCase } from '@/modules/services/use-cases/find-all-service-use-case'
import { FindFirstServiceUseCase } from '@/modules/services/use-cases/find-first-service-use-case'
import { UpdateServiceUseCase } from '@/modules/services/use-cases/update-service-use-case'
import prisma from '@/shared/prisma'
import { Router } from 'express'

export const serviceRouter = Router()

const serviceRepository = new ServiceRepositoryImp(prisma)
const serviceInProductRepository = new ServiceInProductRepositoryImp(prisma)
const findAllServiceUseCase = new FindAllServiceUseCase(
  serviceRepository,
  serviceInProductRepository
)
const findFirstServiceUseCase = new FindFirstServiceUseCase(serviceRepository)
const createServiceUseCase = new CreateServiceUseCase(serviceRepository)
const updateServiceUseCase = new UpdateServiceUseCase(serviceRepository)
const deleteServiceUseCase = new DeleteServiceUseCase(serviceRepository)

const serviceController = new ServiceController(
  findAllServiceUseCase,
  findFirstServiceUseCase,
  createServiceUseCase,
  updateServiceUseCase,
  deleteServiceUseCase
)

serviceRouter.get(
  '/',
  async (req, res) => await serviceController.findAll(req, res)
)

serviceRouter.get(
  '/:id',
  // validated(paramsServiceSchema),
  async (req, res) => await serviceController.findFirst(req, res)
)

serviceRouter.post(
  '/',
  // validated(createServiceSchema),
  async (req, res) => await serviceController.create(req, res)
)

serviceRouter.put(
  '/:id',
  // validated(updateServiceSchema),
  async (req, res) => await serviceController.update(req, res)
)

serviceRouter.delete(
  '/:id',
  // validated(paramsServiceSchema),
  async (req, res) => await serviceController.delete(req, res)
)
