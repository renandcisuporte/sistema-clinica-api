import { ProductController } from '@/modules/products/controllers/product-controller'
import { ProductRepositoryImp } from '@/modules/products/prisma/repositories/implementation/product-repository'
import { CreateProductUseCase } from '@/modules/products/use-cases/create-product-use-case'
import { DeleteProductUseCase } from '@/modules/products/use-cases/delete-product-use-case'
import { FindAllProductUseCase } from '@/modules/products/use-cases/find-all-product-use-case'
import { FindFirstProductUseCase } from '@/modules/products/use-cases/find-first-product-use-case'
import { UpdateProductUseCase } from '@/modules/products/use-cases/update-product-use-case'
import prisma from '@/shared/prisma'
import { Router } from 'express'

export const productRouter = Router()

const productRepository = new ProductRepositoryImp(prisma)
const findAllProductUseCase = new FindAllProductUseCase(productRepository)
const findFirstProductUseCase = new FindFirstProductUseCase(productRepository)
const createProductUseCase = new CreateProductUseCase(productRepository)
const updateProductUseCase = new UpdateProductUseCase(productRepository)
const deleteProductUseCase = new DeleteProductUseCase(productRepository)

const productController = new ProductController(
  findAllProductUseCase,
  findFirstProductUseCase,
  createProductUseCase,
  updateProductUseCase,
  deleteProductUseCase
)

productRouter.get(
  '/',
  async (req, res) => await productController.findAll(req, res)
)

productRouter.get(
  '/:id',
  // validated(paramsProductSchema),
  async (req, res) => await productController.findFirst(req, res)
)

productRouter.post(
  '/',
  // validated(createProductSchema),
  async (req, res) => await productController.create(req, res)
)

productRouter.put(
  '/:id',
  // validated(updateProductSchema),
  async (req, res) => await productController.update(req, res)
)

productRouter.delete(
  '/:id',
  // validated(paramsProductSchema),
  async (req, res) => await productController.delete(req, res)
)
