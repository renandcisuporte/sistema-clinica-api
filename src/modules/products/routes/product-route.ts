import { ProductController } from '@/modules/products/controllers/product-controller'
import { ProductRepositoryImp } from '@/modules/products/prisma/repositories/implementation/product-repository'
import { CreateProductUseCase } from '@/modules/products/use-cases/create-product-use-case'
import { DeleteProductUseCase } from '@/modules/products/use-cases/delete-product-use-case'
import { FindAllProductUseCase } from '@/modules/products/use-cases/find-all-product-use-case'
import { FindFirstProductUseCase } from '@/modules/products/use-cases/find-first-product-use-case'
import { UpdateProductUseCase } from '@/modules/products/use-cases/update-product-use-case'
import { authenticated } from '@/shared/http/middlewares/authenticated'
import prisma from '@/shared/prisma'
import { PdfProduct } from '@/shared/providers/pdf-generator'
import { Router } from 'express'
import { ReportProductController } from '../controllers/product-pdf-controller'
import { ReportProductUseCase } from '../use-cases/report-product-use-case'

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

const reportProductPfd = new PdfProduct()
const reportProductUseCase = new ReportProductUseCase(
  productRepository,
  reportProductPfd
)
const reportProductController = new ReportProductController(
  reportProductUseCase
)

productRouter.get(
  '/',
  authenticated,
  async (req, res) => await productController.findAll(req, res)
)

productRouter.post(
  '/report',
  async (req, res) => await reportProductController.show(req, res)
)

productRouter.get(
  '/:id',
  authenticated,
  // validated(paramsProductSchema),
  async (req, res) => await productController.findFirst(req, res)
)

productRouter.post(
  '/',
  authenticated,
  // validated(createProductSchema),
  async (req, res) => await productController.create(req, res)
)

productRouter.put(
  '/:id',
  authenticated,
  // validated(updateProductSchema),
  async (req, res) => await productController.update(req, res)
)

productRouter.delete(
  '/:id',
  authenticated,
  // validated(paramsProductSchema),
  async (req, res) => await productController.delete(req, res)
)
