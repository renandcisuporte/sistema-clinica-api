import { ServiceInProductController } from '@/modules/services-in-products/controllers/service-in-product-controller'
import { ServiceInProductRepositoryImp } from '@/modules/services-in-products/prisma/repositories/implementation/service-in-product-repository'
import { CreateServiceInProductUseCase } from '@/modules/services-in-products/use-cases/create-service-in-product-use-case'
import { DeleteServiceInProductUseCase } from '@/modules/services-in-products/use-cases/delete-service-in-product-use-case'
import { FindAllServiceInProductUseCase } from '@/modules/services-in-products/use-cases/find-all-service-in-product-use-case'
import { FindFirstServiceInProductUseCase } from '@/modules/services-in-products/use-cases/find-first-service-in-product-use-case'
import { UpdateServiceInProductUseCase } from '@/modules/services-in-products/use-cases/update-service-in-product-use-case'
import prisma from '@/shared/prisma'
import { Router } from 'express'

export const serviceInProductRouter = Router()

const serviceinproductRepository = new ServiceInProductRepositoryImp(prisma)
const findAllServiceInProductUseCase = new FindAllServiceInProductUseCase(
  serviceinproductRepository
)
const findFirstServiceInProductUseCase = new FindFirstServiceInProductUseCase(
  serviceinproductRepository
)
const createServiceInProductUseCase = new CreateServiceInProductUseCase(
  serviceinproductRepository
)
const updateServiceInProductUseCase = new UpdateServiceInProductUseCase(
  serviceinproductRepository
)
const deleteServiceInProductUseCase = new DeleteServiceInProductUseCase(
  serviceinproductRepository
)

const serviceInProductController = new ServiceInProductController(
  findAllServiceInProductUseCase,
  findFirstServiceInProductUseCase,
  createServiceInProductUseCase,
  updateServiceInProductUseCase,
  deleteServiceInProductUseCase
)

serviceInProductRouter.get(
  '/all/product',
  async (req, res) => await serviceInProductController.findAll(req, res)
)

serviceInProductRouter.get(
  '/:serviceId/product',
  async (req, res) => await serviceInProductController.findAllService(req, res)
)

serviceInProductRouter.get(
  '/:serviceId/product/:productId',
  // validated(paramsServiceInProductSchema),
  async (req, res) => await serviceInProductController.findFirst(req, res)
)

serviceInProductRouter.post(
  '/in/product',
  // validated(createServiceInProductSchema),
  async (req, res) => await serviceInProductController.create(req, res)
)

serviceInProductRouter.put(
  '/products/:id',
  // validated(updateServiceInProductSchema),
  async (req, res) => await serviceInProductController.update(req, res)
)

serviceInProductRouter.delete(
  '/products/:id',
  // validated(paramsServiceInProductSchema),
  async (req, res) => await serviceInProductController.delete(req, res)
)
